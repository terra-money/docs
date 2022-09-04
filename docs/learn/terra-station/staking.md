# Manage staking <img src="/img/Staking.svg" height="40px">

This tutorial walks you through how to manage your staking delegations in Terra Station. To learn how to stake or withdraw rewards, check out the Terra Station [desktop](download/terra-station-desktop.md) or [mobile](download/terra-station-mobile.md) tutorials.  

If this is your first time using Terra Station, follow the [Terra Station tutorial](download/terra-station-desktop.md) to learn more.

## Stake Luna

Staking Luna to validators is a great way to earn rewards. Before you stake, make sure you have Luna in your wallet. You can transfer Luna from an [exchange](./wallet.md) or from [another wallet](./send.md).

1. Open Terra Station and click **Stake**.

2. Select the Validator with which you would like to stake and click on their name in the **Moniker** column of the validator list.

3. In the **My delegations** section, click **Delegate** and a new window will appear.

4. In the **Amount** field, specify the amount of Luna you want to delegate.

   :::{admonition} Maintain funds for transaction fees
   :class: warning
   It is recommended to maintain some funds in your wallet for future transactions. Without available capital for fee payment, you will not be able to carry out further transactions until more tokens are transferred to your wallet.
   :::

5. Confirm the transaction details, enter your password and click **Submit**.

Congratulations, you've just delegated Luna!

## Withdraw staking rewards

Rewards start accruing the moment you stake your Luna. Monitor your rewards in the staking section of Terra Station. Once you have sufficient rewards, follow the steps below to withdraw them.

1. Open Terra Station and click **Stake**.

2. To claim all available rewards, click **Withdraw all rewards** in the upper right-hand corner of the staking page. To withdraw rewards from a single validator, click on their name in the Validators list and then click on **Withdraw rewards** in their Validator details page.

3. In the **Validators** list, check the boxes next to the validators from which you would like to withdraw rewards.

4. Review the transaction details, enter your password, and click **Submit**.

Congratulations, you've just withdrawn your staking rewards!

## Redelegate

Redelegating lets you transfer staked Luna from one validator to another instantly, without having to wait for the 21-day unstaking period.

   :::{warning}
   When a user redelegates staked Luna from one validator to another, the validator receiving the staked Luna is barred from making further redelegation transactions for 21 days. This restriction only applies to the wallet that made the redelegation transaction.
   :::

1. Open Terra Station, connect your wallet, and click on **Stake**.

2. Select the validator you would like to redelegate to.

3. In the **My delegations** section, click **Redelegate**.

4. Select the validator you would like to redelegate from.

5. Enter the amount of Luna you want to redelegate.

6. Confirm the transaction details, enter your password and click **Submit**.

Your staked Luna will be transferred to the new validator.

## Undelegate

To unstake your Luna, you will need to undelegate from the validator to which the funds were originally staked. After undelegating, it will take 21 days for the undelegated funds to be available in your wallet.

   :::{admonition} Undelegation waiting period
   :class: warning
   After funds are undelegated, they will be locked for a period of 21 days.  Once this process has started, there is no option for reversal.  After this period has concluded, the funds will be transferred to your wallet where they will once again be available to carry out transactions with.  If you would like to simply stake with another validator, you may utilize the redelegating process which occurs immediately without the need to wait for processing.
   :::

1. Open Terra Station, connect your wallet, and click **Stake**.

2. Click on the validator you want to unstake from.

3. In the **My delegations** section, click **Undelegate**.

4. Enter the amount of Luna you want to undelegate.

5. Confirm the transaction details, enter your password and click **Submit**.

After submitting the transaction, you will have to wait for 21 days for the staked funds to be unlocked.
