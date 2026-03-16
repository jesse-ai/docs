# Meta-Labeling

Meta-labeling is a technique introduced by Marcos López de Prado in *Advances in Financial Machine Learning*. The problem it solves is this: **you already have a model that tells you the side of a bet (long or short), and you need to learn the size of that bet** — including the possibility of no bet at all (size = 0).

The key insight is a separation of concerns:

- **Primary model** — decides *direction* (long or short). This can be a rule-based system, a technical signal, a fundamental model, or an ML classifier. It is exogenous to the meta-label model.
- **Meta-label model** — decides *whether to act and how much to risk*. It is always a binary classifier whose output label is `{0, 1}`: 0 means "pass", 1 means "take the bet". When the predicted label is 1, the **predicted probability** of that class can be used directly to scale the position size.

This produces two independent and complementary decisions which together tend to outperform either model alone.

::: tip
The meta-label model does not learn the side. It only learns whether a positive from the primary model is a true positive or a false positive — and how confident it is. That confidence becomes your position size.
:::

## Why meta-labeling works

Binary classification problems involve a trade-off between **precision** (how many of your predicted positives are actually positive) and **recall** (how many of the actual positives you caught). Increasing recall tends to decrease precision, and vice versa. The **F1-score** — the harmonic mean of precision and recall — measures the overall efficiency of the classifier.

Meta-labeling is specifically designed to improve F1-scores through a two-stage workflow:

1. **Build a primary model with high recall** — it is allowed to have low precision. It fires broadly, catching as many real opportunities as possible, even at the cost of many false positives.
2. **Correct the low precision with a meta-label model** — train a secondary binary classifier to predict which of the primary model's positives are true positives. This filters out the false positives, increasing precision while preserving most of the recall.

The result is a higher F1-score than either model could achieve alone.

Beyond F1-scores, meta-labeling offers four additional advantages described in the book:

1. **Interpretability** — ML is often criticised as a black box. Meta-labeling lets you build an ML system on top of a white box (a rule-based signal, a fundamental model, an economic theory). This is particularly valuable for "quantamental" firms that need human-readable primary models.
2. **Reduced overfitting** — because ML is not responsible for deciding the side of the bet, only the size, the risk of overfitting is meaningfully lower. The model is solving a narrower problem.
3. **Decoupled side and size** — separating direction from sizing enables sophisticated strategy structures. For instance, the features that drive a rally may differ from the features that drive a sell-off. You can build one ML strategy exclusively for long positions (based on the buy signals of one primary model) and a separate ML strategy for short positions (based on a different primary model).
4. **Better sizing** — achieving high accuracy on small bets and low accuracy on large bets is destructive to a portfolio. Sizing bets correctly is as important as identifying good opportunities. Meta-labeling gives you an ML model whose sole job is to get that critical sizing decision right.

## Label values: `{0, 1}` not `{-1, 0, 1}`

In typical labeling the outcome is in `{-1, 0, 1}` — price went down, time expired, or price went up. In meta-labeling the labels are in `{0, 1}` only:

- **0** — the primary signal was wrong (false positive); don't trade.
- **1** — the primary signal was correct (true positive); take the bet.

The side is already known from the primary model, so the meta-label model never needs to predict `−1`. It only needs to decide "act or pass".

When the meta-model outputs a predicted label of **1**, use the **predicted probability** of class 1 to scale the position size. A 90% confidence warrants a larger bet than a 61% confidence, even though both clear the entry threshold.

## Key differences from regular binary classification

| Aspect | Regular binary | Meta-labeling |
|---|---|---|
| What it predicts | Whether price goes up or down | Whether *this specific primary signal* is a true positive |
| Label values | `{−1, 0, 1}` or `{0, 1}` depending on labeling scheme | Always `{0, 1}` — side is already known from primary model |
| Features at signal time | Any market features | Market features + signal characteristics (especially `signal_side`) |
| Entry logic | Model output alone | Primary signal fires first; meta-model then gates and sizes |
| Training data source | Any bar or event | Only bars where the primary signal fired |
| Probability output use | Optional gate or ignored | Used both as a gate (>= threshold) and to scale position size |
| Expected precision uplift | Depends on features | Typically +5 to +20% win rate at high thresholds vs. primary alone |

::: warning
The meta-label model is only valid for the **specific primary signal it was trained on**. If you change the primary signal's parameters (e.g. change the ATR multiplier or the ADX threshold), you must re-gather and re-train the meta-label model from scratch.
:::


## The gather-mode pattern

Meta-labeling uses the [same triple-barrier machinery](/docs/research/ml/multiclass#the-triple-barrier-method) as the multiclass labeling method — no actual positions are opened in either case. You anchor three barriers to a point on the price series and record a label when the first one is touched. The only difference between the two is **whether the side of the bet is known**:

| | Triple-barrier (multiclass) | Triple-barrier (meta-labeling) |
|---|---|---|
| Side known? | No — barriers are symmetric | Yes — from the primary model |
| Outcomes | `{+1, -1, 0}` — determined by price direction | `{1, 0}` — determined by P&L relative to the known side |
| What `0` means | Time expiry (no conviction) | Stop hit **or** time expiry (signal was wrong) |

Whenever the primary signal fires, you:

1. Record the market features at that bar
2. Anchor the entry price, the known direction, and three barriers:
   - **Upper barrier** — profit target (in the signal's direction)
   - **Lower barrier** — stop-loss (against the signal's direction)
   - **Vertical barrier** — maximum holding period of `vertical_barrier` bars
3. On each subsequent bar, check which barrier is touched first
4. Record a **boolean label**: `True` if the profit target was hit first, `False` if the stop or the time window was hit first

See [Gathering Data](/docs/research/ml/gathering-data) and [Multiclass Classification](/docs/research/ml/multiclass) for the full triple-barrier reference.

## Strategy example — triple-barrier gather 

```python
import datetime

import jesse.indicators as ta
import numpy as np
from jesse import utils
from jesse.strategies import Strategy


class MyStrategy(Strategy):
    ML_MODE      = "gather"   # "gather" | "deploy"
    ML_THRESHOLD = 0.60       # used in deploy mode only

    # ── triple-barrier config (gather mode) ──────────────────────────────────
    vertical_barrier = 24     # max holding period (e.g. 24 × 15 min = 6 hours)

    # ── gather-mode observation state ────────────────────────────────────────
    _obs_active      = False
    _obs_start_index = 0
    _obs_entry_price = None
    _obs_direction   = 0      # +1 = long flip, -1 = short flip
    _obs_atr         = None

    # ────────────────────────────────────────────────────────────────────────
    # Indicators
    # ────────────────────────────────────────────────────────────────────────

    @property
    def atr(self):
        return ta.atr(self.candles) + 1e-9

    @property
    def supertrend(self):
        return ta.supertrend(self.candles, sequential=True)

    @property
    def _st_side(self):
        """Return +1 if price is above supertrend, -1 if below."""
        return 1 if self.price > self.supertrend.trend[-1] else -1

    @property
    def _long_flip(self) -> bool:
        """Bullish supertrend flip: trend was above price, now below price."""
        closes = self.candles[:, 2]
        return self.supertrend.trend[-2] > closes[-2] and self.supertrend.trend[-1] < closes[-1]

    @property
    def _short_flip(self) -> bool:
        """Bearish supertrend flip: trend was below price, now above price."""
        closes = self.candles[:, 2]
        return self.supertrend.trend[-2] < closes[-2] and self.supertrend.trend[-1] > closes[-1]

    # ────────────────────────────────────────────────────────────────────────
    # Primary signal (used in deploy mode)
    # ────────────────────────────────────────────────────────────────────────

    @property
    def _deploy_long(self) -> bool:
        return self._long_flip and ta.adx(self.candles) > 25

    @property
    def _deploy_short(self) -> bool:
        return self._short_flip and ta.adx(self.candles) > 25

    # ────────────────────────────────────────────────────────────────────────
    # Entry / exit  (deploy mode only — gather mode places no trades)
    # ────────────────────────────────────────────────────────────────────────

    def should_long(self) -> bool:
        if self.ML_MODE != "deploy":
            return False
        return self._deploy_long and self._meta_confidence() >= self.ML_THRESHOLD

    def should_short(self) -> bool:
        if self.ML_MODE != "deploy":
            return False
        return self._deploy_short and self._meta_confidence() >= self.ML_THRESHOLD

    def should_cancel_entry(self) -> bool:
        return True

    def go_long(self):
        entry      = self.price
        stop       = entry - self.atr * 2.5
        # Scale risk% by meta-model confidence — higher confidence → larger bet.
        # _meta_confidence() returns a probability in [ML_THRESHOLD, 1.0].
        # Normalise it to a [0.5, 1.0] multiplier so the minimum allowed trade
        # still risks 1% and the highest-confidence trade risks 2%.
        confidence = self._meta_confidence()
        risk_pct   = 1.0 + (confidence - self.ML_THRESHOLD) / (1.0 - self.ML_THRESHOLD)
        qty        = utils.risk_to_qty(
            self.available_margin, risk_pct, entry, stop, fee_rate=self.fee_rate
        )
        self.buy = qty, entry

    def go_short(self):
        entry      = self.price
        stop       = entry + self.atr * 2.5
        confidence = self._meta_confidence()
        risk_pct   = 1.0 + (confidence - self.ML_THRESHOLD) / (1.0 - self.ML_THRESHOLD)
        qty        = utils.risk_to_qty(
            self.available_margin, risk_pct, entry, stop, fee_rate=self.fee_rate
        )
        self.sell = qty, entry

    # ────────────────────────────────────────────────────────────────────────
    # Bar lifecycle
    # ────────────────────────────────────────────────────────────────────────

    def before(self) -> None:
        if self.ML_MODE == "gather":
            self._gather_tick()

    # ────────────────────────────────────────────────────────────────────────
    # Gather-mode triple-barrier loop
    # ────────────────────────────────────────────────────────────────────────

    def _gather_tick(self) -> None:
        """
        State machine called every bar in gather mode.

        IDLE   → if a flip occurs: record features and start observation.
        ACTIVE → each bar check barriers; when triggered: record label
                 and return to IDLE.
        """
        # ── Step 1: close any active observation ─────────────────────────────
        if self._obs_active:
            bars_elapsed  = self.index - self._obs_start_index
            price         = self.price
            atr           = self._obs_atr

            profit_target = self._obs_entry_price + self._obs_direction * atr
            stop_level    = self._obs_entry_price - self._obs_direction * atr

            target_hit = (self._obs_direction ==  1 and price >= profit_target) or \
                         (self._obs_direction == -1 and price <= profit_target)
            stop_hit   = (self._obs_direction ==  1 and price <= stop_level) or \
                         (self._obs_direction == -1 and price >= stop_level)
            expired    = bars_elapsed >= self.vertical_barrier

            if target_hit or stop_hit or expired:
                # Label: True only if price reached the profit target.
                # This is the binary meta-label: did the primary signal succeed?
                self.record_label("meta_win", bool(target_hit))
                self._obs_active = False

        # ── Step 2: start new observation if a flip just occurred ─────────────
        if not self._obs_active and (self._long_flip or self._short_flip):
            direction = 1 if self._long_flip else -1
            self._record_meta_features(direction)
            self._obs_active      = True
            self._obs_start_index = self.index
            self._obs_entry_price = self.price
            self._obs_direction   = direction
            self._obs_atr         = self.atr

    # ────────────────────────────────────────────────────────────────────────
    # Feature engineering
    # ────────────────────────────────────────────────────────────────────────

    def _record_meta_features(self, direction: int) -> None:
        dt    = datetime.datetime.utcfromtimestamp(self.current_candle[0] / 1000.0)
        price = self.price
        atr   = self.atr

        ema9  = ta.ema(self.candles, 9)  + 1e-9
        ema21 = ta.ema(self.candles, 21) + 1e-9
        ema50 = ta.ema(self.candles, 50) + 1e-9

        keltner      = ta.keltner(self.candles)
        keltner_w    = (keltner.upperband - keltner.lowerband) + 1e-9

        closes       = self.candles[:, 2]
        log_return_1 = float(np.log(closes[-1] / closes[-2])) if closes[-2] != 0 else 0.0
        log_return_5 = float(np.log(closes[-1] / closes[-6])) if closes[-6] != 0 else 0.0

        volumes     = self.candles[:, 5]
        mean_vol    = float(np.mean(volumes[-20:])) + 1e-9
        log_rel_vol = float(np.log(volumes[-1] / mean_vol)) if volumes[-1] > 0 else 0.0

        adx    = float(ta.adx(self.candles))
        rsi    = float(ta.rsi(self.candles))
        srsi_k = float(ta.srsi(self.candles).k)

        self.record_features({
            "adx_centered":      (adx    - 25.0) / 25.0,
            "atr_pct":           atr / price,
            "dow_cos":           float(np.cos(2 * np.pi * dt.weekday() / 7)),
            "dow_sin":           float(np.sin(2 * np.pi * dt.weekday() / 7)),
            "ema21_50_ratio":    (ema21 - ema50) / ema50,
            "ema9_21_ratio":     (ema9  - ema21) / ema21,
            "ema9_dist":         (price - ema9)  / ema9,
            "hour_cos":          float(np.cos(2 * np.pi * dt.hour / 24)),
            "hour_sin":          float(np.sin(2 * np.pi * dt.hour / 24)),
            "keltner_position":  (price - keltner.lowerband) / keltner_w,
            "keltner_width_atr": keltner_w / atr,
            "log_rel_volume":    log_rel_vol,
            "log_return_1":      log_return_1,
            "log_return_5":      log_return_5,
            "rsi_centered":      (rsi    - 50.0) / 50.0,
            # Signal direction: +1 = long flip, -1 = short flip.
            # Allows the model to learn asymmetric patterns (e.g. longs work
            # better in bull regimes than shorts).
            "signal_side":       float(direction),
            "srsi_k_centered":   (srsi_k - 50.0) / 50.0,
            "supertrend_dist":   (price - self.supertrend.trend[-1]) / atr,
        })

    # ────────────────────────────────────────────────────────────────────────
    # Deploy-mode inference
    # ────────────────────────────────────────────────────────────────────────

    def _meta_confidence(self) -> float:
        """
        Return P(class=1) — the model's probability that this primary signal
        will succeed. Used both as a threshold gate (>= ML_THRESHOLD) and as
        a position-size multiplier in go_long / go_short.
        """
        self.load_ml_model()   # idempotent — loads once, then no-op
        dt    = datetime.datetime.utcfromtimestamp(self.current_candle[0] / 1000.0)
        price = self.price
        atr   = self.atr

        ema9  = ta.ema(self.candles, 9)  + 1e-9
        ema21 = ta.ema(self.candles, 21) + 1e-9
        ema50 = ta.ema(self.candles, 50) + 1e-9

        keltner  = ta.keltner(self.candles)
        keltner_w = (keltner.upperband - keltner.lowerband) + 1e-9

        closes       = self.candles[:, 2]
        log_return_1 = float(np.log(closes[-1] / closes[-2])) if closes[-2] != 0 else 0.0
        log_return_5 = float(np.log(closes[-1] / closes[-6])) if closes[-6] != 0 else 0.0

        volumes     = self.candles[:, 5]
        mean_vol    = float(np.mean(volumes[-20:])) + 1e-9
        log_rel_vol = float(np.log(volumes[-1] / mean_vol)) if volumes[-1] > 0 else 0.0

        adx    = float(ta.adx(self.candles))
        rsi    = float(ta.rsi(self.candles))
        srsi_k = float(ta.srsi(self.candles).k)

        # Columns in alphabetical order — must match training order exactly.
        # The sorted feature names from gather time determine this order.
        features = np.array([[
            (adx    - 25.0) / 25.0,                                    # adx_centered
            atr / price,                                                 # atr_pct
            float(np.cos(2 * np.pi * dt.weekday() / 7)),                # dow_cos
            float(np.sin(2 * np.pi * dt.weekday() / 7)),                # dow_sin
            (ema21 - ema50) / ema50,                                     # ema21_50_ratio
            (ema9  - ema21) / ema21,                                     # ema9_21_ratio
            (price - ema9)  / ema9,                                      # ema9_dist
            float(np.cos(2 * np.pi * dt.hour / 24)),                     # hour_cos
            float(np.sin(2 * np.pi * dt.hour / 24)),                     # hour_sin
            (price - keltner.lowerband) / keltner_w,                     # keltner_position
            keltner_w / atr,                                             # keltner_width_atr
            log_rel_vol,                                                 # log_rel_volume
            log_return_1,                                                # log_return_1
            log_return_5,                                                # log_return_5
            (rsi    - 50.0) / 50.0,                                      # rsi_centered
            1.0 if self._deploy_long else -1.0,                          # signal_side
            (srsi_k - 50.0) / 50.0,                                      # srsi_k_centered
            (price - self.supertrend.trend[-1]) / atr,                   # supertrend_dist
        ]])
        X_scaled = self._ml_scaler.transform(features)
        return float(self._ml_model.predict_proba(X_scaled)[0, 1])
```

::: tip Relationship to multiclass triple-barrier
The gather loop in this strategy is the standard triple-barrier loop with one addition: because the trade direction is known from the primary model, the profit target and stop are placed asymmetrically — only in the direction of the signal — rather than symmetrically on both sides. The label is then recorded as a boolean at record time rather than as `{+1, -1, 0}`.

If you have already gathered triple-barrier data with `task="multiclass"` on your primary signal's bars, you can produce the equivalent meta-labels by collapsing after the fact: `+1 → True`, `-1 or 0 → False`. This works because the `+1` outcome already means "profit target was hit in the direction of the known side" — which is exactly what `True` means in the meta-label context.
:::

## Running gather_ml_data

```python
# gather_meta.py  (place next to your strategies/ folder)
from pathlib import Path

import jesse.helpers as jh
from jesse.enums import exchanges
from jesse.research import gather_ml_data, get_candles

STRATEGY  = "MyStrategy"
EXCHANGE  = exchanges.BINANCE_PERPETUAL_FUTURES
SYMBOL    = "BTC-USDT"
TIMEFRAME = "15m"
START     = "2021-01-01"
END       = "2025-01-01"

config = {
    "starting_balance":      10_000,
    "fee":                   0.0007,
    "type":                  "futures",
    "futures_leverage":      10,
    "futures_leverage_mode": "cross",
    "exchange":              EXCHANGE,
    "warm_up_candles":       210,
}

routes = [
    {"exchange": EXCHANGE, "strategy": STRATEGY, "symbol": SYMBOL, "timeframe": TIMEFRAME}
]
data_routes = [
    {"exchange": EXCHANGE, "symbol": SYMBOL, "timeframe": "4h"}
]

# Pass is_for_jesse=True so Jesse receives raw 1m candles and can internally
# aggregate them to any timeframe required by routes or data_routes.
# Use TIMEFRAME here so the warmup period is calculated correctly
# (210 × 15-min bars, not 210 × 4h bars).
warmup_raw, trading_raw = get_candles(
    EXCHANGE, SYMBOL, TIMEFRAME,
    jh.date_to_timestamp(START),
    jh.date_to_timestamp(END),
    config["warm_up_candles"],
    caching=True,
    is_for_jesse=True,
)

candles = {
    jh.key(EXCHANGE, SYMBOL): {
        "exchange": EXCHANGE, "symbol": SYMBOL, "candles": trading_raw
    }
}
warmup_candles = {
    jh.key(EXCHANGE, SYMBOL): {
        "exchange": EXCHANGE, "symbol": SYMBOL, "candles": warmup_raw
    }
}

result = gather_ml_data(
    config=config,
    routes=routes,
    data_routes=data_routes,
    candles=candles,
    warmup_candles=warmup_candles,
    # csv_path="auto" → strategies/MyStrategy/ml_data/MyStrategy_data.csv
)

print(f"Collected {len(result['data_points']):,} samples")
```

Since no trades are placed in gather mode, the backtest results section will show:

```
─── BACKTEST RESULTS ────────────────────────────────────────────
  No trades were opened during the backtest.
  The ML gather mode runs on entry signals, not closed trades.
```

This is expected and correct.

## Training the meta-label model

The meta-label training script uses `task="binary"` since the label is always `True`/`False`. For the estimator, the right choice depends on how much data you have:

- **Large datasets (≥ 1,000 samples)** — ensemble methods (Random Forest, Gradient Boosting) tend to outperform SVMs. SVMs can collapse to the majority class when the signal is noisy, while ensemble methods produce meaningful probability outputs even with low-predictive features.
- **Small datasets (< 1,000 samples)** — an SVM with an RBF kernel is worth trying. It generalises well in high-dimensional spaces with limited data, whereas Gradient Boosting in particular can overfit when there are few samples. Logistic Regression is also a strong baseline here due to its low variance.

In both cases, well-calibrated probabilities are especially important because the probability output is used directly for position sizing. Wrap whichever estimator you choose in `CalibratedClassifierCV` if the calibration plot in the training report shows the raw probabilities are skewed.

See [Binary Classification](/docs/research/ml/binary) for the full reference on `task="binary"`, label conventions, and how to read the training report.

```python
# train_meta.py
from pathlib import Path

from sklearn.calibration import CalibratedClassifierCV
from sklearn.ensemble import GradientBoostingClassifier, RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import roc_auc_score
from sklearn.model_selection import GridSearchCV, TimeSeriesSplit
from sklearn.preprocessing import StandardScaler
import numpy as np

from jesse.research import load_ml_data_csv, train_model

STRATEGY     = "MyStrategy"
SCRIPT_DIR   = Path(__file__).parent
strategy_dir = SCRIPT_DIR / "strategies" / STRATEGY
data_path    = strategy_dir / "ml_data" / f"{STRATEGY}_data.csv"
TEST_RATIO   = 0.2

data  = load_ml_data_csv(str(data_path))
n_pos = sum(1 for p in data if p["label"]["value"] is True)
n_neg = len(data) - n_pos
cw    = {0: 1.0, 1: round(n_neg / n_pos, 3)} if n_pos > 0 else {0: 1.0, 1: 1.0}

print(f"Samples: {len(data):,}  |  wins: {n_pos:,}  |  losses: {n_neg:,}")
print(f"Class weight for positives: {cw[1]:.3f}\n")

# ── Quick multi-model comparison via GridSearchCV ──────────────────────────────
feature_names = sorted(data[0]["features"].keys())
X = np.array([[p["features"][f] for f in feature_names] for p in data])
y = np.array([1 if p["label"]["value"] is True else 0 for p in data])

split       = int(len(X) * (1 - TEST_RATIO))
X_tr, X_te  = X[:split], X[split:]
y_tr, y_te  = y[:split], y[split:]
scaler      = StandardScaler()
X_tr_sc     = scaler.fit_transform(X_tr)
X_te_sc     = scaler.transform(X_te)
tscv        = TimeSeriesSplit(n_splits=5)

candidates = [
    {
        "name":       "GradientBoosting",
        "estimator":  GradientBoostingClassifier(random_state=42),
        "param_grid": {
            "n_estimators":     [200, 300],
            "max_depth":        [3, 4],
            "learning_rate":    [0.05, 0.1],
            "subsample":        [0.7, 0.9],
            "min_samples_leaf": [10, 20],
        },
    },
    {
        "name":       "RandomForest",
        "estimator":  RandomForestClassifier(class_weight=cw, random_state=42, n_jobs=-1),
        "param_grid": {
            "n_estimators":     [200, 400],
            "max_depth":        [4, 6, None],
            "min_samples_leaf": [5, 10, 20],
        },
    },
    {
        "name":       "LogisticRegression",
        "estimator":  LogisticRegression(class_weight=cw, max_iter=1000, random_state=42),
        "param_grid": {"C": [0.01, 0.1, 1.0, 10.0]},
    },
]

results = []
for cand in candidates:
    gs = GridSearchCV(
        cand["estimator"], cand["param_grid"],
        scoring="roc_auc", cv=tscv, n_jobs=-1, refit=True,
    )
    gs.fit(X_tr_sc, y_tr)
    test_auc = roc_auc_score(y_te, gs.best_estimator_.predict_proba(X_te_sc)[:, 1])
    print(f"[{cand['name']}]  CV AUC: {gs.best_score_:.4f}  Test AUC: {test_auc:.4f}")
    results.append({"name": cand["name"], "estimator": gs.best_estimator_,
                    "params": gs.best_params_, "test_auc": test_auc})

winner = max(results, key=lambda r: r["test_auc"])
print(f"\nWinner: {winner['name']}  (Test AUC = {winner['test_auc']:.4f})\n")

# ── Rebuild winning estimator (unfitted) for train_model() ────────────────────
if winner["name"] == "GradientBoosting":
    final_estimator = CalibratedClassifierCV(
        GradientBoostingClassifier(**winner["params"], random_state=42),
        method="isotonic", cv=3,
    )
elif winner["name"] == "RandomForest":
    final_estimator = RandomForestClassifier(
        **winner["params"], class_weight=cw, random_state=42, n_jobs=-1,
    )
else:
    final_estimator = LogisticRegression(
        **winner["params"], class_weight=cw, max_iter=1000, random_state=42,
    )

train_model(
    data=data,
    estimator=final_estimator,
    task="binary",
    test_ratio=TEST_RATIO,
    save_to=str(strategy_dir),
    name=STRATEGY,
)
```

## Choosing the threshold

The meta-label model outputs **P(class=1)** — the probability that the primary signal will succeed. This probability plays two roles:

1. **Gate** — only allow trades where `confidence >= ML_THRESHOLD`
2. **Size** — scale the position size proportionally to the confidence above the threshold

Use the **Precision vs Confidence Threshold** section of the training report to choose your `ML_THRESHOLD`:

```
  Threshold    Allowed  Precision   Coverage
       0.45         63      58.7%      14.5%
       0.50         34      61.8%       7.8%
       0.55         15      73.3%       3.5%
       0.60          9      77.8%       2.1%
       0.65          4      50.0%       0.9%
```

A good operating point is where **Precision meaningfully exceeds your primary signal's base win rate** while enough signals still pass through to be tradeable. In the example above, 0.55 or 0.60 are strong candidates: precision jumps to 73–78% while coverage remains non-trivial.

Also check the **Probability Calibration** section. If predicted 60% confidence corresponds to ~60% actual win rate, then:
- The threshold you choose has a direct and interpretable meaning
- The confidence value you pass to `go_long` / `go_short` for sizing is trustworthy

::: tip
On a noisy financial dataset you may find that high-confidence predictions (e.g. ≥ 0.55) achieve 70–80% precision even when the model's overall ROC AUC is only ~0.55. This is the key value of meta-labeling: even a weak meta-model can identify the *best* subset of its signals with meaningfully higher precision than the base rate. Check the precision column at your chosen threshold, not just the overall AUC.
:::

## Using the confidence for position sizing

The meta-label model gives you a probability, not just a binary decision. Use it to scale bet size — this is the full intent of the technique as described in the book.

A simple linear sizing scheme (as shown in `go_long` above):

```python
confidence = self._meta_confidence()          # e.g. 0.72
risk_pct   = 1.0 + (confidence - self.ML_THRESHOLD) / (1.0 - self.ML_THRESHOLD)
# ML_THRESHOLD = 0.60:
#   confidence 0.60 → risk_pct 1.0   (minimum bet)
#   confidence 0.80 → risk_pct 1.5
#   confidence 1.00 → risk_pct 2.0   (maximum bet)
```

This ensures that the highest-confidence signals receive the largest allocation, while signals that barely clear the threshold receive a smaller one — matching the book's intent of letting the predicted probability *drive* sizing.

::: warning
Position sizing via confidence only makes sense if the model's probabilities are **well calibrated**. Always check the calibration plot in the training report before relying on the raw probability for sizing. If calibration is poor (e.g. predicted 70% actually wins only 50% of the time), use a flat size for all signals above the threshold and treat the probability only as a gate, not a scalar.
:::

## Feature design for meta-labeling

The most informative features for a meta-label model are those that describe the **quality** of the signal instance — not just that the signal fired. Useful categories:

**Trend confirmation**
- `adx_centered` — is there a strong directional trend?
- `supertrend_dist` — how far is price from the supertrend line?
- `long_ema_dist` — are we trading with or against the higher-timeframe trend?

**Signal alignment**
- `signal_side` — encodes the trade direction; allows the model to learn asymmetric patterns. The book specifically notes that the features driving a rally may differ from the features driving a sell-off — including direction as a feature lets the model discover this automatically.
- Cross-timeframe trend agreement features

**Volatility regime**
- `atr_pct` — is volatility normal, compressed, or expanded?
- `keltner_width_atr` — Keltner width relative to ATR signals volatility breakouts

**Cyclical time**
- `hour_sin` / `hour_cos` — intraday seasonality (some hours are more trending)
- `dow_sin` / `dow_cos` — day-of-week effects

**Market microstructure**
- `log_rel_volume` — high-volume signals tend to be higher quality
- Log returns at short horizons — recent momentum context

::: tip
Always include the **signal direction** (`signal_side`) as a feature. The book explicitly recommends this: you may want separate effective models for long and short signals, and including direction as a feature is the simplest way to achieve that without training two separate models.
:::

## Stacking: primary ML model + meta-label model

You can stack a meta-label model on top of another ML model instead of a rule-based signal. In this case the primary model is itself an ML classifier that predicts direction, and the meta-label model sits on top of it:

1. **Primary model** (`task="multiclass"` or `task="binary"`) — predicts direction; trained to have **high recall** even if precision is low.
2. **Meta-label model** (`task="binary"`) — predicts whether the primary model's prediction will be correct; trained to **correct the low precision** of the primary.

This is exactly the two-stage F1 workflow described above, but both stages are ML models rather than the first being rule-based.

Features for the meta-label model should include:
- The primary model's **predicted probability** as a feature (the model's own confidence about direction)
- All the same market features as the primary model
- Additional regime features not in the primary model

```python
def _record_meta_features(self, direction: int) -> None:
    primary_confidence = self._primary_model_confidence()  # from model 1
    self.record_features({
        "primary_confidence": primary_confidence,  # key meta-feature
        "adx_centered":       ...,
        "atr_pct":            ...,
        # ...
    })
```

See [Deploying in a Strategy](/docs/research/ml/deploying) for patterns on how to load and call two models in the same strategy.

## Iterating after deployment

After running a deploy-mode backtest, compare its metrics against the unfiltered baseline:

| Metric | What to look for |
|---|---|
| Win rate | Should be higher — fewer but better trades |
| Total trades | Will be lower — the model filters some out |
| Sharpe ratio | Should improve — fewer losing trades reduce drawdown sequences |
| Max drawdown | Should decrease — same reason |
| Annual return | May increase or decrease depending on which trades the model filters |

If the deploy-mode backtest does not improve over the baseline:

1. **Check the threshold** — try the operating point from the Precision vs Threshold table rather than a round number. A threshold that produces 73% precision at 3.5% coverage is far better than 51% at 100%.
2. **Check probability calibration** — if the model is miscalibrated, the confidence-based sizing will hurt rather than help. Wrap the estimator in `CalibratedClassifierCV` if needed.
3. **Check feature quality** — use the Feature Impact table to drop noisy features. A small set of 5–8 strong features often beats 20 weak ones.
4. **Add market-regime features** — volatility regime, higher-timeframe trend, and time-of-day are often the most predictive for when a signal works vs. fails.
5. **Gather more data** — extend the date range to cover multiple market cycles (bull, bear, sideways). A meta-model trained only on a bull market will fail in a bear market.
6. **Try a different estimator** — if Gradient Boosting plateaus, try `HistGradientBoostingClassifier` (faster, handles large datasets better) or `XGBClassifier`.
7. **Reconsider the primary signal** — if the primary signal has no real edge, no amount of meta-labeling will rescue it. Meta-labeling amplifies an existing edge; it cannot create one where none exists.
