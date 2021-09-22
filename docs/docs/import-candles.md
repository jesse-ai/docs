# Importing Candles

You need historical candles to run backtest simulations. The command to import candles is:

```
jesse import-candles exchange symbol start_date
```

A working example would be:

```
jesse import-candles 'Binance' 'BTC-USDT' '2018-06-01'
```

This will import candles for `BTC-USDT` from Binance since `2018-06-01` until this very moment.

::: tip
You may run this command as many times as you desire. Duplicate candles will get skipped automatically. 

That means in the future, you can run the same command you just used, for fetching most recent candles. 
:::


::: warning
For some CLI you need to remove the quotation marks for the command to work.
:::

## Supported exchanges

Supported exchanges (so far) are:

-   `Binance`
-   `Testnet Binance Futures`
-   `Binance Futures`
-   `Bitfinex`
-   `Coinbase`
-    `FTX` (via [plugin](https://github.com/jesse-ai/ftx-driver))

## Creating custom exchange drivers 

You can write your own custom exchange drivers as use them as plugins. You may even publish them as PIP packages so others can install and use them easily. 

This can be done in three steps:
1. Define a new class that inherits the `CandleExchange` class and implements all of its required methods. 
2. Register it in the `plugins.py` file that is included in your Jesse project. 
3. Add config values for the created exchange in your `config.py` file if you intend to run backtests (which usually is the case)

### Defining a class for your plugin
First, create a new directory and a new file for your driver. The directory could be anything such as `drivers` just don’t use the name `plugins`. 

The content should be a Python class inheriting from the `CandleExchange` class and it must implement below methods: 
- `get_starting_time()`: it is used to detect the first date the data is available for that symbol. 
- `fetch()`: It is where you actually submit the HTTP request to the exchange that receives the candles. It is supposed to return a list of candles. 

The best way to get you started is to take a look at an [example driver](https://github.com/jesse-ai/ftx-driver), copy and paste it, and modify it based on the API of your targeted exchange! 

### Register your driver
Now you need to tell Jesse where to find this driver. We do that by adding it as a driver for importing candles in `plugins.py` file that exists in the root of Jesse projects. Here is an example where I register a driver for the FTX exchange:

```py
from jesse.modes.import_candles_mode.drivers.binance import Binance
from jesse.modes.import_candles_mode.drivers.binance_futures import BinanceFutures
from jesse.modes.import_candles_mode.drivers.binance_inverse_futures import BinanceInverseFutures
from jesse.modes.import_candles_mode.drivers.bitfinex import Bitfinex
from jesse.modes.import_candles_mode.drivers.coinbase import Coinbase
from jesse.modes.import_candles_mode.drivers.testnet_binance_futures import TestnetBinanceFutures

from jesse_ftx import FTX

import_candles_drivers = {
    'Binance': Binance,
    'Binance Futures': BinanceFutures,
    'Binance Inverse Futures': BinanceInverseFutures,
    'Testnet Binance Futures': TestnetBinanceFutures,
    'Bitfinex': Bitfinex,
    'Coinbase': Coinbase,
    'FTX': FTX
}
```

Now I should be able to run import candles from FTX:

```
jesse import-candles 'FTX' 'BTC-USDT' '2012-06-04'
```

### Add new config values for running backtests
Usually, the reason for importing candles in the first place is to run backtests on them. So we need to tell Jesse where to find the config values for our newly added exchange in order for it to run backtests on it. 

We can do that by opening `config.py` and copying and pasting values from an existing exchange such as `Binance Futures` and changing the values according to our needs for our exchange. 
