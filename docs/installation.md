# Installation

::: tip COMPATIBILITY NOTE
Jesse requires Python >= `3.7`
:::

Here are the required stack:

-   Python >= `3.6` (`3.8` is recommended)
-   PostgreSQL >= `11.2`
-   Redis >= `5`
-   ta-lib >= `0.4`
-   pip >= `19.3.0`

## Manual installation

Check out `README.md` file in project's root and follow the instructions for installation on Ubuntu 18.04.

## Docker image

TODO...

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