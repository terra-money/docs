# Getting Started with Terra.js

This is an in-depth guide on how to use the `terra.js` module. 

You'll learn how to:
1. Setup a Terra lcd (light client daemon)
2. Create and load in a wallet
3. Query a contract
4. Create, sign and broadcast a transaction

By the end of this guide you'll be able to excute a token swap from your application.

## 1. Set up your project

To begin, create or navigate to your project directory.
```sh
mkdir my-terra-js-project
cd my-terra-js-project
```

Next, initialize npm (node package manager), install the `terra.js` package and create an `index.js` file to house the code.

*If you do not already have npm installed. Follow these [instructions](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).*

```sh
npm init -y
npm install @terra-money/terra.js
touch index.js
```

## 2. Initialize your LCD

The LCDClient helps make queries, create wallets, and submit transactions to the Terra network. It's the main workhorse behind `terra.js`.

You'll also need a fetch library to make HTTP requests — use your favorite or the one referenced below. It'll be used to dynamically pull recommended gas prices.

The `lcd` below is setup for the bombay testnet. Change the `URL` and `chainID` values to configure it for production or localterra. 

*Read more about [Coin and Coins](../../sdks/terra-js/coin-and-coins.md).*

```ts
import fetch from 'isomorphic-fetch';
import { Coins, LCDClient } from '@terra-money/terra.js';

const gasPrices =  await fetch('https://bombay-fcd.terra.dev/v1/txs/gas_prices');
const gasPricesJson = await gasPrices.json();
const gasPricesCoins = new Coins(gasPricesJson); 

const lcd = new LCDClient({
  URL: "https://bombay-lcd.terra.dev/", // Use "https://lcd.terra.dev" for prod "http://localhost:1317" for localterra.
  chainID: "bombay-12", // Use "columbus-5" for production or "localterra".
  gasPrices: gasPricesCoins,
  gasAdjustment: "1.5", // Increase gas price slightly so transactions go through smoothly.
  gas: 10000000,
});
```

## 3. Create a Bombay testnet wallet

You'll need a wallet to sign and submit transactions. [Create a new wallet](../../../learn/terra-station/download/terra-station-extension.md#create-a-wallet) using the Terra Station extension — and be sure to save your mnemonic key.

Click the gear icon and select `testnet` then return to your project directory and load in your mnemonic key. 

```ts
import { MnemonicKey } from '@terra-money/terra.js';

const mk = new MnemonicKey({
  mnemonic: 'terra station will generate twenty four random words that act as your mnemonic that you can copy and paste here to have for later',
});

const wallet = lcd.wallet(mk);
```

Note that, in general, it's better to store this data in your enviorment, i.e. use `process.env.SECRET_MNEMONIC` or `process.env.SECRET_PRIV_KEY`, than as a hard-coded string.

Request funds for your test wallet [here](https://faucet.terra.money). You'll need these to perform swaps and pay for gas fees.

## 5. Query the terraswap contract and setup the transaction

First, calculate the belief price of the chosen asset by querying the proportion of the two pooled assets. The belief price +/- the `max_spread` is the range of possible acceptable prices for this swap.

```ts
const pool = "terra156v8s539wtz0sjpn8y8a8lfg8fhmwa7fy22aff"; // LUNA/UST terraswap contract address on bombay

const { assets } = await lcd.wasm.contractQuery(pool, { pool: {} }); // Fetch the amount of each asset in the pool

const beliefPrice = (assets[0].amount / assets[1].amount).toFixed(18); // Calculate belief price using proportion of pool balances.
```

Next, generate a message to broadcast to the network.

```ts
import { MsgExecuteContract } from '@terra-money/terra.js';

// Swap LUNA to UST with 0.1% slippage tolerance.
const terraSwap = new MsgExecuteContract(
  wallet.key.accAddress,
  pool, 
  {
    swap: {
      max_spread: "0.001",
      offer_asset: {
        info: {
          native_token: {
            denom: "uluna",
          },
        },
        amount: "100000",
      },
      belief_price: beliefPrice,
    },
  },
  new Coins({ uluna: '100000' })
);
```
## 6. Broadcast the transaction

Create, sign and broadcast the transaction. It's important to specify `uluna` as the fee denomination as the faucet has not directly provided UST (the default denomination in this case).

```ts
    const tx = await wallet.createAndSignTx({ msgs: [terraSwap], feeDenoms: ['uluna'] });
    const result = await lcd.tx.broadcast(tx);

    console.log(result);
```

If succesful, you'll see a log of the succesful transaction and some new UST tokens in your wallet.

And that's it! You can find other pool addresses [here](https://app.terraswap.io/) to call other swaps — just ensure you're using the contract addresses for your intended network (i.e. mainnet or testnet).

