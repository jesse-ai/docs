# Jesse MCP — connect in Zed

Keep Jesse running and open its dashboard. The **[connection guide](/docs/mcp/setup)** shows where to find the ready-made setup for your assistant.

These steps assume you use Zed with MCP support. Jesse exposes a running HTTP MCP server, so use Zed’s **Remote** custom server mode when available.

## Register Jesse in Zed

### Copy the settings from the dashboard (recommended)

1. In the Jesse dashboard, open **More options** (**⋮**) at the bottom of the sidebar, click **AI Assistants**, and choose **Zed**.
2. Click **Copy settings entry**, open your Zed settings file (**zed: open settings file**), and add the `jesse` entry under `context_servers`. If `context_servers` does not exist yet, paste the whole block inside the top-level braces.
3. Check the Agent Panel settings to confirm the server is active.

The copied entry already contains your MCP address and token; it is the same entry shown under **[Settings JSON](#settings-json)** below.

### Manual setup

For this manual alternative, copy your token from **AI Assistants → Manual connection details**. See **[Manual authentication](/docs/mcp/setup#authentication)** for terminal-based setup.

1. Open the Agent Panel menu.
2. Choose **Add Custom Server...**.
3. Select **Remote**.
4. Set the server name to `jesse`.
5. Use the URL Jesse printed in the terminal. It ends with **`/mcp`** and is `http://localhost:9000/mcp` by default, or `<DASHBOARD_URL>/mcp` when Jesse runs on another machine (for example `http://192.168.1.20:9000/mcp`).
6. Add a header named **`Authorization`** with the value **`Bearer <your MCP token>`**. Jesse uses a static token, not OAuth; do not use an OAuth sign-in for Jesse.
7. Save the server.

If something fails, turn on **`MCP_LOG_IN_TERMINAL`** in `.env` while you debug—see [Environment variables for MCP](/docs/mcp/setup#environment-variables-for-mcp).

## Settings JSON

Zed stores MCP servers under **`context_servers`**. The equivalent settings entry is:

```json
{
  "context_servers": {
    "jesse": {
      "url": "http://localhost:9000/mcp",
      "headers": {
        "Authorization": "Bearer <your MCP token>"
      }
    }
  }
}
```

Zed stores the header value in plain text in your settings file, so never share or commit a settings file that contains it.


## Local fallback

If your Zed version cannot send headers to a Remote server or cannot connect directly to Jesse’s HTTP endpoint, use the **Local** tab with [`mcp-remote`](https://github.com/geelen/mcp-remote) as a STDIO bridge:

```json
{
  "context_servers": {
    "jesse": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "http://localhost:9000/mcp", "--allow-http", "--header", "Authorization:${JESSE_MCP_AUTH}"],
      "env": {
        "JESSE_MCP_AUTH": "Bearer <your MCP token>"
      }
    }
  }
}
```

- `mcp-remote` replaces `${JESSE_MCP_AUTH}` with the value from `env`. Writing the header as `Authorization:${…}` without a space follows `mcp-remote`’s own recommendation, because spaces inside `args` can be mangled on some platforms.
- `--allow-http` is required for plain `http://` addresses. Keep it only on a network you trust, and remove it when your MCP address starts with `https://`.
- The token is stored in plain text in your Zed settings, so never share or commit a settings file that contains it.

This fallback requires Node.js and `npx`.

## Agent rules (optional but recommended)

Jesse automatically writes and maintains **`AGENTS.md`** at the project root every time you run `jesse run`, so Zed can read the rules without you pasting anything when it works in that project folder. See **[MCP agent rules](/docs/mcp/mcp-rules)** for details on what's in the file, how the auto-sync works, how to add your own notes without losing them on upgrade, and what to do when [Zed runs on another computer](/docs/mcp/mcp-rules#assistant-on-another-computer).

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
