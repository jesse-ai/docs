---
title: 'Updating from Jesse 3.2.x or earlier'
description: 'Upgrade an existing Docker or native Jesse installation, remove Redis, and optionally migrate candle storage to TimescaleDB.'
---

# Updating from Jesse 3.2.x or earlier

This guide covers updating an **existing installation from Jesse 3.2.x or earlier
to Jesse 3.3.0**. For a new installation, follow
[Getting Started](/docs/getting-started/).

The main reason for this upgrade is that Jesse 3.3.0 and later no longer need
Redis, which makes installation easier. You can keep your existing PostgreSQL
database. More importantly, Jesse now has optional TimescaleDB support, which
compresses older candle history to reduce storage. Switching is optional.

## Before updating

Stop all sessions and imports through the dashboard and wait for them to finish.
Back up your database and project, including `.env`, strategies, storage and
Docker configuration.

## Docker installations

Run these commands from your project's `docker` directory. Substitute your
service names if you changed them.

### 1. Stop Jesse and its old Redis service

```sh
docker compose stop jesse
```

Leave PostgreSQL running. If your Compose file defines Redis and only Jesse uses
it, stop it before editing the file:

```sh
docker compose stop redis
```

### 2. Edit your existing Compose file

In `docker/docker-compose.yml`:

- Set the `jesse` service's `image` to `salehmir/jesse:3.3.0`.
- Remove its `redis` dependency from `depends_on`.
- Remove the `redis` service if it was used only by Jesse.
- Keep the PostgreSQL service, data mount and other settings unchanged.

For example, the Jesse image line becomes:

```yaml
services:
  jesse:
    image: salehmir/jesse:3.3.0
```

Change this image line in your existing file; do not replace the whole file.

Remove unused `REDIS_*` settings from your project's `.env` file.

::: warning Keep your database storage
The new template uses PostgreSQL 17 and cannot open an older major version's
data directory. Keep your existing database image and storage for this update.
Do not delete `postgres-data` or run `docker compose down -v`.
:::

### 3. Update only the Jesse image and start it

```sh
docker compose config --quiet
docker compose pull jesse
docker compose up -d --no-deps jesse
docker compose logs --tail=100 jesse
docker compose exec jesse jesse --version
```

Keep your existing `LICENSE_API_TOKEN` if you use the live plugin; the new
container installs it on startup. Then [verify the update](#verify-the-update).

## Native installations

### 1. Stop Jesse and activate its Python environment

Press **Ctrl+C** in Jesse's terminal, or stop its service. Activate your usual
Python environment, for example:

```sh
conda activate jesse
```

Run the following commands from your existing Jesse project.

### 2. Install the release

```sh
python -m pip install --upgrade "jesse==3.3.0"
jesse --version
python -m pip check
```

### 3. Update the live trading plugin, if installed

```sh
python -m pip uninstall -y jesse-live
jesse install-live
python -m pip check
```

Keep your existing `LICENSE_API_TOKEN` in `.env`.

### 4. Remove obsolete Redis settings and restart

Remove `REDIS_*` settings from `.env`; keep `POSTGRES_*` unchanged. If no other
package in this environment needs the Redis clients, remove them:

```sh
python -m pip uninstall -y redis aioredis
python -m pip check
```

Stop or uninstall the Redis server only if no other applications use it. Start
Jesse:

```sh
jesse run
```

Then [verify the update](#verify-the-update).

## Optional TimescaleDB migration

**Skip this section to keep PostgreSQL.** Updating Jesse does not change your
database image or convert existing candles.

### Docker databases

Follow the [PostgreSQL upgrade guidance](https://www.postgresql.org/docs/17/upgrading.html)
and [TimescaleDB installation instructions](https://www.tigerdata.com/docs/self-hosted/latest/install).
For a PostgreSQL major-version change, use a supported migration such as a dump
and restore into a **fresh data directory or volume**, including roles and
permissions. Use matching PostgreSQL 17 `pg_dump` and `psql` tools for both steps;
mixed client versions can produce a dump that the restore tool cannot read.
Verify candles and session history before switching Jesse over.
Keep the original database and backup; do not reuse a PostgreSQL 14 data directory
with a PostgreSQL 17 image.

### Native databases

Install TimescaleDB using the [official instructions](https://www.tigerdata.com/docs/self-hosted/latest/install).

### Enable TimescaleDB for existing candles

Once TimescaleDB is ready, back up the database and stop Jesse and other writers.
For Docker, leave the database running and execute from the `docker` directory:

```sh
docker compose run --rm --no-deps jesse jesse enable-timescale
docker compose run --rm --no-deps jesse jesse enable-timescale --status
```

Without Docker, run from your project:

```sh
jesse enable-timescale
jesse enable-timescale --status
```

Conversion can take time on a large database. It enables compression for history
older than 30 days without deleting candles. Ask your database administrator for
help if the command reports insufficient permissions.

Setting `TIMESCALEDB_ENABLED=TRUE` alone does not convert existing candles. After
conversion, the database needs TimescaleDB even if you remove that setting.
Restart Jesse when the command succeeds.

## Existing AI assistant connections

Replace your old connection using **More options (⋮) → AI Assistants** in the
dashboard. Remove the unused `MCP_PORT` setting from `.env`.
See [MCP Setup](/docs/mcp/setup).

## Verify the update

- Confirm `jesse --version` reports `3.3.0` and Jesse starts without errors.
- Log into the dashboard at your existing address. Check that your strategies,
  stored candles and session history are still available.
- Run a short backtest using stored candles. If you use the live plugin, also
  start a paper session before resuming your regular live sessions.
- If you migrated to TimescaleDB, confirm the maintenance command's `--status`
  output shows the expected storage configuration.
- If you use an AI assistant, reconnect it using the new setup and check that it
  can read a session result.

## If the update fails

Check the startup log and plugin version. Do not delete database storage.
To return to your previous release, stop Jesse and restore its previous version,
compatible plugin and project configuration. Restore the pre-upgrade database
backup if needed; database changes are not automatically reversed.

If you enabled TimescaleDB, keep it installed. Changing back to a plain PostgreSQL
image does not reverse the conversion.
