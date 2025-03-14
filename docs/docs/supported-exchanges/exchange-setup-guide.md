# Exchange Setup Guide

On this page, we'll go through the process of setting up an exchange for live trading.

## Apex Pro (our recommended DEX)

Please watch the following video to learn how to set up Apex Pro for live trading on Jesse:

[![Apex Pro Guide](https://i.ytimg.com/vi/Cm5DmVgAr5c/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLA44XXyan5im9xHY23mmvDL5I9Ekw)](https://www.youtube.com/watch?v=Cm5DmVgAr5c)

**Update:** Jesse now supports Apex Omni and the setup is very similar to Apex Pro.

## Coinbase 

At the moment, we support Coinbase Spot which is also known as Coinbase Advanced. To set up Coinbase for live trading, you need to create an API key. Go to [this page](https://portal.cdp.coinbase.com/access/api) to create one: 

![Coinbase API Keys](../../docs/imgs/coinbase-api1.jpg)

After clicking on the "**Create API Key**" button, and entering a nickname, click on the API restrictions to open extra options:

![Coinbase API Keys](../../docs/imgs/coinbase-api2.jpg)

You can optionally (highly recommended) choose to enter your server's IP address into the IP whitelist section for more security.

Most importantly, make sure to check the "**Trade**" checkbox under the advanced trade section to allow your Jesse instance to execute orders on your behalf.

Finally, you're given the API key and secret that you need to copy and paste into your Jesse incense:

![Coinbase API Keys](../../docs/imgs/coinbase-api3.jpg)
