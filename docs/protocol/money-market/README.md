# Money Market

:::{note}
ANC tokens are distributed to borrowers in the Anchor money market. For additional information on ANC distribution, see [here](./../anchor-token-anc.md#distribution-to-ecosystem-participants).
:::

Anchor's money market is a Compound-inspired lending protocol for lending out deposited Terra stablecoins to borrowers. Anchor sources its deposit yields from bAsset-collateralized loans, where rewards of their bAsset collaterals are utilized to subsidize the deposit rate.

The protocol leverages bAsset rewards to catalyze a positive usage cycle: subsidies incentivize new stablecoin deposits, lowering the borrow rate, which incentivizes more bAsset-collateralized loans, and enables more bAsset rewards to be collected.

## Concepts

### Index-Based Interest Accrual

Interest on borrows are computed via the interest index. The interest index exists in two forms, a global value and a user-specifically stored value.

#### Global Interest Index

The global interest index acts as the reference value for interest accrual, tracking the amount of interest that a single unit of Terra stablecoin liability would have accrued since protocol creation.

For every user interaction, the global interest index is updated to reflect the interest accrued since last user interaction. The effective interest rate between current time $\text{t}_\text{2}$ and the time of last user interaction $\text{t}_\text{1}$ is proportional to the [borrow rate](./README.md#algorithmic-interest-rate) at $\text{t}_\text{1}$ :

$$
\text{effectiveRate} = \text{borrowRate}_{\text{t}_\text{1}}\cdot(\text{t}_\text{2}-\text{t}_\text{1})
$$

To account for the interest accrual of $\text{effectiveRate}$, the global interest index $\text{Index}_{\text{global},\,\text{t}_\text{1}}$ is updated to the interest-accrued value of $\text{Index}_{\text{global},\,\text{t}_\text{2}}$ :

$$
\text{Index}_{\text{global},\,\text{t}_\text{2}} = \text{Index}_{\text{global},\,\text{t}_\text{1}}\cdot(1+ \text{effectiveRate})
$$

Note that interest only compounds when a user interaction occurs.

#### User Interest Index

For calculating the amount of borrow interest accrued to a specific borrower, the protocol snapshots the global interest index at the time of user's interaction. The snapshotted global index is stored as a user-specific value, named the user's interest index.

Whenever a user makes an interaction, interest is accrued for the specific user's liability. If the stored user's interest index value is $\text{Index}_{\text{user}}$ and the current global interest index is $\text{Index}_{\text{global}}$ , the user's previous borrow liability amount of $\text{liability}_{\text{user},\,\text{prev}}$ is updated to an interest accrued value of $\text{liability}_{\text{user},\,\text{current}}$ by:

$$
\text{liability}_{\text{user},\,\text{current}} = \text{liability}_{\text{user},\,\text{prev}}\cdot\frac{\text{Index}_\text{global}}{\text{Index}_{\text{user}}}
$$

After the user's liability is updated to an interest-accrued value, the user's interest index is updated to the current global interest index.

## Usage

### Depositing Terra Stablecoins

The money market aggregates stablecoin deposits with matching denominations into a pool, called **markets**. Borrows are proceeded from this pool, and interest gained from them is equally shared among all unit of stablecoin deposits.

This pooling of deposits enable markets to have high liquidity. Deposits can be withdrawn anytime, unless every stablecoin in a market is borrowed.

Deposit interest is distributed through the value appreciation of Anchor Terra (aTerra), which are minted to depositors as a deposit receipt.

#### Anchor Terra (aTerra)

aTerra balances represent a depositor's share in the market. The exchange rate with their underlying stablecoin, the **aTerra exchange rate**, increases as deposits accrue interest, appreciating the value of aTerra. With time, holders can redeem aTerra with a greater number of underlying stablecoins, enabling depositors to collect interest simply by holding them.

The aTerra exchange rate is defined as:

$$
\text{aTerraExchangeRate} = \frac{\text{liquidity} + \text{liabilities}}{\text{aTerraSupply}}
$$

where $\text{liquidity}$ and $\text{liabilities}$ each refer to the amount of deposited stablecoins that are yet to be lent out, and the interest-accrued amount of lent out stablecoins.

#### Yield Reserve Collection

Every epoch, rewards of deposited bAsset collaterals are collected by the money market. Claimed bAsset rewards, which are likely to be in a non-stablecoin denomination, are converted to Terra stablecoins and stockpiled separately in the market's **yield reserve** pool.&#x20;

This process can only be triggered at most once in a 3-hour period. Markets wait for bAsset rewards to be transferred to the Terra blockchain as reward claims of bAssets (excluding bLuna) involve a cross-chain transaction. Auxiliary operations such as [ANC emission rate readjustment](./deposit-rate-subsidization.md#borrower-anc-incentives) and [yield reserve distribution](./deposit-rate-subsidization.md#direct-subsidization) are also conducted during this time.



### Borrowing Terra Stablecoins

Terra stablecoins can be borrowed from the money market by creating a **loan position** with whitelisted bAssets as collateral. An account can only own a single loan position, though a user may create more loan positions with the use of multiple accounts.

bAssets collaterals are locked to open a loan position. Users are allowed to lock multiple bAsset types to a single position, diversifying collateral price exposure.

#### Borrow Limit

Borrows can be made until the user's liability reaches their position's **borrow limit**. The borrow limit is yielded as the sum of locked collateral value, times the maximum LTV ratio of collateral:

$$
\text{borrowLimit} = \sum \text{amountLocked} \cdot \text{bAssetPrice} \cdot \text{maxLTV}
$$

One should observe that the borrow limit fluctuates with the oracle-reported bAsset price. Loan positions with a liability higher than their borrow limit are subject to [liquidation](../loan-liquidation.md), where their collaterals are converted to stablecoins to repay their liabilities.

To prevent liquidation, borrowers can lock additional collateral to their position and increase their borrow limit. Collaterals can also be unlocked and withdrawn from a loan position, as long as the borrower's liability does not exceed the position's borrow limit.



### Algorithmic Interest Rate

Stablecoins borrowed from a market all follow a unified, algorithmically determined borrow rate. The applied borrow rate constantly adjusts based on the market supply and demand for stablecoins, set to increase as a function of the utilization ratio.

#### Utilization Ratio

The utilization ratio quantifies a stablecoin's borrow demand relative to the amount of deposited stablecoins. In a market with $\text{stablecoinsDeposited}$ amount of deposits and $\text{stablecoinsLent}$ amount of borrows, utilization ratio is calculated as:

$$
\text{utilizationRatio} = \frac{\text{stablecoinsLent}}{\text{stablecoinsDeposited}}
$$

where $\text{stablecoinsLent}$ and $\text{stablecoinsDeposited}$ are both interest-accrued values.

#### Borrow Rate Model

The stablecoin borrow rate increases proportionally with the utilization ratio. Parameter values of the equation are initially configured to accrue a **30%** annualized borrow rate when the utilization ratio is at **66.7%**, with a minimum base borrow rate of **2%**.

$$
\text{borrowRate} = \text{utilizationRatio} \cdot \text{interestMultiplier} + \text{baseRate}
$$

The borrow rate equation incentivizes markets to have sufficient liquidity at their equilibrium. An increase in borrow demand is met with higher borrow rates, incentivizing repayments, and restoring market liquidity.

```{toctree}
:hidden:
deposit-rate-subsidization
```
