# Oracle

The Oracle contract acts as the price source for the Anchor Money Market. Stablecoin-denominated prices of bAssets are periodically reported by oracle feeders, and are made queriable by other smart contracts in the Anchor ecosystem.

## Config

| Key          | Type          | Description                                             |
| ------------ | ------------- | ------------------------------------------------------- |
| `owner`      | CanonicalAddr | Address of contract owner that can feed in price values |
| `base_asset` | String        | Asset which fed-in prices will be denominated in        |

## InstantiateMsg

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct InstantiateMsg {
    pub owner: String, 
    pub base_asset: String, 
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "owner": "terra1...", 
  "base_asset": "uusd" 
}
```
{% endtab %}
{% endtabs %}

| Key          | Type   | Description                                             |
| ------------ | ------ | ------------------------------------------------------- |
| `owner`      | String | Address of contract owner that can feed in price values |
| `base_asset` | String | Asset which fed-in prices will be denominated in        |

## ExecuteMsg

### `UpdateConfig`

Updates the configuration of the contract. Can only be issued by the owner.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    UpdateConfig {
        owner: Option<String>, 
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

| Key       | Type   | Description          |
| --------- | ------ | -------------------- |
| `owner`\* | String | Address of new owner |

\* = optional

### `RegisterFeeder`

Registers a feeder to the specified asset token.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    RegisterFeeder {
        asset: String, 
        feeder: String, 
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "register_feeder": {
    "asset": "terra1...", // Stringified Cw20 contract address
    "feeder": "terra1..." 
  }
}
```
{% endtab %}
{% endtabs %}

| Key      | Type   | Description                   |
| -------- | ------ | ----------------------------- |
| `asset`  | String | Asset to register feeder      |
| `feeder` | String | Address of feeder to register |

### `FeedPrice`

Feeds new price data. Can only be issued by the owner.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    FeedPrice {
        prices: Vec<(String, Decimal256)>, 
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "feed_price": {
    "prices": [
      ["terra1...", "123.456789"], // (Stringified Cw20 contract address, price)
      ["terra1...", "123.456789"] 
    ]
  }
}
```
{% endtab %}
{% endtabs %}

| Key      | Type                      | Description                       |
| -------- | ------------------------- | --------------------------------- |
| `prices` | Vec<(String, Decimal256)> | Vector of assets and their prices |

## QueryMsg

### `Config`

Gets the Oracle contract configuration.

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
    pub base_asset: String, 
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "owner": "terra1...", 
  "base_asset": "uusd" 
}
```
{% endtab %}
{% endtabs %}

| Key          | Type   | Description                                      |
| ------------ | ------ | ------------------------------------------------ |
| `owner`      | String | Address of contract owner                        |
| `base_asset` | String | Asset in which fed-in prices will be denominated |

### `Feeder`

Gets the feeder for the specified asset.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    Feeder {
        asset: String, 
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "feeder": {
    "asset": "terra1..." // Stringified Cw20 Token contract address
  }
}
```
{% endtab %}
{% endtabs %}

| Key     | Type   | Description                     |
| ------- | ------ | ------------------------------- |
| `asset` | String | Asset to get feeder information |

### `FeederResponse`

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct FeederResponse {
    pub asset: String, 
    pub feeder: String, 
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "asset": "terra1...", // Stringified Cw20 Token contract address
  "feeder": "terra1..." 
}
```
{% endtab %}
{% endtabs %}

| Key      | Type   | Description                                             |
| -------- | ------ | ------------------------------------------------------- |
| `asset`  | String | Asset type                                              |
| `feeder` | String | Address of feeder allowed to feed prices for this asset |

### `Price`

Gets price information for the specified base asset denominated in the quote asset.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    Price {
        base: String, 
        quote: String, 
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "price": {
    "base": "terra1...", // Asset token contract HumanAddr in String form
    "quote": "uusd" 
  }
}
```
{% endtab %}
{% endtabs %}

| Key     | Type   | Description                                         |
| ------- | ------ | --------------------------------------------------- |
| `base`  | String | Asset for which to get price                        |
| `quote` | String | Asset in which calculated price will be denominated |

\* = optional

### `PriceResponse`

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct PriceResponse {
    pub rate: Decimal256, 
    pub last_updated_base: u64, 
    pub last_updated_quote: u64, 
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "rate": "123.456789", 
  "last_updated_base": 123456, 
  "last_updated_quote": 123456 
}
```
{% endtab %}
{% endtabs %}

| Key                  | Type       | Description                                                       |
| -------------------- | ---------- | ----------------------------------------------------------------- |
| `rate`               | Decimal256 | Price of `base` asset denominated in `quote` assets               |
| `last_updated_base`  | u64        | Unix block timestamp when the `base` asset price was last fed in  |
| `last_updated_quote` | u64        | Unix block timestamp when the `quote` asset price was last fed in |

### `Prices`

Gets price information for all assets

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    Prices {
        start_after: Option<String>, 
        limit: Option<u32>, 
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "prices": {
    "start_after": "terra1...", // Asset token contract HumanAddr in String form
    "limit": 10
  }
}
```
{% endtab %}
{% endtabs %}

| Key             | Type   | Description                     |
| --------------- | ------ | ------------------------------- |
| `start_after`\* | String | Asset to start query            |
| `limit`\*       | u32    | Maximum number of query entries |

### `PricesResponse`

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct PricesResponse {
    pub prices: Vec<PricesResponseElem>, 
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct PricesResponseElem {
    pub asset: String,
    pub price: Decimal256,
    pub last_updated_time: u64,
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "prices": [
    {
      "asset": "terra1...", // Stringified Cw20 token contract HumanAddr
      "price": "123.45678", 
      "last_updated_time": 10000 
    }
    {
      "asset": "terra1...", // Stringified Cw20 token contract HumanAddr
      "price": "123.45678", 
      "last_updated_time": 10000 
    }
  ]
}
```
{% endtab %}
{% endtabs %}

| Key      | Type                     | Description                       |
| -------- | ------------------------ | --------------------------------- |
| `prices` | Vec\<PricesResponseElem> | Vector of Asset price information |

| Key                 | Type       | Description                                          |
| ------------------- | ---------- | ---------------------------------------------------- |
| `asset`             | String     | Asset whose price is being read                      |
| `price`             | Decimal256 | Price of Asset                                       |
| `last_updated_time` | u64        | Unix block timestamp when the price was last updated |
