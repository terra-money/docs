# Bank

::: warning NOTE
Terra's bank module inherits from Cosmos SDK's [`bank`](https://docs.cosmos.network/v0.43/modules/bank/) module. This document is a stub, and covers mainly important Terra-specific notes about how it is used.
:::

The bank module is the base transactional layer of the Terra blockchain: it allows assets to be sent from one `Account` to another. The bank module defines two types of send transactions: `MsgSend` and `MsgMultiSend`. These messages automatically incur a stability fee, which is performed by the [ante handler in the `Auth` module](spec-auth.md#stability-fee).

## Concepts

### Total supply

The total supply of the network is equal to the sum of all coins from the
account. The total supply is updated every time a `Coin` is minted (eg: as part
of the inflation mechanism) or burned (eg: due to slashing or if a governance
proposal is vetoed).

### Module accounts

The supply module introduces a new type of `auth.Account` which can be used by
modules to allocate tokens and in special cases mint or burn tokens. At a base
level these module accounts are capable of sending/receiving tokens to and from
`auth.Account`s and other module accounts. This design replaces previous
alternative designs where, to hold tokens, modules would burn the incoming
tokens from the sender account, and then track those tokens internally. Later,
in order to send tokens, the module would need to effectively mint tokens
within a destination account. The new design removes duplicate logic between
modules to perform this accounting.

The `ModuleAccount` interface is defined as follows:

```go
type ModuleAccount interface {
  auth.Account               // same methods as the Account interface
  GetName() string           // name of the module; used to obtain the address
  GetPermissions() []string  // permissions of module account
  HasPermission(string) bool
}
```

::: warning
Any module or message handler that allows either direct or indirect sending of funds must explicitly guarantee those funds cannot be sent to module accounts (unless allowed).
:::

The supply `Keeper` also introduces new wrapper functions for the auth `Keeper`
and the bank `Keeper` that are related to `ModuleAccount`s in order to be able
to:

- Get and set `ModuleAccount`s by providing the `Name`.
- Send coins from and to other `ModuleAccount`s or standard `Account`s
  (`BaseAccount` or `VestingAccount`) by passing only the `Name`.
- `Mint` or `Burn` coins for a `ModuleAccount` (restricted to its permissions).

#### Permissions

Each `ModuleAccount` has a different set of permissions that provide different
object capabilities to perform certain actions. Permissions need to be
registered upon the creation of the supply `Keeper` so that every time a
`ModuleAccount` calls the allowed functions, the `Keeper` can lookup the
permissions to that specific account and perform or not the action.

The available permissions are:

- `Minter`: allows for a module to mint a specific amount of coins.
- `Burner`: allows for a module to burn a specific amount of coins.
- `Staking`: allows for a module to delegate and undelegate a specific amount of coins.

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

The bank module send multiple transactions simultaneously. `Inputs` contains the incoming transactions, and `Outputs` contains the outgoing transactions. The coin balance of the `Inputs` and the `Outputs` must match exactly.

::: tip
To conserve network bandwidth and gas fees, batch transactions by using multisend.
:::

If any of the `Accounts` fail, taxes and fees that are already paid through the transaction are not refunded.
