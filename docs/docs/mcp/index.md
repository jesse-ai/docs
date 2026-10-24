# Introduction

Today’s coding assistants can do more than suggest text in the editor. When they are **connected to Jesse**, they can help you work with strategies, backtests, candle data, and settings in a structured way—without you jumping between the dashboard, files, and notes as often.

Start with **[Connect your AI assistant](/docs/mcp/setup)** for the setup steps. Then see **[Example workflow](/docs/mcp/example-workflow)** for ideas of what to ask, and **[MCP agent rules](/docs/mcp/mcp-rules)** to help your assistant follow Jesse's workflow.

## What is MCP?

**MCP** stands for *Model Context Protocol*. Think of it as a **shared language** between your AI assistant (for example in Cursor, VS Code, or other tools that support MCP) and **applications you trust**, such as Jesse.

Instead of the assistant only “guessing” how Jesse works, it can **ask Jesse** to perform allowed actions and read allowed information through a controlled channel. You stay in charge: the assistant only reaches Jesse when your tools are configured with Jesse’s address and your MCP token, and while Jesse is running.

If you would like a deeper technical overview, see the [Model Context Protocol introduction](https://modelcontextprotocol.io/introduction).

## How it works (simple picture)

1. You **start Jesse** the way you usually do for your project.
2. Jesse starts a small **MCP service** alongside the app and serves it at `/mcp` on the dashboard address shown in the terminal (“MCP Server is running at …”).
3. Your **AI tool** is pointed at that address, together with a token derived from your Jesse password, so it knows where to talk to Jesse and Jesse knows the request is yours.
4. When you chat with the assistant, it can use **actions** exposed by Jesse (run a backtest, read a strategy, work with candle data, and similar tasks) and can pull in **short guides** Jesse ships for context—so answers line up with how Jesse actually behaves.

Jesse runs on a computer **you control**, such as your laptop or a home server, so your strategies and data stay there. Your assistant can run on the same computer or on another one that can reach the dashboard address.

## How Jesse MCP can boost your workflow

- **Strategy work** — Describe what you want changed; the assistant can work through Jesse’s supported flows instead of you manually wiring every step.
- **Backtests** — Ask for a run or a check on a session; you spend less time clicking through the same sequences.
- **Rule significance tests** — Ask the assistant to validate a new entry signal before you commit to building a full strategy around it. Jesse runs the rule against thousands of random-entry simulations and reports whether the signal has a real edge or is indistinguishable from luck.
- **Monte Carlo simulations** — Once a backtest looks promising, ask the assistant to run a Monte Carlo and report whether the result is robust or just one lucky path. Jesse resamples the price series and re-runs the strategy hundreds of times, then surfaces the overfit verdict in plain terms.
- **Optimization** — Ask the assistant to find better settings for a strategy. Jesse tries many combinations of the strategy’s parameters over one stretch of history, then checks how the best ones perform on a separate, later stretch it didn’t tune on—so you can see which settings genuinely hold up going forward, not just ones that looked good on the past.
- **Candle data** — Import and update historical data, see what is stored, copy it under another exchange or symbol, export it, and delete what you no longer need, like on the dashboard's candle pages. Exports are saved in your project's `research_scripts/candle_exports/` folder on the Jesse machine, where the assistant can read them page by page; to get a copy on your own computer, use **Export** on the Manage Candles page.
- **Live and paper trading** — With the live trading plugin, the assistant can set up live or paper sessions, start and stop them, and tell you how they are doing. It always says whether a session is paper (simulated) or live (real money), and only starts or stops one when you ask.
- **Results and charts** — Ask about the results of any backtest, optimization, Monte Carlo simulation, or significance test, and of live and paper sessions when the live trading plugin is installed, including your live trades and orders over a period such as the last 7 days. The assistant can also compare sessions and draw charts: it analyzes the results on the Jesse machine and shows you the charts in the chat. See **[Session results and analysis](/docs/mcp/setup#session-results-and-analysis)**.
- **Research scripts and models** — The assistant can write Python scripts in your project's `research_scripts/` folder, run them in the background with Jesse's research module, and copy a trained model into the strategy that uses it. Scripts run with full access to your Jesse machine; see **[Project files and research scripts](/docs/mcp/setup#project-files-and-research-scripts)**.
- **More computers** — Add spare machines as research runners, and the assistant spreads backtests, optimizations, Monte Carlo runs and significance tests across them, with all results in your main dashboard. See **[Research runners](/docs/mcp/research-runners)**.
