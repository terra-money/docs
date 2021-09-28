# Columbus-5 Upgrade

Columbus-5 is the newest iteration of the Terra Mainnet. Use these guides to upgrade to Columbus-5.

## Migration Guides

- [Columbus-5 Upgrade Guide](https://github.com/terra-money/mainnet/wiki/Columbus-5-Upgrade-Instructions)
- [Cosmwasm Migration Guide](https://github.com/CosmWasm/cosmwasm/blob/main/MIGRATING.md)
- [Wallet Migration Guide](https://github.com/terra-money/mainnet/wiki/Columbus-5-Wallet-Migration-Guide)
- [Contract Migration Guide](https://github.com/terra-money/mainnet/wiki/Columbus-5-Contract-Migration-Guide)
- [Bombay-12 Testnet](https://github.com/terra-money/testnet/tree/master/bombay-12)

## Columbus-5

Columbus-5 will use Terra Core v0.5.5 which integrates Cosmos SDK v0.43.0 and CosmWasm v0.16.0.

- [Release Binary](https://github.com/terra-money/core/releases/tag/v0.5.5)

```
$ terrad version
name: terra
server_name: terrad
version: 0.5.5
commit: d8e277626e74f9d6417dcd598574686882f0274c
build_tags: netgo,ledger
go: go version go1.16.5 darwin/amd64
```

- **Note:** For JavaScript developers: `npm i -S @terra-money/terra.js@^2`

### Schedule
**Columbus-5:** Columbus-4 will be halted at block height `#4,724,000`.  
Expected Timeline:

>Wed Sep 29 2021 23:00:00 GMT-0800 (PDT)
Thu Sep 30 2021 07:00:00 GMT+0000 (UTC)
Thu Sep 30 2021 16:00:00 GMT+0900 (KST)

### Bombay-12 Testnet

The genesis event for Bombay-12 testnet will occur 2021-09-28T09:00:00Z (UTC).
For detailed instructions, see the [Bombay-12 testnet release guide](https://github.com/terra-money/testnet/tree/master/bombay-12).

### Major Updates

- [Terra Mainnet Changelog](https://github.com/terra-money/core/blob/main/CHANGELOG.md)
- [Cosmos SDK breaking changes](https://docs.cosmos.network/master/migrations/rest.html)
- [Cosmos SDK v0.43.0 (Stargate)](https://github.com/cosmos/cosmos-sdk/releases/tag/v0.43.0)
- [CosmWasm v0.16.0](https://github.com/CosmWasm/cosmwasm/releases/tag/v0.16.0)
- All seigniorage is now burned:
  - Change seigniorage `reward_weight` to 1
  - `1-reward_weight` will go to the community pool.
  - `max_change` of `reward_weight` is now 0
- Swap fees now dividend to faithful oracles instead of being burned.
- IBC [v1.1.0.](https://github.com/cosmos/ibc-go/releases/tag/v1.1.0) is now supported.

### Release Notes

- [Terra Core v0.5.5](https://github.com/terra-money/core/releases/tag/v0.5.5)  
- [Cosmos SDK v0.43.0 (Stargate)](https://github.com/cosmos/cosmos-sdk/releases/tag/v0.43.0)  
- [CosmWasm v0.16.0](https://github.com/CosmWasm/cosmwasm/releases/tag/v0.16.0)  

### Reference

- [Terra Core priorities for Q1/Q2 2021 (Agora)](https://agora.terra.money/t/terra-core-priorities-for-q1-q2-2021/388)
- [Columbus-5 & Bombay-09 Update (Medium)](https://medium.com/terra-money/columbus-5-bombay-09-update-4fdf94da0fe6)
- [Governance Proposal 119](https://station.terra.money/proposal/119)
- [Terra Mainnet Wiki](https://github.com/terra-money/mainnet/wiki)
- [Columbus-5 official announcements](https://github.com/terra-money/mainnet/wiki/Columbus-5-Official-Announcements)
