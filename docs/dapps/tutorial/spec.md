# Contract Specification

A smart contract can be considered a singleton object whose internal state is persisted on the blockchain. Users can trigger state changes through sending it JSON messages, and users can also query its state through sending a request formatted as a JSON message. These messages are different than Terra blockchain messages such as `MsgSend` and `MsgSwap`.

::: warning NOTE
Going forward, it is important to be aware of the distinction between native messages intended for inclusion within transactions, and messages that invoke smart contract functions.
:::

As a smart contract writer, your job is to define 3 functions that define your smart contract's interface:

- `init()`: a constructor which is called during contract instantiation to provide initial state
- `handle()`: gets called when a user wants to invoke a method on the smart contract
- `query()`: gets called when a user wants to get data out of a smart contract

We'll use an ERC20-inspired smart contract interface for our first smart contract.

## InitMsg

The `InitMsg` is provided when a user creates a contract on the blockchain through a `MsgInstantiateContract`. This provides the contract with its configuration as well as its initial state. On the Terra blockchain, the uploading of a contract's code and the instantiation of a contract is regarded as separate events, unlike with Ethereum. This is to allow a small set of vetted contract archetypes to exist with multiple instances, each sharing the same base code but configured with different parameters (imagine one canonical ERC20, and multiple tokens that use its code).

For our contract, we will expect a contract creator to supply the relevant information in a JSON message such as the following:

```json
{
  "name": "MyTerraToken",
  "symbol": "MTT",
  "decimals": 6,
  "initial_balances": [
    {
      "address": "terra...",
      "amount": "10000"
    },
    {
      "address": "terra...",
      "amount": "5000"
    }
  ]
}
```

## HandleMsg

The `HandleMsg` is a JSON message passed to the `handle()` function through a `MsgExecuteContract`. Unlike the `InitMsg`, the `HandleMsg` can exist as several different types of messages, to account for the different types of functions that a smart contract can expose to a user. The `handle()` function demultiplexes these different types of messages to its appropriate message handler logic.

For our simple token example, we want to support the following functions:

### Approve

A user should be able to define an _allowance_, which allows another user to spend their tokens.

```json
{
  "approve": {
    "spender": "terra...",
    "amount": "1000"
  }
}
```

### Transfer

A user can _transfer_ tokens to another account, from its own balance.

```json
{
  "transfer": {
    "recipient": "terra...",
    "amount": "1000"
  }
}
```

### TransferFrom

A user can _transfer from_ another account, using from the allowance.

```json
{
  "transfer_from": {
    "owner": "terra...",
    "recipient": "terra...",
    "amount": "1000"
  }
}
```

### Burn

A user can _burn_ their tokens, permanently removing them from the supply.

```json
{
  "burn": {
    "amount": "1000"
  }
}
```

## QueryMsg

Our contract will support 2 types of query messages:

### Balance

```json
{
  "balance": {
    "address": "terra..."
  }
}
```

Which should return:

```json
{
  "balance": "1000"
}
```

### Allowance

```json
{
  "allowance": {
    "owner": "terra...",
    "spender": "terra..."
  }
}
```

Which should return:

```json
{
  "allowance": "1000"
}
```

## Contract State

Now that we've defined our interface, we need to specify the state requirements of our contract. Terra smart contracts have access to the same state storage facilities (by default, a key-value store with bytes keys and bytes values) as the rest of the blockchain.

For our example smart contract, we will need:

- a `struct` holding our contract config:
  - `String` token name
  - `String` token symbol
  - `u8` token decimal places
- mapping from `address` account to `Uint128` balance
- mapping from (`address` owner, `address` spender) to `Uint128` allowance

Since we are using a simple key-value store system to store our state, we'll have to implement the mappings using prefix-keys. For example, `abc["def"] = 5` will be implemented as `store("abcdef", 5)`.
