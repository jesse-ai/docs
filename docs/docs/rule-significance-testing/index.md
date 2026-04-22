# Rule Significance Testing

Rule Significance Testing is a rigorous statistical method for answering one of the most important questions in quantitative trading: **"Could my strategy's historical performance have happened by random chance?"**

Before spending hours tuning a strategy and validating it through full backtests, this feature gives you a fast, principled way to check whether the entry logic itself carries genuine predictive power — or whether it is just noise dressed up as a signal.

## What is Rule Significance Testing?

Every trading strategy is built around one or more rules that generate entry signals: conditions that say "go long now" or "go short now." The central question Rule Significance Testing asks is whether those rules actually *know something* about the market — or whether the returns they capture could just as easily have been produced by random timing.

This is not a question you can answer by looking at backtest profits alone. A strategy with a positive backtest return might simply have been active during a bull market, or got lucky with a handful of large moves. Rule Significance Testing cuts through that ambiguity using formal hypothesis testing and statistical simulation.

::: tip
Rule Significance Testing focuses entirely on the entry signal. It never places orders, computes drawdown, or measures win rate. Think of it as a microscope pointed directly at the predictive quality of your `should_long()` and `should_short()` logic.
:::

## The Null Hypothesis (H0)

All hypothesis testing starts with a **null hypothesis** — a default assumption we try to disprove. For Rule Significance Testing, the null hypothesis is:

> **H0: The trading rule has no predictive power. Its historical returns are the result of random coincidence, not skill or edge.**

In plain terms, H0 says that if you had the same market returns but scrambled the relationship between the signals and the prices, you would get results just as good — or better — than what the rule actually produced.

If the data gives us strong enough evidence to **reject H0**, we conclude that the rule has a **statistically significant edge**: its timing of entries is genuinely correlated with favourable market moves, not a fluke.

If we **fail to reject H0**, the rule's returns are indistinguishable from what a random strategy could have achieved. That is a clear signal to rethink the entry logic before investing more time in the strategy.

::: warning
Failing to reject H0 does not prove that your rule is worthless — it simply means there is insufficient evidence to claim an edge. The rule might improve with a longer data window, a different timeframe, or refined entry conditions.
:::

## How it works

Rule Significance Testing runs in two distinct phases.

### Phase 1 — Signal collection

Jesse runs a special **signal-only backtest** using the full backtesting engine. At every bar it calls `should_long()` and `should_short()` exactly as it would in a normal backtest, but it **never places any orders**. Instead, it records a signal value for each bar:

- **+1** — the rule said "go long" at this bar
- **-1** — the rule said "go short" at this bar
- **0** — the rule was neutral (no entry signal)

Along with each signal, Jesse records the closing price of that bar. The result is a time-aligned sequence of signals and prices that precisely captures what the rule *wanted to do* at each point in the market's history.

### Phase 2 — Statistical simulation

With the signal and price series in hand, Jesse computes the **observed mean return** of the rule: the average bar-level log return earned when the rule was active. This is the benchmark the simulations must beat.

To enforce H0, Jesse **detrends the returns** by subtracting the market's own mean return from every bar. This removes the general upward or downward drift of the market, ensuring that a simulated strategy cannot score highly simply by being long in a trending market.

Jesse then runs **N simulations in parallel** (using Ray for multi-core efficiency), each one generating a simulated mean return under the assumption that the rule has no edge. See [How it works](/docs/rule-significance-testing/bootstrap) for full details on the simulation.

## Simulation method — Bootstrap

The Bootstrap method resamples the rule's actual bar-level returns **with replacement** N times. Each resample produces a simulated sampling of the same length as the original, built from randomly drawn returns. Because H0 is enforced by zero-centering the returns before resampling, no single simulation can "cheat" by inheriting the market's trend.

This approach uses bootstrap resampling to build a null distribution of what a rule with no edge could have achieved, then measures how often a random resample beats the real result.

- Preserves the distribution of individual return magnitudes
- Allows the same bar's return to appear multiple times in a single simulation
- Robust to non-normality — draws from the empirical return distribution with no parametric assumptions



## The p-value

After all N simulations complete, Jesse computes a **p-value**: the fraction of simulated mean returns that were **greater than or equal to** the rule's observed mean return.

| p-value | Interpretation |
|---|---|
| ≤ 0.001 | Highly significant — exceptionally strong evidence of genuine edge |
| ≤ 0.01 | Very significant — very strong evidence of genuine edge |
| ≤ 0.05 | Statistically significant — sufficient evidence to reject H₀ |
| ≤ 0.10 | Possibly significant — weak evidence; further testing recommended |
| > 0.10 | Not significant — results are consistent with random chance |

A p-value of 0.03, for example, means that only 3% of bootstrap simulations matched or beat the rule's actual performance. That is unlikely to have happened by chance.

::: warning
A low p-value is necessary but not sufficient for a profitable strategy. Statistical significance confirms the signal has *some* predictive power, but it says nothing about transaction costs, position sizing, drawdown, or out-of-sample performance. Always follow up with a full backtest and Monte Carlo analysis.
:::

## How it differs from backtest-based Monte Carlo

Jesse's [Monte Carlo analysis](/docs/monte-carlo/) modifies candles or shuffles the order of completed trades to stress-test a strategy that has *already been backtested*. It answers: "How robust is my full strategy's equity curve to different market paths?"

Rule Significance Testing is different in a fundamental way:

- It **never places any orders** — not even simulated ones
- It operates entirely at the level of raw entry signals and bar-level returns
- It answers a prior question: "Does this rule's timing contain any real information at all?"

Think of it as a **pre-backtest filter**. If the rule fails significance testing, there is little point running a full backtest. If it passes, you have statistical backing to proceed with confidence.

### A critical difference: synthetic data vs. detrended real data

Both methods are grounded in real market data, but they use that data in fundamentally different ways — and this distinction matters.

**Monte Carlo analysis** generates its simulation paths from **synthetic data** that is *directly constructed from real market returns*. It resamples or shuffles real trade outcomes and candle sequences to produce plausible alternative market histories. The synthetic paths inherit the statistical character of the real market — its volatility, its return distribution, its tail behaviour — without being identical to it.

**Rule Significance Testing**, on the other hand, never invents or synthesises any data. It works entirely with the **actual historical prices** — but critically, it **detrends** them before running simulations. Every bar's return has the market's mean return subtracted from it, removing the general upward or downward drift of the asset. This detrending is the cornerstone of the method: it ensures that a simulated random strategy cannot score well simply by being long during a rising market. The null distribution is built from the same real bars the rule traded on, stripped of any free-lunch directional bias.

In short: Monte Carlo asks *"what if the market had taken a different path?"* using synthetic histories. Rule Significance Testing asks *"what if your rule had fired at random times?"* using the same real price history, detrended so that no simulation can benefit from trend alone.

| | Rule Significance Testing | Monte Carlo Analysis |
|---|---|---|
| Places orders | No | Yes (full backtest) |
| Tests | Raw entry signal timing | Full strategy equity curve |
| Data used | Real prices, **detrended** | **Synthetic** paths derived from real returns |
| Question answered | Does the signal's timing have genuine predictive power? | Is the equity curve robust to different market conditions? |
| When to use | Before backtesting | After backtesting |

## When to use it

Rule Significance Testing is most valuable at the **idea validation stage** — before you have committed time to optimising parameters, tuning exits, or running long Monte Carlo sessions.

Use it when you want to:

- Quickly screen a new entry idea before building a full strategy around it
- Compare multiple candidate rules and focus development on the one with the strongest signal
- Confirm that a strategy's edge comes from the entry logic, not from the exit rules or position sizing alone
- Add a statistical checkpoint to your research workflow to avoid chasing noise

It is especially useful when testing on shorter data windows where a visually impressive backtest result could easily be random.

::: tip
Rule Significance Testing is also available programmatically via the [research module](/docs/research/rule-significance-testing/) for use in custom Python scripts and Jupyter Notebooks.
:::

## Next steps

- [How it works](/docs/rule-significance-testing/bootstrap) — how resampling enforces H0 and what the output means
- [Interpreting Results](/docs/rule-significance-testing/interpreting-results) — a practical guide to reading p-values and deciding what to do next
