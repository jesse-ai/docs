---
title: 'Alpaca (US stocks)'
---

# Alpaca (US stocks and ETFs)

::: warning Public beta
Live trading through Alpaca is in public beta. It is new and has not seen the range of markets and accounts that the crypto exchanges have. Start on one of the `Paper` exchanges below, keep position sizes small when you move to a real account, and please [report](https://jesse.trade/help) anything that looks wrong.
:::

[Alpaca](https://alpaca.markets) is a US broker with a plain API-key setup: create an account, generate a key pair, and paste it into Jesse. You can then trade listed US stocks and ETFs through four exchanges:

| Exchange | Alpaca account | What it does |
|---|---|---|
| `Alpaca Stocks Cash` | Live | Long-only, whole shares, cash buying power |
| `Alpaca Stocks Margin` | Live | Long and short with a leverage cap, on a margin account |
| `Alpaca Stocks Cash Paper` | Paper | The cash model on Alpaca's paper account |
| `Alpaca Stocks Margin Paper` | Paper | The margin model on Alpaca's paper account |

The two `Paper` exchanges are free to use, like the testnets of crypto exchanges. The other two need a paid Jesse plan.

Symbols look the same as in the stock data providers: `AAPL-USD`, `SPY-USD`, `BRK.B-USD`. A strategy you backtested on `FMP Stocks` or `Massive Stocks` candles can be pointed at an Alpaca exchange without changing the symbol of its routes.

## Getting started

1. Create an [Alpaca](https://alpaca.markets) account. Every account comes with a paper account that trades with simulated money.
2. In Alpaca's dashboard, switch to the paper account and generate an API key. You get a key ID and a secret.
3. In Jesse's dashboard, open the **Exchange API Keys** page and add that key for `Alpaca Stocks Cash Paper` or `Alpaca Stocks Margin Paper`.
4. Start a live session and select that API key. Leave the **Paper Trade** switch off: the orders are then placed on Alpaca's paper account, which is the point of the test. With the switch on, Jesse would simulate the fills itself and send nothing to Alpaca.

Once your strategy behaves the way you expect on the paper account, repeat steps 2 and 3 with a key from your live Alpaca account and one of the two exchanges without `Paper` in the name.

## API keys

Alpaca issues **separate key pairs for the paper and the live account**. Save the paper key for the `Paper` exchanges and the live key for the other two. A session started with the wrong kind of key stops at startup with a message that says so. Only the API key ID and the secret are needed.

Jesse's own paper-trading mode, which simulates fills on live data, also works with these exchanges.

## Market hours

Stocks do not trade around the clock, and that changes a few things compared to crypto:

- **No candles while the market is closed.** When nothing trades, Alpaca sends no candle and Jesse does not make one up. The session simply waits, the same way a backtest on stock data skips the hours and days that have no candles.
- **Pre-market and after-hours candles are included**, as they are in the candles you import from data providers. If your strategy should only decide during the regular session, use the [Trading Hours](/docs/strategies/trading-hours) helpers.
- **Your strategy runs at the end of each candle of its timeframe, as long as the market is trading.** A candle that ends while the market is closed, such as the last `4h` candle of the day, is acted on when trading resumes. The same goes for a candle whose last minute had no trades: it is acted on when the next candle arrives. This is the rule backtests follow too, described in [Backtesting traditional markets](/docs/traditional-markets/backtesting#timeframes-are-built-from-observed-minutes).
- **Daily candles are UTC days.** A `1D` candle ends at midnight UTC, when US stocks are not in their regular session, so your strategy acts on it when the next candle arrives. With Alpaca's free data plan that is the first pre-market candle of the next trading day. Orders it places then wait for the regular session, as described below.
- **Jesse submits orders for regular-session trading.** The usual session runs from 9:30 to 16:00 New York time, with an earlier close on some trading days. A market order Alpaca accepts outside that session becomes eligible to fill at the next open. Jesse's limit and stop orders also wait for regular trading hours.
- **Stops can gap overnight.** If the price crosses your stop outside the regular session, the next eligible execution can be far from the stop price.

Alpaca only streams one-minute candles, so Jesse always builds the bigger timeframes from them: [Generate Candles Locally](/docs/live-configuration#generate-candles-locally) is always on for these exchanges, whatever the setting says.

## Cash versus margin

- **Cash** uses Jesse's spot model. Positions are long-only, and the available balance is the cash that is not already committed to resting buy orders.
- **Margin** uses Jesse's `margin` model. Positions can be long or short, and `self.is_margin_trading` is true in your strategy. The exchange's **Leverage Cap** setting limits the leverage that the position-sizing helpers use. It cannot be higher than what your Alpaca account allows, and it does not change anything on Alpaca's side. Only stocks that Alpaca marks as shortable can be sold short.

Borrow fees, margin interest and margin calls are handled by Alpaca. They are not simulated in backtests or in Jesse's paper-trading mode.

## How orders behave

- **Whole shares.** Quantities are rounded down to whole shares, and a size below one share becomes one share.
- **One exit at Alpaca at a time.** Alpaca does not let a take-profit and a stop-loss for the same shares rest together. Jesse keeps the one nearest to the current price at Alpaca and holds the other one itself, swapping them as the price moves. This is what Jesse already does on spot exchanges. The exit that Jesse holds only works while your session is running and connected.
- **Entries next to a stop.** Alpaca rejects an order that could trade against one of your own resting orders. So while entry orders are still waiting to add to a position, its stop-loss is held by Jesse and sent once those entries have filled or been cancelled.
- **Exits the price has already passed.** Jesse knows the price from the last finished candle, while Alpaca checks an order against its live price. If the live price has already moved through your stop-loss when Jesse sends it, Alpaca rejects the stop and Jesse closes those shares with a market order instead. If it is your take-profit that Alpaca rejects this way, Jesse places it as a limit order at your target price, so it never sells below the target or buys above it.
- **Order prices.** The driver uses two decimal places for stocks priced at $1 or more and four for stocks below $1.
- **No commission.** The fee setting defaults to 0. Alpaca's small regulatory fees on sells are not modelled.

With persistency enabled, a restart restores the open position, its resting orders and the saved protective exits waiting in Jesse. With persistency disabled, a fresh start cancels working orders on its trading routes and closes their existing positions. If Alpaca is holding one of those closing orders for the next open, the new strategy waits for the fill.

## Market data plan

Alpaca's free data plan streams data from the IEX exchange only. It is real time, but it covers a small part of US trading volume, so quiet stocks can go minutes without a candle, more so outside the regular session. Its candles start at 8:00 and stop at 17:00 New York time. It also allows one data connection per account and up to 30 symbols per session. Alpaca's paid data plan streams all US trades, including the full pre-market and after-hours sessions. Jesse detects which plan you have and uses it for both the warm-up candles and the live stream.

Because the two plans do not see the same trades, their candles differ, and so can the moments your strategy runs. The same is true between Alpaca and the data provider you backtested on.

Because the free plan allows one data connection per account, run one Alpaca session at a time per account.
