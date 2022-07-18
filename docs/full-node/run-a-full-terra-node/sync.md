# Sync

## Before Sync

Certain files will need to be absent or deleted prior to download. A quicksync replaces blockchain data with a custom snapshot. For most use cases a "pruned" version is adequate. Pruned versions will have certain transactions removed from the archive to improve node performance. If you are running a node for archival purposes, you will want an `archive` or `default` download.

After choosing the appropriate download type, examine your node and ensure that `.terra/data` is empty.

**Example**:

```bash
6:22PM INF Removed all blockchain history dir=/home/ubuntu/.terra/data
```

::: {warning}
If you are a validator, ensure that you do not remove your private key.

Example of a removed private key:

```bash
6:22PM INF Reset private validator file to genesis state keyFile=/home/ubuntu/.terra/config/priv_validator_key.json stateFile=/home/ubuntu/.terra/data/priv_validator_state.json
```

:::

If you have an address book downloaded, you may keep it. Otherwise, you will need to download the [appropriate addressbook](join-a-network.md#join-a-public-network) prior to running `terrad start`.

## During Sync

After [Joining a public network](join-a-network.md#join-a-public-network), your node will begin to sync.

::: {admonition} Sync start times
:class: caution

Nodes take at least an hour to start syncing. This wait time is normal. Before troubleshooting a sync, please wait an hour for the sync to start.
:::

## Monitor the sync

Your node is catching up with the network by replaying all the transactions from genesis and recreating the blockchain state locally. You can verify this process by checking the `latest_block_height` in the `SyncInfo` of the `terrad status` response:

```json
  {
    "SyncInfo": {
        "latest_block_height": "42", <-----
        "catching_up"        : true
    },
  ...
  }
```

Compare this height to the **Latest Blocks** by checking the API for latest block heights on [Phoenix](https://phoenix-lcd.terra.dev/blocks/latest), or [Pisco](https://pisco-lcd.terra.dev/blocks/latest) to see your progress.

## State Sync

You can significantly accelerate the synchronization process by providing `terrad` with a recent snapshot of the network state. Snapshots are made publicly available by members of the Terra community one example can be downloaded from [Polkachu - Phoenix Mainnet](https://polkachu.com/state_sync/terra). [Polkachu - Pisco Testnet](https://polkachu.com/testnets/terraInstructions) are provided by Polkachu, and not maintained as part of this documentation.

## Sync Complete

You can tell that your node is in sync with the network when `SyncInfo.catching_up` in the `terrad status` response returns `false` and the `latest_block_height` corresponds to the public network blockheight found on the API for either [Phoenix](https://phoenix-lcd.terra.dev/blocks/latest), or [Pisco](https://pisco-lcd.terra.dev/blocks/latest).

```bash
terrad status
```

**Example**:

```json
  {
    "SyncInfo": {
        "latest_block_height": "7356350",
        "catching_up"        : false
    },
  ...
  }
```

Validators can view the status of the network using [Terra Finder](https://finder.terra.money).

## Sync faster during testing

Sometimes you may want to sync faster by foregoing checks. This command should only be used by advanced users in non-production environments. To speed up the sync process during testing, use the following command:

```bash
terrad start --x-crisis-skip-assert-invariants
```

## Congratulations!

You've successfully joined a network as a full node operator. If you are a validator, continue to [manage a Terra validator](../manage-a-terra-validator/README.md) for the next steps.
