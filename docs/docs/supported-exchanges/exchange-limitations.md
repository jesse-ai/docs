# Exchange Limitations

When it comes to live trading, sometimes we are limited by how an exchange's API works.

<!-- This page lists the limitations of each exchange that are known so far: -->

## Why can't I backtest on some of the exchanges that are available for live trading?

If we support an exchange for live trading but not for backtesting, the reason is that their API doesn't provide enough historical candles for backtests to be possible. However, they do provide enough for live trading.

Examples of this are the Apex and Hyperliquid exchanges. [Alpaca](/docs/supported-exchanges/alpaca) is another: as a broker it isn't a source of candles for backtests, so you research US stocks on candles from a [data provider](/docs/traditional-markets/importing-data) instead.
