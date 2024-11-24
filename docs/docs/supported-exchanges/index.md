---
title: 'Supported Exchanges'
---

# Supported Exchanges

Not every exchange provides historical candles that can be used for doing backtesting and research. But they all offer candles for live trading.

Hence, supported exchanges for backtesting and live trading are different.

## Backtesting

So far, the below exchanges are supported for **importing candles and running backtests**:

-   `Binance Spot`
-   `Binance US Spot`
-   `Binance Perpetual Futures`
-   `Bitfinex Spot`
-   `Coinbase Spot (Coinbase Advanced)`
-   `Bybit USDT Perpetual`
-   `Bybit USDC Perpetual`
-   `Bybit Spot`
-   `Gate.io Perpetual Futures`

::: tip
Notice that the words `Spot` and `Futures` in the exchange names above merely indicate the source of the candles and NOT the type of backtests you can run with them.

For example you can use candles from `Binance Spot` to run backtests in both **spot** and **futures** mode and vice versa.

You can change the type of exchange for backtests in the settings page per each individual exchange.
:::

## Live trading

At the moment these are the supported exchanges for live trading:

-   [Apex Pro](https://jesse.trade/apex)
-   [Apex Omni](https://jesse.trade/apex)
-   [Bybit USDT Perpetual Futures](https://jesse.trade/bybit)
-   [Bybit USDC Perpetual Futures](https://jesse.trade/bybit)
-   [Bybit Spot](https://jesse.trade/bybit)
-   [Binance Perpetual Futures](https://www.binance.com/en/futures/BTCUSDT)
-   [Binance Spot](https://www.binance.com/en/trade/BTC_USDT?theme=dark&type=spot)
-   [Binance US Spot](https://www.binance.us)
-   [Coinbase Spot (Coinbase Advanced)](https://www.coinbase.com/advanced-trade/spot/BTC-USD) 
-   [Gate.io Perpetual Futures](https://jesse.trade/gate)
-   [Gate.io Spot](https://jesse.trade/gate)

New exchange drivers are developed based on demand. If we don't already support the one you need, you can sponsor its development to expedite the process. Please reach out to me if you require an unsupported exchange.
