
# Продвинутый - добавление пользовательского индикатора

Ваша идея нуждается в индикаторах, которых еще нет? Давайте посмотрим, как создавать и использовать пользовательские индикаторы в Джесси.

## Учебник по созданию пользовательского индикатора

В этом руководстве мы будем переписывать [Elliott Wave Oscillator by Centrokom](https://id.tradingview.com/script/Q29rCz5S-Elliott-Wave-Oscillator/) который инзначально написана на Pine Script на пользовательский индикатор используемый в Джесси. Ниже приведен исходный код из Tradingview:
```js
//@version=3
study("Elliott Wave Oscillator")
s2=ema(close, 5) - ema(close, 34)
c_color=s2 <= 0 ? red : lime
plot(s2, color=c_color, style=histogram, linewidth=2)
```

Итак, давайте начнем создание нашего первого пользовательского индикатора:
1. Создайте новую папку под названием `custom_indicators` и создайте `__init__.py` файл в корне этой папки.
2. Затем создайте новый файл для этого индикатора, в этом примере мы назовев его: `ewo.py` для Elliott Wave Oscillator.
3. Структура папок должна выглядеть приблизительно так:
```sh
├── config.py # файл где вы прописываете свои учетные данные бд и тд
├── routes.py # файл где находятся ваши торговые роуты
├── storage # папка которая содержит логи, картинги графиков и все такое
├── strategies # папка где вы храните ваши стратегии и тд
└── custom_indicators # папки пользовательских индикаторов храняться здесь
    ├── __init__.py
    └── ewo.py
```
4. Импортируйте пользовательский индикатор в `custom_indicators/__init__.py`.
```python
from .ewo import ewo
```
5. Теперь мы можем создавать пользовательский индикатор в `ewo.py`.
```python
import numpy as np
import talib
from typing import Union

from jesse.helpers import get_candle_source

def ewo(candles: np.ndarray, short_period: int = 5, long_period: int = 34, source_type="close", sequential = False) -> Union[float, np.ndarray]:
    """
    Elliott Wave Oscillator
    :param candles: np.ndarray
    :param short_period: int - default: 5
    :param long_period: int - default: 34
    :param source_type: str - default: close
    :param sequential: bool - default: False
    :return: Union[float, np.ndarray]
    """
    if not sequential and len(candles) > 240:
        candles = candles[-240:]
    
    src = get_candle_source(candles, source_type)
    ewo = np.subtract(talib.EMA(src, timeperiod=short_period), talib.EMA(src, timeperiod=long_period))

    if sequential:
        return ewo
    else:
        return ewo[-1]
```
6. В конце, мы используем индикатор в торговой стратегии, мы добавляем папку custom_indicators как библиотеку.
```python
from jesse.strategies import Strategy
import custom_indicators as cta

class Strategy01(Strategy):
    @property
    def ewo(self):
        return cta.ewo(self.candles, short_period=5, long_period=34, source_type="close", sequential=True)
```
## Подсказка
### Доступ к ценам открытия, закрытия, самой высокой, самой низкой и объему
В этом руководстве ниже мы используем функцию хелпер. `src = get_candle_source(candles, source_type)`. 
Функция получает как параметры:
-   `"close"`
-   `"high"`
-   `"low"`
-   `"open"`
-   `"volume"`
-   `"hl2"`
-   `"hlc3"`
-   `"ohlc4"`

и возвращает соотвествующую информацию по свечам. Это применимо в большинстве случаев, но вы можете получать и считать эти данные прямо в нутри вашего идикатора.
```python
candles_open = candles[:, 1]
candles_close = candles[:, 2]
candles_high = candles[:, 3]
candles_low = candles[:, 4]
candles_volume = candles[:, 5]
candles_hl2 = (candles[:, 3] + candles[:, 4]) / 2
candles_hlc3 = (candles[:, 3] + candles[:, 4] + candles[:, 2]) / 3
candles_ohlc4 = (candles[:, 1] + candles[:, 3] + candles[:, 4] + candles[:, 2]) / 4
```
### The thing with NaN and zero
Вы должны поставить значения идникатора, которые не могут быть приведены к `np.nan`!

О значениях NaN:

-   NaN сокращение от “Not a Number” - не число.
-   NaN значения показывают неопределенный или непредставленные результаты для определенных математических операций.
-   Математические операции с участием NaN будут возвращать либо NaN либо будут пробрасывать исключение.
-   Сравнение с участием NaN возвращают False.

Каковы причины для этого? Например в зависимости от вашего расчета вам может понадобиться N свечей из прошлого. Потому что, вы не хотите не сможете рассчитать значение для индикатора для именно этих N свечей в начале ваших данных. Чтобы избежать будущих проблем в вашей стратегии или расчетах, они должны быть установлены на `np.nan` и не NaN \ None. Представьте себе стратегию, где вы входите в состояние `self.indicator_value < self.price`. Если вы использовали None вместо NaN и текущее значение индикатора не сможет быть посчитано потому что пропущены свечи в прошлом или любая другая ситуация, условие должно быть True, если значение реального индикатора будет больше или такое же, как цена. Если вы использовали NaN то результат вернется False так избежите  проблем и вы в безопасности.


### Фишка с длинной
Numpy делает работу с массивами легкой. Например, вы можете легко создать цены hl2 типа этого:
```python
candles_hl2 = (candles[:, 3] + candles[:, 4]) / 2
```
Это работает, потому что `candles[:, 3]` и `candles[:, 4]`имеют одинаковую форму / длину.
Вот почему важно всегда сохранять длину. [Используйте это, чтобы сравнивать длины](https://docs.jesse.trade/docs/indicators/custom_indicator.html#make-it-the-same-lenght-again) и прочитайте это, чтобы понять, почему важно использовать NaN для пропущенных значений: [Фишка с NaN и пусто](#фишка-с-NaN-и-пусто).

### Внешние библиотеки для технических индикаторов и штуки о которых нужно быть в курсе
В основном существуют два вида библиотек Python для технических индикаторов: некоторые базируются на основе Pandas, а некоторые базируются на Numpy. По причинам производительности Джесси использует Numpy.

#### Talib
Talib великолепно подходит для Jesse так как использует Numpy.
```python
import talib
ema = talib.EMA(candles[:, 2], timeperiod=period)
```
#### Tulipy 
Tulipy использует Numpy, но есть две вещи, о которых вы должны знать.
```python
import tulipy
zlema = tulipy.zlema(np.ascontiguousarray(candles[:, 2]), period=period)
zlema_with_nan = np.concatenate((np.full((candles.shape[0] - zlema.shape[0]), np.nan), zlema)
```
  - Tulipy работает только contiguousarray. Преобразование может быть сделано с: `np.ascontiguousarray(candles[:, 2])`
  - Возвращенная длина массива варьируется. Это связано с проблемой, объясненной в [The thing with NaN and zero](#the-thing-with-nan-and-zero). Tulipy просто убирает значения которые он не может пощитать. Для того чтобы оставить согласованной длинну массивов, нам нужно зваолнить данные значениями NaN: `np.concatenate((np.full((candles.shape[0] - zlema.shape[0]), np.nan), zlema), axis=0)`. Это сравнивает длину и добавляет разницу NaN к началу массива индикатора.


#### Библиотеки использующие Pandas
Здесь есть библиотеки, использующие Pandas. Чтобы использовать их вам нужно сконвертировать Numpy в Pandas.
Вы можете посмотреть [эту вспомогательную функцию](https://docs.jesse.trade/docs/utils.html#numpy-candles-to-dataframe) для этого преобразования. Результат индикатора должен быть преобразован обратно в Numpy. Вероятно, это можно сделать так: [pandas.Series.to_numpy](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.to_numpy.html#pandas-series-to-numpy). 
Все эти конвертации будут стоить производительности и Pandas сам по себе менее производительнее чем Numpy.


### Петли
Если возможно, то старайтесь избегать петель. Numpy и Scipy имеют много функций, которые могут заменить вещи, которые вы будете делать в цикле. Петли сделают бэкенд очень медленным. Наихудщее решение будет петля внутри цикла. Изучите немного пути как чтобы избежать их. Форум Джесси или Stackoverflow могут быть хорошим местом для обсуждения.


#### Как сделать петлю, если вы не можете избежать этого:
Для этого примера мы рассчитываем разницу цен закрытия к цене закрытия 10 свечей назад. Сначала мы создаем пустой массив с NaNами (Почему так смотри тут: [The thing with NaN and zero](#the-thing-with-nan-and-zero)). 
Затем мы делаем петлю, начиная с i = 10, так как нам нужно 10 прошлых свечей для этого расчета, пока мы не достигнем максимальной доступной длины свечи.
```python
    close = candles[:, 2]
    my_indicator_from_loop = np.full_like(close, np.nan)
    for i in range(10, len(close)):
        my_indicator_from_loop[i] = close[i] - close[i-10]
```
### Полезные вещи Numpy
Здесь мы собираем функции и ссылки, которые часто полезны в индикаторе.

#### Numpy's Shift (Сдвиг)
```python
def shift(arr, num, fill_value=np.nan):  
    result = np.empty_like(arr)  
    if num > 0:  
        result[:num] = fill_value  
        result[num:] = arr[:-num]  
    elif num < 0:  
        result[num:] = fill_value  
        result[:num] = arr[-num:]  
    else:  
        result[:] = arr  
    return result
```
[Источник](https://stackoverflow.com/a/42642326/6437437)

#### Делает длинну массивов одинаковыми
```python
array_with_matching_lenght = np.concatenate((np.full((candles.shape[0] - array_with_shorter_lenght.shape[0]), np.nan), array_with_shorter_lenght)
```
#### Use Numpy's Vectorized Operations
Если хотите, то есть возможность использовать [VectorizedOperations](https://www.pythonlikeyoumeanit.com/Module3_IntroducingNumpy/VectorizedOperations.html), так как так гораздо быстрее.
