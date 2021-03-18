
# Examples

To get you started we prepared some examples how to approach certain things often used in trading.

For working startegies check out these repositories:
- [https://github.com/jesse-ai/example-strategies](https://github.com/jesse-ai/example-strategies)
- [https://github.com/nicolay-zlobin/jesse-indicators](https://github.com/nicolay-zlobin/jesse-indicators)

## Crossovers:
Let's try to catch the moment the price moves above the bollinger middleband.
```py
@property  
def long_cross(self):  
    return self.price > self.bb.middleband[-1] and self.candles[:, 2][-2] <= self.bb.middleband[-2]  
  
@property  
def bb(self):  
    return ta.bollinger_bands(self.candles, sequential=True)
```
As alternative you could use the [crossed](https://docs.jesse.trade/docs/utils.html#crossed) utility.  
## Stoploss  / Take Profit

Simple ATR:
```py
take_profit = self.price + self.atr * 3
stop = self.price - self.atr * 2

@property  
def atr(self):  
    return ta.atr(self.candles, period=22)
```

You also can use Moving Averages to exit once they are hit.
```py
def update_position(self):  
    if self.is_long and self.price <= self.exit_ema:  
       self.liquidate()  
       
@property  
def exit_ema(self):  
    return ta.ema(self.candles)
```

Special indicators you might want to try for your exits:
- [safezonestop](https://docs.jesse.trade/docs/indicators/reference.html#safezonestop)
- [devstop](https://docs.jesse.trade/docs/indicators/reference.html#devstop) 
- [kaufmanstop](https://docs.jesse.trade/docs/indicators/reference.html#kaufmanstop)

Channels can also be good for stoploss or take profit:
 - [Keltner](https://docs.jesse.trade/docs/indicators/reference.html#keltner)
 - [Donchian](https://docs.jesse.trade/docs/indicators/reference.html#donchian)
 - [Bollinger Bands](https://docs.jesse.trade/docs/indicators/reference.html#bollinger-bands)


