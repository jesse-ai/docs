# Notifications

Jesse provides support for sending notifications to delivery channels. At the moment, Telegram, Discord, and Slack drivers are ready and shipped with the live trade plugin out of the box. 

## Telegram

To receive Telegram notifications you need:

-   A Telegram bot
-   The ID of the Telegram account that wishes to receive notifications

### Creating a bot

Open Telegram and search for `BotFather`. Follow the instructions by BotFather to create a new bot. It will ask for a name and a username for your bot. At last, it will generate your bot's access token for the HTTP API, which is a string like: 

```
234325981:BBF5-H-FIdlfGVwXaSDfsAdy5A9_4uVsnH
```

Enter this token in the "Notification API Keys" page under the "Bot Token" field when adding a new Telegram notification driver. 

Now search for the username of your bot in your contacts, select it, and click on the `/start`. This will permit the bot to send messages to your Telegram account.

### Find your user ID

Please notice that we're talking about your user ID and NOT your username. If you don't already know your Telegram account's user ID, open the [getuserid](https://telegram.me/getuseridbot) bot, press `/start` and it'll tell you your user ID. Enter this ID in the "Chat ID" field when adding a new Telegram notification driver in the "Notification API Keys" page.

## Discord

Discord webhooks are easier to set up if you already have a Discord server. If you don't, you can create one; it's free. 

First, create a new text channel in your discord server. Then click on the gear icon on the right side of the channel button. Then go to the `integrations` section. Click on the box which is titled "Webhooks". Click on the blue "New Webhook" button, give it a name, and maybe a picture also. At last, click on the "Copy Webhook URL" button and paste that URL in the "Webhook URL" field when adding a new Discord notification driver in the "Notification API Keys" page.

## Slack

Slack, similar to Discord also has webhooks. To set up you need to have a Slack workspace, it's free.
- First, create a channel, then you need to create an app at [this page](https://api.slack.com/apps?new_app=1).
Pick a name and choose your workspace and click *Create App*.  
- After creating you will be redirected to the app setting dashboard. Go to *Incoming webhooks* and click *Activate
Incoming Webhooks* toggle to switch it on.
- Now that Incoming Webhooks are enabled, the settings page should refresh and some extra options will appear.
One of those options will be a really helpful button marked Add New Webhook to Workspace, and you should click it.
Choose your channel and click *Authorize*.
- You'll be sent back to your app settings, and you should now see a new entry under the Webhook URLs for Your Workspace
section.
- Copy the webhook URL and paste it in the "Webhook URL" field when adding a new Slack notification driver in the "Notification API Keys" page.

Further information can be found [here](https://api.slack.com/messaging/webhooks).

## Sending custom notifications from within the strategy

Sometimes you might want to send a custom notification based on some condition that is placed inside your strategy file. An example use-case of this might be to create some kind of alert using Jesse. And because you are writing in Python, you create all kinds of advanced alerts that other services can't provide. To do this, use the [self.log()](./strategies/api.html#log) method.

### Sending custom information to custom channels
You might want to go further with your notification and organize it to different channels in your Slack workspace or Discord server.
To do so you can add to [self.log()](./strategies/api.html#log) a webhook to what channel to use.