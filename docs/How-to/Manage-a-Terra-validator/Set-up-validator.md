# Register your Terra validator

This is a detailed step-by-step guide for setting up a Terra validator. Please be aware that while it is easy to set up a rudimentary validating node, running a production-quality validator node with a robust architecture and security features requires an extensive setup.

::: tip
Block42 has put together an excellent [step-by-step guide](https://medium.com/block42-blockchain-company/how-to-setup-a-terra-luna-validator-node-860d8ea7aea2) for setting up a new validator.
:::

## Requirements

This guide starts with the following assumptions:

- You have [installed](../node/installation) the Terra Full Node Software.
- You have [connected your node](../node/join-network) to an existing network.
- You have [configured your node](../node/config) properly.
- You know your way around [terrad](../terrad).

## Retrieve the consensus PubKey of your node

The consensus PubKey (`terravalconspub-`) of your node is required to create a new validator. Run:

```bash
terrad tendermint show-validator
```

## Create a new validator

To create the validator and initialize it with a self-delegation, run the following command. `key-name` is the name of the private key that is used to sign transactions.

```bash
terrad tx staking create-validator \
    --amount=5000000uluna \
    --pubkey=$(<your-consensus-PubKey>) \
    --moniker="<your-moniker>" \
    --chain-id=<chain_id> \
    --from=<key-name> \
    --commission-rate="0.10" \
    --commission-max-rate="0.20" \
    --commission-max-change-rate="0.01" \
    --min-self-delegation="1"
```

::: warning Warning:
When you specify commission parameters, the `commission-max-change-rate` is measured as a percentage-point change of the `commission-rate`. For example, a change from 1% to 2% is a 100% rate increase, but the `commission-max-change-rate` is measured as 1%.
:::

## Confirm your validator is active

If running the following command returns something, the validator is active.

```bash
terrad query tendermint-validator-set | grep "$(terrad tendermint show-validator)"
```

You are looking for the `bech32` encoded `address` in the `~/.terra/config/priv_validator.json` file.

::: warning Note:
Only the top 130 validators in voting power are included in the active validator set.
:::
