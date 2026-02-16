# Candle Pipelines

Candle pipelines determine how market data is modified to create different test scenarios for the [candles-based Monte Carlo](/docs/monte-carlo/candles-based) analysis. Jesse includes two built-in pipelines.

## Moving Block Bootstrap

Uses moving block bootstrap to resample price movements while keeping short-term patterns. This is the **recommended pipeline** for most cases.

**What it does:**
- Resamples blocks of connected price movements
- Keeps short-term patterns in price changes
- Automatically finds the right block size from the batch size
- Keeps realistic price behavior

**When to use this:**
- Highly recommended for most cases because it preserves local structure without needing to hand-pick sigma values.
- The batch size (in one-minute candles) controls the typical block length that is resampled. For example, `7 * 24 * 60` corresponds to one week. Increase it to retain more short-term trend/direction; decrease it to encourage more frequent regime mixing.

## Gaussian Noise

Adds random noise to candle prices while keeping realistic price relationships.

**What it does:**
- Uses the specified sigma values to add gaussian noise to price data
- Keeps proper OHLC relationships (High >= max(Open, Close), Low <= min(Open, Close))
- Makes sure all prices stay positive
- Keeps volume and timestamp data unchanged

**Choosing sigma values:**
- Set `close_sigma` to roughly match the average absolute price change per one-minute candle in your dataset. For example, if the average 1m change is about $10, set `close_sigma = 10.0`.
- Set `high_sigma` and `low_sigma` smaller than close, for example `2.0`, to create realistic high/low wicks without overwhelming the candle body.
- These are not one-size-fits-all. You should experiment with different sigma values to best approximate the level of noise you want to inject for your asset and timeframe.

**About batch size:**
- The batch size is the number of one-minute candles processed per batch by the pipeline. For example, `7 * 24 * 60` equals one week of one-minute candles.
- You can tune this value depending on how much short-term market direction you want to preserve within each transformation step. Larger batches can better retain short-horizon structure; smaller batches increase mixing.

## Which pipeline should I use?

If you're unsure which pipeline to choose, go with **Moving Block Bootstrap**. It produces realistic market scenarios without requiring you to manually tune noise parameters, making it the better default choice.

Use **Gaussian Noise** when you want fine-grained control over exactly how much randomness is injected into the price data, or when you want to test your strategy against specific levels of market noise.
