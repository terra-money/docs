# Running a Local Testnet

After you've gotten the latest version of Terra Core installed, you can set up a private Terra network to get your bearings in running a Terra full node before [joining an existing network](join-network.md).

## Single Node Setup

The simplest Terra network you can set up will be a local testnet with just a single node. You will create one account and be the sole validator signing blocks for the network.

### Step 1. Create network and account

First, initialize your genesis file that will bootstrap the network. Set a name for your local testnet, and provide a moniker to refer to your node.

```bash
terrad init --chain-id=<testnet-name> <node-moniker>
```

You will need a Terra account to start. You can generate one with:

```bash
terrad keys add <account-name>
```

### Step 2. Add account to genesis

Next, you need to add your account to the genesis. The following commands add your account and set the initial balance:

```bash
terrad add-genesis-account $(terrad keys show <account-name> -a) 100000000uluna,1000usd
terrad gentx <account-name> <amount>
terrad collect-gentxs
```

### Step 3. Run Terra daemon

Now, you can start your private Terra network:

```bash
terrad start
```

Your `terrad` node should now be running a node on `tcp://localhost:26656`, listening for incoming transactions and signing blocks. You've successfully set up your local Terra network!
