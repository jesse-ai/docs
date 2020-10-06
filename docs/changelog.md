# Changelog

Here you can see that changes were made at each release. 

## 0.12.2
- Added the `--cpu` option for the optimize mode to specify the number of cpu cores to use when running the optimize mode. 
- Improved monitoring dashboard of the optimization mode. 

## 0.12.1
- Renamed `hyper_parameters()` method to `hyperparameters()`
- Fixed `--dna` flag in "jesse routes" command
- Improved error detection in the optimize mode
- Fixed when few of DNA trials caused optimize session to fail entirely
- Optimize mode's traceback is now printed to a log file
- Improved optimize mode's monitoring dashboard
- Fixed an issue with newly created projects missing the log directory
- Added `.csv` and `.json` files to gitignore of newly created projects

## 0.11.0
- Implemented the initial version of the optimize mode which uses the Genetic Algorithm to find the best parameters for your strategy. 

## 0.10.0
- Suppression of the "FutureWarning: pandas.util.testing is deprecated" caused by empyrical
- Added KST indicator
- Added Coppock curve indicator
- Added vortex indicator
- Added EFI indicator
- Added Chandelier Exit indicator
- Update of scipy and matplotlib
- Fixed issue related to NegativeBalance
- Some fixes and additions related to pytest

## 0.9.0
- Refactored directories that generated output files are stored at (csv, json, tradingview, charts). 
- `json` logs files are disabled by default. You now HAVE TO use the `json` flag to enable it. 
- Added CSV output for completed trades by [h0ke](https://github.com/h0ke).

## 0.8.2
- Added exception for when trying to spend more than available exchange balance by [fengkiej](https://github.com/fengkiej)
- Added [fee_rate](/docs/strategies/api.html#fee-rate) property to Strategy API
- Added `fee_rate` as optional parameter for [risk_to_qty](/docs/utils.html#risk-to-qty) and [size_to_qty](/docs/utils.html#size-to-qty) utilities
- Added readable error for when strategy structure is incorrect
- [numpy_candles_to_dataframe](https://docs.jesse.trade/docs/utils.html#numpy-candles-to-dataframe) now uses Pandas datetime format for candle timestamps by [lightyear15](https://github.com/lightyear15)
- Improved exception text for unsupported exchanges

## 0.7.1
- Added the [\_\_init\_\_](./entering-and-exiting.html#init) method to the strategy API
- Added the [terminate()](./entering-and-exiting.html#terminate) method to the strategy API
- Added validation for `qty==0`
- Added additional parameters to srsi indicator by [Gabri](https://github.com/Gabri)


## 0.6.3
- Fix issue [#34](https://github.com/jesse-ai/jesse/issues/34)
- Made filter misusage exception more readable
- Added new ratios in metrics: Calmar, Sortino, Omega
- Improve TradingView output by [Gabri](https://github.com/Gabri)
- Added supersmoother indicator
- Added gauss indicator
- Added itrend indicator
- Added faulty indicator
- Added beta indicator
- Added LINEARREG_ANGLE - Linear Regression Angle indicator
- Added LINEARREG - Linear Regression indicator
- Added AVGPRICE - Average Price indicator
- Added VWMACD - Volume Weighted Moving Average Convergence/Divergence indicator
- Added AD - Chaikin A/D Line indicator
- Added keltner indicator by [jeremytregunna](https://github.com/jeremytregunna)

## 0.5.0
- Fixed an [issue](https://forum.jesse.trade/d/37-strange-behavior-on-filters) with filters. 
- Fixed an [issue](https://github.com/jesse-ai/jesse/issues/19) with CWD
- Added new indicators: Hull Moving Average, Zero-Lag Exponential Moving Average, Donchian Channels, Empirical Mode Decomposition, RSI Laguerre Filter, True strength index (TSI), Fractal Adaptive Moving Average (FRAMA), Awesome Oscillator, Alligator, SMMA (Smoothed Moving Average)

## 0.4.0
- Added [Tulipy](https://pypi.org/project/tulipy/) library as a dependency. 
- Added [vwma](./indicators/reference.html#vwma), [srsi](./indicators/reference.html#srsi), and [fisher](./indicators/reference.html#fisher) indicators. 
- Added support for `8h` timeframe.
- Removed the wrong time estimation for import-candles mode. [PR](https://github.com/jesse-ai/jesse/pull/14/files) by [0xVox](https://github.com/0xVox).
