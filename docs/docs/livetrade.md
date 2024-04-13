---
title: 'Live Trading'
---

# Live Trade

Live and paper trading functionality is supported by Jesse via an official plugin.

## Getting started

To get started, you need to register on our website to generate your license key. Once you have your license key, you can [install](/docs/livetrade.html#installation) the plugin.

We have made sure to make the installation process as easy as possible. In fact, if you already have Jesse installed, you can install the plugin in just a few seconds.

<!-- ::: warning
Before going live make sure the execution time of your strategy doesn't exceed your timeframe. For example, if you want to trade the 5min timeframe the execution of all your code for one new candle should be finished in under 5min.
::: -->

## Paper Trading

Paper trading is possible with Jesse and is a good way to test-drive a strategy without risking real money.

You can enable paper trading by turning on the "Paper Trade" option on the "Live" page of the dashboard.

## Installation

The package is pre-built and the access is limited to those with an active license. We made sure the installation is easy and made it automated as much as possible.

::: tip 🎥 Video Tutorial
In case you prefer watching a video, here's a [short screencast of installing the plugin on remote server for live trading](https://www.youtube.com/watch?v=cUNX5FAVVYo).
:::

### 1. Creating a license key

First, you need to create a license access key. Assuming you are already logged in to your Jesse.Trade account, go into the [API Tokens](https://jesse.trade/user/api-tokens) page and generate a new token. The name of it doesn't matter. Then copy the token and paste it into the `LICENSE_API_TOKEN` variable inside your project's `.env` file.

Now, assuming whether you are using Jesse with the Docker setup, or you installed the environment natively, **you have to choose your second step**:

### 2. Docker environment

If you are using Jesse using our [first-class Docker setup](./getting-started/docker.html), **you don't have to do anything**!

Jesse will pick up on the change you just made in your `.env` file, download and install the correct version of the plugin for you.

### 2. Native environment setups

All you have to do is to run a single command which will automatically download the correct version of the package according to your machine's CPU architecture, OS, Python version, and Jesse version:

```sh
jesse install-live
```

## Update

To update to the latest versions, usually you have to update Jesse itself first, and then the plugin. Here's the [guide](/docs/getting-started/update.html).
