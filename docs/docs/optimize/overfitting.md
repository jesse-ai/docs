---
title: 'Overfitting'
---

# Preventing Overfitting

When it comes to optimization, overfitting is probably the biggest danger. There are many ways to handle it, here is the method that we suggest:

Divide your dataset (of candles) into 3 periods. Training, testing, and validation. Here is a step-by-step example:

Imagine that you want to optimize your strategy for a period of 2 years(24 months). Let's say that two years is from 2018-01-01 to 2020-01-01. First cut a 6 months period of data preferably from the end of that period. We'll later use this dataset for validation. 

Now start the optimize mode for 2018-01-01 to 2019-06-30.

Behind the scenes, Jesse divides this dataset into two periods; training(85%) and testing(15%). The training period is what Jesse uses to optimize the strategy's parameters. The testing period is merely a period that gets backtested at the same time as the training period. Why? Because if a DNA string is performing well on both training and testing periods, there's a good chance that it will perform well overall. 

In the optimize mode's dashboard, metrics such as the `win-rate` and `PNL` are shown for both `Training` and `Testing` periods, and are divided by the `|` symbol:

![picking-good-dnas](https://jesse.trade/storage/images/docs/picking-good-dnas.jpg)

Since DNAs have been ranked from best to worst, you will usually find good ones at the beginning. Try to choose the ones that have good metrics for both `Training` and `Testing` periods. Then, [inject them into your strategy](./dna-usage.md) backtest each of the good ones on the validation period which we set aside earlier. In our example that 6 month period is from `2019-07-01` to `2020-01-01`. 

If you got good results using the new DNA during the validation period, chances are that your strategy is not over-fit. Because the optimization mode had only used the training period; it did not see/use the data for testing and validation periods.
