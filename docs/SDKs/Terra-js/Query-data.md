# Query data

After you're connected to the blockchain via an `LCDClient` instance, you can query data from it. Data access is organized into various module APIs, which are accessible from within the `LCDClient` instance. Because they make HTTP requests in the background, they are Promises that can be awaited in order to not block during network IO.

```ts
async main() {
  const marketParams = await terra.market.parameters();
  const exchangeRates = await terra.oracle.exchangeRates();
  console.log(marketParams.base_pool);
  console.log(exchangeRates.get('uusd'));
}

main();
```

Each module has its own set of querying functions. To get a comprehensive list, explore the module documentation:

- [`auth`](https://terra-money.github.io/terra.js/modules/client_lcd_api_AuthAPI.html)
- [`bank`](https://terra-money.github.io/terra.js/modules/client_lcd_api_BankAPI.html)
- [`distribution`](https://terra-money.github.io/terra.js/modules/client_lcd_api_DistributionAPI.html)
- [`gov`](https://terra-money.github.io/terra.js/modules/client_lcd_api_GovAPI.html)
- [`market`](https://terra-money.github.io/terra.js/modules/client_lcd_api_MarketAPI.html)
- [`mint`](https://terra-money.github.io/terra.js/modules/client_lcd_api_MintAPI.html)
- [`msgauth`](https://terra-money.github.io/terra.js/modules/client_lcd_api_MsgAuthAPI.html)
- [`oracle`](https://terra-money.github.io/terra.js/modules/client_lcd_api_OracleAPI.html)
- [`slashing`](https://terra-money.github.io/terra.js/modules/client_lcd_api_SlashingAPI.html)
- [`staking`](https://terra-money.github.io/terra.js/modules/client_lcd_api_StakingAPI.html)
- [`supply`](https://terra-money.github.io/terra.js/modules/client_lcd_api_SupplyAPI.html)
- [`tendermint`](https://terra-money.github.io/terra.js/modules/client_lcd_api_TendermintAPI.html)
- [`treasury`](https://terra-money.github.io/terra.js/modules/client_lcd_api_TreasuryAPI.html)
- [`tx`](https://terra-money.github.io/terra.js/modules/client_lcd_api_TxAPI.html)
- [`wasm`](https://terra-money.github.io/terra.js/modules/client_lcd_api_WasmAPI.html)
