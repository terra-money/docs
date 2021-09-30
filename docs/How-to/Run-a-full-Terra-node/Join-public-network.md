# Join a public network

After you've [run a simple local Terra network](Set-up-private-network.md), join a public Terra network, such as the Columbus mainnet or Bombay testnet, by completing the following steps.

## Setup

These instructions are for setting up a brand new full node from scratch.

### Initialize and configure moniker

First, initialize the node and create the necessary config files:

```bash
terrad init <your_custom_moniker>
```

::: warning NOTE
Monikers can only contain ASCII characters; using Unicode characters will render your node unreachable by other peers in the network.
:::

You can edit this `moniker` later, in the `~/.terra/config/config.toml` file:

```toml
# A custom human readable name for this node
moniker = "<your_custom_moniker>"
```

### Set minimum gas prices for transactions (recommended)

You can edit `~/.terra/config/app.toml` in order to enable anti-spam by rejecting incoming transactions with implied gas price less than a specified minimum. The minimum gas prices recommended for the Terra mainnet network is the following:

```toml
# The minimum gas prices a validator is willing to accept for processing a
# transaction. A transaction's fees must meet the minimum of any denomination
# specified in this config (e.g. 0.25token1,0.0001token2).
minimum-gas-prices = "0.01133uluna,0.15uusd,0.104938usdr,169.77ukrw,428.571umnt,0.125ueur,0.98ucny,16.37ujpy,0.11ugbp,10.88uinr,0.19ucad,0.14uchf,0.19uaud,0.2usgd,4.62uthb,1.25usek,1.25unok,0.9udkk,2180.0uidr,7.6uphp"
```

Your full node has now been initialized!

## Picking a Network

You specify the network you want to join by setting the **genesis file** and **seeds**. If you need more information about past networks, check our [Networks Repo](https://github.com/terra-money/testnet).

| Network        | Description        | Homepage                                                                  | Address Book |
| -------------- | ------------------ | ------------------------------------------------------------------------- | - |
| `columbus-4`   | Mainnet            | [Link](https://github.com/terra-money/mainnet)                          | https://network.terra.dev/addrbook.json |
| `tequila-0004` | Testnet | [Link](https://github.com/terra-money/testnet/tree/master/tequila-0004) | https://network.terra.dev/testnet/addrbook.json |

### Download the genesis file

You'll need to select the network you want to join and download its `genesis.json` file into your `~/.terra/config` directory. This file specifies the genesis account balances and parameters to use when replaying transactions and syncing.

```bash
mkdir -p ~/.terra/config
curl https://columbus-genesis.s3-ap-northeast-1.amazonaws.com/columbus-4-genesis.json > ~/.terra/config/genesis.json
```

Note we use the `latest` directory in the [networks repo](https://github.com/terra-money/testnet) which contains details for the latest testnet. If you are connecting to a different testnet, ensure you get the right files.

To verify the correctness of the configuration run:

```bash
terrad start
```

### Download address book (recommended for the mainnet)

If you have an address book of peers, download `addrbook.json` and move it into `~/.terra/config/addrbook.json`. This will give your node a selection of peers to dial to find other nodes.

```bash
curl https://network.terra.dev/addrbook.json > ~/.terra/config/addrbook.json
```

### Define seed nodes

::: warning NOTE

For more information on seeds and peers, you can [read this](https://github.com/tendermint/tendermint/blob/master/docs/tendermint-core/using-tendermint.md#peers).

:::

Your node needs to know how to find peers. You'll need to add healthy seed nodes to `~/.terra/config/config.toml`. The following are the current seeds for Terra mainnet:

```toml
seeds = "87048bf71526fb92d73733ba3ddb79b7a83ca11e@public-seed.terra.dev:26656,b5205baf1d52b6f91afb0da7d7b33dcebc71755f@public-seed2.terra.dev:26656,5fa582d7c9931e5be8c02069d7b7b243c79d25bf@seed.terra.de-light.io:26656"
```

## Connecting to the Network

### Run your node

Start the full node with this command:

```bash
terrad start
```

Check that everything is running smoothly:

```bash
terrad status
```

### Wait for node to sync

Your node should now be catching up with the network by replaying all the transactions from genesis and recreating the blockchain state locally. This will take a long time, so make sure you've set it up on a stable connection so you can leave while it syncs.

View the status of the network with the [Terra Finder](https://finder.terra.money). Once your full node syncs up to the current block height, you should see it appear on the [list of full nodes](https://terra.stake.id/).

Congratulations! You've now successfully joined a network as a full node operator.

### Using a data backup (recommended for the mainnet)

If you are connecting to an existing network for which you have a data backup (from a provider you trust), you can optionally load the backup into your node storage rather than syncing from scratch.

ChainLayer has generously provided node data backups for Columbus mainnet, which you can find in their [Terra QuickSync](https://terra.quicksync.io/) page.

## Appendix

### Upgrading Testnet

These instructions are for full nodes that have ran on previous testnets and would like to upgrade to the latest testnet.

#### Reset data

First, remove the outdated files and reset the data.

```bash
rm ~/.terra/config/genesis.json
rm ~/.terra/config/addrbook.json
terrad unsafe-reset-all
```

Your node is now in a pristine state while keeping the original `priv_validator.json` and `config.toml`. If you had any sentry nodes or full nodes setup before, your node will still try to connect to them, but may fail if they haven't also been upgraded.

::: danger
Make sure that every node has a unique `priv_validator.json`. Do not copy the `priv_validator.json` from an old node to multiple new nodes. Running two nodes with the same `priv_validator.json` will cause you to double sign.
:::

#### Software upgrade

Now it is time to upgrade the software. Go to the project directory, and run:

```bash
git checkout master && git pull
make
```

::: warning NOTE
If you have issues at this step, please check that you have the latest stable version of GO installed.
:::

Note we use `master` here since it contains the latest stable release. See the [testnet repo](https://github.com/terra-money/testnet) for details on which version is needed for which testnet, and the [Terra Core release page](https://github.com/terra-money/core/releases) for details on each release. Your full node has been cleanly upgraded!

### Exporting state

Terra can dump the entire application state to a JSON file, which could be useful for manual analysis and can also be used as the genesis file of a new network.

Export state with:

```bash
terrad export > [filename].json
```

You can also export state from a particular height \(at the end of processing the block of that height\):

```bash
terrad export --height [height] > [filename].json
```

If you plan to start a new network from the exported state, export with the `--for-zero-height` flag:

```bash
terrad export --height [height] --for-zero-height > [filename].json
```
