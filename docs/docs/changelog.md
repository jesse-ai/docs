# Changelog

Here you can see the changes made with each release of the main framework and the live trading plugin: 

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
