# Troubleshooting

Here are some common problems that you may run into when running a validator node.

## Validator has 0 voting power

Your validator has become auto-unbonded. In mainnet, we unbond validators if they do not vote on `9500` of the last `10000` blocks (`50` of the last `100` blocks in testnet). Since blocks are proposed every ~5 seconds, a validator unresponsive for ~13 hours (~4 minutes in testnet) will become unbonded. This usually happens when your `terrad` process crashes.

Here's how you can return the voting power back to your validator. First, if `terrad` is not running, start it up again:

```bash
terrad start
```

Wait for your full node to catch up to the latest block. Next, run the following command. Note that `<terra>` is the address of your validator account, and `<name>` is the name of the validator account. You can find this info by running `terrad keys list`.

```bash
terrad tx slashing unjail <terra> --chain-id=<chain_id> --from=<from>
```

::: warning
If you don't wait for `terrad` to sync before running `unjail`, you will receive an error message telling you your validator is still jailed.
:::

Lastly, check your validator again to see if your voting power is back.

```bash
terrad status
```

You may notice that your voting power is less than it used to be. That's because you got slashed for downtime!

## terrad crashes from "too many open files"

The default number of files Linux can open (per-process) is `1024`. `terrad` is known to open more than `1024` files. This causes the process to crash. A quick fix is to run `ulimit -n 4096` (increase the number of open files allowed) and then restart the process with `terrad start`. If you are using `systemd` or another process manager to launch `terrad` this may require some configuration at that level. A sample `systemd` file to fix this issue is below:

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

Error message encountered by the [Terra Oracle feeder](https://github.com/terra-money/oracle-feeder):

    broadcast error: code: 3, raw_log: validator does not exist: terravaloperxxx

This message can occur for a variety of reasons.

### 1. The validator is not active

There are a few reasons why a validator is not active.

For one, it could be jailed. The resolution is unjail the validator.

    terrad tx slashing unjail <terra> --chain-id=<chain_id> --from=<from>

Another reason that the validator is inactive could be due to the validator not being in the active validator set. At the moment of writing the [maximum number of validators is 130](https://docs.terra.money/validators.html#delegations). If the number of validators is more than 130, only the top 130 will be active in order of voting power.

To get to the list of the top 130, the resolution is to increase the voting power to the top 130.

### 2. Wrong network

More often than not though, the Oracle Feeder may be submitting to the wrong network. The command to run the feeder needs to specify the lite client daemon (LCD):

```bash
nom start vote --\
  --source http://localhost:8532/latest \
  --lcd ${LCD} \
  --chain-id "${CHAIN_ID}" \
  --validator "${VALIDATOR_KEY}" \
  --password "${PASSWORD}” \
```

The LCD that the voter is connecting to may be running for a different network from your node. The remote LCD for the different networks are:

- https://lcd.terra.dev for columbus mainnet
- https://tequila-lcd.terra.dev for tequila testnet
- https://bombay-lcd.terra.dev for bombay testnet

Be sure to specify the LCD for the same network that your node is connecting to.

If you run a [local LCD](https://docs.terra.money/terrad/lcd.html) (i.e. localhost:1317), be sure that your LCD is connecting to the same node.