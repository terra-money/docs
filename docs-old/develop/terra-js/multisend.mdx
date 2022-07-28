# MsgSend

```js
import {
  LCDClient,
  MnemonicKey,
  MsgMultiSend,
  StdTx,
  Account,
} from "@terra-money/terra.js";

const {
  TESTNET_LCD_URL = "http://localhost:1317",
  TESTNET_CHAIN_ID = "localterra",
} = process.env;

async function main() {
  const client = new LCDClient({
    URL: TESTNET_LCD_URL,
    chainID: TESTNET_CHAIN_ID,
    gasPrices: "0.15uluna",
    gasAdjustment: 1.4,
  });

  const keys = {
    test1: new MnemonicKey({
      mnemonic:
        "notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius",
    }),
    test2: new MnemonicKey({
      mnemonic:
        "quality vacuum heart guard buzz spike sight swarm shove special gym robust assume sudden deposit grid alcohol choice devote leader tilt noodle tide penalty",
    }),
    test3: new MnemonicKey({
      mnemonic:
        "symbol force gallery make bulk round subway violin worry mixture penalty kingdom boring survey tool fringe patrol sausage hard admit remember broken alien absorb",
    }),
  };

  const wallet = client.wallet(keys.test1);
  const output = new MsgMultiSend.Output(
    "terra199vw7724lzkwz6lf2hsx04lrxfkz09tg8dlp6r",
    "1000000uluna"
  );

  const tx = await wallet.createTx({
    msgs: [
      new MsgMultiSend(
        [
          new MsgMultiSend.Input(keys.test1.accAddress, "1000000uluna"),
          new MsgMultiSend.Input(keys.test2.accAddress, "1000000uluna"),
          new MsgMultiSend.Input(keys.test3.accAddress, "1000000uluna"),
        ],
        [output, output, output]
      ),
    ],
  });

  const signatures = await Promise.all(
    ["test1", "test2", "test3"].map(async (keyName) => {
      const key = keys[keyName] as MnemonicKey;
      const acc = (await client.auth.accountInfo(key.accAddress)) as Account;

      tx.account_number = acc.account_number;
      tx.sequence = acc.sequence;

      return key.createSignature(tx);
    })
  );

  const stdTx = new StdTx(tx.msgs, tx.fee, signatures, tx.memo);

  await client.tx
    .broadcastSync(stdTx)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.error(err.message);
    });
}

main().catch(console.error);
```
