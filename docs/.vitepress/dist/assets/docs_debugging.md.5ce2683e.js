import{_ as s,o as e,c as o,Q as a}from"./chunks/framework.4719a631.js";const u=JSON.parse('{"title":"Debugging","description":"","frontmatter":{},"headers":[],"relativePath":"docs/debugging.md","filePath":"docs/debugging.md"}'),n={name:"docs/debugging.md"},t=a(`<h1 id="debugging" tabindex="-1">Debugging <a class="header-anchor" href="#debugging" aria-label="Permalink to &quot;Debugging&quot;">​</a></h1><p>Debugging is an important part of developing strategies. Getting errors, figuring out why something is not working as expected, and fixing them is just part of programming in general.</p><p>We try our best to make this part of the process as easy as possible for you via the tools we provide.</p><h2 id="debug-mode" tabindex="-1">Debug mode <a class="header-anchor" href="#debug-mode" aria-label="Permalink to &quot;Debug mode&quot;">​</a></h2><p>When backtests are executed with the <code>Debug Mode</code> enabled in the options section, all the steps that Jesse goes through will be logged inside a file. After the execution, you can download that log file and inspect its content.</p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>Executing backtests in the debug mode will take longer than usual to execute. Hence, only use it when you need to debug your strategy.</p><p>For <strong>live trading</strong> the difference is not noticeable so in fact, it&#39;s recommended to enable it.</p></div><p>You can modify what should be printed while in the debugging mode and what shouldn&#39;t. To do so, head over to the &quot;Logs&quot; section of the settings page (which you can open by clicking on the &quot;gear&quot; icon), on your dashboard&#39;s settings page:</p><p><img src="https://api1.jesse.trade/storage/images/docs/settings-backtest-logs.jpg" alt="settings-backtest-logs"></p><h2 id="paper-trading" tabindex="-1">Paper trading <a class="header-anchor" href="#paper-trading" aria-label="Permalink to &quot;Paper trading&quot;">​</a></h2><p>Paper trading is also a good idea for monitoring a strategy before risking real money in it. Paper trading is available through the <a href="./livetrade.html">live-trade plugin</a>.</p><p>Remember that while live/paper trading, you can access logs at all times from within the dashboard by clicking on the &quot;Info Logs&quot; button:</p><p><img src="https://api1.jesse.trade/storage/images/docs/logs-button-live-mode-1.jpg" alt="logs-button-live-mode-1"></p><p>Which will open a modal window with the logs:</p><p><img src="https://api1.jesse.trade/storage/images/docs/logs-button-live-mode-2.jpg" alt="logs-button-live-mode-2"></p><h2 id="how-to-debug-your-code-to-see-why-it-s-not-working-as-expected" tabindex="-1">How to debug your code to see why it&#39;s not working as expected <a class="header-anchor" href="#how-to-debug-your-code-to-see-why-it-s-not-working-as-expected" aria-label="Permalink to &quot;How to debug your code to see why it&#39;s not working as expected&quot;">​</a></h2><p>Sometimes you&#39;re not sure why something is not working as expected. You need some basic debugging to figure out what&#39;s going wrong.</p><p>In such cases, use the built-in <a href="./strategies/api.html#log">log()</a> method to achieve this. You could say <code>self.log()</code> in Jesse is the equivalent of <code>print()</code> in Python, or <code>console.log()</code> in JavaScript.</p><p>For example, let&#39;s say I expect the <code>update_position()</code> method to liquidate my position if it was in more than 2% profit but it doesn&#39;t. Assuming my code is:</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">update_position</span><span style="color:#E1E4E8;">(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.position.pnl_percentage </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.liquidate()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">update_position</span><span style="color:#24292E;">(self):</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.position.pnl_percentage </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.liquidate()</span></span></code></pre></div><p>I can debug it using the <code>self.log()</code> method:</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">update_position</span><span style="color:#E1E4E8;">(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.log(</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">f</span><span style="color:#9ECBFF;">&#39;pnl_percentage: </span><span style="color:#79B8FF;">{self</span><span style="color:#E1E4E8;">.position.pnl_percentage</span><span style="color:#79B8FF;">}</span><span style="color:#9ECBFF;">&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    )</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.position.pnl_percentage </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.log(</span><span style="color:#9ECBFF;">&#39;if statement is True, liquidate is called&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.liquidate()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">update_position</span><span style="color:#24292E;">(self):</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.log(</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">f</span><span style="color:#032F62;">&#39;pnl_percentage: </span><span style="color:#005CC5;">{self</span><span style="color:#24292E;">.position.pnl_percentage</span><span style="color:#005CC5;">}</span><span style="color:#032F62;">&#39;</span></span>
<span class="line"><span style="color:#24292E;">    )</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.position.pnl_percentage </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.log(</span><span style="color:#032F62;">&#39;if statement is True, liquidate is called&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.liquidate()</span></span></code></pre></div><p>After running the code, on the next time interval, I expect to see two custom log messages among other logs (no matter if in the backtest or live mode).</p><p>If the first log message is not there, it means that the <code>update_position</code> method is not being called at all. If the second log message is not there, it means that my <code>if</code> statement is False. However, because in the first log message I logged the value that was important in the <code>if</code> statement, I can see why the <code>if</code> statement is False.</p><h2 id="log-files" tabindex="-1">Log files <a class="header-anchor" href="#log-files" aria-label="Permalink to &quot;Log files&quot;">​</a></h2><p>Sometimes you want to access the logs after a session has ended. For example, maybe you want to send them to us for debugging purposes.</p><p>The logs of each session are stored in the <code>/storage/logs/{mode}/{session_id}.txt</code>. There is one file for each session.</p><p>There are also raw exchange streams that are specific to the live mode. You can find them in <code>/storage/logs/exchange-streams.txt</code>. The content of this file gets overwritten every time you start a new live session.</p>`,27),l=[t];function p(i,c,r,d,g,h){return e(),o("div",null,l)}const E=s(n,[["render",p]]);export{u as __pageData,E as default};
