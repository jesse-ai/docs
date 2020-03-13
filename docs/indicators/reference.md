# Indicators Reference

Most indicators have a `sequential=False` parameter. When set to `True`, it returns an array of values; which is helpful if you're doing research [Jupyter Notebooks](/docs/jupyter-notebooks).

When developing strategies however, you probably want to keep it as `False` to return only the indicator value for current trading candle.

## matype
In some indicators you can set an moving average type:

0: SMA (simple)
1: EMA (exponential)
2: WMA (weighted)
3: DEMA (double exponential)
4: TEMA (triple exponential)
5: TRIMA (triangular)
6: KAMA (Kaufman adaptive)
7: MAMA (Mesa adaptive)
8: T3 (triple exponential T3)

## sma

Simple moving average (SMA)

```py
sma(candles, period=5, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   period: int - default=5
-   sequential: bool - default=False

**Return Type**: float

## ema

Exponential moving average (EMA)

```py
ema(candles, period=5, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   period: int - default: 5
-   sequential: bool - default=False

**Return Type**: float

## tema

Triple Exponential Moving Average (TEMA)

```py
tema(candles, period=9, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   period: int - default: 9
-   sequential: bool - default=False

**Return Type**: float

## trix

Triple exponential moving average indicator (TRIX)

```py
trix(candles, period=18, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   period: int - default: 18
-   sequential: bool - default=False

**Return Type**: float

## vwma

Volume Weighted Moving Average (VWMA)

```py
vwma(candles, period=20, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   period: int - default: 20
-   sequential: bool - default=False

**Return Type**: float

## bollinger_bands

Bollinger Bands (BBANDS)

```py
bollinger_bands(candles, period=20, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   period: int - default: 20
-   sequential: bool - default=False

**Return Type**: BollingerBands(upperband, middleband, lowerband)

## bollinger_bands_width

Bollinger Bands Width (BBW)

```py
bollinger_bands_width(candles, period=20, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   period: int - default: 20
-   sequential: bool - default=False

**Return Type**: float

## atr

Average true range (ATR)

```py
atr(candles, period=14, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   period: int - default: 14
-   sequential: bool - default=False

**Return Type**: float

## adx

Average Directional Movement Index (ADX)

```py
adx(candles, period=14, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   period: int - default: 14
-   sequential: bool - default=False

**Return Type**: float

## rsi

Relative Strength Index (RSI)

```py
rsi(candles, period=14, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   period: int - default: 14
-   sequential: bool - default=False

**Return Type**: float

## stoch

The Stochastic Oscillator

```py
stoch(candles, period=14, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   period: int - default: 14
-   sequential: bool - default=False

**Return Type**: Stochastic(k, d)

`k` and `d` are the variable names in TradingView. `k` is the fast moving average of the RSI, and `d` is the slow moving average.

## srsi

Stochastic relative strength index (SRSI)

```py
srsi(candles, period=14, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   period: int - default: 14
-   sequential: bool - default=False

**Return Type**: StochasticRSI(k, d)

`k` and `d` are the variable names in TradingView. `k` is the fast moving average of the RSI, and `d` is the slow moving average.

## macd

Moving average convergence divergence (MACD)

```py
macd(candles, fast_period=12, slow_period=26, signal_period=9, signal_type='EMA', sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   fast_period: int - default=12
-   slow_period: int - default=26
-   signal_period: int - default=9
-   signal_type: str - default='EMA'
-   sequential: bool - default=False

**Return Type**: MACD(macd, signal, hist)

## ichimoku_cloud

Ichimoku Cloud

```py
ichimoku_cloud(candles, conversion_line_period=9, base_line_period=26, lagging_line_period=52, displacement=26)
```

**Properties**:

-   candles: np.ndarray
-   conversion_line_period: int - default=9
-   base_line_period: int - default=26
-   lagging_line_period: int - default=52
-   displacement: - default=26

**Return Type**: IchimokuCloud(conversion_line, base_line, span_a, span_b)
