# Charts

Jesse provides charts for inspecting strategy behavior during backtests and while paper or live trading.

## Interactive Charts

The [Interactive Charts](./interactive-charts.md) view combines candlesticks, executed-order markers, strategy-added indicator lines, horizontal levels, and separate indicator panes. Backtest charts display the completed simulation, while live charts stream the current candle and strategy values as the session runs.

## Backtest Result Charts

The [Backtest Result Charts](../backtest/charts.md) summarize performance through cumulative returns, drawdowns, monthly returns, and trade P&L distributions.

## Equity Curve

After the backtest simulation is finished, you will get to see the **equity curve** of your daily balances. Here is how it looks:

![Equity curve showing a strategy's daily balance](https://cdn.jesse.trade/images/1efff5cc-b6ee-4098-99a6-a85ddb7f7abb.png)

You can also enable the **benchmark** feature to compare your equity curve to a **buy-and-hold** strategy for the assets you are trading.

![Equity curve comparing the strategy with its BTC-USDT benchmark](https://cdn.jesse.trade/images/35e3ac14-b675-4eaa-befe-a4d84d35eda2.png)
