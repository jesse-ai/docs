# Jesse MCP — connect in VS Code

Keep Jesse running and open its dashboard. The **[connection guide](/docs/mcp/setup)** shows where to find the ready-made setup for your assistant.

These steps assume you use **VS Code** with **GitHub Copilot** features that support MCP (product names and menus change over time).

## Register Jesse in VS Code

### Copy the configuration from the dashboard (recommended)

1. In the Jesse dashboard, open **More options** (**⋮**) at the bottom of the sidebar, click **AI Assistants**, and choose **VS Code**.
2. Click **Copy mcp.json**, run **MCP: Open User Configuration** from the Command Palette, and paste it. If the file already has entries, merge `inputs` and `servers`.
3. Start the server. When VS Code asks for **Jesse MCP token**, click **Copy token** in the panel’s VS Code steps and paste it.

The copied configuration contains your MCP address but not the token: VS Code prompts for the token once and keeps it in its secure storage, as shown below.

### Manual setup

For this manual alternative, copy your token from **AI Assistants → Manual connection details**. See **[Manual authentication](/docs/mcp/setup#authentication)** for terminal-based setup.

VS Code can prompt for the token once and keep it in its secure storage instead of in a file. Open the MCP configuration (**`.vscode/mcp.json`** in your workspace, or the user-level MCP configuration from the Command Palette) and add:

```json
{
  "inputs": [
    {
      "type": "promptString",
      "id": "jesse-mcp-token",
      "description": "Jesse MCP token",
      "password": true
    }
  ],
  "servers": {
    "jesse": {
      "type": "http",
      "url": "http://localhost:9000/mcp",
      "headers": {
        "Authorization": "Bearer ${input:jesse-mcp-token}"
      }
    }
  }
}
```

1. Use the URL Jesse printed in the terminal. It ends with **`/mcp`** and is `http://localhost:9000/mcp` by default, or `<DASHBOARD_URL>/mcp` when Jesse runs on another machine (for example `http://192.168.1.20:9000/mcp`).
2. Start the server from the MCP view or the **Start** action above the entry. When VS Code asks for **Jesse MCP token**, paste the token.
3. **Reload VS Code** if the server does not appear.

Jesse uses a static token, not OAuth. If VS Code offers to authenticate the server, check the token instead. If you change your Jesse **`PASSWORD`**, clear the saved input (for example by editing the server’s inputs from the MCP view) and enter the new token.


If something fails, turn on **`MCP_LOG_IN_TERMINAL`** in `.env` while you debug—see [Environment variables for MCP](/docs/mcp/setup#environment-variables-for-mcp).

## Agent rules (optional but recommended)

Jesse automatically writes and maintains **`AGENTS.md`** at the project root every time you run `jesse run`. If your Copilot setup reads `AGENTS.md` you are done; otherwise copy the same contents into **`.github/copilot-instructions.md`**. This works when VS Code has the Jesse project folder open. See **[MCP agent rules](/docs/mcp/mcp-rules)** for details on the auto-sync, how to add your own notes without losing them on upgrade, and what to do when [VS Code runs on another computer](/docs/mcp/mcp-rules#assistant-on-another-computer).


- **[Add and manage MCP servers in VS Code](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)**

::: tip Same machine, same network story
If VS Code runs on **Windows** and Jesse runs inside **WSL** (or the other way around), **localhost** can refer to different machines. If you see connection errors, check Microsoft’s docs and VS Code **remote** / **WSL** guidance, or run Jesse and VS Code in the same environment so they share one loopback network.
:::
