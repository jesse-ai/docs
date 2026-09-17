---
title: 'Traditional Markets'
---

# Traditional Markets

Jesse started as a crypto framework, and everything in these docs assumes crypto unless it says otherwise. This section covers what is different when you work with **stocks, forex, indices and futures**. Everything not mentioned here works exactly as it does for crypto: the same strategies, indicators, optimization, research tools and dashboard.

## What is different

**Candles come from a data provider, not from the exchange you trade on.** Crypto exchanges hand out their own history, so importing candles and trading happen on the same venue. Stock exchanges do not, so Jesse gets historical candles from a data provider and shows that provider in the import and backtest pages as if it were an exchange. Today that is [Massive](https://massive.com), split into `Massive Stocks`, `Massive Currencies`, `Massive Indices` and `Massive Futures`, plus `Custom Data` for CSV files from any other source. See [Importing Data](./importing-data.md).

**The data has gaps.** A crypto exchange produces a candle every minute of the year. A stock exchange produces nothing at night, at the weekend or on holidays, and Jesse keeps it that way: only the bars the provider actually observed are stored, and the backtest engine never invents candles to fill a closure. Bigger timeframes are built from the observed minutes, aligned to the clock. Where the provider has pre-market and after-hours bars, those are included too. This changes a few things you may be used to, all covered in [Backtesting on Gapped Data](./backtesting.md).

**You choose how the backtest simulates the market.** Because a provider is not a venue, it carries no fee, leverage or market type of its own. Each backtest session picks a **Simulation Model** (spot, or perpetual futures with leverage) and a **Trading Fee** in the session's exchange settings. The Massive sources default to spot; `Custom Data` defaults to perpetual futures.

**Metrics annualize on 252 observations, not 365.** Sharpe, Sortino, Omega and the annual return are computed with the number of trading days in a year. The default follows the data source and can be switched per session under **Annualization**.

**Live trading is available through supported crypto exchanges that offer tokenized stocks and other instruments tied to traditional markets.** You can use the [Trading Hours](/docs/strategies/trading-hours) helpers to keep entries inside the underlying market's session and off-hours candles out of your indicators. The data providers above supply historical candles for backtesting only. Traditional broker integrations are under development, starting with [Alpaca](https://alpaca.markets) for US stocks.

## What is supported today

| | Status |
|---|---|
| Importing candles from Massive (stocks, currencies, indices, futures) | Supported |
| Importing candles from a CSV file (`Custom Data`) | Supported |
| Backtesting, optimization and the research module on gapped data | Supported, detected automatically |
| Spot or perpetual-futures simulation per session | Supported |
| Split-adjusted stock prices | Default for `Massive Stocks` |
| Dividend adjustment | Not supported |
| Continuous futures contracts, rollover, contract multipliers | Not supported; each expiry is its own symbol, priced in synthetic units |
| Several exchanges or data sources in one backtest | Not supported; one source per run |
| Live trading on tokenized stocks and other traditional-market instruments | Supported through crypto exchanges that offer them |
| Live trading through traditional brokers | In development, starting with Alpaca |

## Where to go next

- [Importing Data](./importing-data.md): setting up Massive and the CSV format for `Custom Data`.
- [Backtesting on Gapped Data](./backtesting.md): what the engine does with closures, opening gaps, warm-up and metrics.
- [Trading Hours](/docs/strategies/trading-hours): strategy helpers for trading a stock-linked instrument on a 24/7 exchange.
- [Supported Exchanges](/docs/supported-exchanges/): the full list of crypto exchanges for backtesting and live trading.
