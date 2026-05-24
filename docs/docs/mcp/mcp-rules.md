# MCP agent rules

Jesse ships a **single canonical prompt** for AI assistants that use the Jesse MCP server: the **`mcp-rules.md`** file inside your project. It defines role, tool-only actions, which `jesse://` resources to prefer, code standards, mandatory optimization reports, candle import reconnect rules, and backtest defaults.

Starting with the recent versions of Jesse, **you don't need to copy, rename, or maintain this file by hand**. Every time you run `jesse run`, Jesse writes (or refreshes) **`AGENTS.md`** at the root of your project so your assistant always sees the rules that match your installed Jesse version.

## How it works

When you run `jesse run`, Jesse looks in your project directory for an agent rules file in this order:

1. **`AGENTS.md`** — the cross-tool standard (Cursor, Claude Code, Codex, Zed, and others read this automatically).
2. **`CLAUDE.md`**
3. **`mcp-rules.md`** — the legacy name used by older Jesse projects.

- **If none of these exist**, Jesse creates **`AGENTS.md`** with the current rules.
- **If one of them exists**, Jesse keeps it in sync with the bundled rules — see below for the exact behavior.

You then point your AI tool at this file (most modern tools pick up `AGENTS.md` automatically; see the per-tool notes further down).

## Managed section markers

Jesse only edits the content **between** these two markers in your rules file:

```md
<!-- JESSE-RULES-START v1.13.8 -->
...rules body, version-pinned to the installed Jesse version...
<!-- JESSE-RULES-END -->
```

Anything **outside** the markers is yours and will never be touched by Jesse. This is the right place to add your own project-specific notes — house style for strategy naming, a list of preferred exchanges, etc. For example:

```md
# My project notes
Always use BTC-USDT on Binance Spot for the first iteration.

<!-- JESSE-RULES-START v1.13.8 -->
...Jesse-managed rules go here, refreshed automatically...
<!-- JESSE-RULES-END -->

# Other agent reminders
Keep weekly reports under `notes/reviews/`.
```

When Jesse upgrades and you run `jesse run`, only the block between the markers is rewritten. Your prelude and tail stay intact.

## Migration from older Jesse versions

If your project already contains an `mcp-rules.md` or `AGENTS.md` that you copied from an older Jesse release (no markers yet), Jesse will detect it on the next `jesse run` and rewrap it in the new marker format automatically. There is nothing for you to do.

If you've **heavily customized** the file (it no longer starts with Jesse's standard opening) and there are no markers, Jesse leaves it alone and prints a one-line warning suggesting you wrap your Jesse section in the markers shown above. Once you do, future `jesse run` calls will keep the wrapped block in sync.

## Opting out

If for any reason you want Jesse to stop touching the rules file, run:

```sh
jesse run --skip-agent-rules
```

Jesse won't read, create, or modify the file for that session.

## Per-tool notes

Most modern AI tools read **`AGENTS.md`** at the project root automatically. The notes below cover the edge cases.

### Cursor

Cursor reads **`AGENTS.md`** in recent versions. If your Cursor version or workspace setup does not pick it up, use a Cursor project rule:

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

Because Jesse keeps `AGENTS.md` updated automatically, you will need to re-sync your Cursor rule whenever you upgrade Jesse — or simply rely on `AGENTS.md` being read directly if your Cursor version supports it.

Cursor also supports **global** rules under **Settings → Rules**. Use that only if you want the same behavior in every workspace on this machine; prefer project-level instructions so teammates get the same file from git.

Cursor's UI and field names change between releases; see **[Cursor — Rules](https://cursor.com/docs/context/rules)** for the latest steps.

### VS Code (GitHub Copilot + MCP)

If your Copilot setup does not read **`AGENTS.md`**, add **`.github/copilot-instructions.md`** at the repo root and paste the same contents there. Reload the window or start a new chat so Copilot picks up changes.

See Microsoft's guide: **[Customize Copilot in VS Code](https://code.visualstudio.com/docs/copilot/copilot-customization)** (look for *instructions* / *custom instructions* for your version).

### Other MCP clients

Use **`AGENTS.md`** when your client supports it. Otherwise, use whatever your client calls **system prompt**, **project instructions**, or **saved persona**, and paste the same text there.

## Should I commit AGENTS.md?

Yes. `AGENTS.md` is project-level configuration — committing it means teammates, CI, and any agent your team uses see the same rules. Jesse will refresh the managed block on the next `jesse run` if the bundled version differs from what's checked in, and the diff will be clean (only the version number and any rule changes), making upgrades easy to review in pull requests.
