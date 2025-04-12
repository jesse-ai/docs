---
title: 'Overfitting'
---

# Preventing Overfitting

When it comes to optimization, overfitting is probably the biggest danger. Overfitting occurs when a model performs well on the data it was trained on but fails to generalize to new data. In trading, this often results in strategies that look great in backtests but perform poorly in live trading.

## Jesse's Approach to Preventing Overfitting

Jesse's optimization mode is designed with built-in safeguards against overfitting:

1. **Training/Testing Split**: The optimization process evaluates each parameter set on both training and testing datasets.

2. **Optimization for Robustness**: The objective functions (Sharpe, Calmar, etc.) favor consistent performance over occasional big wins.

3. **Optimal Trades Parameter**: This helps filter out parameter combinations that result in too few trades, which are more likely to be statistical outliers.

## Three-Period Validation Method

For thorough validation, we recommend dividing your dataset into three periods:

1. **Training Period (60-70%)**: Used by the optimizer to find the best parameters
2. **Testing Period (15-20%)**: Used during optimization to verify parameters work on unseen data
3. **Validation Period (15-20%)**: Not used in optimization at all; reserved for final validation

Here's how to implement this approach:

1. Identify your full period, for example from 2018-01-01 to 2020-01-01 (24 months)

2. Divide it into the three periods:
   - Training period: 2018-01-01 to 2019-04-30 (16 months)
   - Testing period: 2019-05-01 to 2019-08-31 (4 months)
   - Validation period: 2019-09-01 to 2020-01-01 (4 months)

3. Run the optimization using the training and testing periods.

4. In the optimization results, look for parameter combinations that perform well in both training and testing periods:

![picking-good-parameters](https://api1.jesse.trade/storage/images/docs/picking-good-dnas.jpg)

5. Select several of the best-performing parameter combinations and test each of them on the validation period.

6. Choose the parameter combination that performs consistently across all three periods, not just the one with the highest metrics.

## Warning Signs of Overfitting

Be cautious if you observe:

1. Parameters that perform extremely well in training but poorly in testing
2. Very few trades during the testing period
3. Highly specific parameter values that seem arbitrary
4. Performance that's significantly better than logical market expectations

Remember, the goal is to find robust parameters that work well across different market conditions, not just parameters optimized for a specific historical period.
