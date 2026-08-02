---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Jesse"
  text: "The Advanced Algo-Trading Framework in Python"
  tagline: "Research, validate, and deploy strategies with Python, a visual dashboard, or your AI assistant — all self-hosted"
  image:
    src: /imgs/w-01.png
    alt: Jesse
  actions:
    - theme: brand
      text: Get Started →
      link: /docs/getting-started/
    - theme: alt
      text: Connect an AI Assistant →
      link: /docs/mcp/
    - theme: alt
      text: Join the Community →
      link: https://jesse.trade/discord

features:
  - title: "🔌 Jesse MCP"
    details: Connect Claude, Codex, Cursor, VS Code, Zed, or any MCP-compatible assistant directly to your local Jesse project. Let it work with strategies and candles, run backtests, optimize parameters, perform significance tests and Monte Carlo analysis, and link you to the saved dashboard results.
    link: /docs/mcp/
  - title: "🧠 Machine Learning"
    details: Use Jesse's end-to-end ML pipeline to gather labelled training data from backtests, train and evaluate scikit-learn models for classification or regression, and deploy predictions directly inside your strategies.
    link: /docs/research/ml/
  - title: "🔬 Rule Significance Testing"
    details: Statistically validate your entry logic before building a complete strategy. Bootstrap resampling helps determine whether a rule's historical edge is genuine or could have appeared by chance.
    link: /docs/rule-significance-testing/
  - title: "🎲 Monte Carlo Analysis"
    details: Stress-test strategies with trade-order shuffling and candles-based simulations to distinguish skill from luck, understand the range of possible outcomes, and guard against overfitting.
    link: /docs/monte-carlo/
  - title: "🧪 Research API and Jupyter"
    details: Run candle workflows, backtests, optimization, significance tests, Monte Carlo analysis, indicators, and machine learning from Python scripts or Jupyter notebooks for reproducible and automated research.
    link: /docs/research/
  - title: "📊 Interactive Trading Charts"
    details: Inspect candlesticks, strategy indicators, horizontal levels, orders, and completed trades in synchronized charts across backtest, paper, and live sessions — including saved chart history after a session ends.
    link: /docs/charts/interactive-charts
  - title: "🦀 Rust-Powered Indicators"
    details: Native Rust implementations make indicator-heavy strategies and large research runs substantially faster. Jesse's benchmarked indicator suite became 3.4× faster after the Rust migration.
    link: /docs/indicators/
  - title: "📝 Simple Syntax"
    details: Define both simple and advanced trading strategies with the simplest syntax in the fastest time.
  - title: "📊 Comprehensive Indicator Library"
    details: Access a complete library of technical indicators with easy-to-use syntax.
  - title: "📈 Smart Ordering"
    details: Supports market, limit, and stop orders, automatically choosing the best one for you.
  - title: "⏰ Multiple Timeframes and Symbols"
    details: Backtest and livetrade multiple timeframes and symbols simultaneously without look-ahead bias.
  - title: "🔒 Self-Hosted and Privacy-First"
    details: Jesse is designed with your privacy in mind, fully self-hosted to ensure your trading strategies and data remain secure.
  - title: "🛡️ Risk Management"
    details: Built-in helper functions for robust risk management.
  - title: "📋 Metrics System"
    details: A comprehensive metrics system to evaluate your trading strategy's performance.
  - title: "🔍 Debug Mode"
    details: Observe your strategy in action with a detailed debug mode.
  - title: "🔧 Optimize Mode"
    details: Search strategy parameters efficiently with Optuna and parallel processing powered by Ray, including separate training and testing periods to measure generalization.
    link: /docs/optimize/
  - title: "📈 Leveraged and Short-Selling"
    details: First-class support for leveraged trading and short-selling.
  - title: "🔀 Partial Fills"
    details: Supports entering and exiting positions in multiple orders, allowing for greater flexibility.
  - title: "🔔 Advanced Alerts"
    details: Create real-time alerts within your strategies for effective monitoring.
  - title: "🧹 Data Cleaning"
    details: Automatic handling of importing candles and cleaning data.
  - title: "📈 First-Class Support for Trading Futures and Spot"
    details: Jesse Offers specialized support for both futures and spot markets.
  - title: "🔐 Support for Decentralized Exchanges (DEX)"
    details: Jesse's support for DEX ensures you can maintain full custody of your assets while trading.
  - title: "🤖 Reinforcement Learning — Coming Soon"
    details: First-class workflows for training, evaluating, and deploying reinforcement-learning agents are coming to Jesse's simulation and research stack.
---
