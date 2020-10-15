# How to live-trade your strategy

This question comes up a lot: 

Can Jesse execute live trades or is it a backtest-only framework?

The "live-trade" plugin is under active development and is being tested. 

## When will it be released?
It will be released a few weeks (or months) after the release of the "optimize" mode. 

**[Update:]** The optimize mode is out now. Next step is the livetrade module.  

## Any samples of how it might be?
Here is a sample of a running session of live trade plugin that the development team has running:

```
 LIVE TRADE              |
-------------------------+---------------------
 started/current balance |       15500/8428.85
 started at              |          6 days ago
 current time            | 2020-04-26T18:23:50
 errors/info             |                2/34
 active orders           |                   2
 open positions          |                   1
 debug mode              |                True


 exchange-symbol-timeframe   | timestamp                 |    open |   close |   high |     low
-----------------------------+---------------------------+---------+---------+--------+---------
 Binance Futures-BTCUSDT-6h  | 2020-04-26T18:00:00+00:00 | 7580.01 | 7612.01 |   7617 | 7566.96


 type   | strategy           | symbol   |                             opened at |   qty |   entry |   current price | PNL (%)
--------+--------------------+----------+---------------------------------------+-------+---------+-----------------+-----------
 long   | Trend02            | BTCUSDT  | 1.0 day, 14.0 hours, 52.0 minutes ago |  0.94 |    7521 |         7612 | 85.55 (1.21%)


 symbol   | side   | type   |   qty |   price | flag       | status   | created_at
----------+--------+--------+-------+---------+------------+----------+---------------------
 BTCUSDT  | sell   | STOP   | -0.94 |    7269 | ReduceOnly | ACTIVE   | 2020-04-25T06:00:00
 BTCUSDT  | sell   | STOP   | -0.94 |    7192 | ReduceOnly | ACTIVE   | 2020-04-25T03:31:44
 BTCUSDT  | sell   | LIMIT  | -0.94 |    9165 | ReduceOnly | CANCELED | 2020-04-25T03:31:43
 BTCUSDT  | buy    | STOP   |  0.94 |    7521 |            | EXECUTED | 2020-04-25T00:00:02
 ```

The released version plugin will probably have a different user interface. 


## Should I wait until then and do nothing?!
Rest assured, you won't have to change your backtest strategies to work with the live-trade mode. It will work as is. 

Hence, in the meantime, work on developing profitable strategies using the current backtest mode. Because that's really what you need to be concerned about. 