# Luna

## What is Luna?

Luna is the native staking token recognized by the Terra protocol. Through its role in collateralizing the mechanisms that secure the price-stability of Terra stablecoins and modulate the incentives of validators, Luna serves as a foundational asset for the entire Terra network and ecosystem.

## Staking Rewards

The primary function of Luna is to protect the integrity of Terra mechanisms by locking value within the Terra ecosystem through staking.

However, in providing network security, Luna holders and delegators are exposed to the risks of maintaining a long-term position on a fluctuating asset. **Staking rewards** therefore provide the incentives to keep long-term interest in Luna ownership.

In the Terra protocol, staking rewards are first distributed to validators who take a commission for providing their operations, and then are withdrawn individually by delegators.

Rewards from stake are determined largely by the relative size of stake, and are structured in such a way that rewards increase as transaction volume increases. Luna ownership is thus an investment in the long term growth of Terra.

Staking rewards come from gas and taxes.

### Gas

Gas is a fee that is added on to each transaction to avoid spamming. Validators set minimum gas prices and reject transactions that have implied gas prices below this threshold. At the end of every block, the compute fees are disbursed to the participating validators pro-rata to stake.

### Taxes

Taxes are used as a stability fee, and the protocol charges a small percentage transaction fee ranging from 0.1% to 1% on every Terra transaction, capped at 1 TerraSDR. This is paid in any Terra currency, and is disbursed pro-rata to stake at the end of every block.

::: tip NOTE

**Seigniorage** no longer contributes to rewards as of Columbus-5. All Seigniorage is currently burned.

:::

## Phases of Luna

<center>

![phases](/img/diagrams/luna-phases.png)

</center>

Luna can exist in three states:

### Unbonded

This is Luna that can be freely transacted as a regular token, with no restrictions.

### Bonded

While Luna is bonded, it is considered **staked**, and generates rewards for the delegator and validator it is bonded to. The Luna cannot be freely traded, and is locked in the ecosystem until it is fully unbonded.

### Unbonding

Luna that is instructed to be undelegated from a delegator transition into an "unbonding" state during which neither rewards accrue nor the Luna can be freely traded. This unbonding phase takes 21 days to complete, after which the Luna return to an unbonded state.

::: warning NOTE

When Luna is undelegated, this action cannot be undone until the 21 days are completed.

:::
