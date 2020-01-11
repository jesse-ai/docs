# Indicators Reference

## sma

Simple moving average (SMA)

```py
sma(exchange, symbol, timeframe, period=5)
```

**Properties**:

-   exchange: str
-   symbol: str
-   timeframe: str
-   period: int - default: 5

**Return Type**: float

## ema

Exponential moving average (EMA)

```py
ema(exchange, symbol, timeframe, period=5)
```

**Properties**:

-   exchange: str
-   symbol: str
-   timeframe: str
-   period: int - default: 5

**Return Type**: float

## bollinger_bands

Bollinger Bands (BBANDS)

```py
bollinger_bands(exchange, symbol, timeframe, period=20)
```

**Properties**:

-   exchange: str
-   symbol: str
-   timeframe: str
-   period: int - default: 20

**Return Type**: tuple(upperband: float, middleband: float, lowerband: float)

## bollinger_bands_width

Bollinger Bands Width (BBW)

```py
bollinger_bands_width(exchange, symbol, timeframe, period=20)
```

**Properties**:

-   exchange: str
-   symbol: str
-   timeframe: str
-   period: int - default: 20

**Return Type**: float

## atr

Average true range (ATR)

```py
atr(exchange, symbol, timeframe, period=14)
```

**Properties**:

-   exchange: str
-   symbol: str
-   timeframe: str
-   period: int - default: 14

**Return Type**: float

## adx

Average Directional Movement Index (ADX)

```py
adx(exchange, symbol, timeframe, period=14)
```

**Properties**:

-   exchange: str
-   symbol: str
-   timeframe: str
-   period: int - default: 14

**Return Type**: float

## stoch

The Stochastic Oscillator

```py
stoch(exchange, symbol, timeframe, period=14)
```

**Properties**:

-   exchange: str
-   symbol: str
-   timeframe: str
-   period: int - default: 14

**Return Type**: tuple(K: float, D: float)

`K` and `D` are the variable names in TradingView. `K` is the fast moving average of the RSI, and `D` is the slow moving average.

## srsi

Stochastic relative strength index (SRSI)

```py
srsi(exchange, symbol, timeframe, period=14)
```

**Properties**:

-   exchange: str
-   symbol: str
-   timeframe: str
-   period: int - default: 14

**Return Type**: tuple(K: float, D: float)

`K` and `D` are the variable names in TradingView. `K` is the fast moving average of the RSI, and `D` is the slow moving average.

## macd

Moving average convergence divergence (MACD)

```py
macd(exchange, symbol, timeframe)
```

**Properties**:

-   exchange: str
-   symbol: str
-   timeframe: str

**Return Type**: tuple(macd: float, macd_signal: float, macd_hist: float)
