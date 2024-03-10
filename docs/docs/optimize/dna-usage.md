# DNA usage

Let's say you found a good DNA and now you want to use it in your strategy. Go ahead and copy the DNA string that is displayed in the "evolving" dashboard. It should be a weird-looking string such as `t4`. Copy it from within the dashboard:

![dna-example](https://api1.jesse.trade/storage/images/docs/dna-example.jpg)

Then, define a method called `dna` inside your strategy that returns the DNA string:

```py
def dna(self):
    return 't4'
```

Now if you run the SMACrossover strategy, these new values will be used instead of the default ones that we defined [earlier](./hyperparameters.md). For example `slow_sma_period` will be 159 and `fast_sma_period` will be 28.
