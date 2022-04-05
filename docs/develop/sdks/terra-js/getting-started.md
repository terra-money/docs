# Getting started

## Setting up your workspace

To begin, create or navigate to your project directory.
```console
mkdir <my-terra-js-project> // This will create a new directory
cd <my-terra-js-project>
```

Then initialize your node package manager and install the `terra.js` package. This should autogenerate a number of new files. Lets also create an `index.js` file where we can start writing our code.

If you do not already have npm installed. Follow these [instructions](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

```console
npm init -y // initalizes npm with standard configuration
npm install @terra-money/terra.js // installs the terra.js library
touch index.js // creates our index.js file to work from
```

Now, lets import and intialize the LCDClient in our `index.js` file. This client will help us make queries, create wallets, and submit transactions to the Terra network. It's the main workhorse behind the `terra.js` package. We also want to import a fetch library for making http requests. Use your favorite or the one referenced below. We'll use it to dynamically pull recommended gas prices which we should specify in our lcd (light client daemon). You can read more about `Coin and Coins` here. [LINK TO COIN AND COINS SECTION @EVAN]

The `lcd` below is setup for the bombay testnet. Change the `URL` and `chainID` values to configure it for production or localterra. 

```ts
import fetch from 'isomorphic-fetch';
import { Coins, LCDClient } from '@terra-money/terra.js';

const gasPrices = await (await fetch('https://bombay-fcd.terra.dev/v1/txs/gas_prices')).json();
const gasPricesCoins = new Coins(gasPrices);

const lcd = new LCDClient({
  URL: "https://bombay-lcd.terra.dev/", // use "https://lcd.terra.dev" for prod "http://localhost:1317" for localterra
  chainID: "bombay-12", // use "columbus-5" for prod or "localterra"
  gasPrices: gasPricesCoins,
  gasAdjustment: "1.5", // ensures transactions go through smoothly
  gas: 10000000,
})
```
