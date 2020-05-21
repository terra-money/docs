# terracli

This document is a reference for the functions available from `terracli`, the command line interface that connects a running `terrad` process. For more information on the command usage, refer to its help screen: `terracli config --help`.

## Fees

### Fees & Gas

Each transaction may either supply fees or gas prices, but not both. Most users will typically provide fees as this is the cost you will end up incurring for the transaction being included in the ledger.

Validator's have a minimum gas price \(multi-denom\) configuration and they use this value when determining if they should include the transaction in a block during `CheckTx`, where `gasPrices >= minGasPrices`. Note, your transaction must supply fees that are greater than or equal to **any** of the denominations the validator requires.

> With such a mechanism in place, validators may start to prioritize txs by `gasPrice` in the mempool, so providing higher fees or gas prices may yield higher tx priority.
> {note}

e.g.

```bash
terracli tx send ... --fees=100usdr
```

or

```bash
terracli tx send ... --gas-prices=0.000001usdr
```

### Fees & Taxes (From Columbus-3)

The tax has been changed to be included in the fees rather than automatically charged from the sender account. Users can make transaction with existing method without fees flag but with gas prices flag. It will automatically calculate tax and return fees in addition to the existing gas fees.

Wallet providers can estimate fees and gas to be incurred by a transaction by querying the endpoint `/txs/estimate_fee` with `gas = "0"`.

e.g.

```bash
terracli tx send ... --gas-prices=0.000001usdr --gas=auto --gas-adjustment=1.4
```

or

```bash
terracli tx estimate-fee ... --gas-prices=0.000001usdr --gas-adjustment=1.4
```
