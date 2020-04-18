
## Ubuntu

We provide a [bash script](https://github.com/jesse-ai/stack-installer) that installs all the required stack and pip packages including Jesse itself on a fresh Ubuntu 18.04 machine.

Run below command:

```
sh -c "$(curl -fsSL https://raw.githubusercontent.com/jesse-ai/stack-installer/master/ubuntu-18.04.sh)"
```

In case a fresh install isn't possible for you, look at the [repository](https://github.com/jesse-ai/stack-installer/blob/master/ubuntu-18.04.sh) and use commands that suit your environment.

Now you need to create a PostgreSQL so Jesse can use for storing data:

### PostgreSQL Setup

By default, the PostgreSQL database and username in the `config.py` file are `jesse_db` & `jesse_user`, respectively; and `password` as the default password.

If you'd like these to be different than the default, please change them in your `config.py` prior to setting up PostgreSQL and replace the database and username that you choose in the following steps, otherwise the following is for the defaults.

 ** *Note: if using docker to set up Jesse, it is not necessary to manually set up PostgreSQL, as this will all be done through the docker image*

#### 1: Give PostgreSQL necessary privileges

```
sudo -u postgres psql
```

#### 2: Create your PostgreSQL user
```
sudo -u postgres createuser jesse_user
```
#### 3: Create your PostgreSQL database
```
sudo -u postgres createdb jesse_db
```
#### 4: Add the password for the user to your PostgreSQL database
```
sudo -u postgres psql
psql=# alter user jesse_user with encrypted password 'password';
```
#### 5: Give your PostgreSQL user the necessary privileges to properly use the database created for Jesse-AI
```
psql=# grant all privileges on database jesse_db to jesse_user;
```
Your PostgreSQL database and user are now ready. You can now quit psql with `\q`

## macOS

**Under construction... come back tomorrow**

## Windows

**Under construction... come back tomorrow**

<!-- It is highly recommended to use docker or linux on a virtual machine. Why? On Windows everything is far more complicated and many more clicks. -->
<!--
### Step 1: Python and pip
[Download](https://www.python.org/downloads/windows) the official Python installer. It doesn't matter whether you choose the executable installer or web-base installer. What matters is to choose the right version for your system type. If you are on `32bit` Windows download `Windows x86 ... installer`. If you are on 64bit Windows get the `Windows x86-64 ... installer`.

:::tip
Not sure which system type you are on? Open a file explorer window. Right click on `This PC` and then `Properties`. Under `System` there is `System type`.
:::

::: warning
Make sure to check `Add Python 3.X to PATH` during installation. In the end, the installation may ask you to disable the length limit for PATH. Make sure to do that, by clicking that. You can leave the other settings as they are.
:::

Now check if the installation was successful by opening a Command Prompt (CMD). Fastest way is using the windows search, and searching for `cmd`.

Type `python --version`. You should get `Python 3.X.X` according to the version you just installed. Type `pip --version`. You should get `pip 19.X.X from ...`.

::: tip
In case you get:
```
python/pip is not recognized as an internal or external command,
operable program or batch file.
```
Then you probably didn't check `Add Python 3.X to PATH`.
Start again or add it to your path manually. To edit your PATH variable use the windows search and search for `enviroment` you should see `Edit enviroment variables for you account`. Click that. Search for the `PATH` variable in the user section. Select it and click `Edit`. Click `Browse` and find your python installation folder.
:::

### Step 2: PostgreSQL
[Download](https://www.postgresql.org/download/windows) and install a version greater than 11.2 matching your system type (Windows x86-64 or Windows x86-32).

::: warning
Make sure to save the password you set for the superuser.
You can unselect the components `pgAdmin` and `Stack Builder`. You can leave the other settings as they are.
:::

Now add PostgreSQL to your `PATH`.
To edit your `PATH` variable use the windows search and search for `enviroment` you should see "Edit enviroment variables for you account". Click that. Search for the `PATH` variable in the user section. Select it and click "Edit". Click "Browse" and find your PostgreSQL installation folder. Select the "bin" - folder and save everything.
The added path shoud look something like that: "C:\Program Files\PostgreSQL\12\bin"

Now open a Command Prompt (CMD). Fastest way is using the windows search, searching for "cmd".

Create the database for jesse by executing the following comands in the cmd:

    psql -U postgres
    # you will be asked for the password
    CREATE DATABASE jesse_db;
    # create new user with privilage to access jesse_db (useful for remote access)
    CREATE USER jesse_user WITH PASSWORD '{password}';
    GRANT ALL PRIVILEGES ON DATABASE jesse_db to jesse_user;
    \q

### Step 3: Install Redis
The bad news are there is now version of Redis for windows. The good news: We can install Redis with the help of a virtual machine (VM) or windows subsystem.
Here we will be using a linux on the windows subystem:

Before installing any Linux distros for WSL, you must ensure that the "Windows Subsystem for Linux" optional feature is enabled:

Open PowerShell as Administrator (windows search for "PowerShell" > right click > "run as administrator)  and type:
`
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
    `

Restart your computer when prompted.

Now download and install [Ubuntu 18.04](https://www.microsoft.com/en-us/p/ubuntu-1804/9n9tngvndl3q) (installs Redis v4.09) from the [Microsoft Store](http://microsoft.com/store).

Launch ubuntu you will be promted to select a username and password for ubuntu.

After that install Redis (you will be asked for the password you just set):

    sudo apt-get update
    sudo apt-get upgrade
    sudo apt-get install redis-server
    redis-cli -v

 You should end up with something like that: redis-cli 4.0.9

 This will start the server. You can close the windows after that:

    redis-server


 But you need to start Redis server after each system reboot by running the redis-server command in the ubuntu terminal.

### Step 4: Install Talib
Talib can't be easily installed directly with pip on Windows. The easiest way is to use a prebuilt binary.
Go to [https://www.lfd.uci.edu/~gohlke/pythonlibs/](https://www.lfd.uci.edu/~gohlke/pythonlibs/).  Search : TA-Lib and download a version >= 0.4 matching your system and python version.

Example:
-   TA_Lib‑0.4.17‑**cp38**‑cp38‑**win_amd64**.whl
	- this would be the version for python 3.8 (cp38) and windows 64bit (win_amd64)
-   TA_Lib‑0.4.17‑cp38‑cp38‑**win32**.whl
	- this would be the version for python 3.8 (cp38) and windows 32bit (win32)

Now open a cmd (Fastest way is using the windows search, searching for "cmd".) Then type `cd Downloads`. Depending on where you downloaded the file to, you might have to enter another path instead of "Downloads".

Now install the file `pip install TA_Lib‑0.4.17‑cp38‑cp38‑win_amd64.whl`
(Don’t forget .whl !!!!)

Now check if it worked: `pip list` you should now find ta-lib in that list.

### Step 5: Install Cython
Open a cmd (Fastest way is using the windows search, searching for "cmd") and run:

    pip install cython

### Step 6: Install Git and get Jesse
Download "Git for Windows Setup" for your system type (32bit / 64bit compare Step 1 if you aren't about that): [https://git-scm.com/download/win](https://git-scm.com/download/win)

You can leave all the settings during installation as they are.
Open the Git GUI and click on "Help". Click on "Show SSH-Key". If the area is empty click "Generate Key". Then "Copy To Clipboard" and add that key under: [https://gitlab.com/profile/keys](https://gitlab.com/profile/keys)

Now open Git Bash and get jesse by running:

    git clone ssh://git@gitlab.com/sullyfischer/jesse.git jesse_package
    cd jesse_package && pip install -r requirements.txt

This will install jesse in you Windows User folder (like C:\Users\XXX). If you want to change set. `cd` into another directory before executing above commands.

    # if everything is OK, you should get green on tests (ignore yellow warnings)
    pytest
    # install jesse a global package
    pip install --editable .
    # now go back and create a new project
    cd ..
    jesse make-project jesse
    cd jesse
    # edit config to set values for database and redis and other stuff. If you are unfamiliar with nano you can use any editor on config.py
    nano config.py
    # test that everything works fine by running routes mode:
    jesse routes

### Short version:
- Python >= `3.6` (`3.8` is recommended)
	- https://www.python.org/downloads/windows/
- pip >= `19.3.0`
-   PostgreSQL >= `10.12`
	- https://www.postgresql.org/download/windows/
-   Redis >= `5`
	- https://redislabs.com/blog/redis-on-windows-10/
-   ta-lib >= `0.4`
	- https://medium.com/@keng16302/how-to-install-ta-lib-in-python-on-window-9303eb003fbb

- git >= 2.26.0
	- https://git-scm.com/download/win -->
