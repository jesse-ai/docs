---
title: 'Alpaca (US stocks)'
---

# Alpaca (US stocks and ETFs)

::: warning Public beta
Live trading through Alpaca is in public beta. It has been tested on Alpaca's paper account, but it is new and has not seen the range of markets and accounts that the crypto exchanges have. Start on one of the `Paper` exchanges below, keep position sizes small when you move to a real account, and please [report](https://jesse.trade/help) anything that looks wrong.
:::

[Alpaca](https://alpaca.markets) is a US broker with a plain API-key setup: create an account, generate a key pair, and paste it into Jesse. Jesse trades listed US stocks and ETFs through four exchanges:

| Exchange | Alpaca account | What it does |
|---|---|---|
| `Alpaca Stocks Cash` | Live | Long-only, whole shares, cash buying power |
| `Alpaca Stocks Margin` | Live | Long and short with a leverage cap, on a margin account |
| `Alpaca Stocks Cash Paper` | Paper | The cash model on Alpaca's paper account |
| `Alpaca Stocks Margin Paper` | Paper | The margin model on Alpaca's paper account |

The two `Paper` exchanges are free to use, like the testnets of crypto exchanges. The other two need a paid Jesse plan.

Symbols look the same as in the stock data providers: `AAPL-USD`, `SPY-USD`, `BRK.B-USD`. A strategy you backtested on `FMP Stocks` or `Massive Stocks` candles can be pointed at an Alpaca exchange without changing the symbol of its routes.

## API keys

Alpaca issues **separate key pairs for the paper and the live account**. Save the paper key for the `Paper` exchanges and the live key for the other two. A session started with the wrong kind of key stops at startup with a message that says so. Only the API key ID and the secret are needed.

Jesse's own paper-trading mode, which simulates fills on live data, also works with these exchanges.

## Market hours

Stocks do not trade around the clock, and that changes a few things compared to crypto:

- **No candles while the market is closed.** When nothing trades, Alpaca sends no candle and Jesse does not make one up. The session simply waits, the same way a backtest on stock data skips the hours and days that have no candles.
- **Pre-market and after-hours candles are included**, as they are in the candles you import from data providers. If your strategy should only decide during the regular session, use the [Trading Hours](/docs/strategies/trading-hours) helpers.
- **Your strategy runs at the end of each candle of its timeframe, as long as the market is trading.** A candle that ends while the market is closed, such as the last `4h` candle of the day, is acted on when trading resumes. The same goes for a candle whose last minute had no trades: it is acted on when the next candle arrives. This is the rule backtests follow too, described in [Backtesting traditional markets](/docs/traditional-markets/backtesting#timeframes-are-built-from-observed-minutes).
- **Jesse submits orders for regular-session trading.** The usual session runs from 9:30 to 16:00 New York time, with an earlier close on some trading days. A market order Alpaca accepts outside that session becomes eligible to fill at the next open. Jesse's limit and stop orders also wait for regular trading hours.
- **Stops can gap overnight.** If the price crosses your stop outside the regular session, the next eligible execution can be far from the stop price.

The [Generate Candles Locally](/docs/live-configuration#generate-candles-locally) setting must be enabled for these exchanges, because Alpaca only streams one-minute candles.

## Cash versus margin

- **Cash** uses Jesse's spot model. Positions are long-only, and the available balance is the cash that is not already committed to resting buy orders.
- **Margin** uses Jesse's `margin` model. Positions can be long or short, and `self.is_margin_trading` is true in your strategy. The exchange's **Leverage Cap** setting limits the leverage that the position-sizing helpers use. It cannot be higher than what your Alpaca account allows, and it does not change anything on Alpaca's side. Only stocks that Alpaca marks as shortable can be sold short.

Borrow fees, margin interest and margin calls are handled by Alpaca. They are not simulated in backtests or in Jesse's paper-trading mode.

## How orders behave

- **Whole shares.** Quantities are rounded down to whole shares, and a size below one share becomes one share.
- **One exit at Alpaca at a time.** Alpaca does not let a take-profit and a stop-loss for the same shares rest together. Jesse keeps the one nearest to the current price at Alpaca and holds the other one itself, swapping them as the price moves. This is what Jesse already does on spot exchanges. The exit that Jesse holds only works while your session is running and connected.
- **Entries next to a stop.** Alpaca rejects an order that could trade against one of your own resting orders. So while entry orders are still waiting to add to a position, its stop-loss is held by Jesse and sent once those entries have filled or been cancelled.
- **Crossed exit stops.** If Alpaca rejects a protective stop because its live price has crossed the trigger, Jesse submits a market exit for the affected shares. If the strategy tagged that order as a take-profit, Jesse submits a limit at the original target price. A sell limit can fill at its target or higher, and a buy limit can fill at its target or lower.
- **Order prices.** The driver uses two decimal places for stocks priced at $1 or more and four for stocks below $1.
- **No commission.** The fee setting defaults to 0. Alpaca's small regulatory fees on sells are not modelled.

With persistency enabled, a restart restores the open position, its resting orders and the saved protective exits waiting in Jesse. With persistency disabled, a fresh start cancels working orders on its trading routes and closes their existing positions. If Alpaca is holding one of those closing orders for the next open, the new strategy waits for the fill.

## Market data plan

Alpaca's free data plan streams data from the IEX exchange only. It is real time, but it covers a small part of US trading volume, so quiet stocks can go minutes without a candle, more so outside the regular session. It also allows one data connection per account and up to 30 symbols per session. Alpaca's paid data plan streams all US trades. Jesse detects which plan you have and uses it for both the warm-up candles and the live stream.

Because the free plan allows one data connection per account, run one Alpaca session at a time per account.
