# Backtest

Jesse's backtesting feature that you access via the GUI dashboard is great, but there were cases when users needed to run backtests via their python scripts, or in Jupyter notebooks. 

Hence, I created the `backtest()` that is a pure function. Meaning that it only uses the input you pass to it. This means it is ready for multiprocessing too!

Let's review two example use cases:

1. An example of this would be when you intend to generate some data series based on whatever statistical formula that you have in mind, and want to test out the main logic behind your strategy. For this purpose, you need to generate candles, write the strategy, and run the backtest all inside the same file (or Jupyter notebook).

2. Another use case is for writing batch operations, such as optimization, machine learning, etc. 

```py
backtest(
    config: dict,
    routes: list,
    extra_routes: list,
    candles: dict,
    generate_charts: bool = False,
    generate_tradingview: bool = False,
    generate_quantstats: bool = False,
    generate_hyperparameters: bool = False,
    generate_equity_curve: bool = False,
    generate_csv: bool = False,
    generate_json: bool = False,
    hyperparameters: dict = None
)
```

**Parameters:**

- config: dict
- routes: list
- extra_routes: list
- candles: dict
- generate_charts: bool = False
- generate_tradingview: bool = False
- generate_quantstats: bool = False
- generate_hyperparameters: bool = False
- generate_equity_curve: bool = False
- generate_csv: bool = False
- generate_json: bool = False
- hyperparameters: dict (optional)

**Return Type:** dict

## Usage example

Here's an example where I generate a few candles from a small price data. Then, I write a super basic strategy, prepare inputs for the backtest function and execute it. 

```py
# # # # # # # # # # # # # # # 
# imports 
# # # # # # # # # # # # # # # 
import jesse.helpers as jh
from jesse.strategies import Strategy
from jesse import utils
from jesse.research import backtest, candles_from_close_prices

# # # # # # # # # # # # # # # 
# generate fake candles
# # # # # # # # # # # # # # # 
prices01 = [10, 11, 12, 12, 11, 13, 14, 12, 11, 15]
fake_candles01 = candles_from_close_prices(prices01)

# # # # # # # # # # # # # # # 
# strategy
# # # # # # # # # # # # # # # 
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

# # # # # # # # # # # # # # # 
# prepare inputs
# # # # # # # # # # # # # # # 
exchange_name = 'Fake Exchange'
symbol = 'BTC-USDT'
timeframe = '1m'
config = {
    'starting_balance': 10_000,
    'fee': 0,
    # accepted values are 'spot' and 'futures'
    'type': 'futures',
    # only used if type is 'futures'
    'futures_leverage': 2,
    # only used if type is 'futures'
    'futures_leverage_mode': 'cross',
    'exchange': exchange_name,
    'warm_up_candles': 0
}
routes = [
    {'exchange': exchange_name, 'strategy': ResearchStrategy, 'symbol': symbol, 'timeframe': timeframe}
]
extra_routes = []
candles = {
    # keys must be in this format: 'Fake Exchange-BTC-USDT'
    jh.key(exchange_name, symbol): {
        'exchange': exchange_name,
        'symbol': symbol,
        'candles': fake_candles01,
    },
}

# # # # # # # # # # # # # # # 
# execute backtest
# # # # # # # # # # # # # # # 
result = backtest(
    config,
    routes,
    extra_routes,
    candles, 
    generate_charts=True
)
# to access the metrics dict:
result['metrics']
# to access the charts string (path of the generated file): 
result['charts']
# to access the logs list:
result['logs']
```

## Noticeable differences 

The `backtest()` function uses the same engine as the one in the GUI dashboard does. So the results are almost identical. But there is a **big difference in how warmup candles are handled** that you need to know about. 

In Jesse's typical backtests (via the GUI dashboard), warmup candles are injected **before** the backtest simulation is started. In fact, the required number of candles is calculated and then injected behind the scenes without you even knowing it. 

But in the `backtest()` function, as I mentioned you need to pass all the required data to it. So first the required warmup candles are cut from the candles you pass to it, injected in the store, and then the simulations are started. 

If your strategy doesn't require any warmup candles, in the `config` value pass it as `0`.

which is fine for most use cases but if you see different backtest results, this is the reason.
