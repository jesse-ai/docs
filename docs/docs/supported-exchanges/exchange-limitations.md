# Exchange Limitations

When it comes to live trading, sometimes we are limited by how an exchange's API works. 

This page lists the limitations of each exchange that are known so far:

## DYDX

If you're going to trade on DYDX using Jesse, there are a few limitations you should know about:

- Isolated margin can be achieved by creating separate accounts (sub-accounts) under the same user.
- Accounts may only have up to 20 open orders for a given market/side pair at any one time. (For example up to 20 open BTC-USD bids).
- The liquidation price that is shown on Jesse is slightly different than the one shown on DYDX's website. This is because DYDX's API doesn't provide the exact liquidation price and Jesse calculates it based on the available data. The difference is usually less than 3%. This is an [open issue](https://github.com/dydxprotocol/dydx-v3-python/issues/199). 

## Bitget

If you're going to trade on Bitget using Jesse, there are a few limitations you should know about:

- Manually submitted orders are not supported with Bitget. Currently, most manually submitted orders are supported with other exchanges that Jesse supports (like Binance and Bybit) but through limitations in Bitget's API, it's not possible to distinguish between manually submitted orders and orders submitted by Jesse. So if you submit an order manually, Jesse will not be able to track it properly. Hence, it's not supported at all for now to prevent any issues.
- Hedge mode is not supported by Jesse at the moment (that means even though you can technically open two opposite positions on Bitget, Jesse will not allow you to do that). 
- Bitget's Spot market is not supported by Jesse at the moment due to limitations in Bitget's API. This will be added in the future when they add the required endpoints to their API.
- Bitget's API has the limitation of not allowing to submit reduce-only orders more than the size of the open positions. This behavior makes it similar to how the spot trading works. To overcome this limitation, Jesse handles the submission of exit orders using its concept of **queued orders**. You can read more about them in the [help center](https://jesse.trade/help/faq/what-does-queued-status-mean-for-orders).