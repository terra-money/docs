# Collector

The Collector accumulates Anchor protocol fees and swaps them to ANC through the ANC <> UST Terraswap pair. Swapped ANC tokens are distributed to ANC stakers (sent to Gov contract).

## Config

| Name                   | Type          | Description                                       |
| ---------------------- | ------------- | ------------------------------------------------- |
| `gov_contract`         | CanonicalAddr | Contract address of Gov                           |
| `terraswap_factory`    | CanonicalAddr | Contract address of Terraswap Factory             |
| `anchor_token`         | CanonicalAddr | Contract address of Anchor Token (ANC)            |
| `distributor_contract` | CanonicalAddr | Contract address of Distributor                   |
| `reward_factor`        | Decimal       | Ratio of purchased ANC distributed to ANC stakers |

## InstantiateMsg

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct InstantiateMsg {
    pub gov_contract: String, 
    pub terraswap_factory: String,
    pub anchor_token: String,
    pub distributor_contract: String,
    pub reward_factor: Decimal,
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "gov_contract": "terra1...", 
  "terraswap_factory": "terra1...", 
  "anchor_token": "terra1...", 
  "distributor_contract": "terra1...", 
  "reward_factor": "0.5" 
}
```
{% endtab %}
{% endtabs %}

| Name                   | Type    | Description                                       |
| ---------------------- | ------- | ------------------------------------------------- |
| `gov_contract`         | String  | Contract address of Gov                           |
| `terraswap_factory`    | String  | Contract address of Terraswap Factory             |
| `anchor_token`         | String  | Contract address of Anchor Token (ANC)            |
| `distributor_contract` | String  | Contract address of Distributor                   |
| `reward_factor`        | Decimal | Ratio of purchased ANC distributed to ANC stakers |

## ExecuteMsg

### `UpdateConfig`

Updates the Collector contract configuration.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    UpdateConfig {
        reward_factor: Option<Decimal>, 
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "update_config": {
    "reward_factor": "0.5" 
  }
}
```
{% endtab %}
{% endtabs %}

| Name              | Type    | Description                                           |
| ----------------- | ------- | ----------------------------------------------------- |
| `reward_factor`\* | Decimal | New ratio of purchased ANC distributed to ANC stakers |

\* = optional

### `Sweep`

Can be issued by anyone to swap `denom` Terra stablecoins in the Collector contract to ANC tokens. Afterwards, distributes `reward_factor` portion of swapped ANC tokens to ANC stakers. Can be issued by anyone.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    Sweep {
        denom: String, 
    }
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "sweep": {
    "denom": "uusd" // Terra USD
  }
}
```
{% endtab %}
{% endtabs %}

| Name    | Type   | Description                        |
| ------- | ------ | ---------------------------------- |
| `denom` | String | Denomination of stablecoin to swap |

## QueryMsg

### `Config`

Gets the Collector contract configuration.

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

| Name | Type | Description |
| ---- | ---- | ----------- |
|      |      |             |

### `ConfigResponse`

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct ConfigResponse {
    pub gov_contract: String, 
    pub terraswap_factory: String,
    pub anchor_token: String,
    pub distributor_contract: String,
    pub reward_factor: Decimal,
}
```
{% endtab %}

{% tab title="JSON" %}
```javascript
{
  "gov_contract": "terra1...", 
  "terraswap_factory": "terra1...", 
  "anchor_token": "terra1...", 
  "distributor_contract": "terra1...", 
  "reward_weight": "0.5" 
}
```
{% endtab %}
{% endtabs %}

| Name                   | Type    | Description                                       |
| ---------------------- | ------- | ------------------------------------------------- |
| `gov_contract`         | String  | Contract address of Gov                           |
| `terraswap_factory`    | String  | Contract address of Terraswap Factory             |
| `anchor_token`         | String  | Contract address of Anchor Token (ANC)            |
| `distributor_contract` | String  | Contract address of Distributor                   |
| `reward_factor`        | Decimal | Ratio of purchased ANC distributed to ANC stakers |
