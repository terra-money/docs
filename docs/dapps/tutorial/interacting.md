# Interacting with the Contract

## Requirements

Make sure you have set up **localterra** and that it is up and running:

```sh
cd localterra
docker-compose up
```

You should also have the latest version of `terracli` by building the latest version of Terra Core. We will configure it to use it against our isolated testnet environment.

In a separate terminal, make sure to set up the following mnemonic:

```sh
terracli keys add test1 --recover
```

Using the mnemonic:

```
satisfy adjust timber high purchase tuition stool faith fine install that you unaware feed domain license impose boss human eager hat rent enjoy dawn
```

## Uploading Code

Make sure that the **optimized build** of `contract.wasm` that you created in the last section is in your current working directory.

```sh
terracli tx wasm store contract.wasm --from test1 --chain-id=localterra --gas=auto --broadcast-mode=block
```

You should see output similar to the following:

```sh
height: 80
txhash: 8A9F770581C5B8F7A39BF78DE7673B590849A7C1807BD7CC213E235CAD49A2D4
codespace: ""
code: 0
data: ""
rawlog: '[{"msg_index":0,"log":"","events":[{"type":"message","attributes":[{"key":"action","value":"storecode"},{"key":"module","value":"wasm"}]},{"type":"store_code","attributes":[{"key":"sender","value":"terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8"},{"key":"code_id","value":"1"}]}]}]'
logs:
- msgindex: 0
  log: ""
  events:
  - type: message
    attributes:
    - key: action
      value: storecode
    - key: module
      value: wasm
  - type: store_code
    attributes:
    - key: sender
      value: terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8
    - key: code_id
      value: "1"
info: ""
gaswanted: 505850
gasused: 504528
tx: null
timestamp: ""
```

As you can see, our contract was successfully instantiated with Code ID #1.

You can check it out:

```sh
terracli query wasm code 1
codehash: jWcmve62I58tWHd5a9E8PeZ3BUUmLE50mLf094/3N8Y=
creator: terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8
```

## Creating the Contract

We have now uploaded the code for our contract, but we still don't have a contract. Let's create it, with the following InitMsg:

```json
{
  "name": "MyTerraToken",
  "symbol": "MTT",
  "initial_balances": [
    {
      "address": "terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8",
      "amount": "100000"
    }
  ]
}
```

We will compress the JSON into 1 line with [this online tool](https://goonlinetools.com/json-minifier/).

```sh
terracli tx wasm instantiate 1 '{"name":"MyTerraToken","symbol":"MTT","initial_balances":[{"address":"terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8","amount":"100000"}]}' --from test1 --chain-id=localterra --gas=auto --broadcast-mode=block
```

You should get a response like the following:

```sh
height: 270
txhash: A17A56F9007EBB49E984303EAA82EC1C740A54D8DBD3515B25AD1DFEE9B46E7A
codespace: ""
code: 0
data: ""
rawlog: '[{"msg_index":0,"log":"","events":[{"type":"instantiate_contract","attributes":[{"key":"sender","value":"terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8"},{"key":"code_id","value":"1"},{"key":"contract_address","value":"terra18vd8fpwxzck93qlwghaj6arh4p7c5n896xzem5"}]},{"type":"message","attributes":[{"key":"action","value":"instantiatecontract"},{"key":"module","value":"wasm"}]}]}]'
logs:
- msgindex: 0
  log: ""
  events:
  - type: instantiate_contract
    attributes:
    - key: sender
      value: terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8
    - key: code_id
      value: "1"
    - key: contract_address
      value: terra18vd8fpwxzck93qlwghaj6arh4p7c5n896xzem5
  - type: message
    attributes:
    - key: action
      value: instantiatecontract
    - key: module
      value: wasm
info: ""
gaswanted: 68520
gasused: 66105
tx: null
timestamp: ""
```

From the output, we see that our contract was created above at: `terra18vd8fpwxzck93qlwghaj6arh4p7c5n896xzem5`. Take note of this contract address, as we will need it for the next section.

Check out your contract information:

```sh
terracli query wasm contract terra18vd8fpwxzck93qlwghaj6arh4p7c5n896xzem5
codeid: 1
address: terra18vd8fpwxzck93qlwghaj6arh4p7c5n896xzem5
creator: terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8
initmsg: eyJuYW1lIjoiTXlUZXJyYVRva2VuIiwic3ltYm9sIjoiTVRUIiwiaW5pdGlhbF9iYWxhbmNlcyI6W3siYWRkcmVzcyI6InRlcnJhMWRjZWd5cmVrbHRzd3Z5eTB4eTY5eWRneG45eDh4MzJ6ZHRhcGQ4IiwiYW1vdW50IjoiMTAwMDAwIn1dfQ==
```

By decoding the Base64 InitMsg:

```sh
{"name":"MyTerraToken","symbol":"MTT","initial_balances":[{"address":"terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8","amount":"100000"}]}
```

## Executing the Contract

Now, let's do the following:

1. burn 15000 tokens
2. send 30000 tokens to `terra18putj9puq4jqcgmk6hje44fyh4hf9nsuwxj9vy`

This should leave us with 55000 tokens.

#### Burning tokens

First, to burn:

```json
{
  "burn": {
    "amount": "15000"
  }
}
```

```sh
terracli tx wasm execute terra18vd8fpwxzck93qlwghaj6arh4p7c5n896xzem5 '{"burn":{"amount":"15000"}}' --from test1 --chain-id=localterra --gas=auto --broadcast-mode=block
```

#### Transferring Tokens

Finally, to send:

```json
{
  "transfer": {
    "amount": "30000",
    "recipient": "terra18putj9puq4jqcgmk6hje44fyh4hf9nsuwxj9vy"
  }
}
```

```sh
terracli tx wasm execute terra18vd8fpwxzck93qlwghaj6arh4p7c5n896xzem5 '{"transfer":{"amount":"30000","recipient":"terra18putj9puq4jqcgmk6hje44fyh4hf9nsuwxj9vy"}}' --from test1 --chain-id=localterra --gas=auto --broadcast-mode=block
```

#### Querying balances

Let's check the result of our executions!

```json
{
  "balance": {
    "address": "terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8"
  }
}
```

```sh
terracli query wasm contract-store terra18vd8fpwxzck93qlwghaj6arh4p7c5n896xzem5 '{"balance":{"address":"terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8"}}'
{"balance":"55000"}
```

```sh
terracli query wasm contract-store terra18vd8fpwxzck93qlwghaj6arh4p7c5n896xzem5 '{"balance":{"address":"terra18putj9puq4jqcgmk6hje44fyh4hf9nsuwxj9vy"}}'
{"balance":"30000"}
```

#### Querying contract details

```json
{
  "config": {}
}
```

```sh
terracli query wasm contract-store terra18vd8fpwxzck93qlwghaj6arh4p7c5n896xzem5 '{"config":{}}'
{"name":"MyTerraToken","symbol":"MTT","owner":"terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8"}
```

Excellent! Congratulations, you've created your first smart contract, and now know how to get developing with the Terra dApp Platform.

## What's Next?

We've only walked through a simple example of a smart contract, that modifies a simple balance within its internal state. Although this is enough to make a simple dApp, we can power more interesting applications by **emitting messagess**, which will enable us to interact with other contracts as well as the rest of the blockchain's module.

Check out a couple more examples of smart contracts on Terra at our [repo](https://github.com/terra-project/cosmwasm-contracts).

## Exercises

Try the following problems to improve your understanding of how to write smart contracts:

- create a new variable to store that keeps track of everybody who has an active balance
- create a new query function that returns the total supply
- create a new contract function "Burn All" which allows only the contract owner to delete all coins from existence
- create a new contract function "Mint" which allows only the contract owner to create an amount of coins
