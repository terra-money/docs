# Wormhole tutorial

Wormhole allows you to bridge tokens across different chains. Instead of swapping or converting assets directly, Wormhole locks your source assets in a smart contract and mints new Wormhole-wrapped assets on the target chain. You can then swap these wrapped assets for other assets on the target chain. 

Use this tutorial to bridge your assets Terra between Terra and other chains using Wormhole.

## Prerequisites

- [The Terra Station browser extension](../terra-station/download/terra-station-extension.md) for tokens on the Terra blockchain.
- A second wallet extension for tokens on another blockchain. 

   :::{admonition} Paying for fees
   :class: tip
   Be sure to have enough tokens in your wallets to pay for fees. Remember that fees will be charged for sending and redeeming tokens. 
   :::

## Bridge tokens

Visit [Wormhole's Portal Token Bridge](https://portalbridge.com/#/transfer) to get started. 

### 1. Source

2. Select a **Source chain** and a **Target chain** from the dropdown choices. 

3. Click **Connect** to connect your Terra Station wallet. Allow the connection if your wallet extension prompts you.

4. Click **Select a token** and choose from the available tokens in your wallet. 

   :::{important}
   You should always check for markets and liquidity before sending tokens. [Click here to see available markets for wrapped tokens](https://docs.wormholenetwork.com/wormhole/overview-liquid-markets).
   :::

   ```{image} /img/screens/wormhole/source.png
   :class: sd-p-3
   ```

5. Enter the amount you want to bridge and click **Next**.

### 2. Target

1. Connect your target chain wallet by clicking **Connect**. Allow the connection if your wallet extension prompts you. 

   :::{important}
   Make sure your target wallet has tokens to pay fees in to redeem your tokens. 
   :::

   ```{image} /img/screens/wormhole/target.png
   :class: sd-p-3
   ```

2. Click **Next**. 
