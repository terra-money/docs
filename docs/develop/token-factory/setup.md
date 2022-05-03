# Set up your environment

In this tutorial, you will build a CW20 Tokens factory. CW20 is a specification for fungible tokens based on CosmWasm.

## Prerequisites

To complete this tutorial, you must have the following:

- [A Terrain development environment](https://docs.terra.money/docs/develop/dapp/quick-start/initial-setup.html#initial-setup)
- [A LocalTerra node](https://docs.terra.money/docs/develop/dapp/quick-start/using-terrain-localterra.html#install-and-run-localterra)
- [The Terra Station Extension wallet to interact with the smart contract](https://docs.terra.money/docs/learn/terra-station/download/terra-station-extension.html)
- An IDE or text editor of your choice. For the purpose of this tutorial, Visual Studio Code will be used.
- A command line interface

## 1. Instantiate a new app using Terrain

1\. Instantiate a new app using Terrain:

```sh
terrain new token-factory
```

When the app is generated, the following displays:

```sh
generating: 
- contract... done
- frontend... done
```

2\. Navigate to the `contracts` folder.

```
cd contracts/
```

3\. Terrain automatically generates a sample `counter` contract in the `contracts` folder. Delete the `counter` smart contract folder to ensure a clean workspace:

```
rm -r counter/
```

## 2. Instantiate the `token-factory` and `cw20-factory-token` contracts

1\. Navigate to the `token-factory` directory:

```sh
cd token-factory
```

2\. Instantiate the `token-factory` contract:
    
```sh
terrain code:new token-factory
```

When the contract is generated, the following displays:
```sh
generating contract... done
```


3\. Instantiate the `cw20-factory-token` contract:

```
terrain code:new cw20-factory-token
```

When the contract is generated, the following displays:
```sh
generating contract... done
```

## 3. Modify the mnemonics passphrase

Before editing the smart contracts that you instantiated in step 2, modify the mnemonics passphrase that will be used to do deploy to LocalTerra:

1\. Navigate to ` /token-factory`
```
cd /token-factory
```

2\. Open `/keys.terrain.js` and set the `mnemonic` passphrase to the following:

```
notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius
```

:::{tip}
Because the wallet contains funds, it is recommended that you also import the passphrase listed below into the Terra Station Extension. You can view other example mnemonics [on Github] (https://github.com/terra-money/LocalTerra/blob/main/terracore/mnemonics.json#L9):

```
notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius
```
:::

The `module.exports` section of your `keys.terrain.js` file should now look similar to the following:

```js
module.exports = {
  test: {
    mnemonic:
      "notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius",
  }
};
```

## 4. Deploy the smart contracts
Deploy each smart contract to validate that the development environment is configured correctly:

1\. Deploy the `token-factory` contract:
```
terrain deploy token-factory --signer test
```

2\. Deploy the `cw20-factory-token` contract:
```
terrain deploy cw20-factory-token --signer test
```

