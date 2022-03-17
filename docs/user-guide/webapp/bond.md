# bASSET \[bLUNA]

The **bASSET** page enables users to easily interact with bAsset tokens. Through this page, users can mint bAssets, burn bAsset to redeem the underlying Asset, and claim bAsset rewards.

## Minting bLuna

1\. Navigate to the **LUNA/bLUNA** page in the **bASSET** page.

![](<../../.gitbook/assets/bAsset - bLuna - Mint - 1.png>)

2\. Navigate to the **MINT** tab.&#x20;

![](<../../.gitbook/assets/bAsset - bLuna - Mint - 2.png>)

3\. Enter the amount of Luna to use in minting or the amount of bLuna to mint and click the **\[Mint]** button to confirm.

![](<../../.gitbook/assets/bAsset - bLuna - Mint - 3.png>)

4\. Station Extension should prompt you to sign a transaction that contains the mint operation. Confirm the details presented and enter your password to sign.

![](<../../.gitbook/assets/bAsset - bLuna - Mint - 4.png>)

5\. Mint complete.

![](<../../.gitbook/assets/bAsset - bLuna - Mint - 5.png>)

## Burning bLUNA to redeem LUNA

1\. Navigate to the **LUNA/bLUNA** page in the **bASSET** page.

![](<../../.gitbook/assets/bAsset - bLuna - Burn - 1.png>)

2\. Navigate to the **BURN** tab.&#x20;

![](<../../.gitbook/assets/bAsset - bLuna - Burn - 2.png>)

3\. Select a burn method. **BURN** and **INSTANT BURN** each correspond to:

* **BURN**: Burn bLuna through the bLuna protocol and redeem Luna. Redeemed Luna can be withdrawn after the Terra blockchain's unbonding period. Redemption is done with the current bLuna exchange rate but requires at least 21 days and the redemption amount may be affected by validator slashing.

::: {warning}
Burn requests are processed in 3-day batches. Burn requests that are yet to be included in a batch are marked as **pending** in the **CLAIM** page.
:::

![](<../../.gitbook/assets/bAsset - bLuna - Burn - 2 copy.png>)

* **INSTANT BURN**: Swap bLuna for Luna through Astroport, an [Uniswap](https://uniswap.org)-like automated market marker (AMM) protocol on Terra. This process is instant but may suffer from trade slippage and Astroport commissions.

![](<../../.gitbook/assets/bAsset - bLuna - Instant Burn.png>)

3\. Enter the amount of bLuna to burn / instant burn or the amount of Luna and click the **\[Burn]** button to confirm.

* **BURN**

![](<../../.gitbook/assets/bAsset - bLuna - Burn - 3 (1).png>)

* **INSTANT BURN**

![](<../../.gitbook/assets/bAsset - bLuna - Burn - Instant Burn - 3.png>)

4\. Station Extension should prompt you to sign a transaction that contains the burn operation. Confirm the details presented and enter your password to sign.

* **BURN**

![](<../../.gitbook/assets/bAsset - bLuna - Burn - 4.png>)

* **INSTANT BURN**

![](<../../.gitbook/assets/bAsset - bLuna - Instant Burn - 4.png>)

5\. Burn complete. In the case of **BURN**, redeemed Luna can be withdrawn at the **CLAIM** tab after a unbonding period of at least 21 days.

* **BURN**

::: {note}
bLuna burn requests currently in the unbonding period can be viewed at the [**CLAIM**](bond.md#withdrawing-luna-from-burnt-luna) tab.
:::

![](<../../.gitbook/assets/bAsset - bLuna - Burn - 5.png>)

* **INSTANT BURN**

![](<../../.gitbook/assets/bAsset - bLuna - Instant Burn - 5.png>)

### Withdrawing Luna from burnt Luna

::: {note}
This subsection is only applicable for those that have burnt Luna through **BURN** and not **INSTANT BURN**.
:::

1\. Click the **Withdraw** button in the **WITHDRAWABLE LUNA** section.

![](<../../.gitbook/assets/bAsset - bLuna - Withdraw - 1.png>)

2\. Check the amount of redeemed Luna available for withdrawal (**Withdrawable Luna**). Click the **\[Withdraw]** button to withdraw redeemed Luna.

![](<../../.gitbook/assets/bAsset - bLuna - Withdraw - 2.png>)

3\. Station Extension should prompt you to sign a transaction that contains the Luna withdraw operation. Confirm the details presented and enter your password to sign.

![](<../../.gitbook/assets/bAsset - bLuna - Withdraw - 3.png>)

4\. Withdraw complete.

![](<../../.gitbook/assets/bAsset - bLuna - Withdraw - 4.png>)

## Claiming accrued bLuna rewards

::: {note}
bLuna rewards only accrue only if the user is currently holding bLuna tokens. Users do not accrue rewards from bLuna tokens deposited to Anchor.
:::

1\. Click the **Claim Rewards** button in the **CLAIMABLE REWARDS** section.

![](<../../.gitbook/assets/bAsset - bLuna - Claim - 1 (1).png>)

2\. Click the **\[Claim]** button to claim accrued rewards.

![](<../../.gitbook/assets/bAsset - bLuna - Claim - 2 (1).png>)

3\. Station Extension should prompt you to sign a transaction that contains the reward claim operation. Confirm the details presented and enter your password to sign.

![](<../../.gitbook/assets/bAsset - bLuna - Claim - 3.png>)

4\. Reward claim complete.

![](<../../.gitbook/assets/bAsset - bLuna - Claim - 4 (1).png>)
