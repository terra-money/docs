# Treasury

The Treasury module acts as the "central bank" of the Terra economy, measuring macroeconomic activity by [observing indicators](#observed-indicators) and adjusting [monetary policy levers](#monetary-policy-levers) to modulate miner incentives toward stable, long-term growth.

::: warning NOTE
While the Treasury stabilizes miner demand through adjusting rewards, the [`Market`](dev-spec-market.md) is responsible for Terra price-stability through arbitrage and market maker.
:::

## Observed Indicators

The Treasury observes three macroeconomic indicators for each epoch (set to 1 week) and keeps [historical records](#indicators) of their values during previous epochs.

- **Tax Rewards**: $T$, Income generated from transaction fees (stability fee) in a during the epoch.
- **Seigniorage Rewards**: $S$, Amount of seignorage generated from Luna swaps to Terra during the epoch that is destined for ballot rewards inside the `Oracle` rewards.
- **Total Staked Luna**: $\lambda$, total Luna that has been staked by users and bonded by their delegated validators.

These indicators can be used to derive two other values, the **Tax Reward per unit Luna** represented by $\tau = T / \lambda$, used in [Updating Tax Rate](#kupdatetaxpolicy), and **total mining rewards** $R = T + S$, simply the sum of the Tax Rewards and the Seigniorage Rewards, used in [Updating Reward Weight](#kupdaterewardpolicy).

The protocol can compute and compare the short-term ([`WindowShort`](#windowshort)) and long-term ([`WindowLong`](#windowlong)) rolling averages of the above indicators to determine the relative direction and velocity of the Terra economy.

## Monetary Policy Levers

> From Columbus-3, the Reward Weight lever replaces the previous lever for controlling the rate of Luna burn in seigniorage. Now, miners are compensated through burning from swap fees, and ballot rewards in the oracle.
> {note}

- **Tax Rate** $r$ adjusts the amount of income coming from Terra transactions, limited by [_tax cap_](#tax-caps).

- **Reward Weight** $w$ which is the portion of seigniorage allocated for the reward pool for the ballot winners for correctly voting within the reward band of the weighted median of exchange rate in the [`Oracle`](dev-spec-oracle.md) module.

### Updating Policies

Both [Tax Rate](#tax-rate) and [Reward Weight](#reward-weight) are stored as values in the `KVStore`, and can have their values updated through [governance proposals](#governance-proposals) once passed. The Treasury will also re-calibrate each lever once per epoch to stabilize unit returns for Luna, thereby ensuring predictable mining rewards from staking:

- For Tax Rate, in order to make sure that unit mining rewards do not stay stagnant, the treasury adds a [`MiningIncrement`](#miningincrement) so mining rewards increase steadily over time, described [here](#kupdatetaxpolicy).

- For Reward Weight, The Treasury observes the portion of burden seigniorage needed to bear the overall reward profile, [`SeigniorageBurdenTarget`](#seigniorageburdentarget), and hikes up rates accordingly, described [here](#kupdaterewardpolicy).

### Policy Constraints

Policy updates from both governance proposals and automatic calibration are constrained by the [`TaxPolicy`](#taxpolicy) and [`RewardPolicy`](#rewardpolicy) parameters, respectively. The type `PolicyConstraints` specifies the floor, ceiling, and the max periodic changes for each variable.

```go
// PolicyConstraints defines constraints around updating a key Treasury variable
type PolicyConstraints struct {
    RateMin       sdk.Dec  `json:"rate_min"`
    RateMax       sdk.Dec  `json:"rate_max"`
    Cap           sdk.Coin `json:"cap"`
    ChangeRateMax sdk.Dec  `json:"change_max"`
}
```

The logic for constraining a policy lever update is performed by `pc.Clamp()`, shown below.

```go
// Clamp constrains a policy variable update within the policy constraints
func (pc PolicyConstraints) Clamp(prevRate sdk.Dec, newRate sdk.Dec) (clampedRate sdk.Dec) {
	if newRate.LT(pc.RateMin) {
		newRate = pc.RateMin
	} else if newRate.GT(pc.RateMax) {
		newRate = pc.RateMax
	}

	delta := newRate.Sub(prevRate)
	if newRate.GT(prevRate) {
		if delta.GT(pc.ChangeRateMax) {
			newRate = prevRate.Add(pc.ChangeRateMax)
		}
	} else {
		if delta.Abs().GT(pc.ChangeRateMax) {
			newRate = prevRate.Sub(pc.ChangeRateMax)
		}
	}
	return newRate
}
```

### Probation

A probationary period specified by the [`WindowProbation`](#windowprobation) will prevent the network from performing updates for Tax Rate and Reward Weight during the first epochs after genesis to allow the blockchain to first obtain a critical mass of transactions and a mature and reliable history of indicators.

## Governance Proposals

The Treasury module defines special proposals which allow the [Tax Rate](#tax-rate) and [Reward Weight](#reward-weight) values in the `KVStore` to be voted on and changed accordingly, subject to the [policy constraints](#policy-constraints) imposed by `pc.Clamp()`.

### `TaxRateUpdateProposal`

```go
type TaxRateUpdateProposal struct {
	Title       string  `json:"title" yaml:"title"`             // Title of the Proposal
	Description string  `json:"description" yaml:"description"` // Description of the Proposal
	TaxRate     sdk.Dec `json:"tax_rate" yaml:"tax_rate"`       // target TaxRate
}
```

### `RewardWeightUpdateProposal`

```go
type RewardWeightUpdateProposal struct {
	Title        string  `json:"title" yaml:"title"`                 // Title of the Proposal
	Description  string  `json:"description" yaml:"description"`     // Description of the Proposal
	RewardWeight sdk.Dec `json:"reward_weight" yaml:"reward_weight"` // target RewardWeight
}
```

## State

### Tax Rate

- `k.GetTaxRate(ctx) sdk.Dec`
- `k.SetTaxRate(ctx, taxRate sdk.Dec)`

`sdk.Dec` representing the value of the Tax Rate policy lever for the current epoch.

- default value: `sdk.NewDecWithPrec(1, 3)` (0.1%)

### Reward Weight

- `k.GetRewardWeight(ctx) sdk.Dec`
- `k.SetRewardWeight(ctx, rewardWeight sdk.Dec)`

`sdk.Dec` representing the value of the Reward Weight policy lever for the current epoch.

- default value: `sdk.NewDecWithPrec(5, 2)` (5%)

### Tax Caps

- `k.GetTaxCap(ctx, denom string) sdk.Int`
- `k.SetTaxCap(ctx, denom string, taxCap sdk.Int)`

Treasury keeps a `KVStore` that maps a denomination `denom` to an `sdk.Int` that represents that maximum income that can be generated from taxes on a transaction in that denomination. This is updated every epoch with the equivalent value of [`TaxPolicy.Cap`](#taxpolicy) at the current exchange rate.

For instance, if a transaction's value were 100 SDT, and tax rate and tax cap 5% and 1 SDT respectively, the income generated from the transaction would be 1 SDT instead of 5 SDT, as it exceeds the tax cap.

### Tax Proceeds

- `k.RecordEpochTaxProceeds(ctx, delta sdk.Coins)`
- `k.PeekEpochTaxProceeds(ctx) sdk.Coins`

The `sdk.Coins` that represents the Tax Rewards $T$ for the current epoch.

### Epoch Initial Issuance

- `k.RecordEpochInitialIssuance(ctx)`
- `k.PeekEpochSeigniorage(ctx) sdk.Int`

The `sdk.Coins` that represents the total supply of Luna at the beginning of the current epoch. This value is used in [`k.SettleSeigniorage()`](#ksettleseigniorage) to calculate the seigniorage to distribute at the end of the epoch.

Recording the initial issuance will automatically use the [`Supply`](dev-spec-supply.md) module to determine the total issuance of Luna. Peeking will return the epoch's initial issuance of µLuna as `sdk.Int` instead of `sdk.Coins` for convenience.

### Indicators

The Treasury keeps track of following indicators for the present and previous epochs:

#### Tax Rewards

- `k.GetTR(ctx, epoch int64) sdk.Dec`
- `k.SetTR(ctx, epoch int64, TR sdk.Dec)`

An `sdk.Dec` representing the Tax Rewards $T$ for the `epoch`.

#### Seigniorage Rewards

- `k.GetSR(ctx, epoch int64) sdk.Dec`
- `k.SetSR(ctx, epoch int64, SR sdk.Dec)`

An `sdk.Dec` representing the Seigniorage Rewards $S$ for the `epoch`.

#### Total Staked Luna

- `k.GetTSL(ctx, epoch int64) sdk.Int`
- `k.SetTSL(ctx, epoch int64, TSL sdk.Int)`

An `sdk.Int` representing the Total Staked Luna $\lambda$ for the `epoch`.

## Functions

### `k.UpdateIndicators()`

```go
func (k Keeper) UpdateIndicators(ctx sdk.Context)
```

This function gets run at the end of an epoch $t$ and records the current values of tax rewards $T$, seigniorage rewards $S$, and total staked Luna $\lambda$ as the historic indicators for epoch $t$ before moving to the next epoch $t+1$.

- $T_t$ is the current value in [`TaxProceeds`](#tax-proceeds)
- $S_t = \Sigma * w$, with epoch seigniorage $\Sigma$ and reward weight $w$.
- $\lambda_t$ is simply the result of `staking.TotalBondedTokens()`

### `k.UpdateTaxPolicy()`

```go
func (k Keeper) UpdateTaxPolicy(ctx sdk.Context) (newTaxRate sdk.Dec)
```

This function gets called at the end of an epoch to calculate the next value of the Tax Rate monetary lever.

Consider $r_t$ to be the current Tax Rate, and $n$ to be the [`MiningIncrement`](#miningincrement) parameter.

1. Calculate the rolling average $\tau_y$ of Tax Rewards per unit Luna over the last year `WindowLong`.

2. Calculate the rolling average $\tau_m$ of Tax Rewards per unit Luna over the last month `WindowShort`.

3. If $\tau_m = 0$, there was no tax revenue in the last month. The Tax Rate should thus be set to the maximum permitted by the Tax Policy, subject to the rules of `pc.Clamp()` (see [constraints](#policy-constraints)).

4. Otherwise, the new Tax Rate is $r_{t+1} = (n r_t \tau_y)/\tau_m$, subject to the rules of `pc.Clamp()` (see [constraints](#policy-constraints)).

As such, the Treasury hikes up Tax Rate when tax revenues in a shorter time window is performing poorly in comparison to the longer term tax revenue average. It lowers Tax Rate when short term tax revenues are outperforming the longer term index.

### `k.UpdateRewardPolicy()`

```go
func (k Keeper) UpdateRewardPolicy(ctx sdk.Context) (newRewardWeight sdk.Dec)
```

This function gets called at the end of an epoch to calculate the next value of the Reward Weight monetary lever.

Consider $ w_t $ to be the current reward weight, and $ b $ to be the [`SeigniorageBurdenTarget`](#seigniorageburdentarget) parameter.

1. Calculate the sum of $S_m$ of seignorage rewards over the last month `WindowShort`.

2. Calculate the sum of $R_m$ of total mining rewards over the last month `WindowShort`.

3. If either $R_m = 0$ or $S_m = 0$ there was no mining and seigniorage rewards in the last month. The Rewards Weight should thus be set to the maximum permitted by the Reward Policy, subject to the rules of `pc.Clamp()` (see [constraints](#policy-constraints)).

4. Otherwise, the new Reward Weight is $ w_{t+1} = b w_t S_m / R_m $, subject to the rules of `pc.Clamp()` (see [constraints](#policy-constraints)).

### `k.UpdateTaxCap()`

```go
func (k Keeper) UpdateTaxCap(ctx sdk.Context) sdk.Coins
```

This function is called at the end of an epoch to compute the Tax Caps for every denomination for the next epoch.

For each denomination in circulation, the new Tax Cap for that denomination is set to be the global Tax Cap defined in the [`TaxPolicy`](#taxpolicy) parameter, at current exchange rates.

### `k.SettleSeigniorage()`

```go
func (k Keeper) SettleSeigniorage(ctx sdk.Context)
```

This function is called at the end of an epoch to compute seigniorage and forwards the funds to the [`Oracle`](dev-spec-oracle.md) module for ballot rewards, and the [`Distribution`](dev-spec-distribution.md) for the community pool.

1. The seigniorage $\Sigma$ of the current epoch is calculated by taking the difference between the Luna supply at the start of the epoch ([Epoch Initial Issuance](#epoch-initial-issuance)) and the Luna supply at the time of calling.

   Note that $\Sigma > 0$ when the current Luna supply is lower than at the start of the epoch, because the Luna had been burned from Luna swaps into Terra. See [here](dev-spec-market.md#seigniorage).

2. The Reward Weight $w$ is the percentage of the seigniorage designated for ballot rewards. Amount $S$ of new Luna is minted, and the [`Oracle`](dev-spec-oracle.md) module receives $S = \Sigma * w$ of the seigniorage.

3. The remainder of the coins $\Sigma - S$ is sent to the [`Distribution`](dev-spec-distribution.md) module, where it is allocated into the community pool.

## Transitions

### End-Block

If the blockchain is at the final block of the epoch, the following procedure is run:

1. Update all the indicators with [`k.UpdateIndicators()`](#kupdateindicators)

2. If the this current block is under [probation](#probation), skip to step 6.

3. [Settle seigniorage](#ksettleseigniorage) accrued during the epoch and make funds available to ballot rewards and the community pool during the next epoch.

4. Calculate the [Tax Rate](#kupdatetaxpolicy), [Reward Weight](#kupdaterewardpolicy), and [Tax Cap](#kupdatetaxcap) for the next epoch.

5. Emit the [`policy_update`](#policy_update) event, recording the new policy lever values.

6. Finally, record the Luna issuance with [`k.RecordEpochInitialIssuance()`](#epoch-initial-issuance). This will be used in calculating the seigniorage for the next epoch.

## Parameters

The subspace for the Treasury module is `treasury`.

```go
type Params struct {
	TaxPolicy               PolicyConstraints `json:"tax_policy" yaml:"tax_policy"`
	RewardPolicy            PolicyConstraints `json:"reward_policy" yaml:"reward_policy"`
	SeigniorageBurdenTarget sdk.Dec           `json:"seigniorage_burden_target" yaml:"seigniorage_burden_target"`
	MiningIncrement         sdk.Dec           `json:"mining_increment" yaml:"mining_increment"`
	WindowShort             int64             `json:"window_short" yaml:"window_short"`
	WindowLong              int64             `json:"window_long" yaml:"window_long"`
	WindowProbation         int64             `json:"window_probation" yaml:"window_probation"`
}
```

### `TaxPolicy`

- type: `PolicyConstraints`
- default value:

```go
DefaultTaxPolicy = PolicyConstraints{
    RateMin:       sdk.NewDecWithPrec(5, 4), // 0.05%
    RateMax:       sdk.NewDecWithPrec(1, 2), // 1%
    Cap:           sdk.NewCoin(core.MicroSDRDenom, sdk.OneInt().MulRaw(core.MicroUnit)), // 1 SDR Tax cap
    ChangeRateMax: sdk.NewDecWithPrec(25, 5), // 0.025%
}
```

Constraints / rules for updating the [Tax Rate](#tax-rate) monetary policy lever.

### `RewardPolicy`

- type: `PolicyConstraints`
- default value:

```go
DefaultRewardPolicy = PolicyConstraints{
    RateMin:       sdk.NewDecWithPrec(5, 2), // 5%
    RateMax:       sdk.NewDecWithPrec(90, 2), // 90%
    ChangeRateMax: sdk.NewDecWithPrec(25, 3), // 2.5%
    Cap:           sdk.NewCoin("unused", sdk.ZeroInt()), // UNUSED
}
```

Constraints / rules for updating the [Reward Weight](#reward-weight) monetary policy lever.

### `SeigniorageBurdenTarget`

- type: `sdk.Dec`
- default value: `sdk.NewDecWithPrec(67, 2)` (67%)

Multiplier specifying portion of burden seigniorage needed to bear the overall reward profile for Reward Weight updates during epoch transition.

### `MiningIncrement`

- type: `sdk.Dec`
- default value: `sdk.NewDecWithPrec(107, 2)` (1.07 growth rate, 15% CAGR of $\tau$)

Multiplier determining an annual growth rate for Tax Rate policy updates during epoch transition.

### `WindowShort`

- type: `int64`
- default value: `4` (month = 4 weeks)

A number of epochs that specifuies a time interval for calculating short-term moving average.

### `WindowLong`

- type: `int64`
- default value: `52` (year = 52 weeks)

A number of epochs that specifies a time interval for calculating long-term moving average.

### `WindowProbation`

- type: `int64`
- default value: `12` (3 months = 12 weeks)

A number of epochs that specifies a time interval for the probationary period.

## Events

The Treasury module emits the following events:

### `policy_update`

| Key               | Value         |
| :---------------- | :------------ |
| `"tax_rate"`      | tax rate      |
| `"reward_weight"` | reward weight |
| `"tax_cap"`       | tax cap       |

## Errors

### `ErrInvalidEpoch`

Called when the epoch queried exceeds the current epoch.
