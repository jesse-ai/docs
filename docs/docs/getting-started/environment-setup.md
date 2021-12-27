# Environment Setup

On this page, we'll go through how to prepare your environment before installing Jesse. We'll cover three major operating systems:

- [Ubuntu](/docs/getting-started/environment-setup.html#ubuntu)
- [macOS](/docs/getting-started/environment-setup.html#macos)
- [Windows](/docs/getting-started/environment-setup.html#windows)

::: tip
Remember that you don't need to do any of these steps if you want to use [Docker](./docker.md) instead.
:::

::: tip
A good practice for providing an environment for running Python applications is setting up Python virtual environments. Especially when you have different projects with their own dependencies, you can create an isolated environment regardless of what dependencies every other project has. [Here](https://docs.python.org/3/tutorial/venv.html) you can find more information on creating virtual environments.
:::

## Ubuntu

We provide [bash scripts](https://github.com/jesse-ai/stack-installer) that install all the required stack and pip packages including Jesse itself on a machine running a fresh Ubuntu LTS installation.

Run below one of below commands based on your installed Ubuntu version:

```sh
# For Ubuntu 18.04 LTS
source <(curl -fsSL https://raw.githubusercontent.com/jesse-ai/stack-installer/master/ubuntu-18.04.sh)

# For Ubuntu 20.04 LTS
source <(curl -fsSL https://raw.githubusercontent.com/jesse-ai/stack-installer/master/ubuntu-20.04.sh)
```

In case a fresh install isn't possible for you, look at the commands used by our scripts and execute only the ones that suit your environment:

- [18.04 script](https://github.com/jesse-ai/stack-installer/blob/master/ubuntu-18.04.sh)
- [20.04 script](https://github.com/jesse-ai/stack-installer/blob/master/ubuntu-20.04.sh)

::: warning
You should have at least 2GB RAM or the build of ta-lib [might fail](https://github.com/mrjbq7/ta-lib/issues/290).
A workaround is using a prebuilt wheel (.whl) of ta-lib.
:::

By default, values of `POSTGRES_HOST` and `REDIS_HOST` are set to `postgres` and `redis` which are the default values of the official Docker containers. You have to change them both to `localhost`.

### PostgreSQL

Now you have to create the database, user, and password. You can do this by running the following commands:

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

Your environment should now be ready to [install and run](./README.md) Jesse.

## macOS

Installation on macOS is easy thanks to Homebrew. If you don't have [Homebrew](https://brew.sh/) installed, install it by running:

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

:::tip
Starting v`0.23.1`, Jesse can be installed natively on mac machines with Apple Silicon (M1). The performance on it amazing is BTW! 

The only dependency package that doesn't work with M1 macs yet is `numba`. However, we made the `numba` package optional. Meaning that if you are on an M1 machine, it won't install it, and the indicators that use it will still work but will be a little slower. 

Installing scipy is a bit tricky. We recommend installing it with Homebrew:
```
brew install openblas
export OPENBLAS=$(brew --prefix openblas)
export CFLAGS="-falign-functions=8 ${CFLAGS}"
brew install scipy
```
:::

Now install Python, ta-lib, Redis, and PostgreSQL by running the below commands one by one:

```sh
brew install python
brew install ta-lib
brew install redis
brew install postgresql
```

### PostgreSQL

The last step is to create a PostgreSQL database and user:

```sh
# open PostgreSQL CLI
psql postgres
# create database
CREATE DATABASE jesse_db;
# create new user
CREATE USER jesse_user WITH PASSWORD 'password';
# set privileges of the created user
GRANT ALL PRIVILEGES ON DATABASE jesse_db to jesse_user;
# exit PostgreSQL CLI
\q
```

That's it. You should now be able to [install and run Jesse](./README.md).

## Windows

### Python and pip
[Download](https://www.python.org/downloads/windows) the official Python installer. It doesn't matter whether you choose the executable installer or the web-based installer. What matters is to choose the right version for your system type. If you are on `32bit` Windows download `Windows x86 ... installer`. If you are on 64bit Windows get the `Windows x86-64 ... installer`.

:::tip
Not sure which system type you are on? Open a file explorer window. Right-click on `This PC` and then `Properties`. Under `System` there is `System type`.
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
Start again or add it to your path manually. To edit your PATH variable use the windows search and search for `environment` you should see `Edit environment variables for your account`. Click that. Search for the `PATH` variable in the user section. Select it and click `Edit`. Click `Browse` and find your python installation folder.
You are sure Python is in the PATH? Restart your CLI and/or your machine might help.
:::

### Redis

The bad news are there is no version of Redis for windows. The good news: We can install Redis with the help of a virtual machine (VM) or windows subsystem.
Here we will be using a linux on the windows subystem:

Before installing any Linux distros for WSL, you must ensure that the "Windows Subsystem for Linux" optional feature is enabled:

Open PowerShell as Administrator (windows search for "PowerShell" > right click > "run as administrator)  and type:
`
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
    `
    
Restart your computer when prompted.

Now download and install [Ubuntu 20.04](https://www.microsoft.com/en-us/store/p/ubuntu-2004-lts/9n6svws3rx71) from the [Microsoft Store](http://microsoft.com/store).

Launch ubuntu you will be promted to select a username and password for ubuntu.

After that install Redis (you will be asked for the password you just set):

```sh
    sudo apt-get update
    sudo apt-get upgrade
    sudo apt-get install redis-server
    redis-cli -v
```

 You should end up with something like that: `redis-cli X.X.X`
 
 This will start the server. You can close the windows after that:
```  
    redis-server
```
 
 But you need to start Redis server after each system reboot by running the redis-server command in the ubuntu terminal.
 
 Another alternative is [Memurai](https://www.memurai.com) - which has to be restarted every 10 days in the free version though.

### PostgreSQL
[Download](https://www.postgresql.org/download/windows) and install a version greater than `11.2` matching your system type (Windows `x86-64` or `x86-32`).

::: warning
Make sure to save the password you set for the superuser.
You can unselect the components `pgAdmin` and `Stack Builder`. You can leave the other settings as they are.
:::

Now add PostgreSQL to your `PATH`.
To edit your `PATH` variable use the windows search and search for `environment`. Click on `Edit environment variables for your account`. Search for the `PATH` variable in the user section. Select it and click `Edit`. Now click `Browse` and find your PostgreSQL installation folder. Select the `bin` folder and save everything.
The added path should look something like `C:\Program Files\PostgreSQL\12\bin`.

Now open a CMD to create the database for Jesse by executing the following commands:

```sh
# Switch to postgres user. You will be asked for the password
psql -U postgres
# Create the database
CREATE DATABASE jesse_db;
# create a new user
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

::: tip
You don't have to use the prebuilt wheel. You can build it yourself, but you have more work this way. There is a tutorial: [HERE](https://github.com/mrjbq7/ta-lib#windows)
:::

### Cython
Run:

```sh
pip install cython
```

That's it! You should now be able to [install and run](./README.md) Jesse.
