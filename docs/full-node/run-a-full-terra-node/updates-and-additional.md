# Updates and additional settings

## Upgrade the testnet

These instructions are for full nodes running previous testnets that would like to upgrade to the latest testnet.

### 1. Reset data

Remove the outdated files and reset data:

```bash
rm ~/.terra/config/genesis.json
rm ~/.terra/config/addrbook.json
terrad unsafe-reset-all
```

Your node is now in a pristine state, keeping the original `priv_validator.json` and `config.toml`. If you had any sentry nodes or full nodes set up before, your node will still try to connect to them but may fail if they haven't also been upgraded.

::: danger
Make sure that every node has a unique `priv_validator.json`. Do not copy the `priv_validator.json` from an old node to multiple new nodes. Running two nodes with the same `priv_validator.json` will cause you to double sign.  
:::

### 2. Software upgrade

Now it is time to upgrade the software. Go to the project directory and run:

```bash
git checkout master && git pull
make
```

::: warning NOTE
If you have issues at this step, please check that you have a compatible version of GO installed (v1.16.1-go1.17.1).
:::

The previous command uses `master` as it contains the latest stable release. See the [testnet repo](https://github.com/terra-money/testnet) for details on which version is needed for which testnet, and the [Terra Core release page](https://github.com/terra-money/core/releases) for details on each release.

Your full node is now cleanly upgraded!

## Exporting state

Terra can export the entire application state to a JSON file. You can use this file for manual analysis or as the genesis file of a new network.

Export state:

```bash
terrad export > [filename].json
```

You can also export a state from a particular height. The following command will export the state after the block height you specify:

```bash
terrad export --height [height] > [filename].json
```

If you plan to start a new network from the exported state, export with the `--for-zero-height` flag:

```bash
terrad export --height [height] --for-zero-height > [filename].json
```


::: warning NOTE

For more information on seeds and peers, visit the [Tendermint documentation](https://github.com/tendermint/tendermint/blob/master/docs/tendermint-core/using-tendermint.md#peers).

:::


## Additional Settings

### `seed_mode`

In seed mode, your node constantly crawls the network and looks for peers. If another node asks it for addresses, it responds and disconnects. Seed mode will not work if the peer-exchange reactor is disabled.

```toml
seed_mode = true
```

### `seeds`

To manually identify seed nodes, edit the following setting in `config.toml`.

```toml
# Comma separated list of seed nodes to connect to
seeds = "id100000000000000000000000000000000@1.2.3.4:26656,id200000000000000000000000000000000@2.3.4.5:4444"
```

### `persistent_peers`

The nodes you specify are the trusted persistent peers that can help anchor your node in the p2p network. If the connection fails, they are dialed and automatically redialed for 24 hours. The automatic redial function uses exponential backoff and stops after 24 hours of trying to connect.

If the value of `persistent_peers_max_dial_period` is more than zero, the pause between each call to each persistent peer will not exceed `persistent_peers_max_dial_period` during exponential backoff, and the automatic redial process continues.

```toml
# Comma separated list of nodes to keep persistent connections to
persistent_peers = "id100000000000000000000000000000000@1.2.3.4:26656,id200000000000000000000000000000000@2.3.4.5:26656"
```
### Rosetta

Integrate Terra with Coinbase via the Rosetta API. Rosetta is an open-source API that organizes blockchain data into a standardized format, making it easy for developers to build cross-chain applications. Instead of creating specific code for each chain, Rosetta allows different blockchains to integrate into any exchange that uses Rosetta API.

For more information, visit the [Rosetta docs site](https://www.rosetta-api.org/docs/welcome.html).
