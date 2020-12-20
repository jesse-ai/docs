# Могу ли я торговать несколькими парами одновременно?

Yes! Jesse has been built to support trading multiple pairs at once. All you need to do is to simply define multiple trading routes in your `routes.py` file. Read the documentation page about [routes](/docs/routes.html#trading-multiple-routes) for details and examples.

Additionally, you can use the data of any other symbol (even multiple) while trading a certain symbol. For example, you can trade `ETHUSD` but also have access to price data of `BTCUSD`. Read the documentation page for [extra candles](/docs/routes.html#using-multiple-time-frames) if you're interested in that. 