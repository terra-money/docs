# WASM

## Concepts

## Data

## State

## Messages

### MsgStoreCode

```go
type MsgStoreCode struct {
	Sender sdk.AccAddress `json:"sender" yaml:"sender"`
	// WASMByteCode can be raw or gzip compressed
	WASMByteCode core.Base64Bytes `json:"wasm_byte_code" yaml:"wasm_byte_code"`
}
```

::: details JSON Example

```json
{
  "type": "wasm/StoreCode",
  "value": {
    "sender": "terra...",
    "wasm_byte_code": "QmFzZTY0LWVuY29kZWQgV0FTTSBiaW5hcnk="
  }
}
```

:::

### MsgInstantiateContract

```go
type MsgInstantiateContract struct {
	Owner      sdk.AccAddress   `json:"owner" yaml:"owner"`
	CodeID     uint64           `json:"code_id" yaml:"code_id"`
	InitMsg    core.Base64Bytes `json:"init_msg" yaml:"init_msg"`
	InitCoins  sdk.Coins        `json:"init_coins" yaml:"init_coins"`
	Migratable bool             `json:"migratable" yaml:"migratable"`
}
```

::: details JSON Example

```json
{
  "type": "wasm/InstantiateContract",
  "value": {
    "owner": "terra...",
    "code_id": "23",
    "init_msg": "eyJlbmNvZGVkIjogIkpTT04gbWVzc2FnZSJ9",
    "init_coins": [
      {
        "denom": "uluna",
        "amount": "999"
      }
    ],
    "migratable": false
  }
}
```

:::

### MsgExecuteContract

```go
type MsgExecuteContract struct {
	Sender     sdk.AccAddress   `json:"sender" yaml:"sender"`
	Contract   sdk.AccAddress   `json:"contract" yaml:"contract"`
	ExecuteMsg core.Base64Bytes `json:"execute_msg" yaml:"execute_msg"`
	Coins      sdk.Coins        `json:"coins" yaml:"coins"`
}
```

::: details JSON Example

```json
{
  "type": "wasm/ExecuteContract",
  "value": {
    "sender": "terra...",
    "contract": "terra...",
    "execute_msg": "eyJlbmNvZGVkIjogIkpTT04gbWVzc2FnZSJ9",
    "coins": [
      {
        "denom": "uluna",
        "amount": "999"
      }
    ]
  }
}
```

:::

### MsgMigrateContract

```go
type MsgMigrateContract struct {
	Owner      sdk.AccAddress   `json:"owner" yaml:"owner"`
	Contract   sdk.AccAddress   `json:"contract" yaml:"contract"`
	NewCodeID  uint64           `json:"new_code_id" yaml:"new_code_id"`
	MigrateMsg core.Base64Bytes `json:"migrate_msg" yaml:"migrate_msg"`
}
```

::: details JSON Example

```json
{
  "type": "wasm/MigrateContract",
  "value": {
    "owner": "terra...",
    "contract": "terra...",
    "new_code_id": "45",
    "migrate_msg": "eyJlbmNvZGVkIjogIkpTT04gbWVzc2FnZSJ9"
  }
}
```

:::

### MsgUpdateContractOwner

```go
type MsgUpdateContractOwner struct {
	Owner    sdk.AccAddress `json:"owner" yaml:"owner"`
	NewOwner sdk.AccAddress `json:"new_owner" yaml:"new_owner"`
	Contract sdk.AccAddress `json:"contract" yaml:"contract"`
}
```

::: details JSON Example

```json
{
  "type": "wasm/UpdateContractOwner",
  "value": {
    "owner": "terra...",
    "new_owner": "terra...",
    "contract": "terra..."
  }
}
```

:::

## Transitions

## Parameters

## Events
