# Indicators

Jesse uses its own [indicators package](https://github.com/jesse-ai/indicators). It has been tailored to be as easy as it can get, yet blazing fast for using in strategies. 

## Supported Indicatros 
Here are the list of current supported indicators: 

- Simple Moving Average (SMA)
- Exponential Moving Average (EMA)
- Relative Strength Index (RSI)

## Usage Example

Let's assume we have a strategy that requires EMA values for periods of `9` and `25`.

1. In your strategy class's, define properties for each data you need:
```
ema9: number 
ema25: number 
```

2. In your strategy class's `update()` write following code: 
```
this.ema9 = this.indicators.ema(9)
this.ema25 = this.indicators.ema(25)
```

That's it! In two easy steps you're now able to use those values. 


## Other Time Frames  
TODO...

## Other symbols   
TODO...