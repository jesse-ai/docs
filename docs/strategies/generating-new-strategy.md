# Generating new strategy file

To get started, run:

```
jesse make-strategy AwesomeStrategy
```

This will generate `AwesomeStrategy` class located at `jesse/strategies/AwesomeStrategy/__init__.py` including all the methods that are required to run the strategy:

```py
from jesse.strategies.Strategy import Strategy
import jesse.services.indicators as ta


class AwesomeStrategy(Strategy):
    def __init__(self, exchange, symbol, timeframe, hyper_parameters=None):
        super().__init__('AwesomeStrategy', '0.0.1', exchange, symbol, timeframe)

    def should_long(self):
        return False

    def should_short(self):
        return False

    def go_long(self):
        pass

    def go_short(self):
        pass

    def should_cancel(self):
        return False
```
