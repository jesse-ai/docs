# MCP agent rules (system prompt)

Jesse ships a **single canonical prompt** for AI assistants that use the Jesse MCP server: the **`mcp-rules.md`** file inside your project. It defines role, tool-only actions, which `jesse://` resources to prefer, code standards, mandatory optimization reports, candle import reconnect rules, and backtest defaults.

Treat that file as **system-level instructions** so the model does not improvise file edits or shell actions outside MCP, and so behavior stays aligned with Jesse’s tools and resources.

---

## Where the file lives

| What to look for | Purpose |
|----------|---------|
| **`mcp-rules.md`** | Canonical rules text shipped with your Jesse project. Keep it in version control with the rest of the project. |

---

## Apply once: use it as system / project rules

You want the client to **inject this text automatically** (not paste it into every message).

### Cursor

1. **Project rules (recommended)**  
   - Create **`.cursor/rules/`** at the repository root if needed.  
   - Add a rule file, for example **`jesse-mcp.mdc`**.  
   - At the top of the file, use YAML front matter so the rule applies without `@`-mentioning it each time:

```mdc
---
description: Jesse MCP — use only MCP tools for Jesse strategy, backtests, candles, and config
alwaysApply: true
---
```

   - **Below the `---`**, paste the **entire** contents of your project’s **`mcp-rules.md`**.

2. **Per-thread context (optional)**  
   You can use Cursor’s **@** menu to attach **`mcp-rules.md`** from your project when you do not use `alwaysApply`, but you must do that each time—project rules avoid that.

3. **User-wide rules**  
   Cursor also supports **global** rules under **Settings → Rules**. Use that only if you want the same behavior in every workspace on this machine; prefer **project** rules so teammates get the same file from git.

Cursor’s UI and field names change between releases; see **[Cursor — Rules](https://cursor.com/docs/context/rules)** for the latest steps.

### VS Code (GitHub Copilot + MCP)

1. Add **`.github/copilot-instructions.md`** at the repo root (workspace-scoped instructions for Copilot).  
2. Paste the full contents of your project’s **`mcp-rules.md`** into that file (or add a **“Jesse MCP”** section and paste under it).  
3. Reload the window or start a new chat so Copilot picks up changes.

See Microsoft’s guide: **[Customize Copilot in VS Code](https://code.visualstudio.com/docs/copilot/copilot-customization)** (look for *instructions* / *custom instructions* for your version).

### Other MCP clients

Use whatever your client calls **system prompt**, **project instructions**, or **saved persona**: paste the same text from your project’s **`mcp-rules.md`**. Keeping a copy in the repo (or generating your client config from it) avoids drift.
