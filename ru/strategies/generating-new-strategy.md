# Генерация нового файла стратегии

Для начала запустите:

```
jesse make-strategy AwesomeStrategy
```

Это сгенерирует класс `AwesomeStrategy` расположенный в  `jesse/strategies/AwesomeStrategy/__init__.py` включая методы, необходимые для запуска стратегии:

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
