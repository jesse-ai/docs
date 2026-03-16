# Machine Learning

::: warning Experimental API
The machine-learning API described in this section is **experimental** and may change at any point without prior notice. Do not rely on it for production systems until it is marked stable.

To collaborate, share feedback, or follow updates, join the community on [Discord](https://jesse.trade/discord).
:::

The `jesse.research` module provides a complete machine-learning pipeline for Jesse strategies — from collecting labelled training data during a backtest, to training and evaluating a model, to deploying it live inside your strategy to filter or score signals.

The system is built around four public functions:

| Function | Purpose |
|---|---|
| `gather_ml_data` | Run a backtest in "gather mode" and collect labelled feature samples |
| `train_model` | Train any scikit-learn–compatible estimator on that data; produces a full report |
| `load_ml_data_csv` | Reload previously saved data points from a CSV without re-running a backtest |
| `load_ml_model` | Reload a saved model, scaler, and feature importance data for deploy mode |

## Typical workflow

```
1.  Write your strategy with ML_MODE = "gather"
    → call record_features({...}) at each signal bar
    → call record_label(name, value) when the outcome is known
    → use before() / after() for continuous observation loops (vertical barrier)
    → use on_open_position / on_close_position for trade-based labelling

2.  Run gather_ml_data() over a long historical window
    → auto-saves <Name>_data.csv inside strategies/<Name>/ml_data/
    → aim for 1,000+ samples; 2,000–5,000 is a healthy range

3.  Run train_model() with your chosen estimator and task type
    → compare multiple estimators with GridSearchCV before committing
    → inspect feature importance, metrics, calibration, threshold sweep
    → saves model.pkl + scaler.pkl + feature_importance.pkl inside strategies/<Name>/

4.  Switch your strategy to ML_MODE = "deploy"
    → model is loaded lazily on first use via load_ml_model()
    → gate or weight entry signals using the model's output
    → feature array columns must be in alphabetical order (same as gather)

5.  Backtest the filtered strategy and compare against the baseline
    → iterate on features, task type, estimator, and threshold
    → re-gather and re-train whenever you change the primary signal or features
```

## Import

```python
from jesse.research import (
    gather_ml_data,
    load_ml_data_csv,
    load_ml_model,
    train_model,
)
```

## Task types

`train_model` accepts a `task` parameter that controls how the label is interpreted, which estimator type is expected, and what metrics and report sections are produced.

| `task` | Label type | Estimator | Key metrics |
|---|---|---|---|
| `"binary"` | `bool`, or any numeric (`> 0` = positive) | Classifier with `predict_proba` | Accuracy, ROC AUC, MCC, calibration, precision/threshold sweep |
| `"multiclass"` | Integer class label (`-1`, `0`, `+1`, …) | Multi-class classifier with `predict_proba` | Accuracy, macro ROC AUC, MCC, per-class precision/recall/F1, N×N confusion matrix |
| `"regression"` | Continuous float | Regressor | MAE, RMSE, R², Spearman ρ |

**Estimator requirements by task**

- `"binary"` and `"multiclass"` — the estimator must implement `predict_proba`. For `SVC`, either set `probability=True` or wrap it in `CalibratedClassifierCV`.
- `"regression"` — pass any sklearn regressor (one that `sklearn.base.is_regressor` returns `True` for).

::: tip
If you are just starting out, use **`"binary"`**. It is the simplest to reason about, trains the fastest, and produces the most actionable output (probability calibration + confidence threshold sweep) for live trading. Move to `"multiclass"` when you need to distinguish direction from a neutral/no-trade outcome, and to `"regression"` only when you need predicted return magnitudes for position sizing.
:::

## Label types

`record_label(name, value)` accepts three value types. All of them survive the CSV round-trip correctly — `bool`, `int`, and `float` are restored to their natural Python types when reloaded via `load_ml_data_csv`. They are interpreted by `train_model` according to the rules below.

| Python type | Example call | How `"binary"` task maps it | How `"multiclass"` task maps it | How `"regression"` task maps it |
|---|---|---|---|---|
| `bool` | `record_label("win", True)` | `True` → class 1, `False` → class 0 | Not applicable — use `int` | Not applicable — use `float` |
| `int` | `record_label("triple_barrier", 1)` | `> 0` → class 1, `≤ 0` → class 0 | Passed as-is via `int(value)` (`-1`, `0`, `1`) | Cast to `float` |
| `float` | `record_label("return_pct", 0.034)` | `> 0` → class 1, `≤ 0` → class 0 | Not applicable — use `"regression"` | Passed as-is via `float(value)` |

::: warning
**Multiple labels per data point are not supported.** Each call to `record_label` finalises the current data point and clears it. `record_features` called again after `record_label` starts a fresh data point — it does not append to the previous one. To predict two independent outcomes (e.g. direction *and* volatility regime), run separate gather + train passes, each with its own label name and CSV file.
:::

## Pages in this section

- [Gathering Data](/docs/research/ml/gathering-data) — how to write the gather-mode strategy and run `gather_ml_data`; vertical-barrier vs trade-based labelling patterns
- [Stationarity](/docs/research/ml/stationarity) — why features must be stationary, common non-stationary pitfalls, and how to transform raw financial data into stationary inputs
- [Binary Classification](/docs/research/ml/binary) — `task="binary"`, boolean labels, calibration, confidence threshold sweep, estimator recommendations
- [Multiclass Classification](/docs/research/ml/multiclass) — `task="multiclass"`, triple-barrier labels, per-class metrics, the `0`-class decision
- [Regression](/docs/research/ml/regression) — `task="regression"`, forward log-return targets, MAE/R²/Spearman, interpreting weak results
- [Meta-Labeling](/docs/research/ml/meta-labeling) — secondary model that learns bet *size* on top of a primary directional signal; F1-score workflow, confidence-based position sizing, vertical-barrier gather pattern
- [Deploying in a Strategy](/docs/research/ml/deploying) — loading a model lazily, shared `_build_features` pattern, signal-first model calling, live trading considerations

## `train_model` return value

`train_model` returns a `dict` with the following keys. Some keys are only present for specific task types.

| Key | Present for | Description |
|---|---|---|
| `model` | all | Fitted estimator |
| `scaler` | all | Fitted `StandardScaler` |
| `feature_names` | all | Sorted list of feature names used in training |
| `metrics` | all | Task-specific metrics dict (see below) |
| `feature_importance` | all | RFE ranks, F-values, correlations, CV impacts, consensus ranks |
| `feature_impact` | all | Per-feature accuracy/MAE delta when retrained without each feature |
| `train_test_info` | all | Train/test sizes and date ranges |
| `calibration` | `"binary"` only | Probability calibration buckets list |
| `class_weights` | `"binary"` only | Suggested `{0: float, 1: float}` class weight dict |

**Metrics dict keys by task**

| Task | Metric keys |
|---|---|
| `"binary"` | `accuracy`, `roc_auc`, `mcc`, `confusion_matrix`, `precision`, `recall`, `f1`, `support`, `tn`, `fp`, `fn`, `tp` |
| `"multiclass"` | `accuracy`, `roc_auc_macro`, `mcc`, `confusion_matrix`, `classes`, `precision`, `recall`, `f1`, `support` |
| `"regression"` | `mae`, `rmse`, `r2`, `spearman` |