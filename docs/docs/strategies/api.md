
# API reference

## @cached

This decorator can improve performance a lot. It will cache your functions / properties to avoid unnecessary computational intensive repetitions. Especially indicator calculations that are called often are perfect candidates for this. The cache is cleared every new candle behind the scene.

**Example**:
```py
    from jesse.strategies import Strategy, cached

    @property
    @cached
    def donchian(self):
        return ta.donchian(self.candles)
```
::: warning
- If you use it with `@property` make sure the order is right like above. Otherwise you will get an error.
- Caching consumes a little time too. So to benefit from it the cached function/indicator should be slow and called multiple times in the strategy. Do tests whether it actually improves speed. Ignoring this warning and adding it to all functions most likely does more harm than good.
:::

## available_margin

`available_margin` represents the current margin available in your trading account. It is calculated as the balance minus the margin used for open positions and orders.

::: warning
`available_margin` is calculated by subtracting the margin used in open positions and orders from your account balance. For instance, if your balance is $10,000 and you have $2,000 tied up in trades with 2x leverage, the available margin would be $10,000 - ($2,000 / 2) = $9,000.
:::

**Return Type**: float

**See Also**: [leveraged_available_margin](#leveraged-available-margin), [balance](#balance)

---

## leveraged\_available\_margin

`leveraged_available_margin` is the same as `self.available_margin` except that it takes leverage into account in a way that is more intuitive for some traders.
It is basically `self.available_margin * self.leverage`.

::: warning
leveraged_available_margin takes the account balance, multiplies it by the leverage, and then subtracts the margin used for open positions and orders. For example, with a $10,000 balance and $2,000 used in trades at 2x leverage, it would be calculated as ($10,000 * 2) - $2,000 = $18,000. This provides a realistic view of the margin available for new trades.
:::

**Return Type**: float

**See Also**: [available_margin](#available-margin), [balance](#balance), [leverage](#leverage)

## average\_entry\_price

The average entry price estimated based on **active orders**(and not the open position). The word average indicates that in case you use multiple entry orders, this property returns the average value.

::: warning
`average_entry_price` **is not** necessarily the same as the `entry_price` of the open position. If you need open positions's average entry price, use `self.position.entry_price`.
:::

**Return Type**: float


**Example**:
```py{14}
def go_long(self):
    qty = 2

    # self.average_entry_price is equal to (100 + 120) / 2 == 110
    self.buy = [
        (1, 100),
        (1, 120)
    ]
    self.stop_loss = qty, 80
    self.take_profit = qty, 140

def filter_min_pnl(self):
    min_pnl = 1
    reward_per_qty = abs(self.average_take_profit - self.average_entry_price)
    return (reward_per_qty / self.average_entry_price) * 100 > min_pnl
```

::: warning
Note that `average_entry_price` is only available after `go_long()` or `go_short()` is executed. Hence, it is only supposed to be used in either filter functions or when the position is open.

In other words, you cannot use it inside `should_long()` and `should_short()`.
:::

**See Also**: [average_take_profit](#average-take-profit), [average_stop_loss](#average-stop-loss)

## average\_stop\_loss

Same as [average_entry_price](#average-entry-price) but for stop-loss. The word average indicates that in case you use more than one point for stop-loss, this property returns the average value.

**Return Type**: float

**See Also**: [average_entry_price](#average-entry-price), [average_take_profit](#average-take-profit)

## average\_take\_profit

Same as [average_entry_price](#average-entry-price) but for take-profit. The word average indicates that in case you use more than one point for take-profit, this property returns the average value.

**Return Type**: float

**See Also**: [average_entry_price](#average-entry-price), [average_stop_loss](#average-stop-loss)

## balance

Returns the current wallet in your exchange wallet. In the futures market, it behaves exactly as "wallet balance in USDT" does on [Binance Futures](http://jesse.trade/binance).

**Return Type**: float

**Aliases**: `capital`

**See Also**: [available_margin](#available-margin)


## portfolio_value

Returns the value (in the currency of your trading session. Usually it's `USDT` or `USD`) of your entire portfolio (all positions).

This is sometimes useful as `self.balance` is like the "wallet balance" on futures exchanges and only changes **after** the position is closed. But `portfolio_value` takes both open and closed positions into account.

**Return Type**: float

**See Also**: [available_margin](#available-margin)


## daily_balances

Returns a list of daily balances of your portfolio. It is as if you were storing your portfolio's value each day using the [self.portfolio_value](#portfolio-value) property. It is used for calculation of metrics such as Sharpe Ratio, etc.

**Return Type**: List[float]

**See Also**: [portfolio_value](#portfolio-value)


## close

Alias for [price](#price)

## current_candle

Returns the current candle in the form of a numpy array.

**Return Type**: np.ndarray

```
[
    timestamp,
    open,
    close,
    high,
    low,
    volume
]
```

**Example**:

```py
from pprint import pprint

pprint(self.current_candle)
# array([1.54638714e+12, 3.79409000e+03, 3.79714000e+03, 3.79800000e+03,
#        3.79400000e+03, 1.30908000e+02])

pprint(self.current_candle.dtype)
# dtype('float64')
```

You could get timestamp, open, close, high, low, and volume from candle array:

```py
timestamp = self.current_candle[0]
open_price = self.current_candle[1]
close_price = self.current_candle[2]
high_price = self.current_candle[3]
low_price = self.current_candle[4]
volume = self.current_candle[5]
```

::: tip
Just like in the API of crypto exchanges, and TradingView, each candle's timestamp is the beginning of that time period, not the ending but the actual time it began.

For example if you are trading the `5m` timeframe and the current time is at `12:05:00`, the current_candle's timestamp will show `12:00:00`.
:::

**See Also**: [price](#price), [close](#close), [open](#open), [high](#high), [low](#low)


## candles

This property returns candles for current trading exchange, symbol, and timeframe. Is it frequently used when using [technical indicators](/docs/indicators/) because the first parameter for all indicators is `candles`.

**Return Type:** np.ndarray

**Example**:
```py
# get SMA with a period of 8 for current trading route
sma8 = ta.sma(self.candles, 8)
```


## get_candles

This method returns candles for the exchange, symbol, and timeframe that you specify, unlike `self.candles` which returns candles for the current route.

```py
get_candles(exchange: str, symbol: str, timeframe: str)
```

For simple strategies that trade only one route and use only one timeframe, `self.candles` is probably the way to go. Otherwise, use `self.get_candles()`.

**Return Type:** np.ndarray

**Example**:
```py
@property
def big_trend(self):
    """
    Uses the SRSI indicator to determine the bigger trend of the market.
    The trading timeframe is "4h" so we use "1D" timeframe as the anchor timeframe.
    """
    k, d = ta.srsi(self.get_candles(self.exchange, self.symbol, '1D'))

    if k > d:
        return 1
    elif k < d:
        return -1
    else:
        return 0
```

**See Also**: [candles](#candles)


## fee_rate

The `fee_rate` property returns the fee rate that the exchange your strategy is trading on uses. This property is most commonly used as a parameter for [risk_to_qty](/docs/utils.html#risk-to-qty).

**Example:**
```py
qty = utils.risk_to_qty(self.balance, 3, entry, stop, fee_rate=self.fee_rate)
```

**Return Type**: float

**See Also**: [risk_to_qty](/docs/utils.html#risk-to-qty)

::: tip
The `fee_rate` property returns exchange fee as a float. For example at Binance fee is `0.1%`, hence `self.fee_rate` would return `0.001`.
:::


## high

The current candle's high price.

**Return Type**: float

**Example**:

```py
def go_long(self):
    qty = 1

    # open position at 2 dollars above current candle's high
    self.buy = qty, self.high + 2
```

## increased_count

How many times has the position size been increased since this trade was opened?

This is useful for strategies that for example enter/exit in multiple points, and you'd like to update something related to it.

**Return Type**: int

This property is useful if:
1. You have been trying to open position in more than one point:
```py
def go_long(self):
    self.buy = [
        (0.5, self.price + 10),
        # after this point self.increased_count will be 1
        (0.5, self.price + 20),
        # after this point self.increased_count will be 2
        (0.5, self.price + 30),
        # after this point self.increased_count will be 3
    ]
```

2. You decide to increase the size of the open position because of some factor of yours:

```py
def update_position(self):
    # momentum_rank being a method you've defined somewhere that
    # examines the momentum of the current trend or something
    if self.momentum_rank > 100:
        if self.is_long:
            # buy qty of 1 for the current price (MARKET order)
            self.buy = 1, self.price
```


## index

The `index` property is a counter which can be used to detect how many times the strategy has been executed. Imagine we're doing a loop in backtest mode, and this index is the index of that loop. The below examples can explain it better.

**Return Type**: int

**Example:**

```py
# example #1: go long when the first candle is received
def should_long(self):
    return self.index == 0

# example #2: let's say there are some expensive operations in a
# method I've defined called do_slow_updates() (like machine learning stuff)
# that I'd like to do once a day while trading "1m" candles
def before(self):
    if self.index % 1440 == 0:
        do_slow_updates()
```



## has\_long\_entry\_orders

Used to know the type of entry orders for times that position is not opened yet such as inside the `should_cancel_entry()` and `before()` methods and also in filters.

**Return Type**: bool

**Example**:

```py
def should_cancel_entry(self):
    # cancel entry orders only if trying to enter a long trade
    if self.has_long_entry_orders:
        return True
```

## has\_short\_entry\_orders

Like [has_long_entry_orders](#has-long-entry-orders) but for short trades.

**Return Type**: bool

## is_close

Is the current position close?

**Return Type**: bool

Alias for `self.position.is_close`



## is_long

Is the type of the open position (current trade) `long`?

**Return Type**: bool


## is_open

Is the current position open?

**Return Type**: bool

Alias for `self.position.is_open`


## is_short

Is the type of the open position (current trade) `short`?

**Return Type**: bool


## exchange_type

Returns the type of the exchange your strategy is trading on. It will be either `spot` or `futures`.

**Return Type**: str

## is_backtesting

Returns whether the strategy is running in backtest mode or not.

**Return Type**: bool

## is_livetrading

Returns whether the strategy is running in live trading mode or not.

**Return Type**: bool

## is_papertrading

Returns whether the strategy is running in paper trading mode or not.

**Return Type**: bool

## is_live

Returns whether the strategy is running in either live trading or paper trading mode or not. It is the equivalent of:

```py
self.is_livetrading or self.is_papertrading
```

**Return Type**: bool

## is_spot_trading

Returns whether the exchange your strategy is trading on is a spot exchange.

**Return Type**: bool


## is_futures_trading

Returns whether the exchange your strategy is trading on is a futures exchange.

**Return Type**: bool


## leverage

The `leverage` property returns the leverage number that you have set in your config file for the exchange you're running inside the strategy. For spot markets, it always returns `1`.

**Return Type**: int

## liquidation_price

The `liquidation_price` property returns the price at which the position will get liquidated which is used in futures exchanges only. At the moment, backtests support the `isolated` mode only and not the cross mode.

In the live mode, the value for the `liquidation_price` is fetched from the exchange once every minute so what you see in the dashboard isn't updated in real-time.

**Return Type**: float

## mark_price

The `mark_price` property returns the mark-price in futures exchanges which are used for the calculation of the liquidation price. This property is used for live trading futures exchanges only. During backtests, it equals to `self.price`.

**Return Type**: float


## funding_rate

The `funding_rate` property returns the current funding rate in futures exchanges. This property is used for live trading futures exchanges only. During backtests, it equals `0`.

**Return Type**: float

## next_funding_timestamp

The `next_funding_timestamp` property returns the timestamp for the next funding. It is used only when trading perpetual contracts. This property is used for live trading futures exchanges only. During backtests, it equals `None`.

**Return Type**: int


## liquidate

This method is used to quickly liquidate the open position using a market order. It is a shortcut to use instead of writing:
```py
if self.position.pnl > 0:
    self.take_profit = self.position.qty, self.price
else:
    self.stop_loss = self.position.qty, self.price
```

It is often used within the `update_position` method of strategies that close positions in specific conditions.

**Example**:

Let's open a long position at first [index](#index), and close it at 10th:

```py
def update_position(self):
    if self.index == 10:
        self.liquidate()

def should_long(self):
    return self.index == 0

def go_long(self):
    self.buy = 1, self.price
```


## low

The current candle's low price.

**Return Type**: float

**Example**:

```py
def go_long(self):
    qty = 1

    # open position at 2 dollars above current candle's low
    self.buy = qty, self.high + 2

    # stop-loss at 2 dollars below current candle's low
    self.buy = qty, self.low - 2
```

## metrics

The `metrics` property returns the metrics that you usually would see at the end of backtests. It is useful for coding formulas such as [Kelly Criterion](https://www.investopedia.com/articles/trading/04/091504.asp).

::: warning
Be aware that without trades it will return `None`.
:::

**Available metrics:**
- total
- total_winning_trades
- total_losing_trades
- starting_balance
- finishing_balance
- win_rate
- max_R
- min_R
- mean_R
- ratio_avg_win_loss
- longs_count
- longs_percentage
- short_percentage
- shorts_count
- fee
- net_profit
- net_profit_percentage
- average_win
- average_loss
- expectancy
- expectancy_percentage
- expected_net_profit_every_100_trades
- average_holding_period
- average_winning_holding_period
- average_losing_holding_period
- gross_profit
- gross_loss
- max_drawdown
- annual_return
- sharpe_ratio
- calmar_ratio
- sortino_ratio
- omega_ratio
- total_open_trades
- open_pl
- winning_streak
- losing_streak
- largest_losing_trade
- largest_winning_trade
- current_streak

**Return Type**: dict

## open

The current candle's opening price.

**Return Type**: float

**Example**:

```py
def should_long(self):
    # go long if current candle is bullish
    if self.close > self.open:
        return True

    return False
```

## orders

Returns all the orders submitted by this strategy.

**Return Type**: List[Order]

## position

The position object of the trading route.

::: tip
Please note that each route instance has only one position which is accessible inside the strategy. It doesn't mean that you cannot trade two positions using one strategy; to do that simply create two routes using the same strategy but with different symbols.
:::

**Return Type**: Position

```py
# only useful properties are mentioned
class Position:
    # the (average) entry price of the position | None if position is close
    entry_price: float
    # the quantity of the current position | 0 if position is close
    qty: float
    # the timestamp of when the position opened | None if position is close
    opened_at: float
    # The value of open position
    value: float
    # The type of open position, which can be either short, long, or close
    type: str
    # The PNL of the position
    pnl: float
    # The PNL% of the position
    pnl_percentage: float
    # Is the current position open?
    is_open: bool
    # Is the current position close?
    is_close: bool
```

**Example:**
```py
# if position is in profit by 10%, update stop-loss to break even
def update_position(self):
    if self.position.pnl_percentage >= 10:
        self.stop_loss = self.position.qty, self.position.entry_price
```

**See Also**: [is_long](#is-long), [is_short](#is-short), [is_open](#is-open), [is_close](#is-close)

## all_positions

Returns a python dictionary with all the positions. The keys are the symbols and the values are the position objects.

**Return Type**: dict

**Example:**
```py
# assuming that I have two trading routes, one for BTC-USDT and one for ETH-USDT
btc_position = self.all_positions['BTC-USDT']
eth_position = self.all_positions['ETH-USDT']
```

**See Also**: [position](#position)


## price

The current/closing price of the trading symbol at the trading time frame.

**Return Type**: float

**Aliases**: `close`

**Example**:

```py
def go_long(self):
    # buy 1 share at the current price (MARKET order)
    self.buy = 1, self.price
```

## reduced_count

How many times has the position size been reduced since this trade was opened?

This is useful for strategies that for example exit in multiple points, and you'd like to update something related to it.

**Return Type**: int

**Example**:

```py{12}
def go_long(self):
    self.buy = 1, self.price
    self.stop_loss = 1, self.price - 10
    self.take_profit = [
        (0.5, self.price + 10),
        (0.5, self.price + 20)
    ]

def update_position(self):
    # even though we have especified the exit price
    # for the second half, we now updated to exit with SMA20
    if self.reduced_count > 0:
        self.take_profit = 0.5, self.SMA20

@property
def SMA20(self):
    return ta.sma(self.candles, 20)
```


## shared_vars

`shared_vars` is a dictionary object just like `vars` except that it is shared among all your [routes](/docs/routes).

You would need `shared_vars` for writing strategies that require more than one route, and when those routes need to communicate with each other.

`shared_vars` could act as a bridge. One example could be in a pairs trading strategy which requires two routes to communicate with each other (one goes long when the other goes short)

**Return Type**: dict

**See Also**: [vars](#vars)


## time

The current execution timestamp (UTC) of the strategy.

**Return Type**: int

## trades

Returns all the completed trades for this strategy.

**Return Type**: List[CompletedTrade]

## vars

`vars` is the name of a dictionary object present in your strategy that you can use as a placeholder for your variables.

Of course, you could define your own variables inside `__init__` instead, but that would bring a concern about naming your variables to prevent conflict with built-in variables and properties.

Using `vars` would also make it easier for debugging.


**Return Type**: dict


## log

This method can be used to log text from within the strategy which is very helpful for debugging or monitoring (in case of live trading). Accepts a second `log_type` parameter with values as `info` or `error`.

The default is `info`. `error` logs are notified separately in the live mode, so that's a nice way of using them.

If you need to send a notification for the logged message in live mode, pass the `send_notification` parameter as `True`.
For custom logs to custom channels, you can set `webhook` parameter with either a hard-coded webhook or an environment value from `.env`.
Default is the General / Error channels.

```py
log(
    msg: str,
    log_type: str = 'info',
    send_notification: bool = False,
    webhook: str = None
)
```


## watch_list

This method is to be used in live trading mode only:

```py
watch_list() -> list
```

**Return Type:** list

Sometimes you might want to debug/monitor your running strategy constantly. One way to do that is to define the `watch_list()` method in your strategy which returns a list of tuples containing keys and values. You can fill anything you want in it; indicator values, entry/exit signals, etc.


**Example**:
```py
@property
def short_ema(self):
    return ta.ema(self.candles, 50)

@property
def long_ema(self):
    return ta.ema(self.candles, 100)

def watch_list(self):
    return [
        ('Short EMA', self.short_ema),
        ('Long EMA', self.long_ema),
        ('Trend', 1 if self.short_ema > self.long_ema else -1),
    ]
```

Then, when you run the live session, you will see a new table like:

![watch-list](https://api1.jesse.trade/storage/images/docs/watch-list.jpg)

## min_qty

The minimum quantity that you can trade on the exchange for the symbol you're trading. It is available in live and paper trading modes only.

**Return Type**: float
