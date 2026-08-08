# Exports

After a backtest completes, Jesse can export your results in several formats so you can analyze trades in external tools or share results with others.

All export options are available in the **Options** section of the backtest form before you run the backtest. Enable the ones you need, then start the backtest as usual. Once it finishes, the download buttons for each enabled export will appear in the results panel.

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
