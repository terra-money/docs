# Writing the Contract

Now that we've figured out the specification, we can start implementing our contract in code.

## Start with a template

In your working directory, you'll want to use `cargo-generate` to start your smart contract with the recommended folder structure and build options:

```sh
cargo generate --git https://github.com/CosmWasm/cosmwasm-template.git --name my-terra-token
```

## Implementing messages

We'll first start by defining our messages using `struct`. This defines a data structure that will represent our message -- which is intended to be passed from the user to blockchain nodes through JSON.

#### src/msg.rs

Each data structure will be needed to be prefixed by a long derive macro which will provide implementations for traits to make it simpler for serialization between JSON and Rust and debugging.

- `Serialize`: add serializer
- `Deserialize`: add deserializer
- `Clone`: enable struct to be cloned
- `PartialEq`: allow struct to be compared for equality
- `JsonSchema`: generates JSON schema

::: warning NOTE
`HumanAddr` here refers to the "human-readable" `terra-` account address.
:::

```rust
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
    pub decimals: u8,
    pub initial_balances: Vec<InitialBalance>,
}
```

As for our `HandleMsg`, we will use an enum to multiplex over the different types of messages that our contract can understand. We use the `serde` macro to rewrite the attribute key names to use snake-case, so we'll have `transfer_from` instead of `TransferFrom`.

```rust
#[derive(Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum HandleMsg {
  Approve {
    spender: HumanAddr,
    amount: Uint128,
  },
  Transfer {
    recipient: HumanAddr,
    amount: Uint128,
  },
  TransferFrom {
    owner: HumanAddr,
    recipient: HumanAddr,
    amount: Uint128,
  },
  Burn {
    amount: Uint128,
  },
}
```

For our `QueryMsg`, we'll have to also define the structure of the responses because `query()` will send back information back to the user through JSON.

```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
  Balance {
    address: HumanAddr,
  },
  Allowance {
    owner: HumanAddr,
    spender: HumanAddr,
  },
}

#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema)]
pub struct BalanceResponse {
    pub balance: Uint128,
}

#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema)]
pub struct AllowanceResponse {
    pub allowance: Uint128,
}
```

## Main contract logic

After we've defined our messages, we can move on to the main contract logic.

#### src/contract.rs

### init()

```rust
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

    // Check name, symbol, decimals
    if !is_valid_name(&msg.name) {
        return Err(generic_err(
            "Name is not in the expected format (3-30 UTF-8 bytes)",
        ));
    }
    if !is_valid_symbol(&msg.symbol) {
        return Err(generic_err(
            "Ticker symbol is not in expected format [A-Z]{3,6}",
        ));
    }
    if msg.decimals > 18 {
        return Err(generic_err("Decimals must not exceed 18"));
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

### handle()

```rust
pub fn handle<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    msg: HandleMsg,
) -> StdResult<HandleResponse> {
    match msg {
        HandleMsg::Approve { spender, amount } => try_approve(deps, env, &spender, &amount),
        HandleMsg::Transfer { recipient, amount } => try_transfer(deps, env, &recipient, &amount),
        HandleMsg::TransferFrom {
            owner,
            recipient,
            amount,
        } => try_transfer_from(deps, env, &owner, &recipient, &amount),
        HandleMsg::Burn { amount } => try_burn(deps, env, &amount),
    }
}
```

### query()

```rust
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
        QueryMsg::Allowance { owner, spender } => {
            let owner_key = deps.api.canonical_address(&owner)?;
            let spender_key = deps.api.canonical_address(&spender)?;
            let allowance = read_allowance(&deps.storage, &owner_key, &spender_key)?;
            let out = to_binary(&AllowanceResponse {
                allowance: Uint128::from(allowance),
            })?;
            Ok(out)
        }
        QueryMsg::CoinDetails {} => {
            let out = to_binary(&CoinDetailsResponse {
                name: "a".to_string(),
                symbol: "a".to_string(),
                decimals: 3,
            })?;
            Ok(out)
        }
    }
}
```
