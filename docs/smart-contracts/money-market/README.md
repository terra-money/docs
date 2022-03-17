# Money Market

This section describes provides a high-level overview of Anchor Protocol's Money Market contracts.

::: {warning}
Even with a thorough understanding of Anchor Protocol, it is highly recommended to interact with Anchor through client channels such as the Anchor WebApp or [Anchor.js](../../developers-terra/anchor.js.md).
:::

## Smart Contracts

| Contract                                       | Function                                                                       |
| ---------------------------------------------- | ------------------------------------------------------------------------------ |
| [Overseer](overseer.md)                        | Manages money market overalls, stores borrower information                     |
| [Market](market.md)                            | Handles Terra stablecoin deposits and borrows, ANC distribution to borrowers   |
| [Custody \[bLuna\]](custody-bluna-specific.md) | Handles bLuna collateral deposits and withdrawals                              |
| [Interest Model](interest-model.md)            | Calculates the current borrow interest rate based on the market situation      |
| [Distribution Model](distribution-model.md)    | Calculates the borrower ANC emission rate based on the previous emission rate. |
| [Oracle](oracle.md)                            | Provides a price feed for bAsset collaterals                                   |

```{toctree}
:hidden:
overseer
market
custody-bluna-specific
custody-beth
interest-model
distribution-model
oracle
```