# Introduction

Today’s coding assistants can do more than suggest text in the editor. When they are **connected to Jesse**, they can help you work with strategies, backtests, candle data, and settings in a structured way—without you jumping between the dashboard, files, and notes as often.

This section explains what that connection is, how it helps, and why you might use it. **Turning it on**—environment variables, logs, connecting your assistant, and safety—is covered under **[MCP server setup](/docs/mcp/setup)**, with dedicated guides for **[Connect in Codex](/docs/mcp/connect-codex)**, **[Connect in Cursor](/docs/mcp/connect-cursor)**, **[Connect in VS Code](/docs/mcp/connect-vscode)**, and **[Connect in Zed](/docs/mcp/connect-zed)**. The **[MCP agent rules](/docs/mcp/mcp-rules)** page describes how to use **`AGENTS.md`** so assistants follow Jesse’s MCP behavior on every request. For a **friendly, plain-language** idea of what to ask an assistant and two short examples, see **[Example workflow](/docs/mcp/example-workflow)**.

## What is MCP?

**MCP** stands for *Model Context Protocol*. Think of it as a **shared language** between your AI assistant (for example in Cursor, VS Code, or other tools that support MCP) and **applications you trust**, such as Jesse.

Instead of the assistant only “guessing” how Jesse works, it can **ask Jesse** to perform allowed actions and read allowed information through a controlled channel. You stay in charge: the assistant only reaches Jesse when your tools are configured to allow it, and Jesse is running on your machine.

If you would like a deeper technical overview, see the [Model Context Protocol introduction](https://modelcontextprotocol.io/introduction).

## How it works (simple picture)

1. You **start Jesse** the way you usually do for your project.
2. Jesse can start a small **MCP service** alongside the app, on your computer, using a network address and port shown in the terminal (often something like “MCP server is running at …”).
3. Your **AI tool** is pointed at that address so it knows where to talk to Jesse.
4. When you chat with the assistant, it can use **actions** exposed by Jesse (run a backtest, read a strategy, work with candle data, and similar tasks) and can pull in **short guides** Jesse ships for context—so answers line up with how Jesse actually behaves.

Everything runs **locally** in your setup: your strategies and your data under your control.

## How Jesse MCP can boost your workflow

- **Strategy work** — Describe what you want changed; the assistant can work through Jesse’s supported flows instead of you manually wiring every step.
- **Backtests** — Ask for a run or a check on a session; you spend less time clicking through the same sequences.
- **Rule significance tests** — Ask the assistant to validate a new entry signal before you commit to building a full strategy around it. Jesse runs the rule against thousands of random-entry simulations and reports whether the signal has a real edge or is indistinguishable from luck.
- **Monte Carlo simulations** — Once a backtest looks promising, ask the assistant to run a Monte Carlo and report whether the result is robust or just one lucky path. Jesse resamples the price series and re-runs the strategy hundreds of times, then surfaces the overfit verdict in plain terms.
- **Data prep** — Bring historical data up to date and check coverage with guidance when you are in a hurry.
