# Docker

There's not just one correct way to use Docker; there's plenty. On this page, however, we'll describe a minimal setup ready to go using [docker compose](https://docs.docker.com/compose).

If you're looking for a ready to work repository, see [jesse-stack-docker](https://github.com/jesse-ai/jesse-stack-docker). Click on `Use as template` and pull your forked repo locally.
This repository uses a docker-compose file that includes different services: main jesse, postgres database, [jesse trade info](https://github.com/nicolay-zlobin/jesse-trades-info) web chart US to explore backtest result. It mounts locally files to persist on your machine the database data contains trade history use for backtest, and your Jesse strategy files:
```sh
# docker-compose.yml
version: '3.8'

services:

  jesse:
    image: salehmir/jesse:0.22.1
    depends_on:
      - db
      - jesse-trades-info
    environment:
      ENV_DATABASES_POSTGRES_HOST: "db"

# Inject api credentials from host env (only for live):
#      ENV_EXCHANGES_TESTNET_BINANCE_FUTURES_API_KEY: ${ENV_EXCHANGES_TESTNET_BINANCE_FUTURES_API_KEY}
#      ENV_EXCHANGES_TESTNET_BINANCE_FUTURES_API_SECRET: ${ENV_EXCHANGES_TESTNET_BINANCE_FUTURES_API_SECRET}

# Inject api credentials from env file (only for live):
#    env_file:
#      .env

    ports:
      - 8888:8888
    volumes:
      - ./jesseData:/home
# Mount the live package as volume (only for live):
#      - ./jesse_live-0.0.2-cp39-cp39-manylinux2010_x86_64.whl:/jesse_live-0.0.2-cp39-cp39-manylinux2010_x86_64.whl

  jesse-trades-info:
    image: jessetradesinfo/jesse-trades-info:v0.2.1
    depends_on:
      - db
    environment:
      DB_HOST: db
      DB_NAME: jesse_db
      DB_USER: jesse_user
      DB_PASSWORD: password
      DB_PORT: 5432
    ports:
      - 3000:3000

  db:
    image: postgres:12-alpine
    environment:
      POSTGRES_USER: jesse_user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: jesse_db
      POSTGRES_HOST_AUTH_METHOD: password
    ports:
      - 5432:5432
    volumes:
      - ./dbData:/var/lib/postgresql/data

```

Start Jesse container and its dependencies:
```sh
docker-compose run jesse bash
```

Now you're logged into a terminal inside the Jesse container, let's create a new project at `/home`, the docker mounted volume from your local machine, so we can open it with a code editor:
```sh
cd /home
jesse make-project mybot
```

Now you'll find a `mybot` directory in your local machine. Open it with your code editor and write your own strategies. 

When you're done with the container, you can exit using `exit` command. 

To stop all container and dependencies
```sh
docker-compose stop
```

Next time you want to access the container, of course, you don't need to repeat the above steps. Just restart the container and then start the database:
```sh
docker-compose run jesse bash
```

## Managing sensitive config values 

Jesse supports environment variable injection for any config file keys. The key format follows this rule: join the config node and replace the ` ` by `_`. Env variable must be prefixed with `ENV_`.

For example, `databases -> postgres -> host` value will be taken from env variables with the key `ENV_DATABASES_POSTGRES_HOST`.

To keep your config file versioned, it's recommended to inject API key and secret.

An example for binance testnet futures keys (`exchanges -> Testnet Binance Futures -> api_key`) would be:
- `ENV_EXCHANGES_TESTNET_BINANCE_FUTURES_API_KEY`
- `ENV_EXCHANGES_TESTNET_BINANCE_FUTURES_API_SECRET`
