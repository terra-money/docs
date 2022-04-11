# Build a CW20 tokens factory  

The scope of this guide is to create a new smart contract and adapt the fronted to be able to read and write data to the previously mentioned smart contract minting and burning CW20 Tokens.

## Prerequisites

Tools that will be used: 
- [Terrain](https://github.com/terra-money/terrain) as development environment, 
- [LocalTerra](https://github.com/terra-money/localterra) as local terra node,
- [Terra Station Desktop](https://docs.terra.money/docs/learn/terra-station/download/terra-station-desktop.html) as wallet to interact with the smart contract locally.

If the tools are not installed in your computer follow the next tutorials to install the tools:
- [Terrain initial setup](https://docs.terra.money/docs/develop/dapp/quick-start/initial-setup.html#initial-setup),
- [Install and run LocalTerra](https://docs.terra.money/docs/develop/dapp/quick-start/using-terrain-localterra.html#install-and-run-localterra),
- [Install the Terra Station Desktop](https://docs.terra.money/docs/learn/terra-station/download/terra-station-desktop.html).

:::{tip}
Import the next passphrase into the Terra Station Desktop [because has funds configured in LocalTerra](https://github.com/terra-money/LocalTerra/blob/main/terracore/mnemonics.json#L9):
notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius
:::

## Overview

This guide will allow you to:
- use terrain to instantiate a new app,
- modify a smart contract to allows minting [CW20 Tokens](https://github.com/CosmWasm/cw-plus/tree/main/packages/cw20),
- store 1 UST per each CW20 Token minted using this contract,
- retrieve each stored UST per each CW20 Token minted using this contract,
- display total amount of UST stored into the smart contract.
- display minted CW20 Tokens with this contract,
- display burned CW20 Tokens with this contract,
- write tests for the smart contract.

# 1.Instantiate and configure a new app 

Assuming the prerequisites are met a new app can be created using the command below:
```sh
> ~/Documents/github$ terrain new tokens-factory
generating: 
- contract... done
- frontend... done
```

The next step is to use an IDE to open the project on my case I will use Code:
```sh
> ~/Documents/github$ cd tokens-factory/

> ~/Documents/github/tokens-factory$ code .
```

Using the terminal a new smart contract should be created like shown below:
```sh
> ~/Documents/github/tokens-factory$ terrain code:new tokens-factory
generating contract... done
```

:::{tip}
Consider deleting the counter smart contract folder to have a clean workspace:
```
> ~/Documents/github/tokens-factory$ cd contracts/
> ~/Documents/github/tokens-factory/contracts$ ls
counter  tokens-factory
> ~/Documents/github/tokens-factory/contracts$ rm -r counter/
```
:::

A new package must be added to the Cargo.toml smart contract we created named [CW20](https://github.com/CosmWasm/cw-plus/tree/main/packages/cw20) under the [dependencies] tag:

```{image} /img/screens/terrain/1.cw20-package.png```

As of last step before testing smart contract deployment, you must find a file keys.terrain.js in the root of the project which contains deployment accounts configured. Replace the file content with the next content which contains the mnemonic for test1 user:

```js
module.exports = {
  custom_tester_1: {
    mnemonic:
      "notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius",
  }
};
```

Lets do a deployment of the new smart contract to validate that LocalTerra is running correctly and the smart contract was created successfully before checking the smart contract architecture that will be used for this guide:

```
> ~/Documents/github/tokens-factory$ terrain deploy tokens-factory --signer custom_tester_1
...
instantiating contract with code id: 10... done
- events:
    - type: from_contract
      attributes:
        - key: contract_address
          value: terra1uul3yzm2lgskp3dxpj0zg558hppxk6ptq7usug
        - key: method
          value: instantiate
        - key: owner
          value: terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v
    - type: instantiate_contract
      attributes:
        - key: creator
          value: terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v
        - key: admin
        - key: code_id
          value: "10"
        - key: contract_address
          value: terra1uul3yzm2lgskp3dxpj0zg558hppxk6ptq7usug
    - type: message
      attributes:
        - key: action
          value: /terra.wasm.v1beta1.MsgInstantiateContract
        - key: module
          value: wasm
        - key: sender
          value: terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v
    - type: wasm
      attributes:
        - key: contract_address
          value: terra1uul3yzm2lgskp3dxpj0zg558hppxk6ptq7usug
        - key: method
          value: instantiate
        - key: owner
          value: terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v
```

# 2.Smart contract initial architecture

Thee goal of this part of the guide is to create basic structure that compiles and in the future points of this guide the functionalities can be added.

## 2.1.Architecture overview

An important step to do at the beginning is to define an architecture where each file/folder represents a specific part of a smart contract so at the end of the project can be easily extendable with new features. This changes will be under the path **tokens-factory/contracts/tokens-factory/src/** that contains smart contract files. The structure will be migrated from:

```js
tokens-factory/contracts/tokens-factory/src>
├── contract.rs
├── error.rs
├── lib.rs
├── msg.rs
└── state.rs
```

to something similar to:

```js
tokens-factory/contracts/tokens-factory/src>
├── contract           // folder containing contract entry points and logic
│   ├── execute.rs     // contains write statements for the project
│   ├── instantiate.rs // entry point of the contract deployment
│   ├── mod.rs
│   └── query.rs       // contains read statements for the project
├── lib.rs             // contains the entry point for rust to know which files to compile
├── models             // folder containing the data structures, implementations and enums
│   ├── error.rs       // errors enum with the data types 
│   ├── execute.rs     // ExecuteMsg enumeration
│   ├── instantiate.rs // InstantiateMsg enumeration
│   ├── mod.rs
│   ├── query.rs       // QueryMsg enumeration
│   └── responses.rs   // Responses to the queries
├── state.rs           // Data with the state of the contract
└── tests              // Tests for the contract
    ├── mod.rs
    └── tests.rs       // file where the tests will be written
```

:::{tip}
If you are not familiar with Rust modules check [this URL](https://doc.rust-lang.org/rust-by-example/mod.html) where you can find an explanation on how modules behave.
:::

## 2.2.Lib and State

This two files are very important because lib.rs contains the entry point of the modules that will be created in the following steps. Regarding state.rs is the file that contains the persisted smart contract information into the state of the blockchain:

**tokens-factory/contracts/tokens-factory/src/state.rs**
```Rust
use cosmwasm_std::{Addr, Uint128};
use cw_storage_plus::Map;
use cw20::{Logo, MarketingInfoResponse};
use crate::models::TokenInfo;

/**
 * Contains each CW20 token standard information where the
 * KEY of the map is the address of the creator of the token and
 * TokenInfo is the data structure that respects the Cw20 standard.
 */
pub const TOKEN_INFO: Map<&Addr, TokenInfo> = Map::new("token_info");

/**
 * Contains each CW20 token marketing information where the
 * KEY of the map is the address of the creator of the token and
 * MarketingInfoResponse is the data structure that respects the CW20 
 * marketing standard implementation.
 */
pub const MARKETING_INFO: Map<&Addr, MarketingInfoResponse> = Map::new("marketing_info");

/**
 * Contains each CW20 token logo information where the
 * KEY of the map is the address of the creator of the token and
 * Logo is the data structure that respects the CW20 logo 
 * standard implementation.
 */
pub const LOGO: Map<&Addr, Logo> = Map::new("logo");

/**
 * Contains each CW20 token balances where
 * Addr is the address of the owner and
 * Uint128 is the amount of coins that address holds
 */
pub const BALANCES: Map<&Addr, Uint128> = Map::new("balance");
```

**tokens-factory/contracts/tokens-factory/src/lib.rs**
```Rust
/**
 * Module containing contract logic like 
 * query, execute and instantiate.
 */
pub mod contract;
/**
 * Module containing the data models and its
 * respective logic e.g. validations for the
 * data model.
 */
pub mod models;
/**
 * Module containing the data that persists in
 * blockchain state when the contract is initialized 
 * or an execute statement is performed.
 */
pub mod state;

/**
 * Tests module contains the code that will be used to 
 * test the smart contract functionalities to enure 
 * it is functioning correctly.
 */
#[cfg(test)]
pub mod tests;
```

## 2.2.Contract 

Inside the contract folder you must have the next files with the content that is listed into the block of code:

**tokens-factory/contracts/tokens-factory/src/contract/mod.rs**
```Rust
/**
 * Module that contains the code which will be 
 * executed only once and its when the smart 
 * contract is deployed to the blockchain
 */
pub mod instantiate;
/**
 * Module used to store all the smart contract calls
 * that modify the blockchain state once the contract
 * is instantiated
 */
pub mod execute;

/**
 * Module which contains the code for read only operations
 * that are executed to the blockchain to be able to read 
 * stored data by the smart contract but do not modify the
 * state of that data in the blockchain.
 */
pub mod query;
```

**tokens-factory/contracts/tokens-factory/src/contract/instantiate.rs**
```Rust
use cosmwasm_std::entry_point;
use cosmwasm_std::{DepsMut, Env, MessageInfo, Response};
use cw2::set_contract_version;
use crate::models::error::ContractError;
use crate::models::instantiate::InstantiateMsg;

// version info for migration info
const CONTRACT_NAME: &str = "crates.io:tokens-factory";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");

/**
 * Method executed only when the smart contract is deployed to 
 * the blockchain.
 */
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    _instantiate_msg: InstantiateMsg
) -> Result<Response, ContractError> {
    set_contract_version(deps.storage, CONTRACT_NAME, CONTRACT_VERSION)?;

    Ok(Response::new()
        .add_attribute("method", "instantiate")
        .add_attribute("owner", info.sender))
}

```

**tokens-factory/contracts/tokens-factory/src/contract/execute.rs**
```Rust
use cosmwasm_std::entry_point;
use cosmwasm_std::{DepsMut, Env, MessageInfo, Response, Addr};
use cw20::{Logo, LogoInfo, MarketingInfoResponse};
use crate::models::{TokenInfo, Token};
use crate::models::error::ContractError;
use crate::models::execute::ExecuteMsg;
use crate::state::{TOKEN_INFO, LOGO, MARKETING_INFO};

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::CreateNewToken {token} => execute_mint_token(deps, info.sender, token),
    }
}

fn execute_mint_token(deps: DepsMut, sender: Addr, token: Token) -> Result<Response, ContractError> {
  

    Ok(Response::new()
        .add_attribute("action", "mint_new_token")
    )
}
```

**tokens-factory/contracts/tokens-factory/src/contract/query.rs**
```Rust
use cosmwasm_std::{entry_point, Addr};
use cosmwasm_std::{Env, Deps, StdResult, Binary, to_binary, Order};
use crate::models::query::{QueryMsg};
use crate::models::responses::TokensResponse;
use crate::state::{TOKEN_INFO};

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetTokens { creator } => to_binary(&query_tokens(deps, creator)?)
    }
}

fn query_tokens(deps: Deps, creator: Option<String>) -> StdResult<TokensResponse> {
    Ok(TokensResponse{ tokens: vec![]})
}
```

## 2.3.Models

Models are data structures which helps to create standard structures and define specific functionalities per each structure.

**tokens-factory/contracts/tokens-factory/src/models/mod.rs**
```Rust
pub mod execute;
pub mod instantiate;
pub mod query;
pub mod error;
pub mod responses;

use cosmwasm_std::{Uint128, Addr};
use cw20::{Logo, MinterResponse, Cw20Coin, EmbeddedLogo};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use self::error::ContractError;

/** 
 * Generic data models that can be used across all the different smart
 * contract calls.
 */

#[derive(Serialize, Deserialize, JsonSchema, Debug, Clone, PartialEq)]
pub struct Token {
    pub name: String,
    pub symbol: String,
    pub decimals: u8,
    pub initial_balance: Cw20Coin,
    pub mint: Option<MinterResponse>,
    pub marketing: Option<TokenMarketingInfo>,
}

#[derive(Serialize, Deserialize, JsonSchema, Debug, Clone, PartialEq)]
pub struct TokenMarketingInfo {
    pub project: Option<String>,
    pub description: Option<String>,
    pub marketing: Option<String>,
    pub logo: Option<Logo>,
}

#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema, Debug, Default)]
#[serde(rename_all = "snake_case")]
pub struct TokenInfo {
    pub name: String,
    pub symbol: String,
    pub decimals: u8,
    pub total_supply: Uint128,
    pub mint: Option<MinterResponse>,
}

#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema, Debug)]
pub struct MinterData {
    pub minter: Addr,
    pub cap: Option<Uint128>,
}

const LOGO_SIZE: usize = 5 * 1024;

impl Token {
    pub fn get_cap(&self) -> Option<Uint128> {
        self.mint.as_ref().and_then(|v| v.cap)
    }

    /**
     * Checks that should be used before each token creation
     * to ensure that stored data into the blockchain state 
     * has a minimum quality.
     */
    pub fn is_valid(&self) -> Result<(), ContractError> {
        if !self.is_valid_name() {
            return Err(ContractError::InvalidCoinName {});
        }
        
        if !self.is_valid_symbol() {
            return Err(ContractError::InvalidCoinSymbol {});
        }

        if self.decimals > 18 {
            return Err(ContractError::InvalidCoinDecimals {});
        }
        
        if let Some(cap) = self.get_cap() {
            if self.initial_balance.amount > cap {
                return Err(ContractError::InitialBalanceBiggerThanCap { });
            }
        }
        
        if let Some(marketing) = self.marketing.clone() {
            if let Some(logo) = marketing.logo {
                Token::verify_logo(&logo)?;
                
            };
        }

        Ok(())
    }

    fn is_valid_name(&self) -> bool {
        let bytes = self.name.as_bytes();
        if bytes.len() < 3 || bytes.len() > 50 {
            return false;
        }
        true
    }
    
    fn is_valid_symbol(&self) -> bool {
        let bytes = self.symbol.as_bytes();
        if bytes.len() < 3 || bytes.len() > 12 {
            return false;
        }
        for byte in bytes.iter() {
            if (*byte != 45) && (*byte < 65 || *byte > 90) && (*byte < 97 || *byte > 122) {
                return false;
            }
        }
        true
    }

    fn verify_logo(logo: &Logo) -> Result<(), ContractError> {
        match logo {
            Logo::Embedded(EmbeddedLogo::Svg(logo)) => Token::verify_xml_logo(&logo),
            Logo::Embedded(EmbeddedLogo::Png(logo)) => Token::verify_png_logo(&logo),
            Logo::Url(_) => Ok(()), // Any reasonable url validation would be regex based, probably not worth it
        }
    }

    /**
     * The easiest way to perform this check would be just match on regex,
     * however regex compilation is heavy and probably not worth it.
     */
    fn verify_xml_logo(data: &[u8]) -> Result<(), ContractError> {
        let preamble = data
            .split_inclusive(|c| *c == b'>')
            .next()
            .ok_or(ContractError::InvalidXml {})?;
    
        const PREFIX: &[u8] = b"<?xml ";
        const POSTFIX: &[u8] = b"?>";
    
        if !(preamble.starts_with(PREFIX) && preamble.ends_with(POSTFIX)) {
            return Err(ContractError::InvalidXml { })
        }
        if data.len() > LOGO_SIZE {
            return Err(ContractError::LogoTooBig { })
        } else {
            Ok(())
        }
    }
    
    /**
     * PNG header format:
     * 0x89 - magic byte, out of ASCII table to fail on 7-bit systems
     * "PNG" ascii representation
     * [0x0d, 0x0a] - dos style line ending
     * 0x1a - dos control character, stop displaying rest of the file
     * 0x0a - unix style line ending
     */
    fn verify_png_logo(logo: &[u8]) -> Result<(), ContractError> {
        const HEADER: [u8; 8] = [0x89, b'P', b'N', b'G', 0x0d, 0x0a, 0x1a, 0x0a];
        if logo.len() > LOGO_SIZE {
            Err(ContractError::LogoTooBig {})
        } else if !logo.starts_with(&HEADER) {
            Err(ContractError::InvalidPng {})
        } else {
            Ok(())
        }
    }
}
```

**tokens-factory/contracts/tokens-factory/src/models/instantiate.rs**
```Rust
use schemars::JsonSchema;
use serde::{Serialize, Deserialize};

/**
 * Message send to the blockchain when the contract is 
 * instantiated for the first time, this can contain 
 * every data that is needed in order to do the contract
 * interaction for the first time e.g. set the owner.
 */
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub struct InstantiateMsg {  }
```

**tokens-factory/contracts/tokens-factory/src/models/execute.rs**
```Rust
use schemars::JsonSchema;
use serde::{Serialize, Deserialize};
use super::Token;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    /**
     * CreateNewToken will create a new CW20 token assigning
     * the token to a Map where the smart contract can track 
     * every single token created thru this execute call.
     */
    CreateNewToken {
        token: Token
    }
}
```

**tokens-factory/contracts/tokens-factory/src/models/query.rs**
```Rust
use schemars::JsonSchema;
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    /**
     * GetTokens will return all tokens created by this smart contract.
     * The method also accepts a creator which is the address of the 
     * creator oft he token.
     */
    GetTokens { creator: Option<String> },
}
```

**tokens-factory/contracts/tokens-factory/src/models/responses.rs**
```Rust
use schemars::JsonSchema;
use serde::{Serialize, Deserialize};
use super::TokenInfo;

/**
 * Data model used to return the list of Tokens when requested
 * thru different queries
 */
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct TokensResponse {
    pub tokens : Vec<TokenInfo>
}
```

**tokens-factory/contracts/tokens-factory/src/models/error.rs**
```Rust
use cosmwasm_std::StdError;
use thiserror::Error;

/**
 * Possibles custom errors that smart contract can 
 * send to the frontend each time an interaction with
 * it is not done in the expected way. As you can see
 * the error codes does not have an extensive description
 * because is better that the description is stored into
 * the frontend, that way we save some gas fees on deployments.
 */
#[derive(Error, Debug)]
pub enum ContractError {
    #[error("{0}")]
    Std(#[from] StdError),

    #[error("Unauthorized")]
    Unauthorized {},

    #[error("InvalidCoinName")]
    InvalidCoinName { },

    #[error("InvalidCoinSymbol")]
    InvalidCoinSymbol { },

    #[error("InvalidCoinDecimals")]
    InvalidCoinDecimals { },

    #[error("InitialBalanceBiggerThanCap")]
    InitialBalanceBiggerThanCap { },

    #[error("LogoTooBig")]
    LogoTooBig { },

    #[error("InvalidXml")]
    InvalidXml { },

    #[error("InvalidPng")]
    InvalidPng { },
}
```

## 2.3.Tests

Probably one of the most important parts of our smart contract is not a functionality itself but the testing module because it will help to detect issues that can save a lot of time, deployments and extensive testing.


**tokens-factory/contracts/tokens-factory/src/models/mod.rs**
```Rust
pub mod tests;
```

**tokens-factory/contracts/tokens-factory/src/models/tests.rs**
```Rust
use cosmwasm_std::{Uint128, from_binary};
use cosmwasm_std::testing::{mock_dependencies, mock_env, mock_info};
use cw20::{Cw20Coin, MinterResponse};
use crate::contract::execute::execute;
use crate::contract::instantiate::instantiate;
use crate::contract::query::query;
use crate::models::Token;
use crate::models::responses::TokensResponse;
use crate::models::execute::ExecuteMsg;
use crate::models::instantiate::InstantiateMsg;
use crate::models::query::QueryMsg;


#[test]
fn test_instantiate() {
    // GIVEN
    let mut deps = mock_dependencies(&[]);
    let info = mock_info("creator", &[]);
    let env = mock_env();
    
    // WHEN
    let res = instantiate(deps.as_mut(), env, info, InstantiateMsg{}).unwrap();
    
    // THEN
    assert_eq!(2, res.attributes.len());
    assert_eq!("instantiate", res.attributes.get(0).unwrap().value);
    assert_eq!("creator", res.attributes.get(1).unwrap().value);
}
```


:::{tip}
You should try to compile and deploy the smart contract to LocalTerra to confirm that all the steps are working as expected. In case that the smart contract does not compile you can clone [this version from GitHub](https://github.com/emidev98/tokens-factory/commit/139f884926620988d2e6b40498d23534ab4e21d8) which is developed to this same point:
```
> git clone -n https://github.com/emidev98/tokens-factory
> cd tokens-factory
> git checkout 139f884926620988d2e6b40498d23534ab4e21d8
```
:::

# 3.Create and query token

As of the first functionality of the smart contract the users must be able to create a token with the function from execute.rs defined below: 

**tokens-factory/contracts/tokens-factory/src/models/execute.rs**
```Rust
fn execute_mint_token(deps: DepsMut, sender: Addr, token: Token) -> Result<Response, ContractError> {
    /* Check token data validity like name, symbol, decimals, cap, 
     marketing data... If the token is not compliant with standards
     defined by the smart contract an error will be raised which
     will block the token creation 
     */
    token.is_valid()?;

    // ... else a data model is created...
    let data = TokenInfo {
        name: token.name,
        symbol: token.symbol,
        decimals: token.decimals,
        total_supply: token.initial_balance.amount,
        mint: token.mint,
    };

    // ... and stored into blockchain state.
    TOKEN_INFO.save(deps.storage, &sender, &data)?;

    // Furthermore is important to check if marketing data is available...
    if let Some(marketing) = token.marketing {
        let logo = if let Some(logo) = marketing.logo {
            LOGO.save(deps.storage, &sender, &logo)?;

            // ... e.g. logo available ...
            match logo {
                Logo::Url(url) => Some(LogoInfo::Url(url)),
                Logo::Embedded(_) => Some(LogoInfo::Embedded),
            }
        } else {
            None
        };
        
        // .. afterwords create the respective that model that ...
        let data = MarketingInfoResponse {
            project: marketing.project,
            description: marketing.description,
            marketing: Some(sender.clone()),
            logo,
        };

        // ... will be stored into the blockchain.
        MARKETING_INFO.save(deps.storage, &sender, &data)?;
    }

    // if everything went well an Ok will be returned to the frontend.
    Ok(Response::new()
        .add_attribute("action", "mint_new_token")
    )
}
```

Another important functionality is to be able to retrieve all tokens created by the previous function. To do that the file that will need to be modified is query.rs: 

**tokens-factory/contracts/tokens-factory/src/models/execute.rs**
```Rust
fn query_tokens(deps: Deps, creator: Option<String>) -> StdResult<TokensResponse> {
    /* First check that will be performed is to validate if 
    a creator exists...*/
    let creator_address : Option<Addr> = match creator {
        None => None,
        Some(addr) => {
            // ... if the creator exists validate it's address.
            match deps.api.addr_validate(&addr) {
                Err(err) => return Err(err),
                Ok(addr) => Some(addr)
            }
        },
    };

    /* Matching the validated creator is important to be able to load 
    the token minted by that creator...*/
    match creator_address {
        Some(address) => {
            let token = TOKEN_INFO.load(deps.storage,&address)?;

            /* "¿Why do we transform it to a vector?
                Because of data consistency, no matters if is only one 
                or multiple items frontend can expect reading an array 
                which will reduce the implementation (and cognitive) complexity"*/
            return Ok(TokensResponse{tokens: vec![token]});
        },
        None => {
            // ... if the creator does not exist load all tokens... 
            let tokens_map = TOKEN_INFO
                .range(deps.storage, None, None, Order::Ascending)
                .collect::<Vec<_>>();
            // ... transform the tokens to a vector...
            let tokens_list = tokens_map
                .into_iter()
                .map(|t|t.unwrap_or_default().1)
                .collect();
            
            // ... return the vectors of TokenInformation
            return Ok(TokensResponse{tokens: tokens_list});
        }
    }
}
```

Having the below functionalities implemented is important but is also as important (if not more) as the feature to have the tests:

**tokens-factory/contracts/tokens-factory/src/tests/tests.rs**
```Rust
#[test]
fn test_mint_token() {
    // GIVEN
    let mut deps = mock_dependencies(&[]);
    let info = mock_info("creator", &[]);
    let env = mock_env();
    let mint_new_token = ExecuteMsg::CreateNewToken {
        token: Token {
            name: "Fancy Money".to_string(),
            symbol: "FAM".to_string(),
            decimals: 2,
            initial_balance: Cw20Coin {
                address: "creator".to_string(),
                amount : Uint128::new(123),
            },
            mint: Some(MinterResponse {
                minter: "creator".to_string(),
                cap: Some(Uint128::new(1234))
            }),
            marketing: None,
        }
    };
    
    // WHEN
    instantiate(deps.as_mut(), env.clone(), info.clone(),InstantiateMsg{}).unwrap();
    let res = execute(deps.as_mut(), env, info, mint_new_token).unwrap();
    
    // THEN
    assert_eq!(1, res.attributes.len());
    assert_eq!("mint_new_token", res.attributes.get(0).unwrap().value);
}

#[test]
fn test_query_token() {
    // GIVEN
    let mut deps = mock_dependencies(&[]);
    let info = mock_info("creator", &[]);
    let env = mock_env();
    let mint_new_token_msg = ExecuteMsg::CreateNewToken {
        token: Token {
            name: "Fancy Money".to_string(),
            symbol: "FAM".to_string(),
            decimals: 2,
            initial_balance: Cw20Coin {
                address: "creator".to_string(),
                amount : Uint128::new(123),
            },
            mint: Some(MinterResponse {
                minter: "creator".to_string(),
                cap: Some(Uint128::new(1234))
            }),
            marketing: None,
        }
    };
    let get_tokens_query = QueryMsg::GetTokens { creator: None };

    // WHEN
    instantiate(deps.as_mut(), env.clone(), info.clone(),InstantiateMsg{}).unwrap();
    execute(deps.as_mut(), env.clone(), info, mint_new_token_msg).unwrap();
    let res = query(deps.as_ref(), env, get_tokens_query).unwrap();
    let res: TokensResponse = from_binary(&res).unwrap();
    
    // THEN
    assert_eq!(1, res.tokens.len());

    let token  = res.tokens.get(0).unwrap();
    assert_eq!("Fancy Money", token.name);
    assert_eq!("FAM", token.symbol);
    assert_eq!(2, token.decimals);
    
}
```

:::{tip}
To execute the tests you must use `cargo test` inside the `contracts/token-factory/` folder. The tests will not be documented that way you can [check the Rust official documentation](https://doc.rust-lang.org/book/ch11-01-writing-tests.html) to get to understand perfectly every single aspect of them.
:::