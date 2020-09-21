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

## Transactions

### Create validator

```sh
terracli tx staking create-validator \
    --amount=5000000uluna \
    --pubkey=$(terrad tendermint show-validator) \
    --moniker="choose a moniker" \
    --website="validator.website" \
    --identity="keybase identity" \
    --details="validator's optional details" \
    --commission-rate="0.10" \
    --commission-max-rate="0.20" \
    --commission-max-change-rate="0.01" \
    --min-self-delegation="1"
    --chain-id=<chain_id> \
    --from=<key_name> \
```

### Edit validator

```sh
terracli tx staking edit-validator \
    --moniker="new moniker" \
    --details="validator's optional details" \
    --commission-rate="0.10" \
    --min-self-delegation="1" \
```

Each of the above flags are all optional and will not be changed if not specified. The new commission rate will be rejected if it contradicts the validator's registered max commission rate and max daily commission rate change.

### Delegate

```sh
terracli tx staking delegate <validator-addr> <amount>
```

- `validator-addr`: validator operator address to delegate to
- `amount`: coins, i.e. `1000uluna`

### Redelegate

```sh
terracli tx staking redelegate <src-validator-addr> <dst-validator-addr> <amount>
```

- `src-validator-addr`: source validator's operator address
- `dst-validator-addr`: destination validator's operator address
- `amount`: coins, i.e. `1000uluna`

### Undelegate

```sh
terracli tx staking unbond <validator-addr> <amount>
```

- `validator-addr`: validator operator address from which to undelegate
- `amount`: coins, i.e. `1000uluna`
