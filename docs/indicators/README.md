# Indicators

Jesse offers many indicators using the [ta-lib](http://ta-lib.org) library under the hood. However it makes it easier by handling candles and returning values that you actually need in your strategies.

The default settings has been set to produce the same result as you would get on [TradingView](http://tradingview.com).

To get started make sure that the "indicators" package is imported:

```py
import jesse.services.indicators as ta
```

And then use them in your strategies either as:

```py
ta.sma('Binance', 'BTCUSDT', '4h', 8)
```

Or define a property methods that are easier to use:

```py
@property
def sma8(self):
    return ta.sma('Binance', 'BTCUSDT', '4h', 8)

# and then use it as self.sma8
```

It is recommended that when possible, write strategies that would work on all symbols, timeframes, and exchanges. To do that, we could rewrite above example using [self.exchange](strategies/api.html#exchange), [self.symbol](strategies/api.html#symbol), [self.timeframe](strategies/api.html#timeframe):

```py
@property
def sma8(self):
    return ta.sma(self.exchange, self.symbol, self.timeframe, 8)
```
