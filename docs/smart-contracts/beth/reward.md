# Reward

The Reward contract handles the distribution of Ethereum 2.0 staking rewards to holders of CW20 bETH. Ethereum 2.0 staking rewards (which are first converted to TerraUSD via Ethereum AMM protocols) are transferred over to the Reward contract, which are subsequently distributed to holders of bETH. bETH holders can send a request to this contract to claim their accrued rewards.

The Reward contract also stores the balance and reward index values for all bETH holders, which is used to calculate the amount of bETH rewards that a specific holder has accrued.

## Contract State

### Config

Stores information about the contract configuration.

```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Config {
    pub owner: CanonicalAddr,
    pub token_contract: Option<CanonicalAddr>,
    pub reward_denom: String,
}
```

| Key                | Type          | Description                                            |
| ------------------ | ------------- | ------------------------------------------------------ |
| `owner`            | CanonicalAddr | Address of contract owner                              |
| `token_contract`\* | CanonicalAddr | Contract address of bETH Token                         |
| `reward_denom`     | String        | Native token denomination for distributed bETH rewards |

\* = not stored until value registered

### State

Stores information about the contract state.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct State {
    pub global_index: Decimal,
    pub total_balance: Uint128,
    pub prev_reward_balance: Uint128,
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "global_index": "123.456789", 
  "total_balance": "123.456789", 
  "prev_reward_balance": "123.456789" 
}
```
{% endtab %}
{% endtabs %}

| Key                   | Type    | Description                                                                 |
| --------------------- | ------- | --------------------------------------------------------------------------- |
| `global_index`        | Decimal | Current global reward index of bETH                                         |
| `total_balance`       | Uint128 | Total bETH balance of all holders                                           |
| `prev_reward_balance` | Uint128 | TerraUSD balance of Reward contract at the time of last global index update |

### Holder

Stores information for a specific bETH holder.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Holder {
    pub balance: Uint128,
    pub index: Decimal,
    pub pending_rewards: Decimal,
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "balance": "100000000", 
  "index": "123.456789", 
  "pending_rewards": "123.456789" 
}
```
{% endtab %}
{% endtabs %}

| Key               | Type    | Description                        |
| ----------------- | ------- | ---------------------------------- |
| `balance`         | Uint128 | bETH balance of holder             |
| `index`           | Decimal | Holder's reward index value        |
| `pending_rewards` | Decimal | Amount of holder's pending rewards |

## InstantiateMsg

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct InstantiateMsg {
    pub owner: String, 
    pub reward_denom: String, 
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "owner": "terra1...", 
  "reward_denom": "uusd" 
}
```
{% endtab %}
{% endtabs %}

| Key            | Type   | Description                                            |
| -------------- | ------ | ------------------------------------------------------ |
| `owner`        | String | Address of contract owner                              |
| `reward_denom` | String | Native token denomination for distributed bETH rewards |

## ExecuteMsg

### `PostInitialize`

Registers the bETH Token contract address.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    PostInitialize {
        token_contract: String, 
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "post_initialize": {
    "token_contract": "terra1..." 
  }
}
```
{% endtab %}
{% endtabs %}

| Key              | Type   | Description           |
| ---------------- | ------ | --------------------- |
| `token_contract` | String | Address of bETH Token |

### `UpdateConfig`

Updates the Reward contract configuration.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    UpdateConfig {
        owner: String, 
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "update_config": {
    "owner": "terra1..." 
  }
}
```
{% endtab %}
{% endtabs %}

| Key     | Type   | Description          |
| ------- | ------ | -------------------- |
| `owner` | String | Address of new owner |

### `ClaimRewards`

Claims bETH holder's accrued rewards to the specified address. Sends rewards to message sender if the `recipient` is not specified.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    ClaimRewards {
        recipient: Option<String>, 
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "claim_rewards": {
    "recipient": "terra1..." 
  }
}
```
{% endtab %}
{% endtabs %}

| Key           | Type   | Description                               |
| ------------- | ------ | ----------------------------------------- |
| `recipient`\* | String | Recipient address of claimed bETH rewards |

\* = optional

### ~~`[Internal] IncreaseBalance`~~

Increases stored user's bETH balance. Stores user's accrued rewards to pending rewards and updates user's reward index to the current global reward index. Can only be issued by `Token`.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    IncreaseBalance {
        address: String, 
        amount: Uint128,  
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "increase_balance": {
    "address": "terra1...", 
    "amount": "100000000" 
  }
}
```
{% endtab %}
{% endtabs %}

| Key       | Type    | Description                                 |
| --------- | ------- | ------------------------------------------- |
| `address` | String  | Address of user whose balance has increased |
| `amount`  | Uint128 | Amount of bETH balance increased            |

### `[Internal] DecreaseBalance`

Decreases stored user's bETH balance. Stores user's accrued rewards to pending rewards and updates user's reward index to the current global reward index. Can only be issued by`Token`.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    DecreaseBalance {
        address: String, 
        amount: Uint128, 
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "decrease_balance": {
    "address": "terra1...", 
    "amount": "100000000" 
  }
}
```
{% endtab %}
{% endtabs %}

| Key       | Type    | Description                                 |
| --------- | ------- | ------------------------------------------- |
| `address` | String  | Address of user whose balance has decreased |
| `amount`  | Uint128 | Amount of bETH balance decreased            |

## QueryMsg

### `Config`

Gets the contract configuration of bETH `Reward`.

{% tabs %}
{% tab title="Rust" %}
#### Request

```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    Config {}
}
```

| Key | Type | Description |
| --- | ---- | ----------- |
|     |      |             |

#### Response

```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct ConfigResponse {
    pub owner: String, 
    pub reward_denom: String, 
    pub token_contract: Option<String>, 
}
```

| Key                | Type   | Description                                            |
| ------------------ | ------ | ------------------------------------------------------ |
| `owner`            | String | Address of contract owner                              |
| `reward_denom`     | String | Native token denomination for distributed bETH rewards |
| `token_contract`\* | String | Contract address of bETH Token                         |

\* = optional
{% endtab %}

{% tab title="JSON" %}
#### Request

```javascript
{
  "config": {}
}
```

| Key | Type | Description |
| --- | ---- | ----------- |
|     |      |             |

#### Response

```javascript
{
  "owner": "terra1...", 
  "reward_denom": "uusd", 
  "token_contract": "terra1..." 
}
```

| Key                | Type   | Description                                            |
| ------------------ | ------ | ------------------------------------------------------ |
| `owner`            | String | Address of contract owner                              |
| `reward_denom`     | String | Native token denomination for distributed bETH rewards |
| `token_contract`\* | String | Contract address of bETH Token                         |

\* = optional
{% endtab %}
{% endtabs %}

### `State`

Gets information about the contract's current state.

{% tabs %}
{% tab title="Rust" %}
#### Request

```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    State {}
}
```

| Key | Type | Description |
| --- | ---- | ----------- |
|     |      |             |

#### Response

```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct StateResponse {
    pub global_index: Decimal,
    pub total_balance: Uint128,
    pub prev_reward_balance: Uint128,
}
```

| Key                   | Type    | Description                                                                     |
| --------------------- | ------- | ------------------------------------------------------------------------------- |
| `global_index`        | Decimal | Current global reward index of bETH                                             |
| `total_balance`       | Uint128 | Total bETH balance of all holders                                               |
| `prev_reward_balance` | Uint128 | TerraUSD balance of the Reward contract at the time of last reward distribution |
{% endtab %}

{% tab title="JSON" %}
#### Request

```javascript
{
  "state": {}
}
```

| Key | Type | Description |
| --- | ---- | ----------- |
|     |      |             |

#### Response

```javascript
{
  "global_index": "1000.0", 
  "total_balance": "100000000", 
  "prev_reward_balance": "100000000" 
}
```

| Key                   | Type    | Description                                                                     |
| --------------------- | ------- | ------------------------------------------------------------------------------- |
| `global_index`        | Decimal | Current global reward index of bETH                                             |
| `total_balance`       | Uint128 | Total bETH balance of all holders                                               |
| `prev_reward_balance` | Uint128 | TerraUSD balance of the Reward contract at the time of last reward distribution |
{% endtab %}
{% endtabs %}

### `AccruedRewards`

Gets the amount of rewards accrued to the specified bETH holder.

{% tabs %}
{% tab title="Rust" %}
#### Request

```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    AccruedRewards {
        address: String, 
    }
}
```

| Key       | Type   | Description            |
| --------- | ------ | ---------------------- |
| `address` | String | Address of bETH holder |

#### Response

```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct AccruedRewardsResponse {
    pub rewards: Uint128, 
}
```

| Key       | Type    | Description                              |
| --------- | ------- | ---------------------------------------- |
| `rewards` | Uint128 | Amount of `reward_denom` rewards accrued |
{% endtab %}

{% tab title="JSON" %}
#### Request

```javascript
{
  "accrued_rewards": {
    "address": "terra1..." 
  }
}
```

| Key       | Type   | Description            |
| --------- | ------ | ---------------------- |
| `address` | String | Address of bETH holder |

#### Response

```javascript
{
  "rewards": "100000000" 
}
```

| Key       | Type    | Description                              |
| --------- | ------- | ---------------------------------------- |
| `rewards` | Uint128 | Amount of `reward_denom` rewards accrued |
{% endtab %}
{% endtabs %}

### `Holder`

Gets information about the specified bETH holder.

{% tabs %}
{% tab title="Rust" %}
#### Request

```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    Holder {
        address: String, 
    }
}
```

| Key       | Type   | Description            |
| --------- | ------ | ---------------------- |
| `address` | String | Address of bETH holder |

#### Response

```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct HolderResponse {
    pub address: String, 
    pub balance: Uint128, 
    pub index: Decimal, 
    pub pending_rewards: Decimal, 
}
```

| Key               | Type    | Description                        |
| ----------------- | ------- | ---------------------------------- |
| `address`         | String  | Address of bETH holder             |
| `balance`         | Uint128 | bETH balance of holder             |
| `index`           | Decimal | Holder's reward index value        |
| `pending_rewards` | Decimal | Amount of holder's pending rewards |
{% endtab %}

{% tab title="JSON" %}
#### Request

```javascript
{
  "holder": {
    "address": "terra1..." 
  }
}
```

| Key       | Type   | Description            |
| --------- | ------ | ---------------------- |
| `address` | String | Address of bETH holder |

#### Response

```javascript
{
  "address": "terra1...", 
  "balance": "100000000", 
  "index": "100.0", 
  "pending_rewards": "1000000.123" 
}
```

| Key               | Type    | Description                        |
| ----------------- | ------- | ---------------------------------- |
| `address`         | String  | Address of bETH holder             |
| `balance`         | Uint128 | bETH balance of holder             |
| `index`           | Decimal | Holder's reward index value        |
| `pending_rewards` | Decimal | Amount of holder's pending rewards |
{% endtab %}
{% endtabs %}

### `Holders`

Gets information about all bETH holders.

{% tabs %}
{% tab title="Rust" %}
#### Request

```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    Holders {
        start_after: Option<String>, 
        limit: Option<u32>, 
    }
}
```

| Key             | Type   | Description                           |
| --------------- | ------ | ------------------------------------- |
| `start_after`\* | String | Address of bETH holder to start query |
| `limit`\*       | u32    | Maximum number of query entries       |

\* = optional

#### Response

```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct HoldersResponse {
    pub holders: Vec<HolderResponse>, 
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct HolderResponse {
    pub address: String, 
    pub balance: Uint128, 
    pub index: Decimal, 
    pub pending_rewards: Decimal, 
}
```

| Key       | Type                 | Description                   |
| --------- | -------------------- | ----------------------------- |
| `holders` | Vec\<HolderResponse> | Vector of holder informations |

| Key               | Type    | Description                        |
| ----------------- | ------- | ---------------------------------- |
| `address`         | String  | Address of bETH holder             |
| `balance`         | Uint128 | bETH balance of holder             |
| `index`           | Decimal | Holder's reward index value        |
| `pending_rewards` | Decimal | Amount of holder's pending rewards |
{% endtab %}

{% tab title="JSON" %}
#### Request

```rust
{
  "holders": {
    "start_after": "terra1...", 
    "limit": 8 
  }
}
```

| Key             | Type   | Description                           |
| --------------- | ------ | ------------------------------------- |
| `start_after`\* | String | Address of bETH holder to start query |
| `limit`\*       | u32    | Maximum number of query entries       |

\* = optional

#### Response

```rust
{
  "holders": [
    {
      "address": "terra1...", 
      "balance": "100000000", 
      "index": "123.456789", 
      "pending_rewards": "123.456789" 
    }, 
    {
      "address": "terra1...", 
      "balance": "100000000", 
      "index": "123.456789", 
      "pending_rewards": "123.456789" 
    }
  ]
}
```

| Key       | Type                 | Description                   |
| --------- | -------------------- | ----------------------------- |
| `holders` | Vec\<HolderResponse> | Vector of holder informations |

| Key               | Type    | Description                        |
| ----------------- | ------- | ---------------------------------- |
| `address`         | String  | Address of bETH holder             |
| `balance`         | Uint128 | bETH balance of holder             |
| `index`           | Decimal | Holder's reward index value        |
| `pending_rewards` | Decimal | Amount of holder's pending rewards |
{% endtab %}
{% endtabs %}
