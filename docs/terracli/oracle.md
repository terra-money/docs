# Oracle

## Query

### Exchange Rates of LUNA

```sh
terracli query oracle exchange-rates
```

### Votes

```sh
terracli query oracle votes <denom> <validator>
```

### Prevotes

```sh
terracli query oracle prevotes <denom> <validator>
```

### Active Denoms

```sh
terracli query oracle actives
```

### Feeder Account

```sh
terracli query oracle feeder <validator-addr>
```

### Miss Counter

```sh
terracli query oracle miss <validator-addr>
```

### Aggregate Prevotes

```sh
terracli query oracle aggregate-prevote <validator-addr>
```

### Aggregate Votes

```sh
terracli query oracle aggregate-vote <validator-addr>
```

### Vote Targets

```sh
terracli query oracle vote-targets
```

### Tobin Taxes

```sh
terracli query oracle tobin-taxes
```

### Parameters

You can get the oracle module's parameters:

```sh
terracli query oracle params
```

The reported parameters will be of the following format:

```yaml
vote_period: 5
vote_threshold: "0.500000000000000000"
reward_band: "0.020000000000000000"
reward_distribution_window: 5256000
whitelist:
  - name: ukrw
    tobin_tax: "0.002500000000000000"
  - name: usdr
    tobin_tax: "0.002500000000000000"
  - name: uusd
    tobin_tax: "0.002500000000000000"
  - name: umnt
    tobin_tax: "0.020000000000000000"
slash_fraction: "0.000100000000000000"
slash_window: 100800
min_valid_per_window: "0.050000000000000000"
```

## Transaction

### Submit an Exchange Rate Vote

Validators must submit two exchange rate vote transactions to participate in the oracle; a `prevote` containing the hash of the actual vote in the first vote period, and a `vote` containing the salt of the hash submitted in the prevote phase to prove honestly. The hash is the leading 20 bytes of the SHA256 hexa string run over the string of the format `salt:price:denom:validator-address`.
i
To submit a prevote, run:

```bash
terracli tx oracle prevote \
    <salt> \
    <price> \
    <validator_address> \
    --from mykey
```

After `VotePeriod` has expired from the submission of the prevote, the voter must submit the actual exchange rate vote. To do so, run:

```bash
terracli tx oracle vote \
    <salt> \
    <price>  \
    <validator_address> \
    --from mykey \
    --validator <validator-address>
```

Where price is the form of Coin `8890.32ukrw`

Given that oracle votes have to be submitted in a feed over short time intervals (30 seconds), prevotes and votes will need to be submitted via some persistent server daemon, and not manually. For more information on how to do this, read the [Exchange Rate Oracle](../validator/oracle.md) section of the Validator Handbook, and the [Oracle Module Specification](../dev/spec-oracle.md).

### Delegate Exchange Rate Voting Rights

A voter may also elect to delegate exchange rate voting to another signing key.

```bash
terracli tx oracle set-feeder <feeder_address> --from=mykey
```

where `feeder_address` is the address you want to delegate your voting rights to. Note that the feeder will still need to submit votes on behalf of your validator in order for you to get credit.
