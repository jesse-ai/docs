# Security

If you are running the application on a remote server, you should secure the server so that no one except you has access to it. Because Jesse is a self-hosted application, it is not supposed to be accessible by the public. That makes it much easier to secure the application.

I will mention two methods here, but security is a big topic. Nonetheless, I think these two methods are enough.

## 1. Password
Change the password (PASSWORD) in your .env file. Make sure to set it to something secure. You can use a [password generator service](https://passwordsgenerator.net) to generate a strong password.

## 2. Limit access to your IP address via the firewall
The dashboard is supposed to be accessible only by you. That makes it easy to secure. So the best and easiest way is to close all incoming ports except for the ones you need. But even for ports that we need, it would be much safer if we could limit access to trusted IP addresses only.

This can be done via both a firewall from within the server or the firewall that your cloud provider provides ([Hetzner](https://jesse.trade/hetzner), [DigitalOcean](http://jesse.trade/digitalocean), etc).


### UFW Firewall

If you are NOT using the Docker setup, you can use **ufw** which is a popular firewall that ships with Ubuntu 20.04:

```sh
# to see if ufw is installed and activated
ufw status
# if it's active, stop it:
systemctl stop ufw
# allow all outgoing traffic
ufw default allow outgoing
# deny all incoming traffic
ufw default deny incoming
# allow ssh port (22)
ufw allow ssh
# If you don't have specific IP addresses, you can open the targeted port
# (9000 by default) for all, but it's best to allow specific IP addresses only. 
# Assuming your IP addresses are 1.1.1.1, 1.1.1.2, and 1.1.1.3, run:
ufw allow from 1.1.1.1 to any port 9000 proto tcp
ufw allow from 1.1.1.2 to any port 9000 proto tcp
ufw allow from 1.1.1.3 to any port 9000 proto tcp
# enable the firewall
ufw enable
# check the status
ufw status numbered
# restart ufw to apply the changes
systemctl restart ufw
```

### Data center Firewall

UFW doesn't play nice with docker. Here is how to use Hetzner's firewall service which is free to use. Other data centers usually have similar firewall services.

Go into your server's page and click on the "Firewalls" tab and click on the "CREATE FIREWALL" button:

![hetzner-firewall](https://jesse.trade/storage/images/how-to-deploy-jesse-to-production/hetzner-firewall.jpg)

First, find your local machine's IP address by using a website such as [this one](http://icanhazip.com). 

Now remove the default values saying "Any IPv4" and "Any IPv6" by clicking on them and hitting the backspace button of your keyboard. Then, paste in your local machine's IP address.

We need two rules like this. Set the Protocol to TCP for both of them. The port number for one should be 22 which is the SSH port (so you can still SSH into your server). The port number for the other should be 9000 which is the dashboard port.

In the end, click on the "CREATE FIREWALL" button.

![hetzner-firewall-rules](https://jesse.trade/storage/images/how-to-deploy-jesse-to-production/hetzner-firewall-rules.jpg)

If you changed your IP address in the future, you can always update the firewall rules and add your new IP address. That is a good reason why using Hetzner's firewall is better than using a firewall from within the server.