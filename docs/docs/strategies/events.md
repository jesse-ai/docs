# Events

## on\_open\_position(self, order)

This function is called right after an open-position order is executed. You may use `self.position` to access the current position's object. 

**see also**: [position](api.html#position)

## on\_close\_position(self, order)

The position has been closed with the execution of either a stop-loss or a take-profit order. 

To see if the position was closed because of a take-profit or a stop-loss, you can use the `order.is_take_profit` or `order.is_stop_loss` properties:

```py
def on_close_position(self, order):
    if order.is_take_profit:
        self.log("Take-profit closed the position")
    elif order.is_stop_loss:
        self.log("Stop-loss closed the position")
```

::: tip 
You do not need to worry about canceling the remaining active orders. Jesse takes care of it for you.
:::

## on\_increased\_position(self, order)

The size of the position has been increased with the execution of an order. 

This event is fired if your strategy is entering positions in more than one point. For Example: 

```py
def go_long(self):
    self.buy = [
        (1, 100), 
        (1, 90), 
    ]
```

Or if you're updating the `self.buy`/`self.sell` inside the `update_position` method to increase the size of the position after it is already open.

```py
def update_position(self):
    # increase position size if the long
    # position is in more than 2% profit
    if self.is_long and self.position.pnl_percentage > 2:
        self.buy = self.position.qty, self.price
```

## on\_reduced\_position(self, order)
The position has been reduced (but not closed) with the execution of either a stop-loss or a take-profit order. 

Example usage of this would be to move the stop-loss to break even after part of the position has been exited: 

```py 
def go_long(self):
    self.buy = 2, 100
    # take-profit in two points
    self.take_profit = [
        (1, 120), 
        (1, 140)
    ]

def on_reduced_position(self, order):
    self.stop_loss = 1, 100
```

## on_cancel(self)

This function is called after all active orders have been canceled. An example of usage would be if you are using a custom value that needs to be cleared after each completed trade. 

## Events for communicating among strategies

In case you're trading using multiple routes/strategies and need to communicate among them, you can use the following methods to hook into the events of other strategies.

As a reminder, to share data among strategies, you need to use the [self.shared_vars](https://docs.jesse.trade/docs/strategies/api.html#shared-vars) dictionary property.

## on\_route\_open\_position(self, strategy)

This event method is fired right after a position is **opened**. Useful if you want to know when a position is opened in **another strategy**.

```py
def on_route_open_position(self, strategy):
    # example usage: trading BTC-USDT in the current route 
    # strategy and wanting to close it as soon as a position 
    # is opened in the ETH-USDT route:
    if self.is_open and strategy.symbol == 'ETH-USDT':
        self.liquidate()
```

## on\_route\_close\_position(self, strategy)

This event method is fired right after a position is **closed**. Useful if you want to know when a position is closed in **another strategy**.

**see also**: [on\_route\_open\_position](api.html#on-route-open-position-strategy)

## on\_route\_increased\_position(self, strategy)

This event method is fired right after a position is **increased** in size. Useful if you want to know when a position is increased in **another strategy**.

**see also**: [on\_route\_open\_position](api.html#on-route-open-position-strategy)

## on\_route\_reduced\_position(self, strategy)

This event method is fired right after a position is **reduced** in size. Useful if you want to know when a position is reduced in **another strategy**.

**see also**: [on\_route\_open\_position](api.html#on-route-open-position-strategy)

## on\_route\_canceled(self, strategy)

This event method is fired right after all active entry orders are **canceled**. Useful if you want to know when all active orders are canceled in **another strategy**.

**see also**: [on\_route\_open\_position](api.html#on-route-open-position-strategy)
