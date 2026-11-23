# Domain and HTTPS

By default you open Jesse's dashboard at your server's IP address, for example `http://203.0.113.10:9000`. This guide puts it at your own domain over HTTPS instead, such as `https://jesse.example.com`. That gives you:

- **An encrypted connection** to your dashboard, from anywhere.
- **The dashboard as an app.** Chrome only lets you [install the dashboard as an app](/docs/vps-setup#install-the-dashboard-as-an-app) when it's served over HTTPS.
- **A stable address for AI assistants**, at `https://jesse.example.com/mcp`. See [MCP setup](/docs/mcp/setup#connecting-from-another-machine).
- **A server that strangers can't reach.** Only your own IP addresses get through, and Jesse's port is no longer open to the internet.

The setup looks like this:

```
browser → Cloudflare (HTTPS, blocks other IPs) → your server's firewall (Cloudflare only)
        → Nginx (HTTPS, blocks other IPs again) → Jesse on 127.0.0.1:9000
```

[Cloudflare](https://www.cloudflare.com) handles HTTPS in front of your server and its free plan is enough. Nginx runs on your server and passes requests on to Jesse.

## Before you start

You need:

- **A server running Jesse with Docker.** See [VPS Setup](/docs/vps-setup). The steps below assume Ubuntu.
- **A domain on Cloudflare**, meaning Cloudflare manages its DNS. A subdomain such as `jesse.example.com` works fine.
- **Your own public IP address**, or a few if you connect from several places. Search "what is my IP" to find it.

Throughout this guide, replace `jesse.example.com` with your domain, `203.0.113.10` with your server's IP address, and `YOUR_IP` with your own IP address.

Your live sessions keep running through all of this. Nothing here needs Jesse to restart, except the optional change in step 1.

## Step 1: Keep Jesse's port private

Nginx will reach Jesse on the server itself, so Jesse's port doesn't need to be open to the internet. In your project's `docker/docker-compose.yml`, change the dashboard port of the `jesse` service to listen on the server only:

```yaml
    ports:
      - "127.0.0.1:9000:9000"
```

This takes effect the next time the containers restart, so do it when no live session is running, with `docker compose up -d` in the `docker` directory. Until then, the firewall in step 6 keeps port `9000` closed.

## Step 2: Install Nginx

```sh
sudo apt-get install -y nginx
sudo rm /etc/nginx/sites-enabled/default
sudo mkdir -p /var/cache/nginx
```

## Step 3: Create the certificate

Cloudflare's **Origin Certificate** secures the connection between Cloudflare and your server. It's free, lasts up to 15 years, and never needs renewing.

Create a private key and a certificate request on the server. The key never leaves it:

```sh
sudo mkdir -p /etc/nginx/ssl && sudo chmod 700 /etc/nginx/ssl
sudo openssl req -new -newkey ec -pkeyopt ec_paramgen_curve:prime256v1 -nodes \
  -keyout /etc/nginx/ssl/jesse.example.com.key -subj "/CN=jesse.example.com" -out /tmp/jesse.csr
sudo chmod 600 /etc/nginx/ssl/jesse.example.com.key
sudo cat /tmp/jesse.csr
```

In the Cloudflare dashboard, open your domain, go to **SSL/TLS → Origin Server** and click **Create Certificate**. Choose **Use my private key and CSR**, paste the request you just printed, and keep your hostname in the list. Save the certificate Cloudflare shows you on the server as `/etc/nginx/ssl/jesse.example.com.crt`.

To check that the certificate belongs to your key, these two commands must print the same value:

```sh
sudo openssl pkey -in /etc/nginx/ssl/jesse.example.com.key -pubout | sha256sum
sudo openssl x509 -in /etc/nginx/ssl/jesse.example.com.crt -noout -pubkey | sha256sum
```

## Step 4: Configure Nginx

You need three files.

**`/etc/nginx/snippets/cloudflare-realip.conf`** tells Nginx your visitors' real IP addresses. Requests reach your server from Cloudflare, so Nginx would otherwise see Cloudflare's address instead of yours. Only connections from Cloudflare's own ranges are trusted to say who the visitor is:

```nginx
# Cloudflare's IP ranges, from https://www.cloudflare.com/ips/
set_real_ip_from 173.245.48.0/20;
set_real_ip_from 103.21.244.0/22;
set_real_ip_from 103.22.200.0/22;
set_real_ip_from 103.31.4.0/22;
set_real_ip_from 141.101.64.0/18;
set_real_ip_from 108.162.192.0/18;
set_real_ip_from 190.93.240.0/20;
set_real_ip_from 188.114.96.0/20;
set_real_ip_from 197.234.240.0/22;
set_real_ip_from 198.41.128.0/17;
set_real_ip_from 162.158.0.0/15;
set_real_ip_from 104.16.0.0/13;
set_real_ip_from 104.24.0.0/14;
set_real_ip_from 172.64.0.0/13;
set_real_ip_from 131.0.72.0/22;
set_real_ip_from 2400:cb00::/32;
set_real_ip_from 2606:4700::/32;
set_real_ip_from 2803:f800::/32;
set_real_ip_from 2405:b500::/32;
set_real_ip_from 2405:8100::/32;
set_real_ip_from 2a06:98c0::/29;
set_real_ip_from 2c0f:f248::/32;
real_ip_header CF-Connecting-IP;
```

**`/etc/nginx/snippets/jesse-allowlist.conf`** lists who may open the dashboard. Everyone else gets an error. Add one `allow` line per IP address you connect from:

```nginx
allow 127.0.0.1;   # checks from the server itself
allow YOUR_IP;
deny all;
```

**`/etc/nginx/sites-available/jesse`** is the site itself:

```nginx
include /etc/nginx/snippets/cloudflare-realip.conf;

# cache for the dashboard's files, whose names change with every release
proxy_cache_path /var/cache/nginx/jesse levels=1:2 keys_zone=jesse_static:10m max_size=200m inactive=30d use_temp_path=off;

map $http_upgrade $connection_upgrade {
    default upgrade;
    ""      close;
}

# refuse requests for any other name, or for the bare IP address
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;
    return 444;
}
server {
    listen 443 ssl default_server;
    listen [::]:443 ssl default_server;
    server_name _;
    ssl_reject_handshake on;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name jesse.example.com;

    ssl_certificate     /etc/nginx/ssl/jesse.example.com.crt;
    ssl_certificate_key /etc/nginx/ssl/jesse.example.com.key;
    ssl_protocols TLSv1.2 TLSv1.3;

    include /etc/nginx/snippets/jesse-allowlist.conf;

    client_max_body_size 100m;   # candle CSV uploads

    gzip on;
    gzip_proxied any;
    gzip_types text/css application/javascript application/json image/svg+xml application/manifest+json;

    proxy_http_version 1.1;
    proxy_set_header Host              $host;
    proxy_set_header X-Real-IP         $remote_addr;
    proxy_set_header X-Forwarded-For   $remote_addr;
    proxy_set_header X-Forwarded-Proto https;

    # the dashboard's files: cached here and in browsers
    location /_nuxt/ {
        proxy_pass http://127.0.0.1:9000;
        proxy_cache jesse_static;
        proxy_cache_valid 200 30d;
        add_header Cache-Control "public, max-age=31536000, immutable" always;
    }

    # live updates
    location /ws {
        proxy_pass http://127.0.0.1:9000;
        proxy_set_header Upgrade    $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_read_timeout 1h;
        proxy_send_timeout 1h;
    }

    # the code editor
    location /lsp {
        proxy_pass http://127.0.0.1:9000;
        proxy_set_header Upgrade    $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_read_timeout 1h;
        proxy_send_timeout 1h;
    }

    # AI assistants (MCP)
    location /mcp {
        proxy_pass http://127.0.0.1:9000;
        proxy_buffering off;
        proxy_cache off;
        proxy_read_timeout 1h;
    }

    # everything else: never cached
    location / {
        proxy_pass http://127.0.0.1:9000;
        proxy_read_timeout 300s;
    }
}
```

Use your dashboard port in place of `9000` if you changed it.

Turn the site on, then test the configuration and reload:

```sh
sudo ln -s /etc/nginx/sites-available/jesse /etc/nginx/sites-enabled/jesse
sudo nginx -t
sudo systemctl reload nginx
```

Run `nginx -t` on its own and read its output. If the test fails, Nginx keeps running with its previous configuration, so a mistake is easy to miss.

Check from the server that the site answers. This prints `200`:

```sh
curl -sk -o /dev/null -w '%{http_code}\n' --resolve jesse.example.com:443:127.0.0.1 https://jesse.example.com/
```

## Step 5: Set up Cloudflare

In the Cloudflare dashboard, for your domain:

1. **DNS:** add an `A` record named `jesse` pointing to your server's IP address, with the proxy turned **on** (the orange cloud).
2. **SSL/TLS → Overview:** set the encryption mode to **Full (strict)**. Cloudflare then checks the certificate you created in step 3.
3. **SSL/TLS → Edge Certificates:** turn on **Always Use HTTPS**, so `http://` addresses are sent to `https://`.
4. **Browser Integrity Check:** turn it **off** for this hostname, with a rule under **Rules → Configuration Rules** where the hostname equals `jesse.example.com`. Otherwise Cloudflare blocks AI assistants and other non-browser clients with "Error 1010: Access denied". Your IP allowlist already keeps strangers out.
5. **Security → WAF → Custom rules:** add a rule that **blocks** requests when the hostname equals `jesse.example.com` and the IP source address is not in your list of IP addresses. Strangers are then stopped at Cloudflare and never reach your server. Nginx checks the same list again.

If you set the encryption mode or Browser Integrity Check with a rule for this hostname only, the rest of your domain keeps its settings.

## Step 6: Close the server to everyone else

Change your server's firewall rules to:

| Port | Allow from |
|---|---|
| 443 (HTTPS) | Cloudflare's IP ranges only, from [cloudflare.com/ips](https://www.cloudflare.com/ips/) |
| 22 (SSH) | Your IP address only |
| 9000 and 9001 | Remove them |

On AWS, DigitalOcean or Lightsail, change the firewall in their console, as in [Security](/docs/security). With UFW on the server, allow port `443` from each Cloudflare range. Make sure SSH stays allowed for your IP whichever way you do it, or you'll lock yourself out.

Do this last, after the domain works. Until then you can still use the old `http://` address.

## Step 7: Open your dashboard

Open `https://jesse.example.com` and log in with your Jesse password as before. Now you can [install it as an app](/docs/vps-setup#install-the-dashboard-as-an-app).

If you use an AI assistant with this Jesse, set `DASHBOARD_URL=https://jesse.example.com` in your project's `.env` and restart Jesse, then connect the assistant to `https://jesse.example.com/mcp`. See [MCP setup](/docs/mcp/setup).

To check that strangers are kept out, open the address from a different network, such as your phone without Wi-Fi. Cloudflare should block it.

## Keeping it working

- **When your IP address changes**, update both the Cloudflare WAF rule and `jesse-allowlist.conf`, then run `sudo nginx -t` and `sudo systemctl reload nginx`. If your home IP changes often, [Cloudflare Access](https://www.cloudflare.com/zero-trust/products/access/) is an alternative to IP lists: it puts a login in front of the dashboard and works from any IP address, and it's free for small teams.
- **Cloudflare's IP ranges** rarely change. Check [cloudflare.com/ips](https://www.cloudflare.com/ips/) now and then, and update both `cloudflare-realip.conf` and your firewall if they do.
- **Keep your Jesse password.** The allowlist is an extra layer of protection, not a replacement for it.

## Undoing it

Add the firewall rule for port `9000` from your IP again, and the old `http://203.0.113.10:9000` address works right away. If you changed `docker-compose.yml` in step 1, change it back to `"9000:9000"` and restart the containers. Then you can remove the Cloudflare DNS record and rules, and the Nginx site, in any order.
