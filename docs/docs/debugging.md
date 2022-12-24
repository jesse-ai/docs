# Debugging

Debugging is an important part of developing strategies. Getting errors, figuring out why something is not working as expected, and fixing them is just part of programming in general. 

We try our best to make this part of the process as easy as possible for you via the tools we provide.

## Debug mode 

When backtests are executed with the `Debug Mode` enabled in the options section, all the steps that Jesse goes through will be logged inside a file. After the execution, you can download that log file and inspect its content. 

::: warning
Executing backtests in the debug mode will take longer than usual to execute. Hence, only use it when you need to debug your strategy. 

For **live trading** the difference is not noticeable so in fact, it's recommended to enable it.
:::

You can modify what should be printed while in the debugging mode and what shouldn't. To do so, head over to the "Logs" section of the settings page (which you can open by clicking on the "gear" icon), on your dashboard's settings page:

![settings-backtest-logs](https://jesse.trade/storage/images/docs/settings-backtest-logs.jpg)


## Paper trading

Paper trading is also a good idea for monitoring a strategy before risking real money in it. Paper trading is available through the [live-trade plugin](./livetrade.html). 

Remember that while live/paper trading, you can access logs at all times from within the dashboard by clicking on the "Info Logs" button:

![logs-button-live-mode-1](https://jesse.trade/storage/images/docs/logs-button-live-mode-1.jpg)

Which will open a modal window with the logs:

![logs-button-live-mode-2](https://jesse.trade/storage/images/docs/logs-button-live-mode-2.jpg)

## How to debug your code to see why it's not working as expected

Sometimes you're not sure why something is not working as expected. You need some basic debugging to figure out what's going wrong.

In such cases, use the built-in [log()](./strategies/api.html#log) method to achieve this. You could say `self.log()` in Jesse is the equivalent of `print()` in Python, or `console.log()` in JavaScript.

For example, let's say I expect the `update_position()` method to liquidate my position if it was in more than 2% profit but it doesn't. Assuming my code is:

```py
def update_position(self):
    if self.position.pnl_percentage > 2:
        self.liquidate()
```

I can debug it using the `self.log()` method:

```py
def update_position(self):
    self.log(
        f'pnl_percentage: {self.position.pnl_percentage}'
    )

    if self.position.pnl_percentage > 2:
        self.log('if statement is True, liquidate is called')
        self.liquidate()
```

After running the code, on the next time interval, I expect to see two custom log messages among other logs (no matter if in the backtest or live mode). 

If the first log message is not there, it means that the `update_position` method is not being called at all. If the second log message is not there, it means that my `if` statement is False. However, because in the first log message I logged the value that was important in the `if` statement, I can see why the `if` statement is False.

## Log files

Sometimes you want to access the logs after a session has ended. For example, maybe you want to send them to us for debugging purposes.

The logs of each session are stored in the `/storage/logs/{mode}/{session_id}.txt`. There is one file for each session.

There are also raw exchange streams that are specific to the live mode. You can find them in `/storage/logs/exchange-streams.txt`. The content of this file gets overwritten every time you start a new live session. 
