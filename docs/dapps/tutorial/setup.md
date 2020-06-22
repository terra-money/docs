# Environment Setup

As a smart contract developer, you will need to write, compile, upload, and test your contracts before deploying them to be used on the Columbus mainnet. As this development process can involve manually juggling multiple moving parts over many iterations, it is helpful to first set up a specialized environment to streamline development.

## Download localterra

In order to work with Terra Smart Contracts, you should have access to a Terra network that includes the WASM integration.

In this tutorial, we will be using [localterra](https://github.com/terra-project/localterra), a package that enables you to easily spin up a local, WASM-enabled private testnet with a single validator submitting oracle votes alongside a local version of FCD, Station and Finder all preconfigured . This reduces the friction of development by giving you complete control of a private Terra blockchain with the possibility to easily reset the world state.

To use **localterra**, you should first make sure Docker is installed on your computer by following the instructions [here](https://www.docker.com/get-started). You will also need to set up and configure [Docker Compose](https://docs.docker.com/compose/install/) on your machine.

```sh
git clone https://github.com/terra-project/localterra
cd localterra
docker-compose up
```

## Install Rust

While WASM smart contracts can theoretically be written in any programming language, we currently only recommend using Rust as it is the only language for which mature libraries and tooling exist for CosmWasm. For this tutorial, you'll need to also install the latest version of Rust by following the instructions [here](https://www.rust-lang.org/tools/install) and [here](https://forge.rust-lang.org/infra/other-installation-methods.html).

Once you'll installed Rust and its toolchain (cargo et al.), you'll need to add the `wasm32-unknown-unknown` compilation target.

```sh
rustup default stable
rustup target add wasm32-unknown-unknown
```

Then, install `cargo-generate`, which we will need for bootstrapping new CosmWasm smart contracts via a template.

```sh
cargo install cargo-generate --features vendored-openssl
```

## Install WABT (optional)

Although not required, we recommend having the WebAssembly Binary Toolkit (aka. WABT) installed on your system in case you want to learn more about the internals of the CosmWasm smart contracts. This will allow you to disassemble and further analyze the WASM output of your smart contracts. You can find details on how to install it [here](https://github.com/WebAssembly/wabt).
