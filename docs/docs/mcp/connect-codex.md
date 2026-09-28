# Jesse MCP — connect in Codex

Keep Jesse running and open its dashboard. The **[connection guide](/docs/mcp/setup)** shows where to find the ready-made setup for your assistant.

Jesse exposes a running **Streamable HTTP** MCP server. Codex only needs its URL; it does not need a command to launch Jesse.

## Copy the setup from the dashboard (recommended)

1. In the Jesse dashboard, open **More options** (**⋮**) at the bottom of the sidebar, click **AI Assistants**, and choose **Codex**.
2. Click **Copy config.toml block** and paste it into your Codex configuration file, replacing any existing `[mcp_servers.jesse]` block:
   - macOS and Linux: `~/.codex/config.toml`
   - Windows: `%USERPROFILE%\.codex\config.toml`
3. Fully restart Codex. The CLI, desktop app, and IDE extension share this file.

The block contains your MCP address and token as a static `Authorization` header (`http_headers`), so it works however Codex is launched, including from the Dock or Start menu. The token is stored in plain text, so keep `config.toml` private. To keep the token out of the file, use the CLI setup below instead.

## Register Jesse with the Codex CLI

This method keeps the token out of Codex’s configuration by reading it from an environment variable. It does not depend on where MCP settings appear in your version of the desktop app.

Jesse requires your MCP token on every request. Codex can read it from the **`JESSE_MCP_TOKEN`** environment variable each time it starts, so the token is never written to Codex’s configuration.

1. Copy the MCP URL printed by Jesse. It ends with **`/mcp`** and is `http://localhost:9000/mcp` by default, or `<DASHBOARD_URL>/mcp` when Jesse runs on another machine (for example `http://192.168.1.20:9000/mcp`).
2. Open a terminal on the same machine where Codex runs and add the server:

   ```bash
   codex mcp add jesse --url http://localhost:9000/mcp --bearer-token-env-var JESSE_MCP_TOKEN
   ```

   Replace the example URL if Jesse printed a different one.

3. Set **`JESSE_MCP_TOKEN`** using **[Manual authentication](/docs/mcp/setup#authentication)** and start Codex from that terminal. The variable must be set in whatever environment launches Codex; a terminal variable lasts only for that session.

4. Confirm Codex saved the server:

   ```bash
   codex mcp list
   ```

5. Fully restart the desktop app so it reloads the MCP configuration.

The Codex CLI, desktop app, and IDE extension share the same MCP configuration on the same host, so you only need to register Jesse once.

## Configure `config.toml` instead

If the `codex` command is unavailable, edit the Codex configuration file directly:

- macOS and Linux: `~/.codex/config.toml`
- Windows: `%USERPROFILE%\.codex\config.toml`

Add this block, using the URL printed by Jesse:

```toml
[mcp_servers.jesse]
url = "http://localhost:9000/mcp"
bearer_token_env_var = "JESSE_MCP_TOKEN"
```

Save the file, then fully restart the desktop app. Do not add `command`, `args`, `env`, or `cwd` fields—those are for MCP servers that Codex launches as local processes.

If Codex starts somewhere that cannot see `JESSE_MCP_TOKEN` (for example a desktop app opened from the Dock or Start menu), you can put the header in the file instead. This stores the token in plain text in `config.toml`, so keep that file private:

```toml
[mcp_servers.jesse]
url = "http://localhost:9000/mcp"
http_headers = { "Authorization" = "Bearer <your MCP token>" }
```


## Test the connection

In the desktop app, type `/mcp` to view connected MCP servers. You can also ask Codex:

```text
Use the Jesse MCP server and list the available tools.
```

If Codex cannot find the server:

1. Run `codex mcp list` and confirm that `jesse` appears with the correct URL.
2. Confirm Jesse is still running and that its URL ends with `/mcp`. A `401` error means the token is missing or wrong: make sure `JESSE_MCP_TOKEN` is set where Codex starts and was created from your current Jesse **`PASSWORD`**.
3. Fully restart the desktop app after changing the MCP configuration.
4. Turn on **`MCP_LOG_IN_TERMINAL`** in `.env` while debugging—see [Environment variables for MCP](/docs/mcp/setup#environment-variables-for-mcp).

See the [official OpenAI MCP documentation](https://developers.openai.com/codex/mcp/) for Codex's current MCP configuration options.

## Agent rules (optional but recommended)

Jesse automatically writes and maintains **`AGENTS.md`** at the project root every time you run `jesse run`, so Codex can read the rules without you pasting anything when it works in that project folder. See **[MCP agent rules](/docs/mcp/mcp-rules)** for details on what's in the file, how the auto-sync works, how to add your own notes without losing them on upgrade, and what to do when [Codex runs on another computer](/docs/mcp/mcp-rules#assistant-on-another-computer).

::: tip Same machine, same network story
If Codex runs on **Windows** and Jesse runs inside **WSL** (or the other way around), **localhost** can refer to different machines. If you see connection errors, run Jesse and Codex in the same environment so they share one loopback network.
:::
