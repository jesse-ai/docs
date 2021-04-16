# Live Trade

The "live-trade" plugin is available for early access. You can read the announcement article or head over to our website, [register](https://jesse.trade/register) and get your license, and then head over to the installation page. 


<!-- ## When will it be released?
It will be released a few weeks (or months) after the release of the "optimize" mode. 

**[Update 1:]** The optimize mode is out now. Next step is the livetrade module.  
**[Update 2:]** It'll be available for the early-access by the end of the first week of April.  -->

## Screenshots?
Here is a sample of the early access version which has a CLI dashboard:

```
 LIVE TRADE              |
-------------------------+---------------------
 started at              |         3 hours ago
 current time            | 2021-04-12T13:58:39
 errors/info             |               1/205
 active orders           |                   1
 open positions          |                   1
 started/current balance |       968.91/968.67
 debug mode              |                True


 exchange-symbol-timeframe   | timestamp                 |    open |   close |   high |   low
-----------------------------+---------------------------+---------+---------+--------+-------
 Binance Futures-BTC-USDT-6h | 2021-04-12T12:00:00+00:00 | 60335.1 |   60450 |  60670 | 60234


 type   | strategy              | symbol   |   leverage |                         opened at |   qty |   entry |   current price | PNL (%)
--------+-----------------------+----------+------------+-----------------------------------+-------+---------+-----------------+------------------
 long   | TrendFollowing03 | BTC-USDT |          3 | 1 hour, 56 minutes, 9 seconds ago |  0.01 | 60458.5 |           60450 | -0.09 (-0.0424%)


 symbol   | side   | type   |   qty |   price | flag       | status   | created_at
----------+--------+--------+-------+---------+------------+----------+---------------------
 BTC-USDT | sell   | STOP   | -0.01 | 58223   | ReduceOnly | ACTIVE   | 2021-04-12T12:02:31
 BTC-USDT | sell   | LIMIT  | -0.01 | 72873   | ReduceOnly | QUEUED   | 2021-04-12T12:02:30
 BTC-USDT | buy    | STOP   |  0.01 | 60458.5 |            | EXECUTED | 2021-04-12T12:00:00
 ```

The released version plugin will have a GUI thorough a web URL. 


## Installation
The package is pre-built. You need to download the proper version for your OS and Python version from the [releases](https://jesse.trade/releases) page. 

After downloading it, open your terminal, go to the directory that the downloaded package is located at, and install it using `pip`:

```
# replace the {name of the downloaded file} with your downloaded package
pip install {name of the downloaded file}
```

Now you should be able to run live trade commands from within your Jesse project. But first, you need to login. This of course assumes you already have a valid license on the website. Run:
```

jesse login
```

This command asks you for your email and password that you used for registering at https://jesse.trade. Once you pass that, it'll create the `live-config.py` file which is specifically for your live trades and is located just within your Jesse project. Open it, and enter your values for notifications, exchange keys, etc. 

Now you can successfully run live sessions by running `jesse live`. You can also run trades with paper money by running `jesse paper`. 

If you need more detailed logs, run them with the `--debug` flag:
```
jesse live --debug
```