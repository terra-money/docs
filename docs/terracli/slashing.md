# Slashing

## Unjailing

To unjail your jailed validator

```bash
terracli tx slashing unjail --from=<validator-operator-addr>
```

## Query Signing Info

To retrieve a validator's signing info:

```bash
terracli query slashing signing-info <validator-pubkey>
```

## Query Parameters

You can get the current slashing parameters via:

```bash
terracli query slashing params
```
