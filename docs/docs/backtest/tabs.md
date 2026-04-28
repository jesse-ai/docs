# Backtest Tabs

Jesse's backtest page supports **multiple tabs**, allowing you to run and compare several backtest configurations side by side without losing your previous results.

## Opening a New Tab

Click the **+** button at the top of the backtest page to open a new tab. Each tab is completely independent and has its own:

- Route configuration (exchange, symbol, timeframe, strategy)
- Date range and starting balance
- Backtest options (fees, leverage, etc.)
- Results and metrics

This means you can have one tab running a backtest on `BTC-USDT` with a 1h timeframe while another is already showing results for `ETH-USDT` on a 4h timeframe.

## Switching Between Tabs

Click any tab at the top of the page to switch to it. Tabs persist their state — switching away from a tab and coming back will show exactly what you left, including completed results.

You can also use the **← / →** arrow keys on your keyboard to quickly cycle through your open tabs without reaching for the mouse.

## Renaming Tabs

Double-click on a tab's title to rename it. Giving tabs descriptive names (e.g. `BTC 1h 2023`, `ETH 4h no fees`) makes it easier to keep track of what each configuration represents.

## Closing Tabs

Click the **×** icon on a tab to close it. You will be asked to confirm if the tab contains unsaved results. The last remaining tab cannot be closed.

For faster tab management, you have two additional shortcuts:

- Press the **W** key on your keyboard while a tab is active to close it instantly.
- **Middle-click** (press the scroll wheel) on any tab to close it directly, without having to aim for the small × icon.

## Why Use Multiple Tabs?

Multiple tabs are especially useful when you want to:

- Quickly compare results across different symbols or timeframes without reconfiguring
- Keep a "reference" backtest open while you tweak parameters in a new tab
- Run several backtests back-to-back and review all of them at the end

::: tip
If you want to run many configurations **simultaneously** and compare them in a structured, side-by-side table, check out the [Benchmark](./benchmark.md) feature — it is purpose-built for that workflow. Instead of manually switching between tabs and noting down numbers, Benchmark runs all your configurations in parallel and ranks them by any metric you choose.
:::