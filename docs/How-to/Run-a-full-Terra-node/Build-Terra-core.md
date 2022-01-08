# Build Terra core

Terra core is the official Golang reference implementation of the Terra node software. Use this guide to install Terra core and `terrad`, the command-line interface and daemon that connects to Terra and enables you to interact with the Terra blockchain.

## Prerequisites

- `Go` has to be installed on your system. 

    ::: details Installing Go  (for MacOS & Linux)

    Go releases can be found here: [ https://go.dev/dl/ ](https://go.dev/dl/)

    In your browser you can right-click the release and `Copy link`.

    ```bash
    # make sure to get the latest stable release for linux-amd64 (paste the link you copied)
    CURRENT_GO_RELEASE='https://go.dev/dl/go1.17.6.linux-amd64.tar.gz' 

    # download the archive
    wget $CURRENT_GO_RELEASE 

    # optionally remove previous /go files
    sudo rm -rf /usr/local/go

    # unpack
    sudo tar -C /usr/local -xzf go1.17.6.linux-amd64.tar.gz

    # add the path to the go-binary to your system path.
    # for this to persist, add this line to your ~/.profile or ~/.bashrc or  ~/.zshrc
    export PATH=$PATH:/usr/local/go/bin

    # check that everything went well. 
    go version 
    # go version go1.17.5 linux/amd64

    ```

    :::

- Linux users:  `sudo apt-get install -y build-essential`

## Get the Terra core source code

Use `git` to retrieve [Terra core](https://github.com/terra-money/core/), and checkout the `main` branch, which contains the latest stable release.

If you are using LocalTerra or running a validator, use the `v0.x.x-oracle` tag. Otherwise, use the `v0.x.x` tag. You can find out the latest tag on the [ tags page ](https://github.com/terra-money/core/tags) or via autocomplete in your terminal: type `git checkout v` and press `<TAB>`.

```bash
git clone https://github.com/terra-money/core
cd core
git checkout [latest version] # ex., git checkout v0.5.13-oracle 
```


Now build Terra core. This will install the `terrad` executable to your [ `GOPATH` ](https://go.dev/doc/gopath_code) environment variable.

```bash
make install
```

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
# .. And a bunch of dependenecies
```

::: tip
If the `terrad: command not found` error message is returned, confirm that the Go binary path is correctly configured by running the following command:

```
export PATH=$PATH:$(go env GOPATH)/bin
```
:::
