# Distribution

## Query

### Outstanding Rewards

To check the current outstanding (un-withdrawn) rewards, run:

```bash
terracli query distribution outstanding-rewards
```

### Delegator Rewards

To check current rewards for a delegator (if they were to be withdrawn), run:

```bash
terracli query distribution rewards <delegator_address> <validator_address>
```

To check all current rewards for a delegator (if they were to be withdrawn), run:

```bash
terracli query distribution rewards <delegator_address>
```

### Validator Commission

To check the current outstanding commission for a validator, run:

```bash
terracli query distribution commission <validator_address>
```

### Validator Slashes

To check historical slashes for a validator, run:

```bash
terracli query distribution slashes <validator_address> <start_height> <end_height>
```

### Community Pool

To query all coins in the Community Pool:

```bash
terracli query distribution community-pool
```

### Parameters

To check the current distribution parameters, run:

```bash
terracli query distribution params
```

The parameters reported will be of the format:

```yaml
community_tax: "0.020000000000000000"
base_proposer_reward: "0.010000000000000000"
bonus_proposer_reward: "0.040000000000000000"
withdraw_addr_enabled: true
```

## Transaction

### Withdraw Rewards

You can withdraw your rewards against a certain validator

```sh
terracli tx distribution withdraw-rewards <validator-address>
```

If you want to withdraw all rewards:

```sh
terracli tx distribution withdraw-all-rewards
```

### Set Withdraw Address

Change the default withdraw address for rewards associated with an address.

```sh
terracli tx distribution set-withdraw-addr <withdraw-address>
```

### Fund Community Pool

Funds the community pool with the specified amount.

```sh
terracli tx distribution fund-community-pool <amount>
```

Argument `amount` is in a format such as: `1000uluna`, or `100ukrw,200uusd`
