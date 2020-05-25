# Validator Tasks

## Edit Validator Description

You can edit your validator's public description. This info is to identify your validator, and will be relied on by delegators to decide which validators to stake to. Make sure to provide input for every flag below, otherwise the field will default to empty \(`--moniker` defaults to the machine name\).

The `--identity` can be used as to verify identity with systems like Keybase or UPort. When using with Keybase `--identity` should be populated with a 16-digit string that is generated with a [keybase.io](https://keybase.io) account. It's a cryptographically secure method of verifying your identity across multiple online networks. The Keybase API allows us to retrieve your Keybase avatar. This is how you can add a logo to your validator profile.

```bash
$ terracli tx staking edit-validator \
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

## View Validator Description

View the validator's information with this command:

```bash
$ terracli query staking validator <account_terra>
```

## Track Validator Signing Information

In order to keep track of a validator's signatures in the past you can do so by using the `signing-info` command:

```bash
$ terracli query slashing signing-info <validator-pubkey>\
  --chain-id=<chain_id>
```

## Unjail Validator

When a validator is "jailed" for downtime, you must submit an `Unjail` transaction from the operator account in order to be able to get block proposer rewards again \(depends on the zone fee distribution\).

```bash
$ terracli tx slashing unjail \
    --from=<key_name> \
    --chain-id=<chain_id>
```
