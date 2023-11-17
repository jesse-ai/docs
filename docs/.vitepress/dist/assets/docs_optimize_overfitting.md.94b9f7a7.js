import{_ as e,o as t,c as o,Q as i}from"./chunks/framework.4719a631.js";const f=JSON.parse('{"title":"Overfitting","description":"","frontmatter":{"title":"Overfitting"},"headers":[],"relativePath":"docs/optimize/overfitting.md","filePath":"docs/optimize/overfitting.md"}'),a={name:"docs/optimize/overfitting.md"},s=i('<h1 id="preventing-overfitting" tabindex="-1">Preventing Overfitting <a class="header-anchor" href="#preventing-overfitting" aria-label="Permalink to &quot;Preventing Overfitting&quot;">​</a></h1><p>When it comes to optimization, overfitting is probably the biggest danger. There are many ways to handle it, here is the method that we suggest:</p><p>Divide your dataset (of candles) into 3 periods. Training, testing, and validation. Here is a step-by-step example:</p><p>Imagine that you want to optimize your strategy for a period of 2 years(24 months). Let&#39;s say that two years is from 2018-01-01 to 2020-01-01. First cut a 6 months period of data preferably from the end of that period. We&#39;ll later use this dataset for validation.</p><p>Now start the optimize mode for 2018-01-01 to 2019-06-30.</p><p>Behind the scenes, Jesse divides this dataset into two periods; training(85%) and testing(15%). The training period is what Jesse uses to optimize the strategy&#39;s parameters. The testing period is merely a period that gets backtested at the same time as the training period. Why? Because if a DNA string is performing well on both training and testing periods, there&#39;s a good chance that it will perform well overall.</p><p>In the optimize mode&#39;s dashboard, metrics such as the <code>win-rate</code> and <code>PNL</code> are shown for both <code>Training</code> and <code>Testing</code> periods, and are divided by the <code>|</code> symbol:</p><p><img src="https://jesse.trade/storage/images/docs/picking-good-dnas.jpg" alt="picking-good-dnas"></p><p>Since DNAs have been ranked from best to worst, you will usually find good ones at the beginning. Try to choose the ones that have good metrics for both <code>Training</code> and <code>Testing</code> periods. Then, <a href="./dna-usage">inject them into your strategy</a> backtest each of the good ones on the validation period which we set aside earlier. In our example that 6 month period is from <code>2019-07-01</code> to <code>2020-01-01</code>.</p><p>If you got good results using the new DNA during the validation period, chances are that your strategy is not over-fit. Because the optimization mode had only used the training period; it did not see/use the data for testing and validation periods.</p>',10),n=[s];function r(d,h,p,c,g,m){return t(),o("div",null,n)}const u=e(a,[["render",r]]);export{f as __pageData,u as default};