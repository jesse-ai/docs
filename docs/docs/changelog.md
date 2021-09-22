# Changelog

Here you can see that changes were made at each release of the main framework. To read the changes of the live trade plugin, check out the "[releases](https://jesse.trade/releases)" page of the website. 


## 0.26.0
- [NEW FEATURE] Add `combinations_without_repeat` utility to create unique combinations. Useful for optimize mode.
- [NEW FEATURE] New indicators: Arnaud Legoux Moving Average, Holt-Winter Moving Average, Natural Moving Average, Ehlers Distance Coefficient Filter, Moving Average Bands, Ulcer Index, Moving Average Adaptive Q, MWDX Average, Variable Length Moving Average, Square Root Weighted Moving Average, Squared Weighted Moving Average, Variable Power Weighted Moving Average, Cubed Weighted Moving Average, JSA Moving Average, End Point Moving Average, Ehlers Predictive Moving Average, Wavetrend, Hurst Exponent
- [NEW FEATURE] - New Moving Averages added to the `ma` indicator.
- [Improvement] Minor code optimizations. 
- [Improvement] Packages updated - Update websocket-client from 1.1.0 to 1.1.1, Update scipy from 1.7.0 to 1.7.1, Update pandas from 1.3.0 to 1.3.1, Update numpy from 1.20.3 to 1.21.1, Update pydash from 5.0.1 to 5.0.2, Update requests from 2.25.1 to 2.26.0, Update ta-lib from 0.4.20 to 0.4.21
- [FIX] The `ma` indicator now better handles volume which is needed for `vwap` and `vwma`.
- [FIX] The `kaufmanstop` now uses the correct formula for long and now supports the `matype` parameter.

## 0.25.0

- [NEW FEATURE] Introduces a plugin-based system for exchange drivers. 
- [BREAKING] Requires a `plugins.py` present in the project. 
- [CHANGE] Adjustments in the candle store as was required by the live trade mode. 
- Minor bug fixes

## 0.24.0
- [NEW FEATURE] Added new utility functions that are used in statistical analysis of the prices such as for writing statistical arbitrage strategies: z_score, are_cointegrated, prices_to_returns
- [IMPROVEMENT] Refactored how we execute routes in the live trade mode so the order of execution is the same as defined in the `routes.py` file. This makes it possible to write strategies that depend on it such as statistical arbitrage. 
- [IMPROVEMENT] Added support for M1 macs. 
- [CHANGE] The `numba` package has become an optional package which was a requirement for supporting M1 macs. Now `numba` won't be installed by default. This means, if you are an M1 user, you don’t have to install `numba ` and you can install Jesse as before and it will work just fine. If you are NOT an M1 user, then you can still take advantage of `numba` by installing it through running `pip install numba`. 
- [IMPROVEMENT] Minor bug fixes

## 0.23.0
- [NEW FEATURE] Added `self.log` method for easier logging from withing the strategy file. 
- [NEW FEATURE] Added new properties to the Strategy API: `liquidation_price`, `mark_price`, `funding_rate`, `next_funding_timestamp`
- [NEW FEATURE] Implemented the liquidation mechanism for the `isolated` mode in backtests, and both `isolated` and `cross` in live mode. 
- [NEW FEATURE] New indicators: Jurik Moving Average, Chande Kroll Stop, Choppiness Index, Pascals Weighted Moving Average, Symmetric Weighted Moving Average, Bandpass filter, Inverse Fisher Transform applied on RSI, KDJ
- [NEW FEATURE] `devstop`, `rvi`, and `zscore` indicators now let you choose the `devtype`.
- [Improvement] Packages updated - Update matplotlib from 3.4.1 to 3.4.2, Update numpy from 1.20.2 to 1.20.3, Update ta-lib from 0.4.19 to 0.4.20, Update websocket-client from 0.59.0 to 1.0.1, Update click from 7.1.2 to 8.0.1 
- [Improvement] Available `matypes` used in some indicators extended.
- [Improvement] Improved handling of none string values in the logger

## 0.22.0
- [BREAKING CHANGE] For consistency `ta.vwmacd` now accepts `signal_period` instead of `signalperiod`
- [Improvement] Updated Docker images. By [TheCrazyLex](https://github.com/TheCrazyLex). 
- [Improvement] Packages updated -  scipy from `1.6.2` to `1.6.3`, arrow from `1.0.3` to `1.1.0`, quantstats from `0.0.30` to `0.0.32`, websocket-client from `0.58.0` to `0.59.0`, quantstats from `0.0.32` to `0.0.34`, pytest from `6.2.3` to `6.2.4`
- [Improvement] Rounding for live or paper now uses the required precision from the exchange. Could have caused exceptions before for coins with exotic precision requirement.
- [Improvement] `risk_to_qty` and `size_to_qty` now round the qty down. As in some conditions the qty would otherwise exceed the `self.available_margin` / `self.capital` leading to the InsufficientMargin exception.
- [Improvement] `risk_to_qty` now also accepts `precision` parameter.
- [Improvement] The full report (quantstats) now uses 365 trading days for the metrics which makes its calculations crypto friendly. By [sbkhosh](https://github.com/sbkhosh) and [mblum](https://github.com/mblum). 
- [Improvement] The ExampleStrategy imports ta and utils by default now.
- [FIX] Error in `ta.minmax` solved.  Namedtuple changed: `min -> is_min ` and  `max -> is_max`
- [FIX] Setting configs via environment variables now also works when spaces are involved. By [julesGoullee](https://github.com/julesGoullee). 
- [NEW FEATURE] New indicator: Polarized Fractal Efficiency (PFE)

## 0.21.3
- [NEW FEATURE] Added HTML reports with a more complete set of metrics and charts enabled by the `--full-reports` flag in your backtests. By [nicolay-zlobin](https://github.com/nicolay-zlobin). 
- [NEW FEATURE] New indicators: Elder Ray Index (ERI), ttm_trend, kurtosis, mean_ad, median_ad, skewness
- [Improvement] Added a check for the right symbol format (with dash) for the import candle mode - preventing possible confusion and resulting errors.
- [Improvement] A @cached property has been added to improve performance and avoid unnecessary repeated calculations. It's applied where sensible in the Strategy class and available via import to be used on indicators inside a users Strategy as well. Some strategies might see a huge boost because of this. 
- [Improvement] All indicators now use the helper functions same_length and slice_candles. 
- [Improvement] `self.metrics` is now only calculated if a trade happened leading to a performance boost. 
- [Improvement] The old way of working with strings in python (format) has been replaced with much faster f-strings leading to a performance boost. 
- [FIX] Incorrect InsufficientMargin exceptions that were caused by reduce_only orders. 
- [FIX] An error with the json export of the backtest that occurred is now fixed.
- [FIX] Using futures mode you had to add all the used assets to the config.py file - although that should have only been needed for spot mode. This is not necessary anymore. Additionally the spot mode now gives clearer error if assets are missing in the config.
- Multiple preparations for the live trade plugin. Other modes are unaffected by them. 

## 0.20.0
- New indicators: Fibonacci's Weighted Moving Average (FWMA), Sine Weighted Moving Average (SINWMA), Chande Forcast Oscillator (CFO), Kaufman Efficency indicator, High Pass Filter 2-Pole, Supersmoother 3-Pole, Kaufmanstop, Safezonestop, Devstop, RSMK, STC, RVI, VWAP, 
- New timeframes: `45m`, `12h`, `3D`, `1W` 
- [Improvement] The indicators now use the configured warmup_candles
- [FIX] Spot should work no again thanks to a fix by [discohead](https://github.com/discohead)
- [FIX] Sometimes users faced a InsufficentMargin error - this was caused by a small bug in the handling leverage of market orders.
- [Improvement] Durations are now displayed without decimals. By [maebert](https://github.com/maebert)
- [Improvement] The crossed utility should be a little faster now, as we only use numpy there now.

## 0.19.2
- Added `metrics` property to the Strategy API. 
- Added `available_margin` property to the Strategy API. 
- Added `leverage` property to the Strategy API. 
- Updated the behavior of `capital`. It now returns wallet balance. 
- Added support for leverage (except for a liquidation mechanism)
- [BREAKING CHANGE] Change config values to work with the leverage support. Now instead of `margin` you need to enter `futures`. 
- Added `total_cost` to Position model. 
- Added `roi` (return on investment) property to the Position model. It is calculated while considering the leverage, the same way it is done on Binance Futures. 
- Added `RSX` indicator.
- Added Market Change metric.
- Added `signal_line()`, `streaks()`, `kelly_criterion()`, `strictly_increasing()`, `strictly_decreasing()`, and `dd()` utility functions. 
- Added `trades` property to the Strategy API for getting previous executed trades by [nicolay-zlobin](https://github.com/nicolay-zlobin). 
- Updated the docker image. Updated the docs to work with docker-compose. By [julesGoullee](https://github.com/julesGoullee).
- Exported trades as json now include `considering_timeframes` by [julesGoullee](https://github.com/julesGoullee).
- Added `--skip_confirmation` flag to `import-canldes` command to avoid confirmation on candle duplicates by [Gabri](https://github.com/Gabri).

## 0.18.0
- [BREAKING CHANGE] Dropped support for Python `3.6`
- [BREAKING CHANGE] Changed the syntax for symbols to use a `-` in the middle to separate the base and quote assets. Instead of `BTCUSD` you now need to enter `BTC-USD`. 
- Added elitism to genetic/evolution algorithm by [fjelic](https://github.com/fjelic)

## 0.17.0
- [BREAKING CHANGE] Pass the `order` object as a parameter for event methods such as `on_open_position`, `on_take_profit`, `on_stop_loss`, `on_reduced_position`, and `on_increased_position` methods. 
- Fixed a bug for adding to open positions using `self.buy` and `self.sell`. 
- Added `increased_count` and `reduced_count` properties to the Strategy API. 
- [BREAKING CHANGE] Removed `is_reduced` and `is_increased` properties. 
- Added the `after()` method the to Strategy API
- [BREAKING CHANGE] Renamed `prepare()` method to `before()`

## 0.16.0
- Added a route validation
- Improved performance of loading candles for cases with multiple routes
- Added `routes` property to the Strategy API
- Improvements in exception messages
- Added `has_active_entry_orders` property to the Strategy API
- Improved plotting of orders on the generated charts for backtest by (macd2)[https://github.com/macd2]
- Fixed handling open trade at the end of backtest

## 0.15.1
- Added support for Python 3.9
- Fixed calculations of formulas depending on Quantopian's empyrical package (like annual return, Sharpe Ratio, etc) using [our own fork](https://github.com/jesse-ai/crypto-empyrical) of it. 
- Changed default value of `type` for all exchanges in `config.py` to `margin`
- Added damiani_volatmeter indicator

## 0.14.1
- Changed the color of printed logs in `--debug` mode to white for more readability
- Fixed a bug where `should_cancel()` was being executed in strategies with multiple entry orders
- Made caching configurable. You can now change the settings for your cache driver or completely disable it 
- Added `sum_floats()` and `subtract_floats()` utility functions 
- Fixed a bug where position stayed open with a close-to-zero size caused by rounding issues in Python 
- Fixed for a bug in detecting executed orders with candles with gap
- Added support for reduce-only orders (take-profit and stop-loss orders)
- Added VossFilter indicator 
- Added TrendFlex indicator 
- Added ReFlex indicator 
- Added High Pass Filter indicator 
- Added Roofing indicator 
- Added DV indicator 

## 0.13.1
- Added support for balance handling for trading on spot markets 
- Improved calculation and logging of fees (when `--debug` flag is enabled)
- Improved calculation of daily balance change. It is now more accurate.
- Improved format in displaying of currencies. Instead of `10000`, it now displays `10,000`.

## 0.12.7
- Made number of warmup candles configurable
- Fixed an issue with log folder being absent in newly created projects by [jparklev](https://github.com/jparklev)
- Improved performance of the chande indicator

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
