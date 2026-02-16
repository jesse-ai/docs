# Trade-Order Shuffling

Trade-order shuffling tests whether the **timing** of your trades affects the overall performance. It mixes up the order of trades from your original backtest while keeping each individual trade result the same.

## How it works

1. Runs the original backtest to collect all trades
2. For each test scenario, randomly shuffles the order of these trades
3. Rebuilds the equity curve with the shuffled trade order
4. Calculates performance numbers for each shuffled scenario
5. Compares your original results against all the shuffled results

## Running a trade-order shuffling session

Running a trade-order shuffling Monte Carlo session is similar to how you execute a [backtest](../backtest.md):

<!-- TODO: add screenshot of the trade-order shuffling Monte Carlo page in the dashboard -->

### Number of Scenarios

The `Number of Scenarios` input determines how many shuffled versions of your trade sequence to generate. More scenarios give you more reliable statistical results.

We recommend at least **1000 scenarios** for trade-order shuffling. Since this method only reshuffles existing trades (no new backtests are run), it is very fast even with a high number of scenarios.

### CPU Cores

Monte Carlo analysis can use multiple CPU cores for faster processing. By default, it uses 80% of your available cores. The more cores you allocate, the faster the analysis will complete.

## Understanding the results

This method separates the effect of **trade timing** from **trade selection**:

- A strategy that performs well even after shuffling shows **good trade selection** — the individual trades are solid regardless of when they happen.
- Poor performance after shuffling means your strategy **depends on specific market timing** — the order of wins and losses matters significantly.

**What the numbers mean**: If your original strategy's performance ranks in the top 5% of shuffled scenarios, it means the timing of trades really matters for your performance — which is a warning sign.

See [Interpreting Results](/docs/monte-carlo/interpreting-results) for a detailed guide on reading the results table.
