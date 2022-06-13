# Fees

```ts
import { Fee } from '@terra-money/terra.js';

const msgs = [ new MsgSend( ... ), new MsgExecuteContract( ... ), ]; // messages
const fee = new Fee(50000, { uluna: 4500000 });

const tx = await wallet.createAndSignTx({ msgs, fee });
```

## Automatic fee estimation

If you don't specify a fee when you create your transaction, it will automatically be estimated by simulating it within the node.

```ts
const tx = await wallet.createAndSignTx({ msgs });
```

You can define the fee estimation parameters when you create your `LCDClient` instance. The defaults are:

```ts
const terra = new LCDClient({
  URL: "https://phoenix-lcd.terra.dev",
  chainID: "phoenix-1",
  gasPrices: { uluna: 0.015 },
  gasAdjustment: 1.4,
});
```

You can override these settings by passing the fee estimation parameters in `wallet.createTx` or `wallet.createAndSignTx`:

```ts
const tx = await wallet.createAndSignTx({
  msgs,
  gasPrices: { ukrw: 0.01 },
  gasAdjustment: 1.9,
});
```
