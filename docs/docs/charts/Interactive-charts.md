# Interactive Charts

After the backtest simulation is complete, you can open an interactive chart. This chart will display the buy and sell points of your strategy.

The chart is also interactive, allowing you to zoom in or out. Ensure the interactive charts option is enabled before executing the backtest:

![interactive-charts](https://api1.jesse.trade/storage/images/uploads/ekiZ5QZbHKjHZQdxFPxrg5vJM2qcuuwCy3VV4LCZ.jpg)

## add_line_to_candle_chart

**Arguments:**

-  `title: str`: The title of the line that will be displayed on the chart.
-  `value: float`: The value of the line that will be displayed on the chart.
-  `color=None`: The color of the line. If not specified, a random color will be used.

You can add indicators to the candle chart to help you visualize your strategy. Both built-in indicators and any custom ones that you developed yourself are supported.

To do that, you need to call the function anywhere in your strategy that you want to plot that value. You do not need to specify any date; it is automatically handled for you behind the scenes. A recommended place, if you're not sure where to put that function, is inside either the `before` or `after` methods in your strategy.

**Example:**

```py
def after(self) -> None:
    # add the supertrend to the candle chart
    self.add_line_to_candle_chart('supertrend', ta.supertrend(self.candles).trend)
    # you can also add the ema5 to the chart
    self.add_line_to_candle_chart('ema5', ta.ema(self.candles, 50))
```

**Result:**

![interactive-charts](https://api1.jesse.trade/storage/images/uploads/xYErzDuafhnVtAySAtpy1WJMq2x62QsJQQ1sZhXC.jpg)

## add_horizontal_line_to_candle_chart

**Arguments:**

-  `title: str`: The title of the line that will be displayed on the chart.
-  `value: float`: The value of the line that will be displayed on the chart.
-  `color=None`: The color of the line. If not specified, a random color will be used.
-  `line_width=1.5`: The width of the line.
-  `line_style='solid'`: The style of the line. It can be either 'solid', 'dotted', or 'dashed'.

You can add horizontal lines to the candle chart too. This can be useful for visualizing support and resistance levels.

**Example:**

```py
def after(self) -> None:
    self.add_line_to_candle_chart('supertrend', ta.supertrend(self.candles).trend)
    self.add_line_to_candle_chart('ema5', ta.ema(self.candles, 50))
    # Resistance and support lines
    self.add_horizontal_line_to_candle_chart('resistance', 18266, 'red')
    self.add_horizontal_line_to_candle_chart('support', 17756, 'green')
```

**Result:**

![interactive-charts](https://api1.jesse.trade/storage/images/uploads/5uw417EyDOa9HY3P2DzedlQ4nqhk90F4SIkDaRc7.jpg)

## add_extra_line_chart

**Arguments:**

-  `chart_name: str`: The name of the extra chart that will be displayed on the chart.
-  `title: str`: The title of the line that will be displayed on the chart.
-  `value: float`: The value of the line that will be displayed on the chart.
-  `color=None`: The color of the line. If not specified, a random color will be used.

You can add extra charts to the chart. This can be useful for visualizing additional indicators that have different value ranges than your candle charts. For example, if you're trading BTC, the prices are around $70,000. However, if you're trying to display RSI values on your chart, then we're talking about numbers between 0 and 100. Thus, it doesn't make sense to display them on the same chart. That's why you can use this function to add an extra chart.

**Example:**

```py
def after(self) -> None:
    self.add_line_to_candle_chart('supertrend', ta.supertrend(self.candles).trend)
    self.add_line_to_candle_chart('ema5', ta.ema(self.candles, 50))
    self.add_horizontal_line_to_candle_chart('resistance', 18266, 'red')
    self.add_horizontal_line_to_candle_chart('support', 17756, 'green')

    # RSI lines
    self.add_extra_line_chart('RSI', 'RSI14', ta.rsi(self.candles, period=14))
    self.add_extra_line_chart('RSI', 'RSI21', ta.rsi(self.candles, period=21))
```

**Result:**

![interactive-charts](https://api1.jesse.trade/storage/images/uploads/NB8L53gXb74FdDwKl0XGP7E2vBe7SdqEvr93Jnlc.jpg)

## add_horizontal_line_to_extra_chart

**Arguments:**

-  `chart_name: str`: The name of the extra chart that will be displayed on the chart.
-  `title: str`: The title of the line that will be displayed on the chart.
-  `value: float`: The value of the line that will be displayed on the chart.

You can add horizontal lines to the extra chart too.

::: warning
It is important that the name of the chart, which is the first argument, must be the same for the values to be displayed inside the same chart.
:::

**Example:**

```py
def after(self) -> None:
    # RSI lines
    self.add_extra_line_chart('RSI', 'RSI14', ta.rsi(self.candles, period=14))
    self.add_extra_line_chart('RSI', 'RSI21', ta.rsi(self.candles, period=21))
    # Add overbought and oversold lines
    self.add_horizontal_line_to_extra_chart('RSI', 'overbought', 70, color='red')
    self.add_horizontal_line_to_extra_chart('RSI', 'oversold', 30, color='green')
```

**Result:**

![https://api1.jesse.trade/storage/images/uploads/zIwsgg8FpCarjqfrY5QQl09cVYIpDRDKomSA57ui.jpg](https://api1.jesse.trade/storage/images/uploads/zIwsgg8FpCarjqfrY5QQl09cVYIpDRDKomSA57ui.jpg)