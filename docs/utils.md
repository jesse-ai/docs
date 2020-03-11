
# Utilities

These utility functions are helpful when writing strategies. The `utils` module is imported for you when you generate a new strategy but here's the code anyway:

```py
from jesse import utils
```

Here's a reference for all the methods:

## risk\_to\_size

Calculates the size of the position based on the ammount of risk percantage you're willing to take.

```py
risk_to_size(capital_size, risk_percentage, risk_per_qty, entry_price)
```

**Properties**:

-   capital_size: float
-   risk_percentage: float
-   risk_per_qty: float
-   entry_price: float

**Return Type**: float

**Example**:

```py

```

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

## size\_to\_qty

Converts a position-size to the corresponding  quantity.
Example: Requesting $100 at the price of %50 would return 2.

```py
size_to_qty(position_size, price, precision)
```

**Properties**:

-   position_size: float
-   price: float
-   precision: float

**Return Type**: float

**Example**:

```py

```

## qty\_to\_size

Converts a quantity to its corresponding position-size.
Example: Requesting 2 shares at the price of %50 would return $100.

```py
qty_to_size(qty, price)
```

**Properties**:

-   qty: float
-   price: float

**Return Type**: float

**Example**:

```py

```

## anchor\_timeframe

Returns the anchor timeframe. Useful for writing dynamic strategies using multiple timeframes.

```py
anchor_timeframe(timeframe)
```

**Properties**:

-   timeframe: str

**Return Type**: str

**Example**:

```py

```

## limit\_stop\_loss

 Limits the stop-loss price according to the max allowed risk percentage. (How many percent you're OK with the price going against your position)

```py
limit_stop_loss(entry_price, stop_price, trade_type, max_allowed_risk_percentage)
```

**Properties**:

-  entry_price: float
- stop_price: float
- trade_type: str
- max_allowed_risk_percentage: float

**Return Type**: float

**Example**:

```py

```
