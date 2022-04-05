# Getting started

## Intro

This is an in-depth guide on how to setup and use the `terra.js` module from scratch. By the end of this guide you'll be able to call an asset swap from your application.

We'll cover how to:
1. Setup a Terra lcd (light client daemon)
2. Create/load in a wallet
3. Query a contract
4. Create, sign and broadcast a transaction

## Set up your workspace

To begin, create or navigate to your project directory.
```console
mkdir <my-terra-js-project> // create a new directory
cd <my-terra-js-project>
```

Then initialize npm (node package manager) and install the `terra.js` package. This should autogenerate a number of new files. 

If you do not already have npm installed. Follow these [instructions](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

```console
npm init -y // initalizes npm with standard configuration
npm install @terra-money/terra.js // installs the terra.js library
```

Lets also create an `index.js` file to contain our code.
```console
touch index.js // creates an index.js file
```
## Initialize your lcd

Now, lets import and intialize the LCDClient in our `index.js` file. This client will help us make queries, create wallets, and submit transactions to the Terra network. It's the main workhorse behind the `terra.js` package. We also want to import a fetch library for making http requests. Use your favorite or the one referenced below. We'll use it to dynamically pull recommended gas prices which we should specify in our lcd. Read more about [Coin and Coins](../../sdks/terra-js/coin-and-coins.md).

The `lcd` below is setup for the bombay testnet. Change the `URL` and `chainID` values to configure it for production or localterra. 

```ts
import fetch from 'isomorphic-fetch';
import { Coins, LCDClient } from '@terra-money/terra.js';

const gasPrices = await (await fetch('https://bombay-fcd.terra.dev/v1/txs/gas_prices')).json();
const gasPricesCoins = new Coins(gasPrices);

const lcd = new LCDClient({
  URL: "https://bombay-lcd.terra.dev/", // Use "https://lcd.terra.dev" for prod "http://localhost:1317" for localterra.
  chainID: "bombay-12", // Use "columbus-5" for prod or "localterra".
  gasPrices: gasPricesCoins,
  gasAdjustment: "1.5", // Increase gas price slightly to transactions go through smoothly.
  gas: 10000000,
})
```

## Create a Bombay testnet wallet

We need a wallet to sign transactions.
[Create a new wallet](../../../learn/terra-station/download/terra-station-extension.md#create-a-wallet) using the Terra Station extension — be sure to save your mnemonic key. Click the gear icon and select `testnet`. Return to your project directory and load in your mnemonic key. 

```ts
const mk = new MnemonicKey({
  mnemonic: 'terra station will generate twenty four random words that act as your mnemonic that you can copy and paste here to have for later',
});

const wallet = lcd.wallet(mk);
```

Request funds for your test wallet [here](https://faucet.terra.money). We'll need this to perform swaps and pay for gas fees.

## Query the terraswap contract and setup the transaction

```ts
const pool = "terra1wfvczps2865j0awnurk9m04u7wdmd6qv3fdnvz"; // UST/ANC terraswap contract address.

const { assets } = await lcd.wasm.contractQuery(pool, { pool: {} }); // Fetch the number of each asset in the pool.

const beliefPrice = (assets[0].amount / assets[1].amount).toFixed(18); // Calculate belief price using proportion of pool balances.

// Swap 1 UST to ANC with 1% slippage tolerance.
const terraSwapMsg = new MsgExecuteContract(
  wallet.key.accAddress,
  pool, 
  {
    swap: {
      max_spread: "0.01",
      offer_asset: {
        info: {
          native_token: {
            denom: "uusd",
          },
        },
        amount: "1000000",
      },
      belief_price: beliefPrice,
    },
  },
  new Coins({ uusd: '1000000' }),
);
```
