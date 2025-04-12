# Using Optimization Results

After running an optimization session, you'll see the best-performing parameter combinations in the "Best Trials" table. There are two ways to use these optimization results in your strategy:

## Method 1: Using the DNA String (Original Method)

You can still use the DNA string approach, which is compatible with both older and newer versions of Jesse.

### Copying the DNA

When you find a good combination of parameters, copy the DNA string that is displayed in the "Best Trials" table. You can do this by clicking the "Copy" button next to the desired trial:

![dna-example](https://api1.jesse.trade/storage/images/docs/dna-example.jpg)

### Implementing the DNA in Your Strategy

Define a method called `dna` inside your strategy that returns the DNA string:

```py
def dna(self):
    return 't4'  # Replace 't4' with your actual copied DNA string
```

When you run your strategy with this DNA method defined, Jesse will use the parameter values encoded in the DNA instead of the default values defined in your hyperparameters method.

## Method 2: Using Parameter Values Directly

Alternatively, you can directly use the optimized parameter values in your strategy.

### Viewing Parameter Values

You can see the exact parameter values for any trial by clicking the "Info" button, which displays all metrics along with the parameter values:

![parameter-details](https://api1.jesse.trade/storage/images/docs/parameter-details.jpg)

### Implementing Parameters in Your Strategy

The simplest approach is to update the default values in your strategy's `hyperparameters()` method:

```py
def hyperparameters(self):
    return [
        {'name': 'slow_sma_period', 'type': int, 'min': 150, 'max': 210, 'default': 180},  # Updated from 200
        {'name': 'fast_sma_period', 'type': int, 'min': 20, 'max': 100, 'default': 42},    # Updated from 50
    ]
```

This approach is straightforward and makes your strategy's optimized parameters clear to anyone reading the code.

## Validating the Results

Regardless of which method you choose, it's important to validate the results by running a backtest on your validation period (a period not used in the optimization process or even the testing period). This confirms that the performance improvements are robust and not due to overfitting.

Remember that optimization results aren't guaranteed to perform well in all market conditions. Always validate thoroughly before using a strategy in live trading.
