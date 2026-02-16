# Monte Carlo Analysis

Monte Carlo analysis is a powerful way to test how robust your trading strategies really are. It helps you find out whether your backtest results are due to genuine skill or just luck.

Like all other features of Jesse, Monte Carlo is designed to give you full flexibility, and yet it is very easy to use.

However, to take full advantage of it, you need to have a basic understanding of how it works; so make sure to read all of this page, carefully.

You can also [see it in action on YouTube](https://youtu.be/MKyKTlHZBio).

## How does it work?

Jesse provides two Monte Carlo methods that test different aspects of your strategy:

1. **[Trade-Order Shuffling](/docs/monte-carlo/trade-order-shuffling)** - Tests whether the timing of your trades matters for your overall performance
2. **[Candles-Based](/docs/monte-carlo/candles-based)** - Tests how well your strategy holds up under slightly different market conditions

Both methods create many test scenarios by changing the original data in different ways, then compare your original strategy results against all the test results.

## What questions does it answer?

Monte Carlo analysis helps answer important questions about your trading strategy:

- **Is my strategy's performance due to skill or just luck?**
- **How well does my strategy work in different market conditions?**
- **What range of results can I expect?**
- **Are my results meaningful or just random?**

## How it helps prevent overfitting

Monte Carlo analysis is an effective guard against overfitting. By running your strategy across many alternate market scenarios and shuffled trade sequences, Monte Carlo exposes results that only work for the original historical path. If the original backtest is an outlier while most simulations perform worse, this indicates overfitting — the strategy likely relies on specific price moves or timing that won't repeat. Use Monte Carlo findings to:

- Identify fragile parameter choices and reduce curve-fitting.
- Prefer strategy configurations that perform consistently across simulations rather than those that only excel on the original data.
- Combine both trade-order shuffling and candles-based simulations to test both timing sensitivity and structural robustness of your strategy.

Apply Monte Carlo early in development and after tuning to ensure changes improve genuine robustness and not just historical fit.

::: tip
Monte Carlo analysis is also available programmatically via the [research module](/docs/research/monte_carlo) for use in custom Python scripts and Jupyter Notebooks.
:::
