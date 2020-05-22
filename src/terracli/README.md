# terracli

This section is a reference for the functions available from `terracli`, the command line interface that connects a running `terrad` process. For more information on the command usage, refer to its help screen: `terracli config --help`.

## Accessing a Node

In order to query the state and send transactions, you need a way to access the network. `terracli` is only the interface to access Terra; a node is the access point connected to the rest of the network through peer connections. You can either run your own full-node, or connect to someone else's.

### Running your own full-node

This is the most secure option, but comes with relatively high resource requirements. In order to run your own full-node, you need good bandwidth and at least 1TB of disk space.

You will find the tutorial on how to install `terrad` [here](../node/installation.md), and how to set it up to connect to an existing Terra network [here](../node/join-network.md).

### Connecting to a remote full-node

If you do not want or cannot run your own node, you can connect to someone else's full-node. You should pick an operator you trust, because a malicious operator could return incorrect query results or censor your transactions. However, they will never be able to steal your funds, as your private keys are stored locally on your computer or ledger device. Possible options of full-node operators include validators, wallet providers or exchanges.

In order to connect to the full-node, you will need an address of the following form: `https://77.87.106.33:26657` \(_Note: This is a sample address_\). This address has to be communicated by the full-node operator you choose to trust. You will use this address in the following section.

## Configuring terracli

`terracli` is the tool that enables you to interact with the node that runs on the Terra Protocol network, whether you run it yourself or not. Let us set it up properly.

In order to set up `terracli`, use the following command:

```bash
$ terracli config <flag> <value>
```

It allows you to set a default value for each given flag.

First, set up the address of the full-node you want to connect to:

```bash
# example: terracli config node https://77.87.106.33:26657
$ terracli config node <host>:<port>
```

If you run your own full-node, just use `tcp://localhost:26657` as the address.

Then, let us set the default value of the `--trust-node` flag:

```bash
# Set to true if you run a light-client node, false otherwise
$ terracli config trust-node false
```

Finally, let us set the `chain-id` of the blockchain we want to interact with:

```bash
$ terracli config chain-id soju-0014
```

## Querying Blockchain State

`terracli` lets you query all relevant information from the blockchain, like account balances, amount of bonded tokens, outstanding rewards, and more. Next is a list of the most useful commands for delegators.

```bash
# query account balances and other account-related information
$ terracli query account

# query the list of validators
$ terracli query staking validators

# query the information of a validator given their address
$ terracli query staking validator <validatorAddress>

# query all delegations made from a delegator given their address
# (note: delegator addresses are regular account addresses)
$ terracli query staking delegations <delegatorAddress>

# query a specific delegation made from a delegator to a validator
$ terracli query staking delegation <delegatorAddress> <validatorAddress>

# query the rewards of a delegator given a delegator address (e.g. terra10snjt8dmpr5my0h76xj48ty80uzwhraqalu4eg)
$ terracli query distr rewards <delegatorAddress>
```

For more commands, just type:

```bash
$ terracli query
```

For each command, you can use the `-h` or `--help` flag to get more information.

## Sending Transactions

Other than querying blockchain data, `terracli` is used to interact with the blockchain, sending transactions containing module messages with state-changing directives that get processed and included in blocks. All of transaction-sending operations follow the form:

```bash
$ terracli tx ...
```

Please check each module subsection in the side menu to learn more about different types of transactions you can issue.

### About Fees

Transactions on the Terra Protocol network need to include a transaction fee in order to be processed. This fee pays for the gas required to run the transaction. The formula is the following:

$$fees = gas * gasPrices$$

The `gas` is dependent on the transaction. Different transaction require different amount of `gas`. The `gas` amount for a transaction is calculated as it is being processed, but there is a way to estimate it beforehand by using the `auto` value for the `gas` flag. Of course, this only gives an estimate. You can adjust this estimate with the flag `--gas-adjustment` \(default `1.0`\) if you want to be sure you provide enough `gas` for the transaction.

The `gasPrice` is the price of each unit of `gas`. Each validator sets a `min-gas-price` value, and will only include transactions that have a `gasPrice` greater than their `min-gas-price`.

The transaction `fees` are the product of `gas` and `gasPrice`. As a user, you have to input 2 out of 3. The higher the `gasPrice`/`fees`, the higher the chance that your transaction will get included in a block.

### Setting Fees

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
