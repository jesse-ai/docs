# Importing Candles

To run backtest simulations on your trading strategies, first you need historical candles.

The command to import candles is:

```bash
jesse import-candles 'exchange' 'symbol' days_ago
```

A working example would be:

```bash
jesse import-candles 'Binance' 'BTCUSDT' 100
```

This will import candles for `BTCUSDT` from Binance from 100 days go until this very moment.

::: tip
You may run this command as much as you desire. Duplicate candles will get skipped automatically.
:::

## Supported exchanges

Supported exchanges for importing candles are:

-   `Binance`
-   `Testnet Binance Futures`
-   `Binance Futures`
-   `Bitfinex`

## Supported symbols

Supported symbols depend on the market itself. Misspelling the symbol string will output the list of supported symbols on that specific exchange. For example entering:

```bash
jesse import-candles 'Binance' XXXXXX 1
```

Will display the following output:

```
symbol "XXXXXX" is not supported for Binance. supported symbols are:
(
    'BTCUSDT',
    'BNBUSDT',
    'ETHUSDT',
    'WINUSDT',
    'BTCUSDC',
    'ETCUSDT',
    'LTCUSDT',
    'XRPUSDT',
    'EOSUSDT',
    'TRXUSDT',
    'BCHABCUSDT',
    'BTT/USDT',
    'BTCPAX',
    'PERLUSDT',
    'NEOUSDT',
    'BATUSDT',
    'IOTAUSDT',
    'OMGUSDT',
    'LINKUSDT'
)
```
