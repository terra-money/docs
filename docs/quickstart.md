# Quickstart

This is a short tutorial to get quickly started with using Terra.

## Download Terra Station

Start off by downloading [Terra Station](https://www.terra.money/protocol.html#protocol1), the official desktop wallet for holding Terra assets. There are official binaries for Windows and macOS. Some people have reported success with installing Terra Station on Linux through WINE, though currently it is not officially supported.

### Create a new wallet

Launch Terra station and follow the instructions on the screen to create a new wallet. This will involve either generating a 24-word mnemonic phrase or loading an existing mnemonic. Be sure to save them somewhere as they will be wiped if you clear the cache of Terra Station or have to reinstall station.

::: danger
Be sure to write down and verify the 24 words -- whoever has them can access your funds.
:::

### Get testnet Luna

We will be using the testnet. Make sure your network is set to **Testnet** in the bottom left corner of Terra Station. Once you have done that, head over to the [Terra Faucet](https://faucet.terra.money) and request some Luna to your address. You can find your Terra account address in the **Top Bar** of the Terra Station.

#### Balance after getting testnet Luna

![balance](/img/screens/balance.png)

## Basic Transactions

Now that you have some tokens to play around with, you can practice making transactions. Transactions are bundles of messages that tell the blockchain to update its state, creating changes in balances and ownership reflected across the distributed ledger.

### Sending tokens

The simplest transaction you can make is to send tokens to somebody else. Try sending 100 of your testnet Luna to `terra14lxhx09fyemu9lw46c9m9jk63cg6u8wdc8pdu4`. On your **Wallet** page, click "Send" next to your balance of Luna and enter the following in the modal:

#### Example of how to send Luna

![send](/img/screens/send.png)

### Trying out the on-chain swap

The hallmark feature of the Terra protocol is its stablecoin, powered by a balancing system of on-chain swaps and real-world arbitrage. Let's turn our unstable Luna coins into stablecoins to protect their value!

Head over to the **Swap** page in Station and swap **500 Luna for TerraKRW (KRT)**.

#### Example of swapping currencies

![swap](/img/screens/swap.png)

## Basics of Staking

### Delegating to a validator

Head over to the **Staking** page. Pick a validator from the list of delegates that you'd like to stake your Luna with, which should bring you to their page. If you're confident in their architecture, go ahead and delegate some Luna to them.

#### Delegating to node0 on Testnet

![delegate](/img/screens/delegate.png)

### Withdrawing rewards

After some time has passed, you should be see some rewards accruing due to the transaction on the network. Click the **Withdraw** button on your validator's page to withdraw rewards for your delegation with that validator.

::: warning IMPORTANT
Make sure to keep some funds in your account when delegating because you'll need funds to withdraw rewards!
:::

#### Withdrawing rewards

![withdraw](/img/screens/withdraw.png)

## Next Steps

Congratulations, you've completed the basic of using Terra Station. You're ready to move onto the Terra Columbus mainnet and use real tokens.
