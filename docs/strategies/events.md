# Events

Jesse raises certain events that you can hook into if it makes sense in your strategy. Notice that they all start with `on_`.

## on_cancel
This function is called after all active orders have been cancelled. An example usage would be if you are using a custom value that needs to be cleared after each completed trade. 

## on\_open\_position
This function is called right after an open-position order is executed. You may use `self.position` to access the current position's object. 

**see also**: [position](strategies/api.html#position)

## on\_take\_profit
The position has been closed with the execution of the take-profit order. 

::: tip 
You do not need to worry about cancelling other active orders in `on_take_profit`. Jesse takes care of it. 
:::

## on\_stop\_loss
The position has been closed with the execution of the stop-loss order. 

::: tip 
You do not need to worry about cancelling other active orders in `on_stop_loss`. Jesse takes care of it. 
:::

## on\_reduced\_position
The position has been reduced (but not closed) with the execution of either a stop-loss or a take-profit order. 

An example usage of this would be to move the stop-loss to break even after part of the position has been exited: 

```py 
def go_long(self):
    self.buy = 2, 100
    # take-profit in two points
    self.take_profit = [
        (1, 120), 
        (1, 140)
    ]
    self.stop_loss = 2, 80

def on_reduced_position(self):
    self.stop_loss = 1, 100
```

## on\_increased\_position
The size of the position has been increased with the execution of order. 

This event is only fired if your strategy is entering positions in more than one point. For Example: 
```py
def go_long(self):
    self.buy = 2, 100
    self.take_profit = [
        # after this order is executed, on_increased_position() gets called
        (1, 120), 
        # after this order is executed, on_take_profit() gets called
        (1, 140)
    ]
    self.stop_loss = 2, 80
```

Or if you're updating the `self.buy`/`self.sell` inside the `update_position` function to increase the size of the position after it is already open.
