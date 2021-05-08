# Настройка среды

На этой странице мы рассмотрим, как подготовить среду перед установкой Джесси. Мы рассмотрим три основные операционные системы:

- [Ubuntu](/ru/getting-started/environment-setup.html#ubuntu)
- [macOS](/ru/getting-started/environment-setup.html#macos)
- [Windows](/ru/getting-started/environment-setup.html#windows)

::: tip Совет
Если по какой-либо причине эта установка для вас невозможна, вы всегда можете использовать наш [Докер образ](/ru/getting-started/docker.md)
::: 
::: tip Совет
Хорошая практика это предоставления среды для работы приложений Python устанавливая виртуальные среды Python. Особенно, когда у вас есть разные проекты со своими собственными зависимостями, вы можете создать изолированную среду независимо от того, какие зависимости каждый другой проект имеет. [Здесь](https://docs.python.org/3/tutorial/venv.html) вы можете найти больше информации о создании виртуальных сред.
:::
## Ubuntu

Мы предоставляем [скрипт bash](https://github.com/jesse-ai/stack-installer) который устанавливает все необходимые пакеты стека и пакетов, включая самого Джесси, на свежую машину с Ubuntu LTS.

Запустите команды ниже на основе установленной версии Ubuntu:


```sh
# Для Ubuntu 18.04 LTS
source <(curl -fsSL https://raw.githubusercontent.com/jesse-ai/stack-installer/master/ubuntu-18.04.sh)

# Для Ubuntu 20.04 LTS
source <(curl -fsSL https://raw.githubusercontent.com/jesse-ai/stack-installer/master/ubuntu-20.04.sh)
```

Если новая установка вам не подходит, посмотрите команды которые настраивают ваше окружение и используйте те которые подходят вашему окружению.
- [18.04 script](https://github.com/jesse-ai/stack-installer/blob/master/ubuntu-18.04.sh)
- [20.04 script](https://github.com/jesse-ai/stack-installer/blob/master/ubuntu-20.04.sh)


::: warning Внимание
У вас должно быть не менее 2 ГБ ОЗУ, иначе сборка ta-lib [might fail](https://github.com/mrjbq7/ta-lib/issues/290) 
Обходной путь использовать предварительно созданный wheel (.whl) ta-lib.
Так же можно попробовать [увеличить swap]()
:::

По умолчанию, база PostgreSQL и имя пользователя в файле `config.py` установлены `jesse_db` и `jesse_user`, соответственно; и `password` это пароль по умолчанию.

Если вы хотите, поменять значения по умолчанию, просто измените их в своем `config.py` перед настройкой PostgreSQL и замените их в следующих шагах, в противном случае эти значения будут значениями по умолчанию.


```sh
# switch to postgres user
sudo su - postgres
# open PostgreSQL CLI
psql
# create database
CREATE DATABASE jesse_db;
# create new user
CREATE USER jesse_user WITH PASSWORD 'password';
# set privileges of the created user
GRANT ALL PRIVILEGES ON DATABASE jesse_db to jesse_user;
# exit PostgreSQL CLI
\q
# exit postgres user (back to root)
exit
```

Ваша PostgreSQL база данных и пользователь готовы сейчас. Вы можете выйти из psql используя `\q`.

## macOS

Установка на macOS проста благодаря Homebrew. Если у вас не установлен [Homebrew](https://brew.sh/), то установите его выполнив:
```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

Далее установите Python, ta-lib, and PostgreSQL выполнив следующие команды одну за одной:

```sh
brew install python@3.8
brew install ta-lib
brew install postgresql
```

Последний шаг это создание базы и пользователя PosgreSQL:

```sh
# open PostgreSQL CLI
psql
# create database
CREATE DATABASE jesse_db;
# create new user
CREATE USER jesse_user WITH PASSWORD 'password';
# set privileges of the created user
GRANT ALL PRIVILEGES ON DATABASE jesse_db to jesse_user;
# exit PostgreSQL CLI
\q
```

Это все. Теперь вы в состоянии [установить Джесси](/ru/getting-started/#pip-installation).

## Windows

### Python and pip
[Скачайте](https://www.python.org/downloads/windows) официальный установщик Python. Неважно, выбираете ли вы исполняемый установщик или установщик основанный на веб. Что важно так это выбрать правильную версию для вашего типа системы. Если вы используете `32bit` Windows скачивайте `Windows x86 ... installer`. Если вы на 64bit Windows берите `Windows x86-64 ... installer`.

:::tip Совет
Не уверен, какой тип системы вы используте? Откройте проводник. Нажмите правой кнопкой мыши на `Этот компьютер` и далее `Свойства`. Под `Система` будет `Тип системы`.
:::

::: warning Внимание
Убедитесь что чекбокс `Add Python 3.X to PATH` во время установки включен. В конце установки, установщик может спросить вас о выключении лимита длинны для PATH. Обязательно сделайте это, нажав на это. Вы так же можете оставить другие настройки, как они есть.
:::

Теперь проверьте, была ли установка успешной, открыв CMD и напечатав `python --version`. Вы должны получить `Python 3.X.X` Согласно версии, которую вы только что установили. Напишите `pip --version`. Вы должны получить `pip 20.X.X из ...`.

::: tip Совет
В случае, если у вас:
```
python/pip не признан внутренней или внешней командой,
работоспособной программой или пакетным файлом.
```
Тогда вы, наверное, не выбрали `Add Python 3.X to PATH`.
Начните снова или добавьте его к вашему path вручную. Чтобы отредактировать вашу переменную PATH используйте поиск windows и ищите по запросу `среда` вы увидите `Редактировать переменные среды`. Нажмите на это. Найдите переменную `PATH` в этой секции. Выберите и нажмите `Редактировать`. Кликните `Обзор` и укажите директорию в которой установлен python.
Вы уверены, что Python находится в PATH? Перезагрузка CLI и/или машины может помочь.
:::

### PostgreSQL
[Скачайте](https://www.postgresql.org/download/windows) и установите версиюю которая больше `11.2` соответсвующая вашему типу операционной системы (Windows `x86-64` or `x86-32`).

::: warning Внимание
Обязательно сохраните пароль, который вы установили для суперпользователя.
Вы можете отменить выбор компонентов `pgAdmin` а также `Stack Builder`. Вы можете оставить другие настройки, как они есть.
:::

Теперь добавьте PostgreSQL в вашу `PATH`.
Чтобы отредактировать вашу переменную PATH используйте поиск windows и ищите по запросу `среда` вы увидите `Редактировать переменные среды`. Нажмите на это. Найдите переменную `PATH` в этой секции. Выберите и нажмите `Редактировать`. Кликните `Обзор` и укажите где установлен PostgreSQL. Выбирайте директорию `bin` и сохраните все.
Добавленный path должен выглядеть что-то вроде `C:\Program Files\PostgreSQL\12\bin`.

Теперь откройте CMD чтобы создать базу данных для джесси выполнив следующие команды:

```sh
# Переключитесь на пользователь Postgres. Вам будет предложено ввести пароль
psql -U postgres
# Создайте базу данных
CREATE DATABASE jesse_db;
# Создайте нового пользователя
CREATE USER jesse_user WITH PASSWORD 'password';
# Установите привилегии созданному пользователю
GRANT ALL PRIVILEGES ON DATABASE jesse_db to jesse_user;
# Выход из PostgreSQL CLI
\q
```


### Talib

Чтобы установить Talib на Windows самый простой способ - использовать уже собранный бинарник.
Заходите [сюда](https://www.lfd.uci.edu/~gohlke/pythonlibs/) и ищите `TA-Lib` и скачивайте версию `>= 0.4` соотвествующую вашей системе и версии python.

Например:
-   **TA_Lib‑0.4.17‑cp38‑cp38‑win_amd64.whl**: это для Python *3.8 (cp38)* и Windows *64bit (win_amd64)*
-   **TA_Lib‑0.4.17‑cp38‑cp38‑win32.whl**: это для Python *3.8 (cp38)* и Windows *32bit (win32)*

Теперь откройте CMD перейдите в директорию куда скачали бинарник и выполните:
```sh
pip install {downloaded_binary_file}
# для примера: 
# pip install TA_Lib‑0.4.17‑cp38‑cp38‑win_amd64.whl
```

Теперь проверьте что это работает: `pip list` вы должны увидеть ta-lib в 
этом списке.

> :information_source: Вам не нужно использовать предварительное wheel. Вы можете собрать сами, но следуя этому пути придется больше работать. Есть учебник: [ЗДЕСЬ](https://github.com/mrjbq7/ta-lib#windows)

### Cython
Запустите:

```sh
pip install cython
```

<br>
<br>

Вот и все. Теперь вы должны быть в состоянии [установить Джесси](/ru/getting-started/#pip-installation).
