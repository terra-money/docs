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

- [`auth`](https://terra-money.github.io/terra.js/classes/AuthAPI.html)
- [`bank`](https://terra-money.github.io/terra.js/classes/BankAPI.html)
- [`distribution`](https://terra-money.github.io/terra.js/classes/DistributionAPI.html)
- [`gov`](https://terra-money.github.io/terra.js/classes/GovAPI.html)
- [`market`](https://terra-money.github.io/terra.js/classes/MarketAPI.html)
- [`mint`](https://terra-money.github.io/terra.js/classes/MintAPI.html)
- [`msgauth`](https://terra-money.github.io/terra.js/classes/MsgAuthAPI.html)
- [`oracle`](https://terra-money.github.io/terra.js/classes/OracleAPI.html)
- [`slashing`](https://terra-money.github.io/terra.js/classes/SlashingAPI.html)
- [`staking`](https://terra-money.github.io/terra.js/classes/StakingAPI.html)
- [`supply`](https://terra-money.github.io/terra.js/classes/SupplyAPI.html)
- [`tendermint`](https://terra-money.github.io/terra.js/classes/TendermintAPI.html)
- [`treasury`](https://terra-money.github.io/terra.js/classes/TreasuryAPI.html)
- [`tx`](https://terra-money.github.io/terra.js/classes/TxAPI.html)
- [`wasm`](https://terra-money.github.io/terra.js/classes/WasmAPI.html)
