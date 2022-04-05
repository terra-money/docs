# Getting started

## Intro

This is an in-depth guide on how to use the `terra.js` module from scratch. 

We'll cover how to:
1. Setup a Terra lcd (light client daemon)
2. Create/load in a wallet
3. Query a contract
4. Create, sign and broadcast a transaction

By the end of this guide you'll be able to trigger a token swap from your javascript application.

## Set up your workspace

To begin, create or navigate to your project directory.
```console
mkdir <my-terra-js-project> // create a new directory
cd <my-terra-js-project>
```

Next, initialize npm (node package manager) and install the `terra.js` package.

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

Now, lets import and intialize the LCDClient in our `index.js` file. This client will help us make queries, create wallets, and submit transactions to the Terra network. It's the main workhorse behind the `terra.js` package. 

We'll also want to import a fetch library to make HTTP requests — use your favorite or the one referenced below. We'll  be using it  to dynamically pull recommended gas prices.

The `lcd` below is setup for the bombay testnet. Change the `URL` and `chainID` values to configure it for production or localterra. 
Read more about [Coin and Coins](../../sdks/terra-js/coin-and-coins.md).

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

We'll need a wallet to sign and submit transactions. [Create a new wallet](../../../learn/terra-station/download/terra-station-extension.md#create-a-wallet) using the Terra Station extension — and be sure to save your mnemonic key.

Click the gear icon and select `testnet` then return to your project directory and load in your mnemonic key. 

```ts
import { MnemonicKey } from '@terra-money/terra.js';

const mk = new MnemonicKey({
  mnemonic: 'terra station will generate twenty four random words that act as your mnemonic that you can copy and paste here to have for later',
});

const wallet = lcd.wallet(mk);
```

In general, it's better to store this data in your enviorment, i.e. use `process.env.SECRET_MNEMONIC` or `process.env.SECRET_PRIV_KEY`.

Request funds for your test wallet [here](https://faucet.terra.money). We'll need these to perform swaps and pay for gas fees.

## Query the terraswap contract and setup the transaction

First we need calculate the belief price of our chosen asset by querying the proportion of the two pooled assets. 

```ts
const pool = "terra1wfvczps2865j0awnurk9m04u7wdmd6qv3fdnvz"; // UST/ANC terraswap contract address on bombay.

const { assets } = await lcd.wasm.contractQuery(pool, { pool: {} }); // Fetch the number of each asset in the pool.

const beliefPrice = (assets[1].amount / assets[0].amount).toFixed(18); // Calculate belief price using proportion of pool balances.
```

Now let's generate the message we'll send to the network.

```ts
import { MsgExecuteContract } from '@terra-money/terra.js';

// Swap 1 UST to ANC with 1% slippage tolerance.
const terraSwap = new MsgExecuteContract(
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
  new Coins({ uusd: '1000000' })
);
```
## Broadcast the transaction

Now we can create, sign and broadcast the transaction.

```ts
const tx = await wallet.createAndSignTx({ msgs: [terraSwap] });
const result = await lcd.tx.broadcast(tx);

console.log(result);
```

If succesful, we'll see a log of our succesful transaction. And if we check our wallet we should see some new ANC tokens.

If you don't see the new ANC tokens in your wallet then click `Add Tokens` in your station extension.

And that's it! You can find other pool addresses [here](https://app.terraswap.io/) to trigger other token swaps.

