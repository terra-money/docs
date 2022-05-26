# Using Terra Classic

Terra.js can be configured to work with Terra Classic by passing a boolean `legacy` value to the LCD.

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
  isClassic: true, // optional parameter, false by default
});
```

## Conversion Functions

The `legacy` boolean can also be specified for most unit conversion functions in Terra.js. If unspecified, these methods will simply use the Luna version specified in the LCD config. The following are two such methods that accept this boolean value.

```ts
public toAmino(legacy?: boolean)
public fromData(legacy?: boolean)
```

## Signing Messages with Keys

Wallet objects on Terra contain information about the LCDClient, so they inherit the `legacy` parameter a automatically. However, key objects, such as `MnemonicKey`, `RawKey` or `CLIKey` do not. `createSignatureAmino`is one such method where you can specifiy if you'd like to use Terra Classic.

```ts
 public async createSignatureAmino(
      tx: SignDoc,
      legacy?: boolean
    ): Promise<SignatureV2> { ... }

```
