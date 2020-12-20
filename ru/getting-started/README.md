# Давайте начнём

Начать с Джесси реально легко. Установка сделана как можно проще для всех операционных систем.

<!-- In case you already have the required stack installed on your environment, you can move on to the [package installation](./package-installation) page.   -->

## Используемый стек

Используемый стек:

-   Python >= `3.6`
-   pip >= `19.3.0`
-   PostgreSQL >= `10`
-   ta-lib >= `0.4`

У большинства из вас это уже установлено. Это инструкции по установке для трех основных операционных систем. Есть Докер образ Джесси, который позваляет быстрее всего начать работать. 

- [Docker guide](/ru/getting-started/docker.md)
- [Ubuntu 18.04](/ru/getting-started/environment-setup.html#ubuntu)
- [macOS](/ru/getting-started/environment-setup.html#macos)
- [Windows](/ru/getting-started/environment-setup.html#windows)

## Установка через PIP

First install the required dependency packages:
```
pip install -r https://raw.githubusercontent.com/jesse-ai/jesse/master/requirements.txt
```

Now install Jesse:
```
pip install jesse
```

## Обновление через PIP

We are constantly pushing new patches. To upgrade to the latest version run:
```
pip install -U jesse
```

::: warning
Sometimes pip doesn't upgrade to the latest version on first time running above command. To make sure you're running the latest release, checkout the latest version number on [PyPi](https://pypi.org/project/jesse/), and then make sure you see that version in `pip list` output. 
:::

## Создание нового проекта

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
