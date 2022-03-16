# Loan Liquidation

To prohibit borrowers from defaulting on their loans, Anchor incentivizes liquidators to observe and liquidate loans with a borrow amount above the allowed borrowing limit. The Liquidation Queue is used to convert collaterals of a liquidating loan to TerraUSD (UST), which are then used to repay the loan.

The Liquidation Queue serves as the exchange point between Anchor collateral and UST. Using Anchor's Oracle Contract as the reference price feed, conversions between whitelisted bAssets and UST are facilitated.

In addition to collateral liquidation, the Liquidation Queue handles calculations of collateral liquidation amounts in cases of [partial collateral liquidation](loan-liquidation.md#partial-liquidation).

## Bids

Collateral tokens are liquidated to UST by executing bids submitted to the Liquidation Queue. Bids are purchase offers for liquidated collaterals in exchange for UST, typically submitted by those that wish to exchange their UST with a certain collateral token at a discounted price.

### Properties

Bids are characterized by six properties: **bid ID**, **bidder**, **asset**, **size**, **premium slot**, and **activation time**.

* **Bid ID** - A bid's unique identifier.
* **Bidder** - Terra account that has submitted the bid. When the bid is executed, liquidated collaterals are credited to this account, made available for withdrawal.
* **Asset** - collateral that the bidder is hoping to purchase. Bids can only be made for whitelisted Anchor collaterals.
* **Size** - amount of UST that was put up upon bid submission. This is the amount of UST that the bidder will use to purchase the specified collateral.
* **Premium Slot** - rate of premium that the bidder is demanding upon bid execution. If set to a non-zero value, the bidder can purchase collateral at a price below the current oracle price. While bidders are able to set premium slots of their own, the Liquidation Queue only allows values between **0%** and **30%**, in increments of **1%**.
* **Activation Time** - block timestamp when the bid becomes eligible for activation. Bid execution can only occur for activated bids.

### Lifecycle

#### Bid Submission

Any user with a sufficient UST balance can submit a bid to the Liquidation Queue. Bidders are required to specify the CW20 token address of the purchasing collateral and their preferred premium slot.



#### Bid Activation

After a certain activation period (**10 minutes**), bids can then be activated into the queue. A bid's activation makes it eligible to be used in collateral liquidations. Unactivated bids will not be used in liquidations.

Once activated, bids are arranged into an orderbook-style queue. Bids with lower premiums are given a higher execution priority, thus being executed first during liquidation events. Bids with matching premiums are pooled together to have the same execution priority.

The activation period exists to prevent bots from front running. Without it, the system can be gamed during short-term market volatilities - bidders may retract their bids and instantly resubmit at a lower premium, causing bids to be retracted when they are needed the most. The activation period forces bidders to thoughtfully select premiums fit for mid-to-long term market fluctuations, as their premiums cannot be rapidly changed.

The activation period is not applied when bids of a collateral are below a certain threshold (**5M UST for bLuna, 1M UST for bETH**). This is so that new bids can be rapidly supplied to the system.



#### Bid Retraction

A submitted bid - activated or not - can be retracted at any time, provided that the bid has not been fully executed. Users can specify the retract amount, and if not specified, the entire bid is retracted.



#### Bid Execution

Collateral liquidations are performed by executing activated bids. Bids are executed from the bid pools in increasing order of premium rate (e.g 2% bids are only consumed after 0% and 1% pools are emptied). Bids with the lowest premium are executed first, iterating until the requested liquidation amount is fully consumed. Liquidated collaterals are credited to bidders, available for later withdrawal.

As bids with the same premium slot are pooled together, liquidated collaterals are credited pro-rata to each bidder's bid amount share.

**1%** of the liquidated value is attached as a liquidation fee, sent to Anchor's yield reserve.



#### Claiming Liquidated Collaterals

Post-liquidation, bidders can send a transaction to withdraw liquidated collaterals.

## Collateral Liquidation

A loan position's **risk ratio**, defined as the liability to borrow limit ratio, characterizes a position's riskiness. Loans are open for anyone to liquidate when its risk ratio is greater than one.

$$
\text{riskRatio} = \frac{\text{liability}}{\text{borrowLimit}}
$$

### Partial Liquidation

Loans with a total collateral value of above **2,000 UST** are partially liquidated, with only a portion of collateral liquidated instead of liquidating the full amount. Locked collaterals are fully liquidated for loans with a total collateral value below 2,000 UST.

Partially liquidating loan positions are liquidated until the position reaches below the **safe risk ratio** of **0.8**; loan positions with a risk ratio of 0.8 or below are considered safe from undercollateralization. Collaterals are liquidated proportionally to their locked amounts and the position's liquidation factor:

$$
\text{liquidationAmount}_{\text{collateral}} = \text{liquidationFactor} \cdot \text{amountLocked}_{\text{collateral}}
$$

Where a loan position's liquidation factor is determined as a function of the loan's total collateral value, borrow limit, and liability.

$$
\text{liquidationFactor} = \frac{\text{liability} - \text{safeRiskRatio} \cdot \text{borrowLimit}}{\text{collateralValue} \cdot \text{feeDeductor} - \text{safeRiskRatio} \cdot \text{borrowLimit}}
$$

The liquidation factor accounts for fees lost during bid execution( $$\text{feeDeductor}$$ ), such as the premium rate of bids, fees applied on bid execution, and taxes charged on native Terra transfers:

$$
\text{feeDeductor} = (1-\text{maxPremiumRate}) \cdot(1-\text{executionFee})\cdot(1-\text{terraTax})
$$

Note that $$\text{feeDeductor}$$ uses the maximum rate of fees that can be applied during liquidation, liquidating slightly more collateral than the minimum required (to reach the safe risk ratio).

### Multi-collateral Liquidation

Liquidation also applies for multi-collateral loans, which are loans that are backed with two or more collaterals. When liquidated, all of the locked collateral types are liquidated accordingly until the multi-collateral loan meets the safe risk ratio (if partial liquidation is applicable).

During liquidation, collaterals in a multi-collateral loan are liquidated proportional to each collateral's collateral value, and inverse to the its maximum LTV. Collaterals with lower maximum LTVs are given a higher weight as they require a lesser amount of liquidated value to decrease the risk ratio.

$$
\text{liquidationAmount}_\text{collateral} \propto \frac{\min(\text{collateralValue}_\text{collateral}, \text{availableBids}_\text{collateral})}{\text{maxLTV}_\text{collateral}}
$$

### Bid Execution

Collaterals locked to a liquidated loan position are converted to UST through bid execution. The money market executes bids, and UST received from execution are used to repay the liquidated borrower's loan.

### Liquidation Incentives

Due to the message-driven nature of smart contracts, liquidation can only occur when triggered by an external entity (liquidator). **1% of the liquidated value is set aside as incentives for liquidators to actively monitor risky loans and trigger liquidations**.
