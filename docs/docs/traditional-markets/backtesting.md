# Backtesting on Gapped Data

Candles from a traditional market have holes where the market was closed. Jesse detects that automatically when a backtest starts and switches to a timestamp-driven replay: the engine walks the candles that exist, in order, and treats every missing minute as a closure. Nothing is fabricated. This page lists what that changes compared with a crypto backtest.

The same engine runs behind the dashboard, [`jesse.research.backtest()`](/docs/research/backtest), optimization and the significance test, so everything below applies to all of them.

## Timeframes are built from observed minutes

Only one-minute candles are imported. Bigger timeframes are assembled at run time from the minutes that exist inside each clock-aligned bucket:

- A `1h` candle always covers a wall-clock hour. On US stock data the `09:00` candle contains only the minutes from `09:30` to `09:59`, because nothing was observed before the open.
- A bucket with no observed minute at all does not exist. There is no `03:00` candle on a weekday and no candles on a Saturday.
- `1D` candles are UTC days, not exchange sessions. A US trading day therefore lands in one UTC-day candle, but the candle's open time is midnight UTC.
- A bucket that completes while the market is closed, such as the last `15m` candle of a Friday, is finalized when trading resumes and appears in `self.candles` together with the first new candle. Your strategy runs once on that event, not once per bucket that closed during the gap.

Your strategy is only executed when its own timeframe produces a new candle, so during a closure nothing runs. That is usually what you want; if you also need to keep pre-market and after-hours bars out of your indicators, see [Trading Hours](/docs/strategies/trading-hours).

## Resting orders and opening gaps

On a crypto exchange the next candle opens where the last one closed. On a stock, Monday can open far from Friday's close, and a limit or stop order left resting over the weekend has to be resolved. Jesse checks every active order against the gap between the **previous observed close** and the **new candle's open**:

| Gap | Orders that fill | Condition |
|---|---|---|
| Open above the previous close | sell limits and buy stops | order price between the previous close and the open |
| Open below the previous close | buy limits and sell stops | order price between the open and the previous close |

An order the gap jumped over **fills at the open price**, not at its own price. A stop-loss at 98 with Friday's close at 100 and Monday's open at 94 fills at 94; that is the slippage a real gap would have cost you. The price you originally asked for is kept on the order as `order.vars['submitted_price']`. When several orders are crossed by one gap, the one closest to the previous close fills first. Orders that are not crossed by the gap but lie inside the new candle's range fill afterwards at their own price, as usual.

Isolated-margin liquidation in perpetual-futures simulation checks the whole gap as well, so a position can be liquidated on an open beyond its liquidation price even if the candle later recovers.

## Warm-up candles are counted, not measured

`warm_up_candles` means completed candles of your route's timeframe that were actually observed, not calendar minutes. Two hundred `15m` warm-up candles on US stock data are roughly eight trading days, not two days. If the imported history does not contain enough, the backtest stops with a message like:

```
Only 120 of 200 required completed 15m warmup candles were found for AAPL-USD on Massive Stocks before 2024-01-10.
```

The dashboard's "Import Required Candles" suggestion estimates the start date from calendar time, so on gapped data it can suggest a date that is not early enough. Import more than it asks for.

## Equity curve, daily balance and metrics

The daily balance is sampled once per calendar day, but a sample is only taken when a candle exists at that moment, so weekends and holidays produce no points and the equity curve shows real gaps rather than flat lines. Every sample carries its real timestamp, and the metrics use those timestamps, so the annual return and Calmar ratio measure elapsed time correctly.

**Annualization.** Sharpe, Sortino, Omega and the annual return need to know how many observations make a year. The Massive sources and `Custom Data` default to **252** (trading days); crypto sources default to **365**. You can switch the value in the session's exchange settings under **Annualization**. Max drawdown and Calmar do not depend on it. All sources in one run must use the same value.

## Session settings you have to choose

A data provider is not a venue, so the session's exchange settings decide how the market is simulated:

| Setting | What it does | Default for Massive | Default for Custom Data |
|---|---|---|---|
| Simulation Model | `spot` (no leverage, no shorting) or `perpetual_futures` (leverage, both directions, liquidation) | spot | perpetual futures |
| Trading Fee | fee rate applied to every fill | 0 | 0.04% |
| Annualization | observations per year for annualized metrics | 252 | 252 |
| Leverage and margin mode | only with `perpetual_futures` | 1x cross | 1x cross |

Shorting a stock in a backtest therefore means choosing `perpetual_futures` and accepting perpetual-style margin accounting; there is no stock-borrow model.

## Several routes in one run

Routes do not need to share timestamps. A US stock and a forex pair can run together; the engine merges their candles into one timeline and executes each strategy only when its own instrument produced a candle. Three constraints remain:

- **One data source per run.** All routes must come from the same exchange entry, for example all `Massive Stocks`, because the equity accounting tracks a single wallet.
- **A common start.** The backtest begins once every trading and data route has its full warm-up. If one symbol's history starts later, the run starts later for everyone.
- **Same annualization** for every route, which follows from the first point.

## Futures

`Massive Futures` candles are single contracts priced in their quoted units, simulated with the spot model. There is no contract multiplier, no margin schedule and no rollover: a backtest on `ESZ5-USD` treats one unit as one dollar of the index level. That is useful for signal research and not for P&L in dollars. Continuous contracts are on the roadmap.

## Research module

[`jesse.research.backtest()`](/docs/research/backtest) accepts gapped one-minute candles as they come out of [`jesse.research.get_candles()`](/docs/research/candles) and needs no extra flag; sparseness is detected the same way as in the dashboard. One caveat: `jesse.research.store_candles()` still expects contiguous minutes, so use the dashboard or the CSV import to load traditional-market data into the database.
