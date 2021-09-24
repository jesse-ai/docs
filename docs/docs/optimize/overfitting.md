---
title: 'Overfitting'
---

# Preventing Overfitting

When it  comes to optimization, overfitting is probably the biggest danger. There are many ways to handle it, here is the method that we suggest:

Divide your dataset (of candles) into 3 periods. Training, testing, and validation. Here is a step-by-step example:

Imagine that you want to optimize your strategy for a period of 2 years(24 months). Let's say that two years is from 2018-01-01 to 2020-01-01. First cut a 6 months period of data preferably from the end of that period. We'll later use this dataset for validation. 

Now start the optimize mode for 2018-01-01 to 2019-06-01:
```
# 100 is the optimal_total number of trades
jesse optimize 2018-01-01 2019-06-01 100
```

Behind the scenes, Jesse divides this dataset into two periods; training(85%) and testing(15%). The training period is what Jesse uses to optimize the strategy's parameters. The testing period is merely a period that gets backtested at the same time as the training period. Why? Because if a DNA string is performing well on both training and testing periods, there's a good chance that it will perform well overall. 

In the optimize mode's dashboard, there's a **log** section which displays the win-rate, total (number of trades) and the PNL metrics for the training period as well as the testing period. Here is an example:

```
Evolving...  [###################-----------------]   53%  18:17:41

 INFO                             |
----------------------------------+----------------------------------------
 Started At                       |                           21 hours ago
 Index/Total                      |                              2124/4000
 Population Size, Solution Length |                                 200, 2
 Route                            | Bitfinex, BTC-USD, 6h, TrendFollowing05


Best DNA candidates:


 Rank   | DNA   |   Fitness | Training log || Testing log
--------+-------+-----------+---------------------------------------------------------------------------------
 1      | *1    |  0.268183 | win-rate: 44%, total: 97, PNL: 329.42% || win-rate: 35%, total: 14, PNL: 67.62%
 2      | -0    |  0.264808 | win-rate: 44%, total: 95, PNL: 323.81% || win-rate: 42%, total: 14, PNL: 67.81%
 3      | 10    |  0.259537 | win-rate: 44%, total: 90, PNL: 306.36% || win-rate: 33%, total: 15, PNL: 65.1%
 4      | 9-    |  0.258959 | win-rate: 46%, total: 80, PNL: 356.18% || win-rate: 33%, total: 15, PNL: 57.57%
 5      | ;*    |  0.256887 | win-rate: 45%, total: 80, PNL: 366.79% || win-rate: 31%, total: 16, PNL: 35.14%
 6      | 9/    |  0.256149 | win-rate: 46%, total: 79, PNL: 331.22% || win-rate: 33%, total: 15, PNL: 55.99%
 7      | 9/    |  0.256149 | win-rate: 46%, total: 79, PNL: 331.22% || win-rate: 33%, total: 15, PNL: 55.99%
 8      | 5/    |  0.253359 | win-rate: 44%, total: 87, PNL: 285.63% || win-rate: 33%, total: 15, PNL: 63.94%
 9      | :/    |  0.253343 | win-rate: 46%, total: 78, PNL: 322.79% || win-rate: 33%, total: 15, PNL: 55.68%
 10     | 60    |   0.25204 | win-rate: 44%, total: 85, PNL: 276.47% || win-rate: 33%, total: 15, PNL: 62.96%
 11     | =0    |   0.24989 | win-rate: 50%, total: 71, PNL: 327.47% || win-rate: 31%, total: 16, PNL: 30.51%
 12     | +q    |  0.242332 | win-rate: 56%, total: 83, PNL: 115.85% || win-rate: 54%, total: 11, PNL: 42.48%
 13     | )k    |  0.237337 | win-rate: 52%, total: 85, PNL: 114.81% || win-rate: 45%, total: 11, PNL: 44.59%
 14     | (j    |  0.235237 | win-rate: 51%, total: 85, PNL: 113.14% || win-rate: 45%, total: 11, PNL: 45.24%
 15     | H0    |  0.234215 | win-rate: 53%, total: 60, PNL: 278.6% || win-rate: 35%, total: 14, PNL: 51.51%
```