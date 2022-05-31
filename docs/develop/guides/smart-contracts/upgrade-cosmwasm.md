# Upgrade Smart Contracts to Cosmwasm 1.0.0

Upgrading to Cosmwasm 1.0.0 requires upgrades to various dependencies in the smart contract. Within the `Cargo.toml` file, update the following dependencies to these versions:

### Under [dependencies]

- cosmwasm-std = "1.0.0"
- cosmwasm-storage = "1.0.0"
- cw-storage-plus = "0.13.2"
- cw0 = "0.10.3"
- cw2 = "0.13.2"
- cw-controllers = "0.13.2"
- schemars = "0.8.8"
- serde = { version = "1.0.137", default-features = false, features = ["derive"] }
- thiserror = "1.0.31"

### Under [dev-dependencies]

- cosmwasm-schema = "1.0.0"

Once all dependecies have been updated, run `cargo build`.

Finally, run `terrain test [contract-name]` to verify the upgrade didn't cause any breaking changes to the contract.
