# Deploying in a Strategy

Once you have trained and saved a model, the final step is to load it inside your strategy and use it to filter or score signals in both backtesting and live trading. The deploy-mode workflow is identical for all three task types — only the way you interpret the model's output differs.

## Overview

Switching your strategy from gather mode to deploy mode requires three things:

1. Set `self.ml_mode = "deploy"` (it defaults to `"gather"` automatically — no class-level declaration needed)
2. Load the model lazily on first use via `load_ml_model`
3. Call the model in `should_long` / `should_short` (or wherever you use it) and act on its output

Nothing else in the strategy needs to change. The entry logic, position sizing, and exit rules remain exactly the same.

## load_ml_model

There are two forms of this function depending on where you call it from.

### Inside a strategy: `self.load_ml_model()`

Call `self.load_ml_model()` with no arguments. It automatically locates the strategy's own directory, loads `model.pkl`, `scaler.pkl`, and (if present) `feature_importance.pkl` from it, and stores them directly on the instance. It returns **`None`**.

After the call, the following attributes are available on the instance:
- `self._ml_model` — the fitted estimator
- `self._ml_scaler` — the fitted `StandardScaler`
- `self._ml_feature_importance` — feature importance dict, or `None` if the file was not found

```python
def _ml_confidence(self) -> float:
    self.load_ml_model()   # idempotent — loads once, then no-op
    feats = self._build_features()
    keys  = sorted(feats.keys())
    X     = np.array([[feats[k] for k in keys]])
    return float(self._ml_model.predict_proba(
        self._ml_scaler.transform(X)
    )[0, 1])
```

::: tip
`self.load_ml_model()` is **idempotent** — subsequent calls return immediately without re-reading from disk once the model is cached. Call it at the top of any inference method; no extra `if self._ml_model is None` guard is needed.

The directory is resolved automatically from the strategy's own file path. You never need to pass a path or import `os`.

No class-level `_ml_model = None` declarations are needed — `Strategy.__init__` already initialises `self._ml_model`, `self._ml_scaler`, and `self._ml_feature_importance` to `None`.
:::

### Outside a strategy: `load_ml_model(directory)`

If you need to load a model from an arbitrary directory outside a strategy (e.g. in a script or Jupyter notebook), use the standalone function:

```python
from jesse.research import load_ml_model

artefacts = load_ml_model("/path/to/strategies/MyStrategy")
model     = artefacts["model"]
scaler    = artefacts["scaler"]
fi        = artefacts.get("feature_importance")   # None if file not present
```

**Returns** `dict` with keys:
- `model` — the fitted estimator
- `scaler` — the fitted `StandardScaler`
- `feature_importance` — feature importance dict (only present if `feature_importance.pkl` exists)

## Feature array column order

::: warning
The feature array you build at inference time **must have columns in exactly the same order** as during training. `train_model` sorts feature names alphabetically when it builds the training matrix. Your deploy-mode feature array must follow that same alphabetical order.

The safest approach is to comment each row with the feature name, making the mapping visible and verifiable at a glance. If you record 19 features at gather time, the deploy array must also have exactly those 19 columns in the same alphabetical order — even a single omission or transposition will silently produce wrong predictions.
:::

For example, if you recorded these features during gather:

```python
self.record_features({
    "rsi_centered":    ...,
    "atr_pct":         ...,
    "ema9_dist":       ...,
    "supertrend_dist": ...,
    "adx_centered":    ...,
})
```

`train_model` sorted them alphabetically, so the training matrix columns were:

```
adx_centered, atr_pct, ema9_dist, rsi_centered, supertrend_dist
```

Your deploy-mode array must match that order exactly.

## Binary classification deploy pattern

For `task="binary"` the model outputs a probability between 0 and 1. Use a threshold to decide whether to allow the signal through.

```python
import numpy as np
import jesse.indicators as ta
from jesse import utils
from jesse.strategies import Strategy


class MyStrategy(Strategy):
    ML_THRESHOLD = 0.62      # minimum confidence to allow a trade

    # ────────────────────────────────────────────────────────────────────────
    # Inference
    # ────────────────────────────────────────────────────────────────────────

    def _ml_confidence(self) -> float:
        """Return the model's probability that this signal is the positive class."""
        self.load_ml_model()
        atr   = ta.atr(self.candles) + 1e-9
        price = self.price

        # Columns in alphabetical order: adx_centered, atr_pct, ema9_dist,
        #                                rsi_centered, supertrend_dist
        features = np.array([[
            (float(ta.adx(self.candles)) - 25) / 25,                   # adx_centered
            atr / price,                                                  # atr_pct
            (price - ta.ema(self.candles, 9)) / (ta.ema(self.candles, 9) + 1e-9),  # ema9_dist
            (float(ta.rsi(self.candles)) - 50) / 50,                    # rsi_centered
            (price - ta.supertrend(self.candles).trend) / atr,          # supertrend_dist
        ]])
        X_scaled = self._ml_scaler.transform(features)
        return float(self._ml_model.predict_proba(X_scaled)[0, 1])

    # ────────────────────────────────────────────────────────────────────────
    # Entry
    # ────────────────────────────────────────────────────────────────────────

    def should_long(self) -> bool:
        # Check the primary signal first — only call the model when the signal
        # fires.  Calling the model on every bar wastes CPU and adds latency.
        signal = (
            ta.supertrend(self.candles).trend < self.price
            and ta.adx(self.candles) > 25
        )
        if not signal:
            return False
        if self.ml_mode == "deploy":
            return self._ml_confidence() >= self.ML_THRESHOLD
        return True

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
```

::: tip
Always check the primary signal **before** calling the model. The model call involves a `StandardScaler.transform` + `predict_proba` on every invocation. If `should_long` calls the model unconditionally on every bar, it runs thousands of times per backtest for no benefit. Only call the model when the primary signal condition is already satisfied.
:::

## Multiclass classification deploy pattern

For `task="multiclass"` the model's `predict_proba` returns a probability for each class. Use `model.classes_` to map probabilities to their class labels.

```python
def _ml_probabilities(self) -> dict:
    """Return a dict of {class_label: probability}."""
    self.load_ml_model()
    # Build features in alphabetical column order — same as gather time
    features = np.array([[
        ...   # same columns as during gather, alphabetical
    ]])
    X_scaled = self._ml_scaler.transform(features)
    probs    = self._ml_model.predict_proba(X_scaled)[0]
    classes  = self._ml_model.classes_
    return {int(cls): float(p) for cls, p in zip(classes, probs)}

def should_long(self) -> bool:
    if self.ml_mode != "deploy":
        return self._your_entry_signal()

    probs   = self._ml_probabilities()
    prob_up = probs.get(1, 0.0)
    prob_dn = probs.get(-1, 0.0)

    # Enter long only when the model strongly favours the +1 class
    return (
        self._your_entry_signal()
        and prob_up >= 0.50
        and prob_up > prob_dn * 1.2   # at least 20% more confident than the short direction
    )

def should_short(self) -> bool:
    # Check primary signal first before calling the model
    if not self._your_short_signal():
        return False
    if self.ml_mode != "deploy":
        return True

    probs   = self._ml_probabilities()
    prob_dn = probs.get(-1, 0.0)
    prob_up = probs.get(1, 0.0)
    return prob_dn >= 0.50 and prob_dn > prob_up * 1.2
```

## Regression deploy pattern

For `task="regression"` the model's `predict` returns a scalar. Use it for signal gating, position sizing, or signal ranking.

### Signal gating

```python
def _ml_predicted_return(self) -> float:
    self.load_ml_model()
    # Build features in alphabetical column order — same as gather time
    features = np.array([[
        ...   # alphabetical order
    ]])
    X_scaled = self._ml_scaler.transform(features)
    return float(self._ml_model.predict(X_scaled)[0])

def should_long(self) -> bool:
    # Check primary signal first — only call the model when it fires
    if not self._your_entry_signal():
        return False
    if self.ml_mode == "deploy":
        return self._ml_predicted_return() > 0.002
    return True
```

### Volatility-adjusted position sizing

```python
def go_long(self):
    entry          = self.price
    stop           = entry - ta.atr(self.candles) * 2.5
    predicted_ret  = self._ml_predicted_return() if self.ml_mode == "deploy" else 0.002
    # Scale between 0.5× and 2× of base risk
    risk_pct       = max(0.5, min(2.0, predicted_ret / 0.002)) * 2.0
    qty            = utils.risk_to_qty(
        self.available_margin, risk_pct, entry, stop, fee_rate=self.fee_rate
    )
    self.buy = qty, entry
```

## Performance considerations

### Lazy loading

Always load the model lazily (on first use) rather than in `__init__`. Jesse instantiates strategy classes during import and configuration steps where file I/O should not occur.

Call `self.load_ml_model()` at the top of any inference method. It is **idempotent** — it skips loading on every subsequent call once the model is already cached on the instance, so there is no performance cost to calling it on every bar:

```python
def _ml_confidence(self) -> float:
    self.load_ml_model()   # no-op after the first bar
    ...
```

No class-level `_ml_model = None` declarations are needed — `Strategy.__init__` already initialises `self._ml_model`, `self._ml_scaler`, and `self._ml_feature_importance` to `None`.

### Inference cost

- **SVM** — inference is fast (microseconds per prediction) even without GPU.
- **Random Forest / XGBoost** — also fast; 300-tree forests typically predict in < 1ms.
- **Neural networks** — if you use a PyTorch or TensorFlow model wrapped in an sklearn interface, ensure it runs on CPU and the batch size is 1.

In live trading, `should_long` is called on every new candle. Keep your feature computation and inference lightweight:

- Pre-compute values you reuse (e.g. ATR, EMA) as `@property` methods rather than recomputing them multiple times per bar.
- Only call the model **after** the primary signal condition is satisfied — not on every bar unconditionally.
- Avoid calling `ta.` functions with large period arguments (e.g. `ta.ema(candles, 200)`) inside the inference method if you can cache them as a property.

### Consistent feature computation

The scaler's `mean_` and `scale_` parameters were computed on the **training data distribution**. Features in deploy mode must be computed **identically** to how they were computed during gather — same indicator period, same normalisation formula, same column order. Even a small discrepancy (e.g. forgetting a `+ 1e-9` guard) will shift the scaled values and silently degrade predictions.

A practical way to keep gather and deploy feature computation in sync is to extract the feature-building logic into a single `_build_features(self) -> dict` method and call it from both gather mode and deploy mode. The deploy mode sorts the dict keys alphabetically to build the inference array.

::: warning
If you want to include a feature that is only available at gather time (e.g. `"side"` indicating long vs short) you must **always** include it in `_build_features` and pass a meaningful value in deploy mode too — otherwise the training and inference arrays will have different column counts and the model will produce wrong predictions. In the example below, `"side"` is always in `_build_features`, and the caller sets it based on context.
:::

```python
def _build_features(self, side: int) -> dict:
    atr   = ta.atr(self.candles) + 1e-9
    price = self.price
    return {
        "adx_centered":    (float(ta.adx(self.candles)) - 25) / 25,
        "atr_pct":         atr / price,
        "rsi_centered":    (float(ta.rsi(self.candles)) - 50) / 50,
        "side":            float(side),   # +1 = long signal, -1 = short signal
        "supertrend_dist": (price - ta.supertrend(self.candles).trend) / atr,
    }

def _record_features(self, side: int) -> None:
    if self.ml_mode == "gather":
        self.record_features(self._build_features(side))

def should_long(self) -> bool:
    signal = ta.supertrend(self.candles).trend < self.price and ta.adx(self.candles) > 25
    if signal:
        self._record_features(1)
    return signal

def should_short(self) -> bool:
    signal = ta.supertrend(self.candles).trend > self.price and ta.adx(self.candles) > 25
    if signal:
        self._record_features(-1)
    return signal

# Deploy mode — sort keys alphabetically to match training column order
def _ml_confidence(self, side: int) -> float:
    self.load_ml_model()
    feats = self._build_features(side)
    keys  = sorted(feats.keys())   # alphabetical — must match training
    X     = np.array([[feats[k] for k in keys]])
    return float(self._ml_model.predict_proba(
        self._ml_scaler.transform(X)
    )[0, 1])
```

This pattern eliminates the risk of divergence between gather and deploy feature computation.

## Complete deploy-mode strategy template

This template uses the **shared `_build_features` method** pattern to guarantee gather and deploy feature computation stay in sync. Notice that `_build_features` always accepts `side` so the column count is identical at gather time and inference time.

```python
import numpy as np
import jesse.indicators as ta
from jesse import utils
from jesse.strategies import Strategy


class MyStrategy(Strategy):
    ML_THRESHOLD = 0.62

    # ── shared feature builder (used by both gather and deploy) ──────────────

    def _build_features(self, side: int) -> dict:
        """Build features dict. side: +1 = long signal, -1 = short signal."""
        atr   = ta.atr(self.candles) + 1e-9
        price = self.price
        ema9  = ta.ema(self.candles, 9) + 1e-9
        return {
            "adx_centered":    (float(ta.adx(self.candles)) - 25) / 25,
            "atr_pct":         atr / price,
            "ema9_dist":       (price - ema9) / ema9,
            "rsi_centered":    (float(ta.rsi(self.candles)) - 50) / 50,
            "side":            float(side),   # +1 = long, -1 = short
            "supertrend_dist": (price - ta.supertrend(self.candles).trend) / atr,
        }

    def _ml_confidence(self, side: int) -> float:
        """Return probability that this signal is the positive class."""
        self.load_ml_model()
        feats = self._build_features(side)
        # Sort keys alphabetically — must match the order used during training
        keys  = sorted(feats.keys())
        X     = np.array([[feats[k] for k in keys]])
        return float(self._ml_model.predict_proba(
            self._ml_scaler.transform(X)
        )[0, 1])

    # ── entry / exit ─────────────────────────────────────────────────────────

    @property
    def _primary_signal_long(self) -> bool:
        return (
            ta.supertrend(self.candles).trend < self.price
            and ta.adx(self.candles) > 25
        )

    @property
    def _primary_signal_short(self) -> bool:
        return (
            ta.supertrend(self.candles).trend > self.price
            and ta.adx(self.candles) > 25
        )

    def should_long(self) -> bool:
        # Always check primary signal first — only call model when it fires
        if not self._primary_signal_long:
            return False
        if self.ml_mode == "gather":
            self.record_features(self._build_features(1))
            return True
        return self._ml_confidence(1) >= self.ML_THRESHOLD

    def should_short(self) -> bool:
        if not self._primary_signal_short:
            return False
        if self.ml_mode == "gather":
            self.record_features(self._build_features(-1))
            return True
        return False   # short disabled in deploy; enable when you have a short model

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

`_build_features` is called identically from gather mode (inside `should_long`/`should_short`) and from `_ml_confidence` in deploy mode. The dict keys are sorted alphabetically inside `_ml_confidence` — the same sort that `train_model` applies internally when constructing the training matrix. Because `side` is always passed to `_build_features`, the column count is the same at both gather and inference time.

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
