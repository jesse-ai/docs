# Environment Setup

On this page, we'll go through how to prepare your environment before installing Jesse. We'll cover the instructions for all major operating systems:

- [Remote server](/docs/getting-started/environment-setup.html#remote-server)
- [Ubuntu](/docs/getting-started/environment-setup.html#ubuntu)
- [macOS](/docs/getting-started/environment-setup.html#macos)
- [Windows](/docs/getting-started/environment-setup.html#windows)

::: tip
Remember that you don't need to do any of these steps if you want to use [Docker](./docker.md) instead.
:::

## Remote server

In case you intend to use a remote server, we have step-by-step Youtube screencasts for you:
- [How to set up a remote **dev environment** for algo-trading with Python in **VSCode**](https://www.youtube.com/watch?v=hAcG8Oey4VE) 🎥
- [How to **deploy** your Jesse project into the production server for **live trading**](https://www.youtube.com/watch?v=cUNX5FAVVYo) 🎥

These videos cover earlier releases. They still work except you **don't need to install Redis** anymore.

## Ubuntu

::: tip 🎥 Video Tutorial
In case you prefer watching a video, here's a [screencast explaining Ubuntu setup](https://www.youtube.com/watch?v=00RY6eL5CXw). It covers an earlier release; follow the current steps below for the required services.
:::

### Fresh install (recommended for a newly made server)

We provide [bash scripts](https://github.com/jesse-ai/stack-installer) that install everything Jesse needs on a fresh Ubuntu server:
- Miniconda with a `jesse` environment (Python 3.12)
- PostgreSQL with TimescaleDB
- Jesse itself
- a ready-to-use project in `~/my-bot`

Use the script that matches your Ubuntu release. The server needs at least 2 GB of RAM.

Ubuntu 26.04 LTS:

```sh
curl -fsSL https://raw.githubusercontent.com/jesse-ai/stack-installer/master/ubuntu-26.04.sh -o install-jesse.sh
sudo bash install-jesse.sh
```

Ubuntu 24.04 LTS:

```sh
curl -fsSL https://raw.githubusercontent.com/jesse-ai/stack-installer/master/ubuntu-24.04.sh -o install-jesse.sh
sudo bash install-jesse.sh
```

Ubuntu 22.04 LTS:

```sh
curl -fsSL https://raw.githubusercontent.com/jesse-ai/stack-installer/master/ubuntu-22.04.sh -o install-jesse.sh
sudo bash install-jesse.sh
```

When it finishes, log out and back in, then start Jesse with `cd ~/my-bot && jesse run`. Change `PASSWORD` in `~/my-bot/.env` before exposing the dashboard to the internet. See the [stack-installer README](https://github.com/jesse-ai/stack-installer#readme) for options.

### Existing installation (recommended for desktop users)

If a fresh install isn't possible for you, you can look at the commands used by our script and execute only the ones that suit your environment:

#### Install Miniconda

Go to the [Miniconda](https://www.anaconda.com/download/success/) website and download the latest version for your system.

Go to the directory you downloaded the file to and run the following command.

**Remember to type "yes" at the end of the installation process. to initialize conda.**

```sh
bash {name of the file you downloaded}
```

To create a new environment and activate it, run the following commands:

```sh
conda create --name jesse python=3.12
conda activate jesse
```

::: tip
Remember that you need to activate the environment every time you open a new terminal by running `conda activate jesse`.
:::

#### Install PostgreSQL

To install PostgreSQL, run the following command:

```sh
sudo apt-get install postgresql postgresql-contrib
```

To create the database and user, run the following commands:

```sh
sudo -u postgres psql -c "CREATE DATABASE jesse_db;"
sudo -u postgres psql -c "CREATE USER jesse_user WITH PASSWORD 'password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE jesse_db TO jesse_user;"
sudo -u postgres psql -c "ALTER DATABASE jesse_db OWNER TO jesse_user;"
```

::: tip
For a native PostgreSQL installation, set `POSTGRES_HOST=localhost` in your
Jesse project's `.env` file. The `postgres` hostname is for Docker setups.
:::

Your environment should now be ready to [install and run](./index.md) Jesse.

## macOS

::: tip 🎥 Video Tutorial
In case you prefer watching a video, here's a [screencast explaining macOS setup](https://youtu.be/R0uTj92wRTU). It covers an earlier release; follow the current steps below for the required services.
:::

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
Create a dedicated environment for Jesse using Python 3.12:
```sh
conda create --name jesse python=3.12
```

Activate the environment whenever you work with Jesse:
```sh
conda activate jesse
```

### 4. Install PostgreSQL

Install and start PostgreSQL via Homebrew:
```sh
brew install postgresql@17
brew services start postgresql@17
```

Follow Homebrew's installation output to add PostgreSQL's `bin` directory to your
`PATH` if `psql` is not available in your terminal.

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

Set `POSTGRES_HOST=localhost` in your Jesse project's `.env` file. Your macOS
environment is now ready to [install and run Jesse](./index.md).

## Windows

::: tip 🎥 Video Tutorial
In case you prefer watching a video, here's a [screencast explaining Windows setup](https://youtu.be/R5aIUmOOBr8). It covers an earlier release; follow the current steps below for the required services.
:::

### Miniconda
Miniconda provides isolated Python environments, preventing conflicts with other Python packages on your system.

Download and install Miniconda using these commands in PowerShell:

```powershell
Invoke-WebRequest https://repo.anaconda.com/miniconda/Miniconda3-latest-Windows-x86_64.exe -OutFile .\miniconda.exe
Start-Process -FilePath .\miniconda.exe -ArgumentList '/S' -Wait
Remove-Item .\miniconda.exe
```

Open **Anaconda Prompt (Miniconda3)** from the Start menu after installation.
Use it for the Conda and Jesse commands below. To use PowerShell instead, run
`conda init powershell` from Anaconda Prompt and open a new PowerShell window.

Create a dedicated environment for Jesse using Python 3.12:

```sh
conda create --name jesse python=3.12
```

Activate the environment whenever you work with Jesse:
```sh
conda activate jesse
```

Run `conda activate jesse` in every new terminal before running Jesse or Python commands.

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

Set `POSTGRES_HOST=localhost` in your Jesse project's `.env` file. That's it!
You should now be able to [install and run](./index.md) Jesse.
