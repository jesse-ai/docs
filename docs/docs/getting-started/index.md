# Getting Started

We understand the importance of getting started quickly and easily. So we've taken care of all the hard work for you.

## Environment Setup

Here is the required stack:

-   Python >= `3.10` and <= `3.13`
-   pip >= `23`
-   PostgreSQL >= `10`

You have two options for your environment. To use the [docker](./docker.md), which is the fastest way to get started, or to install the required stack natively. Choose the option that suits you best:

- [Docker guide](./docker.md) (Recommended for beginners)
- [Ubuntu](./environment-setup.html#ubuntu)
- [macOS](./environment-setup.html#macos)
- [Windows](./environment-setup.html#windows)

## Create a new Jesse project

You'll need to create your own Jesse project to define your very own strategies.

Go to the directory you intend to create the project in and run:

```sh
# change the name "my-bot" to whatever you want
git clone https://github.com/jesse-ai/project-template my-bot
# enter the directory
cd my-bot
# create a .env file by copying it from the template
# edit this to match you enviroment
cp .env.example .env
```

This will create a new project containing only files and folders that you actually need:

```sh
├── .env # file where you enter the dashboard password, database credentials, etc
├── docker # directory containing the required config files for docker
├── storage # directory containing logs, chart images, etc
└── strategies # directory containing your strategies
    ├── Strategy01
    │   └─ __init__.py
    └── Strategy02
        └─ __init__.py
```

## PIP Installation

If you went with the [docker](./docker.md) option, then Jesse is installed for you and you don't have to do anything else. If you went with the native installation, then you have to install Jesse via `pip`:

```
pip install jesse
```

## Start Jesse
If you are using Jesse via Docker, follow the [Docker documentation](./docker.md).
For a native setup, set `POSTGRES_HOST=localhost` in your project's `.env` file
when PostgreSQL runs on the same machine. From inside your Jesse project, run:

```sh
jesse run
```

And it will print a local URL for you to open in your browser such as:

```
INFO:     Started server process [66103]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:9000 (Press CTRL+C to quit)
```

Go ahead and open (in my case) [127.0.0.1:9000](http://127.0.0.1:9000) in your browser of choice. If you are running on a server, you can use the IP address of the server instead of
`0.0.0.0`.

So for example if the IP address of your server is `1.2.3.4` the URL would be [http://1.2.3.4:9000](http://1.2.3.4:9000).

::: tip
If you want to change the default `9000` port, you can do it by modifying the `APP_PORT` value in your project's `.env` file.
:::
