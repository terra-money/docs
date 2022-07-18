# Build Terra core

Terra core is the official Golang reference implementation of the Terra node software. Use this guide to install Terra core and `terrad`, the command-line interface and daemon that connects to Terra and enables you to interact with the Terra blockchain.

## Get the Terra core source code

1. Use `git` to retrieve [Terra core](https://github.com/terra-money/core/), and check out the `main` branch, which contains the latest stable release.

You can find the latest tag on the [tags page](https://github.com/terra-money/core/tags) or via autocomplete in your terminal: type `git checkout v` and press `<TAB>`.

    ```bash
    git clone https://github.com/terra-money/core
    cd core
    git checkout [latest version]
    ```

2. Build Terra core. This will install the `terrad` executable to your [ `GOPATH` ](https://go.dev/doc/gopath_code) environment variable.

   ```bash
   make install
   ```

3. Verify that Terra core is installed correctly.

   ```bash
   terrad version --long
   ```

   **Example**:

   ```bash
   name: terra
   server_name: terrad
   version: v2.0.0
   commit: ea682c41e7e71ba0b182c9e7f989855fb9595885
   build_tags: netgo,ledger
   go: go version go1.18.2 darwin/amd64
   # ...followed by a lot of dependenecies
   ```

::: {tip}
If the `terrad: command not found` error message is returned, confirm that the Go binary path is correctly configured by running the following command:

```bash
export PATH=$PATH:$(go env GOPATH)/bin
```

:::
