# Importing Candles

You need historical candles to run backtest simulations. The command to import candles is:

```
jesse import-candles exchange symbol start_date
```

A working example would be:

```
jesse import-candles 'Binance' 'BTC-USDT' '2018-06-01'
```

This will import candles for `BTC-USDT` from Binance since `2018-06-01` until this very moment.

::: tip
You may run this command as many times as you desire. Duplicate candles will get skipped automatically. 

That means in the future, you can run the same command you just used, for fetching most recent candles. 
:::


::: warning
For some CLI you need to remove the quotation marks for the command to work.
:::

## Supported exchanges

Supported exchanges (so far) are:

-   `Binance`
-   `Testnet Binance Futures`
-   `Binance Futures`
-   `Bitfinex`
-   `Coinbase`
