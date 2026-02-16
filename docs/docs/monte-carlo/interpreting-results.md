# Interpreting Results

After running a Monte Carlo session, Jesse presents your results in a clear summary. Understanding how to read these results is essential for making good decisions about your strategy.

## The results table

The Monte Carlo results are shown in a table with four key columns:

- **Original**: Your strategy's actual performance on the real historical data
- **Worst 5%**: The bottom 5% of all test scenarios (worst-case results)  
- **Median**: The middle value when all scenarios are sorted (typical performance)
- **Best 5%**: The top 5% of all test scenarios (best-case results)

<!-- TODO: add screenshot of the Monte Carlo results table in the dashboard -->

## Where does your original result fall?

- **Better than Best 5%**: **Warning: Likely Overfitting** - Your strategy may be too specifically tuned to historical data and unlikely to repeat in live trading
- **Between Median and Best 5%**: Good but be cautious - Strategy shows some luck dependency, monitor for overfitting
- **Near Median**: **Ideal Range** - Your strategy is robust and doesn't rely on getting lucky. Even with unfavorable conditions, you still get good results

**Why being close to the median is best**: If your results are near the median of all test scenarios, it means your strategy performed well even when conditions were "unlucky" (modified data, shuffled trades). This suggests that with normal or slightly favorable conditions in live trading, you're likely to see even better results.

## Key metrics to watch

1. **Total Return/Net Profit**: How much money you made overall
2. **Max Drawdown**: The worst losing streak
3. **Sharpe Ratio**: How good your returns are compared to risk
4. **Calmar Ratio**: Return compared to worst drawdown
5. **Win Rate**: Percentage of winning trades

## What your results mean

**For Trade-Order Shuffling:**
- **Original much better than Best 5%**: Strategy likely overfit to specific trade timing sequences
- **Original near Median**: **Ideal** - Robust trade selection that doesn't depend on lucky timing

**For Candles-Based Monte Carlo:**
- **Original much better than Best 5%**: Strategy likely overfit to specific historical market patterns
- **Original near Median**: **Ideal** - Strategy works robustly across different market conditions  

## Reading the spread

- **Narrow range** (small difference between Worst 5% and Best 5%): Consistent, reliable strategy
- **Wide range** (big difference between Worst 5% and Best 5%): High variability — strategy performance depends heavily on market conditions

## Best practices

1. **How many scenarios**: Use at least 1000 scenarios for trade shuffling, 100+ for candles-based
2. **Test different periods**: Test across different time periods and market conditions
3. **Try different settings**: Test with different pipeline parameters for candles-based Monte Carlo
4. **Use both methods**: Use both trade-order shuffling and candles-based together for complete validation
5. **Don't pick favorites**: Don't cherry-pick results; accept what the numbers show
6. **Think about real impact**: Consider if meaningful differences actually matter for your trading

Monte Carlo analysis is an essential tool for validating your trading strategies. Use it regularly to make sure your strategies are truly robust rather than just lucky.
