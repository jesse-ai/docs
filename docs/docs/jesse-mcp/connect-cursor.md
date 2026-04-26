# Jesse MCP — connect in Cursor

Make sure Jesse is running and your **`.env`** is set up so the MCP server starts and prints a URL (see **[MCP server setup](/docs/jesse-mcp/setup)** if you have not done that yet).

---

## Register Jesse in Cursor

Exact labels change as Cursor updates, but the flow is usually:

1. Open **Settings** and find **MCP**, **Tools & MCP**, or similar.
2. **Add a server** (or equivalent) and paste the address Jesse printed in the terminal. It should end with **`/mcp`** and match the host where Jesse runs (often `http://localhost:9002/mcp` unless you changed **`MCP_PORT`**).
3. Save, then **restart Cursor** if it does not pick up the new server right away.

If something fails, turn on **`MCP_LOG_IN_TERMINAL`** in `.env` while you debug—see [Environment variables for MCP](/docs/jesse-mcp/setup#environment-variables-for-mcp).

---

## Agent rules (optional but recommended)

So Cursor does not need the same instructions pasted every time, add your project’s **`mcp-rules.md`** as a **project rule** (or global rule) as described in **[MCP agent rules (system prompt)](/docs/jesse-mcp/mcp-rules)**.

---

## Official Cursor documentation

Cursor’s own pages are the best place for up-to-date UI steps, screenshots, and troubleshooting (including MCP log panels):

- **[MCP in Cursor](https://cursor.com/docs/context/mcp)**
- **[MCP integrations (help)](https://cursor.com/help/customization/mcp)**

---

::: tip Same machine, same network story
If Cursor runs on **Windows** and Jesse runs inside **WSL** (or the other way around), **localhost** can refer to different machines. If you see connection errors, check Cursor’s docs for **WSL** or **remote** MCP setup, or run Jesse and Cursor in the same environment so they share one loopback network.
:::
