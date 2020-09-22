# Executing the optimize mode

Define your routes as if you would have defined them for executing a [backtest](/docs/backtest.html). Now, you can execute the optimize mode by running:

```sh
# jesse optimize START_DATE FINISH_DATE OPTIMAL_TOTAL
jesse optimize '2018-01-01' '2020-01-01' 200
```

The `start_date` and `finish_date` are similar to what you've already seen in backtests. 

The `optimal_total` is an integer that tells Jesse how many trades you would find optimal for your strategy in *that time period* so that it can filter out those DNAs that cause too few trades. 

For example, imagine that I have a trend-following strategy that I trade on the `6h` timeframe and I usually get 30-60 trades per year in my backtests. You could say that I'll be fine with DNAs that cause my strategy to execute the same number of trades (30-60). But will I be fine if it only made like 5 trades in a whole year but had a higher win-rate? The answer is no. Because such backtest results cannot be trusted in the long term. I want to have the law of big numbers in my favor to stay away from the dangers of over-fitting. 

Thus, by setting my `optimal_total` to a number like `60` I will successfully filter out such bad DNAs. 

## When is the optimization over?
After starting the optimize mode, first, the initial population is generated. There is a progress bar telling you how long you have to wait until it's done. During this period, no optimization is being done. It's just a random generation of the DNAs. 

Then, the "evolving" phase begins. You will see a progress bar for this phase too, but you don't need to pay much attention to it. 
Remember that the point of the optimize mode is not to find the perfect parameters, but it is to find a few good ones. Why? Because the perfect ones also have a higher chance of being [over-fit](/docs/optimize/overfitting.html). 

Remember that all you need as the result of running the optimize mode is the DNA string. And you can see them at anytime in the monitoring dashboard. Hence, once you see a few DNAs that are resulting good in both training and testing set, then copy those DNAs, [and use them](/docs/optimize/dna-usage.html) to run separate backtests on your validation period. If that performed well, then you're good to go. 