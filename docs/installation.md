# Installation

Here are the required stack:

-   Python >= `3.6` (`3.8` is recommended)
-   PostgreSQL >= `11.2`
-   Redis >= `5`
-   ta-lib >= `0.4`
-   pip >= `19.3.0`

In case you already have the required stack installed on your environment, just skip this page and continue with the `README` of the repository. 

## Installer script

I have created a bash script [hosted on Github](https://github.com/jesse-ai/stack-installer) that installs all the required stack that was mentioned above on a fresh instance of Ubuntu 18.04:

```sh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/jesse-ai/stack-installer/master/ubuntu-18.04.sh)"
```

## Docker image
In case prefer to use [Docker](https://docker.com/) for any reason, I have prepared a Docker image that has all the required stack installed on it:

```sh
# pull image
docker pull sullyfischer/jesse-ai:python38

# run it for the first time
docker run -it --name jesse sullyfischer/jesse-ai:python38 /bin/bash
# to reattach to created container
docker restart jesse && docker exec -it jesse bash
# start Redis and PostgreSQL
sudo service postgresql start && sudo service redis-server start
```

## Windows

Before we start the instructions for Windows. Its highly recommended to use docker or linux on a virtual machine. Why? On Windows everything is far more complicated and many more clicks.


Before we start the instructions for Windows. Its highly recommended to use docker or linux on a virtual machine. Why? On Windows everything is far more complicated and many more clicks.

### Step 1: Get Python and pip
Got to [https://www.python.org/downloads/windows/](https://www.python.org/downloads/windows/) and download the installer for Python. The version 3.8 is recommended, but Python >= `3.6` will work too. It doesn't matter whether you choose the executable installer or web-base installer. What matters is to choose the right version for your system type. If you are on 32bit Windows download "Windows x86 ... installer". If you are on 64bit Windows get the "Windows x86-64 ... installer".
Not sure which system type you are on? Open a file explorer window. Right click on "This PC" and then "Properties". Under "System" there is "System type". 

**Make sure to check "Add Python 3.X to PATH" during installation.**
**In the end the installation may ask you to disable the lenght limit for PATH. Make sure to do that, by clicking that.**
You can leave the other settings as they are.

Now check if it worked by opening a Command Prompt (CMD). Fastest way is using the windows search, searching for "cmd". Then type `python --version`. You should get "Python 3.X.X" according to the version you installed.

What about pip? pip is shipped and installed with Python. Type `pip --version`. You should get "pip 19.X.X from ...".

You get: "python *(or pip)* is not recognized as an internal or external command,
operable program or batch file." Then you probably didn't check "Add Python 3.X to PATH".
Start again or add it to your path manually. To edit your PATH variable use the windows search and search for "enviroment" you should see "Edit enviroment variables for you account". Click that. Search for the "PATH" variable in the user section. Select it and click "Edit". Click "Browse" and find your python installation folder.

### Step 2: Install PostgreSQL 
Go to [https://www.postgresql.org/download/windows/](https://www.postgresql.org/download/windows/) and download a version greater than 11.2 matching your system type (Windows x86-64 or Windows x86-32 - compare Step 1 if you aren't about that).

Make sure to save the password you set for the superuser. 
You can unselect the components pgAdmin and Stack Builder. You can leave the other settings as they are.

Now add PostgreSQL to you PATH.
To edit your PATH variable use the windows search and search for "enviroment" you should see "Edit enviroment variables for you account". Click that. Search for the "PATH" variable in the user section. Select it and click "Edit". Click "Browse" and find your PostgreSQL installation folder. Select the "bin" - folder and save everything. 
The added path shoud look something like that: "C:\Program Files\PostgreSQL\12\bin"

Now check if it worked by opening a Command Prompt (CMD). Fastest way is using the windows search, searching for "cmd". Then type `psql`. You should be asked for the password you set during the installation.

Create the database for jesse execute following comands in the cmd:

    psql
    CREATE DATABASE jesse_db;
    # create new user with privilage to access jesse_db (useful for remote access)
    CREATE USER jesse_user WITH PASSWORD '{password}';
    GRANT ALL PRIVILEGES ON DATABASE jesse_db to jesse_user;
    \q
    exit

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

Launch ubuntu and install Redis:

    sudo apt-get update
    sudo apt-get upgrade
    sudo apt-get install redis-server
    redis-cli -v
  
### Step 4: Install Talib
Talib can't be installed directly with pip on Windows. The easiest way is to use a prebuilt binary.
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

### Step 5: Install Git and get Jesse
Download "Git for Windows Setup" for your system type (32bit / 64bit compare Step 1 if you aren't about that): [https://git-scm.com/download/win](https://git-scm.com/download/win)

You can leave all the settings during installation as they are. 
Open the Git GUI and click on "Help". Click on "Show SSH-Key". If the area is empty click "Generate Key". Then "Copy To Clipboard" and add that key under: [https://gitlab.com/profile/keys](https://gitlab.com/profile/keys)

Now open Git Bash and get jesse by running:

    git clone ssh://git@gitlab.com/sullyfischer/jesse.git jesse_package
    cd jesse_package && pip install -r requirements.txt

This will install jesse in you Windows User folder (like C:\Users\XXX). If you want to change set. `cd` into another directory before executing above commands.


### Short version:
- Python >= `3.6` (`3.8` is recommended)
	- (https://www.python.org/downloads/windows/)
- pip >= `19.3.0`
-   PostgreSQL >= `10.12`
	- (https://www.postgresql.org/download/windows/)
-   Redis >= `5`
	- (https://redislabs.com/blog/redis-on-windows-10/)
-   ta-lib >= `0.4`
	- (https://medium.com/@keng16302/how-to-install-ta-lib-in-python-on-window-9303eb003fbb)

- git >= 2.26.0 
	- (https://git-scm.com/download/win)


## Create a new project

Assuming that you have installed the `jesse` package, now it's time to create a project of your own that Jesse can read from:

```sh
jesse make-project name-of-project
```

This will create a new project containing only the files and folders that you actually need:

```sh
├── config.py # file where you enter your database credentials, etc
├── routes.py # file where routes are defined in 
├── storage # folder containing logs, chart images, etc
│   ├── charts
│   ├── genetics
│   ├── logs
│   │   └── trades
│   ├── temp
│   │   ├── backtest
│   │   └── optimize
│   └── trading-view-pine-editor
└── strategies # folder where you define your strategies
    ├── Strategy01
    │   └─ __init__.py
    └── Strategy02
        └─ __init__.py
```
