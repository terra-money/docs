---
id: node-production
title: Production Settings
---

This document explains how to set up a node for production. For the moment, this guide only covers RPM-based Linux distributions.

`terrad` does not require the super user account. We **strongly** recommend using a normal user to run `terrad`. However, during the setup process you'll need super user permission to create and modify some files.

This guide is for general purpose only. We recommend to read the [Validator Handbook](validator-intro.md) section for specifics on operating a validator node.

## Firewall configuration
`terrad` uses several TCP ports for different purposes.

* `26656` is the default port for the P2P protocol. This port is opened in order to communicate with other nodes, and must be open to join a network. **However,** it does not have to be open to the public. For validator nodes, we recommend configuring `persistent_peers` and closing this port to the public.

* `26657` is the default port for the RPC protocol. This port is used for querying / sending transactions. In other words, this port needs to be opened for serving queries from `terracli`. It is safe to _NOT_ to open this port to the public unless you are planning to run a public node.

* `1317` is the default port for [Lite Client Daemon](node-light-client.md) (LCD), which can be executed by `terracli rest-server`. LCD provides HTTP RESTful API layer to allow applications and services to interact with your `terrad` instance through RPC. Check `https://lcd.terra.dev/swagger-ui/` for usage examples. You don't need to open this port unless you have use of it.

* `26660` is the default port for interacting with the [Prometheus](https://prometheus.io) database which can be used for monitoring the environment. This port is not opened in the default configuration.

## Increase maximum opened files

`terrad` can open more than 1024 files (which is default maximum) concurrently.
You wil want to increase this limit.

Modify `/etc/security/limits.conf` to raise the `nofile` capability.

```
*                soft    nofile          65535
*                hard    nofile          65535
```

## Running server as a daemon

There are several ways to run a node, and we recommend registering `terrad` as a `systemd` service.

### Register terrad service

We have to make a service definition file in `/etc/systemd/system` directory.

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

Modify the `Service` Section from the above given sample to suit your settings.
Note that even if we raised the number of open files for a process, we still need the `LimitNOFILE` section.

After creating a service definition file, you need to execute `systemctl daemon-reload`.

### Controlling the service

Use systemctl to control (start, stop, restart)

* Start: `systemctl start terrad`
* Stop: `systemctl stop terrad`
* Restart: `systemctl restart terrad`

#### Accessing logs

* Entire log: `journalctl -t terrad`
* Entire log reversed: `journalctl -t terrad -r`
* Latest and continuous: `journalctl -t terrad -f`
