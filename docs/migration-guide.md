# Columbus-5 Upgrade

Columbus-5 is the newest iteration of the Terra Mainnet. Use these guides to upgrade to Columbus-5.

## Migration Guides

- [Columbus-5 Upgrade Guide](https://github.com/terra-money/mainnet/wiki/%5BWIP%5D-Columbus-5-Upgrade-Instructions)
- [Cosmwasm Migration Guide](https://github.com/CosmWasm/cosmwasm/blob/main/MIGRATING.md)
- [Wallet Migration Guide](https://github.com/terra-money/mainnet/wiki/Columbus-5-Wallet-Migration-Guide)
- [Contract Migration Guide](https://github.com/terra-money/mainnet/wiki/Columbus-5-Contract-Migration-Guide)
- [Bombay-9 Testnet](https://github.com/terra-money/testnet/tree/master/bombay-9)

## Columbus-5

Columbus-5 will use Terra Core v0.5.0 which integrates Cosmos SDK v0.43.0 and CosmWasm v0.16.0.

- [Release Binary](https://github.com/terra-money/core/releases/tag/v0.5.0)

```
$ terrad version --long
name: terra
server_name: terrad
version: 0.5.0
commit: d6037b9a12c8bf6b09fe861c8ad93456aac5eebb
build_tags: netgo,ledger
go: go version go1.16.5 darwin/amd64
```

- **Note:** For JavaScript developers: `npm i -S @terra-money/terra.js@^2`

### Bombay-9 Testnet

We will launch the Bombay-9 testnet network and retire Bombay-0008.
For detailed instructions, see [Bombay-9 testnet](https://github.com/terra-money/testnet/tree/master/bombay-9).

### Major Updates

- [Terra Mainnet Changelog](https://github.com/terra-money/core/blob/main/CHANGELOG.md)
- [Cosmos SDK breaking changes](https://docs.cosmos.network/master/migrations/rest.html)
- [Cosmos SDK v0.43.0 (Stargate)](https://github.com/cosmos/cosmos-sdk/releases/tag/v0.43.0)
- [CosmWasm v0.16.0](https://github.com/CosmWasm/cosmwasm/releases/tag/v0.16.0)
- All Seignorage is now burned:
  - Change seigniorage `reward_weight` to 1
  - `1-reward_weight` will go to the community pool.
  - `max_change` of `reward_weight` is now 0
- Swap fees now go to faithful oracles instead of being burned.
- IBC v1.0.0. is now supported

### Schedule
**Columbus-5:** Columbus-4 will be halted at block height `#4,460,000`.  
Expected Timeline:

>Thu Sep 09 2021 08:00:00 GMT+0000 (UTC)  
Thu Sep 09 2021 00:00:00 GMT-0800 (PST)  
Thu Sep 09 2021 17:00:00 GMT+0900 (KST)

**Bombay-9:** Tequila-4 will be forked at block height `#5,335,000`:

>Fri Aug 13 08:00:00 GMT+0000 (UTC)  
Fri Aug 13 00:00:00 GMT-0800 (PST)  
Fri Aug 13 17:00:00 GMT+0900 (KST)

### Release Notes

- [Terra Core v0.5.0](https://github.com/terra-money/core/releases/tag/v0.5.0)  
- [Cosmos SDK v0.43.0 (Stargate)](https://github.com/cosmos/cosmos-sdk/releases/tag/v0.43.0)  
- [CosmWasm v0.16.0](https://github.com/CosmWasm/cosmwasm/releases/tag/v0.16.0)  

### Reference

- [Terra Core priorities for Q1/Q2 2021 (Agora)](https://agora.terra.money/t/terra-core-priorities-for-q1-q2-2021/388)
- [Columbus-5 & Bombay-09 Update (Medium)](https://medium.com/terra-money/columbus-5-bombay-09-update-4fdf94da0fe6)
- [Governance Proposal 119](https://station.terra.money/proposal/119)
- [Terra Mainnet Wiki](https://github.com/terra-money/mainnet/wiki)
