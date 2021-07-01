# Treasury

## Query

### Tax Rate

Terra transactions charge a % fee on each outbound transaction from the sender's wallet. To get the effective stability fee rate, run:

```bash
terracli query treasury tax-rate
```

### Tax Cap

Stability fees are capped at some fixed amount of SDT to avoid penalizing large transactions. To get the current tax cap denominated in a given denomination (micro-units), run:

```bash
terracli query treasury tax-cap <denom>
```

### Tax Proceeds

To query the cumulative tax proceeds, run:

```bash
terracli query treasury tax-proceeds
```

### Reward Weight

The Reward Weight is the portion of seigniorage that is designated as ballot rewards for the winners of exchange rate oracle. To query the Reward Weight, run:

```bash
terracli query treasury reward-weight
```

### Seigniorage Proceeds

The treasury measures the amount of Terra seigniorage accumulated over epochs, denominated in units of `uluna`. To query the seigniorage proceeds, run:

```bash
terracli query treasury seigniorage-proceeds
```

### Parameters

Parameters define high-level settings for the Treasury, described [here](../dev/spec-treasury.md#parameters). You can get the current values by using:

```bash
terracli query treasury params
```

The reported parameters will be of the following format:

```yaml
tax_policy:
  ratemin: "0.000500000000000000"
  ratemax: "0.010000000000000000"
  cap:
    denom: usdr
    amount: "1000000"
  changeratemax: "0.000250000000000000"
reward_policy:
  ratemin: "0.050000000000000000"
  ratemax: "0.500000000000000000"
  cap:
    denom: unused
    amount: "0"
  changeratemax: "0.025000000000000000"
seigniorage_burden_target: "0.670000000000000000"
mining_increment: "1.070000000000000000"
window_short: 4
window_long: 52
window_probation: 12
```
