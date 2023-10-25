import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.4719a631.js";const u=JSON.parse('{"title":"Backtest","description":"","frontmatter":{},"headers":[],"relativePath":"docs/research/backtest.md","filePath":"docs/research/backtest.md"}'),p={name:"docs/research/backtest.md"},e=l(`<h1 id="backtest" tabindex="-1">Backtest <a class="header-anchor" href="#backtest" aria-label="Permalink to &quot;Backtest&quot;">​</a></h1><p>Jesse&#39;s backtesting feature that you access via the GUI dashboard is great, but there were cases when users needed to run backtests via their python scripts, or in Jupyter notebooks.</p><p>Hence, I created the <code>backtest()</code> that is a pure function. Meaning that it only uses the input you pass to it. This means it is ready for multiprocessing too!</p><p>Let&#39;s review two example use cases:</p><ol><li><p>An example of this would be when you intend to generate some data series based on whatever statistical formula that you have in mind, and want to test out the main logic behind your strategy. For this purpose, you need to generate candles, write the strategy, and run the backtest all inside the same file (or Jupyter notebook).</p></li><li><p>Another use case is for writing batch operations, such as optimization, machine learning, etc.</p></li></ol><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">backtest(</span></span>
<span class="line"><span style="color:#E1E4E8;">    config: </span><span style="color:#79B8FF;">dict</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    routes: </span><span style="color:#79B8FF;">list</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    extra_routes: </span><span style="color:#79B8FF;">list</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    candles: </span><span style="color:#79B8FF;">dict</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    generate_charts: </span><span style="color:#FFAB70;">bool</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">False</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    generate_tradingview: </span><span style="color:#FFAB70;">bool</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">False</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    generate_quantstats: </span><span style="color:#FFAB70;">bool</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">False</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    generate_hyperparameters: </span><span style="color:#FFAB70;">bool</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">False</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    generate_equity_curve: </span><span style="color:#FFAB70;">bool</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">False</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    generate_csv: </span><span style="color:#FFAB70;">bool</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">False</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    generate_json: </span><span style="color:#FFAB70;">bool</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">False</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    hyperparameters: </span><span style="color:#FFAB70;">dict</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">None</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">backtest(</span></span>
<span class="line"><span style="color:#24292E;">    config: </span><span style="color:#005CC5;">dict</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    routes: </span><span style="color:#005CC5;">list</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    extra_routes: </span><span style="color:#005CC5;">list</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    candles: </span><span style="color:#005CC5;">dict</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    generate_charts: </span><span style="color:#E36209;">bool</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">False</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    generate_tradingview: </span><span style="color:#E36209;">bool</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">False</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    generate_quantstats: </span><span style="color:#E36209;">bool</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">False</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    generate_hyperparameters: </span><span style="color:#E36209;">bool</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">False</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    generate_equity_curve: </span><span style="color:#E36209;">bool</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">False</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    generate_csv: </span><span style="color:#E36209;">bool</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">False</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    generate_json: </span><span style="color:#E36209;">bool</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">False</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    hyperparameters: </span><span style="color:#E36209;">dict</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">None</span></span>
<span class="line"><span style="color:#24292E;">)</span></span></code></pre></div><p><strong>Parameters:</strong></p><ul><li>config: dict</li><li>routes: list</li><li>extra_routes: list</li><li>candles: dict</li><li>generate_charts: bool = False</li><li>generate_tradingview: bool = False</li><li>generate_quantstats: bool = False</li><li>generate_hyperparameters: bool = False</li><li>generate_equity_curve: bool = False</li><li>generate_csv: bool = False</li><li>generate_json: bool = False</li><li>hyperparameters: dict (optional)</li></ul><p><strong>Return Type:</strong> dict</p><h2 id="usage-example" tabindex="-1">Usage example <a class="header-anchor" href="#usage-example" aria-label="Permalink to &quot;Usage example&quot;">​</a></h2><p>Here&#39;s an example where I generate a few candles from a small price data. Then, I write a super basic strategy, prepare inputs for the backtest function and execute it.</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># # # # # # # # # # # # # # # </span></span>
<span class="line"><span style="color:#6A737D;"># imports </span></span>
<span class="line"><span style="color:#6A737D;"># # # # # # # # # # # # # # # </span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> jesse.helpers </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> jh</span></span>
<span class="line"><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> jesse.strategies </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Strategy</span></span>
<span class="line"><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> jesse </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> utils</span></span>
<span class="line"><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> jesse.research </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> backtest, candles_from_close_prices</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># # # # # # # # # # # # # # # </span></span>
<span class="line"><span style="color:#6A737D;"># generate fake candles</span></span>
<span class="line"><span style="color:#6A737D;"># # # # # # # # # # # # # # # </span></span>
<span class="line"><span style="color:#E1E4E8;">prices01 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">11</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">11</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">13</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">14</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">11</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">15</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">fake_candles01 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> candles_from_close_prices(prices01)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># # # # # # # # # # # # # # # </span></span>
<span class="line"><span style="color:#6A737D;"># strategy</span></span>
<span class="line"><span style="color:#6A737D;"># # # # # # # # # # # # # # # </span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ResearchStrategy</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">Strategy</span><span style="color:#E1E4E8;">):</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">should_long</span><span style="color:#E1E4E8;">(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">True</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">should_short</span><span style="color:#E1E4E8;">(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">False</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">should_cancel_entry</span><span style="color:#E1E4E8;">(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">True</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">go_long</span><span style="color:#E1E4E8;">(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        entry_price </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.price</span></span>
<span class="line"><span style="color:#E1E4E8;">        qty </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> utils.size_to_qty(</span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.balance </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0.5</span><span style="color:#E1E4E8;">, entry_price)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.buy </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> qty, entry_price</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">go_short</span><span style="color:#E1E4E8;">(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">pass</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># # # # # # # # # # # # # # # </span></span>
<span class="line"><span style="color:#6A737D;"># prepare inputs</span></span>
<span class="line"><span style="color:#6A737D;"># # # # # # # # # # # # # # # </span></span>
<span class="line"><span style="color:#E1E4E8;">exchange_name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;Fake Exchange&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">symbol </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;BTC-USDT&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">timeframe </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;1m&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">config </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;starting_balance&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">10_000</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;fee&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># accepted values are &#39;spot&#39; and &#39;futures&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;type&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;futures&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># only used if type is &#39;futures&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;futures_leverage&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># only used if type is &#39;futures&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;futures_leverage_mode&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;cross&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;exchange&#39;</span><span style="color:#E1E4E8;">: exchange_name,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;warm_up_candles&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">routes </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span><span style="color:#9ECBFF;">&#39;exchange&#39;</span><span style="color:#E1E4E8;">: exchange_name, </span><span style="color:#9ECBFF;">&#39;strategy&#39;</span><span style="color:#E1E4E8;">: ResearchStrategy, </span><span style="color:#9ECBFF;">&#39;symbol&#39;</span><span style="color:#E1E4E8;">: symbol, </span><span style="color:#9ECBFF;">&#39;timeframe&#39;</span><span style="color:#E1E4E8;">: timeframe}</span></span>
<span class="line"><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">extra_routes </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> []</span></span>
<span class="line"><span style="color:#E1E4E8;">candles </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># keys must be in this format: &#39;Fake Exchange-BTC-USDT&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    jh.key(exchange_name, symbol): {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&#39;exchange&#39;</span><span style="color:#E1E4E8;">: exchange_name,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&#39;symbol&#39;</span><span style="color:#E1E4E8;">: symbol,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&#39;candles&#39;</span><span style="color:#E1E4E8;">: fake_candles01,</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># # # # # # # # # # # # # # # </span></span>
<span class="line"><span style="color:#6A737D;"># execute backtest</span></span>
<span class="line"><span style="color:#6A737D;"># # # # # # # # # # # # # # # </span></span>
<span class="line"><span style="color:#E1E4E8;">result </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> backtest(</span></span>
<span class="line"><span style="color:#E1E4E8;">    config,</span></span>
<span class="line"><span style="color:#E1E4E8;">    routes,</span></span>
<span class="line"><span style="color:#E1E4E8;">    extra_routes,</span></span>
<span class="line"><span style="color:#E1E4E8;">    candles, </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FFAB70;">generate_charts</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">True</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#6A737D;"># to access the metrics dict:</span></span>
<span class="line"><span style="color:#E1E4E8;">result[</span><span style="color:#9ECBFF;">&#39;metrics&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;"># to access the charts string (path of the generated file): </span></span>
<span class="line"><span style="color:#E1E4E8;">result[</span><span style="color:#9ECBFF;">&#39;charts&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;"># to access the logs list:</span></span>
<span class="line"><span style="color:#E1E4E8;">result[</span><span style="color:#9ECBFF;">&#39;logs&#39;</span><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># # # # # # # # # # # # # # # </span></span>
<span class="line"><span style="color:#6A737D;"># imports </span></span>
<span class="line"><span style="color:#6A737D;"># # # # # # # # # # # # # # # </span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> jesse.helpers </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> jh</span></span>
<span class="line"><span style="color:#D73A49;">from</span><span style="color:#24292E;"> jesse.strategies </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Strategy</span></span>
<span class="line"><span style="color:#D73A49;">from</span><span style="color:#24292E;"> jesse </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> utils</span></span>
<span class="line"><span style="color:#D73A49;">from</span><span style="color:#24292E;"> jesse.research </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> backtest, candles_from_close_prices</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># # # # # # # # # # # # # # # </span></span>
<span class="line"><span style="color:#6A737D;"># generate fake candles</span></span>
<span class="line"><span style="color:#6A737D;"># # # # # # # # # # # # # # # </span></span>
<span class="line"><span style="color:#24292E;">prices01 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#005CC5;">10</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">11</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">11</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">13</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">14</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">11</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">15</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">fake_candles01 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> candles_from_close_prices(prices01)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># # # # # # # # # # # # # # # </span></span>
<span class="line"><span style="color:#6A737D;"># strategy</span></span>
<span class="line"><span style="color:#6A737D;"># # # # # # # # # # # # # # # </span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ResearchStrategy</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">Strategy</span><span style="color:#24292E;">):</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">should_long</span><span style="color:#24292E;">(self):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">True</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">should_short</span><span style="color:#24292E;">(self):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">False</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">should_cancel_entry</span><span style="color:#24292E;">(self):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">True</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">go_long</span><span style="color:#24292E;">(self):</span></span>
<span class="line"><span style="color:#24292E;">        entry_price </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.price</span></span>
<span class="line"><span style="color:#24292E;">        qty </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> utils.size_to_qty(</span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.balance </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0.5</span><span style="color:#24292E;">, entry_price)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.buy </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> qty, entry_price</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">go_short</span><span style="color:#24292E;">(self):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">pass</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># # # # # # # # # # # # # # # </span></span>
<span class="line"><span style="color:#6A737D;"># prepare inputs</span></span>
<span class="line"><span style="color:#6A737D;"># # # # # # # # # # # # # # # </span></span>
<span class="line"><span style="color:#24292E;">exchange_name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;Fake Exchange&#39;</span></span>
<span class="line"><span style="color:#24292E;">symbol </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;BTC-USDT&#39;</span></span>
<span class="line"><span style="color:#24292E;">timeframe </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;1m&#39;</span></span>
<span class="line"><span style="color:#24292E;">config </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;starting_balance&#39;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">10_000</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;fee&#39;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># accepted values are &#39;spot&#39; and &#39;futures&#39;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;type&#39;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;futures&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># only used if type is &#39;futures&#39;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;futures_leverage&#39;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># only used if type is &#39;futures&#39;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;futures_leverage_mode&#39;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;cross&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;exchange&#39;</span><span style="color:#24292E;">: exchange_name,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;warm_up_candles&#39;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">routes </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">    {</span><span style="color:#032F62;">&#39;exchange&#39;</span><span style="color:#24292E;">: exchange_name, </span><span style="color:#032F62;">&#39;strategy&#39;</span><span style="color:#24292E;">: ResearchStrategy, </span><span style="color:#032F62;">&#39;symbol&#39;</span><span style="color:#24292E;">: symbol, </span><span style="color:#032F62;">&#39;timeframe&#39;</span><span style="color:#24292E;">: timeframe}</span></span>
<span class="line"><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">extra_routes </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> []</span></span>
<span class="line"><span style="color:#24292E;">candles </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># keys must be in this format: &#39;Fake Exchange-BTC-USDT&#39;</span></span>
<span class="line"><span style="color:#24292E;">    jh.key(exchange_name, symbol): {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&#39;exchange&#39;</span><span style="color:#24292E;">: exchange_name,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&#39;symbol&#39;</span><span style="color:#24292E;">: symbol,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&#39;candles&#39;</span><span style="color:#24292E;">: fake_candles01,</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># # # # # # # # # # # # # # # </span></span>
<span class="line"><span style="color:#6A737D;"># execute backtest</span></span>
<span class="line"><span style="color:#6A737D;"># # # # # # # # # # # # # # # </span></span>
<span class="line"><span style="color:#24292E;">result </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> backtest(</span></span>
<span class="line"><span style="color:#24292E;">    config,</span></span>
<span class="line"><span style="color:#24292E;">    routes,</span></span>
<span class="line"><span style="color:#24292E;">    extra_routes,</span></span>
<span class="line"><span style="color:#24292E;">    candles, </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">generate_charts</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">True</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#6A737D;"># to access the metrics dict:</span></span>
<span class="line"><span style="color:#24292E;">result[</span><span style="color:#032F62;">&#39;metrics&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#6A737D;"># to access the charts string (path of the generated file): </span></span>
<span class="line"><span style="color:#24292E;">result[</span><span style="color:#032F62;">&#39;charts&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#6A737D;"># to access the logs list:</span></span>
<span class="line"><span style="color:#24292E;">result[</span><span style="color:#032F62;">&#39;logs&#39;</span><span style="color:#24292E;">]</span></span></code></pre></div><h2 id="noticeable-differences" tabindex="-1">Noticeable differences <a class="header-anchor" href="#noticeable-differences" aria-label="Permalink to &quot;Noticeable differences&quot;">​</a></h2><p>The <code>backtest()</code> function uses the same engine as the one in the GUI dashboard does. So the results are almost identical. But there is a <strong>big difference in how warmup candles are handled</strong> that you need to know about.</p><p>In Jesse&#39;s typical backtests (via the GUI dashboard), warmup candles are injected <strong>before</strong> the backtest simulation is started. In fact, the required number of candles is calculated and then injected behind the scenes without you even knowing it.</p><p>But in the <code>backtest()</code> function, as I mentioned you need to pass all the required data to it. So first the required warmup candles are cut from the candles you pass to it, injected in the store, and then the simulations are started.</p><p>If your strategy doesn&#39;t require any warmup candles, in the <code>config</code> value pass it as <code>0</code>.</p><p>which is fine for most use cases but if you see different backtest results, this is the reason.</p>`,18),o=[e];function t(c,r,E,y,i,F){return n(),a("div",null,o)}const h=s(p,[["render",t]]);export{u as __pageData,h as default};
