# Installation

::: tip COMPATIBILITY NOTE
Jesse requires Node.js >= 10 and NPM >= 6. Jesse is being heavily tested on LTS versions after each release. Thus, I advise you not you use it on earlier node versions even if does work.
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
  init           Initially creates a new jesse instance
  upgrade        Upgrades an instance of jesse to latest code developed on the master branch. Leaves your ".env", db.sqlite, and custom strategies untouched.
  make:strategy  Makes a new strategy folder in /strategies
```

## Create your first jesse project

Then move into where you want to create your project folder and run:

```bash
jesse init my-project
```

`my-project` being of course whatever you desire. This creates a folder named as `my-project`, installs all the dependencies, generates all the goodies you need to jump into developing your own algo-trading system.

## Upgrade

`cd` into the root of your Jesse project and run:

```
jesse upgrade
```

This will download the latest code and replace it with yours while leaving your own custom files untouched:

-   `.env`
-   Your sqlite database file located at `storage/db.sqlite`
-   Any custom strategy created by you using `jesse make:strategy` command

This feature is still experimental, if you faced any unexpected bugs, please open an issue.

::: warning
Notice that any modification done to the main source code (files other than those mentioned in above list) WILL get removed. Hence, to have easier upgrades, avoid modifying the main source code.

For example, instead of modifying the code inside `strategies/Strategy.ts`, overwrite the methods inside your custom strategy.
:::
