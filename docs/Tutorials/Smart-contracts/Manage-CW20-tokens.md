# CW20 Tokens
According to the [official documentation](https://docs.rs/crate/cw20/0.2.3)
> CW20 is a specification for fungible tokens based on CosmWasm. The name and design is loosely based on Ethereum's ERC20 standard, but many changes have been made. The types in here can be imported by contracts that wish to implement this spec, or by contracts that call to any standard cw20 contract.

## Checking CW20 balance
  - Query to `/wasm/contracts/<tokenContractAddress>/store` with query_msg `{"balance":{"address":"<userAddress>"}}`
  - Response: `{"height":"2947306","result":{"balance":"24732816921"}}`
  - [Example](https://tequila-lcd.terra.dev/wasm/contracts/terra1800p00qlxh0nmt0r0u9hv7m4lg042fnafng2t6/store?query_msg={%22balance%22:{%22address%22:%22terra1dakqt3s8dywea9advxz4duxkuvglz3a34yczw9%22}})

## Interacting with CW20 contract

- CW20 is a cosmwasm contract and `wasm/MsgExecuteContract` is used to interact with it
- Breakdown of message payload format is as follows (similar to `bank/MsgSend` but `execute_msg` is added):

```
{
  "type": "wasm/MsgExecuteContract",
  "value": {
    // sender address
    "sender": "terra1zyrpkll2xpgcdsz42xm3k8qfnddcdu0w7jzx6y",

    // token contract address
    "contract": "terra1rz5chzn0g07hp5jx63srpkhv8hd7x8pss20w2e",

    // base64-encoded payload of contract execution message (refer to below)
    "execute_msg": "ewogICJzZW5kIjogewogICAgImFtb3VudCI6ICIxMDAwMDAwMDAwIiwKICAgICJjb250cmFjdCI6IDxyZWNpcGllbnRDb250cmFjdEFkZHJlc3M+LAogICAgIm1zZyI6ICJleUp6YjIxbFgyMWxjM05oWjJVaU9udDlmUT09IiAKICB9Cn0=",

    // used in case you are sending native tokens along with this message
    "coins": []
  }
}
```

## Sending CW20 token to another contract, and execute message
- Example
  - [Finder](https://finder.terra.money/tequila-0004/tx/5F42938E56DB7DC91A59EE4013C6DA07E983FB83FE0D42DCB3BAAF8A30495ADB) (execute_msgs are base64-decoded for readability)
  - [Raw result](https://tequila-lcd.terra.dev/txs/FA682BA30DABE92086920F44D4DFD45F99F32265AACFB686EB4EA53AFBF6ED1A)

```
// base64-encode the below message (without the comments), send that as `execute_msg`
{
  "send": {
    // amount of CW20 tokens being transferred
    "amount": "1000000000",

    // recipient of this transfer
    "contract": <recipientContractAddress>,

    // execute_msg to be executed in the context of recipient contract
    "msg": "eyJzb21lX21lc3NhZ2UiOnt9fQ==" 
  }
}
```

## Transferring CW20 token
  - `transfer` is different to `send`, as in it only __transfers__ ownership of CW20 balance within the contract, whereas `send` is capable of transferring & relays a contract msg to be executed
  - Example
    - [Finder](https://finder.terra.money/tequila-0004/tx/FA682BA30DABE92086920F44D4DFD45F99F32265AACFB686EB4EA53AFBF6ED1A)
    - [Raw result](https://tequila-lcd.terra.dev/txs/FA682BA30DABE92086920F44D4DFD45F99F32265AACFB686EB4EA53AFBF6ED1A)
  - Find other messages at [cw20 documentation](https://docs.rs/crate/cw20/0.2.3)

```
{
  "transfer": {
    "recipient": <recipient>,
    "amount": "100000"
  },
}
```