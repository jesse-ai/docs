# Importing Data

Historical candles for traditional markets come from a data provider. Jesse has first-class support for two providers: [Financial Modeling Prep](https://jesse.trade/fmp) (FMP), our recommended provider, and [Massive](https://massive.com). There is also a generic CSV import called `Custom Data` for candles from anywhere else. All of them store one-minute candles and keep the provider's gaps as gaps; nothing is fabricated for the hours a market is closed.

## Financial Modeling Prep (FMP) <Badge type="tip" text="Recommended" />

[Financial Modeling Prep](https://jesse.trade/fmp) is our recommended data provider. It covers stocks and ETFs on most major exchanges worldwide, plus forex, crypto, indices and commodity futures, and one API key unlocks all four FMP sources. Like every data provider, they supply candles for backtesting and research only, not for trading.

### Which plan you need

Jesse imports one-minute candles, and FMP only includes one-minute data in its **Ultimate** plan. The Starter and Premium plans can't be used for imports, even though Premium lists intraday charts: those are five-minute and longer.

::: tip 15% off FMP
Sign up through [jesse.trade/fmp](https://jesse.trade/fmp) and you get 15% off. Ultimate is $139 a month, or $118.15 with our discount. Billed yearly, it's $99 a month, or $84.15 with the discount. (Prices as of November 2026.)
:::

**Why we recommend FMP.** For the price, FMP gives you far more history. Ultimate includes the full one-minute history, which reaches back to 2003 for US stocks, and that one subscription also covers stocks worldwide, forex, crypto, indices and commodities. At Massive, 20 or more years of stock history needs the $199-a-month Stocks Advanced plan, cheaper plans go back 2 to 10 years, and currencies, indices and futures are separate subscriptions.

### 1. Save your API key

Copy your API key from your [FMP account](https://jesse.trade/fmp), then open the dashboard's **Settings** (gear icon) and go to the **Data Providers** tab. On the **Financial Modeling Prep** card, paste the key into **API Key** and click **Save API key**. Use **Test key** to confirm FMP accepts it; you should see "FMP API key is working." The test also checks that your plan includes one-minute data, and tells you if it's not the Ultimate plan.

The key is stored in your Jesse database and is never sent back to the dashboard after saving.

### 2. Import candles

Go to **Import Candles** and pick one of the four FMP sources as the exchange. The **Symbol** field is a searchable catalog fetched from FMP, so you can type a ticker or a name and pick from the list. Then choose a **Start date** and import.

Symbols use Jesse's `BASE-QUOTE` syntax, with the currency the instrument trades in as the quote:

| Source | You pick | Examples |
|---|---|---|
| `FMP Stocks` | a stock or ETF and its trading currency | `AAPL-USD`, `SPY-USD`, `BRK.B-USD`, `VOD.L-GBX`, `2222.SR-SAR`, `VOLV.B.ST-SEK` |
| `FMP Currencies` | a forex pair or a dollar-quoted crypto coin | `EUR-USD`, `BTC-USD` |
| `FMP Indices` | a stock-market, volatility or yield index without FMP's `^`, and its currency | `GSPC-USD` (S&P 500), `N225-JPY`, `FTSE-GBP`, `VIX-USD` |
| `FMP Commodities` | a futures market's root and its currency: metals, energy, grains, softs, rates and index futures | `GC-USD` (gold), `CL-USD` (crude oil), `ZC-USX` (corn) |

- **Stocks outside the US keep FMP's exchange suffix**, such as `.L` for London, `.SR` for Saudi Tadawul or `.ST` for Stockholm. A share-class dash becomes a dot, so FMP's `BRK-B` is `BRK.B-USD`.
- **Prices are in the trading currency.** London prices are in pence and Johannesburg's in cents, so they are labeled `GBX` and `ZAC`, never `GBP` or `ZAR`. Grains, softs and livestock futures are priced in US cents: `USX`.
- **Stock exchanges covered** include the US, London, Germany, Paris, Amsterdam, Switzerland, Toronto, Sydney, Hong Kong, India, Korea, Tokyo, Saudi Tadawul, Johannesburg, Shanghai, Stockholm, Milan, Madrid, Singapore, Taiwan, Brussels and Oslo.
- **The symbol list** has every company FMP covers plus all US-listed ETFs. ETFs listed outside the US are not in the list yet, because FMP doesn't publish their currency in bulk.

### 3. What gets stored

- **One-minute candles only.** Every other timeframe is built from these minutes when you backtest, so there is nothing else to import.
- **Every bar FMP returns.** US stocks include pre-market and after-hours minutes. Nights, weekends and holidays have no bars and stay empty.
- **Stocks are split-adjusted**, not dividend-adjusted. Currencies, indices and commodities are stored as delivered.
- **Times are in UTC for every market**, daylight saving included. One quirk can't be avoided: for markets that trade around the clock, such as crypto, FMP has no data for the extra hour on the night US clocks go back, so that hour is a gap once a year.
- **Commodities are continuous front-month series.** `GC-USD` is the price of gold's front-month contract, not one specific expiry.
- **Index bars without volume** are stored with a volume of zero.

::: tip History depth and data allowance
How far back the one-minute history goes depends on the market. For example, US stocks reach back to 2003, BTC to 2013, EUR/USD to 2009, London and Saudi stocks to late 2022, and gold only to late 2023. If you pick an earlier start date, the import begins at the first available minute and the success message tells you which date that was.

FMP plans include a monthly data allowance. The full minute history of a market that trades around the clock is a large download, so on a smaller plan import only the date range you need.
:::

Re-importing a symbol only fetches the ranges you do not already have. Existing candles are kept.

## Massive

[Massive](https://massive.com) covers US stocks, forex, crypto, indices and individual futures contracts. It works the same way as FMP: one API key unlocks all four Massive sources.

### 1. Save your API key

Create an API key on [massive.com](https://massive.com), then open the dashboard's **Settings** (gear icon) and go to the **Data Providers** tab. On the **Massive** card, paste the key into **API Key** and click **Save API key**. Use **Test key** to confirm Massive accepts it; you should see "Massive API key is working."

Like the FMP key, it is stored in your Jesse database and is never sent back to the dashboard after saving.

### 2. Import candles

Go to **Import Candles** and pick one of the four Massive sources as the exchange. The **Symbol** field is a searchable catalog fetched from Massive, so you can type a ticker or a company name and pick from the list. Then choose a **Start date** and import.

| Source | You pick | Examples |
|---|---|---|
| `Massive Stocks` | ticker with a `-USD` quote | `AAPL-USD`, `TSLA-USD` |
| `Massive Currencies` | a forex or crypto pair | `EUR-USD`, `GBP-JPY`, `BTC-USD` |
| `Massive Indices` | index symbol with a `-USD` quote | `SPX-USD`, `NDX-USD` |
| `Massive Futures` | one specific contract and its currency | `ESZ5-USD`, `CLF6-USD` |

### 3. What gets stored

The rules from FMP apply here too: one-minute candles only, every bar Massive returns (stocks include pre-market and after-hours minutes), and nothing fabricated for nights, weekends and holidays. On top of that:

- **Stocks are split-adjusted** by default. Nothing is adjusted for dividends. Currencies, indices and futures are stored as delivered.
- **Indices have no volume**, so their volume column is zero.
- **Futures are individual contracts.** `ESZ5-USD` is the December 2025 contract and nothing else; Jesse does not build a continuous, rolled series.

::: tip Start date and plan limits
If your Massive plan does not reach back as far as the start date you chose, the import begins at the earliest date your plan allows and the success message tells you which date that was. On a free plan Massive rate-limits requests; Jesse notices and slows down to one request every 12 seconds, so a long import takes a while but completes.
:::

As with FMP, re-importing a symbol only fetches the ranges you do not already have.

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
