# Oracle

The Oracle module provides the Terra blockchain with an up-to-date and accurate price feed of exchange rates of Luna against various Terra pegs so that the [Market](spec-market.md) may provide fair exchanges between Terra<>Terra currency pairs, as well as Terra<>Luna.

As price information is extrinsic to the blockchain, the Terra network relies on validators to periodically vote on the current Luna exchange rate, with the protocol tallying up the results once per `VotePeriod` and updating the on-chain exchange rate as the weighted median of the ballot converted Cross Exchange Rates using `ReferenceTerra`.

::: warning NOTE
Since the Oracle service is powered by validators, you may find it interesting to look at the [Staking](spec-staking.md) module, which covers the logic for staking and validators.
:::

## Concepts

### Voting Procedure

During each [`VotePeriod`](#voteperiod), the Oracle module obtains consensus on the exchange rate of Luna against denominations specified in [`Whitelist`](#whitelist) by requiring all members of the validator set to submit a vote for Luna exchange rate before the end of the interval.

Validators must first pre-commit to a exchange rate, then in the subsequent `VotePeriod` submit and reveal their exchange rate alongside a proof that they had pre-commited at that price. This scheme forces the voter to commit to a submission before knowing the votes of others and thereby reduces centralization and free-rider risk in the Oracle.

#### Prevote and Vote

Let $P_t$ be the current time interval of duration defined by [`VotePeriod`](#voteperiod)(currently set to 5 blockchain blocks) during which validators must submit two messages:

- A [`MsgExchangeRatePrevote`](#msgexchangerateprevote), containing the SHA256 hash of the exchange rate of Luna with respect to a Terra peg. A separate prevote must be submitted for each different denomination on which to report a Luna exchange rate.

- A [`MsgExchangeRateVote`](#msgexchangeratevote), containing the salt used to create the hash for the prevote submitted in the previous interval $P_{t-1}$.

#### Vote Tally

At the end of $P_t$, the submitted votes are tallied.

The submitted salt of each vote is used to verify consistency with the prevote submitted by the validator in $P_{t-1}$. If the validator has not submitted a prevote, or the SHA256 resulting from the salt does not match the hash from the prevote, the vote is dropped.

For each denomination, if the total voting power of submitted votes exceeds 50%, the weighted median of the votes is recorded on-chain as the effective exchange rate for Luna against that denomination for the following `VotePeriod` $P_{t+1}$.

Denominations receiving fewer than [`VoteThreshold`](#votethreshold) total voting power have their exchange rates deleted from the store, and no swaps can be made with it during the next `VotePeriod` $P_{t+1}$.

Choose `ReferenceTerra` with the highest voter turnout. If the voting power of the two denominations is the same, select reference Terra in alphabetical order.

#### Compute Cross Exchange Rate using Reference Terra

1. Choose `ReferenceTerra`

   - Let `Vote_j = Vote_j_1 ... Vote_j_n` be the `uluna` exchange rate votes for each terra for validator `Val_j` in a given `VotePeriod`. `n` = number of total terra whitelist
   - For all terra whitelist  `w_1 ... w_n`, choose the index `r` with the highest voter turnout. If the vote turnout has multiple tie winner, we choose in alphabetical order. `w_r` is chosen as the `ReferenceTerra` from which to compute cross exchange rates.

2. Compute Oracle Exchange Rate

   - Each validator now calculate cross exchange rates(`CER`) for `w_i` as below.
     - for `i≠r`, `CER_j_i = Vote_j_r / Vote_j_i`
     - for `i=r`, `CER_j_i = Vote_j_r`
   - Calculate power weighted median(`PWM`, across all validators) for each cross exchange rates `CER_j_iMCER_i` = `PWM`(for all j)[`CER_j_i`]
   - Now we transform these `MCER_i`s into the original form uluna/terra as below
     - for `i≠r`, `LunaRate_i = MCER_r / MCER_i`
     - for `i=r`, `LunaRate_i = MCER_r`

3. Reward ballot winners
   - For `i=r`, same as before, reward ballot winners based `CER_j_i = Vote_j_r` ballot with `MCER_i` using [`tally()`](#tally).
   - For `i≠r`,  reward ballot winners based `CER_j_i = Vote_j_r / Vote_j_i` ballot with `MCER_i` using [`tally()`](#tally).

#### Ballot Rewards

After the votes are tallied, the winners of the ballots are determined with [`tally()`](#tally).

Voters that have managed to vote within a narrow band around the weighted median, are rewarded with a portion of the collected seigniorage. See [`k.RewardBallotWinners()`](#k-rewardballotwinners) for more details.

::: warning NOTE
Starting from Columbus-3, fees from [Market](spec-market.md) swaps are no longer are included in the oracle reward pool, and are immediately burned during the swap operation.
:::

### Reward Band

Let $M$ be the weighted median, $\sigma$ be the standard deviation of the votes in the ballot, and $R$ be the [`RewardBand`](#rewardband) parameter. The band around the median is set to be $\varepsilon = \max(\sigma, R/2)$. All valid (i.e. bonded and non-jailed) validators that submitted an exchange rate vote in the interval $\left[ M - \varepsilon, M + \varepsilon \right]$ should be included in the set of winners, weighted by their relative vote power.

### Slashing

::: danger
Be sure to read this section carefully as it concerns potential loss of funds.
:::

A `VotePeriod` during which either of the following events occur is considered a "miss":

- The validator fails to submits a vote for Luna exchange rate against **each and every** denomination specified in[`Whitelist`](#whitelist).

- The validator fails to vote within the [reward band](#reward-band) around the weighted median for one or more denominations.

During every [`SlashWindow`](#slashwindow), participating validators must maintain a valid vote rate of at least [`MinValidPerWindow`](#minvalidperwindow) (5%), lest they get their stake slashed (currently set to [0.01%](#slashfraction)). The slashed validator is automatically temporarily "jailed" by the protocol (to protect the funds of delegators), and the operator is expected to fix the discrepancy promptly to resume validator participation.

### Abstaining from Voting

A validator may abstain from voting by submitting a non-positive integer for the `ExchangeRate` field in [`MsgExchangeRateVote`](#msgexchangeratevote). Doing so will absolve them of any penalties for missing `VotePeriod`s, but also disqualify them from receiving Oracle seigniorage rewards for faithful reporting.

## Message Types

::: warning NOTE
The control flow for vote-tallying, Luna exchange rate updates, ballot rewards and slashing happens at the end of every `VotePeriod`, and is found at the [end-block ABCI function](#end-block) rather than inside message handlers.
:::

### MsgExchangeRatePrevote

```go
// MsgExchangeRatePrevote - struct for prevoting on the ExchangeRateVote.
// The purpose of prevote is to hide vote exchange rate with hash
// which is formatted as hex string in SHA256("salt:exchange_rate:denom:voter")
type MsgExchangeRatePrevote struct {
	Hash      string         `json:"hash" yaml:"hash"` // hex string
	Denom     string         `json:"denom" yaml:"denom"`
	Feeder    sdk.AccAddress `json:"feeder" yaml:"feeder"`
	Validator sdk.ValAddress `json:"validator" yaml:"validator"`
}
```

`Hash` is a hex string generated by the leading 20 bytes of the SHA256 hash (hex string) of a string of the format `salt:exchange_rate:denom:voter`, the metadata of the actual `MsgExchangeRateVote` to follow in the next `VotePeriod`. You can use the [`VoteHash()`](#votehash) function to help encode this hash. Note that since in the subsequent `MsgExchangeRateVote`, the salt will have to be revealed, the salt used must be regenerated for each prevote submission.

`Denom` is the denomination of the currency for which the vote is being cast. For example, if the voter wishes to submit a prevote for the usd, then the correct `Denom` is `uusd`.

The exchange rate used in the hash must be the open market exchange rate of Luna, with respect to the denomination matching `Denom`. For example, if `Denom` is `uusd` and the going exchange rate for Luna is 1 USD, then "1" must be used as the exchange rate, as `1 uluna` = `1 uusd`.

`Feeder` (`terra-` address) is used if the validator wishes to delegate oracle vote signing to a separate key (who "feeds" the price in lieu of the operator) to de-risk exposing their validator signing key.

`Validator` is the validator address (`terravaloper-`) of the original validator.


### MsgExchangeRateVote

The `MsgExchangeRateVote` contains the actual exchange rate vote. The `Salt` parameter must match the salt used to create the prevote, otherwise the voter cannot be rewarded.

```go
// MsgExchangeRateVote - struct for voting on the exchange rate of Luna denominated in various Terra assets.
// For example, if the validator believes that the effective exchange rate of Luna in USD is 10.39, that's
// what the exchange rate field would be, and if 1213.34 for KRW, same.
type MsgExchangeRateVote struct {
	ExchangeRate sdk.Dec        `json:"exchange_rate" yaml:"exchange_rate"`
	Salt         string         `json:"salt" yaml:"salt"`
	Denom        string         `json:"denom" yaml:"denom"`
	Feeder       sdk.AccAddress `json:"feeder" yaml:"feeder"`
	Validator    sdk.ValAddress `json:"validator" yaml:"validator"`
}
```

### MsgDelegateFeedConsent

Validators may also elect to delegate voting rights to another key to prevent the block signing key from being kept online. To do so, they must submit a `MsgDelegateFeedConsent`, delegating their oracle voting rights to a `Delegate` that sign `MsgExchangeRatePrevote` and `MsgExchangeRateVote` on behalf of the validator.

::: danger
Delegate validators will likely require you to deposit some funds (in Terra or Luna) which they can use to pay fees, sent in a separate `MsgSend`. This agreement is made off-chain and not enforced by the Terra protocol.
:::

The `Operator` field contains the operator address of the validator (prefixed `terravaloper-`). The `Delegate` field is the account address (prefixed `terra-`) of the delegate account that will be submitting exchange rate related votes and prevotes on behalf of the `Operator`.

```go
// MsgDelegateFeedConsent - struct for delegating oracle voting rights to another address.
type MsgDelegateFeedConsent struct {
	Operator  sdk.ValAddress `json:"operator" yaml:"operator"`
	Delegate sdk.AccAddress `json:"delegate" yaml:"delegate"`
}
```

### MsgAggregateExchangeRatePrevote

```go
type MsgAggregateExchangeRatePrevote struct {
	Hash      AggregateVoteHash `json:"hash" yaml:"hash"`
	Feeder    sdk.AccAddress    `json:"feeder" yaml:"feeder"`
	Validator sdk.ValAddress    `json:"validator" yaml:"validator"`
}
```

### MsgAggregateExchangeRateVote

```go
type MsgAggregateExchangeRateVote struct {
	Salt          string         `json:"salt" yaml:"salt"`
	ExchangeRates string         `json:"exchange_rates" yaml:"exchange_rates"` // comma separated dec coins
	Feeder        sdk.AccAddress `json:"feeder" yaml:"feeder"`
	Validator     sdk.ValAddress `json:"validator" yaml:"validator"`
}
```

## State

### Prevotes

- type: `map[voter: ValAddress][denom: string]ExchangeRatePrevote`

Contains validator `voter`'s prevote for a given `denom` for the current `VotePeriod`.

### Votes

- type: `map[voter: ValAddress][denom: string]ExchangeRateVote`

Contains validator `voter`'s vote for a given `denom` for the current `VotePeriod`.

### Luna Exchange Rate

- type: `map[denom: string]Dec`

Stores the current Luna exchange rate against a given `denom`, which is used by the [`Market`](spec-market.md) module for pricing swaps.

### Oracle Delegates

- type: `map[operator: ValAddress]AccAddress`

Address of `operator`'s delegated price feeder.

### Validator Misses

- type: `map[operator: ValAddress]int64`

An `int64` representing the number of `VotePeriods` that validator `operator` missed during the current `SlashWindow`.

## Functions

### `VoteHash()`

```go
func VoteHash(salt string, rate sdk.Dec, denom string, voter sdk.ValAddress) ([]byte, error)
```

This function computes the truncated SHA256 hash value from `salt:rate:denom:voter` for an `ExchangeRateVote`, which is submitted in an `MsgExchangeRatePrevote` in the `VotePeriod` prior.

### `tally()`

```go
func tally(ctx sdk.Context, pb types.ExchangeRateBallot, rewardBand sdk.Dec) (weightedMedian sdk.Dec, ballotWinners []types.Claim)
```

This function contains the logic for tallying up the votes for a specific ballot of a denomination, and determines the weighted median $M$ as well as the winners of the ballot.

### `k.RewardBallotWinners()`

```go
func (k Keeper) RewardBallotWinners(ctx sdk.Context, ballotWinners types.ClaimPool)
```

At the end of every `VotePeriod`, a portion of the seigniorage is rewarded to the oracle ballot winners (validators who submitted an exchange rate vote within the band).

The total amount of Luna rewarded per `VotePeriod` is equal to the current amount of Luna in the reward pool (the Luna owned by the Oracle module) divided by the parameter [`RewardDistributionWindow`](#rewarddistributionwindow).

Each winning validator gets a portion of the reward proportional to their winning vote weight for that period.

### `SlashAndResetMissCounters()`

```go
func SlashAndResetMissCounters(ctx sdk.Context, k Keeper)
```

This function is called at the end of every `SlashWindow` and will check the miss counters of every validator to see if that validator met the minimum valid votes defined in the parameter [`MinValidPerWindow`](#minvalidperwindow) (did not miss more than the threshold).

If a validator does not reach the criteria, their staked funds are slashed by [`SlashFraction`](#slashfraction), and they are jailed.

After checking all validators, all miss counters are reset back to zero for the next `SlashWindow`.

## Transitions

### End-Block

At the end of every block, the Oracle module checks whether it's the last block of the `VotePeriod`. If it is, it runs the [Voting Procedure](#voting-procedure):

1. All current active Luna exchange rates are purged from the store

2. Received votes are organized into ballots by denomination. Abstained votes, as well as votes by inactive or jailed validators are ignored

3. Denominations not meeting the following requirements will be dropped:

   - Must appear in the permitted denominations in [`Whitelist`](#whitelist)
   - Ballot for denomination must have at least [`VoteThreshold`](#votethreshold) total vote power
   - Choose `ReferenceTerra` with the highest voter turnout

4. For each remaining `denom` with a passing ballot:

   - Tally up votes with [`Compute Cross Exchange Rate using Reference Terra`](#compute-cross-exchange-rate-using-reference-terra) and find the weighted median exchange rate and winners with [`tally()`](#tally)
   - Iterate through winners of the ballot and add their weight to their running total
   - Set the Luna exchange rate on the blockchain for that Luna<>`denom` with `k.SetLunaExchangeRate()`
   - Emit a [`exchange_rate_update`](#exchange_rate_update) event

5. Count up the validators who [missed](#slashing) the Oracle vote and increase the appropriate miss counters

6. If at the end of a [`SlashWindow`](#slashwindow), penalize validators who have missed more than the penalty threshold (submitted fewer valid votes than [`MinValidPerWindow`](#minvalidperwindow))

7. Distribute rewards to ballot winners with [`k.RewardBallotWinners()`](#krewardballotwinners)

8. Clear all prevotes (except ones for the next `VotePeriod`) and votes from the store

::: details Events

| Type                 | Attribute Key | Attribute Value |
| -------------------- | ------------- | --------------- |
| exchange_rate_update | denom         | {denom}         |
| exchange_rate_update | exchange_rate | {exchangeRate}  |

:::

## Parameters

The subspace for the Oracle module is `oracle`.

```go
// Params oracle parameters
type Params struct {
	VotePeriod               int64     `json:"vote_period" yaml:"vote_period"`
	VoteThreshold            sdk.Dec   `json:"vote_threshold" yaml:"vote_threshold"`
	RewardBand               sdk.Dec   `json:"reward_band" yaml:"reward_band"`
	RewardDistributionWindow int64     `json:"reward_distribution_window" yaml:"reward_distribution_window"`
	Whitelist                DenomList `json:"whitelist" yaml:"whitelist"`
	SlashFraction            sdk.Dec   `json:"slash_fraction" yaml:"slash_fraction"`
	SlashWindow              int64     `json:"slash_window" yaml:"slash_window"`
	MinValidPerWindow        sdk.Dec   `json:"min_valid_per_window" yaml:"min_valid_per_window"`
}
```

### VotePeriod

- type: `int64`
- default value: `5 blockchain blocks'

The number of blocks during which voting takes place.

### VoteThreshold

- type: `Dec`
- default value: 50%

The minimum percentage of votes that must be received for a ballot to pass.

### RewardBand

- type: `Dec`
- default value: 7%

The tolerated error from the final weighted mean exchange rate that can receive rewards.

### RewardDistributionWindow

- type: `int64`
- default value: `BlocksPerYear` (1 year window)

The number of blocks during which seigniorage reward comes in and then is distributed.

### Whitelist

- type: `oracle.DenomList`
- default: `[ukrt, uusd, usdr]`

The list of currencies that can be voted on. This is set to (µKRW, µSDR, µUSD) by default.

### SlashFraction

- type: `Dec`
- default: 0.01%

The ratio of penalty on bonded tokens.

### SlashWindow

- type: `int64`
- default: `BlocksPerWeek`

The number of blocks for slashing tallying.

### MinValidPerWindow

- type: `Dec`
- default: 5%

The ratio of minimum valid oracle votes per slash window to avoid slashing.
