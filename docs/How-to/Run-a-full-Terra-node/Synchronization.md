# Before Sync

Certain files will need to be absent or deleted prior to download. . A quicksync replaces blockchain data with a customized snapshot. For most use cases a "pruned" version is adequate. Pruned  versions will have certain transactions removed from the archive to make node performace smoother. If you are running a node for archival purposes, you will want an "archive" or "default" download. 

After choosing  the approprite download type, examine your node and ensure  that `.terra/data` is empty

 **Example**:
```bash
6:22PM INF Removed all blockchain history dir=/home/ubuntu/.terra/data
```

:::  warning
If you are a validator, ensure that you do not remove your private key.

Example of a removed private key:

```bash
6:22PM INF Reset private validator file to genesis state keyFile=/home/ubuntu/.terra/config/priv_validator_key.json stateFile=/home/ubuntu/.terra/data/priv_validator_state.json
```
:::

If you have an address book downloaded, you may keep it. Otherwise, you will need to download the [appropriate addressbook](https://docs.terra.money/How-to/Run-a-full-Terra-node/Joining-a-network.html#_2-download-genesis-file-and-address-book) prior to running   `terrad start`. 
