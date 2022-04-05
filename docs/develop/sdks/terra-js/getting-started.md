# Getting started

## Setting up your workspace

To begin, create or navigate to your project directory.
```console
mkdir <my-terra-js-project> // This will create a new directory
cd <my-terra-js-project>
```

Then initialize your node package manager and install the `terra.js` package. This should autogenerate a number of new files.

If you do not already have npm installed. Follow these [instructions](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
```console
npm init -y
npm install @terra-money/terra.js
```

Now, lets import and intialize the LCDClient. This client will help us make queries, create wallets, and submit transactions to the Terra network. It's the main workhorse behind the `terra.js` package. 

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

## Get wallet balance (native tokens)

```js
// Replace with address to check.
const address = 'terra1xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
const [balance] = await lcd.bank.balance(address);
console.log(balance.toData());
```

Example response: 

```js
[
  { denom: 'uluna', amount: '5030884' },
  { denom: 'uusd', amount: '433108784' }
]
```

## Get wallet balance (CW20 tokens)

```js
// ANC on bombay-12
const tokenAddress = 'terra1747mad58h0w4y589y3sk84r5efqdev9q4r02pc';
const walletAddress = 'terra1f44ddca9awepv2rnudztguq5rmrran2m20zzd6';
const response = await lcd.wasm.contractQuery(tokenAddress, { balance: { address: walletAddress }});

console.log(response);
```

Example response: 

```js
{ balance: '70258667' }
```

## Get transaction status 

```js
// Replace with TX hash to lookup.
const hash = 'CAB264B3D92FF3DFE209DADE791A866876DE5DD2A320C1200F9C5EC5F0E7B14B';
const txInfo = await lcd.tx.txInfo(hash);
console.log(txInfo);
```

Example response (modified for readability): 

```js
TxInfo {
  height: 8276372,
  txhash: 'CAB264B3D92FF3DFE209DADE791A866876DE5DD2A320C1200F9C5EC5F0E7B14B',
  raw_log: '[]',
  logs: [
    TxLog {
      msg_index: 0,
      log: '',
      events: [Array],
      eventsByType: [Object]
    }
  ],
  gas_wanted: 177808,
  gas_used: 128827,
  tx: Tx {},
  timestamp: '2022-03-17T18:34:06Z',
  code: 0,
  codespace: ''
}
```

## Get link to transaction 

```js
const getTransactionLink = (hash, chainID) => `https://finder.terra.money/${chainID}/tx/${hash}`;
const hash = 'CAB264B3D92FF3DFE209DADE791A866876DE5DD2A320C1200F9C5EC5F0E7B14B';

console.log(getTransactionLink(hash, 'bombay-12'));
```

Example response: 

```
https://finder.terra.money/bombay-12/tx/CAB264B3D92FF3DFE209DADE791A866876DE5DD2A320C1200F9C5EC5F0E7B14B
```

## Get link to wallet address

```js
const getWalletLink = (address, chainID) => `https://finder.terra.money/${chainID}/address/${address}`;
const address = 'terra1xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
console.log(getWalletLink(address, 'bombay-12'))
```

Example response: 

```
https://finder.terra.money/bombay-12/address/terra1xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
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

// ANC on bombay-12
const tokenAddress = 'terra1747mad58h0w4y589y3sk84r5efqdev9q4r02pc';

// Transfer 1 ANC.
const cw20Send = new MsgExecuteContract(
  wallet.key.accAddress,
  tokenAddress,
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

## Swapping using the market module

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

## Validate a Terra address

The following code example shows how to do a basic verification on a Terra address.

This is a basic version of the verification, it does not require external libraries as it performs a simple comparison with a regex string. It could give false positives since it doesn't verify the checksum of the address.
```ts
// basic address validation (no library required)
function isValid(address) {
  // check the string format:
  // - starts with "terra1"
  // - length == 44 ("terra1" + 38)
  // - contains only numbers and lower case letters
  return /(terra1[a-z0-9]{38})/g.test(address);
}

console.log(isValid('terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8')); // true
console.log(isValid('terra1xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')); // true (even if this doesn't have a valid checksum)
console.log(isValid('cosmos1zz22dfpvw3zqpeyhvhmx944a588fgcalw744ts')); // false
console.log(isValid('random string')); // false
```

This is a more advanced verification that requires the bech32 library which is used to verify the checksum.

```ts
import { bech32 } from 'bech32';

// advanced address validation, it verify also the bech32 checksum
function isValid(address) {
  try {
    const { prefix: decodedPrefix } = bech32.decode(address); // throw error if checksum is invalid
    // verify address prefix
    return decodedPrefix === 'terra';
  } catch {
    // invalid checksum
    return false; 
  }
}

console.log(isValid('terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8')); // true
console.log(isValid('terra1xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')); // false
console.log(isValid('cosmos1zz22dfpvw3zqpeyhvhmx944a588fgcalw744ts')); // false
console.log(isValid('random string')); // false
```


## Avoid Status 500: timed out waiting for tx to be included in a block

Occasionally the broadcast function of terra.js and terra.py throws the error `Status 500: timed out waiting for tx to be included in a block`, even if transaction will confirmed onchain after a few seconds.

This happens because the libraries use by default the `broadcast-mode = block`, with this mode the LCD to which you are broadcasting the transaction sends an http response to your request only when the transaction has been included in a block, but if the chain is overloaded the confirmation may take too long and trigger a timeout in the LCD.

To solve this problem it is recommended to use the `broadcast-mode = sync` and then iterate a request to the LCD with the txhash to understand when it has been included in a block.

This is an example to do it in JavaScript:

```ts
// sign the tx
wallet.createAndSignTx(YOUR_TX_HERE)
  // use broadcastSync() instead of broadcast()
  .then(tx => terra.tx.broadcastSync(tx))
  .then(async result => {
    // TODO: use a for or add a timeout to prevent infinite loops 
    while(true){
      // query txhash
      const data = await terra.tx.txInfo(result.txhash)
        .catch(() => {})
      // if hash is onchain return data
      if(data) return data
      // else wait 250ms and then repeat
      await new Promise(resolve => setTimeout(resolve, 250))
    }
  })
  .then(result => {
    // this will be executed when the tx has been included into a block
    console.log(result)
  })
```
