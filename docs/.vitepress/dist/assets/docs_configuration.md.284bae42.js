import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.4719a631.js";const A=JSON.parse('{"title":"Configuration","description":"","frontmatter":{},"headers":[],"relativePath":"docs/configuration.md","filePath":"docs/configuration.md"}'),p={name:"docs/configuration.md"},e=l(`<h1 id="configuration" tabindex="-1">Configuration <a class="header-anchor" href="#configuration" aria-label="Permalink to &quot;Configuration&quot;">​</a></h1><p>There are two types of configuration that you&#39;ll want to change.</p><p>The first one contains your project&#39;s sensitive credentials such as passwords, exchange keys, etc. And the second type is the settings of the application itself which are accessible from the dashboard.</p><p>Let&#39;s take a look at both:</p><h2 id="environment-variables" tabindex="-1">Environment Variables <a class="header-anchor" href="#environment-variables" aria-label="Permalink to &quot;Environment Variables&quot;">​</a></h2><p>These config values are also called environment variables. They are stored in a file called <code>.env</code> inside your project. Here are the default values that ship with every project:</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">PASSWORD</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">test</span></span>
<span class="line"><span style="color:#E1E4E8;">APP_PORT</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">9000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># If not using docker, you probably want to set this to &quot;localhost&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">POSTGRES_HOST</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">postgres</span></span>
<span class="line"><span style="color:#6A737D;"># POSTGRES_HOST=localhost</span></span>
<span class="line"><span style="color:#E1E4E8;">POSTGRES_NAME</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">jesse_db</span></span>
<span class="line"><span style="color:#E1E4E8;">POSTGRES_PORT</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">5432</span></span>
<span class="line"><span style="color:#E1E4E8;">POSTGRES_USERNAME</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">jesse_user</span></span>
<span class="line"><span style="color:#E1E4E8;">POSTGRES_PASSWORD</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">password</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># If not using docker, you probably want to set this to &quot;localhost&quot;</span></span>
<span class="line"><span style="color:#6A737D;"># REDIS_HOST=localhost</span></span>
<span class="line"><span style="color:#E1E4E8;">REDIS_HOST</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">redis</span></span>
<span class="line"><span style="color:#E1E4E8;">REDIS_PORT</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">6379</span></span>
<span class="line"><span style="color:#E1E4E8;">REDIS_PASSWORD</span><span style="color:#F97583;">=</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # </span></span>
<span class="line"><span style="color:#6A737D;"># Live Trade Only                                                                 # </span></span>
<span class="line"><span style="color:#6A737D;"># =============================================================================== #</span></span>
<span class="line"><span style="color:#6A737D;"># Below values don&#39;t concern you if you haven&#39;t installed the live trade plugin   #</span></span>
<span class="line"><span style="color:#6A737D;"># # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Enter the API token which you created at https://jesse.trade/user/api-tokens:</span></span>
<span class="line"><span style="color:#E1E4E8;">LICENSE_API_TOKEN</span><span style="color:#F97583;">=</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># For all notifications</span></span>
<span class="line"><span style="color:#E1E4E8;">GENERAL_TELEGRAM_BOT_TOKEN</span><span style="color:#F97583;">=</span></span>
<span class="line"><span style="color:#E1E4E8;">GENERAL_TELEGRAM_BOT_CHAT_ID</span><span style="color:#F97583;">=</span></span>
<span class="line"><span style="color:#E1E4E8;">GENERAL_DISCORD_WEBHOOK</span><span style="color:#F97583;">=</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># For error notifications only</span></span>
<span class="line"><span style="color:#E1E4E8;">ERROR_TELEGRAM_BOT_TOKEN</span><span style="color:#F97583;">=</span></span>
<span class="line"><span style="color:#E1E4E8;">ERROR_TELEGRAM_BOT_CHAT_ID</span><span style="color:#F97583;">=</span></span>
<span class="line"><span style="color:#E1E4E8;">ERROR_DISCORD_WEBHOOK</span><span style="color:#F97583;">=</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Testnet Binance Futures (http://testnet.binancefuture.com)</span></span>
<span class="line"><span style="color:#E1E4E8;">BINANCE_PERPETUAL_FUTURES_TESTNET_API_KEY</span><span style="color:#F97583;">=</span></span>
<span class="line"><span style="color:#E1E4E8;">BINANCE_PERPETUAL_FUTURES_TESTNET_API_SECRET</span><span style="color:#F97583;">=</span></span>
<span class="line"><span style="color:#6A737D;"># Binance Futures (https://www.binance.com/en/futures/btcusdt)</span></span>
<span class="line"><span style="color:#E1E4E8;">BINANCE_PERPETUAL_FUTURES_API_KEY</span><span style="color:#F97583;">=</span></span>
<span class="line"><span style="color:#E1E4E8;">BINANCE_PERPETUAL_FUTURES_API_SECRET</span><span style="color:#F97583;">=</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Testnet Bybit Perpetual (https://testnet.bybit.com/trade/usdt/BTCUSDT)</span></span>
<span class="line"><span style="color:#E1E4E8;">BYBIT_USDT_PERPETUAL_TESTNET_API_KEY</span><span style="color:#F97583;">=</span></span>
<span class="line"><span style="color:#E1E4E8;">BYBIT_USDT_PERPETUAL_TESTNET_API_SECRET</span><span style="color:#F97583;">=</span></span>
<span class="line"><span style="color:#6A737D;"># Bybit Perpetual (https://www.bybit.com/trade/usdt/BTCUSDT)</span></span>
<span class="line"><span style="color:#E1E4E8;">BYBIT_USDT_PERPETUAL_API_KEY</span><span style="color:#F97583;">=</span></span>
<span class="line"><span style="color:#E1E4E8;">BYBIT_USDT_PERPETUAL_API_SECRET</span><span style="color:#F97583;">=</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># FTX Futures (https://ftx.com/markets/future)</span></span>
<span class="line"><span style="color:#E1E4E8;">FTX_PERPETUAL_FUTURES_API_KEY</span><span style="color:#F97583;">=</span></span>
<span class="line"><span style="color:#E1E4E8;">FTX_PERPETUAL_FUTURES_API_SECRET</span><span style="color:#F97583;">=</span></span>
<span class="line"><span style="color:#6A737D;"># leave empty if it&#39;s the main account and not a subaccount</span></span>
<span class="line"><span style="color:#E1E4E8;">FTX_PERPETUAL_FUTURES_SUBACCOUNT_NAME</span><span style="color:#F97583;">=</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">PASSWORD</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">test</span></span>
<span class="line"><span style="color:#24292E;">APP_PORT</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">9000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># If not using docker, you probably want to set this to &quot;localhost&quot;</span></span>
<span class="line"><span style="color:#24292E;">POSTGRES_HOST</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">postgres</span></span>
<span class="line"><span style="color:#6A737D;"># POSTGRES_HOST=localhost</span></span>
<span class="line"><span style="color:#24292E;">POSTGRES_NAME</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">jesse_db</span></span>
<span class="line"><span style="color:#24292E;">POSTGRES_PORT</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">5432</span></span>
<span class="line"><span style="color:#24292E;">POSTGRES_USERNAME</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">jesse_user</span></span>
<span class="line"><span style="color:#24292E;">POSTGRES_PASSWORD</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">password</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># If not using docker, you probably want to set this to &quot;localhost&quot;</span></span>
<span class="line"><span style="color:#6A737D;"># REDIS_HOST=localhost</span></span>
<span class="line"><span style="color:#24292E;">REDIS_HOST</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">redis</span></span>
<span class="line"><span style="color:#24292E;">REDIS_PORT</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">6379</span></span>
<span class="line"><span style="color:#24292E;">REDIS_PASSWORD</span><span style="color:#D73A49;">=</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # </span></span>
<span class="line"><span style="color:#6A737D;"># Live Trade Only                                                                 # </span></span>
<span class="line"><span style="color:#6A737D;"># =============================================================================== #</span></span>
<span class="line"><span style="color:#6A737D;"># Below values don&#39;t concern you if you haven&#39;t installed the live trade plugin   #</span></span>
<span class="line"><span style="color:#6A737D;"># # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Enter the API token which you created at https://jesse.trade/user/api-tokens:</span></span>
<span class="line"><span style="color:#24292E;">LICENSE_API_TOKEN</span><span style="color:#D73A49;">=</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># For all notifications</span></span>
<span class="line"><span style="color:#24292E;">GENERAL_TELEGRAM_BOT_TOKEN</span><span style="color:#D73A49;">=</span></span>
<span class="line"><span style="color:#24292E;">GENERAL_TELEGRAM_BOT_CHAT_ID</span><span style="color:#D73A49;">=</span></span>
<span class="line"><span style="color:#24292E;">GENERAL_DISCORD_WEBHOOK</span><span style="color:#D73A49;">=</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># For error notifications only</span></span>
<span class="line"><span style="color:#24292E;">ERROR_TELEGRAM_BOT_TOKEN</span><span style="color:#D73A49;">=</span></span>
<span class="line"><span style="color:#24292E;">ERROR_TELEGRAM_BOT_CHAT_ID</span><span style="color:#D73A49;">=</span></span>
<span class="line"><span style="color:#24292E;">ERROR_DISCORD_WEBHOOK</span><span style="color:#D73A49;">=</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Testnet Binance Futures (http://testnet.binancefuture.com)</span></span>
<span class="line"><span style="color:#24292E;">BINANCE_PERPETUAL_FUTURES_TESTNET_API_KEY</span><span style="color:#D73A49;">=</span></span>
<span class="line"><span style="color:#24292E;">BINANCE_PERPETUAL_FUTURES_TESTNET_API_SECRET</span><span style="color:#D73A49;">=</span></span>
<span class="line"><span style="color:#6A737D;"># Binance Futures (https://www.binance.com/en/futures/btcusdt)</span></span>
<span class="line"><span style="color:#24292E;">BINANCE_PERPETUAL_FUTURES_API_KEY</span><span style="color:#D73A49;">=</span></span>
<span class="line"><span style="color:#24292E;">BINANCE_PERPETUAL_FUTURES_API_SECRET</span><span style="color:#D73A49;">=</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Testnet Bybit Perpetual (https://testnet.bybit.com/trade/usdt/BTCUSDT)</span></span>
<span class="line"><span style="color:#24292E;">BYBIT_USDT_PERPETUAL_TESTNET_API_KEY</span><span style="color:#D73A49;">=</span></span>
<span class="line"><span style="color:#24292E;">BYBIT_USDT_PERPETUAL_TESTNET_API_SECRET</span><span style="color:#D73A49;">=</span></span>
<span class="line"><span style="color:#6A737D;"># Bybit Perpetual (https://www.bybit.com/trade/usdt/BTCUSDT)</span></span>
<span class="line"><span style="color:#24292E;">BYBIT_USDT_PERPETUAL_API_KEY</span><span style="color:#D73A49;">=</span></span>
<span class="line"><span style="color:#24292E;">BYBIT_USDT_PERPETUAL_API_SECRET</span><span style="color:#D73A49;">=</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># FTX Futures (https://ftx.com/markets/future)</span></span>
<span class="line"><span style="color:#24292E;">FTX_PERPETUAL_FUTURES_API_KEY</span><span style="color:#D73A49;">=</span></span>
<span class="line"><span style="color:#24292E;">FTX_PERPETUAL_FUTURES_API_SECRET</span><span style="color:#D73A49;">=</span></span>
<span class="line"><span style="color:#6A737D;"># leave empty if it&#39;s the main account and not a subaccount</span></span>
<span class="line"><span style="color:#24292E;">FTX_PERPETUAL_FUTURES_SUBACCOUNT_NAME</span><span style="color:#D73A49;">=</span></span></code></pre></div><p>It is generally a good idea to stop the application before modifying your <code>.env</code> file and start it again after you&#39;ve made the changes.</p><h2 id="application-settings" tabindex="-1">Application Settings <a class="header-anchor" href="#application-settings" aria-label="Permalink to &quot;Application Settings&quot;">​</a></h2><p>At the top-right corner of the dashboard, you&#39;ll see a gear icon. Click on it and you&#39;ll see a list of settings like this:</p><p><img src="https://jesse.trade/storage/images/docs/settings-optimization.jpg" alt="settings-optimization"></p><p>Go ahead change it as you like. Changes are automatically saved which is why there&#39;s no &quot;Save&quot; button.</p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>Changing the settings will not affect running sessions. If you have one, stop and start it again for the changes to take affect.</p><p>Note: you do NOT need to stop and start Jesse itself after changing these settings.</p></div>`,13),o=[e];function t(c,r,i,E,y,_){return n(),a("div",null,o)}const R=s(p,[["render",t]]);export{A as __pageData,R as default};
