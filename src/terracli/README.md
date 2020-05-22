# terracli

This section is a reference for the functions available from `terracli`, the command line interface that connects a running `terrad` process. For more information on the command usage, refer to its help screen: `terracli config --help`.

## Setting Fees

Transactions on the Terra Protocol network need to include a transaction fee in order to be processed. This fee pays for the gas required to run the transaction. The formula is the following:

$$fees = gas * gasPrices$$

The `gas` is dependent on the transaction. Different transaction require different amount of `gas`. The `gas` amount for a transaction is calculated as it is being processed, but there is a way to estimate it beforehand by using the `auto` value for the `gas` flag. Of course, this only gives an estimate. You can adjust this estimate with the flag `--gas-adjustment` \(default `1.0`\) if you want to be sure you provide enough `gas` for the transaction.

The `gasPrice` is the price of each unit of `gas`. Each validator sets a `min-gas-price` value, and will only include transactions that have a `gasPrice` greater than their `min-gas-price`.

The transaction `fees` are the product of `gas` and `gasPrice`. As a user, you have to input 2 out of 3. The higher the `gasPrice`/`fees`, the higher the chance that your transaction will get included in a block.

### Fees & Gas

Each transaction may either supply fees or gas prices, but not both. Most users will typically provide fees as this is the final cost you will end up incurring for the transaction being included in the ledger, where as gas prices will be dynamically calculated depending on the validator.

Validators specify a minimum gas price that they use to determine whether to include a transaction, which they calculate during `CheckTx`, where `gasPrices >= minGasPrices`. Note, your transaction must supply fees that are greater than or equal to **any** of the denominations the validator requires.

::: warning NOTE
Validators may start to prioritize transactions by `gasPrice` in the mempool, so providing higher fees or gas prices will likely yield higher priority of inclusion in a block.
:::

To directly use fees:

```bash
$ terracli tx send ... --fees=100000uluna
```

If you use fees, validators will calculate the implied `minGasPrices` by dividing your fee with the estimated gas consumption, to properly assign the right priority to your transaction.

To use gas prices (use a comma-separated list of amount and denominations).

```bash
terracli tx send ... --gas-prices=0.03uluna,0.015ukrw
```

### Taxes

Taxes in Terra must be included in the fee amount. Users can make transactions with existing methods without the `--fees` flag but with gas prices flag. This will automatically calculate the tax and return fees in addition to the existing gas fees.

### Automatic Fee Estimation

You may want to cap the maximum gas that can be consumed by the transaction via the `--gas` flag. If you pass `--gas=auto`, the gas will be automatically estimated before executing the transaction.

Gas estimate might be inaccurate as state changes could occur in between the end of the simulation and the actual execution of a transaction, thus an adjustment is applied on top of the original estimate in order to ensure the transaction is broadcasted successfully.

The adjustment can be controlled via the `--gas-adjustment` flag, whose default value is 1.0.

To get a direct fee estimation from `terracli`:

```bash
$ terracli tx estimate-fee ...\
    --gas-prices=0.015uluna
    --gas-adjustment=1.4
```

To create and send transactions using fee-estimation, use the template below as a format:

```bash
$ terracli tx send ... \
    --gas-prices=0.015uluna
    --gas=auto
    --gas-adjustment=1.4
```

## Shell Autocompletion

Auto-completion scripts for popular UNIX shell interpreters such as `bash` and `zsh` can be generated through the `completion` command, which is available for both `terrad` and `terracli`. This allows for a more convenient way to interact with the Terra Core endpoints when using the command-line.

If you want to generate `bash` completion scripts run the following command:

```bash
$ terrad completion > terrad_completion
$ terracli completion > terracli_completion
```

If you want to generate `zsh` completion scripts run the following command:

```bash
$ terrad completion --zsh > terrad_completion
$ terracli completion --zsh > terracli_completion
```

::: warning NOTE
On most UNIX systems, such scripts may be loaded in `.bashrc` or `.bash_profile` to enable Bash autocompletion.

```bash
echo '. terrad_completion' >> ~/.bashrc
echo '. terracli_completion' >> ~/.bashrc
```

Refer to the user's manual of your interpreter provided by your operating system for information on how to enable shell autocompletion.
:::
