# Докер

Нет единственного правильного пути использования Докера, их много. Однако на этой странице мы опишем один способ шаг за шагом.

Во-первых, извлеките образ из DockerHub:
```sh
docker pull salehmir/jesse:python38
```

Предполагаю, что вы запускаете Докер на своем локальном компьютере (а не на VPS), вы, вероятно, захотите отредактировать свой проект с помощью редактора кода.

В таком случае, я создам и назову директорию `home` на локальном компьюетре и позже а затем сопоставлю его с каталогом `/home` контейнера. Таким образом, можно редактировать свой проект либо на своем компьюетере (с помощью IDE), либо из контейнера, и изменения будут и там и там.

```sh
# to get the exact path to my local machine's home directory:
pwd
# /Users/saleh/Codes/tests/docker/home
```

Теперь я создаю контейнер из образа Джесси, называю его `jesse` для облегчения доступа, сопоставляю `/home` директории, и публикую порт контейнера `8888` на хосте (на случай если вы хотите получить доступ к ноутбукам Jupyter из браузера хоста):

```sh
docker run -v /Users/saleh/Codes/tests/docker/home:/home -p 8888:8888 -it --name jesse salehmir/jesse:python38 /bin/bash
# root@7caf4a8a8a59:/#
```

Теперь вы должны быть внутри образа ubuntu, на котором установлен весь необходимый стек и даже пакеты pip.

Поскольку PostgreSQL изначально не запускается после запуска контейнера, запустите его с помощью команды:
```
sudo service postgresql start
```

Чтобы убедиться, что у вас установлена последняя версия Джесси, вам необходимо установить ее вручную:
```
pip install jesse
``` 

Теперь давайте создадим новый проект в `/home` чтобы мы могли открыть его с помощью редактора кода:
```sh
cd /home
jesse make-project mybot
```

Теперь вы найденте каталог `mybot` на локальном компьютере. В этом примере он расположен в `/Users/saleh/Codes/tests/docker/home/mybot`. Откройте его в своём IDE и пишите свои стратегии.

Чтобы запустить команды jesse, откройте контейнер `cd` в проекте и запустите их внутри него. Например запустите команду `routes`, чтобы увидеть текущие маршруты.

```
jesse routes
```

Когда вы закончили с контейнером, вы можете выйти, используя команду `exit`.

В следующий раз, когда вы захотите получить доступ к контейнеру не нужно повторять вышеуказанные шаги. Просто перезапустите контейнер, а затем запустите базу данных.

```sh
# to reattach to created container 
docker restart jesse && docker exec -it jesse bash
# start PostgreSQL
sudo service postgresql start
```

::: tip Внимание
На последних версия докер вынесли в отдельный репозиторий [jesse-stack-docker](https://github.com/jesse-ai/jesse-stack-docker)
Для того чтобы заработало нужно выполнить всё что там написано и выполнить установку для [Ubuntu]()
Этим:
`sh -c "$(curl -fsSL https://raw.githubusercontent.com/jesse-ai/stack-installer/master/ubuntu-18.04.sh`
:::