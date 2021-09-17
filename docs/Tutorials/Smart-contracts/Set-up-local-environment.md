# Environment Setup

As a smart contract developer, you will need to write, compile, upload, and test your contracts before deploying them to be used on the Columbus mainnet. As this development process can involve manually juggling multiple moving parts over many iterations, it is helpful to first set up a specialized environment to streamline development.

## Install Terra Core locally

Follow the instructions [here](../../node/installation.md) to install the latest version of Terra Core to obtain a working version of `terrad`. You will need this to connect to your local Terra test network, for working with smart contracts.

## Download LocalTerra

In order to work with Terra Smart Contracts, you should have access to a Terra network that includes the WASM integration.

In this tutorial, we will be using [LocalTerra](https://github.com/terra-money/localterra), a package that enables you to easily spin up a local, WASM-enabled private testnet. This reduces the friction of development by giving you complete control of a private Terra blockchain with the possibility to easily reset the world state.

To use **LocalTerra**, you should first make sure Docker is installed on your computer by following the instructions [here](https://www.docker.com/get-started). You will also need to set up and configure [Docker Compose](https://docs.docker.com/compose/install/) on your machine.

```sh
git clone --branch v0.4.1 --depth 1 https://github.com/terra-money/localterra
cd localterra
docker-compose up
```

You should now have a local testnet running on your machine, with the following configurations:

- Node listening on RPC port `26657`
- LCD running on port `1317`
- Swagger Documentation at [http://localhost:3060/swagger](http://localhost:3060/swagger)

The account with the following mnemonic is the sole validator on the network and has enough funds to get started with smart contracts.

```
satisfy adjust timber high purchase tuition stool faith fine install that you unaware feed domain license impose boss human eager hat rent enjoy dawn
```

## Install Rust

While WASM smart contracts can theoretically be written in any programming language, we currently only recommend using Rust as it is the only language for which mature libraries and tooling exist for CosmWasm. For this tutorial, you'll need to also install the latest version of Rust by following the instructions [here](https://www.rust-lang.org/tools/install).

Once you'll installed Rust and its toolchain (cargo et al.), you'll need to add the `wasm32-unknown-unknown` compilation target.

```sh
rustup default stable
rustup target add wasm32-unknown-unknown
```

Then, install `cargo-generate`, which we will need for bootstrapping new CosmWasm smart contracts via a template.

```sh
cargo install cargo-generate --features vendored-openssl
```
