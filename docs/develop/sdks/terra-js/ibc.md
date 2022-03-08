# IBC Transfers

Terra.js and Terra Station both support IBC transfers today, even if this functionality isn't exposed to the user through the wallet interface. It is up to the dapp frontend to initiate a transfer.

## MsgTransfer

Terra.js exports a `MsgTransfer` class that can be used to construct IBC transfers.

```js
new MsgTransfer(
 'transfer', // IBC port
 'channel-1', // Outbound channel (Osmosis)
  new Coin('uusd', '1000000'), // 1 UST
  'terra1cvw8sundusurqajhurpcfk7yvuzlh92cvkpy28', // Source Address on Terra
  'osmo1cl4qw7u35uf77l4scjtv0qej8ycevu4mrdpvmg', // Destination address on Osmosis
  undefined, // Timeout block height (optional)
  (Date.now() + 60 * 1000) * 1e6, // Timeout timestamp (in nanoseconds) relative to the current block timestamp.
);
```

## Supported Channels 

Channels are defined when a relayer is created between Terra and an external chain. For each new connected chain the channel ID is incremented.

You can use [Map of Zones](https://mapofzones.com/zone?period=24&source=columbus-5&tableOrderBy=success&tableOrderSort=desc&testnet=false) to find the available channels and their IDs.

## Derive Cosmos chain addresses from a Terra address

Cosmos SDK based blockchains use bech32 to encode the public key for display. Assuming the same private key is used on multiple Cosmos SDK chains it is possible to decode a Terra address and generate the corresponding public key on another chain.

Here's a quick example using the [bech32](https://github.com/bitcoinjs/bech32) JavaScript library: 

```js
import { bech32 } from 'bech32';

const terraAddress = 'terra1cvw8sundusurqajhurpcfk7yvuzlh92cvkpy28';
const decodedAddress = bech32.decode(terraAddress);
const osmosisAddress = bech32.encode('osmo', decodedAddress.words));
```

## Complete example 

```JS
import {
  LCDClient,
  MnemonicKey,
  MsgTransfer,
  Coin,
} from "@terra-money/terra.js";

// const lcd = new LCDClient(...);

const mk = new MnemonicKey({
  mnemonic: 'satisfy adjust timber high purchase tuition stool faith fine install that you unaware feed domain license impose boss human eager hat rent enjoy dawn',
});

const wallet = lcd.wallet(mk);

// Send 1 UST to the Osmosis blockchain.
const transfer = new MsgTransfer(
 'transfer',
 'channel-1', 
  new Coin('uusd', '1000000'), 
  'terra1cvw8sundusurqajhurpcfk7yvuzlh92cvkpy28',
  'osmo1cl4qw7u35uf77l4scjtv0qej8ycevu4mrdpvmg',
  undefined, 
  (Date.now() + 60 * 1000) * 1e6,
);

const tx = await wallet.createAndSignTx({ msgs: [swap] });
const result = await lcd.tx.broadcast(tx);

console.log(result);
```

Instructions for initilizing LCDClient can be found [here](https://docs.terra.money/docs/develop/sdks/terra-js/common-examples.html#configuring-lcdclient).