# Register your Terra validator

This is a detailed step-by-step guide for setting up a Terra validator. Please be aware that while it is easy to set up a rudimentary validating node, running a production-quality validator node with a robust architecture and security features requires an extensive setup.


## Prerequisites

- You have completed [how to run a full Terra node](https://docs.terra.money/How-to/Run-a-full-Terra-node/Hardware-requirements.html), which outlines how to install, connect, and configure a node.
- You are familiar with [terrad](../../Reference/terrad/).
- you have read through [the validator FAQ](./faq.md)
- Hardware requirements: see [requirements for running a full node](../Run-a-full-Terra-node/Hardware-requirements.md).

## 1. Retrieve the consensus PubKey of your node

The consensus PubKey of your node is required to create a new validator. Run:

```bash
terrad tendermint show-validator
```

:::details This is what healthy response looks like.
```json
    {
    "@type":"/cosmos.crypto.ed25519.PubKey",               // <--- Tendermint encryption 
    "key":"7cZq+Fp9xU8mZ9EXAMPLEX0UicEXAMPLE/4krCn8Hs="    // <--- Cosmos validator key
    }
```
:::


## 2. Create a new validator

:::tip Get tokens
In order for `terrad` to recognize a wallet address it must contain tokens. For the testnet, use [the faucet](https://faucet.terra.money/) to send Luna to your wallet. ( You can find out your address via `terrad keys list`. ) If you are on mainnet, send funds from an existing wallet. 1-3 Luna are sufficient for most setup processes.
:::

Not every full node need be a validator, but every validator is associated with a full node and an oracle instance.To initialize a node to be a validator via [ self-delegation ](../../Concepts/glossary.md#self-delegation) run the following commands.

```bash
terrad tx staking create-validator \
    --amount=5000000uluna \                          # delegate an amount from <ADDRESS> wallet 
    --pubkey=$(terrad tendermint show-validator) \   # Nominate this pubkey to be the validator
    --moniker=<your-moniker> \                       # this is set in ~/.terra/config/config.toml
    --chain-id=<chain_id> \                          
    --from=<ADDRESS> \                               # you can find yours via `terrad keys list` as `address`
    --commission-rate=0.10 \
    --commission-max-rate=0.20 \
    --commission-max-change-rate=0.01 \
    --min-self-delegation=1 \
    --gas-prices=0.015uluna \
    --gas=auto \
    --gas-adjustment=1.4
```


::: warning Warning:
When you specify commission parameters, the `commission-max-change-rate` is measured as a percentage-point change of the `commission-rate`. For example, a change from 1% to 2% is a 100% rate increase, but the `commission-max-change-rate` is measured as 1%.
:::

## 3. Confirm your validator is active

If running the following command returns something, the validator is active.

```bash
terrad query tendermint-validator-set |  grep $(terrad tendermint show-validator | jq  '.key' | tr -d '"' ) -A 1 -B 4                  
```
If the initialization above succeed, you should see an output similar to this:

```bash
# The address of the new validator.
# Validators are assigned their own address which begins with terraval 
- address: terravalcons198jccgdkvy3z0jwfhk0x6nve39lqxftj54clez   
  # Your priority in proposing a new block. 
  # This is low becase there is barely anything at stake  (5 Luna is a very small amount)
  proposer_priority: "-3675519"     
  pub_key:
    type: tendermint/PubKeyEd25519
    # This is the tendermint pubkey of the associated node that you provided above.
    value: 7cZq+Fp9xU8mZ9xR7q4NpDOX0UicmPC68P/4krCn8Hs=       
  # This is the initial 5000000uluna you provided via the --amount flag
  voting_power: "5" 
```

You are able to inspect other validators on the given network via `terrad query tendermint-validator-set`.
:::details 



:::warning
The pubkey associated with your validator as well as the corresponding private key and the validator's address can always be found in the `~/.terra/config/priv_validator.json` file. Never share this file.
:::

