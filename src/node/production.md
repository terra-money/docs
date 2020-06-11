# Production Environment

This document explains how to set up your environment for running a production-quality full node. For the moment, this guide has only been tested against RPM-based Linux distributions.

::: warning NOTE
This guide only covers general settings for a production-level full node. You can find further details on considerations for operating a validator node in our [Validator Guide](../validator/README.md)
:::

## Create a Dedicated User

`terrad` does not require the super user account. We **strongly** recommend using a normal user to run `terrad`. However, during the setup process you'll need super user permission to create and modify some files.

## Firewall Configuration

`terrad` uses several TCP ports for different purposes.

- `26656` is the default port for the P2P protocol. This port is opened in order to communicate with other nodes, and must be open to join a network. **However,** it does not have to be open to the public. For validator nodes, we recommend configuring `persistent_peers` and closing this port to the public.

- `26657` is the default port for the RPC protocol. This port is used for querying / sending transactions. In other words, this port needs to be opened for serving queries from `terracli`. It is safe to _NOT_ to open this port to the public unless you are planning to run a public node.

- `1317` is the default port for [Lite Client Daemon](../terracli/lcd.md) (LCD), which can be executed by `terracli rest-server`. LCD provides HTTP RESTful API layer to allow applications and services to interact with your `terrad` instance through RPC. Check the [Terra REST API](https://swagger.terra.money) for usage examples. You don't need to open this port unless you have use of it.

- `26660` is the default port for interacting with the [Prometheus](https://prometheus.io) database which can be used for monitoring the environment. This port is not opened in the default configuration.

## Increase Maximum Open Files

`terrad` can open more than 1024 files (which is default maximum) concurrently.
You wil want to increase this limit.

Modify `/etc/security/limits.conf` to raise the `nofile` capability.

```
*                soft    nofile          65535
*                hard    nofile          65535
```

## Running Server as a Daemon

It is important to keep `terrad` running at all times. There are several ways to achieve this, and the simplest solution we recommend is to register `terrad` as a `systemd` service so that it will automatically get started upon system reboots and other events.

### Register terrad as a service

First, create a service definition file in `/etc/systemd/system`.

#### Sample file: `/etc/systemd/system/terrad.service`

```
[Unit]
Description=Terra Daemon
After=network.target

[Service]
Type=simple
User=terra
ExecStart=/data/terra/go/bin/terrad start
Restart=on-abort

[Install]
WantedBy=multi-user.target

[Service]
LimitNOFILE=65535
```

Modify the `Service` section from the given sample above to suit your settings.
Note that even if we raised the number of open files for a process, we still need to include `LimitNOFILE`.

After creating a service definition file, you should execute `systemctl daemon-reload`.

### Controlling the service

Use `systemctl` to control (start, stop, restart)

```bash
# Start
systemctl start terrad
# Stop
systemctl stop terrad
# Restart
systemctl restart terrad
```

### Accessing logs

```bash
# Entire log
journalctl -t terrad
# Entire log reversed
journalctl -t terrad -r
# Latest and continuous
journalctl -t terrad -f
```
