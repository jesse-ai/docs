
# Advanced - Adding a custom indicator

Your strategy idea needs indicators, that aren't available yet? Let's see how to create and use custom indicators in Jesse. 

## Tutorial for a custom indicator

In this tutorial, we will convert [Elliott Wave Oscillator by Centrokom](https://id.tradingview.com/script/Q29rCz5S-Elliott-Wave-Oscillator/) that is originally written in Pine Script to a custom indicator usable in Jesse. The following is the original code from Tradingview:
```js
//@version=3
study("Elliott Wave Oscillator")
s2=ema(close, 5) - ema(close, 34)
c_color=s2 <= 0 ? red : lime
plot(s2, color=c_color, style=histogram, linewidth=2)
```

Now, let's start the creation of our first custom indicator:
1. Create a new folder called `custom_indicators` and it's `__init__.py` file in project's `ROOT` folder.
2. Then create a new file for the actual indicator, in this case we name it: `ewo.py` for our Elliott Wave Oscillator.
3. The folder structure should look like this:
```sh
├── config.py # file where you enter your database credentials, etc
├── routes.py # file where routes are defined in 
├── storage # folder containing logs, chart images, etc
├── strategies # folder where you define your strategies
└── custom_indicators # folder for Jesse's custom indicator
    ├── __init__.py
    └── ewo.py
```
4. Import the custom indicator file in `custom_indicators/__init__.py`.
```python
from .ewo import ewo
```
5. Now we can start creating the actual indicator code in `ewo.py`.
```python
import numpy as np
import talib
from typing import Union

from jesse.helpers import get_candle_source

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
    if not sequential and len(candles) > 240:
        candles = candles[-240:]
    
    src = get_candle_source(candles, source_type)
    ewo = np.subtract(talib.EMA(src, timeperiod=short_period), talib.EMA(src, timeperiod=long_period))

    if sequential:
        return ewo
    else:
        return ewo[-1]
```
6. Finally, to use the indicator in a trading strategy, we add the custom_indicators as library.
```python
from jesse.strategies import Strategy
import custom_indicators as cta

class Strategy01(Strategy):
    @property
    def ewo(self):
        return cta.ewo(self.candles, short_period=5, long_period=34, source_type="close", sequential=True)
```
## Hints
### Accessing open, close, high, low and volume
In the tutorial above we used the helper function. `src = get_candle_source(candles, source_type)`. 
Which accepts as parameter:
-   `"close"`
-   `"high"`
-   `"low"`
-   `"open"`
-   `"volume"`
-   `"hl2"`
-   `"hlc3"`
-   `"ohlc4"`

and returns the corresponding candle data. That is usefull in many cases, but you can get and calculate that data directly inside the indicator yourself.
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
You should set indicator values, that can't be calculate to `np.nan`!

About NaN values:

-   NaN is short for “Not a Number”.
-   NaN values represent undefined or unrepresentable results from certain mathematical operations.
-   Mathematical operations involving a NaN will either return a NaN or raise an exception.
-   Comparisons involving a NaN will return False.

What's the reasons for that? Depending on your calculation you might need N candles from the past. Because of that, you won't be able to calculate a value for the indicator at the beginning of your candle data for exactly these N candles. To avoid future problems in your strategy or calculations these should be set to  `np.nan` and not zero. Imagine a strategy where you enter on this condition `self.indicator_value < self.price`. If you would have used zero insted of NaN and the current indicator value couldn't be calculate because of missing candles from the past or another problem in your calculation, the condition would be True, even if the real indicator value would be greater or the same as price. If you used NaN it would return False as explained above.


### The thing with length
Numpy makes calculations with arrays easy. For example you can easily create hl2 prices like that:
```python
candles_hl2 = (candles[:, 3] + candles[:, 4]) / 2
```
That works because `candles[:, 3]` and `candles[:, 4]`have the same shape / length.
That's the reason why its important to always keep the lenght consistent. [Use this to match lengths](https://docs.jesse-ai.com/docs/indicators/custom_indicator.html#make-it-the-same-lenght-again) and read this to understand why its important to use NaN for missing values: [The thing with NaN and zero](#the-thing-with-nan-and-zero).


### External libraries for technical indicators and things to be aware of
There are mainly two kinds of python libraries for technical indicators: Some are Pandas based and some are Numpy based. For performance reasons Jesse uses Numpy. 
#### Talib
Talib is a perfect match for Jesse as it uses Numpy.
```python
import talib
ema = talib.EMA(candles[:, 2], timeperiod=period)
```
#### Tulipy 
Tulipy returns Numpy, but has two things you need to be aware of.
```python
import tulipy
zlema = tulipy.zlema(np.ascontiguousarray(candles[:, 2]), period=period)
zlema_with_nan = np.concatenate((np.full((candles.shape[0] - zlema.shape[0]), np.nan), zlema)
```
  - Tulipy accepts only contiguousarray. The conversion can be done with: `np.ascontiguousarray(candles[:, 2])`
  - The returned length of the array varies. That's connected to the problem explained in [The thing with NaN and zero](#the-thing-with-nan-and-zero). Tulipy just strips the values it couldn't calculate. To stay consistent with the length of our arrays we need to add those NaN ourself: `np.concatenate((np.full((candles.shape[0] - zlema.shape[0]), np.nan), zlema), axis=0)`. This compares the lengths and adds the difference as NaN to the beginning of the indicator array.

#### Libraries using Pandas
There are libraries out there using pandas. To use them you need to convert Numpy to Pandas. You can use [this helper function](https://docs.jesse-ai.com/docs/utils.html#numpy-candles-to-dataframe) for the conversion. The result of the indicator needs to be then converted back to numpy. Probably that will do it: [pandas.Series.to_numpy](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.to_numpy.html#pandas-series-to-numpy). All that converting will cost you performance and Pandas itself is less performant than Numpy.

### Loops
Try to avoid loops whenever possible. Numpy and Scipy have a lot functions that can replace the stuff that you might wanted to do in a loop. Loops will make the backtest very slow. The worst would be a loop within a loop. Do some research on ways to avoid them. The Jesse froum or Stackoverflow might be a good place.

#### How to do a loop if you couldn't avoid it:
For this example we calculate the difference of the closing price to the closing price 10 candles ago.  First we create an empty array with NaNs. (For the reason check out: [The thing with NaN and zero](#the-thing-with-nan-and-zero)) Then we do the loop starting with i = 10, as we need 10 past candles for this calculation to work until we reach the maximal available candle length.
```python
    close = candles[:, 2]
    my_indicator_from_loop = np.full_like(close, np.nan)
    for i in range(10, len(close)):
        my_indicator_from_loop[i] = close[i] - close[i-10]
```
### Usefull Numpy stuff
Here we collect functions and links, that are often usefull in indicator code.

#### Numpy's Shift
```python
def shift(arr, num, fill_value=np.nan):  
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
[Source](https://stackoverflow.com/a/42642326/6437437)

#### Make arrays the same lenght
```python
array_with_matching_lenght = np.concatenate((np.full((candles.shape[0] - array_with_shorter_lenght.shape[0]), np.nan), array_with_shorter_lenght)
```
