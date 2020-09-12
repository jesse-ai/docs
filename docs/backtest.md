# Backtest

Assuming you already have [created](./strategies/generating-new-strategy.md) your first strategy, [imported](./import-candles.md) historical candles, and have set correct [routes](./routes.md) for your strategy, it is time to actually backtest it:

```
jesse backtest start_date finish_date
```

`start_date` and `finish_date` must be valid date strings in `YY-MM-DD` format. A working example would be:

```
jesse backtest 2016-01-01 2020-04-06
```

And here is the output:

```
 CANDLES              |
----------------------+--------------------------
 period               |   1557 days (4.27 years)
 starting-ending date | 2016-01-01 => 2020-04-06


exchange    | symbol   | timeframe   | strategy
------------+----------+-------------+--------------------+-------
 Bitfinex   | BTCUSD   | 6h          | TrendFollowingStrategy


Executing simulation...  [####################################]  100%
Executed backtest simulation in:  107.89 seconds


METRICS                          |
---------------------------------+------------------------------------
 Total Closed Trades             |                                192
 Total Net Profit                |                 64735.12 (647.35%)
 Starting => Finishing Balance   |                   10000 => 74659.0
 Total Open Trades               |                                  0
 Open PL                         |                                  0
 Total Paid Fees                 |                           10620.84
 Max Drawdown                    |                            -24.83%
 Sharpe Ratio                    |                                1.2
 Annual Return                   |                             38.43%
 Expectancy                      |                     337.16 (3.37%)
 Avg Win | Avg Loss              |                   1261.49 | 351.89
 Ratio Avg Win / Avg Loss        |                               3.58
 Percent Profitable              |                                43%
 Longs | Shorts                  |                          58% | 42%
 Avg Holding Time                | 3.0 days, 20.0 hours, 15.0 minutes
 Winning Trades Avg Holding Time | 6.0 days, 11.0 hours, 19.0 minutes
 Losing Trades Avg Holding Time  |  1.0 day, 21.0 hours, 14.0 minutes
```

There are further metrics that are disabled by default. To enable them open your project's `config.py` file and set the values to True:
```py
'metrics': {
    'sharpe_ratio': True,
    'calmar_ratio': False,
    'sortino_ratio': False,
    'omega_ratio': False,
    'winning_streak': False,
    'losing_streak': False,
    'largest_losing_trade': False,
    'largest_winning_trade': False,
    'total_winning_trades': False,
    'total_losing_trades': False,
}
```

## Charts

Performing backtest with the `chart` flag would print out charts for the balance change of your portfolio in the backtest period, and buy/sell points on the asset price change%.

```
jesse backtest 2016-01-01 2020-04-06 --chart 
```

When the backtest is finished, Jesse prints the path to the output chart image file:

```
Chart output saved at:
storage/charts/BT-2020-04-13T15-44-42.png
```

And here's the image (click to zoom or open image in a new tab to see the full size):
![chart](https://raw.githubusercontent.com/jesse-ai/jesse/master/assets/chart-example.png)

## TradingView

This feature is useful for those who use [TradingView](https://www.tradingview.com) for their chart needs.
Add the `--tradingview` flag to the backtest command:

```
jesse backtest 2019-01-01 2019-10-30 --tradingview
```

At the end of the process, it will print out the path to a .txt file with a pine script as content. Then open the file, copy its content and paste it inside [TradingView's](https://www.tradingview.com) Pine Editor. Now click on "Add to chart" and you will see entries and exits of the strategy.

::: warning
Make sure to see the chart in the same timeframe as the backtest simulation was executed on. Also, only the last ~30 trades are displayed because of a limit on TradingView's side.
:::

## CSV

Jesse can output completed trades into a CSV file. You may open this CSV file with Excel, Google sheets, or whatever tool you like to analyse completed trades, draw further charts, etc.

**Usage:** Add the `--csv` flag to the backtest command:
```
jesse backtest 2019-01-01 2019-10-30 --csv
```

Once the backtest is completed, Jesse will print the path to the CSV file.

## JSON

Jesse can output completed trades into a file with JSON format. JSON format is a popular javascript format that is usually used to create APIs on the web. 

**Usage:** Add the `--json` flag to the backtest command:
```
jesse backtest 2019-01-01 2019-10-30 --json
```

Once the backtest is completed, Jesse will print the path to the JSON file.

