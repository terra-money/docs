# Synchronization

::: warning Sync start times

Nodes take at least an hour to start syncing. This wait is normal. Before troubleshooting a sync, please wait an hour for the sync to start.

:::

### Monitoring the sync

Your node is catching up with the network by replaying all the transactions from genesis and recreating the blockchain state locally. You can verify that that's the case by checking the `lates_block_height` in the `SyncInfo` of the `terrad status` response: 

```json
  {
    "SyncInfo": {
        "latest_block_height": "42", <-----
        "catching_up"        : true
    },
  ...
  }
```
Compare this to the **Latest Blocks** on [*stake.id*](https://terra.stake.id/#/)


## Quicksync

You can significantly accelerate the synchronization process by providing `terrad` with a recent "snapshot" of the network state. Snapshots are made publicly available by the Terra community and can be downloaded at  [ https://quicksync.io/networks/terra.html ](https://quicksync.io/networks/terra.html) Choose the snapshot corresponding to your network type ( `testnet`/`mainnet` ) and the mirror close to the location of your node server. 

Make sure that you have the streaming and unpacking utilities installed:

```bash
apt-get install wget liblz4-tool aria2 -y
```

::: tip Tip: Circumvent local download
 Copy the link to the archived file in the `Download` button. And I mean *copy the link* from the `Download` by right-clicking it and selecting the `Copy Link` option provided by your web-browser. *Unless you are hosting your node on the same computer from which you are browsing -- downloading locally is not the way to go*.

The link in your clipboard should resemble: ***https://dl2.quicksync.io/bombay-12-default.20220107.0510.tar.lz4***

:::

The archived snapshot contains the state and transactions of the network, which -- given default config -- are stored in the `~/.terra/data/` folder. It is this folder on your node that the snapshot needs to populate. Therefore you should either navigate exactly to `~/.terra/` folder before proceeding OR otherwise make sure that the contents of the archive are placed into `~/.terra/data/`.  


Download the snapshot. 

```bash
# aria2c is a multi-source command-line download utility
# specify N cores(up to 16) to speed up the process via -xN (5 cores used below)
aria2c -x5 https://dl2.quicksync.io/bombay-12-default.20220107.0510.tar.lz4
```

Unpack the `.lz4` archive:

```bash
lz4 -d bombay-12-default.20220107.0510.tar.lz4
```
Finally, unpack the `.tar` archive into `~/.terra`. Its contents must replace `~/.terra/data/`:

```bash
tar -xvf bombay-12-default.20220107.0510.tar
```





## Verifying the integrity of the snapshot

To verify the validity of the snapshot -- `sha512sum` it against a cosmos validator's registry of transactions.

Compare checksum with its on-chain version.  Given the url to the archive, say ***https://dl2.quicksync.io/bombay-12-default.20220107.0510.tar.lz4***, assign it to a variable for brevity:

```bash
URL=https://dl2.quicksync.io/bombay-12-default.20220107.0510.tar.lz4
```
Obtain the checksum for this particular snapshot:
```bash
wget $URL.checksum
# bombay-12-default.20220 100%[==============================>]  59.55K   215KB/s    in 0.3s    
# 2022-01-08 07:30:06 (215 KB/s) - 'bombay-12-default.20220107.0510.tar.lz4.checksum.1' saved [60984/60984]
```

Obtain its tx hash and assign it to a variable for brevity:

```bash
HASH=$(curl -s $URL.hash)   
# 80E12115FEA1B3A161A2FDE7367FC34B8714EF398DAE5B1396F9748BC6218DB1
```

Obtain this transaction's profile and verify it.

```bash
curl -s https://lcd-cosmos.cosmostation.io/txs/$(curl -s $URL.hash) | jq -r '.tx.value.memo'|sha512sum -c
# bombay-12-default.20220107.0510.tar.lz4.checksum: OK
```

Obtain the checksum script and verify the provided snapshot.
```bash
wget https://raw.githubusercontent.com/chainlayer/quicksync-playbooks/master/roles/quicksync/files/checksum.sh
./checksum.sh $(basename $URL)
```

## Skipahead: testing

Sometimes you may want to sync faster by foregoing checks. This command should only be used by advanced users in non-production environments. To speed up the sync process during testing, use the following command:

```bash
terrad start --x-crisis-skip-assert-invariants
```


## Sync Complete

- Validators can view the status of the network with [Terra Finder](https://finder.terra.money).
- For faster syncs during testing, see [node sync for testing](#node-sync-for-testing)


You can tell that your node is in sync with the network when `SyncInfo.catching_up` in the `terrad status` response returns `false`:
```json
  {
    "SyncInfo": {
        "catching_up": false                         
    },
  ...
  }
  
```


## Congratulations!

Congratulations! You've successfully joined a network as a full node operator. If you are a validator, continue to [manage a Terra validator](/How-to/Manage-a-Terra-validator/Overview.html) for next steps.