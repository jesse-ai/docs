# Utilities

**Risk management** and **statistic** calculations are essential for a successful algo trading career.

Hence, Jesse offers a collection of commonly used utility functions that make life easier for quants.

## anchor_timeframe

Returns the anchor timeframe. Useful for writing dynamic strategies using multiple timeframes.

```py
anchor_timeframe(timeframe)
```

**Properties**:

-   timeframe: str

**Return Type**: str

**Example**:

```py
bigger_timeframe = anchor_timeframe('1h') # prints '4h'
```


## are\_cointegrated

Uses unit-root test on residuals to test for a cointegrated relationship between two price return series.

::: tip
Notice that for the formula to make sense `price_returns_1` and `price_returns_2` must be "price returns" and not the mere prices of the two assets. Hence you need to convert your asset prices to returns using the [prices_to_returns](#prices-to-returns) utility.
:::

The `cutoff` parameter points to the p-value threshold used in the formula.

```py
are_cointegrated(
    price_returns_1: np.ndarray, price_returns_2: np.ndarray, cutoff=0.05
) -> bool
```

**Properties**:

-   price_returns_1: np.ndarray
-   price_returns_1: np.ndarray
-   cutoff: float | default=0.05

**Return Type**: bool


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

## combinations_without_repeat

Creates an array containing all combinations of the passed arrays individual values without repetitions. Useful for the optimization mode.

```py
combinations_without_repeat(a: np.ndarray, n: int = 2) -> np.ndarray
```

**Properties**:

-   a: np.ndarray
-   n: int - default: 2

**Return Type**: np.ndarray


## estimate\_risk

Estimates the risk per share

```py
estimate_risk(entry_price, stop_price)
```

**Properties**:

-   entry_price: float
-   stop_price: float

**Return Type**: float

## kelly\_criterion

Returns the [Kelly Criterion](https://www.investopedia.com/articles/trading/04/091504.asp).

```py
kelly_criterion(win_rate, ratio_avg_win_loss)
```

**Properties**:

- win_rate: float
- ratio_avg_win_loss: float

**Return Type**: float


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


## prices\_to\_returns

Convert a series of asset prices into returns.

If you are wondering why you should use price returns for price series analysis instead of price values, refer to this answer on [Quant Stackexchange](https://quant.stackexchange.com/a/16484).

::: tip
Note that the initial return value for the first index cannot be calculated, so it equals `nan`.
:::

```python
prices_to_returns(price_series: np.ndarray) -> np.ndarray
```

**Properties**:

-  price_series: np.ndarray

**Return Type**: np.ndarray

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


## risk\_to\_qty

Calculates the quantity, based on the percentage of the capital you're willing to risk per trade.

::: tip
This is probably the most important helper function that you're going to need in your strategies. Those of you who are familiar with compounding risk would love this function.

We made a [website](https://positionsizingcalculator.netlify.app) for you just to play with this simple but important formula.
:::

::: warning
There might be situations where this helper returns a qty exceeding the available capital leading to an exception. The reason for this is a very close stop loss (often due to the usage of the ATR). You can check this with the calculator above. That's not an error, but expected behavior of the formula. You might want to add a logic limiting the qty to a maximum percentage of the capital.
:::

```py
risk_to_qty(capital, risk_per_capital, entry_price, stop_loss_price, precision=3, fee_rate=0)
```

**Properties**:

-   capital: float
-   risk_per_capital: float
-   entry_price: float
-   stop_loss_price: float
-   precision: int - default: 3
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
    capital = self.balance
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


## size\_to\_qty

Converts a position-size to the corresponding quantity.
Example: Requesting \$100 at the price of $50 would return 2.

```py
size_to_qty(position_size, price, precision=3, fee_rate=0)
```

**Properties**:

-   price: float
-   position_size: float
-   precision: int - default: 3
-   fee_rate: float - default: 0

**Return Type**: float

## streaks

Returns the streaks of the series. A positive number stands for a positive streak and a negativ number for a negative streak. By default it uses the first discrete difference.

```py
streaks(series: np.array, use_diff=True) -> np.array
```

**Properties**:

-   series: np.array
-   use_diff: bool

**Return Type**: np.array[bool]

## strictly\_decreasing

Returns whether a series is strictly decreasing or not.

```py
strictly_increasing(series, lookback)
```

**Properties**:

-   series: np.array
-   lookback: int

**Return Type**: bool

## strictly\_increasing

Returns whether a series is strictly increasing or not.

```py
strictly_increasing(series, lookback)
```

**Properties**:

-   series: np.array
-   lookback: int

**Return Type**: bool

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


## wavelet\_denoising

Denoises / filters timeseries data. First deconstructs and then reconstructs based on a threshold.

::: tip
Based on [PyWavelets](https://pywavelets.readthedocs.io/en/latest/). See its docs for more information.
It's recommended to consider only `haar`, `db`, `sym`, `coif` wavelet basis functions, as these are relatively suitable for financial data.
:::

```py
wavelet_denoising(raw: np.ndarray, wavelet: str ='haar', level: int = 1, mode: str = 'symmetric', smoothing_factor: float = 0, threshold_mode: str = 'hard') -> np.ndarray
```

**Properties**:

-   raw: np.ndarray
-   [wavelet](https://pywavelets.readthedocs.io/en/latest/ref/wavelets.html#built-in-wavelets-wavelist): str
-   level: int
-   [mode](https://pywavelets.readthedocs.io/en/latest/ref/signal-extension-modes.html#ref-modes): str
-   smoothing_factor: float
-   [threshold_mode](https://pywavelets.readthedocs.io/en/latest/ref/thresholding-functions.html?highlight=mode#thresholding): str

**Return Type**: np.ndarray

## z\_score

A Z-score is a numerical measurement that describes how many standard deviations far away the data is comparing to the mean of the data.

::: tip
Notice that for the formula to make sense `price_returns` must be "price returns" and not the mere prices of the two assets. Hence you need to convert your asset prices to returns using the [prices_to_returns](#prices-to-returns) utility.
:::

```py
z_score(price_returns: np.ndarray) -> np.ndarray
```

**Properties**:

-   price_returns: np.ndarray

**Return Type**: np.ndarray

## timeframe_to_one_minutes

Converts a given timeframe to its equivalent in minutes.

```py
timeframe_to_one_minutes(timeframe)
```

**Properties**:

-   timeframe: str - The timeframe to convert. Supported timeframes include:
    - '1m', '3m', '5m', '15m', '30m', '45m', '1h', '2h', '3h', '4h', '6h', '8h', '12h', 
      '1d', '3d', '1w', '1M'.

**Return Type**: int - The equivalent number of minutes for the given timeframe.

**Example**:

```py
minutes = timeframe_to_one_minutes('1h')  # returns 60
```
