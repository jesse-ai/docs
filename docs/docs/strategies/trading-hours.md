# Trading Hours

Some instruments follow a market calendar even though the venue you trade them on never closes. The typical case is a tokenized stock on a crypto exchange: the token trades 24/7, but the stock behind it only trades from 09:30 to 16:00 New York time on weekdays. Outside those hours the token's candles are thin and drift, so you usually want two things:

1. **Decide new entries only while the real market is open.**
2. **Keep off-hours candles out of your indicators**, so a weekend of flat candles does not distort a moving average when Monday's session starts.

At the same time, everything about an **open position keeps running around the clock**: the exchange holds your stop-loss and take-profit and may fill them at 03:00, and `update_position()` is still called on every candle.

Jesse gives you three small building blocks for this and deliberately changes nothing else. `self.candles`, `self.get_candles()`, `self.price` and the execution loop behave exactly as they always have. A strategy that never mentions trading hours is unaffected.

| Piece | What it is |
|---|---|
| `trading_hours()` | A method on your strategy returning the schedule (a dict, or `None`) |
| `self.is_trading_hours` | `True` when the current decision time is inside that schedule |
| `utils.filter_candles_by_hours(candles, hours)` | A pure function returning only the candles inside the schedule |

## Defining the schedule

Add a `trading_hours()` method to your strategy. It returns a plain dict:

```py
def trading_hours(self):
    return {
        'timezone': 'America/New_York',
        'hours': {'Mon-Fri': '09:30-16:00'},
    }
```

| Key | Required | Value |
|---|---|---|
| `timezone` | yes | An IANA time-zone name such as `'America/New_York'` or `'Asia/Tokyo'`. Every window is read in it and daylight-saving changes are handled for you. |
| `hours` | yes | A dict mapping a day spec to one window `'HH:MM-HH:MM'` or a list of windows. |
| `closed` | no | A list of ISO dates (`'2026-11-26'`) that are closed regardless of the weekday. |
| `overrides` | no | A dict mapping an ISO date to the window(s) that apply on that specific day, for example an early close. |

Day specs are written like `'Mon-Fri'`, `'Sun-Thu'`, `'Mon,Wed,Fri'` or `'Sun'`. **A day that is not listed is closed; nothing is implied.** Windows are half-open (`open <= time < close`). A window whose end is earlier than its start wraps past midnight, and `'00:00-24:00'` means the whole day.

Some real-world schedules:

```py
# US equities, regular session
{'timezone': 'America/New_York', 'hours': {'Mon-Fri': '09:30-16:00'}}

# US equities including pre-market and after-hours
{'timezone': 'America/New_York', 'hours': {'Mon-Fri': '04:00-20:00'}}

# Saudi Tadawul with Eid closures
{'timezone': 'Asia/Riyadh', 'hours': {'Sun-Thu': '10:00-15:00'},
 'closed': ['2026-03-20', '2026-03-21', '2026-03-22']}

# Pakistan Stock Exchange, shorter Friday with a prayer break
{'timezone': 'Asia/Karachi', 'hours': {'Mon-Thu': '09:30-15:30', 'Fri': ['09:30-12:00', '14:30-16:30']}}

# Tokyo with a lunch break
{'timezone': 'Asia/Tokyo', 'hours': {'Mon-Fri': ['09:00-11:30', '12:30-15:30']}}

# FX week, Sydney open to New York close
{'timezone': 'America/New_York',
 'hours': {'Sun': '17:00-24:00', 'Mon-Thu': '00:00-24:00', 'Fri': '00:00-17:00'}}

# Only the first hour after the open
{'timezone': 'America/New_York', 'hours': {'Mon-Fri': '09:30-10:30'}}

# Crypto, but skip weekends
{'timezone': 'UTC', 'hours': {'Mon-Fri': '00:00-24:00'}}
```

An invalid dict raises a `ValueError` with a message pointing at the offending key the first time it is used.

### Holidays and early closes

Holidays are just dates in `closed`, and an early close is an entry in `overrides`. Write them out for the years you trade; nothing is generated for you, so the schedule always says exactly what it does. US equities in 2026, for example:

```py
def trading_hours(self):
    return {
        'timezone': 'America/New_York',
        'hours': {'Mon-Fri': '09:30-16:00'},
        'closed': [
            '2026-01-01', '2026-01-19', '2026-02-16', '2026-04-03', '2026-05-25',
            '2026-06-19', '2026-07-03', '2026-09-07', '2026-11-26', '2026-12-25',
        ],
        'overrides': {'2026-11-27': '09:30-13:00', '2026-12-24': '09:30-13:00'},
    }
```

### Making the schedule conditional

`trading_hours()` is a method rather than a class attribute for the same reason `hyperparameters()` and `filters()` are: it can look at `self`. Returning `None` means "no schedule", in which case `self.is_trading_hours` is always `True` and `filter_candles_by_hours()` returns its input unchanged. That lets the rest of your strategy stay branch-free.

```py
# only enforce the schedule when trading live on a 24/7 exchange
def trading_hours(self):
    if self.is_backtesting:
        return None
    return {'timezone': 'America/New_York', 'hours': {'Mon-Fri': '09:30-16:00'}}

# key on the data source instead of the mode
def trading_hours(self):
    if self.exchange == 'Massive Stocks':
        return None
    return {'timezone': 'America/New_York', 'hours': {'Mon-Fri': '09:30-16:00'}}

# one strategy, several markets
def trading_hours(self):
    if self.symbol.startswith('TSLA'):
        return {'timezone': 'America/New_York', 'hours': {'Mon-Fri': '09:30-16:00'}}
    return {'timezone': 'Asia/Riyadh', 'hours': {'Sun-Thu': '10:00-15:00'}}

# let the optimizer decide how late in the day entries are still allowed
def trading_hours(self):
    return {'timezone': 'America/New_York',
            'hours': {'Mon-Fri': f"09:30-{self.hp['last_entry_hour']}:00"}}
```

The method runs once per execution and the dict is validated once and cached by value, so the conditional costs nothing measurable.

## Gating entries with `is_trading_hours`

`self.is_trading_hours` is `True` when `self.time` (the moment the strategy is executing) is inside your schedule. Jesse never calls it for you; you place it wherever you want a gate. The most common spot is the first line of `should_long()` and `should_short()`:

```py
def should_long(self):
    if not self.is_trading_hours:
        return False
    return self.price > self.donchian.upperband
```

On a 15m route with US hours this is how the boundary ticks resolve:

| Execution tick (New York) | Candle that just closed | `is_trading_hours` |
|---|---|---|
| Monday 09:15 | 09:00 | `False`, pre-market |
| Monday 09:30 | 09:15 | `True`, first decision of the day |
| Monday 15:45 | 15:30 | `True`, last decision of the day |
| Monday 16:00 | 15:45 | `False`, the window is half-open |
| Saturday 11:00 | 10:45 | `False`, day not listed |
| Thanksgiving 09:30 with `'2026-11-26'` in `closed` | 09:15 | `False`, holiday |

Note that the 09:30 decision sees yesterday's session as its most recent history, which is exactly the point: pre-market candles never influence the signal.

## Filtering candles for indicators

This solves a mismatch between where you backtest and where you trade. Historical candles for a traditional market come from a data provider, and that data has **gaps**: nothing for nights, weekends and holidays, because the market was closed and no bars exist. When you then trade the same asset as a tokenized instrument on a crypto exchange, the feed is **continuous**: a candle every minute, 24/7, including all the hours the real market was shut.

The same indicator therefore sees two different histories. A 20-period moving average on 1h candles spans about three trading days in the backtest, but less than one day live, and a weekend of flat, thin candles sits inside the live window that never existed in the backtest. Signals that were tested against one shape of data would be produced from another.

`utils.filter_candles_by_hours()` closes that gap from the live side: it drops the candles that fall outside the market's hours, so the history your indicators see live has the same shape as the history they saw in the backtest.

`utils.filter_candles_by_hours(candles, hours)` takes any Jesse candle array and returns a new array with only the rows whose open time is inside the schedule, in their original order. Nothing is resampled or invented; the remaining rows are simply not contiguous in time, which every indicator accepts. Wrap it in a `@cached` property exactly as you would an indicator:

```py
from jesse.strategies import Strategy, cached
import jesse.indicators as ta
import jesse.utils as utils

@property
@cached
def session_candles(self):
    return utils.filter_candles_by_hours(self.candles, self.trading_hours())

@property
@cached
def donchian(self):
    return ta.donchian(self.session_candles, 20)
```

With US hours:

- **15m candles from a 24/7 exchange**: Monday keeps 09:30, 09:45, …, 15:45 (26 rows). The other 70 rows of that day and the whole weekend are dropped.
- **1h candles**: the 09:00 candle is only half inside the session, so it is dropped; 10:00 to 15:00 are kept. Coarse timeframes want a schedule that lines up with their bars.
- **Imported stock candles in a backtest**: pre-market and after-hours rows fall out, so the backtest indicator sees the same kind of history the live one will.
- **`1D` candles**: daily candles open at UTC midnight, which is outside an intraday window, so an intraday schedule drops them all. Use `'00:00-24:00'` windows on daily routes if you only want to remove weekends and holidays.

The function works anywhere, including `jesse.research` notebooks and `ml_features()`. A companion `utils.is_in_trading_hours(timestamp, hours)` answers the same question for a single timestamp.

## Unfilled entry orders at the close

If a limit entry is still resting when the session ends, you decide what happens. Both policies are one line in the existing `should_cancel_entry()` hook.

Cancel it on the first execution after the close, so nothing fills on thin overnight liquidity from a decision that is hours old:

```py
def should_cancel_entry(self):
    return not self.is_trading_hours
```

Or let it keep working overnight; if it fills, the stop-loss and take-profit are submitted as usual and the position is managed 24/7:

```py
def should_cancel_entry(self):
    return False
```

## Backtesting versus live trading

Imported stock data is **not pre-filtered** (see [Traditional Markets](/docs/traditional-markets/)). Massive and custom CSV imports keep every bar the provider returns, which for US equities means pre-market and after-hours bars from 04:00 to 20:00 New York time. So:

- Returning `None` from `trading_hours()` in a backtest feeds those extended-hours rows into your indicators, while the live session on a 24/7 exchange would see nights and weekends. That is a valid choice when you are happy for the backtest to lean on the market's own schedule.
- Returning the **same schedule in both modes** is the way to make the backtest and the live indicator history match. Candle timestamps are UTC in every mode and the time-zone conversion is done by Jesse, not by the data, so the same schedule filters extended-hours rows in the backtest and nights and weekends live.

Pick deliberately; these are the two choices side by side.

```py
US_EQUITIES = {'timezone': 'America/New_York', 'hours': {'Mon-Fri': '09:30-16:00'}}

# lean on the imported data's own schedule in backtests
def trading_hours(self):
    if self.is_backtesting:
        return None
    return US_EQUITIES

# identical indicator history in both modes
def trading_hours(self):
    return US_EQUITIES
```

::: warning Warm-up candles are counted before filtering
The warm-up candles Jesse loads are raw exchange candles. On a 24/7 feed only about a quarter of them fall inside a 6.5-hour session, so an indicator that needs 100 session candles needs roughly 400 raw candles of warm-up. Size `warm_up_candles` accordingly.
:::

## Full example

```py
from jesse.strategies import Strategy, cached
import jesse.indicators as ta
import jesse.utils as utils

class TeslaSessionBreakout(Strategy):
    """
    Buys a Donchian breakout on a tokenized TSLA on a 24/7 crypto exchange,
    but only decides entries during the US regular session. Exits are managed
    around the clock because the crypto instrument never closes.
    """

    def trading_hours(self):
        # Backtests run on imported stock candles that already follow the market's
        # own clock. Live runs on the crypto exchange's 24/7 candles, so the
        # schedule matters there.
        if self.is_backtesting:
            return None
        return {
            # Interpret all session hours in New York local time.
            'timezone': 'America/New_York',
            # Regular session: Monday through Friday, from 09:30 up to (but not including) 16:00.
            'hours': {'Mon-Fri': '09:30-16:00'},
            # Optional: full-day closures, such as holidays. List dates for each year you trade.
            'closed': [
                '2026-01-01', '2026-01-19', '2026-02-16', '2026-04-03', '2026-05-25',
                '2026-06-19', '2026-07-03', '2026-09-07', '2026-11-26', '2026-12-25',
            ],
            # Optional: replace the regular hours on specific dates, such as early closes.
            'overrides': {'2026-11-27': '09:30-13:00', '2026-12-24': '09:30-13:00'},
        }

    # ---- indicators (session candles only) ------------------------------

    @property
    @cached
    def session_candles(self):
        return utils.filter_candles_by_hours(self.candles, self.trading_hours())

    @property
    @cached
    def donchian(self):
        return ta.donchian(self.session_candles, self.hp['channel_period'])

    @property
    @cached
    def trend_ema(self):
        return ta.ema(self.session_candles, self.hp['trend_period'])

    @property
    @cached
    def atr(self):
        return ta.atr(self.session_candles, 14)

    # ---- entries ---------------------------------------------------------

    def should_long(self) -> bool:
        # Only allow new entries during the configured trading hours.
        if not self.is_trading_hours:
            return False
        return self.price > self.donchian.upperband and self.price > self.trend_ema

    def should_short(self) -> bool:
        return False

    def go_long(self):
        entry = self.price
        stop = entry - 2 * self.atr
        qty = utils.risk_to_qty(self.available_margin, 1, entry, stop, fee_rate=self.fee_rate)

        self.buy = qty, entry
        self.stop_loss = qty, stop
        self.take_profit = qty, entry + 3 * self.atr

    def go_short(self):
        pass

    def should_cancel_entry(self) -> bool:
        # cancel a resting entry on the first execution after the close
        return not self.is_trading_hours

    # ---- position management (runs 24/7) ---------------------------------

    def update_position(self):
        # Uses the live price on purpose: the exchange is open and the stop
        # must follow the real market, day or night.
        if self.is_long and self.price > self.position.entry_price + 2 * self.atr:
            self.stop_loss = self.position.qty, max(
                self.average_stop_loss, self.price - 1.5 * self.atr
            )

    def hyperparameters(self):
        return [
            {'name': 'channel_period', 'type': int, 'min': 10, 'max': 60, 'default': 20},
            {'name': 'trend_period', 'type': int, 'min': 50, 'max': 200, 'default': 100},
        ]
```
