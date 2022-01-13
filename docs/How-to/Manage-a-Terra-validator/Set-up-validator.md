# Register your Terra validator

This is a detailed step-by-step guide for setting up a Terra validator. Please be aware that while it is easy to set up a rudimentary validating node, running a production-quality validator node with a robust architecture and security features requires an extensive setup.


## Prerequisites

- You have completed [how to run a full Terra node](https://docs.terra.money/How-to/Run-a-full-Terra-node/Hardware-requirements.html), which outlines how to install, connect, and configure a node.
- You are familiar with [terrad](../../Reference/terrad/).
- you have read through [the validator FAQ](./faq.md)
- Hardware requirements: see [requirements for running a full node](../Run-a-full-Terra-node/Hardware-requirements.md).

## 1. Retrieve the consensus PubKey of your node

The consensus PubKey of your node is required to create a new validator. Run:

```bash
terrad tendermint show-validator
```

## 2. Create a new validator

:::tip Get tokens
In order for `terrad` to recognize a wallet address it must contain tokens. For the testnet, use [the faucet](https://faucet.terra.money/) to send Luna to your wallet. ( You can find out your address via `terrad keys list`. ) If you are on mainnet, send funds from an existing wallet. 1-3 Luna are sufficient for most setup processes.
:::

To initialize a node to be a validator via [ self-delegation ](../../Concepts/glossary.md#self-delegation) run the following commands. 
`key-name` is the name of the private key that is used to sign transactions.

```bash
terrad tx staking create-validator \
    --amount=5000000uluna \
    --pubkey=$(terrad tendermint show-validator) \ 
    --moniker="<your-moniker>" \ # this is set in ~/.terra/config/config.toml
    --chain-id=<chain_id> \
    --from=<validator_address> \ # you can find yours via `terrad keys list`
    --commission-rate="0.10" \
    --commission-max-rate="0.20" \
    --commission-max-change-rate="0.01" \
    --min-self-delegation="1" \
    --gas-prices=0.015uluna \
    --gas=auto \
    --gas-adjustment=1.4

```






::: warning Warning:
When you specify commission parameters, the `commission-max-change-rate` is measured as a percentage-point change of the `commission-rate`. For example, a change from 1% to 2% is a 100% rate increase, but the `commission-max-change-rate` is measured as 1%.
:::

## 3. Confirm your validator is active

If running the following command returns something, the validator is active.

```bash
terrad query tendermint-validator-set | grep "$(terrad tendermint show-validator)"
```

You are looking for the `bech32` encoded `address` in the `~/.terra/config/priv_validator.json` file.

::: warning Note:
Only the top 130 validators in voting power are included in the active validator set.
:::
