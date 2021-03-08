
# Routing

Routes are how you define which **symbol** to trade, in which **time frame**, at which **exchange**, and which **strategy** to use.

Routes are located at the `routes.py` file in your project. 

## Basic syntax

You must implement at least one route. Here is the basic syntax:

```py
(exchange, symbol, timeframe, strategy)
```

Working example:

```py
from jesse.enums import exchanges, timeframes

routes = [
    ('Binance', 'BTC-USDT', '4h', 'TrendFollowingStrategy'),
]
```

In this example, we're telling Jesse to trade `BTC-USDT` using `TrendFollowingStrategy` strategy at `Binance` exchange in `4h` time interval.

::: tip
Instead of writing `'4h'`, you could write `timeframes.HOUR_4`. This is optional but helps to prevent misspelling string.
:::

## Available timeframes:
```py
MINUTE_1 = '1m'  
MINUTE_3 = '3m'  
MINUTE_5 = '5m'  
MINUTE_15 = '15m'  
MINUTE_30 = '30m'  
MINUTE_45 = '45m'  
HOUR_1 = '1h'  
HOUR_2 = '2h'  
HOUR_3 = '3h'  
HOUR_4 = '4h'  
HOUR_6 = '6h'  
HOUR_8 = '8h'  
HOUR_12 = '12h'  
DAY_1 = '1D'  
DAY_3 = '3D'  
WEEK_1 = '1W'
```

## Trading multiple routes

You can trade more than one route at the same time. The `routes` variable is a list, so we can put multiple routes in it:

```py
from jesse.enums import exchanges, timeframes

routes = [
    ('Binance', 'BTC-USDT', '4h', 'TrendFollowingStrategy'),
    ('Binance', 'ETH-USDT', '15m', 'MeanReverseStrategy'),
]
```

::: warning
The `exchange` and `symbol` pairs must be unique.

That means you CAN trade `BTC-USDT` at the same time in both `Binance` and `Bitfinex`; but you CANNOT trade `BTC-USDT` in `Binance` on both `1h` and `4h` timeframes at the same time.

Why? Because exchanges support only one position per symbol and we want to keep it simple.
:::

## Using multiple time frames

You can use multiple time frames when writing strategies.

A typical example might be to use the daily time frame to detect the bigger trend of the market, and the hourly time frame to detect the smaller trend.

::: tip
This is a common feature that professional traders use in their manual trading. However, in algorithmic trading, it gets tricky because of the [Look-Ahead Bias](https://www.investopedia.com/terms/l/lookaheadbias.asp). This issue _is completely taken care of_ in Jesse.
:::

All you need to do is to define extra candles. The syntax for `extra_candles` is the same as `routes` except no need to define the _strategy_ name at the end.

For example, if you're trading `4h` time frame, and using `1D` time frame in your strategy, this is how your routes must look like:

```py
from jesse.enums import exchanges, timeframes

routes = [
    ('Binance', 'BTC-USDT', '4h', 'TrendFollowingStrategy'),
]

extra_candles = [
    ('Binance', 'BTC-USDT', '1D'),
]
```

::: warning
You may be thinking why not just define few extra routes and leave them be; whether or not using them. That would work; however, Jesse goes through expensive calculations to make extra candles work without the [Look-Ahead Bias](https://www.investopedia.com/terms/l/lookaheadbias.asp); hence, you will be facing longer backtest simulations.
:::
