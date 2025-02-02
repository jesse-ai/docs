# Environment Setup

On this page, we'll go through how to prepare your environment before installing Jesse. We'll cover three major operating systems:

- [Remote server](/docs/getting-started/environment-setup.html#remote-server)
- [Ubuntu](/docs/getting-started/environment-setup.html#ubuntu)
- [macOS](/docs/getting-started/environment-setup.html#macos)
- [Windows](/docs/getting-started/environment-setup.html#windows)

::: tip
Remember that you don't need to do any of these steps if you want to use [Docker](./docker.md) instead.
:::

::: tip
A good practice for providing an environment for running Python applications is setting up Python virtual environments. Especially when you have different projects with their own dependencies, you can create an isolated environment regardless of what dependencies every other project has. [Here](./#virtual-environment-optional-but-recommended) you can find more information on creating virtual environments.
:::

## Remote server

In case you intend to use a remote server, we have step-by-step Youtube screencasts for you:
- [How to set up a remote **dev environment** for algo-trading with Python in **VSCode**](https://www.youtube.com/watch?v=hAcG8Oey4VE) 🎥
- [How to **deploy** your Jesse project into the production server for **live trading**](https://www.youtube.com/watch?v=cUNX5FAVVYo) 🎥
## Ubuntu

We provide a [bash script](https://github.com/jesse-ai/stack-installer) that installs all the required stack and pip packages on machines running a fresh install of Ubuntu 22.04 LTS.

```sh
source <(curl -fsSL https://raw.githubusercontent.com/jesse-ai/stack-installer/master/ubuntu-22.04.sh)
```

If a fresh install isn't possible for you, you can look at the commands used by our script and execute only the ones that suit your environment:

-  [Ubuntu 22.04 installer script source code](https://github.com/jesse-ai/stack-installer/blob/master/ubuntu-22.04.sh)

::: warning
You should have at least 2GB of RAM or the build of ta-lib [might fail](https://github.com/mrjbq7/ta-lib/issues/290).
A workaround is using a prebuilt wheel (.whl) of ta-lib.
:::

By default, the values of `POSTGRES_HOST` and `REDIS_HOST` are set to `postgres` and `redis`, which are the default values of the official Docker containers. You have to change them both to `localhost`.

::: tip
The installer script automatically creates the required PostgreSQL database and user for you, so you don't need to set up the database manually.
:::

Your environment should now be ready to [install and run](./index.md) Jesse.

## macOS

Installation on macOS is straightforward using Homebrew and Miniconda. Follow these steps to set up your environment:

### 1. Install Homebrew
If you don't have [Homebrew](https://brew.sh/) installed, run this command:

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

### 2. Install Miniconda
Miniconda provides isolated Python environments, preventing conflicts with other Python packages on your system.

For Apple Silicon (M1/M2/M3/M4) machines:
```sh
mkdir -p ~/miniconda3
curl https://repo.anaconda.com/miniconda/Miniconda3-latest-MacOSX-arm64.sh -o ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3
rm ~/miniconda3/miniconda.sh
```

For Intel-based machines:
```sh
mkdir -p ~/miniconda3
curl https://repo.anaconda.com/miniconda/Miniconda3-latest-MacOSX-x86_64.sh -o ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3
rm ~/miniconda3/miniconda.sh
```

Initialize conda:
```sh
source ~/miniconda3/bin/activate
conda init --all
```

### 3. Create Jesse Environment
Create a dedicated environment for Jesse using Python 3.13:
```sh
conda create --name jesse python=3.13
```

Activate the environment whenever you work with Jesse:
```sh
conda activate jesse
```

### 4. Install Required Packages
Install essential dependencies via Homebrew:
```sh
brew install ta-lib redis postgresql@17
```

### 5. Set Up PostgreSQL
Create the database and user for Jesse:
```sh
# open PostgreSQL CLI
psql postgres
# create database
CREATE DATABASE jesse_db;
# create new user
CREATE USER jesse_user WITH PASSWORD 'password';
# set privileges of the created user
GRANT ALL PRIVILEGES ON DATABASE jesse_db to jesse_user;
# set the owner of the database to the new user (required for PostgreSQL >= 15)
ALTER DATABASE jesse_db OWNER TO jesse_user;
# exit PostgreSQL CLI
\q
```

Your macOS environment is now ready to [install and run Jesse](./index.md).

## Windows

### Miniconda
Miniconda provides isolated Python environments, preventing conflicts with other Python packages on your system.

Download and install Miniconda using these commands in PowerShell:

```sh
curl https://repo.anaconda.com/miniconda/Miniconda3-latest-Windows-x86_64.exe -o .\miniconda.exe
start /wait "" .\miniconda.exe /S
del .\miniconda.exe
```

Create a dedicated environment for Jesse using Python 3.13:

```sh
conda create --name jesse python=3.13
```

Activate the environment whenever you work with Jesse:
```sh
conda activate jesse
```

Remember that you need to run the `conda activate jesse` command in every new PowerShell window you open before running any Jesse or Python commands.

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
# set the owner of the database to the new user (required for PostgreSQL >= 15)
ALTER DATABASE jesse_db OWNER TO jesse_user;
# exit PostgreSQL CLI
\q
```


### Talib

To install TA-Lib on Windows, you can use prebuilt wheels. Run the command that matches your Python version:

- **Python 3.10 64-bit:**
  ```sh
  pip install https://github.com/saleh-mir/talib-build/raw/refs/heads/main/windows/TA_Lib-0.4.32-cp310-cp310-win_amd64.whl
  ```

- **Python 3.11 64-bit:**
  ```sh
  pip install https://github.com/saleh-mir/talib-build/raw/refs/heads/main/windows/TA_Lib-0.4.32-cp311-cp311-win_amd64.whl
  ```

- **Python 3.12 64-bit:**
  ```sh
  pip install https://github.com/saleh-mir/talib-build/raw/refs/heads/main/windows/TA_Lib-0.4.32-cp312-cp312-win_amd64.whl
  ```

- **Python 3.13 64-bit:**
  ```sh
  pip install https://github.com/saleh-mir/talib-build/raw/refs/heads/main/windows/TA_Lib-0.4.32-cp313-cp313-win_amd64.whl
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

That's it! You should now be able to [install and run](./index.md) Jesse.
