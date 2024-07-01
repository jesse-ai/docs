# Exchange Setup Guide

On this page, we'll go through the process of setting up an exchange for live trading.

## Apex Pro (our recommended DEX)

Please watch the following video to learn how to set up Apex Pro for live trading on Jesse:

[![Apex Pro Guide](https://i.ytimg.com/vi/Cm5DmVgAr5c/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLA44XXyan5im9xHY23mmvDL5I9Ekw)](https://www.youtube.com/watch?v=Cm5DmVgAr5c)

## DYDX

Unfortunately, the website of DYDX doesn't offer API keys. However, there is a way to obtain them through your web browser's console.

To do this, go to the DYDX Perpetuals exchange and right-click anywhere on your web browser. Then, select "Inspect" to open the Developer Tools. From there, navigate to "Application," and then to "Local Storage" and finally, to "https://trade.dydx.exchange."

Once there, select "STARK_KEY_PAIRS" and click the drop-down next to your wallet address to retrieve the stark private key. Next, select "API_KEY_PAIRS" and click the drop-down next to your wallet address to obtain the API key, secret key, and passphrase.

![DYDX API Keys](../../docs/imgs/dydx-guide-1.jpg)