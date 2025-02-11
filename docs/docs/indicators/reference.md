---
{}
---
# Indicators Reference

Most indicators have a `sequential=False` parameter. When set to `True`, it returns an array of values; which is helpful
if you're doing research in [Jupyter Notebooks](/docs/research/jupyter "Jupyter Notebooks").

When developing strategies however, you probably want to keep it as `False` to return only the indicator value for
current trading candle.

::: tip @cached
The @cached decorator can increase performance a lot if applied to indicators - especially those called
a lot in your strategy. [See here](https://docs.jesse.trade/docs/strategies/api.html#cached "See here").
:::

::: tip Performance and sequential
With `sequential=False` the indicators will slice the candle array behind the scene
to the warmup\_candles\_num you defined. That doesn't happen if you use `sequential=True`, as Jesse doesn't know how much
lookback you need from your sequential indicator. To keep things fast you should slice the candles yourself before
passing them to a indicator function to avoid unnecessary computation time: `self.candles[-60:]` - change the number
accordingly.
:::

::: tip matype
In few indicators you can set a moving average type. Your choices are:

- `0`: sma (simple)
- `1`: ema (exponential)
- `2`: wma (weighted)
- `3`: dema (double exponential)
- `4`: tema (triple exponential)
- `5`: trima (triangular)
- `6`: kama (Kaufman adaptive)
- `7`: mama (Mesa adaptive)
- `8`: T3 (triple exponential T3)
- `9`: fwma (Fibonacci's Weighted Moving Average)
- `10`: hma (Hull Moving Average)
- `11`: linearreg (Linear Regression)
- `12`: wilders (Wilders Smoothing)
- `13`: sinwma (Sine Weighted Moving Average)
- `14`: supersmoother (Super Smoother Filter 2pole Butterworth)
- `15`: supersmoother\_3\_pole(Super Smoother Filter 3pole Butterworth)
- `16`: gauss (Gaussian Filter)
- `17`: high\_pass (1-pole High Pass Filter by John F. Ehlers)
- `18`: high\_pass\_2\_pole (2-pole High Pass Filter by John F. Ehlers)
- `19`: ht\_trendline (Hilbert Transform - Instantaneous Trendline)
- `20`: jma (Jurik Moving Average)
- `21`: reflex (Reflex indicator by John F. Ehlers)
- `22`: trendflex (Trendflex indicator by John F. Ehlers)
- `23`: smma (Smoothed Moving Average)
- `24`: vwma (Volume Weighted Moving Average)
- `25`: pwma (Pascals Weighted Moving Average)
- `26`: swma (Symmetric Weighted Moving Average)
- `27`: alma (Arnaud Legoux Moving Average)
- `28`: hwma (Holt-Winter Moving Average)
- `29`: vwap (Volume weighted average price)
- `30`: nma (Natural Moving Average)
- `31`: edcf (Ehlers Distance Coefficient Filter)
- `32`: mwdx (MWDX Average)
- `33`: maaq (Moving Average Adaptive Q)
- `34`: srwma (Square Root Weighted Moving Average)
- `35`: sqwma (Square Weighted Moving Average)
- `36`: vpwma (Variable Power Weighted Moving Average)
- `37`: cwma (Cubed Weighted Moving Average)
- `38`: jsa (Jsa Moving Average)
- `39`: epma (End Point Moving Average)
:::

::: tip devtype
In few indicators you can set a deviation type. Your choices are:

- `0`: standard deviation
- `1`: mean absolute deviation
- `2`: median absolute deviation
:::

::: tip source\_type
In some indicators you can set the source type. Your choices are:

- `"close"`
- `"high"`
- `"low"`
- `"open"`
- `"volume"`
- `"hl2"`
- `"hlc3"`
- `"ohlc4"`
:::

## acosc

```python
acosc(candles: np.ndarray, sequential=False) -> AC
```

The **Acceleration/Deceleration Oscillator (AC)** is a technical indicator that measures the acceleration or deceleration of a security's price momentum by subtracting a 5-period simple moving average from a 34-period simple moving average of its price, providing signals for potential changes in trend direction.

**Arguments**:

- `candles`: np.ndarray
- `sequential`: bool - default=False

**Returns**:

AC(osc, change)

## ad

```python
ad(candles: np.ndarray, sequential=False) -> Union[float, np.ndarray]
```

The **Chaikin A/D Line** is an accumulation/distribution indicator that calculates the sum of money flows based on price movements and volume to identify trends and potential reversals in the price action of a stock.

**Arguments**:

- `candles`: np.ndarray
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## adosc

```python
adosc(candles: np.ndarray, fast_period=3, slow_period=10, sequential=False) -> Union[float, np.ndarray]
```

The **Chaikin A/D Oscillator** is a momentum oscillator derived from the Chaikin Accumulation/Distribution Line, indicating the momentum of accumulation or distribution within a security by measuring the difference between its short-term and long-term accumulation/distribution values.

\#momentum

**Arguments**:

- `candles`: np.ndarray
- `fast_period`: int - default=3
- `slow_period`: int - default=10
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## adx

```python
adx(candles: np.ndarray, period=14, sequential=False) -> Union[float, np.ndarray]
```

The **Average Directional Movement Index (ADX)** is a technical indicator used to quantify the strength of a trend in a security, irrespective of its direction, by measuring the magnitude of price movements over a specified time period.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=14
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## adxr

```python
adxr(candles: np.ndarray, period=14, sequential=False) -> Union[float, np.ndarray]
```

The **Average Directional Movement Index Rating (ADXR)** is a variation of the ADX indicator that calculates the average of the current ADX value and a previous ADX value to provide a smoothed indication of the trend strength over time.

**Author:** KivancOzbilgic

**Credits:** [https://www.tradingview.com/script/9f5zDi3r/](https://www.tradingview.com/script/9f5zDi3r/)

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=14
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## alligator

```python
alligator(candles: np.ndarray, source_type="close", sequential=False) -> AG
```

The **Alligator** is a technical analysis tool composed of three smoothed moving averages with different periods, representing the balance between trend-following and range-bound market conditions, helping traders identify potential trends and trade signals.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

AG(jaw, teeth, lips)

## alma

```python
alma(candles: np.ndarray, period: int = 9, sigma: float = 6.0, distribution_offset: float = 0.85, source_type: str = "close", sequential: bool = False) -> Union[float, np.ndarray]
```

The **Arnaud Legoux Moving Average (ALMA)** is a unique moving average that adjusts its sensitivity based on market volatility, aiming to reduce lag and provide smoother trend signals by incorporating a variable smoothing factor calculated from the Gaussian distribution.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=9
- `sigma`: float - default=6.0
- `distribution_offset`: float - default=0.85
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## ao

```python
ao(candles: np.ndarray, sequential=False) -> AO
```

The **Awesome Oscillator** is a momentum indicator that measures the difference between the 34-period and 5-period simple moving averages of a security's price, indicating the momentum of the market based on the interaction between these moving averages.

\#momentum

**Arguments**:

- `candles`: np.ndarray
- `sequential`: bool - default=False

**Returns**:

AO(osc, change)

## apo

```python
apo(candles: np.ndarray, fast_period=12, slow_period=26, matype=0, source_type="close", sequential=False) -> Union[
  float, np.ndarray]
```

The **Absolute Price Oscillator (APO)** is a technical indicator that measures the difference between two moving averages of the price of a security, providing insights into the direction and strength of the trend by analyzing changes in the absolute price values.

\#momentum

**Arguments**:

- `candles`: np.ndarray
- `fast_period`: int - default=12
- `slow_period`: int - default=26
- `matype`: int - default=0
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## aroon

```python
aroon(candles: np.ndarray, period=14, sequential=False) -> AROON
```

The **Aroon** **indicator** is a technical analysis tool used to identify trends and trend reversals by calculating the time elapsed since the highest and lowest prices within a specified period, indicating the strength and direction of the trend.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=14
- `sequential`: bool - default=False

**Returns**:

AROON(down, up)

## aroonosc

```python
aroonosc(candles: np.ndarray, period=14, sequential=False) -> Union[float, np.ndarray]
```

The **Aroon Oscillator** is a technical indicator derived from the Aroon indicator, representing the difference between the Aroon Up and Aroon Down lines, providing insights into the strength of a trend and potential trend reversals.

\#momentum

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=14
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## atr

```python
atr(candles: np.ndarray, period=14, sequential=False) -> Union[float, np.ndarray]
```

The **Average True Range (ATR)** is a technical indicator that measures the volatility of a security by calculating the average of the true ranges over a specified period, providing insight into the magnitude of price movements and potential trend changes.

\#volatility

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=14
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## avgprice

```python
avgprice(candles: np.ndarray, sequential=False) -> Union[float, np.ndarray]
```

The **Average Price** is a simple calculation of the average price of a security over a specified period, typically used to smooth out price fluctuations and provide a reference point for assessing the current price level.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## beta

```python
beta(candles: np.ndarray, benchmark_candles: np.ndarray, period: int = 5, sequential: bool = False) -> Union[float, np.ndarray]
```

**Beta** is a measure of volatility in relation to the market, calculated by comparing its price movements to those of a benchmark index, such as BTC, providing insight into the coins's risk relative to the overall market.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `benchmark_candles`: np.ndarray
- `period`: int - default=5
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## bandpass

```python
bandpass(candles: np.ndarray, period: int = 20, bandwidth: float = 0.3, source_type: str = "close", sequential: bool = False) -> BandPass
```

The **Bandpass** function isolates specific frequency ranges within price data by applying a bandpass filter. It calculates signals useful for technical analysis and trading strategies by normalizing the filtered data and comparing it to a trigger signal.

\#filter

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=20
- `bandwidth`: float - default=0.3
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

BandPass(bp, bp\_normalized, signal, trigger)

## bollinger\_bands

```python
bollinger_bands(candles: np.ndarray, period=20, devup=2, devdn=2, matype=0, devtype=0, source_type="close", sequential=False) -> BollingerBands
```

**Bollinger Bands** are a technical analysis tool consisting of a middle band being a simple moving average (SMA) and upper and lower bands representing a specified number of standard deviations from the SMA, used to measure volatility and identify potential overbought or oversold conditions in a security's price.

\#volatility

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=20
- `devup`: float - default=2
- `devdn`: float - default=2
- `matype`: int - default=0
- `devtype`: int - default=0
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

BollingerBands(upperband, middleband, lowerband)

::: tip devtype
The `devtype` argument determines the type of deviation to use. If `devtype` is 0, standard deviation is used. If `devtype` is 1, mean absolute deviation is used. If `devtype` is 2, median absolute deviation is used.
:::

## bollinger\_bands\_width

```python
bollinger_bands_width(candles: np.ndarray, period=20, mult=2, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

**Bollinger Bands Bandwidth** is a technical indicator derived from Bollinger Bands, representing the width of the bands relative to the moving average, providing insights into the volatility of a security and potential trading opportunities based on changes in volatility levels.

\#volatility

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=20
- `mult`: float - default=2
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## bop

```python
bop(candles: np.ndarray, sequential=False) -> Union[float, np.ndarray]
```

BOP, or **Balance of Power**, measures the strength of buyers versus sellers in the market based on the relationship between the close price and the trading range over a specified period, helping identify potential shifts in market sentiment and trend reversals.

**Arguments**:

- `candles`: np.ndarray
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## cc

```python
cc(candles: np.ndarray, wma_period=10, roc_short_period=11, roc_long_period=14, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

The **Coppock Curve** is a momentum indicator used in technical analysis to identify long-term buying opportunities in the stock market by calculating the summation of two weighted moving averages of the rate of change for two different time periods.

\#momentum

**Arguments**:

- `candles`: np.ndarray
- `wma_period`: int - default=10
- `roc_short_period`: int - default=11
- `roc_long_period`: int - default=14
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## cci

```python
cci(candles: np.ndarray, period=14, sequential=False) -> Union[float, np.ndarray]
```

CCI, or **Commodity Channel Index**, is a versatile technical indicator used to identify overbought and oversold conditions in a security by measuring its deviation from its statistical mean over a specified period, aiding traders in identifying potential trend reversals and market extremes.

\#momentum

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=14
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## cfo

```python
cfo(candles: np.ndarray, period: int = 14, scalar: float = 100, source_type: str = "close", squential: bool = False) -> Union[float, np.ndarray]:
```

The **Chande Forecast Oscillator** predicts future price movements by comparing the closing price of a security to its highest high and lowest low over a specified period, aiding traders in identifying potential trend reversals and momentum shifts.

\#momentum

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=14
- `scalar`: float- default=100
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## cg

```python
cg(candles: np.ndarray, period: int = 10, source_type: str = "close", sequential: bool = False) -> Union[float, np.ndarray]
```

The **Center of Gravity (CG)** indicator identifies potential reversal points by calculating the average price level over a specified period, providing traders with insights into the equilibrium or balance point of a security's price movements.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=10
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## cksp

```python
cksp(candles: np.ndarray, p: int = 10, x: float = 1.0, q: int = 9, sequential: bool = False) -> CKSP
```

The **Chande Kroll Stop (CKSP)** is a trailing stop-loss indicator that dynamically adjusts based on market volatility, aiming to protect profits by placing stops at a distance from the current price proportional to recent price fluctuations.

\#exit

**Arguments**:

- `candles`: np.ndarray
- `p`: int - default=10
- `x`: float - default=1.0
- `q`: int - default=9
- `sequential`: bool - default=False

**Returns**:

CKSP(long, short)

## chande

```python
chande(candles: np.ndarray, period=22, mult=3.0, direction="long", sequential=False) -> Union[float, np.ndarray]
```

**Chandelier Exits** is a volatility-based trailing stop-loss indicator that dynamically adjusts its level based on recent high or low prices, providing a method for traders to protect profits and manage risk by trailing stops behind price movements.

\#exit

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=22
- `mult`: float - default=3.0
- `direction`: str - default="long" | "short"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## chop

```python
chop(candles: np.ndarray, period: int = 14, scalar: float = 100, drift: int = 1, sequential: bool = False) -> Union[float, np.ndarray]
```

The **Choppiness Index (CHOP)** is a technical indicator designed to measure the market's trendiness or choppiness by calculating the ratio of the current range to the maximum range over a specified period, helping traders identify periods of consolidation or trend development.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=14
- `scalar`: float- default=100
- `drift`: int - default=1
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## cmo

```python
cmo(candles: np.ndarray, period=14, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

The **Chande Momentum Oscillator** measures the momentum of a security by calculating the difference between the sum of recent gains and losses over a specified period, providing insights into overbought and oversold conditions and potential trend reversals.

\#momentum

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=14
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## correlation\_cycle

```python
correlation_cycle(candles: np.ndarray, period=20, threshold=9, source_type="close", sequential=False) -> CC
```

John Ehlers' **Correlation Cycle, Correlation Angle, and Market State** are components of a market analysis framework aimed at identifying cyclical patterns and trend directions in financial markets. The Correlation Cycle measures the cyclic behavior of market data, the Correlation Angle quantifies the phase angle of market cycles, and the Market State evaluates the current state of the market, aiding traders in making informed decisions based on cyclical and trend characteristics.

\#momentum

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=20
- `threshold`: int - default=9
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

CC(real, imag, angle, state)

## correl

```python
correl(candles: np.ndarray, period=5, sequential=False) -> Union[float, np.ndarray]
```

This function calculates the **Pearson's Correlation Coefficient** between the high and the low of each candle over the specified period. A value close to 1 indicates the values tend to move in the same direction, while a value close to -1 indicates they tend to move in opposite directions. A value near 0 suggests little correlation.

# trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=5
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## cvi

```python
cvi(candles: np.ndarray, period=5, sequential=False) -> Union[float, np.ndarray]
```

The **Chaikin's Volatility Indicator** measures the volatility of a security by calculating the difference between the high and low prices over a specified period, helping traders identify periods of increased or decreased price movement volatility.

\#volatility

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=5
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## cwma

```python
cwma(candles: np.ndarray, period: int = 14, source_type: str = "close", sequential: bool = False) -> Union[float, np.ndarray]
```

The **Cubed Weighted Moving Average** is a variant of the Weighted Moving Average that assigns higher weights to recent data points cubically, resulting in more emphasis on recent price action and less on older data, providing traders with a smoother trend indicator that responds quickly to price changes.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=14
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## damiani\_volatmeter

```python
damiani_volatmeter(candles: np.ndarray, vis_atr=13, vis_std=20, sed_atr=40, sed_std=100, threshold=1.4, source_type="close", sequential=False) -> DamianiVolatmeter
```

The **Damiani Volatmeter** is a technical indicator used to gauge market volatility by comparing the difference between the high and low prices with a reference level over a specified period, providing insights into potential changes in market volatility and helping traders adjust their strategies accordingly.

**Author:** RicardoSantos

**Credits:** [https://www.tradingview.com/v/rYWBBk3a/](https://www.tradingview.com/v/rYWBBk3a/)

\#volatility

**Arguments**:

- `candles`: np.ndarray
- `vis_atr`: int - default=13
- `vis_std`: int - default=20
- `sed_atr`: int - default=40
- `sed_std`: int - default=100
- `threshold`: float - default=1.4
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

DamianiVolatmeter(vol, anti)

## decycler

```python
decycler(candles: np.ndarray, hp_period=125, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

The **Ehlers Simple Decycler** is a technical indicator developed by John Ehlers that aims to filter out high-frequency noise from price data while preserving the underlying trend. It achieves this by applying a low-pass filter to the price series, emphasizing longer-term price movements and reducing short-term fluctuations.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `hp_period`: int - default=125
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## dec\_osc

```python
dec_osc(candles: np.ndarray, hp_period=125, k=1, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

The **Ehlers Decycler Oscillator** seeks to filter out short-term price fluctuations and highlight longer-term trends in the market. It accomplishes this by applying a high-pass filter to the price data, effectively removing high-frequency noise and emphasizing the underlying cyclical components of the price series.

\#momentum

**Arguments**:

- `candles`: np.ndarray
- `hp_period`: int - default=125
- `k`: float - default=1
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## dema

```python
dema(candles: np.ndarray, period=30, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

The **Double Exponential Moving Average (DEMA)** is a type of moving average that applies two exponential smoothing techniques to the price data, resulting in a smoother and more responsive indicator compared to traditional moving averages. It aims to reduce lag and provide quicker signals by placing more weight on recent price data while still maintaining a stable average.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=30
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## devstop

```python
devstop(candles: np.ndarray, period:int=20, mult: float = 0, devtype: int = 0, direction: str = "long", sequential: bool = False) -> Union[float, np.ndarray]
```

**Kase Dev Stop** is an adaptive stop-loss indicator that adjusts dynamically based on market volatility and price behavior.

\#exit

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=20
- `mult`: float - default=0
- `devtype`: int - default=0
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## di

```python
di(candles: np.ndarray, period=14, sequential=False) -> DI
```

The **Directional Indicator** is a technical analysis tool that measures the strength and direction of a trend in a financial market. It consists of two components: The positive Directional Indicator (+DI) and the negative Directional Indicator (-DI) - quantifying the strength of the price movements.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=14
- `sequential`: bool - default=False

**Returns**:

DI(plus, minus)

## dm

```python
dm(candles: np.ndarray, period=14, sequential=False) -> DM
```

**Directional Movement** is a concept in technical analysis that quantifies the strength and direction of price movements in a financial market. It's often used in conjunction with the Directional Indicator (DI) to assess the strength of trends. Directional Movement is typically calculated using the True Range (TR) and measures the magnitude of price movements without considering direction. By comparing upward and downward price movements, traders can determine the prevailing direction and strength of a trend.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=14
- `sequential`: bool - default=False

**Returns**:

DM(plus, minus)

## donchian

```python
donchian(candles: np.ndarray, period=20, sequential=False) -> DonchianChannel
```

**Donchian Channels** are used to identify potential breakout and breakdown levels, as well as to gauge the overall volatility of a market. Traders often use these channels to establish entry and exit points for their trades, with breakouts above the upper channel signaling potential buy opportunities and breakdowns below the lower channel indicating potential sell opportunities.

\#volatility

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=20
- `sequential`: bool - default=False

**Returns**:

DonchianChannel(upperband, middleband, lowerband)

## dpo

```python
dpo(candles: np.ndarray, period=5, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

The **Detrended Price Oscillator (DPO)** is a momentum oscillator that helps traders identify short-term cycles or overbought/oversold conditions in a financial asset. It accomplishes this by comparing the current price to a historical average, typically the simple moving average (SMA) of the price over a specified lookback period. By detrending the price data, the DPO filters out longer-term trends, focusing on shorter-term price movements. This allows traders to identify potential reversals or shifts in market sentiment.

\#momentum

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=5
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## dti

```python
dti(candles: np.ndarray, r=14, s=10, u=5, sequential=False) -> Union[float, np.ndarray]
```

The **Directional Trend Index (DTI)** by William Blau is a technical indicator that combines elements of ADX and DMI to gauge both trend strength and direction in the market.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `r`: int - default=14
- `s`: int - default=10
- `u`: int - default=5
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## dx

```python
dx(candles: np.ndarray, di_length=14, adx_smoothing=14,sequential=False) -> Union[float, np.ndarray]
```

The **Directional Movement Index (DMI)** is a technical indicator that assesses the strength and direction of a trend in a financial asset.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `di_length`: int - default=14
- `adx_smoothing`: int - default=14
- `sequential`: bool - default=False

**Returns**:

DX(adx, plusDI, minusDI)

## edcf

```python
edcf(candles: np.ndarray, period: int = 15, source_type: str = "hl2", sequential: bool = False) -> Union[float, np.ndarray]
```

The **Ehlers Distance Coefficient Filter** filters out high-frequency noise from price data while preserving the underlying trend. It calculates the distance between current price and a weighted moving average, adjusting the weighting factor based on market conditions to provide a smoother and more accurate representation of price trends.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=15
- `source_type`: str - default="hl2"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## efi

```python
efi(candles: np.ndarray, period=13, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

**Elder's Force Index** is a technical indicator developed by Dr. Alexander Elder that combines price movement and volume to measure the strength of bulls or bears in the market. It is calculated by multiplying the price change by the volume, providing insights into the underlying force driving the current trend.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=13
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## ema

```python
ema(candles: np.ndarray, period=5, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

EMA stands for **Exponential Moving Average**, which is a type of moving average that places more weight on recent data points, making it more responsive to recent price changes compared to a simple moving average (SMA).

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=5
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## emd

```python
emd(candles: np.ndarray, period=20, delta=0.5, fraction=0.1, sequential=False) -> EMD
```

**Empirical Mode Decomposition (EMD)**, by John F. Ehlers and Ric Way, decomposes time series signals into intrinsic mode functions (IMFs) and a residual component, revealing underlying cyclical patterns in the data.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=20
- `delta`: float - default=0.5
- `fraction`: float - default=0.1
- `sequential`: bool - default=False

**Returns**:

EMD(upperband, middleband, lowerband)

## emv

```python
emv(candles: np.ndarray, length=14, div=10000, sequential=False) -> Union[float, np.ndarray]
```

EMV, or **Ease of Movement**, is a technical indicator designed to assess the relationship between price and volume in the market. It quantifies the ease with which prices move by dividing the change in price by the volume, helping traders identify potential trend reversals or continuation patterns based on divergence between price and volume movements.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `length`: int - default=14
- `div`: int - default=10000
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## epma

```python
epma(candles: np.ndarray, period: int = 11, offset: int = 4, source_type: str = "close", sequential: bool = False) -> Union[float, np.ndarray]
```

The **End Point Moving Average (EPMA)** is a type of moving average that calculates the average of the most recent data points, emphasizing the endpoint of the data series. It aims to provide a smoother representation of recent price trends while minimizing lag compared to traditional moving averages.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=11
- `offset`: int - default=4
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## er

```python
er(candles: np.ndarray, period: int = 5, source_type: str = "close", sequential: bool = False) -> Union[float, np.ndarray]:
```

The **Efficiency Ratio (ER)**, or Kaufman Efficiency Indicator, quantifies the efficiency of price movements by comparing net price change to total price movement over a specified period, normalized to a scale from 0 to 1.

\#momentum

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=5
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## eri

```python
eri(candles: np.ndarray, period: int = 13, matype: int = 1, source_type: str = "close", sequential: bool = False) -> ERI
```

The **Elder Ray Index** helps traders assess the balance of power between bulls and bears and identify potential trend reversals or continuations based on the divergence between price and the EMA.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=13
- `matype`: int - default=1
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

ERI(bull, bear)

## fisher

```python
fisher(candles: np.ndarray, period=9, sequential=False) -> FisherTransform
```

The **Fisher Transform** is a technical indicator developed by John Ehlers that transforms prices into a Gaussian distribution to make trends and turning points easier to identify. It converts price data into values that oscillate between -1 and 1, making it particularly useful for detecting trend reversals.

\#momentum

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=9
- `sequential`: bool - default=False

**Returns**:

FisherTransform(fisher, signal)

## fosc

```python
fosc(candles: np.ndarray, period=5, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

The **Forecast Oscillator (FOSC)** is a technical indicator that measures the difference between the current price and a forecasted price based on a linear regression over a specified period. It helps traders identify potential overbought or oversold conditions and assess the strength of a trend by comparing the actual price to the expected price.

\#momentum

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=5
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## frama

```python
frama(candles: np.ndarray, window=10, FC=1, SC=300, sequential=False) -> Union[float, np.ndarray]
```

The **Fractal Adaptive Moving Average (FRAMA)** is a type of moving average that adjusts its sensitivity to market volatility. It dynamically changes the length of the moving average based on recent price volatility, aiming to provide smoother and more accurate trend signals compared to traditional moving averages.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `window`: int - default=10
- `FC`: int - default=1
- `SC`: int - default=300
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## fwma

```python
fwma(candles: np.ndarray, period: int = 5, source_type: str = "close",sequential: bool = False) -> Union[float, np.ndarray]
```

**Fibonacci's Weighted Moving Average (FWMA)** is a type of moving average that assigns weights to each data point based on Fibonacci ratios, typically 0.618 and 0.382. This weighting scheme aims to give more importance to recent data while still considering historical prices, providing a smoother trend indicator compared to simple moving averages.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=5
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## gatorosc

```python
gatorosc(candles: np.ndarray, source_type="close", sequential=False) -> GATOR
```

The **Gator Oscillator**, developed by Bill M. Williams, is a technical indicator used to identify the presence of trends and their relative strength in the market. It consists of two histograms, one representing the difference between the Alligator's jaw and teeth (blue) and the other representing the difference between the teeth and lips (red). The convergence and divergence of these histograms provide signals for potential changes in trend direction and momentum.

\#momentum

**Arguments**:

- `candles`: np.ndarray
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

GATOR(upper, lower, upper\_change, lower\_change)

## gauss

```python
gauss(candles: np.ndarray, period=14, poles=4, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

The **Gaussian Filter** is a data filtering technique used to smooth out noise and extract underlying trends or patterns from a signal. It applies a Gaussian distribution or bell-shaped curve to weight data points, giving more emphasis to points closer to the center and less weight to those farther away. This helps in reducing noise while preserving the integrity of the signal.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=14
- `poles`: int - default=4
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## heikin\_ashi\_candles

```python
heikin_ashi_candles(candles: np.ndarray, sequential=False) -> HA
```

**Heikin Ashi candlesticks** are a type of Japanese candlestick charting technique that uses modified candlesticks to filter out market noise and emphasize trends. Each Heikin Ashi candlestick is calculated based on the average prices of the current and previous periods, resulting in smoother candlestick patterns compared to traditional candlesticks. They help traders identify trends more easily and make informed decisions based on trend direction and momentum.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `sequential`: bool - default=False

**Returns**:

HA(open, close, high, low)

## high\_pass

```python
high_pass(candles: np.ndarray, period=48, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

The **1-pole High Pass Filter**, by John F. Ehlers, is a digital filter designed to reduce low-frequency noise while retaining high-frequency components in a signal.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=48
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## high\_pass\_2\_pole

```python
high_pass_2_pole(candles: np.ndarray, period=48, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

The **2-pole High Pass Filter**, developed by John F. Ehlers, is a digital filter that attenuates low-frequency components while preserving high-frequency components in a signal. It achieves this by utilizing two poles in its transfer function, offering improved noise reduction compared to a single-pole filter.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=48
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## hma

```python
hma(candles: np.ndarray, period=5, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

The **Hull Moving Average (HMA)** is a type of moving average developed by Alan Hull that aims to reduce lag while maintaining smoothness. It achieves this by using a weighted average of three different exponential moving averages (EMAs) with different periods. The resulting moving average is more responsive to recent price movements compared to traditional moving averages, making it useful for identifying trends and potential entry or exit points.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=5
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray


## hurst\_exponent

```python
hurst_exponent(candles: np.ndarray, min_chunksize: int = 8, max_chunksize: int = 200, num_chunksize: int = 5, method: int = 1, source_type: str = "close") -> float
```

The **Hurst Exponent** is a statistical measure used to quantify the long-term memory of a time series data. It indicates the degree of self-similarity or fractal nature of the data, helping to identify whether the data is trending, mean-reverting, or displaying random behavior.
In simpler terms, the function helps quantify how likely trends in the data will continue. A Hurst exponent close to 0.5 indicates random fluctuations, while values closer to 1 suggest persistent trends. The function offers different methods for this estimation and allows you to choose the most suitable one for your data.

\#trend

::: tip methods

- RS (only available with numba): Estimates the Hurst (H) exponent using the R/S method from the time series. The R/S method consists of dividing the series into pieces of equal size `series_len` and calculating the rescaled range. This repeats the process for several `series_len` values and adjusts data regression to obtain the H. `series_len` will take values between `min_chunksize` and `max_chunksize`, the step size from `min_chunksize` to `max_chunksize` can be controlled through the parameter `step_chunksize`.
- DMA: Estimates the Hurst (H) exponent using the DMA method from the time series. The DMA method consists on calculate the moving average of size `series_len` and subtract it to the original series and calculating the standard deviation of that result. This repeats the process for several `series_len`values and adjusts data regression to obtain the H. `series_len` will take values between `min_chunksize` and `max_chunksize`, the step size from`min_chunksize` to `max_chunksize` can be controlled through the parameter`step_chunksize`.
- DSOD: The estimation is based on the discrete second order derivative. Consists on get two different noise of the original series and calculate the standard deviation and calculate the slope of two point with that values.
:::

**Arguments**:

- `candles`: np.ndarray
- `min_chunksize`: int - default=8
- `max_chunksize`: int - default=200
- `num_chunksize`: int - default=5
- `method`: int - default=1 - 0: RS | 1: DMA | 2: DSOD
- `source_type`: str - default="close"

**Returns**:

float

## hwma

```python
hwma(candles: np.ndarray, na: float = 0.2, nb: float = 0.1, nc: float = 0.1, source_type: str = "close", sequential: bool = False) -> Union[float, np.ndarray]
```

The **Holt-Winters Moving Average**, also known as the Triple Exponential Smoothing, is a method used for forecasting time series data. It extends the Exponential Moving Average (EMA) by incorporating seasonal components, making it suitable for capturing and predicting seasonal patterns in data.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `na`: float - default=0.2
- `nb`: float - default=0.1
- `nc`: float - default=0.1
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## ichimoku\_cloud

```python
ichimoku_cloud(candles: np.ndarray, conversion_line_period=9, base_line_period=26, lagging_line_period=52, displacement=26) -> IchimokuCloud
```

The **Ichimoku Cloud**, or Ichimoku Kinko Hyo, is a versatile technical analysis tool that provides insights into the trend direction, momentum, and potential support and resistance levels in the market. It consists of several components, including the Senkou Span A and Senkou Span B lines, the Kijun-sen and Tenkan-sen lines, and the Chikou Span.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `conversion_line_period`: int - default=9
- `base_line_period`: int - default=26
- `lagging_line_period`: int - default=52
- `displacement`: - default=26

**Returns**:

IchimokuCloud(conversion\_line, base\_line, span\_a, span\_b)

## ichimoku\_cloud\_seq

```python
ichimoku_cloud_seq(candles: np.ndarray, conversion_line_period=9, base_line_period=26, lagging_line_period=52,displacement=26, sequential=False) -> IchimokuCloud
```

The **Ichimoku Cloud Sequential** is a trading strategy that combines the Ichimoku Cloud indicator with specific rules for entering and exiting trades based on the sequence of signals generated by the Ichimoku components. It aims to capture trends and reversals in the market by providing clear guidelines for trade execution, often incorporating criteria such as the alignment of different Ichimoku lines and the positioning of price relative to the Cloud.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `conversion_line_period`: int - default=9
- `base_line_period`: int - default=26
- `lagging_line_period`: int - default=52
- `displacement`: - default=26

**Returns**:

IchimokuCloud(conversion\_line, base\_line, span\_a, span\_b, lagging\_line, future\_span\_a, future\_span\_b)

## ift\_rsi

```python
ift_rsi(candles: np.ndarray, rsi_period: int = 5, wma_period: int =9, source_type: str = "close", sequential: bool = False) -> Union[float, np.ndarray]
```

The **Modified Inverse Fisher Transform applied to the RSI** is a technical analysis technique that transforms the RSI values into a more normalized distribution using the Inverse Fisher Transform. This modification helps to improve the effectiveness of the RSI indicator by reducing noise and providing clearer signals for identifying overbought and oversold conditions in the market.

\#momentum

**Arguments**:

- `candles`: np.ndarray
- `rsi_period`: int - default=5
- `wma_period`: int - default=9
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## itrend

```python
itrend(candles: np.ndarray, alpha=0.07, source_type="hl2", sequential=False) -> ITREND
```

The **Instantaneous Trendline** is a dynamic indicator that swiftly captures the current trend direction, aiding in identifying trend reversals and entry or exit points in trading.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `alpha`: float - default=0.07
- `source_type`: str - default="hl2"
- `sequential`: bool - default=False

**Returns**:

ITREND(signal, it, trigger)

## jma

```python
jma(candles: np.ndarray, period:int=7, phase:float=50, power:int=2, source_type:str='close', sequential:bool=False) -> Union[float, np.ndarray]
```

The **Jurik Moving Average** is a type of moving average developed by Mark Jurik. It aims to reduce lag and improve responsiveness compared to traditional moving averages by applying advanced mathematical techniques for smoothing and filtering noise.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=7
- `phase`: float - default=50
- `power`: int - default=2
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## jsa

```python
jsa(candles: np.ndarray, period: int = 30, source_type: str = "close", sequential: bool = False) -> Union[float, np.ndarray]
```

The **Jsa Moving Average** computes the midpoint of a given price series by averaging each element with the element shifted forward by a specified period.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=30
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## kama

```python
kama(candles: np.ndarray, period=30, fast_length=2, slow_length=30, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

The **Kaufman Adaptive Moving Average (KAMA)** is a type of moving average developed by Perry Kaufman. It dynamically adjusts its smoothing period based on market volatility, aiming to provide a more accurate representation of price trends while minimizing lag. KAMA increases its responsiveness during periods of high volatility and decreases it during periods of low volatility, making it particularly useful in adapting to changing market conditions.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=30
- `fast_length`: int - default=2
- `slow_length`: int - default=30
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## kaufmanstop

```python
kaufmanstop(candles: np.ndarray, period: int = 22, mult: float = 2, direction: str = "long", matype: int = 0,  sequential: bool = False) -> Union[ float, np.ndarray]
```

**Perry Kaufman's Stops** are dynamic exit strategy indicators that provide adaptive stop-loss levels that adjust based on market conditions, aiming to protect profits and limit losses effectively.

\#exit

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=22
- `mult`: float - default=2
- `direction`: str - default="long" | "short"
- `matype`: int - default=0
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## kdj

```python
kdj(candles: np.ndarray, fastk_period: int = 9, slowk_period: int = 3, slowk_matype: int = 0, slowd_period: int = 3, slowd_matype: int = 0, sequential: bool = False) -> KDJ
```

The **KDJ Oscillator** is derived from the Stochastic Oscillator. It consists of three lines: %K, %D, and the J line. The %K line compares the current closing price to the recent trading range, while the %D line is a moving average of %K. The J line represents the difference between %D and a smoothed %D. The KDJ Oscillator helps traders identify overbought and oversold conditions and potential trend reversals.

\#momentum

**Arguments**:

- `candles`: np.ndarray
- `fastk_period`: int - default=9
- `slowk_period`: int - default=3
- `slowk_matype`: int - default=0
- `slowd_period`: int - default=3
- `slowd_matype`: int - default=0
- `sequential`: bool - default=False

**Returns**:

KDJ(k, d, j)

## keltner

```python
keltner(candles: np.ndarray, period=20, multiplier=2, matype=1, source_type="close", sequential=False) -> KeltnerChannel
```

**Keltner Channels** are volatility-based technical indicators used to identify potential price breakouts and trend reversals in the market. They consist of three lines: the middle line, which is typically a moving average of the asset's price, and an upper and lower channel line, which are derived from the middle line by adding and subtracting a multiple of the Average True Range (ATR). Keltner Channels expand and contract based on market volatility, providing traders with a visual representation of price volatility and potential support and resistance levels.

\#volatility

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=20
- `multiplier`: float - default=2
- `matype`: int - default=1
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

KeltnerChannel(upperband, middleband, lowerband)

## kst

```python
kst(candles: np.ndarray, sma_period1=10, sma_period2=10, sma_period3=10, sma_period4=15, roc_period1=10, roc_period2=15, roc_period3=20, roc_period4=30, signal_period=9, source_type="close", sequential=False) -> KST:
```

The **Know Sure Thing (KST)** is a momentum oscillator developed by Martin Pring. It combines multiple smoothed rate-of-change indicators over different periods to generate a single composite momentum indicator. The KST aims to identify significant trend changes and overbought or oversold conditions in the market.

\#momentum

**Arguments**:

- `candles`: np.ndarray
- `sma_period1`: int - default=10
- `sma_period2`: int - default=10
- `sma_period3`: int - default=10
- `sma_period4`: int - default=15
- `roc_period1`: int - default=10
- `roc_period2`: int - default=15
- `roc_period3`: int - default=20
- `roc_period4`: int - default=30
- `signal_period`: int - default=9
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

KST(line, signal)

## kurtosis

```python
kurtosis(candles: np.ndarray, period: int = 5, source_type: str = "hl2", sequential: bool = False) -> Union[float, np.ndarray]
```

**Kurtosis** is a statistical measure used to quantify the "tailedness" or "peakedness" of a probability distribution. It provides insights into the shape of the distribution of returns for a given asset. Positive kurtosis indicates a distribution with heavier tails and a more peaked shape than the normal distribution, while negative kurtosis indicates lighter tails and a flatter shape.

\#volatility

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=5
- `source_type`: str - default="hl2"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## kvo

```python
kvo(candles: np.ndarray, short_period=34, long_period=55, sequential=False) -> Union[float, np.ndarray]
```

The **Klinger Volume Oscillator (KVO)** is a volume-based technical indicator developed by Stephen J. Klinger. It combines two volume-based moving averages—the volume force and the volume trend—to identify bullish and bearish trends in the market. The KVO helps traders assess the relationship between price and volume, providing insights into potential trend reversals or continuations.

\#momentum

**Arguments**:

- `candles`: np.ndarray
- `short_period`: int - default=34
- `long_period`: int - default=55
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## linearreg

```python
linearreg(candles: np.ndarray, period=14, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

The **Linear Regression** indicator (LINEARREG) calculates the linear regression line for a given set of data points, representing the best-fit line that minimizes the distance between the data points and the line. It helps to identify the overall trend direction.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=14
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## linearreg\_angle

```python
linearreg_angle(candles: np.ndarray, period=14, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

The **Linear Regression Angle** (LINEARREG\_ANGLE) measures the angle of the linear regression line. It quantifies the slope or steepness of the trend.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=14
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## linearreg\_intercept

```python
linearreg_intercept(candles: np.ndarray, period=14, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

The **Linear Regression Intercept** indicator returns a single float value, which represents the y-intercept of the linear regression line.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=14
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## linearreg\_slope

```python
linearreg_slope(candles: np.ndarray, period=14, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

The **Linear Regression Slope** is helps to identify potential trends in price movements by analyzing the slope of a linear regression line fitted to past price data. A positive slope suggests an uptrend, while a negative slope suggests a downtrend. The slope's magnitude indicates the strength of the trend.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=14
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## lrsi

```python
lrsi(candles: np.ndarray, alpha=0.2, sequential=False) -> Union[float, np.ndarray]
```

The **RSI Laguerre Filter** is a technical indicator that combines the Relative Strength Index (RSI) with Laguerre filtering techniques. It aims to provide smoother and more responsive signals compared to traditional RSI indicators by applying Laguerre filtering to the RSI values.

\#momentum

**Arguments**:

- `candles`: np.ndarray
- `alpha`: float - default=0.2
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## ma

```python
ma(candles: np.ndarray, period: int = 30, matype: int = 0,  source_type: str = "close", sequential: bool = False) -> Union[float, np.ndarray]:
```

This function calculates (nearly) all **Moving Averages** of Jesse - use the matypes at the top of the page to change the behaviour of this function. For ease of use those ma types can also be looked up in the doc string of the ma function.

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=30
- `matype`: int - default=0
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## maaq

```python
maaq(candles: np.ndarray, period: int = 11, fast_period: int = 2, slow_period: int = 30, source_type: str = "close", sequential: bool = False) -> Union[float, np.ndarray]
```

The **Moving Average Adaptive Q** is a technical indicator designed to adapt to changing market conditions by dynamically adjusting the smoothing factor of the moving average. It aims to provide smoother and more accurate trend signals by automatically optimizing the smoothing parameter based on recent price data.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=11
- `fast_period`: int - default=2
- `slow_period`: int - default=30
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## mab

```python
mab(candles: np.ndarray, fast_period: int = 10, slow_period: int = 50, devup: float = 1, devdn: float = 1, fast_matype: int = 0, slow_matype: int = 0, source_type: str = "close", sequential: bool = False) -> MAB
```

**Moving Average Bands** are a type of technical indicator that consists of multiple moving averages plotted above and below the asset's price. These bands serve as dynamic support and resistance levels, expanding or contracting based on market volatility. As with _ma_ you can use all available ma types - even different ones for the slow and fast period.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `fast_period`: int - default=10
- `slow_period`: int - default=50
- `devup`: float - default=1
- `devdn`: float - default=1
- `fast_matype`: int - default=0
- `slow_matype`: int - default=0
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

MAB(upperband, middleband, lowerband)

## macd

```python
macd(candles: np.ndarray, fast_period=12, slow_period=26, signal_period=9, source_type="close", sequential=False) -> MACD
```

The **Moving Average Convergence Divergence (MACD)** is a momentum indicator that consists of two lines: the MACD line and the signal line. The MACD line is calculated by subtracting the longer-term Exponential Moving Average (EMA) from the shorter-term EMA. The signal line is a moving average of the MACD line. Traders use the MACD to identify bullish and bearish momentum signals, trend reversals, and divergence between price and momentum.

\#momentum

**Arguments**:

- `candles`: np.ndarray
- `fast_period`: int - default=12
- `slow_period`: int - default=26
- `signal_period`: int - default=9
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

MACD(macd, signal, hist)

## mama

```python
mama(candles: np.ndarray, fastlimit=0.5, slowlimit=0.05, source_type="close", sequential=False) -> MAMA
```

The **MESA Adaptive Moving Average (MAMA)** is a technical indicator developed by John F. Ehlers. It utilizes a complex mathematical formula to adaptively adjust the smoothing period of a moving average based on market volatility. MAMA aims to provide smoother and more responsive trend signals compared to traditional moving averages, making it particularly useful for trend-following strategies in dynamic market conditions.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `fastlimit`: float - default=0.5
- `slowlimit`: float - default=0.05
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

MAMA(mama, fama)

## marketfi

```python
marketfi(candles: np.ndarray, sequential=False) -> Union[float, np.ndarray]
```

The **Market Facilitation Index** (MFI) is a volume-based indicator developed by Bill Williams. It measures the ease of price movement based on changes in trading volume. The MFI is calculated by dividing the difference between the high and low prices by the volume. It helps traders identify periods of low liquidity, consolidation, and potential breakout opportunities in the market.

\#volatility

**Arguments**:

- `candles`: np.ndarray
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## mass

```python
mass(candles: np.ndarray, period=5, sequential=False) -> Union[float, np.ndarray]
```

The **Mass Index** is a technical indicator developed by Donald Dorsey. It measures the range expansion of prices to identify potential trend reversals. The Mass Index calculates the difference between two exponential moving averages of the high-low range and then applies a smoothing function to create an index.

\#volatility

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=5
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## mcginley\_dynamic

```python
mcginley_dynamic(candles: np.ndarray, period=10, k=0.6, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

The **McGinley Dynamic** is a technical indicator developed by John McGinley. It is a moving average designed to track price movements more accurately compared to traditional moving averages. The McGinley Dynamic adjusts its speed based on market conditions, becoming more responsive during volatile periods and smoothing out during quieter times.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=10
- `k`: float - default=0.6
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## mean\_ad

```python
mean_ad(candles: np.ndarray, period: int = 5, source_type: str = "hl2", sequential: bool = False) -> Union[float, np.ndarray]
```

**Mean Absolute Deviation** is a statistical measure used to quantify the dispersion of data points around their mean or median. It is calculated by taking the average of the absolute differences between each data point and the mean or median of the dataset. MAD provides insights into the variability or spread of a dataset and is commonly to assess risk and volatility.

\#volatility

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=5
- `source_type`: str - default="hl2"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## median\_ad

```python
median_ad(candles: np.ndarray, period: int = 5, source_type: str = "hl2", sequential: bool = False) -> Union[float, np.ndarray]
```

**Median Absolute Deviation** is a statistical measure used to quantify the dispersion of data points around their median. It is calculated by taking the median of the absolute differences between each data point and the median of the dataset. It is robust to outliers and provides insights into the variability or spread of a dataset, similar to Mean Absolute Deviation, but using the median instead of the mean.

\#volatility

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=5
- `source_type`: str - default="hl2"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## medprice

```python
medprice(candles: np.ndarray, sequential=False) -> Union[float, np.ndarray]
```

The **Median Price (MEDPRICE)** calculates the median of the high and low prices for each period. It provides a single price value that represents the central tendency of the price range over a specified period.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## mfi

```python
mfi(candles: np.ndarray, period=14, sequential=False) -> Union[float, np.ndarray]
```

The **Money Flow Index (MFI)** is a momentum indicator that measures the strength and direction of money flowing in and out of a security. It combines price and volume data to assess buying and selling pressure. The MFI is calculated using a formula that compares typical price changes with volume, generating values between 0 and 100.

\#momentum

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=14
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## midpoint

```python
midpoint(candles: np.ndarray, period=14, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

The **MidPoint** is a technical indicator that calculates the midpoint price of a financial instrument over a specified period. It is calculated by taking the average of the current and the previous candle.

\#filter

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=14
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## midprice

```python
midprice(candles: np.ndarray, period=14, sequential=False) -> Union[float, np.ndarray]
```

The **MidPrice** is basically just hl2

\#filter

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=14
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## minmax

```python
minmax(candles: np.ndarray, order=3, sequential=False) -> EXTREMA
```

The "**minmax**" function is a mathematical operation that retrieves the extrema (i.e., the minimum and maximum values) from a dataset or a specified range of values. It can be used to identify the lowest and highest values within a given dataset. This operation is often employed to find support and resistance levels in the market.

\#trend

Also called ZigZag sometimes.

::: tip Signal delayed

Due to the nature of extrema detection signals are always delayed by the amount of order. Meaning you will never get the signal at the time of occurence. This means this is not working for `is_min` and `is_max`: `[-1]`, as this will always be false. Working: `[-(order+1)]`.

:::

**Arguments**:

- `candles`: np.ndarray
- `order`: int - default = 3
- `sequential`: bool - default=False

**Returns**:

EXTREMA(is\_min, is\_max, last\_min, last\_max)

## mom

```python
mom(candles: np.ndarray, period=10, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

The **Momentum (MOM)** indicator is used to measure the rate of change in price movements over a specified period. It calculates the difference between the current closing price and the closing price from a previous period. Positive values indicate upward momentum, while negative values indicate downward momentum.

\#momentum

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=10
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## mwdx

```python
mwdx(candles: np.ndarray, factor: float = 0.2, source_type: str = "close", sequential: bool = False) -> Union[float, np.ndarray]
```

The **MWDX Average** is a customized version of the exponential moving average (EMA), providing traders with a smoothed representation of price data with adjustable sensitivity controlled by the factor parameter.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `factor`: float - default=0.2
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## natr

```python
natr(candles: np.ndarray, period=14, sequential=False) -> Union[float, np.ndarray]
```

The **Normalized Average True Range (NATR)** is a technical indicator that measures market volatility. It is derived from the Average True Range (ATR) indicator but is normalized to a percentage scale. The NATR calculates the ratio of the current ATR value to the closing price, providing a volatility measure relative to the price level. The NATR is commonly used to assess the magnitude of price movements and to set appropriate stop-loss and take-profit levels.

\#volatility

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=14
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## nma

```python
nma(candles: np.ndarray, period: int = 40, source_type: str = "close", sequential: bool = False) -> Union[float, np.ndarray]
```

The **Natural Moving Average (NMA)** is a dynamic moving average that adjusts its smoothing factor based on market volatility, providing smoother trend signals in changing market conditions.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=40
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## nvi

```python
nvi(candles: np.ndarray, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

The **Negative Volume Index (NVI)** focuses on the relationship between volume and price changes. It is based on the premise that during periods of low volume, smart money investors are more active, and vice versa. The NVI calculates a cumulative index that increases when prices decrease on lower-than-average volume and decreases when prices increase on lower-than-average volume. Traders use the NVI to identify potential distribution phases in the market and to confirm bearish trends.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## obv

```python
obv(candles: np.ndarray, sequential=False) -> Union[float, np.ndarray]
```

The **On Balance Volume (OBV)** is a momentum indicator that uses volume flow to predict changes in stock price. It measures buying and selling pressure by adding the volume on up days and subtracting the volume on down days. The OBV line rises when volume on up days is greater than volume on down days, indicating buying pressure, and falls when the opposite is true, indicating selling pressure.

\#momentum

**Arguments**:

- `candles`: np.ndarray
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray


## pfe

```python
pfe(candles: np.ndarray, period: int = 10, smoothing: int = 5, source_type: str = "close", sequential: bool = False) -> Union[float, np.ndarray]
```

The **Polarized Fractal Efficiency (PFE)** measures how efficiently price moves over time. It calculates the ratio of actual price movement to the ideal straight-line movement between two points. PFE values range from 0 to 1, where 1 indicates perfect efficiency and 0 suggests inefficiency.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=10
- `smoothing`: int - default=5
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## pivot

```python
pivot(candles: np.ndarray, mode=0, sequential=False) -> PIVOT
```

**Pivot Points** are a type of technical indicator used to identify potential support and resistance levels in trading. They are calculated using the previous day's high, low, and close prices. The main pivot point indicates a potential turning point in market sentiment, with other support and resistance levels derived from it. Pivot Points are commonly used to determine entry and exit points.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `mode`: int - default = 0
- `sequential`: bool - default=False

**Returns**:

PIVOT(r4, r3, r2, r1, pp, s1, s2, s3, s4)

::: tip Available mode and levels

- 0: Standard Pivot Points / Floor Pivot Points - r2, r1, pp, s1, s2
- 1: Fibonacci Pivot Points - r3, r2, r1, pp, s1, s2, s3
- 2: Demark Pivot Points - r1, pp, s1
- 3: Camarilla Pivot Points - r4, r3, r2, r1, pp, s1, s2, s3, s4
- 4: Woodie's Pivot Points - r4, r3, r2, r1, pp, s1, s2, s3, s4
:::

## pma

```python
pma(candles: np.ndarray, source_type: str = "hl2", sequential: bool = False) -> PMA
```

The **Ehlers Predictive Moving Average** is a type of moving average developed by John Ehlers. Unlike traditional moving averages, which rely solely on historical price data, the Predictive Moving Average attempts to predict future price movement by applying a series of calculations based on the current and past prices. It aims to reduce lag and provide more timely signals for traders.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `source_type`: str - default="hl2"
- `sequential`: bool - default=False

**Returns**:

PMA(predict, trigger)

## ppo

```python
ppo(candles: np.ndarray, fast_period=12, slow_period=26, matype=0, source_type="close", sequential=False) -> Union[
  float, np.ndarray]
```

The **Percentage Price Oscillator (PPO)** is a momentum oscillator that measures the difference between two moving averages as a percentage of the larger moving average. It helps traders identify bullish and bearish trends in the market. The PPO is calculated by subtracting the longer-term moving average from the shorter-term moving average and then dividing the result by the longer-term moving average.

\#momentum

**Arguments**:

- `candles`: np.ndarray
- `fast_period`: int - default=12
- `slow_period`: int - default=26
- `matype`: int - default=0
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## pvi

```python
pvi(candles: np.ndarray, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

The **Positive Volume Index (PVI)** is used identify the strength of positive volume flows. It calculates cumulative volume changes based on days when the volume increases from the previous day. The PVI increases when the volume for the current day is greater than the volume for the previous day and decreases when the volume is lower.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## pwma

```python
pwma(candles: np.ndarray, period: int = 5, source_type: str = "close", sequential: bool = False) -> Union[float, np.ndarray]
```

**Pascal's Weighted Moving Average (PWMA)** is a type of moving average that assigns weights to each data point in the series based on Pascal's triangle. It calculates the weighted average of the data points, giving more importance to recent data while still considering historical data. This weighting scheme aims to provide a smoother representation of the underlying trend compared to simple moving averages. PWMA is particularly useful for traders who prefer a moving average that reacts quickly to recent price changes while reducing noise from erratic price movements.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=5
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## qstick

```python
qstick(candles: np.ndarray, period=5, sequential=False) -> Union[float, np.ndarray]
```

**Qstick** measures the difference between opening and closing prices over a period, indicating buying (positive values) or selling (negative values) pressure. It helps identify trends and potential reversals, with positive values signaling bullish and negative values bearish trends. Traders watch for deviations from the zero line to spot overbought or oversold conditions.

\#momentum

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=5
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## reflex

```python
reflex(candles: np.ndarray, period=20, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

The **Reflex indicator by John F. Ehlers** aims to filter out high-frequency noise in price data while retaining trend information. It calculates the difference between the current price and the price 'n' bars ago, where 'n' is a user-defined parameter. This difference is then smoothed using a smoothing function.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=20
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## roc

```python
roc(candles: np.ndarray, period=10, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

The **Rate of Change (ROC)** indicator measures the percentage change in price from one period to the next. It calculates the difference between the current price and the price 'n' periods ago, then expresses this difference as a percentage of the previous price. Mathematically, it is represented as ((price/prevPrice) - 1) \* 100.

\#momentum

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=10
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## rocp

```python
rocp(candles: np.ndarray, period=10, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

The **Rate of Change Percentage (ROCP)** indicator, also known as the Price Rate-of-Change, measures the percentage change in price over a specified number of periods. It calculates the percentage difference between the current price and the price 'n' periods ago.
Mathematically: (price-prevPrice)/prevPrice.

\#momentum

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=10
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## rocr

```python
rocr(candles: np.ndarray, period=10, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

The **Rate of Change Ratio (ROCR)** indicator measures the ratio of the current price to the price 'n' periods ago. Mathematically, it is represented as (price / prevPrice).

\#momentum

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=10
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## rocr100

```python
rocr100(candles: np.ndarray, period=10, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

ROCR100, or Rate of Change Ratio 100, is a momentum indicator that measures the percentage change in price over a specified period. It calculates the ratio of the current price to the price 'n' periods ago and expresses the result as a percentage. (price / prevPrice) \* 100

\#momentum

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=10
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## roofing

```python
roofing(candles: np.ndarray, hp_period=48, lp_period=10, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

The **Roofing Filter** is a technical indicator developed by John F. Ehlers. It's designed to smooth out market cycles and reduce noise in price data, making it easier to identify trends. The indicator utilizes a bandpass filter to extract the dominant cycle components of the price series. By filtering out the shorter-term and longer-term cycles, the Roofing Filter aims to provide a clearer view of the underlying trend.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `hp_period`: int - default=48
- `lp_period`: int - default=10
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## rsi

```python
rsi(candles: np.ndarray, period=14, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

The **Relative Strength Index (RSI)** is a momentum oscillator that measures the speed and change of price movements. It oscillates between 0 and 100 and is typically used to identify overbought or oversold conditions in an asset. RSI is calculated using the average gain and average loss over a specified period, often 14 periods by default. Traders often look for divergences between RSI and price movements to anticipate potential trend reversals. High RSI values suggest overbought conditions, while low RSI values indicate oversold conditions.

\#momentum

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=14
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## rsmk

```python
rsmk(candles: np.ndarray, candles_compare: np.ndarray, lookback: int = 90, period: int = 3, signal_period: int = 20, source_type: str = "close", sequential: bool = False) -> RSMK
```

The **Relative Strength (RSMK)** indicator measures the ratio of the price of one security to another over a specified period. It calculates the relative strength by taking the logarithm of the ratio of the price of the first security to the price of the second security, and then applies a moving average to smooth the result. This indicator helps identify potential trends or reversals in the performance of one security relative to another.

\#momentum

**Arguments**:

- `candles`: np.ndarray
- `lookback`: int - default=90
- `period`: int - default=3
- `signal_period`: int - default=20
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

RSMK(indicator, signal)

## rsx

```python
rsx(candles: np.ndarray, period=14, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

The **RSX (Relative Strength Xtra)** is a momentum oscillator that helps identify overbought and oversold conditions in the market. It is calculated by applying an exponential smoothing function to the ratio of the average gain to the average loss over a specified period.

\#momentum

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=14
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## rvi

```python
rvi(candles: np.ndarray, period: int = 10, ma_len: int = 14, matype: int = 1, devtype: int = 0, source_type: str = "close", sequential: bool = False) -> Union[float, np.ndarray]
```

The **Relative Volatility Index (RVI)** measures directional volatility by comparing smoothed moving averages of positive and negative price changes. It calculates the ratio of upward and downward volatility averages using a specified deviation type (standard, mean, or median) and a moving average for smoothing.

\#volatility

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=10
- `ma_len`: int - default=14
- `matype`: int - default=1
- `devtype`: int - default=0
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## safezonestop

```python
safezonestop(candles: np.ndarray, period: int = 22, mult: float = 2.5, max_lookback: int = 3, direction: str = "long", sequential: bool = False) -> Union[float, np.ndarray]:
```

The **Safezone Stops** indicator calculates stop levels for long or short positions based on price volatility. For long positions, it computes the maximum between the previous low minus a multiple of the negative directional movement and a specified lookback period. For short positions, it calculates the minimum between the previous high plus a multiple of the positive directional movement and the specified lookback period.

\#exit

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=22
- `mult`: float - default=2.5
- `max_lookback`: int - default=3
- `direction`: str - default="long" ("short")
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## sar

```python
sar(candles: np.ndarray, acceleration=0.02, maximum=0.2, sequential=False) -> Union[float, np.ndarray]
```

The **Parabolic SAR (SAR)** is a trend-following indicator used to identify potential reversal points in price movements. It plots dots above or below the price to indicate trend direction. Parameters like acceleration and maximum values control its sensitivity. Traders use it for entry and exit signals, with dots switching positions suggesting trend reversals.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `acceleration`: float - default=0.02
- `maximum`: float - default=0.2
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## sinwma

```python
sinwma(candles: np.ndarray, period: int = 14, source_type: str = "close", sequential: bool = False) -> Union[float, np.ndarray]
```

The **Sine Weighted Moving Average (SINWMA)** is a type of moving average that assigns different weights to each data point based on the sine function. This weighting scheme gives more importance to recent data points while gradually reducing the influence of older data points. As a result, the SINWMA is sensitive to changes in trend direction, making it useful for trend-following strategies.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=14
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## skew

```python
skew(candles: np.ndarray, period: int = 5, source_type: str = "hl2", sequential: bool = False) -> Union[float, np.ndarray]
```

**Skewness** measures the asymmetry of a probability distribution. Positive skewness indicates a right-leaning distribution, negative skewness implies a left-leaning one, and zero skewness means perfect symmetry.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=5
- `source_type`: str - default="hl2"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## sma

```python
sma(candles: np.ndarray, period=5, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

The **Simple Moving Average (SMA)** calculates the average price of a security over a specified number of periods. It's a commonly used technical indicator that helps smooth out price data to identify trends.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=5
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## smma

```python
smma(candles: np.ndarray, period=5, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

The **Smoothed Moving Average (SMMA)** is a type of moving average that assigns less weight to the most recent data points compared to the Simple Moving Average (SMA). It aims to reduce lag and provide a smoother representation of price trends.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=5
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

## sqwma

```python
sqwma(candles: np.ndarray, period: int = 14, source_type: str = "close", sequential: bool = False) -> Union[float, np.ndarray]
```

The **Square Weighted Moving Average (SQWMA)** is a type of weighted moving average where the weights applied to each data point are squared. This method assigns greater importance to recent data points while still considering older ones, resulting in a smoother and more responsive moving average compared to traditional methods.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=14
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

float | np.ndarray

## srsi

```python
srsi(candles: np.ndarray, period=14, source_type="close", sequential=False) -> StochasticRSI
```

The **Stochastic RSI (SRSI)** is a momentum oscillator that combines elements of both the Relative Strength Index (RSI) and the Stochastic Oscillator. It measures the relative position of the RSI within its range over a specified period, typically 14 days, and then applies the Stochastic formula to generate values between 0 and 100. This indicator helps traders identify overbought and oversold conditions more effectively than using RSI alone.

\#momentum

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=14
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

StochasticRSI(k, d)

## srwma

```python
srwma(candles: np.ndarray, period: int = 14, source_type: str = "close", sequential: bool = False) -> Union[float, np.ndarray]
```

The **Square Root Weighted Moving Average (SRWMA)** assigns weights to each data point based on the square root of its position in the series. This means that more recent data points are given relatively higher importance compared to older ones, similar to other weighted moving averages. It's useful for smoothing out price data while placing more emphasis on recent price movements.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=14
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## stc

```python
stc(candles: np.ndarray, fast_period: int = 23, fast_matype: int = 1, slow_period: int = 50, slow_matype: int = 1, k_period: int = 10, d_period: int = 3, source_type: str = "close", sequential: bool = False) -> Union[float, np.ndarray]
```

The **Schaff Trend Cycle (STC)** is a technical indicator designed to identify market trends and potential reversals. It combines the concepts of cycle analysis and momentum oscillators to produce signals for both trending and range-bound markets. The STC oscillator fluctuates between 0 and 100, where readings above 25 typically indicate bullish momentum, and readings below 75 suggest bearish momentum. Traders often use crossovers and divergences with price action to generate buy or sell signals.

\#momentum

**Arguments**:

- `candles`: np.ndarray
- `fast_period`: int - default=23
- `fast_matype`: int - default=1
- `slow_period`: int - default=50
- `slow_matype`: int - default=1
- `k_period`: int - default=10
- `d_period`: int - default=3
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## stiffness

The Stiffness Indicator is a technical indicator developed by [daviddtech on tradingview](https://www.tradingview.com/script/MOw6mUQl-Stiffness-Indicator-DaviddTech), and it is used to measure the power of a trend. The stiffness is calculated based on the moving average and standard deviation of the price.

```py
stiffness(candles: np.ndarray, ma_length: int = 100, stiff_length: int = 60, stiff_smooth: int = 3, source_type: str = "close")
```

**Parameters**:

- `candles`: `np.ndarray` - Input candle data.
- `ma_length`: `int` (default: 100) - Length of the moving average.
- `stiff_length`: `int` (default: 60) - Length of the stiffness calculation.
- `stiff_smooth`: `int` (default: 3) - Smoothing period for the stiffness calculation.
- `source_type`: `str` (default: "close") - Source type for the candle (e.g., "open", "high", "low", "close").

**Return Type**: `float`

- `stiffness`: The stiffness value.

## stddev

```python
stddev(candles: np.ndarray, period=5, nbdev=1, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

The **Standard Deviation (STDDEV)** calculates the dispersion of a set of data points from its mean value. It is often used to assess the risk or volatility of an asset's price movements over a specific period. Higher standard deviation values indicate greater price volatility, while lower values suggest more stable price action. STDDEV is used to gauge potential price fluctuations and adjust trading strategies accordingly.

\#volatility

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=5
- `nbdev`: int - default=1
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## stoch

```python
stoch(candles: np.ndarray, fastk_period=14, slowk_period=3, slowk_matype=0, slowd_period=3, slowd_matype=0, sequential=False) -> Stochastic
```

The **Stochastic Oscillator** is a momentum indicator used to spot overbought and oversold conditions in a market. It comprises two lines: %K and %D. Readings above 80 suggest overbought conditions, signaling a potential downturn, while readings below 20 indicate oversold conditions, signaling a possible upturn.

\#momentum

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=14
- `sequential`: bool - default=False

**Returns**:

Stochastic(k, d)

## stochf

```python
stochf(candles: np.ndarray, fastk_period=5, fastd_period=3, fastd_matype=0, sequential=False) -> StochasticFast
```

The **Stochastic Fast** indicator calculates the fast %K and %D lines. It measures the current closing price relative to the high-low range over a specified period. The %K line represents the current price in relation to the range, while the %D line is a moving average of the %K line.

\#momentum

**Arguments**:

- `candles`: np.ndarray
- `fastk_period`: int - default=5
- `fastd_period`: int - default=3
- `fastd_matype`: int - default=0
- `sequential`: bool - default=False

**Returns**:

StochasticFast(k, d)

## supersmoother

```python
supersmoother(candles: np.ndarray, period=14, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

The **Super Smoother Filter 2-pole** Butterworth is an indicator introduced by John F. Ehlers. It functions as a smoothing filter designed to eliminate aliasing noise while preserving the phase characteristics of the original signal. This filter employs a 2-pole Butterworth filter to achieve its smoothing effect, resulting in a smoother output compared to traditional moving averages.

\#filter

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=14
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## supersmoother\_3\_pole

```python
supersmoother_3_pole(candles: np.ndarray, period=14, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

The **Super Smoother Filter 3-pole** Butterworth, described by John F. Ehlers, is an advanced smoothing filter designed to reduce noise and preserve the phase of the original signal. It utilizes a 3-pole Butterworth filter to achieve even smoother output. This filter is particularly effective in removing high-frequency noise while retaining the essential features of the underlying data.

\#filter

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=14
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## swma

```python
swma(candles: np.ndarray, period: int = 5, source_type: str = "close", sequential: bool = False) -> Union[float, np.ndarray]
```

The **Symmetric Weighted Moving Average (SWMA)** is a type of moving average that assigns weights symmetrically to data points around the center of the window. Unlike simple moving averages where all data points have equal weight, SWMA gives more weight to the values closer to the center of the window and gradually decreases the weight as the distance from the center increases. This weighting scheme allows SWMA to respond more quickly to recent price changes while still providing smoother results compared to other weighted moving averages.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=5
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## supertrend

```python
supertrend(candles: np.ndarray, period=10, factor=3, sequential=False) -> SuperTrend
```

The **SuperTrend** is a trend-following indicator that helps identify the direction of the current trend in the market. It is based on the concept of average true range (ATR) and plots a line above or below the price, indicating bullish or bearish trends, respectively. The SuperTrend line changes its position based on the underlying price movement and volatility, providing traders with potential entry and exit signals.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=14
- `factor`: int - default=3
- `sequential`: bool - default=False

**Returns**:

SuperTrend(trend, changed)

## support_resistance_with_breaks

This indicator calculates support and resistance levels with break lines based on the provided candle data. Check it out on [Tradingview](https://www.tradingview.com/script/JDFoWQbL-Support-and-Resistance-Levels-with-Breaks-LuxAlgo) for more information.

**Credits**: [LuxAlgo](https://www.tradingview.com/script/JDFoWQbL-Support-and-Resistance-Levels-with-Breaks-LuxAlgo)

```py
support_resistance_with_breaks(candles: np.ndarray, left_bars: int = 15, right_bars: int = 15, vol_threshold: int = 20) -> SupportResistanceWithBreaks
```

**Properties**:

- `candles`: `np.ndarray` - Input candle data.
- `left_bars`: `int` (default: 15) - Number of left bars for support and resistance calculation.
- `right_bars`: `int` (default: 15) - Number of right bars for support and resistance calculation.
- `vol_threshold`: `int` (default: 20) - Volume threshold for break detection.

**Return Type**: `SupportResistanceWithBreaks` containing six values:

- `support`: The calculated support level.
- `resistance`: The calculated resistance level.
- `red_break`: A boolean indicating a red break (bearish signal).
- `green_break`: A boolean indicating a green break (bullish signal).
- `bear_wick`: A boolean indicating a bearish wick.
- `bull_wick`: A boolean indicating a bullish wick.

This function can be used to identify potential support and resistance levels, as well as detect breaks and wicks in the price action, which can be useful for developing trading strategies.

## t3

```python
t3(candles: np.ndarray, period=5, vfactor=0, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

The **Triple Exponential Moving Average (T3)** is a type of moving average that applies triple exponential smoothing to the price data. It is designed to reduce lag and provide smoother trends compared to traditional moving averages. The T3 incorporates multiple exponential moving averages with different smoothing factors to adapt to changing market conditions more effectively.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=5
- `vfactor`: float - default=0
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## tema

```python
tema(candles: np.ndarray, period=9, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

The **Triple Exponential Moving Average (TEMA)** is a type of moving average that applies triple exponential smoothing to the price data. It aims to reduce lag and to provide smoother trends compared to traditional moving averages by incorporating multiple exponential moving averages with different smoothing factors. TEMA responds more rapidly to price changes while maintaining a smoother trajectory, making it useful for trend-following strategies.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=9
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## trange

```python
trange(candles: np.ndarray, sequential=False) -> Union[float, np.ndarray]
```

The **True Range** is a measure of market volatility, representing the greatest of the following:

1.  The current high minus the current low.
2.  The absolute value of the current high minus the previous close.
3.  The absolute value of the current low minus the previous close.

It provides insight into the price movement range, capturing potential price gaps and sudden shifts. True Range is often used in the calculation of various technical indicators, such as Average True Range (ATR), to assess market volatility and adjust trading strategies accordingly.

\#volatility

**Arguments**:

- `candles`: np.ndarray
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## trendflex

```python
trendflex(candles: np.ndarray, period=20, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

The **Trendflex** indicator, developed by John F. Ehlers, aims to identify trend reversals by smoothing price data. It combines cycle extraction and trend extraction components to filter out noise and identify underlying trends, providing clearer signals for traders.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=20
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## trima

```python
trima(candles: np.ndarray, period=30, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

TRIMA, or **Triangular Moving Average**, is a type of moving average that places equal weight on prices over a specified time period. It is calculated by taking the average of prices over this period, with the middle prices receiving the most weight.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=30
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## trix

```python
trix(candles: np.ndarray, period=18, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

TRIX - 1-day Rate-Of-Change (ROC) of a Triple Smooth EMA is a momentum oscillator that measures the percentage change in a triple-smoothed EMA over a specified time period. It calculates the rate of change of the EMA by comparing the current value to the value 1 day ago, then expresses this change as a percentage.

\#momentum

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=18
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## tsf

```python
tsf(candles: np.ndarray, period=14, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

The **Time Series Forecast (TSF)** indicator predicts future price movements based on past price data. It uses linear regression to estimate the future value of the price based on historical prices. TSF extrapolates the trend of the data points and extends it into the future, providing a projection of where the price may go.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=14
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## tsi

```python
tsi(candles: np.ndarray, long_period=25, short_period=13, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

The **True Strength Index (TSI)** is a momentum oscillator that measures price strength relative to volatility. TSI is calculated by taking the difference between two moving averages of price momentum and dividing it by the absolute value of the longer-term moving average of price momentum. Positive TSI values indicate bullish momentum, while negative values suggest bearish momentum.

\#momentum

**Arguments**:

- `candles`: np.ndarray
- `long_period`: int - default=25
- `short_period`: int - default=13
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## ttm\_trend

```python
ttm_trend(candles: np.ndarray, period: int = 5, source_type: str = "hl2", sequential: bool = False) -> Union[bool, np.ndarray]
```

The **TTM Trend** indicator identifies the prevailing market trend by analyzing price action. It employs proprietary algorithms to determine whether the market is in a bullish (True) or bearish (False) phase.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=5
- `source_type`: str - default="hl2"
- `sequential`: bool - default=False

**Returns**:

bool | np.ndarray

## ttm_squeeze (TTM Squeeze)

TTMSqueeze is a technical indicator that identifies potential squeeze situations in the market. It combines Bollinger Bands and Keltner Channels to detect when the volatility is decreasing, indicating a potential breakout.

**Author:** daviddtech

**Credits:** [https://www.tradingview.com/script/Mh3EmxF5-TTM-Squeeze-DaviddTech/](https://www.tradingview.com/script/Mh3EmxF5-TTM-Squeeze-DaviddTech/)

### Parameters

```py
ttm_squeeze(candles: np.ndarray, length_ttms: int = 20, bb_mult_ttms: float = 2.0, kc_mult_low_ttms: float = 2.0) -> bool
```

**Properties**:

- `candles`: `np.ndarray` - Input candle data.
- `length_ttms`: `int` (default: 20) - Period for the Bollinger Bands and Keltner Channels.
- `bb_mult_ttms`: `float` (default: 2.0) - Multiplier for the Bollinger Bands.
- `kc_mult_low_ttms`: `float` (default: 2.0) - Multiplier for the lower Keltner Channel.

**Return Type**: `bool`

**Return Value**: `True` if a squeeze situation is detected, `False` otherwise.

This indicator is useful for identifying potential breakout situations in the market. It can be used in conjunction with other indicators to form a comprehensive trading strategy.

## typprice

```python
typprice(candles: np.ndarray, sequential=False) -> Union[float, np.ndarray]
```

The **Typical Price (TYPPRICE)** represents the average price of a security over a specific period. It's calculated by adding the high, low, and closing prices of a candle and then dividing the sum by three. This indicator is useful for smoothing out price fluctuations and providing a clearer picture of the underlying trend.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## ui

```python
ui(candles: np.ndarray, period: int = 14, scalar: float = 100, source_type: str = "close",  sequential: bool = False) -> Union[float, np.ndarray]
```

The **Ulcer Index (UI)** is a technical indicator designed to measure the downside volatility of an investment. It helps investors and traders assess the risk associated with a particular investment by quantifying the extent and duration of drawdowns or declines from previous peaks. The Ulcer Index is calculated by taking the square root of the mean of the squared percentage drawdowns over a specified period, usually 14 days. A higher Ulcer Index value indicates higher volatility and greater risk.

\#volatility

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=14
- `scalar`: float - default=100
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## ultosc

```python
ultosc(candles: np.ndarray, timeperiod1=7, timeperiod2=14, timeperiod3=28, sequential=False) -> Union[
  float, np.ndarray]
```

The **Ultimate Oscillator (ULTOSC)** is a momentum oscillator that blends short-term, intermediate-term, and long-term price action into one indicator. It ranges between 0 and 100, helping traders spot overbought and oversold conditions and potential trend reversals.

\#momentum

**Arguments**:

- `candles`: np.ndarray
- `timeperiod1`: int - default=7
- `timeperiod2`: int - default=14
- `timeperiod3`: int - default=28
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## var

```python
var(candles: np.ndarray, period=14, nbdev=1, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

**Variance** is a statistical measure that quantifies the degree of dispersion or spread in a dataset. It calculates the average of the squared differences from the mean. In finance, variance is often used to assess the volatility or risk of an asset's returns.

\#volatility

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=14
- `nbdev`: int - default=1
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## vi

```python
vi(candles: np.ndarray, period=14, sequential=False) -> VI
```

The **Vortex Indicator (VI)** is a technical analysis tool that consists of two components: the Positive Vortex Indicator (+VI) and the Negative Vortex Indicator (-VI). These components are represented by the named tuple VI, which includes the values for both the positive and negative indicators.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=14
- `sequential`: bool - default=False

**Returns**:

VI(plus, minus)

## vidya

```python
vidya(candles: np.ndarray, length: int = 9, fix_cmo: bool = True, select: bool = True, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

The **Variable Index Dynamic Average (VIDYA)** is a type of moving average that dynamically adjusts its sensitivity based on market volatility. It aims to provide smoother and more responsive results compared to traditional moving averages. VIDYA is calculated using a variable index factor that adapts to changing market conditions, making it suitable for trend-following strategies.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `length`: int - default=9
- `fix_cmo`: bool - default=True
- `select`: bool - default=True
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## vpci

```python
vpci(candles: np.ndarray, short_range=5, long_range=25, sequential=False) -> VPCI
```

The **Volume Price Confirmation Indicator (VPCI)** is a technical analysis tool used to confirm price movements based on volume. It combines both price and volume data to assess the strength of a trend. VPCI compares the percentage change in price to the percentage change in volume over a specified period. By analyzing the relationship between price and volume, traders can gain insights into the sustainability of price movements and potential trend reversals.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `short_range`: int - default=5
- `long_range`: int - default=25
- `sequential`: bool - default=False

**Returns**:

VPCI(vpci, vpcis)

## vlma

```python
vlma(candles: np.ndarray, min_period: int = 5, max_period: int = 50, matype: int = 0, devtype: int = 0, source_type: str = "close", sequential: bool = False) -> Union[float, np.ndarray]
```

The **Variable Length Moving Average (VLMA)** is a type of moving average that adjusts its length based on market conditions. Unlike traditional moving averages with fixed periods, the VLMA dynamically changes its period length in response to changes in volatility or other predefined criteria. This adaptive nature allows the VLMA to better capture shifts in the underlying price trend, potentially providing more timely and accurate signals to traders.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `min_period`: int - default=5
- `max_period`: int - default=50
- `matype`: int - default=0
- `devtype`: int - default=0
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## vosc

```python
vosc(candles: np.ndarray, short_period=2, long_period=5, sequential=False) -> Union[float, np.ndarray]
```

The **Volume Oscillator (VOSC)** is a momentum oscillator that measures the difference between two volume-based moving averages. It helps traders identify bullish and bearish trends in trading volume. The VOSC is calculated by subtracting a longer-term volume moving average from a shorter-term volume moving average. This difference is then plotted as a histogram or a line chart, providing insights into the strength and direction of volume trends.

\#momentum

**Arguments**:

- `candles`: np.ndarray
- `short_period`: int - default=2
- `long_period`: int - default=5
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## voss

```python
voss(candles: np.ndarray, period=20, predict=3, bandwith=0.25, source_type="close", sequential=False) -> VossFilter
```

The **Voss Filter** indicator by John Ehlers tries to identify price patterns and predict future price movements. It applies filters to smooth the price data and extract relevant signals.

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=20
- `predict`: int - default=3
- `bandwith`: float - default=0.25
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

VossFilter(voss, filt)

## vpt

```python
vpt(candles: np.ndarray, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

The **Volume Price Trend (VPT)** indicator analyzes the relationship between volume and price changes to assess the strength of a trend. It's calculated by cumulatively adding the percentage change in price multiplied by volume over a specified period.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## vpwma

```python
vpwma(candles: np.ndarray, period: int = 14, power: float = 0.382, source_type: str = "close", sequential: bool = False) -> Union[float, np.ndarray]
```

The **Variable Power Weighted Moving Average (VPWMA)** adjusts the weights of each price data point in its calculation based on their respective volumes. This means that periods with higher trading volumes have a greater influence on the moving average.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=14
- `power`: float - default=0.382
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## vwap

```python
vwap(candles: np.ndarray, source_type: str = "hlc3", anchor: str = "D", sequential: bool = False) -> Union[float, np.ndarray]
```

The **Volume Weighted Average Price (VWAP)** calculates the average price of a financial asset over a specified time period, weighted by the trading volume during each period. It provides insight into the average price at which a security has traded throughout the day, based on both volume and price. The `anchor` parameter allows you to specify the time interval for which the VWAP is calculated.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `source_type`: str - default="close"
- `anchor`: str - ‘D‘ - (‘Y’), months (‘M’), weeks (‘W’), days (‘D’), hours (‘h’), minutes (‘m’)
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## vwma

```python
vwma(candles: np.ndarray, period=20, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

The **Volume Weighted Moving Average (VWMA)** is a type of moving average that considers the volume traded at each price level. It calculates the average price of a financial asset over a specified time period, with each price point weighted by its corresponding trading volume. This provides a more accurate representation of average price levels compared to traditional moving averages.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=20
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## vwmacd

```python
vwmacd(candles: np.ndarray, fast_period=12, slow_period=26, signal_period=9, sequential=False) -> VWMACD
```

The **Volume Weighted Moving Average Convergence/Divergence (VWMACD)** is a variation of the traditional MACD indicator that incorporates volume-weighted moving averages. It is primarily used to identify changes in momentum based on both price and volume data.


**Author:** David.

**Credits:** [https://www.tradingview.com/script/33Y1LzRq-Volume-Weighted-Moving-Average-Convergence-Divergence-MACD/](https://www.tradingview.com/script/33Y1LzRq-Volume-Weighted-Moving-Average-Convergence-Divergence-MACD/)

\#momentum

**Arguments**:

- `candles`: np.ndarray
- `fast_period`: int - default=12
- `slow_period`: int - default=26
- `signal_period`: int - default=9
- `sequential`: bool - default=False

**Returns**:

VWMACD(macd, signal, hist)

## wad

```python
wad(candles: np.ndarray, sequential=False) -> Union[float, np.ndarray]
```

The **Williams Accumulation/Distribution (WAD)** indicator, developed by Larry Williams, evaluates the flow of funds into and out of a security based on price movements and volume. It helps traders identify potential reversals or confirm trends by analyzing the relationship between price and volume.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## Waddah Attar Explosion

The Addah Attar Explosion is a technical indicator that combines the Moving Average Convergence Divergence (MACD) with Bollinger Bands to identify potential trend reversals and explosions in price action. This indicator to LazyBear and available onView.

\#trend

### Parameters

```py
waddah_attar_explosion(candles, sensitivity=150,=20, slow_length=40,_length=20, mult=20,="close")
```
**Properties**:

- `candles`: `np.ndarray` - Input candle data.
- `sensitivity`: `int` (default 150 Sensitivity parameter for MACD calculation.
- `fast_length`: `int` (default: 20) - Fast period for the MACD calculation.
- `slow_length`: `int` (default: 40) - Slow period for the MACD calculation.
- `channel_length`: `int` (default: 20 - Length of the Bollinger channel.
- `mult`: `float` (default: 20) - Multiplier for the Bollinger Bands.
- `source_type`: `str` (default: "close") - Source type for the candle (e.g "open", "high", "low", "close").

**Return Type**

`WaddahAttarExplosionTuple` containing three values:

- `explosion_line`: The explosion line value.
- `rend_power`: The trend power value.
- `trend`: The trend direction value (1 for upward trend, -1 for downward trend).

This indicator is useful for identifying potential trend reversals and explosions in price action, and can be used in conjunction with other indicators to form a comprehensive trading strategy.

## wclprice

```python
wclprice(candles: np.ndarray, sequential=False) -> Union[float, np.ndarray]
```

The **Weighted Close Price (WCLPRICE)** is a technical indicator that calculates the average of high, low, and twice the closing price. It provides a weighted representation of the closing price and is often used in technical analysis to identify trends and potential reversal points in the market.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## wilders

```python
wilders(candles: np.ndarray, period=5, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

**Wilders Smoothing**, named after its creator J. Welles Wilder Jr., is a method used to smooth time series data, such as prices or indicators. It applies an exponential moving average (EMA) with a smoothing factor of 1/n, where n is the period specified. This smoothing technique assigns more weight to recent data points, making it responsive to current market conditions.

\#filter

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=5
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## willr

```python
willr(candles: np.ndarray, period=14, sequential=False) -> Union[float, np.ndarray]
```

**Williams' %R**, developed by Larry Williams, is a momentum indicator that measures overbought or oversold conditions in a financial instrument. It is calculated as the difference between the highest high of the specified period and the current closing price, divided by the highest high minus the lowest low of the period, multiplied by -100. The result oscillates between -100 and 0, where values above -20 indicate overbought conditions, and values below -80 indicate oversold conditions.

\#momentum

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=14
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## wma

```python
wma(candles: np.ndarray, period=30, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

The **Weighted Moving Average (WMA)** is a technical analysis indicator that calculates the average price of a security over a specified time period, giving more weight to recent data points. Unlike simple moving averages, which assign equal weight to each data point, WMAs assign greater weight to more recent prices. This is achieved by multiplying each price by a weighting factor determined by its position in the data series. The WMA is used to identify trends and smooth out price fluctuations over time.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=30
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## wt

```python
wt(candles: np.ndarray, wtchannellen: int = 9, wtaveragelen: int = 12, wtmalen: int = 3, oblevel: int = 53,  oslevel: int = -53, source_type: str = "hlc3", sequential: bool = False) -> Wavetrend
```

The **Wavetrend** indicator combines moving averages to identify trend strength and direction. It offers buy signals when the trend line crosses above the signal line, indicating a bullish trend, and sell signals when it crosses below, suggesting a bearish trend.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `wtchannellen`: int - period=9
- `wtaveragelen`: int - period=12
- `wtmalen`: int - period=3
- `oblevel`: int - period=53
- `oslevel`: int - period=-53
- `source_type`: str - period="hlc3"
- `sequential`: bool - period=False

**Returns**:

Wavetrend(wt1, wt2, wtCrossUp, wtCrossDown, wtOversold, wtOverbought, wtVwap)

## zlema

```python
zlema(candles: np.ndarray, period=20, source_type="close", sequential=False) -> Union[float, np.ndarray]
```

The **Zero-Lag Exponential Moving Average (ZLEMA)** is designed to reduce lag associated with traditional exponential moving averages. It achieves this by using a subtraction factor to eliminate delay, resulting in a smoother and more responsive moving average.

\#trend

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=20
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## zscore

```python
zscore(candles: np.ndarray, period=14, matype=0, nbdev=1, devtype: int = 0, source_type="close", sequential=False) -> Union[
  float, np.ndarray]
```

The **zScore** indicator measures the distance between a data point and the mean of a dataset in terms of standard deviations. It helps identify overbought and oversold conditions based on how far the current value deviates from the mean.

\#volatility

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=14
- `matype`: int - default=0
- `nbdev`: int - default=1
- `devtype`: int - default=1
- `source_type`: str - default="close"
- `sequential`: bool - default=False

**Returns**:

float | np.ndarray

## volume

```python
volume(candles: np.ndarray, period: int = 20, sequential: bool = False) -> Volume
```

The **Volume** indicator returns the volume of the current candle and its moving average.

**Arguments**:

- `candles`: np.ndarray
- `period`: int - default=20
- `sequential`: bool - default=False

**Returns**:

Volume(volume, ma)
