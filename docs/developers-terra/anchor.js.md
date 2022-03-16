# Anchor.js

The Anchor.js JS SDK allows applications with JavaScript runtimes to interact with Anchor Protocol. It supports easy fabrication of messages relevant to Terra-side Anchor smart contracts, used to make contract calls or query contract states.

{% hint style="info" %}
For those wishing to build applications that are centered around Anchor's earn/savings functionality, using [Anchor Earn](../developers-earn/anchor-earn-sdk.md) is recommended.
{% endhint %}

{% hint style="info" %}
This section only provides a brief overview of Anchor.js. For additional information, please refer to the [Anchor.js repository](https://github.com/Anchor-Protocol/anchor.js).
{% endhint %}

### Installation

Anchor.js is developed to be used in tandem with [Terra.js](https://terra-project.github.io/terra.js/), required to interact with the Terra blockchain. Developers must install both:

* `@terra-money/terra.js`
* `@anchor-protocol/anchor.js`

Anchor.js is available as a package on NPM.&#x20;

```
$ npm install -S @terra-money/terra.js @anchor-protocol/anchor.js
```

### Usage

Anchor.js can be utilized to either query the state of Anchor smart contracts or fabricate `MsgExecuteContract` objects to be included in Terra transactions. Both functionalities are accessible through [`MessageFabricators`](https://github.com/Anchor-Protocol/anchor.js/tree/master/src/fabricators).

Using `MessageFabricators`:

```javascript
import {fabricateRedeemStable, fabricateDepositStableCoin} from '@anchor-protocol/anchor.js';
import {contractAddresses, AddressProviderFromJSON} from ".@anchor-protocol/anchor.js";

// default -- uses bombay core contract addresses
const addressProvider = new AddressProviderFromJSON(contractaddresses);
    const redeemMsg = fabricateRedeemStable({
      address: 'terra123...',
      symbol: 'uusd',
      amount: '10000',
    })(addressProvider);

    const depositMsg = fabricateDepositStableCoin({
      address: 'terra123...',
      symbol: 'uusd',
      amount: '10',
    })(addressProvider);
```

#### Executing

A message fabricator contains functions for generating proper `MsgExecuteContract` messages to be included in a transaction and broadcasted via the specified `LCDClient`.

```javascript
import { LCDClient, Wallet, MnemonicKey, StdFee} from '@terra-money/terra.js';

const anchor = new LCDClient({ URL: 'https://bombay-lcd.terra.dev', chainID:'bombay-12' });
const owner = new MnemonicKey({ mnemonic: "..."});
const wallet = new Wallet(anchor, owner);


async function depositStable() {
    const tx = await wallet.createAndSignTx({
        msgs: depositMsg,
        fee: new StdFee(200_000, { uluna: 20_000_000 })
    });
    return await anchor.tx.broadcast(tx);
}

async function main() {
    await depositStable();
}

main().catch(console.error);
```
