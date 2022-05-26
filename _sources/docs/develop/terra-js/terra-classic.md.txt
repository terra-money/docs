# Using Terra Classic

Terra.js can be configured to work with Terra Classic by passing a boolean `isClassic` value to the LCD.

## LCDClient

```ts
const gasPrices = await(
  await fetch("https://bombay-fcd.terra.dev/v1/txs/gas_prices")
).json();

const gasPricesCoins = new Coins(gasPrices);

const lcd = new LCDClient({
  URL: "https://bombay-lcd.terra.dev/",
  chainID: "bombay-12",
  gasPrices: gasPricesCoins,
  gasAdjustment: "1.5",
  gas: 10000000,
  isClassic: true, // false by default, change to true if you want to interact with Terra Classic
});
```

## Conversion Functions

The `isCLassic` boolean can also be specified for most unit conversion functions in Terra.js. If unspecified, these methods will simply use the Luna version specified in the LCD config. The following are two examples of methods that accept this boolean value.

```ts
public toAmino(isClassic?: boolean)
public fromData(isClassic?: boolean)
```

## Signing Messages with Keys

Wallet objects on Terra contain information about the LCDClient, so they inherit the `isClassic` parameter automatically. However, key objects, such as `MnemonicKey`, `RawKey` or `CLIKey` do not. For example, `createSignatureAmino` is a method where you can specifiy if you'd like to use Terra Classic.

```ts
 public async createSignatureAmino(
      tx: SignDoc,
      isClassic?: boolean
    ): Promise<SignatureV2> { ... }

```
