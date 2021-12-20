# Set up a local private network

Validators can set up a private Terra network to become familiar with running a Terra full node before joining a public network.

::: tip LocalTerra
If you are a developer and want to set up a local, WASM-enabled private testnet for smart contracts, visit [Download LocalTerra](../../develop/dapp/smart-contracts/set-up-local-environment.md#download-localterra).
:::

## Create a single node

The simplest Terra network you can set up is a local testnet with just a single node. In single-node environment, you have one account, and you are the only validator signing blocks for your private network.

1. Initialize your genesis file that will bootstrap the network. Replace the variables with your own information.

```bash
terrad init --chain-id=<testnet-name> <node-moniker>
```

2. Generate a Terra account. Replace the variable with your account name.

```bash
terrad keys add <account-name>
```

:::tip Get tokens
In order for Terrad to recognize a wallet address it must contain tokens. For the testnet, use [the faucet](https://faucet.terra.money/) to send Luna to your wallet. If you are on mainnet, send funds from an existing wallet. 1-3 luna are sufficient for most setup processes.
:::

## Add your account to the genesis

Run the following commands to add your account and set the initial balance:

```bash
terrad add-genesis-account $(terrad keys show <account-name> -a) 100000000uluna,1000usd
terrad gentx <my-account> 10000000uluna --chain-id=<testnet-name>
terrad collect-gentxs
```

## Start your private Terra network

Run the following command:

```bash
terrad start
```

If the private Terra network is set up correctly, your `terrad` node is running a node on `tcp://localhost:26656`, listening for incoming transactions and signing blocks.
