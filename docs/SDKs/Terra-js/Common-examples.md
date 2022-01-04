# Common examples

## Configuring LCDClient

The following code example shows how to initialize the LCDClient. The rest of the examples assume you initialized it by using this example or similar code.

```ts
import fetch from 'isomorphic-fetch';
import { MsgSend, MnemonicKey, Coins, LCDClient } from '@terra-money/terra.js';

// Fetch gas prices and convert to `Coin` format.
const gasPrices = await (await fetch('https://bombay-fcd.terra.dev/v1/txs/gas_prices')).json();
const gasPricesCoins = new Coins(gasPrices);

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

## Swapping a native Terra asset for a CW20 token using Terraswap

The following code example shows how to swap a native asset for CW20 using Terraswap.

Run this example on mainnet.

```ts
import {
  MsgExecuteContract,
  MnemonicKey,
  Coins,
  LCDClient,
} from "@terra-money/terra.js";

// const lcd = new LCDClient(...);

const mk = new MnemonicKey({
  mnemonic: 'satisfy adjust timber high purchase tuition stool faith fine install that you unaware feed domain license impose boss human eager hat rent enjoy dawn',
});

const wallet = lcd.wallet(mk);

// UST <> SCRT
const pool = "terra1tq4mammgkqrxrmcfhwdz59mwvwf4qgy6rdrt46";

// Fetch the number of each asset in the pool.
const { assets } = await lcd.wasm.contractQuery(pool, { pool: {} });

// Calculate belief price using pool balances.
const beliefPrice = (assets[0].amount / assets[1].amount).toFixed(18);

// Swap 1 UST to SCRT with 1% slippage tolerance.
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
  new Coins({ uusd: '1000000' }),
);

const tx = await wallet.createAndSignTx({ msgs: [terraSwap] });
const result = await lcd.tx.broadcast(tx);

console.log(result);
```

## Decoding Protobuf-encoded messages

The following code example shows how to decode messages that have been encoded using Protobuf:

```ts
import {
  LCDClient,
  Tx,
} from '@terra-money/terra.js';

// const lcd = new LCDClient(...);

const blockData = await lcd.tendermint.blockInfo(5923213);

const txInfos = blockData.block.data.txs.map((tx) => 
  Tx.unpackAny({ value: Buffer.from(tx, 'base64') })
);

// Find messages where a contract was initialized. 
const initMessages = txInfos.map((tx) => tx.body.messages)
  .flat()
  .find(
    (i) => i.constructor.name === 'MsgInstantiateContract'
  );

console.log(initMessages);
```
