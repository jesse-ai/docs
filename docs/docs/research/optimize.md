# Optimize

The `optimize()` research function lets you run hyperparameter optimization from a Python script or Jupyter notebook — no dashboard required. It mirrors how `monte_carlo_trades()` and `backtest()` work: you prepare candle data, configure the run, call the function, and inspect a structured result.

Under the hood it uses [Optuna](https://optuna.org/) for parameter search and [Ray](https://www.ray.io/) for parallel trial execution — exactly like the dashboard's optimization mode — but without any session, database, or WebSocket dependencies.

## When to Use

- **Scripted batch runs** — automate optimization across multiple symbols, timeframes, or strategy variants from a single Python script.
- **Jupyter workflows** — explore parameter sensitivity interactively without leaving the notebook.
- **CI pipelines** — gate strategy deployments on minimum fitness or Sharpe thresholds by running optimization as part of an automated test suite.
- **Chaining with Monte Carlo** — after finding good parameters with `optimize()`, validate robustness with `monte_carlo_trades()` or `monte_carlo_candles()` before committing to live trading.

## Function Signature

```python
from jesse.research import optimize

result = optimize(
    config: dict,
    routes: list,
    data_routes: list,
    training_candles: dict,
    training_warmup_candles: dict,
    testing_candles: dict,
    testing_warmup_candles: dict,
    optimal_total: int = 200,
    fast_mode: bool = True,
    cpu_cores: Optional[int] = None,
    n_trials: Optional[int] = None,
    objective_function: str = 'sharpe',
    best_candidates_count: int = 20,
    progress_bar: bool = True,
) -> dict
```

## Parameters

- **`config`** (dict): Strategy and exchange configuration. See [Config Structure](#config-structure) below for the exact shape — it differs from the `config` dict used by `backtest()`.
- **`routes`** (list): Trading routes in the same format as `backtest()`. Each entry is a dict with `'symbol'`, `'timeframe'`, and `'strategy'` keys. The `'exchange'` key is injected automatically from `config['exchange']['name']`, so you do not need to set it manually.
- **`data_routes`** (list): Additional data routes (e.g. higher timeframes) that the strategy reads via `self.get_candles()` but does not trade on. Same format as `backtest()`. Pass an empty list if not needed.
- **`training_candles`** (dict): Candle data for the **training** period — the period the optimizer actively tunes parameters against. Keyed by `jh.key(exchange, symbol)`.
- **`training_warmup_candles`** (dict): Warmup candle data corresponding to the training period. Same key format.
- **`testing_candles`** (dict): Candle data for the **testing / validation** period. This period is completely held out and is never seen during the parameter search — it is used only to measure how well the optimized parameters generalize.
- **`testing_warmup_candles`** (dict): Warmup candle data corresponding to the testing period.
- **`optimal_total`** (int, default `200`): Target number of trades used in fitness normalisation. Trials with fewer than 5 trades score near zero; trials whose trade count approaches `optimal_total` receive full credit for the trade-count component. Set this to roughly the number of trades your strategy is expected to produce over the training period.
- **`fast_mode`** (bool, default `True`): Enables the fast backtest engine. Keep this `True` for optimization — it is the same engine used by the dashboard and is orders of magnitude faster than the standard engine.
- **`cpu_cores`** (int, optional): Number of parallel Ray workers to use. Defaults to 80% of available CPU cores on the machine.
- **`n_trials`** (int, optional): Total number of Optuna trials to run. Defaults to `number_of_hyperparameters × 200`. For a strategy with 3 hyperparameters that is 600 trials; consider passing a smaller value (e.g. `100`) for a quick exploratory run.
- **`objective_function`** (str, default `'sharpe'`): The metric each trial is optimised to maximise. Accepted values: `'sharpe'`, `'calmar'`, `'sortino'`, `'omega'`.
- **`best_candidates_count`** (int, default `20`): How many top-scoring trials to keep and return in `result['best_trials']`.
- **`progress_bar`** (bool, default `True`): Show a `tqdm` progress bar in the terminal while trials are running.

## Config Structure

The `config` dict passed to `optimize()` has a **different shape** from the flat dict used by `backtest()`. It wraps exchange settings inside a nested `'exchange'` key:

```python
config = {
    'exchange': {
        'name': 'Binance Perpetual Futures',   # exchange name constant
        'balance': 10_000,                     # starting balance in USDT
        'fee': 0.0007,                         # taker fee as a decimal
        'type': 'futures',                     # 'futures' or 'spot'
        'futures_leverage': 2,
        'futures_leverage_mode': 'cross',      # 'cross' or 'isolated'
    },
    'warm_up_candles': 210,                    # warmup bars before trading begins
}
```

::: tip
For `'type': 'spot'` strategies you can omit `futures_leverage` and `futures_leverage_mode` — they are ignored for spot accounts.
:::

## Return Value

`optimize()` returns a typed dict (`OptimizeReturn`) with the following keys:

- **`best_trials`** (list): The top `best_candidates_count` trials sorted by fitness score (highest first). Each entry is a dict containing:
  - `rank` (int) — position in the ranking, 1-indexed
  - `trial` (int) — the Optuna trial number
  - `params` (dict) — the hyperparameter values that produced this result
  - `fitness` (float) — the composite fitness score (0 to ~1); higher is better
  - `dna` (str) — base64-encoded representation of the params; can be pasted directly into the Jesse dashboard's **DNA** field to instantly apply those parameters
  - `training_metrics` (dict) — full backtest metrics dict for the training period
  - `testing_metrics` (dict) — full backtest metrics dict for the testing / validation period
- **`total_trials`** (int): Total number of trials that were requested.
- **`completed_trials`** (int): Number of trials that actually finished (some may be pruned or fail).
- **`objective_function`** (str): The objective function that was used for this run.

## Printing Results

Jesse ships a ready-made summary printer so you don't have to format the result dict manually:

```python
from jesse.research import print_optimize_summary

# Show DNA strings in the last column (default)
print_optimize_summary(result)

# Show raw parameter dicts instead of DNA strings
print_optimize_summary(result, show_params=True)
```

### Parameters

- **`result`** (dict): The dict returned by `optimize()`.
- **`show_params`** (bool, default `False`): When `False` (the default), the last column of the table shows the compact **DNA** string for each trial. When `True`, the last column shows the raw **parameter dict** instead.

### Example output (default — DNA column)

```text
Completed 30 / 30 trials  |  Objective: sharpe

Rank  Trial     Fitness  Train Sharpe Ratio  Test Sharpe Ratio  DNA
----  --------  -------  ------------------  -----------------  ---
#1    Trial 17  0.1966   0.7962              0.8909             eyJlbnRyeV9hdHJfbXVsdGlwbGllciI6IDAuOTJ9
#2    Trial 6   0.1765   0.8148              1.5286             eyJlbnRyeV9hdHJfbXVsdGlwbGllciI6IDAuNTl9
...
```

### Example output (`show_params=True`)

```text
Completed 30 / 30 trials  |  Objective: sharpe

Rank  Trial     Fitness  Train Sharpe Ratio  Test Sharpe Ratio  Params
----  --------  -------  ------------------  -----------------  ------
#1    Trial 17  0.1966   0.7962              0.8909             {'entry_atr_multiplier': 0.92, 'stop_loss': 2.81, 'adx_threshold': 36}
#2    Trial 6   0.1765   0.8148              1.5286             {'entry_atr_multiplier': 0.59, 'stop_loss': 2.80, 'adx_threshold': 43}
...
```

## Hyperparameters

Your strategy must implement a `hyperparameters()` method that returns the search space. Refer to the [hyperparameters documentation](/docs/optimize/hyperparameters) for the full specification. A minimal example:

```python
def hyperparameters(self) -> list:
    return [
        {'name': 'slow_period', 'type': int,   'min': 50,  'max': 200, 'default': 100},
        {'name': 'fast_period', 'type': int,   'min': 10,  'max': 50,  'default': 20},
        {'name': 'threshold',   'type': float, 'min': 0.1, 'max': 2.0, 'default': 1.0},
    ]
```

Inside the strategy, read the current trial's values via `self.hp`:

```python
slow = self.hp['slow_period']
fast = self.hp['fast_period']
```

## Using the DNA

Every trial in `best_trials` includes a `dna` field — a compact base64 string that encodes the full parameter set. You can paste it directly into the **DNA** field of the Jesse dashboard's backtest or live form to instantly load those parameters without typing them manually.

You can also work with both `params` and `dna` programmatically:

```python
best = result['best_trials'][0]
print('Best params:', best['params'])
print('DNA:', best['dna'])
```

## Complete Example

The following script is ready to copy and run. It loads candles for a training window and a held-out testing window, runs the optimization, prints the summary, and then inspects the top result directly.

```python
import logging
import os

# suppress Ray startup noise
os.environ['RAY_DISABLE_IMPORT_WARNING'] = '1'
logging.getLogger('ray').setLevel(logging.ERROR)

from jesse.enums import exchanges
import jesse.helpers as jh
from jesse.research import get_candles, optimize, print_optimize_summary

# =============================================================================
# CONFIGURATION
# =============================================================================

EXCHANGE = exchanges.BINANCE_PERPETUAL_FUTURES
SYMBOL   = 'BTC-USDT'
TIMEFRAME = '4h'

TRAINING_START  = '2021-01-01'
TRAINING_FINISH = '2023-12-31'
TESTING_START   = '2024-01-01'
TESTING_FINISH  = '2024-12-31'

WARM_UP_CANDLES = 210

CONFIG = {
    'exchange': {
        'name': EXCHANGE,
        'balance': 10_000,
        'fee': 0.0007,
        'type': 'futures',
        'futures_leverage': 2,
        'futures_leverage_mode': 'cross',
    },
    'warm_up_candles': WARM_UP_CANDLES,
}

ROUTES = [
    # Replace 'MyStrategy' with your actual strategy class or string name
    {'symbol': SYMBOL, 'timeframe': TIMEFRAME, 'strategy': 'MyStrategy'},
]

DATA_ROUTES = []


# =============================================================================
# HELPER — load and wrap candles for one date range
# =============================================================================

def load_candles_for_period(start: str, finish: str) -> tuple:
    """Return (trading_candles_dict, warmup_candles_dict) for the given period."""
    warmup_arr, trading_arr = get_candles(
        EXCHANGE,
        SYMBOL,
        TIMEFRAME,
        jh.date_to_timestamp(start),
        jh.date_to_timestamp(finish),
        WARM_UP_CANDLES,
        caching=True,       # cache to disk — repeated runs skip the DB query
        is_for_jesse=True,  # required when passing arrays to optimize()
    )

    key = jh.key(EXCHANGE, SYMBOL)

    trading_candles = {
        key: {'exchange': EXCHANGE, 'symbol': SYMBOL, 'candles': trading_arr}
    }
    warmup_candles = {
        key: {'exchange': EXCHANGE, 'symbol': SYMBOL, 'candles': warmup_arr}
    }

    return trading_candles, warmup_candles


# =============================================================================
# MAIN
# =============================================================================

if __name__ == '__main__':
    print('📦 Loading candles...')
    training_candles, training_warmup = load_candles_for_period(TRAINING_START, TRAINING_FINISH)
    testing_candles,  testing_warmup  = load_candles_for_period(TESTING_START,  TESTING_FINISH)

    print(f'   Training : {TRAINING_START} → {TRAINING_FINISH}')
    print(f'   Testing  : {TESTING_START}  → {TESTING_FINISH}')
    print()

    print('🚀 Starting optimization...')
    result = optimize(
        config=CONFIG,
        routes=ROUTES,
        data_routes=DATA_ROUTES,
        training_candles=training_candles,
        training_warmup_candles=training_warmup,
        testing_candles=testing_candles,
        testing_warmup_candles=testing_warmup,
        optimal_total=200,
        fast_mode=True,
        objective_function='sharpe',   # 'sharpe' | 'calmar' | 'sortino' | 'omega'
        best_candidates_count=20,
        progress_bar=True,
    )

    # Pretty-print the ranked table
    print_optimize_summary(result)

    # Access the top result directly
    best = result['best_trials'][0]
    print('Best params:', best['params'])
    print('Training Sharpe:', best['training_metrics'].get('sharpe_ratio'))
    print('Testing  Sharpe:', best['testing_metrics'].get('sharpe_ratio'))
    print('DNA:', best['dna'])
```

## Interpreting Results

### Fitness Score

The fitness score is a composite value that combines the chosen objective metric (e.g. Sharpe ratio) with a trade-count component that rewards trials close to `optimal_total` trades and penalises trials with very few trades.

- Scores **above ~0.0001** are generally "usable" — they indicate the trial completed with enough trades for the metric to be meaningful.
- The absolute value is **not directly interpretable** in human terms; use it only for ranking trials against each other.
- Always look at the underlying `training_metrics` and `testing_metrics` (e.g. Sharpe ratio, Calmar ratio, max drawdown) to judge the actual quality of a trial.

### Training vs Testing

The function enforces a strict train / test split:

- The optimizer tunes parameters **entirely on the training data**. The Optuna objective function sees only training period metrics.
- The testing period is **completely held out** during the search. Testing metrics are computed once — after the best trial parameters are already fixed — and are used purely to measure generalisation.
- A good trial has both training **and** testing metrics in reasonable ranges.
- A trial whose training metrics look excellent but whose testing metrics collapse is a sign of overfitting to the training window.

### Overfitting Warning

::: warning
Running more trials increases the chance of finding a parameter set that happened to work well historically by coincidence. More is not always better.
:::

## Tips

- **Start with fewer trials.** `n_trials` defaults to `num_hyperparameters × 200`. For 3 hyperparameters that is 600 trials, which can take a long time. Pass `n_trials=100` for a quick first pass to check that everything is wired up correctly, then run the full count overnight.

- **Set `optimal_total` to match your strategy.** If your strategy typically produces 50 trades over a 3-year training period, pass `optimal_total=50`. Using the default of `200` when your strategy rarely trades will unfairly penalise otherwise good trials.

- **Use `caching=True` in `get_candles()`.** Candle arrays are cached to disk the first time they are fetched. Subsequent calls for the same exchange / symbol / timeframe / date range load from cache and skip the database entirely, saving significant time on repeated runs.

- **Chain with Monte Carlo for robustness.** `optimize()` finds parameter sets that score well on historical data. After you have promising candidates, run them through `monte_carlo_trades()` or `monte_carlo_candles()` to verify that the performance holds across shuffled trade sequences and resampled market conditions before committing to live trading.
