# Rule Significance Testing

Rule Significance Testing answers a deliberately narrow question: **"Did my entry rule predict the direction of the next bar better than chance?"**

Before spending hours tuning a strategy and validating it through full backtests, this feature gives you a fast, principled way to check whether the entry logic itself carries genuine predictive power — or whether it is just noise dressed up as a signal.

::: tip 🎥 Video Tutorial
Prefer video? Watch [The Scientific Way to Test Technical Analysis](https://youtu.be/ZNByavpi2ng) for a practical introduction to Rule Significance Testing, including p-values, the dashboard workflow, and testing rules with Jesse MCP.
:::

## What is Rule Significance Testing?

Every trading strategy is built around one or more rules that generate entry signals: conditions that say "go long now" or "go short now." Rule Significance Testing checks whether those rules predict the next bar's direction after market drift is removed.

This is not a question you can answer by looking at backtest profits alone. A strategy with a positive backtest return might simply have been active during a bull market, or got lucky with a handful of large moves. Rule Significance Testing cuts through that ambiguity using formal hypothesis testing and statistical simulation.

::: tip
Rule Significance Testing focuses entirely on the entry signal. It never places orders, computes drawdown, or measures win rate. Think of it as a microscope pointed directly at the predictive quality of your `should_long()` and `should_short()` logic.
:::

## The Null Hypothesis (H0)

All hypothesis testing starts with a **null hypothesis** — a default assumption we try to disprove. For Rule Significance Testing, the null hypothesis is:

> **H0: The entry rule's expected next-bar detrended return is not positive.**

In plain terms, H0 says the entry signals do not predict the next bar well enough to distinguish their average detrended return from zero.

If the data gives us strong enough evidence to **reject H0**, we conclude that the rule has statistically significant **next-bar** predictive power.

If we **fail to reject H0**, the test found no reliable **next-bar** predictive edge. That is not a verdict on the full strategy: a strategy may still profit from moves that unfold over multiple bars, asymmetric stops and targets, position sizing, or other execution logic.

::: warning
Failing to reject H0 does not prove that your rule is worthless — it simply means there is insufficient evidence to claim a next-bar edge. The rule might improve with a longer data window, a different timeframe, or refined entry conditions.
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

With the signal and price series in hand, Jesse computes the **observed mean return** of the rule: the average next-bar log return earned after the rule emitted a signal. This is the benchmark the simulations must beat. A signal produced at bar `t` is paired with the return of bar `t+1`, so the rule is evaluated only on price movement that was not yet known when the signal fired.

To enforce H0, Jesse **detrends the returns** by subtracting the market's own mean return from every bar. This removes the general upward or downward drift of the market, ensuring that a simulated strategy cannot score highly simply by being long in a trending market.

Jesse then runs **N simulations**, each one generating a simulated mean return under the assumption that the rule has no edge. See [How it works](/docs/rule-significance-testing/bootstrap) for full details on the simulation.

## Simulation method — Bootstrap

The stationary Bootstrap method resamples the rule's actual bar-level returns in **random-length contiguous blocks** N times. Each resample has the same length as the original. Because H0 is enforced by zero-centering the returns before resampling, no simulation can inherit the rule's observed mean edge. Sampling blocks rather than isolated bars preserves local time-series dependence.

This approach uses bootstrap resampling to build a null distribution of what a rule with no edge could have achieved, then measures how often a random resample beats the real result.

- Preserves the distribution of individual return magnitudes
- Allows the same block of returns to appear multiple times in a simulation
- Preserves short-run dependence while remaining robust to non-normality



## The p-value

After all N simulations complete, Jesse computes a **p-value**: the fraction of simulated mean returns that were **greater than or equal to** the rule's observed mean return.

| p-value | Interpretation |
|---|---|
| ≤ 0.001 | Highly significant — exceptionally strong next-bar evidence |
| ≤ 0.01 | Very significant — very strong next-bar evidence |
| ≤ 0.05 | Statistically significant — sufficient evidence to reject H₀ |
| ≤ 0.10 | Possibly significant — weak evidence; further testing recommended |
| > 0.10 | Not significant — no reliable next-bar evidence |

A p-value of 0.03, for example, means that only 3% of bootstrap simulations matched or beat the rule's actual performance. That is unlikely to have happened by chance.

::: warning
A low p-value supports next-bar predictive power, but it is neither necessary nor sufficient for a profitable full strategy. The test says nothing about multi-bar moves, transaction costs, position sizing, drawdown, or out-of-sample performance. Always follow up with a full backtest and Monte Carlo analysis.
:::

## Why a profitable strategy can fail this test

**A strategy can fail this test at every horizon and still be genuinely profitable in a backtest.** Both results can be correct at once.

The test asks whether the entry direction predicts the return over a fixed window. Real strategies also earn from what that window cannot see: asymmetric targets and stops, which level price reaches first during a trade, exits that fire on a condition rather than after a set number of bars, and risk-based position sizing.

For example, a trend-following strategy using ATR-based stops and targets, run on SOL 15-minute candles over roughly two and a half years:

| Measurement | Result |
|---|---|
| Rule Significance Test, next bar | p = 0.39 |
| Extended horizons, 1 to 96 bars ahead | no horizon significant |
| Full backtest, same period | 263 trades, +82.6% net profit, Sharpe 1.07 |

Its entries carry no measurable directional edge. The strategy is profitable because of its exit structure — a take-profit at 3.2 ATR against a stop at 2.5 ATR — which this test never simulates.

::: warning
The converse matters just as much: passing does not make a strategy profitable. A significant next-bar edge can still be too small to survive fees and slippage. Judge a complete strategy with a backtest and [Monte Carlo analysis](/docs/monte-carlo/).
:::

## How it differs from backtest-based Monte Carlo

Jesse's [Monte Carlo analysis](/docs/monte-carlo/) modifies candles or shuffles the order of completed trades to stress-test a strategy that has *already been backtested*. It answers: "How robust is my full strategy's equity curve to different market paths?"

Rule Significance Testing is different in a fundamental way:

- It **never places any orders** — not even simulated ones
- It operates entirely at the level of raw entry signals and bar-level returns
- It answers a prior question: "Does this rule's timing contain any real information at all?"

Think of it as a **specialized entry-timing diagnostic**, not a gatekeeper for the full strategy. Passing supports the claim that the entry rule predicts the next bar. Failing says only that this particular next-bar claim was not established; use a full backtest and Monte Carlo analysis to evaluate the complete strategy.

### A critical difference: synthetic data vs. detrended real data

Both methods are grounded in real market data, but they use that data in fundamentally different ways — and this distinction matters.

**Monte Carlo analysis** generates its simulation paths from **synthetic data** that is *directly constructed from real market returns*. It resamples or shuffles real trade outcomes and candle sequences to produce plausible alternative market histories. The synthetic paths inherit the statistical character of the real market — its volatility, its return distribution, its tail behaviour — without being identical to it.

**Rule Significance Testing**, on the other hand, never invents or synthesises any market data. It works with the **actual historical prices**, detrends the returns, and resamples the resulting rule-return series in contiguous blocks. Detrending removes the asset's general upward or downward drift, while block resampling builds a zero-edge null distribution without discarding local time-series dependence.

In short: Monte Carlo asks *"what if the market had taken a different path?"* using synthetic histories. Rule Significance Testing asks *"is the mean next-bar return after these entry signals distinguishable from zero?"* using the real, detrended signal-return series.

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
