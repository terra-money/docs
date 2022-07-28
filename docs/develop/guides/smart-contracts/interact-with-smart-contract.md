# Interacting with the Contract

:::{tip}
You can also follow these steps in the official desktop wallet for Terra, [Terra Station](https://station.terra.money).
:::

## Requirements

Make sure you have set up **LocalTerra** and that it is up and running:

```sh
cd localterra
docker-compose up
```

## Uploading Code

Make sure that the **optimized build** of `my_first_contract.wasm` that you created in the last section is in your current working directory.

```sh
terrain deploy my-first-contract --no-rebuild
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

As you can see, your contract was successfully uploaded with Code ID #1, and Terrain instantiated the contract with the message: 

```json
{
  "count": 0
}
```

You can modify the instantiation message in `./terrain.config.json`: 

```json
"instantiation": {
  "instantiateMsg": {
    "count": 0
  }
}
```

## Executing the Contract

Let's do the following:

1. Reset count to 5
2. Increment twice

If done properly, you should get a count of 7.

### Open Terrain console

Terrain includes an interactive REPL for executing and querying your smart contracts. First you'll need to generate a TypeScript client for Terrain to use. You can do this with the following command: 

```
terrain contract:generateClient my-first-contract
```

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

Check the result of your executions!

```json
{
  "get_count": {}
}
```

```sh
terrad query wasm contract-store terra18vd8fpwxzck93qlwghaj6arh4p7c5n896xzem5 '{"get_count":{}}'
```

Expected output:

```
query_result:
  count: 7
```

Excellent! Congratulations, you've created your first smart contract, and now know how to get developing with the Terra dApp Platform.

## What's Next?

So far you've walked through a simple example of a smart contract, that modifies a simple balance within its internal state. Although this is enough to make a simple dApp, you can power more interesting applications by **emitting messages**, which will enable you to interact with other contracts as well as the rest of the blockchain's module.

To learn how to build a dApp, visit the [Terrain tutorial](../../terrain/initial-setup.md).