# WASM

The WASM module implements the execution environment for WebAssembly smart contracts, powered by [CosmWasm](https://cosmwasm.com).

## Concepts

### Smart Contracts

Smart contracts are autonomous agents that are able to interact with other entities on the Terra blockchain, such as human-owned accounts, validators, and other smart contracts. Each smart contract has:

- a unique **contract address** with an account that holds funds
- a **code ID**, where its logic is defined
- its own **key-value store**, where it can persist and retrieve data

#### Contract Address

Upon instantiation, each contract is automatically assigned a Terra account address, called the _contract address_. The address is procedurally generated on-chain without an accompanying private / public key pair, and can be completely determined by the contract's number order of existence. For instance, on two separate Terra networks, the first contract will always be assigned the address `terra18vd8fpwxzck93qlwghaj6arh4p7c5n896xzem5`, and similarly for the second, third, and so forth.

#### Code ID

On Terra, code upload and contract creation occur as separate events. A smart contract writer first uploads WASM bytecode onto the blockchain to obtain a _code ID_, which they can then use to initialize an instance of that contract. This scheme promotes efficient storage, as most contracts share the same underlying logic and vary only in their initial configuration. Vetted, high quality contracts for common use cases such as fungible tokens and multisig wallets can be easily reused without the need to upload new code.

#### Key-Value Store

Each smart contract is given its own dedicated keyspace in LevelDB, prefixed by the contract address. Contract code is safely sandboxed and can only can set and delete new keys and values within its assigned keyspace.

### Interaction

Users can interact with smart contracts in several ways.

#### Instantiation

A user can instantiate a new smart contract by sending a `MsgInstantiateContract`. In it, the user is able to:

- assign an owner to the contract
- specify code will be used for the contract via a code ID
- define the initial parameters / configuration through an `InitMsg`
- provide the new contract's account with some initial funds
- denote whether the contract is migratable (can change code IDs)

The `InitMsg` is a JSON message whose expected format is defined in the contract's code. Every contract contains a section that defines how to set up the initial state depending on the provided `InitMsg`.

#### Execution

A user can execute a smart contract to invoke one of its defined functions by sending a `MsgExecuteContract`. In it, the user is able to:

- specify which function to call with a `HandleMsg`
- send funds to the contract, which may be expected during execution

The `HandleMsg` is a JSON message that containing function call arguments and gets routed to the appropriate handling logic. From there, the contract executes the function's instructions, during which the contract's own state can modified. The contract can only modify outside state (such as state in other contracts or modules) after its own execution has ended, by returning a list of blockchain messages such as `MsgSend` and `MsgSwap`. These messages are appended to the same transaction as the `MsgExecuteContract`, and if any of the messages are invalid, the whole transaction is invalidated.

#### Migration

If a user is the contract's owner, and a contract is instantiated as migratable, they can issue a `MsgMigrateContract` to reset its code ID to a new one. The migration is be parameterized with a `MigrateMsg`, a JSON message.

#### Transfer of Ownership

The current owner of the smart contract can re-assign a new owner to the contract with `MsgUpdateContractOwner`.

#### Query

Contracts can define query functions, or read-only operations meant for data-retrieval. This allows contracts to expose rich, custom data endpoints with JSON responses instead of raw bytes from the low-level key-value store. Because the blockchain state cannot be changed, the node can directly run the query without a transaction.

Users can specify which query function alongside any arguments with a JSON `QueryMsg`. Even though there is no gas fee, the query function's execution is capped by gas determined by metered execution (which is not charged) as a form of spam-protection.

### Wasmer VM

The actual execution of WASM bytecode is performed by [wasmer](https://github.com/wasmerio/wasmer), which provides a lightweight sandboxed runtime with metered execution to account for the resource cost of computation.

#### Gas Meter

In addition to the regular gas fees incurred from creating the transaction, Terra also calculates a separate gas when executing smart contract code. This is tracked by the **gas meter**, which is during the execution of every opcode and gets translated back to native Terra gas via a constant multiplier (currently set to 100).

### Gas Fees

Wasm data and event spend gas up to `1 * bytes`. Passing the event & data to another contract also spends gas in reply.

## Data

### CodeInfo

```go
type CodeInfo struct {
	CodeID   uint64           `json:"code_id"`
	CodeHash core.Base64Bytes `json:"code_hash"`
	Creator  sdk.AccAddress   `json:"creator"`
}
```

### ContractInfo

```go
type ContractInfo struct {
	Address    sdk.AccAddress   `json:"address"`
	Owner      sdk.AccAddress   `json:"owner"`
	CodeID     uint64           `json:"code_id"`
	InitMsg    core.Base64Bytes `json:"init_msg"`
	Migratable bool             `json:"migratable"`
}
```

## State

### Last Code ID

- type: `uint64`

A counter for the last uploaded code ID.

### Last Instance ID

- type: `uint64`

A counter for the last instantiated contract number.

### Code

- type: `map[uint64]CodeInfo`

Maps a code ID to `CodeInfo` entry.

### Contract Info

- type: `map[bytes]ContractInfo`

Maps contract address to its corresponding `ContractInfo`.

### Contract Store

- type: `map[bytes]KVStore`

Maps contract address to its dedicated KVStore.

## Message Types

### MsgStoreCode

Uploads new code to the blockchain, and results in a new code ID if successful. `WASMByteCode` is accepted as either uncompressed or gzipped binary data encoded as Base64.

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
  "type": "wasm/MsgStoreCode",
  "value": {
    "sender": "terra...",
    "wasm_byte_code": "QmFzZTY0LWVuY29kZWQgV0FTTSBiaW5hcnk="
  }
}
```

:::

::: details Events

| Type       | Attribute Key | Attribute Value |
| ---------- | ------------- | --------------- |
| store_code | codeID        | {codeID}        |
| store_code | sender        | {senderAddress} |
| message    | module        | wasm            |
| message    | action        | store_code      |
| message    | sender        | {senderAddress} |

:::

### MsgInstantiateContract

Creates a new instance of a smart contract. Initial configuration is provided in the `InitMsg`, which is a JSON message encoded in Base64. If `Migratable` is set to be `true`, the owner of the contract is permitted to reset the contract's code ID to a new one.

```go
type MsgInstantiateContract struct {
	// Sender is an sender address
	Sender string `protobuf:"bytes,1,opt,name=sender,proto3" json:"sender,omitempty" yaml:"sender"`
	// Admin is an optional admin address who can migrate the contract
	Admin string `protobuf:"bytes,2,opt,name=admin,proto3" json:"admin,omitempty" yaml:"admin"`
	// CodeID is the reference to the stored WASM code
	CodeID uint64 `protobuf:"varint,3,opt,name=code_id,json=codeId,proto3" json:"code_id,omitempty" yaml:"code_id"`
	// InitMsg json encoded message to be passed to the contract on instantiation
	InitMsg encoding_json.RawMessage `protobuf:"bytes,4,opt,name=init_msg,json=initMsg,proto3,casttype=encoding/json.RawMessage" json:"init_msg,omitempty" yaml:"init_msg"`
	// InitCoins that are transferred to the contract on execution
	InitCoins github_com_cosmos_cosmos_sdk_types.Coins `protobuf:"bytes,5,rep,name=init_coins,json=initCoins,proto3,castrepeated=github.com/cosmos/cosmos-sdk/types.Coins" json:"init_coins" yaml:"init_coins"`
}
```

### MsgExecuteContract

Invoke a function defined within the smart contract. Function and parameters are encoded in `ExecuteMsg`, which is a JSON message encoded in Base64.

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
  "type": "wasm/MsgExecuteContract",
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

::: details Events

| Type             | Attribute Key    | Attribute Value   |
| ---------------- | ---------------- | ----------------- |
| execute_contract | contract_address | {contractAddress} |
| execute_contract | sender           | {senderAddress}   |
| message          | module           | wasm              |
| message          | action           | execute_contract  |
| message          | sender           | {senderAddress}   |

:::

### MsgMigrateContract

Can be issued by the owner of a migratable smart contract to reset its code ID to another one. `MigrateMsg` is a JSON message encoded in Base64.

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
  "type": "wasm/MsgMigrateContract",
  "value": {
    "owner": "terra...",
    "contract": "terra...",
    "new_code_id": "45",
    "migrate_msg": "eyJlbmNvZGVkIjogIkpTT04gbWVzc2FnZSJ9"
  }
}
```

:::

::: details Events

| Type             | Attribute Key    | Attribute Value   |
| ---------------- | ---------------- | ----------------- |
| migrate_contract | code_id          | {codeID}          |
| migrate_contract | contract_address | {contractAddress} |
| message          | module           | wasm              |
| message          | action           | migrate_contract  |
| message          | sender           | {senderAddress}   |

:::

### MsgUpdateContractOwner

Can be issued by the smart contract's owner to transfer ownership.

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
  "type": "wasm/MsgUpdateContractOwner",
  "value": {
    "owner": "terra...",
    "new_owner": "terra...",
    "contract": "terra..."
  }
}
```

:::

::: details Events

| Type                  | Attribute Key    | Attribute Value       |
| --------------------- | ---------------- | --------------------- |
| update_contract_owner | owner            | {ownerAddress}        |
| update_contract_owner | contract_address | {contractAddress}     |
| message               | module           | wasm                  |
| message               | action           | update_contract_owner |
| message               | sender           | {senderAddress}       |

:::

## Parameters

The subspace for the WASM module is `wasm`.

```go
type Params struct {
	MaxContractSize    uint64 `json:"max_contract_size" yaml:"max_contract_size"`
	MaxContractGas     uint64 `json:"max_contract_gas" yaml:"max_contract_gas"`
	MaxContractMsgSize uint64 `json:"max_contract_msg_size" yaml:"max_contract_msg_size"`
}
```

### MaxContractSize

- type: `uint64`

Maximum contract bytecode size, in bytes.

### MaxContractGas

- type: `uint64`

Maximum contract gas consumption during any execution.

### MaxContractMsgSize

- type: `uint64`

Maximum contract message size, in bytes.
