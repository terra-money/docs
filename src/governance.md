# Governance

Governance is the process through which participants within the Terra network can effect change for the protocol, by arriving at consensus. Software upgrades and blockchain parameters can be automatically placed in effect through proposals. Other issues like large directional changes or decisions requiring human involvement can be also be voted on, through text proposals.

Proposals are submitted on the network through creating a proposal, depositing some Luna tokens, and

Some considerations about the voting process:

- Voting is done by holders of bonded LUNA on a 1 LUNA = 1 vote basis

- Delegators inherit the vote of their validator if they don't vote

- Votes are tallied at the end of the voting period (2 weeks on mainnet) where
  each address can vote multiple times to update its `Option` value (paying the transaction fee each time),
  only the most recently cast vote will count as valid

- Voters can choose between options `Yes`, `No`, `NoWithVeto` and `Abstain`

- At the end of the voting period, a proposal is accepted if:

  - `(YesVotes / (YesVotes+NoVotes+NoWithVetoVotes)) > threshold(1/2)`

  - `(NoWithVetoVotes / (YesVotes+NoVotes+NoWithVetoVotes)) < veto(1/3)`

  - `((YesVotes+NoVotes+NoWithVetoVotes) / totalBondedStake) >= quorum(1/3)`

For more information about the governance process and how it works, please check
out the [Governance module specification](dev-spec-governance.md)
