---
title: 'Hyperparameters'
---

# Defining hyperparameters
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

To define the hyperparameters of your strategy, simply add the `hyperparameters()` method to your strategy. It must return a list of python dictionary objects (genes); each of which has to have these key values: `name`, `type`, `min`, `max`, and `default`. Here is the code for this example:

```py
def hyperparameters(self):
    return [
        {'name': 'slow_sma_period', 'type': int, 'min': 150, 'max': 210, 'default': 200},
        {'name': 'fast_sma_period', 'type': int, 'min': 20, 'max': 100, 'default': 50},
    ]
```

::: tip
Currently `int` and `float` are the only supported types. If you need a boolean, just use `int` with `min: 0`, `max: 1`. 
:::

::: tip
Currently the step size of `int` and `float` can't be set. If you want a certain step size, just use `int` and then mutiply it with your step size inside your strategy.
:::

`slow_sma_period` and `fast_sma_period` are the names that I chose for these two hyperparameters. It could have been anything else. 

Jesse (behind the scenes) injects each hyperparameter (gene) into the `self.hp` property that is available in your strategy class. 

Now let's rewrite my starting example to use the dynamic hyperparameters instead:

```py
@property
def slow_sma(self):
    return ta.sma(self.candles, self.hp['slow_sma_period'])

@property
def fast_sma(self):
    return ta.sma(self.candles, self.hp['fast_sma_period'])
```

If I execute a backtest again, I will get the same results as before as if I was using the hard-coded code. That's because I defined `50` and `200` as default values for my hyperparameters. 
