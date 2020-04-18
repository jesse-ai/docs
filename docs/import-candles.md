# Importing Candles

You need historical candles to run backtest simulations. The command to import candles is:

```bash
jesse import-candles 'exchange' 'symbol' 'start_date'
```

A working example would be:

```bash
jesse import-candles 'Binance' 'BTCUSDT' '2018-06-01'
```

This will import candles for `BTCUSDT` from Binance since `2018-01-01` until this very moment.

::: tip
You may run this command as many times as you desire. Duplicate candles will get skipped automatically. 

That means in the future, you can run the same command you just used, for fetching most recent candles. 
:::

## Supported exchanges

Supported exchanges (so far) are:

-   `Binance`
-   `Testnet Binance Futures`
-   `Binance Futures`
-   `Bitfinex`
-   `Coinbase`
