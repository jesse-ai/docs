# Настройка среды

На этой странице мы рассмотрим, как подготовить среду перед установкой Джесси. Мы рассмотрим три основные операционные системы:

- [Ubuntu 18.04](/ru/getting-started/environment-setup.html#ubuntu)
- [macOS](/ru/getting-started/environment-setup.html#macos)
- [Windows](/ru/getting-started/environment-setup.html#windows)

::: tip Совет
Если по какой-либо причине эта установка для вас невозможна, вы всегда можете использовать наш [Докер образ](/docs/getting-started/docker.md)
:::

## Ubuntu

Мы предоставляем [скрипт bash](https://github.com/jesse-ai/stack-installer) который устанавливает все необходимые пакеты стека и пакетов, включая самого Джесси, на новую машину с Ubuntu 18.04.

Выполните эту команду:

```
sh -c "$(curl -fsSL https://raw.githubusercontent.com/jesse-ai/stack-installer/master/ubuntu-18.04.sh)"
```

Если новая установка вам не подходит, посмотрите [в репозитории](https://github.com/jesse-ai/stack-installer/blob/master/ubuntu-18.04.sh) команды которые настраивают ваше окружение и используйте те которые подходят вашему окружению.

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

That's it. You should now be able to [install Jesse](/docs/getting-started/#pip-installation).

## Windows

### Python and pip
[Download](https://www.python.org/downloads/windows) the official Python installer. It doesn't matter whether you choose the executable installer or web-base installer. What matters is to choose the right version for your system type. If you are on `32bit` Windows download `Windows x86 ... installer`. If you are on 64bit Windows get the `Windows x86-64 ... installer`.

:::tip Совет
Not sure which system type you are on? Open a file explorer window. Right click on `This PC` and then `Properties`. Under `System` there is `System type`.
:::

::: warning Внимание
Make sure to check `Add Python 3.X to PATH` during installation. In the end, the installation may ask you to disable the length limit for the PATH. Make sure to do that, by clicking that. You can leave the other settings as they are.
:::

Now check if the installation was successful by opening a CMD and typing `python --version`. You should get `Python 3.X.X` according to the version you just installed. Type `pip --version`. You should get `pip 19.X.X from ...`.

::: tip Совет
In case you get:
```
python/pip is not recognized as an internal or external command,
operable program or batch file.
```
Then you probably didn't check `Add Python 3.X to PATH`.
Start again or add it to your path manually. To edit your PATH variable use the windows search and search for `enviroment` you should see `Edit enviroment variables for you account`. Click that. Search for the `PATH` variable in the user section. Select it and click `Edit`. Click `Browse` and find your python installation folder.
You are sure Python is in the PATH? Restart your CLI and/or your machine might help.
:::

### PostgreSQL
[Download](https://www.postgresql.org/download/windows) and install a version greater than `11.2` matching your system type (Windows `x86-64` or `x86-32`).

::: warning Внимание
Make sure to save the password you set for the superuser.
You can unselect the components `pgAdmin` and `Stack Builder`. You can leave the other settings as they are.
:::

Now add PostgreSQL to your `PATH`.
To edit your `PATH` variable use the windows search and search for `enviroment`. Click on `Edit enviroment variables for you account`. Search for the `PATH` variable in the user section. Select it and click `Edit`. Now click `Browse` and find your PostgreSQL installation folder. Select the `bin` folder and save everything.
The added path shoud look something like `C:\Program Files\PostgreSQL\12\bin`.

Now open a CMD to create the database for jesse by executing the following commands:

```sh
# Switch to postgres user. You will be asked for the password
psql -U postgres
# Create the database
CREATE DATABASE jesse_db;
# create new user
CREATE USER jesse_user WITH PASSWORD 'password';
# set privileges of the created user
GRANT ALL PRIVILEGES ON DATABASE jesse_db to jesse_user;
# exit PostgreSQL CLI
\q
```


### Talib

To install Talib on Windows the easiest way is to use a prebuilt binary.
Go [here](https://www.lfd.uci.edu/~gohlke/pythonlibs/) and search `TA-Lib` and download a version `>= 0.4` matching your system and python version.

Example:
-   **TA_Lib‑0.4.17‑cp38‑cp38‑win_amd64.whl**: this would be the version for Python *3.8 (cp38)* and Windows *64bit (win_amd64)*
-   **TA_Lib‑0.4.17‑cp38‑cp38‑win32.whl**: this would be the version for Python *3.8 (cp38)* and Windows *32bit (win32)*

Now open CMD and go the directory where you downloaded the binary file and run:
```sh
pip install {downloaded_binary_file}
# for example: 
# pip install TA_Lib‑0.4.17‑cp38‑cp38‑win_amd64.whl
```

Now check if it worked by running: `pip list` you should now find ta-lib in that list.

> :information_source: You don't have to use the prebuilt wheel. You can build it yourself, but you have more work this way. There is a tutorial: [HERE](https://github.com/mrjbq7/ta-lib#windows)

### Tulipy

To install Tulipy on Windows the easiest way is to use a prebuilt binary.
Go [here](https://pypi.org/project/tulipy/#files) and download a version matching your system and python version.

As you will find there only whl files for python version 3.7 currently, we decided to offer the versions for 3.6 and 3.8 [here](https://github.com/jesse-ai/windows) to make it easier to get started with jesse. As for now we only have a prebuilt version for 3.8 64bit. It would be great if users, that have a corresponding enviroment would create the missing whl files and send it to us, so we can upload it there. You can do that with that command: `pip wheel tulipy` after installing [Microsoft Visual C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/). 

Example:
-   **tulipy-0.4.0-cp37-cp37m-win32.whl**: this would be the version for Python *3.7 (cp37)* and Windows *32bit (win_32)*
-   **tulipy-0.4.0-cp37-cp37m-win_amd64.whl**: this would be the version for Python *3.7 (cp37)* and Windows *64bit (win_amd64)*

Now open CMD and go the directory where you downloaded the binary file and run:
```sh
pip install {downloaded_binary_file}
# for example: 
# pip install tulipy-0.4.0-cp37-cp37m-win_amd64.whl
```

Now check if it worked by running: `pip list` you should now find tulipy in that list.


> :information_source: You don't have to use the prebuilt wheel. You can build it yourself, but you have more work this way. You need to have [Microsoft Visual C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/) installed to build it.

### Cython
Run:

```sh
pip install cython
```

<br>
<br>

That's it. You should now be able to [install Jesse](/docs/getting-started/#pip-installation).
