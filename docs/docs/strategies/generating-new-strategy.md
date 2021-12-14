---
title: Generating new strategy
---
# Generating new strategy file

To get started, go the menu, and click on the "New Strategy" button:

![new-strategy-menu-button](https://jesse.trade/storage/images/docs/new-strategy-menu-button.jpg)

Then, give it a name. For example:

![new-strategy-form](https://jesse.trade/storage/images/docs/new-strategy-form.jpg)

This will generate `AwesomeStrategy` class located at `jesse/strategies/AwesomeStrategy/__init__.py` including all the methods that are required to run the strategy:

```py
from jesse.strategies import Strategy
from jesse import utils
import jesse.indicators as ta


class AwesomeStrategy(Strategy):
    def should_long(self):
        return False

    def should_short(self):
        return False

    def should_cancel(self):
        return False

    def go_long(self):
        pass

    def go_short(self):
        pass
```
