# Importing Candles

You need historical candles to run backtest simulations. 

::: tip 🎥 Video Tutorial
In case you prefer watching a video, here's a [short screencast about candles in Jesse](https://bit.ly/3AFGCkB).
:::

To start importing candles head over to the "Import Candles" page. There, you will be able to choose the **exchange**, **Symbol**, and the **Start Date**. There's no **Finish Date** input because Jesse will always import until the same day (today).

For example to import candles for `BTC-USDT` from `Binance` since `2018-06-01` until this very moment:

![import-candles-1](https://jesse.trade/storage/images/docs/import-candles-1.jpg)

::: tip
Next time, to keep your data storage up to date try running with the same inputs without worry, and duplicate candles will be skipped. So you can run the same import session as many times as you like to always have the latest candles without waiting a long time on every import session. 
:::


## Supported exchanges

So far, the below exchanges are supported for **importing candles and running backtests**:

-   `Binance Spot`
-   `Binance US Spot`
-   `Binance Perpetual Futures Testnet `
-   `Binance Perpetual Futures`
-   `Bitfinex Spot`
-   `Coinbase Spot`
-   `FTX Spot` 
-   `FTX US Spot` 
-   `FTX Perpetual Futures` 
-   `Bybit USDT Perpetual Testnet` 
-   `Bybit USDT Perpetual` 

To see the list supported exchanges for **live trading** please check [this page](/docs/livetrade.html#supported-exchanges). 

## Creating custom exchange drivers

::: danger
This feature is temporarily disabled.
:::

You can write your own custom exchange drivers and use them as plugins. You may even publish them as PIP packages so others can install and use them easily. 

This can be done in three steps:
1. Define a new class that inherits the `CandleExchange` class and implements all of its required methods. 
2. Create a new file named `plugins.py` in your Jesse project. 

### Defining a class for your plugin
First, create a new directory and a new file for your driver. The directory could be anything such as `drivers` just don’t use the name `plugins`. 

The content should be a Python class inheriting from the `CandleExchange` class and it must implement below methods: 
- `get_starting_time()`: it is used to detect the first date the data is available for that symbol. 
- `fetch()`: It is where you submit the HTTP request to the exchange that receives the candles. It is supposed to return a list of candles. 

The best way to get you started is to take a look at an [example driver](https://github.com/jesse-ai/ftx-driver), copy and paste it, and modify it based on the API of your targeted exchange! 

### Register your driver
Now you need to tell Jesse where to find this driver. We do that by adding it as a driver for importing candles in `plugins.py` file that exists in the root of Jesse projects. Here is an example where I register a driver for the FTX exchange:

```py
from jesse_ftx import FTX

import_candles_drivers = {
    # this is for example only. Otherwise we now have built-in support for "FTX Futures"
    'FTX': FTX
}
```

Now I should be able to see FTX in the list of exchanges.
