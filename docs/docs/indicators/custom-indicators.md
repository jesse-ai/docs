---
title: Custom Indicators
---
# Advanced - Adding a custom indicator

Does your strategy idea need indicators that aren't available yet? Let's see how to create and use custom indicators in Jesse.

## Tutorial for a custom indicator

::: tip Don't reinvent the wheel  
Before starting to code from scratch you might want to try finding existing implementations. Maybe you can use them right away or at least as a basis for your code: The Github search can be a good place for that. Search the name of your indicator (sometimes it helps to combine it with keywords like high, low, open, close or price). Click on "All Github". Then set the type to "Code" and language to "Python" or "Jupyter Notebook".  
:::

In this tutorial, we will convert [Elliott Wave Oscillator by Centrokom](https://id.tradingview.com/script/Q29rCz5S-Elliott-Wave-Oscillator/ "Elliott Wave Oscillator by Centrokom") that is originally written in Pine Script to a custom indicator usable in Jesse. The following is the original code from Tradingview:

```js
//@version=3
study("Elliott Wave Oscillator")
s2=ema(close, 5) - ema(close, 34)
c_color=s2 <= 0 ? red : lime
plot(s2, color=c_color, style=histogram, linewidth=2)
```

Now, let's start the creation of our first custom indicator:

1.  Create a new folder called `custom_indicators` and it's `__init__.py` file in the project's `ROOT` folder.
2.  Then create a new file for the actual indicator, in this case, we name it: `ewo.py` for our Elliott Wave Oscillator.
3.  The folder structure should look like this:

```sh
├── storage # folder containing logs, chart images, etc
├── strategies # folder where you define your strategies
└── custom_indicators # folder for Jesse's custom indicator
    ├── __init__.py
    └── ewo.py
```

4.  Import the custom indicator file in `custom_indicators/__init__.py`.

```python
from .ewo import ewo
```

5.  Now we can start creating the actual indicator code in `ewo.py`.

```python
import numpy as np
from typing import Union

from jesse.helpers import get_candle_source, slice_candles

def ewo(candles: np.ndarray, short_period: int = 5, long_period: int = 34, source_type="close", sequential = False) -> Union[float, np.ndarray]:
    """
    Elliott Wave Oscillator
    :param candles: np.ndarray
    :param short_period: int - default: 5
    :param long_period: int - default: 34
    :param source_type: str - default: close
    :param sequential: bool - default: False
    :return: Union[float, np.ndarray]
    """
    candles = slice_candles(candles, sequential)

    src = get_candle_source(candles, source_type)
    # Calculate EMAs using Jesse's built-in EMA function
    from jesse.indicators import ema
    ewo = np.subtract(ema(src, period=short_period, sequential=True), ema(src, period=long_period, sequential=True))

    if sequential:
        return ewo
    else:
        return ewo[-1]
```

6.  Finally, to use the indicator in a trading strategy, we add the custom\_indicators as a library.

```python
from jesse.strategies import Strategy
import custom_indicators as cta

class Strategy01(Strategy):
    @property
    def ewo(self):
        return cta.ewo(self.candles, short_period=5, long_period=34, source_type="close", sequential=True)
```

## Hints

### Slicing the candles

For performance gains, it's good to slice the candles to a certain size to avoid unnecessary calculations.  
That's the reason we use slice\_candles(). We use the configured warmup\_candles\_num.

We don't do it by default if sequential=True, as Jesse doesn't know how much lookback you need from your sequential indicator. But as you know it, you can remove this condition.

::: tip Too few past data change indicator values  
Some indicators are influenced by the whole range of past data. These functions are called functions with memory. Check [here](https://ta-lib.org/api/#Unstable%20Period "here") for a good explanation. That's the reason for warm\_up\_candles\_num changing indicator values under some conditions or variations to other implementations (like TradingView).  
:::

```python
def slice_candles(candles: np.ndarray, sequential: bool) -> np.ndarray:
    warmup_candles_num = get_config('env.data.warmup_candles_num', 240)
    if not sequential and len(candles) > warmup_candles_num:
        candles = candles[-warmup_candles_num:]
    return candles
```

### Accessing open, close, high, low, and volume

In the tutorial above we used the helper function. `src = get_candle_source(candles, source_type)`.  
This function accepts as parameters:

- `"open"`
- `"close"`
- `"high"`
- `"low"`
- `"volume"`
- `"hl2"`
- `"hlc3"`
- `"ohlc4"`

and returns the corresponding candle data. That is useful in many cases, but you can get and calculate that data directly inside the indicator yourself.

```python
candles_open = candles[:, 1]
candles_close = candles[:, 2]
candles_high = candles[:, 3]
candles_low = candles[:, 4]
candles_volume = candles[:, 5]
candles_hl2 = (candles[:, 3] + candles[:, 4]) / 2
candles_hlc3 = (candles[:, 3] + candles[:, 4] + candles[:, 2]) / 3
candles_ohlc4 = (candles[:, 1] + candles[:, 3] + candles[:, 4] + candles[:, 2]) / 4
```

### The thing with NaN and zero

You should set indicator values, that can't be calculated to `np.nan`!

About NaN values:

- NaN is short for "Not a Number".
- NaN values represent undefined or unrepresentable results from certain mathematical operations.
- Mathematical operations involving a NaN will either return a NaN or raise an exception.
- Comparisons involving a NaN will return False.

What's the reason for that? Depending on your calculation you might need N candles from the past. Because of that, you won't be able to calculate a value for the indicator at the beginning of your candle data for exactly these N candles. To avoid future problems in your strategy or calculations these should be set to `np.nan` and not zero. Imagine a strategy where you enter in this condition `self.indicator_value < self.price`. If you had used zero instead of NaN and the current indicator value couldn't be calculated because of missing candles from the past or another problem in your calculation, the condition would be True, even if the real indicator value would be greater or the same as the price. If you had used NaN it would return False as explained above and you are safe.

### The thing with length

Numpy makes calculations with arrays easy. For example, you can easily create hl2 prices like that:

```python
candles_hl2 = (candles[:, 3] + candles[:, 4]) / 2
```

That works because `candles[:, 3]` and `candles[:, 4]` have the same shape/length.  
That's the reason why it's important to always keep the length consistent. [Use this to match lengths](https://docs.jesse.trade/docs/indicators/custom-indicators.html#make-arrays-the-same-length "Use this to match lengths") and read this to understand why it's important to use NaN for missing values: [The thing with NaN and zero](#the-thing-with-nan-and-zero "The thing with NaN and zero").

### Numba

Jesse uses [Numba](https://numba.pydata.org/ "Numba") to speed up indicator calculations. Numba works well on loops and a lot of numpy functions. Check the Numba docs.  
[Here](https://github.com/jesse-ai/jesse/blob/21b4438a817f4c2ffcab6b95a8518832e49abb89/jesse/indicators/high_pass.py "Here") you will find a usage example from Jesse's indicators.

### External libraries for technical indicators and things to be aware of

Jesse provides built-in implementations of most common technical indicators. You can import and use them directly from `jesse.indicators`. For example:

```python
from jesse.indicators import ema, sma, rsi

ema_value = ema(candles, period=14, sequential=True)
sma_value = sma(candles, period=20, sequential=True)
rsi_value = rsi(candles, period=14, sequential=True)
```

These built-in indicators are optimized for performance and work directly with Jesse's numpy-based candle data structure.

### Loops

Try to avoid loops whenever possible. Numpy and Scipy have a lot of functions that can replace the stuff that you might want to do in a loop. Loops will make the backtest very slow. The worst would be a loop within a loop. Do some research on ways to avoid them. Jesse's Discord or Stackoverflow might be a good place.

#### How to do a loop if you couldn't avoid it:

For this example, we calculate the difference between the closing price to the closing price 10 candles ago. First, we create an empty array with NaNs. (For this reason check out: [The thing with NaN and zero](#the-thing-with-nan-and-zero "The thing with NaN and zero")) Then we do the loop starting with i = 10, as we need 10 past candles for this calculation to work until we reach the maximal available candle length.

```python
    close = candles[:, 2]
    my_indicator_from_loop = np.full_like(close, np.nan)
    for i in range(10, len(close)):
        my_indicator_from_loop[i] = close[i] - close[i-10]
```

Consider using [Numba](#numba "Numba") to speed it up.

### Usefull Numpy stuff

Here we collect functions and links, that are often useful in indicator code.

#### Numpy's Shift

```python
def np_shift(arr: np.ndarray, num: int, fill_value=np.nan) -> np.ndarray:
    result = np.empty_like(arr)

    if num > 0:
        result[:num] = fill_value
        result[num:] = arr[:-num]
    elif num < 0:
        result[num:] = fill_value
        result[:num] = arr[-num:]
    else:
        result[:] = arr

    return result
```

[Source](https://stackoverflow.com/a/42642326/6437437 "Source")

#### Numpy's Forward Fill

```python
def np_ffill(arr: np.ndarray, axis: int = 0) -> np.ndarray:
    idx_shape = tuple([slice(None)] + [np.newaxis] * (len(arr.shape) - axis - 1))
    idx = np.where(~np.isnan(arr), np.arange(arr.shape[axis])[idx_shape], 0)
    np.maximum.accumulate(idx, axis=axis, out=idx)
    slc = [np.arange(k)[tuple([slice(None) if dim == i else np.newaxis
                               for dim in range(len(arr.shape))])]
           for i, k in enumerate(arr.shape)]
    slc[axis] = idx
    return arr[tuple(slc)]
```

#### Numpy's Sliding Window

The [sliding\_window\_view](https://numpy.org/devdocs/reference/generated/numpy.lib.stride_tricks.sliding_window_view.html "sliding_window_view") is a very usefull new function of numpy for indicator calculation.

[Here](https://github.com/jesse-ai/jesse/blob/21b4438a817f4c2ffcab6b95a8518832e49abb89/jesse/indicators/fwma.py "Here") you will find a usage example from Jesse's indicators.

#### Make arrays the same length

```python
array_with_matching_lenght = np.concatenate((np.full((candles.shape[0] - array_with_shorter_lenght.shape[0]), np.nan), array_with_shorter_lenght)
```

or

```python
from jesse.helpers import same_length
array_with_matching_lenght = same_length(candles, array_with_shorter_lenght)
```

#### Use Numpy's Vectorized Operations

Whenever possible you want to use [VectorizedOperations](https://www.pythonlikeyoumeanit.com/Module3_IntroducingNumpy/VectorizedOperations.html "VectorizedOperations"), as they are faster.