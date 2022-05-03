# Modify the CW20 Factory Token smart contract

In this section, you will modify the the CW20 Factory Token contract instantiated by Terrain. The CW20 Factory Token contract implements the [CW20 Base](https://github.com/CosmWasm/cw-plus/tree/0.9.x/contracts/cw20-base), along with several custom files.

To modify the CW20 Factory Token contract, follow the procedure below.

## 1. Add the the CW20 base 
First, add the [CW20 Base](https://github.com/CosmWasm/cw-plus/tree/main/contracts/cw20-base), which implements the CW20 token base functionalities. This allows:

- the smart contract to be easily deployed to LocalTerra 
- Functionality extension using the [migration implementation](https://docs.terra.money/docs/develop/dapp/quick-start/contract-migration.html). 

To add the CW20 Base to the CW20 Factory Token smart contract, do the following:

1\. Navigate to `/token-factory/contracts/cw20-factory-token/`.

```
cd /token-factory/contracts/cw20-factory-token/
```

2\. Open `cargo.toml` and add the following to the dependencies:

```rust
# ...

[dependencies]
cw20-base = {  version = "0.8.1", features = ["library"] }

# ...
```
## 2. Modify the contract files 
Now that you've add the `CW20 Base` to implement the CW20 token base logic, modify the following files:

- `msg.rs`
- `lib.rs`
- `contract.rs`
- `schemas.rs`

To modify the contract files, follow the procedure below.

1\. Navigate to `/token-factory/contracts/cw20-factory-token/src`.

```
cd /token-factory/contracts/cw20-factory-token/src
```
2\. Open `msg.rs` and paste the following:

```Rust
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct MigrateMsg {}
```

3\. Save and close `msg.rs`.

4\. Open `lib.rs` and paste the following:
```Rust
pub mod contract;
pub mod msg;
```
5\. Save and close `lib.rs`.

6\. Open `contract.rs` and paste the following:
```Rust
#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::{
    to_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult,
};
use cw20_base::ContractError;
use cw20_base::enumerable::{query_all_allowances, query_all_accounts};
use cw20_base::msg::{QueryMsg,ExecuteMsg};

use crate::msg::MigrateMsg;
use cw2::set_contract_version;
use cw20_base::allowances::{
    execute_decrease_allowance, execute_increase_allowance, execute_send_from,
    execute_transfer_from, query_allowance, execute_burn_from,
};
use cw20_base::contract::{
    execute_mint, execute_send, execute_transfer, execute_update_marketing,
    execute_upload_logo, query_balance, query_token_info, query_minter, query_download_logo, query_marketing_info, execute_burn,
};

// version info for migration info
const CONTRACT_NAME: &str = "crates.io:cw20-factory-token";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: cw20_base::msg::InstantiateMsg,
) -> Result<Response, ContractError> {
    set_contract_version(deps.storage, CONTRACT_NAME, CONTRACT_VERSION)?;

    /* Execute the instantiate method from cw_20_base as the code from that
    library is already battle tested we do not have to re-write the full
    functionality: https://github.com/CosmWasm/cw-plus/tree/main/contracts/cw20-base*/
    Ok(cw20_base::contract::instantiate(deps, env, info, msg)?)
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, cw20_base::ContractError> {
    match msg {
        ExecuteMsg::Transfer { recipient, amount } => {
            execute_transfer(deps, env, info, recipient, amount)
        }
        ExecuteMsg::Burn { amount } => execute_burn(deps, env, info, amount),
        ExecuteMsg::Send {
            contract,
            amount,
            msg,
        } => execute_send(deps, env, info, contract, amount, msg),
        ExecuteMsg::Mint { recipient, amount } => execute_mint(deps, env, info, recipient, amount),
        ExecuteMsg::IncreaseAllowance {
            spender,
            amount,
            expires,
        } => execute_increase_allowance(deps, env, info, spender, amount, expires),
        ExecuteMsg::DecreaseAllowance {
            spender,
            amount,
            expires,
        } => execute_decrease_allowance(deps, env, info, spender, amount, expires),
        ExecuteMsg::TransferFrom {
            owner,
            recipient,
            amount,
        } => execute_transfer_from(deps, env, info, owner, recipient, amount),
        ExecuteMsg::BurnFrom { owner, amount } => execute_burn_from(deps, env, info, owner, amount),
        ExecuteMsg::SendFrom {
            owner,
            contract,
            amount,
            msg,
        } => execute_send_from(deps, env, info, owner, contract, amount, msg),
        ExecuteMsg::UpdateMarketing {
            project,
            description,
            marketing,
        } => execute_update_marketing(deps, env, info, project, description, marketing),
        ExecuteMsg::UploadLogo(logo) => execute_upload_logo(deps, env, info, logo),
    }
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        /* Default methods from CW20 Standard with no modifications:
        https://github.com/CosmWasm/cw-plus/tree/main/contracts/cw20-base */
        QueryMsg::Balance { address } => to_binary(&query_balance(deps, address)?),
        QueryMsg::TokenInfo {} => to_binary(&query_token_info(deps)?),
        QueryMsg::Minter {} => to_binary(&query_minter(deps)?),
        QueryMsg::Allowance { owner, spender } => {
            to_binary(&query_allowance(deps, owner, spender)?)
        }
        QueryMsg::AllAllowances {
            owner,
            start_after,
            limit,
        } => to_binary(&query_all_allowances(deps, owner, start_after, limit)?),
        QueryMsg::AllAccounts { start_after, limit } => {
            to_binary(&query_all_accounts(deps, start_after, limit)?)
        }
        QueryMsg::MarketingInfo {} => to_binary(&query_marketing_info(deps)?),
        QueryMsg::DownloadLogo {} => to_binary(&query_download_logo(deps)?),
    }
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn migrate(_deps: DepsMut, _env: Env, _msg: MigrateMsg) -> StdResult<Response> {
    Ok(Response::default())
}
```
7\. Save and close `contract.rs`.

8\. Open `schemas.rs` and paste the following:

```Rust
use std::env::current_dir;
use std::fs::create_dir_all;

use cosmwasm_schema::{export_schema, remove_schemas, schema_for};
use cw20_base::msg::{InstantiateMsg, QueryMsg, ExecuteMsg};


fn main() {
    let mut out_dir = current_dir().unwrap();
    out_dir.push("schema");
    create_dir_all(&out_dir).unwrap();
    remove_schemas(&out_dir).unwrap();

    export_schema(&schema_for!(InstantiateMsg), &out_dir);
    export_schema(&schema_for!(ExecuteMsg), &out_dir);
    export_schema(&schema_for!(QueryMsg), &out_dir);
}
```

9\. Close and save `schemas.rs`:

## 3. Generate and test the schema 

1\. Navigate to `/token-factory/contracts/cw20-factory-token`:

```
cd /token-factory/contracts/cw20-factory-token
```

2\. Generate the new schema:

```
cargo schema
```

3\. Test the schema:

```
cargo test
```

## 4. Modify `terrain.config.json` 

1\. Open `terrain.config.json`.

2\. Modify the `instantiateMsg` property in the `terrain.config.json` so that it contains the `name`, `symbol`, `decimals` and `initial_balances` shown below. This allows you to send the correct data to the smart contract upon instantiation:

```Json
{
  "_global": {
    "_base": {
      "instantiation": {
        "instantiateMsg": {
          "name": "Bit Money",
          "symbol": "BTM",
          "decimals": 2,
          "initial_balances": [
            {
              "amount": "123",
              "address": "terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v"
            }
          ]
        }
      }
    }
  }, // ...
}
```

## 5. Test the smart contract deployment

Deploy the contract again to confirm that the workplace still compiles. 

```sh
terrain deploy cw20-factory-token --signer test
```

:::{tip}
If your code is not working as expected, you can [clone the repo with all the changes described above](https://github.com/emidev98/token-factory/commit/fdba3c89c464860fe8cd9aa17f1344d82d613522) so that you can continue with the tutorial. To clone the repo, do the following:
```
git clone -n https://github.com/emidev98/token-factory
cd token-factory
git checkout fdba3c89c464860fe8cd9aa17f1344d82d613522
```
:::

## 6. Use crate.io to implement the CW20 Token Factory as a dependency

For the purpose of this tutorial, [crates.io](https:\\crates.io) is used to implement the CW20 Token Factory as a dependency. This ensures that CW20 Token Factory is platform agnostic, so you can use Linux, Windows or Mac.

As the deployment to crates.io is out of scope of this tutorial, you can find [deployed the CW20 Token Factory package to crates.io](https://crates.io/crates/cw20-factory-token). You can use this  deployment when you add the CW20 Token Factory contract as a dependency of the Token Factory contract in the the next section.

