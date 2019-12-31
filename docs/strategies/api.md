# API reference

There are many built-in variables you can use inside your custom strategy class. Here is a reference of them all.

## price

The current/closing price of the trading symbol at the trading time frame.

**Return Type**: float

**Aliases**: `close`

**Example**:

```py
def go_long(self):
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
def go_long(self):
    qty = 1

    # open position at 2 dollars above current candle's high
    self.buy = qty, self.high + 2
```

## low

The current candle's low price.

**Return Type**: float

**Example**:

```py
def go_long(self):
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

## average\_entry\_price

The average entry price; buy price for long and sell price for short positions. The word average indicates that in case you use more than one point to enter a position, this property returns the average value. 

**Return Type**: float


**Example**:
```py
def go_long(self):
    qty = 2

    # self.average_entry_price is equal to (100 + 120) / 2 == 110
    self.buy = [
        (1, 100), 
        (1, 120)
    ]
    self.stop_loss = qty, 80
    self.take_profit = qty, 140

def filter_min_pnl(self):
    min_pnl = 1
    reward_per_qty = abs(self.average_take_profit - self.average_entry_price)
    return (reward_per_qty / self.average_entry_price) * 100 > min_pnl
```

::: warning
Note that `average_entry_price` is only available after `go_long()` or `go_short()` is executed. Hence, it is only supposed to be used in either filter functions or when the position is open. 

In other words, you cannot use it inside `should_long()` and `should_short()`.
:::

**Also check**: [average_take_profit](#average-take-profit), [average_stop_loss](#average-stop-loss)

## average\_stop\_loss

Same as [average_entry_price](#average-entry-price) but for stop-loss. The word average indicates that in case you use more than one point for stop-loss, this property returns the average value. 

**Return Type**: float

**Also check**: [average_entry_price](#average-entry-price), [average_take_profit](#average-take-profit)

## average\_take\_profit

Same as [average_entry_price](#average-entry-price) but for take-profit. The word average indicates that in case you use more than one point for take-profit, this property returns the average value. 

**Return Type**: float

**Also check**: [average_entry_price](#average-entry-price), [average_stop_loss](#average-stop-loss)

## position

The position object of the strategy. The 

**Return Type**: Position

**Also check**: [is_long](#is-long), [is_short](#is-short)

<!-- TODO: -->
<!-- ## is_reduced

Has the size of position been reduced since it was opened. Useful for trades that exit in more that one points.

**Return Type**: `bool` if position is open, `None` if position is closed.

**Example**:

```py
def update_postion(self):
    if self.is_long and
``` -->

<!-- TODO: is_increased -->
<!-- TODO: vars -->
<!-- TODO: is_long -->
<!-- TODO: is_short -->

TODO...
