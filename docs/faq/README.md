# Frequently asked questions 

In this section, you can find the answer to questions that have been asked the most by users of Jesse.

If you don't find what you're looking for, just ask it on the forum. We have a warm community of algo-traders at [forum.jesse.trade](https://forum.jesse.trade).

## Can I trade multiple pairs at once? 

Yes! Jesse has been built to support trading multiple pairs at once. All you need to do is simply define multiple trading routes in your `routes.py` file. Read the documentation page about [routes](/docs/routes.html#trading-multiple-routes) for details and examples.

Additionally, you can use the data of any other symbol (even multiple) while trading a certain symbol. For example, you can trade `ETH-USD` but also have access to price data of `BTC-USD`. Read the documentation page for [extra candles](/docs/routes.html#using-multiple-time-frames) if you're interested in that. 

## Can I scan the market and select pairs dynamically?

Yes and no. Currently, Jesse doesn't support scanning the whole market to filter pairs by certain indicators. It's possible though to have multiple routes and turning each strategy/route on or off depending on certain conditions. 

## Can I create/backtest a rebalancing strategy?

No. Currently, Jesse doesn't support rebalancing strategies.

## Is my exchange supported?

### backtesting / importing candles
For backtesting / importing candles Jesse currently supports the exchanges listed [here](https://docs.jesse.trade/docs/import-candles.html#supported-exchanges). As the candle data are available without authentication you can use them, even if you don't have an account for them. 

### live mode
The live mode will try to support as many exchanges as possible in long term but will prioritize by popularity. At the moment below exchanges are supported:

- Binance Futures
- Testnet Binance Futures

## Can I access tick/trade data?
No. Currently, the finest data Jesse offers are 1m candles. 

## Jesse's indicator doesn't match TradingViews values.

There are multiple explanations for this. 
- Different exchanges might have different ohlcv values. Especially volume differs. Are you comparing the same exchange? Consider Spot != Futures. 
- You compare different timeframes?
- (Custom) Implementations of indicators on TradingView might use different source types or formulas. Compare the formula and parameters used. ([Jesse's indicator Source Code](https://github.com/jesse-ai/jesse/tree/master/jesse/indicators), [Talib's Source Code](https://sourceforge.net/projects/ta-lib/), [Tulipindicators Source Code](https://github.com/TulipCharts/tulipindicators/tree/master/indicators) 
- It's an indicator with memory. In this case, consider adjusting the `warmup_candles_num` in config.py. Also, see the explanation about slicing the candles [here](https://docs.jesse.trade/docs/indicators/custom-indicators.html#slicing-the-candles).


## What would happen to the open positions if a live session is terminated?
At the moment Jesse only understands orders that it submitted by itself, and positions that it caused them to open. Hence, it tries to clean the state on both session start and termination time. So all your open positions get closed, and open orders get canceled. 

## If I terminate and start again a live session, would the restarted live session know the previous open positions?

No, it'll close them and start again. However, session consistency is a feature under development as it was added to our [Trello page](https://trello.com/b/F9Eb0wW5/live-trade-plugin). 

## My strategy isn't working/trading like it should. What can I do?

Are you certain you set the right [Routes](/docs/routes) and have the right version of your strategy uploaded? It's important to be structured here: Be sure to use clear naming and versioning of your strategies. If you are sure Jesse is really running the strategy (version) you intended, let's check more things you can do:
 - Use the `--debug` command in backtesting to have Jesse print the things that happen behind the scenes.
 - Check the conditions for validity. Especially custom code / indicators. To do that a good way is adding pythons `print()` command in your strategies functions. For example `print("Buy condition checked")`. That way you can validate if all the functions are called like intended and aren't mixed up.
 - This snippet can be usefull for extensive debugging: It will give you the time of the current candle. Change the other variable according to your strategy. That way you are able to check precisely the values of your functions and indicators candlewise. Then open your favorite charting tool (same timeframe, same indicators) and do a comparison. That way you should be able to spot mistakes in conditions/calculations.

```python
from datetime import datetime
time = datetime.fromtimestamp(self.current_candle[0] / 1000)
print(f'Time: {time} | My Buy conditions: {self.condition1} {self.condition2}')
```

## Jesses backtest results differ from backtesting with another tool. What's the reason?

- Is the strategy tested exactly the same in both tools? Consider everything: indicators (same parameter, source type and formulas), stoplosses, takeprofit and commission fees. 
- The formulas for metrics calculation might differ: Some backtest tools use stock market settings for the metrics (255 vs 365 trading days) leading to different metric values, to name one example. 
- Additionally, some backtest tools can have the so-called lookahead/repainting issue. This means they access future candle data leading to (too) good results. One example would be renko candles.

## How can I access the "live" price?

The smallest timeframe available in Jesse is 1 minute. There are multiple reasons for that.
- Finer historical price data aren't (easily) available. Historical (free) APIs for crypto prices normally offer 1m as the smallest timeframe.
- The database size would grow a lot using finer data. (That's the reasons those finer data are often premium)
- The only reason to have finer data would be high-frequency trading (hft) or orderbook strategies which Jesse currently isn't suited for.

So is there a live price? Not really, it's always an aggregate price for the reasons above.

"But I need to open/close a position immediately!" - See "Why can I open a position only after candles close and not immediately?"


## Why can I open a position only after candles close and not immediately?

Before you continue reading take a look at the [flowchart of Jesse](https://docs.jesse.trade/docs/strategies/) and the explanation about the "live" price.
Question already answered? No? No problem. Let's dive into it.

Jesse starts its workflow after a fully formed candle like seen in the flow chart. In that sense you can't do something "immediately". There is only the most recent candle. The whole candle concept in trading and the whole concept of trading strategies are based on aggregated prices in form of timeframes (1m, 5m, 15m...) and therefore the term "live" is misleading.

"But I really need the live price to open/close a position immediately!" If you understood the above and are certain of what you are doing then let's take a look at how close we can get to immediately. Let's say for a reason you want to use indicators on a 1h timeframe to decide whether to enter a position, but your exit should react live (we learned this just means using a smaller timeframe / or the smallest possible), you could use 1m candles for the exit.
Think about the flowchart. Jesse starts after a new candle formed. If you now set the routes timeframe to 1h you can't do anything until the next 1h is formed. So instead you would have to select the 1m timeframe in the routes and you can use get_candles() to get the 1h candles. As alternative you can use `self.index` to find the moment, where your 1h formed.  The open of the first 1m candle is the same open as the bigger 1h candle and the close of the last 1m candles within this 1h is the same as the 1h close. An hour has 60 minutes so with pythons modulo operator %, which returns the remainder of a division, you could do this to know whenever a 1h candle has formed: `self.index % 60 == 0`. 

## I changed the config.py, but the live instance didn't change. 
Jesse currently doesn't watch for config changes. You have to restart the instance for changes to have effect.