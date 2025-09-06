# Monte Carlo Analysis

Monte Carlo analysis is a powerful way to test how good your trading strategies really are. Jesse provides two Monte Carlo methods that test different parts of your strategy:

1. **Trade-Order Shuffling Monte Carlo** (`monte_carlo_trades`) - Tests if trade timing matters
2. **Candles-Based Monte Carlo** (`monte_carlo_candles`) - Tests how well your strategy works in different market conditions

## Overview

Monte Carlo analysis helps answer important questions about your trading strategy:

- **Is my strategy's performance due to skill or just luck?**
- **How well does my strategy work in different market conditions?**
- **What range of results can I expect?**
- **Are my results meaningful or just random?**

Both methods create many test scenarios by changing the original data in different ways, then compare your original strategy results against all the test results.

### How it helps prevent overfitting

Monte Carlo analysis is an effective guard against overfitting. By running your strategy across many alternate market scenarios and shuffled trade sequences, Monte Carlo exposes results that only work for the original historical path. If the original backtest is an outlier while most simulations perform worse, this indicates overfitting — the strategy likely relies on specific price moves or timing that won't repeat. Use Monte Carlo findings to:

- Identify fragile parameter choices and reduce curve-fitting.
- Prefer strategy configurations that perform consistently across simulations rather than those that only excel on the original data.
- Combine both trade-order shuffling and candles-based simulations to test both timing sensitivity and structural robustness of your strategy.

Apply Monte Carlo early in development and after tuning to ensure changes improve genuine robustness and not just historical fit.


::: warning
Some Monte Carlo analysis features in Jesse (such as plotting scenario distributions or equity curves) require the `matplotlib` package. 

**Before running examples that use plotting, make sure to install it.**
:::


## Trade-Order Shuffling Monte Carlo

### Purpose

The `monte_carlo_trades` function tests whether the **timing** of your trades affects the overall performance. It mixes up the order of trades from your original backtest while keeping each individual trade result the same.

### How It Works

1. Runs the original backtest to collect all trades
2. For each test scenario, randomly shuffles the order of these trades
3. Rebuilds the equity curve with the shuffled trade order
4. Calculates performance numbers for each shuffled scenario
5. Compares your original results against all the shuffled results

### Usage

```python
from jesse.research import monte_carlo_trades

results = monte_carlo_trades(
    config=config,
    routes=routes,
    data_routes=data_routes,
    candles=candles,
    warmup_candles=warmup_candles,
    num_scenarios=1000,
    progress_bar=True,
    benchmark=True,
    fast_mode=True,
    cpu_cores=None
)

# Access structured fields
original = results['original']           # Original backtest dict
scenarios = results['scenarios']         # List of scenario dicts
confidence = results['confidence_analysis']

# Example: iterate scenario equity curves
for s in scenarios[:3]:
    equity_series = s['equity_curve'][0]['data']  # list of {time, value}
    final_value = equity_series[-1]['value']
    print(s['total_return'], final_value)
```

**Returns:** `dict` with keys:
- `original`: Original backtest result (same structure as a normal backtest result including: `metrics`, `trades`, `equity_curve`, etc.)
- `scenarios`: List[Scenario] where each Scenario contains:
  - `total_return` (float)
  - `final_value` (float)
  - `max_drawdown` (float)
  - `volatility` (float)
  - `sharpe_ratio` (float)
  - `calmar_ratio` (float)
  - `starting_balance` (float)
  - `trades`: list of trade dicts (same shape as normal backtest `trades`)
  - `equity_curve`: list with one series: `[ {"name": "Portfolio", "data": [{"time": int, "value": float}, ...]} ]`
- `confidence_analysis`: {
  - `summary`: {`num_simulations`, `significant_metrics_5pct`, `significant_metrics_1pct`, `total_metrics`}
  - `metrics`: { metric_name: {
        `original`,
        `simulations`: {`mean`, `std`, `min`, `max`, `count`},
        `percentiles`: {`5th`, `25th`, `50th`, `75th`, `95th`},
        `confidence_intervals`: {`90%`: {`lower`, `upper`}, `95%`: {`lower`, `upper`}},
        `p_value`, `is_significant_5pct`, `is_significant_1pct`
    } }
  - `interpretation`: {`detailed`: [...], `overall`: str }
- `num_scenarios`: number of completed scenarios actually returned
- `total_requested`: number of scenarios requested


### Parameters

- **config** (dict): Strategy configuration (same as backtest)
- **routes** (list): Trading routes configuration
- **data_routes** (list): Additional data routes needed by strategy
- **candles** (dict): Candle data for the analysis period
- **warmup_candles** (dict, optional): Warmup candle data
- **num_scenarios** (int, default=1000): Number of Monte Carlo scenarios to run
- **progress_bar** (bool, default=False): Show progress bar during execution
- **benchmark** (bool, default=False): Include benchmark comparison
- **fast_mode** (bool, default=True): Use optimized mode for faster execution
- **cpu_cores** (int, optional): Number of CPU cores to use (auto-detected if None)

### Understanding the Results

**What the numbers mean**: If your original strategy's performance ranks in the top 5% of shuffled scenarios, it means the timing of trades really matters for your performance.

**What this test shows**: This method separates the effect of trade timing from trade selection. A strategy that performs well even after shuffling shows good trade selection, while poor performance after shuffling means it depends on specific market timing.

## Candles-Based Monte Carlo

### Purpose

The `monte_carlo_candles` function tests how strong your strategy is by running backtests on **slightly changed versions** of the original market data. It uses candle pipelines to create different market scenarios while keeping the basic patterns of the original data.

### How It Works

1. Runs the original backtest on unchanged data
2. For each test scenario, uses a candle pipeline to modify the market data
3. Runs a full backtest on the changed data
4. Compares your original performance against all the changed-data results

### Usage

```python
from jesse.research import monte_carlo_candles
from jesse.research.monte_carlo.candle_pipelines import GaussianNoiseCandlesPipeline

results = monte_carlo_candles(
    config=config,
    routes=routes,
    data_routes=data_routes,
    candles=candles,
    warmup_candles=warmup_candles,
    num_scenarios=100,
    progress_bar=True,
    fast_mode=True,
    candles_pipeline_class=GaussianNoiseCandlesPipeline,
    candles_pipeline_kwargs={"batch_size": 7 * 24 * 60},  # 1 week in minutes
    cpu_cores=None
)

original = results['original']          # scenario_index == 0
scenarios = results['scenarios']        # List excluding original

print('Original Sharpe:', original['metrics']['sharpe_ratio'])
print('Simulated scenario count:', results['num_scenarios'])

# Example: compute distribution of net profit percentage
net_profits = [s['metrics']['net_profit_percentage'] for s in scenarios if 'metrics' in s]
if net_profits:
    import numpy as np
    print('Median net profit %:', np.median(net_profits))
```

**Returns:** `dict` with keys:
- `original`: Original backtest result (scenario_index == 0) including keys:
  - `scenario_index`: 0
  - `metrics`: full metrics dict from backtest (e.g. `net_profit_percentage`, `max_drawdown`, `sharpe_ratio`, `calmar_ratio`, `win_rate`, `annual_return`, etc.)
  - `equity_curve`: `[ {"name": "Portfolio", "data": [{"time": int, "value": float}, ...]} ]`
  - `trades`: list of trade dicts
- `scenarios`: List[Scenario] each with:
  - `scenario_index` (> 0)
  - `metrics`: same shape as original `metrics` (may omit some keys if unavailable)
  - `equity_curve`: same shape as above
  - `trades`: list of trade dicts
- `num_scenarios`: number of valid simulated scenarios (excluding original)
- `total_requested`: total requested (includes original + simulations)


Scenarios missing an `equity_curve` are filtered out automatically.

### Parameters

- **config** (dict): Strategy configuration
- **routes** (list): Trading routes configuration  
- **data_routes** (list): Additional data routes needed by strategy
- **candles** (dict): Candle data for the analysis period
- **warmup_candles** (dict, optional): Warmup candle data
- **num_scenarios** (int, default=1000): Number of Monte Carlo scenarios to run
- **progress_bar** (bool, default=False): Show progress bar during execution
- **fast_mode** (bool, default=True): Use optimized mode for faster execution
- **candles_pipeline_class** (class): Pipeline class to modify candles (see [Candle Pipelines](/docs/research/monte_carlo#candle-pipelines) section)
- **candles_pipeline_kwargs** (dict, optional): Parameters for the pipeline class
- **cpu_cores** (int, optional): Number of CPU cores to use

### Understanding the Results

**Strength Test**: This method tests how your strategy works under slightly different market conditions. Steady performance across scenarios means you have a strong strategy, while big differences in results means your strategy is sensitive to specific market patterns.

## Candle Pipelines

Candle pipelines are tools that change market data to create different test scenarios for Monte Carlo analysis. Jesse includes two built-in pipelines:

### GaussianNoiseCandlesPipeline

Adds random noise to candle prices while keeping realistic price relationships.

**Usage:**
```python
from jesse.research.monte_carlo.candle_pipelines import GaussianNoiseCandlesPipeline

pipeline_kwargs = {
    "batch_size": 7 * 24 * 60,  # 1 week in minutes
    "close_mu": 0.0,           # Average for close price noise
    "close_sigma": None,       # How much noise for close price (auto-calculated if None)
    "high_mu": 0.0,            # Average for high price noise  
    "high_sigma": None,        # How much noise for high price (auto-calculated if None)
    "low_mu": 0.0,             # Average for low price noise
    "low_sigma": None          # How much noise for low price (auto-calculated if None)
}
```

**What it does:**
- Automatically calculates appropriate noise levels based on past price movements
- Keeps proper OHLC relationships (High ≥ max(Open, Close), Low ≤ min(Open, Close))
- Makes sure all prices stay positive
- Keeps volume and timestamp data unchanged

### MovingBlockBootstrapCandlesPipeline

Uses moving block bootstrap to resample price movements while keeping short-term patterns.

**Usage:**
```python
from jesse.research.monte_carlo.candle_pipelines import MovingBlockBootstrapCandlesPipeline

pipeline_kwargs = {
    "batch_size": 7 * 24 * 60  # 1 week in minutes
}
```

**What it does:**
- Resamples blocks of connected price movements
- Keeps short-term patterns in price changes
- Automatically finds the right block size from batch_size
- Keeps realistic price behavior

## Complete Example

Here's a comprehensive example that runs both Monte Carlo methods:

```python
from jesse.enums import exchanges
import os

import jesse.helpers as jh
from jesse.research import get_candles
from jesse.research.monte_carlo import (
    monte_carlo_candles, 
    monte_carlo_trades,
    print_monte_carlo_candles_summary, 
    plot_monte_carlo_candles_chart,
    print_monte_carlo_trades_summary, 
    plot_monte_carlo_trades_chart
)
from jesse.research.monte_carlo.candle_pipelines import GaussianNoiseCandlesPipeline, MovingBlockBootstrapCandlesPipeline

# =============================================================================
# CONFIGURATION - MODIFY ALL SETTINGS HERE
# =============================================================================

# Trading Routes Configuration
TRADING_ROUTES = [
    {"exchange": exchanges.BINANCE_PERPETUAL_FUTURES, "symbol": "BTC-USDT", "timeframe": "5m", "strategy": "MyAwesomeStrategy"},
]

# Data Routes Configuration 
DATA_ROUTES = [
    {"exchange": exchanges.BINANCE_PERPETUAL_FUTURES, "symbol": "BTC-USDT", "timeframe": "4h"},
]

# Simulation Configuration
SIMULATION_CONFIG = {
    "num_scenarios": 40,  # Back to normal
    "start_date": "2025-03-01", 
    "end_date": "2025-09-01",
    "progress_bar": True,
    "benchmark": True,
    "fast_mode": True,
}

# Strategy Configuration
STRATEGY_CONFIG = {
    "starting_balance": 10_000,
    "fee": 0.05 / 100,
    "type": "futures",
    "futures_leverage": 10,
    "futures_leverage_mode": "cross",
    "warm_up_candles": 210,
}

# Monte Carlo Candles Pipeline Configuration
MONTE_CARLO_CANDLES_CONFIG = {
    # "pipeline_class": MovingBlockBootstrapCandlesPipeline,
    # "pipeline_kwargs": {"batch_size": 7 * 24 * 60}, # 1 week batches
    "pipeline_class": GaussianNoiseCandlesPipeline,
    "pipeline_kwargs": {"batch_size": 7 * 24 * 60}, # 1 week batches
}

# =============================================================================


def get_configured_routes():
    routes = []
    for route in TRADING_ROUTES:
        routes.append({
            'exchange': route['exchange'],
            'symbol': route['symbol'], 
            'timeframe': route['timeframe'],
            'strategy': route['strategy']
        })
    data_routes = []
    for route in DATA_ROUTES:
        data_routes.append({
            'exchange': route['exchange'],
            'symbol': route['symbol'],
            'timeframe': route['timeframe']
        })
    return routes, data_routes


def prepare_candles_for_simulations(routes: list, data_routes: list, start_date_str: str, finish_date_str: str, config: dict):
    all_routes = routes + data_routes
    trading_candles = {}
    warmup_candles = {}
    unique_symbol_exchanges = set()
    for route in all_routes:
        unique_symbol_exchanges.add((route["exchange"], route["symbol"], route["timeframe"]))
    for route_exchange, route_symbol, route_timeframe in unique_symbol_exchanges:
        _warmup_candles, _trading_candles = get_candles(
            route_exchange,
            route_symbol,
            route_timeframe,
            jh.date_to_timestamp(start_date_str),
            jh.date_to_timestamp(finish_date_str),
            config["warm_up_candles"],
            caching=True,
            is_for_jesse=True,
        )
        key = jh.key(route_exchange, route_symbol)
        if key not in trading_candles:
            trading_candles[key] = {
                "exchange": route_exchange,
                "symbol": route_symbol,
                "candles": _trading_candles,
                "timeframe": route_timeframe,
            }
            warmup_candles[key] = {
                "exchange": route_exchange,
                "symbol": route_symbol,
                "candles": _warmup_candles,
                "timeframe": route_timeframe,
            }
        else:
            if jh.timeframe_to_one_minutes(route_timeframe) > jh.timeframe_to_one_minutes(trading_candles[key]["timeframe"]):
                trading_candles[key] = {
                    "exchange": route_exchange,
                    "symbol": route_symbol,
                    "candles": _trading_candles,
                    "timeframe": route_timeframe,
                }
                warmup_candles[key] = {
                    "exchange": route_exchange,
                    "symbol": route_symbol,
                    "candles": _warmup_candles,
                    "timeframe": route_timeframe,
                }
    return trading_candles, warmup_candles

# =============================================================================

if __name__ == "__main__":
    import logging, os
    os.environ['RAY_DISABLE_IMPORT_WARNING'] = '1'
    logging.getLogger('ray').setLevel(logging.ERROR)
    print("🚀 Starting Jesse Monte Carlo (candles + trades) Analysis")
    print("=" * 50)
    routes, data_routes = get_configured_routes()
    config = STRATEGY_CONFIG.copy(); config["exchange"] = TRADING_ROUTES[0]["exchange"]
    start_date = SIMULATION_CONFIG["start_date"]; end_date = SIMULATION_CONFIG["end_date"]; num_scenarios = SIMULATION_CONFIG["num_scenarios"]
    print(f"📋 Configuration:")
    print(f"   Trading Routes:")
    for route in TRADING_ROUTES:
        print(f"     {route['symbol']}@{route['timeframe']} ({route['strategy']})")
    print(f"   Data Routes:")
    if DATA_ROUTES:
        for route in DATA_ROUTES:
            print(f"     {route['symbol']}@{route['timeframe']}")
    else:
        print(f"     None (modify DATA_ROUTES at top of file to add)")
    print(f"   Period: {start_date} to {end_date}")
    print(f"   Scenarios: {num_scenarios}")
    trading_candles, warmup_candles = prepare_candles_for_simulations(routes, data_routes, start_date, end_date, config)

    print(f"\n🎯 Running Monte Carlo (candles)...")
    mc_candles_results = monte_carlo_candles(
        config,
        routes,
        data_routes,
        progress_bar=SIMULATION_CONFIG["progress_bar"],
        candles=trading_candles,
        warmup_candles=warmup_candles,
        num_scenarios=num_scenarios,
        fast_mode=SIMULATION_CONFIG["fast_mode"],
        candles_pipeline_class=MONTE_CARLO_CANDLES_CONFIG["pipeline_class"],
        candles_pipeline_kwargs=MONTE_CARLO_CANDLES_CONFIG["pipeline_kwargs"],
    )
    print_monte_carlo_candles_summary(mc_candles_results)
    plot_monte_carlo_candles_chart(mc_candles_results)

    print(f"\n🎯 Running Monte Carlo (trades)...")
    monte_carlo_results = monte_carlo_trades(
        config,
        routes,
        data_routes,
        progress_bar=SIMULATION_CONFIG["progress_bar"],
        candles=trading_candles,
        warmup_candles=warmup_candles,
        num_scenarios=num_scenarios,
        benchmark=SIMULATION_CONFIG["benchmark"],
        fast_mode=SIMULATION_CONFIG["fast_mode"],
    )
    print_monte_carlo_trades_summary(monte_carlo_results)
    plot_monte_carlo_trades_chart(monte_carlo_results)

    print(f"\n✅ Analysis complete!")
    print("=" * 50)
```

## How to Read Your Results

### Understanding the Results Table

The Monte Carlo analysis shows your results in an easy-to-read table format with four key columns:

- **Original**: Your strategy's actual performance on the real historical data
- **Worst 5%**: The bottom 5% of all test scenarios (worst-case results)  
- **Median**: The middle value when all scenarios are sorted (typical performance)
- **Best 5%**: The top 5% of all test scenarios (best-case results)

### Interpreting Your Performance

**Where does your original result fall?**
- **Better than Best 5%**: ⚠️ **Warning: Likely Overfitting** - Your strategy may be too specifically tuned to historical data and unlikely to repeat in live trading
- **Between Median and Best 5%**: Good but be cautious - Strategy shows some luck dependency, monitor for overfitting
- **Near Median**: ✅ **Ideal Range** - Your strategy is robust and doesn't rely on getting lucky. Even with unfavorable conditions, you still get good results

**Why being close to the median is best**: If your results are near the median of all test scenarios, it means your strategy performed well even when conditions were "unlucky" (modified data, shuffled trades). This suggests that with normal or slightly favorable conditions in live trading, you're likely to see even better results.

### Example Output

When you run a complete Monte Carlo analysis, you'll see output like this:

```text
   Metric                | Original | Worst 5% | Median | Best 5%
   ----------------------+----------+----------+--------+--------
   Net Profit Percentage | 81.8%    | 19.0%    | 55.5%  | 101.7% 
   Max Drawdown (%)      | -10.4%   | -5.5%    | -3.0%  | -1.2%  
   Sharpe Ratio          | 3.28     | 2.64     | 4.49   | 6.46   
   Win Rate (%)          | 70.8%    | 98.2%    | 99.2%  | 100.0% 
   Total                 | 154.0    | 162.6    | 266.0  | 429.5  
   Annual Return         | 227.2%   | 41.3%    | 140.0% | 302.1% 
   Calmar Ratio          | 21.95    | 11.68    | 46.79  | 125.79 
   Expectancy Percentage | 0.5%     | 0.1%     | 0.2%   | 0.3%   

   📊 Interpretation:
   • This tests how your strategy performs across different market conditions under resampled candles
Number of Monte Carlo candles scenarios found: 39
Saved Monte Carlo candles chart to: /Users/salehmir/Codes/jesse/dev-jesse/bot/charts/monte_carlo_candles_chart_20250905_200323.png

🎯 Running Monte Carlo (trades)...
2025-09-05 20:03:24,433	INFO worker.py:1841 -- Started a local Ray instance.
Successfully started Monte Carlo simulation with 12 CPU cores
Monte Carlo Scenarios: 100%|█████████████████████████████████████████████████████████████| 40/40 [00:01<00:00, 24.13it/s]
Completed 40 Monte Carlo scenarios out of 40 requested

🔀 MONTE CARLO TRADES (trade-order shuffle test)
   Simulations: 40
   Metric           | Original | Worst 5% | Median | Best 5%
   -----------------+----------+----------+--------+--------
   Max Drawdown (%) | 10.35%   | 28.3%    | 16.0%  | 10.5%  
   Sharpe Ratio     | 3.28     | 2.74     | 3.08   | 3.44   
   Calmar Ratio     | 21.95    | 2.89     | 5.11   | 7.76   
```

### Key Metrics to Watch

1. **Total Return/Net Profit**: How much money you made overall
2. **Max Drawdown**: The worst losing streak
3. **Sharpe Ratio**: How good your returns are compared to risk
4. **Calmar Ratio**: Return compared to worst drawdown
5. **Win Rate**: Percentage of winning trades

### What Your Results Mean

**For Trade-Order Shuffling:**
- **Original much better than Best 5%**: ⚠️ Strategy likely overfit to specific trade timing sequences
- **Original near Median**: ✅ **Ideal** - Robust trade selection that doesn't depend on lucky timing

**For Candles-Based Monte Carlo:**
- **Original much better than Best 5%**: ⚠️ Strategy likely overfit to specific historical market patterns
- **Original near Median**: ✅ **Ideal** - Strategy works robustly across different market conditions  

**Reading the Spread:**
- **Narrow range** (small difference between Worst 5% and Best 5%): Consistent, reliable strategy
- **Wide range** (big difference between Worst 5% and Best 5%): High variability - strategy performance depends heavily on market conditions


## Best Practices

1. **How many scenarios**: Use at least 1000 scenarios for trade shuffling, 100+ for candles-based
2. **Test different periods**: Test across different time periods and market conditions
3. **Try different settings**: Test with different pipeline parameters
4. **Use both methods**: Use both methods together for complete validation
5. **Don't pick favorites**: Don't cherry-pick results; accept what the numbers show
6. **Think about real impact**: Consider if meaningful differences actually matter for trading

## Performance Tips

- **CPU Cores**: Monte Carlo analysis can use multiple CPU cores for faster processing (by default, it uses 80% of the available cores)
- **Memory Usage**: Large datasets may need significant RAM
- **Fast Mode**: Enables optimizations for quicker execution

Monte Carlo analysis is an essential tool for checking if your trading strategies are really good. Use it regularly to make sure your strategies are truly strong rather than just lucky.
