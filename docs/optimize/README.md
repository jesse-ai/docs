# Strategy Optimization 

The optimize mode allows you to tune your strategy's parameters (or "hyperparameters" as we call them). Do not let the word "optimization" trick you into thinking it can merely improve your strategies. It is way more powerful than that. 

Like all other features of Jesse, the optimize mode is designed to give you full flexibility, and yet it is very easy to use. 

However, to be able to get full advantage of it, you need to have a basic understanding of how it works; so make sure to read all of this page, carefully. 

## How does it work?
It works using the genetic algorithm; also known as the evolutionary algorithm. You do not have to be an expert on the subject to use the optimize mode, but is recommended to get familiar with the basics of it. Here's a nice 5 minutes video that explains it:

<iframe width="100%" height="400" src="https://www.youtube.com/embed/qiKW1qX97qA" frameborder="0" allowfullscreen></iframe>

## Which parameters can I optimize? 
The optimize mode is pretty flexible. You can use it to optimize *anything* that is written inside your strategy file. Few examples might be:

1. The period of an EMA indicator. Not sure whether to use the 50, 51, 52, ... or 100 period? Let the optimize mode decide. 
2. The choice between which indicator to use in the first place. Not sure to use RSI, Stochastic, or the SRSI? Let the optimize mode decide. 
3. To choose between multiple entry rules of your strategy. 


## Preventing Overfitting
When it  comes to optimization, overfitting is probably the biggest danger. There are many ways to handle it, here is the method that we suggest:

Divide your dataset (of candles) into 3 periods. Training, testing, and validation. Here is a step-by-step example:

Imagine that you want to optimize your strategy for a period of 2 years(24 months). Let's say that two years is from 2018-01-01 to 2020-01-01. First cut a 6 months period of data preferably from the end of that period. We'll later use this dataset for validation. 

Now start the optimize mode for 2018-01-01 to 2019-06-01:
```
# 100 is the optimal_total number of trades
jesse optimize 2018-01-01 2019-06-01 100
```

Behind the scenes, Jesse divides this dataset into two periods; training(85%) and testing(15%). The training period is what Jesse uses to optimize the strategy's parameters. The testing period is merely a period that gets backtested at the same time as the training period. Why? Because if a DNA string is performing well on both training and testing periods, there's a good chance that it will perform well overall. 

In the optimize mode's dashboard, there's a **log** section which displays the win-rate, total (number of trades) and the PNL metrics for the training period as well as the testing period. 


## When is the optimization over?
After starting the optimize mode, first, the initial population is generated. There is a progress bar telling you how long you have to wait until it's done. During this period, no optimization is being done. It's just a random generation of the DNAs. 

Then, the "evolving" phase begins. You will see a progress bar for this phase too, but you don't need to pay much attention to it. 
Remember that the point of the optimize mode is not to find the perfect parameters, but it is to find a few good ones. Why? Because the perfect ones have a higher chance of being over-fit. 

Remember that all you need as the result of running the optimize mode is the DNA string. And you can see them anytime. Hence, once you see a few DNAs that are resulting good in both training and testing set, then copy those DNAs, and use them to run separate backtests on your validation period. If that performed well, then you're good to go. 