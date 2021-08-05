# Slashing

## Query

### Signing Info

To retrieve a validator's signing info:

```bash
terrad query slashing signing-info <validator-pubkey>
```

### Parameters

You can get the current slashing parameters via:

```bash
terrad query slashing params
```

The reported parameters will be of the following format:

```yaml
signed_blocks_window: 100
min_signed_per_window: "0.500000000000000000"
downtime_jail_duration: 10m0s
slash_fraction_double_sign: "0.050000000000000000"
slash_fraction_downtime: "0.010000000000000000"
```

## Transaction

### Unjail Validator

To unjail your jailed validator

```bash
terrad tx slashing unjail --from=<validator-operator-addr>
```
