# Getting Started

Getting started with Jesse is already easy. We've also done our best to make it even easier for all operating systems.

<!-- In case you already have the required stack installed on your environment, you can move on to the [package installation](./package-installation) page.   -->

## Required Stack

Here is the required stack:

-   Python >= `3.6`
-   pip >= `19.3.0`
-   PostgreSQL >= `10`
-   ta-lib >= `0.4`

Most of them, if not all, are installed on your machine. We provide guides on how to install them for 3 major operating systems. We also provide a docker image which might be the fastest way to get started.

- [Docker guide](/docs/getting-started/docker.md)
- [Ubuntu](/docs/getting-started/environment-setup.html#ubuntu)
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

## Upgrade with PIP

We are constantly pushing new patches. To upgrade to the latest version run:
```
pip install -U jesse
```

::: warning
Sometimes pip doesn't upgrade to the latest version on first time running above command. To make sure you're running the latest release, checkout the latest version number on [PyPi](https://pypi.org/project/jesse/), and then make sure you see that version in `pip list` output.
:::

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
