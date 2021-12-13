# Initial setup

For this tutorial we'll be utilizing a Terra specific development suite called Terrain. 

Terrain will help you:

* Scaffold your dapp project
* Ease the development and deployment process
* Allow you to create custom tasks for blockchain and contract interaction with less boilerplate code
* Access a console (or REPL) for interacting with the Terra blockchain
* Ability to predefine functions to be used in tasks and the console

## Download LocalTerra

For local developement environment, you need LocalTerra.

```sh
git clone --branch v0.5.2 --depth 1 https://github.com/terra-money/localterra
cd localterra
docker-compose up
```

## Setup Rust

While WASM smart contracts can theoretically be written in any programming language, we currently only recommend using Rust as it is the only language for which mature libraries and tooling exist for CosmWasm. For this tutorial, you'll need to also install the latest version of Rust by following the instructions [here](https://www.rust-lang.org/tools/install).

Then run the following commands:

```sh
# set 'stable' as default release channel (used when updating rust)
rustup default stable

# add wasm as compilation target
rustup target add wasm32-unknown-unknown

# for generating contract
cargo install cargo-generate --features vendored-openssl
cargo install cargo-run-script
```

## Install Terrain

Use npm to install terrain command line tool globally: 

```sh
npm install -g @iboss/terrain
```

