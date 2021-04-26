# Jupyter Notebooks

To use Jesse inside your notebooks, you must create them inside the root of your Jesse project (so that it can see present `config.py` file). Start by importing and initiating the research module:

```py
from jesse import research
research.init()
```

## get_candles

```py
get_candles(exchange, symbol, timeframe, start_date, finish_date)
```

Returns a numpy array of candles.

**Properties**:

-   exchange: str
-   symbol: str
-   timeframe: str (supported: `1m`, `3m`, `5m`, `15m`, `30m`, `1h`, `2h`, `3h`, `4h`, `6h`, `1D`)
-   start_date: str
-   finish_date: str

**Return Type**: np.narray

**Example:**

```py
eth_candles = research.get_candles('Binance', 'ETH-USDT', '4h', '2019-07-28', '2019-09-28')

print(eth_candles[0])
# array([
#     1.56427200e+12, # timestamp 
#     2.07300000e+02, # open
#     2.07750000e+02, # close
#     2.08230000e+02, # high
#     2.06170000e+02, # low
#     2.15143531e+04 # volume
# ])
```

## Indicators
You can use [indicators](/docs/indicators) modules in your notebooks just as you did in your strategies. However, because indicators return single values by default, in case you intend to draw charts (I'm assuming that's why you're using Jupyter Notebooks in the first place) it is easier to set the `sequence=True` to get array of indicator values.

## Example
Let's import candles for `ETH-USDT` and calculate SMA with period of 50 and display them on a chart:

```py
from datetime import datetime
import matplotlib.pyplot as plt
from pandas.plotting import register_matplotlib_converters
register_matplotlib_converters()

from jesse import research
research.init()

import jesse.indicators as ta


eth_candles = research.get_candles('Binance', 'ETH-USDT', '4h', '2019-07-28', '2019-09-28')
eth_sma_50 = ta.sma(eth_candles, 50, sequential=True)
eth_close = eth_candles[:, 2]

# convect timestamps into a format that is supported for plotting
times = []
for c in eth_candles:
    times.append(datetime.fromtimestamp(c[0] / 1000))

plt.figure(figsize=(15, 6))
plt.plot(times, eth_close, color='blue', label='ETH')
plt.plot(times, eth_sma_50, color='black', label='SMA 50')
plt.legend();
```
![notebook-example](../docs/imgs/notebooks-example.png)

## Running CLI commands

During your research you might want to dynamically import more candles or run backetests. 

One quick way to do is by running the CLI commands directly from within the notebook:

```py
pairs = ['ETH-USDT', 'BTC-USDT']
for pair in pairs:
  !jesse import-candles Binance {pair} 2021-04-01 --skip-confirmation
```

Note that the command's output (e.g. progress indicator) won't be piped to the notebook. Jupyter hijacks the stdout/stderr/stdin streams which makes it incompatible with [Click](https://click.palletsprojects.com/en/7.x/), the library used to implement Jesse's CLI functionality. However, we can hack around this:

```py
import click;
click._compat._force_correct_text_writer = lambda stream, encoding, error: stream

pairs = ['ETH-USDT', 'BTC-USDT']
for pair in pairs:
  !jesse import-candles Binance {pair} 2021-04-01 --skip-confirmation
```
