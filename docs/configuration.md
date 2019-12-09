# Configuration

Jesse has two types of configurations. Basic ones which you must check and set your own values, and advanced ones which are working fine with default values.

## Basic Config

Basic configurations of your app exists in `/jesse/env.py` file. It contains sensitive values for the database, exchange API key and secrets, etc.

::: danger
In case you're using git, do not push your `env.py` file. Make sure it is added to the `.gitignore` file.
:::

After installation an example env file is created for you which is a copy of `jesse/example-env.py` file. You can create a new copy to reset the values by:

```bash
cp jesse/example-env.py jesse/env.py
```

## Advanced Config

These config files are included at `jesse/config` directory. Few of them are loading values from the `env.py` file, and others have hard-coded values. Feel free to modify them as you wish.
