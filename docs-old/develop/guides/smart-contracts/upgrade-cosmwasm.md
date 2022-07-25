# Upgrade Smart Contracts to Cosmwasm 1.0.0

CosmWasm 1.0 allows Terra to adopt IBC-Wasm integration, enabling contract execution between IBC-enabled chains.<br/>

This upgrade also supports the ICS-20 protocol, which allows fungible tokens to be moved across other IBC-enabled Cosmos chains. Users will be able to send custom CW20 tokens using ICS20 and use them as native tokens on other chains.<br/>

### How To Upgrade Your Smart Contract

Upgrading to Cosmwasm 1.0.0 requires upgrades to various dependencies in the smart contract.

1\. Open your smart contract's `Cargo.toml` file, and update the following dependencies to these versions:

**Under [dependencies]**:

- cosmwasm-std = "1.0.0"
- cosmwasm-storage = "1.0.0"
- cw-storage-plus = "0.13.2"
- cw0 = "0.10.3"
- cw2 = "0.13.2"
- cw-controllers = "0.13.2"
- schemars = "0.8.8"
- serde = { version = "1.0.137", default-features = false, features = ["derive"] }
- thiserror = "1.0.31"


:::{admonition} Deprecated and outdated dependencies
:class: danger

The [Terra-Cosmwasm package](https://github.com/terra-money/terra-cosmwasm/tree/main/packages/terra-cosmwasm) is no longer supported. This package was for queries to the oracle, market, and treasury modules, which do not exist on Terra 2.0.

The following dependencies may be upgraded in the future, but are currently not functional with Cosmwasm 1.0.0:
- [cw-asset](https://github.com/mars-protocol/cw-asset)
- [astroport-package](https://github.com/astroport-fi/astroport-core/tree/main/packages/astroport)

You may want to rebuild your application without these dependencies to function in the meantime. 
:::

**Under [dev-dependencies]**:

- cosmwasm-schema = "1.0.0"

2\. Once all dependecies have been updated, run the following:

```sh
cargo build
```

3\. Finally, run the following to verify the upgrade didn't cause any breaking changes to the contract:

```sh
`terrain test [insert-contract-name]`
```
