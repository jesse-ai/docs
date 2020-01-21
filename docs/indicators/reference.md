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

**Return Type**: BollingerBands(upperband: float, middleband: float, lowerband: float)

## bollinger\_bands\_width

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

## rsi

Relative Strength Index (RSI)

```py
rsi(exchange, symbol, timeframe, period=14)
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

**Return Type**: Stochastic(k: float, d: float)

`k` and `d` are the variable names in TradingView. `k` is the fast moving average of the RSI, and `d` is the slow moving average.

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

**Return Type**: StochasticRSI(k: float, d: float)

`k` and `d` are the variable names in TradingView. `k` is the fast moving average of the RSI, and `d` is the slow moving average.

## macd

Moving average convergence divergence (MACD)

```py
macd(exchange, symbol, timeframe)
```

**Properties**:

-   exchange: str
-   symbol: str
-   timeframe: str

**Return Type**: MACD(macd: float, signal: float, hist: float)

## ichimoku_cloud

Ichimoku Cloud

```py
ichimoku_cloud(exchange, symbol, timeframe, conversion_line_period=9, base_line_period=26, lagging_line_period=52, displacement=26)
```

**Properties**:

- exchange: str
- symbol: str
- timeframe: str
- conversion_line_period: int - default=9
- base_line_period: int - default=26
- lagging_line_period: int - default=52
- displacement: - default=26

**Return Type**: IchimokuCloud(conversion_line: float, base_line: float, span_a: float, span_b: float)
