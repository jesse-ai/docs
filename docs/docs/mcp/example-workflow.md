---
pageClass: mcp-example-workflow
---

# Example workflow

You do **not** need to be a developer to get value from Jesse MCP. Think of it as **chatting with a helper that is allowed to press the same buttons you would in Jesse**—through a safe channel—instead of you clicking everything yourself.

## What your assistant can help with

In plain language, a connected assistant can usually help you **run and read backtests**, **run optimization sessions**, **fine-tune strategy parameters**, **run Monte Carlo analysis**, **spot overfitting risks**, **tweak or draft a strategy**, **find and import community strategies from jesse.trade**, and **adjust Jesse settings** (like routes), always **through Jesse** rather than by hand-editing random files on your computer. The goal is to handle research work that would otherwise take hours of manual testing and comparison.

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
