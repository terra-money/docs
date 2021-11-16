# Join a public network

After you've [run a simple local Terra network](Set-up-private-network.md), join a public Terra network, such as the Columbus mainnet or Bombay testnet, by completing the following steps.

## Setup

These instructions are for setting up a brand new full node from scratch.

### Initialize and configure moniker

First, initialize the node and create the necessary config files:

```bash
terrad init <your_custom_moniker>
```

::: warning Moniker characters
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
minimum-gas-prices = "0.01133uluna,0.15uusd,0.104938usdr,169.77ukrw,428.571umnt,0.125ueur,0.98ucny,16.37ujpy,0.11ugbp,10.88uinr,0.19ucad,0.14uchf,0.19uaud,0.2usgd,4.62uthb,1.25usek,1.25unok,0.9udkk,2180.0uidr,7.6uphp,1.17uhkd"
```

Your full node has now been initialized!

## Pick a Network

Specify the network you want to join by setting the **genesis file** and **seeds**. If you need more information about past networks, visit the [Networks Repo](https://github.com/terra-money/testnet).

| Network      | Description | Homepage                                                             | Address Book                                    |
| ------------ | ----------- | -------------------------------------------------------------------- | ----------------------------------------------- |
| `columbus-5` | Mainnet     | [Link](https://github.com/terra-money/mainnet/tree/master/columbus-5)| https://network.terra.dev/addrbook.json         |
| `bombay-12`  | Testnet     | [Link](https://github.com/terra-money/testnet/tree/master/bombay-12) | https://network.terra.dev/testnet/addrbook.json |

### Download the genesis file

Select the network you want to join and download its `genesis.json` file into your `~/.terra/config` directory. This file specifies the genesis account balances and parameters to use when replaying transactions and syncing.

- Columbus-5 mainnet genesis:

```bash
wget https://columbus-genesis.s3.ap-northeast-1.amazonaws.com/columbus-5-genesis.json
mv ./columbus-5-genesis.json ~/.terra/config/genesis.json
```
- Bombay-12 testnet genesis:

```bash
wget https://raw.githubusercontent.com/terra-money/testnet/master/bombay-12/genesis.json
mv genesis.json ~/.terra/config/genesis.json
```

Note we use the `latest` directory in the [networks repo](https://github.com/terra-money/testnet) which contains details for the latest testnet. If you are connecting to a different testnet, ensure you get the right files.

To start terrad, enter the following:

```bash
terrad start
```

### Download address book (recommended for the mainnet)

To give your node a selection of peers to dial and find other nodes, download `addrbook.json` and move it into `~/.terra/config/addrbook.json`.

For advanced settings, visit [Define seed nodes](#define-seed-nodes).

- Columbus mainnet address book:

```bash
wget https://network.terra.dev/addrbook.json
mv addrbook.json ~/.terra/config
```

- Bombay testnet address book:

```bash
wget https://github.com/terra-money/testnet/blob/master/bombay-12/addrbook.json
mv addrbook.json ~/.terra/config
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

::: warning Sync start times
Nodes take at least an hour to start syncing. This wait is normal. Before troubleshooting a sync, please wait an hour for the sync to start.
:::

Your node is catching up with the network by replaying all the transactions from genesis and recreating the blockchain state locally. This will take a long time, so make sure you've set it up on a stable connection so you can leave while it syncs.

- Validators can view the status of the network with [Terra Finder](https://finder.terra.money).
- Once your full node syncs up to the current block height, it will appear on the [list of full nodes](https://terra.stake.id/).
- For faster syncs during testing, see [node sync for testing](#node-sync-for-testing)

Congratulations! You've successfully joined a network as a full node operator. If you are a validator, continue to [manage a Terra validator](/How-to/Manage-a-Terra-validator/Overview.html) for next steps.

### Using a data backup (recommended for the mainnet)

If you are connecting to an existing network for which you have a data backup (from a provider you trust), you can optionally load the backup into your node storage rather than syncing from scratch.

To access Columbus-5 node data backups provided by ChainLayer, visit [Terra QuickSync](https://terra.quicksync.io/).

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

### Node sync for testing

Sometimes you may want to sync faster by foregoing checks. This command should only be used by advanced users in non-production environments. To speed up the sync process during testing, use the following command:

```bash
terrad start --x-crisis-skip-assert-invariants
```

::: warning NOTE

For more information on seeds and peers, visit [Tendermint's documentation](https://github.com/tendermint/tendermint/blob/master/docs/tendermint-core/using-tendermint.md#peers).

:::

For seed mode and p2p settings, visit the [additional settings page](/How-to/Run-a-full-Terra-node/Configure-general-settings.html#additional-settings).
