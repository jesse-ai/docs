# Routing

Routes are how you choose which **symbol** to trade, in which **timeframe**, at which **exchange**, and which **strategy** to use.

::: tip 🎥 Video Tutorial
In case you prefer watching a video, here's a [short screencast explaining routes](https://youtu.be/eF5ZzoLFydM).
:::

## Basic usage

You must choose at least one route. Here is a basic example:

![baisc-routes-example](https://jesse.trade/storage/images/docs/baisc-routes-example.jpg)


## Supported timeframes:

Supported timeframes at this time are **1m**, **3m**, **5m**, **15m**, **30m**, **45m**, **1h**, **2h**, **3h**, **4h**, **6h**, **8h**, **12h**, **1D**. Custom timeframes are not supported yet. 
## Multiple symbols (routes)

Jesse allows trading more than one symbol at the same time. Although we call them routes in there. Here's an example for trading `BTC-USDT` on the `1h` timeframe, and `ETH-USDT` on the `4h` timeframe:

![multiple-trading-routes-example](https://jesse.trade/storage/images/docs/multiple-trading-routes-example.jpg)

::: warning
Technically, there's no limit to the number of routes you can define with Jesse. But in practice, you will face connectivity issues when live trading with too many routes. Of course, it depends on the exchange you're trading on and how stable their connection is. **So I highly recommend sticking to a low number of routes. 5 is usually a safe number.**
:::

::: warning
The `exchange` and `symbol` pairs must be unique.

That means you CAN trade `BTC-USDT` at the same time in both `Binance` and `Bitfinex`; but you CANNOT trade `BTC-USDT` in `Binance` on both `1h` and `4h` timeframes at the same time.

Why? Because exchanges support only one position per symbol and we want to keep it simple so you can check whether or not Jesse and the exchange are in sync.
:::

## Multiple timeframes

You can use multiple timeframes when writing strategies. We call them extra routes in here. Extra routes look a lot like trading routes, except that you don't assign a strategy to them.  

A typical example might be to use the daily time frame to detect the bigger trend of the market, and the hourly time frame to detect the smaller trend.

::: tip
This is a common feature that professional traders use in their manual trading. However, in algorithmic trading, it gets tricky because of the [Look-Ahead Bias](https://www.investopedia.com/terms/l/lookaheadbias.asp). This issue **is completely taken care of** in Jesse.
:::

All you need to do is to define extra candles. For example, if you're trading `4h` time frame, and using `1D` time frame in your strategy, this is how your routes must look like:

![extra-route-example](https://jesse.trade/storage/images/docs/extra-route-example.jpg)

::: warning
You may be thinking why not just define a few extra routes and leave them be; whether or not use them. That would work; however, Jesse goes through expensive calculations to make extra candles work without the [Look-Ahead Bias](https://www.investopedia.com/terms/l/lookaheadbias.asp); hence, you will be facing longer backtest simulations.
:::
