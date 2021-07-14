# Writing the Contract

::: tip
You can find the complete contract [here](https://github.com/terra-money/my-terra-token).
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
cargo generate --git https://github.com/CosmWasm/cosmwasm-template.git --branch 0.10 --name my-first-contract
cd my-first-contract
```

This helps get you started by providing the basic boilerplate and structure for a smart contract. You'll find in the `src/lib.rs` file that the standard CosmWasm entrypoints `init()`, `handle()`, and `query()` are properly exposed and hooked up.

## Contract State

The starting template has the basic following state:

- a singleton struct `State` containing:
  - a 32-bit integer `count`
  - a Terra address `owner`

```rust
// src/state.rs
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use cosmwasm_std::{CanonicalAddr, Storage};
use cosmwasm_storage::{singleton, singleton_read, ReadonlySingleton, Singleton};

pub static CONFIG_KEY: &[u8] = b"config";

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct State {
    pub count: i32,
    pub owner: CanonicalAddr,
}
```

Terra smart contracts have the ability to keep persistent state through Terra's native LevelDB, a bytes-based key-value store. As such, any data you wish to persist should be assigned a unique key at which the data can be indexed and later retrieved. The singleton in our example above is assigned the key `config` (in bytes).

Data can only be persisted as raw bytes, so any notion of structure or data type must be expressed as a pair of serializing and deserializing functions. For instance, objects must be stored as bytes, so you must supply both the function that encodes the object into bytes to save it on the blockchain, as well as the function that decodes the bytes back into data types that your contract logic can understand. The choice of byte representation is up to you, so long as it provides a clean, bi-directional mapping.

Fortunately, the CosmWasm team have provided utility crates such as [cosmwasm_storage](https://github.com/CosmWasm/cosmwasm/tree/master/packages/storage), which provides convenient high-level abstractions for data containers such as a "singleton" and "bucket", which automatically provide serialization and deserialization for commonly-used types such as structs and Rust numbers.

Notice how the `State` struct holds both `count` and `owner`. In addition, the `derive` attribute is applied to auto-implement some useful traits:

- `Serialize`: provides serialization
- `Deserialize`: provides deserialization
- `Clone`: makes our struct copyable
- `Debug`: enables our struct to be printed to string
- `PartialEq`: gives us equality comparison
- `JsonSchema`: auto-generates a JSON schema for us

`CanonicalAddr` refers to a Terra address's native decoded Bech32 form in bytes. Its counterpart is the `HumanAddr`, which represents a human-readable address prefixed with `terra...`.

When working with storage of account addresses for the contract, prefer to use the `CanonicalAddr`. When sending back data to the user, or expecting using input prefer the `HumanAddr` (and convert it to `CanonicalAddr` to work with it inside your contract).

```rust
// src/state.rs

pub fn config<S: Storage>(storage: &mut S) -> Singleton<S, State> {
    singleton(storage, CONFIG_KEY)
}

pub fn config_read<S: Storage>(storage: &S) -> ReadonlySingleton<S, State> {
    singleton_read(storage, CONFIG_KEY)
}
```

We define a simple `get` and `set` function for our `State` struct, using a singleton to store the data.

## InitMsg

The `InitMsg` is provided when a user creates a contract on the blockchain through a `MsgInstantiateContract`. This provides the contract with its configuration as well as its initial state.

On the Terra blockchain, the uploading of a contract's code and the instantiation of a contract are regarded as separate events, unlike on Ethereum. This is to allow a small set of vetted contract archetypes to exist as multiple instances sharing the same base code but configured with different parameters (imagine one canonical ERC20, and multiple tokens that use its code).

### Example

For our contract, we will expect a contract creator to supply the initial state in a JSON message:

```json
{
  "count": 100
}
```

### Message Definition

```rust
// src/msg.rs

use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct InitMsg {
    pub count: i32,
}

```

### Logic

Here we define our first entry-point, the `init()`, or where the contract is instantiated and passed its `InitMsg`. We extract the count from the message and set up our initial state, where:

- `count` is assigned the count from the message
- `owner` is assigned to the sender of the `MsgInstantiateContract`

```rust
// src/contract.rs
use cosmwasm_std::{
    to_binary, Api, Binary, Env, Extern, HandleResponse, InitResponse, Querier, StdError,
    StdResult, Storage,
};

use crate::msg::{CountResponse, HandleMsg, InitMsg, QueryMsg};
use crate::state::{config, config_read, State};

pub fn init<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    msg: InitMsg,
) -> StdResult<InitResponse> {
    let state = State {
        count: msg.count,
        owner: deps.api.canonical_address(&env.message.sender)?,
    };

    config(&mut deps.storage).save(&state)?;

    Ok(InitResponse::default())
}
```

## HandleMsg

The `HandleMsg` is a JSON message passed to the `handle()` function through a `MsgExecuteContract`. Unlike the `InitMsg`, the `HandleMsg` can exist as several different types of messages, to account for the different types of functions that a smart contract can expose to a user. The `handle()` function demultiplexes these different types of messages to its appropriate message handler logic.

### Example

#### Increment

Any user can increment the current count by 1.

```json
{
  "increment": {}
}
```

#### Reset

Only the owner can reset the count to a specific number.

```json
{
  "reset": {
    "count": 5
  }
}
```

### Message Definition

As for our `HandleMsg`, we will use an `enum` to multiplex over the different types of messages that our contract can understand. The `serde` attribute rewrites our attribute keys in snake case and lower case, so we'll have `increment` and `reset` instead of `Increment` and `Reset` when serializing and deserializing across JSON.

```rust
// src/msg.rs

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum HandleMsg {
    Increment {},
    Reset { count: i32 },
}
```

### Logic

```rust
// src/contract.rs

pub fn handle<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    msg: HandleMsg,
) -> StdResult<HandleResponse> {
    match msg {
        HandleMsg::Increment {} => try_increment(deps, env),
        HandleMsg::Reset { count } => try_reset(deps, env, count),
    }
}
```

This is our `handle()` method, which uses Rust's pattern matching to route the received `HandleMsg` to the appropriate handling logic, either dispatching a `try_increment()` or a `try_reset()` call depending on the message received.

```rust
pub fn try_increment<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    _env: Env,
) -> StdResult<HandleResponse> {
    config(&mut deps.storage).update(|mut state| {
        state.count += 1;
        Ok(state)
    })?;

    Ok(HandleResponse::default())
}
```

It is quite straightforward to follow the logic of `try_increment()`. We acquire a mutable reference to the storage to update the singleton located at key `b"config"`, made accessible through the `config` convenience function defined in the `src/state.rs`. We then update the present state's count by returning an `Ok` result with the new state. Finally, we terminate the contract's execution with an acknowledgement of success by returning an `Ok` result with the default `HandleResponse`.

In this example, the default `HandleResponse` for simplicity. However, the `HandleResponse` can be manually created to provide the following information:

- `messages`: a list of messages to emit like `MsgSend`, `MsgSwap`, etc. This is where smart contracts can influence other modules on the Terra blockchain.
- `log`: a list of key-value pairs to define emitted SDK events that can be subscribed to by clients and parsed by block explorers and applications to report important events or state changes that occured during the execution.
- `data`: additional data that the contract can record

```rust
// src/contract.rs

pub fn try_reset<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    count: i32,
) -> StdResult<HandleResponse> {
    let api = &deps.api;
    config(&mut deps.storage).update(|mut state| {
        if api.canonical_address(&env.message.sender)? != state.owner {
            return Err(StdError::unauthorized());
        }
        state.count = count;
        Ok(state)
    })?;
    Ok(HandleResponse::default())
}
```

The logic for reset is very similar to increment -- except this time, we first check that the message sender is permitted to invoke the reset function.

## QueryMsg

### Example

The template contract only supports one type of `QueryMsg`:

#### Balance

The request:

```json
{
  "get_count": {}
}
```

Which should return:

```json
{
  "count": 5
}
```

### Message Definition

To support queries against our contract for data, we'll have to define both a `QueryMsg` format (which represents requests), as well as provide the structure of the query's output -- `CountResponse` in this case. We must do this because `query()` will send back information to the user through JSON in a structure and we must make the shape of our response known.

Add the following to your `src/msg.rs`:

```rust
// src/msg.rs
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    // GetCount returns the current count as a json-encoded number
    GetCount {},
}

// We define a custom struct for each query response
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct CountResponse {
    pub count: i32,
}
```

### Logic

The logic for `query()` should be similar to that of `handle()`, except that, since `query()` is called without the end-user making a transaction, we omit the `env` argument as there is no information.

```rust
// src/contract.rs

pub fn query<S: Storage, A: Api, Q: Querier>(
    deps: &Extern<S, A, Q>,
    msg: QueryMsg,
) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetCount {} => to_binary(&query_count(deps)?),
    }
}

fn query_count<S: Storage, A: Api, Q: Querier>(deps: &Extern<S, A, Q>) -> StdResult<CountResponse> {
    let state = config_read(&deps.storage).load()?;
    Ok(CountResponse { count: state.count })
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
  cosmwasm/rust-optimizer:0.10.3
```

This will result in an optimized build of `artifacts/my_first_contract.wasm` in your working directory.

(Optional) Add the above command in `Cargo.toml` for quick access.

This allows the run custom script commands in a similar way as `package.json` in the Node ecosystem.

Install `cargo-run-script`

```sh
cargo install cargo-run-script
```

Add the script in `Cargo.toml`

```toml
[package.metadata.scripts]
optimize = """docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/rust-optimizer:0.10.3
"""
```

Run the command:

```sh
cargo run-script optimize
```

## Schemas

In order to make use of JSON-schema auto-generation, we should register each of the data structures that we need schemas for.

```rust
// examples/schema.rs

use std::env::current_dir;
use std::fs::create_dir_all;

use cosmwasm_schema::{export_schema, remove_schemas, schema_for};

use my_first_contract::msg::{CountResponse, HandleMsg, InitMsg, QueryMsg};
use my_first_contract::state::State;

fn main() {
    let mut out_dir = current_dir().unwrap();
    out_dir.push("schema");
    create_dir_all(&out_dir).unwrap();
    remove_schemas(&out_dir).unwrap();

    export_schema(&schema_for!(InitMsg), &out_dir);
    export_schema(&schema_for!(HandleMsg), &out_dir);
    export_schema(&schema_for!(QueryMsg), &out_dir);
    export_schema(&schema_for!(State), &out_dir);
    export_schema(&schema_for!(CountResponse), &out_dir);
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
      "required": ["get_count"],
      "properties": {
        "get_count": {
          "type": "object"
        }
      }
    }
  ]
}
```

You can use an online tool such as [JSON Schema Validator](https://www.jsonschemavalidator.net/) to test your input against the generated JSON schema.
