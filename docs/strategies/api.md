# API reference

There are many built-in variables you can use inside your custom strategy class. Here is a reference of them all.

## price

The current/closing price of the trading symbol at the trading time frame.

**Return Type**: float

**Aliases**: `close`

**Example**:

```py
def long(self):
    # buy 1 share at the current price (MARKET order)
    self.buy = 1, self.price
```

## close

Alias for [price](#price)

## open

The current candle's opening price.

**Return Type**: float

**Example**:

```py
def should_long(self):
    # go long if current candle is bullish
    if self.close > self.open:
        return True

    return False
```

## high

The current candle's high price.

**Return Type**: float

**Example**:

```py
def long(self):
    qty = 1

    # open position at 2 dollars above current candle's high
    self.buy = qty, self.high + 2
```

## low

The current candle's low price.

**Return Type**: float

**Example**:

```py
def long(self):
    qty = 1

    # open position at 2 dollars above current candle's low
    self.buy = qty, self.high + 2

    # stop-loss at 2 dollars below current candle's low
    self.buy = qty, self.low - 2
```

## candle

Returns current candle in the form of a numpy array.

**Return Type**: np.ndarray

```
[
    timestamp,
    open,
    close,
    high,
    low,
    volume
]
```

**Example**:

```py
from pprint import pprint

pprint(self.candle)
# array([1.54638714e+12, 3.79409000e+03, 3.79714000e+03, 3.79800000e+03,
#        3.79400000e+03, 1.30908000e+02])

pprint(self.candle.dtype)
# dtype('float64')
```

You could get timestamp, open, close, high, low, and volume from candle array:

```py
timestamp = self.candle[0]
open_price = self.candle[1]
close_price = self.candle[2]
high_price = self.candle[3]
low_price = self.candle[4]
volume = self.candle[5]
```

**Also check**: [price](#price), [close](#close), [open](#open), [high](#high), [low](#low)
