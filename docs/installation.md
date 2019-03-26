# Installation
::: tip COMPATIBILITY NOTE
Jesse requires Node.js >= 8 and NPM >= 5. But it is highly recommended to always use the latest LTS version. 
:::

First install jesse globally from npm by running: 
```
npm install jesse -g
```

## Make sure it's working
Once npm is done installing Jesse globally, you should be able to run the `jesse` command from anywhere. For start, run `jesse -h`, which should print:
```
Usage: jesse <command> [options]

Options:
  --force        Forces a command
  -V, --version  output the version number
  -h, --help     output usage information

Commands:
  init              Initially creates a new jesse instance 
  make:strategy     Makes a new strategy folder in /strategies
```

## Create your first jesse project
Then move into where you want to create your project folder and run: 
```bash
jesse init my-project
```
`my-project` being of course whatever you desire. This creates a folder named as `my-project`, installs all the dependencies, generates all the goodies you need to jump into developing your own algo-trading system. 