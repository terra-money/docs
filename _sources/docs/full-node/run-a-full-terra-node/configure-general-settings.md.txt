# Configure general settings

The following information describes the most important node configuration settings found in the `~/.terra/config/` directory. It is recommended that you update these settings with your own information.

:::{dropdown} Structure of .terra/config

```bash
~/.terra/config
│-- addrbook.json                       # a registry of peers to connect to
│-- app.toml                            # terrad configuration file
│-- client.toml                         # configurations for the cli wallet (ex terracli)
│-- config.toml                         # Tendermint configuration  file
│-- genesis.json                        # gensesis transactions
│-- node_key.json                       # private key used for node authentication in the p2p protocol (its corresponding public key is the nodeid)
└-- priv_validator_key.json             # key used by the validator on the node to sign blocks
```
:::


## Initialize and configure moniker

Initialize the node with a human-readable name:

```bash
terrad init <your_custom_moniker> # ex., terrad init validator-joes-node
```
::: {admonition} Moniker characters
:class: caution
Monikers can only contain ASCII characters; using Unicode characters will render your node unreachable by other peers in the network.
:::

You can update your node's moniker by editing the `moniker` field in  `~/.terra/config/config.toml`

## Update minimum gas prices

1. Open `~/.terra/config/app.toml`.

2. Modify `minimum-gas-prices` and set the minimum price of gas a validator will accept to validate a transaction and to prevent spam.

- You can [query FCD](https://fcd.terra.dev/v1/txs/gas_prices) to view the current gas prices.

**Example**:

```toml
# The minimum gas prices a validator is willing to accept for processing a
# transaction. A transaction's fees must meet the minimum of any denomination
# specified in this config (e.g. 0.25token1;0.0001token2).
minimum-gas-prices = "0.01133uluna,0.15uusd,0.104938usdr,169.77ukrw,428.571umnt,0.125ueur,0.98ucny,16.37ujpy,0.11ugbp,10.88uinr,0.19ucad,0.14uchf,0.19uaud,0.2usgd,4.62uthb,1.25usek,1.25unok,0.9udkk,2180.0uidr,7.6uphp,1.17uhkd"
```

## Start the light client daemon (LCD)

For information about the available Terra REST API endpoints, see the [Swagger documentation](https://lcd.terra.dev/swagger/). To enable the REST API and Swagger, and to start the LCD, complete the following steps:

1. Open `~/.terra/config/app.toml`.

2. Locate the `API Configuration` section (`[api]`).

3. Change `enable = false` to `enable = true`.

   ```toml
   # Enable defines if the API server should be enabled.
   enable = true
   ```

4. Optional: Swagger defines if swagger documentation should automatically be registered. To enable Swagger, change `swagger = false to `swagger = true`.

   ```toml
   swagger = true
   ```

5. Restart the service via `systemctl restart terrad`. Once restarted, the LCD will be available (by default on port `127.0.0.1:1317`)
