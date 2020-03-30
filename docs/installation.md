# Installation

Here are the required stack:

-   Python >= `3.6` (`3.8` is recommended)
-   PostgreSQL >= `11.2`
-   Redis >= `5`
-   ta-lib >= `0.4`
-   pip >= `19.3.0`

In case you already have the required stack installed on your environment, just skip this page and continue with the `README` of the repository. 

## Installer script

I have created a bash script [hosted on Github](https://github.com/jesse-ai/stack-installer) that installs all the required stack that was mentioned above on a fresh instance of Ubuntu 18.04:

```sh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/jesse-ai/stack-installer/master/ubuntu-18.04.sh)"
```

## Docker image
In case prefer to use [Docker](https://docker.com/) for any reason, I have prepared a Docker image that has all the required stack installed on it:

```sh
# pull image
docker pull sullyfischer/jesse-ai:python38

# run it for the first time
docker run -it --name jesse sullyfischer/jesse-ai:python38 /bin/bash
# to reattach to created container
docker restart jesse && docker exec -it jesse bash
# start Redis and PostgreSQL
sudo service postgresql start && sudo service redis-server start
```

## Windows
- Python >= `3.6` (`3.8` is recommended)
	- https://www.python.org/downloads/windows/
- pip >= `19.3.0`
-   PostgreSQL >= `11.2`
	- https://www.postgresql.org/download/windows/
-   Redis >= `5`
	- https://redislabs.com/blog/redis-on-windows-10/
-   ta-lib >= `0.4`
	- https://medium.com/@keng16302/how-to-install-ta-lib-in-python-on-window-9303eb003fbb
- git >= 2.26.0 
	- https://git-scm.com/download/win


## Create a new project

Assuming that you have installed the `jesse` package, now it's time to create a project of your own that Jesse can read from:

```sh
jesse make-project name-of-project
```

This will create a new project containing only the files and folders that you actually need:

```sh
├── config.py # file where you enter your database credentials, etc
├── routes.py # file where routes are defined in 
├── storage # folder containing logs, chart images, etc
│   ├── charts
│   ├── genetics
│   ├── logs
│   │   └── trades
│   ├── temp
│   │   ├── backtest
│   │   └── optimize
│   └── trading-view-pine-editor
└── strategies # folder where you define your strategies
    ├── Strategy01
    │   └─ __init__.py
    └── Strategy02
        └─ __init__.py
```
