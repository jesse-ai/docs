
# Utilities

These utility functions are helpful when writing strategies. The `utils` module is imported for you when you generate a new strategy but here's the code anyway:

```py
from jesse import utils
```

Here's a reference for all the methods:

## risk\_to\_qty

Calculates the quantity, based on the percentage of the capital you're willing to risk per trade.

::: tip
This is probably the most important helper function that you're going to need in your strategies. Those of you whom are familiar with compounding risk would love this function.

We made a [website](https://positionsizingcalculator.netlify.app) for you just to play with this simple but important formula.
:::

::: warning
There might be situations where this helper returns a qty exceeding the available capital leading to an exception. The reason for this is a very close stop loss (often due to the usage of the ATR). You can check this with the calculator above. That's not a error, but expected behaviour of the formula. You might want to add a logic limiting the qty to a maximum percentage of the capital.
:::

```py
risk_to_qty(capital, risk_per_capital, entry_price, stop_loss_price, fee_rate=0)
```

**Properties**:

-   capital: float
-   risk_per_capital: float
-   entry_price: float
-   stop_loss_price: float
-   fee_rate: float - default: 0

**Return Type**: float

**Example**:

```py
def go_long(self):
    # risk 1% of the capital($10000) for a trade entering at $100 with the stop-loss at $80
    risk_perc = 1
    entry = 100
    stop = 80
    profit = 150
    capital = 10000
    # or we could access capital dynamically:
    capital = self.capital
    qty = utils.risk_to_qty(capital, risk_perc, entry, stop)

    self.buy = qty, entry
    self.stop_loss = qty, stop
    self.take_profit = qty, profit
```

In real trading, you usually need to include the exchange fee in qty calculation to make sure you don't spend more than the existing capital (in which case Jesse would raise an error):
```py
# so instead of 
qty = utils.risk_to_qty(capital, risk_perc, entry, stop)

# it's better to do
qty = utils.risk_to_qty(capital, risk_perc, entry, stop, self.fee_rate)
```

**See Also**: [fee_rate](/docs/strategies/api.html#fee-rate)

## risk\_to\_size

Calculates the size of the position based on the amount of risk percentage you're willing to take.

```py
risk_to_size(capital_size, risk_percentage, risk_per_qty, entry_price)
```

**Properties**:

-   capital_size: float
-   risk_percentage: float
-   risk_per_qty: float
-   entry_price: float

**Return Type**: float

## size\_to\_qty

Converts a position-size to the corresponding quantity.
Example: Requesting \$100 at the price of $50 would return 2.

```py
size_to_qty(position_size, price, precision=3, fee_rate=0)
```

**Properties**:

-   position_size: float
-   price: float
-   precision: float - default: 3
-   fee_rate: float - default: 0

**Return Type**: float

## qty\_to\_size

Converts a quantity to its corresponding position-size.
Example: Requesting 2 shares at the price of $50 would return \$100.

```py
qty_to_size(qty, price)
```

**Properties**:

-   qty: float
-   price: float

**Return Type**: float

## anchor_timeframe

Returns the anchor timeframe. Useful for writing dynamic strategies using multiple timeframes.

```py
anchor_timeframe(timeframe)
```

**Properties**:

-   timeframe: str

**Return Type**: str

**Example**:

One useful example for this could be in your routes file when you need to define the anchor timeframe. Let's say for example we're trading `4h` timeframe but don't know the anchor timeframe for it.

```py{9}
from jesse.utils import anchor_timeframe

# trading routes
routes = [
    ('Binance', 'BTC-USDT', '4h', 'ExampleStrategy'),
]

extra_candles = [
    ('Binance', 'BTC-USDT', anchor_timeframe('4h')),
]
```

## limit\_stop\_loss

Limits the stop-loss price according to the max allowed risk percentage. (How many percent you're OK with the price going against your position)

```py
limit_stop_loss(entry_price, stop_price, trade_type, max_allowed_risk_percentage)
```

**Properties**:

-   entry_price: float
-   stop_price: float
-   trade_type: str
-   max_allowed_risk_percentage: float

**Return Type**: float

## estimate\_risk

Estimates the risk per share

```py
estimate_risk(entry_price, stop_price)
```

**Properties**:

-   entry_price: float
-   stop_price: float

**Return Type**: float

## crossed

Helper for the detection of crosses

```py
crossed(series1, series2, direction=None, sequential=False)
```

**Properties**:

-   series1: np.ndarray
-   series2: float, int, np.ndarray
-   direction: str - default: None - above or below

**Return Type**: bool | np.ndarray

## numpy\_candles\_to\_dataframe

Helper to convert numpy to financial dataframe

```py
numpy_candles_to_dataframe(candles: np.ndarray, name_date="date", name_open="open", name_high="high",
                               name_low="low", name_close="close", name_volume="volume")
```

**Properties**:

-   candles: np.ndarray
-   name_date: str
-   name_open: str
-   name_high: str
-   name_low: str
-   name_close: str
-   name_volume: str

**Return Type**: pd.DataFrame


## subtract\_floats

Subtracts two floats without the rounding issue in Python

```py
subtract_floats(float1: float, float2: float) -> float
```

**Properties**:

-   float1: float
-   float2: float

**Return Type**: float

## sum\_floats

Sums two floats without the rounding issue in Python

```py
sum_floats(float1: float, float2: float) -> float
```

**Properties**:

-   float1: float
-   float2: float

**Return Type**: float

## strictly\_increasing

Returns whether a series in strictly increasing or not. 

```py
strictly_increasing(series, lookback)
```

**Properties**:

-   series: np.array
-   lookback: int

**Return Type**: bool

## strictly\_decreasing

Returns whether a series in strictly decreasing or not. 

```py
strictly_increasing(series, lookback)
```

**Properties**:

-   series: np.array
-   lookback: int

**Return Type**: bool

## streaks

Returns the streaks of the series. A positive number stands for a positive streak and a negativ number for a negative streak. By default it uses the first discrete difference.

```py
streaks(series: np.array, use_diff=True) -> np.array
```

**Properties**:

-   series: np.array
-   use_diff: bool

**Return Type**: np.array[bool]

## signal\_line

Returns the moving average of the series. Useful to create so called signal lines of indicators.

```py
signal_line(series, period=10, matype=0)
```

**Properties**:

-   series: np.array
-   period: int - default = 10
-   matype: int - default = 0

**See [here](https://docs.jesse.trade/docs/indicators/reference.html#indicators-reference) for available matypes**

**Return Type**:  np.array


## kelly\_criterion

Returns the [Kelly Criterion](https://www.investopedia.com/articles/trading/04/091504.asp).

```py
kelly_criterion(win_rate, ratio_avg_win_loss)
```

**Properties**:

-   win_rate: float
-   ratio_avg_win_loss: float

**Return Type**: float



## dd

The `dd` (dump and die) function dumps the given variables and ends execution of the script. It is used for debugging purposes. 

```py
dd('some kind of variable that you need to debug')
```

**Properties**:
-   msg

**Return Type**: None
