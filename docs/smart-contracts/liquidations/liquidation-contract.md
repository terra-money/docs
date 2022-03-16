# Liquidation Contract

The Liquidation Contract enables users to submit Terra stablecoin bids for a Cw20-compliant token. Bidders can specify the rate of premium they will receive on bid execution, and the maximum premium rate is set at 30%.

Upon execution of a bid, Cw20 tokens are sent to the bidder, while the bidder's Terra stablecoins are sent to the repay address (if not specified, sent to message sender). The oracle contract is responsible for providing the relevant Cw20 token prices.

Additionally, the Liquidation Contract serves as the point of calculation for partial collateral liquidations, where a loan position is liquidated until it reaches a safe `borrow_amount / borrow_limit` ratio. The required liquidation amount for each collateral is calculated based on the fed-in loan position's attributes.

Price data from the Oracle contract are only valid for 60 seconds (`price_timeframe`). The Liquidation contract disables bid executions until new price data is fed-in to the Oracle contract.

## Config

| Key                     | Type          | Description                                                                   |
| ----------------------- | ------------- | ----------------------------------------------------------------------------- |
| `owner`                 | CanonicalAddr | Address of contract owner that can update config                              |
| `oracle_contract`       | CanonicalAddr | Contract address of Oracle                                                    |
| `stable_denom`          | String        | Native token denomination for bids                                            |
| `safe_ratio`            | Decimal256    | A liability / borrow limit ratio of a loan deemed safe                        |
| `bid_fee`               | Decimal256    | Fee rate applied to all executed bids                                         |
| `max_premium_rate`      | Decimal256    | Maximum rate of commission given to bidder of an executed bid                 |
| `liquidation_threshold` | Uint256       | Threshold collateral value for partial collateral liquidations                |
| `price_timeframe`       | u64           | Window of time before oracle price data is considered outdated **\[seconds]** |

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
    pub max_premium_rate: Decimal256, 
    pub liquidation_threshold: Uint256, 
    pub price_timeframe: u64, 
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
  "max_premium_rate": "0.05", 
  "liquidation_threshold": "500", 
  "price_timeframe": 60 
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
| `max_premium_rate`      | Decimal256 | Maximum rate of commission given to the bidder of an executed bid             |
| `liquidation_threshold` | Uint256    | Threshold collateral value for triggering partial collateral liquidations     |
| `price_timeframe`       | u64        | Window of time before oracle price data is considered outdated **\[seconds]** |

## ExecuteMsg

### `Receive`

Can be called during a CW20 token transfer when the Liquidation Contract is the recipient. Allows the token transfer to execute a [Receive Hook](liquidation-contract.md#receive-hooks) as a subsequent action within the same transaction.

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

Updates the Liquidation Contract's configuration. Can only be issued by the owner.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg { 
    UpdateConfig {
        owner: Option<String>, 
        oracle_contract: Option<String>, 
        stable_denom: Option<String>, 
        safe_ratio: Option<Decimal256>, 
        bid_fee: Option<Decimal256>, 
        max_premium_rate: Option<Decimal256>, 
        liquidation_threshold: Option<Uint256>, 
        price_timeframe: Option<u64>, 
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
    "stable_denom": "uusd", 
    "safe_ratio": "0.8", 
    "bid_fee": "0.01", 
    "max_premium_rate": "0.05", 
    "liquidation_threshold": "200000000", 
    "price_timeframe": 60 
  }
}
```
{% endtab %}
{% endtabs %}

| Key                       | Type       | Description                                                                   |
| ------------------------- | ---------- | ----------------------------------------------------------------------------- |
| `owner`\*                 | String     | Address of new owner                                                          |
| `oracle_contract`\*       | String     | New oracle contract address                                                   |
| `stable_denom`\*          | String     | New native token denomination for bids                                        |
| `safe_ratio`\*            | Decimal256 | New liability / borrow limit of a loan deemed safe                            |
| `bid_fee`\*               | Decimal256 | New fee rate applied to executed bids                                         |
| `max_premium_rate`\*      | Decimal256 | New maximum rate of commission given to the bidder of  an executed bid        |
| `liquidation_threshold`\* | Uint256    | New threshold collateral value for triggering partial collateral liquidations |
| `price_timeframe`\*       | u64        | New window of time before price data is considered outdated **\[seconds]**    |

\* = optional

### `SubmitBid`

Submits a new bid for the specified Cw20 collateral with the specified premium rate. Requires Terra stablecoins to be sent beforehand.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    SubmitBid {
        collateral_token: String, 
        premium_rate: Decimal256, 
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "submit_bid": {
    "collateral_token": "terra1...", 
    "premium_rate": "0.03" 
  }
}
```
{% endtab %}
{% endtabs %}

| Key                | Type       | Description                                       |
| ------------------ | ---------- | ------------------------------------------------- |
| `collateral_token` | String     | Cw20 token contract address of bidding collateral |
| `premium_rate`     | Decimal256 | Rate of commission on executing this bid          |

### `RetractBid`

Withdraws specified amount of stablecoins from the bid for the specified collateral. Withdraws the entire bid for the specified collateral if the `amount` field is not filled.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    RetractBid {
        collateral_token: String, 
        amount: Option<Uint256>, 
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "retract_bid": {
    "collateral_token": "terra1...", 
    "amount": "100000000" 
  }
}
```
{% endtab %}
{% endtabs %}

| Key                | Type    | Description                                       |
| ------------------ | ------- | ------------------------------------------------- |
| `collateral_token` | String  | Cw20 token contract address of bidding collateral |
| `amount`\*         | Uint256 | Amount of stablecoins remove from bid             |

\* = optional

## Receive Hooks

### `ExecuteBid`

Liquidates collateral by executing an existing bid for the received collateral. Requires the `liquidator` to have an existing bid. For Usage in Anchor, `Custody` issues this message with `fee_address` as `Overseer`'s contract address and `repay_address` as `Market`'s contract address, where stablecoins from the bid is sent to the Market contract to repay a borrower's loan and fees are sent to the Overseer contract to be added to the interest buffer.

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

| Key               | Type   | Description                                         |
| ----------------- | ------ | --------------------------------------------------- |
| `liquidator`      | String | Address of collateral liquidator                    |
| `fee_address`\*   | String | Address to receive `bid_fee` from liquidation       |
| `repay_address`\* | String | Address to receive bid stablecoins from liquidation |

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

| Key | Type | Description |
| --- | ---- | ----------- |
|     |      |             |

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
    pub max_premium_rate: Decimal256, 
    pub liquidation_threshold: Uint256, 
    pub price_timeframe: u64, 
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
  "max_premium_rate": "0.05", 
  "liquidation_threshold": "200000000", 
  "price_timeframe": 60 
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
| `max_premium_rate`      | Decimal256 | Maximum rate of commission given to bidder of an executed bid          |
| `liquidation_threshold` | Uint256    | Threshold collateral value for partial collateral liquidations         |
| `price_timeframe`       | u64        | Window of time before price data is considered outdated **\[seconds]** |

### `LiquidationAmount`

Gets the amount of collaterals that needs to be liquidated in order for the borrower's loan to reach `safe_ratio`, based on the fed in borrower's status.

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

Gets information about the specified bidder's bid for the specified collateral.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    Bid {
        collateral_token: String, 
        bidder: String, 
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "bid": {
    "collateral_token": "terra1...", 
    "bidder": "terra1..." 
  }
}
```
{% endtab %}
{% endtabs %}

| Key                | Type   | Description                                  |
| ------------------ | ------ | -------------------------------------------- |
| `collateral_token` | String | Token contract address of bidding collateral |
| `bidder`           | String | Address of bidder                            |

### `BidResponse`

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct BidResponse {
    pub collateral_token: String, 
    pub bidder: String, 
    pub amount: Uint256, 
    pub premium_rate: Decimal256, 
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "collateral_token": "terra1...", 
  "bidder": "terra1...", 
  "amount": "100000000", 
  "premium_rate": "0.03" 
}
```
{% endtab %}
{% endtabs %}

| Key                | Type       | Description                                           |
| ------------------ | ---------- | ----------------------------------------------------- |
| `collateral_token` | String     | Token contract address of bidding collateral          |
| `bidder`           | String     | Address of bidder                                     |
| `amount`           | Uint256    | Amount of stablecoins put up in bid                   |
| `premium_rate`     | Decimal256 | Rate of commission taken by bidder upon bid execution |

### `BidsByUser`

Gets information for all bids submitted by the specified bidder

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    BidsByUser {
        bidder: String, 
        start_after: Option<String>, 
        limit: Option<u32>, 
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "bids_by_user": {
    "bidder": "terra1...", 
    "start_after": "terra1...", 
    "limit": 8 
  }
}
```
{% endtab %}
{% endtabs %}

| Key             | Type   | Description                                         |
| --------------- | ------ | --------------------------------------------------- |
| `bidder`        | String | Address of bidder                                   |
| `start_after`\* | String | Token contract address of collateral to start query |
| `limit`\*       | u32    | Maximum number of query entries                     |

### `BidsByUserResponse`

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct BidsResponse {
    pub bids: Vec<BidResponse>, 
}

pub struct BidResponse {
    pub collateral_token: String, 
    pub bidder: String, 
    pub amount: Uint256, 
    pub premium_rate: Decimal256, 
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "bids": [
    {
      "collateral_token": "terra1...", 
      "bidder": "terra1...", 
      "amount": "100000000", 
      "premium_rate": "0.03" 
    }, 
    {
      "collateral_token": "terra1...", 
      "bidder": "terra1...", 
      "amount": "100000000", 
      "premium_rate": "0.03" 
    }
  ]
}
```
{% endtab %}
{% endtabs %}

| Key    | Type              | Description                      |
| ------ | ----------------- | -------------------------------- |
| `bids` | Vec\<BidResponse> | Vector of user's bid information |

| Key                | Type       | Description                                           |
| ------------------ | ---------- | ----------------------------------------------------- |
| `collateral_token` | String     | Token contract address of bidding collateral          |
| `bidder`           | String     | Address of bidder                                     |
| `amount`           | Uint256    | Amount of stablecoins put up in bid                   |
| `premium_rate`     | Decimal256 | Rate of commission taken by bidder upon bid execution |

### `BidsByCollateral`

Gets bid information for all bids submitted for the specified collateral.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    BidsByCollateral {
        collateral_token: String, 
        start_after: Option<String>, 
        limit: Option<u32>, 
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "bids_by_collateral": {
    "collateral_token": "terra1...", 
    "start_after": "terra1...", 
    "limit": 10 
  }
}
```
{% endtab %}
{% endtabs %}

| Key                | Type   | Description                                         |
| ------------------ | ------ | --------------------------------------------------- |
| `collateral_token` | String | Token contract address of collateral                |
| `start_after`\*    | String | Token contract address of collateral to start query |
| `limit`\*          | u32    | Maximum number of query entries                     |

\* = optional

### `BidsByCollateralResponse`

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct BidsResponse {
    pub bids: Vec<BidResponse>, 
}

pub struct BidResponse {
    pub collateral_token: String, 
    pub bidder: String, 
    pub amount: Uint256, 
    pub premium_rate: Decimal256, 
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "bids": [
    {
      "collateral_token": "terra1...", 
      "bidder": "terra1...", 
      "amount": "100000000", 
      "premium_rate": "0.03" 
    }, 
    {
      "collateral_token": "terra1...", 
      "bidder": "terra1...", 
      "amount": "100000000", 
      "premium_rate": "0.03" 
    }
  ]
}
```
{% endtab %}
{% endtabs %}

| Key    | Type              | Description                      |
| ------ | ----------------- | -------------------------------- |
| `bids` | Vec\<BidResponse> | Vector of user's bid information |

| Key                | Type       | Description                                           |
| ------------------ | ---------- | ----------------------------------------------------- |
| `collateral_token` | String     | Token contract address of bidding collateral          |
| `bidder`           | String     | Address of bidder                                     |
| `amount`           | Uint256    | Amount of stablecoins put up in bid                   |
| `premium_rate`     | Decimal256 | Rate of commission taken by bidder upon bid execution |
