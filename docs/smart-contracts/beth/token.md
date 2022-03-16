# Token

The Token contract is a modified implementation of the CW20 base, refitted to consider for bETH reward accruals.

Details on the CW20 specification can be found [here](https://github.com/CosmWasm/cosmwasm-plus/blob/main/packages/cw20/README.md).

## Contract State

### `TokenInfo`

Stores information about the bETH token.

```rust
#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema, Debug)]
#[serde(rename_all = "snake_case")]
pub struct TokenInfo {
    pub name: String,
    pub symbol: String,
    pub decimals: u8,
    pub total_supply: Uint128,
    pub mint: Option<MinterData>,
}
```

| Key            | Type       | Description                 |
| -------------- | ---------- | --------------------------- |
| `name`         | String     | Name of bETH token          |
| `symbol`       | String     | Symbol of bETH token        |
| `decimals`     | u8         | Number of decimals of bETH  |
| `total_supply` | Uint128    | Total minted supply of bETH |
| `mint`\*       | MinterData | Minter information of bETH  |

\* = not stored until value registered

### `MinterData`

Store information about the bETH minter.

```rust
#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema, Debug)]
pub struct MinterData {
    pub minter: Addr,
    pub cap: Option<Uint128>,
}
```

| Key      | Type    | Description                       |
| -------- | ------- | --------------------------------- |
| `minter` | Addr    | Address of minter                 |
| `cap`\*  | Uint128 | Maximum number of mintable tokens |

\* = not stored until value registered

## InstantiateMsg

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, JsonSchema)]
pub struct TokenInstantiateMsg {
    pub name: String,
    pub symbol: String,
    pub decimals: u8,
    pub initial_balances: Vec<Cw20CoinHuman>,
    pub mint: Option<MinterResponse>,
    pub reward_contract: String,
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "name": "Bonded ETH", 
  "symbol": "BETH", 
  "decimals": 6, 
  "total_supply": "100000000", 
  "mint": {
    "minter": "terra1...", 
    "cap": "1000000000" 
  }, 
  "reward_contract": "terra1..." 
}
```
{% endtab %}
{% endtabs %}

| Key               | Type           | Description                     |
| ----------------- | -------------- | ------------------------------- |
| `name`            | String         | Name of bETH token              |
| `symbol`          | String         | Symbol of bETH token            |
| `decimals`        | u8             | Number of decimals of bETH      |
| `total_supply`    | Uint128        | Total minted supply of bETH     |
| `mint`\*          | MinterResponse | Minter information of bETH      |
| `reward_contract` | String         | Contract address of bETH Reward |

\* = optional

## ExecuteMsg

### `Transfer`

Transfers tokens to the specified address.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum Cw20ExecuteMsg {
    Transfer {
        recipient: String, 
        amount: Uint128, 
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "transfer": {
    "recipient": "terra1...", 
    "amount": "100000000" 
  }
}
```
{% endtab %}
{% endtabs %}

| Key         | Type    | Description                         |
| ----------- | ------- | ----------------------------------- |
| `recipient` | String  | Recipient address of token transfer |
| `amount`    | Uint128 | Amount of tokens to transfer        |

### `Burn`

Burns the specified amount of tokens.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum Cw20ExecuteMsg {
    Burn {
        amount: Uint128, 
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "burn": {
    "amount": "100000000" 
  }
}
```
{% endtab %}
{% endtabs %}

| Key      | Type    | Description              |
| -------- | ------- | ------------------------ |
| `amount` | Uint128 | Amount of tokens to burn |

### `Send`

Sends tokens to the specified contract address along with a message.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum Cw20ExecuteMsg {
    Send {
        contract: String, 
        amount: Uint128, 
        msg: Binary, 
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "send": {
    "contract": "terra1...", 
    "amount": "100000000", 
    "msg": "eyAiZXhlY3V0ZV9tc2ciOiAiYmluYXJ5IiB9"
  }
}
```
{% endtab %}
{% endtabs %}

| Key        | Type    | Description                                 |
| ---------- | ------- | ------------------------------------------- |
| `contract` | String  | Contract address to send tokens to          |
| `amount`   | Uint128 | Amount of tokens to send                    |
| `msg`      | Binary  | Base64-encoded JSON of receive hook message |

### Mint

Mints tokens to the specified address. Can only be issued by the minter.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum Cw20ExecuteMsg {
    Mint {
        recipient: String, 
        amount: Uint128, 
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "mint": {
    "recipient": "terra1...", 
    "amount": "100000000" 
  }
}
```
{% endtab %}
{% endtabs %}

| Key         | Type    | Description               |
| ----------- | ------- | ------------------------- |
| `recipient` | String  | Address to mint tokens to |
| `amount`    | Uint128 | Amount of tokens to mint  |

### `IncreaseAllowance`

Increases allowance for the specified spender address.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum Cw20ExecuteMsg {
    IncreaseAllowance {
        spender: String, 
        amount: Uint128, 
        expires: Option<Expiration>, 
    }
}

#[derive(Serialize, Deserialize, Clone, Copy, PartialEq, JsonSchema, Debug)]
#[serde(rename_all = "snake_case")]
pub enum Expiration {
    AtHeight(u64), 
    AtTime(Timestamp), 
    Never {}, 
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "increase_allowance": {
    "spender": "terra1...", 
    "amount": "100000000", 
    "expires": {
      "at_height": 123123,
      // or
      "at_time": 123123,
      // or
      "never": {} 
    }
  }
}
```
{% endtab %}
{% endtabs %}

| Key         | Type       | Description                                        |
| ----------- | ---------- | -------------------------------------------------- |
| `spender`   | String     | Address of spender                                 |
| `amount`    | Uint128    | Amount of tokens to increase allowance for spender |
| `expires`\* | Expiration | Information on when this allowance expires         |

\* = optional

| Key        | Type      | Description                                    |
| ---------- | --------- | ---------------------------------------------- |
| `AtHeight` | u64       | Allowance expires at specified block height    |
| `AtTime`   | Timestamp | Allowance expires at specified block timestamp |
| `Never`    | nil       | Allowance never expires                        |

### `DecreaseAllowance`

Decreases allowance for the specified spender address.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum Cw20ExecuteMsg {
    DecreaseAllowance {
        spender: String, 
        amount: Uint128, 
        expires: Option<Expiration>, 
    }
}

#[derive(Serialize, Deserialize, Clone, Copy, PartialEq, JsonSchema, Debug)]
#[serde(rename_all = "snake_case")]
pub enum Expiration {
    AtHeight(u64), 
    AtTime(Timestamp), 
    Never {}, 
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "decrease_allowance": {
    "spender": "terra1...", 
    "amount": "100000000", 
    "expires": {
      "at_height": 123123,
      // or
      "at_time": 123123,
      // or
      "never": {} 
    }
  }
}
```
{% endtab %}
{% endtabs %}

| Key         | Type       | Description                                        |
| ----------- | ---------- | -------------------------------------------------- |
| `spender`   | String     | Address of spender                                 |
| `amount`    | Uint128    | Amount of tokens to decrease allowance for spender |
| `expires`\* | Expiration | Information on when this allowance expires         |

| Key        | Type      | Description                                    |
| ---------- | --------- | ---------------------------------------------- |
| `AtHeight` | u64       | Allowance expires at specified block height    |
| `AtTime`   | Timestamp | Allowance expires at specified block timestamp |
| `Never`    | nil       | Allowance never expires                        |

### `TransferFrom`

Transfers tokens from the specified owner to the specified recipient. Requires unexpired allowance to be set beforehand.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum Cw20ExecuteMsg {
    TransferFrom {
        owner: String, 
        recipient: String, 
        amount: Uint128, 
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "transfer_from": {
    "owner": "terra1...", 
    "recipient": "terra1...", 
    "amount": "100000000" 
  }
}
```
{% endtab %}
{% endtabs %}

| Key         | Type    | Description                     |
| ----------- | ------- | ------------------------------- |
| `owner`     | String  | Address to transfer tokens from |
| `recipient` | String  | Address to transfer tokens to   |
| `amount`    | Uint128 | Amount of tokens to transfer    |

### `SendFrom`

Sends tokens from the specified owner to the specified contract, along with a message. Requires unexpired allowance to be set beforehand.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum Cw20ExecuteMsg {
    SendFrom {
        owner: String, 
        contract: String, 
        amount: Uint128, 
        msg: Binary, 
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "send_from": {
    "owner": "terra1...", 
    "contract": "terra1...", 
    "amount": "100000000", 
    "msg": "eyAiZXhlY3V0ZV9tc2ciOiAiYmluYXJ5IiB9", 
  }
}
```
{% endtab %}
{% endtabs %}

| Key        | Type    | Description                             |
| ---------- | ------- | --------------------------------------- |
| `owner`    | String  | Address to send tokens from             |
| `contract` | String  | Address to send tokens to               |
| `amount`   | Uint128 | Amount of tokens to send                |
| `msg`      | Binary  | Base64-encoded JSON of receive hook msg |

### `BurnFrom`

Burns tokens from the specified owner. Requires unexpired allowance to be set beforehand.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum Cw20ExecuteMsg {
    BurnFrom {
        owner: String, 
        amount: Uint128, 
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "burn_from": {
    "owner": "terra1...", 
    "amount": "100000000" 
  }
}
```
{% endtab %}
{% endtabs %}

| Key      | Type    | Description                 |
| -------- | ------- | --------------------------- |
| `owner`  | String  | Address to burn tokens from |
| `amount` | Uint128 | Amount of tokens to burn    |

## QueryMsg

### `Balance`

Gets the balance for the specified address.

{% tabs %}
{% tab title="Rust" %}
#### Request

```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum Cw20QueryMsg {
    Balance {
        address: String, 
    }
}
```

| Key       | Type   | Description                      |
| --------- | ------ | -------------------------------- |
| `address` | String | Address of holder to get balance |

#### Response

```rust
#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema, Debug)]
pub struct BalanceResponse {
    pub balance: Uint128,
}
```

| Key       | Type    | Description             |
| --------- | ------- | ----------------------- |
| `balance` | Uint128 | Amount of token balance |
{% endtab %}

{% tab title="JSON" %}
#### Request

```rust
{
  "balance": {
    "address": "terra1..." 
  }
}
```

| Key       | Type   | Description                      |
| --------- | ------ | -------------------------------- |
| `address` | String | Address of holder to get balance |

#### Response

```rust
{
  "balance": "100000000" 
}
```

| Key       | Type    | Description             |
| --------- | ------- | ----------------------- |
| `balance` | Uint128 | Amount of token balance |
{% endtab %}
{% endtabs %}

### `TokenInfo`

Gets information for the token.

{% tabs %}
{% tab title="Rust" %}
#### Request

```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum Cw20QueryMsg {
    TokenInfo {}
}
```

| Key | Type | Description |
| --- | ---- | ----------- |
|     |      |             |

#### Response

```rust
#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema, Debug)]
pub struct TokenInfoResponse {
    pub name: String,
    pub symbol: String,
    pub decimals: u8,
    pub total_supply: Uint128,
}
```

| Key            | Type    | Description                  |
| -------------- | ------- | ---------------------------- |
| `name`         | String  | Name of token                |
| `symbol`       | String  | Symbol of token              |
| `decimals`     | u8      | Number of decimals of token  |
| `total_supply` | Uint128 | Total minted supply of token |
{% endtab %}

{% tab title="JSON" %}
#### Request

```javascript
{
  "token_info": {}
}
```

| Key | Type | Description |
| --- | ---- | ----------- |
|     |      |             |

#### Response

```javascript
{
  "name": "Bonded ETH", 
  "symbol": "BETH", 
  "decimals": 6, 
  "total_supply": "1000000000" 
}
```

| Key            | Type    | Description                  |
| -------------- | ------- | ---------------------------- |
| `name`         | String  | Name of token                |
| `symbol`       | String  | Symbol of token              |
| `decimals`     | u8      | Number of decimals of token  |
| `total_supply` | Uint128 | Total minted supply of token |
{% endtab %}
{% endtabs %}

### `Minter`

Gets information for the token minter.

{% tabs %}
{% tab title="Rust" %}
#### Request

```rust
#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema, Debug)]
#[serde(rename_all = "snake_case")]
pub enum Cw20QueryMsg {
    Minter {}
}
```

| Key | Type | Description |
| --- | ---- | ----------- |
|     |      |             |

#### Response

```rust
#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema, Debug)]
pub struct MinterResponse {
    pub minter: String,
    pub cap: Option<Uint128>,
}
```

| Key      | Type    | Description                       |
| -------- | ------- | --------------------------------- |
| `minter` | String  | Address of token minter           |
| `cap`\*  | Uint128 | Maximum number of mintable tokens |
{% endtab %}

{% tab title="JSON" %}
#### Request

```rust
{
  "minter": {}
}
```

| Key | Type | Description |
| --- | ---- | ----------- |
|     |      |             |

#### Response

```rust
{
  "minter": "terra1...", 
  "cap": "1000000000" 
}
```

| Key      | Type    | Description                       |
| -------- | ------- | --------------------------------- |
| `minter` | String  | Address of token minter           |
| `cap`\*  | Uint128 | Maximum number of mintable tokens |
{% endtab %}
{% endtabs %}

### `Allowance`

Gets allowance information for the specified owner and spender.

{% tabs %}
{% tab title="Rust" %}
#### Request

```rust
#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema, Debug)]
#[serde(rename_all = "snake_case")]
pub enum Cw20QueryMsg {
    Allowance {
        owner: String, 
        spender: String, 
    }
}
```

| Key       | Type   | Description        |
| --------- | ------ | ------------------ |
| `owner`   | String | Address of owner   |
| `spender` | String | Address of spender |

#### Response

```rust
#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema, Debug, Default)]
pub struct AllowanceResponse {
    pub allowance: Uint128,
    pub expires: Expiration,
}

#[derive(Serialize, Deserialize, Clone, Copy, PartialEq, JsonSchema, Debug)]
#[serde(rename_all = "snake_case")]
pub enum Expiration {
    AtHeight(u64), 
    AtTime(Timestamp), 
    Never {}, 
}
```

| Key         | Type       | Description                                          |
| ----------- | ---------- | ---------------------------------------------------- |
| `allowance` | String     | Amount of owner's tokens spender is allowed to spend |
| `expires`   | Expiration | Information on when this allowance expires           |

| Key        | Type      | Description                                    |
| ---------- | --------- | ---------------------------------------------- |
| `AtHeight` | u64       | Allowance expires at specified block height    |
| `AtTime`   | Timestamp | Allowance expires at specified block timestamp |
| `Never`    | nil       | Allowance never expires                        |
{% endtab %}

{% tab title="JSON" %}
#### Request

```rust
{
  "allowance": {
    "owner": "terra1...", 
    "spender": "terra1..." 
  }
}
```

| Key       | Type   | Description        |
| --------- | ------ | ------------------ |
| `owner`   | String | Address of owner   |
| `spender` | String | Address of spender |

#### Response

```rust
{
  "allowance": "100000000", 
  "expires": {
    "at_height": 123123,
    // or
    "at_time": 123123,
    // or
    "never": {} 
  }
}
```

| Key         | Type       | Description                                          |
| ----------- | ---------- | ---------------------------------------------------- |
| `allowance` | String     | Amount of owner's tokens spender is allowed to spend |
| `expires`   | Expiration | Information on when this allowance expires           |

| Key        | Type      | Description                                    |
| ---------- | --------- | ---------------------------------------------- |
| `AtHeight` | u64       | Allowance expires at specified block height    |
| `AtTime`   | Timestamp | Allowance expires at specified block timestamp |
| `Never`    | nil       | Allowance never expires                        |
{% endtab %}
{% endtabs %}

### `AllAllowances`

Gets all allowance information for the specified owner.

{% tabs %}
{% tab title="Rust" %}
#### Request

```rust
#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema, Debug)]
#[serde(rename_all = "snake_case")]
pub enum Cw20QueryMsg {
    AllAllowances {
        owner: String, 
        start_after: Option<String>, 
        limit: Option<u32>, 
    }
}
```

| Key             | Type   | Description                       |
| --------------- | ------ | --------------------------------- |
| `owner`         | String | Address of owner                  |
| `start_after`\* | String | Address of spender to start query |
| `limit`\*       | u32    | Maximum number of query entries   |

\* = optional

#### Response

```rust
#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema, Debug, Default)]
pub struct AllAllowancesResponse {
    pub allowances: Vec<AllowanceInfo>,
}

#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema, Debug)]
pub struct AllowanceInfo {
    pub spender: String,
    pub allowance: Uint128,
    pub expires: Expiration,
}

#[derive(Serialize, Deserialize, Clone, Copy, PartialEq, JsonSchema, Debug)]
#[serde(rename_all = "snake_case")]
pub enum Expiration {
    AtHeight(u64), 
    AtTime(Timestamp), 
    Never {}, 
}
```

| Key          | Type                | Description                   |
| ------------ | ------------------- | ----------------------------- |
| `allowances` | Vec\<AllowanceInfo> | List of allowance information |

| Key         | Type       | Description                                          |
| ----------- | ---------- | ---------------------------------------------------- |
| `spender`   | String     | Address of spender                                   |
| `allowance` | String     | Amount of owner's tokens spender is allowed to spend |
| `expires`   | Expiration | Information on when this allowance expires           |

| Key        | Type      | Description                                    |
| ---------- | --------- | ---------------------------------------------- |
| `AtHeight` | u64       | Allowance expires at specified block height    |
| `AtTime`   | Timestamp | Allowance expires at specified block timestamp |
| `Never`    | nil       | Allowance never expires                        |
{% endtab %}

{% tab title="JSON" %}
#### Request

```rust
{
  "all_allowances": {
    "owner": "terra1...", 
    "start_from": "terra1...", 
    "limit": 10
  }
}
```

| Key            | Type   | Description                       |
| -------------- | ------ | --------------------------------- |
| `owner`        | String | Address of owner                  |
| `start_from`\* | String | Address of spender to start query |
| `limit`\*      | u32    | Maximum number of query entries   |

\* = optional

#### Response

```rust
{
  "allowances": [
    {
      "spender": "terra1...", 
      "allowance": "100000000", 
      "expires": {
        "at_height": 123123,
        // or
        "at_time": 123123,
        // or
        "never": {} 
      }
    }, 
    {
      "spender": "terra1...", 
      "allowance": "100000000", 
      "expires": {
        "at_height": 123123,
        // or
        "at_time": 123123,
        // or
        "never": {} 
      }
    }, 
  ]
}
```

| Key          | Type                | Description                   |
| ------------ | ------------------- | ----------------------------- |
| `allowances` | Vec\<AllowanceInfo> | List of allowance information |

| Key         | Type       | Description                                          |
| ----------- | ---------- | ---------------------------------------------------- |
| `spender`   | String     | Address of spender                                   |
| `allowance` | String     | Amount of owner's tokens spender is allowed to spend |
| `expires`   | Expiration | Information on when this allowance expires           |

| Key        | Type      | Description                                    |
| ---------- | --------- | ---------------------------------------------- |
| `AtHeight` | u64       | Allowance expires at specified block height    |
| `AtTime`   | Timestamp | Allowance expires at specified block timestamp |
| `Never`    | nil       | Allowance never expires                        |
{% endtab %}
{% endtabs %}

### `AllAccounts`

Gets account information for all holders.

{% tabs %}
{% tab title="Rust" %}
#### Request

```rust
#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema, Debug)]
#[serde(rename_all = "snake_case")]
pub enum Cw20QueryMsg {
    AllAccounts {
        start_after: Option<String>, 
        limit: Option<u32>, 
    }
}
```

| Key             | Type   | Description                      |
| --------------- | ------ | -------------------------------- |
| `start_after`\* | String | Address of holder to start query |
| `limit`\*       | u32    | Maximum number of query entries  |

\* = optional

#### Response

```rust
#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema, Debug, Default)]
pub struct AllAccountsResponse {
    pub accounts: Vec<String>,
}
```

| Key        | Type         | Description              |
| ---------- | ------------ | ------------------------ |
| `accounts` | Vec\<String> | List of holder addresses |
{% endtab %}

{% tab title="JSON" %}
#### Request

```rust
{
  "all_accounts": {
    "start_after": "terra1...", 
    "limit": 8 
  }
}
```

| Key             | Type   | Description                      |
| --------------- | ------ | -------------------------------- |
| `start_after`\* | String | Address of holder to start query |
| `limit`\*       | u32    | Maximum number of query entries  |

\* = optional

#### Response

```rust
{
  "accounts": [
    "terra1...", 
    "terra1...", 
    "terra1..." 
  ]
}
```

| Key        | Type         | Description              |
| ---------- | ------------ | ------------------------ |
| `accounts` | Vec\<String> | List of holder addresses |
{% endtab %}
{% endtabs %}
