# Overview

## TL;DR

Using diversified staking yields, money markets and the ANC token incentives and governance, the Anchor Protocol composes a fully decentralized fixed income instrument.&#x20;

1. **Governance sets the “Anchor Rate”** … the “Anchor Rate” is the target APY anchor seeks to pay out to depositors. A quorum of ANC gov token holders vote to set the \`Anchor Rate\` parameter.&#x20;
2. **Staking rewards make up the “real yield”** … underneath the hood, Anchor implements the classical money market, with the caveat that whitelisted collateral is reserved for liquid staking derivatives of major PoS protocols. The collateral earns staking rewards, making up the real yield.&#x20;
3. **The "real yield" is stabilized around the "Anchor Rate"**  … reserves and borrowing incentives help the real yield to converge to the Anchor Rate.&#x20;
   1. If real yield > Anchor Rate, the excess yield is stored in a UST denominated “yield reserve”. ANC incentives to borrowers drop by 15% every week.&#x20;
   2. If real yield < Anchor Rate, the yield shortfall is drawn down from the yield reserve until it is depleted. Additionally, ANC incentives to borrowers increase by 50% every week until the real yield converges to the Anchor Rate.

## Components

Anchor Protocol can be subdivided to the below components:

| Component                                                        | Description                                                                                |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [Bonded Assets (bAssets)](bonded-assets-bassets/README.md)                | Tokenized representations of bonded PoS assets                                             |
| [Money Market](money-market/README.md)                                    | Handles lending and borrowing of Terra stablecoins, with borrows collateralized by bAssets |
| [Liquidation Contract](./loan-liquidation.md)                      | Manages collateral liquidations of loans at risk of undercollateralization                 |
| [Anchor Token (ANC) Contracts](../smart-contracts/anchor-token/README.md) | Handles ANC-related operations and Anchor governance                                       |

## Protocol Participants

Four types of users exist in the Anchor ecosystem: **depositors** (lenders), **borrowers**, **liquidators**, and **ANC liquidity providers**. Anchor also requires **oracle feeders**, critical for providing the necessary infrastructure.

In Anchor Protocol, depositors are incentivized to lend Terra stablecoins to Anchor's money market, which is borrowed out by borrowers through bAsset collateralized loans. Interest paid by borrowers are given to depositors, along with subsidies generated from rewards of deposited bAsset collaterals. In addition, the protocol prevents borrowers from forming liabilities in excess of collateral value by incentivizing liquidators to observe and liquidate loans at risk of undercollateralization.



### Depositor (Lender)

A **Depositor** is a user that lends Terra stablecoins to the Anchor money market. Deposited stablecoins are pooled and lent out to borrowers, with accrued interest pro-rata distributed to all depositors.

Depositors receive newly minted [Anchor Terra (aTerra)](./money-market/README.md#usage) in exchange for their deposit. aTerra tokens represent a depositor's share in the stablecoin pool and can later be redeemed to claim the initial stablecoin deposit, along with accrued interest and depositor subsidies.



### Borrower

**Borrowers** are entities that create bAsset-collateralized loan positions to borrow Terra stablecoins from the Anchor money market. bAssets that were whitelisted by Anchor can be deposited and locked to create a loan position. Positions are required to maintain a [loan-to-value (LTV)](./money-market/README.md#borrowing-terra-stablecoins) ratio below the set maximum.

By borrowing, users can gain access to liquidity without losing price exposure to their bAsset collateral. Borrowers are recommended to keep a close eye on their loan position's LTV ratio, as loans with LTV ratios over the set maximum are subject to liquidation.

Anchor Protocol distributes [Anchor Tokens](./anchor-token-anc.md) as incentives for borrowers. Further details on borrower ANC distribution can be found [here](./money-market/deposit-rate-subsidization.md#borrower-anc-incentives).



### Liquidator

A **Liquidator** monitors for the existence of risky loans (loans with an LTV ratio above the set maximum) and requests loan collaterals to be liquidated if necessary. Before liquidating a loan, liquidators must submit a bid to the Liquidation Contract, offering to purchase the liquidated collateral in exchange for the liquidator's Terra stablecoins.

Collaterals are liquidated by executing bids in the Liquidation Contract. Only bids that were submitted by the liquidator can be executed; the liquidator triggering liquidations must have a pre-existing bid submitted by them. On execution, the liquidator receives the collateral tokens at a discounted rate, and stablecoins in the liquidator's bid is used to repay the liquidated borrower's loan.



### ANC Liquidity Provider

**ANC Liquidity Providers** are entities that provide liquidity to the ANC-UST Terraswap Pair. They manage the initial bootstrapping of the exchange liquidity between ANC tokens and UST. ANC exchange liquidity is critical as ANC tokens are distributed as borrower incentives, used to calibrate the stablecoin deposit rate.



### Oracle Feeder

An **Oracle Feeder** is a Terra account that is responsible for providing an accurate and up-to-date price feed for bAsset collaterals. Fed-in price data is used to calculate the collateral value of a borrower, also used as the reference price in the Liquidation Contract.

As an entity crucial for protocol operation, Anchor's oracle feeder is initially set as the creator of Anchor Protocol. Through governance, support can be extended to third-party oracle feeders as the protocol further matures.

## Tokens

| Name                                                       | Type               | Function                                |
| ---------------------------------------------------------- | ------------------ | --------------------------------------- |
| TerraUSD (UST)                                             | Native Terra Token | Stablecoin                              |
| [Bonded Assets (bAssets)](./bonded-assets-bassets/README.md)          | Cw20 Token         | Loan collateral for Anchor money market |
| [Anchor Terra (aTerra)](./money-market/README.md#usage) | Cw20 Token         | Deposit receipt for Anchor money market |
| [Anchor Token (ANC)](./anchor-token-anc.md)                  | Cw20 Token         | Governance token for Anchor Protocol    |
