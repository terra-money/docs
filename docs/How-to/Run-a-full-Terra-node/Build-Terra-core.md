# Build Terra core

## Prerequisites

- [Golang v1.16.1 or higher](https://golang.org/doc/install)
- Ensure your `GOPATH` and `GOBIN` environment variables are set up correctly.

## Get the Terra core source code

Use `git` to retrieve [Terra core](https://github.com/terra-money/core/), and checkout the `main` branch, which contains the latest stable release.

If you are using LocalTerra or running a validator, use the `v0.x.x-oracle` tag. Otherwise, use the `v0.x.x` tag.

```bash
git clone https://github.com/terra-money/core
cd core
git checkout [latest version]
```

**Example:**

```bash
git clone https://github.com/terra-money/core
cd core
git checkout v0.5.6-oracle
```

## Build Terra core from source

Build Terra core, and install the `terrad` executable to your `GOPATH` environment variable. `terrad` - a node daemon, runs in the background, allowing you interact with a Terra node.

```bash
make install
```

## Verify your Terra core installation

Verify that Terra core is installed correctly.

```bash
terrad version --long
```

The following example shows version information when Terra core is installed correctly:

```bash
name: terra
server_name: terrad
client_name: terrad
version: 0.3.0-24-g3684f77
commit: 3684f77faadf6cf200d18e15763316d5d9c5a496
build_tags: netgo,ledger
go: go version go1.13.4 darwin/amd64
```

::: tip
If the `terrad: command not found` error message is returned, confirm that the Go binary path is correctly configured by running the following command:

```
export PATH=$PATH:$(go env GOPATH)/bin
```

:::
