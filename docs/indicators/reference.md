



# Indicators Reference

Most indicators have a `sequential=False` parameter. When set to `True`, it returns an array of values; which is helpful if you're doing research [Jupyter Notebooks](/docs/jupyter-notebooks).

When developing strategies however, you probably want to keep it as `False` to return only the indicator value for current trading candle.

::: tip matype
In few indicators you can set a moving average type:

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

::: tip source_type
In some indicators you can set the source type:

-   `"close"`
-   `"high"`
-   `"low"`
-   `"open"`
-   `"volume"`
-   `"hl2"`
-   `"hlc3"`
-   `"ohlc4"`
:::

## acosc  
  
```python  
acosc(candles: np.ndarray, sequential=False) -> AC  
```  
  
Acceleration / Deceleration Oscillator (AC)  

**Arguments**:  
  
- `candles`: np.ndarray  
- `sequential`: bool - default=False  
  
**Returns**:  
  
AC(osc, change)  
  
## ad  
  
```python  
ad(candles: np.ndarray, sequential=False) -> Union[float, np.ndarray]  
```  
  
AD - Chaikin A/D Line  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## adosc  
  
```python  
adosc(candles: np.ndarray, fastperiod=3, slowperiod=10, sequential=False) -> Union[float, np.ndarray]  
```  
  
ADOSC - Chaikin A/D Oscillator  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `fastperiod`: int - default: 3  
- `slowperiod`: int - default: 10  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## adx  
  
```python  
adx(candles: np.ndarray, period=14, sequential=False) -> Union[float, np.ndarray]  
```  
  
ADX - Average Directional Movement Index  
  
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
  
ADXR - Average Directional Movement Index Rating  
  
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
  
Alligator  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
AG(jaw, teeth, lips)  
  
## ao  
  
```python  
ao(candles: np.ndarray, sequential=False) -> AO  
```  
  
Awesome Oscillator  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `sequential`: bool - default=False  
  
**Returns**:  
  
AO(osc, change)  
  
## apo  
  
```python  
apo(candles: np.ndarray, fastperiod=12, slowperiod=26, matype=0, source_type="close", sequential=False) -> Union[  
  float, np.ndarray]  
```  
  
APO - Absolute Price Oscillator  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `fastperiod`: int - default: 12  
- `slowperiod`: int - default: 26  
- `matype`: int - default: 0  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## aroon  
  
```python  
aroon(candles: np.ndarray, period=14, sequential=False) -> AROON  
```  
  
AROON - Aroon  
  
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
  
AROONOSC - Aroon Oscillator  
  
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
  
ATR - Average True Range  
  
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
  
AVGPRICE - Average Price  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## beta  
  
```python  
beta(candles: np.ndarray, period=5, sequential=False) -> Union[float, np.ndarray]  
```  
  
BETA - Beta  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 5  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## bollinger\_bands  
  
```python  
bollinger_bands(candles: np.ndarray, period=20, devup=2, devdn=2, matype=0, source_type="close", sequential=False) -> BollingerBands  
```  
  
BBANDS - Bollinger Bands  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 20  
- `devup`: float - default: 2  
- `devdn`: float - default: 2  
- `matype`: int - default: 0  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
BollingerBands(upperband, middleband, lowerband)  
  
## bollinger\_bands\_width  
  
```python  
bollinger_bands_width(candles: np.ndarray, period=20, devup=2, devdn=2, matype=0, source_type="close", sequential=False) -> Union[float, np.ndarray]  
```  
  
BBW - Bollinger Bands Width - Bollinger Bands Bandwidth  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 20  
- `devup`: float - default: 2  
- `devdn`: float - default: 2  
- `matype`: int - default: 0  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## bop  
  
```python  
bop(candles: np.ndarray, sequential=False) -> Union[float, np.ndarray]  
```  
  
BOP - Balance Of Power  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## cc 
  
```python  
cc(candles: np.ndarray, wma_period=10, roc_short_period=11, roc_long_period=14, source_type="close", sequential=False) -> Union[float, np.ndarray]  
```  
  
Coppock Curve
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `wma_period`: int - default=10
- `roc_short_period`: int - default=11
- `roc_long_period`: int - default=14  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  

## cci  
  
```python  
cci(candles: np.ndarray, period=14, sequential=False) -> Union[float, np.ndarray]  
```  
  
CCI - Commodity Channel Index  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default=14  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  

## chande
  
```python  
chande(candles: np.ndarray, period=22, mult=3.0, direction="long", sequential=False) -> Union[float, np.ndarray]
```  
  
Chandelier Exits
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default=22
- `mult`: float - default=3.0
- `direction`: str - default="long" | "short"
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  

## cmo  
  
```python  
cmo(candles: np.ndarray, period=14, source_type="close", sequential=False) -> Union[float, np.ndarray]  
```  
  
CMO - Chande Momentum Oscillator  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default=14  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  

## correlation_cycle
  
```python  
correlation_cycle(candles: np.ndarray, period=20, threshold=9, source_type="close", sequential=False) -> CC
```  
  
Correlation Cycle, Correlation Angle, Market State - John Ehlers
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 20
- `threshold`: int - default: 9
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
CC(real, imag, angle, state)

## correl  
  
```python  
correl(candles: np.ndarray, period=5, sequential=False) -> Union[float, np.ndarray]  
```  
  
CORREL - Pearson's Correlation Coefficient (r)  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 5  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## cvi  
  
```python  
cvi(candles: np.ndarray, period=5, sequential=False) -> Union[float, np.ndarray]  
```  
  
CVI - Chaikins Volatility  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 5  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## damiani_volatmeter  
  
```python  
damiani_volatmeter(candles: np.ndarray, vis_atr=13, vis_std=20, sed_atr=40, sed_std=100, threshold=1.4, source_type="close", sequential=False) -> DamianiVolatmeter
```  
  
Damiani Volatmeter
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `vis_atr`: int - default: 13  
- `vis_std`: int - default: 20 
- `sed_atr`: int - default: 40  
- `sed_std`: int - default: 100  
- `threshold`: float - default: 1.4  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
DamianiVolatmeter(vol, anti)

## decycler  
  
```python  
decycler(candles: np.ndarray, hp_period=125, source_type="close", sequential=False) -> Union[float, np.ndarray]  
```  
  
Ehlers Simple Decycler  
  
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
  
Ehlers Decycler Oscillator  
  
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
  
DEMA - Double Exponential Moving Average  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 30  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## di  
  
```python  
di(candles: np.ndarray, period=14, sequential=False) -> DI  
```  
  
DI - Directional Indicator  
  
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
  
DM - Directional Movement  
  
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
  
Donchian Channels  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 20  
- `sequential`: bool - default=False  
  
**Returns**:  
  
DonchianChannel(upperband, middleband, lowerband)  
  
## dpo  
  
```python  
dpo(candles: np.ndarray, period=5, source_type="close", sequential=False) -> Union[float, np.ndarray]  
```  
  
DPO - Detrended Price Oscillator  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 5  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  

## dti
  
```python  
dti(candles: np.ndarray, r=14, s=10, u=5, sequential=False) -> Union[float, np.ndarray]
```  
  
DTI by William Blau
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `r`: int - default: 14  
- `s`: int - default: 10  
- `u`: int - default: 5  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## dx  
  
```python  
dx(candles: np.ndarray, period=14, sequential=False) -> Union[float, np.ndarray]  
```  
  
DX - Directional Movement Index  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 14  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  

## efi
  
```python  
efi(candles: np.ndarray, period=13, source_type="close", sequential=False) -> Union[float, np.ndarray]
```  
  
EFI - Elders Force Index
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 13  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  

## ema  
  
```python  
ema(candles: np.ndarray, period=5, source_type="close", sequential=False) -> Union[float, np.ndarray]  
```  
  
EMA - Exponential Moving Average  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 5  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## emd  
  
```python  
emd(candles: np.ndarray, period=20, delta=0.5, fraction=0.1, sequential=False) -> EMD  
```  
  
Empirical Mode Decomposition by John F. Ehlers and Ric Way  
  
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
emv(candles: np.ndarray, sequential=False) -> Union[float, np.ndarray]  
```  
  
EMV - Ease of Movement  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## fisher  
  
```python  
fisher(candles: np.ndarray, period=9, sequential=False) -> FisherTransform  
```  
  
The Fisher Transform helps identify price reversals.  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 9  
- `sequential`: bool - default=False  
  
**Returns**:  
  
FisherTransform(fisher, signal)  
  
## fosc  
  
```python  
fosc(candles: np.ndarray, period=5, source_type="close", sequential=False) -> Union[float, np.ndarray]  
```  
  
FOSC - Forecast Oscillator  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 5  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## frama  
  
```python  
frama(candles: np.ndarray, window=10, FC=1, SC=300, sequential=False) -> Union[float, np.ndarray]  
```  
  
Fractal Adaptive Moving Average (FRAMA)  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `window`: int - default: 10  
- `FC`: int - default: 1  
- `SC`: int - default: 300  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## gatorosc  
  
```python  
gatorosc(candles: np.ndarray, source_type="close", sequential=False) -> GATOR  
```  
  
Gator Oscillator by Bill M. Williams  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
GATOR(upper, lower, upper_change, lower_change)  
  
## gauss  
  
```python  
gauss(candles: np.ndarray, period=14, poles=4, source_type="close", sequential=False) -> Union[float, np.ndarray]  
```  
  
Gaussian Filter  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default=14  
- `poles`: int - default=4  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## high_pass  
  
```python  
high_pass(candles: np.ndarray, period=48, source_type="close", sequential=False) -> Union[float, np.ndarray]
```  
  
High Pass Filter indicator by John F. Ehlers
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 48  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray 

## hma  
  
```python  
hma(candles: np.ndarray, period=5, source_type="close", sequential=False) -> Union[float, np.ndarray]  
```  
  
Hull Moving Average  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 5  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## ht\_dcperiod  
  
```python  
ht_dcperiod(candles: np.ndarray, source_type="close", sequential=False) -> Union[float, np.ndarray]  
```  
  
HT_DCPERIOD - Hilbert Transform - Dominant Cycle Period  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## ht\_dcphase  
  
```python  
ht_dcphase(candles: np.ndarray, source_type="close", sequential=False) -> Union[float, np.ndarray]  
```  
  
HT_DCPHASE - Hilbert Transform - Dominant Cycle Phase  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## ht\_phasor  
  
```python  
ht_phasor(candles: np.ndarray, source_type="close", sequential=False) -> IQ  
```  
  
HT_PHASOR - Hilbert Transform - Phasor Components  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
IQ(inphase, quadrature)  
  
## ht\_sine  
  
```python  
ht_sine(candles: np.ndarray, source_type="close", sequential=False) -> SINEWAVE  
```  
  
HT_SINE - Hilbert Transform - SineWave  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
SINEWAVE(sine, lead)  
  
## ht\_trendline  
  
```python  
ht_trendline(candles: np.ndarray, source_type="close", sequential=False) -> Union[float, np.ndarray]  
```  
  
HT_TRENDLINE - Hilbert Transform - Instantaneous Trendline  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## ht\_trendmode  
  
```python  
ht_trendmode(candles: np.ndarray, source_type="close", sequential=False) -> Union[float, np.ndarray]  
```  
  
HT_TRENDMODE - Hilbert Transform - Trend vs Cycle Mode  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
int | np.ndarray  
  
## ichimoku\_cloud  
  
```python  
ichimoku_cloud(candles: np.ndarray, conversion_line_period=9, base_line_period=26, lagging_line_period=52, displacement=26) -> IchimokuCloud  
```  
  
Ichimoku Cloud  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `conversion_line_period`: int - default=9  
- `base_line_period`: int - default=26  
- `lagging_line_period`: int - default=52  
- `displacement`: - default=26  
  
**Returns**:  
  
IchimokuCloud(conversion_line, base_line, span_a, span_b)  

## ichimoku_cloud_seq  
  
```python  
ichimoku_cloud_seq(candles: np.ndarray, conversion_line_period=9, base_line_period=26, lagging_line_period=52,displacement=26, sequential=False) -> IchimokuCloud
```  
  
Ichimoku Cloud Sequential
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `conversion_line_period`: int - default=9  
- `base_line_period`: int - default=26  
- `lagging_line_period`: int - default=52  
- `displacement`: - default=26  
  
**Returns**:  
  
IchimokuCloud(conversion_line, base_line, span_a, span_b, lagging_line, future_span_a, future_span_b)
  
## itrend  
  
```python  
itrend(candles: np.ndarray, alpha=0.07, source_type="hl2", sequential=False) -> ITREND  
```  
  
Instantaneous Trendline  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `alpha`: float - default: 0.07  
- `source_type`: str - default: "hl2"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
ITREND(signal, it, trigger)  
  
## kama  
  
```python  
kama(candles: np.ndarray, period=30, source_type="close", sequential=False) -> Union[float, np.ndarray]  
```  
  
KAMA - Kaufman Adaptive Moving Average  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 30  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## keltner  
  
```python  
keltner(candles: np.ndarray, period=20, multiplier=2, matype=1, source_type="close", sequential=False) -> KeltnerChannel  
```  
  
Keltner Channels  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 20  
- `multiplier`: int - default: 2  
- `matype`: int - default: 1  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
KeltnerChannel(upperband, middleband, lowerband)  

## kst  
  
```python  
kst(candles: np.ndarray, sma_period1=10, sma_period2=10, sma_period3=10, sma_period4=15, roc_period1=10, roc_period2=15, roc_period3=20, roc_period4=30, signal_period=9, source_type="close", sequential=False) -> KST: 
```  
  
Know Sure Thing (KST)
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `sma_period1`: int - default: 10
- `sma_period2`: int - default: 10  
- `sma_period3`: int - default: 10  
- `sma_period4`: int - default: 15  
- `roc_period1`: int - default: 10  
- `roc_period2`: int - default: 15  
- `roc_period3`: int - default: 20  
- `roc_period4`: int - default: 30  
- `signal_period`: int - default: 9  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
KST(line, signal)

## kvo  
  
```python  
kvo(candles: np.ndarray, short_period=2, long_period=5, sequential=False) -> Union[float, np.ndarray]  
```  
  
KVO - Klinger Volume Oscillator  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `short_period`: int - default: 2  
- `long_period`: int - default: 5  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## linearreg  
  
```python  
linearreg(candles: np.ndarray, period=14, source_type="close", sequential=False) -> Union[float, np.ndarray]  
```  
  
LINEARREG - Linear Regression  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 14  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## linearreg\_angle  
  
```python  
linearreg_angle(candles: np.ndarray, period=14, source_type="close", sequential=False) -> Union[float, np.ndarray]  
```  
  
LINEARREG_ANGLE - Linear Regression Angle  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 14  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## linearreg\_intercept  
  
```python  
linearreg_intercept(candles: np.ndarray, period=14, source_type="close", sequential=False) -> Union[float, np.ndarray]  
```  
  
LINEARREG_INTERCEPT - Linear Regression Intercept  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 14  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## linearreg\_slope  
  
```python  
linearreg_slope(candles: np.ndarray, period=14, source_type="close", sequential=False) -> Union[float, np.ndarray]  
```  
  
LINEARREG_SLOPE - Linear Regression Slope  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 14  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## lrsi  
  
```python  
lrsi(candles: np.ndarray, alpha=0.2, sequential=False) -> Union[float, np.ndarray]  
```  
  
RSI Laguerre Filter  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `alpha`: float - default=0.2  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## macd  
  
```python  
macd(candles: np.ndarray, fastperiod=12, slowperiod=26, signalperiod=9, source_type="close", sequential=False) -> MACD  
```  
  
MACD - Moving Average Convergence/Divergence  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `fastperiod`: int - default: 12  
- `slow_period`: int - default: 26  
- `signal_period`: int - default: 9  
- `source_type`: str - default: "close"  
- `sequential`: bool - default: False  
  
**Returns**:  
  
MACD(macd, signal, hist)  
  
## macdext  
  
```python  
macdext(candles: np.ndarray, fastperiod=12, fastmatype=0, slowperiod=26, slowmatype=0, signalperiod=9, signalmatype=0, source_type="close", sequential=False) -> MACDEXT  
```  
  
MACDEXT - MACD with controllable MA type  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `fastperiod`: int - default: 12  
- `fastmatype`: int - default: 0  
- `slow_period`: int - default: 26  
- `slowmatype`: int - default: 0  
- `signal_period`: int - default: 9  
- `signalmatype`: int - default: 0  
- `source_type`: str - default: "close"  
- `sequential`: bool - default: False  
  
**Returns**:  
  
MACDEXT(macd, signal, hist)  
  
## mama  
  
```python  
mama(candles: np.ndarray, fastlimit=0.5, slowlimit=0.05, source_type="close", sequential=False) -> MAMA  
```  
  
MAMA - MESA Adaptive Moving Average  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `fastlimit`: float - default: 0.5  
- `slowlimit`: float - default: 0.05  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
MAMA(mama, fama)  
  
## marketfi  
  
```python  
marketfi(candles: np.ndarray, sequential=False) -> Union[float, np.ndarray]  
```  
  
MARKETFI - Market Facilitation Index  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## mass  
  
```python  
mass(candles: np.ndarray, period=5, sequential=False) -> Union[float, np.ndarray]  
```  
  
MASS - Mass Index  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 5  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## mcginley_dynamic
  
```python  
mcginley_dynamic(candles: np.ndarray, period=10, k=0.6, source_type="close", sequential=False) -> Union[float, np.ndarray]
```  
  
McGinley Dynamic
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 10  
- `k`: float - default: 0.6
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  

## medprice  
  
```python  
medprice(candles: np.ndarray, sequential=False) -> Union[float, np.ndarray]  
```  
  
MEDPRICE - Median Price  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## mfi  
  
```python  
mfi(candles: np.ndarray, period=14, sequential=False) -> Union[float, np.ndarray]  
```  
  
MFI - Money Flow Index  
  
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
  
MIDPOINT - MidPoint over period  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default=14  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## midprice  
  
```python  
midprice(candles: np.ndarray, period=14, sequential=False) -> Union[float, np.ndarray]  
```  
  
MIDPRICE - Midpoint Price over period  
  
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
  
minmax - Get extrema  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `order`: int - default = 3  
- `sequential`: bool - default=False  
  
**Returns**:  
  
EXTREMA(min, max, last_min, last_max)  
  
## mom  
  
```python  
mom(candles: np.ndarray, period=10, source_type="close", sequential=False) -> Union[float, np.ndarray]  
```  
  
MOM - Momentum  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default=10  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## msw  
  
```python  
msw(candles: np.ndarray, period=5, source_type="close", sequential=False) -> MSW  
```  
  
MSW - Mesa Sine Wave  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 5  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
MSW(sine, lead)  
  
## natr  
  
```python  
natr(candles: np.ndarray, period=14, sequential=False) -> Union[float, np.ndarray]  
```  
  
NATR - Normalized Average True Range  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default=14  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## nvi  
  
```python  
nvi(candles: np.ndarray, source_type="close", sequential=False) -> Union[float, np.ndarray]  
```  
  
NVI - Negative Volume Index  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## obv  
  
```python  
obv(candles: np.ndarray, sequential=False) -> Union[float, np.ndarray]  
```  
  
OBV - On Balance Volume  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## pattern\_recognition  
  
```python  
pattern_recognition(candles: np.ndarray, pattern_type, penetration=0, sequential=False) -> Union[int, np.ndarray]  
```  
  
Pattern Recognition  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `penetration`: int - default = 0  
- `pattern_type`: str  
- `sequential`: bool - default=False  
  
**Returns**:  
  
int | np.ndarray  

::: tip Available pattern_type
-   CDL2CROWS - Two Crows
-   CDL3BLACKCROWS - Three Black Crows
-   CDL3INSIDE - Three Inside Up/Down
-   CDL3LINESTRIKE - Three-Line Strike
-   CDL3OUTSIDE - Three Outside Up/Down
-   CDL3STARSINSOUTH - Three Stars In The South
-   CDL3WHITESOLDIERS - Three Advancing White Soldiers
-   CDLABANDONEDBABY - Abandoned Baby
-   CDLADVANCEBLOCK - Advance Block
-   CDLBELTHOLD - Belt-hold
-   CDLBREAKAWAY - Breakaway
-   CDLCLOSINGMARUBOZU - Closing Marubozu
-   CDLCONCEALBABYSWALL - Concealing Baby Swallow
-   CDLCOUNTERATTACK - Counterattack
-   CDLDARKCLOUDCOVER - Dark Cloud Cover
-   CDLDOJI - Doji
-   CDLDOJISTAR - Doji Star
-   CDLDRAGONFLYDOJI - Dragonfly Doji
-   CDLENGULFING - Engulfing Pattern
-   CDLEVENINGDOJISTAR - Evening Doji Star
-   CDLEVENINGSTAR - Evening Star
-   CDLGAPSIDESIDEWHITE - Up/Down-gap side-by-side white lines
-   CDLGRAVESTONEDOJI - Gravestone Doji
-   CDLHAMMER - Hammer
-   CDLHANGINGMAN - Hanging Man
-   CDLHARAMI - Harami Pattern
-   CDLHARAMICROSS - Harami Cross Pattern
-   CDLHIGHWAVE - High-Wave Candle
-   CDLHIKKAKE - Hikkake Pattern
-   CDLHIKKAKEMOD - Modified Hikkake Pattern
-   CDLHOMINGPIGEON - Homing Pigeon
-   CDLIDENTICAL3CROWS - Identical Three Crows
-   CDLINNECK - In-Neck Pattern
-   CDLINVERTEDHAMMER - Inverted Hammer
-   CDLKICKING - Kicking
-   CDLKICKINGBYLENGTH - Kicking - bull/bear determined by the longer marubozu
-   CDLLADDERBOTTOM - Ladder Bottom
-   CDLLONGLEGGEDDOJI - Long Legged Doji
-   CDLLONGLINE - Long Line Candle
-   CDLMARUBOZU - Marubozu
-   CDLMATCHINGLOW - Matching Low
-   CDLMATHOLD - Mat Hold
-   CDLMORNINGDOJISTAR - Morning Doji Star
-   CDLMORNINGSTAR - Morning Star
-   CDLONNECK - On-Neck Pattern
-   CDLPIERCING - Piercing Pattern
-   CDLRICKSHAWMAN - Rickshaw Man
-   CDLSEPARATINGLINES - Separating Lines
-   CDLSHOOTINGSTAR - Shooting Star
-   CDLSHORTLINE - Short Line Candle
-   CDLSTALLEDPATTERN - Stalled Pattern
-   CDLTAKURI - Takuri (Dragonfly Doji with very long lower shadow)
-   CDLTHRUSTING - Thrusting Pattern
-   CDLUNIQUE3RIVER - Unique 3 River
-   CDLXSIDEGAP3METHODS - Upside/Downside Gap Three Methods
:::

## pivot  
  
```python  
pivot(candles: np.ndarray, mode=0, sequential=False) -> PIVOT  
```  
  
Pivot Points  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `mode`: int - default = 0  
- `sequential`: bool - default=False  
  
**Returns**:  
  
PIVOT(r4, r3, r2, r1, pp, s1, s2, s3, s4)  
  
## ppo  
  
```python  
ppo(candles: np.ndarray, fastperiod=12, slowperiod=26, matype=0, source_type="close", sequential=False) -> Union[  
  float, np.ndarray]  
```  
  
PPO - Percentage Price Oscillator  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `fastperiod`: int - default: 12  
- `slowperiod`: int - default: 26  
- `matype`: int - default: 0  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## pvi  
  
```python  
pvi(candles: np.ndarray, source_type="close", sequential=False) -> Union[float, np.ndarray]  
```  
  
PVI - Positive Volume Index  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## qstick  
  
```python  
qstick(candles: np.ndarray, period=5, sequential=False) -> Union[float, np.ndarray]  
```  
  
Qstick  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 5  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  

## reflex  
  
```python  
reflex(candles: np.ndarray, period=20, source_type="close", sequential=False) -> Union[float, np.ndarray]
```  
  
Reflex indicator by John F. Ehlers
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 20  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  

## roc  
  
```python  
roc(candles: np.ndarray, period=10, source_type="close", sequential=False) -> Union[float, np.ndarray]  
```  
  
ROC - Rate of change : ((price/prevPrice)-1)*100  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default=10  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  

## rocp  
  
```python  
rocp(candles: np.ndarray, period=10, source_type="close", sequential=False) -> Union[float, np.ndarray]  
```  
  
ROCP - Rate of change Percentage: (price-prevPrice)/prevPrice  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default=10  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## rocr  
  
```python  
rocr(candles: np.ndarray, period=10, source_type="close", sequential=False) -> Union[float, np.ndarray]  
```  
  
ROCR - Rate of change ratio: (price/prevPrice)  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default=10  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## rocr100  
  
```python  
rocr100(candles: np.ndarray, period=10, source_type="close", sequential=False) -> Union[float, np.ndarray]  
```  
  
ROCR100 - Rate of change ratio 100 scale: (price/prevPrice)*100  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default=10  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## roofing  
  
```python  
roofing(candles: np.ndarray, hp_period=48, lp_period=10, source_type="close", sequential=False) -> Union[float, np.ndarray]
```  
  
Roofing Filter indicator by John F. Ehlers
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `hp_period`: int - default: 48  
- `lp_period`: int - default: 10  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  

## rsi  
  
```python  
rsi(candles: np.ndarray, period=14, source_type="close", sequential=False) -> Union[float, np.ndarray]  
```  
  
RSI - Relative Strength Index  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 14  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
 ## rsi  
  
```python  
rsx(candles: np.ndarray, period=14, source_type="close", sequential=False) -> Union[float, np.ndarray]
```  
  
RSX - Relative Strength Xtra
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 14  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  

## sar  
  
```python  
sar(candles: np.ndarray, acceleration=0.02, maximum=0.2, sequential=False) -> Union[float, np.ndarray]  
```  
  
SAR - Parabolic SAR  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `acceleration`: float - default: 0.02  
- `maximum`: float - default: 0.2  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## sarext  
  
```python  
sarext(candles: np.ndarray, startvalue=0, offsetonreverse=0, accelerationinitlong=0, accelerationlong=0, accelerationmaxlong=0, accelerationinitshort=0, accelerationshort=0, accelerationmaxshort=0, sequential=False) -> Union[float, np.ndarray]  
```  
  
SAREXT - Parabolic SAR - Extended  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `startvalue`: float - default: 0  
- `offsetonreverse`: float - default: 0  
- `accelerationinitlong`: float - default: 0  
- `accelerationlong`: float - default: 0  
- `accelerationmaxlong`: float - default: 0  
- `accelerationinitshort`: float - default: 0  
- `accelerationshort`: float - default: 0  
- `accelerationmaxshort`: float - default: 0  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## sma  
  
```python  
sma(candles: np.ndarray, period=5, source_type="close", sequential=False) -> Union[float, np.ndarray]  
```  
  
SMA - Simple Moving Average  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 5  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## smma  
  
```python  
smma(candles: np.ndarray, period=5, source_type="close", sequential=False) -> Union[float, np.ndarray]  
```  
  
SMMA - Smoothed Moving Average  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 5  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## srsi  
  
```python  
srsi(candles: np.ndarray, period=14, source_type="close", sequential=False) -> StochasticRSI  
```  
  
Stochastic RSI  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 14  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
StochasticRSI(k, d)  
  
## stddev  
  
```python  
stddev(candles: np.ndarray, period=5, nbdev=1, source_type="close", sequential=False) -> Union[float, np.ndarray]  
```  
  
STDDEV - Standard Deviation  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 5  
- `nbdev`: int - default: 1  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## stoch  
  
```python  
stoch(candles: np.ndarray, fastk_period=14, slowk_period=3, slowk_matype=0, slowd_period=3, slowd_matype=0, sequential=False) -> Stochastic  
```  
  
The Stochastic Oscillator  
  
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
  
Stochastic Fast  
  
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
supersmoother(candles: np.ndarray, cutoff=14, source_type="close", sequential=False) -> Union[float, np.ndarray]  
```  
  
Super Smoother Filter 2pole Butterworth  
This indicator was described by John F. Ehlers  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `cutoff`: int - default=14  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## supertrend  
  
```python  
supertrend(candles: np.ndarray, period=10, factor=3, sequential=False) -> SuperTrend  
```  
  
SuperTrend  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default=14  
- `factor`: int - default=3  
- `sequential`: bool - default=False  
  
**Returns**:  
  
SuperTrend(trend, changed)  
  
## t3  
  
```python  
t3(candles: np.ndarray, period=5, vfactor=0, source_type="close", sequential=False) -> Union[float, np.ndarray]  
```  
  
T3 - Triple Exponential Moving Average (T3)  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 5  
- `vfactor`: float - default: 0  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## tema  
  
```python  
tema(candles: np.ndarray, period=9, source_type="close", sequential=False) -> Union[float, np.ndarray]  
```  
  
TEMA - Triple Exponential Moving Average  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 9  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## trange  
  
```python  
trange(candles: np.ndarray, sequential=False) -> Union[float, np.ndarray]  
```  
  
TRANGE - True Range  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## trendflex  
  
```python  
trendflex(candles: np.ndarray, period=20, source_type="close", sequential=False) -> Union[float, np.ndarray]
```  
  
Trendflex indicator by John F. Ehlers
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 20  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  

## trima  
  
```python  
trima(candles: np.ndarray, period=30, source_type="close", sequential=False) -> Union[float, np.ndarray]  
```  
  
TRIMA - Triangular Moving Average  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 30  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## trix  
  
```python  
trix(candles: np.ndarray, period=18, source_type="close", sequential=False) -> Union[float, np.ndarray]  
```  
  
TRIX - 1-day Rate-Of-Change (ROC) of a Triple Smooth EMA  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 18  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## tsf  
  
```python  
tsf(candles: np.ndarray, period=14, source_type="close", sequential=False) -> Union[float, np.ndarray]  
```  
  
TSF - Time Series Forecast  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 14  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## tsi  
  
```python  
tsi(candles: np.ndarray, long_period=25, short_period=13, source_type="close", sequential=False) -> Union[  
  float, np.ndarray]  
```  
  
True strength index (TSI)  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `long_period`: int - default: 25  
- `short_period`: int - default: 13  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## typprice  
  
```python  
typprice(candles: np.ndarray, sequential=False) -> Union[float, np.ndarray]  
```  
  
TYPPRICE - Typical Price  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## ultosc  
  
```python  
ultosc(candles: np.ndarray, timeperiod1=7, timeperiod2=14, timeperiod3=28, sequential=False) -> Union[  
  float, np.ndarray]  
```  
  
ULTOSC - Ultimate Oscillator  
  
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
  
VAR - Variance  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default=14  
- `nbdev`: int - default=1  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## vi
  
```python  
vi(candles: np.ndarray, period=14, sequential=False) -> VI  
```  
  
Vortex Indicator (VI) 
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default=14  
- `sequential`: bool - default=False  
  
**Returns**:  
  
VI(plus, minus)  

## vidya  
  
```python  
vidya(candles: np.ndarray, short_period=2, long_period=5, alpha=0.2, source_type="close", sequential=False) -> Union[float, np.ndarray]  
```  
  
VIDYA - Variable Index Dynamic Average  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `short_period`: int - default: 2  
- `long_period`: int - default: 5  
- `alpha`: float - default: 0.2  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
 
## vpci
  
```python  
vpci(candles: np.ndarray, short_range=5, long_range=25, sequential=False) -> VPCI
```  
  
VPCI - Volume Price Confirmation Indicator
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `short_range`: int - default: 5
- `long_range`: int - default: 25
- `sequential`: bool - default=False  
  
**Returns**:  
  
VPCI(vpci, vpcis)

## vosc  
  
```python  
vosc(candles: np.ndarray, short_period=2, long_period=5, sequential=False) -> Union[float, np.ndarray]  
```  
  
VOSC - Volume Oscillator  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `short_period`: int - default: 2  
- `long_period`: int - default: 5  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  

## voss  
  
```python  
voss(candles: np.ndarray, period=20, predict=3, bandwith=0.25, source_type="close", sequential=False) -> VossFilter
```  
  
Voss - Voss Filter indicator by John Ehlers
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 20  
- `predict`: int - default: 3  
- `bandwith`: float - default: 0.25  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
VossFilter(voss, filt) 


## vpt  
  
```python  
vpt(candles: np.ndarray, source_type="close", sequential=False) -> Union[float, np.ndarray]  
```  
  
VPT - Volume Price Trend
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## vwma  
  
```python  
vwma(candles: np.ndarray, period=20, source_type="close", sequential=False) -> Union[float, np.ndarray]  
```  
  
VWMA - Volume Weighted Moving Average  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 20  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## vwmacd  
  
```python  
vwmacd(candles: np.ndarray, fastperiod=12, slowperiod=26, signalperiod=9, sequential=False) -> VWMACD  
```  
  
VWMACD - Volume Weighted Moving Average Convergence/Divergence  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `fastperiod`: int - default: 12  
- `slow_period`: int - default: 26  
- `signal_period`: int - default: 9  
- `sequential`: bool - default: False  
  
**Returns**:  
  
VWMACD(macd, signal, hist)  
  
## wad  
  
```python  
wad(candles: np.ndarray, sequential=False) -> Union[float, np.ndarray]  
```  
  
WAD - Williams Accumulation/Distribution  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## wclprice  
  
```python  
wclprice(candles: np.ndarray, sequential=False) -> Union[float, np.ndarray]  
```  
  
WCLPRICE - Weighted Close Price  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## wilders  
  
```python  
wilders(candles: np.ndarray, period=5, source_type="close", sequential=False) -> Union[float, np.ndarray]  
```  
  
WILDERS - Wilders Smoothing  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 5  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## willr  
  
```python  
willr(candles: np.ndarray, period=14, sequential=False) -> Union[float, np.ndarray]  
```  
  
WILLR - Williams' %R  
  
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
  
WMA - Weighted Moving Average  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 30  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## zlema  
  
```python  
zlema(candles: np.ndarray, period=20, source_type="close", sequential=False) -> Union[float, np.ndarray]  
```  
  
Zero-Lag Exponential Moving Average  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 20  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray  
  
## zscore  
  
```python  
zscore(candles: np.ndarray, period=14, matype=0, nbdev=1, source_type="close", sequential=False) -> Union[  
  float, np.ndarray]  
```  
  
zScore  
  
**Arguments**:  
  
- `candles`: np.ndarray  
- `period`: int - default: 14  
- `matype`: int - default: 0  
- `nbdev`: int - default: 1  
- `source_type`: str - default: "close"  
- `sequential`: bool - default=False  
  
**Returns**:  
  
float | np.ndarray
