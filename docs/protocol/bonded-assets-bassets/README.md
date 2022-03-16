# Bonded Assets (bAssets)

bAssets are liquid, tokenized representations of staked (bonded) assets in a PoS blockchain. They allow stakers to gain liquidity over their staked assets, enabling the locked value in staked assets to be utilized in financial applications such as Anchor.

bAsset tokens are an entitlement of the underlying staked asset position, where staking rewards are distributed to its holders. Financial applications that incorporate bAssets can use distributed rewards to incentivize adoption.

## Required Attributes

While bAssets may have varying characteristics across implementations, they should include certain attributes to be implemented as a valid collateral in Anchor.

An ideal bAsset to be used as a collateral has the following properties listed below.

### Fungibility

bAssets should be made fungible across all staking positions, regardless of their underlying validator and their properties. Having multiple bAsset types for a single blockchain leads to fragmented liquidity, drastically decreasing their attractiveness as a collateral.

As fungible resources, each unit of bAsset must have the same risk and reward profile. Underlying assets lost from slashing and rewards gained from staking should be shared pro-rata to all bAsset tokens.

### Default 1:1 Conversion

As the price of bAssets determine whether a loan is liquidated or not, borrowers should be able to easily estimate the value of their bAsset collaterals. This is best done by introducing a one-to-one conversion peg between bAssets and their underlying assets, where bAssets mimick the price of their underlying assets.

Exceptional occurrences such as slashing may cause the peg to break. bAsset implementations however, should possess mechanisms to recover the one-to-one peg. Example mechanisms include the peg recovery fee and the slashing insurance pool:

* **Peg recovery fee**: slashed assets are recovered by a fee that is attached to further bAsset minting and burning.
* **Slashing insurance pool**: slashed assets are covered from a separately-kept reserve pool.

Via the peg recovery mechanism, redeeming bAssets at its default state should result in an equal amount of underlying assets and vice versa.

### Ease of Redemption

Having well-established secondary markets for bAssets is vastly beneficial for Anchor liquidators. For fluid arbitrage between secondary markets and the primary market (i.e. bAsset contract), implementations should support frictionless bAsset redemptions, where:

* Redemption of bAssets should be fully executed within a predetermined time period.
* Any holder should be able to redeem their bAssets without significant loss.

### Reward Accruing

Anchor's deposit rate subsidies are funded by bAsset rewards. bAsset rewards should be given out without interruption, as subsidies must be constantly distributed.

```{toctree}
:hidden:
bonded-luna-bluna
bonded-eth-beth
```