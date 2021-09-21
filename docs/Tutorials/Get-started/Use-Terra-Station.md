# Use Terra Station

This tutorial walks you through the process of using Terra Station, the official desktop wallet for holding Terra assets. You'll learn how to set up a new wallet, make basic transactions, and stake your tokens, all by using testnet Luna so that you can get a solid understanding of how Terra Station works without any risk of losing any real funds.

## Step 1. Create a new wallet

1. Download and install [Terra Station](https://terra.money/protocol.html#protocol1).

2. Launch Terra Station, and follow the displayed instructions, which include generating a 24-word mnemonic phrase or loading an existing mnemonic.

::: danger
Write down and verify the 24 words, and keep them in a secure location for the following reasons:

- People who have access to the words can also access your funds.
- If you clear the Terra Station cache or reinstall station, the mnemonic is erased.
:::

## Step 2. Get testnet Luna

1. In the bottom left corner of Terra Station, switch **Mainnet** to **Testnet** .
2. A the top of Terra Station, copy your Terra address. Your address follows this format: `terra1qi3vmmjiwjs89qw9m1l98sdjcmn2goy03xuapl`.
3. Open [Terra Faucet](https://faucet.terra.money), paste your Terra address in the **Testnet address** field, select Luna, and click **Send me tokens**.

The following image shows your balance after you receive your testnet Luna:

![balance](/img/screens/balance.png)

Now, you can practice making transactions using the testnet Luna tokens.

## Step 3. Make a transaction

Transactions are bundles of messages that tell the blockchain to update its state, creating changes in balances and ownership reflected across the distributed ledger. The simplest transaction you can make is to send tokens to somebody else. In the following procedure, you'll send some of your testnet Luna to another address.

1. In Terra Station, click **Wallet**, and click **Send**.
2. In the **Send to** field, specify `terra14lxhx09fyemu9lw46c9m9jk63cg6u8wdc8pdu4`.
3. In the **Amount** field, specify `100`, and click **Next**.
4. In the **Confirm with password** field, specify your password to confirm that the transaction information is correct, and click **Send**.

The following image shows how to send Luna:

![send](/img/screens/send.png)

Now that you understand how to make a simple transaction, let's try the on-chain swap.

## Step 4. Swap Luna for a stablecoin

The hallmark feature of the Terra protocol is its stablecoin, powered by a balancing system of on-chain swaps and real-world arbitrage. Using the on-chain swap, you will turn your unstable Luna coins into stablecoins to protect their value.

1. In Terra Station, click **Swap**.
2. In the **Swap coins** section, select **Luna** in the first field, and specify `500` for the amount.
3. Select **KRT** in the second field, and click **Next**.
3. In the **Confirm with password** field, specify your password to confirm that the transaction information is correct, and click **Swap**.

The following image shows how to swap from Luna to KRT:

![swap](/img/screens/swap.png)

## Step 5. Stake your Luna

Staking is the act of delegating all or part of your Luna balance as your stake to a validator, who will participate in the process of validating transactions. By staking, you earn rewards.

1. In Terra Station, click **Staking**.
2. In the **Moniker** column, click the validator **node0**, which is the validator to which you will delegate your stake.
3. In the **My delegations** section, click **Delegate**.
4. In the **Amount** field, specify the amount of Luna you want to delegate, and click **Next**.

::: warning Important
Keep some funds in your account when you delegate because you'll need funds to withdraw rewards.
:::

5. In the **Confirm with password** field, specify your password to confirm that the transaction information is correct, and click **Delegate**.

The following image shows delegating Luna to node0 on testnet:

![delegate](/img/screens/delegate.png)

## Step 6. Withdraw staking rewards

After some time has passed, rewards will accrue because you delegated Luna to a validator who participates on the network. You can withdraw your accrued rewards at any time.

1. In Terra Station, click **Staking**.
2. In the **Moniker** column, click **node0**.
3. In the **My rewards** section, click **Withdraw**.
4. In the **Confirm with password** field, specify your password to confirm that the transaction information is correct, and click **Withdraw**.

The following image shows the **Withdraw** button on the validator details page.

![withdraw](/img/screens/withdraw.png)

## Next steps

Congratulations! You learned the basics of using Terra Station. Now, you're ready to switch from the testnet to the Terra mainnet, where you'll use real tokens.
