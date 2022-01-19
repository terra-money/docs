# Using Terrain with Bombay

## Setting up Bombay wallet

First create a new wallet using the Terra station extension. It's recommended to name this wallet bombay or testnet so it's easy to remember that it's only used for bombay.

After creating a bombay wallet and storing the seed phrase you can request funds from the testnet faucet: 

https://faucet.terra.money

Make sure you have your seed phrase stored somewhere since you will need it to complete this tutorial.

## Scaffold dapp

With Terrain installed you can now scaffold your new application:

```sh
terrain new my-terra-dapp
cd my-terra-dapp
npm install
```

## Project structure

The following structure shows your scaffolded project:

```
.
├── contracts              # The contracts' source code.
│   ├── counter
│   └── ...                # Add more contracts here.
├── frontend               # The front-end application.
├── lib                    # Predefined functions for task and console.
├── tasks                  # Predefined tasks.
├── keys.terrain.js        # Keys for signing transactions.
├── config.terrain.json    # Config for connections and contract deployments.
└── refs.terrain.json      # Deployed code and contract references.
```

## Testnet configuration

Before deploying we need to teach Terrain how to access our bombay wallet. To do this you'll need to modify `keys.terrain.js` in the generated project.

Modify the configuration to look like this: 

```
module.exports = {
  bombay: {
    mnemonic:
      "SEED_GOES_HERE",
  },
};
```

Make sure to replace `SEED_GOES_HERE` with the seed phrase you generated in the Initial setup tutorial.

## Deployment

To deploy the application, run the following command: 

```sh
terrain deploy counter --signer bombay --network testnet
```

The deploy command performs the following steps automatically:

* Builds the counter smart contract
* Optimizes the counter smart contract
* Uploads counter smart contract to LocalTerra
* Instantiates the deployed smart contract

:::warning Warning
If you get the following error: 

```
CLIError: account sequence mismatch, expected 1, got 0: incorrect account sequence
```

Wait a few seconds then try the deploy again.
:::

## Interacting with the deployed contract

The template comes with several predefined helpers in `lib/index.js`. Use them to start interacting with your smart contract:

1. Run `terrain console --network testnet`.

2. With the console open, increment the counter by running the following:

```JavaScript
await lib.increment(wallets.bombay);
```

Make sure to pass your bombay wallet to the increment command. `terrain console` makes wallets specified in `keys.terrain.js` available in the `wallets` object.

You can get the current count by using:

```JavaScript
await lib.getCount()
```

3. After incrementing once, `await lib.getCount()` will return:

```JSON
{ count: 1 }
```

## Front-end scaffolding

Terrain also scaffolds a very simple frontend.

In the Terra Station Chrome extension, switch the network to Testnet.

1. To use the front end, run the following commands in order. The terrain sync-refs command copies your deployed contract addresses to the front-end part of the codebase.

```
terrain sync-refs
cd frontend
npm install
npm start
```

1. With Testnet selected in Terra Station you can now increment and reset the counter from the front end.

### Demo

![](/img/tut_counter.gif)

## Advanced usage

For more advanced use cases  like deploying to the testnet or mainnet, see [Terrain's readme](https://github.com/iboss-ptk/terrain#readme).