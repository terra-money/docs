# Liquidation Queue Contract

The Liquidation contract enables users to submit Terra stablecoin bids for a Cw20-compliant token. Bidders can submit a bid to one of the bid pools; each of the pools deposited funds are used to buy the liquidated collateral at different discount rates. There are 31 slots per collateral, from 0% to 30%; users can bid on one or more slots.

Upon execution of a bid, Cw20 tokens are sent to the bidder, while the bidder's Terra stablecoins are sent to the repay address (if not specified, sent to message sender). A portion of the collateral value liquidated will be given to the address triggering the liquidation (`liquidator_fee`).

Bids are consumed from the bid pools in increasing order of premium rate (e.g 2% bids are only consumed after 0% and 1% pools are emptied). The liquidated collateral is then distributed to the bidders in the affected pools in proportion to their bid amount. The respective collateral should be claimed by the bidders.

To prevent bots from sniping loans, submitted bids can only be activated after `wait_period` has expired, unless the total bid amount falls under the `bid_threshold`, in which case bids will be directly activated upon submission.

Additionally, the Liquidation contract serves as the point of calculation for partial collateral liquidations, where a loan position is liquidated until it reaches a safe `borrow_amount / borrow_limit` ratio. The required liquidation amount for each collateral is calculated based on the fed-in loan position's attributes and the state of the bid pools.

The oracle contract is responsible for providing the relevant Cw20 token prices. Price data from the Oracle contract are only valid for 60 seconds (`price_timeframe`). The Liquidation contract disables bid executions until new price data is fed in to the Oracle contract.

## Config

| Key                     | Type          | Description                                                                   |
| ----------------------- | ------------- | ----------------------------------------------------------------------------- |
| `owner`                 | CanonicalAddr | Address of contract owner that can update config                              |
| `oracle_contract`       | CanonicalAddr | Contract address of Oracle                                                    |
| `stable_denom`          | String        | Native token denomination for bids                                            |
| `safe_ratio`            | Decimal256    | A liability / borrow limit ratio of a loan deemed safe                        |
| `liquidator_fee`        | Decimal256    | Fee rate given to the executor                                                |
| `bid_fee`               | Decimal256    | Fee rate applied to all executed liquidations                                 |
| `liquidation_threshold` | Uint256       | Threshold collateral value for partial collateral liquidations                |
| `price_timeframe`       | u64           | Window of time before oracle price data is considered outdated **\[seconds]** |
| `waiting_period`        | u64           | Time after submitted bids can be activated **\[seconds]**                     |
| `overseer`              | CanonicalAddr | Contract address of Overseer                                                  |

## InstantiateMsg

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct InstantiateMsg {
    pub owner: String,
    pub oracle_contract: String,
    pub stable_denom: String,
    pub safe_ratio: Decimal256,
    pub bid_fee: Decimal256,
    pub liquidator_fee: Decimal256,
    pub liquidation_threshold: Uint256,
    pub price_timeframe: u64,
    pub waiting_period: u64,
    pub overseer: String,
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "owner": "terra1..", 
  "oracle_contract": "terra1...", 
  "stable_denom": "uusd", 
  "safe_ratio": "0.8", 
  "bid_fee": "0.01", 
  "liquidator_fee": "0.01",
  "liquidation_threshold": "500", 
  "price_timeframe": 60,
  "waiting_period": 600,
  "overseer": "terra1..."
}
```
{% endtab %}
{% endtabs %}

| Key                     | Type       | Description                                                                   |
| ----------------------- | ---------- | ----------------------------------------------------------------------------- |
| `owner`                 | String     | Address of contract owner that can update config                              |
| `oracle_contract`       | String     | Contract address of Oracle                                                    |
| `stable_denom`          | String     | Native token denomination for bids                                            |
| `safe_ratio`            | Decimal256 | A liability / borrow limit ratio of a loan deemed safe                        |
| `bid_fee`               | Decimal256 | Fee rate applied to executed bids                                             |
| `liquidator_fee`        | Decimal256 | Fee rate given to the executor                                                |
| `liquidation_threshold` | Uint256    | Threshold collateral value for triggering partial collateral liquidations     |
| `price_timeframe`       | u64        | Window of time before oracle price data is considered outdated **\[seconds]** |
| `waiting_period`        | u64        | Time after submitted bids can be activated **\[seconds]**                     |
| `overseer`              | String     | Contract address of Overseer                                                  |

## ExecuteMsg

### `Receive`

Can be called during a CW20 token transfer when the Liquidation contract is the recipient. Allows the token transfer to execute a [Receive Hook](liquidation-contract.md#receive-hooks) as a subsequent action within the same transaction.

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

| Key      | Type    | Description                                                                            |
| -------- | ------- | -------------------------------------------------------------------------------------- |
| `sender` | String  | Sender of the token transfer                                                           |
| `amount` | Uint128 | Amount of tokens received                                                              |
| `msg`    | Binary  | Base64-encoded string of JSON of [Receive Hook](liquidation-contract.md#receive-hooks) |

### `UpdateConfig`

Updates the Liquidation contract's configuration. Can only be issued by the owner.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg { 
    UpdateConfig {
        owner: Option<String>,
        oracle_contract: Option<String>,
        safe_ratio: Option<Decimal256>,
        bid_fee: Option<Decimal256>,
        liquidator_fee: Option<Decimal256>,
        liquidation_threshold: Option<Uint256>,
        price_timeframe: Option<u64>,
        waiting_period: Option<u64>,
        overseer: Option<String>,
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "update_config": {
    "owner": "terra1...", 
    "oracle_contract": "terra1...", 
    "safe_ratio": "0.8", 
    "bid_fee": "0.01", 
    "liquidator_fee": "0.01",
    "liquidation_threshold": "200000000", 
    "price_timeframe": 60,
    "waiting_period": 600,
    "overseer": "terra1..."
  }
}
```
{% endtab %}
{% endtabs %}

| Key                       | Type       | Description                                                                   |
| ------------------------- | ---------- | ----------------------------------------------------------------------------- |
| `owner`\*                 | String     | Address of new owner                                                          |
| `oracle_contract`\*       | String     | New oracle contract address                                                   |
| `safe_ratio`\*            | Decimal256 | New liability / borrow limit of a loan deemed safe                            |
| `bid_fee`\*               | Decimal256 | New fee rate applied to executed bids                                         |
| `liquidator_fee`\*        | Decimal256 | Fee rate given to the executor                                                |
| `liquidation_threshold`\* | Uint256    | New threshold collateral value for triggering partial collateral liquidations |
| `price_timeframe`\*       | u64        | New window of time before price data is considered outdated **\[seconds]**    |
| `waiting_period`\*        | u64        | Time after submitted bids can be activated **\[seconds]**                     |
| `overseer`\*              | String     | Contract address of Overseer                                                  |

\* = optional

### `WhitelistCollateral`

Whitelist a new collateral token. Can only be issued by the owner.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg { 
    WhitelistCollateral {
        collateral_token: String,
        bid_threshold: Uint256,
        max_slot: u8,
        premium_rate_per_slot: Decimal256,
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "whitelist_collateral": {
    "collateral_token": "terra1...", 
    "bid_threshold": "200000000", 
    "max_slot": 30,
    "premium_rate_per_slot": "0.01",
  }
}
```
{% endtab %}
{% endtabs %}

| Key                     | Type       | Description                                                             |
| ----------------------- | ---------- | ----------------------------------------------------------------------- |
| `collateral_token`      | String     | Address of the collateral token to whitelist                            |
| `bid_threshold`         | Uint256    | Bid amount threshold under which bids will be activated upon submission |
| `max_slot`              | u8         | Maximum premium slot                                                    |
| `premium_rate_per_slot` | Decimal256 | Premium rate increase for each slot                                     |

### `UpdateCollateralInfo`

Update a whitelisted collateral configuration. Can only be issued by the owner.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg { 
    UpdateCollateralInfo {
        collateral_token: String,
        bid_threshold: Option<Uint256>,
        max_slot: Option<u8>,
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "whitelist_collateral": {
    "collateral_token": "terra1...", 
    "bid_threshold": "200000000", 
    "max_slot": 30,
  }
}
```
{% endtab %}
{% endtabs %}

| Key                | Type    | Description                                                             |
| ------------------ | ------- | ----------------------------------------------------------------------- |
| `collateral_token` | String  | Address of the collateral token to whitelist                            |
| `bid_threshold`\*  | Uint256 | Bid amount threshold under which bids will be activated upon submission |
| `max_slot`\*       | u8      | Maximum premium slot                                                    |

\* = optional

### `SubmitBid`

Submits a new bid for the specified Cw20 collateral to the specified premium slot. Requires Terra stablecoins to be sent beforehand. The premium rate on each slot can be calculated using the whitelisted collateral configuration (`premium_slot * premium_rate_per_slot`).

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    SubmitBid {
        collateral_token: String, 
        premium_slot: u8, 
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "submit_bid": {
    "collateral_token": "terra1...", 
    "premium_slot": 3
  }
}
```
{% endtab %}
{% endtabs %}

| Key                | Type   | Description                                             |
| ------------------ | ------ | ------------------------------------------------------- |
| `collateral_token` | String | Cw20 token contract address of bidding collateral       |
| `premium_slot`     | u8     | Premium rate slot to which the bid will be submitted to |

### `ActivateBids`

Activates the list of `bids_idx` for the specified `collateral_token`. Activates all bids with expired `waiting_period` of the `bid_idx` field is not filled.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    ActivateBids {
        collateral_token: String,
        bids_idx: Option<Vec<Uint128>>, 
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "activate_bids": {
    "collateral_token": "terra1...",
    "bids_idx": ["123","231"], 
  }
}
```
{% endtab %}
{% endtabs %}

| Key                | Type          | Description                                       |
| ------------------ | ------------- | ------------------------------------------------- |
| `collateral_token` | String        | Cw20 token contract address of bidding collateral |
| `bids_idx`\*       | Vec\<Uint128> | List of bid unique identifiers                    |

\* = optional

### `RetractBid`

Withdraws specified amount of stablecoins from the specified `bid_idx`. Withdraws the entire remaining bid if the `amount` field is not filled.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    RetractBid {
        bid_idx: Uint128, 
        amount: Option<Uint256>, 
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "retract_bid": {
    "bid_idx": "123", 
    "amount": "100000000" 
  }
}
```
{% endtab %}
{% endtabs %}

| Key        | Type    | Description                              |
| ---------- | ------- | ---------------------------------------- |
| `bid_idx`  | Uint128 | Bid unique identifier                    |
| `amount`\* | Uint256 | Amount of stablecoins to remove from bid |

\* = optional

### `ClaimLiquidations`

Claim the liquidated collateral accrued by the specified list of `bids_idx`. Claims all the pending collateral from user submitted bids if the `bids_idx` field is not filled.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    ClaimLiquidations {
        collateral_token: String,
        bids_idx: Option<Vec<Uint128>>,
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "claim_liquidations": {
    "collateral_token": "terra1...",
    "bids_idx": ["123","231"],  
  }
}
```
{% endtab %}
{% endtabs %}

| Key                | Type          | Description                                       |
| ------------------ | ------------- | ------------------------------------------------- |
| `collateral_token` | String        | Cw20 token contract address of bidding collateral |
| `bids_idx`\*       | Vec\<Uint128> | List of bid unique identifiers                    |

\* = optional

## Receive Hooks

### `ExecuteBid`

Liquidates the sent collateral using the active bids on the bid pools, consuming bids with lower premium rates first. Can only be executed by a whitelisted collateral's `Custody` contract. `Custody` issues this message with `fee_address` as `Overseer`'s contract address and `repay_address` as `Market`'s contract address, where stablecoins from the bid is sent to the Market contract to repay a borrower's loan and fees are sent to the Overseer contract to be added to the interest buffer. The `liquidator_fee` is sent to the `liquidator` address that originally triggered the liquidation.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum Cw20HookMsg {
    ExecuteBid {
        liquidator: String, 
        fee_address: Option<String>, // Filled as Overseer contract's address
        repay_address: Option<String>, // Filled as Market contract's address
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "execute_bid": {
    "liquidator": "terra1...", 
    "fee_address": "terra1...", // Filled as Overseer contract's address
    "repay_address": "terra1..." // Filled as Market contract's address
  }
}
```
{% endtab %}
{% endtabs %}

| Key               | Type   | Description                                                                   |
| ----------------- | ------ | ----------------------------------------------------------------------------- |
| `liquidator`      | String | Address of collateral liquidator to receive `liquidator_fee` from liquidation |
| `fee_address`\*   | String | Address to receive `bid_fee` from liquidation                                 |
| `repay_address`\* | String | Address to receive bid stablecoins from liquidation                           |

\* = optional

## QueryMsg

### `Config`

Gets the Liquidation Contract's configuration.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    Config {}
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "config": {}
}
```
{% endtab %}
{% endtabs %}

### `ConfigResponse`

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct ConfigResponse {
    pub owner: String,
    pub oracle_contract: String,
    pub stable_denom: String,
    pub safe_ratio: Decimal256,
    pub bid_fee: Decimal256,
    pub liquidator_fee: Decimal256,
    pub liquidation_threshold: Uint256,
    pub price_timeframe: u64,
    pub waiting_period: u64,
    pub overseer: String,
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "owner": "terra1...", 
  "oracle_contract": "terra1...", 
  "stable_denom": "uusd", 
  "safe_ratio": "0.8", 
  "bid_fee": "0.01",
  "liquidator_fee": "0.01", 
  "liquidation_threshold": "200000000", 
  "price_timeframe": 60,
  "waiting_period": 600,
  "overseer": "terra1..."
}
```
{% endtab %}
{% endtabs %}

| Key                     | Type       | Description                                                            |
| ----------------------- | ---------- | ---------------------------------------------------------------------- |
| `owner`                 | String     | Address of contract owner that can update config                       |
| `oracle_contract`       | String     | Contract address of Oracle                                             |
| `stable_denom`          | String     | Native token denomination for bids                                     |
| `safe_ratio`            | Decimal256 | A liability / borrow limit ratio of a loan deemed safe                 |
| `bid_fee`               | Decimal256 | Fee rate applied to all executed bids                                  |
| `liquidator_fee`        | Decimal256 | Fee rate given to the executor                                         |
| `liquidation_threshold` | Uint256    | Threshold collateral value for partial collateral liquidations         |
| `price_timeframe`       | u64        | Window of time before price data is considered outdated **\[seconds]** |
| `waiting_period`        | u64        | Time after submitted bids can be activated **\[seconds]**              |
| `overseer`              | String     | Contract address of Overseer                                           |

### `CollateralInfo`

Gets collateral specific configuration.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    CollateralInfo {
        collateral_token: String,
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "collateral_info": {
      "collateral_token": "terra1..."
  }
}
```
{% endtab %}
{% endtabs %}

| Key                | Type   | Description            |
| ------------------ | ------ | ---------------------- |
| `collateral_token` | String | Token contract address |

### `CollateralInfoResponse`

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct CollateralInfoResponse {
    pub collateral_token: String,
    pub bid_threshold: Uint256,
    pub max_slot: u8,
    pub premium_rate_per_slot: Decimal256,
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "collateral_token": "terra1...", 
  "bid_threshold": "5000000000000",
  "max_slot": 30,
  "premium_rate_per_slot": "0.01"
}
```
{% endtab %}
{% endtabs %}

| Key                     | Type       | Description                                                             |
| ----------------------- | ---------- | ----------------------------------------------------------------------- |
| `collateral_token`      | String     | Address of the collateral token whitelisted                             |
| `bid_threshold`         | Uint256    | Bid amount threshold under which bids will be activated upon submission |
| `max_slot`              | u8         | Maximum premium slot                                                    |
| `premium_rate_per_slot` | Decimal256 | Premium rate increase for each slot                                     |

### `LiquidationAmount`

Gets the amount of collaterals that needs to be liquidated in order for the borrower's loan to reach `safe_ratio`, based on the fed in borrower's status and the state of all bid pools.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    LiquidationAmount {
        borrow_amount: Uint256, 
        borrow_limit: Uint256, 
        collaterals: TokensHuman, 
        collateral_prices: Vec<Decimal>, 
    }
}

pub type TokensHuman = Vec<(String, Uint256)>;
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "liquidation_amount": {
    "borrow_amount": "10000000", 
    "borrow_limit": "10000000", 
    "collaterals": [
      ["terra1...", "100000000"], // (Cw20 contract address, Locked amount)
      ["terra1...", "100000000"] 
    ], 
    "collateral_prices": [
      "123.456789", // Price of collateral
      "123.456789" 
    ]
  }
}
```
{% endtab %}
{% endtabs %}

| Key                 | Type          | Description                         |
| ------------------- | ------------- | ----------------------------------- |
| `borrow_amount`     | Uint256       | Liability of borrower               |
| `borrow_limit`      | Uint256       | Borrow limit of borrower            |
| `collaterals`       | TokensHuman   | Held collaterals and locked amounts |
| `collateral_prices` | Vec\<Decimal> | Vector of collateral prices         |

| Key           | Type                   | Description                                                                     |
| ------------- | ---------------------- | ------------------------------------------------------------------------------- |
| `TokensHuman` | Vec<(String, Uint256)> | Vector of (Collateral's token address, Amount of collateral locked by borrower) |

### `LiquidationAmountResponse`

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct LiquidationAmountResponse {
    pub collaterals: TokensHuman, 
}

pub type TokensHuman = Vec<(String, Uint256)>;
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "collaterals": [
    ["terra1...", "100000000"], // (Cw20 Token address, Required liquidation amount to reach safe_ratio)
    ["terra1...", "100000000"] 
  ] 
}
```
{% endtab %}
{% endtabs %}

| Key           | Type        | Description                                   |
| ------------- | ----------- | --------------------------------------------- |
| `collaterals` | TokensHuman | Calculated amount of collaterals to liquidate |

| Key           | Type                   | Description                                                              |
| ------------- | ---------------------- | ------------------------------------------------------------------------ |
| `TokensHuman` | Vec<(String, Uint256)> | Vector of (Collateral's token address, Amount that has to be liquidated) |

### `Bid`

Gets information about the specified `bid_idx`.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    Bid {
        bid_idx: Uint128, 
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "bid": {
    "bid_idx": "123", 
  }
}
```
{% endtab %}
{% endtabs %}

| Key       | Type    | Description           |
| --------- | ------- | --------------------- |
| `bid_idx` | Uint128 | Bid unique identifier |

### `BidResponse`

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct BidResponse {
    pub idx: Uint128,
    pub collateral_token: String,
    pub premium_slot: u8,
    pub bidder: String,
    pub amount: Uint256,
    pub product_snapshot: Decimal256,
    pub sum_snapshot: Decimal256,
    pub pending_liquidated_collateral: Uint256,
    pub wait_end: Option<u64>,
    pub epoch_snapshot: Uint128,
    pub scale_snapshot: Uint128,
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "idx": "123",
  "collateral_token": "terra1...", 
  "premium_slot": "10",
  "bidder": "terra1...", 
  "amount": "100000000", 
  "product_snapshot": "1.0",
  "sum_snapshot": "1.0",
  "pending_liquidated_collateral": "0",
  "wait_end": "1635228109",
  "epoch_snapshot": "0",
  "scale_snapshot": "0"
}
```
{% endtab %}
{% endtabs %}

| Key                             | Type       | Description                                                            |
| ------------------------------- | ---------- | ---------------------------------------------------------------------- |
| `bid_idx`                       | Uint128    | Bid unique identifier                                                  |
| `collateral_token`              | String     | Token contract address of bidding collateral                           |
| `premium_slot`                  | u8         | Premium rate slot to which the bid is submitted to                     |
| `bidder`                        | String     | Address of bidder                                                      |
| `amount`                        | Uint256    | Amount of stablecoins put up in bid                                    |
| `product_snapshot`              | Decimal256 | Snapshot of the bid pool's product at the time of activation           |
| `sum_snapshot`                  | Decimal256 | Snapshot of the bid pool's sum at the time of activation               |
| `pending_liquidated_collateral` | Uint256    | Amount of claimable collateral                                         |
| `wait_end`                      | u64        | Timestamp (seconds) when bid can be activated, empty if already active |
| `epoch_snapshot`                | Uint128    | Snapshot of the bid pool epoch at the time of activation               |
| `scale_snapshot`                | Uint128    | Snapshot of the bid pool scale at the time of activation               |

### `BidsByUser`

Gets information for all bids submitted by the specified bidder and collateral.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    BidsByUser {
        collateral_token: String,
        bidder: String, 
        start_after: Option<Uint128>, 
        limit: Option<u8>, 
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "bids_by_user": {
    "collateral_token": "terra1...",
    "bidder": "terra1...", 
    "start_after": "123", 
    "limit": 8 
  }
}
```
{% endtab %}
{% endtabs %}

| Key             | Type    | Description                                    |
| --------------- | ------- | ---------------------------------------------- |
| `bidder`        | String  | Address of bidder                              |
| `start_after`\* | Uint128 | User bid idx to start the query after          |
| `limit`\*       | u8      | Maximum number of query entries (capped at 31) |

### `BidsByUserResponse`

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct BidsResponse {
    pub bids: Vec<BidResponse>, 
}

pub struct BidResponse {
    pub idx: Uint128,
    pub collateral_token: String,
    pub premium_slot: u8,
    pub bidder: String,
    pub amount: Uint256,
    pub product_snapshot: Decimal256,
    pub sum_snapshot: Decimal256,
    pub pending_liquidated_collateral: Uint256,
    pub wait_end: Option<u64>,
    pub epoch_snapshot: Uint128,
    pub scale_snapshot: Uint128,
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "bids": [
    {
      "idx": "12",
      "collateral_token": "terra1...", 
      "premium_slot": "10",
      "bidder": "terra1...", 
      "amount": "100000000", 
      "product_snapshot": "1.0",
      "sum_snapshot": "1.0",
      "pending_liquidated_collateral": "0",
      "wait_end": "1635228109",
      "epoch_snapshot": "0",
      "scale_snapshot": "0"
    }, 
    {
      "idx": "26",
      "collateral_token": "terra1...", 
      "premium_slot": "11",
      "bidder": "terra1...", 
      "amount": "200000000", 
      "product_snapshot": "1.0",
      "sum_snapshot": "1.0",
      "pending_liquidated_collateral": "0",
      "wait_end": "1635228109",
      "epoch_snapshot": "0",
      "scale_snapshot": "0"
    }
  ]
}
```
{% endtab %}
{% endtabs %}

| Key    | Type              | Description                      |
| ------ | ----------------- | -------------------------------- |
| `bids` | Vec\<BidResponse> | Vector of user's bid information |

| Key                             | Type       | Description                                                            |
| ------------------------------- | ---------- | ---------------------------------------------------------------------- |
| `bid_idx`                       | Uint128    | Bid unique identifier                                                  |
| `collateral_token`              | String     | Token contract address of bidding collateral                           |
| `premium_slot`                  | u8         | Premium rate slot to which the bid is submitted to                     |
| `bidder`                        | String     | Address of bidder                                                      |
| `amount`                        | Uint256    | Amount of stablecoins put up in bid                                    |
| `product_snapshot`              | Decimal256 | Snapshot of the bid pool's product at the time of activation           |
| `sum_snapshot`                  | Decimal256 | Snapshot of the bid pool's sum at the time of activation               |
| `pending_liquidated_collateral` | Uint256    | Amount of claimable collateral                                         |
| `wait_end`                      | u64        | Timestamp (seconds) when bid can be activated, empty if already active |
| `epoch_snapshot`                | Uint128    | Snapshot of the bid pool epoch at the time of activation               |
| `scale_snapshot`                | Uint128    | Snapshot of the bid pool scale at the time of activation               |

### `BidPool`

Gets information about the bid pool for the specified `collateral_token` and `bid_slot`.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    BidPool {
        collateral_token: String,
        bid_slot: u8,
    },
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "bid_pool": {
    "collateral_token": "terra1...",
    "bid_slot": 10, 
  }
}
```
{% endtab %}
{% endtabs %}

| Key                | Type   | Description                                  |
| ------------------ | ------ | -------------------------------------------- |
| `collateral_token` | String | Token contract address of bidding collateral |
| `premium_slot`     | u8     | Premium rate slot                            |

### `BidPoolResponse`

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct BidPoolResponse {
    pub sum_snapshot: Decimal256,
    pub product_snapshot: Decimal256,
    pub total_bid_amount: Uint256,
    pub premium_rate: Decimal256,
    pub current_epoch: Uint128,
    pub current_scale: Uint128,
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "sum_snapshot": "1.0",
  "product_snapshot": "1.0",
  "total_bid_amount": "1000000",
  "premium_rate": "0.1",
  "current_epoch": "0",
  "current_scale": "0"
}
```
{% endtab %}
{% endtabs %}

| Key                | Type       | Description                                                                          |
| ------------------ | ---------- | ------------------------------------------------------------------------------------ |
| `sum_snapshot`     | Decimal256 | Internal parameter that represents amount of collateral liquidated to be distributed |
| `product_snapshot` | Decimal256 | Internal parameter that represents rate at which bids are consumed                   |
| `total_bid_amount` | Uint256    | Total remaining bid amount for this pool                                             |
| `premium_rate`     | Decimal256 | Discount rate at which the bid pool buys liquidated collateral                       |
| `current_epoch`    | Uint128    | Increases every time all bids in the bid pool are totally consumed                   |
| `current_scale`    | Uint128    | Increases every time `product_snapshot` is scaled, resets when epoch changes         |

### `BidPoolsByCollateral`

Gets information about all bid pools for the specified collateral.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    BidPoolsByCollateral {
        collateral_token: String,
        start_after: Option<u8>,
        limit: Option<u8>,
    },
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "bid_pools_by_collateral": {
    "collateral_token": "terra1...", 
    "start_after": 1, 
    "limit": 10 
  }
}
```
{% endtab %}
{% endtabs %}

| Key                | Type   | Description                                    |
| ------------------ | ------ | ---------------------------------------------- |
| `collateral_token` | String | Token contract address of collateral           |
| `start_after`\*    | u8     | Premium slot to start the query after          |
| `limit`\*          | u32    | Maximum number of query entries (capped at 31) |

\* = optional

### `BidPoolsByCollateralResponse`

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct BidPoolsResponse {
    pub bid_pools: Vec<BidPoolResponse>,
}

pub struct BidPoolResponse {
    pub sum_snapshot: Decimal256,
    pub product_snapshot: Decimal256,
    pub total_bid_amount: Uint256,
    pub premium_rate: Decimal256,
    pub current_epoch: Uint128,
    pub current_scale: Uint128,
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "bid_pools": [
    {
      "sum_snapshot": "1.0",
      "product_snapshot": "1.0",
      "total_bid_amount": "1000000",
      "premium_rate": "0.1",
      "current_epoch": "0",
      "current_scale": "0"
    }, 
    {
      "sum_snapshot": "1.0",
      "product_snapshot": "1.0",
      "total_bid_amount": "2000000",
      "premium_rate": "0.2",
      "current_epoch": "0",
      "current_scale": "0"
    }
  ]
}
```
{% endtab %}
{% endtabs %}

| Key         | Type                  | Description                     |
| ----------- | --------------------- | ------------------------------- |
| `bid_pools` | Vec\<BidPoolResponse> | Vector of bid pools information |

| Key                | Type       | Description                                                                          |
| ------------------ | ---------- | ------------------------------------------------------------------------------------ |
| `sum_snapshot`     | Decimal256 | Internal parameter that represents amount of collateral liquidated to be distributed |
| `product_snapshot` | Decimal256 | Internal parameter that represents rate at which bids are consumed                   |
| `total_bid_amount` | Uint256    | Total remaining bid amount for this pool                                             |
| `premium_rate`     | Decimal256 | Discount rate at which the bid pool buys liquidated collateral                       |
| `current_epoch`    | Uint128    | Increases every time all bids in the bid pool are totally consumed                   |
| `current_scale`    | Uint128    | Increases every time `product_snapshot` is scaled, resets when epoch changes         |
