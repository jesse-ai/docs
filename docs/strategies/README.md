# Strategies

Jesse ships with a number of pre-built strategies. Whether they are profitable or not for your purposes, it doesn't really matter. Jesse's API for defining your custom strategies is where it shines indeed.

## Generating new strategy file

To get started, run:

```
jesse make-strategy AwesomeStrategy
```

This will generate `AwesomeStrategy` class located at `jesse/strategies/AwesomeStrategy/__init__.py` with all the methods that required in order to run the strategy:

```py
from jesse.strategies.Strategy import Strategy
import jesse.services.indicators as ta


class AwesomeStrategy(Strategy):
    def __init__(self, exchange, symbol, timeframe, hyper_parameters=None):
        super().__init__('AwesomeStrategy', '0.0.1', exchange, symbol, timeframe)

    def should_long(self):
        return False

    def should_short(self):
        return False

    def go_long(self):
        pass

    def go_short(self):
        pass

    def should_cancel(self):
        return False
```

## Entry rules

The API has been designed for you to think like a trader, rather than a programmer. You need to think about strict entry rules however. For example, let's say we want to enter a long position if the current candle is a bullish candle:

```py
def should_long(self):
    if self.close > self.open:
        return True
    else:
        return False
```

Then define your entry price, and exit prices (take-profit and stop-loss).
In this example we buy 1 share at the current price (MARKET order):

```py
def long(self):
    qty = 1

    self.buy = qty, self.price
    self.stop_loss = qty, self.price - 1
    self.take_profit = qty, self.price + 1
```

You just wrote the first working strategy that can be back-tested, and paper/live traded.

## Entering short trades

In case your exchange supports margin trading, you can enter short trades. To do so, you need to implement `should_short()` and `short()` methods:

```py
def should_short(self):
    if self.close < self.open:
        return True
    else:
        return False

def short(self):
    qty = 1

    self.sell = qty, self.price
    self.stop_loss = qty, self.price + 1
    self.take_profit = qty, self.price - 1
```

Notice that this time instead of `self.buy` we used `self.sell` to set entry quantity and price.

## Events

TODO...
