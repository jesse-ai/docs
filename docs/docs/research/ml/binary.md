# Binary Classification

Binary classification is the most common ML task in algorithmic trading: given a set of market features, predict whether an outcome is **positive** (class 1) or **negative** (class 0). Typical examples:

- Will this trade be profitable?
- Will price reach the take-profit before the stop-loss?
- Is this an above-average volatility bar?

## Label convention

For `task="binary"`, `train_model` maps any label value to `0` or `1` using this rule:

| Label value | Class |
|---|---|
| `True` (bool) | 1 — positive |
| `False` (bool) | 0 — negative |
| Any number `> 0` | 1 — positive |
| `0`, negative numbers, `False` | 0 — negative |

This means all of the following produce the same binary split:

```python
self.record_label("win", True)           # bool
self.record_label("win", 1)              # int
self.record_label("win", 0.034)          # float > 0  →  positive
self.record_label("win", -0.012)         # float ≤ 0  →  negative
```

::: tip
For triple-barrier labels (`+1`, `0`, `-1`), use `task="multiclass"` instead. If you collapse them to binary here, both `0` (time expiry) and `-1` (stop-loss) become the negative class — which is valid but loses information. See the [Multiclass](/docs/research/ml/multiclass) page.
:::

## Strategy example — label on trade close

The simplest gather pattern records features through a shared helper called for example `_record_features()` that is called from both `should_long()` and `should_short()`, then records the binary outcome when the trade closes.


```python
import jesse.indicators as ta
from jesse import utils
from jesse.strategies import Strategy


class MyStrategy(Strategy):
    def _record_features(self, side: str) -> None:
        if self.ml_mode != "gather":
            return
        atr   = ta.atr(self.candles)
        price = self.price
        self.record_features({
            "side":            1 if side == "long" else -1,
            "rsi_centered":    (ta.rsi(self.candles) - 50) / 50,
            "atr_pct":         atr / price,
            "ema200_dist":     (price - ta.ema(self.candles, 200)) / price,
            "keltner_pos":     (price - ta.keltner(self.candles).lowerband)
                               / (ta.keltner(self.candles).upperband - ta.keltner(self.candles).lowerband + 1e-9),
        })

    def should_long(self) -> bool:
        signal = (
            ta.rsi(self.candles) < 35
            and self.price > ta.ema(self.candles, 200)
        )
        if signal:
            self._record_features("long")
        return signal

    def should_short(self) -> bool:
        signal = (
            ta.rsi(self.candles) > 65
            and self.price < ta.ema(self.candles, 200)
        )
        if signal:
            self._record_features("short")
        return signal

    def should_cancel_entry(self) -> bool:
        return True

    def go_long(self):
        entry = self.price
        stop  = entry - ta.atr(self.candles) * 2.5
        qty   = utils.risk_to_qty(
            self.available_margin, 2, entry, stop, fee_rate=self.fee_rate
        )
        self.buy = qty, entry

    def go_short(self):
        entry = self.price
        stop  = entry + ta.atr(self.candles) * 2.5
        qty   = utils.risk_to_qty(
            self.available_margin, 2, entry, stop, fee_rate=self.fee_rate
        )
        self.sell = qty, entry

    def on_close_position(self, order, closed_trade) -> None:
        if self.ml_mode != "gather":
            return
        self.record_label("profitable", closed_trade.pnl > 0)   # bool
```

## Training

```python
# train_binary.py
from sklearn.calibration import CalibratedClassifierCV
from sklearn.svm import SVC
from jesse.research import load_ml_data_csv, train_model

STRATEGY = "MyStrategy"
data     = load_ml_data_csv(STRATEGY)

# Compute class weights from the data
n_pos = sum(1 for p in data if p["label"]["value"] is True)
n_neg = len(data) - n_pos
cw    = {0: 1.0, 1: n_neg / n_pos} if n_pos > 0 else {0: 1.0, 1: 1.0}

result = train_model(
    data=data,
    estimator=CalibratedClassifierCV(
        SVC(kernel="rbf", C=1.0, gamma="scale", class_weight=cw),
        method="sigmoid",
        cv=5,
    ),
    task="binary",
    test_ratio=0.2,
    save_to=f"strategies/{STRATEGY}",
    name=STRATEGY,
)

print(f"Accuracy : {result['metrics']['accuracy']:.1%}")
print(f"ROC AUC  : {result['metrics']['roc_auc']:.3f}")
print(f"MCC      : {result['metrics']['mcc']:+.3f}")
```

## Choosing an estimator

Because `train_model` accepts any sklearn-compatible classifier, the choice of algorithm is entirely up to you.

### Quick comparison 

| Classifier | Best dataset size | Handles noisy data | Handles class imbalance | Needs calibration | Training speed | Notes |
|---|---|---|---|---|---|---|
| **Gradient Boosting** | Medium–Large (5 k – 500 k) | ✅ Good | ⚠️ Use `sample_weight` or `CalibratedClassifierCV` | ✅ Via `CalibratedClassifierCV` | Medium | Best default for financial tabular data; does not support `class_weight` directly |
| **Random Forest** | Medium–Large (5 k – 500 k) | ✅ Good | ✅ `class_weight="balanced"` | ✅ Built-in probabilities are reasonable | Fast | More robust to overfitting than Gradient Boosting; easy to tune |
| **Calibrated SVM** | Small (< 10 k) | ⚠️ Can collapse to majority class | ⚠️ Use `class_weight` | ✅ Wrap with `CalibratedClassifierCV` | Slow on large data | Raw SVM probabilities are unreliable — always calibrate; avoid on weak/noisy features |
| **XGBoost** | Large (> 50 k) | ✅ Good | ✅ `scale_pos_weight` | ⚠️ May need calibration | Fast (GPU support) | Highest accuracy ceiling but most prone to overfitting; requires careful tuning |


**Gradient Boosting** — the recommended starting point for financial tabular data. Ensemble methods generalise better than SVMs on the noisy, low-signal features typical of price-derived indicators. Unlike SVMs, they rarely collapse to predicting the majority class on imbalanced data.

```python
from sklearn.calibration import CalibratedClassifierCV
from sklearn.ensemble import GradientBoostingClassifier

CalibratedClassifierCV(
    GradientBoostingClassifier(
        n_estimators=300, max_depth=3, learning_rate=0.05, subsample=0.8,
    ),
    method="isotonic",
    cv=3,
)
```

**Random Forest** — more robust to overfitting, faster to train, and handles class imbalance automatically with `class_weight="balanced"`.

```python
from sklearn.ensemble import RandomForestClassifier

RandomForestClassifier(n_estimators=300, max_depth=8, class_weight="balanced")
```

**Calibrated SVM** — works well on small, clean datasets (< 10 k samples). Raw SVM probabilities (`probability=True`) are often poorly calibrated; wrapping with `CalibratedClassifierCV` applies Platt scaling for more reliable confidence scores. On noisy financial data with weak features, SVMs can collapse to predicting the majority class — if this happens, switch to an ensemble method.

```python
from sklearn.calibration import CalibratedClassifierCV
from sklearn.svm import SVC

CalibratedClassifierCV(
    SVC(kernel="rbf", C=1.0, gamma="scale", class_weight=cw),
    method="sigmoid",
    cv=5,
)
```

**XGBoost** — highest accuracy on large datasets (> 50 k samples) but more prone to overfitting. Use `scale_pos_weight` to handle class imbalance.

```python
from xgboost import XGBClassifier

XGBClassifier(n_estimators=300, max_depth=4, scale_pos_weight=n_neg / n_pos)
```

## Understanding the training report

### Dataset section

Shows sample counts, the chronological train/test split, class balance, and suggested class weights. The split is always **chronological** (oldest → train, newest → test) to avoid look-ahead leakage.

### Feature importance table

Four methods are combined into a consensus rank:

| Column | Method | Interpretation |
|---|---|---|
| RFE | Recursive Feature Elimination (linear SVM proxy) | Which features a linear model finds most useful. Lower rank = better. |
| F-val | ANOVA F-statistic | How well each feature separates the two classes in isolation. Higher = better. |
| \|Corr\| | Absolute Pearson correlation with the label | Strength of linear relationship. Higher = better. |
| CV-Impact | Accuracy drop when feature is removed (RBF-SVM proxy) | Whether the feature actively improves cross-validation accuracy. Positive = helpful. |
| Score | Average of the four per-method ranks | Overall consensus — lower is more consistently important. |

### Model performance

- **Accuracy** — fraction of correct predictions on the test set. On imbalanced data, accuracy alone is misleading — check MCC and F1.
- **ROC AUC** — area under the ROC curve. 0.5 = random, 1.0 = perfect. Values above 0.55 on financial data are meaningful.
- **MCC** — Matthews Correlation Coefficient. Ranges from −1 to +1. Robust to class imbalance. Values above +0.10 indicate a useful model.
- **Confusion matrix** — shows TP, TN, FP, FN counts. Helps you understand whether the model errs towards false positives or false negatives.

### Probability calibration

Groups predictions by their predicted confidence bucket (e.g. `[0.6–0.7)`) and shows whether the **actual positive rate** in that bucket matches the predicted confidence. A well-calibrated model means "when the model says 65% confident, it is right ~65% of the time."

Use this to choose your `ML_THRESHOLD` in deploy mode. A bucket where the actual positive rate meaningfully exceeds the dataset base rate is a good operating point.

### Feature impact

Retrains the model with each feature removed in turn and measures the change in test accuracy. Interpreting the verdict:

| Verdict | Meaning |
|---|---|
| `↓ important — keep` | Removing this feature drops accuracy by more than 1.5% — it is genuinely useful |
| `↑ noisy — consider dropping` | Removing this feature *improves* accuracy by more than 1.5% — it is adding noise |
| `neutral` | Accuracy changes by less than ±1.5% — the feature is redundant or its signal is captured by other features |

::: tip
The ±1.5% dead zone is intentional. Retraining on a small financial dataset has inherent randomness; differences smaller than 1.5% are within the noise margin and should not drive feature selection decisions. Focus on features clearly marked as `important` or `noisy`.
:::

### Precision vs confidence threshold sweep

Shows how precision and coverage change as you raise the minimum confidence required to allow a signal through. Use this alongside the calibration section to find the optimal `ML_THRESHOLD`.

```
  Threshold    Allowed  Precision   Coverage
       0.50      1,107      54.2%     100.0%
       0.55        843      57.1%      76.2%
       0.60        521      61.8%      47.1%
       0.65        289      66.4%      26.1%
       0.70        141      70.9%      12.7%
```

A useful operating point is where precision meaningfully exceeds the base rate while enough signals remain to produce a tradeable number of entries.

## Class weights

Class imbalance is common in financial data. If 70 % of your samples are negative (no-win), an untrained model can achieve 70 % accuracy by always predicting negative — without learning anything. Class weights penalise the model more heavily for mistakes on the minority class.

The training report prints **suggested class weights** in the Dataset section. You can read them off and hardcode them directly:

```python
# Suggested class weights:  0: 1.00  /  1: 2.43
RandomForestClassifier(class_weight={0: 1.00, 1: 2.43})
```

Or compute them from the data programmatically:

```python
n_pos = sum(1 for p in data if p["label"]["value"] is True)
n_neg = len(data) - n_pos
cw    = {0: 1.0, 1: n_neg / n_pos} if n_pos > 0 else {0: 1.0, 1: 1.0}
```

::: warning
Class weights must be configured on your estimator **before** passing it to `train_model`. The function always clones your estimator and never modifies the object you pass in. Note that `GradientBoostingClassifier` does **not** support `class_weight` directly — wrap it in `CalibratedClassifierCV` or handle imbalance via `sample_weight` in a custom pipeline instead.
:::
