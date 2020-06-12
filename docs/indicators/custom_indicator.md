# Advanced - Adding a Custom Indicator

In Jesse, a custom indicator can be added to trading strategy, it facilitates strategy researcher to use indicator that are not available in Jesse's indicators list. Let's see how to create and use custom indicator in Jesse. 

## Custom Indicator Tutorial

In this tutorial, we will convert [Elliott Wave Oscillator by Centrokom](https://id.tradingview.com/script/Q29rCz5S-Elliott-Wave-Oscillator/) that is originally written in Pine Script to Jesse custom indicator. The following is the original implementation:
```js
//@version=3
study("Elliott Wave Oscillator")
s2=ema(close, 5) - ema(close, 34)
c_color=s2 <= 0 ? red : lime
plot(s2, color=c_color, style=histogram, linewidth=2)
```

Now, let's write our first custom indicator:
1. Create a new folder called `custom_indicators` and it's `__init__.py` file in project's `strategies/<strategy_name>` folder.
2. Then create a new file for the custom indicator, for example: `ewo.py` for our Elliott Wave Oscillator.
3. The folder structure will roughly look like this:
```sh
└── strategies
    ├── Strategy01
    │   ├── __init__.py
    │   ├── custom_indicators
    │   │   ├── __init__.py
    |   |   └── ewo.py
    └── Strategy02
        └── __init__.py
```
4. Import custom indicator file in `custom_indicators/__init__.py`.
```python
from .ewo import ewo
```
5. Now let's write the indicator implementation in `ewo.py`. In principle, the indicator should take some input and return a sequential or a single value. 
```python
import numpy as np
from jesse.indicators import ema
from typing import Union

def ewo(candles: np.ndarray, shortma: int = 5, longma: int = 34, source_type="close", sequential = False) -> Union[float, np.ndarray]:
    """
    Elliott Wave Oscillator
    :param candles: np.ndarray
    :param shortma: int - default: 5
    :param longma: int - default: 34
    :param source_type: str - default: close
    :param sequential: bool - default: False
    :return: Union[float, np.ndarray]
    """
    if not sequential and len(candles) > 240:
        candles = candles[-240:]
    
    ewo = np.subtract(ema(candles, shortma, source_type, True), ema(candles, longma, source_type, True))

    if sequential:
        return ewo
    else:
        return ewo[-1]
```
6. Finally, to use the indicator in trading strategy, import the file into the strategy's file and call in strategy class.
```python
from jesse.strategies import Strategy
import strategies.Strategy01.custom_indicators as cta

class Strategy01(Strategy):
    @property
    def ewo(self):
        return cta.ewo(self.candles, 5, 35, "close", True)
```