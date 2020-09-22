# Executing the optimize mode

Define your routes as if you would have defined them for executing a [backtest](/docs/backtest.html). Now, you can execute the optimize mode by:

```sh
# jesse optimize START_DATE FINISH_DATE OPTIMAL_TOTAL
jesse optimize '2018-01-01' '2020-01-01' 200
```

The `start_date` and `finish_date` are similar to what you've already seen in backtests. 

The `optimal_total` is an integer that tells Jesse how many trades you would find optimal for your strategy in *that time period* so that it can filter out those DNAs that cause too many or too few trades. 

For example, imagine that I have a trend-following strategy that I trade on the `6h` timeframe and I usually get 30-60 trades per year in my backtests. You could say that I'll be fine with DNAs that cause my strategy to execute the same number of trades (30-60). But will I be fine if it only made like 5 trades in a whole year but had a high win-rate? The answer is no. Because such backtest results cannot be trusted in the long term. I want to have the law of big numbers in my favor to stay away from the dangers of over-fitting. 

Thus, by setting my `optimal_total` to a number like `60` I will successfully filter out such bad DNAs. 