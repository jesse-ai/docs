# Docker

All the required config files for docker are shipped with [new Jesse projects](/docs/getting-started/#create-a-new-jesse-project). 

::: tip 🎥 Video Tutorial
If you are a visual learner, try watching [this YouTube video](https://youtu.be/W8Hh56HJ-0I) that covers using Jesse with Docker. 

The video also covers enabling code intellisense in VSCode which is a great tool for faster development.
:::

::: tip Kubernetes
If you're interested in running Jesse with Kubernetes and Helm instead of Docker, check out the community maintained repository at [jesse-chart](https://github.com/TrianaLab/jesse-chart).
:::

## Install Docker

If you are on macOS or Windows I suggest installing the [Docker for Desktop](https://www.docker.com/products/docker-desktop) app if you haven't already. If you are on Ubuntu, here are the steps:
```sh
# install docker and docker compose 
curl -fsSL https://get.docker.com -o get-docker.sh && sudo sh get-docker.sh
```

## Starting containers

If you haven't [created a Jesse project](/docs/getting-started/#create-a-new-jesse-project) yet, make sure to do so. Next we can start the containers.

All the config files for Docker are present inside your project's `docker` directory. If it's not, just copy it from [this repository](https://github.com/jesse-ai/project-template).

Then inside the terminal make sure you are in the project root, open the `docker` directory and run the docker-compose command:

```sh
# open the `docker` directory
cd docker
# run without the "-d" flag to see the output
docker compose up -d
```

The first time you do this, you have to wait until the images are downloaded. This can take a few minutes. Next times, will be much faster however, still it might take more than 10 seconds to start all the services. 

That's it! Now open [localhost:9000](http://localhost:9000) in your browser to see the dashboard.

## Stopping container

To stop the containers, if you started them with the `-d` flag, you can just run the following command:

```sh
docker compose stop
```

If you did it without the `-d` flag (so you can see the outputs in the terminal), you stop containers by pressing `Ctrl` + `c` on your keyboard.

## Changing the port

If you want to change the default `9000` port, you can do it by modifying the `APP_PORT` value in your project's `.env` file. 

## Sharing the database across instances.

You can use the same database by sharing the volume of the postgres container. Just add `external: true` to the `docker-compose.yml` of the new instance you create, like shown below. This tells docker to not create a new volume, but use the external existing one.

```
volumes:
  postgres-data:
    external: true
```
