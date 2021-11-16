# Common examples

## Configuring LCDClient

The following code example shows how to initialize the LCDClient. The rest of the examples assume you initialized it by using this example or similar code.

```ts
import fetch from 'isomorphic-fetch';
import { MsgSend, MnemonicKey, Coin, LCDClient } from '@terra-money/terra.js';

// Fetch gas prices and convert to `Coin` format.
const gasPrices = await (await fetch('https://bombay-fcd.terra.dev/v1/txs/gas_prices')).json();
const gasPricesCoins = Object.keys(gasPrices).map(token => new Coin(token, gasPrices[token]));

const lcd = new LCDClient({
  URL: "https://bombay-lcd.terra.dev/",
  chainID: "bombay-12",
  gasPrices: gasPricesCoins,
  gasAdjustment: "1.5",
  gas: 10000000,
});
```

## Sending native tokens

The following code example shows how to send native tokens:

```ts
import { LCDClient, MnemonicKey, MsgSend } from "@terra-money/terra.js";

// const lcd = new LCDClient(...);

const mk = new MnemonicKey({
  mnemonic: 'satisfy adjust timber high purchase tuition stool faith fine install that you unaware feed domain license impose boss human eager hat rent enjoy dawn',
});

const wallet = lcd.wallet(mk);

// Transfer 1 Luna.
const send = new MsgSend(
  wallet.key.accAddress,
  "terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8",
  { uluna: "1000000" }
);

const tx = await wallet.createAndSignTx({ msgs: [send] });
const result = await lcd.tx.broadcast(tx);

console.log(result);
```

## Sending CW20 tokens

The following code example shows how to send CW20 tokens:

```ts
import {
  LCDClient,
  MnemonicKey,
  MsgExecuteContract,
} from "@terra-money/terra.js";

// const lcd = new LCDClient(...);

const mk = new MnemonicKey({
  mnemonic: 'satisfy adjust timber high purchase tuition stool faith fine install that you unaware feed domain license impose boss human eager hat rent enjoy dawn',
});

const wallet = lcd.wallet(mk);

// Transfer 1 ANC.
const cw20Send = new MsgExecuteContract(
  wallet.key.accAddress,
  "terra14z56l0fp2lsf86zy3hty2z47ezkhnthtr9yq76", // ANC token address.
  {
    transfer: {
      amount: "1000000",
      recipient: wallet.key.accAddress,
    },
  }
);

const tx = await wallet.createAndSignTx({ msgs: [cw20Send] });
const result = await lcd.tx.broadcast(tx);

console.log(result);
```

## Swaping using the market module

The following code example shows how to swap native Terra assets using the market module: 

```ts
import {
  LCDClient,
  MnemonicKey,
  MsgSwap,
  Coin,
} from "@terra-money/terra.js";

// const lcd = new LCDClient(...);

const mk = new MnemonicKey({
  mnemonic: 'satisfy adjust timber high purchase tuition stool faith fine install that you unaware feed domain license impose boss human eager hat rent enjoy dawn',
});

const wallet = lcd.wallet(mk);

// Swap 1 Luna to UST.
const swap = new MsgSwap(
  wallet.key.accAddress,
  new Coin('uluna', '1000000'),
  'uusd'
);

const tx = await wallet.createAndSignTx({ msgs: [swap] });
const result = await lcd.tx.broadcast(tx);

console.log(result);
```
