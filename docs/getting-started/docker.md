# Docker

There's not just one correct way to use Docker; there's plenty. In this page however we'll describe a minimal setup ready to go using [docker  compose](https://docs.docker.com/compose).

If you're looking for a ready to work repository, see [jesse-stack-docker](https://github.com/jesse-ai/jesse-stack-docker). Click on `Use as template` and pull your forked repo locally.
This repository use docker-compose file that includes different services: main jesse, postgres database, [jesse trade info](https://github.com/nicolay-zlobin/jesse-trades-info) web chart ui to explore backtest result. It mounts locally files to persist on you machine the database data contains trade history use for backtest, and your jesse strategy files:
```sh
# docker-compose.yml
version: '3.8'

services:

  jesse:
    image: salehmir/jesse:0.18.2
    volumes:
      - ./jesseData:/home
    depends_on:
      - db
      - jesse-trades-info
    environment:
      ENV_DATABASES_POSTGRES_HOST: "db"
    ports:
      - 8888:8888

  jesse-trades-info:
    image: jessetradesinfo/jesse-trades-info:v0.1.0
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
    ports:
      - 5432:5432
    volumes:
      - ./dbData:/var/lib/postgresql/data

```

Start Jesse container and it's dependencies:
```sh
docker-compose run jesse bash
```

Now you're logged into a terminal inside the jesse container, let's create a new project at `/home`, the docker mounted volume from your local machine, so we can open it with a code editor:
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

Next time you want to access the container, of course you don't need to repeat above steps. Just restart the container and then start the database:
```sh
docker-compose run jesse bash
```
