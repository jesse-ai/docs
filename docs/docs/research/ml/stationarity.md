# Stationarity

Before feeding any data into a machine learning model, one of the most important preprocessing steps is ensuring your features are **stationary**. Failing to do this is one of the most common — and most damaging — mistakes in financial ML.

## What is stationarity?

A time series is stationary when its **statistical properties do not change over time**. More precisely, a stationary series has:

- A **constant mean** — it doesn't drift up or down over time
- A **constant variance** — the spread of values doesn't widen or narrow over time
- **No seasonality or trend** — there is no systematic pattern that depends on time itself

A non-stationary series, by contrast, has statistical properties that vary with time. Its mean, variance, or both are functions of time rather than constants.

::: tip Intuition
Think of it this way: if you trained your model on BTC price data from 2019 (when BTC was around $4,000) and then tried to use it in 2024 (when BTC is around $60,000), the raw price values mean completely different things. The model learned patterns tied to a specific numerical range that no longer exists. A stationary transformation like the percentage distance from a moving average, on the other hand, means roughly the same thing in both years.
:::

## Why does it matter for ML?

Machine learning models are pattern-recognition engines. They assume that the statistical relationships they learn from training data will hold during inference. When your input features are non-stationary:

1. **The model learns spurious correlations** — it confuses long-run trends with genuine predictive signals. A rising price series and a rising interest rate series will both trend upward together even if they are causally unrelated, leading the model to treat the trend itself as a signal.

2. **Training and inference distributions diverge** — the numerical range seen during training is different from the range seen at inference time. Most scalers (like `StandardScaler`) and most algorithms silently extrapolate outside the training distribution, producing unreliable outputs.

3. **Metrics are misleading** — high accuracy or low error on a validation set may simply reflect the model learning to follow a trend that happened to be present across both splits, not a genuine predictive edge. Once the trend reverses, the model fails.

4. **Feature importance is distorted** — non-stationary features tend to dominate importance rankings simply because they carry the most variance. This crowds out genuinely predictive but lower-variance features.

5. **The model cannot generalise across market regimes** — a model trained during a bull market on raw prices will have learned nothing useful about bear markets, simply because the price levels were different.

The core principle is: **the model must see the same kind of data at inference time as it saw during training**. Stationary features satisfy this because they are defined relative to current conditions rather than anchored to an absolute scale.

## Non-stationary features and their stationary alternatives

The table below shows the most common raw financial quantities and how to transform them into stationary counterparts.

| Raw (non-stationary) | Stationary alternative | Notes |
|---|---|---|
| Raw price (`close`) | Log return: `log(P_t / P_{t-1})` | Removes trend; small values behave linearly |
| Raw price | % distance from moving average: `(P - EMA) / EMA` | Expresses price in relative terms |
| Raw ATR | ATR as a fraction of price: `ATR / P` | Makes volatility regime-independent |
| Raw volume | Volume z-score or log ratio vs rolling mean | Normalises across low/high-volume periods |
| RSI (raw 0–100) | RSI centered: `(RSI - 50) / 50` | Maps to `[−1, 1]`; mean-reverts around 0 |
| Raw spread | Spread as a fraction of price: `spread / P` | Absolute spread grows with price level |
| Bollinger Band position (raw price) | `(P - lower) / (upper - lower)` | Maps to `[0, 1]` regardless of price level |
| Cumulative PnL | Per-trade return `%` or log return | Cumulative values drift and are non-stationary by design |

## Examples

### Raw close price vs. log return

Raw close price is the most obviously non-stationary series in finance. It trends, it has a growing variance, and it is anchored to an absolute scale that has no meaning across time.

**Wrong:**
```/dev/null/example.py#L1-5
self.record_features({
    # Non-stationary: the model learns that "price = 30000" predicts X,
    # which is meaningless when price is 80000 two years later.
    "close": self.close,
})
```

**Correct:**
```/dev/null/example.py#L1-9
import numpy as np

self.record_features({
    # Stationary: the model learns that "price moved +0.3% this bar"
    # predicts X, which is meaningful at any price level.
    "log_return_1": float(np.log(self.candles[-1, 2] / self.candles[-2, 2])),
    "log_return_5": float(np.log(self.candles[-1, 2] / self.candles[-6, 2])),
})
```

### Raw ATR vs. ATR as a fraction of price

Raw ATR grows proportionally with price. A 500-point ATR in 2019 (when BTC is at $4,000) represents 12.5% volatility. The same 500-point ATR in 2024 (when BTC is at $60,000) represents less than 1% volatility. The model cannot distinguish these two regimes if it sees raw ATR.

**Wrong:**
```/dev/null/example.py#L1-7
import jesse.indicators as ta

self.record_features({
    # Non-stationary: a raw ATR of 800 means very different things
    # depending on the absolute price level at the time.
    "atr": ta.atr(self.candles),
})
```

**Correct:**
```/dev/null/example.py#L1-9
import jesse.indicators as ta

self.record_features({
    # Stationary: expresses ATR as a fraction of current price.
    # An ATR of 1.5% is 1.5% at any price level, in any year.
    "atr_pct": ta.atr(self.candles) / self.price,
})
```

### Raw RSI vs. centered RSI

RSI is already bounded to `[0, 100]`, so it does not drift indefinitely. But it is not centred around zero, which means most ML models have to waste capacity just learning about this offset. Centring it maps the neutral zone (50) to 0, overbought territory to positive values, and oversold territory to negative values — matching the sign convention most models work well with.

**Acceptable but not ideal:**
```/dev/null/example.py#L1-6
import jesse.indicators as ta

self.record_features({
    # Bounded, but biased: the midpoint of 50 becomes a learned constant,
    # not a natural zero.
    "rsi": ta.rsi(self.candles),
})
```

**Better:**
```/dev/null/example.py#L1-8
import jesse.indicators as ta

self.record_features({
    # Stationary and zero-centred: 0 = neutral, +1 = fully overbought,
    # -1 = fully oversold. Clean sign semantics.
    "rsi_centered": (ta.rsi(self.candles) - 50) / 50,
})
```

### Raw price vs. distance from a moving average

Instead of using the raw price as a feature, express it as its relative deviation from a reference level such as a moving average. This captures the same "mean reversion" information but in a form that is scale-invariant.

**Wrong:**
```/dev/null/example.py#L1-5
import jesse.indicators as ta

self.record_features({
    "ema200": ta.ema(self.candles, 200),   # Non-stationary: drifts with price
    "close":  self.close,                  # Non-stationary: same problem
})
```

**Correct:**
```/dev/null/example.py#L1-9
import jesse.indicators as ta

self.record_features({
    # Stationary: +0.05 means "price is 5% above its 200-bar EMA".
    # This means the same thing regardless of the absolute price level.
    "ema200_dist": (self.price - ta.ema(self.candles, 200)) / ta.ema(self.candles, 200),
})
```

### Bollinger Band position

Bollinger Bands give you upper and lower channel boundaries. The raw band values are non-stationary because they track price. But the *position* of price within the bands is stationary — it always lives in roughly `[0, 1]`.

**Wrong:**
```/dev/null/example.py#L1-7
import jesse.indicators as ta

bb = ta.bollinger_bands(self.candles)
self.record_features({
    "bb_upper": bb.upperband,   # Non-stationary: tracks price level
    "bb_lower": bb.lowerband,   # Non-stationary: tracks price level
})
```

**Correct:**
```/dev/null/example.py#L1-11
import jesse.indicators as ta

bb = ta.bollinger_bands(self.candles)
bandwidth = bb.upperband - bb.lowerband + 1e-9   # avoid divide-by-zero

self.record_features({
    # Stationary: 0.0 = at the lower band, 1.0 = at the upper band,
    # 0.5 = at the midline. Regime-invariant.
    "bb_position": (self.price - bb.lowerband) / bandwidth,
})
```

## A quick self-check

Before finalising your feature set, ask these questions about each feature:

1. **If I doubled all prices in my training data, would this feature's values change?** If yes, it is non-stationary.
2. **Does this feature have a visible upward or downward trend when I plot it over several years?** If yes, it is non-stationary.
3. **Is the feature expressed in absolute price or volume units?** If yes, make it relative.
4. **Is the feature an open-ended accumulator (cumulative return, trade count, etc.)?** If yes, use the per-step delta instead.

A well-engineered stationary feature set answers "no" to all four questions.

::: warning
`StandardScaler` (which `train_model` applies automatically before training) does **not** make non-stationary features stationary. It rescales the training distribution to zero mean and unit variance, but it cannot remove a trend or make variance constant over time. A non-stationary feature that has been scaled is still non-stationary — just shifted and rescaled. Stationarity must be addressed in your `record_features` calls, before the data ever reaches the scaler.
:::

## Further reading

- [Gathering Data](/docs/research/ml/gathering-data) — feature engineering guidelines and `record_features` patterns
- [Binary Classification](/docs/research/ml/binary) — end-to-end example with stationary features
- [Regression](/docs/research/ml/regression) — log-return targets and why they are preferred over raw price targets