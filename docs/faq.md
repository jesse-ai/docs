


# FAQ - Frequently asked questions 
Work in progress..

## About the Jesse Bot

### What is Jesse?
### What Exchanges does Jesse support?
### Is Jesse easy to install and configure?
### Can you install and configure Jesse for me?
### Which are the supported operating systems?
### What is the best VPS to run Jesse?
### How can I get new Jesse versions?
### I have zero trading knowledge. Can I use Jesse?
### Can you write me a strategy?
### Does jesse-ai.com give financial advice?
### My question is not answered here. How can I contact you?
<!---
### When does Jesse buy and sell?
### What is the maximum number of pairs is Jesse able to handle at the same time?
### How customizable is Jesse?
### What payment methods does jesse-ai.com accept?
### How do I activate my Jesse license?
### How long does it take to activate my license?
### What is the difference between Jesse Starter and Jesse Standard?
### Is it posible to upgrade from Jesse Starter to higher versions?
### Do I need to keep my computer turned on 24/7 in order to run Jesse successfully?
### Do I get support after the purchase?
### How many instances of Jesse can I have running?
### Where do I get strategies? Can I buy strategies?
### What is the refund policy?
-->
## Working with Jesse
### The bot does not start. Whats wrong?
Check if you followed the instructions on [Installation](/docs/installation) right and did the  [Configuration](/docs/configuration) part. For live/paper trading and backtesting to work you also need to set [Routes](/docs/routes).
###  How do i configure Jesse?
Check the [Configuration](/docs/configuration) page.
<!---### I have waited 10 minutes, why hasn't the bot made any trades yet?!
Thats entirly depending on your strategy and chosen timeframe. One reason could be, that the conditions on which your strategy would place a buy or sell order aren't met. Another reason could be that the current candle in your chosen timeframe didn't close yet. Jesse only trades after the candle has closed.
-->
<!---
### I have made 20 trades already, why is my total profit negative?!
There could be multiple reasons:
 - Your strategy isn't profitable. Be sure to always backtest your strategy.
 - You did a backtest, but its still not making profits. You strategy could be only working in certain market conditions (for example trending - not trending). Be sure to make extensive backtests, especially in different periods of time with different market conditions (bullish, bearish, flat, big market crashs). 
 - You did extensive backtests and it is still not profitable in current market conditions? That can happen to. Backtesting only checks historical data. The market could change in such a way, that "old rules" won't work anymore. Time to be creative.
 - Good backtest results on one coin pair doesn't mean the results will be good on other pairs too. Time for more backtesting!
 -->
### My strategy isn't working/trading like it should. What can I do?
Are you certain that you set the right [Routes](/docs/routes) and have the right version of you strategy uploaded? Its important to be structured here: Be sure to use clear naming and versioning of your stratgies. Speaking of experience. Its annoying but saves you time. If you are sure Jesse is really running the strategy (version) you intended, lets check more things you can do.
 - Use the `--debug` command in backtesting to have Jesse print the trades that are happening or aren't. 
 - Check the conditions for validity. To do that a good way is adding pythons `print()` command in your strategies functions. For example  `print("Buy condition checked")`. That way your can validate if all the functions are called like intended and aren't mixed up. If you found the mistake like that: Good job! 
```python
from datetime import datetime
time = datetime.fromtimestamp(self.current_candle[0] / 1000)
print('Time: {} | My Buy conditions: {} {}'.format(time, self.condition1, self.condition2))
```
 - If not use the code above for more debugging. The braces are replaced with the variables you pass in the format function. Keep the first time variable. It will give you the time of the current candle. Change the other variable according to your strategy. That way you are able to check pricecly the values of your functions and indicators candlewise. Then open your favorite charting tool (same timeframe, same indicators) and do a comparsion. That way you should be able to spot mistakes in your conditions/calculations.

### Your backtest results differ from backtesting with the XXX tool. Whats the reason?
Ask yourself: Is the strategy I tested on XXX really the same strategy in Jesse? Consider stoplosses and comission fees. 
Additionaly many backtest tools have the so called lookahead / repainting issue. Check out this article: [https://backtest-rookies.com/2017/06/23/tradingview-understanding-lookahead-historical-realtime-data/](https://backtest-rookies.com/2017/06/23/tradingview-understanding-lookahead-historical-realtime-data/)
<!---
### I’d like to change the trading amount. Can I just stop the bot and then change the config and run it again?
Not quite. If you stop the bot, you also need to close all currently open orders. Don't forget the stoploss orders.
-->
### How many iterations do I need to get a good Hyperopt result?

### Why it is so long to run hyperopt?
