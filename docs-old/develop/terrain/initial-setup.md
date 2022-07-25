# Terrain initial setup

This tutorial uses a Terra-specific development tool called Terrain.

Terrain will help you:

- Scaffold your dApp project.
- Develop and deploy smart contracts.
- Create custom tasks for blockchain and contract interaction.
- Access a console (or REPL) for interacting with the Terra blockchain.
- Create predefined functions used in tasks and in the console.

## Prerequisites

- [Install Docker](https://www.docker.com/)
- [Install `docker-compose`](https://github.com/docker/compose)
- [Install NPM](https://www.npmjs.com/)
- [Install Node JS v16](https://nodejs.org/download/release/latest-v16.x/)

## 1. Set up Rust

Rust is the main programming language used for CosmWasm smart contracts. While WASM smart contracts can theoretically be written in any programming language, CosmWasm libraries and tooling work best with Rust.

First, install the latest version of [Rust](https://www.rust-lang.org/tools/install).

Then run the following commands:

```sh
# 1. Set 'stable' as the default release channel:

rustup default stable

# 2. Add WASM as the compilation target:

rustup target add wasm32-unknown-unknown

# 3. Install the following package to run custom cargo scripts:

cargo install cargo-run-script
```

## 2. Install Terrain

Use npm to install the terrain command-line tool globally:

```sh
npm install -g @terra-money/terrain
```

:::{admonition} Check your Terrain version
:class: warning

Make sure you are using the latest version of Terrain. Previous versions may cause errors. 

```sh
terrain --version
```

If you installed Terrain from a previous, make sure to update it: 

```sh
npm uninstall -g @iboss/terrain
npm install -g @terra-money/terrain
```

:::


## Next steps: LocalTerra or Testnet

Depending on your setup, you can either install LocalTerra or use the Pisco testnet to power Terrain.

LocalTerra is a development environment designed to make it easy for smart contract developers to test their contracts locally. Terrain can also interact with the Terra blockchain's live testing environment using the Pisco testnet.

::: {caution}
Localterra may not work properly on machines with less than 16 GB of RAM. Please use the [Pisco testnet](using-terrain-testnet.md) if your device does not meet this requirement.
:::

:::::::{grid}
:gutter: 3

:::{grid-item-card}
:link: using-terrain-testnet.html
:class-card: sd-text-center sd-shadow-md sd-rounded-3

```{image} /img/icon_node.svg
:class: sd-width-auto sd-animate-grow50-rot20 sd-pb-2
```

**Terrain and the testnet**  
8+ GB of RAM
:::

:::{grid-item-card}
:link: using-terrain-localterra.html
:class-card: sd-text-center sd-shadow-md sd-rounded-3

```{image} /img/LocalTerra.svg
:class: sd-width-auto sd-animate-grow50-rot20 sd-pb-2
```

**Terrain and LocalTerra**  
16+ GB of RAM
:::

:::::::
