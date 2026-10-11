# Jesse MCP — connect in Cursor

Keep Jesse running and open its dashboard. The **[connection guide](/docs/mcp/setup)** shows where to find the ready-made setup for your assistant.

## Register Jesse in Cursor

### Copy the configuration from the dashboard (recommended)

1. In the Jesse dashboard, open **More options** (**⋮**) at the bottom of the sidebar, click **AI Assistants**, and choose **Cursor**.
2. Click **Copy mcp.json** and paste it into your user-level **`~/.cursor/mcp.json`**. If the file already lists servers, add only the `jesse` entry inside `mcpServers`.
3. Restart Cursor if it does not pick up the new server right away.

The copied configuration already contains your MCP address and token (see the note about plain-text storage below).

### Manual setup

For this manual alternative, copy your token from **AI Assistants → Manual connection details**. See **[Manual authentication](/docs/mcp/setup#authentication)** for terminal-based setup.

Exact labels change as Cursor updates, but the flow is usually:

1. Open **Settings** and find **MCP**, **Tools & MCP**, or similar.
2. **Add a server** (or equivalent) and paste the address Jesse printed in the terminal. It ends with **`/mcp`** and is `http://localhost:9000/mcp` by default, or `<DASHBOARD_URL>/mcp` when Jesse runs on another machine (for example `http://192.168.1.20:9000/mcp`).
3. Under **HTTP headers**, add a header named **`Authorization`** with the value **`Bearer <your MCP token>`**. Jesse uses a static token, not OAuth; do not use an OAuth or “Authenticate” option for Jesse.
4. Save, then **restart Cursor** if it does not pick up the new server right away.

The equivalent entry in Cursor’s **`mcp.json`** is:

```json
{
  "mcpServers": {
    "jesse": {
      "url": "http://localhost:9000/mcp",
      "headers": {
        "Authorization": "Bearer <your MCP token>"
      }
    }
  }
}
```

Cursor stores the header value in plain text. Prefer your user-level `~/.cursor/mcp.json` over a project `.cursor/mcp.json`, and never commit a file that contains the token.


If something fails, turn on **`MCP_LOG_IN_TERMINAL`** in `.env` while you debug—see [Environment variables for MCP](/docs/mcp/setup#environment-variables-for-mcp).

## Agent rules (optional but recommended)

Jesse automatically writes and maintains **`AGENTS.md`** at the project root every time you run `jesse run`, so Cursor can read the rules without you pasting anything when it works in that project folder. See **[MCP agent rules](/docs/mcp/mcp-rules)** for details on what's in the file, how the auto-sync works, how to add your own notes without losing them on upgrade, and what to do when [Cursor runs on another computer](/docs/mcp/mcp-rules#assistant-on-another-computer).


- **[MCP in Cursor](https://cursor.com/docs/context/mcp)**
- **[MCP integrations (help)](https://cursor.com/help/customization/mcp)**

::: tip Same machine, same network story
If Cursor runs on **Windows** and Jesse runs inside **WSL** (or the other way around), **localhost** can refer to different machines. If you see connection errors, check Cursor’s docs for **WSL** or **remote** MCP setup, or run Jesse and Cursor in the same environment so they share one loopback network.
:::
