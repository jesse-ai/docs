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

## current_candle

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

pprint(self.current_candle)
# array([1.54638714e+12, 3.79409000e+03, 3.79714000e+03, 3.79800000e+03,
#        3.79400000e+03, 1.30908000e+02])

pprint(self.current_candle.dtype)
# dtype('float64')
```

You could get timestamp, open, close, high, low, and volume from candle array:

```py
timestamp = self.current_candle[0]
open_price = self.current_candle[1]
close_price = self.current_candle[2]
high_price = self.current_candle[3]
low_price = self.current_candle[4]
volume = self.current_candle[5]
```

**Also check**: [price](#price), [close](#close), [open](#open), [high](#high), [low](#low)

## candles

This property returns candles for current trading exchange, symbol, and timeframe. Is it frequently used when using [technical indicators](/docs/indicators) because the first parameter for all indicators is `candles`. 

**Return Type:** np.ndarray

**Example**:
```py
# get SMA with period of 8 for current trading route
sma8 = ta.sma(self.candles, 8)
```

## get_candles

This method returns candles for the exchange, symbol, and timeframe that you specify unlike `self.candles` which returns candles for current route. 

```py
get_candles(exchange: str, symbol: str, timeframe: str)
```

For simple strategies that trade only one route and use only one timeframe, `self.candles` is probably the way to go. Otherwise use `self.get_candles()`.

**Return Type:** np.ndarray

**Example**:
```py
@property
def big_trend(self):
    """
    Uses SRSI indicator to determine the bigger trend of the market. 
    Trading timeframe is "4h" so we use "1D" timeframe as the anchor timeframe.
    """
    k, d = ta.srsi(self.get_candles(self.exchange, self.symbol, '1D'))

    if k > d:
        return 1
    elif k < d:
        return -1
    else:
        return 0
```

**Also check**: [candles](#candles)

## index

The `index` property is a counter that can be used to detect how many times the strategy has been executed. Imagine we're doing a loop in backtest mode, and this index is the index of that loop. Below examples can explain it better.

**Return Type**: int

**Example:**

```py
# example #1: go long when the first candle is received
def should_long(self):
    return self.index == 0

# example #2: let's say there are some expensive operations in a  
# method I've defined called do_slow_updates() (like machine learning stuff)
# that I'd like to do once a day while trading "1m" candles
def prepare(self):
    if self.index % 1440 == 0:
        do_slow_updates()
```

## average\_entry\_price

The average entry price; buy price for long and sell price for short positions. The word average indicates that in case you use more than one point to enter a position, this property returns the average value. 

**Return Type**: float


**Example**:
```py{14}
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

The position object of the trading route. 

::: tip
Please note that each route instance has only one position witch is accessible inside the strategy. It doesn't mean that you cannot trade two positions using one strategy; to do that simply create two routes using the same strategy but with different symbols. 
:::

**Return Type**: Position

```py
# only useful properties are mentioned 
class Position:
    # the (average) entry price of the position | None if position is close
    entry_price: float
    # the quantity of the current position | 0 if position is close
    qty: float
    # the timestamp of when the position opened | None if position is close
    opened_at: float
    # The value of open position
    value: float
    # The type of open position, which can be either short, long, or close
    type: str
    # The PNL of the position
    pnl: float
    # The PNL% of the position
    pnl_percentage: float
    # Is the current position open? (alias for self.is_open)
    is_open: bool
    # Is the current position close? (alias for self.is_close)
    is_close: bool
```

**Example:**
```py
# if position is in profit by 10%, update stop-loss to break even
def update_position(self):
    if self.position.pnl_percentage >= 10:
        self.stop_loss = self.position.qty, self.position.entry_price
```

**Also check**: [is_long](#is-long), [is_short](#is-short)


## is_long

Is the type of the open position (current trade) `long`?

**Return Type**: bool


## is_short

Is the type of the open position (current trade) `short`?

**Return Type**: bool


## is_reduced

Has the size of the open position been reduced since it was opened? 

This is useful for strategies that for example exit in two points, and you'd like to update something only if the first half has been exited.

**Return Type**: bool

**Example**:

```py{12}
def go_long(self):
    self.buy = 1, self.price
    self.stop_loss = 1, self.price - 10
    self.take_profit = [
        (0.5, self.price + 10), 
        (0.5, self.price + 20) 
    ]

def update_position(self):
    # even though we have especified the exit price 
    # for the second half, we now updated to exit with SMA20
    if self.is_reduced:
        self.take_profit = 0.5, self.SMA20

@property
def SMA20(self):
    return ta.sma(self.exchange, self.symbol, self.timeframe, 20)
```


## is_increased

Has the size of the open position been increased since it was opened? 

**Return Type**: bool

This property is useful if: 
1. You have been trying to open position in more than one point:
```py
def go_long(self):
    self.buy = [
        (0.5, self.price + 10),
        # after this point self.is_increased will be True
        (0.5, self.price + 20), 
        (0.5, self.price + 30), 
    ]
```

2. You decide to increase the size of the open position because of some factor of yours:

```py
def update_position(self):
    # momentum_rank being a method you've defined somewhere that
    # examines the momentum of the current trend or something
    if self.momentum_rank > 100:
        if self.is_long:
            # buy qty of 1 for the current price (MARKET order)
            self.buy = 1, self.price
```


## vars

`vars` is the name of a dictionary object present in your strategy that you can use as a placeholder for your variables. 

Of course you could define your own variables inside `__init__` instead, but that would bring a concern about naming your variables to prevent conflict with built-in variables and properties.

Using `vars` would also make it easier for debugging.


**Return Type**: dict


## shared_vars

`shared_vars` is a dictionary object just like `vars` except that it is shared among all your [routes](/docs/routes). 

You would need `shared_vars` for writing strategies that require more than one route, and when those routes need to communicate with each other. 

`shared_vars` could act as a bridge. One example could be in a pairs trading strategy which requires two routes to communicate with each other (one goes long when the other goes short)

**Return Type**: dict

**Also check**: [vars](#vars)

## liquidate

This method is used to quickly liquidate the open position using a market order. It is a shortcut to use instead of writing:
```py
if self.position.pnl > 0:
    self.take_profit = self.position.qty, self.price
else:
    self.stop_loss = self.position.qty, self.price
```

It is often used within the `update_position` method of strategies that close positions in specific conditions.

**Example**:

Let's open a long position at first [index](#index), and close it at 10th:

```py
def update_position(self):
    if self.index == 10:
        self.liquidate()

def should_long(self):
    return self.index == 0

def go_long(self):
    self.buy = 1, self.price
```

