# Вход и выход из сделок

Решение войти в сделку это нечно иное как `True` или `False`.

Джесси использует `should_long()` и `should_short()` методы которые всегда возвращают булево.

Приняв решение о входе в сделку, вам нужно придумать точные цены входа и цены выхода. Джесси использует для этого методы `go_long()` и `go_short()`.

## should_long()

**Return Type**: bool

Предполагая, что позиция в настоящее время закрыта, открывает длинную позицию.

Пример:

```py
def should_long(self):
    # return true if current candle is a bullish candle
    if self.close > self.open:
        return True

    return False
```

## should_short()

**Return Type**: bool

Предполагая, что позиция в настоящее время закрыта, открывает короткую позицию.

```py
def should_short(self):
    # return true if current candle is a bearish candle
    if self.close < self.open:
        return True

    return False
```

::: warning
Очевидно, что вы не можете одновременно открывать и короткую, и длинную позицию. Следовательно, `should_long()` и `should_short()` не могут одновременно возвращать True.
:::

::: warning
`should_long()` and `should_short()` только для входа в сделку. Это означает, что они будут запрашиваться на каждой новой свече, только если ни одна позиция не открыта, и ни один ордер не активен.

Если вы хотите динамически закрывать сделки то, [update_position()](/docs/strategies/entering-and-exiting.html#update-position) что вы ищите. 
:::

## go_long()

Внутри `go_long()` метода вы ставите entry_price (цену покупки, точку входа), quantity (количество, сколько вы покупаете), the stop-loss и take-profit (стоп-лос и тейк-профит, точки выхода) объемом и ценой. Базовый синтаксис:

```py
def go_long(self):
    self.buy = qty, entry_price
    self.stop_loss = qty, stop_loss_price
    self.take_profit = qty, take_profit_price
```

`qty`, `entry_price`, `stop_loss_price`, и `take_profit_price` это заполнители, могут быть какими вы пожелаете; но `self.buy`, `self.stop_loss`, и `self.take_profit` специальные переменные которые использует Джесси; они должены быть одинаковы.

Рабочий пример будет такой:

```py
def go_long(self):
    qty = 1

    self.buy = qty, self.price
    self.stop_loss = qty, self.low - 10
    self.take_profit = qty, self.high + 10
```

::: tip Умная система выставления ордеров
Обратите внимание, что нам не нужно было определять, какой тип заказа использовать. Джесси достаточно умен, чтобы самостоятельно определять тип ордера.

Например, если это длинная позиция, вот как рассуждает Джесси:

-   MARKET order: if `entry_price == current_price`
-   LIMIT order: if `entry_price < current_price`
-   STOP order: if `entry_price > current_price`

:::

## go_short()

Так же [go_long()](#go-long) и использует `self.sell` для входа в рынок в место `self.buy`:

```py
def go_short(self):
    self.sell = qty, entry_price
    self.stop_loss = qty, stop_loss_price
    self.take_profit = qty, take_profit_price
```

Рабочий пример будет такой:

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

Этот метод спрашивает вас: если ордер на открытую позицию уже отправлен, но _еще не выполнен_, следует ли его отменить?

::: tip

После подачи ордеров на открытие новых позиций вы либо сразу войдете в позицию с помощью рыночного ордера, либо вам придется подождать, пока ваш лимитный / стоп-ордер будет исполнен. Этот метод используется для второго сценария.

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

The next section introduces the concept of [events](./events.html) to fulfill this need.

## prepare()
As explained in the [flowchart](./), this is the first method that gets called when a new candle is received. It is used for updating `self.vars` (custom variables) or any other action you might have in mind that needs to be done before your strategy gets executed. 

**See also**: [vars](./api.html#vars)


## update_position() 
Assuming there's an open position, this method is used to update exit points or to add to the size of the position if needed.

:::tip 
If your strategy exits dynamically (for example if at the time of entering the trade you don't know the take-profit price) then you definitely need to use `update_position`.
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
The `__init__` is not a new concept. It's the constructor of a Python class. Jesse strategies are Python classes, hence you may use the `__init__` method for actions that need to be performed in the beginning of a strategy and only for once. 

You could say `__init__` is the opposite of the [terminate()](./entering-and-exiting.html#terminate) method in a Jesse strategy. 

::: warning
Remember to begin `__init__` method's content with a `super().__init__()` call, otherwise you will get an error.
:::

```py
def __init__(self):
    super().__init__()

    print('initiated the strategy class')
```


## terminate() 
There are cases where you need to tell Jesse to perform a task right before terminating (like finishing the backtest simulation). Examples of a such a task would be to log a value, or save a machine learning model. 

You could say `terminate` is the opposite of the [\_\_init\_\_](./entering-and-exiting.html#init) method in a Jesse strategy.

```py
def terminate(self):
    print('backtest is done')
```