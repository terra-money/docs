# Anchor Docs

You can access Anchor through the official [Web App](notion://www.notion.so/o/-MNbAlnRtgggkJfdtVsn/s/-MT-6Wb5pEQsulIrcwGJ/~/changes/gr4a3xt6eOR5RbmxYYbY/user-guide/webapp).

Welcome to the Anchor documentation site.

## What is Anchor?

**Anchor** is a decentralized savings protocol offering low-volatile yields on Terra stablecoin deposits. The Anchor rate is powered by a diversified stream of staking rewards from major proof-of-stake blockchains, and therefore can be expected to be much more stable than money market interest rates.  The Anchor community believes that a stable, reliable source of yield in Anchor has the opportunity to become the reference interest rate in crypto.

The Anchor protocol defines a money market between a **lender**, looking to earn stable yields on their stablecoins, and a **borrower**, looking to borrow stablecoins on stakeable assets. To borrow stablecoins, the borrower locks up [Bonded Assets](/docs/protocol/bonded-assets/README.md) (bAssets) as collateral, and borrows stablecoins below the protocol-defined borrowing ratio. The diversified stream of staking rewards accruing to the global pool of collateral then gets converted to stablecoin, and then conferred to the lender in the form of a stable yield.

Deposited stablecoins are represented by [Anchor Terra (aTerra)](docs/protocol/money-market/README.md#anchor-terra-aterra). aTerra tokens are redeemable for the initial deposit along with accrued interest, allowing interest collection to be done just by holding on to them. Anchor is structured to provide depositors with:

- **High, stable deposit yields** powered by rewards of [bAsset collaterals](docs/protocol/money-market.md#borrowing-terra-stablecoins)
    
- **Instant withdrawals** through [pooled lending](docs/protocol/money-market#depositing-terra-stablecoins) of stablecoin deposits
    
- **Principal protection** via [liquidation](/docs/protocol/loan-liquidation.md) of loans in risk of undercollateralization
    

Anchor is an open, permissionless savings protocol, meaning that any third-party application is free to connect and earn interest without restrictions. Through [Anchor Earn](/docs/developers-earn/anchor-earn-sdk.md), [Anchor.js](/docs/developers-terra/anchorjs.md), or [EthAnchor](/docs/developers-ethereum-legacy/ethanchor.md), developers can interact with Anchor using just a few lines of code.

Further documentation of the Anchor Protocol is provided in the following pages.

## Sections

Learn more about Anchor Protocol, its core smart contracts, and Javascript SDK.

- Learn more about the [Protocol](notion://www.notion.so/o/-MNbAlnRtgggkJfdtVsn/s/-MT-6Wb5pEQsulIrcwGJ/~/changes/gr4a3xt6eOR5RbmxYYbY/protocol/overview).
    
- Read up on the specifications for the [Anchor Protocol](https://anchorprotocol.com/docs/anchor-v1.1.pdf) and [bAssets](https://anchorprotocol.com/docs/The_bAsset_Protocol.pdf).
    
- Check out the [Smart Contracts](notion://www.notion.so/o/-MNbAlnRtgggkJfdtVsn/s/-MT-6Wb5pEQsulIrcwGJ/~/changes/gr4a3xt6eOR5RbmxYYbY/smart-contracts/deployed-contracts).
    
- Build savings apps with [Anchor Earn](notion://www.notion.so/o/-MNbAlnRtgggkJfdtVsn/s/-MT-6Wb5pEQsulIrcwGJ/~/changes/gr4a3xt6eOR5RbmxYYbY/developers-earn/anchor-earn-sdk).
    
- Build apps using [Anchor.js](notion://www.notion.so/o/-MNbAlnRtgggkJfdtVsn/s/-MT-6Wb5pEQsulIrcwGJ/~/changes/gr4a3xt6eOR5RbmxYYbY/developers-terra/anchor.js).
    
- Cross chain apps on Ethereum using [EthAnchor](notion://www.notion.so/o/-MNbAlnRtgggkJfdtVsn/s/-MT-6Wb5pEQsulIrcwGJ/~/changes/gr4a3xt6eOR5RbmxYYbY/developers-ethereum/ethanchor)
    

## Community

- [Telegram](https://t.me/anchor_official)
    
- [Twitter](https://twitter.com/anchor_protocol)
    
- [Discord](https://discord.gg/9aUYgpKZ9c)
    
- [Forum](https://forum.anchorprotocol.com/)


```{toctree}
:hidden:
docs/security
```

```{toctree}
:hidden:
:caption: Protocol
docs/protocol/overview
docs/protocol/bonded-assets/README
docs/protocol/money-market/README
docs/protocol/loan-liquidation
docs/protocol/anchor-token
docs/protocol/anchor-governance/README
```

```{toctree}
:hidden:
:caption: User guide
docs/user-guide/interchain
docs/user-guide/webapp/README
```


```{toctree}
:hidden:
:caption: EthAnchor
/docs/ethanchor/ethanchor
/docs/ethanchor/ethanchor-contracts/README
/docs/ethanchor/fees
```

```{toctree}
:hidden:
:caption: Developers-Earn
/docs/developers-earn/anchor-earn-sdk
/docs/developers-earn/example-usage
/docs/developers-earn/appendix
```

```{toctree}
:hidden:
:caption: Developers-Terra
/docs/developers-terra/anchorjs
/docs/developers-terra/anchorcli
```

```{toctree}
:hidden:
:caption: Smart contracts
/docs/smart-contracts/deployed-contracts
/docs/smart-contracts/bluna/README
/docs/smart-contracts/beth/README
/docs/smart-contracts/money-market/README
/docs/smart-contracts/liquidation/README
/docs/smart-contracts/anchor-token/README
```

```{toctree}
:hidden:
:caption: Developers-Ethereum [Legacy]
/docs/developers-ethereum-legacy/ethanchor
/docs/developers-ethereum-legacy/ethanchor-account-contract
/docs/developers-ethereum-legacy/ethanchor-api/README
/docs/developers-ethereum-legacy/fees
```

```{toctree}
:hidden:
:caption: External Resources
Anchor Webapp <https://app.anchorprotocol.com/>
Anchor Protocol Github <https://github.com/Anchor-Protocol>
Terra Blockchain <https://docs.terra.money/>
Anchor Bug Bounty Program <https://immunefi.com/bounty/anchor/>
```