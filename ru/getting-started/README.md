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
- [Ubuntu](/ru/getting-started/environment-setup.html#ubuntu)
- [macOS](/ru/getting-started/environment-setup.html#macos)
- [Windows](/ru/getting-started/environment-setup.html#windows)

## Установка через PIP

Во первых установите необходимые пакеты зависимостей:
```
pip install -r https://raw.githubusercontent.com/jesse-ai/jesse/master/requirements.txt
```

Теперь установите Джесси:
```
pip install jesse
```

## Обновление через PIP

Мы постоянно выкатываем новые патчи. Чтобы обновиться до последней версии выполните:
```
pip install -U jesse
```

::: warning Внимание
Иногда pip не обновляет до последней версии с первого раза выполнения команды. Чтобы убедиться что вы запускаете последний релиз, проверьте последний номер версии на [PyPi](https://pypi.org/project/jesse/), и далее убедитесь что вы видете эту же версию в списке команды `pip list`. 
:::

## Создание нового проекта

Вам нужно будет создать свой собственный проект Jesse, чтобы определить свои собственные стратегии.

Перейдите в каталог, который вы намерены создать проект и запустите:

```
jesse make-project name-of-project
```

Это создаст новый проект, содержащий только файлы и папки, которые действительно необходимы:

```sh
├── config.py # файл где вы заполняете данные о вашей базе данных учетных записях и тд
├── routes.py # файл где обозначаются торговые маршруты
├── storage # папка содержащая логи, изображения графиков и тд
│   ├── charts
│   ├── genetics
│   ├── logs
│   │   └── trades
│   └── temp # директория которую Джесси использует для закулисных дел
│   └── trading-view-pine-editor
└── strategies # директория в которой вы определяете ваши стратегии
    ├── Strategy01
    │   └─ __init__.py
    └── Strategy02
        └─ __init__.py
```
