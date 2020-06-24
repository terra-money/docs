# Writing the Contract

A smart contract can be considered an instance of a singleton object whose internal state is persisted on the blockchain. Users can trigger state changes through sending it JSON messages, and users can also query its state through sending a request formatted as a JSON message. These messages are different than Terra blockchain messages such as `MsgSend` and `MsgSwap`.

::: warning NOTE
Going forward, it is important to be aware of the distinction between native messages intended for inclusion within transactions, and messages that invoke smart contract functions.
:::

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

Now that we've defined our interface, we need to specify the state requirements of our contract. Terra smart contracts have access to the same state storage facilities (by default, a key-value store with bytes keys and bytes values) as the rest of the blockchain.

For our example smart contract, we will need:

- a `struct` holding our contract config:
  - `String` token name
  - `String` token symbol
- mapping from `address` account to `Uint128` balance

Since we are using a simple key-value store system to store our state, we'll have to implement the mappings using prefix-keys. To illustrate this, we will use a similar scheme to one where `abc["def"] = 5` would be implemented as `store("abc-def", 5)`, and `abc["eggzz"] = 5` will be: `store("abc-eggzz", 5)`.

```rust
// src/state.rs

use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use cosmwasm_std::{CanonicalAddr, Storage};
use cosmwasm_storage::{
    singleton, singleton_read, PrefixedStorage, ReadonlyPrefixedStorage, ReadonlySingleton,
    Singleton,
};

pub static CONFIG_KEY: &[u8] = b"config";
pub static BALANCE_KEY: &[u8] = b"balance";

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct State {
    pub name: String,
    pub ticker: String,
    pub owner: CanonicalAddr,
}

pub fn config<S: Storage>(storage: &mut S) -> Singleton<S, State> {
    singleton(storage, CONFIG_KEY)
}

pub fn config_read<S: Storage>(storage: &S) -> ReadonlySingleton<S, State> {
    singleton_read(storage, CONFIG_KEY)
}

pub fn balance<S: Storage>(storage: &mut S) -> PrefixedStorage<S> {
    PrefixedStorage::new(BALANCE_KEY, storage)
}

pub fn balance_read<S: Storage>(storage: &S) -> ReadonlyPrefixedStorage<S> {
    ReadonlyPrefixedStorage::new(BALANCE_KEY, storage)
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

pub fn init<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    _env: Env,
    msg: InitMsg,
) -> StdResult<InitResponse> {
    let mut total_supply: u128 = 0;
    {
        // Initial balances
        let mut balances_store = PrefixedStorage::new(PREFIX_BALANCES, &mut deps.storage);
        for row in msg.initial_balances {
            let raw_address = deps.api.canonical_address(&row.address)?;
            let amount_raw = row.amount.u128();
            balances_store.set(raw_address.as_slice(), &amount_raw.to_be_bytes())?;
            total_supply += amount_raw;
        }
    }

    let mut config_store = PrefixedStorage::new(PREFIX_CONFIG, &mut deps.storage);
    let constants = to_vec(&Constants {
        name: msg.name,
        symbol: msg.symbol,
        decimals: msg.decimals,
    })?;
    config_store.set(KEY_CONSTANTS, &constants)?;
    config_store.set(KEY_TOTAL_SUPPLY, &total_supply.to_be_bytes())?;

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
fn try_transfer<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    recipient: &HumanAddr,
    amount: &Uint128,
) -> StdResult<HandleResponse> {
    let sender_address_raw = &env.message.sender;
    let recipient_address_raw = deps.api.canonical_address(recipient)?;
    let amount_raw = amount.u128();

    perform_transfer(
        &mut deps.storage,
        &sender_address_raw,
        &recipient_address_raw,
        amount_raw,
    )?;

    let res = HandleResponse {
        messages: vec![],
        log: vec![
            log("action", "transfer"),
            log(
                "sender",
                deps.api.human_address(&env.message.sender)?.as_str(),
            ),
            log("recipient", recipient.as_str()),
        ],
        data: None,
    };
    Ok(res)
}

fn perform_transfer<T: Storage>(
    store: &mut T,
    from: &CanonicalAddr,
    to: &CanonicalAddr,
    amount: u128,
) -> StdResult<()> {
    let mut balances_store = PrefixedStorage::new(PREFIX_BALANCES, store);

    let mut from_balance = read_u128(&balances_store, from.as_slice())?;
    if from_balance < amount {
        return Err(generic_err(format!(
            "Insufficient funds: balance={}, required={}",
            from_balance, amount
        )));
    }
    from_balance -= amount;
    balances_store.set(from.as_slice(), &from_balance.to_be_bytes())?;

    let mut to_balance = read_u128(&balances_store, to.as_slice())?;
    to_balance += amount;
    balances_store.set(to.as_slice(), &to_balance.to_be_bytes())?;

    Ok(())
}
```

```rust
// Converts 16 bytes value into u128
// Errors if data found that is not 16 bytes
pub fn bytes_to_u128(data: &[u8]) -> StdResult<u128> {
    match data[0..16].try_into() {
        Ok(bytes) => Ok(u128::from_be_bytes(bytes)),
        Err(_) => Err(generic_err("Corrupted data found. 16 byte expected.")),
    }
}

// Reads 16 byte storage value into u128
// Returns zero if key does not exist. Errors if data found that is not 16 bytes
pub fn read_u128<S: ReadonlyStorage>(store: &S, key: &[u8]) -> StdResult<u128> {
    let result = store.get(key)?;
    match result {
        Some(data) => bytes_to_u128(&data),
        None => Ok(0u128),
    }
}

fn read_balance<S: Storage>(store: &S, owner: &CanonicalAddr) -> StdResult<u128> {
    let balance_store = ReadonlyPrefixedStorage::new(PREFIX_BALANCES, store);
    read_u128(&balance_store, owner.as_slice())
}
```

## QueryMsg

### Example

Our contract will just support 1 type of query message:

#### Balance

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

### Message Definition

To support queries against our contract for data, we'll have to define both a `QueryMsg` format (which represents requests), as well as provide the structure of the query's output -- `BalanceResponse` in this case. We must do this because `query()` will send back information to the user through JSON in a structure and we must make the shape of our response known.

```rust
// src/msg.rs

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
  Balance {
    address: HumanAddr,
  },
}

#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema)]
pub struct BalanceResponse {
    pub balance: Uint128,
}
```

### Logic

After we've defined our messages, we can move on to the main contract logic.

```rust
// src/contract.rs

pub fn query<S: Storage, A: Api, Q: Querier>(
    deps: &Extern<S, A, Q>,
    msg: QueryMsg,
) -> StdResult<Binary> {
    match msg {
        QueryMsg::Balance { address } => {
            let address_key = deps.api.canonical_address(&address)?;
            let balance = read_balance(&deps.storage, &address_key)?;
            let out = to_binary(&BalanceResponse {
                balance: Uint128::from(balance),
            })?;
            Ok(out)
        }
    }
}
```
