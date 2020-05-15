---
id: node-installation
title: Installation
---

This document will explain how to install and set up Terra Core (repo: [terra-project/core](https://github.com/terra-project/core/)), the official node software. Both validators and non-validator users can directly access the Terra blockchain by running a full node.

Terra Core will install two command-line executables on your system, `terrad` and `terracli`. 

`terrad` is the daemon process that connects to Terra and communicates with peers on the network, receiving and processing blocks. When active, it initiates a full node and will attempt to download and sync the current blockchain and onto your local machine.

You can interact with the Terra blockchain using `terracli` through commands for querying data, building and signing transactions, as well as broadcasting them to the network via your local node.

Once you've installed the node software, you'll be able to participate in the Columbus-3 mainnet or Vodka testnet as either a [Full Node]() or a [Validator]().

## Minimum Hardware Requirements

We recommend running the Terra node software on a machine with:

* **2 or more** CPU cores
* At least **128GB** of disk storage
* **2.5 ~ 5Mbps** of network bandwidth*

\* *more traffic may be used when `terrad` is syncing with the network*

## Build Terra from Source

### Step 1: Install Golang

> **Go v1.13.1+** is required for Terra Core.

Install `go` by following the [official docs](https://golang.org/doc/install).

> The build process will install the `terrad` and `terracli` binaries in your `GOPATH/bin`. 
> Configure your `PATH` variable to include executables located in `GOPATH/bin` to directly
> call `terrad` and `terracli` from your shell.
> ```bash
> export GOPATH=$HOME/go # an example
> export PATH=$PATH:$GOPATH/bin
> ```
> You can place the above code in a startup script such as `~/.bash_profile` or `~/.bashrc`, etc.
{tip}

### Step 2: Download Terra Core source code and build
Use `git` to retrieve Terra Core from the [official repo](https://github.com/terra-project/core/), and checkout the `master` branch, which contains the latest stable release. 

```bash
git clone https://github.com/terra-project/core/
cd core
git checkout master
make
```

> If you have issues at this step, please check that you have the latest stable version of Go installed.
{note}

That should install the `terrad` and `terracli` binaries. Verify that everything is OK.

```bash
$ terrad version --long
$ terracli version --long
```

`$ terracli version --long` should output something similar to:

```text
name: terra
server_name: terrad
client_name: terracli
version: 0.2.2-62-gf5544a3
commit: f5544a35f264c354ec68f490464355a5fd3b0834
build_tags: netgo,ledger
go: go version go1.13.4 darwin/amd64
```

### Build Tags

Build tags indicate special features that have been enabled in the binary.

| Build Tag | Description |
| :--- | :--- |
| netgo | Name resolution will use pure Go code |
| ledger | Ledger devices are supported \(hardware wallets\) |