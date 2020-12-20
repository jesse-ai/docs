# Определение гиперпараметров
Давайте представим что я хочу оптимизировать период из двух EMA индикаторов в моей стратегии.
Let's imagine that I want to optimize the period of two EMA indicators in my strategy. 

Это то как я могу настроить их вручную, быстро, захаркодив значения как числовые переменные; в этом случае `50`  и `200`.
This is how I would have defined them so far, by hard-coding periods as integer values; in this case `50` and `200`:

```py
@property
def slow_sma(self):
    return ta.sma(self.candles, 200)

@property
def fast_sma(self):
    return ta.sma(self.candles, 50)
```

Для обозначения гиперпараметров в вашей стратегии просто добавьте метод `hyperparameters()` в вашу стратегию. Она должна возвращать список генов (список словарных объектов); каждый из генов должен включать в себя значения `name`, `type`, `min`, `max`, и `default`. Здесь код для примера:
To define the hyperparameters of your strategy, simply add the `hyperparameters()` method to your strategy. It must return a list of python dictionary objects (genes); each of which has to have these key values: `name`, `type`, `min`, `max`, and `default`. Here is the code for this example:

```py
def hyperparameters(self):
    return [
        {'name': 'slow_sma_period', 'type': int, 'min': 150, 'max': 210, 'default': 200},
        {'name': 'fast_sma_period', 'type': int, 'min': 20, 'max': 100, 'default': 50},
    ]
```
`slow_sma_period` и `fast_sma_period` это имена которыя я выбрал для этих двух гиперпараметров. Это могли быть какие то другие параметры. 
`slow_sma_period` and `fast_sma_period` are the names that I chose for these two hyperparameters. It could have been anything else. 

За сценой Джесси инжектит гиперпараметры (гены) в `self.hp` свойство которое доступно в классе стратегии.
Jesse (behind the scenes) injects each hyperparameter (gene) into the `self.hp` property that is available in your strategy class. 

Сейчас давайте перепишим начальный пример на использование гиперпараметров как здесь:
Now let's rewrite my starting example to use the dynamic hyperparameters instead:

```py
@property
def slow_sma(self):
    return ta.sma(self.candles, self.hp['slow_sma_period'])

@property
def fast_sma(self):
    return ta.sma(self.candles, self.hp['fast_sma_period'])
```

If I execute a backtest again, I will get the same results as before as if I was using the hard-coded code. That's because I defined `50` and `200` as default values for my hyperparameters. 