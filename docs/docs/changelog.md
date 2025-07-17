# Jesse Changelog

Here you can see the changes made with each release of the main framework and the live trading plugin:


## 1.10.3 (17 July 2025)

- **[IMPROVEMENT]** Improved the error handling for `customInitialMarginRate` error on `Apex Omni`.
- **[FIX]** Fixed the issue of symbols, where the symbol change is not working properly when you change the exchange in live and backtesting mode forms.
- **[IMPROVEMENT]** Improved the display of prices in the logs especially for small prices like `0.00000012`. 

## 1.10.2 (15 July 2025)

- **[NEW FEATURE]** Added new property: `self.data_routes`
- **[FIX]** Fixed the installation issue on Windows machines.

## 1.10.1 (12 July 2025)

- **[FIX]** Fixed the `ValueError: Unknown order status: ***` error on `Hyperliquid`.
- **[FIX]** Fixed the `KeyError: 'channel'` error on `Coinbase Spot`.
- **[IMPROVEMENT]** Improved the error handling for `Gate USDT Perpetual seems to be either down or too busy. Error with status code 502` error on `Gate USDT Perpetual`.

## 1.10.0 (10 July 2025)

- **[IMPROVEMENT]** Improved the performance of the indicators by rewriting them in `Rust`.

## 1.9.8 (30 June 2025)

- **[IMPROVEMENT]** On `Coinbase Spot`, when trying to fetch the previously existing orders, if the type of the order is not supported by Jesse, we now log that message instead of terminating the session.
- **[FIX]** Fixed the `wss://api.hyperliquid.xyz/ws WS raised an error: 'HyperliquidPerpetual' object has no attribute 'api_key'` error on paper trading mode of `Hyperliquid`.
- **[IMPROVEMENT]** Added a new setting to enable/disable the "strategy execution" logs in the live/paper trading mode.

## 1.9.7 (29 June 2025)

- **[FIX]** Fixed an issue with rounding of meme coins when there are multiple routes in live trading.

## 1.9.4 (28 June 2025)

- **[NEW FEATURE]** Added new property: `self.current_route_index`
- **[IMPROVEMENT]** Some performance improvements in the backtest thanks to PRs from [@luceCoding](https://github.com/luceCoding).
- **[FIX]** Fixed the UI issue with symbols which have lower case in them such as `kPEPE-USD` on `Hyperliquid`.

## 1.9.3 (24 June 2025)

- **[NEW FEATURE]** Added new property: `self.volume`
- **[NEW FEATURE]** Added new property: `self.last_trade_index`
- **[IMPROVEMENT]** The Bollinger Bands width now accepts one-dimension input, as well as candles Just like the Bollinger Bands indicator.
- **[FIX]** Fixed the `Unexpected error in fetch_orders: Unknown order status: siblingFilledCanceled` error on `Hyperliquid`.
- **[FIX]** Fixed the `KeyError: 'type'` error on `Coinbase Spot`.
- **[FIX]** Fixed the issue of not being able to download backtest logs from within the dashboard.

## 1.9.2 (9 June 2025)

- **[FIX]** Improved handling of `503` and `504` errors on `Hyperliquid`.
- **[FIX]** Fixed the download links for CSV and JSON files not working in backtesting.

## 1.9.1 (7 June 2025)

- **[FIX]** Fixed the `"[GET] "/logs/backtest/1fb720bc-f8dd-440b-897d-7654d5258b50?token=83xxx": 404 Not Found"` error when trying to get the logs of a backtest.
- **[IMPROVEMENT]** Improved the copy button for the DNA in the optimization mode.

## 1.9.0 (6 June 2025)

- **[IMPROVEMENT]** Completely refactored the optimization mode to use the Optuna library with new options such as the step, the categorical type of parameters, a significant improvement in multiprocessing and more.
- **[NEW FEATURE]** Added a retry button for the times when the backtest fails. This is helpful for when you fix something and want to rerun the backtest. You can now just click the retry button, and it will cancel the current execution and start a new one.
- **[IMPROVEMENT]** Improved the welcome message.
  
## 1.8.6 (3 June 2025)

- **[IMPROVEMENT]** Improved interactive charts now when you hover each thread it will highlight it on the chart without going to it on the chart
- **[FIX]** Fixed the `TypeError: must be real number, not str` error on `Apex Omni`.
- **[FIX]** Fixed the `wss://api.hyperliquid.xyz/ws WS raised an error: 'HyperliquidPerpetual' object has no attribute 'api_key'` error on `Hyperliquid` in paper trading mode.

## 1.8.5 (25 May 2025)

- **[FIX]** Fixed the `ValueError: Unknown order status: minTradeNtlRejected` error on `Hyperliquid`.
- **[IMPROVEMENT]** Improved the balance update logging mechanism in live trading to avoid excessive logging.
- **[IMPROVEMENT]** Improved the previously implemented mechanism for preventing the `ValueError: Unable to close a trade that is not yet open...` error on `Binance Perpetual`.

## 1.8.4 (20 May 2025)

- **[FIX]** Fixed the `Unable to close a trade that is not yet open...` error on `Binance Perpetual` (and potentially other exchanges).
- **[FIX]** Fixed the `TypeError: must be real number, not str` error on `Apex Omni`.
- **[IMPROVEMENT]** Improved the balance update mechanism in live trading to handle cases where the position's quantity is not updated immediately after a order is executed due to the exchange's API not working as expected during sudden market movements.

## 1.8.3 (18 May 2025)

- **[FIX]** Fixed the `ConnectionError: ERROR 422 Unprocessable Entity` error on `Hyperliquid`.

## 1.8.2 (17 May 2025)

- **[FIX]** Fixed the `JSONDecodeError: Expecting value: line 1 column 1 (char 0)` error on Hyperliquid.
- **[FIX]** Fixed the `TypeError: Argument 'order_id' has incorrect type (expected str, got int)` error on Hyperliquid.
- **[IMPROVEMENT]** Added logs for balance changes in live trading.

## 1.8.1 (13 May 2025)

- **[FIX]** Fixed the `AttributeError: 'NoneType' object has no attribute 'json'` error on `Binance Perpetual`.
- **[FIX]** Fixed the wrong order price being reported in notifications for stop and market orders on `Apex Omni`.
- **[IMPROVEMENT]** Improves the handling of order streams WS on `Apex Omni`.

## 1.8.0 (11 May 2025)

- **[NEW FEATURE]** Added support for **Hyperliquid** as a live trading exchange.

## 1.7.8 (9 May 2025)

- **[FIX]** Removed some debugging logs.

## 1.7.7 (9 May 2025)

- **[IMPROVEMENT]** Improved the WebSocket connection handling to support multiple instances of the dashboard running at the same time.

## 1.7.6 (8 May 2025)

- **[FIX]** Fixed the issue where the finish date in backtest was not being validated correctly and could cause the `Sent only 5 candles but 15 is required to create a "15m" candle` error.

## 1.7.5 (28 February 2025)

- **[FIX]** Fixed the `ImportError: cannot import name 'store_candle_into_db' from partially initialized module 'jesse.models' (most likely due to a circular import) (/jesse-docker/jesse/models/init.py)` error.

## 1.7.4 (28 February 2025)

- **[IMPROVEMENT]** Improved the error message in backtests when the order size is too large for the available margin.
- **[IMPROVEMENT]** Improved handling of the `CANCELING` order statuses on `Apex Omni`.
- **[FIX]** Fixed the `AttributeError: 'NoneType' object has no attribute 'json'` error on `Apex Omni`.

## 1.7.3 (21 February 2025)

- **[IMPROVEMENT]** Improved the handling of `matype` parameter in indicators that use it.
- **[IMPROVEMENT]** Improved the speed of `ADXR`, `DX`, `EFI`, `linearreg`, `Safe Zone`, `T3`, `TEMA`, `VPCI`, and `WT` indicators.
- **[IMPROVEMENT]** Improved the backup order detection mechanism to avoid throwing an error when it encounters an unsupported order.
- **[FIX]** Fixed the `AttributeError: 'NoneType' object has no attribute 'json'` error on `Binance Perpetual`.

## 1.7.2 (14 February 2025)

- **[IMPROVEMENT]** Improved the speed of `ADOSC`, `AROONOSC`, `CCI`, `CFO`, `CHANDE`, `CHOP`, `CMO`, `DEMA`, `DTI`, `MACD`, and `SuperTrend` indicators.

## 1.7.1 (13 February 2025)

- **[IMPROVEMENT]** Improved the speed of EMA, ATR, ATX, Bollinger Bands width, IchimokuCloud, RSI, Keltner Channel, KAMA, Bollinger Bands, TRIX, and Alligator Indicators.

## 1.7.0 (11 February 2025)

- **[NEW FEATURE]** Added a table displaying the executed trades on the interactive charts page. This allows you to browse them and easily navigate to see your most profitable and worst trades quickly.
- **[NEW FEATURE]** Added a download button to the backtest's logs view to download the logs as a file alongside with the existing copy button.
- **[IMPROVEMENT]** Improved the logs fetching mechanism to reduce the amount of data sent to the frontend using gzip compression which significantly reduces the size of the data sent.

- **[BREAKING]** Removed the `TA-Lib` dependency and rewrote the code for the indicators that were using it. Most of the indicators are not changed in input and output, but some of them are, and some of them are removed. Here are the changes that you need to be aware of:

-  **VWMACD Indicator**: A minor adjustment has been made to the output values.
-  **ADXR Indicator**: A minor adjustment has been made to the output values.
-  **Bollinger Band Width**: The calculation logic has been updated. The parameters `devup`, `devdn`, and `matype` have been removed, and a new parameter `mult` has been introduced.
-  **DX Indicator**: The input parameters have been modified. The `period` parameter has been removed, and `di_length` and `ad;'x_smoothing` have been added. Additionally, the final output values have been adjusted.
-  **TRIX Indicator**: A minor adjustment has been made to the final output values.
-  **KAMA Indicator**: The input parameters have been updated. The parameters `fast_length` and `slow_length` have been added, but there are no changes to the output values.
-  **RSMK Indicator**: The input parameters have been modified. The parameters `matype` and `signal_matype` have been removed, but there are no changes to the output values.
-  **HT_DCPeriod**: The indicator has been removed as it is not available or supported in TradingView.
-  **HT_DCPhase**: The indicator has been removed as it is not available or supported in TradingView.
-  **HT_Phasor**: The indicator has been removed as it is not available or supported in TradingView.
-  **HT_Sine**: The indicator has been removed as it is not available or supported in TradingView.
-  **HT_Trendline**: The indicator has been removed as it is not available or supported in TradingView.
-  **HT_Trendmode**: The indicator has been removed as it is not available or supported in TradingView.
-  **Pattern Recognition**: The indicator has been removed as it is not available or supported in TradingView.
-  **MACDEXT**: The indicator has been removed as it is not available or supported in TradingView.
-  **SAREXT**: The indicator has been removed as it is not available or supported in TradingView.

## 1.6.4 (4 February 2025)

-  **[IMPROVEMENT]** Brought back the `reduce-only` orders on `Bybit`.
-  **[IMPROVEMENT]** Improved the order detection (backup HTTP mechanism) on `Apex Omni`, `Apex Pro`, `ByBit Perpetual`, `Gate.io`, and `Binance Perpetual`.
-  **[IMPROVEMENT]** We now submit the stop-order first before submitting take-profit.
-  **[IMPROVEMENT]** Improved the error reporting (notifications) when a strategy fails to execute and an exception is raised.
-  **[IMPROVEMENT]** The strategy's `watch_list()` method will no longer cause the live trading dashboard to crash if it raises an exception. Instead, it display the error in the dashboard.
-  **[FIX]** Fixed the issue where changing the exchange in the live tab sometimes didn't work and required refresh.
-  **[FIX]** Fixed the issue where sometimes symbols in the live and backtest tabs were not updated when the exchange was changed.

## 1.6.3 (29 January 2025)

- This release addresses some issues with the packaging for new installations. If your session is already running fine, you don't need to upgrade to this.

## 1.6.0 (28 January 2025)

- Added support for Talib `0.6`
- Added support for Python `3.13` on macOS.

## 1.5.0 (25 January 2025)

-  **[BREAKING]** Removed `wavelet_denoising` from the utils module and the Tulipy library as a dependency to simplify installations, especially on Windows machines and newer Python versions.
-  **[BREAKING]** Changed the default parameters of the `emv`, `kvo`, `vidya` indicators. 
-  **[BREAKING]** Removed the `msw` indicator.
-  **[NEW FEATURE]** Added a `volume` indicator to help you analyze market activity more effectively.
-  **[NEW FEATURE]** Introduced a `timeframe_to_one_minutes` function in the utils module for better time management in your strategies.
-  **[IMPROVEMENT]** The calculation for `self.portfolio_value` for futures has changed to `(total_position_values * self.leverage) + self.balance`, providing a more accurate representation of your portfolio.
-  **[IMPROVEMENT]** Improved handling of the `Bybit USDT Perpetual seems to be either down or too busy. Error with status code 504` error to prevent live sessions from crashing.
-  **[IMPROVEMENT]** Enhanced the user interface in tabs on mobile devices for a better user experience.
-  **[IMPROVEMENT]** The backtest results page now displays logs instead of downloading them as a file, making it much faster to access your results.
-  **[IMPROVEMENT]** Brought back the order handling mechanism using HTTP requests for Apex Pro and Apex Omni, thanks to the new and improved mechanism.
-  **[FIX]** Resolved an issue with `get_candles()` in data routes during live mode.
-  **[FIX]** Fixed the `ImportError: cannot import name igcdex` error on Windows machines when running live.
-  **[FIX]** Fixed the `KeyError: 'order_id'` error on `Coinbase Spot`.
-  **[FIX]** Addressed the `ValueError: could not convert string to float` error on `Coinbase Spot`.
-  **[FIX]** Fixed the `UnicodeDecodeError: 'utf-8' codec can't decode byte 0x95 in position 67: invalid start byte` error. Thanks to [movy](https://github.com/jesse-ai/jesse/pull/491) for the fix.
-  **[FIX]** Fixed the `ValueError: could not convert string to float: ''` error on `Bybit Perpetual`.
-  **[FIX]** Fixed an issue with rounding prices in the interactive charts on the backtest results page.
-  **[FIX]** Resolved the issue of XRP not appearing in the list of supported symbols for ByBit.
-  **[FIX]** Fixed the issue with the number input in the settings.
-  **[FIX]** Fixed an issue with the import of candles not working on the "import candles" page.
-  **[FIX]** Fixed the `orderQty will be truncated to zero.` error on `Bybit Perpetual`.
-  **[FIX]** Resolved the display issue for coins with low prices, such as meme coins, in interactive charts.

## 1.4.0 (23 December 2024)

-  **[NEW FEATURE]** Added support for **[Apex Omni](https://jesse.trade/apex)** which is a DEX for trading perpetual futures. 
-  **[NEW FEATURE]** Introduced support for **2h, 6h, and 12h timeframes** on Apex Pro, providing more flexibility in your trading strategies.
-  **[NEW FEATURE]** Completely refactored the candle importing experience, allowing for **automatic queuing** of multiple imports and better management of previously imported candles.
-  **[NEW FEATURE]** Implemented a new page for managing the existing candles, allowing for operations such as deleting them or updating them with one click.
-  **[IMPROVEMENT]** Increased the limit for data routes in **Pro and Enterprise plans** by 5x. 
-  **[IMPROVEMENT]** The `should_cancel_entry` method is no longer mandatory in strategies; it now defaults to returning **true**, simplifying strategy development.
-  **[IMPROVEMENT]** Improved handling of available symbols when selecting trading routes in the dashboard, making it easier to navigate.
-  **[IMPROVEMENT]** Enhanced the experience when insufficient candles are available for backtesting, providing a warning and a single-click solution to import required candles.
-  **[FIX]** Resolved the **`Invalid size scale parameters. Value: xxx, stepSize is xxx`** error on Apex Omni.
-  **[FIX]** Fixed the **`AttributeError: 'Popen' object has no attribute 'kill'`** error.
-  **[FIX]** Corrected the bug in the **`get_candles()`** function of the research module when the caching parameter was set to **False**.
-  **[FIX]** Fixed calculation errors in daily balance during backtesting in spot mode, especially when using strategies with the partial fill feature.
-  **[FIX]** Improved handling of **`Repeat auth`** errors on Bybit and **`Invalid JSON response from server with status code 503: b'Service Unavailable'`** errors on Apex.
-  **[FIX]** Resolved issues with live trading websocket handling across all exchanges, particularly for **Apex**, **ByBit**, and **Binance Futures**.
-  **[FIX]** Enhanced error messages for existing strategy names to avoid confusion.
-  **[BREAKING CHANGE]** Removed deprecated drivers: **DYDX** and **Bitget**.

## 1.3.0 (21 October 2024)

-  **[NEW FEATURE]** Added support for futures trading and spot trading on **Gate.io**.
-  **[NEW FEATURE]** Introduced a new page for backtesting called **benchmark**, allowing you to quickly compare the backtesting results of all open tabs in a table format and perform mass operations like re-running all of them.
-  **[NEW FEATURE]** Added a new configuration for live trading to make it optional to receive exchange reconnecting messages. By default, this is set to **true**.
-  **[IMPROVEMENT]** Improved the display of buy and sell orders in the interactive charts, making it easier to identify which orders are for long positions and which are for short positions.
-  **[IMPROVEMENT]** Added validation for chart functions to prevent unsupported values.
-  **[IMPROVEMENT]** Enhanced the **WebSocket reconnection** process on Bybit, ensuring a more reliable connection during trading.
-  **[FIX]** Resolved the issue of **decimal numbers being incorrect** for meme coins with low prices on the live trading chart, ensuring more accurate price representation.
-  **[FIX]** Fixed the problem with **in-dashboard bug reporting**, making it easier for users to report issues directly from the interface.
-  **[FIX]** Addressed the `KeyError: 'unified_margin_status'` error that occurred on Bybit unified accounts.
-  **[FIX]** Resolved an issue where the logs in the live trading dashboard sometimes displayed incorrect tab info logs when running multiple live sessions.
-  **[BREAKING]** Removed the `threshold` parameter from the `stiffness` indicator.
- **[IMPROVEMENT]** Added support for `FDUSD` and `TUSD` pairs on **Binance Spot**.
- **[FIX]** Fixed the `TypeError: run() missing 1 required positional argument: 'start_date_str'` error. 

## 1.2.0 (17 September 2024)

-  **[FIX]** Resolved the `TypeError: int() argument must be a string, a bytes-like object or a real number, not 'dict'` error.
-  **[FIX]** Corrected the issue of inaccurate P&L calculations during live trading.
-  **[FIX]** Fixed the wallet balance not updating correctly on **Apex Pro**.
-  **[FIX]** Addressed the problem where settings were being overwritten, ensuring your preferences remain intact.
-  **[NEW FEATURE]** Added a new button next to each trading route as a shortcut for editing the source code of that strategy using the built-in editor of the dashboard.
- **[NEW FEATURE]** Introduced the ability to add custom indicators to the dashboard.
-  **[BREAKING]** Removed the `generate_charts` option from the research module's backtest function.
-  **[IMPROVEMENT]** Enhanced web socket reconnection for **Apex**, **ByBit**, and **Binance** drivers.
-  **[IMPROVEMENT]** Improved multiprocessing handling in Jesse, resulting in significantly better stability for scenarios requiring a restart.

## 1.1.0 (18 August 2024)

- **[FIX]** Changing the finish date in backtest will no longer change the start date.
- **[FIX]** Fixed an issue where changing the name of a second symbol would have changed the symbol in other tabs in backtests.
- **[FIX]** Fixed an issue where if you enter a date that candles didn't exist on the market, Jesse couldn't figure out the first existing date and begin the importing.
- **[FIX]** Fixed the issue with import candles of the research module.
- **[IMPROVEMENT]** No longer add info logs for ping pong messages.
- **[FIX]** Fixed the `Apex Pro Perpetual unsuccessful response over WS from "Apex Pro Perpetual Testnet": error:topic:already subscribed instrumentInfo.H.BTCUSDT` error.
- **[FIX]** Fixed the `InvalidExchangeApiKeys: [401 ERROR]: Your API keys for Binance Perpetual Futures are either wrong or don't have the correct permissions` error on **Binance**.
- **[FIX]** Fixed the `TypeError: run() missing 1 required positional argument: 'start_date_str'` error when the local candle generation is enabled.
- **[FIX]** Fixed the issue of duplicate order detections on Binance testnet
- **[IMPROVEMENT]** Brought back the alert section displaying the execution time of the backtest instead of a notification, so you won't miss it even when you're not in front of your computer.
- **[NEW FEATURE]** Added benchmark option to backtest function in the research module.
- **[NEW FEATURE]** Added support for `BNFCR` (Binance Futures Credit) for European users.
- **[IMPROVEMENT]** Bollinger Bands and the ADX indicators now also support one-dimensional NumPy array as input instead of candles. This is useful if you're writing complex statistical strategies.
- **[FIX]** Fixed the `ValueError: Unable to close a trade that is not yet open. If you're getting this in the live mode, it is likely due to an unstable connection to the exchange, either on your side or the exchange's side` error on `Binance Futures`.
- **[NEW FEATURE]** Added a new section called strategies, which allows you to use the built-in editor with most of the VS Code features to edit your strategies.

## 1.0.0 (25 July 2024)

- **[NEW FEATURE]** Added support for Coinbase Spot for live trading. 
- **[IMPROVEMENT]** Tabs and their data are now **persistent within the browser**, so you can refresh your page without worrying about losing results of backtests, etc.
- **[IMPROVEMENT]** Tab names are now **dynamic and more descriptive**, making it easier to navigate the dashboard.
- **[NEW FEATURE]** A **general settings page** has been added, with options for clearing the browser cache in the frontend of the dashboard and the database cache in the backend.
- **[IMPROVEMENT]** You can now **close tabs by clicking the middle button of the mouse**, making it easier to manage multiple tabs.
- **[IMPROVEMENT]** "Extra routes" have been renamed to **"data routes"** for better clarity.
- **[NEW FEATURE]** You can now **enter Exchange API keys from within the dashboard**, allowing you to enter multiple accounts from the same exchange, which is useful for trading with multiple sub-accounts.
- **[NEW FEATURE]** You can now **enter API keys for your notification drivers** (such as Telegram, Slack, or Discord) from within the dashboard, instead of the `.env` file.
- **[NEW FEATURE]** You can now **run multiple live trading sessions simultaneously** from within a single Jesse instance.
- **[IMPROVEMENT]** You can now **enable fast mode for backtests from within the dashboard**.
- **[IMPROVEMENT]** "Available margin" and leverage info have been added to the live dashboard.
- **[IMPROVEMENT]** The backtest results and equity curve can now include the option to **display the market benchmark**.
- **[IMPROVEMENT]** When backtesting with a strategy that uses data routes, if you forget to add them in the dashboard, you'll get an error notification. However, the system will automatically handle it, allowing your backtest to proceed instead of failing.
- **[IMPROVEMENT]** When live trading with multiple routes, you can now **change the candles chart to any of them**.

## 0.49.0 (2 July 2024)

- **[IMPROVEMENT]** Minor improvements thanks to [Yakir's PR](https://github.com/jesse-ai/jesse/pull/454)
- **[FIX]** Fixed an issue in backtests where if the order prices are not sorted in the strategy, the order of the execution could have been wrong if multiple orders were to get executed in the same one-minute candle, thanks to [Yakir's PR](https://github.com/jesse-ai/jesse/pull/453)
- **[FIX]** Fixed an error message related to candles thanks to [Movi's PR](https://github.com/jesse-ai/jesse/pull/445/files)
- **[FIX]** Fixed an issue where attempting to cancel both stop-loss and take-profit orders simultaneously would raise an error, thanks to [Yakir's PR](https://github.com/jesse-ai/jesse/pull/456)
- **[FIX]** Fixed the `ValueError: could not convert string to float: ''` error on Bybit
- **[IMPROVEMENT]** Improved handling of logging rejected orders on `Binance Futures`
- **[IMPROVEMENT]** Improved error handling for some HTTP requests on ByBit driver
- **[NEW FEATURE]** Added `Apex Pro Perpetual` and its testnet for live trading
- **[FIX]** Fixed the `Illegal characters found in parameter 'price'; legal range is '^([0-9]{1,20})(\.[0-9]{1,20})?$'.` error on Binance Spot for coins with prices that have a huge number of decimal places such as `SHIB-EUR`
- **[NEW FEATURE]** Added new indicators based on DavidTech's videos from YouTube: **TTMSqueeze**, **Stiffness**, **Waddah Attar Explosion**, and **support_resistance_with_breaks**. You can find the documentation for them on our website
- **[IMPROVEMENT]** Improved `stddev` and `macd` indicators to support one-dimensional input arrays as an optional replacement for candles, so you can easily use them to create other indicators on top of them

## 0.48.0 (16 May 2024)

- **[FIX]** Fixed the `requests.exceptions.JSONDecodeError: Expecting value: line 1 column 1 (char 0)` error when starting live/paper trade.
- **[FIX]** Fixed an issue where API keys were needed in paper trading mode.
- **[IMPROVEMENT]** Improved strategy performance by optimizing order iteration process for futures exchanges, reducing simulation time in an example case from 173 seconds to 60 seconds for a 6 month period with a timeframe of 5 minutes, thanks to [yakir4123's PR](https://github.com/jesse-ai/jesse/pull/430).
- **[IMPROVEMENT]** Numba is now a mandatory requirement and is installed by default, thanks to [kakulukia's PR](https://github.com/jesse-ai/jesse/pull/429).
- **[IMPROVEMENT]** Improved error messages related to candles to include better information, thanks to [kakulukia's PR](https://github.com/jesse-ai/jesse/pull/431).
- **[NEW FEATURE]** Added `warmup_candles` parameter to the Research module's get_candles() function to allow for consistent backtest results between the Research module and executing the backtest from the dashboard, thanks to [kakulukia's PR](https://github.com/jesse-ai/jesse/pull/435).
- **[BREAKING]** Research module's get_candles() now returns both warmup and trading candles, making it significantly easier to use.
- **[IMPROVEMENT]** Improved the speed of backtest simulations by **multiple times**, thanks to [yakir4123's PR](https://github.com/jesse-ai/jesse/pull/426).
- **[IMPROVEMENT]** Added `wsaccel` to the requirements to improve the stability of the WebSocket connection, leading to fewer disconnections. 

## 0.47.0 (10 April 2024)

- **[FIX]** Improved market order detection for lower prices, thanks to [Movi's PR](https://github.com/jesse-ai/jesse/pull/415/)
- **[IMPROVEMENT]** The handling of market order submissions on `Binance Futures` has been enhanced to prevent the "The exchange did not respond as expected for order execution" error.
- **[NEW FEATURE]** Default fees (for backtests) for all Bybit Futures have been lowered to 0.0550%
- **[NEW FEATURE]** Added new exchange driver `Bybit USDC Perpetual` for trading on Bybit with USDC as the settlement currency. `Bybit USDC Perpetual Testnet` is also available for testing.
- **[NEW FEATURE]** Added support for spot trading on Bybit with the new exchange driver `Bybit Spot`. `Bybit Spot Testnet` is also available for testing. Both classic and unified accounts are supported.

## 0.46.0 (14 March 2024)

-  [IMPROVEMENT] Added a parameter for generating logs in the research backtest function, returning the file path if enabled.
-  [IMPROVEMENT] Enhanced candle validation in the research module's `get_candles` function for clearer error messages.
-  [IMPROVEMENT] Introduced `warmup_candles` parameter in the research module's backtest function for consistent results between research and dashboard backtests.
-  [FIX] Resolved `_pickle.UnpicklingError` that occurred when loading candles from cache, improving loading times.
-  [FIX] Addressed `ssl.SSLEOFError` on the `Bybit` driver due to unexpected WebSocket closures.

## 0.45.0 (19 December 2023)

-  **[IMPROVEMENT]** Updated syncing of existing candles in Live Mode for better alignment with exchange data.
-  **[FIX]** Addressed the "No order found with clientId: acd20b4e-xxxx-xxxx-xxxx-d059896b920b21" error on DYDX.
-  **[FIX]** Rectified the `ExchangeRejectedOrder: reduce-only order has same side with current position` error on Bybit, which occurred under specific conditions in live mode.
-  **[FIX]** Solved the `KeyError: None - fee = config['env']['exchanges'][self.exchange]['fee']` error.
-  **[FIX]** Eliminated the `ConnectionResetError: [Errno 104] Connection reset by peer` on Bybit.
-  **[FIX]** Enhanced error handling for `BrokenPipeError` in Bybit's WebSocket connection.
-  **[FIX]** Corrected issues with handling of low-priced assets like `1000PEPE-USDT`.
-  **[IMPROVEMENT]** Added retry logic for `Bybit` API requests to bolster reliability during intermittent network issues.
-  **[NEW FEATURE]** Introduced `min_qty` attribute in the Strategy class, applicable in live trading mode, to define the minimum tradeable quantity for a symbol on specific exchanges.

## 0.44.0 (17 November 2023)

- [FIXED] Resolved the `Stream error received: Internal error, could not fetch data for subscription: v3_accountsUnauthorized` error on DYDX.
- [IMPROVEMENT] Enhanced handling of market order submissions on `DYDX` and `Bybit` to prevent the `The exchange did not respond as expected for order execution` error.
- [IMPROVEMENT] Upgraded the optimize mode's hyperparameters display table to [include the DNA](https://user-images.githubusercontent.com/804303/279473594-a8a0c9e6-02d1-4b27-958c-8dd596f4931c.png), thanks to [btagliani](https://github.com/btagliani).
- [NEW FEATURE] Reintroduced CSV logging for optimize mode, as shown in [this pull request](https://github.com/jesse-ai/jesse/pull/411) by [btagliani](https://github.com/btagliani).
- [BREAKING] Changes to the calculation of `self.available_margin` in backtest and paper trading modes for more realistic margin representation.

## 0.43.3 (29 October 2023)

- [IMPROVEMENT] **Mandatory migration to Bybit API V5**. This update is indispensable if you're trading on Bybit, as it adapts Jesse to Bybit's latest API version.
- [NEW FEATURE] **Support for Bybit's Unified Margin Account**. This will simplify your asset management and elevate trading flexibility on Bybit.
- [FIX] Addressed the issue of orders on **DYDX expiring early**. This fix ensures that your trading activities on DYDX are as seamless as possible.

## 0.43.0 (5 October 2023)

- [NEW FEATURE] Added support for Python `3.10` and Python `3.11`. Both the main framework and live trading plugin. 
- [IMPROVEMENT] The style of the equity curve chart has been improved. Special thanks to a pull request submitted by [Movy](https://github.com/Movy). Check out the pull request [here](https://github.com/jesse-ai/jesse/pull/391).
- [FIX] Fixed the `Order size must adhere to quantity step of 10` error when submitting orders on DYDX for small-sized symbols like `TRX-USD`. 
- [FIX] Resolved the `Cannot cancel order with id: xxx because it is already canceled` error on DYDX. 
- [FIX] Improved the detection of market orders for lower prices, reducing the chance of trading errors.

## 0.42.0 (7 May 2023)

- [NEW FEATURE] Added support for our first DEX: [DYDX](https://jesse.trade/dydx).
- [NEW FEATURE] Added new properties to the Strategy API: [is_backtesting](https://docs.jesse.trade/docs/strategies/api.html#is-backtesting), [is_livetrading](https://docs.jesse.trade/docs/strategies/api.html#is-backtesting), [is_papertrading](https://docs.jesse.trade/docs/strategies/api.html#is-papertrading), [is_live](https://docs.jesse.trade/docs/strategies/api.html#is-live)
- [IMPROVEMENT] Jesse will now retry a failed STOP order with a MARKET order with the same size if the reason for it is its trigger price being in such a way that would have caused instant execution. This is an experimental feature and currently works only on `Bybit`. 
- [IMPROVEMENT] Improves how order type is detected by Jesse to prevent unwanted order order types. 
- [IMPROVEMENT] Improved detection of order types to prevent unwanted order types in the live mode.
- [FIX] Fixes the `TypeError: Cannot parse single argument of type <class 'numpy.ndarray'>.` error when local candle generation is enabled.
- [FIX] Fixes the `KeyError: 'data'` error in some cases of live sessions on `Bybit`.
- [FIX] Fixes the `KeyError: 'cum_exec_qty'` error in some cases of live sessions on `Bybit`.

## 0.41.0 (3 November 2022)

- [BREAKING] On `FTX Perpetual Futures` exchange, symbols ending in `PERP` format are not supported anymore. Previously Jesse replaced the ending `PERP` with `USD` in the database but that was causing confusions. 
- [NEW FEATURE] Added support for `Bitget USDT Futures` driver. 
- [NEW FEATURE] Added a "free" plan allowing to trade live on [Bitget.com](https://jesse.trade/bitget).
- [IMPROVEMENT] Added proper handling for the rare `listenKeyExpired` event that happened on `BinancePerpetualFutures` driver leading to the WebSocket connection for user account data not working anymore without throwing any errors. 
- [IMPROVEMENT] Improves the ping-pong mechanism of the WebSocket connection on **Bybit** drivers leading to less disconnections (and reconnections).
- [IMPROVEMENT] Improved handling of orders when deciding on the order types in a way to work better on sudden price changes. 
- [IMPROVEMENT] Improved handling of exit orders to prevent `Cannot submit a reduce_position order when there is no open position` error occuring when a position is suddenly closed while Jesse's trying to execute a batch of (exit) orders.
- [FIX] Fixed the `TypeError: 'NoneType' object is not subscriptable` error in **Bybit** drivers. 
- [FIX] Fixed the `TypeError: unsupported operand type(s) for -: 'NoneType' and 'float'` error in **Bybit** drivers. 
- [FIX] Fixed the`TypeError: Cannot parse single argument of type <class 'numpy.ndarray'>` raised in live sessions with "local candle generation" enabled. 
- [FIX] Fixed the issue where candles were not showing up in the live chart when "local candle generation" was enabled.
- [FIX] Added handling of the `WebSocketConnectionClosedException` error in `Bybit USDT Perpetual` so that the running session won't be terminated. 

## 0.40.0 (3 October 2022)

- [BREAKING CHANGE] Removed the experimental plugin system used for defining custom exchange drivers for backtesting. 
- [BREAKING CHANGE] Implemented a new method called [before_terminate](https://docs.jesse.trade/docs/strategies/entering-and-exiting.html#before-terminate) which does exactly what the `terminate()` used to do. And slightly changed the `terminate()` method. To see their differences, check the updated documentation for [before_terminate](https://docs.jesse.trade/docs/strategies/entering-and-exiting.html#before-terminate) and [terminate](https://docs.jesse.trade/docs/strategies/entering-and-exiting.html#terminate).
- [NEW FEAWTURE] Implemented new event handler methods used for communicating among multiple strategies/routes: `on_route_open_position`, `on_route_close_position`, `on_route_increased_position`, `on_route_reduced_position`, `on_route_canceled`.
- [IMPROVEMENT] Position entry price now displays all the digits after the decimal point.
- [IMPROVEMENT] Added a warning if the open position is not in the list of trading symbols. 
- [IMPROVEMENT] Improved some error messages to include links to the related help center page. 
- [IMPROVEMENT] Improved authentication renewing of the WebSocket connection on Binance drivers. 
- [IMPROVEMENT] Changed "bybit.com" endpoints to "bytick.com" in hopes of a better network connectivity as it is mentioned on Bybit's docs. 
- [IMPROVEMENT] The "Reccuring position reports" feature of live sessions will now send reports even if the position is closed. This is to let you know that the bot is running (and not unexpectedly crashed for any reason).
- [FIX] Fixed `TypeError: Cannot parse single argument of type <class 'numpy.ndarray'>.` for optimize mode
- [FIX] Fixed `TypeError: Cannot parse single argument of type <class 'numpy.ndarray'>.` when using extra candles in live mode while "local candle generation" is enabled. 
- [FIX] Fixed the issue of exchanges not appearing in the live settings. 
- [FIX] Fixed the "Ratio Avg Win / Avg Loss" metric being always zero in backtest metrics. 
- [FIX] Fixed the `store_candles()` function from the `research` module. Also added validation for its inputs to prevent future issues.
- [FIX] Fixed the `TypeError: unsupported operand type(s) for *: 'NoneType' and 'float'` error for a case after starting a session with the "persistency" feature enabled. 

## 0.39.0 (24 August 2022)

- [NEW FEATURE] Added The option to NOT generate candles (for timeframes bigger than 1m) locally and instead fetching them from the exchange. 
- [NEW FEATURE] Added a new config for choosing between fetching candles for all timeframes from the exchange or generating them locally. 
- [BREAKING] Added timeframe parameter to fetch() method of the import-candle drivers. In case you have developed your own drivers, you should update it accordingly.
- [IMPROVEMENT] Improved the migration handling. This allows for easier updates in the future and also faster startup time for Jesse as duplicate migrations will not be performed.
- [IMPROVEMENT] By default, when you open the settings page, it will now open the relative section to the page you're in. For example, if you're in the live trading section and click on the settings button, it'll open the live trading section.
- [FIX] Fixed the `KeyError: 'stepSize'` error on the `Binance Spot` driver caused by an unexpected update of Binance's API. 
- [FIX] Fixed a bug when calling `import_candles_mode.run()` from the `research` module. Many thanks to [getorca](https://github.com/getorca) for submitting the [PR](https://github.com/jesse-ai/jesse/pull/359). 

## 0.38.3 (6 August 2022)

- [NEW FEATURE] Added support for live trading on `Binance US Spot`. 
- [IMPROVEMENT] Improved handling of stop orders on `Binance Spot` to ensure order fills in markets with low liquidity. 
- [FIX] Fixed the `{'code': -2011, 'msg': 'Unknown order sent.'}` error on `Binance Spot` driver. 
- [FIX] Fixed an issue where you could not close the position using `update_position()` and immediately open a new one in live and paper modes. 

## 0.38.0 (10 July 2022)

- [NEW FEATURE] Added support for live spot trading on `Binance.com`, `FTX.com`, and `FTX.us`
- [IMPROVEMENT] Improved handling of queued orders when trading multiple routes in the live mode.
- [IMPROVEMENT] Loaded DNA values are now logged at the beginning of the live mode if the debugging mode is enabled.
- [IMPROVEMENT] Added validation for timeframe of passed candles to `research.backtest()` to prevent confusions. 
- [IMPROVEMENT] Queued orders' price points are now displayed on the real-time chart in the live mode. 
- [IMPROVEMENT] Increased the font size of logs in live trading. 
- [IMPROVEMENT] Improved behavior of the download links for backtest results so you won't face the exit popup question when you click on them. 
- [IMPROVEMENT] Added proper handling of `{'code': -2011, 'msg': 'Unknown order sent.'}` errors on `Binance Perpetual Futures` which were occurring after a "reduced position" event. 
- [FIX] Fixes a bug where the `dna()` was not being loaded in the live mode.
- [FIX] Fixed the issue with the detection of liquidation orders on BinanceFutures
- [FIX] Fixed the `ImportError: numpy.core.multiarray failed to import` error related to numpy in new installations on Ubuntu. 
- [FIX] Fixed an issue causing `KeyError: 'futures_leverage'` error in new installations. 
- [FIX] Fixed an issue where there are duplicate exchange names in the routes exchange list. 

## 0.37.0 (10 June 2022)

- [BREAKING CHANGE] The database tables must be deleted for:
1. new settings which support spot trading
2. for new indexing of candles table which now loads X times faster
- [BREAKING CHANGE] Removed the driver for "Binance Inverse Futures" (known as coin-margined futures on Binance) from the list of supported exchanges for import candles. 
- [BREAKING CHANGE] Updated exchange names to be more similar to what they are on the exchange websites to avoid confusion.
- [BREAKING CHANGE] Updated the required config object that is passed to the `research.backtest()` function based on the mentioned changes in this release. Removed the `settlement_currency` and added 'type'. Read the example on the [documentation page](https://docs.jesse.trade/docs/research/backtest.html#usage-example) for more details.
- [BREAKING CHANGE] The alias `self.capital` has been removed to prevent confusion. Please use `self.balance` instead. **Make sure to update your strategies accordingly**.
- [BREAKING CHANGE] The `should_cancel()` method has been renamed to `should_cancel_entry()` which is more convenient since it is only used for canceling entry orders. **Make sure to update your strategies accordingly**.
- [NEW FEATURE] Added `previous_qty` property to the Position class.
- [NEW FEATURE] Added the [self.exchange_type](https://docs.jesse.trade/docs/strategies/api.html#exchange-type), [self.daily_balances](https://docs.jesse.trade/docs/strategies/api.html#daily-balances) properties to the Strategy class.
- [NEW FEATURE] Added [self.is_spot_trading](https://docs.jesse.trade/docs/strategies/api.html#is-spot-trading) and [self.is_futures_trading](https://docs.jesse.trade/docs/strategies/api.html#is-futures-trading) properties to the Strategy class.
- [IMPROVEMENT] The settlement currency is no longer fixed to `USDT` or `USD`. Instead, it is now the quote currency of the symbol you're trading. So it could be `USD`, `USDT`, `BUSD`, `BTC` (for spot markets), etc.
- [IMPROVEMENT] The existence of `plugins.py` is now optional. It has been removed from new projects for the sake of simplicity. If you need to add a driver, you can do so by creating the file manually. 
- [IMPROVEMENT] The "Exchange type", "Leverage", and "Leverage Mode" are now displayed on backtests' result page so you know what the settings have been for the executed backtest.
- [IMPROVEMENT] Minor improvements to the UI of the dashboard. 
- [FIX] Fixed a bug where generated CSV files in backtests were empty if the `export_json` option was disabled. 

## 0.36.0 (18 May 2022)

- [NEW FEATURE] Added new optional parameters to research module's [backtest()](https://docs.jesse.trade/docs/research/backtest.html#backtest) function to handle quantstat reports, export hyperparameters, equity-curve chart values, CSV and JSON export, tradingview's pine-editor output and also made chart generation optional so your script can run faster if you don't need it. 
- [IMPROVEMENT] Updated the [self.log()](https://docs.jesse.trade/docs/strategies/api.html#log) method to NOT send notifications by default in live mode. If you want to, you should pass `send_notification=True` to the method.
- [IMPROVEMENT] Improved handling of errors in the REST API for fetching candles in the live mode which was introduced in version `0.35.0`. 
- [IMPROVEMENT] Improved handling of the `entry_price` at FTX to be exactly what you see on their exchange dashboard. 
- [IMPROVEMENT] Improved a few error messages in the live mode to include useful information about the error for easier debugging in the future.
- [IMPROVEMENT] Added handling of `TypeError: 'NoneType' object is not subscriptable` errors caused by API keys being expired on Bybit. 
- [IMPROVEMENT] Improved handling of a few common errors in the live mode that are safe to ignore. 
- [IMPROVEMENT] Improved error handling for Bybit drivers in import-candles mode. 
- [IMPROVEMENT] Refactored the notifications handler to work in a separate thread so that in the case of notifications taking long to respond, the main execution won't be affected. 
- [IMPROVEMENT] You will now be asked if you're sure about closing the dashboard. This is to prevent accidental closing of the dashboard tab.
- [FIX] Fixed a couple of errors happening with notification drivers (Telegram and Discord)
- [FIX] Fixed a bug where empty log files were created in `storage/logs/backtest-mode` when running the optimize mode. 
- [FIX] Fixed the `ValueError: No value exists in Redis for process ID of: xxx` error that occurred in docker setups. It requires you to update your project's `docker-compose.yml` manually. Here's a [quick guide](https://github.com/jesse-ai/jesse/issues/336#issuecomment-1121903402). 
- [FIX] Implemented a workaround for an issue when sometimes multiple partially-filled orders in live mode caused unexpected behavior.
- [FIX] Fixed an issue when paper mode raised an error about API keys of `Bybit Perpetuals` if their values were empty in the `.env` file.

## 0.35.0 (6 April 2022)

- [NEW FEATURE] Added the [import_candles()](https://docs.jesse.trade/docs/research/candles.html#import-candles) method to the "research" module. 
- [IMPROVEMENT] Live mode now uses the REST API of the exchange to fetch candles and update the most recent candles. This is on top of the current Websocket implementation for real-time updates; and is supposed to make Jesse's data storage more reliable.
- [IMPROVEMENT] Added error handling for Telegram and Discord notifications. 
- [FIX] Fixed the `TypeError: decoding to str: need a bytes-like object, int found` occurring when resuming the previous live session with open orders on `Binance Futures` and `FTX Futures`.
- [FIX] Fixed a visual bug where the entry price of the positions were displayed incorrectly on the dashboard when live trading. 
- [FIX] Fixed an overflow bug in the daily_balances when using the research module's `backtest()` function. This did not affect the existing backtest and optimize mode of the GUI dashboard.
- [FIX] Fixed the bug where the progressbar was not working when importing candles in some browsers.

## 0.34.0 (24 March 2022)

- [IMPROVEMENTS] Instead of calculating changes in positions and orders, Jesse now uses data on the exchange to stay **in sync in real-time**. 
- [NEW FEATURE] Added **persistency** support to the live mode. Jesse is now able to stop and start at a later time without starting from scratch. 
- [NEW FEATURE] Added `is_stop_loss` and `is_take_profit` properties to the Order class. Useful for detecting the role of the executed order in methods such as [on_close_position()](https://docs.jesse.trade/docs/strategies/events.html#on-close-position-self-order).
- [BREAKING CHANGE] **Dependencies are now locked**. So from this version forward, doing `pip install jesse` will force your dependencies to be the same as the current version's requirements. This is to prevent you from installing a different version of the dependencies leading to unexpected behavior. 
- [NEW FEATURE] The position table now displays the liquidation price of the position in the live trading dashboard. 
- [NEW FEATURE] Added `has_long_entry_orders` and `has_short_entry_orders` properties to the Strategy class. They are used for knowing the type of entry orders for times that position is not opened yet such as inside the `should_cancel()` and `before()` methods and also in filters.
- [NEW FEATURE] Implemented a "check for newer version" component in the GUI dashboard. So you'll be notified inside the app for newer versions of both the framework and the live plugin. You can skip updates if you choose to. 
- [IMPROVEMENTS] Improved the handling of "PARTIALLY FILLED" orders in the live mode. The new refactor handles them properly, and also you can see in the dashboard the amount of the order that was filled.

## 0.33.0 (15 February 2022)

- [NEW FEATURE] Added [backtest](https://docs.jesse.trade/docs/research/backtest.html) function to the **"research"** module allowing you to run backtests via your **Python script** or **Jupyter notebook**.
- [NEW FEATURE] Added [store_candles](https://docs.jesse.trade/docs/research/candles.html#store-candles) function to the `research` module allowing you to store candles in the database. An example use case is to import candles from a **CSV file** so you can use them in your backtests.
- [NEW FEATURE] Added [fake_candle](https://docs.jesse.trade/docs/research/candles.html#fake-candle), [fake_range_candles](https://docs.jesse.trade/docs/research/candles.html#fake-range-candles) and [candles_from_close_prices](https://docs.jesse.trade/docs/research/candles.html#candles-from-close-prices) functions to the `research` module for generating fake candle data for backtest or other any kind of research.
- [NEW FEATURE] Added the "More" button for orders in the live mode which opens a slide over the page where you can **see all orders**. 
- [NEW FEATURE] Added the **value** of the position (in USDT) to the live dashboard. To use it, hover on the `qty` of each position. 
- [NEW FEATURE] Added support for running **multiple instances** of Jesse **simultaneously**. Useful for those who want to trade using multiple sub-accounts. Just make sure they have different `APP_PORT` values in their `.env` file. 
- [New FEATURE] Added a new **"Report"** button that is available during live sessions for submitting a report alongside logs of your running session. The previous report button was only available if an exception was raised causing the session to stop. This one is **always available**.
- [IMPROVEMENT] Exception **tracebacks** are now logged in the info logs and included in the reports helping us to track down bugs.
- [IMPROVEMENT] Strategies can now be **long-only**. That means `should_short()` and `go_short()` are optional. If you don't implement them, the strategy will be long-only.
- [IMPROVEMENT] Improved **debugging mode** in the optimize mode to include a log file that is downloadable at any point in time in the optimization mode. 
- [FIX] Fixed a bug causing optimization sessions to fail. The bug was introduced in the previous release.
- [FIX] Fixed a bug where the optimize mode failed if the number of hyperparameters was 1. 
- [FIX] Fixed usage of extra-routes in optimize mode. 
- [FIX] You can now trade symbols that are longer than 9 characters such as `MATIC-USDT`. 
- [FIX] Fixed a bug where position validation was stuck in a loop in live mode when trading multiple routes.
- [FIX] `watch_list` can now include all types of data. So errors such as `TypeError: Object of type Position is not JSON serializable` are no longer thrown.
- [FIX] Fixed the `TypeError: Argument 'data' has incorrect type (expected list, got dict)` error for the `Bybit Perpetual` driver.
- [FIX] Improved the way we keep the WS alive for the ByBit driver. No more WS disconnects every 10 minutes (although the reconnecting was working just fine)
- [FIX] Fixed the `AttributeError: 'NoneType' object has no attribute 'watch_list'` error for the live plugin.

## 0.32.0

- [NEW FEATURE]: Added the **[watch_list](https://docs.jesse.trade/docs/strategies/api.html#watch-list)** function for monitoring custom info in live modes. 
- [NEW FEATURE]: A "**Hyperparameters**" section is displayed in backtest results if the strategy has any hyperparameters defined. 
- [NEW FEATURE] Added **Bybit Perpetual** driver for live trading. 
- [NEW FEATURE]: Added support for PostgreSQL ssl mode via `POSTGRES_SSLMODE` environment variable. PR [submitted](https://github.com/jesse-ai/jesse/pull/307) by [Chirica Gheorghe](https://github.com/botzill). Thanks Chirica!
- [IMPROVEMENT] Sends notification for the "reconnect" message of the WS connection in live mode
- [IMPROVEMENT] Strategy execution for `update_position` is paused for 3 seconds if an order execution event was received before `update_position` was called. Reduces the number of unexpected behavior in live mode.
- [IMPROVEMENT] Doesn't log fee-charging if fees are set to zero. Makes it easier to read the logs when developing.
- [FIX] Fixed an issue in multi-threading which led to **memory leaks** when live trading on Linux machines. 
- [FIX] Fixed a rare `KeyError` when generating charts after backtests.
- [FIX] Fixed handling of the market `Partially filled` orders in live mode for `Binance Futures` driver. (limit `Partially filled` orders were working fine)
- [FIX] Improved request submission in live mode to prevent `Connection reset by peer` error.
- [FIX] Fixed a bug in updates of exit-orders made using `update_position()`.
- [FIX] Fixed a bug in displaying the timeframe of candles in the live dashboard for timeframes bigger than `1m`

## 0.31.0

- [NEW FEATURE] `Testnet Bybit Perpetuals` is now supported for backtesting, paper, and live trading
- [NEW FEATURE] Added [all_positions](/docs/strategies/api.html#all-positions) and [portfolio_value](/docs/strategies/api.html#portfolio-value) properties to the strategy API
- [Improvement] Automated "handling of take-profit and stop-loss that are priced the opposite of what they are supposed to" in strategies by closing the position instead of raising an exception causing the session to terminate. 
- [Improvement] Added support for cancelling (remaining) entry orders in `update_position()`
- [Improvement] Error logs are now logged as info logs as well so info logs now include all the logs. 
- [FIX] Fixed Discord notifications not working
- [FIX] Fixed an error when handling rejected (take-profit/stop-loss) orders in live trading sessions 
- [FIX] Fixed a bug that happened when live trading strategies that require "extra routes"
- [FIX] The research module has been updated to support usage in Jupyter Notebooks
- [FIX] Fixed a bug in database migrations 

## 0.30.0 (GUI Dashboard)

- [NEW FEATURE] GUI Dashboard is now available and replaces the CLI.
- [NEW FEATURE] Docker setup is improved and is now a first-class citizen of Jesse and is shipped with all newly created Jesse projects. It enabled you to run Jesse with one single command!
- [NEW FEATURE] Sending feedback and exception reports with optional log-file attachment right from within the dashboard.
- [NEW FEATURE] Responsive design which makes it easy to use even on mobile devices (if you install Jesse on a remote server)
- [NEW FEATURE] Added average execution time for optimizing mode
- [NEW FEATURE] All main forms of the dashboard remember your inputs. So repeating backtests, etc is much easier with a click of a button
- [NEW FEATURE] Ability to open multiple tabs (inside the dashboard itself) and run multiple candle importing and backtests in parallel. 
- [NEW FEATURE] You can choose between light and dark mode. 
- [BREAKING CHANGE] Environment variables are now set in the `.env` file, and application settings are now in the settings section of the dashboard. No more `config.py` and `live-config.py` files.
- [BREAKING CHANGE] DNAs of the optimize mode are now defined in the strategy instead of the `routes.py` file
- [Improvement] The error handling is now much more robust and reliable.
- [Improvement] Every time you run an action like a backtest, the action is run in a separate process. This means that the action is not blocking the main process; hence, the main process can continue to run even if an error occurs. One example good that comes out of this is that notifications are now more reliable. 
- [Improvement] Installation of the live-trade plugin is now fully automated. No need to manually find your machine's info, download, and install. 
- [Improvement] Faster backtest execution with the debug mode enabled because of no actual terminal printing
- [Improvement] Improved handling of database connections
- And much more! This was the biggest release yet.

::: tip
Starting from version 0.30.0, this page will include changelog of the live-trade plugin as well. 
:::

## 0.29.1
[Improvement] Change Python version validation to recognize 3.10 (understood it as 3.1 before)
[Improvement] The CSV created from the optimization mode now uses tab delimiter, as sometimes chars from the DNA would mess up the file.
[Improvement] The CSV created from the optimization mode now includes all metrics from the backtest. 
[Improvement] Added missing REQUIRED_PACKAGES to setup.py
[DEPRECATED] 3D and Week candles have been removed, as they differed from the exchange.

## 0.28.0
- [BREAKING CHANGE] `on_take_profit()` and `on_stop_loss()` event methods have been removed, and replaced with the `on_closed_position()` method. 
- [Improvement] If the price difference between the current price and order price are significantly small (less than 0.01%) Jesse will use a MARKET order instead of LIMIT or STOP. This probably has no effect on your backtests but prevents some communication errors from exchange's side in live trading mode. 
- [Improvement] Replaced `crypto_empyrical` package with `quantstats`. This means now the metrics in Jesse's metrics report and Quantstat's HTML reports should be identical.
- [NEW FEATURE] Added `smart sortino`, `smart sharpe` and `serenity` options for the optimize mode's fitness metric. 

## 0.27.3
- [NEW FEATURE] Add support for `FTX Futures` exchange's perpetual futures trading (both live-trade and backtest). 
- [NEW FEATURE] Add initial support for `Bybit Perpetuals` driver (backtest only). 
- [NEW FEATURE] Added `wavelet_denoising()` utility function. 
- [Improvement] Can handle many of order rejection events that sometimes happen from exchange's side instead of requiring to restart your live session. 

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
- Added the \_\_init\_\_ method to the strategy API
- Added the terminate() method to the strategy API
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
