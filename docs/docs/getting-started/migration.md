# Migrating from 0.2x.x to 0.3x.x

Starting version 0.3 Jesse uses a GUI dashboard instead of a CLI. 

## Migration steps
Here are the steps to migrate from 0.2x.x to 0.3x.x:

1. Create a new Jesse project as [explained here](/docs/getting-started/#create-a-new-jesse-project). This new project will contain all the required files, docker config, `.env` file, etc.
2. Copy your environment values from your previous project's `config.py` and `live-config.py` files to the new project's `.env` file.
3. Copy the `strategies` directory from your previous project to the new project.

## Are there any changes in your strategies? 
 There's just one change that only affects your strategy if you had optimized it via the optimize mode. [Injecting DNAs](/docs/optimize/dna-usage.md) is now done inside the strategy file.

 ## Environment setup
 Our Docker setup is now completely changed for the better and is now shipped with all new Jesse projects. So if you were using Jesse via Docker before, make sure to read the new [docs for Docker setup](./docker.md).

 If you were using Jesse via a native setup, the only new dependency is Redis. Follow the docs for installation guides depending on your OS.