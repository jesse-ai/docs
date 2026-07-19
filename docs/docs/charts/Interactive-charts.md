# Interactive Charts

Interactive charts combine candlesticks and executed-order markers with values drawn by your strategy. They are available for completed backtests and for running paper or live sessions.

Backtest charts contain the full simulated history. Live charts stream new candles and strategy values as the session runs, remain available after termination, and restore saved chart data after a page reload.

## Chart controls

- Move the cursor over a candle to see its OHLC values and the strategy values for that candle.
- Click an indicator name in the candle-chart legend to hide or show its line. This preference is remembered for each strategy.
- Click a pane header to collapse or expand it. Double-click a pane header to show that pane and collapse the others.
- Use **Collapse all** to give the candle chart more room.
- Pan or zoom any pane to keep the candle chart and indicator panes synchronized.
- Use **Reset view** to fit the available data again.
- Use **Save as image** to export the visible chart.
- Live and paper charts also support fullscreen mode. Press `Esc` to leave fullscreen.

Indicator lines display their values in the legend instead of adding duplicate guide lines and labels to the price scale. Horizontal levels, such as support, resistance, and order prices, keep their price-scale labels.

## Plotting values with `update_chart()`

Define `update_chart()` in your strategy and call the chart methods from it. Jesse calls this method once per candle in backtests and approximately once per second in paper and live trading, allowing indicators to follow the forming candle.

```py
import jesse.indicators as ta


def update_chart(self) -> None:
    self.add_line_to_candle_chart('ema50', ta.ema(self.candles, 50), color='blue')
    self.add_horizontal_line_to_candle_chart('support', 60_000, color='green')

    self.add_extra_line_chart('ADX', 'adx14', ta.adx(self.candles, 14), color='orange')
    self.add_extra_line_chart('ADX', 'adx21', ta.adx(self.candles, 21), color='blue')
    self.add_horizontal_line_to_extra_chart('ADX', 'threshold', 25, color='red')
```

::: warning
Keep `update_chart()` limited to calculating and drawing chart values. Do not submit orders or change strategy state from it because live sessions call it repeatedly between strategy execution cycles.
:::

You can still call chart methods from `before()` or `after()`. In live trading, however, those methods run only when the strategy executes for a completed route candle. Use `update_chart()` when you want the displayed value to change during the forming candle.

### Live chart history

When a live session starts, Jesse uses the loaded warm-up candles to calculate the current indicator value, but it does not replay those candles into chart history. The current forming-candle point appears immediately and is replaced in place as its value changes. Each later candle adds one new point naturally.

The real-time live chart retains the latest 1,000 points for each strategy line so its in-memory and Redis working set stays bounded. Jesse also persists each finalized indicator point with the live session. Open **Trade Chart** to browse route-specific windows containing saved candles, executed orders, closed trades, and the matching indicator history, including after the session has ended.

Backtests keep their complete chart history directly in their result data.

## `add_line_to_candle_chart()`

Adds a time-series line on top of the candlestick chart. This is appropriate for values that share the market's price range, such as moving averages or Supertrend.

**Arguments:**

- `title: str`: Unique name displayed in the legend.
- `value: float`: Value for the current candle.
- `color=None`: Line color. Jesse generates a color when omitted.

```py
def update_chart(self) -> None:
    self.add_line_to_candle_chart(
        'supertrend',
        ta.supertrend(self.candles).trend,
        color='purple',
    )
    self.add_line_to_candle_chart('ema50', ta.ema(self.candles, 50), color='blue')
```

![interactive-charts](https://api1.jesse.trade/storage/images/uploads/xYErzDuafhnVtAySAtpy1WJMq2x62QsJQQ1sZhXC.jpg)

## `add_horizontal_line_to_candle_chart()`

Adds or updates a named horizontal level on the candlestick chart. Reusing the same title moves the existing level instead of creating another one.

**Arguments:**

- `title: str`: Unique name displayed on the price scale.
- `value: float`: Price of the horizontal level.
- `color=None`: Line color. Jesse generates a color when omitted.
- `line_width=1.5`: Width of the line.
- `line_style='solid'`: Either `'solid'` or `'dotted'`.

```py
def update_chart(self) -> None:
    self.add_horizontal_line_to_candle_chart('resistance', 65_000, color='red')
    self.add_horizontal_line_to_candle_chart('support', 60_000, color='green')
```

![interactive-charts](https://api1.jesse.trade/storage/images/uploads/5uw417EyDOa9HY3P2DzedlQ4nqhk90F4SIkDaRc7.jpg)

## `add_extra_line_chart()`

Adds a time-series line to a separate indicator pane. Use this for values whose scale differs from the market price, such as RSI or ADX. Lines with the same `chart_name` are placed in the same pane.

**Arguments:**

- `chart_name: str`: Name of the indicator pane.
- `title: str`: Unique line name displayed in the pane header.
- `value: float`: Value for the current candle.
- `color=None`: Line color. Jesse generates a color when omitted.

```py
def update_chart(self) -> None:
    self.add_extra_line_chart('RSI', 'rsi14', ta.rsi(self.candles, period=14), color='orange')
    self.add_extra_line_chart('RSI', 'rsi21', ta.rsi(self.candles, period=21), color='blue')
```

![interactive-charts](https://api1.jesse.trade/storage/images/uploads/NB8L53gXb74FdDwKl0XGP7E2vBe7SdqEvr93Jnlc.jpg)

## `add_horizontal_line_to_extra_chart()`

Adds or updates a named horizontal level inside an indicator pane. The `chart_name` must match the name passed to `add_extra_line_chart()`.

**Arguments:**

- `chart_name: str`: Name of the existing indicator pane.
- `title: str`: Unique name for the horizontal level.
- `value: float`: Value of the horizontal level.
- `color=None`: Line color. Jesse generates a color when omitted.
- `line_width=1.5`: Width of the line.
- `line_style='solid'`: Either `'solid'` or `'dotted'`.

```py
def update_chart(self) -> None:
    self.add_extra_line_chart('RSI', 'rsi14', ta.rsi(self.candles, period=14), color='orange')
    self.add_extra_line_chart('RSI', 'rsi21', ta.rsi(self.candles, period=21), color='blue')
    self.add_horizontal_line_to_extra_chart('RSI', 'overbought', 70, color='red')
    self.add_horizontal_line_to_extra_chart('RSI', 'oversold', 30, color='green')
```

![RSI pane with horizontal levels](https://api1.jesse.trade/storage/images/uploads/zIwsgg8FpCarjqfrY5QQl09cVYIpDRDKomSA57ui.jpg)
