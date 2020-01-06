# Backtest simulation

Assuming your already have [imported](./import.md) historical candles, and have set correct [routes](./routes.md) for your strategy, run:

```
jesse backtest start_date finish_date
```

Of course, `start_date` and `finish_date` must be valid date strings. A working example would be:

```
jesse backtest 2019-01-01 2019-11-01
```

And here is the output:

```
 CANDLES                |
------------------------+-------------------------
 total                  |             434880 * 1m
 trading symbols        |                 BTCUSDT
 considering symbols    |                 BTCUSDT
 trading timeframes     |                      4h
 considering timeframes |              1m, 1D, 4h
 period                 | 302 days (10.07 months)


 exchange   | symbol   | timeframe   | strategy         | DNA
------------+----------+-------------+------------------+-------
 Binance    | BTCUSDT  | 4h          | TrendFollowing04 |


Executing simulation...  [####################################]  100%
Executed backTest simulation in:  11.121385097503662


 TRADES                                |
---------------------------------------+------------------------------------
 total                                 |                                 15
 starting-finishing balance            |                  10000 => 14924.81
 fee                                   |                              59.18
 PNL (%)                               |                   4924.48 (49.24%)
 PNL% every 100 trades                 |                             328.0%
 expectancy (%)                        |                      328.3 (3.28%)
 average win/loss                      |                      779.67/187.56
 win rate                              |                                53%
 min-average-max R                     |                1.8 - 12.69 - 76.24
 longs/shorts                          |                            67%/33%
 average holding period                |  4.0 days, 3.0 hours, 18.0 minutes
 winning trades average holding period | 5.0 days, 18.0 hours, 58.0 minutes
 losing trades average holding period  |  2.0 days, 5.0 hours, 57.0 minutes
```

## Charts

Performing backtest with the `chart` flag would print out charts for the balance change in the backtest period and displaying buy/sell points.

```
jesse backtest 2019-01-01 2019-10-30 --chart
```

Now this time at the end of the statistics Jesse prints the path to the chart image:

```
Chart output saved to:
/Users/sully/Codes/jesse/jesse/storage/logs/charts/BT-2019-12-07T16:13:14.png
```

And here's the image (click to zoom or open image in a new tab to see the full size):
![symbols](../docs/imgs/backtest-chart.png)


## Detailed trade data
Every time a backtest command is launched a json file is produced with all the trade data. File are stored in the `storage/logs/trades/` folder. This is an example of the content of the files:

```
{
 "trades": [
		{
			"id": "9eed8f7e-babd-4018-96b0-e428c7e7152b",
			"strategy_name": "TrendFollowing04",
			"strategy_version": "0.0.1",
			"symbol": "BTCUSDT",
			"exchange": "Binance",
			"type": "short",
			"entry_price": 8153.29,
			"exit_price": 8365.32,
			"take_profit_at": 7234.659999999999,
			"stop_loss_at": 8365.32,
			"qty": 0.01,
			"fee": 0.16518610000000003,
			"reward": 9.18630000000001,
			"size": 81.5329,
			"risk": 2.1202999999999976,
			"risk_percentage": 2.6,
			"R": 4.332547281045144,
			"PNL": -2.2854860999999977,
			"PNL_percentage": -2.8,
			"holding_period": 108780.0,
			"opened_at": 1570521960000.0,
			"closed_at": 1570630740000.0,
			"entry_candle_timestamp": 1570521600000.0,
			"exit_candle_timestamp": 1570622400000.0,
			"orders": [
				{
					"id": "9eed8f7e-babd-4018-96b0-e428c7e7152b",
					"exchange_id": "",
					"symbol": "BTCUSDT",
					"exchange": "Binance",
					"side": "sell",
					"type": "STOP",
					"flag": null,
					"qty": -0.01,
					"price": 8153.29,
					"status": "EXECUTED",
					"created_at": 1570521540000.0,
					"executed_at": 1570521960000.0,
					"canceled_at": null,
					"role": "OPEN POSITION"
				},
				{
					"id": "7ad5c7ca-1b28-44d7-a118-7fb9047521c1",
					"exchange_id": "",
					"symbol": "BTCUSDT",
					"exchange": "Binance",
					"side": "buy",
					"type": "STOP",
					"flag": "ReduceOnly",
					"qty": 0.01,
					"price": 8365.32,
					"status": "EXECUTED",
					"created_at": 1570593540000.0,
					"executed_at": 1570630740000.0,
					"canceled_at": null,
					"role": "CLOSE POSITION"
				}
			]
		},
  ...
  ]
}
```

## TradingView

This feature is useful for those whom use [TradingView](https://www.tradingview.com) for their chart needs.
Add the `tradingview` flag to the backtesting command

```
jesse backtest 2019-01-01 2019-10-30 --tradingview
```

at the end of the process of backtesting you will find a new txt file in `storage/trading-view-pine-editor/` with a pine script as content. Then you can copy and paste that script in the [TradingView](https://www.tradingview.com) Pine Editor as a new study script, adding it in the chart you will see entrances and exits of the strategy (add this script in the same pair and same timeframe).
