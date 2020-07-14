# Staking

## Query

### Validators

You can query the list of all registered validators:

```bash
terracli query staking validators
```

If you want to get the information of a single validator you can check it with:

```bash
terracli query staking validator <validator-address>
```

### Delegations

Once submitted a delegation to a validator, you can see it's information by using the following command:

```bash
terracli query staking delegation <delegator_address> <validator_address>
```

Or if you want to check all your current delegations with distinct validators:

```bash
terracli query staking delegations <delegator_address>
```

You can also get previous delegation\(s\) status by adding the `--height` flag.

You can also query all of the delegations to a particular validator:

```bash
terracli query delegations-to <account_terraval>
```

### Unbonding Delegations

Once you begin an unbonding delegation, you can see it's information by using the following command:

```bash
terracli query staking unbonding-delegation <delegator-address> <validator-address>
```

Or if you want to check all your current unbonding-delegations with disctinct validators:

```bash
terracli query staking unbonding-delegations <account-terra>
```

Additionally, as you can get all the unbonding-delegations from a particular validator:

```bash
terracli query staking unbonding-delegations-from <validator-address>
```

To get previous unbonding-delegation\(s\) status on past blocks, try adding the `--height` flag.

### Redelegations

Once you begin an redelegation, you can see it's information by using the following command:

```bash
terracli query staking redelegation <delegator_address> <src_val_addr> <dst_val_addr>
```

Or if you want to check all your current unbonding-delegations with distinct validators:

```bash
terracli query staking redelegations <account_terra>
```

Additionally, as you can get all the outgoing redelegations from a particular validator:

```bash
terracli query staking redelegations-from <account_terraval>
```

To get previous redelegation(s) status on past blocks, try adding the `--height` flag.

### Staking Pool

A staking `Pool` defines the dynamic parameters of the current state. You can query them with the following command:

```bash
terracli query staking pool
```

With the `pool` command you will get the values for:

- Not-bonded and bonded tokens
- Token supply
- Current annual inflation and the block in which the last inflation was processed
- Last recorded bonded shares

### Parameters

Parameters define high level settings for staking. You can get the current values by using:

```bash
terracli query staking params
```

With the above command you will get the values for:

- Unbonding time
- Maximum numbers of validators
- Coin denomination for staking

All these values will be subject to updates though a `governance` process by `ParameterChange` proposals.
