# Converter

The Converter contract is used to convert between wrapped bAsset tokens (wrapped tokens transferred to Terra via Wormhole bridge) and Anchor collateral bAsset tokens (token registered as Anchor collateral).

The existence of two bAsset tokens is due reward-accruing functionalities required for Anchor collateral tokens, which is not available on Wormhole wrapped tokens (automatically created by Wormhole bridge).&#x20;

The Converter contract allows users to convert between the two tokens. Locking Wormhole wrapped tokens mints new Anchor collateral bAsset tokens in 1:1 ratio and vice versa.

## Contract State

### Config

Stores information about the contract configuration.

```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Config {
    pub owner: CanonicalAddr,
    pub anchor_token_address: Option<CanonicalAddr>,
    pub wormhole_token_address: Option<CanonicalAddr>,
}
```

| Key                        | Type          | Description                                        |
| -------------------------- | ------------- | -------------------------------------------------- |
| `owner`                    | CanonicalAddr | Address of contract owner                          |
| `anchor_token_address`\*   | CanonicalAddr | Contract address of Wormhole wrapped token         |
| `wormhole_token_address`\* | CanonicalAddr | Contract address of Anchor bAsset collateral token |

\* = not stored until value registered

## InstantiateMsg

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct InstantiateMsg {
    pub owner: String,
}
```

| Key     | Type   | Description               |
| ------- | ------ | ------------------------- |
| `owner` | String | Address of contract owner |
{% endtab %}

{% tab title="JSON" %}
```json
{
  "owner": "terra1..." 
}
```

| Key     | Type   | Description               |
| ------- | ------ | ------------------------- |
| `owner` | String | Address of contract owner |
{% endtab %}
{% endtabs %}

## ExecuteMsg

### `Receive`

Can be called during a CW20 token transfer when the Mint contract is the recipient. Allows the token transfer to execute a Receive Hook as a subsequent action within the same transaction.

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

| Key      | Type    | Description                                   |
| -------- | ------- | --------------------------------------------- |
| `sender` | String  | Sender of token transfer                      |
| `amount` | Uint128 | Amount of tokens received                     |
| `msg`    | Binary  | Base64-encoded string of JSON of Receive Hook |
{% endtab %}

{% tab title="JSON" %}
```json
{
  "receive": {
    "sender": "terra1...",
    "amount": "10000000",
    "msg": "eyAiZXhlY3V0ZV9tc2ciOiAiYmxhaCBibGFoIiB9"
  }
}
```

| Key      | Type    | Description                                   |
| -------- | ------- | --------------------------------------------- |
| `sender` | String  | Sender of token transfer                      |
| `amount` | Uint128 | Amount of tokens received                     |
| `msg`    | Binary  | Base64-encoded string of JSON of Receive Hook |
{% endtab %}
{% endtabs %}

### RegisterTokens

Registers token contract addresses.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    RegisterTokens {
        wormhole_token_address: String,
        anchor_token_address: String,
    },
}
```

| Key                      | Type   | Description                                        |
| ------------------------ | ------ | -------------------------------------------------- |
| `wormhole_token_address` | String | Contract address of Wormhole wrapped token         |
| `anchor_token_address`   | String | Contract address of Anchor bAsset collateral token |
{% endtab %}

{% tab title="JSON" %}
```json
{
  "register_tokens": {
    "wormhole_token_address": "terra1...", 
    "anchor_token_address": "terra1..." 
  }
}
```

| Key                      | Type   | Description                                        |
| ------------------------ | ------ | -------------------------------------------------- |
| `wormhole_token_address` | String | Contract address of Wormhole wrapped token         |
| `anchor_token_address`   | String | Contract address of Anchor bAsset collateral token |
{% endtab %}
{% endtabs %}

## Receive Hooks

### `ConvertWormholeToAnchor`

Converts Wormhole wrapped tokens to Anchor collateral bAsset tokens.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum Cw20HookMsg {
    ConvertWormholeToAnchor {}
}
```

| Key | Type | Description |
| --- | ---- | ----------- |
|     |      |             |
{% endtab %}

{% tab title="JSON" %}
```json
{
  "convert_wormhole_to_anchor": {}
}
```

| Key | Type | Description |
| --- | ---- | ----------- |
|     |      |             |
{% endtab %}
{% endtabs %}

### `ConvertAnchorToWormhole`

Converts Anchor collateral bAsset tokens to Wormhole wrapped tokens.

{% tabs %}
{% tab title="Rust" %}
```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum Cw20HookMsg {
    ConvertAnchorToWormhole {}
}
```

| Key | Type | Description |
| --- | ---- | ----------- |
|     |      |             |
{% endtab %}

{% tab title="JSON" %}
```json
{
  "convert_anchor_to_wormhole": {}
}
```

| Key | Type | Description |
| --- | ---- | ----------- |
|     |      |             |
{% endtab %}
{% endtabs %}

## QueryMsg

### `Config`

Gets the contract configuration.

{% tabs %}
{% tab title="Rust" %}
#### Request

```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    Config {},
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
    pub wormhole_token_address: Option<String>,
    pub anchor_token_address: Option<String>,
}
```

|                            |        |                                             |
| -------------------------- | ------ | ------------------------------------------- |
| `owner`                    | String | Address of contract owner                   |
| `wormhole_token_address`\* | String | Contract address of Wormhole wrapped token  |
| `anchor_token_address`\*   | String | Contract address of Anchor collateral token |

\* = optional
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
  "wormhole_token_address": "terra1...", 
  "anchor_token_address": "terra1..." 
}
```

|                            |        |                                             |
| -------------------------- | ------ | ------------------------------------------- |
| `owner`                    | String | Address of contract owner                   |
| `wormhole_token_address`\* | String | Contract address of Wormhole wrapped token  |
| `anchor_token_address`\*   | String | Contract address of Anchor collateral token |

\* = optional
{% endtab %}
{% endtabs %}
