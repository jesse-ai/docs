# Backtest

Backtesting is the process of simulating your trading strategy against historical data to evaluate its performance before risking real money. Jesse's backtest engine is the most accurate available, simulating market conditions as faithfully as possible including fees, and order types.

## Running a Backtest

Before running a backtest, make sure you have:

1. [Created a strategy](../strategies/generating-new-strategy.md)
2. [Imported historical candles](../import-candles.md) for your target exchange/symbol

Once ready, navigate to the **Backtest** page in the dashboard, configure your routes and date range, and press the **Start** button. Jesse will simulate every candle in the selected range and execute your strategy logic candle by candle.

## Results

Once the backtest completes, you will see a comprehensive [results panel](./results.md) with metrics such as net profit, win rate, max drawdown, Sharpe/Calmar/Sortino ratios, annual return, and many more. Alongside the metrics table, a set of [charts](./charts.md) gives you a visual breakdown of performance from multiple angles — including cumulative returns vs a benchmark, drawdown periods, the underwater plot, a monthly returns heatmap, and trade P&L distribution.

## What's in This Section

- **[Tabs](./tabs.md)** — How to manage multiple simultaneous backtest sessions using tabs
- **[Results](./results.md)** — A full reference for every metric in the results table and how to interpret it
- **[Charts](./charts.md)** — Interpreting the full set of performance charts: cumulative returns, drawdown periods, underwater plot, monthly heatmap, and trade P&L distribution
- **[Interactive Charts](../charts/Interactive-charts.md)** — Visually inspecting every trade entry and exit on a candlestick chart
- **[Exports](./exports.md)** — Exporting results to CSV, JSON, TradingView Pine Script, and legacy charts
- **[Benchmark](./benchmark.md)** — Running multiple backtest configurations simultaneously and comparing them ✨