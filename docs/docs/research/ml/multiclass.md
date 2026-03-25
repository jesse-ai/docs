# Multiclass Classification

Multiclass classification extends binary classification to three or more outcome classes. One of the most common use cases from *Advances in Financial Machine Learning* is the **triple-barrier method**, which produces three distinct labels: `+1` (profit target hit), `0` (time expiry), and `-1` (stop-loss hit).

With `task="multiclass"`, `train_model` passes the raw integer labels directly to the estimator and reports per-class precision, recall, F1, and a full N×N confusion matrix.

## The triple-barrier method

The triple-barrier method, introduced by Marcos López de Prado, labels each observation according to the first barrier touched out of three barriers anchored to a price series — no actual positions need to be opened. For each observation bar you anchor:

- **Upper barrier** — a profit-taking level at `entry + distance`
- **Lower barrier** — a stop-loss level at `entry - distance`
- **Vertical barrier** — a maximum holding period (number of bars)

The label is determined by which barrier price touches **first**:

| Barrier touched first | Label |
|---|---|
| Upper (profit target) | `+1` |
| Lower (stop-loss) | `-1` |
| Vertical (time expiry) | `0` |

This is used when you **do not have a primary model that tells you the side of the bet** — because the barriers are symmetric, the label is determined purely by which direction price moves first. The `0` class captures periods where price drifts without conviction — it expires within the holding window without touching either horizontal barrier.

::: tip
When you **do** have a primary model that sets the side (long or short), use **meta-labeling** instead. The labeling machinery is identical, but because the side is known the three outcomes collapse to two: profit target hit = `True` (the primary signal was correct), stop or time expiry = `False` (the primary signal was wrong). See the [Meta-Labeling](/docs/research/ml/meta-labeling) page for that pattern.
:::

## Label convention

For `task="multiclass"`, `train_model` calls `int(label_value)` for each sample. Your `record_label` calls must produce values that can be cleanly cast to `int`:

```python
self.record_label("triple_barrier", 1)    # upper barrier hit
self.record_label("triple_barrier", -1)   # lower barrier hit
self.record_label("triple_barrier", 0)    # vertical barrier (time expiry)
```

::: warning
Do not use `task="multiclass"` with boolean labels. Boolean `True` and `False` cast to `1` and `0`, so `class -1` would never exist. Use `task="binary"` for boolean labels.
:::

## Strategy example — triple-barrier in `before`

The triple-barrier pattern runs entirely in the `before` hook, without opening any actual position. Features and barrier levels are anchored once per observation window. On each subsequent bar the strategy checks whether a barrier has been touched.

```python
import jesse.indicators as ta
import numpy as np
from jesse.strategies import Strategy


class MyStrategy(Strategy):
    vertical_barrier = 50         # maximum holding period in bars

    # ── internal state ──────────────────────────────────────────────────────
    _features_recorded = False
    _record_index      = 0
    _barrier_upper     = None
    _barrier_lower     = None

    @property
    def _distance(self):
        return ta.atr(self.candles) * 2

    # ── single source of truth for features ─────────────────────────────────

    def ml_features(self) -> dict:
        atr   = ta.atr(self.candles) + 1e-9
        price = self.price

        ema9  = ta.ema(self.candles, 9)  + 1e-9
        ema21 = ta.ema(self.candles, 21) + 1e-9
        ema50 = ta.ema(self.candles, 50) + 1e-9

        closes    = self.candles[:, 2]
        log_ret_1 = float(np.log(closes[-1] / closes[-2])) if closes[-2] != 0 else 0.0
        log_ret_5 = float(np.log(closes[-1] / closes[-6])) if closes[-6] != 0 else 0.0

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
        return False   # no actual trades placed in gather mode

    def should_short(self) -> bool:
        return False   # no actual trades placed in gather mode

    def should_cancel_entry(self) -> bool:
        return True

    def before(self) -> None:
        if self.ml_mode != "gather":
            return

        if not self._features_recorded:
            self.record_features(self.ml_features())

            # ── Anchor barriers to this bar's price ──────────────────────
            price = self.price
            self._barrier_upper    = price + self._distance
            self._barrier_lower    = price - self._distance
            self._record_index     = self.index
            self._features_recorded = True
            return

        # ── On subsequent bars: check whether a barrier was touched ──────
        upper_touched    = self.price >= self._barrier_upper
        lower_touched    = self.price <= self._barrier_lower
        vertical_touched = (self.index - self._record_index) >= self.vertical_barrier

        if upper_touched or lower_touched or vertical_touched:
            label = 1 if upper_touched else (-1 if lower_touched else 0)
            self.record_label("triple_barrier", label)

            # ── Reset for the next observation ────────────────────────────
            self._features_recorded = False
            self._barrier_upper     = None
            self._barrier_lower     = None
```

## Training

```python
# train_multiclass.py
from sklearn.ensemble import RandomForestClassifier
from jesse.research import load_ml_data_csv, train_model

STRATEGY = "MyStrategy"
data     = load_ml_data_csv(STRATEGY)

result = train_model(
    data=data,
    estimator=RandomForestClassifier(
        n_estimators=300,
        max_depth=8,
        class_weight="balanced",   # handles -1/0/+1 imbalance automatically
        random_state=42,
    ),
    task="multiclass",
    test_ratio=0.2,
    save_to=f"strategies/{STRATEGY}",
    name=STRATEGY,
)

acc = result["metrics"]["accuracy"]
auc = result["metrics"]["roc_auc_macro"]   # macro one-vs-rest AUC
mcc = result["metrics"]["mcc"]
print(f"Accuracy        : {acc:.1%}")
print(f"ROC AUC (macro) : {auc:.3f}")
print(f"MCC             : {mcc:+.3f}")
```

## Choosing an estimator

Most sklearn classifiers support multiclass natively — no special wrapping needed.

| Classifier | Best dataset size | Handles noisy data | Handles class imbalance | Label constraints | Training speed | Notes |
|---|---|---|---|---|---|---|
| **Random Forest** | Medium–Large (5 k – 500 k) | ✅ Good | ✅ `class_weight="balanced"` | Any integers incl. negatives | Fast | Best default for triple-barrier; low overfitting risk |
| **XGBoost** | Large (> 50 k) | ✅ Good | ✅ `scale_pos_weight` / `sample_weight` | **Non-negative integers only** — must remap `{-1, 0, 1}` → `{0, 1, 2}` | Fast (GPU support) | Highest accuracy ceiling; requires label remapping for triple-barrier labels |
| **Multiclass SVM** | Small (< 10 k) | ⚠️ Can struggle on weak features | ✅ `class_weight="balanced"` | Any integers incl. negatives | Slow on large data | Uses one-vs-one strategy internally; requires `probability=True` for `predict_proba` |
| **Gradient Boosting** | Medium–Large (5 k – 500 k) | ✅ Good | ⚠️ Use `sample_weight` — no `class_weight` support | Any integers incl. negatives | Medium | Does **not** support `class_weight` directly; handle imbalance via `sample_weight` |


**Random Forest** — the recommended starting point for triple-barrier. `class_weight="balanced"` handles the common imbalance between `+1`, `0`, and `-1` classes automatically.

```python
from sklearn.ensemble import RandomForestClassifier

RandomForestClassifier(n_estimators=300, max_depth=8, class_weight="balanced")
```

**XGBoost** — higher accuracy on large datasets (> 50 k samples). For multiclass use `objective="multi:softprob"` and set `num_class`:

```python
from xgboost import XGBClassifier

XGBClassifier(
    objective="multi:softprob",
    num_class=3,
    n_estimators=300,
    max_depth=4,
    eval_metric="mlogloss",
)
```

::: warning
XGBoost expects class labels to be **non-negative integers** starting from `0`. If your labels are `{-1, 0, 1}`, you must remap them before passing data to `train_model`, and reverse the mapping when interpreting predictions in deploy mode:

```python
# Remap before training: -1→0, 0→1, 1→2
for p in data:
    p["label"]["value"] = {-1: 0, 0: 1, 1: 2}[p["label"]["value"]]

# In deploy mode, reverse: model.classes_ will be [0, 1, 2]
# class index 0 = original -1 (short), 1 = original 0 (neutral), 2 = original +1 (long)
```

This remapping is **not needed** for sklearn estimators (RandomForest, SVC, GradientBoosting) — they handle integer labels including negative ones natively.
:::

**Multiclass SVM** — sklearn's `SVC` supports multiclass via one-vs-one by default. Set `probability=True` for `predict_proba` support (needed by `train_model`).

```python
from sklearn.svm import SVC

SVC(probability=True, kernel="rbf", C=1.0, gamma="scale", class_weight="balanced")
```

## Understanding the training report

### Dataset section

Shows the count and percentage of each class (`triple_barrier = 1`, `triple_barrier = 0`, `triple_barrier = -1`). A typical triple-barrier dataset is roughly balanced between `+1` and `-1`, with fewer `0` samples.

### Feature importance

Same four-method consensus table as binary classification (RFE, ANOVA F-value, |Corr|, CV-Impact), but the proxy estimator and F-test are evaluated against all three classes.

### Model performance

**Summary metrics**

| Accuracy | ROC AUC (macro OVR) | MCC |
|---|---|---|
| 47.1% | 0.609 | +0.044 |

**Confusion matrix**

| | Pred -1 | Pred 0 | Pred +1 |
|---|---|---|---|
| **Actual -1** | 253 | 8 | 234 |
| **Actual 0** | 40 | 10 | 45 |
| **Actual +1** | 245 | 14 | 258 |

**Per-class precision / recall / F1**

| Class | Precision | Recall | F1 | Support |
|---|---|---|---|---|
| -1 | 0.470 | 0.511 | 0.490 | 495 |
| 0 | 0.312 | 0.105 | 0.157 | 95 |
| +1 | 0.480 | 0.499 | 0.490 | 517 |

Key metrics:

- **Accuracy** — fraction of correct predictions across all three classes. On its own this can be misleading: a model that always predicts the majority class can look decent while being useless. Check MCC and F1 alongside it.

- **ROC AUC (macro OVR)** — one-vs-rest AUC averaged across classes. Accessed as `result["metrics"]["roc_auc_macro"]`. For each class the model is asked "can you rank this class above the others?" — 0.5 means random, 1.0 means perfect. Macro averaging weights all three classes equally regardless of how many samples they have.

- **MCC** — Matthews Correlation Coefficient extended to multiclass. Ranges from −1 to +1; 0 means the model is no better than random guessing, +1 is perfect. It is the most reliable single-number summary on imbalanced data because it accounts for all cells of the confusion matrix at once. Accessed as `result["metrics"]["mcc"]`.

- **Confusion matrix** — rows are the true labels, columns are what the model predicted. The diagonal cells (top-left to bottom-right) are correct predictions; everything off the diagonal is a mistake. Large off-diagonal numbers tell you which pairs of classes the model confuses most — for triple-barrier data, `+1` and `-1` being confused with each other is far more costly than either being confused with `0`.

- **Precision** (per class) — of all the times the model predicted this class, how often was it actually correct? High precision means few false alarms. In a trading context: if precision for `+1` is 0.48, the model's "go long" signals are right only 48 % of the time.

- **Recall** (per class) — of all the samples that truly belong to this class, how many did the model catch? High recall means few missed signals. Low recall on `+1` means many real winning opportunities were ignored.

- **F1** (per class) — the harmonic mean of precision and recall: `2 × (precision × recall) / (precision + recall)`. It balances the two — a model that achieves high precision by being very selective (low recall) will be penalised, and so will a model that catches everything (high recall) but fires too many false alarms (low precision). The `0` (neutral) class typically has the lowest F1 because range-bound bars are genuinely ambiguous; this is expected and acceptable.

- **Support** — the number of test samples in each class. Useful for judging how reliable the precision/recall/F1 numbers are: a class with only 95 samples (like `0` above) will show noisier metrics than one with 500+.

### Feature impact

Same as binary: the model is retrained without each feature in turn and test accuracy is compared to the baseline. The ±1.5% dead zone applies here too — changes smaller than 1.5% are reported as `neutral` since they are within the noise margin of retraining on a small financial dataset.

## The `0` class — keep or drop?

A common question is whether to include the `0` (time-expiry) samples in training at all. There are two schools of thought:

**Keep them** — The `0` class captures periods of genuine indecision. A model that correctly predicts `0` avoids entering trades that would just expire neutral, saving on fees.

**Drop them** — If you only care about direction (`+1` vs `-1`), filtering out `0` samples turns the problem back into binary and often produces higher accuracy on the classes that matter.

To train only on `+1` vs `-1`, filter the data before passing it to `train_model`. Because the `> 0` mapping rule applies, `+1` becomes class 1 and `-1` becomes class 0 automatically when using `task="binary"`:

```python
from sklearn.ensemble import RandomForestClassifier
from jesse.research import load_ml_data_csv, train_model

data     = load_ml_data_csv("MyStrategy")
filtered = [p for p in data if p["label"]["value"] != 0]

print(f"Kept {len(filtered):,} directional samples "
      f"(dropped {len(data) - len(filtered):,} neutral)")

result = train_model(
    data=filtered,
    estimator=RandomForestClassifier(
        n_estimators=300, class_weight="balanced", random_state=42
    ),
    task="binary",   # +1 → class 1,  -1 → class 0  (via the > 0 rule)
    test_ratio=0.2,
    save_to=f"strategies/MyStrategy",
    name="MyStrategy",
)
```

::: tip
This filtered binary model is often the most useful variant of a triple-barrier dataset: it tells you "when price moved significantly, did it go up or down?" — without the ambiguity of the neutral `0` class.
:::

## Using the model in deploy mode

In deploy mode, call `self.ml_predict_proba()` directly. It automatically loads the model, calls `self.ml_features()`, scales the features, and returns a `{class_label: probability}` dict.

```python
def should_long(self) -> bool:
    if self.ml_mode == "gather":
        return False
    probs     = self.ml_predict_proba()
    prob_up   = probs.get(1, 0.0)
    prob_down = probs.get(-1, 0.0)
    # Enter long only when the model strongly favours the +1 class
    return prob_up >= 0.55 and prob_up > prob_down * 1.2

def should_short(self) -> bool:
    if self.ml_mode == "gather":
        return False
    probs     = self.ml_predict_proba()
    prob_down = probs.get(-1, 0.0)
    prob_up   = probs.get(1, 0.0)
    return prob_down >= 0.55 and prob_down > prob_up * 1.2
```

Because `ml_features()` is defined once and used by both `before()` (gather mode) and `ml_predict_proba()` (deploy mode), train/deploy feature skew is impossible. See the [Deploying in a Strategy](/docs/research/ml/deploying) page for the full combined template.
