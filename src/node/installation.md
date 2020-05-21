# Installation

This is for setting up a **full node**, a resource-intensive process that requires a persistent server. If you're just trying to _use_ Terra blockchain without downloading the entire blockchain, you're probably looking for [Terra Station](../station).

## Hardware Requirements

We recommend the following for running Terra Core:

- **2 or more** CPU cores
- At least **300GB** of disk storage
- At least **2.5 - 5mbps** network bandwidth

## Building Terra Core

### Step 1. Install Golang

**Go v1.13.1 or higher is required for Terra Core.**

If you haven't already, install Golang by following the [official docs](https://golang.org/doc/install). Make sure that your `GOPATH` and `GOBIN` environment variables are properly set up.

### Step 2: Get Terra Core source code

Use `git` to retrieve Terra Core from the [official repo](https://github.com/terra-project/core/), and checkout the `master` branch, which contains the latest stable release. That should install the `terrad` and `terracli` binaries.

```bash
$ git clone https://github.com/terra-project/core/
$ cd core
$ git checkout master
```

### Step 3: Build from source

You can now build Terra Core. Running the following command will install executables `terrad` (Terra node daemon) and `terracli` (CLI for interacting with the node) to your `GOPATH`.

```bash
$ make install
```

### Step 4: Verify your installation

Verify that everything is OK. If you get something like the following, you've successfully installed Terra Core on your system.

```bash
$ terrad version --long
$ terracli version --long
name: terra
server_name: terrad
client_name: terracli
version: 0.3.0-24-g3684f77
commit: 3684f77faadf6cf200d18e15763316d5d9c5a496
build_tags: netgo,ledger
go: go version go1.13.4 darwin/amd64
```
