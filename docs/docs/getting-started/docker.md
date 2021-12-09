# Docker

All the required config files for docker are shipped with new Jesse projects. Assuming that you already have installed Docker itself, you are only a step away from running Jesse with Docker. 

## Starting containers

All the config files for Docker are present inside your project's `docker` directory. If it's not, just copy it from [this repository](https://github.com/jesse-ai/project-template).

Then inside the terminal open the `docker` directory and run the following command:

```sh
# run without the "-d" flag to see the output
docker-compose up -d
```

The first time you do this, you have to wait until the images are downloaded. This can take a few minutes. Next times, will be much faster however, still it might take more than 10 seconds to start all the services. 

That's it! Now open [localhost:9000](https://localhost:9000) in your browser to see the dashboard.

## Stopping container

To stop the containers, if you started them with the `-d` flag, you can just run the following command:

```sh
docker-compose stop
```

If you did it without the `-d` flag (so you can see the outputs in the terminal), you stop containers by pressing `Ctrl` + `c` on your keyboard.

## Changing the port

If you want to change the default `9000` port, you can do it by modifying the `APP_PORT` value in your project's `.env` file. 