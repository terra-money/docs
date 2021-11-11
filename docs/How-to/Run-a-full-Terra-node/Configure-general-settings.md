# Configure general settings

The following information describes the most important node configuration settings, which are found in the `~/.terra/config/` directory. We recommend that you update these settings with your own information.

For more detailed descriptions about your configuration settings, including settings for WASM, explore each configuration file.

## Update your moniker

1. Open `~/.terra/config/config.toml`.

2. Modify the `moniker` to name your node.

```toml
# A custom human readable name for this node
moniker = "cx-mbp-will.local"
```

## Download the address book

Choose and download `addrbook.json` and move it into `~/.terra/config/addrbook.json`. This will give your node a selection of peers to dial to find other nodes.

For more p2p and seed settings, visit [additional settings](#additional-settings)

- Mainnet address book:

```bash
curl https://network.terra.dev/addrbook.json > ~/.terra/config/addrbook.json
```

- Testnet address book:

```bash
curl https://network.terra.dev/testnet/addrbook.json > ~/.terra/config/addrbook.json
```

## Update minimum gas prices

1. Open `~/.terra/config/app.toml`.

2. Modify `minimum-gas-prices` to set the minimum price of gas a validator will accept to validate a transaction and to prevent spam.

```toml
# The minimum gas prices a validator is willing to accept for processing a
# transaction. A transaction's fees must meet the minimum of any denomination
# specified in this config (e.g. 0.25token1;0.0001token2).
minimum-gas-prices = "0.01133uluna,0.15uusd,0.104938usdr,169.77ukrw,428.571umnt,0.125ueur,0.98ucny,16.37ujpy,0.11ugbp,10.88uinr,0.19ucad,0.14uchf,0.19uaud,0.2usgd,4.62uthb,1.25usek,1.25unok,0.9udkk,2180.0uidr,7.6uphp,1.17uhkd"
```


## Start the light client daemon (LCD)

To enable the REST API and Swagger, and to start the LCD, complete the following steps:

1. Open `~/.terra/config/app.toml`.

2. Locate the `API Configuration` section (`[api]`).

3. Change `enable = false` to `enable = true`.

```toml
# Enable defines if the API server should be enabled.
enable = true
```

4. Optional: To enable Swagger, change `swagger = flase` to `swagger = true`.

```toml
# Swagger defines if swagger documentation should automatically be registered.
swagger = true
```
5. Restart.

Once restarted, the LCD will be available.

For more information about the Terra REST API endpoints, see the [Swagger documentation](https://lcd.terra.dev/swagger/).

## Additional settings

### `seed_mode`

In seed mode, a node continuously crawls the network for peers, and upon incoming connection shares some peers and disconnects.

```toml
# Seed mode, in which node constantly crawls the network and looks for
# peers. If another node asks it for addresses, it responds and disconnects.
# Does not work if the peer-exchange reactor is disabled.
seed_mode = false
```

### `seeds`

When more peers are needed, the seed nodes you specify are dialed and a list of peers is returned. If enough peers are already in the address book, the `seeds` setting might never be used.

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
