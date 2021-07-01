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
deposit_params:
  max_deposit_period: "86400000000000"
  min_deposit:
  - amount: "10000000"
    denom: uluna
tally_params:
  quorum: "0.334000000000000000"
  threshold: "0.500000000000000000"
  veto_threshold: "0.334000000000000000"
voting_params:
  voting_period: "86400000000000"
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

#### Software Upgrade Proposals

The `SoftwareUpgrade` is used to register upgrade `Plan` to safely stop the process at the specific height.

```bash
terrad tx gov submit-proposal \
    software-upgrade v0.5.0 \
    --upgrade-height 20 
    --upgrade-info '{"binaries":{"darwin/amd64":"/Users/yeoyunseog/Workspace/terra/core/build/terrad?checksum=sha256:2032356fe0899dec0cdd559f1c649bc81e53a9b4063b333059135e3a2aae8728"}}' 
    --title="Upgrade to v0.5.0" 
    --description="Upgrade to v0.5.0" 
    --deposit 512000000uluna
    --chain-id=<chain-id> 
    --from=<name> 
```

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
