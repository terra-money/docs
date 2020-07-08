# Distribution

::: warning NOTE
Terra's Distribution module inherits from Cosmos SDK's [`distribution`](https://github.com/cosmos/cosmos-sdk/tree/v0.37.4/docs/spec/distribution) module. This document is a stub, and covers mainly important Terra-specific notes about how it is used.
:::

The `Distribution` module describes a mechanism that keeps track of collected fees and _passively_ distributes them to validators and delegators. In addition, the Distribution module also defines the [Community Pool](#community-pool), which are funds under the control of on-chain Governance.

## Concepts

### Validator & Delegator Rewards

::: warning IMPORTANT
Passive distribution means that validators and delegators will have to manually collect their fee rewards by submitting withdrawal transactions. Read up on how to do so with `terracli` [here](../terracli/distribution.md).
:::

Collected rewards are pooled globally and divided out passively to validators and delegators. Each validator has the opportunity to charge commission to the delegators on the rewards collected on behalf of the delegators. Fees are collected directly into a global reward pool and validator proposer-reward pool. Due to the nature of passive accounting, whenever changes to parameters which affect the rate of reward distribution occurs, withdrawal of rewards must also occur.

### Community Pool

The Community Pool is a reserve of tokens that is designated for funding projects that promote further adoption and stimulate growth for the Terra economy. The portion of seigniorage that is designated for ballot winners of the Exchange Rate Oracle is called the [Reward Weight](spec-treasury.md#reward-weight), a value governed by the Treasury. The rest of that seigniorage is all dedicated to the Community Pool.

## State

> This section was taken from the official Cosmos SDK docs, and placed here for your convenience to understand the Distribution module's parameters and genesis variables.

### FeePool

All globally tracked parameters for distribution are stored within
`FeePool`. Rewards are collected and added to the reward pool and
distributed to validators/delegators from here.

Note that the reward pool holds decimal coins (`DecCoins`) to allow
for fractions of coins to be received from operations like inflation.
When coins are distributed from the pool they are truncated back to
`sdk.Coins` which are non-decimal.

### Validator Distribution

Validator distribution information for the relevant validator is updated each time:

1.  delegation amount to a validator is updated,
2.  a validator successfully proposes a block and receives a reward,
3.  any delegator withdraws from a validator, or
4.  the validator withdraws it's commission.

### Delegation Distribution

Each delegation distribution only needs to record the height at which it last
withdrew fees. Because a delegation must withdraw fees each time it's
properties change (aka bonded tokens etc.) its properties will remain constant
and the delegator's _accumulation_ factor can be calculated passively knowing
only the height of the last withdrawal and its current properties.

## Messages

### MsgSetWithdrawAddress

```go
type MsgSetWithdrawAddress struct {
	DelegatorAddress sdk.AccAddress `json:"delegator_address" yaml:"delegator_address"`
	WithdrawAddress  sdk.AccAddress `json:"withdraw_address" yaml:"withdraw_address"`
}
```

::: details JSON Example

Note that the type and name of the message are inconsistent.

```json
{
  "type": "distribution/MsgModifyWithdrawAddress",
  "value": {
    "delegator_address": "terra...",
    "withdraw_address": "terra..."
  }
}
```

:::

### MsgWithdrawDelegatorReward

```go
// msg struct for delegation withdraw from a single validator
type MsgWithdrawDelegatorReward struct {
	DelegatorAddress sdk.AccAddress `json:"delegator_address" yaml:"delegator_address"`
	ValidatorAddress sdk.ValAddress `json:"validator_address" yaml:"validator_address"`
}
```

::: details JSON Example

There is an inconsistency between the message's name and its type.

```json
{
  "type": "distribution/MsgWithdrawDelegationReward",
  "value": {
    "delegator_address": "terra...",
    "validator_address": "terra..."
  }
}
```

:::

### MsgWithdrawValidatorCommission

```go
type MsgWithdrawValidatorCommission struct {
	ValidatorAddress sdk.ValAddress `json:"validator_address" yaml:"validator_address"`
}
```

::: details JSON Example

```json
{
  "type": "distribution/MsgWithdrawValidatorCommission",
  "value": {
    "validator_address": "terravaloper..."
  }
}
```

:::

## Proposals

The Distribution module defines a special proposal that upon being passed, will disburse the coins specified in `Amount` to the `Recipient` account using funds from the Community Pool.

### `CommunityPoolSpendProposal`

```go
type CommunityPoolSpendProposal struct {
	Title       string         `json:"title" yaml:"title"`
	Description string         `json:"description" yaml:"description"`
	Recipient   sdk.AccAddress `json:"recipient" yaml:"recipient"`
	Amount      sdk.Coins      `json:"amount" yaml:"amount"`
}
```

## Transitions

### Begin-Block

> This section was taken from the official Cosmos SDK docs, and placed here for your convenience to understand the Distribution module's parameters.

At the beginning of the block, the Distribution module will set the proposer for determining distribution during endblock and distribute rewards for the previous block.

The fees received are transferred to the Distribution `ModuleAccount`, as it's the account the one who keeps track of the flow of coins in (as in this case) and out the module. The fees are also allocated to the proposer, community fund and global pool. When the validator is the proposer of the round, that validator (and their delegators) receives between 1% and 5% of fee rewards, the reserve [Community Tax](#communitytax) is then charged, then the remainder is distributed proportionally by voting power to all bonded validators independent of whether they voted (social distribution). Note the social distribution is applied to proposer validator in addition to the proposer reward.

The amount of proposer reward is calculated from pre-commits Tendermint messages in order to incentivize validators to wait and include additional pre-commits in the block. All provision rewards are added to a provision reward pool which validator holds individually (`ValidatorDistribution.ProvisionsRewardPool`).

```go
func AllocateTokens(feesCollected sdk.Coins, feePool FeePool, proposer ValidatorDistribution,
              sumPowerPrecommitValidators, totalBondedTokens, communityTax,
              proposerCommissionRate sdk.Dec)

     SendCoins(FeeCollectorAddr, DistributionModuleAccAddr, feesCollected)
     feesCollectedDec = MakeDecCoins(feesCollected)
     proposerReward = feesCollectedDec * (0.01 + 0.04
                       * sumPowerPrecommitValidators / totalBondedTokens)

     commission = proposerReward * proposerCommissionRate
     proposer.PoolCommission += commission
     proposer.Pool += proposerReward - commission

     communityFunding = feesCollectedDec * communityTax
     feePool.CommunityFund += communityFunding

     poolReceived = feesCollectedDec - proposerReward - communityFunding
     feePool.Pool += poolReceived

     SetValidatorDistribution(proposer)
     SetFeePool(feePool)
```

## Parameters

The subspace for the Distribution module is `distribution`.

```go
type GenesisState struct {
	...
	CommunityTax        sdk.Dec `json:"community_tax" yaml:"community_tax"`
	BaseProposerReward	sdk.Dec `json:"base_proposer_reward" yaml:"base_proposer_reward"`
	BonusProposerReward	sdk.Dec	`json:"bonus_proposer_reward" yaml:"bonus_proposer_reward"`
	WithdrawAddrEnabled bool 	`json:"withdraw_addr_enabled"`
	...
}
```

### CommunityTax

- type: `sdk.Dec`

### BaseProposerReward

- type: `sdk.Dec`

### BonusProposerReward

- type: `sdk.Dec`

### WithdrawAddrEnabled

- type: `bool`

## Events
