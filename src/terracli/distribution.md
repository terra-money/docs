# Distribution

### Query Distribution Parameters

To check the current distribution parameters, run:

```bash
terracli query distribution params
```

### Query Community Pool Coins

To query all coins in the Community Pool, which is under Governance control:

```bash
terracli query distribution community-pool
```

### Query Outstanding Rewards

To check the current outstanding (un-withdrawn) rewards, run:

```bash
terracli query distribution outstanding-rewards
```

### Query Validator Commission

To check the current outstanding commission for a validator, run:

```bash
terracli query distribution commission <validator_address>
```

### Query Validator Slashes

To check historical slashes for a validator, run:

```bash
terracli query distribution slashes <validator_address> <start_height> <end_height>
```

### Query Delegator Rewards

To check current rewards for a delegator (if they were to be withdrawn), run:

```bash
terracli query distribution rewards <delegator_address> <validator_address>
```

### Query All Delegator Rewards

To check all current rewards for a delegator (if they were to be withdrawn), run:

```bash
terracli query distribution rewards <delegator_address>
```
