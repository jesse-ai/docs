# Indicators Reference

## sma

Simple moving average (SMA)

```py
sma(exchange, symbol, timeframe, period)
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
ema(exchange, symbol, timeframe, period)
```

**Properties**:

-   exchange: str
-   symbol: str
-   timeframe: str
-   period: int - default: 5

**Return Type**: float

## atr

Average true range (ATR)

```py
atr(exchange, symbol, timeframe, period)
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
adx(exchange, symbol, timeframe, period)
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
stoch(exchange, symbol, timeframe, period)
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
srsi(exchange, symbol, timeframe, period)
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
