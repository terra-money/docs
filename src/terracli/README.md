# terracli

This document is a reference for the functions available from `terracli`, the command line interface that connects a running `terrad` process. For more information on the command usage, refer to its help screen: `terracli config --help`.

## Shell Auto-completion Scripts

Auto-completion scripts for popular UNIX shell interpreters such as `bash` and `zsh` can be generated through the `completion` command, which is available for both `terrad` and `terracli`. This allows for a more convenient way to interact with the Terra Core endpoints when using the command-line.

If you want to generate `bash` completion scripts run the following command:

```bash
terrad completion > terrad_completion
terracli completion > terracli_completion
```

If you want to generate `zsh` completion scripts run the following command:

```bash
terrad completion --zsh > terrad_completion
terracli completion --zsh > terracli_completion
```

> On most UNIX systems, such scripts may be loaded in `.bashrc` or `.bash_profile` to enable Bash autocompletion.
>
> ```bash
> echo '. terrad_completion' >> ~/.bashrc
> echo '. terracli_completion' >> ~/.bashrc
> ```
>
> Refer to the user's manual of your interpreter provided by your operating system for information on how to enable shell autocompletion.
> {note}

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
