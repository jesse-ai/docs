# Jesse MCP — connect in Zed

Make sure Jesse is running and your **`.env`** is set up so the MCP server starts and prints a URL (see **[MCP server setup](/docs/mcp/setup)** if you have not done that yet).

These steps assume you use Zed with MCP support. Jesse exposes a running HTTP MCP server, so use Zed’s **Remote** custom server mode when available.

## Register Jesse in Zed

1. Open the Agent Panel menu.
2. Choose **Add Custom Server...**.
3. Select **Remote**.
4. Set the server name to `jesse`.
5. Use the URL Jesse printed in the terminal. It should end with **`/mcp`** (often `http://localhost:9002/mcp` unless you changed **`MCP_PORT`**).
6. Leave headers or authentication fields empty unless your Zed version explicitly requires them.
7. Save the server.

If something fails, turn on **`MCP_LOG_IN_TERMINAL`** in `.env` while you debug—see [Environment variables for MCP](/docs/mcp/setup#environment-variables-for-mcp).

## Settings JSON

Zed stores MCP servers under **`context_servers`**. The equivalent settings entry is:

```json
{
  "context_servers": {
    "jesse": {
      "url": "http://localhost:9002/mcp"
    }
  }
}
```

If you changed **`MCP_PORT`**, use that port in the URL instead.

## Local fallback

If your Zed version prompts for OAuth on the Remote setup or cannot connect directly to Jesse’s HTTP endpoint, use the **Local** tab with `mcp-remote` as a STDIO bridge:

```json
{
  "context_servers": {
    "jesse": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "http://localhost:9002/mcp"],
      "env": {}
    }
  }
}
```

This fallback requires Node.js and `npx`.

## Agent rules (optional but recommended)

Jesse automatically writes and maintains **`AGENTS.md`** at the project root every time you run `jesse run`, so Zed can read the rules without you pasting anything. See **[MCP agent rules](/docs/mcp/mcp-rules)** for details on what's in the file, how the auto-sync works, and how to add your own notes without losing them on upgrade.

## Test the connection

After saving the MCP server, ask Zed:

```text
Use the Jesse MCP server and list the available tools.
```

If Zed cannot find the server, confirm Jesse is still running and that the URL matches the terminal output. Zed’s Agent Panel settings view also shows whether each context server is active.

- **[Zed — Model Context Protocol](https://zed.dev/docs/ai/mcp)**

::: tip Same machine, same network story
If Zed runs on **Windows** and Jesse runs inside **WSL** (or the other way around), **localhost** can refer to different machines. If you see connection errors, run Jesse and Zed in the same environment so they share one loopback network.
:::
