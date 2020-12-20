# Уведомления

Jesse provides support for sending notifications to delivery channels. At the moment, only the Telegram driver is ready and ships with Jesse.

## Телеграм

To receive Telegram notifications you need:

-   A Telegram bot
-   The ID of the Telegram account that wishes to receive notifications

### Creating a bot

Open Telegram and search for `BotFather`. Follow the instructions by BotFather to create a new bot. it will ask for a name and a username for your bot. When you're done, it will give generate your bot's token to the HTTP API, which is a string like: `234325981:BBF5-H-FIdlfGVwXaSDfsAdy5A9_4uVsnH`. Enter it as `TELEGRAM_BOT_TOKEN` in your project's env file located at `jesse/env.py`.

Now search for the username of your bot in your contacts, select your bot, and click on `/start`. This will give access to your bot to send messages to your Telegram account.

### Find your user id

If you don't already know your Telegram account's user ID, search for something like `getuserid` and you'll find tons of bots that will give you your ID. Enter it as `TELEGRAM_CHAT_IDS` in your project's env file.

::: tip
You can send notifications to more than one Telegram account. That is why `TELEGRAM_CHAT_IDS` is an array and accepts more than one ID.
:::
