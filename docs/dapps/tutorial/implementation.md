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

## Contract State

Now that we've defined our interface, we need to specify the state requirements of our contract.

For our example smart contract, we will need:

- a `struct` holding our contract config:
  - `String` token name
  - `String` token symbol
  - `CanonicalAddr` contract owner (creator)
- mapping from `address` account to `Uint128` balance

Terra smart contracts have access to the same low-level storage facilities as Terra Core. Any state we would like to persist must be translated into operations that a key-value store working with byte-based keys and byte-based values is able to perform. As such, you will need to be aware of how the data structures you need are stored as bytes -- including things you might take for granted in other environments, such as numbers.

Fortunately, however, the CosmWasm team has created the [cosmwasm_storage](https://github.com/CosmWasm/cosmwasm/tree/master/packages/storage) crate, which provides several higher-level abstractions that enable us to work with a "bucket" of `Uint128` directly without worrying about serializing / deserializing when `get()`-ing and `set()`-ing from the store.

```rust
// src/state.rs

use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use cosmwasm_std::{CanonicalAddr, StdResult, Storage, Uint128};
use cosmwasm_storage::{Bucket, ReadonlyBucket, ReadonlySingleton, Singleton};

pub static CONFIG_KEY: &[u8] = b"config";
pub static BALANCE_KEY: &[u8] = b"balance";

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Config {
    pub name: String,
    pub symbol: String,
    pub owner: CanonicalAddr,
}

pub fn config<S: Storage>(storage: &mut S) -> Singleton<S, Config> {
    Singleton::new(storage, CONFIG_KEY)
}

pub fn config_read<S: Storage>(storage: &S) -> ReadonlySingleton<S, Config> {
    ReadonlySingleton::new(storage, CONFIG_KEY)
}

pub fn balance_set<S: Storage>(
    storage: &mut S,
    address: &CanonicalAddr,
    amount: &Uint128,
) -> StdResult<()> {
    Bucket::new(BALANCE_KEY, storage).save(address.as_slice(), amount)
}

pub fn balance_of<S: Storage>(storage: &S, address: &CanonicalAddr) -> Uint128 {
    match ReadonlyBucket::new(BALANCE_KEY, storage).may_load(address.as_slice()) {
        Ok(Some(amount)) => amount,
        _ => Uint128::zero(),
    }
}
```

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

Here's our `InitMsg` -- as you can see, it maps quite naturally to the JSON representation we had used in the spec. Since the there is only one `InitMsg` type, we're using a `struct`. We represent the list of initial balances using a vector of `InitialBalance`- another `struct`, to represent the array of objects in `initial_balances`.

::: warning NOTE
Note that we have to use `Uint128` instead of `u128`, which is a wrapped representation of an unsigned 128-bit integer provided to us by the CosmWasm API. This serializes and deserializes with strings behind the scenes.
:::

::: warning NOTE
`HumanAddr` here refers to the "human-readable" `terra-` account address.
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

```rust
// src/contract.rs

use cosmwasm_std::{
    generic_err, log, to_binary, Api, Binary, Env, Extern, HandleResponse, HumanAddr, InitResponse,
    Querier, StdResult, Storage, Uint128,
};

use crate::msg::{BalanceResponse, ConfigResponse, HandleMsg, InitMsg, QueryMsg};
use crate::state::{balance_of, balance_set, config, config_read, Config};

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
    config(&mut deps.storage).save(&Config {
        name: msg.name,
        symbol: msg.symbol,
        owner: env.message.sender,
    })?;

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

```rust
// src/contract.rs

fn try_transfer<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    recipient: &HumanAddr,
    amount: &Uint128,
) -> StdResult<HandleResponse> {
    // canonical address
    let sender_address = &env.message.sender;
    let recipient_address = &deps.api.canonical_address(recipient)?;

    // check that sender's funds covers
    let mut sender_balance = balance_of(&deps.storage, sender_address);
    if sender_balance < *amount {
        return Err(generic_err(format!(
            "Insufficient funds to send: balance={}, required={}",
            sender_balance, amount
        )));
    }
    // update balances
    sender_balance = (sender_balance - *amount)?;
    let mut recipient_balance = balance_of(&deps.storage, recipient_address);
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

```rust
// src/contract.rs

fn try_burn<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    amount: &Uint128,
) -> StdResult<HandleResponse> {
    // canonical address
    let sender_address = &env.message.sender;

    let mut sender_balance = balance_of(&deps.storage, sender_address);
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

```rust
// src/contract.rs

pub fn query<S: Storage, A: Api, Q: Querier>(
    deps: &Extern<S, A, Q>,
    msg: QueryMsg,
) -> StdResult<Binary> {
    match msg {
        QueryMsg::Balance { address } => {
            let address = deps.api.canonical_address(&address)?;
            let balance = balance_of(&deps.storage, &address);
            let out = to_binary(&BalanceResponse { balance })?;
            Ok(out)
        }
        QueryMsg::Config {} => {
            let config = config_read(&deps.storage).load()?;
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
