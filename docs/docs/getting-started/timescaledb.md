# Optional TimescaleDB

TimescaleDB is optional. It reduces candle storage by compressing older history.
You can keep standard PostgreSQL; query speed depends on your data and workload.

## New Docker projects

The [Docker setup](./docker.md) includes TimescaleDB and enables compression for
history older than 30 days. No additional setup is needed for a new project.

## Install without Docker

Install TimescaleDB on your PostgreSQL server using the
[official installation instructions](https://www.tigerdata.com/docs/self-hosted/latest/install).
Compression requires TimescaleDB 2.11 or newer and PostgreSQL 14 or newer. Check
the [license](https://www.timescale.com/legal/licenses) for your chosen edition.

## Existing projects

Back up your database and stop Jesse and other applications writing to it.
With TimescaleDB installed, run from your Jesse project:

```sh
jesse enable-timescale
```

This enables compression for history older than 30 days without deleting candles.
The command does not require `TIMESCALEDB_ENABLED` in `.env`.
Conversion can take time on large databases. Ask your database administrator for
help if the command reports insufficient permissions. Check the result:

```sh
jesse enable-timescale --status
```

For Docker commands and database-image changes, see the
[upgrade guide](/docs/upgrades/from-3-2-to-3-3#optional-timescaledb-migration).

Use `--no-compression` during initial setup if you only want time partitioning.
It does not disable compression that was already enabled.

## New projects without Docker

With TimescaleDB installed, this `.env` setting lets Jesse automatically configure
an empty candle table at startup:

```env
TIMESCALEDB_ENABLED=TRUE
```

The project template already includes this setting, so new projects need no extra
edit. If it is missing or set to `FALSE`, Jesse skips initial TimescaleDB setup.
If TimescaleDB is unavailable, Jesse continues with ordinary PostgreSQL. Existing
candles need the migration command above.

## FAQ

### Why should I use TimescaleDB instead of standard PostgreSQL?

Candle history grows quickly, and TimescaleDB reduces its disk use by compressing
history older than 30 days, without deleting any candles. It is worth it if
storage is a concern for your database. If not, standard PostgreSQL works fine.
Query speed depends on your data and workload, so do not expect a guaranteed speedup.

### Is the environment variable required after setup?

No. Once the candle table is converted, TimescaleDB manages its storage and
compression automatically. Removing `TIMESCALEDB_ENABLED` or setting it to
`FALSE` does not disable compression or convert the table back to plain PostgreSQL.

### Do existing PostgreSQL users have to switch?

No. Your existing PostgreSQL setup continues to work.

### How do I migrate an existing Docker database?

Follow the [optional migration steps](/docs/upgrades/from-3-2-to-3-3#optional-timescaledb-migration).
Changing the database image alone does not upgrade existing data.

### Can I switch back to plain PostgreSQL afterward?

After conversion, the database needs TimescaleDB even if you remove the setting.
Switching back requires exporting the data and restoring it into a separate
plain PostgreSQL database.
