# Jesse MCP — connect in Codex

Make sure Jesse is running and your **`.env`** is set up so the MCP server starts and prints a URL (see **[MCP server setup](/docs/mcp/setup)** if you have not done that yet).

Jesse exposes a running **Streamable HTTP** MCP server. Codex only needs its URL; it does not need a command to launch Jesse.

## Register Jesse with the Codex CLI

This is the most reliable setup method because it does not depend on where MCP settings appear in your version of the desktop app.

1. Copy the MCP URL printed by Jesse. It should end with **`/mcp`** and is usually `http://localhost:9002/mcp` unless you changed **`MCP_PORT`**.
2. Open a terminal on the same machine where Codex runs and add the server:

   ```bash
   codex mcp add jesse --url http://localhost:9002/mcp
   ```

   Replace the example URL if Jesse printed a different one.

3. Confirm Codex saved the server:

   ```bash
   codex mcp list
   ```

4. Fully restart the desktop app so it reloads the MCP configuration.

The Codex CLI, desktop app, and IDE extension share the same MCP configuration on the same host, so you only need to register Jesse once.

## Configure `config.toml` instead

If the `codex` command is unavailable, edit the Codex configuration file directly:

- macOS and Linux: `~/.codex/config.toml`
- Windows: `%USERPROFILE%\.codex\config.toml`

Add this block, using the URL printed by Jesse:

```toml
[mcp_servers.jesse]
url = "http://localhost:9002/mcp"
```

Save the file, then fully restart the desktop app. Do not add `command`, `args`, `env`, or `cwd` fields—those are for MCP servers that Codex launches as local processes.

## Test the connection

In the desktop app, type `/mcp` to view connected MCP servers. You can also ask Codex:

```text
Use the Jesse MCP server and list the available tools.
```

If Codex cannot find the server:

1. Run `codex mcp list` and confirm that `jesse` appears with the correct URL.
2. Confirm Jesse is still running and that its URL ends with `/mcp`.
3. Fully restart the desktop app after changing the MCP configuration.
4. Turn on **`MCP_LOG_IN_TERMINAL`** in `.env` while debugging—see [Environment variables for MCP](/docs/mcp/setup#environment-variables-for-mcp).

See the [official OpenAI MCP documentation](https://developers.openai.com/codex/mcp/) for Codex's current MCP configuration options.

## Agent rules (optional but recommended)

Jesse automatically writes and maintains **`AGENTS.md`** at the project root every time you run `jesse run`, so Codex can read the rules without you pasting anything. See **[MCP agent rules](/docs/mcp/mcp-rules)** for details on what's in the file, how the auto-sync works, and how to add your own notes without losing them on upgrade.

::: tip Same machine, same network story
If Codex runs on **Windows** and Jesse runs inside **WSL** (or the other way around), **localhost** can refer to different machines. If you see connection errors, run Jesse and Codex in the same environment so they share one loopback network.
:::
