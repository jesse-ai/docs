# Strategy Optimization 

The optimize mode allows you to tune your strategy's parameters (or "hyperparameters" as we call them). Do not let the word "optimization" trick you into thinking it can merely improve your strategies. It is way more powerful than that. 

Like all other features of Jesse, the optimize mode is designed to give you full flexibility, and yet it is very easy to use. 

However, to take full advantage of it, you need to have a basic understanding of how it works; so make sure to read all of this page, carefully. 

::: tip 🎥 Video Tutorial
In case you prefer watching a video, here's a [short screencast about the optimize mode in Jesse](https://www.youtube.com/watch?v=1LiAkvIpR-g).
:::

## How does it work?
Jesse optimizes parameters using [Optuna](https://optuna.org/), a hyperparameter optimization framework, accelerated with [Ray](https://www.ray.io/) for parallel processing. The optimization process systematically searches through the parameter space to find optimal combinations that maximize your strategy's performance.

Optuna employs efficient search algorithms to intelligently explore the parameter space, focusing on regions that show promise while balancing exploration of new areas. This approach allows for much faster convergence to optimal parameters compared to random or grid search methods.

## What is being optimized?
By default, Jesse optimizes for the Sharpe ratio, which measures the risk-adjusted return of your strategy. This can be changed in the settings to other metrics such as Calmar ratio, Sortino ratio, or Omega ratio.

## Which parameters can I optimize? 
The optimize mode is highly flexible. You can use it to optimize *anything* that is written inside your strategy file. A few examples might be:

1. The period of an EMA indicator. Not sure whether to use the 50, 51, 52, ... or 100 period? Let the optimize mode decide. 
2. The choice between which indicator to use in the first place. Not sure whether to use RSI, Stochastic, or the SRSI? Let the optimize mode decide. 
3. Choosing between multiple entry rules of your strategy. 
