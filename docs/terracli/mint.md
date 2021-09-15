# Mint

## Query

### Annual Provisions

To get the value of annual provisions:

```sh
terracli query mint annual-provisions
```

### Inflation

To get the current value of inflation:

```sh
terracli query mint inflation
```

### Parameters

To get the mint module's parameters:

```sh
terracli query mint params
```

The parameters reported will be of the format:

```yaml
mint_denom: uluna
inflation_rate_change: "0.130000000000000000"
inflation_max: "0.200000000000000000"
inflation_min: "0.070000000000000000"
goal_bonded: "0.670000000000000000"
blocks_per_year: 6311520
```
