# Executing the optimize mode

Executing an optimization session is similar to how you execute a [backtest](../backtest.md):

![optimize-mode](https://api1.jesse.trade/storage/images/docs/optimize-mode.jpg)
 
## Important considerations

There are a few notes to be aware of when executing an optimization session:

- Routes are limited to only "one trading route". You can define multiple extra routes, however. 
- To prevent overfitting, the duration of the period should not be too short. For example, don't optimize a strategy for a 3 days period and then expect it to crush it in all market conditions!
- The optimize mode works best with strategies that already show some promise. Its purpose is to fine-tune parameters, not turn a losing strategy into a winning one.

## Training and Testing Periods

The optimization mode requires you to define both a training period and a testing period. This split approach is crucial for preventing overfitting:

- The **Training Period** is used to search for optimal parameters
- The **Testing Period** is used to validate those parameters on unseen data

A common approach is to allocate more time to the training period (e.g., 70-80% of your data) and use the remaining data for testing.

## Optimal Trades

The `Optimal number of trades` input expects an integer that tells Jesse how many trades you would find optimal for your strategy in **that time period**. This parameter helps filter out parameter combinations that result in too few trades.

This is an incredibly important parameter for optimization which helps filter out impractical strategies. 

For example, imagine that I have a trend-following strategy that I trade on the `6h` timeframe and I usually get 30-60 trades per year in my backtests. You could say that I'll be fine with parameter combinations that cause my strategy to execute the same number of trades (30-60). But will I be fine if it only made 5 trades in a whole year but had a higher win-rate? The answer is no. Because such backtest results cannot be trusted in the long term. I want to have the law of big numbers in my favor to stay away from the dangers of over-fitting. 

Thus, by setting my `Optimal number of trades` to a number like `60` I will successfully filter out such impractical parameter combinations. 

::: tip
When in doubt about the correct value for the `Optimal number of trades`, try setting it higher than what you have in mind, but not lower. 

For example, in my example, the average number of trades per year is 30-60, so I would set `Optimal number of trades` to `60`. I could set it to `100` and it would still work just fine, but if I had set it to like 10, it might have broken some calculations of the optimize mode. 
:::

## CPU Cores

One of the advantages of the new optimization system is the ability to use multiple CPU cores. The more cores you allocate, the faster the optimization process will complete. 

## Objective Function

By default, Jesse optimizes for the Sharpe ratio, which measures the risk-adjusted return of your strategy. You can change this in the settings to other metrics:

- **Sharpe Ratio**: Measures excess return per unit of risk
- **Calmar Ratio**: Measures return relative to maximum drawdown
- **Sortino Ratio**: Similar to Sharpe but only penalizes downside volatility
- **Omega Ratio**: Measures probability weighted ratio of gains versus losses
- **Serenity Index**: A custom metric that balances multiple factors

## Optimization settings

There's a section in the settings page in the dashboard which allows you to change the settings for the optimization mode:

![settings-optimize-mode](https://api1.jesse.trade/storage/images/docs/settings-optimize-mode.jpg)

## When is the optimization over?

After starting the optimize mode, Jesse begins running trials with different parameter combinations. Each trial evaluates a set of parameters on both the training and testing periods, generating metrics for each.

The system ranks parameter combinations based on their performance, with the best ones shown at the top of the results table. You can monitor progress via:

1. The progress bar indicating completed trials
2. The "Best Trials" table showing the top-performing parameter combinations
3. The objective curve chart showing how performance improves over time

The optimization runs until the specified number of trials is complete. However, you can pause the process at any time if you see promising results. Each parameter combination is saved with its performance metrics, allowing you to select the best one for your strategy.

Once you find parameter combinations that perform well on both training and testing periods, you can:

- Copy the DNA string by clicking the "Copy" button next to the desired trial
- View detailed parameter values by clicking the "Info" button

See [Using Optimization Results](./dna-usage.md) for details on how to implement either approach in your strategy. 
