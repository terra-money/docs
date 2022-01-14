# Set up oracle feeder

Every Terra validator must participate in the oracle process and periodically submit a vote for the exchange rate of Luna in all [ whitelisted denominations ](../../Reference/Terra-core/Module-specifications/spec-oracle.md#whitelist). Because this process occurs every 30 seconds, validators must set up an automated process to avoid getting slashed and jailed.

## Make a new key for oracle votes

You can separate the keys used for controlling a validator account from those that are submitting oracle votes on behalf of a validator. Run:

```bash
# The oracle-feeder is just another participant in the network and also needs a keypair and address to transact
# <feeder-name> can be anything like "<your-node-moniker>-oracle" or something more elaborate
terrad keys add <feeder-name>  
```
Show the feeder account details:

```bash
terrad keys show <feeder-name>
```
Say, you were to name you oracle keys `test-oracle` in place of *<feeder-name>* above. Then, a new keypair has been added to your `terrad` registry. Take note of the oracle's address because it must be associated with the 

```bash
- name: my-local-validator-node                         # <-------------Validator
  type: local
  address: terra10shtcnuchzhy5s6xaedw2au8j8sn7w6vjm06v5
  pubkey: '{
    "@type":"/cosmos.crypto.secp256k1.PubKey",
    "key":"A4LmsFcsmcOwlTk6EZXrC/WhXKJv52TkYm4yjb3KOdqw"
    }'
  mnemonic: ""

- name: test-oracle                                     # <---------- soon-to-be-Oracle
  type: local
  address: terra1ru2y342y09tzsnzxl7tf9cva9kp33h0jnsm9ss # Take note of the oracle address
  pubkey: '{
      "@type":"/cosmos.crypto.secp256k1.PubKey",
      "key":"A3Z50zDpCUwjYzKG5Ru+DGOFbKjrQVm0sKj8rv/fKtxd"
      }'
  mnemonic: ""
```

## Delegate feeder consent

The account address used to submit oracle's transactions or *votes* is called a `feeder` because it "feeds" the price to the network through the validator node. When you set up your oracle voting process for the first time, you must delegate the feeder permission to an account. 

```bash
terrad tx oracle set-feeder <feeder-address> \  # Oracle addres
    --from=<validator-node-address> \           # Validator node address
    --chain-id=<chain_id>  \                    
    --gas-prices=0.015uluna \
    --gas=auto \
    --gas-adjustment=1.4

```
A [ MsgDelegateFeedConsent ](https://finder.terra.money/testnet/tx/1511898e10c1d7508743bb2a02ca1b81b7f2480da4aeed2b4a4241e153a860bd) will be generated with you as both the delegator and the operator in this case. 


## Send funds to the feeder

The feeder needs funds to pay for transaction fees to submit oracle voting messages. [ *TerraKRW* currency ](../../Reference/Terra-core/Overview.md#currency-denominations), not Luna, are used for oracle voting fees. You can send TerraKRW to your feeder address or send Luna and perform an on-chain swap by running the following command:

```bash
terrad tx bank send <from-address> \  # the provider of funds. on the testnet, the faucet can be used
    <feeder-address> \                # find this with `terrad keys list`
    <luna-amount>uluna \              # ex 1000000uluna should be enough
    --chain-id=<chain_id> \
    --gas-prices=0.015uluna \
    --gas=auto \
    --gas-adjustment=1.4

```
[ Example ](https://finder.terra.money/testnet/tx/ae111233b11ae20e17c767296945af0a413219d6f469ed0ec31397e2041e1554) succesful funding.

Now your feeder account has <luna-amount> more luna, but still no TerraKRW(`ukrw`). It's easy to perform a `uluna`->`ukrw` swap as follows:

```bash
terrad tx market swap <luna-amount>uluna ukrw\ # indicate that you intend to exchange <luna-amount> of luna for ukrw
    --from=<feeder-address> \                  # this adress will be used as the source of luna. 
    --chain-id=<chain_id> \
    --gas-prices=0.015uluna \
    --gas=auto \
    --gas-adjustment=1.4
```
[ Example ](https://finder.terra.money/testnet/tx/7f496696bbbaa9b7b7e501fcf170c014d81bcb7bb3d0898f61da010ffc69eb9d) successful swap.

## Set up oracle feeder program

To start submitting oracle messages with your feeder account, install and set up an oracle feeder.

- Install Terra's Node.js [`oracle-feeder`](https://github.com/terra-money/oracle-feeder) by visiting [Terra's oracle feeder Github repo](https://github.com/terra-money/oracle-feeder).

Validators are encouraged to set up their own oracle feeders.

Some examples of oracle feeder projects include:
- The [`terra_oracle_voter`](https://github.com/b-harvest/terra_oracle_voter) in Python by [B-Harvest](https://bharvest.io/).
- The [`terra-oracle`](https://github.com/node-a-team/terra-oracle) in Go by [Node A-Team](https://nodeateam.com/).
