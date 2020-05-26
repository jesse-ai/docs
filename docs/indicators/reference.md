# Indicators Reference

Most indicators have a `sequential=False` parameter. When set to `True`, it returns an array of values; which is helpful if you're doing research [Jupyter Notebooks](/docs/jupyter-notebooks).

When developing strategies however, you probably want to keep it as `False` to return only the indicator value for current trading candle.

::: tip matype
In few indicators you can set an moving average type:

-   `0`: SMA (simple)
-   `1`: EMA (exponential)
-   `2`: WMA (weighted)
-   `3`: DEMA (double exponential)
-   `4`: TEMA (triple exponential)
-   `5`: TRIMA (triangular)
-   `6`: KAMA (Kaufman adaptive)
-   `7`: MAMA (Mesa adaptive)
-   `8`: T3 (triple exponential T3)
:::

<!-- # Overlap Studies -->

## bollinger_bands

Bollinger Bands (BBANDS)

```py
bollinger_bands(candles, period=20, devup=2, devdn=2, matype=0, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   period: int - default: 20
-   devup: float  - default: 20
-   devdn: float  - default: 20
-   matype: int - default: 20
-   sequential: bool - default=False

**Return Type**: BollingerBands(upperband, middleband, lowerband)

## bollinger_bands_width

Bollinger Bands Width (BBW)

```py
bollinger_bands_width(candles, period=20, devup=2, devdn=2, matype=0, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   period: int - default: 20
-   devup: float  - default: 20
-   devdn: float  - default: 20
-   matype: int - default: 20
-   sequential: bool - default=False

**Return Type**: float

## dema

Double Exponential Moving Average (DEMA)

```py
dema(candles, period=30, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   period: int - default=30
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

## ht_trendline

Hilbert Transform - Instantaneous Trendline

```py
ht_trendline(candles, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   sequential: bool - default=False

**Return Type**: float

## kama

Kaufman Adaptive Moving Average (KAMA)

```py
kama(candles, period=30, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   period: int - default=30
-   sequential: bool - default=False

**Return Type**: float

## mama

MESA Adaptive Moving Average (MAMA)

```py
mama(candles, fastlimit=0.5, slowlimit=0.05, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   fastlimit: float - default: 0.5
-   slowlimit: float - default: 0.05
-   sequential: bool - default=False

**Return Type**: MAMA(mama, fama)

## sar

Parabolic SAR

```py
sar(candles, acceleration=0.02, maximum=0.2, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   acceleration: float - default: 0.02
-   maximum: float - default: 0.2
-   sequential: bool - default=False

**Return Type**: float

## sarext

Parabolic SAR - extended

```py
sarext(candles, startvalue=0, offsetonreverse=0, accelerationinitlong=0, accelerationlong=0, accelerationmaxlong=0, accelerationinitshort=0, accelerationshort=0, accelerationmaxshort=0, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   startvalue: float - default: 0
-   offsetonreverse: float - default: 0
-   accelerationinitlong: float - default: 0
-   accelerationlong: float - default: 0
-   accelerationmaxlong: float - default: 0
-   accelerationinitshort: float - default: 0
-   accelerationshort: float - default: 0
-   accelerationmaxshort: float - default: 0
-   sequential: bool - default=False

**Return Type**: float

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

## t3

Triple Exponential Moving Average (T3)

```py
t3(candles, period=5, vfactor=0, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   period: int - default: 5
-   vfactor: float - default: 0
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

## trima

Triangular Moving Average (TRIMA)

```py
trima(candles, period=30, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   period: int - default: 30
-   sequential: bool - default=False

**Return Type**: float

## wma

Weighted Moving Average (WMA)

```py
wma(candles, period=30, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   period: int - default: 30
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

## adxr

Average Directional Movement Index Rating (ADXR)

```py
adxr(candles, period=14, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   period: int - default: 14
-   sequential: bool - default=False

**Return Type**: float

## apo

Absolute Price Oscillator (APO)

```py
apo(candles, fastperiod=12, slowperiod=26, matype=0, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   fastperiod: int - default: 12
-   slowperiod: int - default: 26
-   matype: int - default: 0 (see [matype](#matype))
-   sequential: bool - default=False

**Return Type**: float

## aroon

Aroon

```py
aroon(candles, period=14, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   period: int - default=14
-   sequential: bool - default=False

**Return Type**: AROON(aroondown, aroonup)

## aroonosc

Aroon Oscillator

```py
aroonosc(candles, period=14, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   period: int - default=14
-   sequential: bool - default=False

**Return Type**: float

## bop

Balance Of Power (BOP)

```py
bop(candles, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   sequential: bool - default=False

**Return Type**: float

## cci

Commodity Channel Index (CCI)

```py
cci(candles, period=14, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   period: int - default=14
-   sequential: bool - default=False

**Return Type**: float

## cmo

Chande Momentum Oscillator (CMO)

```py
cmo(candles, period=14, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   period: int - default=14
-   sequential: bool - default=False

**Return Type**: float

## dmi

Directional Movement Index (DMI)

```py
dmi(candles, period=14, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   period: int - default=14
-   sequential: bool - default=False

**Return Type**: DMI(plus, minus)

## macd

Moving average convergence divergence (MACD)

```py
macd(candles, fastperiod=12, slowperiod=26, signalperiod=9, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   fast_period: int - default=12
-   slow_period: int - default=26
-   signal_period: int - default=9
-   sequential: bool - default=False

**Return Type**: MACD(macd, signal, hist)

## macdext

MACD with controllable MA type(MACDEXT)

```py
macdext(candles, fastperiod=fastperiod, fastmatype=fastmatype, slowperiod=slowperiod, slowmatype=slowmatype, signalperiod=signalperiod, signalmatype=signalmatype, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   fast_period: int - default=12
-   fastmatype: int - default=0 (see [matype](#matype))
-   slow_period: int - default=26
-   slowmatype: int - default=0 (see [matype](#matype))
-   signal_period: int - default=9
-   signalmatype: int - default=0 (see [matype](#matype))
-   sequential: bool - default=False

**Return Type**: MACDEXT(macd, signal, hist)

## mfi

Money Flow Index (MFI)

```py
mfi(candles, period=14, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   period: int - default=14
-   sequential: bool - default=False

**Return Type**: float

## mom

Momentum (MOM)

```py
mom(candles, period=10, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   period: int - default=10
-   sequential: bool - default=False

**Return Type**: float

## ppo

Percentage Price Oscillator (PPO)

```py
ppo(candles, fastperiod=12, slowperiod=26, matype=0, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   fastperiod: int - default: 12
-   slowperiod: int - default: 26
-   matype: int - default: 0 (see [matype](#matype))
-   sequential: bool - default=False

**Return Type**: float

## roc

Rate of change (ROC): `((price/prevPrice)-1)*100`

```py
roc(candles, period=10, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   period: int - default=10
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
stoch(candles, fastk_period=14, slowk_period=3, slowk_matype=0, slowd_period=3, slowd_matype=0, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   fastk_period: int - default: 14
-   slowk_period: int - default: 3
-   slowk_matype: int - default: 0 (see [matype](#matype))
-   slowd_period: int - default: 3
-   slowd_matype: int - default: 0 (see [matype](#matype))
-   sequential: bool - default=False

**Return Type**: Stochastic(k, d)

`k` and `d` are the variable names in TradingView. `k` is the fast moving average of the RSI, and `d` is the slow moving average.

## stochf

The Stochastic Oscillator Fast

```py
stochf(candles, fastk_period=5, fastd_period=3, fastd_matype=0, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   fastk_period: int - default: 5
-   fastd_period: int - default: 3
-   fastd_matype: int - default: 0 (see [matype](#matype))
-   sequential: bool - default=False

**Return Type**: StochasticFast(k, d)

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

## ultosc

Ultimate Oscillator (ULTOSC)

```py
ultosc(candles, timeperiod1=7, timeperiod2=14, timeperiod3=28, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   timeperiod1: int - default=7
-   timeperiod2: int - default=14
-   timeperiod3: int - default=28
-   sequential: bool - default=False

**Return Type**: float

## willr

Williams' %R (WILLR)

```py
willr(candles, period=14, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   period: int - default: 14
-   sequential: bool - default=False

**Return Type**: float

## adosc

Chaikin A/D Oscillator (ADOSC)

```py
adosc(candles, fastperiod=3, slowperiod=10, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   fastperiod: int - default: 3
-   slowperiod: int - default: 10
-   sequential: bool - default=False

**Return Type**: float

## obv

On Balance Volume (OBV)

```py
obv(candles, sequential=False)
```

**Properties**:

-   candles: np.ndarray
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

## natr

Normalized Average True Range (NATR)

```py
natr(candles, period=14, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   period: int - default: 14
-   sequential: bool - default=False

**Return Type**: float

## trange

True Range (TRANGE)

```py
trange(candles, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   sequential: bool - default=False

**Return Type**: float

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

## fisher

The Fisher Transform helps identify price reversals.

```py
fisher(candles, period=9, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   period: int - default=9

**Return Type**: FisherTransform(fisher, signal)

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

## donchian

Donchian Channels

```py
donchian(candles, period=20, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   period: int - default: 20
-   sequential: bool - default=False

**Return Type**: DonchianChannel(upperband, middleband, lowerband)

## emd

Empirical Mode Decomposition by John F. Ehlers and Ric Way

```py
emd(candles, period=20, delta=0.5, fraction=0.1, sequential=False)
```
> :warning: **Custom indicator**: Contains loops and may be slowing down the backtest!

**Properties**:

-   candles: np.ndarray
-   period: int - default: 20
-   delta: float - default: 0.5
-   fraction: float - default: 0.1
-   sequential: bool - default=False

**Return Type**: EMD(mean, up, low)

## lrsi

RSI Laguerre Filter was originally developed and described by John Ehlers in his paper `Time Warp – Without Space Travel`.

```py
lrsi(candles, alpha=0.2, sequential=False)
```
> :warning: **Custom indicator**: Contains loops and may be slowing down the backtest!

**Properties**:

-   candles: np.ndarray
-   alpha: float - default: 0.2
-   sequential: bool - default=False

**Return Type**: float

## tsi

True strength index (TSI)

```py
tsi(candles, long_period=25, short_period=13, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   long_period: int - default: 25
-   short_period: int - default: 13
-   sequential: bool - default=False

**Return Type**: float

## zlema

Zero-Lag Exponential Moving Average

```py
zlema(candles, period=20, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   period: int - default: 20
-   sequential: bool - default=False

**Return Type**: float

## hma

Hull Moving Average

```py
hma(candles: np.ndarray, period=5, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   period: int - default: 5
-   sequential: bool - default=False

**Return Type**: float

## supertrend

SuperTrend indicator

```py
supertrend(candles, period=10, factor=3, sequential=False)
```
> :warning: **Custom indicator**: Contains loops and may be slowing down the backtest!

**Properties**:

-   candles: np.ndarray
-   period: int - default: 10
-   factor: float - default: 3
-   sequential: bool - default=False

**Return Type**: SuperTrend(trend, changed)


## frama

Fractal Adaptive Moving Average (FRAMA)
!!! FRAMA is not the same as FAMA


```py
frama(candles, window=10, FC=1,  SC=300, sequential=False)
```
> :warning: **Custom indicator**: Contains loops and may be slowing down the backtest!

**Properties**:

-   candles: np.ndarray
-   window: int - default: 10
-   FC: float - default: 1
-   SC: float - default: 300
-   sequential: bool - default=False

**Return Type**: float

## ao

Awesome Oscillator

```py
ao(candles, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   sequential: bool - default=False

**Return Type**: AO(osc, change)

change is the difference to the last oscillator value.

## alligator

Alligator

```py
alligator(candles, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   sequential: bool - default=False

**Return Type**: AG(jaw, teeth, lips)

## smma

SMMA - Smoothed Moving Average

```py
smma(candles, period=5, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   period: int - default: 5
-   sequential: bool - default=False

**Return Type**: float

## pivot

Pivot Points

```py
pivot(candles, mode=0, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   mode: int - default = 0
-   sequential: bool - default=False

> mode 0 = Standard Pivot Points | not calculated: s3, s4, r3, r4

> mode 1 = Fibonacci Pivot Points | not calculated: s4, r4

> mode 2 = Demark Pivot Points | not calculated: s2, s3, s4, r2, r3, r4

> mode 3 = Camarilla Pivot Points

> mode 4 = Woodie's Pivot Points

The not calculated points will return "nan".

**Return Type**: PIVOT(r4, r3, r2, r1, pp, s1, s2, s3, s4)


## zscore

zScore

```py
zscore(candles, period=14, matype=0, nbdev=1, sequential=False)
```

**Properties**:

-   candles: np.ndarray
-   period: int - default: 14
-   matype: int - default: 0
-   nbdev: float - default: 1
-   sequential: bool - default=False

**Return Type**: float
