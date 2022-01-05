# Configure LocalTerra

The majority of LocalTerra is implemented through a `docker-compose.yml` file, making it easily customizable. You can use LocalTerra as a starting template point for setting up your own local Terra testnet with Docker containers.

Out of the box, LocalTerra comes preconfigured with opinionated settings such as:

- ports defined for RPC (26657), LCD (1317) and FCD (3060)
- standard [accounts](#accounts)

## Modify node configuration

You can modify the node configuration of your validator in the `config/config.toml` and `config/app.toml` files.

## Speed up block time

LocalTerra is often used alongside a script written with the Terra.js SDK or Terra Python SDK as a convenient way to do integration tests. You can greatly improve the experience by speeding up the block time.

To increase block time, edit the `[consensus]` parameters in the `config/config.toml` file, and specify your own values.

The following example configures all timeouts to `200ms`:

```diff
##### consensus configuration options #####
[consensus]

wal_file = "data/cs.wal/wal"
- timeout_propose = "3s"
- timeout_propose_delta = "500ms"
- timeout_prevote = "1s"
- timeout_prevote_delta = "500ms"
- timeout_precommit_delta = "500ms"
- timeout_commit = "5s"
+ timeout_propose = "200ms"
+ timeout_propose_delta = "200ms"
+ timeout_prevote = "200ms"
+ timeout_prevote_delta = "200ms"
+ timeout_precommit_delta = "200ms"
+ timeout_commit = "200ms"
```

Additionally, you can use the following single line to configure timeouts:

```sh
sed -E -i '/timeout_(propose|prevote|precommit|commit)/s/[0-9]+m?s/200ms/' config/config.toml
```

## Modifying genesis

You can change the `genesis.json` file by altering `config/genesis.json`. To load your changes, restart your LocalTerra.
