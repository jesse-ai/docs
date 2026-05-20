# Jesse MCP — connect in Codex

Make sure Jesse is running and your **`.env`** is set up so the MCP server starts and prints a URL (see **[MCP server setup](/docs/mcp/setup)** if you have not done that yet).

These steps assume you use Codex with custom MCP support. Jesse exposes a running **Streamable HTTP** MCP server; Codex does not need to launch Jesse with a STDIO command.

## Register Jesse in Codex

1. Open Codex MCP settings and choose **Connect to a custom MCP**.
2. Set **Name** to `jesse`.
3. Select **Streamable HTTP**.
4. Use the URL Jesse printed in the terminal. It should end with **`/mcp`** (often `http://localhost:9002/mcp` unless you changed **`MCP_PORT`**).
5. Leave **Command to launch**, **Arguments**, **Environment variables**, and **Environment variable passthrough** empty.
6. Leave **Working directory** empty unless Codex requires one. If it does, use your Jesse project root.
7. Save the MCP server.

If something fails, turn on **`MCP_LOG_IN_TERMINAL`** in `.env` while you debug—see [Environment variables for MCP](/docs/mcp/setup#environment-variables-for-mcp).

## Agent rules (optional but recommended)

So Codex does not need the same instructions pasted every time, rename **`mcp-rules.md`** to **`AGENTS.md`** at the project root, as described in **[MCP agent rules](/docs/mcp/mcp-rules)**.

## Test the connection

After saving the MCP server, ask Codex:

```text
Use the Jesse MCP server and list the available tools.
```

If Codex cannot find the server, confirm Jesse is still running and that the URL matches the terminal output.

- **[OpenAI Docs MCP quickstart](https://platform.openai.com/docs/docs-mcp)**

::: tip Same machine, same network story
If Codex runs on **Windows** and Jesse runs inside **WSL** (or the other way around), **localhost** can refer to different machines. If you see connection errors, run Jesse and Codex in the same environment so they share one loopback network.
:::
