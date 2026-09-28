# Jesse MCP — connect in Claude Code

Keep Jesse running and open its dashboard. The **[connection guide](/docs/mcp/setup)** shows where to find the ready-made setup for your assistant.

These steps work for both the **Claude Code CLI** and the **Code tab in Claude Code Desktop**. Jesse exposes a running **Streamable HTTP** MCP server; Claude Code does not need to launch Jesse with a STDIO command.

## Register Jesse in Claude Code

### Copy the command from the dashboard (recommended)

1. In the Jesse dashboard, open **More options** (**⋮**) at the bottom of the sidebar, click **AI Assistants**, and choose **Claude Code**.
2. Click **Copy command** and run it in a terminal on the computer where Claude Code runs.

The copied command already contains your MCP address and token. It uses `--scope user`, so Jesse is available in every folder. If you registered Jesse before, remove the old entry first with `claude mcp remove jesse-mcp -s user` (or without `-s user` if you added it to a single folder). Then continue with **[Test the connection](#test-the-connection)**.

### Manual setup

For this manual alternative, set **`JESSE_MCP_TOKEN`** in your terminal using **[Manual authentication](/docs/mcp/setup#authentication)**.

Then, in the same terminal, run:

```sh
claude mcp add --transport http jesse-mcp http://localhost:9000/mcp --header "Authorization: Bearer $JESSE_MCP_TOKEN"
```

Use the MCP address printed by Jesse: it ends with **`/mcp`** and is `http://localhost:9000/mcp` by default, or `<DASHBOARD_URL>/mcp` when Jesse runs on another machine (for example `http://192.168.1.20:9000/mcp`). Your shell history records only `$JESSE_MCP_TOKEN`, not the token. Claude Code stores the resulting header value in its MCP configuration (`~/.claude.json` for the default scope), so keep that file private. If you change your Jesse **`PASSWORD`**, run `claude mcp remove jesse-mcp` and add the server again with a new token.


Claude Code Desktop reads the same MCP configuration files as the CLI, so running this command also makes the server available in the desktop app's Code tab. If the server does not appear there right away, restart Claude Code Desktop.

::: warning Claude Desktop chat app is separate
MCP servers configured for the regular Claude Desktop chat app through **`claude_desktop_config.json`** are separate from Claude Code. For Claude Code, use the command above or configure **`~/.claude.json`** / **`.mcp.json`**. A project **`.mcp.json`** is meant to be committed, so never put the token in it.
:::

If something fails, turn on **`MCP_LOG_IN_TERMINAL`** in `.env` while you debug—see [Environment variables for MCP](/docs/mcp/setup#environment-variables-for-mcp).

## Agent rules (optional but recommended)

Jesse automatically writes and maintains **`AGENTS.md`** at the project root every time you run `jesse run`, so Claude Code can read the rules without you pasting anything when it works in that project folder. If the project also has a **`CLAUDE.md`**, Claude Code reads that instead; add a line containing `@AGENTS.md` to it. See **[MCP agent rules](/docs/mcp/mcp-rules)** for details on what's in the file, how the auto-sync works, how to add your own notes without losing them on upgrade, and what to do when [Claude Code runs on another computer](/docs/mcp/mcp-rules#assistant-on-another-computer).

## Test the connection

After adding the MCP server, start Claude Code in the same folder where you ran `claude mcp add` (the default scope applies only to that folder; add `--scope user` to the command to use Jesse from every folder) and run:

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

If Claude Code cannot find the server, confirm Jesse is still running and that the URL matches the terminal output. If `/mcp` shows the server as failed or offers to authenticate, the token is missing or wrong: Jesse uses a static bearer token, not OAuth, so remove the server and add it again with the `--header` shown above.

::: tip Same machine, same network story
If Claude Code runs on **Windows** and Jesse runs inside **WSL** (or the other way around), **localhost** can refer to different machines. If you see connection errors, run Jesse and Claude Code in the same environment so they share one loopback network.
:::
