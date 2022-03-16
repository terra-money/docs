# ANC - UST LP Staking

High exchange liquidity of ANC tokens is crucial for retaining strong deposit rate stability via ANC-incentivized borrowing. It is also critical for Anchor Governance, as a low ANC exchange liquidity enables malicious entities to gain a sufficient supply of ANC and manipulate governance poll results.

As such, a small portion of the ANC supply have been allocated on protocol genesis as incentives for users that provide exchange liquidity to ANC tokens, specifically to the **ANC-UST Terraswap pair**. ANC incentives for ANC liquidity providers are distributed through the use of Terraswap Liquidity Provider tokens.

Terraswap's Liquidity Provider tokens, or **LP Tokens**, are minted uniquely to each exchange pair type and represent a liquidity provider's share of liquidity contribution to the pair. Anchor measures the degree of ANC liquidity contribution by distributing ANC rewards pro-rata to the amount of ANC-UST LP tokens staked to the protocol.

ANC rewards are accrued to LP stakers on a per-block basis, which they can later submit a request to claim. The **Dashboard** section of Anchor WebApp's **GOVERN** page includes an interface for liquidity providers to stake LP tokens and accrue rewards.

The **ANC - UST LP** section of the **GOVERN** page displays:

* **APY**: Annualized percentage yield (APY) of liquidity rewards given to ANC-UST LP token stakers.\

* **Total Staked**: Total number of ANC-UST LP tokens staked by all users.

## Providing (Pooling) liquidity to the ANC-UST pair

{% hint style="info" %}
Users must have a balance of both ANC and UST tokens in order to provide liquidity.
{% endhint %}

1\. Navigate to the **GOVERN** page and click on **\[ANC - UST LP]**.

![](<../../../.gitbook/assets/Govern - LP - provide - 1.png>)

2\. Select the **\[POOL]** tab.

![](<../../../.gitbook/assets/Govern - LP - provide - 2.png>)

3\. Select the **\[Provide]** tab.

![](<../../../.gitbook/assets/Govern - LP - provide - 3.png>)

4\. Enter the amount of ANC tokens to provide liquidity. The WebApp will automatically calculate the amount of UST required. Click **\[Add Liquidity]**.

![](<../../../.gitbook/assets/Govern - LP - provide - 4.png>)

5\. Station Extension should prompt you to sign a transaction that contains the liquidity provide operation. Confirm the details presented and enter your password to sign.

![](<../../../.gitbook/assets/Govern - LP - provide - 5.png>)

6\. Liquidity provide complete. LP tokens are minted to the user.

{% hint style="warning" %}
LP tokens minted from provided liquidity must be staked to receive LP staking rewards.
{% endhint %}

![](<../../../.gitbook/assets/Govern - LP - provide - 6.png>)

## Withdrawing liquidity from the ANC-UST pair

1\. Navigate to the **GOVERN** page and click on **\[ANC - UST LP]**.

![](<../../../.gitbook/assets/Govern - LP - withdraw - 1.png>)

2\. Select the **\[POOL]** tab.

![](<../../../.gitbook/assets/Govern - LP - withdraw - 2.png>)

3\. Select the **\[Withdraw]** tab.

![](<../../../.gitbook/assets/Govern - LP - withdraw - 3.png>)

4\. Enter the amount of LP tokens to burn. The WebApp will display the estimated amount of ANC and UST tokens the user will receive. Click **\[Remove Liquidity]**.

![](<../../../.gitbook/assets/Govern - LP - withdraw - 4.png>)

5\. Station Extension should prompt you to sign a transaction that contains the liquidity withdraw operation. Confirm the details presented and enter your password to sign.

![](<../../../.gitbook/assets/Govern - LP - withdraw - 5.png>)

6\. Liquidity withdraw complete.

![](<../../../.gitbook/assets/Govern - LP - withdraw - 6.png>)

## Staking / unstaking ANC-UST pair LP tokens.

1\. Navigate to the **GOVERN** page and click on **\[ANC - UST LP]**.

![](<../../../.gitbook/assets/Govern - LP - stake - 1.png>)

2\. Select the **\[STAKE]** tab.

![](<../../../.gitbook/assets/Govern - LP - stake - 2.png>)

3\. Select whether to stake or unstake.

![](<../../../.gitbook/assets/Govern - LP - stake -3.png>)

4\. Enter amount to stake / unstake and click **\[Stake**] / **\[Unstake]**.

![](<../../../.gitbook/assets/Govern - LP - stake - 4.png>)

5\. Station Extension should prompt you to sign a transaction that contains the stake / unstake operation. Confirm the details presented and enter your password to sign.

![](<../../../.gitbook/assets/Govern - LP - stake - 5.png>)

6\. Stake / unstake complete.

![](<../../../.gitbook/assets/Govern - LP - stake - 6.png>)
