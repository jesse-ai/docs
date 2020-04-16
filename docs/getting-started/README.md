# Getting Started

Getting started with Jesse is already easy. We've also done our best to make it even easier for all operating systems. 

<!-- In case you already have the required stack installed on your environment, you can move on to the [package installation](./package-installation) page.   -->

## Required Stack

Here are the required stack:

-   Python >= `3.6`
-   PostgreSQL >= `10`
-   Redis >= `4`
-   ta-lib >= `0.4`
-   pip >= `19.3.0`

Most of you all if not most of them installed on your machine. We provide guides on how to install them for 3 major operating systems. We also provide a docker image which might be the fastest way to get started. 

- [Docker guide](/docs/getting-started/docker.md)
- [Ubuntu 18.04](/docs/getting-started/environment-setup.html#ubuntu)
- [macOS](/docs/getting-started/environment-setup.html#macos)
- [Windows](/docs/getting-started/environment-setup.html#windows)

## PIP Installation

First install the required dependency packages:
```
pip install -r https://raw.githubusercontent.com/jesse-ai/jesse/master/requirements.txt
```

Now install Jesse:
```
pip install jesse
```

We are constantly pushing new patches. To update to the latest version run:
```
pip install -U jesse
```

## Create the database
```
# Connect and create database
sudo su - postgres
psql
CREATE DATABASE jesse_db;
# create new user with privilage to access jesse_db (useful for remote access)
CREATE USER jesse_user WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE jesse_db to jesse_user;
\q
exit
```
## Create a new project

You'll need to create your own Jesse project in order to define your very own strategies. 

Go to the directory you intend to create the project in and run:

```
jesse make-project name-of-project
```

This will create a new project containing only files and folders that you actually need:

```sh
├── config.py # file where you enter your database credentials, etc
├── routes.py # file where routes are defined in 
├── storage # folder containing logs, chart images, etc
│   ├── charts
│   ├── genetics
│   ├── logs
│   │   └── trades
│   └── temp # directory that Jesse uses behind the scenes. 
│   └── trading-view-pine-editor
└── strategies # folder where you define your strategies
    ├── Strategy01
    │   └─ __init__.py
    └── Strategy02
        └─ __init__.py
```
