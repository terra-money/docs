# Node Configuration

This is a short guide on the most important settings for setting up your node. The configuration files mentioned are located in the `~/.terrad/config/` directory, and will contain many more items not addressed here. However, as those files are well-documented in the comments preceding configuration lines, please consult those files.

## General Settings

### Moniker

`config.toml`

```toml
# A custom human readable name for this node
moniker = "cx-mbp-will.local"
```

### Minimum Gas Prices

`app.toml`

You set this parameter as a measure against spam.

```toml
# The minimum gas prices a validator is willing to accept for processing a
# transaction. A transaction's fees must meet the minimum of any denomination
# specified in this config (e.g. 0.25token1;0.0001token2).
minimum-gas-prices = "0.015uluna,0.015ukrw"
```

## P2P Settings

### Seed Mode

`config.toml`

The node operates in seed mode. In seed mode, a node continuously crawls the network for peers, and upon incoming connection shares some peers and disconnects.

```toml
# Seed mode, in which node constantly crawls the network and looks for
# peers. If another node asks it for addresses, it responds and disconnects.
# Does not work if the peer-exchange reactor is disabled.
seed_mode = false
```

### Seeds

`config.toml`

Dials these seeds when we need more peers. They should return a list of peers and then disconnect. If we already have enough peers in the address book, we may never need to dial them.

```toml
# Comma separated list of seed nodes to connect to
seeds = "id100000000000000000000000000000000@1.2.3.4:26656,id200000000000000000000000000000000@2.3.4.5:4444"
```

### Persistent Peers

`config.toml`

Dial these peers and auto-redial them if the connection fails. These are intended to be trusted persistent peers that can help anchor us in the p2p network. The auto-redial uses exponential backoff and will give up after a day of trying to connect.

But if `persistent_peers_max_dial_period` is set greater than zero, pause between each dial to each persistent peer will not exceed `persistent_peers_max_dial_period` during exponential backoff and we keep trying again without giving up.

```toml
# Comma separated list of nodes to keep persistent connections to
persistent_peers = "id100000000000000000000000000000000@1.2.3.4:26656,id200000000000000000000000000000000@2.3.4.5:26656"
```
