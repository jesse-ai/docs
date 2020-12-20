# Утилиты

Эти утилиты помогают когда пишешь стратегии. Модуль `utils` импортируется в момент генерирации новой стратегии. Здесь пример импорта модуля на всякий случай:

```py
from jesse import utils
```

Это справка по всем методам:

## risk\_to\_qty

Высчитывает количество основанное на проценте от капитала которым вы хотите рискнуть:

::: tip 
Вероятно это самая важная вспомогательная функция, которая понадобиться в ваших стратегиях. Особенно интересна она будет тем кто знаком со сложным риском.

Специально сделан [сайт](https://positionsizingcalculator.netlify.app) на котором вы могли поиграть с этой простой но важной формулой.
:::

```py
risk_to_qty(capital, risk_per_capital, entry_price, stop_loss_price, fee_rate=0)
```

**Свойства**

-   capital: float
-   risk_per_capital: float
-   entry_price: float
-   stop_loss_price: float
-   fee_rate: float - default: 0

**Return Type**: float

**Пример**:

<small>**Example**:</small>

```py
def go_long(self):
    # risk 1% of the capital($10000) for a trade entering at $100 with the stop-loss at $80
    risk_perc = 1
    entry = 100
    stop = 80
    profit = 150
    capital = 10000
    # or we could access capital dynamically:
    capital = self.capital
    qty = utils.risk_to_qty(capital, risk_perc, entry, stop)

    self.buy = qty, entry
    self.stop_loss = qty, stop
    self.take_profit = qty, profit
```
В реальной торговле обычно нужно включать комиссию в расчета количества на обмен, чтобы убедиться, что вы не тратите больше, чем есть (капитала) (если будет так, то Джесси поднимет ошибку)


```py
# so instead of 
qty = utils.risk_to_qty(capital, risk_perc, entry, stop)

# it's better to do
qty = utils.risk_to_qty(capital, risk_perc, entry, stop, self.fee_rate)
```
**Смотрите так же**: [ставку комиссий](/docs/strategies/api.html#fee-rate)


## risk\_to\_size

Высчитывает размер позиции основанный на количестве риска, который вы готовы принять


```py
risk_to_size(capital_size, risk_percentage, risk_per_qty, entry_price)
```
**Свойства**:


-   capital_size: float
-   risk_percentage: float
-   risk_per_qty: float
-   entry_price: float

**Return Type**: float

## size\_to\_qty

Преобразует размер позиции в соответсвующее количество. Пример: запрос 100$ по цене %50 вернёт 2.


```py
size_to_qty(position_size, price, precision=3, fee_rate=0)
```
**Свойства**:

-   position_size: float
-   price: float
-   precision: float - default: 3
-   fee_rate: float - default: 0

**Return Type**: float

## qty\_to\_size

Преобразует количество в соответсвующий размер позиции. Пример: запрос 2 акций по цене 50% вернёт 100$.


```py
qty_to_size(qty, price)
```

**Свойства**:

-   qty: float
-   price: float

**Return Type**: float

## anchor_timeframe

Returns the anchor timeframe. Useful for writing dynamic strategies using multiple timeframes.

```py
anchor_timeframe(timeframe)
```

**Properties**:

-   timeframe: str

**Return Type**: str

**Example**:

One useful example for this could be in your routes file when you need to define the anchor timeframe. Let's say for example we're trading `4h` timeframe but don't know the anchor timeframe for it.

```py{9}
from jesse.utils import anchor_timeframe

# trading routes
routes = [
    ('Binance', 'BTCUSDT', '4h', 'ExampleStrategy'),
]

extra_candles = [
    ('Binance', 'BTCUSDT', anchor_timeframe('4h')),
]
```

## limit\_stop\_loss

Limits the stop-loss price according to the max allowed risk percentage. (How many percent you're OK with the price going against your position)

```py
limit_stop_loss(entry_price, stop_price, trade_type, max_allowed_risk_percentage)
```

**Properties**:

-   entry_price: float
-   stop_price: float
-   trade_type: str
-   max_allowed_risk_percentage: float

**Return Type**: float

## estimate\_risk

Estimates the risk per share

```py
estimate_risk(entry_price, stop_price)
```

**Properties**:

-   entry_price: float
-   stop_price: float

**Return Type**: float

## crossed

Helper for the detection of crosses

```py
crossed(series1, series2, direction=None, sequential=False)
```

**Properties**:

-   series1: np.ndarray
-   series2: float, int, np.ndarray
-   direction: str - default: None - above or below

**Return Type**: bool | np.ndarray

## numpy\_candles\_to\_dataframe

Helper to convert numpy to financial dataframe

```py
numpy_candles_to_dataframe(candles: np.ndarray, name_date="date", name_open="open", name_high="high",
                               name_low="low", name_close="close", name_volume="volume")
```

**Properties**:

-   candles: np.ndarray
-   name_date: str
-   name_open: str
-   name_high: str
-   name_low: str
-   name_close: str
-   name_volume: str

**Return Type**: pd.DataFrame
