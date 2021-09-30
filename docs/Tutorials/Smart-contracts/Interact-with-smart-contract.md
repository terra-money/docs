# Interacting with the Contract

::: warning NOTE

You can also follow these steps in the official desktop wallet for Terra, [Terra Station](https://station.terra.money).

:::

## Requirements

Make sure you have set up **LocalTerra** and that it is up and running:

```sh
cd localterra
docker-compose up
```

You should also have the latest version of `terrad` by building the latest version of Terra Core. We will configure it to use it against our isolated testnet environment.

In a separate terminal, make sure to set up the following mnemonic:

```sh
terrad keys add test1 --recover
```

Using the mnemonic:

```
satisfy adjust timber high purchase tuition stool faith fine install that you unaware feed domain license impose boss human eager hat rent enjoy dawn
```

## Uploading Code

Make sure that the **optimized build** of `my_first_contract.wasm` that you created in the last section is in your current working directory.

```sh
terrad tx wasm store my_first_contract.wasm --from test1 --chain-id=localterra --gas=auto --fees=100000uluna --broadcast-mode=block
```

You should see output similar to the following:

```sh
height: 6
txhash: 83BB9C6FDBA1D2291E068D5CF7DDF7E0BE459C6AF547EC82652C52507CED8A9F
codespace: ""
code: 0
data: ""
rawlog: '[{"msg_index":0,"log":"","events":[{"type":"message","attributes":[{"key":"action","value":"store_code"},{"key":"module","value":"wasm"}]},{"type":"store_code","attributes":[{"key":"sender","value":"terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8"},{"key":"code_id","value":"1"}]}]}]'
logs:
- msgindex: 0
  log: ""
  events:
  - type: message
    attributes:
    - key: action
      value: store_code
    - key: module
      value: wasm
  - type: store_code
    attributes:
    - key: sender
      value: terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8
    - key: code_id
      value: "1"
info: ""
gaswanted: 681907
gasused: 680262
tx: null
timestamp: ""
```

As you can see, our contract was successfully instantiated with Code ID #1.

You can check it out:

```sh
terrad query wasm code 1
codeid: 1
codehash: KVR4SWuieLxuZaStlvFoUY9YXlcLLMTHYVpkubdjHEI=
creator: terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8
```

## Creating the Contract

We have now uploaded the code for our contract, but we still don't have a contract. Let's create it, with the following InitMsg:

```json
{
  "count": 0
}
```

We will compress the JSON into 1 line with [this online tool](https://goonlinetools.com/json-minifier/).

```sh
terrad tx wasm instantiate 1 '{"count":0}' --from test1 --chain-id=localterra --fees=10000uluna --gas=auto --broadcast-mode=block
```

You should get a response like the following:

```sh
height: 41
txhash: AEF6F2FA570029A5D4C0DA5ACFA4A2B614D5811E29EEE10FF59F821AFECCD399
codespace: ""
code: 0
data: ""
rawlog: '[{"msg_index":0,"log":"","events":[{"type":"instantiate_contract","attributes":[{"key":"owner","value":"terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8"},{"key":"code_id","value":"1"},{"key":"contract_address","value":"terra18vd8fpwxzck93qlwghaj6arh4p7c5n896xzem5"}]},{"type":"message","attributes":[{"key":"action","value":"instantiate_contract"},{"key":"module","value":"wasm"}]}]}]'
logs:
- msgindex: 0
  log: ""
  events:
  - type: instantiate_contract
    attributes:
    - key: owner
      value: terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8
    - key: code_id
      value: "1"
    - key: contract_address
      value: terra18vd8fpwxzck93qlwghaj6arh4p7c5n896xzem5
  - type: message
    attributes:
    - key: action
      value: instantiate_contract
    - key: module
      value: wasm
info: ""
gaswanted: 120751
gasused: 120170
tx: null
timestamp: ""
```

From the output, we see that our contract was created above at: `terra18vd8fpwxzck93qlwghaj6arh4p7c5n896xzem5`. Take note of this contract address, as we will need it for the next section.

Check out your contract information:

```sh
terrad query wasm contract terra18vd8fpwxzck93qlwghaj6arh4p7c5n896xzem5
address: terra18vd8fpwxzck93qlwghaj6arh4p7c5n896xzem5
owner: terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8
codeid: 1
initmsg: eyJjb3VudCI6MH0=
migratable: false
```

By decoding the Base64 InitMsg:

```json
{ "count": 0 }
```

## Executing the Contract

Let's do the following:

1. Reset count to 5
2. Increment twice

If done properly, we should get a count of 7.

#### Reset

First, to burn:

```json
{
  "reset": {
    "count": 5
  }
}
```

```sh
terrad tx wasm execute terra18vd8fpwxzck93qlwghaj6arh4p7c5n896xzem5 '{"reset":{"count":5}}' --from test1 --chain-id=localterra --fees=1000000uluna --gas=auto --broadcast-mode=block
```

#### Incrementing

```json
{
  "increment": {}
}
```

```sh
terrad tx wasm execute terra18vd8fpwxzck93qlwghaj6arh4p7c5n896xzem5 '{"increment":{}}' --from test1 --chain-id=localterra --gas=auto --fees=1000000uluna --broadcast-mode=block
```

#### Querying count

Let's check the result of our executions!

```json
{
  "get_count": {}
}
```

```sh
terrad query wasm contract-store terra18vd8fpwxzck93qlwghaj6arh4p7c5n896xzem5 '{"get_count":{}}'
{"count":7}
```

Excellent! Congratulations, you've created your first smart contract, and now know how to get developing with the Terra dApp Platform.

## What's Next?

We've only walked through a simple example of a smart contract, that modifies a simple balance within its internal state. Although this is enough to make a simple dApp, we can power more interesting applications by **emitting messages**, which will enable us to interact with other contracts as well as the rest of the blockchain's module.

Check out a couple more examples of smart contracts on Terra at our [repo](https://github.com/terra-money/cosmwasm-contracts).
