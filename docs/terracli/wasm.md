# WASM

## Query

### Bytecode

You can get the contract's WASM bytecode by referencing its ID:

```sh
terracli query wasm bytecode <code-id>
```

### Code Info

You can get information about a piece of uploaded code by referencing its ID:

```sh
terracli query wasm code <code-id>
```

### Contract Info

You can get the metadata information about an instantiated contract:

```sh
terracli query wasm contract <contract-address>
```

### Query Contract

You can send a QueryMsg that that will be run against the contract.

```sh
terracli query wasm contract-store <contract-address> <query-msg>
```

`<query-msg>` is a JSON string that encodes the QueryMsg. For instance:

```sh
terracli query wasm contract-store terra1plju286nnfj3z54wgcggd4enwaa9fgf5kgrgzl '{"config":{}}'
```

### Access Contract Store

If you know the key (and subkey) of the information stored in the contract, you can get the information by issuing:

```sh
terracli query wasm raw-store <contract-address> <key> <subkey>
```

If the data uses a `Singleton`, it has only a key, and no subkey. If the data uses a prefixed data store such as `PrefixedStorage` or `Bucket`, it may also accept a subkey.

## Transaction

### Upload Contract Code

You can upload new contract code to the blockchain:

```sh
terracli tx wasm store <wasm-file>
```

The argument `<wasm-file>` is the path of a file that is the compiled binary of the smart contract code that you wish to upload.

### Creating a Contract

You can create (instantiate) a new contract by referencing a code ID of a contract that has been uploaded.

```sh
terracli tx wasm <code-id> <init-msg> <coins>
```

The argument `<init-msg>` is a JSON string containing the InitMsg to initialize your contract's state. `<coins>` is the optional amount of Coins (in a comma-separated list) that you want to send to the new contract account.

#### Example

```sh
terracli instantiate 1 '{"arbiter": "terra~~"}' "1000000uluna"
```

### Execute a Contract

You can invoke processing functions on the smart contract:

```sh
terracli tx wasm execute <contract-address> <handle-msg> <coins>
```

The argument `<handle-msg>` is a raw JSON string containing the HandleMsg that will be parsed and routed to the correct message handling logic in the contract. `<coins>` is the optional amount of Coins (in a comma-separated list) that you want to send alongside your message, in case the logic requires some fees.

### Migrate a Contract

Update a migratable contract's code ID to a new code ID. Can only be issued from the key corresponding to the contract's owner.

```sh
terracli tx wasm migrate <contract-address> <new-code-id> <migrate-msg>
```

#### Example

```sh
terracli tx wasm migrate terra... 10 '{"verifier": "terra..."}'
```

### Update Contract Owner

Update a contract owner to a new address. Can only be issued from the key corresponding to the contract's owner.

```sh
terracli tx wasm update-owner <contract-address> <new-owner>
```
