# Set up a production environment

Use the following information to set up and manage your production-level full Terra node. This information has been tested against RPM-based Linux distributions only.

For information about running a validator node, visit the [validator guide](/How-to/Manage-a-Terra-validator/Overview.md).

## Create a dedicated user

Although `terrad` does not require a super user account, during the setup process you'll need super user permission to create and modify some files. It is strongly recommended to use a normal user when running `terrad`, .

## Increase the maximum files `terrad` can open

`terrad` is set to open 1024 files by default. It is recommended that you increase this amount.

Modify `/etc/security/limits.conf` to increase the amount, where `nofile` is the number of files `terrad` can open.

```
*                soft    nofile          65535
*                hard    nofile          65535
```

## Commonly used ports

`terrad` uses the following TCP ports. Toggle their settings to fit your environment.

Most validators will only need to open the following port:

- `26656`: The default port for the P2P protocol. This port is used to communicate with other nodes and must be open to join a network. However, it does not have to be open to the public. For validator nodes, we recommend configuring `persistent_peers` and closing this port to the public.

Additional ports:

- `1317`: The default port for the [Lite Client Daemon](/How-to/Start-LCD.md) (LCD), which can be executed by `terrad rest-server`. The LCD provides an HTTP RESTful API layer to allow applications and services to interact with your `terrad` instance through RPC. For usage examples, see [Terra REST API](https://lcd.terra.dev/swagger/). You don't need to open this port unless you have use for it.

- `26660`: The default port for interacting with the [Prometheus](https://prometheus.io) database, which can be used to monitor the environment. In the default configuration, this port is not open.

- `26657`: The default port for the RPC protocol. Because this port is used for querying and sending transactions, it must be open for serving queries from `terrad`.

::: danger Warning
Do not open port `26657` to the public unless you plan to run a public node.
:::

## Run the server as a daemon

`terrad` must be running all the time. It can be kept running in several ways, but we recommend that you register `terrad` as a `systemd` service so that it will be started automatically when the system reboots and other events occur.

## Register terrad as a service

1. Create a service definition file in `/etc/systemd/system/terrad.service`, as shown in the following example:

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

2. Modify the `Service` section for your environment. Even if you raised the number of open files, you must include `LimitNOFILE`.

3. Run `systemctl daemon-reload` and `systemctl enable terrad`.

## Control the service

Use `systemctl` to start, stop, and restart the service.

```bash
# Start
systemctl start terrad
# Stop
systemctl stop terrad
# Restart
systemctl restart terrad
```

## Access logs

Use `journalctl -t` to access entire logs, entire logs in reverse, and the latest and continuous log.

```bash
# Entire log
journalctl -t terrad
# Entire log reversed
journalctl -t terrad -r
# Latest and continuous
journalctl -t terrad -f
```
