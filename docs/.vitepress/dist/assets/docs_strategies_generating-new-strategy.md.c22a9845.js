import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.4719a631.js";const F=JSON.parse('{"title":"Generating new strategy","description":"","frontmatter":{"title":"Generating new strategy"},"headers":[],"relativePath":"docs/strategies/generating-new-strategy.md","filePath":"docs/strategies/generating-new-strategy.md"}'),e={name:"docs/strategies/generating-new-strategy.md"},p=l(`<h1 id="generating-new-strategy-file" tabindex="-1">Generating new strategy file <a class="header-anchor" href="#generating-new-strategy-file" aria-label="Permalink to &quot;Generating new strategy file&quot;">​</a></h1><p>To get started, go the menu, and click on the &quot;New Strategy&quot; button:</p><p><img src="https://api1.jesse.trade/storage/images/docs/new-strategy-menu-button.jpg" alt="new-strategy-menu-button"></p><p>Then, give it a name. For example:</p><p><img src="https://api1.jesse.trade/storage/images/docs/new-strategy-form.jpg" alt="new-strategy-form"></p><p>This will generate <code>AwesomeStrategy</code> class located at <code>jesse/strategies/AwesomeStrategy/__init__.py</code> including all the methods that are required to run the strategy:</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> jesse.strategies </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Strategy</span></span>
<span class="line"><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> jesse </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> utils</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> jesse.indicators </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> ta</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AwesomeStrategy</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">Strategy</span><span style="color:#E1E4E8;">):</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">should_long</span><span style="color:#E1E4E8;">(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">False</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">should_short</span><span style="color:#E1E4E8;">(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">False</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">should_cancel_entry</span><span style="color:#E1E4E8;">(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">False</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">go_long</span><span style="color:#E1E4E8;">(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">pass</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">go_short</span><span style="color:#E1E4E8;">(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">pass</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">from</span><span style="color:#24292E;"> jesse.strategies </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Strategy</span></span>
<span class="line"><span style="color:#D73A49;">from</span><span style="color:#24292E;"> jesse </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> utils</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> jesse.indicators </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> ta</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AwesomeStrategy</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">Strategy</span><span style="color:#24292E;">):</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">should_long</span><span style="color:#24292E;">(self):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">False</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">should_short</span><span style="color:#24292E;">(self):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">False</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">should_cancel_entry</span><span style="color:#24292E;">(self):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">False</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">go_long</span><span style="color:#24292E;">(self):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">pass</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">go_short</span><span style="color:#24292E;">(self):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">pass</span></span></code></pre></div>`,7),o=[p];function t(r,c,y,E,i,g){return n(),a("div",null,o)}const _=s(e,[["render",t]]);export{F as __pageData,_ as default};
