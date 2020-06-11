# Staking

## Set up a Validator

Please refer to the [Validator Setup](../validator/getting-started.md) section for a more complete guide on how to set up a validator-candidate.

## Delegate to a Validator

On the upcoming mainnet, you can delegate LUNA to a validator. These [delegators](../validator/faq.md) can receive part of the validator's fee revenue.

## Query Validators

You can query the list of all validators of a specific chain:

```bash
terracli query staking validators
```

If you want to get the information of a single validator you can check it with:

```bash
terracli query staking validator <account_terraval>
```

## Bond Tokens

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

## Query Delegations

Once submitted a delegation to a validator, you can see it's information by using the following command:

```bash
terracli query staking delegation <delegator_address> <validator_address>
```

Or if you want to check all your current delegations with distinct validators:

```bash
terracli query staking delegations <delegator_address>
```

You can also get previous delegation\(s\) status by adding the `--height` flag.

## Unbond Tokens

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

## Query Unbonding-Delegations

Once you begin an unbonding-delegation, you can see it's information by using the following command:

```bash
terracli query staking unbonding-delegation <delegator_address> <validator_address>
```

Or if you want to check all your current unbonding-delegations with disctinct validators:

```bash
terracli query staking unbonding-delegations <account_terra>
```

Additionally, as you can get all the unbonding-delegations from a particular validator:

```bash
terracli query staking unbonding-delegations-from <account_terraval>
```

To get previous unbonding-delegation\(s\) status on past blocks, try adding the `--height` flag.

## Redelegate Tokens

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

## Query Redelegations

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

## Query Parameters

Parameters define high level settings for staking. You can get the current values by using:

```bash
terracli query staking params
```

With the above command you will get the values for:

- Unbonding time
- Maximum numbers of validators
- Coin denomination for staking

All these values will be subject to updates though a `governance` process by `ParameterChange` proposals.

## Query Pool

A staking `Pool` defines the dynamic parameters of the current state. You can query them with the following command:

```bash
terracli query staking pool
```

With the `pool` command you will get the values for:

- Not-bonded and bonded tokens
- Token supply
- Current annual inflation and the block in which the last inflation was processed
- Last recorded bonded shares

## Query Delegations To Validator

You can also query all of the delegations to a particular validator:

```bash
terracli query delegations-to <account_terraval>
```
