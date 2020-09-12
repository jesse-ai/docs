# Docker

There's not just one correct way to use Docker; there's plenty. In this page however we'll describe one way step by step.

First, pull the image from DockerHub:
```sh
docker pull salehmir/jesse:python38
```

Now assuming you are running Docker on your local machine (and not a VPS), you probably want to edit your project with a code editor. 

For that reason, I'm going to create a directory named `home` on my local machine and later map it into the container's `/home` directory. This way, I can edit my project on either my machine (with code editor) or from within the container and changes will affect both. 
```sh
# to get the exact path to my local machine's home directory:
pwd
# /Users/saleh/Codes/tests/docker/home
```

Now I create a container from Jesse's docker image, name it `jesse` for easier access, map `/home` directories together, and publish container port `8888` to the host (in case you want to access Jupyter Notebooks from the host browser):

```sh
docker run -v /Users/saleh/Codes/tests/docker/home:/home -p 8888:8888 -it --name jesse salehmir/jesse:python38 /bin/bash
# root@7caf4a8a8a59:/#
```

Now you should be inside an ubuntu image that has all the required stack and even pip packages installed on it. 

Because PostgreSQL is not initally running after starting the container, start it with below command:
```
sudo service postgresql start
```

To make sure you have the latest version of Jesse, you need to install it manually:
```
pip install jesse
``` 

Now let's create a new project at `/home` so we can open it with a code editor:
```sh
cd /home
jesse make-project mybot
```

Now you'll find a `mybot` directory in your local machine. In this example it is located at `/Users/saleh/Codes/tests/docker/home/mybot`. Open it with your code editor and write your own strategies. 

To run jesse commands, open the container, `cd` into the project, and run them inside it. For example run `routes` command to see the present routes:

```
jesse routes
```

When you're done with the container, you can exit using `exit` command. 

Next time you want to access the container, of course you don't need to repeat above steps. Just restart the container and then start the database:
```sh
# to reattach to created container 
docker restart jesse && docker exec -it jesse bash
# start PostgreSQL
sudo service postgresql start
```
