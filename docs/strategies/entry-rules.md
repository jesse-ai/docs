# Entry rules

Deciding to enter a trade is nothing but a True of False decision.

Jesse uses `should_long()` and `should_short()` methods which must return a boolean at all times.

After making your mind about entering a trade, you need to come up with exact entry prices, and exit prices. Jesse uses `long()` and `short()` methods for that.

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

## long()

Inside `long()` method you set your buy price (entry point), quantity (how much to buy), the stop-loss and take-profit (exit points) quantity and prices. The basic syntax is:

```py
def long(self):
    self.buy = qty, entry_price
    self.stop_loss = qty, stop_loss_price
    self.take_profit = qty, take_profit_price
```

`qty`, `entry_price`, `stop_loss_price`, and `take_profit_price` are placeholders, can be anything you want; but `self.buy`, `self.stop_loss`, and `self.take_profit` are special variables that Jesse uses; must be the same.

A working Example would be:

```py
def long(self):
    qty = 1

    self.buy = qty, self.price
    self.stop_loss = qty, self.low - 10
    self.take_profit = qty, self.high + 10
```

## short()

Same as [long()](#long) but uses `self.sell` for entry instead of `self.buy`:

```py
def short(self):
    self.sell = qty, entry_price
    self.stop_loss = qty, stop_loss_price
    self.take_profit = qty, take_profit_price
```

A working Example would be:

```py
def short(self):
    qty = 1

    self.sell = qty, self.price
    self.stop_loss = qty, self.high + 10
    self.take_profit = qty, self.low - 10
```

<!-- ## Margin trading

`should_short()` and `short()` are used for shorting, which only possible if the market you're trading supports margin trading. In case it doesn't, you can turn off shorting by:

```py
def should_short(self):
    return False

def short(self):
    pass
``` -->

## should_cancel()

TODO...

## Advanced methods

TODO...

before_execute(self)
update_position(self)
