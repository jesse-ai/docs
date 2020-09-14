# Strategy Optimization 

The optimize mode allows you to tune your strategy's parameters (or "hyper parameters" as we call them). Do not let the word "optimization" trick you into thinking it can merely improve your strategies. It is way more powerful than that. 

Like all other features of Jesse, the optimize mode is designed to give you full flexibility, and yet it is very easy to use. 

However, to be able to get full advantage of it, you need to have a basic understanding of how it works; so make sure to read all of this page, carefully. 

### How does it work?
It works using the genetic algorithm; also known as the evolutionary algorithm. You do not have to be an expert on the subject to use the optimize mode, but is recommended to get familiar with the basics of it. Here's a nice 5 minutes video that explains it:

<!-- <iframe width="100%" height="400" src="https://www.youtube.com/embed/qiKW1qX97qA" frameborder="0" allowfullscreen></iframe> -->

### Which parameters can I optimize? 
The optimize mode is pretty flexible. You can use it to optimize *anything* that is written inside your strategy file. Few examples might be:

1. The period of an EMA indicator. Not sure whether to use the 50, 51, 52, ... or 100 period? Let the optimize mode decide. 
2. The choice between which indicator to use in the first place. Not sure to use RSI, Stochastic, or the SRSI? Let the optimize mode decide. 
3. To choose between multiple entry rules of your strategy. 

## Defining hyper parameters
Let's imagine that I want to optimize the period of two EMA indicators in my strategy. 

This is how I would have defined them so far, by hard-coding periods as integer values; in this case `50` and `200`:

```py
@property
def slow_sma(self):
    return ta.sma(self.candles, 200)

@property
def fast_sma(self):
    return ta.sma(self.candles, 50)
```

To define the hyper parameters of your strategy, simply add the `hyper_parameters()` method to your strategy. It must return a list of python dictionary objects (genes); each of which has to have these key values: `name`, `type`, `min`, `max`, and `default`. Here is the code for this example:

```py
def hyper_parameters(self):
    return [
        {'name': 'slow_sma_period', 'type': int, 'min': 150, 'max': 210, 'default': 200},
        {'name': 'fast_sma_period', 'type': int, 'min': 20, 'max': 100, 'default': 50},
    ]
```

`slow_sma_period` and `fast_sma_period` are the names that I chose for these two hyper parameters. It could have been anything else. 

Jesse (behind the scenes) injects each hyper parameter (gene) into the `self.hp` property that is available in your strategy class. 

Now let's rewrite my starting example to use the dynamic hyper parameters instead:

```py
@property
def slow_sma(self):
    return ta.sma(self.candles, self.hp['slow_sma_period'])

@property
def fast_sma(self):
    return ta.sma(self.candles, self.hp['fast_sma_period'])
```

If I execute a backtest again, I will get the same results as before as if I was using the hard-coded code. That's because I defined `50` and `200` as default values for my hyper parameters. 

## Executing the optimize mode
Define your routes as if you would have defined them for executing a [backtest](/docs/backtest.html). Now, you can execute the optimize mode by:

```sh
# jesse optimize START_DATE FINISH_DATE OPTIMAL_TOTAL
jesse optimize '2018-01-01' '2020-01-01' 200
```

The `start_date` and `finish_date` are similar to what you've already seen in backtests. 

The `optimial_total` is an integer that tells Jesse how many trades you would find optimal for your strategy in *that time period* so that it can filter out those DNAs that cause too many or too few trades. 

For example, imagine that I have a trend-following strategy that I trade on the `6h` timeframe and I usually get 30-60 trades per year in my backtests. You could say that I'll be fine with DNAs that cause my strategy to execute the same number of trades (30-60). But will I be fine if it only made like 5 trades in a whole year but had a high win-rate? The answer is no. Because such backtest results cannot be trusted in the long term. I want to have the law of big numbers in my favor to stay away from the dangers of over-fitting. 

Thus, by setting my `optimial_total` to a number like `60` I will successfully filter out such bad DNAs. 

## When is the optimization over?
TODO...
<!-- Unlike other  -->

## How to use the results (good DNAs)
TODO...

## Preventing Overfitting
TODO...