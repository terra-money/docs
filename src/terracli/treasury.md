# Treasury

## Query Tax Rate

Terra transactions charge a % fee on each outbound transaction from the sender's wallet. To get the effective stability fee rate, run:

```bash
terracli query treasury tax-rate
```

## Query Tax Cap

Stability fees are capped at some fixed amount of SDT to avoid penalizing large transactions. To get the current tax cap denominated in a given denomination (micro-units), run:

```bash
terracli query treasury tax-cap <denom>
```

## Query Tax Proceeds

To query the cumulative tax proceeds, run:

```bash
terracli query treasury tax-proceeds
```

## Query Reward Weight

The Reward Weight is the portion of seigniorage that is designated as ballot rewards for the winners of exchange rate oracle. To query the Reward Weight, run:

```bash
terracli query treasury reward-weight
```

## Query Seigniorage Proceeds

The treasury measures the amount of Terra seigniorage accumulated over epochs, denominated in units of `uluna`. To query the seigniorage proceeds, run:

```bash
terracli query treasury seigniorage-proceeds
```

## Query Parameters

Parameters define high-level settings for the Treasury, described [here](./spec-treasury.md#parameters). You can get the current values by using:

```bash
terracli query treasury params
```

With the above command you will get the values for:

- Tax Rate update policy
- Reward Weight update policy
- Seigniorage Burden Target
- Mining Increment
- `WindowShort` \(update parameter\)
- `WindowLong` \(update parameter\)
- `WindowProbation` \(update parameter\)
