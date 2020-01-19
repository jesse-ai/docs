# Importing Candles

To run backtest simulations on your trading strategies, first you need historical candles.

The command to import candles is:

```bash
jesse import-candles 'exchange' 'symbol' start_date
```

A working example would be:

```bash
jesse import-candles 'Binance' 'BTCUSDT' 2018-06-01
```

This will import candles for `BTCUSDT` from Binance from `2018-01-01` until this very moment.

::: tip
You may run this command as much as you desire. Duplicate candles will get skipped automatically.
:::

## Supported exchanges

Supported exchanges for importing candles are:

-   `Binance`
-   `Testnet Binance Futures`
-   `Binance Futures`
-   `Bitfinex`
-   `Coinbase`
