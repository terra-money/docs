# Hardware requirements

:::warning Recommended operating systems
This guide has been tested against Linux distributions only. To ensure you successfully set up your production environment, consider setting it up on an Linux system.
:::

Running a full Terra node is a resource-intensive process that requires a persistent server. If you want to use Terra without downloading the entire blockchain, use [Terra Station](https://station.terra.money/).

We recommend the following hardware to run a full node:

- Four or more CPU cores
- At least 2 TB of disk storage
- At least 32 GB of memory
- At least 300 mbps of network bandwidth


# System Configuration 

### Commonly used ports

`terrad` uses the following TCP ports. Toggle their settings to fit your environment.

Most validators will only need to open the following port:

- `26656`: The default port for the P2P protocol. This port is used to communicate with other nodes and must be open to join a network. However, it does not have to be open to the public. For validator nodes, we recommend [ configuring `persistent_peers` ](https://docs.terra.money/How-to/Run-a-full-Terra-node/Configure-general-settings.html#persistent-peers) and closing this port to the public.

Additional ports:

- `1317`: The default port for the [Lite Client Daemon](/How-to/Start-LCD.md) (LCD), which can be executed by `terrad rest-server`. The LCD provides an HTTP RESTful API layer to allow applications and services to interact with your `terrad` instance through RPC. For usage examples, see [Terra REST API](https://lcd.terra.dev/swagger/). You don't need to open this port unless you have use for it.

- `26660`: The default port for interacting with the [Prometheus](https://prometheus.io) database, which can be used to monitor the environment. In the default configuration, this port is not open.

- `26657`: The default port for the RPC protocol. Because this port is used for querying and sending transactions, it must be open for serving queries from `terrad`.

::: danger Warning
Do not open port `26657` to the public unless you plan to run a public node.
:::