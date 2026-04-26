# Example workflow

You do **not** need to be a developer to get value from Jesse MCP. Think of it as **chatting with a helper that is allowed to press the same buttons you would in Jesse**—through a safe channel—instead of you clicking everything yourself.

---

## What your assistant can help with

In plain language, a connected assistant can usually help you **pull in price history**, **run and read backtests**, **tweak or draft a strategy**, and **adjust Jesse settings** (like routes), always **through Jesse** rather than by hand-editing random files on your computer. Jesse also ships **little built-in guides** the assistant can read so its answers match how *your* version of Jesse works.

You stay in the driver’s seat: if your editor asks you to approve a step, that is normal. If something is not possible through Jesse, the assistant should say so instead of guessing.

---

## Example — “Get my candles ready”

You might say something like:

> *“Import Binance Perpetual Futures candles for ETH-USDT on the 1h chart from 2023-01-01 through today, and tell me when it is done.”*

The assistant works **with** Jesse’s import flow (the same idea as the Import Candles screen). When it finishes, your project has the history it needs for backtests on that symbol and timeframe. You can still watch progress in the **Jesse dashboard** and logs like you always do.

More detail on candles: **[Import Candles](/docs/import-candles)**.

---

## Example — “Try a strategy idea and show me what happened”

You might say something like:

> *“I trade DOGE on Binance Perpetual Futures. Sketch a simple long-only trend idea, test it over the last couple of years, try a few small improvements, and leave me a short write-up of what you tried.”*

You might end up with **strategy code** in your `strategies/` folder and a **short markdown write-up** next to it (for example under a `reports/` folder) so you can reread the story later—not only the chat tab.

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

---

## Before you connect

Hook up MCP first (**[MCP server setup](/docs/jesse-mcp/setup)**), then your editor (**[Connect in Cursor](/docs/jesse-mcp/connect-cursor)** or **[Connect in VS Code](/docs/jesse-mcp/connect-vscode)**). After that, describe what you want in everyday language and go step by step.
