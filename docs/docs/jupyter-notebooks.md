# Jupyter Notebooks

## Setup

```ssh
# inside the jesse container if you are using docker
pip install jupyterlab
```

```ssh
jupyter notebook --ip 0.0.0.0 --no-browser --allow-root
```

::: warning
If you are running it on a VPS it's important to secure Jupyter (for example SSL, Password etc.). You will find tutorials about that in the internet. 
:::

To use Jesse inside your notebooks, you must create them inside the root of your Jesse project (so that it can see present `.env` file containing values for the database). Start by importing the research module:

```py
from jesse import research
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
You can use [indicators](/docs/indicators) modules in your notebooks just as you did in your strategies. However, because indicators return single values by default, in case you intend to draw charts (I'm assuming that's why you're using Jupyter Notebooks in the first place) it is easier to set the `sequential=True` to get array of indicator values.

## Example
Let's import candles for `ETH-USDT` and calculate SMA with period of 50 and display them on a chart:

```py
from datetime import datetime
import matplotlib.pyplot as plt
from pandas.plotting import register_matplotlib_converters
register_matplotlib_converters()
from jesse import research
import jesse.indicators as ta


btc_candles = research.get_candles('Binance', 'BTC-USDT', '30m', '2021-11-10', '2021-11-20')
btc_sma_50 = ta.sma(btc_candles, 50, sequential=True)
btc_close = btc_candles[:, 2]

# convect timestamps into a format that is supported for plotting
times = []
for c in btc_candles:
    times.append(datetime.fromtimestamp(c[0] / 1000))

plt.figure(figsize=(15, 6))
plt.plot(times, btc_close, color='blue', label='btc')
plt.plot(times, btc_sma_50, color='black', label='SMA 50')
plt.legend();
```
![notebook-example](../docs/imgs/notebooks-example.png)
