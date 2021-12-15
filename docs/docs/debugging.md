# Debugging

Debugging is an important part of developing strategies. Getting errors, figuring out why something is not working, and fixing them is just part of programming in general. 

We try our best to make this part of the process as easy as possible for you via the tools we provide. 

## 1. Debug mode 

When backtests are executed with the `Debug Mode` enabled in the options section, all the steps that Jesse goes through will be logged inside a file. After the execution, you can download that log file and inspect its content. 

Sometimes you want to log some custom data based on some condition in your strategy. An example of this is to make sure a method is being indeed called. Or maybe to print the value of a variable. In such cases, use the built-in [log()](./strategies/api.html#log) method to achieve this. You could say `self.log()` in Jesse is the equivalent of `print()` in Python, or `console.log()` in JavaScript.

::: warning
Executing backtests in the debug mode will take longer than usual to execute. Hence, only use it when you need to debug your strategy. 
:::

You can modify what should be printed while in the debugging mode and what shouldn't. To do so, head over to the "Logs" section of the backtest page, on your dashboard's settings page:

![settings-backtest-logs](https://jesse.trade/storage/images/docs/settings-backtest-logs.jpg)

## 2. Generated log files 
Jesse can generate other types of log files in JSON, CSV, charts with buy and sell orders displayed on them, and Tradingview's pine-editor output which are helpful to see what trades were executed. Check them all out on the backtest page's [documentation page](./backtest.md).

## 3. Paper trading

Paper trading is also a good idea for monitoring a strategy before risking real money in it. Paper trading is available through the [live-trade plugin](./livetrade.html). 