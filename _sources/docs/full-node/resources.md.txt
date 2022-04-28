# Full node resources

Use these resources to set up your full node. 

## Full node video tutorial


```{youtube} 2lKAvltKX6w
```

## Full node text tutorial

- [Full node tutorial](./run-a-full-terra-node/README.md)
- [System configuration](./run-a-full-terra-node/system-config.md)
https://docs.terra.money/docs/full-node/run-a-full-terra-node/system-config.html


## FCD genesis snapshot

The following is a full FCD snapshot since Columbus-1:

```
https://columbus-genesis.s3.ap-northeast-1.amazonaws.com/fcd-2021-11-24.dump.gz (155.6GB)
```

### FCD Import instructions

Run the following command to import the FCD genesis snapshot
``` sh
wget -O - 'https://columbus-genesis.s3.ap-northeast-1.amazonaws.com/fcd-2021-11-24.dump.gz' | zcat | sudo -u postgres psql DB_NAME
```

### FCD repos

FCD repo: https://github.com/terra-money/fcd

Hive repo: https://github.com/terra-money/hive-graph