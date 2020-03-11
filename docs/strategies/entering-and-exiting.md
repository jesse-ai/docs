# Entering and exiting trades

Deciding to enter a trade is nothing but a True of False decision.

Jesse uses `should_long()` and `should_short()` methods which must return a boolean at all times.

After making your mind about entering a trade, you need to come up with exact entry prices, and exit prices. Jesse uses `go_long()` and `go_short()` methods for that.

## should_long()

**Return Type**: bool

Assuming the position is currently close, should it open a long position.

Example:

```py
def should_long(self):
    # return true if current candle is a bullish candle
    if self.close > self.open:
        return True

    return False
```

## should_short()

**Return Type**: bool

Assuming the position is currently close, should it open a short position.

```py
def should_short(self):
    # return true if current candle is a bearish candle
    if self.close < self.open:
        return True

    return False
```

::: warning
Obviously you cannot enter both a short and long position at the same time. Hence, `should_long()` and `should_short()` cannot return True at the same.
:::

## go_long()

Inside `go_long()` method you set your buy price (entry point), quantity (how much to buy), the stop-loss and take-profit (exit points) quantity and prices. The basic syntax is:

```py
def go_long(self):
    self.buy = qty, entry_price
    self.stop_loss = qty, stop_loss_price
    self.take_profit = qty, take_profit_price
```

`qty`, `entry_price`, `stop_loss_price`, and `take_profit_price` are placeholders, can be anything you want; but `self.buy`, `self.stop_loss`, and `self.take_profit` are special variables that Jesse uses; they must be the same.

A working example would be:

```py
def go_long(self):
    qty = 1

    self.buy = qty, self.price
    self.stop_loss = qty, self.low - 10
    self.take_profit = qty, self.high + 10
```

::: tip Smart ordering system
Notice that we did not have to define which order type to use. Jesse is smart enough to decide the type of the orders by itself.

For example if it is for a long position, here's how Jesse decides:

-   MARKET order: if `entry_price == current_price`
-   LIMIT order: if `entry_price < current_price`
-   STOP order: if `entry_price > current_price`

:::

## go_short()

Same as [go_long()](#go-long) but uses `self.sell` for entry instead of `self.buy`:

```py
def go_short(self):
    self.sell = qty, entry_price
    self.stop_loss = qty, stop_loss_price
    self.take_profit = qty, take_profit_price
```

A working Example would be:

```py
def go_short(self):
    qty = 1

    # opens position with a MARKET order
    self.sell = qty, self.price
    self.stop_loss = qty, self.high + 10
    self.take_profit = qty, self.low - 10
```

<!-- ## Margin trading

`should_short()` and `go_short()` are used for shorting, which only possible if the market you're trading supports margin trading. In case it doesn't, you can turn off shorting by:

```py
def should_short(self):
    return False

def go_short(self):
    pass
``` -->

## should_cancel()

**Return Type**: bool

What this method is asking you is: Assuming that open position order has already been submitted but _not executed yet_, should it cancel it?

::: tip
After submitting orders for opening new positions either you'll enter a position immediately with a market order, or have to wait until your limit/stop order gets filled. This method is used for the second scenario.
:::

A good example would be for a trade we're trying to open a position when the price continues the uptrend:

```py
def should_long(self):
    return True

def go_long(self):
    qty = 1
    entry = self.high + 2

    self.buy = qty, entry
    self.stop_loss = qty, entry - 10
    self.take_profit = qty, entry + 10
```

Since the entry price is above the current price, Jesse will submit a stop order for entering this trade. If the price indeed rises we'll be fine, but what if a new candle is passed, and the price goes down? Then we would want the previous order to be canceled and a new order submitted based on the high price of the new candle.

To do this, we'll have to specify the `should_cancel()`:

```py
def should_cancel(self):
    return True
```

In your strategy, you may need to do some checking before deciding whether or not the previous open-position order is still valid or has to be canceled.

::: tip
`should_cancel()` only decides whether or not to cancel the entry order. It does not affect your exit (take-profit and stop-loss) orders.
:::

## Entering and/or exiting at multiple points

So far we defined enter-once and exit-once strategy examples using only `go_long()` and `go_short()` methods. This may not be enough for your strategies. 

For entering/exiting at one point we defined **single tuples**. To enter/exit at multiple points all you need to do is to use a **list of tuples** instead.

Example of taking profit at two points:

```py
def go_long():
    qty = 1

    self.buy = qty, 100
    self.stop_loss = qty, 80

    # take-profit at two points
    self.take_profit = [
        (qty/2, 120),
        (qty/2, 140)
    ]
```

We could do the same for `self.stop_loss` if it makes sense in your strategy.

Example of entering the trade at two points:

```py
def go_long():
    qty = 1

    # open position at $120 and increase it at $140
    self.buy = [
        (qty/2, 120),
        (qty/2, 140)
    ]
    self.stop_loss = qty, 100
    self.take_profit = qty, 160
```

What if we're not aware of our exact exit point at the time of entering the trade? For instance, it is a common case in trend-following strategies to exit when the trend has stopped. 

The next section introduces the concept of [events](./events) to fulfill this need.

## prepare()
As explained in the [flowchart](./), this is the first function that gets called when a new candle is received. It is used for updating `self.vars` (custom variables) or any other action you might have in mind that needs to be done before your strategy gets executed. 

**See also**: [vars](./api.html#vars)


## update_position() 
Assuming that there's an open position, this method is used to update exit points or to add to the size of the position if needed.

Example of exiting the trade by implementing a trailing stop for take-profit: 
```py 
def update_position(self):
    qty = self.position.qty 

    # set stop-loss price $10 away from the high/low of the current candle
    if is_long:
        self.take_profit = qty, self.high - 10
    else:
        self.take_profit = qty, self.low + 10
```
