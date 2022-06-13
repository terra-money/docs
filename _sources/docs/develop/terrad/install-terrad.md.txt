# Install `terrad`

`terrad` is the command-line interface and daemon that connects to Terra and enables you to interact with the Terra blockchain. Terra core is the official Golang reference implementation of the Terra node software.

This guide is for developers who want to install `terrad` and interact with Terra core without running a full node. If you want to run a full node or join a network, visit [](../../full-node/run-a-full-terra-node/README.md).

### Prerequisites

- [Golang v1.18 linux/amd64](https://golang.org/doc/install)
- Ensure your `GOPATH` and `GOBIN` environment variables are set up correctly.
- Linux users: install [build-essential](http://linux-command.org/en/build-essential.html).

:::{admonition} Terrad for Mac
:class: danger
If you are using a Mac, follow the [`terrad` Mac installation guide](./terrad-mac.md).
:::

## From binary

The easiest way to install `terrad` and Terra core is by downloading a pre-built binary for your operating system. You can find the latest binaries on the [releases](https://github.com/terra-money/core/releases) page. If you have a Mac, follow the [Mac installation instructions](./terrad-mac.md).

## From source

### 1. Get the Terra core source code

Use `git` to retrieve [Terra core](https://github.com/terra-money/core/), and check out the `main` branch, which contains the latest stable release.

```bash
git clone https://github.com/terra-money/core
cd core
git checkout [latest version]
```

### 2. Build Terra core from source

Build Terra core, and install the `terrad` executable to your `GOPATH` environment variable.

```bash
make install
```

### 3. Verify your Terra core installation

Verify that Terra core is installed correctly.

```bash
terrad version --long
```

The following example shows version information when Terra core is installed correctly:

```bash
name: terra
server_name: terrad
version: v2.0.0
commit: ea682c41e7e71ba0b182c9e7f989855fb9595885
build_tags: netgo,ledger
go: go version go1.18.2 darwin/amd64
```

::: {tip}
If the `terrad: command not found` error message is returned, confirm that the Go binary path is correctly configured by running the following command:

```
export PATH=$PATH:$(go env GOPATH)/bin
```

:::

## Next steps

With `terrad` installed, you can set up a local testing environment using [LocalTerra](../localterra/README.md).

For more information on `terrad` commands and usage, see [](using-terrad.md).
