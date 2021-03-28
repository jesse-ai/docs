# Indicators

Jesse offers many its own indicators which is basically an extended wrapper around the [ta-lib](http://ta-lib.org) library. 

The API has been designed to be the simplest yet flexible enough for all types of needs from developing strategies to doing research in [Jupyter Notebooks](/docs/jupyter-notebooks).

## Import

To get started make sure the `indicators` module is imported:

```py
import jesse.indicators as ta
```

## Example 1

The first parameter of all indicators is `candles` with the type of a Numpy array. 

When developing strategies, usually all you care about is the indicator's value for the current candle. To get just that, simply pass `self.candles`:

```py
# give me SMA with period=8 for current candle:
ta.sma(self.candles, 8)
```

## Example 2

To get indicator values for candles other than your trading [route](/docs/routes) (in case you have defined more than one route in your `routes.py` file), use `self.get_candles()` method:

```py
ta.sma(self.get_candles('Binance', 'BTC-USDT', '4h'), 8)
```

## Named Tuples

The return type of all indicators returning multiple values is a `namedtuple` Python object. In case you're not familiar with the concept of  `namedtuple` in Python, it's just like a regular tuple but you can also use it as a class object. 

For example here are two ways you could use the Bollinger Bands indicator, which as you know, returns three values: `upperband`, `middleband`, `lowerband`

1. Use it as a normal tuple:
```py
# as three variables
upperband, middleband, lowerband = bollinger_bands(self.candles, period=20)

# or you could fetch it as one tuple and retrieve values as you would from a tuple:
bb = bollinger_bands(self.candles, period=20)
bb[0] # upperband
bb[1] # middleband
bb[2] # lowerband
```

2. The second way it to use it as a class instance:
```py
bb = bollinger_bands(self.candles, period=20)
bb.upperband
bb.middleband
bb.lowerband
```
