# Indicators

Jesse offers many indicators using the [ta-lib](http://ta-lib.org) library under the hood. It makes it easier by handling candles by itself, and returning values that you actually need in your strategies.

The default settings has been set to produce the same result as you would get on [TradingView](http://tradingview.com).

To get started make sure that the "indicators" package is imported:

```py
import jesse.indicators as ta
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

## Flexible parameters

It is recommended that when possible, write strategies that would work on all symbols, timeframes, and exchanges. To do that, we could rewrite above example using [self.exchange](strategies/api.html#exchange), [self.symbol](strategies/api.html#symbol), [self.timeframe](strategies/api.html#timeframe):

```py
@property
def sma8(self):
    return ta.sma(self.exchange, self.symbol, self.timeframe, 8)
```

## Named Tuples

The return type of all indicators returning multiple values is a `namedtuple` Python object. In case you're not familiar with `namedtuple` it's just like a regular tuple but you can also use it as a class object. 

For example here is two ways you could use Bollinger Bands indicator, which as you know, returns three values: `upperband`, `middleband`, `lowerband`

1. Use it as a normal tuple:
```py
# as three variables
upperband, middleband, lowerband = bollinger_bands(self.exchange, self.symbol, self.timeframe, period=20)

# or you could import it as one tuple and retrieve values as you would from a tuple:
bb = bollinger_bands(self.exchange, self.symbol, self.timeframe, period=20)
bb[0] # upperband
bb[1] # middleband
bb[2] # lowerband
```

2. The second way it to use it as a class instance:
```py
bb = bollinger_bands(self.exchange, self.symbol, self.timeframe, period=20)
bb.upperband
bb.middleband
bb.lowerband
```
