## Differences between "spot" and "futures" modes

At the moment Jesse supports trading of perpetual futures in both backtest, and live trading. The spot support however has just been added for backtesting just and will soon be supported in live trading. 

::: tip
On the settings page, you can select the trading mode for the exchange you're using. That means you can use candle data for your backtests from `Binance Spot` but run your backtests in the "futures" mode. 

This is useful as spot exchanges usually provide more data than futures exchanges.
:::

It's important to know the differences between spot and futures trading modes when writing your strategies. 

- Short selling is not supported in spot trading so strategies should either avoid `should_short()` or make sure it returns `False`. 
- In futures mode, you can set `self.take_profit` and `self.stop_loss` in the `go_long()`. This means before opening a position you can set your exit targets. In the spot mode, however, fees are deducted from the assets you're trading. So we can't be sure about our position size (`qty`) until it's actually open. Hence, we made the decision to not allow for setting exit targets in the `go_long()` method when in the spot mode. Instead, you can do it inside the [on_open_position()](/docs/strategies/events.html#on-open-position-self-order) method. Example:
```py
def on_open_position(self, order):
    self.stop_loss = self.position.qty, self.price - 10
    self.take_profit = self.position.qty, self.price + 10
```
- The [self.leverage](/docs/strategies/api.html#leverage) property always returns 1 in spot trading mode. In fact, if you backtest a strategy in futures mode with leverage of 1, and only open long positions, you should get very similar results as if you had backtested it in the spot mode.
- When Futures trading, your wallet balance (or `self.balance` in Jesse's API) only changes when a position is closed and the PNL is added or subtracted. It also does when fees are being charged. But in spot trading, it changes on order submission. In most cases this is not a problem; but nonetheless, if you're using the [self.balance](/docs/strategies/api.html#balance) property in your strategies in a creative way, you should be aware of this.
- [self.available_margin](/docs/strategies/api.html#available-margin) equals to [self.balance](/docs/strategies/api.html#balance) in the spot trading mode. 
