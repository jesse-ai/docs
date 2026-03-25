# Gathering Data

Before you can train a model you need labelled feature data. `gather_ml_data` runs a standard Jesse backtest in the background and extracts every sample your strategy records via `record_features` and `record_label`. The result is saved to a CSV file that you pass to `train_model` later.

## Strategy methods

Your strategy has built-in methods for recording ML data, inherited from `Strategy`.

### `ml_features()`

Override `ml_features()` to define the features used for **both** data gathering and live inference. It is the single source of truth for feature computation — you write it once and the framework uses it automatically in both gather mode and deploy mode.

```python
def ml_features(self) -> dict:
    atr   = ta.atr(self.candles) + 1e-9
    price = self.price
    return {
        "rsi_centered":    (ta.rsi(self.candles) - 50) / 50,
        "atr_pct":         atr / price,
        "ema9_dist":       (price - ta.ema(self.candles, 9)) / (ta.ema(self.candles, 9) + 1e-9),
        "supertrend_dist": (price - ta.supertrend(self.candles).trend) / atr,
    }
```

::: tip Feature engineering guidelines
- **Normalise everything** — ratios, z-scores, and log-returns generalise across price regimes; raw prices and raw ATR values do not.
- **Avoid look-ahead** — only use information available at the moment the signal fires. If you use data that Jesse provided, you are fine because it only contains past data. But if you use your own custom data, you need to be careful to avoid look-ahead bias.
- **Keep names stable** — `train_model` sorts feature names alphabetically when building the training matrix. The same sort is applied automatically at inference time via `ml_predict()` / `ml_predict_proba()`, so you never have to worry about column order yourself.
:::

### `record_features(features_dict)`

Call this when you want to capture a snapshot of the market state — your independent variables. Pass a flat dict of `{feature_name: value}` pairs. Because you have defined `ml_features()`, the call is always:

```python
self.record_features(self.ml_features())
```

Calling it multiple times before the label is recorded is safe; it keeps updating the same open data point.

### `record_label(name, value)`

Call this when the outcome is known. This finalises the open data point and moves it into storage. If called with no preceding `record_features` call it is silently ignored (a debug message is emitted).

```python
self.record_label("profitable", closed_trade.pnl > 0)   # bool
self.record_label("triple_barrier", 1)                   # int: +1 / 0 / -1
self.record_label("forward_return", 0.0043)              # float
```

`record_features(self.ml_features())` should be called from inside `should_long()` / `should_short()` (Pattern 1) or from `before()` (Patterns 2 and 3). That keeps the entry rules and the feature snapshot in the same place.

`record_label` is called once the outcome is known — typically in `on_close_position` or after a barrier expires in `before()`.

## ml_mode convention

Every strategy instance has a built-in `self.ml_mode` attribute (initialised to `"gather"` by `Strategy.__init__`). You do **not** need to declare it at the class level — it is always available.

Guard every `record_*` call with `if self.ml_mode == "gather":` so the recording overhead is zero in deploy mode.

To switch a strategy to deploy mode, set the attribute before running the backtest:

```python
# In a script — set it on the class so every instance starts in deploy mode
import strategies.MyStrategy as mod
mod.MyStrategy.ml_mode = "deploy"
```

Or override it at the top of `__init__` if you prefer the mode to live inside the strategy file:

```python
class MyStrategy(Strategy):
    def __init__(self):
        super().__init__()
        self.ml_mode = "deploy"   # "gather" | "deploy"
```

## Pattern 1 — label on trade close (boolean)

The simplest pattern: record features inside `should_long()` / `should_short()` when the entry signal fires, then record the outcome when the trade closes.

::: tip When to use this pattern
Use this pattern when your strategy **places many completed trades** during the gather period. If your entry signal is rare, has strict filters, or uses `should_cancel_entry = True`, most intended trades will never fully open and close — leaving you with very few labelled samples. In that case, use Pattern 2 (triple-barrier) instead, which collects data even when no actual trade runs to completion.
:::

```python
import jesse.indicators as ta
from jesse.strategies import Strategy


class MyStrategy(Strategy):

    def ml_features(self) -> dict:
        atr   = ta.atr(self.candles) + 1e-9
        price = self.price
        return {
            "rsi_centered":  (ta.rsi(self.candles) - 50) / 50,
            "atr_pct":       atr / price,
            "ema200_dist":   (price - ta.ema(self.candles, 200)) / price,
        }

    def should_long(self) -> bool:
        signal = ta.rsi(self.candles) < 35 and self.price > ta.ema(self.candles, 200)
        if signal and self.ml_mode == "gather":
            self.record_features(self.ml_features())
        return signal

    def should_short(self) -> bool:
        signal = ta.rsi(self.candles) > 65 and self.price < ta.ema(self.candles, 200)
        if signal and self.ml_mode == "gather":
            self.record_features(self.ml_features())
        return signal

    def go_long(self):
        entry = self.price
        stop  = entry - ta.atr(self.candles) * 2
        from jesse import utils
        qty = utils.risk_to_qty(self.available_margin, 2, entry, stop, self.fee_rate)
        self.buy = qty, entry

    def go_short(self):
        entry = self.price
        stop  = entry + ta.atr(self.candles) * 2
        from jesse import utils
        qty = utils.risk_to_qty(self.available_margin, 2, entry, stop, self.fee_rate)
        self.sell = qty, entry

    def on_close_position(self, order, closed_trade) -> None:
        if self.ml_mode != "gather":
            return
        self.record_label("profitable", closed_trade.pnl > 0)
```

::: tip Side as a feature
If your strategy trades both long and short, add a `"side"` feature to `ml_features()` so the model knows the direction of the signal. Because `ml_features()` is called live (not pre-computed), you can pass direction context as a class variable:

```python
def ml_features(self) -> dict:
    return {
        "side":          float(self._signal_side),   # set to +1 or -1 before calling
        "rsi_centered":  (ta.rsi(self.candles) - 50) / 50,
        ...
    }

def should_long(self) -> bool:
    signal = ...
    if signal and self.ml_mode == "gather":
        self._signal_side = 1
        self.record_features(self.ml_features())
    return signal
```
:::

## Pattern 2 — triple-barrier (integer label in `before`)

The triple-barrier method anchors three barriers to a point on the price series and records a label when the first one is touched. No actual positions are opened — the loop runs entirely in `before()`. It produces three integer labels: `+1` (profit target hit), `-1` (stop-loss hit), and `0` (time expired).

This is the standard labeling approach when you **do not have a primary model that tells you the side** — because you don't know direction in advance, the barriers must be symmetric and the label is determined purely by which direction price moves first.

See the [Multiclass Classification](/docs/research/ml/multiclass) page for the full pattern with `task="multiclass"`.

When you **do** have a primary model that sets the side (as in meta-labeling), the same loop is used but the three outcomes collapse to two: profit target hit = `True`, stop or time expiry = `False`. See the [Meta-Labeling](/docs/research/ml/meta-labeling) page for that pattern.

```python
import jesse.indicators as ta
from jesse.strategies import Strategy


class MyStrategy(Strategy):
    vertical_barrier = 50
    ATR_MULTIPLIER   = 2.0

    _features_recorded = False

    _record_index      = 0
    _barrier_upper     = None
    _barrier_lower     = None

    def ml_features(self) -> dict:
        atr   = ta.atr(self.candles) + 1e-9
        price = self.price
        return {
            "rsi_centered":    (ta.rsi(self.candles) - 50) / 50,
            "atr_pct":         atr / price,
            "supertrend_dist": (price - ta.supertrend(self.candles).trend) / atr,
        }

    def should_long(self) -> bool:
        return False   # no real trades in gather mode

    def should_short(self) -> bool:
        return False

    def before(self) -> None:
        if self.ml_mode != "gather":
            return

        if not self._features_recorded:
            self.record_features(self.ml_features())
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

## Pattern 3 — pure time window (float label in `before`)

For regression, there are no price barriers at all — you simply wait a fixed number of bars (the **vertical barrier**) and record whatever return occurred. This is the one pattern where "vertical barrier" refers only to the time limit: there is no upper or lower price barrier.

Log returns are preferred over simple percentage returns because they are additive across periods, symmetric (a +10% then −10% move nets to zero), and better-behaved statistically.

```python
import numpy as np
import jesse.indicators as ta
from jesse.strategies import Strategy


class MyStrategy(Strategy):
    vertical_barrier = 48   # bars to wait before recording the return

    _features_recorded = False
    _record_index      = 0
    _entry_price       = None

    def ml_features(self) -> dict:
        return {
            "rsi_centered": (ta.rsi(self.candles) - 50) / 50,
            "atr_pct":      ta.atr(self.candles) / self.price,
        }

    def should_long(self) -> bool:
        return False

    def should_short(self) -> bool:
        return False

    def before(self) -> None:
        if self.ml_mode != "gather":
            return

        if not self._features_recorded:
            self.record_features(self.ml_features())
            self._entry_price       = self.price
            self._record_index      = self.index
            self._features_recorded = True
            return

        if (self.index - self._record_index) >= self.vertical_barrier:
            # Use log return: it is additive, symmetric, and regime-invariant.
            # np.log(P1/P0) ≈ (P1-P0)/P0 for small moves but is better for large ones.
            forward_return = float(np.log(self.price / self._entry_price)) \
                if self._entry_price else 0.0
            self.record_label("forward_return", round(forward_return, 6))
            self._features_recorded = False
```

## Running gather_ml_data

Typically you create a standalone script alongside your Jesse project:

```python
# gather_data.py  (place next to your strategies/ folder)
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
    # csv_path is "auto" → saves to strategies/MyStrategy/ml_data/MyStrategy_data.csv
)

print(f"Collected {len(result['data_points']):,} samples")
```

## load_ml_data_csv

Once the CSV is saved you can reload it at any time without re-running the backtest:

```python
load_ml_data_csv(path_or_name: str) -> list[dict]
```

Pass either a **strategy name** or an **explicit file path**:

- **Strategy name** — a bare name with no path separators and no `.csv` suffix (e.g. `"MyStrategy"`). Resolved automatically to `strategies/<name>/ml_data/<name>_data.csv` inside the current Jesse project directory.
- **Explicit path** — any string containing `/`, `\`, or ending in `.csv` is treated as a direct file path (e.g. `"/tmp/my_data.csv"` or `"strategies/ML1/ml_data/ML1_data.csv"`).

Label values are restored to their natural Python types — `bool`, `int`, or `float` — so the round-trip through CSV is lossless.

```python
from jesse.research import load_ml_data_csv

# By strategy name (auto-resolves path)
data = load_ml_data_csv("MyStrategy")

# By explicit path
data = load_ml_data_csv("strategies/MyStrategy/ml_data/MyStrategy_data.csv")

print(f"Loaded {len(data):,} samples")
print(f"Label value type: {type(data[0]['label']['value'])}")
print(f"Features: {list(data[0]['features'].keys())}")
```
