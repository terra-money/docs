# Validator Setup

This is a detailed step-by-step guide for setting up a Terra validator. Please be aware that while it is easy to set up a rudimentary validating node, running a production-quality validator node with a robust architecture and security features requires an extensive setup.

::: tip
Block42 has put together an excellent [step-by-step guide](https://medium.com/block42-blockchain-company/how-to-setup-a-terra-luna-validator-node-860d8ea7aea2)  for setting up a new validator.
:::

## Requirements

This guide starts with the following assumptions:

- You have [installed](../node/installation) the Terra Full Node Software.
- You have [connected your node](../node/join-network) to an existing network.
- You have [configured your node](../node/config) properly.
- You know your way around [terrad](../terrad).

## Registering your Validator

You will need to know the consensus PubKey (`terravalconspub-`) of your node to create a new validator. You can find it with:

```bash
terrad tendermint show-validator
```

Next, create your `terrad gentx` command:

```bash
terrad tx staking create-validator \
    --amount=5000000uluna \
    --pubkey=$(terrad tendermint show-validator) \
    --moniker="choose a moniker" \
    --chain-id=<chain_id> \
    --from=<key_name> \
    --commission-rate="0.10" \
    --commission-max-rate="0.20" \
    --commission-max-change-rate="0.01" \
    --min-self-delegation="1"
```

::: warning Note:
When specifying commission parameters, the `commission-max-change-rate` is measured as a percentage point change of the `commission-rate`. For example, a change from 1% to 2% is a 100% rate increase, but the `commission-max-change-rate` is meaured as 1%.
:::

::: warning Note:
Unless specified, `consensus_pubkey` will default to the output of `terrad tendermint show-validator`. `key_name` is the name of the private key that will be used to sign transactions.
:::

## Confirmation

A validator is active if the following command returns a value:

```bash
terrad query tendermint-validator-set | grep "$(terrad tendermint show-validator)"
```

You are looking for the `bech32` encoded `address` in the `~/.terra/config/priv_validator.json` file.

::: warning Note:
Only the top 130 validators in voting power are included in the validating set.
:::

## Setting up an Oracle Feeder

Every Terra validator needs to participate in the oracle process and periodically submit a vote for the exchange rate of LUNA in all whitelisted denominations. Since this process occurs rather frequently (every 30 seconds), validators need to set up an automated process to avoid getting slashed and jailed.

### Making a new key for oracle votes

You can separate the keys used for controlling a validator account from those that are submitting oracle votes on behalf of a validator.

```bash
terrad keys add <feeder>
```

Show the feeder account details:

```bash
terrad keys show <feeder>
```

### Delegate feeder consent

The account address used to submit oracle voting transactions is called a `feeder`. When you set up your oracle voting process for the first time, you must send delegate the feeder permission to an account.

```bash
terrad tx oracle set-feeder <feeder-address> --from=<validator>
```

### Send funds to feeder

The feeder needs funds in order to pay for transaction fees to submit oracle voting messages. Note that **TerraKRW, not Luna** are used for oracle voting fees because the smallest atomic unit of TerraKRW is much cheaper than Luna. You can send TerraKRW to your feeder address, or send Luna and perform an on-chain swap:

#### Sending Luna to feeder account

```bash
terrad tx send <from-address> <feeder-address> <luna-amount>uluna
```

#### Example of swap from feeder

```bash
terrad tx market swap <luna-amount>uluna ukrw --from=<feeder>
```

### Set up oracle feeder program

Head over to [Feeder Implementations](./oracle.md#feeder-implementations) to install a program and set one up to start submitting oracle messages with your feeder account.

## Court Delegations

The next following steps are things you can do to help improve your visibility and make yourself known to potential delegators.

### Set up a Website

Set up a website so that your delegators can find you. We recommend making a custom section for Terra delegators that instructs how to delegate Luna tokens.

### Announce on Discord

Join the [Terra Validators Discord](https://discord.gg/ZHBuKda) channel and introduce yourself!

### Submit a Validator Profile

Get a fancy checkmark next to your name by submitting a [Validator Profile](https://github.com/terra-money/validator-profiles).

![validator-profile](/img/screens/validator-check.png)
