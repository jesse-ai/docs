# Exchange Limitations

When it comes to live trading, sometimes we are limited by how an exchange's API works.

This page lists the limitations of each exchange that are known so far:

## Bybit

Due to an issue with ByBit's API, the closing orders submitted by Jesse for this exchange do not use the reduce-only feature.

If you absolutely need the reduce-only feature for the orders, please consider using another exchange.

## Why can't I backtest on some of the exchanges that are available for live trading?

If we support an exchange for live trading but not for backtesting, the reason is that their API doesn't provide enough historical candles for backtests to be possible. However, they do provide enough for live trading.

Examples of this are the Apex Exchange.
