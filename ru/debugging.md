# Отладка

To debug your strategies, you have two options:

## 1. Generated log files 
Jesse can generate log files in json, csv, charts, and tradinview's pine-edit which are helpful to see what trades were actually executed. 

## 2. Debug mode 

When backtests are executed with the `--debug` flag, you won't see the progressbar showing when the backtest will be finished. Instead, you will the exact candles, order executions, position updates, and basically every little detail that Jesse goes through before printing the finishing metrics. 

::: warning
Executing backtests in the debug mode will take longer than usual to execute. Hence, only use it when you actually need to debug your strategy. 
:::

You can modify what should be printed while in the debugging mode and what shouldn't. To do so, open your `config.py` and modify:
```py
'logging': {
    'order_submission': True,
    'order_cancellation': True,
    'order_execution': True,
    'position_opened': True,
    'position_increased': True,
    'position_reduced': True,
    'position_closed': True,
    'shorter_period_candles': False,
    'trading_candles': True,
    'balance_update': True,
},
```