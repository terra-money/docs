# Anchor Governance Staking

Anchor periodically distributes portion of ANC tokens purchased from protocol fees are distributed to ANC stakers to incentivize governance participation and decrease circulating ANC supply. The functionalities required to stake ANC are supported in the **Dashboard** section of the **GOVERN** page, enabling users to easily acquire and stake / unstake ANC tokens.

::: {note}
Unlike ANC rewards from UST borrowing or ANC - UST LP staking, rewards from governance staking do not have a separate claiming procedure but instead automatically claimed when a user unstakes.
:::

The **Anchor Governance Staking** section of the **GOVERN** page displays:

* **APY**: Annualized percentage yield (APY) of staking rewards given to ANC stakers.

## Buy / Sell ANC with UST

The Anchor WebApp provides an interface for users to trade ANC tokens with Terra USD, supported by Terraswap's ANC-UST exchange pair.

1\. Navigate to the **GOVERN** page and click on **\[Trade ANC]**.

![](../../../assets/Govern - staking - trade - 1.png>)

2\. Select whether to buy or sell ANC.

![](../../../assets/Govern - staking - trade - 2.png>)

3\. Enter amount to buy / sell. Assert the swap price, minimum received amount and click **\[Swap]**.

![](../../../assets/Govern - staking - trade - 3.png>)

* **Swap Price**: Expected effective swap rate. Ratio between amounts of tokens swapped and expected amount of tokens received.
* **Minimum Received**: Minimum amount of tokens guaranteed to receive. Swap is reverted if the final receive amount is below this value.

::: {warning}
The displayed amount of the counterparty token is an estimate value, calculated at the time of user interaction. The final amount received may be different (but always above **Minimum Received**) due the time required for transaction acceptance.
:::

4\. Station Extension should prompt you to sign a transaction that contains the buy /sell operation. Confirm the details presented and enter your password to sign.

![](../../../assets/Govern - staking - trade - 4.png>)

5\. Buy / sell complete.

![](../../../assets/Govern - staking - trade - 5.png>)

## Staking / unstaking ANC to / from Anchor Governance

1\. Navigate to the **GOVERN** page and click **\[Gov Stake]**.

![](../../../assets/Govern - staking - stake -1.png>)

2\. Select whether to stake or unstake.

![](../../../assets/Govern - staking - stake - 2.png>)

3\. Enter amount of ANC to stake / unstake and click **\[Stake]** / **\[Unstake]**.

![](../../../assets/Govern - staking - stake - 3.png>)

4\. Station Extension should prompt you to sign a transaction that contains the stake /unstake operation. Confirm the details presented and enter your password to sign.

![](../../../assets/Govern - stakiing - stake - 4.png>)

6\. Stake / unstake complete.

![](../../../assets/Govern - staking - stake - 5.png>)
