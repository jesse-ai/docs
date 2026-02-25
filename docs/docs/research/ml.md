# Machine Learning

The `jesse.research` module provides four functions that make it straightforward to integrate machine learning into your Jesse strategies: `gather_ml_data`, `train_model`, `load_ml_data_csv`, and `load_ml_model`.

The workflow has two distinct phases:

1. **Gather** – run a backtest in "gather mode" to collect labelled feature data from your strategy
2. **Train** – train any scikit-learn–compatible classifier on that data, then deploy it inside the same strategy


## Typical workflow

```
1.  Write your strategy with ML_MODE = "gather"
    → call record_features({...}) at each entry signal
    → call record_label(name, value) when the outcome is known

2.  Run gather_ml_data() over a long historical window
    → auto-saves MyStrategy_data.csv inside strategies/MyStrategy/

3.  Run train_model() with your chosen estimator
    → inspect the feature importance and feature impact tables
    → inspect the calibration and threshold sweep
    → saves model.pkl + scaler.pkl inside strategies/MyStrategy/

4.  Switch your strategy to ML_MODE = "deploy"
    → model is loaded lazily on first use via load_ml_model()
    → gate entry signals behind _ml_confidence() >= ML_THRESHOLD
    → ensure live feature array columns are in the same alphabetical order as gather

5.  Backtest the filtered strategy
    → compare against the unfiltered version
    → iterate on features and the threshold
```

## Import

```python
from jesse.research import gather_ml_data, train_model, load_ml_data_csv, load_ml_model
```

## gather_ml_data

Runs a backtest and returns all ML data points recorded by the strategy.

```python
gather_ml_data(
    config: dict,
    routes: list,
    data_routes: list,
    candles: dict,
    warmup_candles: dict = None,
    csv_path: str = "auto",
    verbose: bool = True,
) -> dict
```

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `config` | dict | Jesse exchange/backtest config (same format as `research.backtest()`) |
| `routes` | list | Strategy routes |
| `data_routes` | list | Extra routes for additional timeframes/symbols |
| `candles` | dict | Trading candles dict |
| `warmup_candles` | dict | Warm-up candles dict |
| `csv_path` | str | Where to save the collected data. Defaults to `"auto"`, which saves to `strategies/<Name>/ml_data/<Name>_data.csv`. Pass an explicit path to override, or `None` to skip saving. |
| `verbose` | bool | Print a formatted summary (default: True) |

**Returns:** `dict` with keys:
- `data_points` – `list[dict]` where each dict has `{time, features, label: {name, value}}`
- `backtest_metrics` – standard Jesse metrics dict from the backtest run

### Strategy requirements

Your strategy records data using two built-in methods from the `Strategy` base class:

- **`record_features(features_dict)`** — call this when you want to capture a sample (e.g. at an entry signal). Pass a dict of `{feature_name: value}` pairs. Calling it multiple times before a label is recorded will keep updating the same open data point.
- **`record_label(name, value)`** — call this when the outcome is known (e.g. when a position closes). This finalises the data point and stores it. If called without a preceding `record_features()` call, it is silently ignored (a debug message is emitted).

These methods can be called from any lifecycle hook — `on_open_position`, `on_close_position`, `should_long`, `update_position`, etc. — wherever the timing makes sense for your strategy logic.

```python
from jesse.strategies import Strategy

class MyStrategy(Strategy):
    ML_MODE = "gather"  # switch between "gather" and "deploy"

    def on_open_position(self, order) -> None:
        if self.ML_MODE == "gather":
            self.record_features({
                "atr_norm":  self.atr / self.close,
                "rsi_14":    self.rsi_14,
                "volume_z":  self.volume_z_score,
                # ... any stationary, normalised values
            })

    def on_close_position(self, order) -> None:
        if self.ML_MODE == "gather":
            is_profitable = self.position.pnl > 0
            self.record_label("profitable", is_profitable)
```

::: tip
Features should be **normalized and stationary** – ratios, z-scores, or percentages rather than raw prices. This ensures the model generalises across different price regimes and symbols.
:::

::: info
When using `gather_ml_data()` you do **not** need to call `export_ml_data()` in your strategy – the research function extracts data points directly and auto-saves the CSV inside your strategy's directory.
:::

### Example

```python
import jesse.helpers as jh
from jesse.enums import exchanges
from jesse.research import gather_ml_data, get_candles

EXCHANGE  = exchanges.BINANCE_PERPETUAL_FUTURES
SYMBOL    = "BTC-USDT"
TIMEFRAME = "15m"

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
    {"exchange": EXCHANGE, "strategy": "MyStrategy", "symbol": SYMBOL, "timeframe": TIMEFRAME}
]
data_routes = [
    {"exchange": EXCHANGE, "symbol": SYMBOL, "timeframe": "4h"}
]

# Fetch candles — use the maximum timeframe so all resolutions are covered
warmup_raw, trading_raw = get_candles(
    EXCHANGE, SYMBOL, "4h",
    jh.date_to_timestamp("2022-01-01"),
    jh.date_to_timestamp("2025-01-01"),
    warmup_candles_num=210,
    caching=True,
    is_for_jesse=True,
)

candles = {
    jh.key(EXCHANGE, SYMBOL): {"exchange": EXCHANGE, "symbol": SYMBOL, "candles": trading_raw}
}
warmup_candles = {
    jh.key(EXCHANGE, SYMBOL): {"exchange": EXCHANGE, "symbol": SYMBOL, "candles": warmup_raw}
}

# CSV is saved automatically to strategies/MyStrategy/ml_data/MyStrategy_data.csv
result = gather_ml_data(
    config=config,
    routes=routes,
    data_routes=data_routes,
    candles=candles,
    warmup_candles=warmup_candles,
)

print(f"Collected {len(result['data_points']):,} samples")
```

## train_model

Trains a binary classifier on data collected by `gather_ml_data`. Accepts **any scikit-learn–compatible estimator**.

```python
train_model(
    data: list,
    estimator,
    test_ratio: float = 0.2,
    save_to: str = None,
    verbose: bool = True,
    name: str = None,
) -> dict
```

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `data` | list | Data points from `gather_ml_data()` or `load_ml_data_csv()` |
| `estimator` | any | A scikit-learn–compatible classifier implementing `predict_proba` |
| `test_ratio` | float | Fraction of samples held out as the chronological test set (default: 0.2) |
| `save_to` | str | Directory path. Saves `model.pkl`, `scaler.pkl`, `feature_importance.pkl` |
| `verbose` | bool | Print a full training report (default: True) |
| `name` | str | Display name shown in the report header |

**Returns:** `dict` with keys:
- `model` – fitted estimator
- `scaler` – fitted `StandardScaler`
- `feature_names` – `list[str]`
- `metrics` – accuracy, roc_auc, mcc, confusion matrix, precision, recall, F1
- `feature_importance` – RFE ranks, ANOVA F-values, correlations, CV impacts, consensus ranks
- `calibration` – list of probability calibration buckets
- `feature_impact` – per-feature accuracy delta when that feature is removed from the test set
- `train_test_info` – split sizes and date ranges
- `class_weights` – suggested `{0: float, 1: float}` (informational)

::: warning
Class weights and all hyperparameters must be configured on the estimator **before** passing it. `train_model` always works on an internal clone and never mutates your object.
:::

### The estimator pattern

Because `train_model` accepts any sklearn-compatible object, you choose the algorithm and configure it completely before passing it in.

**SVM (RBF kernel)** — A solid default. Works well with a small-to-medium number of features and samples (up to ~50k). Sensitive to feature scaling, but `train_model` handles that automatically. Requires `probability=True` to produce confidence scores. Can be slow to train on large datasets.

```python
from sklearn.svm import SVC

result = train_model(data, SVC(probability=True, kernel="rbf", C=1.0, gamma="scale"))
```

**XGBoost** — The best choice when you have a large dataset (50k+ samples) or many features. Handles class imbalance well via `scale_pos_weight`. Generally produces the highest accuracy of the options here, but is more prone to overfitting if not tuned — watch the gap between train and test accuracy in the report.

```python
from xgboost import XGBClassifier

result = train_model(data, XGBClassifier(n_estimators=200, max_depth=4, scale_pos_weight=2.5))
```

**Random Forest** — A good middle ground: more robust to overfitting than XGBoost with less tuning required, and faster to train than SVM on large datasets. A good choice when you want a reliable baseline quickly. `class_weight="balanced"` handles class imbalance automatically.

```python
from sklearn.ensemble import RandomForestClassifier

result = train_model(data, RandomForestClassifier(n_estimators=300, class_weight="balanced"))
```

**Calibrated SVM** — Use this when the raw predicted probabilities from SVM are poorly calibrated (i.e. the Probability Calibration section of the report shows the actual positive rate diverging significantly from the predicted confidence). Platt scaling wraps the SVM and fits a logistic curve on top, producing more reliable confidence scores — which matters when you are using the probability threshold to filter trades.

```python
from sklearn.calibration import CalibratedClassifierCV
from sklearn.svm import SVC

# Platt scaling for better-calibrated probabilities
calibrated = CalibratedClassifierCV(
    SVC(kernel="rbf", C=1.0, gamma="scale", class_weight={0: 1.0, 1: 2.5}),
    method="sigmoid",
    cv=5,
)
result = train_model(data, calibrated)
```

::: tip
If you are unsure where to start, try **SVM** first. It trains quickly and the feature importance analysis uses SVM proxies internally anyway, so the report will be most interpretable. Switch to XGBoost if you have a lot of data or if SVM's test accuracy plateaus.
:::

### What the training report includes

When `verbose=True` (the default), `train_model` prints a full report with six sections:

**1. Dataset** — sample counts, train/test date ranges, class balance, and suggested class weights.

**2. Feature importance** — a four-method consensus table:

| Column | Method | What it measures |
|---|---|---|
| RFE | Recursive Feature Elimination (linear SVM proxy) | Which features a linear model finds most useful |
| F-val | ANOVA F-statistic | How well each feature alone separates the two classes |
| \|Corr\| | Absolute Pearson correlation | Strength of linear relationship with the label |
| CV-Impact | Accuracy drop when feature removed (RBF-SVC proxy) | Whether the feature is actively helping cross-validation |
| Score | Average rank across all four methods | Overall consensus importance (lower = more important) |

**3. Model performance** — accuracy, ROC AUC, MCC, confusion matrix, and per-class precision/recall/F1.

**4. Probability calibration** — groups predictions into confidence buckets (e.g. `[0.6–0.7)`) and shows whether the actual positive rate matches the predicted confidence. Use this to choose your `ML_THRESHOLD` in live trading.

**5. Feature impact** — retrains the model without each feature in turn and measures the accuracy change on the test set. A feature that causes accuracy to drop when removed is genuinely useful; one that causes accuracy to rise is noisy and should be dropped.

**6. Precision vs threshold sweep** — shows how precision and coverage change as you raise the minimum confidence required to allow a trade through. Helps you find the optimal threshold.

### Full example

```python
from sklearn.svm import SVC
from jesse.research import load_ml_data_csv, train_model

STRATEGY_NAME = "MyStrategy"

# Load previously gathered data — just pass the strategy name
data = load_ml_data_csv(STRATEGY_NAME)

# Compute class weights from the data
n_true  = sum(1 for p in data if p["label"]["value"] is True)
n_false = len(data) - n_true
cw      = {0: 1.0, 1: n_false / n_true}

# Configure and train
result = train_model(
    data=data,
    estimator=SVC(probability=True, kernel="rbf", C=1.0, gamma="scale", class_weight=cw),
    test_ratio=0.2,
    save_to=f"strategies/{STRATEGY_NAME}",
    name=STRATEGY_NAME,
)

# Access results programmatically
print(f"Accuracy: {result['metrics']['accuracy']:.1%}")
print(f"ROC AUC:  {result['metrics']['roc_auc']:.3f}")
print(f"MCC:      {result['metrics']['mcc']:+.3f}")
```

## load_ml_data_csv

Reloads data points from a CSV previously saved by `gather_ml_data`.

```python
load_ml_data_csv(path_or_name: str) -> list[dict]
```

Pass either a **strategy name** or an explicit file path. When given a bare name (no path separators, no `.csv` extension), it resolves automatically to `strategies/<name>/ml_data/<name>_data.csv` inside the current Jesse project. Returns the same `list[dict]` format as the `data_points` key in `gather_ml_data`'s return value — suitable for passing directly to `train_model`.

```python
from jesse.research import load_ml_data_csv

# Simple: just pass the strategy name
data = load_ml_data_csv("MyStrategy")
print(f"Loaded {len(data):,} samples")
print(f"Features: {list(data[0]['features'].keys())}")

# Advanced: pass an explicit path if needed
data = load_ml_data_csv("path/to/custom_data.csv")
```

## load_ml_model

Loads a previously saved model, scaler, and feature importance data.

```python
load_ml_model(directory: str) -> dict
```

Reads `model.pkl`, `scaler.pkl`, and (if present) `feature_importance.pkl` from the given directory — the same directory you passed as `save_to` when calling `train_model`.

**Returns:** `dict` with keys `model`, `scaler`, and optionally `feature_importance`

```python
from jesse.research import load_ml_model

artefacts = load_ml_model("strategies/MyStrategy")
model  = artefacts["model"]
scaler = artefacts["scaler"]

# Use in a strategy or notebook
X_scaled = scaler.transform(X_new)
probs    = model.predict_proba(X_scaled)[:, 1]
```

## Using a trained model inside a strategy

Once the model is saved, load it when the strategy starts and call it on each new bar:

```python
import numpy as np
from jesse.research import load_ml_model
from jesse.strategies import Strategy

class MyStrategy(Strategy):
    ML_MODE      = "deploy"
    ML_THRESHOLD = 0.62      # only enter when model is ≥ 62% confident

    def _load_ml_model_if_needed(self) -> None:
        if self._ml_model is not None:
            return
        import os
        strategy_dir = os.path.join("strategies", self.name)
        artefacts = load_ml_model(strategy_dir)
        self._ml_model  = artefacts["model"]
        self._ml_scaler = artefacts["scaler"]

    def _ml_confidence(self) -> float:
        self._load_ml_model_if_needed()
        # Build the feature array in the SAME alphabetical order used during gather.
        # train_model sorts feature names alphabetically, so the order here must match.
        # The keys passed to record_features() were: atr_norm, rsi_14, volume_z
        # train_model sorts them alphabetically → atr_norm, rsi_14, volume_z
        features = np.array([[
            self.atr / self.close,   # atr_norm
            self.rsi_14,             # rsi_14
            self.volume_z_score,     # volume_z
        ]])
        X_scaled = self._ml_scaler.transform(features)
        return float(self._ml_model.predict_proba(X_scaled)[0, 1])

    def should_long(self) -> bool:
        return (
            self._your_entry_signal()
            and self._ml_confidence() >= self.ML_THRESHOLD
        )
```

::: tip
`ML_MODE = "deploy"` works in both backtests and live trading — it simply means the model is active and filtering signals, as opposed to `"gather"` mode which is collecting training data. Use a backtest in deploy mode to validate the model before going live.
:::

::: tip
The `ML_THRESHOLD` value should be chosen using the **Probability Calibration** and **Precision vs Threshold** sections of the `train_model` report. Pick the confidence bin where the actual positive rate meaningfully exceeds the dataset base rate while enough signals still pass through to trade.
:::

::: warning
The feature array passed to `scaler.transform()` must have columns in **exactly the same order** as during training. `train_model` sorts feature names alphabetically internally, so the columns of your live feature array must follow that same alphabetical order. The safest approach is to explicitly comment each row with its feature name (as shown above) so the mapping stays visible and verifiable.
:::
