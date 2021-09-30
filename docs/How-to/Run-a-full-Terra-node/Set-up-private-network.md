# Set up a local private network

Set up a private Terra network to become familiar with running a Terra full node before you join a public network, such as the Terra mainnet.

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
