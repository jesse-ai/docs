# DNA usage

Let's say you found a good DNA and now you want to use it in your strategy. Go ahead and copy the DNA string that is displayed in the "evolving" dashboard. It should be a weird-looking string such as `=;0`. Then, paste it as the 5th parameter of your trading route in your `routes.py` file:
```py
routes = [
    ('Bitfinex', 'BTC-USD', '15m', 'SMACrossover', '=;0'),
]
```

To see what would be the translated values for this DNA, run:
```sh
jesse routes --dna
```

The result should look something like:

```
Translated DNAs into hyper-parameters:

SMACrossover     |
-----------------+-----------
slow_sma_period  | 159
fast_sma_period  | 28
```

Now if you run a backtest on the SMACrossover strategy, these new values will be used instead of the default ones that we defined earlier. 