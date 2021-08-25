# Troubleshooting

These are some common problems that you may run into when running a validator node.

## Validator has 0 voting power

If this occurs, your validator has become auto-unbonded. On the Mainnet, validators unbond if they do not vote on `9500` of the last `10000` blocks (`50` of the last `100` blocks on the testnet). Since blocks are proposed every ~5 seconds, a validator that is unresponsive for ~13 hours (~4 minutes in testnet) will become unbonded. This usually happens when your `terrad` process crashes.

Here's how you can return the voting power back to your validator:

1. If `terrad` is not running, start it up again:

  ```bash
  terrad start
  ```

1. Wait for your full node to catch up to the latest block and run the following command:  

  ```bash
  terrad tx slashing unjail <terra> --chain-id=<chain_id> --from=<from>
  ```

  `<terra>` is the address of your validator account, and `<name>` is the name of the validator account. You can find this info by running `terrad keys list`.

  ::: warning
  If you don't wait for `terrad` to sync before running `unjail`, you will receive an error message telling you your validator is still jailed.
  :::

1.  Check your validator again to see if your voting power is back:

  ```bash
  terrad status
  ```

You may notice that your voting power is less than it used to be. That's because you got slashed for downtime!

## Terrad crashes from "too many open files"

The default number of files Linux can open (per-process) is `1024`. `terrad` is known to open more than this amount, causing the process to crash. You can fix this by doing the following:

1. Increase the number of open files allowed by running `ulimit -n 4096`.  

2.  Restart the process with `terrad start`.

  If you are using `systemd` or another process manager to launch `terrad`, you may need to configure them. A sample `systemd` file used to fix this issue is below:

  ```systemd
  # /etc/systemd/system/terrad.service
  [Unit]
  Description=Terra Columbus Node
  After=network.target

  [Service]
  Type=simple
  User=ubuntu
  WorkingDirectory=/home/ubuntu
  ExecStart=/home/ubuntu/go/bin/terrad start
  Restart=on-failure
  RestartSec=3
  LimitNOFILE=4096

  [Install]
  WantedBy=multi-user.target
  ```

## Oracle voting error

You may receive an error message by the [Terra Oracle feeder](https://github.com/terra-money/oracle-feeder):

    broadcast error: code: 3, raw_log: validator does not exist: terravaloperxxx

This message can occur for the following reasons:

### 1. The validator is not active

There are a few reasons why a validator is not active:

- The validator is jailed. To solve this, `unjail` the validator:

    terrad tx slashing unjail <terra> --chain-id=<chain_id> --from=<from>

- The validator is not in the active [validator set](https://docs.terra.money/validators.html#delegations). Only the top 130 validators are in this set. The only solution for this is to increase your total stake to be included in the top 130.

### 2. Wrong network

The Oracle Feeder may be submitting to the wrong network. This is common. The command to run the feeder needs to specify the lite client daemon (LCD):

```bash
nom start vote --\
  --source http://localhost:8532/latest \
  --lcd ${LCD} \
  --chain-id "${CHAIN_ID}" \
  --validator "${VALIDATOR_KEY}" \
  --password "${PASSWORD}” \
```  

The LCD the voter is connecting to may be running from a different network than your node. The remote LCD for different networks are:

- https://lcd.terra.dev for the Columbus Mainnet.
- https://tequila-lcd.terra.dev for the Tequila Testnet.
- https://bombay-lcd.terra.dev for the Bombay Testnet.

Be sure to specify the LCD for the same network your node is connecting to.

If you run a [local LCD](https://docs.terra.money/terrad/lcd.html) (for example localhost:1317), be sure that your LCD is connecting to the same node.
