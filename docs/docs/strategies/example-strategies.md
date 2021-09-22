
# Examples

To get you started we prepared some examples how to approach certain things often used in trading.

For working startegies check out these repositories:

 - [https://github.com/jesse-ai/example-strategies](https://github.com/jesse-ai/example-strategies)
 - [https://github.com/nicolay-zlobin/jesse-indicators](https://github.com/nicolay-zlobin/jesse-indicators)

## Crossovers
Let's try to catch the moment the price moves above the bollinger middleband.
```py
@property  
def long_cross(self):  
    return self.price > self.bb.middleband[-1] and self.candles[:, 2][-2] <= self.bb.middleband[-2]  
  
@property  
def bb(self):  
    return ta.bollinger_bands(self.candles, sequential=True)
```
As alternative you could use the [crossed](https://docs.jesse.trade/docs/utils.html#crossed) utility:
```py
@property  
def long_cross(self):  
    return utils.crossed(self.candles[:, 2], self.bb.middleband, 'above')  
  
@property  
def bb(self):  
    return ta.bollinger_bands(self.candles, sequential=True)
```

## Stoploss  / Take Profit

Simple ATR:
```py
def go_long(self):  
    take_profit = self.price + self.atr * 3  
    stop = self.price - self.atr * 2  
    qty = 10
    self.buy = qty, self.price  
    self.stop_loss = qty, stop  
    self.take_profit = qty, take_profit  
  
  
@property  
def atr(self):  
    return ta.atr(self.candles, period=22)
```

A trailing stop:
```py
def update_position(self):  
    # update trailing_stop_loss only if in profit  
    if self.position.pnl > 0:  
        if self.is_long:  
            self.stop_loss = self.position.qty, self.price - self.atr * 2  
        else:  
            self.stop_loss = self.position.qty, self.price + self.atr * 2
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

## Getting the size right
This example might help with the position size / qty.
We use risk management. There might be situations where risk_to_qty returns a qty exceeding the available capital leading to an exception. The reason for this is a very close stop loss (often due to the usage of the ATR). That's not a error, but expected behaviour of the formula. We add a logic limiting the qty to a maximum percentage (in this case 25 %) of the capital for those cases.
```py
  
def go_long(self):  
    stop = self.bb.lowerband
    qty = self.position_size(self.price, stop)  
    take_profit = self.bb.upperband
    self.buy = qty, self.price  
    self.stop_loss = qty, stop  
    self.take_profit = qty, take_profit  
  
@property  
def position_size(self, entry, stop):  
    # risk 10%
    risk_qty = utils.risk_to_qty(self.capital, 10, entry, stop, self.fee_rate)  
    # never risk more than 25% of the capital
    max_qty = utils.size_to_qty(0.25 * self.capital, entry, precision=6, fee_rate=self.fee_rate)  
    qty = min(risk_qty, max_qty) 
    return qty
```
Using the kelly criterion:
```py
def kelly_qty(self, entry, stop):  
    if not self.metrics or self.metrics['total'] < 20:  
        win_rate = 0.46  
        ratio_avg_win_loss = 1.6  
    else:  
        win_rate = self.metrics['win_rate']  
        ratio_avg_win_loss = self.metrics['ratio_avg_win_loss']  
    kc = utils.kelly_criterion(win_rate, ratio_avg_win_loss) * 100  
    if not kc or kc <= 0:  
        raise ValueError("Bad Kelly criterion.")  
    risk_qty = utils.risk_to_qty(self.available_margin, kc, entry, stop, self.fee_rate)  
    # never risk more than 25%  
    max_qty = utils.size_to_qty(0.25 * self.available_margin, entry, precision=6, fee_rate=self.fee_rate)  
    qty = min(risk_qty, max_qty)  
    return qty
```
We need to check for a minimum of trades so we have a good win_rate and ratio_avg_win_loss to work with. In this case we use 20 trades. For those first trades we use hardcoded values, we got from backtests. win_rate is the same as *Percent Profitable* / 100. ratio_avg_win_loss is called *Ratio Avg Win / Avg Loss*.
