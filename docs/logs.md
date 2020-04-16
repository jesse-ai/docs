# Logging

Usually, the statistics that are shown after each backtest, the debugging output using the `--debug` flag, and the charts that are generated using the `--chart` flag are enough for developing strategies. However, if you need further details you may use log files.

After each execution, a log file is created with full details of the trades. 

## Trades

Every time a backtest simulation is executed, a json file is generated with all the trade data. The generated file is stored at the `storage/logs/trades/` folder. This is an example of the content of the files:

```json
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
