# Troubleshoot validator problems

Here are some common problems you might encounter when you run a validator node and their solutions.

## Validator has 0 voting power

If your validator has 0 voting power, your validator has become auto-unbonded. On the mainnet, validators unbond when they do not vote on `9500` of the last `10000` blocks (`50` of the last `100` blocks on the testnet). Because blocks are proposed every ~5 seconds, a validator that is unresponsive for ~13 hours (~4 minutes on testnet) become unbonded. This problem usually happens when your `terrad` process crashes.

To return the voting power back to your validator:

1. If `terrad` is not running, restart it:

  ```bash
  terrad start
  ```

1. Wait for your full node to reach the latest block, and run:

  ```bash
  terrad tx slashing unjail <terra> --chain-id=<chain_id> --from=<from>
  ```

where


- `<terra>` is the address of your validator account.
- `<name>` is the name of the validator account. To find this information, run `terrad keys list`.

  ::: warning
  If you don't wait for `terrad` to sync before running `unjail`, an error message will inform you that your validator is still jailed.
  :::

1.  Check your validator again to see if your voting power is back:

  ```bash
  terrad status
  ```

If your voting power is less than it was previously, it's less because you were slashed for downtime.

## Terrad crashes because of too many open files

The default number of files Linux can open per process is `1024`. `terrad` is known to open more than this amount, causing the process to crash. To fix this problem:

1. Increase the number of open files allowed by running `ulimit -n 4096`.  

2. Restart the process with `terrad start`.

  If you are using `systemd` or another process manager to launch `terrad`, you might need to configure them. The following  sample `systemd` file fixes the problem:

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

You might receive the following error message by the [Terra Oracle feeder](https://github.com/terra-money/oracle-feeder):

    `broadcast error: code: 3, raw_log: validator does not exist: terravaloperxxx`

This message occurs for the following reasons:

### The validator is not active

The validator might not be active for one of the following reasons:

- The validator is jailed. To solve this problem, `unjail` the validator by running:

    `terrad tx slashing unjail <terra> --chain-id=<chain_id> --from=<from>`

- The validator is not in the active [validator set](https://docs.terra.money/validators.html#delegations). Only the top 130 validators are in this set. To fix this problem, increase your total stake so that it is included in the top 130.

### The network is wrong.

The oracle feeder might be submitting to the wrong network. To fix this problem, run the feeder with the lite client daemon (LCD) specified:

```bash
nom start vote --\
  --source http://localhost:8532/latest \
  --lcd ${LCD} \
  --chain-id "${CHAIN_ID}" \
  --validator "${VALIDATOR_KEY}" \
  --password "${PASSWORD}" \
```

The LCD to which the voter is connecting might be running from a different network than your node. The remote LCD for different networks are:

- https://lcd.terra.dev for the Columbus mainnet
- https://bombay-lcd.terra.dev for the Bombay testnet

Ensure you specify the LCD for the same network to which your node is connecting.

If you run a [local LCD](https://docs.terra.money/terrad/lcd.html) (for example, localhost:1317), ensure your LCD is connecting to the same node.
