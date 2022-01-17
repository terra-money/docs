# Bank

:::{Important}
Terra's bank module inherits from the Cosmos SDK's [`bank`](https://docs.cosmos.network/master/modules/bank/) module. This document is a stub and covers mainly important Terra-specific notes about how it is used.
:::

The bank module is the base transactional layer of the Terra blockchain. This module allows assets to be sent from one `Account` to another. The bank module defines the following types of send transactions: `MsgSend` and `MsgMultiSend`.

## Message types

### MsgSend

```go
// MsgSend - high level transaction of the coin module
type MsgSend struct {
    FromAddress sdk.AccAddress `json:"from_address"`
    ToAddress   sdk.AccAddress `json:"to_address"`
    Amount      sdk.Coins      `json:"amount"`
}
```

The Bank module is used to send coins from one Terra account to another. `MsgSend` is constructed to facilitate the transfer. If the balance of coins in the sender `Account` is insufficient or the recipient `Account` is unable to receive the funds via the bank module, the transaction fails. Fees already paid through failed transactions are not refunded.

### MsgMultiSend

```go
// MsgMultiSend - high level transaction of the coin module
type MsgMultiSend struct {
    Inputs  []Input  `json:"inputs"`
    Outputs []Output `json:"outputs"`
}
```

To send multiple transactions at once, use `MsgMultiSend`. For each transaction, `Inputs` contains the incoming transactions, and `Outputs` contains the outgoing transactions. The `Inputs` coin balance must exactly match the `Outputs` coin balance. Batching transactions via `MsgMultiSend` conserves network bandwidth and gas fees. Taxes and fees already paid through failed transactions are not refunded.
