# Register your Terra validator

This is a detailed step-by-step guide for setting up a Terra validator. Please be aware that while it is easy to set up a rudimentary validating node, running a production-quality validator node with a robust architecture and security features requires an extensive setup.

For more information on setting up a validator, see [additional resources](README.md#additional-resources).

## Prerequisites

- You have completed [how to run a full Terra node](../run-a-full-terra-node/README.md), which outlines how to install, connect, and configure a node.
- You are familiar with [terrad](../../develop/how-to/terrad/README.md).
- you have read through [the validator FAQ](faq.md)

## 1. Retrieve your PubKey

The consensus PubKey of your node is required to create a new validator. Run:

```bash
--pubkey=$(terrad tendermint show-validator)
```

## 2. Create a new validator

   :::{admonition} Get tokens
   :class: tip
   In order for Terrad to recognize a wallet address it must contain tokens. For the testnet, use [the faucet](https://faucet.terra.money/) to send Luna to your wallet. If you are on mainnet, send funds from an existing wallet. 1-3 luna are sufficient for most setup processes.
   :::

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

::: {warning}
When you specify commission parameters, the `commission-max-change-rate` is measured as a percentage-point change of the `commission-rate`. For example, a change from 1% to 2% is a 100% rate increase, but the `commission-max-change-rate` is measured as 1%.
:::

## 3. Confirm your validator is active

If running the following command returns something, your validator is active:

```bash
terrad query tendermint-validator-set | grep "$(terrad tendermint show-validator)"
```

You are looking for the `bech32` encoded `address` in the `~/.terra/config/priv_validator.json` file.

::: {note}
Only the top 130 validators in voting power are included in the active validator set.
:::
