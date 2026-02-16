# Candles-Based Monte Carlo

Candles-based Monte Carlo tests how robust your strategy is by running backtests on **slightly modified versions** of the original market data. It uses candle pipelines to create different market scenarios while keeping the basic patterns of the original data.

## How it works

1. Runs the original backtest on unchanged data
2. For each test scenario, uses a candle pipeline to modify the market data
3. Runs a full backtest on the modified data
4. Compares your original performance against all the modified-data results

## Running a candles-based Monte Carlo session

Running a candles-based Monte Carlo session is similar to how you execute a [backtest](../backtest.md):

<!-- TODO: add screenshot of the candles-based Monte Carlo page in the dashboard -->

### Number of Scenarios

The `Number of Scenarios` input determines how many modified versions of the market data to test against. Since each scenario runs a full backtest, this method is slower than trade-order shuffling.

We recommend at least **100 scenarios** for candles-based Monte Carlo.

### Candle Pipeline

The candle pipeline determines **how** the market data is modified for each scenario. Jesse provides two built-in pipelines — see the [Candle Pipelines](/docs/monte-carlo/candle-pipelines) page for full details on each option and how to choose between them.

### CPU Cores

Monte Carlo analysis can use multiple CPU cores for faster processing. By default, it uses 80% of your available cores. The more cores you allocate, the faster the analysis will complete.

## Understanding the results

This method tests how your strategy works under slightly different market conditions:

- **Steady performance** across scenarios means you have a **robust strategy** that doesn't rely on specific historical price patterns.
- **Big differences** in results across scenarios means your strategy is **sensitive to specific market patterns** — a warning sign for overfitting.

See [Interpreting Results](/docs/monte-carlo/interpreting-results) for a detailed guide on reading the results table.
