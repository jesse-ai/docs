# Logging

## Sentry

Jesse supports Sentry to report unexpected exceptions that may be thrown while live trading. To enable:

1. Register on [Sentry](https://sentry.io/signup/)
2. Go to "[create a new project](https://sentry.io/organizations/voten/projects/new/)"
3. Select `Node.js` as your platform.
4. Click on the plus button besides "assign a team" to create a team if it's your first time using Sentry.
5. Click "Create Project".
6. The next page will teach you about how to install Sentry on a NodeJS project which you don't need since Jesse has already taken care of it. However, you do need `dsn` string. Find this line on page:

```
const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'https://sad2kjfn23asjkd4fkjsadfjkasdjfk@sentry.io/1234567' });
```

Copy the value for `dsn` and set it in your project's `.env` file for `SENTRY_DSN`:

```
SENTRY_DSN=https://sad2kjfn23asjkd4fkjsadfjkasdjfk@sentry.io/1234567
```

7. Finally, you can now enable Sentry by setting `ENABLE_SENTRY` equal to `1` in your `.env` file:

```
ENABLE_SENTRY=1
```

## Trades

TODO:...

## Orders

TODO:...

## Redux actions

TODO:...
