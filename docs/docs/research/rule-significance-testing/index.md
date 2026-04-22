# Rule Significance Testing

This page covers programmatic usage of Rule Significance Testing via Jesse's research module, making it easy to run the test in Python scripts and Jupyter Notebooks.

::: tip
For a full conceptual introduction — including the null hypothesis, how bootstrapping works, and when to use this feature — see the main [Rule Significance Testing](/docs/rule-significance-testing/) documentation.
:::

## Available functions

- **`rule_significance_test`** — runs the full two-phase analysis and returns the observed mean return, the distribution of simulated returns, and the p-value.
- **`plot_significance_test`** — renders a histogram of the simulation results with the observed mean marked, so you can visualise where your rule stands relative to the null distribution.



::: tip
`plot_significance_test` requires `matplotlib`. Install it with `pip install matplotlib` if you do not already have it.
:::

## Next steps

- [Usage Example](/docs/research/rule-significance-testing/usage) — complete runnable scripts for strategies with and without a genuine edge
