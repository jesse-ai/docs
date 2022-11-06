# Exchange Limitations

When it comes to live trading, sometimes we are limited by how an exchange's API works. 

This page lists the limitations of each exchange that are known so far:

## FTX

Unfortunately, FTX doesn't offer Websocket streams for stop orders. 

As a result, if you are running a live session with Jesse, and then submit/cancel a stop order manually on the exchange, Jesse won't pick up on that because FTX isn't streaming it at all 😕. (stop orders are supported when Jesse submits the order itself by itself because then their REST API is used).

## Bitget

If you're going to trade on Bitget using Jesse, there are a few limitations you should know about:

- Manually submitted orders are not supported with Bitget. Currently, most manually submitted orders are supported with other exchanges that Jesse supports (like Binance and Bybit) but through limitations in Bitget's API, it's not possible to distinguish between manually submitted orders and orders submitted by Jesse. So if you submit an order manually, Jesse will not be able to track it properly. Hence, it's not supported at all for now to prevent any issues.
- Hedge mode is not supported by Jesse at the moment (that means even though you can technically open two opposite positions on Bitget, Jesse will not allow you to do that). 
- Bitget's Spot market is not supported by Jesse at the moment due to limitations in Bitget's API. This will be added in the future when they add the required endpoints to their API.
- Bitget's API has the limitation of not allowing to submit reduce-only orders more than the size of the open positions. This behavior makes it similar to how the spot trading works. To overcome this limitation, Jesse handles the submission of exit orders using its concept of **queued orders**. You can read more about them in the [help center](https://jesse.trade/help/faq/what-does-queued-status-mean-for-orders).