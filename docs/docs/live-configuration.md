---
title: 'Live Configuration'
---

# Live Configuration

Each live or paper tab on the dashboard has its own **Advanced settings**. This page explains what each of them does, in the order they appear. Each tab keeps its own values, so sessions on different exchanges can be configured differently.

## Session behavior

### Enable Persistency

Decides what happens to your orders and positions on the exchange when a live session starts and stops.

- **Disabled:** when the session starts, Jesse cancels the open orders and closes the open positions for your trading routes' symbols, so the strategy begins from a clean slate. When the session stops, it does the same again.
- **Enabled:** when the session starts, Jesse loads the existing positions and orders from the exchange and continues with them. When the session stops, it leaves them open.

Persistency is not perfect, so be careful when relying on it. It restores what the exchange knows: positions and orders. It does not restore your strategy's own state. Any variables you set inside your strategy start from their initial values again when the session restarts. Write your strategy so it can pick up an existing position correctly, for example by checking `self.position` instead of a variable you set when entering.

Persistency applies to live sessions only. Paper sessions always start fresh.

### Generate Candles Locally

- **Enabled:** Jesse receives one-minute candles from the exchange and builds every larger timeframe itself. Your routes can use any timeframe Jesse supports.
- **Disabled:** Jesse requests each timeframe directly from the exchange, so your routes can only use the timeframes that exchange provides.

This option is available only on exchanges that support backtesting, since those are the ones that provide the historical candles it relies on. It is not available on exchanges such as Hyperliquid, Apex Omni, and Lighter.

## Logs

Choose which events are written to the logs. You can read them through **View Logs**..

## Data

### Warmup Candles

The number of candles loaded before the session starts, so your indicators have enough history from the first candle. The number applies to your biggest timeframe. Smaller timeframes may get more candles, but never fewer.

For example, if you trade the 1m, 15m, and 1h timeframes with 210 warmup candles, Jesse loads at least 210 hourly candles, and at least as many candles on the smaller timeframes.

## Backup checks

A running session gets order updates and candles in real time over the exchange's WebSocket, and that is all it needs. Backup checks are just Jesse being extra careful: every so often it also asks the exchange's REST API, in case an update was missed, for example while the connection was briefly down. The defaults suit almost every session.

- **Order Check (seconds):** how often open orders are checked against the exchange. Default: 10 seconds. Only symbols with open orders are checked. Jesse also checks them once right after the WebSocket reconnects, since that is when an update is most likely to be missed. `0` turns it off, including the check after a reconnect, which is not recommended: if the WebSocket misses an update, Jesse won't notice. Paper sessions don't run this check, since their orders never reach an exchange.
- **Candle Refresh (seconds):** how often recent candles are refreshed. Leave it empty for the automatic interval of 5 seconds plus 1 second per symbol. `0` turns it off, which is not recommended either: if the WebSocket misses a candle, Jesse won't correct it.

**When to change them:** only if the exchange starts rejecting Jesse's requests for exceeding its API rate limit. That rarely happens, and mostly to sessions with a large number of trading routes. Longer intervals then use fewer requests. Exchange accounts with a low limit reach it sooner: for example, a [Lighter](https://jesse.trade/lighter) Standard account allows 60 requests per minute.

## Notifications

Sends live-trading events through the notification driver you select under **Options** on the same tab. To set up a Telegram, Discord, or Slack driver, see [Notifications](/docs/notifications).

- **Enable Notifications:** turns all notifications for this session on or off.
- **Events:** choose which events to receive, such as errors, session start and termination, orders, positions, and closed trades.
- **Account Balance:** adds your wallet balance to the recurring reports.
- **Report Frequency:** how often the recurring report of your positions is sent.

## Simulation and Exchange

On a **paper** tab, this section is called **Simulation**, and its values only affect the simulated account:

- **Starting Capital:** the simulated account balance.
- **Trading Fee:** the fee charged on each simulated trade.
- **Simulation Model:** the market type to simulate, which controls balances, leverage, fees, and PNL.
- **Annualization:** the number of observations per year used by annualized metrics.

On a **live** tab, balance and fees come from your real account, so this section is called **Exchange** and only appears for futures exchanges.

### Leverage

The leverage you set applies to all of your trading routes. Setting a different leverage for each symbol is not supported at the moment. On some exchanges, leverage is a setting of the whole account rather than of each symbol.

### Leverage Mode

Choose between **cross** and **isolated** margin. The choices depend on what the exchange supports: for example, Apex Omni supports cross margin only.
