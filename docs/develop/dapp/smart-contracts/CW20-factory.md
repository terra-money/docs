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
```rust
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

This smart contract will be the one that will mint new tokens, increase supply of minted tokens, burn tokens to return UST and keep track of every single token created. Lets start adding dependencies inside Cargo.toml below dependencies header:

> /token-factory/contracts/token-factory/Cargo.toml
```rust
# ...

[dependencies]
cw2 = "0.8.1"
cw20 = "0.8.1"
cw20-base = {  version = "0.8.1", features = ["library"] }
cw20-factory-token = {  version = "0.5.0", features = ["library"] }
# ...
```

> /token-factory/contracts/token-factory/src/error.rs
```rust
use cosmwasm_std::{StdError, Uint128};
use thiserror::Error;

#[derive(Error, Debug, PartialEq)]
pub enum ContractError {
    #[error("{0}")]
    Std(#[from] StdError),

    #[error("Unauthorized")]
    Unauthorized {},

    #[error("NotReceivedFunds")]
    NotReceivedFunds {},

    #[error("NotAllowZeroAmount")]
    NotAllowZeroAmount {},

    #[error("NotAllowedDenom")]
    NotAllowedDenom { 
        denom: String
    },

    #[error("NotAllowedMultipleDenoms")]
    NotAllowedMultipleDenoms {},

    #[error("TokenAddressMustBeWhitelisted")]
    TokenAddressMustBeWhitelisted {},

    #[error("ReceivedFundsMismatchWithMintAmount")]
    ReceivedFundsMismatchWithMintAmount {
        received_amount: Uint128,
        expected_amount: Uint128
    },
}

```

> /token-factory/contracts/token-factory/src/msg.rs
```rust
use cosmwasm_std::Uint128;
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct InstantiateMsg {
    /* Denomination of the stable asset
    https://docs.terra.money/docs/develop/module-specifications/spec-market.html#market */
    pub stable_denom: String,

    /* Id of the contract uploaded for the first time to the chain
    https://docs.terra.money/docs/develop/module-specifications/spec-wasm.html#code-id */
    pub token_contract_code_id: u64,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    /* Handle the deposits of native tokens into the smart contract to mint
    the new pegged token 1:1 with UST or to increase circulation supply. */
    Deposit(DepositType),

    /* Handle burn of pegged tokens 1:1 with UST which are added to
    MINTED_TOKENS list and return the UST stored into the contract. */
    Burn {
        amount: Uint128,
        token_address: String
    }
}


#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum DepositType {
    /* Instantiate a CW20_base token */
    Instantiate(cw20_base::msg::InstantiateMsg),
    /* Create new tokens based on token_address, amount of UST send to 
    this contract and recipient address */
    Mint {
        token_address: String,
        recipient: String,
    }
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    /* Returns the list of token addresses that were created with this contract */
    GetMintedTokens { },
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub struct MintedTokens {
    pub minted_tokens: Vec<String>
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct MigrateMsg {}

```

> /token-factory/contracts/token-factory/src/state.rs
```rust
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use cw_storage_plus::Item;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Config {
    /* Denomination of the stable asset
    https://docs.terra.money/docs/develop/module-specifications/spec-market.html#market */
    pub stable_denom: String,

    /* Id of the contract uploaded to the chain used to instantiate
    the different tokens
    https://docs.terra.money/docs/develop/module-specifications/spec-wasm.html#code-id */
    pub token_contract_code_id: u64,
}

pub const CONFIG: Item<Config> = Item::new("config");
pub const MINTED_TOKENS: Item<Vec<String>> = Item::new("minted_tokens");
```

> /token-factory/contracts/token-factory/src/lib.rs
```rust
pub mod contract;
pub mod msg;
pub mod state;
pub mod error;
mod test;
pub use crate::error::ContractError;
```

> /token-factory/contracts/token-factory/src/contract.rs
```rust
use std::vec;

use crate::error::ContractError;
use crate::msg::{DepositType, ExecuteMsg, InstantiateMsg, MigrateMsg, MintedTokens, QueryMsg};
use crate::state::{Config, CONFIG, MINTED_TOKENS};
#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::{
    coins, to_binary, BankMsg, Binary, Coin, CosmosMsg, Deps, DepsMut, Env, MessageInfo, Reply,
    Response, StdError, StdResult, SubMsg, Uint128, WasmMsg,
};
use cw2::set_contract_version;

/* Define contract name and version */
const CONTRACT_NAME: &str = "crates.io:token-factory";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");
const INSTANTIATE_REPLY_ID: u64 = 1;

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    /* Define the initial configuration for this contract that way you can
    limit the type of coin you want to accept each time a token-factory is
    created and also which kind of token would you like to mint based on
    the code id of the contract deployed */
    let state = Config {
        stable_denom: msg.stable_denom.to_string(),
        token_contract_code_id: msg.token_contract_code_id,
    };
    set_contract_version(deps.storage, CONTRACT_NAME, CONTRACT_VERSION)?;

    CONFIG.save(deps.storage, &state)?;
    MINTED_TOKENS.save(deps.storage, &Vec::new())?;

    Ok(Response::new()
        .add_attribute("method", "instantiate")
        .add_attribute(
            "token_contract_code_id",
            msg.token_contract_code_id.to_string(),
        ))
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        /* Method executed each time someone send funds to the contract to mint 
        a new token or to increase already existent tokens circulating supply */
        ExecuteMsg::Deposit(deposit_type) => match_deposit(deps.as_ref(), env, info, deposit_type),
        /* Method used to burn an existent token created thru this contract
        and send the UST back to the address that burn these tokens.*/
        ExecuteMsg::Burn {
            amount,
            token_address,
        } => execute_burn_from(deps, info, amount, token_address),
    }
}

pub fn match_deposit(
    deps: Deps,
    env: Env,
    info: MessageInfo,
    deposit_type: DepositType,
) -> Result<Response, ContractError> {
    match deposit_type {
        /* When the InstantiateMsg struct is send the factory will 
        execute this code and a new token with the defined properties
        will be minted */
        DepositType::Instantiate(token_data) => {
            execute_instantiate_token(deps, env, info, token_data)
        }
        /* If a token_address and recipient is received along with a
        deposit this method will increase the supply of an already 
        existent token by the defined units of UST received */
        DepositType::Mint {
            token_address,
            recipient,
        } => execute_mint(deps, info, token_address, recipient),
    }
}

pub fn execute_instantiate_token(
    deps: Deps,
    env: Env,
    info: MessageInfo,
    mut token_data: cw20_base::msg::InstantiateMsg,
) -> Result<Response, ContractError> {
    let config = CONFIG.load(deps.storage)?;
    let received_funds = get_received_funds(&deps, &info)?;
    let mut expected_amount = Uint128::zero();

    /* Add all initial token supply */
    token_data
        .initial_balances
        .iter()
        .for_each(|t| expected_amount += t.amount);

    /* Check if received_funds is different than
    initial token supply and throw an error */
    if expected_amount.ne(&received_funds.amount) {
        return Err(ContractError::ReceivedFundsMismatchWithMintAmount {
            received_amount: received_funds.amount,
            expected_amount,
        });
    }

    /* If a minter exists replace the minter address with
    the token-factory address that way the minting is only
    allowed thru this smart contract. */
    token_data.mint = match token_data.mint {
        None => None,
        Some(mut e) => {
            e.minter = env.contract.address.to_string();
            Some(e)
        }
    };

    /* Create a WasmMsg to mint new CW20-base token.
    https://github.com/CosmWasm/cw-plus/tree/0.9.x/contracts/cw20-base */
    let instantiate_message = WasmMsg::Instantiate {
        admin: Some(env.contract.address.to_string()),
        code_id: config.token_contract_code_id,
        msg: to_binary(&token_data)?,
        funds: vec![],
        label: token_data.name,
    };

    /* Define the SubMessage on CosmWasm API to allow a callback on reply
    entry point. This call will be executed with INSTANTIATE_REPLY_ID if
    the call succeed after being executed by the method add_submessage(response)
    from Response implementation.
    More Info: https://docs.cosmwasm.com/docs/1.0/smart-contracts/message/submessage */
    let sub_msg = SubMsg::reply_on_success(instantiate_message, INSTANTIATE_REPLY_ID);

    /* Respond with the method name and SubMsg. 
    SubMsg will be executed to callback on reply 
    method with INSTANTIATE_REPLY_ID as identifier 
    to complete further operations */
    Ok(Response::new()
        .add_attribute("method", "instantiate_token")
        .add_submessage(sub_msg))
}

pub fn get_received_funds(deps: &Deps, info: &MessageInfo) -> Result<Coin, ContractError> {
    let config = CONFIG.load(deps.storage)?;

    match info.funds.get(0) {
        None => return Err(ContractError::NotReceivedFunds {}),
        Some(received) => {
            /* Amount of tokens received cannot be zero */
            if received.amount.is_zero() {
                return Err(ContractError::NotAllowZeroAmount {});
            }

            /* Allow to receive only token denomination defined
            on contract instantiation "config.stable_denom" */
            if received.denom.ne(&config.stable_denom) {
                return Err(ContractError::NotAllowedDenom {
                    denom: received.denom.to_string(),
                });
            }

            /* Only one token can be received */
            if info.funds.len() > 1 {
                return Err(ContractError::NotAllowedMultipleDenoms {});
            }
            Ok(received.clone())
        }
    }
}

pub fn execute_mint(
    deps: Deps,
    info: MessageInfo,
    token_address: String,
    recipient: String,
) -> Result<Response, ContractError> {
    let received_funds = get_received_funds(&deps, &info)?;
    let token_addr_from_list = MINTED_TOKENS
        .load(deps.storage)
        .unwrap()
        .into_iter()
        .find(|t| t == &token_address);

    /* Check if the token to be minted exists in the list, otherwise
    throw an error because minting must not be allowed for a token
    that was not created with this factory */
    if token_addr_from_list == None {
        return Err(ContractError::TokenAddressMustBeWhitelisted {});
    }

    /* Create an execute message to mint new units of an existent token */
    let execute_mint = WasmMsg::Execute {
        contract_addr: token_address.clone(),
        msg: to_binary(&cw20_base::msg::ExecuteMsg::Mint {
            amount: received_funds.amount,
            recipient: recipient.clone(),
        })?,
        funds: vec![],
    };

    /* This type of SubMessage will never reply as no further operation is needed, 
    but for sure the mint call to instantiated cw20_base contract needs to be done.
    More Info: https://docs.cosmwasm.com/docs/1.0/smart-contracts/message/submessage */
    let mint_sub_msg = SubMsg::new(execute_mint);

    Ok(Response::new()
        .add_attribute("method", "mint")
        .add_submessage(mint_sub_msg))
}

pub fn execute_burn_from(
    deps: DepsMut,
    info: MessageInfo,
    amount: Uint128,
    token_address: String,
) -> Result<Response, ContractError> {
    let config = CONFIG.load(deps.storage)?;
    let token_addr_from_list = MINTED_TOKENS
        .load(deps.storage)
        .unwrap()
        .into_iter()
        .find(|t| t == &token_address);

    /* Check if the token to be burned exists in the list, otherwise
    throw an error because minting must not be allowed for a token
    that was not created thru the factory */
    if token_addr_from_list == None {
        return Err(ContractError::TokenAddressMustBeWhitelisted {});
    }

    /* Amount of tokens to be burned must not be zero */
    if amount.is_zero() {
        return Err(ContractError::NotAllowZeroAmount {});
    }

    /* Create a SubMessage to decrease the circulating supply of existent 
    CW20 Tokens from the token_address.
    https://github.com/CosmWasm/cosmwasm/blob/main/SEMANTICS.md#submessages */
    let sub_msg_burn = SubMsg::new(WasmMsg::Execute {
        contract_addr: token_address.clone(),
        msg: to_binary(&cw20_base::msg::ExecuteMsg::BurnFrom {
            owner: info.sender.to_string(),
            amount,
        })?,
        funds: vec![],
    });

    /* Create a SubMessage to transfer fund from this smart contract to
    the address that burns the CW20 Tokens*/
    let sub_msg_send = SubMsg::new(CosmosMsg::Bank(BankMsg::Send {
        to_address: info.sender.to_string(),
        amount: coins(amount.u128(), config.stable_denom),
    }));

    Ok(Response::new()
        .add_attribute("method", "burn")
        .add_submessages(vec![sub_msg_burn, sub_msg_send]))
}

/* In order to handle any callback from previous SubMessages "reply"
function must be implemented and iterate over "msg.id" to allow
the completion of the callback.*/
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn reply(deps: DepsMut, _env: Env, msg: Reply) -> StdResult<Response> {
    match msg.id {
        INSTANTIATE_REPLY_ID => handle_instantiate_reply(deps, msg),
        id => Err(StdError::generic_err(format!("Unknown reply id: {}", id))),
    }
}

fn handle_instantiate_reply(deps: DepsMut, msg: Reply) -> StdResult<Response> {
    let result = msg.result.into_result().map_err(StdError::generic_err)?;

    /* Find the event type instantiate_contract which contains the contract_address*/
    let event = result
        .events
        .iter()
        .find(|event| event.ty == "instantiate_contract")
        .ok_or_else(|| StdError::generic_err("cannot find `instantiate_contract` event"))?;

    /* Find the contract_address from instantiate_contract event*/
    let contract_address = &event
        .attributes
        .iter()
        .find(|attr| attr.key == "contract_address")
        .ok_or_else(|| StdError::generic_err("cannot find `contract_address` attribute"))?
        .value;

    /* Update the state of the contract adding the new generated MINTED_TOKEN */
    MINTED_TOKENS.update(deps.storage, |mut tokens| -> StdResult<Vec<String>> {
        tokens.push(contract_address.to_string());
        Ok(tokens)
    })?;

    Ok(Response::new()
        .add_attribute("method", "handle_instantiate_reply")
        .add_attribute("contract_address", contract_address))
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        /* Return the list of all tokens that were minted thru this contract */
        QueryMsg::GetMintedTokens {} => to_binary(&query_minted_tokens(deps)?),
    }
}

fn query_minted_tokens(deps: Deps) -> StdResult<MintedTokens> {
    Ok(MintedTokens {
        minted_tokens: MINTED_TOKENS.load(deps.storage)?,
    })
}

/* In case you want to upgrade this contract you can find information about
how to migrate the contract in the following link:
https://docs.terra.money/docs/develop/dapp/quick-start/contract-migration.html*/
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn migrate(_deps: DepsMut, _env: Env, _msg: MigrateMsg) -> StdResult<Response> {
    Ok(Response::default())
}
```

> /token-factory/contracts/token-factory/src/test.rs
```rust
#[cfg(test)]
mod tests {
    use crate::{
        contract::{execute, instantiate, query, reply},
        msg::{DepositType, ExecuteMsg, InstantiateMsg, MintedTokens, QueryMsg},
    };
    use cosmwasm_std::{
        from_binary,
        testing::{mock_dependencies, mock_env, mock_info},
        to_binary, Attribute, Coin, CosmosMsg, DepsMut, Event, Reply, Response, SubMsg,
        SubMsgExecutionResponse, Uint128, WasmMsg,
    };
    use cw20::{Cw20Coin, MinterResponse};

    #[test]
    fn test_instantiate() {
        // GIVEN
        let mut deps = mock_dependencies(&[]);

        // WHEN
        let res = do_instantiate(deps.as_mut());

        // THEN
        let attrs = res.attributes;
        assert_eq!(
            vec![
                Attribute {
                    key: "method".to_string(),
                    value: "instantiate".to_string()
                },
                Attribute {
                    key: "token_contract_code_id".to_string(),
                    value: "1".to_string()
                }
            ],
            attrs
        );
    }

    #[test]
    fn test_mint_token() {
        // GIVEN
        let mut deps = mock_dependencies(&[]);

        // WHEN
        do_instantiate(deps.as_mut());
        let res = do_mint_new_token(deps.as_mut());

        // THEN
        let res_attr = res.attributes;
        assert_eq!(1, res_attr.len());
        assert_eq!("instantiate_token", res_attr.get(0).unwrap().value);

        let res_message = res.messages;
        assert_eq!(1, res_message.len());
        let success_reply = SubMsg::reply_on_success(
            CosmosMsg::Wasm(WasmMsg::Instantiate {
                admin: Some("cosmos2contract".to_string()),
                code_id: 1,
                funds: vec![],
                msg: to_binary(&cw20_base::msg::InstantiateMsg {
                    name: "Bit Money".to_string(),
                    symbol: "BTM".to_string(),
                    decimals: 2,
                    mint: Some(MinterResponse {
                        minter: "cosmos2contract".to_string(),
                        cap: Some(Uint128::new(1234)),
                    }),
                    initial_balances: vec![Cw20Coin {
                        amount: Uint128::new(123),
                        address: "creator".to_string(),
                    }],
                    marketing: None,
                })
                .unwrap(),
                label: "Bit Money".to_string(),
            }),
            1,
        );
        assert_eq!(&success_reply, res_message.get(0).unwrap());
    }

    #[test]
    fn test_reply_instantiate_event() {
        // GIVEN
        let mut deps = mock_dependencies(&[]);
        let env = mock_env();
        let query_minted_tokens = QueryMsg::GetMintedTokens {};

        // WHEN
        do_instantiate(deps.as_mut());
        do_mint_new_token(deps.as_mut());
        let do_instantiate_res = do_reply_instantiate_event(deps.as_mut());
        let query_res = query(deps.as_ref(), env, query_minted_tokens).unwrap();
        let query_res: MintedTokens = from_binary(&query_res).unwrap();

        // THEN
        assert_eq!(
            Response::new()
                .add_attribute("method", "handle_instantiate_reply")
                .add_attribute("contract_address", "bit_money_contract_address"),
            do_instantiate_res
        );
        assert_eq!(
            MintedTokens {
                minted_tokens: vec!["bit_money_contract_address".to_string()]
            },
            query_res
        );
    }

    #[test]
    fn test_mint_existent_token() {
        // GIVEN
        let mut deps = mock_dependencies(&[]);
        let env = mock_env();
        let info = mock_info(
            "creator",
            &vec![Coin {
                denom: "uusd".to_string(),
                amount: Uint128::new(1),
            }],
        );
        let msg = ExecuteMsg::Deposit(DepositType::Mint {
            token_address: "bit_money_contract_address".to_string(),
            recipient: "creator".to_string(),
        });

        // WHEN
        do_instantiate(deps.as_mut());
        do_mint_new_token(deps.as_mut());
        do_reply_instantiate_event(deps.as_mut());
        let execute_res = execute(deps.as_mut(), env, info, msg).unwrap();

        // THEN
        assert_eq!(
            Response::new()
                .add_attribute("method", "mint")
                .add_messages(vec![
                    CosmosMsg::Wasm(WasmMsg::Execute {
                        contract_addr: "bit_money_contract_address".to_string(),
                        msg: to_binary(&cw20_base::msg::ExecuteMsg::Mint {
                            amount: Uint128::new(1),
                            recipient: "creator".to_string()
                        })
                        .unwrap(),
                        funds: vec![],
                    })
                ]),
            execute_res
        );
    }

    #[test]
    fn test_burn_tokens() {
        // GIVEN
        let mut deps = mock_dependencies(&[]);
        let env = mock_env();
        let info = mock_info("creator", &[]);
        let exec_burn_tokens = ExecuteMsg::Burn {
            amount: Uint128::new(123),
            token_address: "bit_money_contract_address".to_string()
        };

        // WHEN
        do_instantiate(deps.as_mut());
        do_reply_instantiate_event(deps.as_mut());
        do_mint_new_token(deps.as_mut());

        let res = execute(deps.as_mut(), env, info, exec_burn_tokens).unwrap();

        // THEN
        let res_attr = res.attributes;
        assert_eq!(1, res_attr.len());
        assert_eq!("burn", res_attr.get(0).unwrap().value);

        let res_message = res.messages;
        assert_eq!(2, res_message.len());

        let message_reply = SubMsg::new(
            CosmosMsg::Wasm(WasmMsg::Execute {
                contract_addr: "bit_money_contract_address".to_string(),
                msg: to_binary(&cw20_base::msg::ExecuteMsg::BurnFrom {
                    owner: "creator".to_string(),
                    amount: Uint128::new(123),
                })
                .unwrap(),
                funds: vec![],
            })
        );
        assert_eq!(
            vec![message_reply], 
            res_message
        );
    }

    /*
     * HELPER METHODS TO DO NOT REPEAT CODE MANY TIMES
     */

    fn do_instantiate(deps: DepsMut) -> Response {
        let instantiate_msg = InstantiateMsg {
            stable_denom: "uusd".to_string(),
            token_contract_code_id: 1,
        };
        let info = mock_info("creator", &[]);
        let env = mock_env();

        instantiate(deps, env, info, instantiate_msg).unwrap()
    }

    fn do_mint_new_token(deps: DepsMut) -> Response {
        let env = mock_env();
        let info = mock_info(
            "i_am_the_sender",
            &vec![Coin {
                denom: "uusd".to_string(),
                amount: Uint128::new(123),
            }],
        );
        let token_msg = cw20_base::msg::InstantiateMsg {
            name: "Bit Money".to_string(),
            symbol: "BTM".to_string(),
            decimals: 2,
            mint: Some(MinterResponse {
                minter: "creator".to_string(),
                cap: Some(Uint128::new(1234)),
            }),
            initial_balances: vec![Cw20Coin {
                amount: Uint128::new(123),
                address: "creator".to_string(),
            }],
            marketing: None,
        };
        let msg = ExecuteMsg::Deposit(DepositType::Instantiate(token_msg.clone()));

        execute(deps, env.clone(), info.clone(), msg).unwrap()
    }

    /* Confirm reply event form instantiate method. That way
    the minted_tokens addresses can be whitelisted in factory.*/
    fn do_reply_instantiate_event(deps: DepsMut) -> Response {
        let env = mock_env();

        let event = Event::new("instantiate_contract")
            .add_attribute("creator", "token_factory_addr")
            .add_attribute("admin", "i_am_the_sender")
            .add_attribute("code_id", "1")
            .add_attribute("contract_address", "bit_money_contract_address");

        reply(
            deps,
            env,
            Reply {
                id: 1,
                result: cosmwasm_std::ContractResult::Ok(SubMsgExecutionResponse {
                    events: vec![event],
                    data: None,
                }),
            },
        )
        .unwrap()
    }
}
```

> /token-factory/contracts/token-factory/examples/schema.rs
```rust
use std::env::current_dir;
use std::fs::create_dir_all;

use cosmwasm_schema::{export_schema, remove_schemas, schema_for};

use token_factory::msg::{ExecuteMsg, QueryMsg};

fn main() {
    let mut out_dir = current_dir().unwrap();
    out_dir.push("schema");
    create_dir_all(&out_dir).unwrap();
    remove_schemas(&out_dir).unwrap();

    export_schema(&schema_for!(token_factory::msg::InstantiateMsg), &out_dir);
    export_schema(&schema_for!(ExecuteMsg), &out_dir);
    export_schema(&schema_for!(QueryMsg), &out_dir);
}

```

> /token-factory/contracts/token-factory/src/test.rs
```rust
#[cfg(test)]
mod tests {
    use crate::{
        contract::{execute, instantiate, query, reply},
        msg::{DepositType, ExecuteMsg, InstantiateMsg, MintedTokens, QueryMsg},
    };
    use cosmwasm_std::{
        coins, from_binary,
        testing::{mock_dependencies, mock_env, mock_info},
        to_binary, Attribute, BankMsg, Coin, CosmosMsg, DepsMut, Event, Reply, Response, SubMsg,
        SubMsgExecutionResponse, Uint128, WasmMsg,
    };
    use cw20::{Cw20Coin, MinterResponse};

    #[test]
    fn test_instantiate() {
        // GIVEN
        let mut deps = mock_dependencies(&[]);

        // WHEN
        let res = do_instantiate(deps.as_mut());

        // THEN
        let attrs = res.attributes;
        assert_eq!(
            vec![
                Attribute {
                    key: "method".to_string(),
                    value: "instantiate".to_string()
                },
                Attribute {
                    key: "token_contract_code_id".to_string(),
                    value: "1".to_string()
                }
            ],
            attrs
        );
    }

    #[test]
    fn test_mint_token() {
        // GIVEN
        let mut deps = mock_dependencies(&[]);

        // WHEN
        do_instantiate(deps.as_mut());
        let res = do_mint_new_token(deps.as_mut());

        // THEN
        let res_attr = res.attributes;
        assert_eq!(1, res_attr.len());
        assert_eq!("instantiate_token", res_attr.get(0).unwrap().value);

        let res_message = res.messages;
        assert_eq!(1, res_message.len());
        let success_reply = SubMsg::reply_on_success(
            CosmosMsg::Wasm(WasmMsg::Instantiate {
                admin: Some("cosmos2contract".to_string()),
                code_id: 1,
                funds: vec![],
                msg: to_binary(&cw20_base::msg::InstantiateMsg {
                    name: "Bit Money".to_string(),
                    symbol: "BTM".to_string(),
                    decimals: 2,
                    mint: Some(MinterResponse {
                        minter: "cosmos2contract".to_string(),
                        cap: Some(Uint128::new(1234)),
                    }),
                    initial_balances: vec![Cw20Coin {
                        amount: Uint128::new(123),
                        address: "creator".to_string(),
                    }],
                    marketing: None,
                })
                .unwrap(),
                label: "Bit Money".to_string(),
            }),
            1,
        );
        assert_eq!(&success_reply, res_message.get(0).unwrap());
    }

    #[test]
    fn test_reply_instantiate_event() {
        // GIVEN
        let mut deps = mock_dependencies(&[]);
        let env = mock_env();
        let query_minted_tokens = QueryMsg::GetMintedTokens {};

        // WHEN
        do_instantiate(deps.as_mut());
        do_mint_new_token(deps.as_mut());
        let do_instantiate_res = do_reply_instantiate_event(deps.as_mut());
        let query_res = query(deps.as_ref(), env, query_minted_tokens).unwrap();
        let query_res: MintedTokens = from_binary(&query_res).unwrap();

        // THEN
        assert_eq!(
            Response::new()
                .add_attribute("method", "handle_instantiate_reply")
                .add_attribute("contract_address", "bit_money_contract_address"),
            do_instantiate_res
        );
        assert_eq!(
            MintedTokens {
                minted_tokens: vec!["bit_money_contract_address".to_string()]
            },
            query_res
        );
    }

    #[test]
    fn test_mint_existent_token() {
        // GIVEN
        let mut deps = mock_dependencies(&[]);
        let env = mock_env();
        let info = mock_info(
            "creator",
            &vec![Coin {
                denom: "uusd".to_string(),
                amount: Uint128::new(1),
            }],
        );
        let msg = ExecuteMsg::Deposit(DepositType::Mint {
            token_address: "bit_money_contract_address".to_string(),
            recipient: "creator".to_string(),
        });

        // WHEN
        do_instantiate(deps.as_mut());
        do_mint_new_token(deps.as_mut());
        do_reply_instantiate_event(deps.as_mut());
        let execute_res = execute(deps.as_mut(), env, info, msg).unwrap();

        // THEN
        assert_eq!(
            Response::new()
                .add_attribute("method", "mint")
                .add_messages(vec![CosmosMsg::Wasm(WasmMsg::Execute {
                    contract_addr: "bit_money_contract_address".to_string(),
                    msg: to_binary(&cw20_base::msg::ExecuteMsg::Mint {
                        amount: Uint128::new(1),
                        recipient: "creator".to_string()
                    })
                    .unwrap(),
                    funds: vec![],
                })]),
            execute_res
        );
    }

    #[test]
    fn test_burn_tokens() {
        // GIVEN
        let mut deps = mock_dependencies(&[]);
        let env = mock_env();
        let info = mock_info("creator", &[]);
        let exec_burn_tokens = ExecuteMsg::Burn {
            amount: Uint128::new(123),
            token_address: "bit_money_contract_address".to_string(),
        };

        // WHEN
        do_instantiate(deps.as_mut());
        do_reply_instantiate_event(deps.as_mut());
        do_mint_new_token(deps.as_mut());

        let res = execute(deps.as_mut(), env, info, exec_burn_tokens).unwrap();

        // THEN
        assert_eq!(1, res.attributes.len());
        assert_eq!("burn", res.attributes.get(0).unwrap().value);
        assert_eq!(2, res.messages.len());
        assert_eq!(
            vec![
                SubMsg::new(CosmosMsg::Wasm(WasmMsg::Execute {
                    contract_addr: "bit_money_contract_address".to_string(),
                    msg: to_binary(&cw20_base::msg::ExecuteMsg::BurnFrom {
                        owner: "creator".to_string(),
                        amount: Uint128::new(123),
                    })
                    .unwrap(),
                    funds: vec![],
                })),
                SubMsg::new(CosmosMsg::Bank(BankMsg::Send {
                    to_address: "creator".to_string(),
                    amount: coins(123 as u128, "uusd")
                }))
            ],
            res.messages
        );
    }

    /*
     * HELPER METHODS TO DO NOT REPEAT CODE MANY TIMES
     */

    fn do_instantiate(deps: DepsMut) -> Response {
        let instantiate_msg = InstantiateMsg {
            stable_denom: "uusd".to_string(),
            token_contract_code_id: 1,
        };
        let info = mock_info("creator", &[]);
        let env = mock_env();

        instantiate(deps, env, info, instantiate_msg).unwrap()
    }

    fn do_mint_new_token(deps: DepsMut) -> Response {
        let env = mock_env();
        let info = mock_info(
            "i_am_the_sender",
            &vec![Coin {
                denom: "uusd".to_string(),
                amount: Uint128::new(123),
            }],
        );
        let token_msg = cw20_base::msg::InstantiateMsg {
            name: "Bit Money".to_string(),
            symbol: "BTM".to_string(),
            decimals: 2,
            mint: Some(MinterResponse {
                minter: "creator".to_string(),
                cap: Some(Uint128::new(1234)),
            }),
            initial_balances: vec![Cw20Coin {
                amount: Uint128::new(123),
                address: "creator".to_string(),
            }],
            marketing: None,
        };
        let msg = ExecuteMsg::Deposit(DepositType::Instantiate(token_msg.clone()));

        execute(deps, env.clone(), info.clone(), msg).unwrap()
    }

    /* Confirm reply event form instantiate method. That way
    the minted_tokens addresses can be whitelisted in factory.*/
    fn do_reply_instantiate_event(deps: DepsMut) -> Response {
        let env = mock_env();

        let event = Event::new("instantiate_contract")
            .add_attribute("creator", "token_factory_addr")
            .add_attribute("admin", "i_am_the_sender")
            .add_attribute("code_id", "1")
            .add_attribute("contract_address", "bit_money_contract_address");

        reply(
            deps,
            env,
            Reply {
                id: 1,
                result: cosmwasm_std::ContractResult::Ok(SubMsgExecutionResponse {
                    events: vec![event],
                    data: None,
                }),
            },
        )
        .unwrap()
    }
}
```

Now that the code in place, lets build the schema, execute the tests to validate that the main functionalities work as expected:

```bash
>~/Documents/github/tokens-factory/contracts/token-factory$ cargo schema
    Finished dev [unoptimized + debuginfo] target(s) in 0.02s
     Running `target/debug/examples/schema`
Removing "~/Documents/github/tokens-factory/contracts/token-factory/schema/execute_msg.json" …
Removing "~/Documents/github/tokens-factory/contracts/token-factory/schema/instantiate_msg.json" …
Removing "~/Documents/github/tokens-factory/contracts/token-factory/schema/query_msg.json" …
Created ~/Documents/github/tokens-factory/contracts/token-factory/schema/instantiate_msg.json
Created ~/Documents/github/tokens-factory/contracts/token-factory/schema/execute_msg.json
Created ~/Documents/github/tokens-factory/contracts/token-factory/schema/query_msg.json
>~/Documents/github/tokens-factory/contracts/token-factory$ cargo test
    Finished test [unoptimized + debuginfo] target(s) in 0.02s
     Running unittests (target/debug/deps/token_factory-03f77bf897cd72b7)

running 5 tests
test test::tests::test_instantiate ... ok
test test::tests::test_burn_tokens ... ok
test test::tests::test_mint_token ... ok
test test::tests::test_mint_existent_token ... ok
test test::tests::test_reply_instantiate_event ... ok

test result: ok. 5 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

   Doc-tests token-factory

running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s
```

Modify the property `instantiateMsg` from `terrain.config.json`. In order to know which **token_contract_code_id** to use you can check the file **refs.terrain.json** from workspace's root under the **cw20-token-factory** object:
> /token-factory/terrain.config.json
```Json
{
  "_global": {
    "_base": {
      "instantiation": {
        "instantiateMsg": {
          "stable_denom" : "uusd",
          "token_contract_code_id" : insert your token_contract_id_here (without quotes)
        }
      }
    }
  }, // ...
}
```

To finish the smart contracts lets deploy the token-factory your LocalTerra instance. 
```bash
> ~/Documents/github/tokens-factory$ terrain deploy token-factory --signer test
```

:::{tip}
Remember that you can [clone the repo with all changes done until now](https://github.com/emidev98/token-factory/commit/181192559b9d1b6356dd15812e75bddb5f270162).
:::