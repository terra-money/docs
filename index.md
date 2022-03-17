# Home

You can access Anchor through the official [Web App](/docs/user-guide/webapp/README.md).

Welcome to the Anchor documentation site.

## What is Anchor?

**Anchor** is a decentralized savings protocol offering low-volatile yields on Terra stablecoin deposits. The Anchor rate is powered by a diversified stream of staking rewards from major proof-of-stake blockchains, and therefore can be expected to be much more stable than money market interest rates.  The Anchor community believes that a stable, reliable source of yield in Anchor has the opportunity to become the reference interest rate in crypto.

The Anchor protocol defines a money market between a **lender**, looking to earn stable yields on their stablecoins, and a **borrower**, looking to borrow stablecoins on stakeable assets. To borrow stablecoins, the borrower locks up [Bonded Assets](/docs/protocol/bonded-assets-bassets/README.md) (bAssets) as collateral, and borrows stablecoins below the protocol-defined borrowing ratio. The diversified stream of staking rewards accruing to the global pool of collateral then gets converted to stablecoin, and then conferred to the lender in the form of a stable yield.&#x20;

Deposited stablecoins are represented by [Anchor Terra (aTerra)](./docs/protocol/money-market/README.md#usage). aTerra tokens are redeemable for the initial deposit along with accrued interest, allowing interest collection to be done just by holding on to them. Anchor is structured to provide depositors with:

* **High, stable deposit yields** powered by rewards of [bAsset collaterals](./docs/protocol/money-market/README.md#algorithmic-interest-rate)
* **Instant withdrawals** through [pooled lending](./docs/protocol/money-market/README.md#depositing-terra-stablecoins) of stablecoin deposits
* **Principal protection** via [liquidation](/docs/protocol/loan-liquidation.md) of loans in risk of undercollateralization

Anchor is an open, permissionless savings protocol, meaning that any third-party application is free to connect and earn interest without restrictions. Through [Anchor Earn](/docs/developers-earn/anchor-earn-sdk.md), [Anchor.js](/docs/developers-terra/anchor.js.md) or [EthAnchor](/docs/developers-ethereum/ethanchor.md), developers can interact with Anchor using just a few lines of code.

Further documentation of the Anchor Protocol is provided in the following pages.

## Sections

Learn more about Anchor Protocol, its core smart contracts, and Javascript SDK.

* Learn more about the [Protocol](/docs/protocol/overview.md).
* Read up on the specifications for the [Anchor Protocol](https://anchorprotocol.com/docs/anchor-v1.1.pdf) and [bAssets](https://anchorprotocol.com/docs/The\_bAsset\_Protocol.pdf).&#x20;
* Check out the [Smart Contracts](/docs/smart-contracts/deployed-contracts.md).
* Build savings apps with [Anchor Earn](/docs/developers-earn/anchor-earn-sdk.md).
* Build apps using [Anchor.js](/docs/developers-terra/anchor.js.md).
* Cross chain apps on Ethereum using [EthAnchor](/docs/developers-ethereum/ethanchor.md)&#x20;

## Community

* [Telegram](https://t.me/anchor\_official)
* [Twitter](https://twitter.com/anchor\_protocol)
* [Discord](https://discord.gg/9aUYgpKZ9c)
* [Forum](https://forum.anchorprotocol.com)

```{toctree}
:hidden:
/docs/security
```

```{toctree}
:caption: Protocol
:hidden:
/docs/protocol/overview
/docs/protocol/bonded-assets-bassets/README
/docs/protocol/money-market/README
/docs/protocol/loan-liquidation
/docs/protocol/anchor-token-anc
/docs/protocol/anchor-governance/README
```

```{toctree}
:hidden:
```

```{toctree}
:caption: User Guide
:hidden:
/docs/user-guide/interchain-transfers
/docs/user-guide/webapp/README
```

```{toctree}
:caption: EthAnchor
:hidden:
/docs/ethanchor/ethanchor
/docs/ethanchor/ethanchor-contracts/README
/docs/ethanchor/fees
```

```{toctree}
:caption: Developers - Earn
:hidden:
/docs/developers-earn/anchor-earn-sdk
/docs/developers-earn/example-usage
/docs/developers-earn/appendix
```

```{toctree}
:caption: Developers - Terra
:hidden:
/docs/developers-terra/anchor.js.md
/docs/developers-terra/anchor-cli
```

```{toctree}
:caption: Smart Contracts
:hidden:
/docs/smart-contracts/deployed-contracts
/docs/smart-contracts/bluna/README
/docs/smart-contracts/beth/README
/docs/smart-contracts/money-market/README
/docs/smart-contracts/liquidations/README
/docs/smart-contracts/anchor-token/README
```

```{toctree}
:caption: Developers - Ethereum [Legacy]
:hidden:
/docs/developers-ethereum/ethanchor
/docs/developers-ethereum/ethanchor-account-contract
/docs/developers-ethereum/ethanchor-api/README
/docs/developers-ethereum/ethanchor-api/fees
```

```{toctree}
:caption: External Resources
:hidden:
Anchor WebApp <https://app.anchorprotocol.com>
Anchor Protocol GitHub <https://github.com/Anchor-Protocol>
Terra Blockchain <https://docs.terra.money>
Anchor Bug Bounty Program <https://immunefi.com/bounty/anchor/>
```