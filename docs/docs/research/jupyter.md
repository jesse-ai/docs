# Jupyter

[Jupyter](https://jupyter.org) is a great and simple research environment for Python. 

::: warning
To use Jesse inside your notebooks, you must create them inside the root of your Jesse project (so that it can see present `.env` file containing values for the database, etc). 
:::

To install Jupyter notebooks/labs, you can use the following command:

```
pip install jupyterlab
```

::: tip
In case you're using Jesse's docker setup, you need to enter the `jesse` container and run `pip install jupyterlab` in it.
:::

Their classic product is called "Jupyter Notebook" and their latest version is called "JupyterLab". It doesn't matter which one you use, the difference is in the GUI, and also the command you use for starting Jupyter:
```sh
# to start Jupyter Notebook
jupyter notebook
# to start Jupyter Lab
jupyter-lab
```

If you are running Jupyter inside a docker container, or on a remote server, add `--ip 0.0.0.0 --no-browser --allow-root` to the command so that you can use the external IP address of your server to access it:

```
jupyter notebook --ip 0.0.0.0 --no-browser --allow-root
```
