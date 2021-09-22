# Notifications

Jesse provides support for sending notifications to delivery channels. At the moment, Telegram and Discord drivers are ready and shipped with the live trade plugin. 

## Telegram

To receive Telegram notifications you need:

-   A Telegram bot
-   The ID of the Telegram account that wishes to receive notifications

### Creating a bot

Open Telegram and search for `BotFather`. Follow the instructions by BotFather to create a new bot. It will ask for a name and a username for your bot. When you're done, it will generate your bot's access token for the HTTP API, which is a string like: 

```
234325981:BBF5-H-FIdlfGVwXaSDfsAdy5A9_4uVsnH
```

Enter it as `telegram_bot_token` in your project's config file for the live trade plugin which is named `live-config.py`. 

Now search for the username of your bot in your contacts, select it, and click on the `/start`. This will give permission to the bot to send messages to your Telegram account.

### Find your user ID

Please notice that we're talking about your user ID and NOT your username. If you don't already know your Telegram account's user ID, open the [getuserid](https://telegram.me/getuseridbot) bot, press `/start` and it'll tell you your user ID. Enter it inside the `telegram_chat_IDs` in your project's `live-config.py` file. 

::: tip
As you will notice the value for `telegram_chat_IDs` is a list. So you can add multiple Telegram user IDs to be notified. 
:::

## Discord

Discord webhooks are easier to set up if you already have a Discord server. If you don't, you can create one; it's free. 

First, create a new text channel in your discord server. Then click on the gear icon on the right side of the channel button. Then go to the `integrations` section. Click on the box which is titled "Webhooks". Click on the blue "New Webhook" button, give it a name, and maybe a picture also. At last, click on the "Copy Webhook URL" button and paste that as the value for the `discord_webhook` in your `live-config.py` file. 