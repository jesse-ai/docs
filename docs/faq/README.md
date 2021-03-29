# Frequently asked questions 

In this section you can find the answer to questions that have been asked the most by users of Jesse.

If you don't find what you're looking for, just ask it on the forum. We have a warm community of algo-traders at [forum.jesse.trade](https://forum.jesse.trade).

## Can I trade multiple pairs at once? 

Yes! Jesse has been built to support trading multiple pairs at once. All you need to do is to simply define multiple trading routes in your `routes.py` file. Read the documentation page about [routes](/docs/routes.html#trading-multiple-routes) for details and examples.

Additionally, you can use the data of any other symbol (even multiple) while trading a certain symbol. For example, you can trade `ETH-USD` but also have access to price data of `BTC-USD`. Read the documentation page for [extra candles](/docs/routes.html#using-multiple-time-frames) if you're interested in that. 

## Can I scan the market and select pairs dynamically?

Yes and no. Currently Jesse doesn't support scanning the whole market to filter pairs by certain indicators. It's possible though to have multiple routes and turning each strategy / route on or off depending on certain conditions. 

## Can I create / backtest a rebalancing strategy?

No. Currently Jesse doesn't support rebalancing strategies.

## Is my exchange supported?

### backtesting / importing candles
For backtesting / importing candles Jesse currently supports the exchanges listed [here](https://docs.jesse.trade/docs/import-candles.html#supported-exchanges). As the candle data are available without authentication you can use them, even if you don't have a account for them. 

### live mode
The live mode will try to support as much exchanges as possible in long term but will prioritize by popularity.

## Can I access tick / trade data?
No. Currently the finest data Jesse offers are 1m candles. 

## Jesse's indicator doesn't match TradingViews values.
There are multiple explainations for this. 
- Different exchanges might have different ohlcv values. Especially volume differs. Are you comparing the same exchange? Consider Spot != Futures. 
- You compare different timeframes?
- (Custom) Implementations of indicators on TradingView might use different source types or formulas. Compare the formula and parameters used. ([Jesse's indicator Source Code](https://github.com/jesse-ai/jesse/tree/master/jesse/indicators), [Talib's Source Code](https://sourceforge.net/projects/ta-lib/), [Tulipindicators Source Code](https://github.com/TulipCharts/tulipindicators/tree/master/indicators) 
- It's a indicator with memory. In this case consider adjusting the `warmup_candles_num` in config.py. Also see the explaination about slicing the candles [here](https://docs.jesse.trade/docs/indicators/custom-indicators.html#slicing-the-candles).
