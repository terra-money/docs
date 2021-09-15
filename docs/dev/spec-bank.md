# Bank

::: warning NOTE
Terra's Bank module inherits from Cosmos SDK's [`bank`](https://github.com/cosmos/cosmos-sdk/tree/v0.37.4/docs/spec/bank) module. This document is a stub, and covers mainly important Terra-specific notes about how it is used.
:::

The Bank module is the base transactional layer of the Terra blockchain: it allows assets to be sent from one `Account` to another. Bank defines 2 types of Send-Transactions: `MsgSend` and `MsgMultiSend`. These messages automatically incur a stability fee, which is performed by the [ante handler in the `Auth` module](spec-auth.md#stability-fee).

## Message Types

### MsgSend

```go
// MsgSend - high level transaction of the coin module
type MsgSend struct {
    FromAddress sdk.AccAddress `json:"from_address"`
    ToAddress   sdk.AccAddress `json:"to_address"`
    Amount      sdk.Coins      `json:"amount"`
}
```

::: details JSON Example

```json
{
  "type": "bank/MsgSend",
  "value": {
    "from_address": "terra...",
    "to_address": "terra...",
    "amount": [
      {
        "denom": "uluna",
        "amount": "999"
      },
      {
        "denom": "ukrw",
        "amount": "999"
      }
    ]
  }
}
```

:::

The Bank module can be used to send coins from one `Account` (`terra-` prefixed account) to another. A `MsgSend` is constructed to facilitate the transfer. If the balance of coins in the `Account` is insufficient or the recipient `Account` is not allowed to receive the funds via Bank module, the transaction fails.

### MsgMultiSend

```go
// MsgMultiSend - high level transaction of the coin module
type MsgMultiSend struct {
    Inputs  []Input  `json:"inputs"`
    Outputs []Output `json:"outputs"`
}
```

::: details JSON Example

```json
{
  "type": "bank/MsgMultiSend",
  "value": {
    "inputs": [
      {
        "address": "terra...",
        "coins": [
          {
            "denom": "ukrw",
            "amount": "999"
          },
          {
            "denom": "uluna",
            "amount": "999"
          }
        ]
      }
    ],
    "outputs": [
      {
        "address": "terra...",
        "coins": [
          {
            "denom": "ukrw",
            "amount": "450"
          },
          {
            "denom": "uluna",
            "amount": "450"
          }
        ]
      },
      {
        "address": "terra...",
        "coins": [
          {
            "denom": "ukrw",
            "amount": "449"
          },
          {
            "denom": "uluna",
            "amount": "449"
          }
        ]
      }
    ]
  }
}
```

:::

The Bank module can be used to send multiple transactions at once. `Inputs` contains the incoming transactions, and `Outputs` contains the outgoing transactions. The coin balance of the `Inputs` and the `Outputs` must match exactly. Batching transactions via multisend has the benefit of conserving network bandwidth and gas fees.

If any of the `Accounts` fails, then taxes and fees already paid through the transaction is not refunded.
