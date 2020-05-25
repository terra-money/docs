# Validator Setup

This is a detailed step-by-step guide for setting up a Terra validator. Please be aware that while it is easy to set up a rudimentary validating node, running a performant production-quality validator node with a robust architecture and security features can require a non-trivial setup.

::: tip
Block42 has put together an excellent, step-by-step guide for setting up a new validator that you can find [here](https://medium.com/block42-blockchain-company/how-to-setup-a-terra-luna-validator-node-860d8ea7aea2).
:::

## Requirements

This guide starts with the following assumptions:

- You have [installed](../node/installation) the Terra Full Node Software.
- You have [connected it](../node/join-network) to an existing network.
- You have [configured it](../node/config) properly.
- You know your way around [terracli](../terracli).

## Register your Validator

You will need to know the consensus PubKey (`terravalconspub-`) of your node to create a new validator. You can find it with:

```bash
$ terrad tendermint show-validator
```

Next, create your `terrad gentx` command:

```bash
$ terracli tx staking create-validator \
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

::: warning NOTE
When specifying commission parameters, the `commission-max-change-rate` is used to measure % _point_ change over the `commission-rate`. E.g. 1% to 2% is a 100% rate increase, but only 1 percentage point.
:::

::: warning NOTE
If unspecified, `consensus_pubkey` will default to the output of `terrad tendermint show-validator`. `key_name` is the name of the private key that will be used to sign the transaction.
:::

## Confirmation

Your validator is active if the following command returns anything:

```bash
$ terracli query tendermint-validator-set | grep "$(terrad tendermint show-validator)"
```

You are looking for the `bech32` encoded `address` in the `~/.terrad/config/priv_validator.json` file.

::: warning NOTE
To be in the validator set, you need to have more total voting power than the 100th validator.
:::

## Set up Oracle Feeder

Every Terra validator needs to participate in the oracle process and periodically submit a vote for the exchange rate of LUNA in all of the whitelisted denominations. Since this process occurs rather frequently (every 30 seconds), you need to set up an automated process to avoid getting slashed and jailed.

### Make a new key for oracle votes

You can separate the keys that are used for controlling your validator account from the ones that are submitting the oracle votes on behalf of your validator.

```bash
$ terracli keys add <feeder>
```

Show the feeder account details:

```bash
$ terracli keys show <feeder>
```

### Delegate feeder consent

The account address used to submit oracle voting transactions is called a `feeder`. When you set up your oracle voting process for the first time, you must send delegate the feeder permission to an account.

```bash
$ terracli tx oracle set-feeder <feeder-address> --from=<validator>
```

### Send funds to feeder

The feeder needs funds in order to pay for transaction fees to submit oracle voting messages. Note that **TerraKRW, not Luna** are used for oracle voting fees because the smallest atomic unit of TerraKRW is much cheaper than Luna. You can send TerraKRW to your feeder address, or send Luna and perform an on-chain swap:

#### Sending Luna to feeder account

```bash
$ terracli tx send <from-address> <feeder-address> <luna-amount>uluna
```

#### Example of swap from feeder

```bash
$ terracli tx market swap <luna-amount>uluna ukrw --from=<feeder>
```

### Set up oracle feeder program

Head over to [Feeder Implementations](oracle/#feeder-implementations) to install a program and set one up to start submitting oracle messages with your feeder account.

## Court Delegations

The next following steps are things you can do to help improve your visibility and make yourself known to potential delegators.

### Set up a Website

Set up a website so that your delegators can find you. We recommend making a custom section for Terra delegators that instructs how to delegate Luna tokens.

### Announce on Discord

Join the [Terra Validators Discord](https://discord.gg/ZHBuKda) channel and introduce yourself!

### Submit a Validator Profile

Get a fancy checkmark next to your name by submitting a [Validator Profile](https://github.com/terra-project/validator-profiles).

![validator-profile](/img/screens/validator-check.png)
