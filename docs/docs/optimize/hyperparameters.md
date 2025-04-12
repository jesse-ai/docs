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

To define the hyperparameters of your strategy, simply add the `hyperparameters()` method to your strategy. It must return a list of python dictionary objects; each of which has specific key values depending on the parameter type. Here's the code for this example:

```py
def hyperparameters(self):
    return [
        {'name': 'slow_sma_period', 'type': int, 'min': 150, 'max': 210, 'default': 200},
        {'name': 'fast_sma_period', 'type': int, 'min': 20, 'max': 100, 'default': 50},
    ]
```

## Parameter Types

Jesse supports the following parameter types:

### Integer Parameters

For integer values, use `'type': int` or `'type': 'int'`. Required keys:
- `name`: Parameter name
- `min`: Minimum value (inclusive)
- `max`: Maximum value (inclusive)
- `default`: Default value
- `step` (optional): Step size between values (default: 1)

```py
{'name': 'rsi_period', 'type': int, 'min': 5, 'max': 30, 'default': 14, 'step': 1}
```

### Float Parameters

For decimal values, use `'type': float` or `'type': 'float'`. Required keys:
- `name`: Parameter name
- `min`: Minimum value (inclusive)
- `max`: Maximum value (inclusive)
- `default`: Default value
- `step` (optional): Step size between values (default: None, which allows any float value in the range)

```py
{'name': 'entry_threshold', 'type': float, 'min': 0.1, 'max': 5.0, 'default': 1.0, 'step': 0.1}
```

### Categorical Parameters

For parameters that should be selected from a list of options, use `'type': 'categorical'`. Required keys:
- `name`: Parameter name
- `options`: List of possible values (can be any type)
- `default`: Default value (must be one of the options)

```py
{'name': 'indicator_type', 'type': 'categorical', 'options': ['rsi', 'macd', 'bollinger'], 'default': 'rsi'}
```

### Boolean Parameters

For boolean parameters, you can use either:

**Method 1**: Use categorical type
```py
{'name': 'use_filter', 'type': 'categorical', 'options': [True, False], 'default': False}
```

**Method 2**: Use integer type with min=0, max=1
```py
{'name': 'use_filter', 'type': int, 'min': 0, 'max': 1, 'default': 0}
```

Then in your code, convert the value to boolean: `bool(self.hp['use_filter'])`

## Accessing Hyperparameter Values

Jesse injects each hyperparameter into the `self.hp` property that is available in your strategy class. 

Now let's rewrite the starting example to use the dynamic hyperparameters:

```py
@property
def slow_sma(self):
    return ta.sma(self.candles, self.hp['slow_sma_period'])

@property
def fast_sma(self):
    return ta.sma(self.candles, self.hp['fast_sma_period'])
```

If I execute a backtest, I will get the same results as before as if I was using the hard-coded values. That's because I defined `50` and `200` as default values for my hyperparameters. 

When running optimization, Jesse will search through the parameter space defined by the `min`, `max`, and `step` values (for numeric parameters) or through the available options (for categorical parameters) to find the optimal combination.
