# Backtest

Assuming you already have [created](./strategies/generating-new-strategy.md) your first strategy and [imported](./import-candles.md) historical candles for your strategy, it is time to actually backtest it:

![backtest-dark-1](https://api1.jesse.trade/storage/images/docs/backtest-dark-1.jpg)

After choosing the routes, press the "Start" button. And here are the results:

![backtest-results](https://api1.jesse.trade/storage/images/docs/backtest-results.jpg)

## Charts

Other than the chart that you see in the metrics section, there are also two  "Legacy Charts" which you can enable by toggling the "Export Charts" checkbox in the backtesting options section. These two charts will be moved into the metrics section in the future. 

After the backtest is finished, you can download the charts by pressing the "Legacy Chart" button. Here is an example of the charts:

![legacy-charts-example](https://api1.jesse.trade/storage/images/docs/legacy-charts-example.jpg)

## TradingView

This feature is useful for those who use [TradingView](https://www.tradingview.com) for their chart needs.
To enable it, you need to check the "Export Tradingview" option in the backtest form. 

At the end of the process, you will be able to download a `.txt` file with a pine script as content. Then open the file, copy its content, and paste it inside [TradingView's](https://www.tradingview.com) Pine Editor. Now click on "Add to chart" and you will see entries and exits of the strategy.

::: warning
Make sure to see the chart in the same timeframe as the backtest simulation was executed. Also, only the last ~30 trades are displayed because of a limit on TradingView's side.
:::

::: warning
The numbers in Tradingview's backtesting metrics are usually different than what you see in Jesse's. That is perfectly normal considering that Tradingview is not primarily a backtesting software, and its results are not to be counted on. Jesse however, is. 
:::

## CSV

Jesse can output completed trades into a CSV file. You may open this CSV file with Excel, Google sheets, or whatever tool you like to analyze completed trades, draw further charts, etc. 

To use it, check the "Export CSV" option in the backtesting form. Once the backtest is completed, Jesse will print the path to the CSV file which you can download. 

## JSON

Jesse can output completed trades into a file in JSON format. The JSON format is a popular javascript format that is usually used to create APIs on the web. 

Check the "Export JSON" option in the backtesting form to use it. Once the backtest is complete, Jesse will print the path to the JSON file.

## Visual analysis of completed trades

There is a tool called "Jesse trades info" made by one of the community members. It helps to parse JSON backtest files and to display them in a convenient way using tables and charts.

You can find screenshots and a video on its [Github repository page](https://github.com/nicolay-zlobin/jesse-trades-info). 
