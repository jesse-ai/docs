# Индикаторы

Джесси предлагает многие свои собственные индикаторы, которые в основном является расширенной оберткой вокруг библиотеки [ta-lib](http://ta-lib.org). 

API был разработан, чтобы быть самым простым, но достаточно гибким для всех видов потребностей от разработки стратегий до проведения исследований в [Jupyter Notebooks](/docs/jupyter-notebooks).

::: tip
Настройки по умолчанию были установлены для создания того же результата, что и в [TradingView](http://tradingview.com).
:::

## Import

Чтобы начать, убедитесь, что модуль `indicators` импортируется:

```py
import jesse.indicators as ta
```

## Example 1

Первый параметр всех показателей `candles` с типом массив Numpy. 

При разработке стратегий, как правило, все, о чем нужно думать это ценность индикатора для текущей свечи. Чтобы получить это, просто напишите `self.candles`:

```py
# дай мне SMA с периодом =8 для текущей свечи:
ta.sma(self.candles, 8)
```

## Example 2

Чтобы получить данные индикатора отличного от того что вы торгуете в [маршрутах](/docs/routes) (в случае если вы прописали один маршрут в вашем файле `routes.py`)) используйте метод `self.get_candles()`:

```py
ta.sma(self.get_candles('Binance', 'BTCUSDT', '4h'), 8)
```

## Named Tuples

Для того чтобы вернуть тип всех индикаторов возвращающих множества значений как `namedtuple` объект Python. B в случае если вы не знакомы с концепцией именованных картежей (`namedtuple`) в языке Python.
The return type of all indicators returning multiple values is a `namedtuple` Python object. In case you're not familiar with the concept of  `namedtuple` in Python, it's just like a regular tuple but you can also use it as a class object. 

Для примера здесь два пути которые могут быть использованы как индикатор Bollinger Bands, который как вам известно возвращает три значения: `upperband`, `middleband`, `lowerband`

1. Используйте это как обычный turple (картеж):
```py
# как три переменные
upperband, middleband, lowerband = bollinger_bands(self.candles, period=20)

# если вы сможете получить это как один картеж и обратиться к значениям как к обычному картежу
bb = bollinger_bands(self.candles, period=20)
bb[0] # upperband
bb[1] # middleband
bb[2] # lowerband
```

2. Второй путь это использовать это как класс:
```py
bb = bollinger_bands(self.candles, period=20)
bb.upperband
bb.middleband
bb.lowerband
```
