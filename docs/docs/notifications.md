# Notifications

Jesse provides support for sending notifications to delivery channels. At the moment, Telegram and Discord drivers are ready and shipped with the live trade plugin out of the box. 

## Telegram

To receive Telegram notifications you need:

-   A Telegram bot
-   The ID of the Telegram account that wishes to receive notifications

### Creating a bot

Open Telegram and search for `BotFather`. Follow the instructions by BotFather to create a new bot. It will ask for a name and a username for your bot. At last, it will generate your bot's access token for the HTTP API, which is a string like: 

```
234325981:BBF5-H-FIdlfGVwXaSDfsAdy5A9_4uVsnH
```

Enter it in your project's `.env` file for either `GENERAL_TELEGRAM_BOT_TOKEN` or `ERROR_TELEGRAM_BOT_TOKEN`. 

::: tip
`GENERAL_TELEGRAM_BOT_TOKEN` is used for all notifications while `ERROR_TELEGRAM_BOT_TOKEN` is used for error notifications only. It is sometimes useful to have a separate bot for urgent notifications so you can mute the general one as it can be sometimes too verbose.
:::

Now search for the username of your bot in your contacts, select it, and click on the `/start`. This will permit the bot to send messages to your Telegram account.

### Find your user ID

Please notice that we're talking about your user ID and NOT your username. If you don't already know your Telegram account's user ID, open the [getuserid](https://telegram.me/getuseridbot) bot, press `/start` and it'll tell you your user ID. Enter it for the `GENERAL_TELEGRAM_BOT_CHAT_ID` value in your project's `.env` file. 

## Discord

Discord webhooks are easier to set up if you already have a Discord server. If you don't, you can create one; it's free. 

First, create a new text channel in your discord server. Then click on the gear icon on the right side of the channel button. Then go to the `integrations` section. Click on the box which is titled "Webhooks". Click on the blue "New Webhook" button, give it a name, and maybe a picture also. At last, click on the "Copy Webhook URL" button and paste that as the value for the `GENERAL_DISCORD_WEBHOOK` in your `.env` file. 


## Sending custom notifications from within the strategy

Sometimes you might want to send a custom notification based on some condition that is placed inside your strategy file. An example use-case of this might be to create some kind of alert using Jesse. And because you are writing in Python, you create all kinds of advanced alerts that other services can't provide. To do this, use the [self.log()](./strategies/api.html#log) method.