# Validator Setup

This is a detailed step-by-step guide for setting up a Terra validator. Please be aware that while it is easy to set up a rudimentary validating node, running a performant production-quality validator node with a robust architecture and security features can require a non-trivial setup.

## Requirements

This guide starts with the following assumptions:

- You have [installed](../node/installation) the Terra Full Node Software.
- You have [connected it](../node/join-network) to an existing network.
- You have [configured it](../node/config) properly.
- You know your way around [terracli](../terracli).

## Registering your Validator

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

**Note**: When specifying commission parameters, the `commission-max-change-rate` is used to measure % _point_ change over the `commission-rate`. E.g. 1% to 2% is a 100% rate increase, but only 1 percentage point.

**Note**: If unspecified, `consensus_pubkey` will default to the output of `terrad tendermint show-validator`. `key_name` is the name of the private key that will be used to sign the transaction.

## Confirmation

Your validator is active if the following command returns anything:

```bash
terracli query tendermint-validator-set | grep "$(terrad tendermint show-validator)"
```

You should also be able to see your validator on the Terra Station. You are looking for the `bech32` encoded `address` in the `~/.terrad/config/priv_validator.json` file.

::: warning NOTE
To be in the validator set, you need to have more total voting power than the 100th validator.
:::

## Setting up the Oracle Feeder

## Submit Validator Profile
