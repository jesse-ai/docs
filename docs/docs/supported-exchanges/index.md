---
title: 'Supported Exchanges'
---

# Supported Exchanges

Not every exchange provides historical candles that can be used for doing backtesting and research. But they all offer candles for live trading.

Hence, supported exchanges for backtesting and live trading are different. For traditional markets (stocks, forex, indices, futures), you can import historical candles from **third-party data providers** or upload your own CSV files using **Custom Data**. These sources provide data for backtesting only. Live trading requires an account with a supported crypto exchange or broker. Traditional broker integrations are currently being built, starting with **Alpaca**.

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
-   `KuCoin USDT Perpetual`
-   `KuCoin Spot`
-   `Kraken Pro Futures`

::: tip
Notice that the words `Spot` and `Futures` in the exchange names above merely indicate the source of the candles and NOT the type of backtests you can run with them.

For example you can use candles from `Binance Spot` to run backtests in both **spot** and **futures** mode and vice versa.

You can change the type of exchange for backtests in the settings page per each individual exchange.
:::

### Traditional markets via data providers

Some crypto exchanges now offer instruments tied to traditional markets, including stocks, forex and indices. However, many of these listings are recent, so their historical candles do not yet cover enough time for thorough strategy development and backtesting. Jesse supports **third-party data providers** and **Custom Data** CSV imports so you can research these markets using longer historical datasets.

A data provider appears as a candle source on the import-candles and backtest pages. It supplies historical data for research; live trading takes place through a supported crypto exchange or broker integration.

At the moment there is first-class support for one provider, plus a generic CSV route for everything else. The [Traditional Markets](/docs/traditional-markets/) section covers setup, the CSV format and how backtests behave on this kind of data.

-   **[Massive](https://massive.com)**, available as four sources: `Massive Stocks`, `Massive Currencies`, `Massive Indices` and `Massive Futures`. Enter your Massive API key once on the dashboard's **Data Providers** page and import candles as usual. Massive is a historical data source, so fees, the spot-versus-futures simulation model and leverage remain backtest settings you choose per session.
-   **`Custom Data`**: upload a CSV file of your own candles from any market or vendor. The file needs `timestamp`, `open`, `close`, `high`, `low` and `volume` columns, and you pick the symbol name (for example `AAPL-USD`) at import time.

Both keep every bar the provider returns and never fabricate candles for the hours a market is closed. That means pre-market and after-hours bars are included where the provider has them, and overnight and weekend gaps stay as real gaps in the backtest. If your strategy should only decide entries during a market's regular session, see [Trading Hours](/docs/strategies/trading-hours).

## Live trading

At the moment these are the supported exchanges for live trading:

-   [Lighter](https://app.lighter.xyz/?referral=7248903K)
-   [Apex Omni](https://jesse.trade/apex)
-   [Kraken Pro Futures](https://jesse.trade/kraken)
-   [Kraken Pro Spot](https://jesse.trade/kraken)
-   [KuCoin USDT Perpetual Futures](https://jesse.trade/kucoin)
-   [KuCoin Spot](https://jesse.trade/kucoin)
-   [Hyperliquid](https://jesse.trade/hyperliquid)
-   [Bybit USDT Perpetual Futures](https://jesse.trade/bybit)
-   [Bybit USDC Perpetual Futures](https://jesse.trade/bybit)
-   [Bybit Spot](https://jesse.trade/bybit)
-   [Binance Perpetual Futures](https://www.binance.com/en/futures/BTCUSDT)
-   [Binance Spot](https://www.binance.com/en/trade/BTC_USDT?theme=dark&type=spot)
-   [Binance US Spot](https://www.binance.us)
-   [Coinbase Spot (Coinbase Advanced)](https://www.coinbase.com/advanced-trade/spot/BTC-USD) 
-   [Gate.io Perpetual Futures](https://jesse.trade/gate)
-   [Gate.io Spot](https://jesse.trade/gate)
-   Alpaca (coming soon)

### Traditional markets

Live trading on traditional markets goes through a broker rather than a crypto exchange. An **[Alpaca](https://alpaca.markets)** driver for US stocks is currently under development and will be the first traditional broker Jesse supports. Until it ships, the data providers above are backtest-only, and the closest live option is trading stock-linked instruments on one of the supported crypto exchanges with the [Trading Hours](/docs/strategies/trading-hours) helpers.

New exchange drivers are developed based on demand. If we don't already support the one you need, you can sponsor its development to expedite the process. Please reach out to me if you require an unsupported exchange.
