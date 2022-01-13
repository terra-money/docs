# Set up an oracle feeder

Every Terra validator must participate in the oracle process and periodically submit a vote for the exchange rate of Luna in all whitelisted denominations. Because this process occurs every 30 seconds, validators must set up an automated process to avoid getting slashed and jailed.

## Make a new key for oracle votes

You can separate the keys used for controlling a validator account from those that are submitting oracle votes on behalf of a validator. Run:

```bash
terrad keys add <feeder>
```

Show the feeder account details:

```bash
terrad keys show <feeder>
```

## Delegate feeder consent

The account address used to submit oracle voting transactions is called a `feeder`. When you set up your oracle voting process for the first time, you must delegate the feeder permission to an account. 

```bash
terrad tx oracle set-feeder <feeder-address> --from=<validator> --chain-id=<chain_id>     
    --gas-prices=0.015uluna \
    --gas=auto \
    --gas-adjustment=1.4

```
A [ MsgDelegateFeedConsent ](https://finder.terra.money/testnet/tx/1511898e10c1d7508743bb2a02ca1b81b7f2480da4aeed2b4a4241e153a860bd) will be generated with you as both the delegator and the operator in this case.


## Send funds to the feeder

The feeder needs funds to pay for transaction fees to submit oracle voting messages. TerraKRW, not Luna, are used for oracle voting fees because the smallest atomic unit of TerraKRW is much cheaper than Luna. You can send TerraKRW to your feeder address or send Luna and perform an on-chain swap by running the following command:

```bash
terrad tx send <from-address> <feeder-address> <luna-amount>uluna  # ex 1000000uluna should be enough
    --chain-id=<chain_id> \
    --gas-prices=0.015uluna \
    --gas=auto \
    --gas-adjustment=1.4

```
[ Example ](https://finder.terra.money/testnet/tx/ae111233b11ae20e17c767296945af0a413219d6f469ed0ec31397e2041e1554)


Now your feeder account has <luna-amount> more luna, but still now `ukrw`. It's easy to perform a `uluna`->`ukrw` swap as follows :

```bash
terrad tx market swap <luna-amount>uluna ukrw --from=<feeder>    --chain-id=<chain_id> \
    --gas-prices=0.015uluna \
    --gas=auto \
    --gas-adjustment=1.4
```
[ Example ](https://finder.terra.money/testnet/tx/7f496696bbbaa9b7b7e501fcf170c014d81bcb7bb3d0898f61da010ffc69eb9d)

## Set up oracle feeder program

To start submitting oracle messages with your feeder account, install and set up an oracle feeder.

- Install Terra's Node.js [`oracle-feeder`](https://github.com/terra-money/oracle-feeder) by visiting [Terra's oracle feeder Github repo](https://github.com/terra-money/oracle-feeder).

Validators are encouraged to set up their own oracle feeders.

Some examples of oracle feeder projects include:
- The [`terra_oracle_voter`](https://github.com/b-harvest/terra_oracle_voter) in Python by [B-Harvest](https://bharvest.io/).
- The [`terra-oracle`](https://github.com/node-a-team/terra-oracle) in Go by [Node A-Team](https://nodeateam.com/).
