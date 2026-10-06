# Connect your AI assistant

Connect Claude Code, Codex, Cursor, VS Code, or Zed to Jesse so you can ask it to work with your strategies, run backtests, and analyze results. You don't need to install anything extra in Jesse or prepare connection credentials yourself.

## Connect in three steps

1. **Open your Jesse dashboard** and log in. Keep Jesse running while you use your assistant.
2. Open **More options (⋮) → AI Assistants** at the bottom of the sidebar. You can also click **Connect an assistant** on the welcome page, or use the **☰** menu on mobile.
3. **Choose your assistant** and follow the instructions shown. Copy the command or configuration into your assistant where indicated. Jesse fills in the connection details for you. If your assistant asks for a separate token, use the **Copy token** button shown in its instructions.

For screenshots and assistant-specific steps, choose your guide:

- [Claude Code](/docs/mcp/connect-claude-code)
- [Codex](/docs/mcp/connect-codex)
- [Cursor](/docs/mcp/connect-cursor)
- [VS Code](/docs/mcp/connect-vscode)
- [Zed](/docs/mcp/connect-zed)

Open your assistant in your Jesse project and load its [agent rules](/docs/mcp/mcp-rules). Then try asking: **“Show me the results of my latest backtest.”** For more ideas, see [Example workflow](/docs/mcp/example-workflow).

## Your MCP address

The **AI Assistants** panel already includes the correct address in the setup you copy. You normally don't need to enter it yourself.

If an assistant asks for it separately, open **Manual connection details** in that panel. It is your dashboard address with `/mcp` added—for example, `http://localhost:9000/mcp`.

## Connecting from another machine

If Jesse runs on a VPS or another computer, open **that machine's dashboard** from your computer and follow the same three steps above.

You can keep your assistant open in a local Jesse project to use its agent rules. You can also connect both instances, named **`jesse-research`** and **`jesse-production`**. See [Assistant on another computer](/docs/mcp/mcp-rules#assistant-on-another-computer).

<details>
<summary>Optional: set a public dashboard address</summary>

Set `DASHBOARD_URL` in the remote project's `.env` if you want Jesse to use a specific address for connections and result links:

```sh
# Home network example
DASHBOARD_URL=http://192.168.1.20:9000

# Or a VPS with HTTPS already configured
# DASHBOARD_URL=https://jesse.example.com
```

Restart Jesse after changing it. Use your own reachable address, without a path such as `/jesse`, login details, or query parameters. This setting does not configure networking, DNS, or HTTPS for you. See [VPS Setup](/docs/vps-setup#step-4-open-the-dashboard).

</details>

## Project files and research scripts

Assistants can work with files in two folders of your Jesse project, on the machine running Jesse:

- **`strategies/`**: your strategy folders and everything inside them, such as helper modules or a trained model your strategy loads.
- **`research_scripts/`**: Python scripts that use Jesse's [research module](/docs/research/), and candle exports in `research_scripts/candle_exports/`.

They can list, read, write, rename or move, copy, and delete files and folders there, including whole strategy folders. Nothing outside these two folders is reachable this way, existing files are only replaced when the assistant asks to overwrite them, and Jesse never follows symlinks for these tools. Large text files, such as candle exports, are read in pages; binary files such as models are never sent to the assistant.

Assistants can also run a script from `research_scripts/` in the background, follow its output, and cancel it. At most two run at once, and each stops after its time limit (one hour by default, at most twelve).

::: warning Research scripts run with full access
A script is ordinary Python running as the same user as Jesse. It is **not sandboxed**: it can read your `.env` file and saved API keys, access any file that user can, and use the network. The folder limits above apply to the file tools, not to what a script does.
:::

## Session results and analysis

Assistants can read the stored results of your backtests, optimizations, Monte Carlo simulations, and rule significance tests, and, with the live trading plugin, of your live and paper sessions, in small pages. In live and paper results, the saved values of the exchange and notification keys the session uses are replaced with `[redacted]` wherever they appear exactly; other secrets your strategy logs are not recognized.

For a period rather than one session, such as "my trades of the last 7 days", assistants read the closed trades and orders Jesse recorded across all live and paper sessions within a date range (UTC). This is Jesse's own record of its sessions, not your exchange account's history: trades made outside Jesse are not included, and open positions are not counted as trades. Only live (real-money) sessions are included unless you ask for paper results too.

To compare sessions or draw charts, an assistant runs a short Python analysis on the Jesse machine in a temporary folder under `storage/mcp/analysis/`, and the charts are shown in the chat. Analyses that finished more than 24 hours earlier are deleted when a new one starts. Analysis code has the same full access as research scripts; it is **not sandboxed**.

## Troubleshooting

- **Can't connect?** Check that Jesse is running and you can open its dashboard from the computer running your assistant.
- **Authentication error (`401`)?** Copy the setup again from **AI Assistants** and replace the old connection in your assistant.
- **“MCP not running” or `502`?** Check the Jesse terminal for startup errors and restart Jesse.
- **Using Windows and WSL?** See the connection tips in the [Cursor](/docs/mcp/connect-cursor) or [VS Code](/docs/mcp/connect-vscode) guide.

## Advanced connection options

The dashboard handles these details for you. Use the sections below only if you need a manual configuration or manage your own hosting.

<details>
<summary>Manual authentication</summary>

### Authentication

Copy the token from **AI Assistants → Manual connection details**. In a manual configuration, send it as:

```text
Authorization: Bearer <your MCP token>
```

Jesse uses a token derived from your dashboard password, not an OAuth login. Keep configurations containing it private. If you change your dashboard password, copy the setup again.

#### Create the token manually

For the optional terminal-based instructions in the client guides, these commands prompt for your Jesse password and set `JESSE_MCP_TOKEN` in the current terminal.

macOS and Linux:

```sh
export JESSE_MCP_TOKEN="$(python3 -c 'import getpass, hashlib; print(hashlib.sha256(getpass.getpass("Jesse PASSWORD: ").encode()).hexdigest())')"
```

Windows (PowerShell):

```powershell
$env:JESSE_MCP_TOKEN = python -c "import getpass, hashlib; print(hashlib.sha256(getpass.getpass('Jesse PASSWORD: ').encode()).hexdigest())"
```

To copy that value to your clipboard, use `printf %s "$JESSE_MCP_TOKEN" | pbcopy` on macOS, `printf %s "$JESSE_MCP_TOKEN" | xclip -selection clipboard` on Linux with xclip, or `Set-Clipboard -Value $env:JESSE_MCP_TOKEN` in PowerShell.

</details>

<details>
<summary>Hosting and environment settings</summary>

### Environment variables for MCP

These settings live in your project's `.env`. Restart Jesse after changing them.

| Setting | Purpose |
| --- | --- |
| `PASSWORD` | Your existing dashboard password, also used for the assistant connection. |
| `DASHBOARD_URL` | Optional public dashboard address for connections and result links. |
| `MCP_LOG_IN_TERMINAL` | Show detailed MCP logs; defaults to `true`. |

There is no separate MCP port to configure or publish. Assistants connect through the dashboard's `/mcp` address.

### Behind a reverse proxy

- Use HTTPS for public-internet connections and serve Jesse at the root of its address, such as `https://jesse.example.com`.
- Forward requests to Jesse's dashboard port, including WebSocket upgrades for `/ws`.
- Disable response buffering for `/mcp` and allow long-lived responses. With nginx, use `proxy_buffering off;` and an appropriate `proxy_read_timeout`.
- Pass the `Authorization` header through unchanged.

### Hiding MCP logs in the terminal

Set `MCP_LOG_IN_TERMINAL=false` in `.env` and restart Jesse.

</details>
