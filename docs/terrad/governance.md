# Governance

## Query

### Proposals

Once created, you can now query information of the proposal:

```bash
terrad query gov proposal <proposal_id>
```

Or query all available proposals:

```bash
terrad query gov proposals
```

You can also query proposals filtered by `voter` or `depositor` by using the corresponding flags.

To query for the proposer of a given governance proposal:

```bash
terrad query gov proposer <proposal_id>
```

### Deposits

Once a new proposal is created, you can query all the deposits submitted to it:

```bash
terrad query gov deposits <proposal_id>
```

You can also query a deposit submitted by a specific address:

```bash
terrad query gov deposit <proposal_id> <depositor_address>
```

### Votes

Check the vote with the option you just submitted:

```bash
terrad query gov vote <proposal_id> <voter_address>
```

You can also get all the previous votes submitted to the proposal with:

```bash
terrad query gov votes <proposal_id>
```

### Tally Results

To check the current tally of a given proposal you can use the `tally` command:

```bash
terrad query gov tally <proposal_id>
```

### Parameters

To check the current governance parameters run:

```bash
terrad query gov params
```

The reported parameters will be of the following format:

```yaml
voting_params:
  voting_period: 5m0s
tally_params:
  quorum: "0.334000000000000000"
  threshold: "0.500000000000000000"
  veto: "0.334000000000000000"
deposit_parmas:
  min_deposit:
    - denom: uluna
      amount: "10000000"
  max_deposit_period: 48h0m0s
```

To query subsets of the governance parameters run:

```bash
terrad query gov param voting
terrad query gov param tallying
terrad query gov param deposit
```

## Transaction

### Create a Proposal

In order to create a governance proposal, you must submit an initial deposit along with a title and description. You may also provide the proposal directly through the `--proposal` flag which points to a JSON file containing the proposal.

#### Text Proposals

```bash
terrad tx gov submit-proposal \
    --title=<title> \
    --description=<description> \
    --type="Text" \
    --deposit="1000000uluna" \
    --from=<name> \
    --chain-id=<chain_id>
```

#### Parameter Change Proposals

To submit a parameter change proposal, it is highly recommended to pass in the proposal as a JSON file as its
contents are less friendly to command-line input.

```bash
terrad tx gov submit-proposal \
    param-change <path/to/proposal.json> \
    --from=<name> \
    --chain-id=<chain_id>
```

Where `proposal.json` is a file with the following schema:

```json
{
  "title": "Param Change",
  "description": "Update max validators",
  "changes": [
    {
      "subspace": "staking",
      "key": "MaxValidators",
      "value": 105
    }
  ],
  "deposit": [
    {
      "denom": "uluna",
      "amount": "10000000"
    }
  ]
}
```

::: warning
Currently parameter changes are _evaluated_ but not _validated_, so it is very important
that any `value` change is valid (ie. correct type and within bounds) for its
respective parameter, eg. `MaxValidators` should be an integer and not a decimal.

Proper vetting of a parameter change proposal should prevent this from happening
(no deposits should occur during the governance process), but it should be noted
regardless.
:::

#### Community Pool Spend Proposal

To submit a community pool spend proposal, it is highly recommended to pass in the proposal as a JSON file as its
contents are less friendly to command-line input.

```bash
terrad tx gov submit-proposal \
    community-pool-spend <path/to/proposal.json> \
    --from=<name> \
    --chain-id=<chain_id>
```

Where `proposal.json` contains the following:

```json
{
  "title": "Community Pool Spend",
  "description": "Pay me some Lunas!",
  "recipient": "terra1s5afhd6gxevu37mkqcvvsj8qeylhn0rzn7cdaq",
  "amount": [
    {
      "denom": "uluna",
      "amount": "10000"
    }
  ],
  "deposit": [
    {
      "denom": "uluna",
      "amount": "10000"
    }
  ]
}
```

#### Tax-Rate and Reward-Weight Update Proposals

Tax Rate and Reward Weight are important monetary policy levers handled by the [`Treasury`](../dev/spec-treasury.md) module to modulate miner incentives toward stable demand and steady growth. Usually, they are automatically calibrated once per epoch by the protocol. However, they can be changed at any moment if an update proposal gets passed with enough supporters.

To submit Tax Rate or Reward Weight update proposal, you must provide a proposal file as its contents are less friendly to CLI input:

For Tax Rate:

```bash
terrad tx gov submit-proposal \
    tax-rate-update <path/to/proposal.json> \
    --from=<name> \
    --chain-id=<chain_id>
```

Where `proposal.json` contains the following:

```json
{
  "title": "Update Tax-Rate",
  "description": "Let's update the tax-rate to 1.5%",
  "tax_rate": "0.015",
  "deposit": [
    {
      "denom": "uluna",
      "amount": "10000"
    }
  ]
}
```

For Reward Weight:

```bash
terrad tx gov submit-proposal \
    reward-weight-update <path/to/proposal.json> \
    --from=<name> \
    --chain-id=<chain_id>
```

Where `proposal.json` contains the following:

```json
{
  "title": "Update Reward Weight",
  "description": "Let's update reward weight to 1.5%",
  "reward_weight": "0.015",
  "deposit": [
    {
      "denom": "uluna",
      "amount": "10000"
    }
  ]
}
```

Note that Tax Reward and Reward Weight updates through passed Governance proposals are subject to [Policy Constraints](../dev/spec-treasury.md#policy-constraints).

#### Software Upgrade Proposals

The `SoftwareUpgrade` is **currently not supported** as it has not yet been implemented and currently does not differ from the semantics of a `Text` proposal.

### Increase Deposit

In order for a proposal to be broadcasted to the network, the amount deposited must be above a `minDeposit` value (initial value: `512000000uluna`). If the proposal you previously created didn't meet this requirement, you can still increase the total amount deposited to activate it. Once the minimum deposit is reached, the proposal enters voting period:

```bash
terrad tx gov deposit <proposal_id> "10000000luluna" \
    --from=<name> \
    --chain-id=<chain_id>
```

::: warning
Proposals that don't meet this requirement will be deleted after `MaxDepositPeriod` is reached.
:::

### Vote on a Proposal

After a proposal's deposit reaches the `MinDeposit` value, the voting period opens. Bonded LUNA holders can then cast vote on it:

```bash
terrad tx gov vote \
    <proposal_id> <Yes/No/NoWithVeto/Abstain> \
    --from=<name> \
    --chain-id=<chain_id>
```
