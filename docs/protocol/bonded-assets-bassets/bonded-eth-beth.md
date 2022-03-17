# Bonded ETH (bETH)

![](../../assets/bETH\_03.png)

bETH tokens are bAssets built for Ethereum 2.0 staking, with their token value backed by Ethereum 2.0 staking positions. bETH tokens exist on both on the Ethereum chain and the Terra chain, each complying to the [ERC20 standard](https://eips.ethereum.org/EIPS/eip-20) and the [CW20 standard](https://github.com/CosmWasm/cosmwasm-plus/blob/master/packages/cw20/README.md).

::: {note}
bETH tokens are used as collateral to borrow Terra stablecoins from Anchor. Learn more about creating loan positions [here](../money-market/).
:::

bETH tokens are wrapped tokens of [Lido Finance's staked ETH (stETH)](https://lido.fi/ethereum), refitted to follow the contract interfaces required to integrate with Anchor smart contracts.

## Concepts

### **bETH Exchange Rate**

::: {note}
stETH tokens are designed to closely track the value of ETH.
:::

The bETH exchange rate determines the conversion rate when swapping stETH to bETH and vice versa. The exchange rate is calculated as the amount of stETH provided per bETH minted, the value initially starts with 1, and decreases with slashing events.

$$
\text{bETHExchangeRate} = \frac{\text{stETHBalance}} {\text{bETHSupply}}
$$

#### Shared Slashing Risk

Losses from slashing events are equally shared amongst all bETH tokens, lowering the calculated value of a bETH token. stETH accounts for slashing by pro-rata decreasing the token balance of all stETH holders. The stETH balance held by the bETH smart contract also decreases, decreasing the bETH exchange rate.&#x20;

### Validator Whitelist

The Lido DAO keeps a whitelist of ETH 2.0 validators, only permitting delegations to those included in the whitelist. This is crucial since all bETH tokens equally share slashing risks, and delegations to low-performing validators could negatively affect all holders. Through governance, the DAO can choose to register or deregister validators.

The Lido DAO is governed by holders of LDO, Lido's protocol token. The governance interfaces is accessible at this link.

## Usage

### Minting bETH with stETH

:::{info}
stETH can be minted through WebApp interfaces provided by Lido.
:::

bETH is minted by submitting ETH or stETH to Ethereum-side bETH contracts, along with the Terra address to receive the resulting bETH tokens. Once submitted, bETH tokens (with the amount determined by the bETH exchange rate) are minted to the provided Terra address.

### Redeeming bETH for stETH

:::{warning}
Slashing occurrences between the time of request and withdrawal may affect the final amount later withdrawn.
:::

bETH holders can redeem their tokens for their underlying stETH. Redemption is a two-step process; 1) transferring bETH to Ethereum and 2) redeeming bETH to stETH.

#### Transferring Terra-side CW20 bETH to Ethereum

bETH tokens can only be redeemed through Ethereum-side bETH contracts. bETH tokens that reside on Terra must first be transferred over to Ethereum via Terra Shuttle.

[Terra Bridge](https://bridge.terra.money) can be used to make interactions via Terra Shuttle.

#### Converting ERC20 bETH to stETH

bETH tokens on Ethereum can be converted back to stETH, with the use of Ethereum-side bETH contracts. Conversion is conducted based on the bETH exchange rate.

:::{info}
Converting stETH to ETH can be proceeded via AMM protocols on Ethereum, most notably [Curve](https://curve.fi).
:::

### bETH Rewards

bETH tokens accrue **TerraUSD** rewards, funded from the Ethereum staking rewards of stETH. Every 24 hours, Ethereum staking rewards (in the form of stETH) are sold for UST, which are then transferred over to Terra and distributed to holders of bETH.

#### Claiming Rewards

:::{warning}
Only bETH tokens on the Terra chain accrue rewards.
:::

Holders of Terra-side bETH can send a request to the bETH contract, which prompts the transfer of accrued rewards to their account. As rewards accrue during the user's period of ownership, transferring bETH to a different user automatically credits accrued rewards to the previous holder.
