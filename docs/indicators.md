# Indicators

Jesse uses its own [indicators package](https://github.com/jesse-ai/indicators). It has been tailored to be as easy as it can get, yet blazing fast for using in strategies.

## Supported Indicators

Here are the list of current implemented indicators so far:

-   [Simple Moving Average (SMA)](./indicators.html#simple-moving-average-sma)
-   [Exponential Moving Average (EMA)](./indicators.html#exponential-moving-average-ema)
-   [Relative Strength Index (RSI)](./indicators.html#relative-strength-index-rsi)
-   [Stochastic RSI](./indicators.html#stochastic-rsi)

## Usage Example

Let's assume we have a strategy that requires EMA values for periods of `9` and `25`. In your strategy class:

1. Define class properties for each indicator data that you need:

```typescript
ema9: number
ema25: number
```

2. Add the following code to `update()` method of your strategy class:

```typescript
this.ema9 = this.indicators.ema(9)
this.ema25 = this.indicators.ema(25)
```

That's it! There's no limit in number of indicators you can use.

::: tip INFO
Notice we didn't have to define the `indicators` property for our class. That's because it's being pre-defined per each strategy instance once extending `Strategy.ts` class.
:::

## Other Time Frames

TODO...

## Other symbols

TODO...

### Simple Moving Average (SMA)

TODO:...

### Exponential Moving Average (EMA)

TODO:...

### Relative Strength Index (RSI)

TODO:...

### Stochastic RSI

TODO:...
