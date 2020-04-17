# Configuration

The config file is located at the root of your project and is named `config.py`.

It contains config values for databases, exchanges, logging, and notifications. The comments of each section is pretty clear.

## PostgreSQL Setup

By default, the PostgreSQL database and username in the `config.py` file are `jesse_db` & `jesse_user`, respectively; and `password` as the default password.

If you'd like these to be different than the default, please change them in your `config.py` prior to setting up PostgreSQL and replace the database and username that you choose in the following steps, otherwise the following is for the defaults.

### Give PostgreSQL necessary privileges

```
sudo -u postgres psql
```

### Create your PostgreSQL user
```
sudo -u postgres createuser jesse_user
```
### Create your PostgreSQL database
```
sudo -u postgres createdb jesse_db
```
### Add the password for the user to your PostgreSQL database
```
sudo -u postgres psql
psql=# alter user jesse_user with encrypted password 'password';
```
### Give your PostgreSQL user the necessary privileges to properly use the database created for Jesse-AI
```
psql=# grant all privileges on database jesse_db to jesse_user;
```
Your PostgreSQL database and user are now ready. You can now quit psql with `\q`
