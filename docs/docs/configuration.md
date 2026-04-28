# Configuration

There are two types of configuration that you'll want to change. 

The first one contains your project's sensitive credentials such as passwords, exchange keys, etc. And the second type is the settings of the application itself which are accessible from the dashboard. 

Let's take a look at both:

## Environment Variables
These config values are also called environment variables. They are stored in a file called `.env` inside your project. Here are the default values that ship with every project:

```sh
PASSWORD=test
APP_PORT=9000

# If not using docker, you probably want to set this to "localhost"
POSTGRES_HOST=postgres
# POSTGRES_HOST=localhost
POSTGRES_NAME=jesse_db
POSTGRES_PORT=5432
POSTGRES_USERNAME=jesse_user
POSTGRES_PASSWORD=password

# If not using docker, you probably want to set this to "localhost"
# REDIS_HOST=localhost
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=

# Enter the API token which you created at https://jesse.trade/user/api-tokens:
LICENSE_API_TOKEN=
```

It is generally a good idea to stop the application before modifying your `.env` file and start it again after you've made the changes.

## Application Settings

At the left-bottom corner of the sidebar, you'll see a gear icon. Click on it and you'll see a list of settings like this:


![settings-optimization](https://api1.jesse.trade/storage/images/docs/settings-optimization.jpg)

Go ahead change it as you like. Changes are automatically saved which is why there's no "Save" button. 

::: warning
Changing the settings will not affect running sessions. If you have one, stop and start it again for the changes to take affect. 

Note: you do NOT need to stop and start Jesse itself after changing these settings.
:::
