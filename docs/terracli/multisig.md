# Multisig

A **multisig account** is a Terra account with a special key that can require more than one signatures to sign transactions. This can be useful for increasing the security of the account or for requiring the consent of multiple parties to make transactions. Multisig accounts can be created by specifying:

- threshold number of signatures required
- the public keys involved in signing

To sign with a multisig account, the transaction must be signed individually by the different keys specified for the account. Then, the signatures will be combined into a multisignature which can be used to sign the transaction. If fewer than the threshold number of signatures needed are present, the resultant multisignature is considered invalid.

## Generate a Multisig key

```bash
terracli keys add --multisig=name1,name2,name3[...] --multisig-threshold=K new_key_name
```

`K` is the minimum number of private keys that must have signed the transactions that carry the public key's address as signer.

The `--multisig` flag must contain the name of public keys that will be combined into a public key that will be generated and stored as `new_key_name` in the local database. All names supplied through `--multisig` must already exist in the local database.

Unless the flag `--nosort` is set, the order in which the keys are supplied on the command line does not matter, i.e. the following commands generate two identical keys:

```bash
terracli keys add --multisig=p1,p2,p3 --multisig-threshold=2 multisig_address
terracli keys add --multisig=p2,p3,p1 --multisig-threshold=2 multisig_address
```

Multisig addresses can also be generated on-the-fly and printed through the which command:

```bash
terracli keys show --multisig-threshold=K name1 name2 name3 [...]
```

## Signing a transaction

::: warning NOTE
This example uses `test1`, `test2`, `test3` keys from [LocalTerra](https://github.com/terra-money/LocalTerra). Import them into your `terracli` keystore to follow along.
:::

### Step 1: Create the multisig key

Let's assume that you have `test1` and `test2` want to make a multisig account with `test3`.

First import the public keys of `test3` into your keyring.

```sh
terracli keys add \
    test3 \
    --pubkey=terrapub1addwnpepqgcxazmq6wgt2j4rdfumsfwla0zfk8e5sws3p3zg5dkm9007hmfysxas0u2
```

Generate the multisig key with 2/3 threshold.

```sh
terracli keys add \
    multi \
    --multisig=test1,test2,test3 \
    --multisig-threshold=2
```

You can see its address and details:

```sh
terracli keys show multi

- name: multi
  type: multi
  address: terra1e0fx0q9meawrcq7fmma9x60gk35lpr4xk3884m
  pubkey: terrapub1ytql0csgqgfzd666axrjzq3mxw59ys6yqcd3ydjvhgs0uzs6kdk5fp4t73gmkl8t6y02yfq7tvfzd666axrjzq3sd69kp5usk492x6nehqjal67ynv0nfqapzrzy3gmdk27la0kjfqfzd666axrjzq6utqt639ka2j3xkncgk65dup06t297ccljmxhvhu3rmk92u3afjuyz9dg9
  mnemonic: ""
  threshold: 0
  pubkeys: []
```

Let's add 10 LUNA to the multisig wallet:

```bash
terracli tx send \
    test1 \
    terra1e0fx0q9meawrcq7fmma9x60gk35lpr4xk3884m \
    10000000uluna \
    --chain-id=localterra \
    --gas=auto \
    --fees=100000uluna \
    --broadcast-mode=block
```

### Step 2: Create the multisig transaction

We want to send 5 LUNA from our multisig account to `terra1fmcjjt6yc9wqup2r06urnrd928jhrde6gcld6n`.

```bash
terracli tx send \
    terra1e0fx0q9meawrcq7fmma9x60gk35lpr4xk3884m \
    terra1fmcjjt6yc9wqup2r06urnrd928jhrde6gcld6n \
    5000000uluna \
    --gas=200000 \
    --fees=100000uluna \
    --chain-id=localterra \
    --generate-only > unsignedTx.json
```

The file `unsignedTx.json` contains the unsigned transaction encoded in JSON.

```json
{
  "type": "core/StdTx",
  "value": {
    "msg": [
      {
        "type": "bank/MsgSend",
        "value": {
          "from_address": "terra1e0fx0q9meawrcq7fmma9x60gk35lpr4xk3884m",
          "to_address": "terra1fmcjjt6yc9wqup2r06urnrd928jhrde6gcld6n",
          "amount": [{ "denom": "uluna", "amount": "5000000" }]
        }
      }
    ],
    "fee": {
      "amount": [{ "denom": "uluna", "amount": "100000" }],
      "gas": "200000"
    },
    "signatures": null,
    "memo": ""
  }
}
```

### Step 3: Sign individually

Sign with `test1` and `test2` and create individual signatures.

```sh
terracli tx sign \
    unsignedTx.json \
    --multisig=terra1e0fx0q9meawrcq7fmma9x60gk35lpr4xk3884m \
    --from=test1 \
    --output-document=test1sig.json \
    --chain-id=localterra
```

```sh
terracli tx sign \
    unsignedTx.json \
    --multisig=terra1e0fx0q9meawrcq7fmma9x60gk35lpr4xk3884m \
    --from=test2 \
    --output-document=test2sig.json \
    --chain-id=localterra
```

### Step 4: Create multisignature

Combine signatures to sign transaction.

```sh
terracli tx multisign \
    unsignedTx.json \
    multi \
    test1sig.json test2sig.json \
    --output-document=signedTx.json \
    --chain-id=localterra
```

The TX is now signed:

```json
{
  "type": "core/StdTx",
  "value": {
    "msg": [
      {
        "type": "bank/MsgSend",
        "value": {
          "from_address": "terra1e0fx0q9meawrcq7fmma9x60gk35lpr4xk3884m",
          "to_address": "terra1fmcjjt6yc9wqup2r06urnrd928jhrde6gcld6n",
          "amount": [{ "denom": "uluna", "amount": "5000000" }]
        }
      }
    ],
    "fee": {
      "amount": [{ "denom": "uluna", "amount": "100000" }],
      "gas": "200000"
    },
    "signatures": [
      {
        "pub_key": {
          "type": "tendermint/PubKeyMultisigThreshold",
          "value": {
            "threshold": "2",
            "pubkeys": [
              {
                "type": "tendermint/PubKeySecp256k1",
                "value": "AjszqFJDRAYbEjZMuiD+ChqzbUSGq/RRu3zr0R6iJB5b"
              },
              {
                "type": "tendermint/PubKeySecp256k1",
                "value": "AjBui2DTkLVKo2p5uCXf68SbHzSDoRDESKNtsr3+vtJI"
              },
              {
                "type": "tendermint/PubKeySecp256k1",
                "value": "A1xYF6iW3VSia08ItqjeBfpai+xj8tmuy/Ij3YquR6mX"
              }
            ]
          }
        },
        "signature": "CgUIAxIBoBJA6oiaOabR1jBIbDyFj/1sYjMbYNxe+BSTnp0XYM+frC8fHxXStJ+Tl5Hf+3BsyBg1wvX1pDFsTHI7nMKNlJkKfRJAAt2cOJuViJvtwVRGwhNDORmekDSbcodnyMHTwz2Ve4db7B9m/CjYZmJtilV7zk8RWVX6Agjrl/0K5PSQZv29/A=="
      }
    ],
    "memo": ""
  }
}
```

### Step 5: Broadcast transaction

```sh
terracli tx broadcast signedTx.json \
    --chain-id=localterra \
    --broadcast-mode=block
```
