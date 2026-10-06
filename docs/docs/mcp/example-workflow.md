---
pageClass: mcp-example-workflow
---

# Example workflow

You do **not** need to be a developer to get value from Jesse MCP. Think of it as **chatting with a helper that is allowed to press the same buttons you would in Jesse**—through a safe channel—instead of you clicking everything yourself.

## What your assistant can help with

In plain language, a connected assistant can usually help you **run and read backtests**, **manage your candle data**, **set up and control live or paper sessions**, **run optimization sessions**, **fine-tune strategy parameters**, **run Monte Carlo analysis**, **spot overfitting risks**, **tweak or draft a strategy**, **find and import community strategies from jesse.trade**, and **adjust Jesse settings** (like routes), always **through Jesse** rather than by hand-editing random files on your computer. The goal is to handle research work that would otherwise take hours of manual testing and comparison.

You stay in the driver’s seat: if your editor asks you to approve a step, that is normal. If something is not possible through Jesse, the assistant should say so instead of guessing.

::: tip
Jesse writes and maintains **`AGENTS.md`** at your project root automatically on every `jesse run`, so an assistant working in that project folder can load the MCP rules without any setup. See **[MCP agent rules](/docs/mcp/mcp-rules)** if you want to customize it or your assistant runs on another computer.
:::

## Example — “Get my candles ready”

Example message:

```text
Import Binance Perpetual Futures candles for ETH-USDT on the 1h chart from 2023-01-01 through today, and tell me when it is done.
```

The assistant works **with** Jesse’s import flow (the same idea as the Import Candles screen). When it finishes, your project has the history it needs for backtests on that symbol and timeframe. You can still watch progress in the **Jesse dashboard** and logs like you always do.

More detail on candles: **[Import Candles](/docs/import-candles)**.

## Example — “Tidy up my candle data”

Example message:

```text
Show me which symbols I have stored for Bybit, export BTC-USDT to a CSV, and delete the ETH-USDT data I no longer use.
```

The assistant lists your stored data with its date ranges, like the **Manage Candles** page. The export is saved in your project's `research_scripts/candle_exports/` folder on the Jesse machine; use **Export** on the Manage Candles page if you want a copy on your own computer. Deleting cannot be undone, so the assistant deletes only what you name.

## Example — “Try my strategy on paper”

Example message:

```text
Start a paper session for MyStrategy on Bybit USDT Perpetual, BTC-USDT 1h, with a 5,000 USDT balance. Then tell me once it is running.
```

The assistant creates the session, tells you it is a **paper** session, starts it, and checks until it is running. A paper session trades with simulated money; a live session uses one of your saved exchange API keys and real money, and the assistant always tells you which one it is using. Asking it to stop a session works like the **Stop** button: paper sessions, and live sessions with persistency turned off, close their positions when they stop, while a live session with persistency turned on keeps its orders and positions on the exchange.

## Example — “How did my live trades do this week?”

Example message:

```text
Analyze my live trades of the last 7 days and show me a chart of the running profit.
```

The assistant reads the trades your live sessions closed in that period, across all sessions, and draws the chart on the Jesse machine. It tells you the exact date range it used, how many trades there were, and whether any positions were still open. Profit is shown separately for each quote currency (for example USDT and BTC are never added together), and trades whose profit Jesse could not compute are counted and named rather than left out silently. The figures come from Jesse's own records of its closed trades, not from your exchange account or its balance, and paper sessions are left out unless you ask for them. If there were no trades in that period, it says so instead of drawing an empty chart.

## Example — “Find me a community strategy to start from”

Example message:

```text
Look through the jesse.trade strategy catalog for free trend-following strategies
submitted this year, ranked by Sharpe Ratio. Show me your top three with their
metrics, and import the one I pick.
```

The assistant searches the same catalog the dashboard's **Strategies** page shows, can check how each candidate did on other symbols or timeframes, and lists a shortlist. Once you pick one, it imports it into your project's `strategies/` folder under the strategy's class name and tells you that name, so you can backtest it right away.

Importing needs a `LICENSE_API_TOKEN` in your project's `.env` file (create one on the [API Tokens](https://jesse.trade/user/api-tokens) page), and premium strategies also need a Premium plan. If either is missing, or you already have a strategy with the same name, the assistant tells you instead of changing anything.

## Example — “Try a strategy idea and show me what happened”

Example message:

```text
I trade DOGE on Binance Perpetual Futures. Sketch a simple long-only trend idea, test it over the last couple of years, try a few small improvements, and leave me a short write-up of what you tried.
```

You might end up with **strategy code** in your Jesse project’s `strategies/` folder and a **short Markdown write-up** under `strategies/<StrategyName>/reports/` so you can reread the story later—not only the chat tab. Jesse saves both through MCP, so they end up in your Jesse project even if your assistant runs on another computer.

Here is **one possible shape** of the strategy code (example only—not trading advice):

```python
from jesse.strategies import Strategy
import jesse.indicators as ta
from jesse import utils


class DOGEUSDTSharpeHunter2026(Strategy):
    def _signals(self):
        fast = ta.ema(self.candles, period=21)
        slow = ta.ema(self.candles, period=55)
        adx = ta.adx(self.candles, period=14)
        rsi = ta.rsi(self.candles, period=14)
        atr = ta.atr(self.candles, period=14)
        return fast, slow, adx, rsi, atr

    def should_long(self) -> bool:
        if len(self.candles) < 60:
            return False
        fast, slow, adx, rsi, _ = self._signals()
        return fast > slow and adx > 20 and rsi > 52 and rsi < 72

    def should_short(self) -> bool:
        return False

    def go_long(self):
        _, _, _, _, atr = self._signals()
        qty = utils.size_to_qty(self.available_margin * 0.06, self.price, fee_rate=self.fee_rate)
        self.buy = qty, self.price
        self.stop_loss = qty, self.price - (1.3 * atr)
        self.take_profit = qty, self.price + (3.5 * atr)

    def go_short(self):
        pass

    def should_cancel_entry(self) -> bool:
        return False

    def update_position(self):
        fast, slow, _, _, _ = self._signals()
        if self.is_long and fast < slow:
            self.liquidate()
```

The write-up might simply answer: what was the goal, what changed each try, which version looked best, and what you could try next—even when the “perfect” result never shows up. **That is still useful.**

## Example — “Is this entry signal any good?”

Example message:

```text
Before we build the full strategy, just test the entry rule for me:
"Buy BTC-USDT 4h on Binance Perpetual Futures when RSI(14) crosses below 30."
Run a Rule Significance Test from 2022 to 2024 with 2,000 simulations and tell
me whether the p-value is low enough to be worth pursuing.
```

The assistant wraps that rule in a **minimal strategy** (entry only, no exit
tuning), stages a **Rule Significance Test** through Jesse, fires it, polls
until it’s done, and reports back the `p_value`, `observed_mean`, and
`annualized_return`. A p-value **below 0.05** supports a next-bar entry edge,
**0.05 to 0.10** is borderline, and **above 0.10** shows no reliable edge. You
can then decide together whether to refine the idea or move on—**before**
sinking time into a full backtest pass.

The assistant runs this test only when you ask for it. A plain request to
build, backtest, or optimize a strategy goes ahead without it.

## Before you connect

First, **[connect your AI assistant](/docs/mcp/setup)** and load the **[agent rules](/docs/mcp/mcp-rules)** in its workspace. Then try one of the prompts above.
