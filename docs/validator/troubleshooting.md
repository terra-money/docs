# Troubleshooting

Here are some common problems that you may run into when running a validator node.

## Validator has 0 voting power

Your validator has become auto-unbonded. In mainnet, we unbond validators if they do not vote on `9500` of the last `10000` blocks (`50` of the last `100` blocks in testnet). Since blocks are proposed every ~5 seconds, a validator unresponsive for ~13 hours (~4 minutes in testnet) will become unbonded. This usually happens when your `terrad` process crashes.

Here's how you can return the voting power back to your validator. First, if `terrad` is not running, start it up again:

```bash
terrad start
```

Wait for your full node to catch up to the latest block. Next, run the following command. Note that `<terra>` is the address of your validator account, and `<name>` is the name of the validator account. You can find this info by running `terracli keys list`.

```bash
terracli tx slashing unjail <terra> --chain-id=<chain_id> --from=<from>
```

::: warning
If you don't wait for `terrad` to sync before running `unjail`, you will receive an error message telling you your validator is still jailed.
:::

Lastly, check your validator again to see if your voting power is back.

```bash
terracli status
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
