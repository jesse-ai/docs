# Importing Data

Historical candles for traditional markets come from a data provider. Jesse has first-class support for [Massive](https://massive.com) and a generic CSV import called `Custom Data` for candles from anywhere else. Both store one-minute candles and keep the provider's gaps as gaps; nothing is fabricated for the hours a market is closed.

## Massive

### 1. Save your API key

Create an API key on [massive.com](https://massive.com), then open the dashboard's **Settings** (gear icon) and go to the **Data Providers** tab. On the **Massive** card, paste the key into **API Key** and click **Save API key**. Use **Test key** to confirm Massive accepts it; you should see "Massive API key is working."

The key is stored in your Jesse database and is never sent back to the dashboard after saving.

### 2. Import candles

Go to **Import Candles** and pick one of the four Massive sources as the exchange. The **Symbol** field is a searchable catalog fetched from Massive, so you can type a ticker or a company name and pick from the list. Then choose a **Start date** and import.

Symbols use Jesse's `BASE-QUOTE` syntax:

| Source | You pick | Examples |
|---|---|---|
| `Massive Stocks` | ticker with a `-USD` quote | `AAPL-USD`, `TSLA-USD` |
| `Massive Currencies` | a forex or crypto pair | `EUR-USD`, `GBP-JPY`, `BTC-USD` |
| `Massive Indices` | index symbol with a `-USD` quote | `SPX-USD`, `NDX-USD` |
| `Massive Futures` | one specific contract and its currency | `ESZ5-USD`, `CLF6-USD` |

### 3. What gets stored

- **One-minute candles only.** Every other timeframe is built from these minutes when you backtest, so there is nothing else to import.
- **Every bar the provider returns.** For stocks that includes pre-market and after-hours minutes. Nights, weekends and holidays have no bars and stay empty.
- **Stocks are split-adjusted** by default. Nothing is adjusted for dividends. Currencies, indices and futures are stored as delivered.
- **Indices have no volume**, so their volume column is zero.
- **Futures are individual contracts.** `ESZ5-USD` is the December 2025 contract and nothing else; Jesse does not build a continuous, rolled series.

::: tip Start date and plan limits
If your Massive plan does not reach back as far as the start date you chose, the import begins at the earliest date your plan allows and the success message tells you which date that was. On a free plan Massive rate-limits requests; Jesse notices and slows down to one request every 12 seconds, so a long import takes a while but completes.
:::

Re-importing a symbol only fetches the ranges you do not already have. Existing candles are kept.

## Custom Data (CSV)

Use `Custom Data` for candles from any other vendor or your own files. Open **Import Candles**, click **Manage** to reach the Manage Candles page, then click **Import CSV**.

### The file

A UTF-8 CSV with a header row and these six columns, in any order:

```txt
timestamp,open,close,high,low,volume
1704808800000,181.25,181.40,181.55,181.10,12043
1704808860000,181.40,181.31,181.44,181.20,9871
1704808920000,181.31,181.52,181.60,181.30,15220
```

If your file uses other column names, the **Column mapping** section of the import form lets you say which of your columns holds each field.

Rules, all checked before anything is written:

- **One candle per row, one minute each.** Every timestamp must sit on a one-minute UTC boundary. Other timeframes are not supported.
- **Timestamps** may be Unix milliseconds, Unix seconds, or ISO-8601 with a time-zone offset or `Z`. Leave **Timestamp format** on "Detect automatically" unless the guess is wrong.
- **Strictly ascending and unique.** No duplicate minutes, no rows out of order.
- **Gaps are fine.** A missing minute is treated as a closure and preserved; the preview tells you how many minutes are missing.
- **Prices must be positive and coherent**: `high` is the highest of the four, `low` the lowest, and `volume` is not negative. No blanks, `NaN` or infinities.

Give the import a **Symbol** in pair syntax, such as `SPY-USD` or `DAX-EUR`. The exchange is always `Custom Data`.

### Preview, then import

**Preview CSV** scans the whole file and shows the number of rows, the first and last candle, the missing minutes, and four error counters: duplicates, out-of-order rows, bad timestamps and bad OHLCV values, with the first twenty offending lines. Only a file with zero errors can be imported; fix the source file and preview again. **Confirm import** writes everything in one transaction, so a failure part-way leaves nothing behind. Importing the same rows twice is harmless: existing candles are left untouched.

::: tip Cleaning through MCP
If you work through Jesse's [MCP server](/docs/mcp/), its CSV tools add a cleaning step that sorts rows, removes exact duplicate lines and can drop malformed rows instead of rejecting the file. Two different candles with the same timestamp are always rejected, since Jesse cannot know which one is right.
:::

## After importing

Imported symbols appear in the backtest page under their source. Because a data source carries no fee or market type of its own, check the session's exchange settings before running: **Simulation Model**, **Trading Fee** and **Annualization** are all yours to set. [Backtesting on Gapped Data](./backtesting.md) explains what to expect from the run.
