# System Configuration

:::warning Recommended operating systems
This guide has been tested against Linux distributions only. To ensure a successful production environment setup, consider using a Linux system.
:::

Running a full Terra node is a resource-intensive process that requires a persistent server. If you want to use Terra without downloading the entire blockchain, use [Terra Station](https://station.terra.money/).

##  Hardware requirements

- Four or more CPU cores
- At least 2 TB of disk storage
- At least 32 GB of memory
- At least 300 mbps of network bandwidth

## Prerequisites

- [Golang v1.16.1 - go1.17.1 linux/amd64](https://go.dev/dl/)

::: details Installing Go  (for MacOS & Linux)

  Go releases can be found here: [ https://go.dev/dl/ ](https://go.dev/dl/)

  In your browser, you can right-click the correct release (v1.16.1 - go1.17.1) and `Copy link`.

  ```bash
  # 1. Download the archive

  wget https://go.dev/dl/go1.17.1.linux-amd64.tar.gz

  # Optional: remove previous /go files:

  sudo rm -rf /usr/local/go

  # 2. Unpack:

  sudo tar -C /usr/local -xzf go1.17.1.linux-amd64.tar.gz

  # 3. Add the path to the go-binary to your system path:
  # (for this to persist, add this line to your ~/.profile or ~/.bashrc or  ~/.zshrc)

  export PATH=$PATH:/usr/local/go/bin

  # 4. Verify your installation:

  go version

  # go version go1.17.1 linux/amd64

  ```

  :::

- Linux users:  `sudo apt-get install -y build-essential`

## Commonly used ports

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
