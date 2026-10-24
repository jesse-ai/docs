---
title: 'Research Runners'
---

# Research Runners

::: warning Experimental
Research runners are an experimental feature, introduced in version 3.5. Their settings and behavior might change slightly in upcoming releases.
:::

Research runners let you use spare computers as extra compute for your research. One machine is the **hub**: the one whose dashboard you open and whose MCP your [AI assistant](/docs/mcp/) connects to. Other machines run `jesse runner`. They take queued **backtests, optimizations, Monte Carlo runs, and rule significance tests** from the database they share with the hub, run them, and write the results back, so every session shows up in the hub's dashboard as if it ran there.

Candles are read from the same database, so you import them once, on the hub. Live trading, candle imports, research scripts, and analysis jobs are not distributed; they always run on the hub.

::: tip Off by default
Nothing changes until you set `RESEARCH_RUNNERS=true` on the hub. Without it, every run starts on the machine you started it from, exactly as before.
:::

## Requirements

- **One shared database.** All machines use the hub's database, whether it is plain PostgreSQL or PostgreSQL with [TimescaleDB](/docs/getting-started/timescaledb). Runners need nothing extra for TimescaleDB; the database must accept connections from the runner machines. See [Let runners reach the database](#let-runners-reach-the-database).
- **The same Jesse version everywhere.** Upgrade the hub and all runners together. A runner on a different version than the hub stops right away with a message saying which version to install, and the hub's terminal shows it too.
- **The same third-party packages.** Install the Python packages your strategies import (such as `scikit-learn` or `lightgbm`) on every runner. A runner that lacks one leaves the job to another runner; if no connected runner can run it, the job fails and names the missing packages.

### Let runners reach the database

The simplest safe setup is a private network: your machines at home or in the office, or a VPN such as WireGuard or Tailscale for a runner elsewhere. If a runner has to reach the database over the internet, allow port `5432` in the hub's firewall only from that runner's IP address, and use a strong password. Bots constantly scan the internet for open databases and try default logins, and anyone who gets into this database can run their own code on your runners (see [Security](#security)).

**Native PostgreSQL on the hub** (also with TimescaleDB, which runs inside PostgreSQL):

1. In `postgresql.conf`, set `listen_addresses` to include the hub's private address, for example `listen_addresses = 'localhost,192.168.1.20'`.
2. In `pg_hba.conf`, allow your private network:

   ```sh
   # TYPE  DATABASE  USER        ADDRESS           METHOD
   host    jesse_db  jesse_user  192.168.1.0/24    scram-sha-256
   ```

3. Restart PostgreSQL, and allow port `5432` in the hub's firewall only from your private network or VPN.

**Docker on the hub:** the project's `docker/docker-compose.yml` does not publish PostgreSQL's port. Add a `ports` entry to the `postgres` service, bound to the hub's private address:

```yaml
  postgres:
    # ...
    ports:
      - "192.168.1.20:5432:5432"
```

Then run `docker compose up -d` again. Binding to the private address matters on Linux, where ports published by Docker bypass `ufw` rules.

The project template's database password is `password`. Change it before opening the database to other machines: run `ALTER USER jesse_user WITH PASSWORD 'a-strong-password';` in `psql`, then update `POSTGRES_PASSWORD` in the hub's `.env` and in every runner's `.env`. Changing the password in `docker-compose.yml` does not change it for an existing database.

## Set up the hub

Add this to the `.env` of the hub's Jesse project, then restart `jesse run`:

```sh
RESEARCH_RUNNERS=true

# Optional
# RUNNER_CORES=7
# RUNNER_NAME=hub
# RUNNER_ORDER=mini-1,hub
# RUNNER_MAX_ATTEMPTS=3
```

| Setting | Default | Meaning |
|---|---|---|
| `RESEARCH_RUNNERS` | off | Turns runners on. Set it on the hub only. |
| `RUNNER_CORES` | all CPU cores but one | How many CPU cores the hub's own queued jobs may use together. Set `0` to only dispatch jobs to other machines. See [CPU cores](#cpu-cores). |
| `RUNNER_NAME` | host name and port | The hub's name in the runners list. |
| `RUNNER_ORDER` | any runner | Which machines run queued jobs, in order of preference. See [Choose where jobs run](#choose-where-jobs-run). |
| `RUNNER_MAX_ATTEMPTS` | `3` | How many times a job is started when its runner keeps going offline, before it fails. |

At startup, the terminal says it is the hub, how many cores it gives to jobs itself and in what order jobs are placed, and lists the runners it knows with their cores and whether they are online. While it runs, it shows a line whenever a runner connects or goes offline, and as each job is queued, taken by a machine, finished, or handed to another machine:

```
[runner] Research hub "macbook": Jesse 3.4.0, runs jobs itself on 7 core(s), order: mini-1,macbook.
[runner] Runners:
[runner]   - mini-1: online, 7 of 8 cores for jobs
[runner] Queued backtest 3f2a91c0 "oil variant 7" for any runner.
[runner] "mini-1" took backtest 3f2a91c0 "oil variant 7".
[runner] backtest 3f2a91c0 "oil variant 7" finished on "mini-1".
```

Queued jobs are the ones started with `where` (see [Run jobs on runners](#run-jobs-on-runners)). A run started with `where` set to `local`, or from the dashboard, starts on the hub right away and does not count against its `RUNNER_CORES`.

### Choose where jobs run

By default, a queued job goes to whichever machine has enough free cores first. `RUNNER_ORDER` in the hub's `.env` sets a preference instead: runner names separated by commas, best first. A job goes to the first machine in the list that has enough free cores, and to the next one only when the machines before it are full. `*` stands for any runner not in the list.

| `RUNNER_ORDER` | Effect |
|---|---|
| (not set) | Any machine, first one with free cores wins. |
| `hub,mini-1` | The hub first, `mini-1` only when the hub's cores are busy. |
| `mini-1,hub` | `mini-1` first, the hub only when `mini-1` is full. |
| `mini-1` | Only `mini-1`. The hub just orchestrates, as with `RUNNER_CORES=0`. |
| `mini-1,*` | `mini-1` first, then any other runner. |

Use the names the runners list shows (`RUNNER_NAME` on each machine). Restart `jesse run` on the hub after changing it; jobs already waiting keep the order they were queued with. With `RUNNER_ORDER` set, `where="auto"` always queues the job, even when none of those runners is connected yet, so nothing runs on a machine you left out. Naming a runner in `where` overrides the order for that run.

## Set up a runner machine

1. **Install Jesse** at the hub's version (check with `pip show jesse` on both machines). See [Installation](/docs/getting-started/).
2. **Create a separate Jesse project folder** for the runner. See [Create a new Jesse project](/docs/getting-started/#create-a-new-jesse-project). Its `strategies/` folder is not used: each job brings its own code.
3. **Point its `.env` at the hub's database:**

   ```sh
   POSTGRES_HOST=192.168.1.20   # the hub's private address
   POSTGRES_PORT=5432
   POSTGRES_NAME=jesse_db
   POSTGRES_USERNAME=jesse_user
   POSTGRES_PASSWORD=a-strong-password

   # Optional
   RUNNER_NAME=mini-1
   RUNNER_CORES=7
   ```

   If the hub's `.env` sets other `POSTGRES_` values, such as `POSTGRES_SCHEMA` or `POSTGRES_SSLMODE`, copy them too.
4. **Install the third-party packages** your strategies import.
5. **Start the runner** from inside the project folder:

   ```sh
   jesse runner
   # or choose the name and cores on the command line
   jesse runner --name mini-1 --cores 7
   ```

   It says it is a runner, how many of its CPU cores it uses for jobs, its Jesse version, which database it uses, and whether the hub is online, then `Runner "mini-1" is waiting for jobs with 7 core(s).` It appears in the runners list and in the hub's terminal. The name defaults to `RUNNER_NAME`, then the machine's host name, and must be unique among your runners. Cores default to `RUNNER_CORES`, then all of the machine's cores but one.

A runner has no dashboard or API, and needs no open ports: it only connects out to the database.

If the machine also runs `jesse run` for a project of its own, keep the runner in its own folder, and do not add `RUNNER_CORES` to that other project's `.env`: `jesse run` with `RUNNER_CORES` takes queued jobs too.

### CPU cores

Each machine gives its jobs a number of CPU cores: `RUNNER_CORES`, which defaults to all of its cores but one, so the machine stays responsive. A backtest or significance test uses one core. An optimization or Monte Carlo run uses as many cores as its own `cpu_cores` setting. A machine starts a job only when it has that many cores free, so an 8-core runner with the default of 7 can run seven backtests at once, or one optimization with `cpu_cores` set to 7, or one with `cpu_cores` set to 4 next to three backtests.

Jobs start in the order they were queued. When an optimization needs more cores than are free, its machine waits for the running jobs to finish and keeps those cores for the optimization, instead of starting newer backtests that would make it wait longer. Other machines keep taking the newer jobs in the meantime. To keep backtests going on the same machine while an optimization runs, give the optimization fewer cores with its `cpu_cores` setting.

A job only goes to a machine with enough cores for it. If it asks for more cores than any machine gives to jobs, it runs with all the cores of the biggest one instead. The runners list shows each machine's cores and how many are in use.

### Keep it running

Run it in `tmux` or `screen`, or as a service so it starts with the machine. A minimal systemd unit:

```ini
# /etc/systemd/system/jesse-runner.service
[Unit]
Description=Jesse research runner
After=network-online.target
Wants=network-online.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/jesse-runner
# use the full path that `which jesse` prints
ExecStart=/home/ubuntu/miniconda3/envs/jesse/bin/jesse runner
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Enable it with `sudo systemctl enable --now jesse-runner`.

Pressing `Ctrl+C` (or stopping the service) gives the jobs it is running back to the queue. Another runner, or this one after a restart, runs them again from the start.

## Run jobs on runners

### From the AI assistant

The assistant's run tools for backtests, optimizations, Monte Carlo runs, and significance tests take a `where` argument:

| `where` | What happens |
|---|---|
| `auto` (default) | With runners on and a runner available, the job is queued and the first machine with enough free cores runs it, including the hub when its `RUNNER_CORES` is above 0. Otherwise it starts on the hub. |
| `local` | Starts on the hub right away, skipping the queue. |
| `any` | Queued for any runner, even if none is connected yet. |
| a runner name | Queued for that runner only, such as `mini-1`. |

So you can ask, for example, **"Run these five backtests on the runners"** or **"Run this optimization on mini-1."**

The `list_runners` tool shows each machine: whether it is online, how many cores it gives to jobs and how many are in use, its current CPU and memory use, its Jesse version and whether it matches the hub, and what it is running. It also shows the hub's `RUNNER_ORDER`, so the assistant knows where work will go. `wait_for_sessions` reports a job that is still waiting as `queued`, with how long it has waited.

### From the dashboard

The dashboard's own start buttons keep running on the hub. Sessions that ran on runners appear in its lists with their results like any other session.

## What to expect

- **Jobs bring their code.** Each job takes its strategy folders along, including data files such as trained models, and any other strategies or project modules they import, such as a `custom_indicators/` folder. Runners never need your strategies copied to them, and a job runs the code as it was when you queued it. A job's files can total at most 100 MB.
- **Jobs start right away.** A free runner picks up a new job within moments.
- **A lost runner's job is handed over.** If a runner shuts down, crashes, or loses its network, its job is started again on another machine after about 90 seconds, up to `RUNNER_MAX_ATTEMPTS` times. A job that fails because of an error in the strategy is not retried.
- **Logs and charts come back to the hub.** They are saved in the hub project's `storage/` folder, as if the run happened there.
- **Cancelling works from the hub.** Cancelling a waiting job removes it; cancelling a running one stops it on its runner.

## Limitations

- **Live progress is for runs on the hub.** The dashboard's live progress bars only follow runs on the hub. For a run on a runner, reload the page to see its status and results.
- **Only regular imports are followed.** A module your strategy loads by name at runtime, such as with `importlib.import_module("my_helpers")`, is not brought along. Keep such modules inside the strategy folder. The same goes for data files your strategy opens by path: keep them inside the strategy folder.
- **Large output files stay on the runner.** A single log or chart file larger than 50 MB is not sent back to the hub.

### Security

::: warning Runners run code from the database
A runner runs whatever code a job in the database carries, so anyone who can log in to that database can run code on all of your runners. Use a strong password, and only let your own machines reach the database: a private network or VPN, or a firewall that allows just your runners' IP addresses.
:::

## Troubleshooting

- **A job stays queued.** Ask the assistant to run `list_runners`, or check the queue note in `wait_for_sessions`:
  - Is any runner online? If not, check that `jesse runner` is still running on it.
  - Does the runner use the same Jesse version as the hub? Runners on another version do not take jobs.
  - Was it queued for a specific runner that is offline or busy?
  - Does it ask for more cores than are free? An optimization or Monte Carlo run waits until its machine has its `cpu_cores` free.
  - Did a runner leave it because a package is missing? The queue note in `wait_for_sessions` says so.
  - Was it queued with `any` while no runner was connected? It starts as soon as one connects.
  - Does the hub's `RUNNER_ORDER` leave out the machines that are connected? Only the runners it lists (or all, with `*`) take its jobs.
- **The runner cannot connect to the database.** From the runner machine, test the connection with `psql -h 192.168.1.20 -U jesse_user jesse_db`. If it fails, check the hub's `listen_addresses`, `pg_hba.conf`, firewall, and (with Docker) the published port, and that the runner's `.env` uses the hub's private address and password.
- **A job failed with "No runner can run this job".** Every connected runner lacked a package the strategy imports. Install it on the runners and start the job again.
- **A job failed after losing its runner several times.** The runners kept going offline. Check their network connection to the hub.
- **Results are missing their logs or charts.** The hub saves the files runners send while its `jesse run` is running with `RESEARCH_RUNNERS=true`. Make sure it is running; files arrive a few seconds after the job ends.
