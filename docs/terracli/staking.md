# Staking

## Transactions

### Create Validator

Please refer to the [Validator Setup](../validator/setup.md) section for a more complete guide on how to set up a validator-candidate.

```bash
terracli tx staking create-validator \
    --amount=5000000uluna \
    --pubkey=$(terrad tendermint show-validator) \
    --moniker="choose a moniker" \
    --chain-id=<chain_id> \
    --from=<key_name> \
    --commission-rate="0.10" \
    --commission-max-rate="0.20" \
    --commission-max-change-rate="0.01" \
    --min-self-delegation="1"
```

### Edit Validator Description

You can edit your validator's public description. This info is to identify your validator, and will be relied on by delegators to decide which validators to stake to. Make sure to provide input for every flag below, otherwise the field will default to empty \(`--moniker` defaults to the machine name\).

The `--identity` can be used as to verify identity with systems like Keybase or UPort. When using with Keybase `--identity` should be populated with a 16-digit string that is generated with a [keybase.io](https://keybase.io) account. It's a cryptographically secure method of verifying your identity across multiple online networks. The Keybase API allows us to retrieve your Keybase avatar. This is how you can add a logo to your validator profile.

```bash
terracli tx staking edit-validator \
    --moniker="choose a moniker" \
    --website="https://terra.money" \
    --identity=6A0D65E29A4CBC8E \
    --details="To infinity and beyond!" \
    --chain-id=<chain_id> \
    --from=<key_name> \
    --commission-rate="0.10"
```

**Note**: The `commission-rate` value must adhere to the following invariants:

- Must be between 0 and the validator's `commission-max-rate`
- Must not exceed the validator's `commission-max-change-rate` which is maximum % point change rate **per day**. In other words, a validator can only change its commission once per day and within `commission-max-change-rate` bounds.

### Delegate

On the testnet, we delegate LUNA. Here's how you can bond tokens to a testnet validator:

```bash
terracli tx staking delegate \
    <validator> \
    10000000uluna \
    --from=<key_name> \
    --chain-id=<chain_id>
```

`<validator>` is the operator address of the validator to which you intend to delegate. If you are running a local testnet, you can find this with:

```bash
terracli keys show <name> --bech val
```

where `<name>` is the name of the key you specified when you initialized `terrad`.

While tokens are bonded, they are pooled with all the other bonded tokens in the network. Validators and delegators obtain a percentage of shares that equal their stake in this pool.

::: tip
Don't use more LUNA than you have! You can always get more by using the [Faucet](https://faucet.terra.money/)!
:::

### Undelegate

If for any reason the validator misbehaves, or you just want to unbond a certain
amount of tokens, use this following command.

```bash
terracli tx staking unbond \
  <validator_address> \
  100uluna \
  --from=<key_name> \
  --chain-id=<chain_id>
```

The unbonding will be automatically completed when the unbonding period has passed.

### Redelegate

A redelegation is a type delegation that allows you to bond illiquid tokens from one validator to another:

```bash
terracli tx staking redelegate \
    <src validator address> \
    <dst validator address> \
    <amount> \
    --from=<key_name> \
    --chain-id=<chain_id>
```

The redelegation will be automatically completed when the unbonding period has passed.

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
