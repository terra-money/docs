# Terra Station extension

The API for the Terra Station extension is undergoing rapid development and is highly unstable. If you are developing a dApp, please check regularly for updates as breaking changes may be introduced frequently.

## What is the Terra Station extension?

The Terra Station extension is a web-wallet extension for Chrome that enables webpages to create requests for signing and broadcasting transactions. The webpage can detect the presence of Station Extension and generate a prompt whereby the user can confirm the transaction to be signed.

## Connect

```ts
import { Extension, Wallet } from "@terra-money/@terra.js";

let wallet: Wallet;
const extension = new Extension();
extension.connect();
extension.on("connect", (w: Wallet) => {
  w = wallet;
});
```

## Sign a message

```ts
import { MsgSend } from "@terra-money/terra.js";

extension.post({
  msgs: []
});
```
