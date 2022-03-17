# EthAnchor

::: {note}
For those wishing to read up on the previous version of EthAnchor, click [here](../developers-ethereum/ethanchor.md).
:::

![](../.gitbook/assets/ethAnchor\_logo\_Black.png)

****

**EthAnchor** provides a gateway for Ethereum users and dApps to interact with Anchor using Ethereum stablecoins.

Users can deposit Ethereum stablecoins to EthAnchor smart contracts to receive their aTerra counterparts. By holding on to aTerra, users accrue the interest generated on their stablecoin deposits.

![](<../.gitbook/assets/EthAnchor (1).png>)

Deposits of stablecoins other than UST are converted to UST via [Curve](https://curve.fi), an Ethereum-based exchange protocol which specializes in stablecoin swaps. Similarly, withdraws for non-UST stablecoins are processed by first withdrawing UST, which is then swapped for other stablecoins and returned.

Due to the involvement of cross-chain token transfers, EthAnchor operations (deposit, redeem) follow an asynchronous model and thus are not immediately finalized as of with a typical Ethereum smart contract. Additional processing time (separate from the time required for Ethereum Tx confirmation) is needed in order for an operation to be fully processed.

## Usage

EthAnchor can be accessed either by direct interactions with the EthAnchor contracts, or via WebApp interfaces such as [Orion.Money](https://app.orion.money).

### Supported Stablecoins

Supported Ethereum stablecoins and their APYs at the time of writing are listed below:&#x20;

::: {warning}
Note that additional fees may be applied from WebApp implementations, resulting in a lower APY.
:::

| Stablecoin Name | Symbol | APY          |
| --------------- | ------ | ------------ |
| Wrapped UST     | UST    | 19.5%\~20.5% |
| Dai Stablecoin  | DAI    | 16.5%        |
| Tether USD      | USDT   | 16.5%        |
| USD Coin        | USDC   | 16.5%        |
| Binance USD     | BUSD   | 16.5%        |
| Frax            | FRAX   | 16.5%        |
