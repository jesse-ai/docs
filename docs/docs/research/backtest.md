# Backtest

Jesse's backtesting feature accessed via the GUI dashboard is excellent. However, there have been cases where users needed to run backtests through their Python scripts or in Jupyter notebooks.

Therefore, I created the `backtest()` function as a pure function. It utilizes only the input you provide, making it suitable for multiprocessing.

Let's examine two example use cases:

1. An instance where you aim to generate data series based on a statistical formula to test the main logic of your strategy. Here, you need to generate candles, write the strategy, and conduct the backtest within the same file or Jupyter notebook.

2. Another scenario is for batch operations like optimization, machine learning, etc.

```python
backtest(
    config: dict,
    routes: list,
    data_routes: list,
    candles: dict,
    warmup_candles: dict = None,
    generate_tradingview: bool = False,
    generate_hyperparameters: bool = False,
    generate_equity_curve: bool = False,
    benchmark: bool = False,
    generate_csv: bool = False,
    generate_json: bool = False,
    generate_logs: bool = False,
    hyperparameters: dict = None,
    fast_mode: bool = False,
    candles_pipeline_class = None,
    candles_pipeline_kwargs: dict = None,
    generate_charts: bool = False,
)
```

**Parameters:**
- `config`: dict
- `routes`: list
- `data_routes`: list
- `candles`: dict
- `warmup_candles`: dict = None
- `generate_tradingview`: bool = False
- `generate_hyperparameters`: bool = False
- `generate_equity_curve`: bool = False
- `benchmark`: bool = False
- `generate_csv`: bool = False
- `generate_json`: bool = False
- `generate_logs`: bool = False
- `hyperparameters`: dict = None
- `fast_mode`: bool = False
- `candles_pipeline_class`: class = None
- `candles_pipeline_kwargs`: dict = None
- `generate_charts`: bool = False

**Return Type:** dict

## Usage example 1:

Here's an example where I generate candles from price data, write a basic strategy, prepare inputs, and execute the backtest.

```python
# imports
import jesse.helpers as jh
from jesse.strategies import Strategy
from jesse import utils
from jesse.research import backtest, candles_from_close_prices

# generate fake candles
prices01 = [10, 11, 12, 12, 11, 13, 14, 12, 11, 15]
fake_candles01 = candles_from_close_prices(prices01)

# strategy
class ResearchStrategy(Strategy):
    def should_long(self):
        return True

    def should_short(self):
        return False

    def should_cancel_entry(self):
        return True

    def go_long(self):
        entry_price = self.price
        qty = utils.size_to_qty(self.balance * 0.5, entry_price)
        self.buy = qty, entry_price

    def go_short(self):
        pass

# prepare inputs
exchange_name = 'Fake Exchange'
symbol = 'BTC-USDT'
timeframe = '4h'
config = {
    'starting_balance': 10_000,
    'fee': 0,
    'type': 'futures',
    'futures_leverage': 2,
    'futures_leverage_mode': 'cross',
    'exchange': exchange_name,
    'warm_up_candles': 0
}
routes = [
    {'exchange': exchange_name, 'strategy': ResearchStrategy, 'symbol': symbol, 'timeframe': timeframe}
]
data_routes = []
candles = {
    jh.key(exchange_name, symbol): {
        'exchange': exchange_name,
        'symbol': symbol,
        'candles': fake_candles01,
    },
}

# execute backtest
result = backtest(
    config,
    routes,
    data_routes,
    candles,
    generate_equity_curve=True,
    generate_logs=True,
)
# access the metrics dict:
result['metrics']
# access the equity curve list:
result['equity_curve']
# access the logs list:
result['logs']
```

## Usage example 2:

Here is a function I created for automating our new strategy listing page to execute backtests automatically, representing a real-world use case.

```python
def execute_strategy(
        strategy_name: str,
        exchange_name: str,
        symbol: str,
        timeframe: str,
        config: dict,
        start_date_str: str,
        finish_date_str: str
):
    warmup_candles, trading_candles = get_candles(
        exchange_name, symbol, timeframe, jh.date_to_timestamp(start_date_str), jh.date_to_timestamp(finish_date_str),
        config['warm_up_candles'], caching=True, is_for_jesse=True
    )

    routes = [
        {'exchange': exchange_name, 'strategy': strategy_name, 'symbol': symbol, 'timeframe': timeframe}
    ]

    trading_candles = {
        jh.key(exchange_name, symbol): {
            'exchange': exchange_name,
            'symbol': symbol,
            'candles': trading_candles,
        },
    }
    warmup_candles = {
        jh.key(exchange_name, symbol): {
            'exchange': exchange_name,
            'symbol': symbol,
            'candles': warmup_candles,
        },
    }

    # Execute backtest
    result = backtest(
        config,
        routes,
        [],
        candles=trading_candles,
        warmup_candles=warmup_candles,
        generate_equity_curve=True,
        generate_csv=True,
        generate_json=True,
        generate_logs=True,
        fast_mode=True
    )

    # Print result as a JSON string
    print(json.dumps(result, ignore_nan=True, cls=NpEncoder))
```

::: tip
The `fast_mode` parameter speeds up the backtest process by orders of magnitude. It is disabled by default but will become the default behavior in the future. Enable it by setting `fast_mode=True` to get the same performance as the GUI dashboard.

Note that it does not yet support backtests when trading multiple routes simultaneously. That is a work in progress.
:::

## Generating chart images

Setting `generate_charts=True` runs the full chart-rendering pipeline (equity curve, drawdown, underwater, monthly heatmap, monthly distribution, trade PnL) and saves the images to disk. The result dict will include two extra keys pointing to where the images were saved:

```python
result = backtest(
    config,
    routes,
    data_routes,
    candles=trading_candles,
    warmup_candles=warmup_candles,
    generate_charts=True,
)

# The unique session ID used to name the chart files
print(result['charts_session_id'])

# The folder on disk where the chart images were saved
print(result['charts_folder'])
```
