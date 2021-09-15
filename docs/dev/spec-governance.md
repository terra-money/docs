# Governance

> Terra's Governance module inherits from Cosmos SDK's [`gov`](https://github.com/cosmos/cosmos-sdk/tree/v0.37.4/docs/spec/governance) module. This document is a stub, and covers mainly important Terra-specific notes about how it is used.

Governance is the process through which participants within the Terra network can effect change on the protocol by submitting petitions known as "proposals," arriving at a popular consensus when a threshold amount of support has been reached for it. The proposal structure is versatile and allows for holders of Luna (those who have an interest in the long-term viability of the network) to voice their opinion on both blockchain parameter updates as well as future development of the Terra protocol.

Check the [Governance section of the `terracli` Reference](../terracli/governance.md) to see examples of how to participate in the Governance process.

## Concepts

The following is the governance proposal procedure:

### Deposit Period

After the proposal is submitted, it enters the deposit period, where it must reach a total minimum deposit of 512 Luna within 2 weeks from the time of its submission. The deposit threshold is reached when the sum of the initial deposit (from the proposer) and deposits from all other interested network participants goes meets or exceeds 512 Luna.

The deposit is only required as a form of spam protection, and the network will refund Luna deposits for proposals that have passed or have rejected but not vetoed.

### Voting Period

If the minimum deposit has been reached before the end of the deposit period, then the proposal goes into voting. The voting starts as soon as the minimum deposit has been reached, and lasts for another 2 weeks. While the proposal is in voting, Luna holders can cast votes for the proposal. The 4 voting options available are:

- `Yes` - in favor
- `No` - not in favor
- `NoWithVeto` - veto
- `Abstain` - does not influence vote

Voting is done by holders of bonded LUNA on a 1 bonded LUNA = 1 vote basis. As such, validators hold the most influence over the outcome of voting, and delegators by default inherit the vote of their validator if they don't vote.

### Tallying

Three conditions must be met for a proposal to pass.

1. Voter participation must be at least `quorum` $Q$:

$$\frac{Yes + No + NoWithVeto}{Stake} \ge Q$$

2. Ratio of `NoWithVeto` votes must be less than `veto` $V$:

$$\frac{NoWithVeto}{Yes + No + NoWithVeto} \lt V$$

3. Ratio of `Yes` votes must be greater than `threshold` $T$:

$$\frac{Yes}{Yes + No + NoWithVeto} \gt T$$

If any of the above conditions are not met, the proposal is rejected. The deposit associated with rejected proposals are not refunded and will be transferred instead to the Community Pool. The parameters `quorum`, `veto`, and `threshold` exist as blockchain parameters within the Governance module.

### Proposal Implementation

When the governance proposal is accepted, the changes described are automatically put into effect by the proposal handler. Generic proposals such as passed `TextProposal`s must be reviewed by the Terra team and community for how to manually implement.

## Data

### Proposal

```go
type Proposal struct {
	Content `json:"content" yaml:"content"` // Proposal content interface

	ProposalID       uint64         `json:"id" yaml:"id"`                                 //  ID of the proposal
	Status           ProposalStatus `json:"proposal_status" yaml:"proposal_status"`       // Status of the Proposal {Pending, Active, Passed, Rejected}
	FinalTallyResult TallyResult    `json:"final_tally_result" yaml:"final_tally_result"` // Result of Tallys

	SubmitTime     time.Time `json:"submit_time" yaml:"submit_time"`           // Time of the block where TxGovSubmitProposal was included
	DepositEndTime time.Time `json:"deposit_end_time" yaml:"deposit_end_time"` // Time that the Proposal would expire if deposit amount isn't met
	TotalDeposit   sdk.Coins `json:"total_deposit" yaml:"total_deposit"`       // Current deposit on this proposal. Initial value is set at InitialDeposit

	VotingStartTime time.Time `json:"voting_start_time" yaml:"voting_start_time"` // Time of the block where MinDeposit was reached. -1 if MinDeposit is not reached
	VotingEndTime   time.Time `json:"voting_end_time" yaml:"voting_end_time"`     // Time that the VotingPeriod for this proposal will end and votes will be tallied
}

```

::: details JSON Example

```json
{
  "content": {
    "type": "gov/TextProposal",
    "value": {
      "title": "proposal title",
      "description": "proposal description"
    }
  },
  "id": "1",
  "proposal_status": "Passed",
  "final_tally_result": {
    "yes": "40000000000",
    "abstain": "0",
    "no": "0",
    "no_with_veto": "0"
  },
  "submit_time": "2020-04-25T05:41:20.893245519Z",
  "deposit_end_time": "2020-04-27T05:41:20.893245519Z",
  "total_deposit": [
    {
      "denom": "uluna",
      "amount": "100000000"
    }
  ],
  "voting_start_time": "2020-04-25T05:41:20.893245519Z",
  "voting_end_time": "2020-04-27T05:41:20.893245519Z"
}
```

:::

A `Proposal` is a data structure representing a petition for a change that is submitted by to the blockchain alongside a deposit. Once its deposit reaches a certain value ([`MinDeposit`](#mindeposit)), the proposal is confirmed and voting opens. Bonded Luna hoolders can then send [`TxGovVote`]() transactions to vote on the proposal. Terra currently follows a simple voting scheme of 1 Bonded Luna = 1 Vote.

The `Content` on a proposal is an interface which contains the information about the `Proposal` such as the `title`, `description`, and any notable changes. Also, this `Content` type can by implemented by any module. The `Content`'s `ProposalRoute` returns a string which must be used to route the `Content`'s Handler in the Governance keeper. This allows the governance keeper to execute proposal logic implemented by any module. If a proposal passes, the handler is executed. Only if the handler is successful does the state get persisted and the proposal finally passes. Otherwise, the proposal is rejected.

## Message Types

### MsgSubmitProposal

```go
type MsgSubmitProposal struct {
	Content        Content        `json:"content" yaml:"content"`
	InitialDeposit sdk.Coins      `json:"initial_deposit" yaml:"initial_deposit"` //  Initial deposit paid by sender. Must be strictly positive
	Proposer       sdk.AccAddress `json:"proposer" yaml:"proposer"`               //  Address of the proposer
}
```

::: details JSON Example

```json
{
  "type": "gov/MsgSubmitProposal",
  "value": {
    "content": {
      "type": "gov/TextProposal",
      "value": {
        "title": "proposal name",
        "description": "proposal desc"
      }
    },
    "initial_deposit": [
      {
        "denom": "uluna",
        "amount": "999"
      }
    ],
    "proposer": "terra..."
  }
}
```

:::

### MsgDeposit

```go
type MsgDeposit struct {
	ProposalID uint64         `json:"proposal_id" yaml:"proposal_id"` // ID of the proposal
	Depositor  sdk.AccAddress `json:"depositor" yaml:"depositor"`     // Address of the depositor
	Amount     sdk.Coins      `json:"amount" yaml:"amount"`           // Coins to add to the proposal's deposit
}
```

::: details JSON Example

```json
{
  "type": "gov/MsgDeposit",
  "value": {
    "proposal_id": "1",
    "depositor": "terra...",
    "amount": [
      {
        "denom": "uluna",
        "amount": "1"
      }
    ]
  }
}
```

:::

### MsgVote

```go
type MsgVote struct {
	ProposalID uint64         `json:"proposal_id" yaml:"proposal_id"` // ID of the proposal
	Voter      sdk.AccAddress `json:"voter" yaml:"voter"`             //  address of the voter
	Option     VoteOption     `json:"option" yaml:"option"`           //  option from OptionSet chosen by the voter
}
```

::: details JSON Example

```json
{
  "type": "gov/MsgVote",
  "value": {
    "proposal_id": "1",
    "voter": "terra...",
    "option": "NoWithVeto"
  }
}
```

:::

## Proposals

### Text Proposal

```go
type TextProposal struct {
	Title       string `json:"title" yaml:"title"`
	Description string `json:"description" yaml:"description"`
}
```

Text Proposals are used for creating general-purpose petitions, such as asking the Core team to implement a specific feature. The community can reference a passed Text Proposal to the core developers to indicate that a feature (requiring potentially a soft or hard fork) is in significant demand.

### Parameter Change Proposals

```go
type ParameterChangeProposal struct {
	Title       string        `json:"title" yaml:"title"`
	Description string        `json:"description" yaml:"description"`
	Changes     []ParamChange `json:"changes" yaml:"changes"`
}

type ParamChange struct {
	Subspace string `json:"subspace" yaml:"subspace"`
	Key      string `json:"key" yaml:"key"`
	Subkey   string `json:"subkey,omitempty" yaml:"subkey,omitempty"`
	Value    string `json:"value" yaml:"value"`
}
```

::: warning NOTE
Parameter Change Proposals are actually located in the Params module, an internal module. It is shown here for your convenience.
:::

Parameter Change Proposals are a special type of proposal which, once passed, will automaticaly go in effect by directly altering the network's parameter specified. For each module, you can find the parameters associated with it by browsing to the **Parameters** section of the module specification.

### Software Upgrade Proposals

::: danger
Software Upgrade Proposals also exist due to inheritance from Cosmos SDK but are for the moment considered unavailable, as they have not yet been implemented. They thus share the same semantics as a simple Text Proposal. It is strongly advised to not submit these types of proposals at the risk of losing your Luna deposit.
:::

## Transitions

### End-Block

> This section was taken from the official Cosmos SDK docs, and placed here for your convenience to understand the Governance process.

`ProposalProcessingQueue` is a queue `queue[proposalID]` containing all the `ProposalID`s of proposals that reached `MinDeposit`. At the end of each block, all the proposals that have reached the end of their voting period are processed. To process a finished proposal, the application tallies the votes, computes the votes of each validator and checks if every validator in the validator set has voted. If the proposal is accepted, deposits are refunded. Finally, the proposal content `Handler` is executed.

```go
for finishedProposalID in GetAllFinishedProposalIDs(block.Time)
	proposal = load(Governance, <proposalID|'proposal'>) // proposal is a const key

	validators = Keeper.getAllValidators()
	tmpValMap := map(sdk.AccAddress)ValidatorGovInfo

	// Initiate mapping at 0. This is the amount of shares of the validator's vote that will be overridden by their delegator's votes
	for each validator in validators
	tmpValMap(validator.OperatorAddr).Minus = 0

	// Tally
	voterIterator = rangeQuery(Governance, <proposalID|'addresses'>) //return all the addresses that voted on the proposal
	for each (voterAddress, vote) in voterIterator
	delegations = stakingKeeper.getDelegations(voterAddress) // get all delegations for current voter

	for each delegation in delegations
		// make sure delegation.Shares does NOT include shares being unbonded
		tmpValMap(delegation.ValidatorAddr).Minus += delegation.Shares
		proposal.updateTally(vote, delegation.Shares)

	_, isVal = stakingKeeper.getValidator(voterAddress)
	if (isVal)
		tmpValMap(voterAddress).Vote = vote

	tallyingParam = load(GlobalParams, 'TallyingParam')

	// Update tally if validator voted they voted
	for each validator in validators
	if tmpValMap(validator).HasVoted
		proposal.updateTally(tmpValMap(validator).Vote, (validator.TotalShares - tmpValMap(validator).Minus))

	// Check if proposal is accepted or rejected
	totalNonAbstain := proposal.YesVotes + proposal.NoVotes + proposal.NoWithVetoVotes
	if (proposal.Votes.YesVotes/totalNonAbstain > tallyingParam.Threshold AND proposal.Votes.NoWithVetoVotes/totalNonAbstain  < tallyingParam.Veto)
	//  proposal was accepted at the end of the voting period
	//  refund deposits (non-voters already punished)
	for each (amount, depositor) in proposal.Deposits
		depositor.AtomBalance += amount

	stateWriter, err := proposal.Handler()
	if err != nil
		// proposal passed but failed during state execution
		proposal.CurrentStatus = ProposalStatusFailed
		else
		// proposal pass and state is persisted
		proposal.CurrentStatus = ProposalStatusAccepted
		stateWriter.save()
	else
	// proposal was rejected
	proposal.CurrentStatus = ProposalStatusRejected

	store(Governance, <proposalID|'proposal'>, proposal)
```

## Parameters

The subspace for the Governance module is `gov`.

```go
type DepositParams struct {
	MinDeposit       sdk.Coins     `json:"min_deposit,omitempty" yaml:"min_deposit,omitempty"`
	MaxDepositPeriod time.Duration `json:"max_deposit_period,omitempty" yaml:"max_deposit_period,omitempty"` //  Maximum period for Atom holders to deposit on a proposal. Initial value: 2 months
}

type TallyParams struct {
	Quorum    sdk.Dec `json:"quorum,omitempty" yaml:"quorum,omitempty"`
	Threshold sdk.Dec `json:"threshold,omitempty" yaml:"threshold,omitempty"`
	Veto      sdk.Dec `json:"veto,omitempty" yaml:"veto,omitempty"`
}

type VotingParams struct {
	VotingPeriod time.Duration `json:"voting_period,omitempty" yaml:"voting_period,omitempty"`
}
```

### MinDeposit

- type: `Coins`
- default value: `uluna`

Minimum deposit for a proposal to enter voting period.

### MaxDepositPeriod

- type: `time.Duration` (seconds)
- default value: 2 months

Maximum period for Luna holders to deposit on a proposal.

### Quorum

- type: `Dec`

Minimum percentage of total stake needed to vote for a result to be considered valid.

### Threshold

- type: `Dec`
- default value: 50%

Minimum proportion of Yes votes for proposal to pass.

### Veto

- type: `Dec`
- default value: `0.33`

Minimum value of Veto votes to Total votes ratio for proposal to be vetoed.

### VotingPeriod

- type: `time.Duration` (seconds)

Length of the voting period.
