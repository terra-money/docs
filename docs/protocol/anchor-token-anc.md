# Anchor Token (ANC)



![](../assets/ANC\_300x300.png)



The **Anchor Token** (**ANC**) is Anchor Protocol's governance token. ANC tokens can be deposited to create new governance polls, which can be voted on by users that have staked ANC.

ANC is designed to **capture a portion of Anchor's yield**, allowing its **value to scale linearly with Anchor's assets under management (AUM)**. Anchor distributes protocol fees to ANC stakers pro-rata to their stake, benefitting stakers as adoption of Anchor increases -- stakers of ANC are incentivized to propose, discuss, and vote for proposals that further merit the protocol.

ANC tokens are also used as incentives to bootstrap borrow demand and provide initial deposit rate stability. The protocol distributes ANC tokens every block to stablecoin borrowers, proportional to the amount borrowed.

## Value Accrual

:::{note}
ANC rewards can also be earned by staking LP tokens of the ANC-UST Terraswap Pair.
:::

![ANC Value Flow](../assets/anc-value-flow.png)

ANC tokens generate a buying pressure that increases proportionally with Anchor's AUM. Protocol fees are used to purchase ANC tokens from Terraswap, which are then distributed as staking rewards to ANC stakers.

### Protocol Fees

ANC captures protocol fees generated from Anchor, where 10% of the value flowing into the yield reserve is used for the value accrual of ANC tokens. Anchor's protocol fees are sourced from bAsset rewards, excess yield, and collateral liquidation fees.

#### bAsset Rewards

A portion of rewards from deposited bAsset collaterals are used to purchase ANC, with the remainder used to replenish the yield reserve. The ratio of bAsset rewards used for ANC purchases can be adjusted through governance if the yield reserve's inventory rises to a sufficient level.

#### Excess Yield

Deposit yields in excess of the target deposit rate are accumulated to the yield reserve, with a portion used to purchase ANC. Purchased ANC tokens are then redistributed to ANC stakers.

#### Collateral Liquidation Fees

Whenever a loan is liquidated, 1% of the liquidated collateral value is sent to the yield reserve, a portion of which is used to purchase ANC. This fee is applied separately from [bid premiums](./loan-liquidation.md#premium-rate).



### Governance Fees

ANC token deposits of Anchor governance polls that have failed to reach the required quorum are redistributed to ANC stakers as staking rewards.

## Anchor Token Supply

:::{note}
The token distribution schedule listed below was estimated assuming the maximum borrower ANC emission rate (`Emission Cap`). At the maximum emssion rate, this distribution is expected to happen over 4 years. In practice, it is highly likely that the rate of ANC distribution to borrowers will be lower than the estimated values, increasing the distribution period to over 4 years.&#x20;
:::

A total of **1,000,000,000 ANC** tokens are to be distributed over a period of at least 4 years. Once this total supply is distributed, there will be no more new ANC tokens introduced to the supply.

### Annual ANC Distribution Schedule

|                      | Genesis | Year 1  | Year 2 | Year 3 | Year 4 |
| -------------------- | ------- | ------- | ------ | ------ | ------ |
| Investors            | 0       | 100M    | 100M   | 0      | 0      |
| Team                 | 0       | 25M     | 25M    | 25M    | 25M    |
| Luna Staking Airdrop | 50M     | 0       | 0      | 0      | 0      |
| Luna Staking Rewards | 0       | 50M     | 50M    | 0      | 0      |
| Borrower Incentives  | 0       | 100M    | 100M   | 100M   | 100M   |
| ANC LP Incentives    | 0       | 50      | 0      | 0      | 0      |
| Community Fund       | 100     | 0       | 0      | 0      | 0      |
| **Token Supply**     | 150M    | 475M    | 750M   | 875M   | 1,000M |
| Annual Inflation (%) | nil     | 216.67% | 57.89% | 16.67% | 14.29% |

(M = Millions)

### Genesis Token Distribution

![](<../.gitbook/assets/Genesis Token Distribution.png>)

A total of **150M ANC** tokens are released at the genesis of Anchor Protocol. The initial distribution of ANC is given to:

* **LUNA staking airdrop**: 50M (33.3%) tokens will be airdropped to LUNA stakers, with staked amounts snapshotted at block **2179600**.
* **Community fund**: 100M (66.7%) tokens will be reserved for the Anchor Community Fund.

### Final Token Distribution

![](<../.gitbook/assets/Final Token Distribution (1).png>)

The remaining ANC tokens are set to be released over a period of at least 4 years, increasing total supply until it reaches **1,000,000,000 ANC**. The final distribution structure will be:

* **Investors**: 200M (20%) tokens are allocated to investors of Anchor, with a 6-month lockup period. Afterwards, a 1-year linear vesting schedule is applied.
* **Team**: 100M (10%) tokens are allocated to the creators of Anchor, with a 4-year vesting period. Tokens are to be released at every end-of-year.
* **LUNA staking airdrop**: 50M (5%) tokens are airdropped to LUNA stakers on launch.
* **LUNA staking rewards**: 100M (10%) tokens are linearly distributed to LUNA stakers over a period of 2 years. Tokens will be distributed every 100,000 blocks (approximately every week) starting from block **2179600**. Snapshots are taken every 100,000 blocks to determine distribution eligibility.
* **Borrower incentives**: 400M (40%) tokens are algorithmically released to be used as borrower incentives. This release happens over a period of at least 4 years, assuming the maximum borrower ANC emission rate. If after 4 years the borrower incentive distribution is less than 400M, the distribution period will continue until all tokens have been released.&#x20;
* **ANC LP staking rewards**: 50M (5%) tokens are linearly distributed to the ANC-UST pair liquidity providers over a period of 1 year.
* **Community fund**: 100M (10%) tokens will be reserved for the Anchor Community Fund.

#### Inflation Rate

The Inflation rate of ANC tokens is designed to gradually decrease every year until a final total of **1 Billion ANC** have been distributed. After ANC supply reaches its issuance, no more ANC tokens will be created.&#x20;

## Distribution to Ecosystem Participants

### Distribution to Borrowers

ANC tokens allocated for borrower incentives are gradually distributed to borrowers through the [ANC emission control algorithm](./money-market/deposit-rate-subsidization.md#anc-emission-feedback-control). This is further distributed to individual borrowers pro-rata to their amount of accrued borrow interest.&#x20;

ANC incentives fuel a self-reinforcing adoption cycle, incentivizing more borrowers to deposit bAsset collaterals, bringing further buying pressure to ANC, further increasing borrow incentives.

### Distribution to ANC Liquidity Providers

Since ANC tokens use borrower incentives to stimulate initial borrow demand and deposit rate stability, high exchange liquidity for ANC is crucial for maintaining a constant incentive flow.

To incentivize the initial exchange liquidity of ANC, newly minted ANC will also be distributed to those that provide liquidity to ANC, specifically on the ANC-UST Terraswap pair. Tokens are given to stakers of the ANC-UST Terraswap pair LP tokens.
