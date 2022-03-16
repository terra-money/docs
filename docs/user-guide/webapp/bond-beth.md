# bASSET \[bETH]

Minting and redeeming bETH is a cross-chain operation, requiring interactions from both the Ethereum and Terra blockchain. The below web interfaces are used to achieve certain types of actions on corresponding blockchains.

* [Lido's stETH WebApp](https://stake.lido.fi) - for minting stETH using ETH
* [Lido's bETH WebApp](https://anchor.lido.fi) - for minting and redeeming bETH using stETH
* [Wormhole Bridge WebApp's Redeem Page](https://wormholebridge.com/#/redeem) - for redeeming tokens transferred over via Wormhole
* [Anchor WebApp's BOND page](https://app.anchorprotocol.com/bond/claim) - for claiming bETH rewards
* [Wormhole Bridge WebApp](https://wormholebridge.com) - for transferring bETH to/from Ethereum from/to Terra
* [Curve's WebApp](https://curve.fi) - for swapping stETH for ETH



{% hint style="info" %}
Due to Wormhole's inability of generating custom CW20 tokens (required for bETH's reward-accruing features), there exists 2 bETH tokens on Terra:&#x20;

* **Wormhole wrapped bETH (webETH)** - wrapped tokens transferred from Ethereum -> Terra.
  * **Not usable as Anchor collateral**
  * **Redeemable to stETH once transferred back to Ethereum**
  * Minted by Wormhole
  * Non-reward-accruing
* **Bonded ETH (bETH)** - reward-accruing bETH tokens
  * **Usable as Anchor collateral**
  * **Not redeemable to stETH once transferred back to Ethereum**
  * Minted by converting webETH tokens to bETH
  * Reward-accruing
{% endhint %}

bETH can be minted with ETH. This process requires the steps of: &#x20;

1. [Minting bETH from ETH](bond-beth.md#1.-minting-beth-from-eth-steth) on [Lido's bETH WebApp](https://anchor.lido.fi)
2. [Redeeming webETH](bond-beth.md#2.-redeeming-wormhole-wrapped-beth-tokens-transferred-to-terra) on [Wormhole bridge WebApp's Redeem page](https://wormholebridge.com/#/redeem)
3. [Converting webETH to bETH](bond-beth.md#3.-converting-webeth-wormhole-wrapped-token-to-beth-anchor-collateral) on [Anchor WebApp's Convert page](https://app.anchorprotocol.com/basset/wh/beth/to-basset)

As for redeeming bETH tokens back to ETH, the following process can be taken:&#x20;

1. [Converting bETH to webETH](bond-beth.md#1.-converting-beth-anchor-collateral-to-webeth-wormhole-wrapped-token) on [Anchor WebApp's Convert page](https://app.anchorprotocol.com/basset/wh/beth/to-wbasset)
2. [Transferring bETH from Terra to Ethereum](bond-beth.md#1-transferring-beth-from-terra-to-ethereum) via [Wormhole Bridge](https://wormholebridge.com/#/transfer)
3. [Converting bETH to stETH](bond-beth.md#2-converting-beth-to-steth) on [Lido's bETH WebApp](https://anchor.lido.fi)
4. [Swapping stETH for ETH](bond-beth.md#swapping-steth-for-eth) on [Curve](https://curve.fi)

bETH tokens on Terra accrue rewards in TerraUSD, funded by staking rewards of Ethereum 2.0. [Accrued rewards can be claimed](bond-beth.md#claiming-accrued-beth-rewards) with the use of the [BOND page of Anchor's WebApp](https://app.anchorprotocol.com/bond/claim/).

## Connecting with Lido's web interfaces

1\. Navigate to Lido's stETH or bETH WebApp and click **\[Connect wallet]**.

![](<../../.gitbook/assets/Connecting with interface.png>)

2\. Select the Ethereum wallet of choice that contains a balance of stETH / bETH and ETH.

![](<../../.gitbook/assets/Connecting with interface - 2.png>)

3\. Wallet connection complete.

![](<../../.gitbook/assets/Connecting with interface - 3.png>)

## Minting bETH from ETH

### 1. Minting bETH from ETH / stETH

bETH tokens can be minted by submitting ETH to Ethereum-side bETH smart contracts. The process is achievable via Lido's bETH WebApp.

{% hint style="info" %}
Unlike bLUNA, bETH tokens are minted / redeemed through [Lido's web interface for bETH](https://anchor.lido.fi).
{% endhint %}

1\. Navigate to the **To bETH** page of Lido's web interface.

![](<../../.gitbook/assets/Minting bETH with ETH - 1.png>)

2\. Click on the dropdown and select Ethereum / Lido.

![](<../../.gitbook/assets/Minting bETH with ETH - 2.png>)

3\. Enter the amount of ETH / stETH to use in minting bETH and the Terra address to receive the resulting bETH tokens. Click **\[Convert]** to proceed.

{% hint style="danger" %}
**The Wormhole transaction ID link is extremely important to redeeming your tokens on the Terra side. Copy and paste it and don't close the page.**

Redemptions can still be made if lost although with extra steps. The method of finding your transaction ID can be found [here](https://help.lido.fi/en/articles/5918594-how-to-find-the-link-to-claim-beth-on-terra).
{% endhint %}

![](<../../.gitbook/assets/Minting bETH with ETH - 3.png>)

4\. Metamask should prompt you to sign a transaction that contains the mint operation. Confirm the details presented and click **\[Confirm]** to sign.

![](<../../.gitbook/assets/Minting bETH with ETH - 4.png>)

### 2. Redeeming Wormhole wrapped bETH tokens transferred to Terra

{% hint style="warning" %}
Unlike the previous Shuttle token bridge, the Wormhole bridge requires an extra step of redemption. **TOKENS WILL NOT SHOW UP ON YOUR WALLET UNTIL THEY HAVE BEEN REDEEMED**.
{% endhint %}

{% hint style="info" %}
Tutorials on redeeming tokens can be found [here (Wormhole's guide)](https://docs.wormholenetwork.com/wormhole/video-tutorial-how-to-use-wormhole) and [here (Lido's guide)](https://help.lido.fi/en/articles/5918594-how-to-find-the-link-to-claim-beth-on-terra).
{% endhint %}

Once complete, the specified Terra address will now hold an increased balance of webETH tokens.

![](<../../.gitbook/assets/Minting bETH with ETH - 5.png>)

### 3. Converting webETH (Wormhole wrapped token) to bETH (Anchor collateral)

1\. Navigate to the **bETH/webETH** page in the **bASSET** page.

![](<../../.gitbook/assets/bETH - Convert - 1.png>)

2\. Navigate to the **to bETH** tab.

![](<../../.gitbook/assets/bETH - Convert - 2.png>)

3\. Enter the amount of webETH to be converted or the amount of bETH to convert and click the **\[Convert]** button to confirm.

![](<../../.gitbook/assets/bETH - Convert - 3.png>)

4\. Station Extension should prompt you to sign a transaction that contains the mint operation. Confirm the details presented and enter your password to sign.

![](<../../.gitbook/assets/bETH - Convert - 4.png>)

5\. Conversion complete. Converted bETH tokens can now be used as collateral in Anchor.

![](<../../.gitbook/assets/bETH - Convert -5.png>)



## Redeeming bETH to stETH

bETH tokens that reside on the Terra blockchain should be first transferred to Ethereum before they can be redeemed for stETH.

Redemption is a two-step process, first requiring a cross-chain transfer, which is the followed by a redemption to stETH.



### 1. Converting bETH (Anchor collateral) to webETH (Wormhole wrapped token)

1\. Navigate to the **bETH/webETH** page in the **bASSET** page.

![](<../../.gitbook/assets/bETH - Convert - 1 copy.png>)

2\. Navigate to the **to webETH** tab.&#x20;

![](<../../.gitbook/assets/bETH - Convert2 - 2.png>)

3\. Enter the amount of bETH to convert or the amount of webETH to be converted to and click the **\[Convert]** button to confirm.

![](<../../.gitbook/assets/bETH - Convert2 - 3.png>)

4\. Station Extension should prompt you to sign a transaction that contains the mint operation. Confirm the details presented and enter your password to sign.

![](<../../.gitbook/assets/bETH - Convert2 - 4.png>)

5\. Mint complete.

![](<../../.gitbook/assets/bETH - Convert2 - 5.png>)

### 2. Transferring webETH from Terra to Ethereum

{% hint style="info" %}
Cross-chain transfers between Ethereum / Terra can be achieved through the [Wormhole bridge](https://wormholebridge.com). Tutorials on using the Wormhole bridge WebApp can be found [here](https://docs.wormholenetwork.com/wormhole/video-tutorial-how-to-use-wormhole).
{% endhint %}

{% hint style="danger" %}
Transferred tokens need to be redeemed before they can be visible on your wallet.
{% endhint %}



### 3. Converting bETH to stETH

3-a. Navigate to the **To stETH** tab in the **Convert** page.

![](<../../.gitbook/assets/Redeeming bETH - 2 (1).png>)

3-b. Enter the amount of bETH to convert to stETH and click the **\[Transfer]** button to proceed.

![](<../../.gitbook/assets/Redeeming bETH - 3 (1).png>)

3-c. Metamask should prompt you to sign a transaction that contains the conversion operation. Confirm the details presented and click **\[Confirm]** to sign.

![](<../../.gitbook/assets/Redeeming bETH - 4.png>)

3-d. Conversion complete.

## Swapping stETH for ETH

1\. Navigate to Curve Finance's web interface, [curve.fi](https://curve.fi).

![](<../../.gitbook/assets/Redeeming stETH - 1.png>)

2\. Select STETH and ETH. Enter the amount of stETH to swap for ETH and click **\[Sell]** to proceed.

![](<../../.gitbook/assets/Redeeming stETH - 2.png>)

3\. Metamask should prompt you to sign a first transaction that contains an authorization for Curve's web interface to interact with your stETH tokens. Confirm the details presented and click **\[Confirm]** to sign.

![](<../../.gitbook/assets/Redeeming stETH - 3.png>)



4\. Metamask should then prompt you to sign a second transaction that contains the swap operation. Confirm the details presented and click **\[Confirm]** to sign.

![](<../../.gitbook/assets/Redeeming stETH - 4.png>)

5\. Swap complete.

## Claiming accrued bETH rewards

{% hint style="info" %}
bETH rewards only accrue only if the user is currently holding bETH tokens. Users do not accrue rewards from bETH tokens deposited to Anchor.
{% endhint %}

1\. Click the **Claim Rewards** button in the **CLAIMABLE REWARDS** section.

![](<../../.gitbook/assets/bAsset - bLuna - Claim - 1.png>)

2\. Click **\[Claim]**.

![](<../../.gitbook/assets/bAsset - bLuna - Claim - 2.png>)

3\. Station Extension should prompt you to sign a transaction that contains the reward claim operation. Confirm the details presented and enter your password to sign.

![](<../../.gitbook/assets/bAsset - bLuna - Claim - 3 (1).png>)

4\. Reward claim complete.

![](<../../.gitbook/assets/bAsset - bLuna - Claim - 4.png>)
