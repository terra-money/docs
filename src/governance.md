# Governance

Governance is the process by which Terra network participants can effect change for the protocol, by collectively demonstrating consensus support for proposals. 

## Proposals

Proposals start out as ideas within the community, and a member drafts it into a format and submits the proposal alongside an initial deposit.

Currently, proposals that can be automatically applied include:

- `ParameterChangeProposal`: changing of blockchain parameters (defined in each module)
- `TaxRateUpdateProposal`: update Tax Rate monetary policy lever
- `RewardWeightUpdateProposal`: update Reward Weight monetary policy lever
- `CommunityPoolSpendProposal`: disbursement from the Distribution module's Community Pool

Other issues like large directional changes or decisions requiring human involvement (manual implementation) can be also be voted on, through submitting a plain `TextProposal`. 

Proposals are submitted on the network through creating a proposal, depositing some Luna tokens, and reaching consensus through a community vote.

## Procedure

### Deposit Period

After the proposal is submitted, it enters the deposit period, where it must reach a total minimum deposit of 512 Luna within 2 weeks from the time of its submission. The deposit threshold is reached when the sum of the initial deposit (from the proposer) and deposits from all other interested network participants goes meets or exceeds 512 Luna.

The deposit is only required as a form of spam protection, and the network will refund Luna deposits for proposals that have passed or have failed to reach the minimum threshold after the end of the deposit period.

### Voting Period

If the minimum deposit has been reached before the end of the deposit period, then the proposal goes into voting. The voting starts as soon as the minimum deposit has been reached, and lasts for another 2 weeks. While the proposal is in voting, Luna holders can cast votes for the proposal. The 4 voting options available are:

- `Yes` - in favor
- `No` - not in favor
- `NoWithVeto` - veto
- `Abstain` - does not influence vote

Voting is done by holders of bonded LUNA on a 1 bonded LUNA = 1 vote basis. As such, validators hold the most influence over the outcome of voting, and delegators by default inherit the vote of their validator if they don't vote.

### Tallying

Three conditions must be met for a proposal to pass.

1) Voter participation must be at least `quorum` $Q$:

$$\frac{Yes + No + NoWithVeto}{Stake} \ge Q$$

2) Ratio of `NoWithVeto` votes must be less than `veto` $V$:

$$\frac{NoWithVeto}{Yes + No + NoWithVeto} \lt V$$

3) Ratio of `Yes` votes must be greater than `threshold` $T$:

$$\frac{Yes}{Yes + No + NoWithVeto} \gt T$$

If any of the above conditions are not met, the proposal is rejected. The deposit associated with rejected proposals are nopt refunded and will be transferred instead to the Community Pool. The parameters `quorum`, `veto`, and `threshold` exist as blockchain parameters within the Governance module.

### Proposal Implementation

When the governance proposal is accepted, the changes described are automatically put into effect by the proposal handler. Generic proposals such as passed `TextProposal`s must be reviewed by the Terra team and community for how to manually implement.