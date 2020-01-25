# Indicators

Jesse offers many indicators using other libraries such as the [ta-lib](http://ta-lib.org). The API has been designed to be the simplest yet flexible enough for all types of needs from developing strategies to doing research in Jupyter Notebooks.

The default settings has been set to produce the same result as you would get on [TradingView](http://tradingview.com).

To get started make sure that the `indicators` module is imported:

```py
import jesse.indicators as ta
```

First parameter of all indicators is `candles` with the type of a numpy array. 

When developing strategies, usually all you care about is the indicator's value for current candle. To get just that, simply pass `self.candles`:

```py
ta.sma(self.candles, 8)
```

To get indicator values for candles other than your trading route (in case you have defined more than one route in your `routes.py` file), use `self.get_candles()` method:

```py
ta.sma(self.get_candles('Binance', 'BTCUSDT', '4h'), 8)
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
