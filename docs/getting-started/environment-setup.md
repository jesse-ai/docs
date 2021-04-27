# Environment Setup

In this page we'll go through how to prepare your environment before installing Jesse. We'll cover three major operating systems:

- [Ubuntu](/docs/getting-started/environment-setup.html#ubuntu)
- [macOS](/docs/getting-started/environment-setup.html#macos)
- [Windows](/docs/getting-started/environment-setup.html#windows)

::: tip
If for any reason this installation is not possible for you, you can always use our [Docker image](/docs/getting-started/docker.md).
:::

::: tip
A good practice for providing an environment for running Python applications is setting up Python virtual environments. Especially when you have different projects with their own dependencies, you can create an isolated environment regardless of what dependencies every other project has. [Here](https://docs.python.org/3/tutorial/venv.html) you can find more information on creating virtual environments.
:::

## Ubuntu

We provide [bash scripts](https://github.com/jesse-ai/stack-installer) that install all the required stack and pip packages including Jesse itself on a machine running a fresh Ubuntu LTS installation.

Run below commands based on your installed Ubuntu version:

```sh
# For Ubuntu 18.04 LTS
source <(curl -fsSL https://raw.githubusercontent.com/jesse-ai/stack-installer/master/ubuntu-18.04.sh)

# For Ubuntu 20.04 LTS
source <(curl -fsSL https://raw.githubusercontent.com/jesse-ai/stack-installer/master/ubuntu-20.04.sh)
```

In case a fresh install isn't possible for you, look at the commands used by our scripts and execute the commands that suit your environment:

- [18.04 script](https://github.com/jesse-ai/stack-installer/blob/master/ubuntu-18.04.sh)
- [20.04 script](https://github.com/jesse-ai/stack-installer/blob/master/ubuntu-20.04.sh)

::: warning
You should have at least 2GB RAM or the build of ta-lib [might fail](https://github.com/mrjbq7/ta-lib/issues/290).
A workaround is using a prebuilt wheel (.whl) of ta-lib.
:::

By default, the PostgreSQL database and username in the `config.py` file are `jesse_db` & `jesse_user`, respectively; and `password` as the default password.

If you'd like these to be different from the default, please change them in your `config.py` prior to setting up PostgreSQL and replace the database and username that you choose in the following steps, otherwise the following is for the defaults.


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

Your PostgreSQL database and user are now ready. You can now quit psql with `\q`.

## macOS

Installation on macOS is easy thanks to Homebrew. If you don't have [Homebrew](https://brew.sh/) installed, install it by running:
```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

Now install Python, ta-lib, and PostgreSQL by running below commands one by one:

```sh
brew install python@3.8
brew install ta-lib
brew install postgresql
```

Last step is to create a PosgreSQL database and user:

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

:::tip
Not sure which system type you are on? Open a file explorer window. Right click on `This PC` and then `Properties`. Under `System` there is `System type`.
:::

::: warning
Make sure to check `Add Python 3.X to PATH` during installation. In the end, the installation may ask you to disable the length limit for the PATH. Make sure to do that, by clicking that. You can leave the other settings as they are.
:::

Now check if the installation was successful by opening a CMD and typing `python --version`. You should get `Python 3.X.X` according to the version you just installed. Type `pip --version`. You should get `pip 19.X.X from ...`.

::: tip
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

::: warning
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

### Cython
Run:

```sh
pip install cython
```

<br>
<br>

That's it. You should now be able to [install Jesse](/docs/getting-started/#pip-installation).
