# Mint

## Query

### Annual Provisions

To get the value of annual provisions:

```sh
terrad query mint annual-provisions
```

### Inflation

To get the current value of inflation:

```sh
terrad query mint inflation
```

### Parameters

To get the mint module's parameters:

```sh
terrad query mint params
```

The parameters reported will be of the format:

```yaml
blocks_per_year: "6311520"
goal_bonded: "0.670000000000000000"
inflation_max: "0.200000000000000000"
inflation_min: "0.070000000000000000"
inflation_rate_change: "0.000000000000000000"
mint_denom: uluna
```
