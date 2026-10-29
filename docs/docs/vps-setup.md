---
title: 'VPS Setup'
---

# VPS Setup for Live Trading

## Do you need a VPS?

**A VPS is optional.** You can run Jesse on your own computer, and you do not need a server just to get started, develop strategies, or run backtests.

For the absolute best live trading experience, however, we recommend a VPS (Virtual Private Server) close to your exchange's servers. It can keep running around the clock without depending on your computer staying awake or your home internet connection, while reducing the network delay between Jesse and the exchange.

**AWS EC2 is our recommended provider for this setup.** An EC2 instance is a virtual server. DigitalOcean is also a good alternative; both walkthroughs are included below:

- [AWS setup (recommended)](#aws-setup-recommended)
- [DigitalOcean setup](#digitalocean-setup)

## AWS setup (recommended)

### Step 1: Choose the region

Sign in to AWS and open the [EC2 console](https://console.aws.amazon.com/ec2/). Use the region selector at the top of the console before creating your instance.

**Tokyo is our recommended starting point for most crypto exchange setups.** Choose **Asia Pacific (Tokyo)** (`ap-northeast-1`). For some exchanges, **Asia Pacific (Singapore)** (`ap-southeast-1`) is the better choice. For example, [Bybit's API documentation](https://bybit-exchange.github.io/docs/faq#where-are-bybits-servers-located) lists AWS Singapore as its server location.

**Always look up your exchange's API server location** in its documentation or ask its support team before choosing a region. The location of its headquarters or website is not necessarily where trading requests are handled. Choose a region close to the exchange, rather than close to you, and compare API latency from candidate regions if you want the lowest delay. Tokyo is a starting recommendation, not a guarantee for every exchange.

### Step 2: Create an EC2 instance

Click **Launch instance** and configure the following:

| Setting | Recommendation |
|---|---|
| Name | A recognizable name, such as `jesse-live` |
| Application and OS Images | **Ubuntu Server 24.04 LTS**, **64-bit (x86)**, published by Canonical |
| Instance type | **t3.small** (2 vCPUs, 2 GiB RAM) for a light live trading workload; **t3.medium** (2 vCPUs, 4 GiB RAM) for more memory headroom |
| Key pair (login) | Create a key pair, choose **RSA** and **.pem**, and download the private key to your computer |
| Storage | Start with **30 GiB, gp3** to leave room for Ubuntu, Docker images, logs, and candle data; increase it if you store a lot of history |

Keep your private key safe: you will use it to connect over SSH. For this walkthrough, name it `jesse-live.pem`.

The suggested instance sizes are starting points, not requirements for every strategy. Monitor CPU and memory as you add sessions. T3 instances use CPU credits; sustained heavy backtesting or optimization may need a larger, non-burstable instance. See [AWS's T3 details](https://aws.amazon.com/ec2/instance-types/t3/) for how credits and additional charges work.

Under **Network settings**, click **Edit**:

1. Select the **default VPC** and a default subnet in your chosen region. If your account has no default VPC, use a public subnet with a route to an internet gateway.
2. Set **Auto-assign public IP** to **Enable** so you can connect from your computer.
3. Choose **Create security group** and name it `jesse-firewall`.
4. Configure the firewall rules below before launching. Leave public HTTP and HTTPS access unchecked for this setup.

For more detail about the wizard, see [AWS's instance configuration reference](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-launch-parameters.html).

### Step 3: Configure the firewall

AWS calls its instance firewall a **security group**. It controls which connections can reach your server, including ports published by Docker.

Add these **inbound rules** to `jesse-firewall`:

| Purpose | Type | Protocol | Port | Source |
|---|---|---|---|---|
| SSH | SSH | TCP | 22 | My IP |
| Jesse dashboard | Custom TCP | TCP | 9000 | My IP |
| Jesse code editor (LSP) | Custom TCP | TCP | 9001 | My IP |

**My IP means your computer's public IP address**, not the EC2 instance's IP. AWS represents a single IPv4 address with `/32`, such as `198.51.100.25/32`. Replace the example with your own address. If you connect through a VPN, use its public exit IP.

These are Jesse's default ports. If you change `APP_PORT` or `LSP_PORT` in your project's `.env`, or change Docker's host port mappings, use the corresponding server ports in the firewall.

Remove inbound rules allowing **Anywhere-IPv4** (`0.0.0.0/0`) or **Anywhere-IPv6** (`::/0`). Do not expose PostgreSQL (port `5432`) to the internet. No other inbound rules are needed for this setup.

Keep the default **allow all outbound traffic** rule so Jesse can connect to exchange APIs and download updates. Exchange responses to connections initiated by Jesse do not require extra inbound rules.

Review the configuration and click **Launch instance**. Wait for the instance to show **Running** and pass its status checks.

#### Check or change the firewall later

Go to **EC2 → Instances**, select your instance, open the **Security** tab, and click the `jesse-firewall` security group link. Under **Inbound rules → Edit inbound rules**, you can add or update trusted IP addresses and save the rules.

Confirm that this security group is actually attached to the instance. If multiple security groups are attached, review all of them: an open rule in another group still allows access. See [AWS's security group documentation](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/creating-security-group.html).

::: tip If your home IP changes
Update the source IP for all three rules in the AWS console, then reconnect. Add a separate rule for each additional trusted public IP you need. You can update the security group even when SSH access is blocked.
:::

### Step 4: Assign a stable public IP

For live trading, we recommend an **Elastic IP**, especially if your exchange API key is restricted to specific IP addresses. An automatically assigned public IPv4 address can change after you stop and start the instance; an Elastic IP stays assigned until you release it.

1. In the same AWS region, open **EC2 → Network & Security → Elastic IPs**.
2. Click **Allocate Elastic IP address**, keep the default Amazon IPv4 pool, and click **Allocate**.
3. Select the address, then **Actions → Associate Elastic IP address**.
4. Choose **Instance**, select your Jesse instance, and click **Associate**.

Use this Elastic IP for SSH, dashboard access, and your exchange's API-key IP allowlist. The firewall's inbound source remains **your computer's public IP**.

AWS charges for public IPv4 addresses, including Elastic IPs, even when an allocated Elastic IP is unused. Instance compute, storage, and applicable data transfer are billed separately; review the estimate before launching rather than assuming this setup is free. See [AWS's Elastic IP guide](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html).

### Step 5: Connect and install Jesse

Select your instance and click **Connect → SSH client** to see AWS's connection instructions. On macOS or Linux, open a terminal in the folder containing your downloaded key and run:

```sh
chmod 400 jesse-live.pem
ssh -i jesse-live.pem ubuntu@YOUR_SERVER_PUBLIC_IP
```

Replace `YOUR_SERVER_PUBLIC_IP` with the Elastic IP (or current public IPv4 address if you skipped that step). The username for the Ubuntu image is `ubuntu`. On Windows, use an SSH client and follow the instructions shown in the **SSH client** tab.

Once connected, follow the **[Docker setup](/docs/getting-started/docker)** on the server to install Docker, create a Jesse project, and start its containers. We recommend Docker because it makes installation and future updates easier. Set a strong `PASSWORD` in the project's `.env` before starting Jesse.

### Step 6: Open the dashboard

From a computer whose public IP is allowed by the firewall, open `http://YOUR_SERVER_PUBLIC_IP:9000` in your browser. Use your configured dashboard port if you changed it.

For an encrypted connection without setting up HTTPS, you can instead forward both ports through SSH:

```sh
ssh -i jesse-live.pem -N -L 9000:localhost:9000 -L 9001:localhost:9001 ubuntu@YOUR_SERVER_PUBLIC_IP
```

Keep that terminal open and visit `http://localhost:9000`. With this approach, you can remove the inbound rules for `9000` and `9001`, leaving only SSH allowed from your IP. Closing the tunnel disconnects your browser; Jesse keeps running on the server.

If the dashboard does not load, check that the containers are running, the dashboard port matches your configuration, and the attached security group allows your current public IP. If the dashboard works but the editor does not, check the LSP port as well.

To connect an AI assistant to your VPS, follow **[MCP remote setup](/docs/mcp/setup#connecting-from-another-machine)**.

## DigitalOcean setup

If you prefer DigitalOcean, you can use the following walkthrough to create a Droplet (DigitalOcean's name for a virtual server), configure its firewall, and install Jesse.

### Step 1: Create a Droplet

Head to DigitalOcean and [create a new Droplet](https://cloud.digitalocean.com/droplets/new).

**Choose a datacenter region** close to your exchange's API servers to minimize latency. Singapore is a useful option for exchanges hosted there. As with AWS, look up your exchange's server location and compare latency from the regions available to you before deciding.

For the **OS**, select **Ubuntu** (an LTS version is recommended).

![DigitalOcean Create Droplet - Region and OS](/imgs/live/Digital%20Ocean%20dropet%201-optimized.jpeg)

**Choose a plan.** We recommend at least **2 GB of RAM** for a light live trading workload. One CPU core can be enough, but **2 CPU cores** gives you a comfortable buffer. Choose more memory as you add sessions, and check the current plan price in the console. You can resize later if needed.

![DigitalOcean Create Droplet - Plan selection](/imgs/live/Digital%20Ocean%20dropet%202-optimized.jpeg)

For **Authentication**, we recommend **SSH Keys** instead of a password.

Once you've configured everything, click **Create Droplet**.

![DigitalOcean Create Droplet - Authentication and finalize](/imgs/live/Digital%20Ocean%20dropet%203-optimized.jpeg)

### Step 2: Set up a firewall

Once your Droplet is ready, follow the **[DigitalOcean firewall walkthrough](/docs/security#digitalocean-firewall)** to create a cloud firewall and apply it to your Droplet.

Allow inbound TCP ports **22** (SSH), **9000** (the default Jesse dashboard), and **9001** (the default code editor), restricted to **your computer's public IP address**. Use your configured ports if you changed them, and keep outbound traffic allowed so Jesse can reach the exchanges.

### Step 3: Install Jesse

Connect to your Droplet over SSH using its public IP and the key you selected during creation. Follow the **[Docker setup](/docs/getting-started/docker)** on the server to install Docker, create your Jesse project, and start the containers. Set a strong `PASSWORD` in the project's `.env` before starting Jesse.

### Step 4: Open the dashboard

Once Jesse is running, open the dashboard from your own computer at your Droplet's public IP and dashboard port, for example `http://203.0.113.10:9000` (replace the example with your server's IP). Your computer's public IP must be allowed by the firewall.

To connect an AI assistant to your VPS, follow **[MCP remote setup](/docs/mcp/setup#connecting-from-another-machine)**.
