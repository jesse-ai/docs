# Докер

Нет единственного правильного способа использовать Docker; их много. На этой странице, тем не мение, мы опишем минимальную установку, готовую к работе с [docker compose](https://docs.docker.com/compose).

Если вы ищете готовую сборку, смотрите репозиторий [jesse-stack-docker](https://github.com/jesse-ai/jesse-stack-docker). Нажмите на `Use as template` и тяните свой ответвленный репозиторий локально.
Этот репозиторий использует файл docker-compose который включает несколько сервисов: основной jesse, базу данных postgres, информацию о сделках [jesse trade info](https://github.com/nicolay-zlobin/jesse-trades-info) веб-график созданный для обзора результатов тестирования. Он монтирует локальные файлы для сохранения на вашей базе данных вашей машины, база данных хранит историю торгов используемых для бэктестов, и ваши файлы стратегии Джесси:
```sh
# docker-compose.yml
version: '3.8'

services:

  jesse:
    image: salehmir/jesse:0.21.3
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

Запуск контейнера Джесси и его зависимостей:
```sh
docker-compose run jesse bash
```
Теперь вы вошли в терминал внутри контейнера Джесси, давайте создадим новый проект в `/home`, докер монтирует диск вашей локальной машины, так что мы можем открыть его с помощью редактора кода:
```sh
cd /home
jesse make-project mybot
```

Теперь вы найдете `mybot` каталог в вашем локальном компьютере. Откройте его редактором кода и напишите свои собственные стратегии. 

Когда вы закончите с контейнером, вы можете выйти с помощью `exit` команды. 

Чтобы остановить весь контейнер и зависимости
```sh
docker-compose stop
```

В следующий раз, когда вы хотите получить доступ к контейнеру, конечно, вам не нужно повторять вышеуказанные шаги. Просто перезапустите контейнер, а затем запустите базу данных:
```sh
docker-compose run jesse bash
```
