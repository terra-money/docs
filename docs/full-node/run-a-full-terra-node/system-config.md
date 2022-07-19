# System Configuration

:::{admonition} Recommended operating systems
:class: caution  
This guide has been tested against Linux distributions only. To ensure a successful production environment setup, consider using a Linux system.
:::

Running a full Terra node is a resource-intensive process that requires a persistent server. If you want to use Terra without downloading the entire blockchain, use [Terra Station](https://station.terra.money/).

## Hardware Requirements

The the minimum requirements for running a Terra full node are:

| Network                                                                 | CPU cores     | RAM     | Disk                       | BANDWIDTH |
|-------------------------------------------------------------------------|---------------|---------|----------------------------|-----------|
| [`phoenix-1`](join-a-network.md#join-a-public-network)                  | 4 (+4 threads)| 32 GB   | 2 TB (SSD 2000 MB/s R/W)   | 300 Mbps  |
| [`pisco-1`](join-a-network.md#join-a-public-network)                    | 2 (+2 threads)| 16 GB   | 500 GB (SSD 1000 MB/s R/W) | 150 Mbps  |
| [`localterra`](https://github.com/terra-money/LocalTerra)               | 2             | 4 GB    | 20 GB (SSD 500 MB/s R/W)   |  N/A      |
| [`private-network`](join-a-network.html#set-up-a-local-private-network) | 1             | 2 GB    | 20 GB (SSD 500 MB/s R/W)   |  N/A      |

:::{admonition} Storage requirements
:class: warning
As the network grows, the minimum hardware requirements will also grow. It is recommended that you monitor the system so you can prevent it from running out of resources.
:::

## Prerequisites

- [Golang v1.18+ linux/amd64](https://go.dev/dl/)

  ::: {dropdown} Installing Go for MacOS & Linux

  Go releases can be found here: [ https://go.dev/dl/ ](https://go.dev/dl/)

  In your browser, you can right-click the correct release (V1.18) and `Copy link`.

  ```bash
  # 1. Download the archive

  wget https://go.dev/dl/go1.18.2.linux-amd64.tar.gz

  # Optional: remove previous /go files:

  sudo rm -rf /usr/local/go

  # 2. Unpack:

  sudo tar -C /usr/local -xzf go1.18.2.linux-amd64.tar.gz

  # 3. Add the path to the go-binary to your system path:
  # (for this to persist, add this line to your ~/.profile or ~/.bashrc or  ~/.zshrc)

  export PATH=$PATH:/usr/local/go/bin

  # 4. Verify your installation:

  go version

  # go version go1.18.2 linux/amd64

  ```

  :::

- Linux users: `sudo apt-get install -y build-essential`

## Commonly used ports

`terrad` uses the following TCP ports. Toggle their settings to match your environment.

Most validators will only need to open the following port:

- `26656`: The default port for the P2P protocol. This port is used to communicate with other nodes and must be open to join a network. However, it does not have to be open to the public. For validator nodes, [configuring `persistent_peers`](updates-and-additional.md#additional-settings) and closing this port to the public are recommended.

Additional ports:

- `1317`: The default port for the [Lite Client Daemon](../../develop/guides/start-lcd.md) (LCD), which can be executed by `terrad rest-server`. The LCD provides an HTTP RESTful API layer to allow applications and services to interact with your `terrad` instance through RPC. For usage examples, see [Terra REST API](https://lcd.terra.dev/swagger/). You don't need to open this port unless you have use for it.

- `26660`: The default port for interacting with the [Prometheus](https://prometheus.io) database, which can be used to monitor the environment. In the default configuration, this port is not open.

- `26657`: The default port for the RPC protocol. Because this port is used for querying and sending transactions, it must be open for serving queries from `terrad`.

::: {warning}
Do not open port `26657` to the public unless you plan to run a public node.
:::
