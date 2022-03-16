# Interest Model

The Interest Model contract is responsible for calculating the current borrow interest rate for stablecoin loans, based on the fed in market details. The interest rate is initially set to increase proportionally with market utilization, or the stablecoin borrow demand of the Anchor Money Market.

## Config

| Key                   | Type          | Description                                                    |
| --------------------- | ------------- | -------------------------------------------------------------- |
| `owner`               | CanonicalAddr | Address of contract owner that can update model configuration  |
| `base_rate`           | Decimal256    | Minimum per-block interest rate applied to borrows             |
| `interest_multiplier` | Decimal256    | Multiplier between utilization ratio and per-block borrow rate |

## InstantiateMsg

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct InstantiateMsg {
    pub owner: String, 
    pub base_rate: Decimal256, 
    pub interest_multiplier: Decimal256, 
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "owner": "terra1...", 
  "base_rate": "0.000000002", 
  "interest_multiplier": "0.00000004" 
}
```
{% endtab %}
{% endtabs %}

| Key                   | Type       | Description                                                    |
| --------------------- | ---------- | -------------------------------------------------------------- |
| `owner`               | String     | Address of contract owner that can update model parameters     |
| `base_rate`           | Decimal256 | Minimum per-block interest rate applied to borrows             |
| `interest_multiplier` | Decimal256 | Multiplier between utilization ratio and per-block borrow rate |

## ExecuteMsg

### `UpdateConfig`

Updates the configuration of the interest model contract. This message can only be issued by the owner.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    UpdateConfig {
        owner: Option<String>, 
        base_rate: Option<Decimal256>, 
        interest_multiplier: Option<Decimal256>, 
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "update_config": {
    "owner": "terra1...", 
    "base_rate": "0.000000002", 
    "interest_multiplier": "0.00000004" 
  }
}
```
{% endtab %}
{% endtabs %}

| Key                     | Type       | Description                       |
| ----------------------- | ---------- | --------------------------------- |
| `owner`\*               | String     | Address of new owner              |
| `base_rate`\*           | Decimal256 | New minimum per-block borrow rate |
| `interest_multiplier`\* | Decimal256 | New borrow rate multiplier        |

\* = optional

## QueryMsg

### `Config`

Gets the interest model contract configuration.

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
    pub base_rate: Decimal256, 
    pub interest_multiplier: Decimal256, 
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "owner": "terra1...", 
  "base_rate": "0.000000002", 
  "interest_multiplier": "0.00000004" 
}
```
{% endtab %}
{% endtabs %}

| Key                   | Type       | Description                   |
| --------------------- | ---------- | ----------------------------- |
| `owner`               | String     | Address of contract owner     |
| `base_rate`           | Decimal256 | Minimum per-block borrow rate |
| `interest_multiplier` | Decimal256 | Borrow rate multiplier        |

### `BorrowRate`

Gets the calculated per-block borrow rate, based on fed in market conditions.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    BorrowRate {
        market_balance: Uint256, 
        total_liabilities: Decimal256, 
        total_reserves: Decimal256, 
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "borrow_rate": {
    "market_balance": "123.456789", 
    "total_liabilities": "12.3456789", 
    "total_reserves": "1.23456789" 
  }
}
```
{% endtab %}
{% endtabs %}

| Key                 | Type       | Description                          |
| ------------------- | ---------- | ------------------------------------ |
| `market_balance`    | Uint256    | Stablecoin balance of `Market`       |
| `total_liabilities` | Decimal256 | Total amount of borrower liabilities |
| `total_reserves`    | Decimal256 | Amount of `Market` contract reserves |

### `BorrowRateResponse`

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct BorrowRateResponse {
    pub rate: Decimal256, 
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "rate": "0.000000005" 
}
```
{% endtab %}
{% endtabs %}

| Key    | Type       | Description                      |
| ------ | ---------- | -------------------------------- |
| `rate` | Decimal256 | Calculated per-block borrow rate |
