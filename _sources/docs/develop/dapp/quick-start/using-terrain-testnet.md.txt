# Use Terrain with the testnet

The Bombay testnet is used for testing transactions on the Terra network.

## Prerequisites

- [Install the Terra Station browser extension](../../../learn/terra-station/download/terra-station-extension.md)

## 1. Create a Bombay wallet

[Create a new wallet](../../../learn/terra-station/download/terra-station-extension.md#create-a-wallet) using the Terra Station extension. It's recommended to name this wallet Bombay or testnet so it's easy to remember that it's only used for Bombay.

After creating a Bombay wallet and storing the seed phrase, request funds from the testnet faucet:

https://faucet.terra.money

:::{danger}
Make sure you have your seed phrase stored somewhere since you will need it to complete this tutorial.
:::

## 2. Scaffold your dApp

Scaffold your new application:

```sh
terrain new my-terra-dapp
cd my-terra-dapp
npm install
```

### Project structure

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

## 3. Configure the testnet

Before deploying, Terrain needs to learn how to access your Bombay wallet. To do this you'll need to modify `keys.terrain.js` in the generated project.

Modify the configuration and input your seed phrase to look like this:

```
module.exports = {
  bombay: {
    mnemonic:
      "PLACE_YOUR_BOMBAY_SEED_PHRASE_HERE",
  },
};
```

## 4. Deploy

To deploy the application, run the following command:

```sh
terrain deploy counter --signer bombay --network testnet
```

The deploy command performs the following steps automatically:

* Builds the counter smart contract.
* Optimizes the counter smart contract.
* Uploads counter smart contract to LocalTerra.
* Instantiates the deployed smart contract.

:::{warning}
If you get the following error:

   ```
   CLIError: account sequence mismatch, expected 1, got 0: incorrect account sequence
   ```

Wait a few seconds then try the deploy again.
:::

## 5. Interact with the deployed contract

The Terrain template comes with several predefined helpers in `lib/index.js`. Use them to start interacting with your smart contract:

1. Run `terrain console --network testnet`.

2. With the console open, increment the counter by running the following:

   ```JavaScript
   await lib.increment(wallets.bombay);
   ```

   Make sure to pass your Bombay wallet to the increment command. `terrain console` makes wallets specified in `keys.terrain.js` available in the `wallets` object.

   You can get the current count by using:

   ```JavaScript
   await lib.getCount()
   ```

3. After incrementing once, `await lib.getCount()` will return:

   ```JSON
   { count: 1 }
   ```

## 6. Front-end scaffolding

Terrain also scaffolds a very simple frontend.

1. In the Terra Station Chrome extension, [switch the network to `testnet`](../../../learn/terra-station/station-guides/testnet.md).

2. To use the front end, run the following commands in order. The terrain sync-refs command copies your deployed contract addresses to the front-end part of the codebase.

   ```
   cd frontend
   npm install
   npm start
   ```

3. With `testnet` selected in Terra Station you can now increment and reset the counter from the front end.

## Demo

![](/img/tut_counter.gif)

## Advanced usage

For more advanced use cases such as deploying to the testnet or mainnet, see [Terrain's readme](https://github.com/iboss-ptk/terrain#readme).
