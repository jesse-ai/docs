# Configuration

There are two types of configuration that you'll want to change. 

The first one contains your project's sensitive credentials such as passwords, exchange keys, etc. And the second type is the settings of the application itself which are accessible from the dashboard. 

Let's take a look at both:

## Environment Variables
These config values are also called environment variables. They are stored in a file called `.env` inside your project. Here are the default values that ship with every project:

```sh
PASSWORD=test
APP_PORT=9000

# Optional: the address you open the dashboard with from other computers
# DASHBOARD_URL=http://192.168.1.20:9000

LSP_PORT=9001
MCP_LOG_IN_TERMINAL=true

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

### Dashboard address

**`APP_PORT`** is the dashboard's port. The dashboard listens on **`APP_HOST`**, which is optional and defaults to `0.0.0.0` (all network interfaces).

**`DASHBOARD_URL`** is optional. Set it to your dashboard's external address, such as `http://192.168.1.20:9000` or `https://jesse.example.com`, without a path. Jesse uses it for the address printed at startup and links returned by MCP; it does not change where the server listens. By default, Jesse uses `http://localhost:<APP_PORT>`, or your specific `APP_HOST` if set. See **[VPS Setup](/docs/vps-setup#step-4-open-the-dashboard)** for a server example.

## AI assistants (MCP)

To use Jesse with an AI assistant, see the **[MCP introduction](/docs/mcp/)** and **[setup guide](/docs/mcp/setup)**, including authentication and the `MCP_LOG_IN_TERMINAL` setting.

## Application Settings

At the left-bottom corner of the sidebar, you'll see a gear icon. Click on it and you'll see a list of settings like this:


![settings-optimization](https://api1.jesse.trade/storage/images/docs/settings-optimization.jpg)

Go ahead change it as you like. Changes are automatically saved which is why there's no "Save" button. 

::: warning
Changing the settings will not affect running sessions. If you have one, stop and start it again for the changes to take affect. 

Note: you do NOT need to stop and start Jesse itself after changing these settings.
:::
