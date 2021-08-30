# Node Configuration

The following information describes the most important node configuration settings, which are found in the `~/.terra/config/` directory. For more detailed descriptions about your configuration settings, including settings for WASM, explore each configuration file.

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
minimum-gas-prices = "0.01133uluna,0.15uusd,0.104938usdr,169.77ukrw,428.571umnt,0.125ueur,0.98ucny,16.37ujpy,0.11ugbp,10.88uinr,0.19ucad,0.14uchf,0.19uaud,0.2usgd,4.62uthb,1.25usek,1.25unok,0.9udkk,2180.0uidr,7.6uphp"
```

### Enable REST API

`app.toml`

TODO: add details
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
