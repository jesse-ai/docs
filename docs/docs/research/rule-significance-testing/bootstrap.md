# Bootstrap Significance Test

::: info This page explains how the test works under the hood
If you just want to use `rule_significance_test()`, you can skip this page entirely and go straight to the [Usage Example](/docs/research/rule-significance-testing/usage). Come back here if you are curious about the statistical machinery behind it.
:::

The bootstrap test answers a simple question: **could your trading rule's observed returns have appeared by chance?** It builds a null distribution by resampling the rule's own returns thousands of times and measures how often a random resample beats the real result.

## How it works

The test runs in two phases.

**Phase 1 — Signal collection:**
Jesse runs a signal-only backtest using your strategy. At every completed bar, `should_long()` and `should_short()` are called and the raw entry signal is recorded as `+1` (long), `-1` (short), or `0` (neutral). No orders are ever submitted during this phase.

**Phase 2 — Bootstrap simulation:**

1. **Compute rule returns.** For each bar, multiply the signal by the detrended log-return: `signal × (log_return − market_mean)`. Neutral bars (signal `= 0`) contribute `0` and are excluded naturally.
2. **Zero-centre the array.** Subtract the observed mean from every rule return: `centered = rule_returns − observed_mean`. This enforces the null hypothesis that the rule has no edge (expected return = 0).
3. **Resample with replacement.** Draw `n_simulations` bootstrap resamples from the zero-centred array, each the same length as the original. Compute the mean of each resample to build the null sampling distribution.
4. **Compute the p-value.** Count the fraction of simulated means that are greater than or equal to the observed mean: `p_value = mean(sim_means >= observed_mean)`.

## Why zero-centering matters

Without zero-centering, resampling would draw from the original rule returns, which are already centred on the observed mean. The null distribution would then be centred on that same value, so roughly half the simulated means would always exceed it — giving a p-value of approximately 0.5 regardless of how good or bad the rule actually is.

Zero-centering shifts the array so its mean is exactly zero before resampling begins. Now the null distribution represents a world where the rule has no edge at all. A rule with genuine predictive power will produce an observed mean that sits far to the right of this distribution, yielding a small p-value.

::: tip
The p-value is **not** the probability that your rule works. It is the probability of seeing a mean return this large (or larger) by pure chance, assuming the null hypothesis is true. A small p-value is evidence against the null — not proof of profitability.
:::

## Why Bootstrap?

- **No parametric assumptions.** Bootstrap resamples the empirical return distribution directly, making no assumption about normality or any other distributional shape. Financial returns are heavy-tailed — this matters.
- **Well-established.** The bootstrap significance test has a solid track record in the quantitative finance literature for testing whether a trading rule beats a random benchmark after accounting for data-snooping bias.
- **Robust and simple.** The resampling procedure is transparent, easy to audit, and produces results that are straightforward to interpret.

::: tip
Use at least **2000 simulations** for a stable p-value. The default of 200 is intentionally conservative for quick exploratory runs. Increase `n_simulations` and set a fixed `random_seed` before drawing final conclusions.
:::

---

For guidance on reading the p-value and interpreting the histogram chart, see [Interpreting Results](/docs/rule-significance-testing/interpreting-results).
