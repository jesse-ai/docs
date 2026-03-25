# Deploying in a Strategy

Once you have trained and saved a model, the final step is to load it inside your strategy and use it to filter or score signals in both backtesting and live trading. The deploy-mode workflow is identical for all three task types — only the way you interpret the model's output differs.

## Overview

Switching your strategy from gather mode to deploy mode requires two things:

1. Set `self.ml_mode = "deploy"` (it defaults to `"gather"` automatically — no class-level declaration needed)
2. Call `ml_predict()` or `ml_predict_proba()` in `should_long()` / `should_short()` and act on the output

Nothing else in the strategy needs to change. The entry logic, position sizing, and exit rules remain exactly the same.

## ml_features()

Before calling `ml_predict()` or `ml_predict_proba()`, your strategy must override `ml_features()`. This is the single source of truth for feature computation — the framework calls it automatically during inference. 

```python
def ml_features(self) -> dict:
    atr   = ta.atr(self.candles) + 1e-9
    price = self.price
    return {
        "adx_centered":    (float(ta.adx(self.candles)) - 25) / 25,
        "atr_pct":         atr / price,
        "ema9_dist":       (price - ta.ema(self.candles, 9)) / (ta.ema(self.candles, 9) + 1e-9),
        "rsi_centered":    (float(ta.rsi(self.candles)) - 50) / 50,
        "supertrend_dist": (price - ta.supertrend(self.candles).trend) / atr,
    }
```

::: tip
Feature names are sorted alphabetically when building the inference array — exactly the same sort that `train_model` applies when constructing the training matrix. This happens automatically inside `ml_predict()` and `ml_predict_proba()`. You never have to worry about column order. However, you need to use the same feature names in both "gather" and "deploy" modes.
:::

`ml_features()` is also the method you call from gather mode when recording data:

```python
if self.ml_mode == "gather":
    self.record_features(self.ml_features())
```

Because both gather and deploy go through the same `ml_features()`, train/deploy feature skew is impossible.

## ml_predict_proba()

For **classification** models (binary or multiclass). Returns a `dict` of `{class_label: probability}`.

```python
probs = self.ml_predict_proba()
# Binary:     {0: 0.38, 1: 0.62}
# Multiclass: {-1: 0.21, 0: 0.31, 1: 0.48}
```

The model is loaded lazily on the first call and cached for the lifetime of the strategy instance — there is no overhead on subsequent calls.

## ml_predict()

For **regression** models. Returns the model's scalar prediction as a `float`.

```python
predicted_return = self.ml_predict()   # e.g. 0.0043
```

## Binary classification deploy pattern

For `task="binary"` the model outputs a probability between 0 and 1. Use a threshold to decide whether to allow the signal through.

```python
import jesse.indicators as ta
from jesse import utils
from jesse.strategies import Strategy


class MyStrategy(Strategy):
    ML_THRESHOLD = 0.62      # minimum confidence to allow a trade

    def ml_features(self) -> dict:
        atr   = ta.atr(self.candles) + 1e-9
        price = self.price
        return {
            "adx_centered":    (float(ta.adx(self.candles)) - 25) / 25,
            "atr_pct":         atr / price,
            "ema9_dist":       (price - ta.ema(self.candles, 9)) / (ta.ema(self.candles, 9) + 1e-9),
            "rsi_centered":    (float(ta.rsi(self.candles)) - 50) / 50,
            "supertrend_dist": (price - ta.supertrend(self.candles).trend) / atr,
        }

    def should_long(self) -> bool:
        # Check primary signal first — only call the model when it fires
        signal = (
            ta.supertrend(self.candles).trend < self.price
            and ta.adx(self.candles) > 25
        )
        if not signal:
            return False
        if self.ml_mode == "gather":
            self.record_features(self.ml_features())
            return True
        # Deploy: gate on model confidence
        return self.ml_predict_proba().get(1, 0.0) >= self.ML_THRESHOLD

    def should_short(self) -> bool:
        return False

    def should_cancel_entry(self) -> bool:
        return True

    def go_long(self):
        entry = self.price
        stop  = entry - ta.atr(self.candles) * 2.5
        qty   = utils.risk_to_qty(
            self.available_margin, 2, entry, stop, fee_rate=self.fee_rate
        )
        self.buy = qty, entry

    def on_close_position(self, order, closed_trade) -> None:
        if self.ml_mode != "gather":
            return
        self.record_label("profitable", closed_trade.pnl > 0)
```

::: tip
Always check the primary signal **before** calling the model. `ml_predict_proba()` runs a `StandardScaler.transform` + `predict_proba` on every invocation. If `should_long` calls the model unconditionally on every bar, it runs thousands of times per backtest for no benefit. Only call it when the primary condition is already satisfied.
:::

## Multiclass classification deploy pattern

For `task="multiclass"` the model returns a probability for each class. Use `.get(label, 0.0)` to safely retrieve the probability of any class.

```python
import jesse.indicators as ta
import numpy as np
from jesse.strategies import Strategy


class MyStrategy(Strategy):
    ML_LONG_THRESHOLD  = 0.45
    ML_SHORT_THRESHOLD = 0.45

    def ml_features(self) -> dict:
        atr   = ta.atr(self.candles) + 1e-9
        price = self.price

        ema9  = ta.ema(self.candles, 9)  + 1e-9
        ema21 = ta.ema(self.candles, 21) + 1e-9
        ema50 = ta.ema(self.candles, 50) + 1e-9

        closes    = self.candles[:, 2]
        log_ret_1 = float(np.log(closes[-1] / closes[-2])) if closes[-2] != 0 else 0.0
        log_ret_5 = float(np.log(closes[-1] / closes[-6])) if len(closes) >= 6 and closes[-6] != 0 else 0.0

        keltner   = ta.keltner(self.candles)
        keltner_w = (keltner.upperband - keltner.lowerband) + 1e-9

        return {
            "adx_centered":    (float(ta.adx(self.candles)) - 25) / 25,
            "atr_pct":         atr / price,
            "ema21_50_ratio":  (ema21 - ema50) / ema50,
            "ema9_21_ratio":   (ema9  - ema21) / ema21,
            "ema9_dist":       (price - ema9)  / ema9,
            "keltner_pos":     (price - keltner.lowerband) / keltner_w,
            "log_return_1":    log_ret_1,
            "log_return_5":    log_ret_5,
            "rsi_centered":    (float(ta.rsi(self.candles)) - 50) / 50,
            "supertrend_dist": (price - ta.supertrend(self.candles).trend) / atr,
        }

    def should_long(self) -> bool:
        if self.ml_mode == "gather":
            return False   # no real trades in gather mode (triple-barrier pattern)

        probs   = self.ml_predict_proba()
        prob_up = probs.get(1, 0.0)
        prob_dn = probs.get(-1, 0.0)
        return prob_up >= self.ML_LONG_THRESHOLD and prob_up > prob_dn * 1.2

    def should_short(self) -> bool:
        if self.ml_mode == "gather":
            return False

        probs   = self.ml_predict_proba()
        prob_dn = probs.get(-1, 0.0)
        prob_up = probs.get(1, 0.0)
        return prob_dn >= self.ML_SHORT_THRESHOLD and prob_dn > prob_up * 1.2
```

## Regression deploy pattern

For `task="regression"` the model returns a scalar. Use it for signal gating, position sizing, or signal ranking.

### Signal gating

```python
def should_long(self) -> bool:
    if self.ml_mode != "deploy":
        return False
    return self.ml_predict() > self.ENTRY_THRESHOLD

def should_short(self) -> bool:
    if self.ml_mode != "deploy":
        return False
    return self.ml_predict() < -self.ENTRY_THRESHOLD
```

### Volatility-adjusted position sizing

```python
def go_long(self):
    entry         = self.price
    stop          = entry - ta.atr(self.candles) * 2.5
    predicted_ret = self.ml_predict() if self.ml_mode == "deploy" else self.ENTRY_THRESHOLD
    # Scale between 0.5× and 2× of base risk proportional to predicted magnitude
    scale         = max(0.5, min(2.0, predicted_ret / max(self.ENTRY_THRESHOLD, 1e-9)))
    risk_pct      = self.BASE_RISK_PCT * scale
    qty           = utils.risk_to_qty(
        self.available_margin, risk_pct, entry, stop, fee_rate=self.fee_rate
    )
    self.buy         = qty, entry
    self.stop_loss   = qty, stop
    self.take_profit = qty, entry + ta.atr(self.candles) * 5.0
```

## Performance considerations

### Lazy loading

The model is loaded from disk on the first call to `ml_predict()` or `ml_predict_proba()` and then cached for the lifetime of the strategy instance. Every subsequent call is a no-op for the loading step. There is no performance cost to calling these methods on every bar.

Never load the model in `__init__`. Jesse instantiates strategy classes during import and configuration steps where file I/O should not occur.

### Inference cost

- **SVM** — inference is fast (microseconds per prediction).
- **Random Forest / XGBoost** — also fast; 300-tree forests typically predict in < 1ms.

In live trading, `should_long` is called on every new candle (Unless when there are no open positions or orders). Keep your feature computation and inference lightweight:

- Pre-compute values you reuse (e.g. ATR, EMA) as `@property` methods rather than recomputing them multiple times per bar.
- Only call `ml_predict()` / `ml_predict_proba()` **after** the primary signal condition is satisfied — not on every bar unconditionally.

## Complete deploy-mode strategy template

This template shows all three modes cleanly integrated: gather via the triple-barrier loop, deploy via `ml_predict_proba()`. `ml_features()` is defined once and used by both.

```python
import numpy as np
import jesse.indicators as ta
from jesse import utils
from jesse.strategies import Strategy


class MyStrategy(Strategy):
    ML_LONG_THRESHOLD  = 0.45
    ML_SHORT_THRESHOLD = 0.45
    vertical_barrier   = 50
    ATR_MULTIPLIER     = 2.0

    _features_recorded = False
    _record_index      = 0
    _barrier_upper     = None
    _barrier_lower     = None

    # ── single source of truth for features ──────────────────────────────────

    def ml_features(self) -> dict:
        atr   = ta.atr(self.candles) + 1e-9
        price = self.price
        ema9  = ta.ema(self.candles, 9)  + 1e-9
        ema21 = ta.ema(self.candles, 21) + 1e-9
        ema50 = ta.ema(self.candles, 50) + 1e-9

        closes    = self.candles[:, 2]
        log_ret_1 = float(np.log(closes[-1] / closes[-2])) if closes[-2] != 0 else 0.0
        log_ret_5 = float(np.log(closes[-1] / closes[-6])) if len(closes) >= 6 and closes[-6] != 0 else 0.0

        keltner   = ta.keltner(self.candles)
        keltner_w = (keltner.upperband - keltner.lowerband) + 1e-9

        return {
            "adx_centered":    (float(ta.adx(self.candles)) - 25) / 25,
            "atr_pct":         atr / price,
            "ema21_50_ratio":  (ema21 - ema50) / ema50,
            "ema9_21_ratio":   (ema9  - ema21) / ema21,
            "ema9_dist":       (price - ema9)  / ema9,
            "keltner_pos":     (price - keltner.lowerband) / keltner_w,
            "log_return_1":    log_ret_1,
            "log_return_5":    log_ret_5,
            "rsi_centered":    (float(ta.rsi(self.candles)) - 50) / 50,
            "supertrend_dist": (price - ta.supertrend(self.candles).trend) / atr,
        }

    # ── deploy-mode entry ─────────────────────────────────────────────────────

    def should_long(self) -> bool:
        if self.ml_mode == "gather":
            return False
        probs   = self.ml_predict_proba()
        prob_up = probs.get(1, 0.0)
        prob_dn = probs.get(-1, 0.0)
        return prob_up >= self.ML_LONG_THRESHOLD and prob_up > prob_dn * 1.2

    def should_short(self) -> bool:
        if self.ml_mode == "gather":
            return False
        probs   = self.ml_predict_proba()
        prob_dn = probs.get(-1, 0.0)
        prob_up = probs.get(1, 0.0)
        return prob_dn >= self.ML_SHORT_THRESHOLD and prob_dn > prob_up * 1.2

    def go_long(self) -> None:
        entry = self.price
        dist  = ta.atr(self.candles) * self.ATR_MULTIPLIER
        qty   = utils.risk_to_qty(self.available_margin, 2, entry, entry - dist, fee_rate=self.fee_rate)
        self.buy         = qty, entry
        self.stop_loss   = qty, entry - dist
        self.take_profit = qty, entry + dist

    def go_short(self) -> None:
        entry = self.price
        dist  = ta.atr(self.candles) * self.ATR_MULTIPLIER
        qty   = utils.risk_to_qty(self.available_margin, 2, entry, entry + dist, fee_rate=self.fee_rate)
        self.sell        = qty, entry
        self.stop_loss   = qty, entry + dist
        self.take_profit = qty, entry - dist

    # ── gather-mode triple-barrier loop ──────────────────────────────────────

    def before(self) -> None:
        if self.ml_mode != "gather":
            return

        if not self._features_recorded:
            self.record_features(self.ml_features())   # same method, gather mode
            dist = ta.atr(self.candles) * self.ATR_MULTIPLIER
            self._barrier_upper     = self.price + dist
            self._barrier_lower     = self.price - dist
            self._record_index      = self.index
            self._features_recorded = True
            return

        upper_hit    = self.price >= self._barrier_upper
        lower_hit    = self.price <= self._barrier_lower
        vertical_hit = (self.index - self._record_index) >= self.vertical_barrier

        if upper_hit or lower_hit or vertical_hit:
            label = 1 if upper_hit else (-1 if lower_hit else 0)
            self.record_label("triple_barrier", label)
            self._features_recorded = False
            self._barrier_upper     = None
            self._barrier_lower     = None
```

Notice that `ml_features()` is called identically from `before()` (gather mode) and from `should_long()` / `should_short()` (deploy mode via `ml_predict_proba()`). There is no separate `_build_features` helper, no manual scaler call, and no numpy array construction in user code.

## Iterating after deployment

After running a deploy-mode backtest, compare its metrics against the unfiltered (gather-mode) backtest:

| Metric | What to look for |
|---|---|
| Win rate | Should be higher — fewer but better trades |
| Total trades | Will be lower — the model filters some out |
| Sharpe ratio | Should improve — better quality trades improve risk-adjusted return |
| Max drawdown | Should decrease — filtering losing trades reduces drawdown sequences |
| Annual return | May increase or decrease depending on how many winning trades were also filtered |

If the deploy-mode backtest does not improve meaningfully over the baseline:

1. **Check feature quality** — use the Feature Importance and Feature Impact tables to drop noisy features and add more informative ones
2. **Lower or raise the threshold** — the Precision vs Threshold sweep shows the trade-off between precision and coverage; try several values
3. **Try a different estimator** — if SVM plateaus, try Random Forest or XGBoost
4. **Gather more data** — a longer historical window gives the model more examples of each market regime
5. **Reconsider the label** — if the label is too noisy (e.g. raw P&L with no minimum return filter), the model has nothing reliable to learn from
