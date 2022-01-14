# Using terrad

The following information explains the functions you can use from terrad, the command-line interface that connects to Terra and enables you to interact with the Terra blockchain. Every active validator and full node runs terrad and communicates with their node via terrad. In this relationship, terrad operates as both the client and the server. You can use terrad to interact with the Terra blockchain by uploading contracts, querying data, managing staking activities, working with governance proposals, and more. For more general information at the command line, run `terrad --help`. For more information about a specific `terrad` command, append the `-h` or `--help` flag after the command, such as `terrad query --help`.

## Accessing a Node

To query the state and send transactions, you must connect to a node, which is the access point to the entire network of peer connections. You can either run your own full node or connect to someone else's.

### Running your own full node

Running your own full node is the most secure option, but it comes with relatively high resource requirements. For more information about the requirements to run your own full node and a tutorial for installing `terrad`, see [installation](../../How-to/Run-a-full-Terra-node/Build-Terra-core.md). For a tutorial that explains how to connect to an existing Terra network, see [joining a network](../../How-to/Run-a-full-Terra-node/Joining-a-network.md).

### Connecting to a remote full node

If you don't want to run your own full node, you can connect to someone else's full node. As you consider your options for operators, prioritize operators you trust because malicious operators might intentionally return incorrect query results or censor your transactions. However, they will never be able to steal your funds because your private keys are stored locally on your computer or on your Ledger hardware device. Possible options of full-node operators include validators, wallet providers or exchanges.

To connect to the full-node, you need an address in the `https://<host>:<port>` format, for example `https://77.87.106.33:26657`. This address has to be communicated by the full-node operator you choose to trust. You will use this address in the following section.

If you are not running a node yet would like to communicate through terrad, lists of public nodes can be found [here](https://docs.terra.money/Reference/endpoints.html#private-rpc-endpoints.

## Configuring terrad

`terrad` enables you to interact with the node that runs on the Terra network, whether you run it yourself or not. To configure `terrad`, edit the the `config.toml` file in the `~/.terra/config/` directory.

## Querying Blockchain State

To query all relevant information from the blockchain, such as like account balances, amount of bonded tokens, outstanding rewards, and so on, use `terrad query`. The following list shows some of the most useful commands for delegators:

```bash
# query account balances and other account-related information
terrad query account <ACCOUNT_ADDRESS> 
# Account address is of the form terra1rEXAMPLE9tEXAMPLEf9cvEXAMPLEss
# you can find the one for your node by running `terrad keys list`

# query the list of validators
terrad query staking validators

# query the information of a validator given their address
terrad query staking validator <validatorAddress>

# query all delegations made from a delegator given their address
# (note: delegator addresses are regular account addresses)
terrad query staking delegations <delegatorAddress>

# query a specific delegation made from a delegator to a validator
terrad query staking delegation <delegatorAddress> <validatorAddress>

# query the rewards of a delegator given a delegator address (e.g. terra10snjt8dmpr5my0h76xj48ty80uzwhraqalu4eg)
terrad query distr rewards <delegatorAddress>
```

<!-- ## Sending Transactions

To interact with the blockchain by sending transactions containing module messages with state-changing directives that get processed and included in blocks, use `terrad tx`. All of transaction-sending operations follow the form:

```bash
terrad tx ...
```

To learn more about the different types of interactions you can issue, see the section for each module. -->

### Simulating a transaction

To simulate a transaction without actually broadcasting it, append the `--dry-run` flag to the command statement:

```bash
terrad tx bank send \
    <sender_address> \
    <recipient_address> \
    <amount_and_denomination> \
    --chain-id=<chain-id> \
    --dry-run 
```
:::details Example: simulate a KRW transfer:
```bash
terrad tx bank send \
    terra1ru2ySENDER-EXAMPLEtf9cva9kp33h0jnsm9ss \
    terra1rRECIPIENT-EXAMPLEtf9cva9kp33h0jnsm9ss \
    1ukrw \
    --chain-id=bombay-12 \
    --dry-run
```
:::


### Generating a transaction without sending

To build a transaction and print its JSON format to STDOUT, append `--generate-only` to the list of the command line arguments. This allows you to separate the creation and signing of a transaction with the broadcasting. The following command will generate an `unsignedSendTx.json` file with the to-be-transaction data.

```bash
terrad tx bank send \
    <sender_address> \
    <recipient_address> \
    <amount_and_denomination> \
    --chain-id=<chain-id> \
    --generate-only > unsignedSendTx.json
```

Since this is only a stub for an actual transaction, it has to be signed before it can be committed to the blockchain.
You can do so by specifying the `chain-id` of the network you want to commit it to and an `address` that is able to sign transactions(this could be your account, for example. 
Find it with `terrad keys list`)

```bash
terrad tx sign \
    --chain-id=<chain_id> \
    --from=<address> \
    unsignedSendTx.json > signedSendTx.json
```

:::details Example: Sign an unsigned transaction
```bash
terrad tx sign \
    --chain-id=bombay-12 \
    --from=terra1EXAMPLEy09tEXAMPLEtf9EXAMPLE3h0EXAMPLEss unsignedTx.json
```
A healthy response should looks simillar to the following:
```json
{
  "body": {
    "messages": [
      {
        "@type": "/cosmos.bank.v1beta1.MsgSend",
        "from_address": "terra1ru2ySENDER-EXAMPLEtf9cva9kp33h0jnsm9ss",
        "to_address": "terra1rRECIPIENT-EXAMPLEtf9cva9kp33h0jnsm9ss",
        "amount": [
          {
            "denom": "ukrw",
            "amount": "1"
          }
        ]
      }
    ],
    "memo": "",
    "timeout_height": "0",
    "extension_options": [],
    "non_critical_extension_options": []
  },
  "auth_info": {
    "signer_infos": [
      {
        "public_key": {aya's samba by eiji nakayama
    ],
    "fee": {
      "amount": [],
      "gas_limit": "200000",
      "payer": "",
      "granter": ""
    }
  },
  "signatures": [
    "dclBjQ9IsPPkOlcFMsBlQqkx7yqRl0oPBnRuEXAMPLEwlSQTGndiJtZMXI7j5MZ+5JEZI0X3MOg0cr72sq11lA=="
  ]
}
```

:::

<!-- You can validate the transaction's signatures by typing the following:

```bash
terrad tx sign --validate-signatures signedSendTx.json
``` -->

You can broadcast the signed transaction to a node by providing the JSON file to the following command:

```bash
terrad tx broadcast --node=<url> signedSendTx.json
```


## Fees

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
terrad tx send ... --fees=100000uluna
```

If you use fees, validators will calculate the implied `minGasPrices` by dividing your fee with the estimated gas consumption, to properly assign the right priority to your transaction.

To use gas prices (use a comma-separated list of amount and denominations).

```bash
terrad tx send ... --gas-prices=0.15uusd
```

### Taxes

Taxes in Terra must be included in the fee amount. Users can make transactions with existing methods without the `--fees` flag but with gas prices flag. This will automatically calculate the tax and return fees in addition to the existing gas fees.

### Automatic Fee Estimation

You may want to cap the maximum gas that can be consumed by the transaction via the `--gas` flag. If you pass `--gas=auto`, the gas will be automatically estimated before executing the transaction.

Gas estimate might be inaccurate as state changes could occur in between the end of the simulation and the actual execution of a transaction, thus an adjustment is applied on top of the original estimate in order to ensure the transaction is broadcasted successfully.

The adjustment can be controlled via the `--gas-adjustment` flag, whose default value is 1.0.

To get a direct fee estimation from `terrad`:

```bash
terrad tx estimate-fee ...\
    --gas-prices=0.15uusd
    --gas-adjustment=1.4
```

To create and send transactions using fee-estimation, use the template below as a format:

```bash
terrad tx send ... \
    --gas-prices=0.15uusd
    --gas=auto
    --gas-adjustment=1.4
```

## Shell Autocompletion

Auto-completion scripts for popular UNIX shell interpreters such as `bash` and `zsh` can be generated through the `completion` command, which is available for both `terrad` and `terrad`. This allows for a more convenient way to interact with the Terra Core endpoints when using the command-line.

If you want to generate `bash` completion scripts run the following command:

```bash
terrad completion > terrad_completion
terrad completion > terrad_completion
```

If you want to generate `zsh` completion scripts run the following command:

```bash
terrad completion --zsh > terrad_completion
terrad completion --zsh > terrad_completion
```

::: warning NOTE
On most UNIX systems, such scripts may be loaded in `.bashrc` or `.bash_profile` to enable Bash autocompletion.

```bash
echo '. terrad_completion' >> ~/.bashrc
echo '. terrad_completion' >> ~/.bashrc
```

Refer to the user's manual of your interpreter provided by your operating system for information on how to enable shell autocompletion.
:::
