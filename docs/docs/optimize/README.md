# Strategy Optimization 

The optimize mode allows you to tune your strategy's parameters (or "hyperparameters" as we call them). Do not let the word "optimization" trick you into thinking it can merely improve your strategies. It is way more powerful than that. 

Like all other features of Jesse, the optimize mode is designed to give you full flexibility, and yet it is very easy to use. 

However, to be able to get full advantage of it, you need to have a basic understanding of how it works; so make sure to read all of this page, carefully. 

::: warning
This feature doesn't work on Windows. There is a issue related to multiprocessing on Windows.
:::

## How does it work?
It works using the genetic algorithm; also known as the evolutionary algorithm. You do not have to be an expert on the subject to use the optimize mode, but is recommended to get familiar with the basics of it. Here's a nice 5 minutes video that explains it:

<iframe width="100%" height="400" src="https://www.youtube.com/embed/qiKW1qX97qA" frameborder="0" allowfullscreen></iframe>

## Which parameters can I optimize? 
The optimize mode is pretty flexible. You can use it to optimize *anything* that is written inside your strategy file. Few examples might be:

1. The period of an EMA indicator. Not sure whether to use the 50, 51, 52, ... or 100 period? Let the optimize mode decide. 
2. The choice between which indicator to use in the first place. Not sure to use RSI, Stochastic, or the SRSI? Let the optimize mode decide. 
3. To choose between multiple entry rules of your strategy. 
