# Update

We are constantly releasing new features, fixing bugs, and improving things. Fortunately, upgrading to the latest version is easy. 

## Native setup

In case you are using Jesse on a native setup, upgrading is done via PIP:
```
pip install -U jesse
```

::: warning
Sometimes pip doesn't upgrade to the latest version on the first time running the above command. To make sure you're running the latest release, check out the latest version number on [PyPi](https://pypi.org/project/jesse/), and then make sure you see that version in `pip show jesse` output.
:::

## Docker setup

If you are using Jesse via [Docker](./docker.md), while inside the `docker` directory, run the below commands:
```sh
# in case the containers are still running:
docker compose stop
# to fetch the latest version
docker compose pull
# to start the containers again with the latest version
docker compose up -d
```

## Live Trade Plugin
If you installed the plugin using the [Docker](./docker.md) setup, then updating Jesse itself as mentioned above will also update the plugin. 

If you installed the plugin via a [native setup](/docs/livetrade.html#_2-native-environment-setups), first delete the already installed version, and then reinstall it using the below command:
```sh
# delete the already installed version
pip uninstall jesse-live -y
# install the latest version
jesse install-live
```
