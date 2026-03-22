# Regression

Regression predicts a **continuous numeric value** rather than a class. In the context of *Machine Learning in Finance*, the most common targets are:

- **Forward return** — the percentage price change over a fixed holding period
- **Ranking of different assets** — You can use regression to rank signals by expected return or risk to decide which assets from a portfolio are worth holding.

Use `task="regression"` when your label is a float and you want the model to predict a magnitude, not just a direction.

## When to use regression vs classification

| Situation | Recommended task |
|---|---|
| You want a probability of winning | `"binary"` |
| You want to predict direction (+1/0/−1) | `"multiclass"` |
| You want to predict how much price moves | `"regression"` |
| You want to rank signals by expected return | `"regression"` |

::: tip
Regression is harder than classification on financial data because price returns are very noisy. It is not a magic bullet that can predict price returns accurately all the time. Start with classification and move to regression when you need magnitude estimates for position sizing or signal ranking.
:::

## Label convention

For `task="regression"`, `train_model` calls `float(label_value)` for each sample. Pass any numeric value to `record_label`:

```python
self.record_label("forward_return", 0.034)    # 3.4% gain
self.record_label("forward_return", -0.012)   # 1.2% loss
self.record_label("return_over_atr", 1.45)    # return normalised by ATR
```

::: warning
Do not pass `True` / `False` booleans to a regression label. They cast to `1.0` and `0.0` which is technically valid but semantically wrong — use `task="binary"` instead.
:::

## Strategy example

This is the full, runnable `ML3` strategy. It uses a **vertical-barrier** gather loop: record 18 price-derived features at bar *t*, wait `vertical_barrier` bars, then record the realised log-return as the label. In deploy mode the predicted return gates entries and scales position size.

```python
# strategies/ML3/__init__.py
import datetime
import math

import jesse.indicators as ta
import numpy as np
from jesse import utils
from jesse.strategies import Strategy


class ML3(Strategy):
    """
    Regression ML strategy.

    self.ml_mode = "gather"
        Records 18 price-derived features at every bar. When the
        vertical_barrier window expires, records the realised log-return
        over that holding period as a float label:

            label name  : "forward_return"
            label type  : float  (e.g.  0.034 = +3.4%,  -0.012 = -1.2%)

    self.ml_mode = "deploy"
        Uses the regression model's predicted return to:
          1. Gate entries  — only enter when |predicted return| > ENTRY_THRESHOLD
          2. Size positions — scale risk proportionally to predicted magnitude
          3. Exit via stop-loss (2.5 × ATR) and take-profit (5 × ATR)
    """

    vertical_barrier = 48         # bars to look forward (48 × 15m = 12 hours)
    ENTRY_THRESHOLD  = 0.002      # minimum predicted log-return to enter (0.2 %)
    BASE_RISK_PCT    = 2.0        # base risk % of margin per trade

    # ── gather-mode observation state ────────────────────────────────────────
    _features_recorded = False
    _record_index      = 0
    _entry_price       = None

    # ─────────────────────────────────────────────────────────────────────────
    # Cached indicator properties
    # ─────────────────────────────────────────────────────────────────────────

    @property
    def long_term_candles(self):
        return self.get_candles(self.exchange, self.symbol, "4h")

    @property
    def atr(self):
        return ta.atr(self.candles) + 1e-9

    @property
    def supertrend_trend(self):
        return ta.supertrend(self.candles).trend

    @property
    def adx_value(self):
        return float(ta.adx(self.candles))

    @property
    def rsi_value(self):
        return float(ta.rsi(self.candles))

    @property
    def ema200_4h(self):
        return ta.ema(self.long_term_candles, 200)

    # ─────────────────────────────────────────────────────────────────────────
    # Entry / exit decisions  (deploy mode only)
    # ─────────────────────────────────────────────────────────────────────────

    def should_long(self) -> bool:
        if self.ml_mode != "deploy":
            return False
        pred = self._safe_predicted_return()
        return pred > self.ENTRY_THRESHOLD

    def should_short(self) -> bool:
        if self.ml_mode != "deploy":
            return False
        pred = self._safe_predicted_return()
        return pred < -self.ENTRY_THRESHOLD

    def should_cancel_entry(self) -> bool:
        return True

    def go_long(self):
        entry    = self.price
        stop     = entry - self.atr * 2.5
        take     = entry + self.atr * 5.0   # 2 : 1 reward / risk
        risk_pct = self._risk_pct()
        qty      = utils.risk_to_qty(
            self.available_margin, risk_pct, entry, stop, fee_rate=self.fee_rate
        )
        self.buy         = qty, entry
        self.stop_loss   = qty, stop
        self.take_profit = qty, take

    def go_short(self):
        entry    = self.price
        stop     = entry + self.atr * 2.5
        take     = entry - self.atr * 5.0
        risk_pct = self._risk_pct()
        qty      = utils.risk_to_qty(
            self.available_margin, risk_pct, entry, stop, fee_rate=self.fee_rate
        )
        self.sell        = qty, entry
        self.stop_loss   = qty, stop
        self.take_profit = qty, take

    def update_position(self):
        pass

    # ─────────────────────────────────────────────────────────────────────────
    # Gather mode — vertical-barrier observation loop in before()
    # ─────────────────────────────────────────────────────────────────────────

    def before(self) -> None:
        if self.ml_mode != "gather":
            return

        if not self._features_recorded:
            self._record_regression_features()
            self._entry_price       = self.price
            self._record_index      = self.index
            self._features_recorded = True
            return

        if (self.index - self._record_index) >= self.vertical_barrier:
            if self._entry_price and self._entry_price != 0:
                forward_return = float(np.log(self.price / self._entry_price))
            else:
                forward_return = 0.0

            self.record_label("forward_return", round(forward_return, 6))

            self._features_recorded = False
            self._entry_price       = None

    # ─────────────────────────────────────────────────────────────────────────
    # Feature engineering  (shared between gather and deploy)
    # ─────────────────────────────────────────────────────────────────────────

    def _build_features(self) -> dict:
        dt    = datetime.datetime.utcfromtimestamp(self.current_candle[0] / 1000.0)
        price = self.price
        atr   = self.atr

        ema9  = ta.ema(self.candles, 9)  + 1e-9
        ema21 = ta.ema(self.candles, 21) + 1e-9
        ema50 = ta.ema(self.candles, 50) + 1e-9

        keltner       = ta.keltner(self.candles)
        keltner_width = (keltner.upperband - keltner.lowerband) + 1e-9

        closes       = self.candles[:, 2]
        log_return_1 = float(np.log(closes[-1] / closes[-2])) if closes[-2] != 0 else 0.0
        log_return_5 = float(np.log(closes[-1] / closes[-6])) if closes[-6] != 0 else 0.0

        volumes     = self.candles[:, 5]
        mean_vol    = float(np.mean(volumes[-20:])) + 1e-9
        log_rel_vol = float(np.log(volumes[-1] / mean_vol)) if volumes[-1] > 0 else 0.0

        rsi    = self.rsi_value
        srsi_k = float(ta.srsi(self.candles).k)
        adx    = self.adx_value

        # 4h EMA-200 may be NaN during warmup; fall back to current price
        ema200_raw    = self.ema200_4h
        ema200        = float(ema200_raw) if (
            ema200_raw is not None and not math.isnan(float(ema200_raw))
        ) else price
        long_ema_dist = (price - ema200) / price

        return {
            "log_return_1":      log_return_1,
            "log_return_5":      log_return_5,
            "ema9_21_ratio":     (ema9  - ema21) / ema21,
            "ema21_50_ratio":    (ema21 - ema50) / ema50,
            "ema9_dist":         (price - ema9)  / ema9,
            "supertrend_dist":   (price - self.supertrend_trend) / atr,
            "keltner_position":  (price - keltner.lowerband) / keltner_width,
            "keltner_width_atr": keltner_width / atr,
            "long_ema_dist":     long_ema_dist,
            "atr_pct":           atr / price,
            "rsi_centered":      (rsi    - 50.0) / 50.0,
            "srsi_k_centered":   (srsi_k - 50.0) / 50.0,
            "adx_centered":      (adx    - 25.0) / 25.0,
            "log_rel_volume":    log_rel_vol,
            "hour_sin":          float(np.sin(2 * np.pi * dt.hour      / 24)),
            "hour_cos":          float(np.cos(2 * np.pi * dt.hour      / 24)),
            "dow_sin":           float(np.sin(2 * np.pi * dt.weekday() / 7)),
            "dow_cos":           float(np.cos(2 * np.pi * dt.weekday() / 7)),
        }

    def _record_regression_features(self) -> None:
        self.record_features(self._build_features())

    # ─────────────────────────────────────────────────────────────────────────
    # Deploy-mode inference
    # ─────────────────────────────────────────────────────────────────────────

    def _predicted_return(self) -> float:
        self.load_ml_model()
        feats = self._build_features()
        keys  = sorted(feats.keys())
        X     = np.array([[feats[k] for k in keys]])
        X_sc  = self._ml_scaler.transform(X)
        return float(self._ml_model.predict(X_sc)[0])

    def _safe_predicted_return(self) -> float:
        """Return 0.0 on any error (e.g. NaN during warmup) instead of raising."""
        try:
            val = self._predicted_return()
            return val if math.isfinite(val) else 0.0
        except Exception:
            return 0.0

    def _risk_pct(self) -> float:
        """Scale risk between 0.5× and 2× BASE_RISK_PCT proportional to |predicted return|."""
        pred  = abs(self._safe_predicted_return())
        scale = max(0.5, min(2.0, pred / max(self.ENTRY_THRESHOLD, 1e-9)))
        return self.BASE_RISK_PCT * scale
```

A few design points worth noting:

- **`_build_features()` is called in both modes** — gather and deploy use the identical feature vector, guaranteeing no train/deploy skew.
- **NaN guard on the 4h EMA-200** — the 4h indicator can return `NaN` for the first ~200 bars of warmup. Falling back to `price` keeps the feature bounded at 0 rather than propagating a NaN into the scaler.
- **`_safe_predicted_return()`** — wraps `_predicted_return()` so that any unexpected error (e.g. warmup period, missing data) silently returns 0 instead of crashing the strategy.
- **`self._ml_model` / `self._ml_scaler` are instance attributes** — `Strategy.__init__` already initialises them to `None`. Do not override them at the class level. The base-class `load_ml_model()` handles loading and caching automatically; you never need to assign them manually.
- **`stop_loss` and `take_profit` are required** — every `go_long` / `go_short` must set both. Without them, Jesse has no instructions to exit the position and it will be held indefinitely.
- **`data_routes` must include `"4h"`** — the 4h candle store must be registered in both the gather script and the deploy backtest script, otherwise `get_candles(…, "4h")` throws `RouteNotFound`.

## ATR-normalised return variant

Normalising the return by ATR makes the label more stationary across different volatility regimes:

```python
def before(self) -> None:
    if self.ml_mode != "gather":
        return

    if not self._features_recorded:
        self.record_features(self._build_features())
        self._entry_price  = self.price
        self._entry_atr    = ta.atr(self.candles) + 1e-9
        self._record_index = self.index
        self._features_recorded = True
        return

    if (self.index - self._record_index) >= self.vertical_barrier:
        raw_return   = (self.price - self._entry_price) / self._entry_price
        atr_norm_ret = raw_return / (self._entry_atr / self._entry_price)
        self.record_label("return_over_atr", round(atr_norm_ret, 4))
        self._features_recorded = False
```

## Gathering data

```python
# ml_gather_data_regression.py
from pathlib import Path

import jesse.helpers as jh
from jesse.enums import exchanges
from jesse.research import gather_ml_data, get_candles

STRATEGY_NAME = "ML3"
EXCHANGE_NAME = exchanges.BINANCE_PERPETUAL_FUTURES
SYMBOL        = "BTC-USDT"
TIMEFRAME     = "15m"
START_DATE    = "2022-01-01"
END_DATE      = "2025-01-01"

DATA_ROUTES = [
    {"symbol": SYMBOL, "timeframe": "4h"},
]

CONFIG = {
    "starting_balance":      10_000,
    "fee":                   0.0007,
    "type":                  "futures",
    "futures_leverage":      10,
    "futures_leverage_mode": "cross",
    "exchange":              EXCHANGE_NAME,
    "warm_up_candles":       210,
}

SCRIPT_DIR = Path(__file__).parent
CSV_PATH   = str(
    SCRIPT_DIR / "strategies" / STRATEGY_NAME / "ml_data" / f"{STRATEGY_NAME}_data.csv"
)

if __name__ == "__main__":
    routes = [
        {
            "exchange":  EXCHANGE_NAME,
            "strategy":  STRATEGY_NAME,
            "symbol":    SYMBOL,
            "timeframe": TIMEFRAME,
        }
    ]
    data_routes = [
        {"exchange": EXCHANGE_NAME, "symbol": r["symbol"], "timeframe": r["timeframe"]}
        for r in DATA_ROUTES
    ]

    # Jesse requires 1m candles and resamples to any higher timeframe internally.
    # max_timeframe() picks the coarsest TF so get_candles fetches the right span.
    all_timeframes = [TIMEFRAME] + [r["timeframe"] for r in DATA_ROUTES]
    max_tf = jh.max_timeframe(all_timeframes)

    warmup_raw, trading_raw = get_candles(
        EXCHANGE_NAME, SYMBOL, max_tf,
        jh.date_to_timestamp(START_DATE),
        jh.date_to_timestamp(END_DATE),
        CONFIG["warm_up_candles"],
        caching=True,
        is_for_jesse=True,
    )

    candles = {
        jh.key(EXCHANGE_NAME, SYMBOL): {
            "exchange": EXCHANGE_NAME,
            "symbol":   SYMBOL,
            "candles":  trading_raw,
        }
    }
    warmup_candles = {
        jh.key(EXCHANGE_NAME, SYMBOL): {
            "exchange": EXCHANGE_NAME,
            "symbol":   SYMBOL,
            "candles":  warmup_raw,
        }
    }

    gather_ml_data(
        config=CONFIG,
        routes=routes,
        data_routes=data_routes,
        candles=candles,
        warmup_candles=warmup_candles,
        csv_path=CSV_PATH,
    )
```

Running this over 3 years of BTC-USDT 15m data (2022-01-01 → 2025-01-01) produces ~2,147 labelled samples (one per `vertical_barrier = 48` bar window).

## Training

```python
# ml_train_regression.py
from pathlib import Path

import numpy as np
from scipy.stats import spearmanr
from sklearn.ensemble import GradientBoostingRegressor, RandomForestRegressor
from sklearn.linear_model import Ridge
from sklearn.metrics import make_scorer, mean_absolute_error
from sklearn.model_selection import GridSearchCV, TimeSeriesSplit
from sklearn.preprocessing import StandardScaler

from jesse.research import load_ml_data_csv, train_model

STRATEGY_NAME = "ML3"
SCRIPT_DIR    = Path(__file__).parent
strategy_dir  = SCRIPT_DIR / "strategies" / STRATEGY_NAME
data_path     = strategy_dir / "ml_data" / f"{STRATEGY_NAME}_data.csv"
TEST_RATIO    = 0.2

data   = load_ml_data_csv(str(data_path))
labels = [p["label"]["value"] for p in data]
print(f"Samples: {len(data):,}  mean={np.mean(labels):.5f}  std={np.std(labels):.5f}\n")

# ── Build X/y for multi-model comparison ──────────────────────────────────────
feature_names = sorted(data[0]["features"].keys())
X = np.array([[p["features"][f] for f in feature_names] for p in data])
y = np.array(labels, dtype=float)

split      = int(len(X) * (1 - TEST_RATIO))
X_tr, X_te = X[:split], X[split:]
y_tr, y_te = y[:split], y[split:]
scaler     = StandardScaler()
X_tr_sc    = scaler.fit_transform(X_tr)
X_te_sc    = scaler.transform(X_te)
tscv       = TimeSeriesSplit(n_splits=5)

# Optimise for Spearman ρ — rank correlation is more relevant than R² for
# signal ranking and position sizing.
def spearman_scorer(estimator, X, y):
    preds = estimator.predict(X)
    if np.std(preds) < 1e-12:
        return 0.0
    rho, _ = spearmanr(y, preds)
    return float(rho) if not np.isnan(rho) else 0.0

candidates = [
    {
        "name":       "GradientBoosting",
        "estimator":  GradientBoostingRegressor(random_state=42),
        "param_grid": {
            "n_estimators":     [200, 400],
            "max_depth":        [3, 4],
            "learning_rate":    [0.03, 0.05, 0.1],
            "subsample":        [0.7, 0.9],
            "min_samples_leaf": [10, 20],
        },
    },
    {
        "name":       "RandomForest",
        "estimator":  RandomForestRegressor(random_state=42, n_jobs=-1),
        "param_grid": {
            "n_estimators":     [200, 400],
            "max_depth":        [4, 6, None],
            "min_samples_leaf": [5, 10, 20],
        },
    },
    {
        "name":       "Ridge",
        "estimator":  Ridge(),
        "param_grid": {"alpha": [0.01, 0.1, 1.0, 10.0, 100.0]},
    },
]

results = []
for cand in candidates:
    gs = GridSearchCV(
        cand["estimator"], cand["param_grid"],
        scoring=spearman_scorer, cv=tscv, n_jobs=-1, refit=True,
    )
    gs.fit(X_tr_sc, y_tr)
    preds    = gs.best_estimator_.predict(X_te_sc)
    test_rho = float(spearmanr(y_te, preds).statistic)
    test_mae = mean_absolute_error(y_te, preds)
    print(f"[{cand['name']}]  CV ρ: {gs.best_score_:.4f}  "
          f"Test ρ: {test_rho:.4f}  MAE: {test_mae:.6f}")
    results.append({"name": cand["name"], "params": gs.best_params_,
                    "test_rho": test_rho})

winner = max(results, key=lambda r: r["test_rho"])
print(f"\nWinner: {winner['name']}  (Test ρ = {winner['test_rho']:.4f})\n")

# ── Rebuild winning estimator (unfitted) for train_model() ────────────────────
if winner["name"] == "GradientBoosting":
    final_estimator = GradientBoostingRegressor(**winner["params"], random_state=42)
elif winner["name"] == "RandomForest":
    final_estimator = RandomForestRegressor(**winner["params"], random_state=42, n_jobs=-1)
else:
    final_estimator = Ridge(**winner["params"])

result = train_model(
    data=data,
    estimator=final_estimator,
    task="regression",
    test_ratio=TEST_RATIO,
    save_to=str(strategy_dir),
    name=STRATEGY_NAME,
)

print(f"MAE      : {result['metrics']['mae']:.6f}")
print(f"RMSE     : {result['metrics']['rmse']:.6f}")
print(f"R²       : {result['metrics']['r2']:.4f}")
print(f"Spearman : {result['metrics']['spearman']:.4f}")
```

::: tip
Always run a multi-model comparison rather than committing to a single estimator. On financial return data, the linear `Ridge` regressor frequently outperforms complex ensemble methods because returns are largely governed by weak linear relationships swamped by noise. Gradient Boosting fits that noise and overfits; Ridge does not.
:::

## Choosing an estimator

For regression, pass any sklearn-compatible **regressor** (any object that sklearn considers a regressor via `is_regressor`).

| Regressor | Best dataset size | Handles noisy data | Handles outliers | Training speed | Notes |
|---|---|---|---|---|---|
| **Ridge (linear)** | Any (even < 1 k) | ✅ Regularisation keeps it stable | ⚠️ Sensitive to outliers | Very fast | Always try this first — financial signals are often too weak to justify complex models |
| **Gradient Boosting** | Medium–Large (5 k – 500 k) | ✅ Good | ✅ Robust with `subsample < 1.0` | Medium | Best non-linear default; stochastic subsampling reduces overfitting |
| **Random Forest Regressor** | Medium–Large (5 k – 500 k) | ✅ Good | ✅ Robust | Fast | Lower variance than Gradient Boosting; preferred when data is limited |
| **SVR** | Small (< 10 k) | ⚠️ Sensitive to irrelevant features | ⚠️ Sensitive to outliers | Slow on large data | Requires well-scaled features (handled by `train_model`); tune `epsilon` carefully |
| **XGBoost Regressor** | Large (> 50 k) | ✅ Good | ✅ Robust | Fast (GPU support) | Highest accuracy ceiling but most prone to overfitting; requires careful tuning |

**Ridge (linear)** — an excellent and often overlooked baseline. Financial returns have very weak predictive signal; complex models frequently overfit to noise and perform worse than a regularised linear model out-of-sample. Always try Ridge first.

```python
from sklearn.linear_model import Ridge

Ridge(alpha=1.0)   # tune alpha with GridSearchCV: [0.01, 0.1, 1, 10, 100]
```

**Gradient Boosting** — captures non-linear relationships and is robust to outliers. Use `subsample < 1.0` for stochastic regularisation.

```python
from sklearn.ensemble import GradientBoostingRegressor

GradientBoostingRegressor(n_estimators=300, max_depth=3, learning_rate=0.05, subsample=0.8)
```

**Random Forest Regressor** — lower variance than gradient boosting; good when you have limited data and want to avoid overfitting.

```python
from sklearn.ensemble import RandomForestRegressor

RandomForestRegressor(n_estimators=300, max_depth=6, min_samples_leaf=10)
```

**SVR** — support vector regressor; works well when features are well-scaled (which `train_model` handles automatically).

```python
from sklearn.svm import SVR

SVR(kernel="rbf", C=1.0, gamma="scale", epsilon=0.01)
```

**XGBoost Regressor** — best on large datasets (> 50 k samples).

```python
from xgboost import XGBRegressor

XGBRegressor(n_estimators=300, max_depth=4, learning_rate=0.05, subsample=0.8)
```

## Understanding the training report

Running `ml_train_regression.py` on 3 years of BTC-USDT 15m data (2,147 samples) produces the following output. All numbers here are real, not invented.

### Dataset section

```
  Samples                       2,147  (18 features)
  Train set                     1,717  2022-01-01 → 2024-05-25
  Test set                        430  2024-05-26 → 2024-12-31
  Label mean                       0.0002
  Label std                        0.0191
  Label min                       -0.1179
  Label max                        0.0930
```

Check that the distribution looks reasonable — e.g. the mean should be near zero for log returns, and there should not be extreme outliers that would dominate training.

### Feature importance

The feature importance table uses **F-regression** (instead of ANOVA F-classification) to measure each feature's linear association with the continuous label. The RFE and CV-Impact columns use an SVR proxy.

```
  Rank  Feature                   RFE   F-reg  |Corr|  CV-Impact   Score
  ──── ──────────────────────── ────  ──────  ──────  ─────────  ──────
  1     supertrend_dist             1   10.85   0.079    +0.0000    3.12
  2     rsi_centered                3    9.83   0.075    +0.0000    4.12
  3     keltner_position            9    9.57   0.074    +0.0000    6.12
  4     log_return_5                5    4.06   0.049    +0.0000    7.12
  5     ema9_21_ratio              13    6.70   0.062    +0.0000    7.62
  ...
  18    adx_centered               18    0.00   0.001    +0.0000   15.88
```

The `F-reg` column uses **F-regression** (linear association with the continuous label) instead of the ANOVA F-statistic used for classification. The RFE and CV-Impact columns use an SVR proxy estimator.

### Model performance

The multi-model comparison picks Ridge as the winner:

```
  [GradientBoosting]  CV ρ: 0.0000  Test ρ: -0.0116   MAE: 0.013007
  [RandomForest]      CV ρ: 0.0000  Test ρ:  0.0148   MAE: 0.012793
  [Ridge]             CV ρ: 0.0000  Test ρ:  0.0170   MAE: 0.012753

  Winner: Ridge  (Test ρ = 0.0170,  MAE = 0.012753)
```

After `train_model` runs the full pipeline:

```
  MAE         0.012753
  RMSE        0.018038
  R²           -0.0059
  Spearman ρ    0.0170
```

Interpreting the metrics:

| Metric | Interpretation |
|---|---|
| **MAE** | Mean absolute error in the same units as the label (log-return). Lower is better. |
| **RMSE** | Root mean squared error. More sensitive to large errors than MAE. Lower is better. |
| **R²** | Fraction of label variance explained by the model. 0 = same as predicting the mean. Negative = worse than the mean. Even small positive values (0.02–0.05) can be profitable. |
| **Spearman ρ** | Rank correlation between predicted and actual values. Robust to non-linearity and outliers. More relevant than R² for signal ranking. |

::: tip
On financial return data, **R² near 0 or even slightly negative is typical and expected**. This does not necessarily mean the model is useless — even a weak rank ordering of returns can generate alpha when used for position sizing or signal filtering. Focus on **Spearman ρ** rather than R²: a Spearman ρ of 0.05–0.15 on out-of-sample data is a meaningful signal worth acting on.

R² < 0 simply means the model is worse than predicting the mean return for every bar. For a model you intend to use as a *filter* (only trade when predicted return > threshold), what matters is whether high-confidence predictions are correct more often than the base rate.
:::

### Feature impact

For regression, the impact is measured as the **change in MAE** when each feature is removed:

```
  Baseline MAE: 0.012753

  Feature                          MAE    Change  Verdict
  ────────────────────────  ──────────  ────────  ──────────────────────
  hour_sin                    0.012692  -0.000060  ↑ noisy — consider dropping
  keltner_width_atr           0.012714  -0.000039  ↑ noisy — consider dropping
  ema9_21_ratio               0.012738  -0.000014  ↑ noisy — consider dropping
  ...
  supertrend_dist             0.012778  +0.000025  ↓ important — keep
  atr_pct                     0.012782  +0.000029  ↓ important — keep
```

| Delta | Meaning | Verdict |
|---|---|---|
| `> 0` (MAE went up) | Removing the feature made predictions worse — the feature was helping | `↓ important — keep` |
| `< 0` (MAE went down) | Removing the feature improved predictions — the feature was adding noise | `↑ noisy — consider dropping` |
| `= 0` | No measurable effect | `neutral` |

Unlike the classification impact section (which uses a ±1.5% dead zone to filter noise), the regression impact section reports all non-zero deltas. Even tiny improvements in MAE are reported as "noisy" — use your judgement about whether a 0.000001 reduction in MAE is meaningful.

## Deploying a regression model

### Deploy backtest script

```python
# ml3_deploy_backtest.py
import sys
from pathlib import Path

import jesse.helpers as jh
from jesse.enums import exchanges
from jesse.research import get_candles, backtest

EXCHANGE_NAME = exchanges.BINANCE_PERPETUAL_FUTURES
SYMBOL        = "BTC-USDT"
TIMEFRAME     = "15m"
START_DATE    = "2024-06-01"
END_DATE      = "2025-01-01"

DATA_ROUTES = [{"symbol": SYMBOL, "timeframe": "4h"}]

CONFIG = {
    "starting_balance":      10_000,
    "fee":                   0.0007,
    "type":                  "futures",
    "futures_leverage":      10,
    "futures_leverage_mode": "cross",
    "exchange":              EXCHANGE_NAME,
    "warm_up_candles":       210,
}

sys.path.insert(0, str(Path(__file__).parent))

# Switch ML3 to deploy mode before Jesse imports the strategy class
import strategies.ML3 as ml3_module

ml3_module.ML3.ml_mode = "deploy"

routes = [{"exchange": EXCHANGE_NAME, "strategy": "ML3",
           "symbol": SYMBOL, "timeframe": TIMEFRAME}]
data_routes = [
    {"exchange": EXCHANGE_NAME, "symbol": r["symbol"], "timeframe": r["timeframe"]}
    for r in DATA_ROUTES
]

all_timeframes = [TIMEFRAME] + [r["timeframe"] for r in DATA_ROUTES]
max_tf = jh.max_timeframe(all_timeframes)

warmup_raw, trading_raw = get_candles(
    EXCHANGE_NAME, SYMBOL, max_tf,
    jh.date_to_timestamp(START_DATE),
    jh.date_to_timestamp(END_DATE),
    CONFIG["warm_up_candles"],
    caching=True,
    is_for_jesse=True,
)

candles = {
    jh.key(EXCHANGE_NAME, SYMBOL): {
        "exchange": EXCHANGE_NAME,
        "symbol":   SYMBOL,
        "candles":  trading_raw,
    }
}
warmup_candles = {
    jh.key(EXCHANGE_NAME, SYMBOL): {
        "exchange": EXCHANGE_NAME,
        "symbol":   SYMBOL,
        "candles":  warmup_raw,
    }
}

result = backtest(
    config=CONFIG,
    routes=routes,
    data_routes=data_routes,
    candles=candles,
    warmup_candles=warmup_candles,
    fast_mode=True,
)

m = result.get("metrics", {})
print(f"Trades          : {m.get('total', 0)}")
print(f"Net profit %    : {m.get('net_profit_percentage', 0):.2f}%")
print(f"Max drawdown    : {m.get('max_drawdown', 0):.2f}%")
print(f"Sharpe ratio    : {m.get('sharpe_ratio', float('nan')):.3f}")
print(f"Win rate        : {m.get('win_rate', 0) * 100:.1f}%")
print(f"Total fees      : ${m.get('fee', 0):.2f}")
```

### Actual deploy backtest results

Running the above on BTC-USDT 15m, 2024-06-01 → 2025-01-01 (out-of-sample — model was trained on 2022–2024):

```
  Trades              : 448
  Net profit          : $-4,272.10
  Net profit %        : -42.72%
  Max drawdown        : -46.19%
  Sharpe ratio        : -1.909
  Win rate            : 34.2%
  Total fees          : $4,973.61
  Avg holding period  : 9.9 h
```

This is the **expected** outcome for a model with Spearman ρ = 0.017. The model fires on ~18% of bars (threshold = 0.002), producing ~448 trades over 7 months. Fee drag alone ($4,973 on a $10,000 account) explains most of the loss — there is no edge strong enough to overcome it at this frequency.

::: tip
These results are real and intentionally not cherry-picked. They illustrate the challenge of deploying regression models on price data: a Spearman ρ of ~0.02 is not zero, but it is far too weak to overcome fees at high trade frequency. The practical paths forward are covered in [Interpreting weak regression results](#interpreting-weak-regression-results) below.
:::

### How to use the scalar prediction

Unlike classification models, a regression model's output is a **scalar** (e.g. expected log-return). Three deployment patterns:

**Signal gating** — only enter when the predicted return exceeds a threshold:

```python
predicted_return = self._safe_predicted_return()
if predicted_return > 0.002:   # enter only when model predicts > 0.2% gain
    ...
```

**Position sizing** — scale position size proportionally to predicted return:

```python
predicted_return = abs(self._safe_predicted_return())
# Scale between 0.5× and 2× of your base size
scale   = max(0.5, min(2.0, predicted_return / 0.002))
qty     = base_qty * scale
```

**Signal ranking** (portfolio strategies) — rank multiple symbols by their predicted return and allocate to the top N.

See the [Deploying in a Strategy](/docs/research/ml/deploying) page for the full deploy-mode pattern.

## Interpreting weak regression results

A common outcome when first training a regression model on price data is:

```
  R²           -0.0059
  Spearman ρ    0.0170
```

This is not a bug — it reflects the difficulty of predicting financial returns. Before improving the model, diagnose the cause:

1. **Feature signal is genuinely weak** — standard price-derived indicators have very low predictive power for raw returns. Consider adding alternative data (order flow, funding rates, sentiment) or switching to a more predictive label (e.g. a directional classification label instead of raw return magnitude).

2. **Label is too noisy** — a 48-bar forward return includes many random moves. Try a shorter holding period, or filter to only label bars where price moved above a meaningful threshold (e.g. record `forward_return` only when `|return| > 1× ATR`, otherwise skip that observation entirely).

3. **Too many trades, too little edge** — a weak model that fires on 18% of bars will be destroyed by fees. Add a primary-signal pre-filter (e.g. a supertrend flip, ADX threshold) to reduce trade frequency before applying the regression model as a magnitude estimator on top of the pre-filtered signals.

4. **Overfitting in training, underfitting in test** — gradient boosting with deep trees memorises training noise. Reduce `max_depth` (try 2–3) and increase `min_samples_leaf` (try 20–50). Notice that in the example above, Ridge outperforms both GradientBoosting and RandomForest — the relationship is largely linear and there is no benefit to a more complex model.

5. **The regression model's value is in *ranking*, not *predicting*** — even if absolute magnitudes are poor, the top decile of predictions may still outperform the bottom decile. Rather than using a fixed `ENTRY_THRESHOLD`, consider entering the highest-ranked signals from a daily batch rather than firing on every bar above a threshold.
