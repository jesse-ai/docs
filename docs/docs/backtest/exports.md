# Exports

After a backtest completes, Jesse can export your results in several formats so you can analyze trades in external tools or share results with others.

The PDF, CSV and JSON exports are available in the **Options** section of the backtest form before you run the backtest. Enable the ones you need, then start the backtest as usual. Once it finishes, the download buttons for each enabled export will appear in the results panel.

## PDF Report

Jesse can turn a backtest into a report you can download, save or share.

**How to enable:** Check the **Export PDF** option in the backtest form before starting.

Once the backtest finishes, click **PDF report** in the results panel. The backtest needs at least one trade.

The report includes:

- **Summary** — the key figures, the cumulative returns charts and the backtest's setup.
- **Metrics** — return, risk and trading metrics, the worst drawdowns and yearly returns.
- **Drawdowns and returns** — the drawdown, underwater and monthly returns heatmap charts.
- **Distributions and timing** — the distributions of monthly returns and trade P&L, and entry timing.
- **Routes** — when the backtest has more than one route, the result of each route.
- **Details** — hyperparameters, data routes and your session notes, when the backtest has any.

The report uses the same [charts](./charts.md) you see in the results panel, in the same theme: a backtest you ran in dark mode gets a dark report. If the [Benchmark](./results.md#buy-hold-benchmark) option was enabled, the metrics and the table of routes also show Buy & Hold next to your results.

Backtests that ran without this option don't show the button. Run them again with it enabled to get one.

If you use Jesse through an [AI assistant](/docs/mcp/setup), ask it for a PDF report. It only creates one when you ask, and saves it in your project's `research_scripts/backtest_reports` folder.

## CSV

Jesse can export all completed trades into a CSV (comma-separated values) file.

**How to enable:** Check the **Export CSV** option in the backtest form before starting.

Once the backtest finishes, click the **Download CSV** button in the results panel. You can open the file with:

- Microsoft Excel
- Google Sheets
- Any data analysis tool (pandas, R, etc.)

The CSV includes one row per completed trade with columns for entry time, exit time, entry price, exit price, quantity, side (long/short), P&L, and more. This makes it easy to build custom charts, run statistical analyses, or filter trades by criteria that Jesse's built-in metrics don't expose.

## JSON

Jesse can also export completed trades in JSON format, which is convenient if you want to process the data programmatically or feed it into a custom visualization tool.

**How to enable:** Check the **Export JSON** option in the backtest form before starting.

Once the backtest finishes, click the **Download JSON** button in the results panel.

### Community Tool: Jesse Trades Info

A community member has built a tool called **Jesse Trades Info** that parses Jesse's JSON export and displays trades in an interactive interface with tables and charts. You can find screenshots, a demo video, and installation instructions on its [GitHub repository](https://github.com/nicolay-zlobin/jesse-trades-info).
