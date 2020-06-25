# Uploading the Contract

## Build the contract

Make sure that your contract builds and fix any errors:

```sh
cargo wasm
```

### Optimizing the build

::: warning NOTE
You will need [Docker](https://www.docker.com) installed to run this command.
:::

You will need to make sure the output WASM binary is as small as possible in order to minimize fees and stay under the size limit for the blockchain. Run the following command in the root directory of your Rust smart contract's project folder.

```sh
docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/rust-optimizer:0.8.0
```

This will result in an optimized `contract.wasm` being produced in your working directory.

### Export the schemas

```sh
cargo schema
```

This will generate the schemas defined in your `examples/schemas.rs` file, and generate all the JSON schemas that correspond to the expected input and output formats for your smart contract.

## Uploading

Make sure that your **localterra** is up and running.

```sh
cd $LOCALTERRA
docker-compose up
```

## Interacting

```

```
