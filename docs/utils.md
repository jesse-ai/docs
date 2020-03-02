# Utilities

These utility functions are helpful when writing strategies. The `utils` module is imported for you when you generate a new strategy but here's the code anyways:

```py
from jesse import utils
```

Here's a reference for all the methods:

## risk\_to\_qty

Calculates the quantity based on the percent of the capital you're willing to risk per trade.

This is probably the most important helper function that you're going to need in your strategies. You can play around with the formula at [positionsizingcalculator](https://positionsizingcalculator.com).

```py
risk_to_qty(capital, risk_per_capital, entry_price, stop_loss_price)
```

**Properties**:

-   capital: float
-   risk_per_capital: float
-   entry_price: float
-   stop_loss_price: float

**Return Type**: float

**Example**:

```py
def go_long(self):
    # risk 1% of the capital($10000) for a trade entering at $100 with the stop-loss at $80
    risk_perc = 1
    entry = 100
    stop = 80
    capital = 10000
    # or we could access capital dynamically:
    capital = self.capital 
    qty = utils.risk_to_qty(capital, risk_perc, entry, stop)
    
    self.buy = qty, 100
    self.stop_loss = qty, 80
    self.take_profit = qty, 150
```

TODO...