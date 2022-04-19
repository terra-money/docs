# Build a CW20 tokens factory  

The scope of this guide is to create two smart contracts and a frontend connected all together.

## Prerequisites

Tools that will be used: 
- [Terrain](https://github.com/terra-money/terrain) as development environment, 
- [LocalTerra](https://github.com/terra-money/localterra) as local terra node,
- [Terra Station Extension](https://docs.terra.money/docs/learn/terra-station/download/terra-station-extension.html) as wallet to interact with the smart contract.

If the tools are not installed in your computer follow the next tutorials to install the tools:
- [Terrain initial setup](https://docs.terra.money/docs/develop/dapp/quick-start/initial-setup.html#initial-setup),
- [Install and run LocalTerra](https://docs.terra.money/docs/develop/dapp/quick-start/using-terrain-localterra.html#install-and-run-localterra),
- [Install the Terra Station Extension](https://docs.terra.money/docs/learn/terra-station/download/terra-station-extension.html).

:::{tip}
Import the passphrase listed below into the Terra Station Extension [because the wallet contains funds](https://github.com/terra-money/LocalTerra/blob/main/terracore/mnemonics.json#L9):
notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius
:::

## Overview

This guide will allow you to:
- use terrain to instantiate new apps,
- modify a smart contract allowing minting of [CW20 Tokens](https://github.com/CosmWasm/cw-plus/tree/main/packages/cw20),
- bound 1 UST with each unit of a CW20 Tokens minted,
- display total amount of UST stored into the smart contract.
- write tests for the smart contract.

# 1.Instantiate and configure a new app 

Assuming the prerequisites are met a new app can be created using the command below:
```sh
> ~/Documents/github$ terrain new token-factory
generating: 
- contract... done
- frontend... done
```

The next step is to use an IDE to open the project, this guide will use Code:
```sh
> ~/Documents/github$ cd token-factory/
> ~/Documents/github/token-factory$ code .
```

Using the terminal lets create two contracts:
```sh
> ~/Documents/github/token-factory$ terrain code:new token-factory
generating contract... done
> ~/Documents/github/token-factory$ terrain code:new cw20-factory-token
generating contract... done
```

:::{tip}
Consider deleting the counter smart contract folder to have a clean workspace:
```
> ~/Documents/github/token-factory$ cd contracts/
> ~/Documents/github/token-factory/contracts$ ls
counter  token-factory
> ~/Documents/github/token-factory/contracts$ rm -r counter/
```

Before testing the smart contracts deployments lets modify the passphrase that will be used to do the deployments to LocalTerra:

> /token-factory/keys.terrain.js
```js
module.exports = {
  test: {
    mnemonic:
      "notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius",
  }
};
```

Lets deploy each smart contract to validate that the development environment is configured correctly. As is the first time to download dependencies, compile and deploy it may take few seconds (at the end the console must should some addresses displayed):
```
> ~/Documents/github/token-factory$ terrain deploy token-factory --signer test
> ~/Documents/github/token-factory$ terrain deploy cw20-factory-token --signer test
```

# 2.CW20 Factory Token smart contract

CW20 Factory Token will implement [CW20 Base](https://github.com/CosmWasm/cw-plus/tree/0.9.x/contracts/cw20-base), this way the smart contract can be deployed easy to LocalTerra and in the future you can extend functionalities because of the [migration implementation](https://docs.terra.money/docs/develop/dapp/quick-start/contract-migration.html). First of all lets add the [CW20 Base](https://github.com/CosmWasm/cw-plus/tree/main/contracts/cw20-base) which has already implemented the base functionalities:

> /token-factory/contracts/cw20-factory-token/Cargo.toml
```toml
# ...

[dependencies]
cw20-base = {  version = "0.8.1", features = ["library"] }

# ...
```

As the previous mentioned library already implements the base logic on how a CW20 should behave only 4 files need to be modified that way all its base functionalities will be implemented into the cw20-factory-token contract:


> /token-factory/contracts/cw20-factory-token/src/msg.rs
```Rust
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct MigrateMsg {}
```

> /token-factory/contracts/cw20-factory-token/src/lib.rs
```Rust
pub mod contract;
pub mod msg;
```

> /token-factory/contracts/cw20-factory-token/src/contract.rs
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

> /token-factory/contracts/cw20-factory-token/examples/schemas.rs
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
Execute `cargo schema` inside `/token-factory/contracts/cw20-factory-token` folder to generate the new schema. 

Modify the property `instantiateMsg` from `terrain.config.json` to be able to send the correct data to the smart contract on instantiation:
> /token-factory/terrain.config.json
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

:::{tip}
Deploy the contract again to validate that in this process of modifying the previous mentioned files the workspace still compile. In any case you can [clone the repo with all changes](https://github.com/emidev98/token-factory/commit/fdba3c89c464860fe8cd9aa17f1344d82d613522) if your code is not working as expected:
```
> git clone -n https://github.com/emidev98/token-factory
> cd token-factory
> git checkout fdba3c89c464860fe8cd9aa17f1344d82d613522
```
:::

CW20 Factory Token should be deployed to [crates.io](https:crates.io) that way CW20 Token Factory smart contract will implement the previously mentioned package as dependency and will be platform agnostic no matters if you use Linux, Windows or Mac will work the same. As the deployment to crates is out of scope you can find the same package already deployed [here](https://crates.io/crates/cw20-factory-token) which will be used in the following steps of the guide.

# 3. Token Factory smart contract


