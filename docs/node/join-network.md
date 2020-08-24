# Joining a Network

After you've tried out running a simple local Terra network, you may want to participate in an existing Terra network, such as the Columbus mainnet or Soju testnet. This document will help you configure and set up your node for just that.

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

You can edit this `moniker` later, in the `~/.terrad/config/config.toml` file:

```toml
# A custom human readable name for this node
moniker = "<your_custom_moniker>"
```

### Set minimum gas prices for transactions (recommended)

You can edit `~/.terrad/config/app.toml` in order to enable anti-spam by rejecting incoming transactions with implied gas price less than a specified minimum:

```toml
# The minimum gas prices a validator is willing to accept for processing a
# transaction. A transaction's fees must meet the minimum of any denomination
# specified in this config (e.g. 0.25token1,0.0001token2).
minimum-gas-prices = "0.015ukrw,0.015uluna"
```

Your full node has now been initialized!

## Picking a Network

You specify the network you want to join by setting the **genesis file** and **seeds**. If you need more information about past networks, check our [Networks Repo](https://github.com/terra-project/networks).

| Network        | Description        |                                                                                                      |                                                         |
| -------------- | ------------------ | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `columbus-3`   | Mainnet            | [genesis](https://columbus-genesis.s3-ap-northeast-1.amazonaws.com/genesis.json)                     | [address book](https://network.terra.dev/addrbook.json) |
| `soju-0014`    | Columbus-3 Testnet | [genesis](https://raw.githubusercontent.com/terra-project/networks/master/soju-0014/genesis.json)    |                                                         |
| `tequila-0001` | Columbus-4 Testnet | [genesis](https://raw.githubusercontent.com/terra-project/networks/master/tequila-0001/genesis.json) |                                                         |

### Download the genesis file

You'll need to select the network you want to join and download its `genesis.json` file into your `~/.terrad/config` directory. This file specifies the genesis account balances and parameters to use when replaying transactions and syncing.

```bash
mkdir -p ~/.terrad/config
curl https://columbus-genesis.s3-ap-northeast-1.amazonaws.com/genesis.json > ~/.terrad/config/genesis.json
```

Note we use the `latest` directory in the [networks repo](https://github.com/terra-project/networks) which contains details for the latest testnet. If you are connecting to a different testnet, ensure you get the right files.

To verify the correctness of the configuration run:

```bash
terrad start
```

### Download address book (recommended)

If you have an address book of peers, download `addrbook.json` and move it into `~/.terrad/config/addrbook.json`. This will give your node a selection of peers to dial to find other nodes.

```bash
curl https://network.terra.dev/addrbook.json > ~/.terrad/config/addrbook.json
```

### Define seed nodes

::: warning NOTE

For more information on seeds and peers, you can [read this](https://github.com/tendermint/tendermint/blob/master/docs/tendermint-core/using-tendermint.md#peers).

:::

Your node needs to know how to find peers. You'll need to add healthy seed nodes to `~/.terrad/config/config.toml`. Below are some sample seeds provided by Block42, a Terra validator, taken from their excellent [validator setup guide](https://medium.com/block42-blockchain-company/how-to-setup-a-terra-luna-validator-node-860d8ea7aea2).

```toml
seeds = "20271e0591a7204d72280b87fdaa854f50c55e7e@106.10.59.48:26656,3b1c85b86528d10acc5475cb2c874714a69fde1e@110.234.23.153:26656,49333a4cb195d570ea244dab675a38abf97011d2@13.113.103.57:26656,7f19128de85ced9b62c3947fd2c2db2064462533@52.68.3.126:26656"
```

## Connecting to the Network

### Run your node

Start the full node with this command:

```bash
terrad start
```

Check that everything is running smoothly:

```bash
terracli status
```

### Wait for node to sync

Your node should now be catching up with the network by replaying all the transactions from genesis and recreating the blockchain state locally. This will take a long time, so make sure you've set it up on a stable connection so you can leave while it syncs.

View the status of the network with the [Terra Finder](https://finder.terra.money). Once your full node syncs up to the current block height, you should see it appear on the [list of full nodes](https://terra.stake.id/).

Congratulations! You've now successfully joined a network as a full node operator.

### Using a data backup (optional)

If you are connecting to an existing network for which you have a data backup (from a provider you trust), you can optionally load the backup into your node storage rather than syncing from scratch.

ChainLayer has generously provided node data backups for Columbus-3 mainnet, which you can find in their [Terra QuickSync](https://terra.quicksync.io/) page.

#### Example using QuickSync

```bash
# Stop Terra Daemon first

sudo apt-get update -y
sudo apt-get install wget liblz4-tool aria2 -y

sudo su - [terrauser]
cd ~/.terrad/
FILENAME=columbus-3-pruned.DATE.TIME.tar.lz4
aria2c -x5 https://get.quicksync.io/$FILENAME
wget https://raw.githubusercontent.com/chainlayer/quicksync-playbooks/master/roles/quicksync/files/checksum.sh
wget https://get.quicksync.io/$FILENAME.checksum

# Compare checksum with onchain version. Hash can be found at https://get.quicksync.io/columbus-3-pruned.DATE.TIME.tar.lz4.hash
curl -s https://lcd.terra.dev/txs/`curl -s https://get.quicksync.io/$FILENAME.hash`|jq -r '.tx.value.memo'|sha512sum -c
./checksum.sh $FILENAME
lz4 -d $FILENAME | tar xf -

# Start Terra Daemon
terrad start
```

## Appendix

### Upgrading Testnet

These instructions are for full nodes that have ran on previous testnets and would like to upgrade to the latest testnet.

#### Reset data

First, remove the outdated files and reset the data.

```bash
rm ~/.terrad/config/genesis.json
rm ~/.terrad/config/addrbook.json
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

Note we use `master` here since it contains the latest stable release. See the [testnet repo](https://github.com/terra-project/networks) for details on which version is needed for which testnet, and the [Terra Core release page](https://github.com/terra-project/core/releases) for details on each release. Your full node has been cleanly upgraded!

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
