# Results

After a backtest completes, Jesse displays a comprehensive metrics table summarising every dimension of your strategy's performance. This page explains what each metric means and how to interpret it.

## Example Output

| Metric                   | Value             |
| ------------------------ | ----------------- |
| Total Closed Trades      | 78                |
| Total Net Profit         | 13049.95 (130.5%) |
| Start => Finish Balance  | 10000 => 23049.95 |
| Open Trades              | 1                 |
| Total Paid Fees          | 3324.39           |
| Max Drawdown             | -17.03%           |
| Max Underwater Period    | 50 days           |
| Annual Return            | 250.55%           |
| Expectancy               | 167.31 (1.67%)    |
| Avg Win | Avg Loss       | 726.02 | 635.84   |
| Ratio Avg Win / Avg Loss | 1.14              |
| Win-rate                 | 58.97%            |
| Win-rate Shorts          | 51.43%            |
| Win-rate Longs           | 65.12%            |
| Longs | Shorts           | 55.13% | 44.87%   |
| Avg Holding Time         | 7h 58m 46.15s     |
| Winning Avg Holding Time | 6h 53m 2.61s      |
| Losing Avg Holding Time  | 9h 33m 15s        |
| Sharpe Ratio             | 2.57              |
| Calmar Ratio             | 14.71             |
| Sortino Ratio            | 6.59              |
| Omega Ratio              | 2.12              |
| Winning Streak           | 8                 |
| Losing Streak            | 4                 |
| Largest Winning Trade    | 1620.29           |
| Largest Losing Trade     | -986.93           |
| Total Winning Trades     | 46                |
| Total Losing Trades      | 32                |


## Metric Reference

### Total Closed Trades

The total number of trades that were fully opened **and** closed during the backtest period. A trade is only counted once both its entry and exit have been executed. Open positions at the end of the backtest are not counted here.

A low trade count (e.g. fewer than 30) makes most statistical metrics unreliable — the sample size is too small to draw meaningful conclusions about the strategy's edge.

---

### Total Net Profit

```
Total Net Profit: 13049.95 (130.5%)
```

The absolute dollar gain (or loss) over the entire backtest, after all fees have been deducted. The percentage in parentheses expresses that gain relative to the starting balance.

```
Net Profit = Final Balance − Starting Balance
```

This is the most surface-level metric. Do not evaluate a strategy on net profit alone — always read it alongside drawdown, win-rate, and risk-adjusted ratios.

---

### Start => Finish Balance

```
Start => Finish Balance: 10000 => 23049.95
```

The portfolio's value at the beginning and end of the backtest. This gives you immediate context: starting from **$10,000**, the strategy grew to **$23,049.95** — a 2.3× increase.

---

### Open Trades

The number of positions that were still open when the backtest simulation ended. These trades are excluded from all closed-trade metrics (win-rate, average win/loss, etc.) because their outcome was not yet determined.

Jesse allows only **one open trade per trading route** at a time. This means if you are trading a single symbol (e.g. `BTC-USDT` on one timeframe), this number can never exceed **1**. If you have multiple routes configured (e.g. `BTC-USDT` and `ETH-USDT`), the maximum possible value equals the number of routes.

If you see an open trade at the end of a backtest, consider whether your backtest end date is cutting off an active position mid-trade, and factor that into your interpretation of the final balance.

---

### Total Paid Fees

The total amount paid in trading fees (commissions) across all trades. This is the sum of every entry and exit fee for every closed trade.

High fees relative to net profit are a warning sign. In the example above, **$3,324.39** in fees were paid against a net profit of **$13,049.95** — meaning fees consumed roughly 20% of the gross profit. Strategies with many small, frequent trades are especially sensitive to fee drag.

::: tip
Always backtest with realistic fees for your exchange and account tier. Underestimating fees will make a strategy look far more profitable than it is in reality.
:::

---

### Max Drawdown

```
Max Drawdown: -17.03%
```

The largest peak-to-trough decline in the portfolio's equity over the entire backtest, expressed as a percentage of the peak value. This is the single most important risk metric.

Ask yourself honestly: **could you hold through a −17% drawdown in real money without abandoning the strategy?** Most traders overestimate their own risk tolerance. If the answer is no, reduce your position sizing or leverage until the max drawdown falls within a range you can genuinely tolerate.

---

### Max Underwater Period

```
Max Underwater Period: 50 days
```

The longest continuous stretch of time during which the strategy was below its previous equity high — i.e., the longest drawdown by duration rather than depth.

A strategy can have a moderate max drawdown percentage but still be psychologically brutal if it spends 6 months underwater before recovering. **50 days** means the strategy went nearly two months without making a new high at its worst. Consider whether you have the patience to endure that in a live account.

---

### Annual Return

```
Annual Return: 250.55%
```

The net profit expressed as an annualised percentage, normalised to a 365-day year. This allows fair comparison between backtests of different durations — a 3-month backtest and a 2-year backtest can both report their performance on the same annualised scale.

::: warning
Very high annual return figures (like 250%) that emerge from short backtests should be treated with scepticism. A strategy that ran for only 3 months and happened to catch a strong trend will extrapolate to an enormous annual figure that is unlikely to be sustained over a full year.
:::

---

### Expectancy

```
Expectancy: 167.31 (1.67%)
```

The **average expected profit per trade**, calculated as:

```
Expectancy = (Win-rate × Avg Win) − (Loss-rate × Avg Loss)
```

In this example, the strategy earns an average of **$167.31** (or **1.67%** of the position size) per trade. A positive expectancy is the bare minimum requirement for a viable strategy. The higher the expectancy, the more robust the edge.

---

### Avg Win | Avg Loss

```
Avg Win | Avg Loss: 726.02 | 635.84
```

The average dollar profit of all winning trades (**$726.02**) and the average dollar loss of all losing trades (**$635.84**). Both figures are after fees.

These numbers are best read together with the win-rate. A strategy with a 40% win-rate but an average win three times larger than the average loss can still be highly profitable. A strategy with a 70% win-rate but an average loss larger than the average win may actually lose money.

---

### Ratio Avg Win / Avg Loss

```
Ratio Avg Win / Avg Loss: 1.14
```

The reward-to-risk ratio: how much the strategy earns on a typical winning trade relative to how much it loses on a typical losing trade.

```
Ratio = Avg Win ÷ Avg Loss
```

A ratio above **1.0** means winners are on average larger than losers. The example value of **1.14** is modest but positive. A ratio below **1.0** requires a significantly higher win-rate to remain profitable.

---

### Win-rate

```
Win-rate: 58.97%
```

The percentage of **all** closed trades that ended with a profit.

```
Win-rate = Total Winning Trades ÷ Total Closed Trades
```

**58.97%** means just under 6 out of every 10 trades were profitable. Win-rate alone says nothing about profitability — always read it alongside the avg win/loss ratio and expectancy.

---

### Win-rate Shorts / Win-rate Longs

```
Win-rate Shorts: 51.43%
Win-rate Longs:  65.12%
```

The win-rate broken down by trade direction. This is useful for diagnosing directional bias in your strategy.

In this example, the strategy wins **65.12%** of long trades but only **51.43%** of short trades. This tells you the strategy is significantly better at going long than short — worth investigating whether the short logic needs improvement, or whether trading longs only might produce better risk-adjusted results.

---

### Longs | Shorts

```
Longs | Shorts: 55.13% | 44.87%
```

The proportion of total trades that were long vs short. This tells you whether the strategy leans directionally in terms of trade frequency. Combined with the long/short win-rates above, you can see both how often the strategy trades each direction and how successfully.

---

### Avg Holding Time

```
Avg Holding Time:         7h 58m 46.15s
Winning Avg Holding Time: 6h 53m 2.61s
Losing Avg Holding Time:  9h 33m 15s
```

The average time a trade was held open, split into three views: all trades, winners only, and losers only.

The fact that **losing trades are held longer (9h 33m) than winning trades (6h 53m)** is a common warning sign. It may indicate the strategy (or the trader who designed it) is letting losses run while cutting winners short — the opposite of good trade management. Ideally, winning trades should be held at least as long as losing ones, or there should be a clear structural reason for the difference.

---

### Sharpe Ratio

```
Sharpe Ratio: 2.57
```

A measure of **risk-adjusted return**: how much excess return the strategy earns per unit of volatility (standard deviation of returns).

```
Sharpe = (Strategy Return − Risk-free Rate) ÷ Std Dev of Returns
```

General benchmarks:

| Sharpe Ratio | Interpretation |
|---|---|
| < 1.0 | Poor — return does not justify the volatility |
| 1.0 – 2.0 | Acceptable |
| 2.0 – 3.0 | Good |
| > 3.0 | Excellent |

A Sharpe of **2.57** is strong. It means the strategy is generating solid returns relative to the amount of volatility an investor endures.

---

### Calmar Ratio

```
Calmar Ratio: 14.71
```

The ratio of the **annual return to the max drawdown**:

```
Calmar = Annual Return ÷ |Max Drawdown|
```

```
14.71 = 250.55% ÷ 17.03%
```

The Calmar ratio rewards strategies that produce high returns with shallow drawdowns and penalises those that take on deep risk to achieve their gains. A Calmar above **3.0** is generally considered good. **14.71** is exceptional, driven here by a combination of very high annualised return and a moderate max drawdown.

---

### Sortino Ratio

```
Sortino Ratio: 6.59
```

Similar to the Sharpe ratio but only penalises **downside** volatility (negative returns) rather than all volatility. A strategy that has high volatility purely because of large upside spikes would be penalised unfairly by the Sharpe ratio but not by the Sortino.

```
Sortino = (Strategy Return − Risk-free Rate) ÷ Std Dev of Negative Returns
```

A Sortino above **2.0** is generally good. **6.59** indicates the strategy's downside risk is very well controlled relative to its returns.

---

### Omega Ratio

```
Omega Ratio: 2.12
```

The ratio of all **gains** above a threshold (typically 0%) to all **losses** below that threshold, across the return distribution:

```
Omega = Sum of gains above threshold ÷ Sum of losses below threshold
```

An Omega above **1.0** means the strategy generates more return above the threshold than below it. **2.12** means the strategy produces roughly twice as much upside as downside, which is a healthy result.

---

### Winning Streak / Losing Streak

```
Winning Streak: 8
Losing Streak:  4
```

The longest consecutive sequence of winning trades (**8**) and losing trades (**4**) during the backtest.

These figures matter for psychological resilience in live trading. Even a highly profitable strategy will have losing streaks. Knowing the historical worst-case losing streak helps you set realistic expectations and size positions so that the streak does not wipe out enough capital to force you to stop trading.

---

### Largest Winning Trade / Largest Losing Trade

```
Largest Winning Trade:  1620.29
Largest Losing Trade:  -986.93
```

The single best and worst individual trade outcomes in dollar terms during the backtest.

A very large winning trade relative to the average win may indicate the strategy's overall profit is concentrated in a small number of outlier trades — removing those few trades from the results could reveal a much weaker underlying edge. Similarly, a very large losing trade relative to the average loss may point to a missing stop-loss or a position that was held through an extreme market move.

---

### Total Winning Trades / Total Losing Trades

```
Total Winning Trades: 46
Total Losing Trades:  32
```

The raw counts of profitable and unprofitable closed trades. Together with the win-rate percentage, these confirm the sample size behind the statistics. **46 wins out of 78 total closed trades = 58.97% win-rate.**
