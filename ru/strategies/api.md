# Справка по API

Есть много встроенных переменных, которые вы можете использовать в вашем пользовательском классе стратегии. Вот описатель их.

## @cached

Этот декоратор может повысить производительность. Он будет кэшировать свои функции / свойства, чтобы избежать ненужных интенсивных вычислительных повторений. Особенно показатели расчета индикаторов, которые часто идеальны кандидатами для этого. Кэш очищается каждой новой свечей за сценой.

**Пример**:
```py
    from jesse.strategies import Strategy, cached

    @property
    @cached
    def donchian(self):
        return ta.donchian(self.candles)
```
::: warning Внимание
Если вы используете его с `@property` убедитесть, что ордер правильный, как выше. В противном случае вы получите ошибку.
:::

## available_margin

Возвращает доступную / оставшуюся маржу на вашу биржевой кошельке. Она равняется вашему первоначальному балансу кошелька, умноженного на кредитное плечо, которое вы используете, добавляя нереализованную прибыль на открытых позициях, за вычетом маржи использованной для открытых заказов. 

Что бы не быть ликвидированным, безопаснее просто использовать свойство [Capital] (Capital) в своих стратегиях.

Свойство предназначено для использования на фьючерсных рынках, на спотовом рынке она равна свойству `self.balance`. 

**возвращаемый тип**: float

**Смотри так же**: [balance](#balance), [capital](#capital)


## average\_entry\_price

Средняя входная цена; цена покупки лонга и цена продажи шорта. Среднее слово указывает на то, что если вы используете более одной точки, чтобы ввести позицию, это свойство возвращает среднее значение. 

**Возвращаемый тип**: float


**Пример**:
```py{14}
def go_long(self):
    qty = 2

    # self.average_entry_price равно (100 + 120) / 2 == 110
    self.buy = [
        (1, 100), 
        (1, 120)
    ]
    self.stop_loss = qty, 80
    self.take_profit = qty, 140

def filter_min_pnl(self):
    min_pnl = 1
    reward_per_qty = abs(self.average_take_profit - self.average_entry_price)
    return (reward_per_qty / self.average_entry_price) * 100 > min_pnl
```

::: warning Внимание
Запомните `average_entry_price` доступно только после выполнения `go_long()` или `go_short()`. Следовательно, он должен использоваться в функциях фильтра или когда позиция открыта. 

Другими словами, вы не можете использовать это внутри `should_long()` и `should_short()`.
:::

**Смотри так же**: [average_take_profit](#average-take-profit), [average_stop_loss](#average-stop-loss)

## average\_stop\_loss

Так же как [average_entry_price](#average-entry-price) для стоп-лосса. Среднее слово указывает на то, что в случае использования более одной точки для стоп-лосса, это свойство возвращает среднее значение. 

**Возвращаемый тип**: float

**Смотри так же**: [average_entry_price](#average-entry-price), [average_take_profit](#average-take-profit)

## average\_take\_profit

Так же как [average_entry_price](#average-entry-price) но для тейк-профита. Слово по середине указывает на то, что в случае использования более одной точки для тейк-профита, это свойство возвращет среднее значение. 

**Возвращаемый тип**: float

**Смотри так же**: [average_entry_price](#average-entry-price), [average_stop_loss](#average-stop-loss)

## balance

Возвращает текущий кошелек в вашем кошельке биржи. На рынке фьючерсов, он ведет себя точно так, как "wallet balance in USDT" на [Binance Futures](http://jesse.trade/binance).

**Возвращаемый тип**: float

**Алиас**: `capital`

**Смотри так же**: [capital](#capital), [available_margin](#available-margin)


## candles

Это свойство возвращает свечи для текущей торговой биржи, символ и тамфрейм. Он часто используется когда используются [технические индикаторы](/ru/indicators) потому что первый параметр для всех индикаторов `candles`. 

**Возвращаемый тип:** np.ndarray

**Пример**:
```py
# получение SMA за период 8 для текущего торгового маршрута
sma8 = ta.sma(self.candles, 8)
```

## capital

Алиас для [balance](#balance)


## close

Алиас для [price](#price)

## current_candle

Возвращает текущую свечу в виде numpy массива.

**Возвращаемый тип**: np.ndarray

```
[
    timestamp,
    open,
    close,
    high,
    low,
    volume
]
```

**Пример**:

```py
from pprint import pprint

pprint(self.current_candle)
# array([1.54638714e+12, 3.79409000e+03, 3.79714000e+03, 3.79800000e+03,
#        3.79400000e+03, 1.30908000e+02])

pprint(self.current_candle.dtype)
# dtype('float64')
```

Вы можете получить timestamp, open, close, high, low, и volume массива свечей:

```py
timestamp = self.current_candle[0]
open_price = self.current_candle[1]
close_price = self.current_candle[2]
high_price = self.current_candle[3]
low_price = self.current_candle[4]
volume = self.current_candle[5]
```

**Смотри так же**: [price](#price), [close](#close), [open](#open), [high](#high), [low](#low)

## fee_rate

Свойство `fee_rate` возвращает комиссии, которые биржа использует для вашей стратегией. Это свойство чаще всего используется в качестве параметра для [risk_to_qty](/docs/utils.html#risk-to-qty). 

**Пример:**
```py
qty = utils.risk_to_qty(self.capital, 3, entry, stop, self.fee_rate)
```

**Возвращаемый тип**: float

**Смотри так же**: [risk_to_qty](/docs/utils.html#risk-to-qty)

::: tip Совет
Свойство `fee_rate` возвращает комиссии биржи как число с плавающей точкой. Для примера на Binance комиссия `0.1%`, следовательно `self.fee_rate` вернет `0.001`.
:::


## get_candles

Этот метод возвращает свечи для биржи, символа и таймфрейма которые вы указали, в отличие от `self.candles` который возвращает свечи для текущего маршрута. 

```py
get_candles(exchange: str, symbol: str, timeframe: str)
```

Для простых стратегий, которые торгуют только одним маршрутом и используют только один таймфрейм, `self.candles` вероятно правильный путь. Иначе, нужно использовать `self.get_candles()`.

**Возвращаемый тип:** np.ndarray

**Пример**:
```py
@property
def big_trend(self):
    """
    Использует индикатор SRSI что бы определить больший тренд рынка. 
    Торгвый таймфрейм "4h" так что мы используем "1D" таймфрейм как якорь.
    """
    k, d = ta.srsi(self.get_candles(self.exchange, self.symbol, '1D'))

    if k > d:
        return 1
    elif k < d:
        return -1
    else:
        return 0
```

**Смотри так же**: [candles](#candles)

## high

Текущая высшая цена свечи.

**Возвращаемый тип**: float

**Пример**:

```py
def go_long(self):
    qty = 1

    # открыть позицию 2 доллара выше текущей свечи
    self.buy = qty, self.high + 2
```

## increased_count

Как сколько раз размер позиции был увеличен, с момента открытия сделки?

Это полезно для стратегий, которые например выходят/выходят в разных точках, и вы можете обновить что то связанные с этим.

**Возвращаемый тип**: int

Это свойство полезно, если: 
1.Вы пытались открыть позицию в более чем одной точке:
```py
def go_long(self):
    self.buy = [
        (0.5, self.price + 10),
        # после этой точки self.increased_count будет 1
        (0.5, self.price + 20), 
        # после этой точки self.increased_count будет 2
        (0.5, self.price + 30), 
        # после этой точки self.increased_count будет 3
    ]
```

2. Вы решили увеличить размер открытой сделки из-за некоторых факторов:

```py
def update_position(self):
    # momentum_rank объвляется методом, который вы определили где-то, что
    # исследует импульс текущей тенденции или чего-то еще
    if self.momentum_rank > 100:
        if self.is_long:
            # купить qty и 1 для текущей цены (MARKET ордер)
            self.buy = 1, self.price
```


## index

Свойство `index` это счетчик который может быть использован для определения того, сколько раз стратегия была выполнена. Представьте, мы делаем делать петлю в режиме бэктестов, и этот индекс показывает индекс этой петли. Приведенные ниже примеры могут объяснить это лучше.

**Возвращаемый тип**: int

**Пример:**

```py
# пример #1: идти в долгую, когда получена первая свеча
def should_long(self):
    return self.index == 0

# пример #2: скажем, есть несколько дорогих операций в  
# метод который я определеил как do_slow_updates() (как часть машинного обучения)
# что я хотел бы сделать один раз в день во время торговли "1m" свечами
def before(self):
    if self.index % 1440 == 0:
        do_slow_updates()
```

## is_close

Текущая позиция закрыта?

**Возвращаемый тип**: bool

Алиас для `self.position.is_close`



## is_long

Тип текущей открытой позиции (текущая сделка) `long`?

**Возвращаемый тип**: bool


## is_open

Текущая позиция открыта?

**Возвращаемый тип**: bool

Алиас для `self.position.is_open`


## is_short

Тип текущей открытой позиции (текущая сделка) `short`?

**Возвращаемый тип**: bool

## leverage

Свойство `leverage` возвращает кредитное плечо как номер, который вы установили в файле конфигурации для биржи, с которой вы работаете внутри стратегии. Для спотового рынка, он всегда возвращает `1`. 

**Возвращаемый тип**: int


## liquidate

Этот метод используется для быстрой ликвидации открытой позиции с использованием рыночного ордера. Это ярлык, чтобы использовать вместо написания такого:
```py
if self.position.pnl > 0:
    self.take_profit = self.position.qty, self.price
else:
    self.stop_loss = self.position.qty, self.price
```

Это часто используется в методе `update_position` стратегии, которые закрывают позиции в конкретных условиях.

**Пример**:

Давайте сначала длинную позицию в первом [индексе](#index), и закроем в 10ом:

```py
def update_position(self):
    if self.index == 10:
        self.liquidate()

def should_long(self):
    return self.index == 0

def go_long(self):
    self.buy = 1, self.price
```


## low

Текущая низшая цена свечи.

**Возвращаемый тип**: float

**Пример**:

```py
def go_long(self):
    qty = 1

    # открытие позиции при 2 долларах выше текущей низшей свечи
    self.buy = qty, self.high + 2

    # открытие позиции при 2 долларах выше текущей низшей свечи
    self.buy = qty, self.low - 2
```

## metrics

Свойство `metrics` возвращают метрики которые вы обычно видите в конце бектестов. Это применимо при кодировании формул таких как [Kelly Criterion](https://www.investopedia.com/articles/trading/04/091504.asp).

::: warning Внимание
Будьте внимательны, без сделок это свойство возвращает `None`. 
:::

**Достпуные метрики:**
- total
- total_winning_trades
- total_losing_trades
- starting_balance
- finishing_balance 
- win_rate 
- max_R 
- min_R 
- mean_R 
- ratio_avg_win_loss 
- longs_count 
- longs_percentage 
- short_percentage 
- shorts_count 
- fee 
- net_profit 
- net_profit_percentage 
- average_win 
- average_loss 
- expectancy 
- expectancy_percentage
- expected_net_profit_every_100_trades
- average_holding_period 
- average_winning_holding_period 
- average_losing_holding_period 
- gross_profit 
- gross_loss 
- max_drawdown 
- annual_return 
- sharpe_ratio 
- calmar_ratio 
- sortino_ratio 
- omega_ratio 
- total_open_trades 
- open_pl
- winning_streak 
- losing_streak 
- largest_losing_trade 
- largest_winning_trade 
- current_streak

**Возвращаемый тип**: dict

## open

Текущая цена открытия свечи.

**Возвращаемый тип**: float

**Пример**:

```py
def should_long(self):
    # идти в долгую, если нынешняя свеча бычья
    if self.close > self.open:
        return True

    return False
```

## orders

Возвращает все позиции, открытые этой стратегией.

**Возвращаемый тип**: List[Order]

## position

Позиция - объект торгового маршрута.

::: tip Совет
Обратите внимание, что у каждого экземпляра маршрута есть только одна позиция, которая доступна внутри стратегии. Это не значит, что вы не можете обменять две позиции, используя одну стратегию; для этого просто создайте два маршрута, используя ту же стратегию, но с разными символами. 
:::

**Возвращаемый тип**: Position

```py
# Указываются только полезные свойства
class Position:
    # (средняя) входная цена позиции | None, если позиция закрыта
    entry_price: float
    # количество текущей позиции | 0 если позиция закрыта
    qty: float
    # отметка времени, когда позиция открывается | None если позиция закрыта
    opened_at: float
    # Значение открытой позиции
    value: float
    # Тип открытой позиции, который может быть либо коротким, длинным или закрытым
    type: str
    # PNL позиции
    pnl: float
    # PNL% позиции
    pnl_percentage: float
    # Открыта ли текущая позиция?
    is_open: bool
    # Закрыта ли текущая позиция?
    is_close: bool
```

**Пример:**
```py
# Если позиция в прибыли от 10%, обновить стоп-лосс до уровня безубыточности
def update_position(self):
    if self.position.pnl_percentage >= 10:
        self.stop_loss = self.position.qty, self.position.entry_price
```

**Смотри так же**: [is_long](#is-long), [is_short](#is-short), [is_open](#is-open), [is_close](#is-close)


## price

Цена текущая/закрытия торгового символа в торговом таймфрейме.

**Возвращаемый тип**: float

**Aliases**: `close`

**Пример**:

```py
def go_long(self):
    # Купить 1 акцию по текущей цене (рыночный ордер)
    self.buy = 1, self.price
```

## reduced_count

Сколько раз размер позиции сократился, с момента открытия этой сделки?

Это полезно для стратегий, которые, например, выходят в нескольких точках, и вы хотели бы обновить что-то связанное с этим.

**Возвращаемый тип**: int

**Пример**:

```py{12}
def go_long(self):
    self.buy = 1, self.price
    self.stop_loss = 1, self.price - 10
    self.take_profit = [
        (0.5, self.price + 10), 
        (0.5, self.price + 20) 
    ]

def update_position(self):
    # хотя мы указали цену выхода 
    # для второй половины, теперь мы обновились, чтобы выйти с SMA20
    if self.reduced_count > 0:
        self.take_profit = 0.5, self.SMA20

@property
def SMA20(self):
    return ta.sma(self.candles, 20)
```


## shared_vars

`shared_vars` это объект словарь, просто как `vars` за исключением того, что он разделяется среди всех ваших [маршрутов](/ru/routes). 

Вам понадобится `shared_vars` для написания стратегий, которые требуют более одного маршрута, и когда эти маршруты нужно комуницировать друг с другом. 

`shared_vars` может действовать как мост. Один пример может быть в парной торговле которая требует два маршрута для комуникации друг с другом (один лонг, когда другой шорт)

**Возвращаемый тип**: dict

**Смотри так же**: [vars](#vars)


## time

Текущий таймфрейм времени UTC.

**Возвращаемый тип**: int

## trades

Возвращает все законченные сделки для этой стратегии.

**Возвращаемый тип**: List[CompletedTrade]

## vars

`vars` название объекта словаря, присутствующего в вашей стратегии, которую вы можете использовать в качестве заполнителей для ваших переменных.

Конечно, вы можете определить свои собственные переменные внутри `__init__`, но это принесет проблемы по поводу именования ваших переменных для предотвращения конфликта со встроенным переменным и свойствами.

Использование `vars` также облегчит отладку.


**Возвращаемый тип**: dict