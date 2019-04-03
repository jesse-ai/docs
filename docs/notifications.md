# Notifications

Jesse provides support for sending notifications to delivery channels. At the moment, only the Telegram driver is ready and ships with Jesse. You can write your custom driver for other channels, and maybe share it with the community?! ;)

## Telegram

To receive Telegram notifications you need:

-   A Telegram bot
-   The ID of the Telegram account that wishes to receive the notifications

### Creating a bot

Open Telegram and search for `BotFather`. Follow the instructions by BotFather to create a new bot. It'll ask for a name and a username for your bot. When you're done, it'll give you your bot's token to the HTTP API, which is a string like: `234325981:BBF5-H-FIdlfGVwXaSDfsAdy5A9_4uVsnH`. Enter it as `TELEGRAM_BOT_TOKEN` in your project's `.env` file.

Now search for the username of your bot in your contacts, select your bot, and click on start. This will now give access to the bot to send messages to your Telegram account.

### Find your user id

If you don't already know your Telegram account's user ID, search for something like `getuserid` and you'll find tons of bots that will give you your ID. Enter it as `TELEGRAM_CHAT_IDS` in your project's `.env` file.

::: tip
You can send notifications to more than one Telegram account. In such case, enter user IDs as: `1111111,222222`
:::

## Creating your custom driver

TODO...
