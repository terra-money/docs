# Writing the Contract

::: tip
You can find the complete contract [here](https://github.com/terra-project/my-terra-token).
:::

A smart contract can be considered an instance of a singleton object whose internal state is persisted on the blockchain. Users can trigger state changes through sending it JSON messages, and users can also query its state through sending a request formatted as a JSON message. These messages are different than Terra blockchain messages such as `MsgSend` and `MsgSwap`.

As a smart contract writer, your job is to define 3 functions that define your smart contract's interface:

- `init()`: a constructor which is called during contract instantiation to provide initial state
- `handle()`: gets called when a user wants to invoke a method on the smart contract
- `query()`: gets called when a user wants to get data out of a smart contract

In this section, we'll define our expected messages alongside their implementation.

## Start with a template

In your working directory, you'll want to use `cargo-generate` to start your smart contract with the recommended folder structure and build options:

```sh
cargo generate --git https://github.com/CosmWasm/cosmwasm-template.git --name my-terra-token
cd my-terra-token
```

This helps get you started by prepopulating the requisite boilerplate for a smart contract. You'll find in the `src/lib.rs` file that the standard CosmWasm entrypoints `init()`, `handle()`, and `query()` are properly exposed and hooked up.

### or just follow along

The following is the complete example of the contract, if you want to read a full implementation.

```sh
git clone https://github.com/terra-project/my-terra-token
cd my-terra-token
```

## Contract State

For our example smart contract, we will need:

- `Config`: a `struct` holding our contract configuration:
  - `String` token name
  - `String` token symbol
  - `CanonicalAddr` contract owner (creator)
- `balances`: a mapping from `CanonicalAddr` account addresses to `Uint128` balance

Terra smart contracts have the ability to keep persistent state across different executions through a bytes-based key-value store.
Working at such a low level, you will need to be aware of how the data structures you need are stored as bytes -- including things you might take for granted in other environments, such as numbers. In order to save the data above, we need to find a way that they can be encoded (serialized) into raw bytes, and how those bytes can be converted back into data types that your contract logic can understand.

Fortunately, the CosmWasm team has provided has created the [cosmwasm_storage](https://github.com/CosmWasm/cosmwasm/tree/master/packages/storage) crate, which provides several higher-level abstractions that enable us to work with a "singleton" and "bucket", which provide us automatic serialization and deserialization.

We'll use the singleton to store our `Config` struct, as it will be a simple data structure that exists at a single key. For our `balances`, we can use a bucket, which is a key-value store interface to implement a map. The bucket will store entries of type `Uint128`, a data type with serialization and deserialization that wraps a native Rust `u128`.

Clear our `src/state.rs` and make the following changes:

```rust
// src/state.rs

use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use cosmwasm_std::{CanonicalAddr, StdResult, Storage, Uint128};
use cosmwasm_storage::{Bucket, ReadonlyBucket, ReadonlySingleton, Singleton};

pub static CONFIG_KEY: &[u8] = b"config";
pub static BALANCE_KEY: &[u8] = b"balance";
```

We first define the keys for our `Config` and `balance` data requirements. `balance` will be used as a prefix key to implement a mapping, using `address` as a subkey.

```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Config {
    pub name: String,
    pub symbol: String,
    pub owner: CanonicalAddr,
}
```

Next, we define our `Config` struct, which will hold `name`, `symbol`, and `owner`. We use the `derive` attribute to auto-implement some useful traits:

- `Serialize`: provides serialization
- `Deserialize`: provides deserialization
- `Clone`: makes our struct copyable
- `Debug`: enables our struct to be printed to string
- `PartialEq`: gives us eqality comparison
- `JsonSchema`: auto-generates a JSON schema for us

Something to note here is that `CanonicalAddr` refers to a Terra address's native decoded Bech32 form in bytes. Its counterpart is the `HumanAddr`, which represents a human-readable address prefixed with `terra...`.

When working with storage of account addresses for the contract, prefer to use the `CanonicalAddr`. When sending back data to the user, or expecting using input prefer the `HumanAddr` (and convert it to `CanonicalAddr` to work with it inside your contract).

```rust
pub fn config_get<S: Storage>(storage: &S) -> StdResult<Config> {
    ReadonlySingleton::new(storage, CONFIG_KEY).load()
}

pub fn config_set<S: Storage>(storage: &mut S, config: &Config) -> StdResult<()> {
    Singleton::new(storage, CONFIG_KEY).save(config)
}
```

We define a simple `get` and `set` function for our `Config` struct, using a singleton to store the data.

```rust
pub fn balance_get<S: Storage>(storage: &S, address: &CanonicalAddr) -> Uint128 {
    match ReadonlyBucket::new(BALANCE_KEY, storage).may_load(address.as_slice()) {
        Ok(Some(amount)) => amount,
        _ => Uint128::zero(),
    }
}

pub fn balance_set<S: Storage>(
    storage: &mut S,
    address: &CanonicalAddr,
    amount: &Uint128,
) -> StdResult<()> {
    Bucket::new(BALANCE_KEY, storage).save(address.as_slice(), amount)
}
```

We define a simple `get` and `set` function for our `balance` mapping. Notice that for our `get`, if we encounter an error such as the address does not exist, we report back a `Uint128::zero()`. This sets all the default balances for addresses not yet assigned to be zero.

## InitMsg

The `InitMsg` is provided when a user creates a contract on the blockchain through a `MsgInstantiateContract`. This provides the contract with its configuration as well as its initial state.

On the Terra blockchain, the uploading of a contract's code and the instantiation of a contract is regarded as separate events, unlike with Ethereum. This is to allow a small set of vetted contract archetypes to exist with multiple instances, each sharing the same base code but configured with different parameters (imagine one canonical ERC20, and multiple tokens that use its code).

### Example

For our contract, we will expect a contract creator to supply the relevant information in a JSON message such as the following:

```json
{
  "name": "MyTerraToken",
  "symbol": "MTT",
  "initial_balances": [
    {
      "address": "terra...",
      "amount": "10000"
    },
    {
      "address": "terra...",
      "amount": "5000"
    }
  ]
}
```

### Message Definition

Open up `src/msg.rs`, and clear and fill in the following:

::: warning NOTE
Note that we have to use `Uint128` instead of `u128`, which is a wrapped representation of an unsigned 128-bit integer provided to us by the CosmWasm API. This serializes and deserializes with strings behind the scenes.
:::

```rust
// src/msg.rs

use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use cosmwasm_std::{HumanAddr, Uint128};

#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema)]
pub struct InitialBalance {
    pub address: HumanAddr,
    pub amount: Uint128,
}

#[derive(Serialize, Deserialize, JsonSchema)]
pub struct InitMsg {
    pub name: String,
    pub symbol: String,
    pub initial_balances: Vec<InitialBalance>,
}
```

### Logic

Here we define our first entry-point, the `init()`, or where the contract is instantiated and passed its `InitMsg`. We need to set up all the initial state:

1. the constants that define the contract's configuration (name, symbol)
2. the initial balances of all the accounts

Open up `src/contract.rs`, clear the file, and add the following:

```rust
// src/contract.rs

use cosmwasm_std::{
    generic_err, log, to_binary, Api, Binary, Env, Extern, HandleResponse, HumanAddr, InitResponse,
    Querier, StdResult, Storage, Uint128,
};

use crate::msg::{BalanceResponse, ConfigResponse, HandleMsg, InitMsg, QueryMsg};
use crate::state::{balance_get, balance_set, config_get, config_set, Config};

pub fn init<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    msg: InitMsg,
) -> StdResult<InitResponse> {
    // Initial balances
    for row in msg.initial_balances {
        let address = deps.api.canonical_address(&row.address)?;
        balance_set(&mut deps.storage, &address, &row.amount)?;
    }
    config_set(
        &mut deps.storage,
        &Config {
            name: msg.name,
            symbol: msg.symbol,
            owner: deps.api.canonical_address(&env.message.sender)?,
        },
    )?;

    Ok(InitResponse::default())
}
```

## HandleMsg

The `HandleMsg` is a JSON message passed to the `handle()` function through a `MsgExecuteContract`. Unlike the `InitMsg`, the `HandleMsg` can exist as several different types of messages, to account for the different types of functions that a smart contract can expose to a user. The `handle()` function demultiplexes these different types of messages to its appropriate message handler logic.

### Example

For our simple token example, we want to support the following functions:

#### Transfer

A user can _transfer_ tokens to another account, from its own balance.

```json
{
  "transfer": {
    "recipient": "terra...",
    "amount": "1000"
  }
}
```

#### Burn

A user can _burn_ their tokens, permanently removing them from the supply.

```json
{
  "burn": {
    "amount": "1000"
  }
}
```

### Message Definition

As for our `HandleMsg`, we will use an `enum` to multiplex over the different types of messages that our contract can understand. The `serde` attribute rewrites our attribute keys in snake case and lower case, so we'll have `transfer` and `burn` instead of `Transfer` and `Burn` when serializing and deserializing across JSON.

Add the following to `src/msg.rs`:

```rust
// src/msg.rs

#[derive(Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum HandleMsg {
  Transfer {
    recipient: HumanAddr,
    amount: Uint128,
  },
  Burn {
    amount: Uint128,
  },
}
```

### Logic

Add the following to `src/contract.rs`:

```rust
// src/contract.rs

pub fn handle<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    msg: HandleMsg,
) -> StdResult<HandleResponse> {
    match msg {
        HandleMsg::Transfer { recipient, amount } => try_transfer(deps, env, &recipient, &amount),
        HandleMsg::Burn { amount } => try_burn(deps, env, &amount),
    }
}
```

This is our `handle()` method, which matches our message against different types of `HandleMsg`. This then dispatches either a `try_transfer()` or a `try_burn()` call, depending on the message received.

```rust
fn try_transfer<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    recipient: &HumanAddr,
    amount: &Uint128,
) -> StdResult<HandleResponse> {
    // canonical address
    let sender_address = &deps.api.canonical_address(&env.message.sender)?;
    let recipient_address = &deps.api.canonical_address(recipient)?;

    // check that sender's funds covers
    let mut sender_balance = balance_get(&deps.storage, sender_address);
    if sender_balance < *amount {
        return Err(generic_err(format!(
            "Insufficient funds to send: balance={}, required={}",
            sender_balance, amount
        )));
    }
    // update balances
    sender_balance = (sender_balance - *amount)?;
    let mut recipient_balance = balance_get(&deps.storage, recipient_address);
    recipient_balance = recipient_balance + *amount;

    balance_set(&mut deps.storage, sender_address, &sender_balance)?;
    balance_set(&mut deps.storage, recipient_address, &recipient_balance)?;

    // report what happened in the log
    let res = HandleResponse {
        messages: vec![],
        log: vec![
            log("action", "send"),
            log("sender", deps.api.human_address(sender_address)?),
            log("recipient", recipient),
            log("amount", amount),
        ],
        data: None,
    };

    Ok(res)
}
```

It is quite straightforward to follow the logic of `try_transfer()`. In the first part, we need to ensure that the sender's token balance is not smaller than the amount that they wish to send. After, we need to calculate the new balances of the sender and the recipient, apply them with `balance_set()`. Finally, we need to create a `HandleResponse` which will tell the blockchain how to wrap up our contract execution:

- `messages`: a list of messages to emit like `MsgSend`, `MsgSwap`, etc. This is where smart contracts can influence other modules on the Terra blockchain.
- `log`: a list of key-value pairs to define emitted SDK events that can be subscribed to by clients and parsed by block explorers and applications to report important events or state changes that occured during the execution.
- `data`: additional data that the contract can record

```rust
// src/contract.rs

fn try_burn<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    amount: &Uint128,
) -> StdResult<HandleResponse> {
    // canonical address
    let sender_address = &deps.api.canonical_address(&env.message.sender)?;

    let mut sender_balance = balance_get(&deps.storage, sender_address);
    if sender_balance < *amount {
        return Err(generic_err(format!(
            "Insufficient funds to burn: balance={}, required={}",
            sender_balance, amount
        )));
    }
    // update balance
    sender_balance = (sender_balance - *amount)?;
    balance_set(&mut deps.storage, sender_address, &sender_balance)?;

    let res = HandleResponse {
        messages: vec![],
        log: vec![
            log("action", "burn"),
            log("sender", deps.api.human_address(sender_address)?),
            log("amount", amount),
        ],
        data: None,
    };

    Ok(res)
}
```

The logic for burning is very similar to sending; instead of sending to a recipient and crediting that recipient with the corresponding amount, the sender simply loses the coins.

## QueryMsg

### Example

Our contract will just support 2 types of query messages:

#### Balance

The request:

```json
{
  "balance": {
    "address": "terra..."
  }
}
```

Which should return:

```json
{
  "balance": "1000"
}
```

#### Config

The request:

```json
{
  "config": {}
}
```

Which should return:

```json
{
  "name": "<coin-name>",
  "symbol": "<coin-symbol>",
  "owner": "terra..."
}
```

### Message Definition

To support queries against our contract for data, we'll have to define both a `QueryMsg` format (which represents requests), as well as provide the structure of the query's output -- `BalanceResponse` and `ConfigResponse` in this case. We must do this because `query()` will send back information to the user through JSON in a structure and we must make the shape of our response known.

Add the following to your `src/msg.rs`:

```rust
// src/msg.rs

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    Balance { address: HumanAddr },
    Config {},
}

#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema)]
pub struct BalanceResponse {
    pub balance: Uint128,
}

#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema)]
pub struct ConfigResponse {
    pub name: String,
    pub symbol: String,
    pub owner: HumanAddr,
}
```

### Logic

The logic for `query()` should be similar to that of `handle()`, except that, since `query()` is called without the end-user making a transaction, there is no information, we omit the `env` argument.

Add the following to your `src/contract.rs`:

```rust
// src/contract.rs

pub fn query<S: Storage, A: Api, Q: Querier>(
    deps: &Extern<S, A, Q>,
    msg: QueryMsg,
) -> StdResult<Binary> {
    match msg {
        QueryMsg::Balance { address } => {
            let address = deps.api.canonical_address(&address)?;
            let balance = balance_get(&deps.storage, &address);
            let out = to_binary(&BalanceResponse { balance })?;
            Ok(out)
        }
        QueryMsg::Config {} => {
            let config = config_get(&deps.storage)?;
            let out = to_binary(&ConfigResponse {
                name: config.name,
                symbol: config.symbol,
                owner: deps.api.human_address(&config.owner)?,
            })?;
            Ok(out)
        }
    }
}
```

## Building the Contract

To build your contract, run the following command. This will check for any preliminary errors before optimizing.

```sh
cargo wasm
```

### Optimizing your build

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

## Schemas

In order to make use of JSON-schema auto-generation, we should register each of the data structures that we need schemas for. Open up `examples/schema.rs` and insert the following:

```rust
use std::env::current_dir;
use std::fs::create_dir_all;

use cosmwasm_schema::{export_schema, remove_schemas, schema_for};

use my_terra_token::msg::{BalanceResponse, ConfigResponse, HandleMsg, InitMsg, QueryMsg};
use my_terra_token::state::Config;

fn main() {
    let mut out_dir = current_dir().unwrap();
    out_dir.push("schema");
    create_dir_all(&out_dir).unwrap();
    remove_schemas(&out_dir).unwrap();

    export_schema(&schema_for!(InitMsg), &out_dir);
    export_schema(&schema_for!(HandleMsg), &out_dir);
    export_schema(&schema_for!(QueryMsg), &out_dir);
    export_schema(&schema_for!(Config), &out_dir);
    export_schema(&schema_for!(BalanceResponse), &out_dir);
    export_schema(&schema_for!(ConfigResponse), &out_dir);
}
```

You can then build the schemas with:

```sh
cargo schema
```

Your newly generated schemas should be visible in your `schema/` directory. The following is an example of `schema/query_msg.json`.

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "QueryMsg",
  "anyOf": [
    {
      "type": "object",
      "required": ["balance"],
      "properties": {
        "balance": {
          "type": "object",
          "required": ["address"],
          "properties": {
            "address": {
              "$ref": "#/definitions/HumanAddr"
            }
          }
        }
      }
    },
    {
      "type": "object",
      "required": ["config"],
      "properties": {
        "config": {
          "type": "object"
        }
      }
    }
  ],
  "definitions": {
    "HumanAddr": {
      "type": "string"
    }
  }
}
```

You can use an online tool such as [JSON Schema Validator](https://www.jsonschemavalidator.net/) to test your input against the generated JSON schema.
