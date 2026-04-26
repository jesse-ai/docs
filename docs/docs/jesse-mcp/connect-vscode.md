# Jesse MCP — connect in VS Code

Make sure Jesse is running and your **`.env`** is set up so the MCP server starts and prints a URL (see **[MCP server setup](/docs/jesse-mcp/setup)** if you have not done that yet).

These steps assume you use **VS Code** with **GitHub Copilot** features that support MCP (product names and menus change over time).

---

## Register Jesse in VS Code

1. Open VS Code **Settings** or the Copilot / MCP configuration area where **MCP servers** are listed (wording varies by version).
2. **Add** a server entry and use the URL Jesse printed in the terminal. It should end with **`/mcp`** (often `http://localhost:9002/mcp` unless you changed **`MCP_PORT`**).
3. Save or apply the change, then **reload VS Code** if the server does not appear.

If something fails, turn on **`MCP_LOG_IN_TERMINAL`** in `.env` while you debug—see [Environment variables for MCP](/docs/jesse-mcp/setup#environment-variables-for-mcp).

---

## Agent rules (optional but recommended)

To give Copilot the same system-level behavior without pasting each time, follow **[MCP agent rules (system prompt)](/docs/jesse-mcp/mcp-rules)** (for example **`.github/copilot-instructions.md`** with the contents of your project’s **`mcp-rules.md`**).

---

## Official Microsoft documentation

Microsoft maintains the canonical guide for MCP in VS Code:

- **[Add and manage MCP servers in VS Code](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)**

---

::: tip Same machine, same network story
If VS Code runs on **Windows** and Jesse runs inside **WSL** (or the other way around), **localhost** can refer to different machines. If you see connection errors, check Microsoft’s docs and VS Code **remote** / **WSL** guidance, or run Jesse and VS Code in the same environment so they share one loopback network.
:::
