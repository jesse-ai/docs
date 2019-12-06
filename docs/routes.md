# Routing

Routes are how you tell Jesse which **symbol** to trade, in which **time frame**, at which **exchange**, and which **strategy** to use.

There are separate router files for each mode. The syntax is the same for all of them; you can even copy and paste one's content in another. The locations of router files are:

-   `jesse/routes/backtest.py`
-   `jesse/routes/papertrade.py`
-   `jesse/routes/livetrade.py`
-   `jesse/routes/optimize.py`
-   `jesse/routes/importing_market_data.py`

## Basic syntax

You must implement at least one route to start Jesse. Here is the basic syntax:

```py
(exchange, symbol, timeframe, strategy)
```

Working example:

```py
from jesse.enums import exchanges, timeframes

routes = [
    (exchanges.BINANCE, 'BTCUSDT', timeframes.HOUR_4, 'TrendFollowingStrategy'),
]
```

In this example we're telling Jesse to trade "BTCUSDT" using "TrendFollowingStrategy" strategy at "Binance" exchange in "4 hours" time interval.

::: tip
Notice that I used enums. Instead of writing `'4h'`, I wrote`timeframes.HOUR_4`. This is optional but helps to prevent misspelling string.
:::

## Trading multiple routes

You can trade more than one route at the same time. The `routes` variable is a list, so we can multiple routes in it:

```py
from jesse.enums import exchanges, timeframes

routes = [
    (exchanges.BINANCE, 'BTCUSDT', timeframes.HOUR_4, 'TrendFollowingStrategy'),
    (exchanges.BINANCE, 'ETHUSDT', timeframes.MINUTE_15, 'MeanReverseStrategy'),
]
```

::: warning
The `exchange` and `symbol` pairs must be unique.

That means you CAN trade `BTCUSDT` at the same time in `Binance` and `Bitfinex` but you CANNOT trade `BTCUSDT` in `Binance` on both `1h` and `4h` timeframes at the same time.

Why? Because exchanges support only one position per symbol.
:::

## Using multiple time frames

You can use multiple time frames when writing strategies.

For example, you may want to use the daily time frame to detect the bigger trend of the market, and the hourly time frame to detect the smaller trend.

::: tip
This is a common feature that professional traders use in their manual trading. However, in algorithmic trading it gets tricky because of the [Look-Ahead Bias](https://www.investopedia.com/terms/l/lookaheadbias.asp). This issue _is completely taken care of_ in Jesse.
:::

All you need to do is to define extra routes for extra timeframes. The syntax for `extra_routes` is the same as `routes` except no need to define the _strategy_ name at the end.

For example, if you're trading `4h` time frame, and using `1D` time frame in your strategy, this is how your routes should look like:

```py
from jesse.enums import exchanges, timeframes

routes = [
    (exchanges.BINANCE, 'BTCUSDT', timeframes.HOUR_4, 'TrendFollowingStrategy'),
]

extra_routes = [
    (exchanges.BINANCE, 'BTCUSDT', timeframes.DAY_1),
]
```

::: warning
You may be thinking why not just define few extra routes and leave them be; whether or not using them. That would work fine; however Jesse goes through expensive calculations to make extra routes work without the [Look-Ahead Bias](https://www.investopedia.com/terms/l/lookaheadbias.asp); hence, you will be facing longer backtest simulations.
:::
