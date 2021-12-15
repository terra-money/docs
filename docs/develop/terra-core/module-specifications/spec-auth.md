# Auth

:::{note}
Terra's Auth module inherits from Cosmos SDK's [`auth`](https://docs.cosmos.network/master/modules/auth/) module. This document is a stub, and covers mainly important Terra-specific notes about how it is used.
:::

Terra's Auth module extends the functionality from Cosmos SDK's `auth` module with a modified ante handler, which applies the [stability fee](/Concepts/glossary.md#fees) alongside all basic transaction validity checks, such as signatures, nonces, and auxiliary fields. This module also defines a special vesting account type that handles the logic for token vesting from the Luna presale.

## Fees

The Auth module reads the current effective `TaxRate` and `TaxCap` parameters from the [`Treasury`](./spec-treasury.md) module to enforce a stability fee.

### Gas Fee

Like all transactions on the Terra blockchain, [`MsgSend`](./spec-bank.md#msgsend) and [`MsgMultiSend`](./spec-bank.md#msgmultisend) incur gas fees. These fees are determined by a validator's minimum gas price and the complexity of the transaction. More complex transactions incur higher fees. Gas fees are specified by the sender when a transaction is outbound. For more information on how gas is calculated, see [fees](/Reference/terrad/#fees).

### Stability Fee

In addition to the gas fee, the ante handler charges a stability fee on all transactions using Terra stablecoins, excluding market swaps. The ante handler reads the `TaxRate` and `TaxCap` parameters from the [`Treasury`](./spec-treasury.md) module and computes the stability fee amount for each transaction.

The `TaxRate` specifies the stability fee percentage rate for transactions. These fees become the `TaxProceeds` in block rewards and then are distributed among validators in the active set. For more information about the distribution model, see [How are block provisions distributed](../../../How-to/Manage-a-Terra-validator/faq.md#how-are-block-provisions-distributed). Stability fees are capped for each transaction according to the `TaxCap`. Every epoch, the Tax Rate and Tax Caps are recalibrated automatically by the network. For more details on how these rates are set, visit [the treasury module](spec-treasury.md#monetary-policy-levers).

**Example**:

For `MsgSend` transactions of µSDR:

```text
stability fee = min(1000 * tax_rate, tax_cap(usdr))
```

For `MsgMultiSend` transactions, stability fees are charged in every outbound transaction.


## Parameters

The subspace for the Auth module is `auth`.

```go
type Params struct {
	MaxMemoCharacters      uint64 `json:"max_memo_characters" yaml:"max_memo_characters"`
	TxSigLimit             uint64 `json:"tx_sig_limit" yaml:"tx_sig_limit"`
	TxSizeCostPerByte      uint64 `json:"tx_size_cost_per_byte" yaml:"tx_size_cost_per_byte"`
	SigVerifyCostED25519   uint64 `json:"sig_verify_cost_ed25519" yaml:"sig_verify_cost_ed25519"`
	SigVerifyCostSecp256k1 uint64 `json:"sig_verify_cost_secp256k1" yaml:"sig_verify_cost_secp256k1"`
}
```

### MaxMemoCharacters

The maximum permitted number of characters in the memo of a transaction.

- type: `uint64`
- default: `256`

### TxSigLimit

The maximum number of signers in a transaction. A single transaction can have multiple messages and multiple signers. Because the sig verification cost is generally higher than other operations, the number of signers is limited to 100.

- type: `uint64`
- default: `100`

### TxSizeCostPerByte

The cost per byte used to compute the gas consumption of a transaction. `TxSizeCostPerByte * txsize`.

- type: `uint64`
- default: `10`

### SigVerifyCostED25519

The gas cost for verifying ED25519 signatures.

- type: `uint64`
- default: `590`

### SigVerifyCostSecp256k1

The gas cost for verifying Secp256k1 signatures.

- type: `uint64`
- default: `1000`
