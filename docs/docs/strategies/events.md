# Events

<!-- ## on\_route\_open\_position -->

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

## on\_open\_position(self, order)
This function is called right after an open-position order is executed. You may use `self.position` to access the current position's object. 

**see also**: [position](api.html#position)

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

## on\_close\_position(self, order)

The position has been closed with the execution of either a stop-loss or a take-profit order. 

::: tip 
You do not need to worry about canceling the remaining active orders. Jesse takes care of it for you.
:::

## on_cancel(self)
This function is called after all active orders have been canceled. An example of usage would be if you are using a custom value that needs to be cleared after each completed trade. 
