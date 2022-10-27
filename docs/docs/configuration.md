# Configuration

There are two types of configuration that you'll want to change. 

The first one contains your project's sensitive credentials such as passwords, exchange keys, etc. And the second type is the settings of the application itself which are accessible from the dashboard. 

Let's take a look at both:

## Environment Variables
These config values are also called environment variables. They are stored in a file called `.env` inside your project. Here are the default values that ship with every project:

```sh
PASSWORD=test
APP_PORT=9000

# If not using docker, you probably want to set this to "localhost"
POSTGRES_HOST=postgres
# POSTGRES_HOST=localhost
POSTGRES_NAME=jesse_db
POSTGRES_PORT=5432
POSTGRES_USERNAME=jesse_user
POSTGRES_PASSWORD=password

# If not using docker, you probably want to set this to "localhost"
# REDIS_HOST=localhost
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=


# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
# Live Trade Only                                                                 # 
# =============================================================================== #
# Below values don't concern you if you haven't installed the live trade plugin   #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 

# Enter the API token which you created at https://jesse.trade/user/api-tokens:
LICENSE_API_TOKEN=

# For all notifications
GENERAL_TELEGRAM_BOT_TOKEN=
GENERAL_TELEGRAM_BOT_CHAT_ID=
GENERAL_DISCORD_WEBHOOK=

# For error notifications only
ERROR_TELEGRAM_BOT_TOKEN=
ERROR_TELEGRAM_BOT_CHAT_ID=
ERROR_DISCORD_WEBHOOK=

# Testnet Binance Futures (http://testnet.binancefuture.com)
BINANCE_PERPETUAL_FUTURES_TESTNET_API_KEY=
BINANCE_PERPETUAL_FUTURES_TESTNET_API_SECRET=
# Binance Futures (https://www.binance.com/en/futures/btcusdt)
BINANCE_PERPETUAL_FUTURES_API_KEY=
BINANCE_PERPETUAL_FUTURES_API_SECRET=

# Testnet Bybit Perpetual (https://testnet.bybit.com/trade/usdt/BTCUSDT)
BYBIT_USDT_PERPETUAL_TESTNET_API_KEY=
BYBIT_USDT_PERPETUAL_TESTNET_API_SECRET=
# Bybit Perpetual (https://www.bybit.com/trade/usdt/BTCUSDT)
BYBIT_USDT_PERPETUAL_API_KEY=
BYBIT_USDT_PERPETUAL_API_SECRET=

# FTX Futures (https://ftx.com/markets/future)
FTX_PERPETUAL_FUTURES_API_KEY=
FTX_PERPETUAL_FUTURES_API_SECRET=
# leave empty if it's the main account and not a subaccount
FTX_PERPETUAL_FUTURES_SUBACCOUNT_NAME=
```

It is generally a good idea to stop the application before modifying your `.env` file and start it again after you've made the changes.

## Application Settings

At the top-right corner of the dashboard, you'll see a gear icon. Click on it and you'll see a list of settings like this:


![settings-optimization](https://jesse.trade/storage/images/docs/settings-optimization.jpg)

Go ahead change it as you like. Changes are automatically saved which is why there's no "Save" button. 

::: warning
Changing the settings will not affect running sessions. If you have one, stop and start it again for the changes to take affect. 

Note: you do NOT need to stop and start Jesse itself after changing these settings.
:::