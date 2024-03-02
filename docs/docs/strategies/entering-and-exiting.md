# Entering and exiting trades

::: tip 🎥 Video Tutorial
In case you prefer watching a video, here's a [short screencast explaining "How to enter and exit trades"](https://youtu.be/BwZ6GYbUYkc).
:::

Deciding to enter a trade is nothing but a True or False decision. For this, Jesse uses the `should_long()` and `should_short()` methods, which must return a boolean at all times.

After making up your mind about entering a trade, you need to come up with exact entry prices and exit prices. Jesse uses the `go_long()` and `go_short()` methods for that.

## should_long()

**Return Type**: bool

Assuming the position is currently closed, returns whether to open a long position.

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

Assuming the position is currently closed, returns whether to open a short position.

```py
def should_short(self):
    # return true if current candle is a bearish candle
    if self.close < self.open:
        return True

    return False
```

::: warning
Obviously, you cannot enter both a short and long position at the same time. Hence, `should_long()` and `should_short()` cannot return True at the same.
:::

::: warning
`should_long()` and `should_short()` are for entering trades only. This means that they would get called on every new candle only if no position is open, and no order is active. 

If you're looking to close trades dynamically, [update_position()](/docs/strategies/entering-and-exiting.html#update-position) is what you're looking for. 
:::

## go_long()

Inside the `go_long()` method you set your buy price (entry point), quantity (how much to buy), the stop-loss and take-profit (exit points) quantity, and prices. The basic syntax is:

```py
def go_long(self):
    self.buy = qty, entry_price
    self.stop_loss = qty, stop_loss_price
    self.take_profit = qty, take_profit_price
```

`qty`, `entry_price`, `stop_loss_price`, and `take_profit_price` are placeholders, and can be anything you want; but `self.buy`, `self.stop_loss`, and `self.take_profit` are special variables that Jesse uses; they must be the set.

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

For example, if it is for a long position, here's how Jesse decides:

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

A working example would be:

```py
def go_short(self):
    qty = 1

    # opens position with a MARKET order
    self.sell = qty, self.price
    self.stop_loss = qty, self.high + 10
    self.take_profit = qty, self.low - 10
```

<!-- ## Margin trading

`should_short()` and `go_short()` are used for short selling, which is only possible in the "futures" trading mode (which means it's not supported in spot trading mode). 

You can either remove it or turn it off shorting by simply returning `False`:

```py
def should_short(self):
    return False

def go_short(self):
    pass
``` -->

## should_cancel_entry()

**Return Type**: bool

What this method is asking you is: Assuming an open position order has already been submitted but **not executed yet**, should it be canceled?

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
```

Since the entry price is above the current price, Jesse will submit a stop order for entering this trade. If the price indeed rises we'll be fine, but what if a new candle is passed, and the price goes down? Then we would want the previous order to be canceled and a new order submitted based on the high price of the new candle.

To do this, we'll have to define the `should_cancel_entry()` as:

```py
def should_cancel_entry(self):
    return True
```

In your strategy, you may need to do some checking before deciding whether or not the previous open-position order is still valid or has to be canceled.

::: tip
`should_cancel_entry()` only decides whether or not to cancel the entry order. It does not affect your exit (take-profit and stop-loss) orders.
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

The next section introduces the concept of [events](./events.html) to fulfill this need.

## before()
As explained in the [flowchart](./), this is the first method that gets called when a new candle is received. It is used for updating `self.vars` (custom variables) or any other action you might have in mind that needs to be done before your strategy gets executed. 

**See also**: [vars](./api.html#vars), [after](./api.html#after)

## after()
As explained in the [flowchart](./), this is the last method that gets called when a new candle is received and the strategy is getting executed. It is used for updating `self.vars` (custom variables) or any other action you might have in mind that needs to be done after your strategy gets executed. 

**See also**: [vars](./api.html#vars), [before](./api.html#before)


## update_position() 
Assuming there's an open position, this method is used to update exit points or to add to the size of the position if needed.

:::tip 
If your strategy exits dynamically (for example if at the time of entering the trade you don't know the take-profit price) then you definitely need to use `update_position()`.
:::

**Example #1:** Exiting the trade by implementing a trailing stop for take-profit: 
```py 
def update_position(self):
    qty = self.position.qty 

    # set stop-loss price $10 away from the high/low of the current candle
    if self.is_long:
        self.take_profit = qty, self.high - 10
    else:
        self.take_profit = qty, self.low + 10
```

**Example #2:** Liquidating the open position at a certain condition. In this case, we [liquidate](/docs/strategies/api.html#liquidate) if we're in a long trade and the RSI reaches 100: 
```py 
def update_position(self):
    if self.is_long and ta.rsi(self.candles) == 100:
        self.liquidate()
```

**Example #3:** Double the size of my long position if the RSI shows oversold and I'm sitting at more than 5% profit:
```py 
def update_position(self):
    if self.is_long:
        if self.position.pnl_percentage > 5 and ta.rsi(self.candles) < 30:
            # double the size of the already open position at current price (with a MARKET order)
            self.buy = self.position.qty, self.price
```

## \_\_init\_\_()
The `__init__` is not a new concept. It's the constructor of a Python class. Jesse strategies are Python classes, hence you may use the `__init__` method for actions that need to be performed at the beginning of a strategy and only once. 

You could say `__init__` is the opposite of the [terminate()](./entering-and-exiting.html#terminate) method in a Jesse strategy. 

::: danger
Remember to start your `__init__` method code with a `super().__init__()` call, otherwise you will get an error.
:::

```py
def __init__(self):
    super().__init__()

    print('initiated the strategy class')
```

## before_terminate() 

The last function called right before [terminate()](#terminate). The difference between `before_terminate()` and `terminate()` is that in `before_terminate()` you are able to submit orders, in other words, make modifications to your position. For example, maybe before terminating a live session, you want to cut your position's size in half; or close it. 

But in [terminate()](#terminate) you can't submit orders. You can use it for logging info, saving data to a file, etc. 


## terminate() 

There are cases where you need to tell Jesse to perform a task right before terminating. Examples of such a task would be to log a value or save a machine learning model. 

You could say `terminate` is the opposite of the [\_\_init\_\_](./entering-and-exiting.html#init) method in a Jesse strategy.

```py
def terminate(self):
    self.log('About to terminate execution...')
```
