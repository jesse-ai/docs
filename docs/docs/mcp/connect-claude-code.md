# Jesse MCP — connect in Claude Code

Make sure Jesse is running and your **`.env`** is set up so the MCP server starts and prints a URL (see **[MCP server setup](/docs/mcp/setup)** if you have not done that yet).

These steps work for both the **Claude Code CLI** and the **Code tab in Claude Code Desktop**. Jesse exposes a running **Streamable HTTP** MCP server; Claude Code does not need to launch Jesse with a STDIO command.

## Register Jesse in Claude Code

Run this command in your terminal:

```sh
claude mcp add --transport http jesse-mcp http://localhost:9002/mcp
```

If you changed **`MCP_PORT`**, use that port in the URL instead. The URL should match the MCP address printed by Jesse and should end with **`/mcp`**.

Claude Code Desktop reads the same MCP configuration files as the CLI, so running this command also makes the server available in the desktop app's Code tab. If the server does not appear there right away, restart Claude Code Desktop.

::: warning Claude Desktop chat app is separate
MCP servers configured for the regular Claude Desktop chat app through **`claude_desktop_config.json`** are separate from Claude Code. For Claude Code, use the command above or configure **`~/.claude.json`** / **`.mcp.json`**.
:::

If something fails, turn on **`MCP_LOG_IN_TERMINAL`** in `.env` while you debug—see [Environment variables for MCP](/docs/mcp/setup#environment-variables-for-mcp).

## Agent rules (optional but recommended)

So Claude Code does not need the same instructions pasted every time, rename **`mcp-rules.md`** to **`AGENTS.md`** at the project root, as described in **[MCP agent rules](/docs/mcp/mcp-rules)**.

## Test the connection

After adding the MCP server, start Claude Code in the same project and run:

```text
/mcp
```

The MCP panel should show **`jesse-mcp`** and the tools exposed by Jesse. You can also confirm the server was saved from your regular terminal:

```sh
claude mcp list
```

Then ask Claude Code:

```text
Use the Jesse MCP server and list the available tools.
```

If Claude Code cannot find the server, confirm Jesse is still running and that the URL matches the terminal output.

::: tip Same machine, same network story
If Claude Code runs on **Windows** and Jesse runs inside **WSL** (or the other way around), **localhost** can refer to different machines. If you see connection errors, run Jesse and Claude Code in the same environment so they share one loopback network.
:::
