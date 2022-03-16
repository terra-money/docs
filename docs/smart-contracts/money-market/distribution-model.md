# Distribution Model

The Distribution Model contract manages the calculation of the ANC emission rate, using fed in deposit rate information. At the time of protocol genesis, the emission rate adjusts to double when the deposit rate is below the targeted rate and decreases by 10% if the deposit rate is above the targeted rate. Further descriptions on the ANC emission rate control mechanism can be found [here](../../protocol/money-market/deposit-rate-subsidization.md#anc-emission-feedback-control).

## Config

| Key                    | Type          | Description                              |
| ---------------------- | ------------- | ---------------------------------------- |
| `owner`                | CanonicalAddr | Address of contract owner                |
| `emission_cap`         | Decimal256    | Maximum per-block ANC emission rate      |
| `emission_floor`       | Decimal256    | Minimum per-block ANC emission rate      |
| `increment_multiplier` | Decimal256    | Rate multiplier when increasing emission |
| `decrement_multiplier` | Decimal256    | Rate multiplier when decreasing emission |

## InstantiateMsg

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct InstantiateMsg {
    pub owner: String,
    pub emission_cap: Decimal256,
    pub emission_floor: Decimal256, 
    pub increment_multiplier: Decimal256,
    pub decrement_multiplier: Decimal256,
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "owner": "terra1...", 
  "emission_cap": "10000", 
  "emission_floor": "1000", 
  "increment_multiplier": "2.0", 
  "decrement_multiplier": "0.9" 
}
```
{% endtab %}
{% endtabs %}

| Key                    | Type       | Description                              |
| ---------------------- | ---------- | ---------------------------------------- |
| `owner`                | String     | Address of contract owner                |
| `emission_cap`         | Decimal256 | Maximum per-block ANC emission rate      |
| `emission_floor`       | Decimal256 | Minimum per-block ANC emission rate      |
| `increment_multiplier` | Decimal256 | Rate multiplier when increasing emission |
| `decrement_multiplier` | Decimal256 | Rate multiplier when decreasing emission |

## ExecuteMsg

### `UpdateConfig`

Updates the Distribution Model contract configuration.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    UpdateConfig {
        owner: Option<String>,
        emission_cap: Option<Decimal256>,
        emission_floor: Option<Decimal256>, 
        increment_multiplier: Option<Decimal256>,
        decrement_multiplier: Option<Decimal256>,
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "update_config": {
    "owner": "terra1...", 
    "emission_cap": "10000", 
    "emission_floor": "1000", 
    "increment_multiplier": "2.0", 
    "decrement_multiplier": "0.9" 
  }
}
```
{% endtab %}
{% endtabs %}

| Key                      | Type       | Description                                  |
| ------------------------ | ---------- | -------------------------------------------- |
| `owner`\*                | String     | Address of new owner                         |
| `emission_cap`\*         | Decimal256 | New maximum per-block ANC emission rate      |
| `emission_floor`\*       | Decimal256 | New minimum per-block ANC emission rate      |
| `increment_multiplier`\* | Decimal256 | New rate multiplier when increasing emission |
| `decrement_multiplier`\* | Decimal256 | New rate multiplier when decreasing emission |

\* = optional

## QueryMsg

### `Config`

Gets the Distribution Model contract configuration

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
    pub emission_cap: Decimal256,
    pub emission_floor: Decimal256, 
    pub increment_multiplier: Decimal256,
    pub decrement_multiplier: Decimal256,
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "owner": "terra1...", 
  "emission_cap": "10000", 
  "emission_floor": "1000", 
  "increment_multiplier": "2.0", 
  "decrement_multiplier": "0.9" 
}
```
{% endtab %}
{% endtabs %}

| Key                    | Type       | Description                              |
| ---------------------- | ---------- | ---------------------------------------- |
| `owner`                | String     | Address of contract owner                |
| `emission_cap`         | Decimal256 | Maximum per-block ANC emission rate      |
| `emission_floor`       | Decimal256 | Minimum per-block ANC emission rate      |
| `increment_multiplier` | Decimal256 | Rate multiplier when increasing emission |
| `decrement_multiplier` | Decimal256 | Rate multiplier when decreasing emission |

### `ANCEmissionRate`

Gets the ANC emission rate, calculated based on deposit rate situations.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    ANCEmissionRate {
        deposit_rate: Decimal256, 
        target_deposit_rate: Decimal256, 
        threshold_deposit_rate: Decimal256, 
        current_emission_rate: Decimal256, 
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "anc_emission_rate": {
    "deposit_rate": "0.0001", 
    "target_deposit_rate": "0.00015", 
    "threshol_deposit_rate": "0.00010", 
    "current_emission_rate": "5000" 
  }
}
```
{% endtab %}
{% endtabs %}

| Key                      | Type       | Description                                          |
| ------------------------ | ---------- | ---------------------------------------------------- |
| `deposit_rate`           | Decimal256 | Average per-block deposit rate during the last epoch |
| `target_deposit_rate`    | Decimal256 | Target per-block deposit rate of Anchor              |
| `threshold_deposit_rate` | Decimal256 | Minimum per-block deposit rate supported by Anchor   |
| `current_emission_rate`  | Decimal256 | Current per-block ANC emission rate                  |

### `ANCEmissionRateResponse`

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct ANCEmissionRateResponse {
    pub emission_rate: Decimal256,
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "emission_rate": "10000"
}
```
{% endtab %}
{% endtabs %}

| Key             | Type       | Description                            |
| --------------- | ---------- | -------------------------------------- |
| `emission_rate` | Decimal256 | Calculated per-block ANC emission rate |
