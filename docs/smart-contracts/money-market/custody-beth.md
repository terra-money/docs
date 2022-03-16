# Custody \[bETH]

The bETH Custody contract is where supplied bETH collaterals are managed. Users can make collateral deposits and withdrawals to and from this contract. The Custody contract is also responsible for claiming bETH rewards and converting them to Terra stablecoins, which is then sent to the Overseer contract for eventual distribution.

## Contract State

### Config

Stores information about the bETH Custody contract's config.

| Key                    | Type          | Description                              |
| ---------------------- | ------------- | ---------------------------------------- |
| `owner`                | CanonicalAddr | Address of contract owner                |
| `collateral_token`     | CanonicalAddr | Contract address of bETH Token           |
| `overseer_contract`    | CanonicalAddr | Contract address of Overseer             |
| `market_contract`      | CanonicalAddr | Contract address of Market               |
| `reward_contract`      | CanonicalAddr | Contract address of bETH Reward          |
| `liquidation_contract` | CanonicalAddr | Contract address of Liquidation Contract |
| `stable_denom`         | String        | Native token denomination for stablecoin |
| `basset_info`          | BAssetInfo    | bAsset token information                 |

### BorrowerInfo

Stores information about a borrower.

| Key         | Type    | Description                                               |
| ----------- | ------- | --------------------------------------------------------- |
| `balance`   | Uint256 | Amount of bETH deposited as collateral                    |
| `spendable` | Uint256 | Amount of bETH that can be withdrawn (not locked in loan) |

## InstantiateMsg

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub struct InstantiateMsg {
    pub owner: String, 
    pub collateral_token: String,
    pub overseer_contract: String,
    pub market_contract: String,
    pub reward_contract: String,
    pub liquidation_contract: String,
    pub stable_denom: String, 
    pub basset_info: BAssetInfo, 
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct BAssetInfo {
    pub name: String,
    pub symbol: String,
    pub decimals: u8,
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "owner": "terra1...", 
  "collateral_token": "terra1...",
  "overseer_contract": "terra1...",
  "market_contract": "terra1...",
  "reward_contract": "terra1...",
  "liquidation_contract": "terra1...", 
  "stable_denom": "uusd", 
  "basset_info": {
    "name": "Bonded ETH", 
    "symbol": "BETH", 
    "decimals": 6 
  }
}
```
{% endtab %}
{% endtabs %}

| Key                    | Type       | Description                              |
| ---------------------- | ---------- | ---------------------------------------- |
| `owner`                | String     | Address of contract owner                |
| `collateral_token`     | String     | Contract address of bETH Token           |
| `overseer_contract`    | String     | Contract address of Overseer             |
| `market_contract`      | String     | Contract address of Market               |
| `reward_contract`      | String     | Contract address of bETH Reward          |
| `liquidation_contract` | String     | Contract address of Liquidation Contract |
| `stable_denom`         | String     | Native token denomination for stablecoin |
| `basset_info`          | BAssetInfo | bAsset token information                 |

| Key        | Type   | Description                        |
| ---------- | ------ | ---------------------------------- |
| `name`     | String | Name of bAsset                     |
| `symbol`   | String | Symbol of bAsset                   |
| `decimals` | u8     | Number of decimals of bAsset token |

## ExecuteMsg

### `Receive`

Can be called during a CW20 token transfer when the Mint contract is the recipient. Allows the token transfer to execute a [Receive Hook](custody-bluna-specific.md#receive-hooks) as a subsequent action within the same transaction.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    Receive {
        sender: String, 
        amount: Uint128, 
        msg: Binary, 
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "receive": {
    "sender": "terra1...",
    "amount": "10000000",
    "msg": "eyAiZXhlY3V0ZV9tc2ciOiAiYmluYXJ5IiB9"
  }
}
```
{% endtab %}
{% endtabs %}

| Key      | Type    | Description                                                                              |
| -------- | ------- | ---------------------------------------------------------------------------------------- |
| `sender` | String  | Sender of the token transfer                                                             |
| `amount` | Uint128 | Amount of tokens received                                                                |
| `msg`    | Binary  | Base64-encoded string of JSON of [Receive Hook](custody-bluna-specific.md#receive-hooks) |

### `UpdateConfig`

Updates the configuration of the Custody contract.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    UpdateConfig {
        owner: Option<String>, 
        liquidation_contract: Option<String>, 
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "update_config": {
    "owner": "terra1...", 
    "liquidation_contract": "terra1..." 
  }
}
```
{% endtab %}
{% endtabs %}

| Key                      | Type   | Description                                  |
| ------------------------ | ------ | -------------------------------------------- |
| `owner`\*                | String | New address of contract owner                |
| `liquidation_contract`\* | String | New contract address of Liquidation Contract |

\* = optional

### `[Internal] LockCollateral`

Locks borrower's collateral to be used in their loan position, decreasing the amount of spendable collateral. Can only be issued by `Overseer`.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    LockCollateral {
        borrower: String, 
        amount: Uint256, 
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "lock_collateral": { 
    "borrower": "terra1...", 
    "amount": "10000000"
  }
}
```
{% endtab %}
{% endtabs %}

| Key        | Type    | Description                            |
| ---------- | ------- | -------------------------------------- |
| `borrower` | String  | Address of borrower locking collateral |
| `amount`   | Uint256 | Amount of collateral to lock           |

### `[Internal] UnlockCollateral`

Unlocks borrower's collateral from their loan position, increasing the amount of spendable collateral. Can only be issued by `Overseer`.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    UnlockCollateral {
        borrower: String, 
        amount: Uint256, 
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "unlock_collateral": { 
    "borrower": "terra1...", 
    "amount": "10000000"
  }
}
```
{% endtab %}
{% endtabs %}

| Key        | Type    | Description                              |
| ---------- | ------- | ---------------------------------------- |
| `borrower` | String  | Address of borrower unlocking collateral |
| `amount`   | Uint256 | Amount of collateral to unlock           |

### `[Internal] DistributeRewards`

Withdraws accrued rewards from the bETH Reward contract, swaps rewards to the appropriate stablecoin denomination (`stable_denom`). Can only be issued by `Overseer`.

Afterwards, distributes swapped rewards to depositors by sending swapped rewards to `Market`. If the deposit rate during the last epoch is above the target deposit rate, then a portion of the rewards are set aside as a yield reserve, which are sent to `Overseer`.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    DistributeRewards {}
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "distribute_rewards": {} 
}
```
{% endtab %}
{% endtabs %}

| Key | Type | Description |
| --- | ---- | ----------- |
|     |      |             |

### `[Internal] LiquidateCollateral`

Liquidates specified amount of locked collateral. Can only be issued by `Overseer`.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    LiquidateCollateral {
        liquidator: String, 
        borrower: String, 
        amount: Uint256, 
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "liquidate_collateral": {
    "liquidator": "terra1...", 
    "borrower": "terra1...", 
    "amount": "100000000" 
  }
}
```
{% endtab %}
{% endtabs %}

| Key          | Type    | Description                                 |
| ------------ | ------- | ------------------------------------------- |
| `liquidator` | String  | Address of user that triggered liquidations |
| `borrower`   | String  | Address of borrower being liquidated        |
| `amount`     | Uint256 | Amount of collateral to liquidate           |

### `WithdrawCollateral`

{% hint style="info" %}
Collaterals have to be first unlocked in the [Overseer](overseer.md) before they can be withdrawn by the user.
{% endhint %}

Withdraws specified amount of spendable collateral. Withdraws all spendable collateral if the `amount` field is not filled.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    WithdrawCollateral {
        amount: Option<Uint256>, 
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "withdraw_collateral": { 
    "amount": "10000000"
  }
}
```
{% endtab %}
{% endtabs %}

| Key        | Type    | Description                      |
| ---------- | ------- | -------------------------------- |
| `amount`\* | Uint256 | Amount of collateral to withdraw |

\* = optional

## Receive Hooks

### `DepositCollateral`

{% hint style="info" %}
Deposited collaterals have to be locked in the [Overseer](overseer.md) before they can be utilized in a loan position.
{% endhint %}

Deposits collateral. Issued when a user sends bAsset tokens to the Custody contract.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum Cw20HookMsg {
    DepositCollateral {}
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "deposit_collateral": {}
}
```
{% endtab %}
{% endtabs %}

| Key | Type | Description |
| --- | ---- | ----------- |

## QueryMsg

### `Config`

Gets the contract configuration of the Custody contract.

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
    pub collateral_token: String, 
    pub overseer_contract: String, 
    pub market_contract: String, 
    pub reward_contract: String, 
    pub liquidation_contract: String, 
    pub stable_denom: String, 
    pub basset_info: BAssetInfo, 
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct BAssetInfo {
    pub name: String,
    pub symbol: String,
    pub decimals: u8,
}
```

| Key                    | Type       | Description                              |
| ---------------------- | ---------- | ---------------------------------------- |
| `owner`                | String     | Address of contract owner                |
| `collateral_token`     | String     | Contract address of bETH Token           |
| `overseer_contract`    | String     | Contract address of Overseer             |
| `market_contract`      | String     | Contract address of Market               |
| `reward_contract`      | String     | Contract address bETH Reward             |
| `liquidation_contract` | String     | Contract address of Liquidation Contract |
| `stable_denom`         | String     | Native token denomination for stablecoin |
| `basset_info`          | BAssetInfo | bAsset token information                 |

| Key        | Type   | Description                        |
| ---------- | ------ | ---------------------------------- |
| `name`     | String | Name of bAsset token               |
| `symbol`   | String | Symbol of bAsset token             |
| `decimals` | u8     | Number of decimals of bAsset Token |
{% endtab %}

{% tab title="JSON" %}
#### Request

```rust
{
  "config": {}
}
```

| Key | Type | Description |
| --- | ---- | ----------- |
|     |      |             |

#### Response

```rust
{
  "owner": "terra1...", 
  "collateral_token": "terra1...", 
  "overseer_contract": "terra1...", 
  "market_contract": "terra1...", 
  "reward_contract": "terra1...", 
  "liquidation_contract": "terra1...", 
  "stable_denom": "uusd", 
  "basset_info": {
    "name": "Bonded ETH", 
    "symbol": "BETH", 
    "decimals": 6 
  }
}
```

| Key                    | Type       | Description                              |
| ---------------------- | ---------- | ---------------------------------------- |
| `owner`                | String     | Address of contract owner                |
| `collateral_token`     | String     | Contract address of bETH Token           |
| `overseer_contract`    | String     | Contract address of Overseer             |
| `market_contract`      | String     | Contract address of Market               |
| `reward_contract`      | String     | Contract address bETH Reward             |
| `liquidation_contract` | String     | Contract address of Liquidation Contract |
| `stable_denom`         | String     | Native token denomination for stablecoin |
| `basset_info`          | BAssetInfo | bAsset token information                 |

| Key        | Type   | Description                        |
| ---------- | ------ | ---------------------------------- |
| `name`     | String | Name of bAsset token               |
| `symbol`   | String | Symbol of bAsset token             |
| `decimals` | u8     | Number of decimals of bAsset Token |
{% endtab %}
{% endtabs %}

### `Borrower`

Gets the collateral balance of the specified borrower.

{% tabs %}
{% tab title="Rust" %}
#### Request

```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    Borrower {
        address: String, 
    }
}
```

| Key       | Type   | Description                                   |
| --------- | ------ | --------------------------------------------- |
| `address` | String | Address of borrower that deposited collateral |

#### Response

```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct BorrowerResponse {
    pub borrower: String, 
    pub balance: Uint256, 
    pub spendable: Uint256, 
}
```

| Key         | Type    | Description                                   |
| ----------- | ------- | --------------------------------------------- |
| `borrower`  | String  | Address of borrower that deposited collateral |
| `balance`   | Uint256 | Total amount of deposited collateral          |
| `spendable` | Uint256 | Amount of spendable collateral                |
{% endtab %}

{% tab title="JSON" %}
#### Request

```rust
{
  "borrower": { 
    "address": "terra1..." 
  }
}
```

| Key       | Type   | Description                                   |
| --------- | ------ | --------------------------------------------- |
| `address` | String | Address of borrower that deposited collateral |

#### Response

```rust
{
  "borrower": "terra1...", 
  "balance": "1000000000", 
  "spendable": "100000000" 
}
```

| Key         | Type    | Description                                   |
| ----------- | ------- | --------------------------------------------- |
| `borrower`  | String  | Address of borrower that deposited collateral |
| `balance`   | Uint256 | Total amount of deposited collateral          |
| `spendable` | Uint256 | Amount of spendable collateral                |
{% endtab %}
{% endtabs %}

### `Borrowers`

Get the collateral balance of all borrowers.

{% tabs %}
{% tab title="Rust" %}
#### Request

```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    Borrowers {
        start_after: Option<String>, 
        limit: Option<u32>, 
    }
}
```

| Key             | Type   | Description                     |
| --------------- | ------ | ------------------------------- |
| `start_after`\* | String | Borrower address to start query |
| `limit`\*       | u32    | Maximum number of query entries |

\* = optional

#### Response

```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct BorrowersResponse {
    pub borrowers: Vec<BorrowerResponse>, 
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct BorrowerResponse {
    pub borrower: String, 
    pub balance: Uint256, 
    pub spendable: Uint256, 
}
```

| Key         | Type                   | Description                                 |
| ----------- | ---------------------- | ------------------------------------------- |
| `borrowers` | Vec\<BorrowerResponse> | Collateral balance information of borrowers |

| Key         | Type    | Description                                   |
| ----------- | ------- | --------------------------------------------- |
| `borrower`  | String  | Address of borrower that deposited collateral |
| `balance`   | Uint256 | Total amount of deposited collateral          |
| `spendable` | Uint256 | Amount of spendable collateral                |
{% endtab %}

{% tab title="JSON" %}
#### Request

```rust
{
  "borrowers": {
    "start_after": "terra1...", 
    "limit": 8 
  }
}
```

| Key             | Type   | Description                     |
| --------------- | ------ | ------------------------------- |
| `start_after`\* | String | Borrower address to start query |
| `limit`\*       | u32    | Maximum number of query entries |

\* = optional

#### Response

```rust
{
  "borrowers": [
    {
      "borrower": "terra1...", 
      "balance": "100000000", 
      "spendable": "100000000" 
    }, 
    {
      "borrower": "terra1...", 
      "balance": "100000000", 
      "spendable": "100000000" 
    }
  ]
}
```

| Key         | Type                   | Description                                 |
| ----------- | ---------------------- | ------------------------------------------- |
| `borrowers` | Vec\<BorrowerResponse> | Collateral balance information of borrowers |

| Key         | Type    | Description                                   |
| ----------- | ------- | --------------------------------------------- |
| `borrower`  | String  | Address of borrower that deposited collateral |
| `balance`   | Uint256 | Total amount of deposited collateral          |
| `spendable` | Uint256 | Amount of spendable collateral                |
{% endtab %}
{% endtabs %}
