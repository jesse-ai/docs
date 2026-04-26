# MCP server setup

For what MCP is and how it fits your workflow, read the **[Introduction](/docs/jesse-mcp/)** first. This page covers prerequisites, environment variables, logs, how to hook up your AI tool at a high level (with links to **[Connect in Cursor](/docs/jesse-mcp/connect-cursor)** and **[Connect in VS Code](/docs/jesse-mcp/connect-vscode)**), and safety.

---

## Before you start

- **Jesse must be running** in your project so the dashboard and API are alive. MCP is an add-on to that, not a separate cloud service.
- Your project **`.env` file needs a `PASSWORD`** (the same admin password Jesse already uses). Without it, the MCP side will not start.
- By default the MCP service uses a dedicated **port** (commonly **9002** unless you change it). If something else on your machine already uses that port, set a different one in `.env`—see **[Environment variables for MCP](#environment-variables-for-mcp)** below for the variable name, default, and a copy-pastable example.

When MCP starts successfully, your terminal usually prints a clear line that includes the **address** you should give to your AI tool.

---

## Environment variables for MCP

Add these to your project **`.env`** file (alongside your other Jesse settings). **Restart Jesse** after you change them so the MCP process picks up new values.

| Variable | Required for MCP? | Default | What it does |
| --- | --- | --- | --- |
| **`PASSWORD`** | Yes | — | Same admin password Jesse uses for the dashboard and API. The MCP channel authenticates with this value; without it, MCP will not start. |
| **`MCP_PORT`** | No | **`9002`** | TCP port for the local MCP HTTP server. Set a different port if something else on your machine already uses **9002**. |
| **`MCP_LOG_IN_TERMINAL`** | No | off (`false`) | Set to **`true`** so detailed MCP log lines appear in the same terminal where you started Jesse (helpful while connecting or debugging an assistant). Use **`false`** or leave unset for a quieter terminal. |

Example **`.env`** fragment (use your real dashboard password; uncomment optional lines only when you need them):

```sh
# Required for Jesse and MCP
PASSWORD=your-secure-password

# Optional — omit both to use defaults (port 9002, quiet MCP logs)
# MCP_PORT=9002
# MCP_LOG_IN_TERMINAL=true
```

With default settings, the URL you give your assistant is **`http://localhost:9002/mcp`**. If you set **`MCP_PORT`**, use that port in the URL instead.

---

## Showing MCP logs in the terminal

By default, detailed MCP logs may be kept quiet so your Jesse terminal stays easy to read. If you are **setting up or troubleshooting** a connection to Cursor or another client, you can turn on MCP log output in the same terminal where Jesse runs.

In your **`.env`** file, set **`MCP_LOG_IN_TERMINAL`** to **`true`** as described in [Environment variables for MCP](#environment-variables-for-mcp). Restart Jesse after you change it. Turn it off again when you no longer need the extra noise.

---

## Connecting an assistant

Exact menus change as products update, but the Jesse side is always: start Jesse, confirm the terminal shows an MCP URL ending in **`/mcp`**, then register that URL in your editor or assistant under its MCP / tools settings.

1. Open your tool’s **settings** (or MCP server list) and find where **MCP servers** are configured.
2. **Add a server** using the address Jesse printed (same machine as Jesse unless you deliberately use another host).
3. Save, then **restart** the tool if it does not pick up the new server right away.

**Step-by-step for common tools:**

- **[Connect in Cursor](/docs/jesse-mcp/connect-cursor)** — Cursor settings, official docs, WSL note.
- **[Connect in VS Code](/docs/jesse-mcp/connect-vscode)** — GitHub Copilot MCP, Microsoft’s VS Code guide, WSL note.

::: tip Same machine, same network story
If your assistant runs on **Windows** and Jesse runs inside **WSL** (or the other way around), “localhost” can mean different things on each side. If connection errors appear, use the WSL tips on the Cursor or VS Code page above, or run Jesse and the assistant in the same environment so they share one loopback network.
:::

---

## Privacy and safety

- MCP connects **your assistant** to **your Jesse instance**. It is not a public Jesse cloud.
- Treat MCP like any powerful integration: use **strong passwords**, keep your project **private**, and only enable assistants and plugins you **trust**.
- Review what your AI tool is about to do when it asks for approval—especially for actions that change strategies or data.

---

## Troubleshooting

If something fails to connect, confirm Jesse is running, confirm the printed MCP address matches what you entered, then use your AI tool’s **MCP logs** or the [Showing MCP logs in the terminal](#showing-mcp-logs-in-the-terminal) section above to narrow it down—most issues are address, port, or “Jesse not running yet.”
