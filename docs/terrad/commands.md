# Commands

This section describes the commands available from `terrad`, the command line interface that connects a running `terrad` process.

## `add-genesis-account`

Adds a genesis account to `genesis.json`.

**Syntax**
```bash
terrad add-genesis-account <address-or-key-name> '<amount><coin-denominator>,<amount><coin-denominator>'
```

**Example**
```bash
terrad add-genesis-account acc1 '200000000uluna,550000ukrw'
```

## `collect-gentxs`

Collects genesis transactions and outputs them to `genesis.json`.

**Syntax**
```bash
terrad collect-gentxs
```

## `debug`

Helps debug the application. For a list of syntax and subcommands, see the [debug subcommands](subcommands.md#debug-addr).

## `export`

Exports the state to JSON.

**Syntax**
```bash
terrad export
```

## `gentx`

Adds a genesis transaction to `genesis.json`.

**Syntax**
```bash
terrad gentx <key-name> <amount><coin-denominator>
```

**Example**
```bash
terrad gentx myKey 1000000uluna --home=/path/to/home/dir --keyring-backend=os --chain-id=test-chain-1 \
    --moniker="myValidator" \
    --commission-max-change-rate=0.01 \
    --commission-max-rate=1.0 \
    --commission-rate=0.07 \
    --details="..." \
    --security-contact="..." \
    --website="..."
```

## `help`

Shows help information.

**Syntax**
```bash
terrad help
```

## `init`

Initializes the configuration files for a validator and a node.

**Syntax**
```bash
terrad init <moniker>
```

**Example**
```bash
terrad init myNode
```

## `keys`

Manages Keyring commands. For a list of syntax and subcommands, see the [keys subcommands](subcommands.md#keys-add).


## `migrate`
Migrates the source genesis into the target version and prints to STDOUT.

**Syntax**
```bash
terrad migrate <path-to-genesis-file>
```

**Example**
```bash
terrad migrate /genesis.json --chain-id=testnet --genesis-time=2020-04-19T17:00:00Z --initial-height=4000
```

## `query`

Manages queries. For a list of syntax and subcommands, see the [query subcommands](subcommands.md#query-account).

## `rosetta`

Creates a Rosetta server.

**Syntax**
```bash
terrad rosetta
```

## `start`

Runs the full node application with Tendermint in or out of process. By default, the application runs with Tendermint in process.

**Syntax**
```bash
terrad start
```

## `status`

Displays the status of a remote node.

**Syntax**
```bash
terrad status
```

## `tendermint`

Manages the Tendermint protocol. For a list of subcommands, see []()

## `testnet`

Creates a testnet with the specified number of directories and populates each directory with the necessary files.

**Syntax**
```bash
terrad testnet
```

**Example**
```bash
terrad testnet --v 6 --output-dir ./output --starting-ip-address 192.168.10.2
```

## `tx`

Retrieves a transaction by its hash, account sequence, or signature. For a list of full syntax and subcommands, see the [tx subcommands](subcommands.md#tx-authz-exec).

**Syntax to query by hash**
```bash
terrad query tx <hash>
```

**Syntax to query by account sequence**
```bash
terrad query tx --type=acc_seq <address>:<sequence>
```

**Syntax to query by signature**
```bash
terrad query tx --type=signature <sig1_base64,sig2_base64...>
```

For a list of subcommands, see []()

## `txs`

Retrieves transactions that match the specified events where results are paginated.

**Syntax**
```
terrad query txs --events '<event>' --page <page-number> --limit <number-of-results>
```

**Example**
```
terrad query txs --events 'message.sender=cosmos1...&message.action=withdraw_delegator_reward' --page 1 --limit 30
```

## `unsafe-reset-all`

Resets the blockchain database, removes address book files, and resets `data/priv_validator_state.json` to the genesis state.

**Syntax**
```bash
terrad unsafe-reset-all
```

## `validate-genesis`

Validates the genesis file at the default location or at the location specified.

**Syntax**
```bash
terrad validate-genesis </path-to-file>
```

**Example**
```bash
terrad validate-genesis </genesis.json>
```

## `version`

Returns the version of Terra you're running.

**Syntax**
```bash
terrad version
```
