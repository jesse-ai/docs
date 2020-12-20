# Utilities

<ru>Эти утилиты помогают когда пишешь стратегии. Модуль `utils` импортируется в момент генерирации новой стратегии. Здесь пример импорта модуля на всякий случай:</ru>

<small>These utility functions are helpful when writing strategies. The `utils` module is imported for you when you generate a new strategy but here's the code anyway:</small>

```py
from jesse import utils
```

<ru>Это справка по всем методам:</ru>

<small>Here's a reference for all the methods:</small>

## risk\_to\_qty

<ru>Высчитывает количество основанное на проценте от капитала которым вы хотите рискнуть:</ru>

<small>Calculates the quantity, based on the percentage of the capital you're willing to risk per trade.</small>

::: tip 
<ru>Вероятно это самая важная вспомогательная функция, которая понадобиться в ваших стратегиях. Особенно интересна она будет тем кто знаком со сложным риском.</ru>

<small>This is probably the most important helper function that you're going to need in your strategies. Those of you whom are familiar with compounding risk would love this function.</small>

<ru>Специально сделан [сайт](https://positionsizingcalculator.netlify.app) на котором вы могли поиграть с этой простой но важной формулой.</ru>

<small>We made a [website](https://positionsizingcalculator.netlify.app) for you just to play with this simple but important formula.</small>
:::

```py
risk_to_qty(capital, risk_per_capital, entry_price, stop_loss_price, fee_rate=0)
```

<ru>**Свойства**</ru>

<small>**Properties**</small>:

-   capital: float
-   risk_per_capital: float
-   entry_price: float
-   stop_loss_price: float
-   fee_rate: float - default: 0

**Return Type**: float

<ru>**Пример**:</ru>

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
<ru>В реальной торговле обычно нужно включать комиссию в расчета количества на обмен, чтобы убедиться, что вы не тратите больше, чем есть (капитала) (если будет так, то Джесси поднимет ошибку)</ru>

<small>In real trading, you usually need to include the exchange fee in qty calculation to make sure you don't spend more than the existing capital (in which case Jesse would raise an error):</small>

```py
# so instead of 
qty = utils.risk_to_qty(capital, risk_perc, entry, stop)

# it's better to do
qty = utils.risk_to_qty(capital, risk_perc, entry, stop, self.fee_rate)
```
<ru>**Смотрите так же**: [ставку комиссий](/docs/strategies/api.html#fee-rate)</ru>

<small>**See Also**: [fee_rate](/docs/strategies/api.html#fee-rate)</small>

## risk\_to\_size

<ru>Высчитывает размер позиции основанный на количестве риска, который вы готовы принять</ru>

<small>Calculates the size of the position based on the amount of risk percentage you're willing to take.</small>

```py
risk_to_size(capital_size, risk_percentage, risk_per_qty, entry_price)
```
<ru>**Свойства**:</ru>

<small>**Properties**:</small>

-   capital_size: float
-   risk_percentage: float
-   risk_per_qty: float
-   entry_price: float

**Return Type**: float

## size\_to\_qty

<ru>Преобразует размер позиции в соответсвующее количество. Пример: запрос 100$ по цене %50 вернёт 2.</ru>

<small>Converts a position-size to the corresponding quantity.
Example: Requesting \$100 at the price of %50 would return 2.</small>

```py
size_to_qty(position_size, price, precision=3, fee_rate=0)
```
<ru>**Свойства**:</ru>

<small>**Properties**:</small>

-   position_size: float
-   price: float
-   precision: float - default: 3
-   fee_rate: float - default: 0

**Return Type**: float

## qty\_to\_size

<ru>Преобразует количество в соответсвующий размер позиции. Пример: запрос 2 акций по цене 50% вернёт 100$.</ru>

<small>Converts a quantity to its corresponding position-size.
Example: Requesting 2 shares at the price of %50 would return \$100.</small>

```py
qty_to_size(qty, price)
```

<ru>**Свойства**:</ru>

<small>**Properties**:</small>

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
