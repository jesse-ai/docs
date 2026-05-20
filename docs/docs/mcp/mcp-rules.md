# MCP agent rules

Jesse ships a **single canonical prompt** for AI assistants that use the Jesse MCP server: the **`mcp-rules.md`** file inside your project. It defines role, tool-only actions, which `jesse://` resources to prefer, code standards, mandatory optimization reports, candle import reconnect rules, and backtest defaults.

Use that file as your agent instructions so the model does not improvise file edits or shell actions outside MCP, and so behavior stays aligned with Jesse’s tools and resources.

## Recommended setup

After MCP is installed, rename **`mcp-rules.md`** to **`AGENTS.md`** at the root of your Jesse project.

**`AGENTS.md`** is the standard project-instructions file that coding agents can pick up automatically. Keep it in version control with the rest of your project.

If your assistant does not read **`AGENTS.md`**, copy the same contents into that tool’s own project-instructions file.

### Cursor

Cursor can read project instructions from **`AGENTS.md`**. If your Cursor version or workspace setup does not pick it up, use a Cursor project rule:

1. Create **`.cursor/rules/`** at the repository root if needed.
2. Add a rule file, for example **`mcp.mdc`**.
3. At the top of the file, use YAML front matter so the rule applies automatically:

```mdc
---
description: Jesse MCP — use only MCP tools for Jesse strategy, backtests, candles, and config
alwaysApply: true
---
```

4. Below the `---`, paste the entire contents of **`AGENTS.md`**.

Cursor also supports **global** rules under **Settings → Rules**. Use that only if you want the same behavior in every workspace on this machine; prefer project-level instructions so teammates get the same file from git.

Cursor’s UI and field names change between releases; see **[Cursor — Rules](https://cursor.com/docs/context/rules)** for the latest steps.

### VS Code (GitHub Copilot + MCP)

If your Copilot setup does not read **`AGENTS.md`**, add **`.github/copilot-instructions.md`** at the repo root and paste the same contents there. Reload the window or start a new chat so Copilot picks up changes.

See Microsoft’s guide: **[Customize Copilot in VS Code](https://code.visualstudio.com/docs/copilot/copilot-customization)** (look for *instructions* / *custom instructions* for your version).

### Other MCP clients

Use **`AGENTS.md`** when your client supports it. Otherwise, use whatever your client calls **system prompt**, **project instructions**, or **saved persona**, and paste the same text there.
