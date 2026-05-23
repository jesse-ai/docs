# MCP server setup

For what MCP is and how it fits your workflow, read the **[Introduction](/docs/mcp/)** first. This page covers prerequisites, environment variables, logs, how to hook up your AI tool at a high level (with links to **[Connect in Codex](/docs/mcp/connect-codex)**, **[Connect in Claude Code](/docs/mcp/connect-claude-code)**, **[Connect in Cursor](/docs/mcp/connect-cursor)**, **[Connect in VS Code](/docs/mcp/connect-vscode)**, and **[Connect in Zed](/docs/mcp/connect-zed)**), and safety. After MCP is running, configure your assistant with **[MCP agent rules](/docs/mcp/mcp-rules)** so it follows Jesse’s MCP workflow automatically.

## Before you start

- **Jesse must be running** in your project so the dashboard and API are alive. MCP is an add-on to that, not a separate cloud service.
- By default the MCP service uses a dedicated **port** (commonly **9002** unless you change it). If something else on your machine already uses that port, set a different one in `.env`—see **[Environment variables for MCP](#environment-variables-for-mcp)** below for the variable name, default, and a copy-pastable example.

When MCP starts successfully, your terminal usually prints a clear line that includes the **address** you should give to your AI tool.

## Environment variables for MCP

Add these to your project **`.env`** file (alongside your other Jesse settings). **Restart Jesse** after you change them so the MCP process picks up new values.

| Variable | Required for MCP? | Default | What it does |
| --- | --- | --- | --- |
| **`MCP_PORT`** | No | **`9002`** | TCP port for the local MCP HTTP server. Set a different port if something else on your machine already uses **9002**. |
| **`MCP_LOG_IN_TERMINAL`** | No | on (`true`) | Detailed MCP log lines appear in the same terminal where you started Jesse. Set to **`false`** if you want a quieter terminal. |

Example **`.env`** fragment (use your real dashboard password; uncomment optional lines only when you need them):

```sh
# Optional — omit both to use defaults (port 9002, MCP logs enabled)
# MCP_PORT=9002
# MCP_LOG_IN_TERMINAL=true
```

With default settings, the URL you give your assistant is **`http://localhost:9002/mcp`**. If you set **`MCP_PORT`**, use that port in the URL instead.

The MCP server binds to **`0.0.0.0`**, matching Jesse's dashboard server. This works with Docker port publishing and local-network access when your machine and firewall allow it.

For Docker access from outside the container, make sure the Docker compose file publishes **`9002:9002`** or your chosen MCP port. For access from another machine on your LAN, use the Docker host machine's LAN IP address in your assistant instead of **`localhost`**.

## Hiding MCP logs in the terminal

By default, detailed MCP logs are shown in your Jesse terminal. If you prefer a quieter terminal once your connection is stable, set **`MCP_LOG_IN_TERMINAL`** to **`false`** in your **`.env`** file and restart Jesse.

## Connecting an assistant

Exact menus change as products update, but the Jesse side is always: start Jesse, confirm the terminal shows an MCP URL ending in **`/mcp`**, then register that URL in your editor or assistant under its MCP / tools settings.

When Jesse starts successfully, your terminal will look like this:

```
     ██╗███████╗███████╗███████╗███████╗
     ██║██╔════╝██╔════╝██╔════╝██╔════╝
     ██║█████╗  ███████╗███████╗█████╗
██   ██║██╔══╝  ╚════██║╚════██║██╔══╝
╚█████╔╝███████╗███████║███████║███████╗
 ╚════╝ ╚══════╝╚══════╝╚══════╝╚══════╝


  Jesse v1.13.8  ·  Live Plugin v2.1.2

Checking for new database migrations...

Starting Python Language Server...
LSP WS started at ws://localhost:9002/lsp

┌───────────────────────────────────────────────────────┐
│  ⬡ Dashboard is available at http://localhost:9001  │
└───────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  ✓ MCP Server is running at http://localhost:9002/mcp  │
└─────────────────────────────────────────────────────────┘

INFO:     Started server process [89370]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

The MCP URL to use is the one printed in the second box — `http://localhost:9002/mcp` by default.

1. Open your tool’s **settings** (or MCP server list) and find where **MCP servers** are configured.
2. **Add a server** using the address Jesse printed (same machine as Jesse unless you deliberately use another host).
3. Save, then **restart** the tool if it does not pick up the new server right away.

**Step-by-step for common tools:**

- **[Connect in Codex](/docs/mcp/connect-codex)** — Codex custom MCP settings, Streamable HTTP, testing the connection.
- **[Connect in Claude Code](/docs/mcp/connect-claude-code)** — Claude Code CLI command for adding Jesse as an HTTP MCP server.
- **[Connect in Cursor](/docs/mcp/connect-cursor)** — Cursor settings, official docs, WSL note.
- **[Connect in VS Code](/docs/mcp/connect-vscode)** — GitHub Copilot MCP, Microsoft’s VS Code guide, WSL note.
- **[Connect in Zed](/docs/mcp/connect-zed)** — Zed custom MCP server, Remote setup, local fallback.

::: tip Same machine, same network story
If your assistant runs on **Windows** and Jesse runs inside **WSL** (or the other way around), “localhost” can mean different things on each side. If connection errors appear, use the WSL tips on the Cursor or VS Code page above, or run Jesse and the assistant in the same environment so they share one loopback network.
:::

## Troubleshooting

If something fails to connect, confirm Jesse is running, confirm the printed MCP address matches what you entered, then use your AI tool’s **MCP logs** or the [Showing MCP logs in the terminal](#showing-mcp-logs-in-the-terminal) section above to narrow it down—most issues are address, port, or “Jesse not running yet.”
