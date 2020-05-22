# Oracle

## Submit an Exchange Rate Vote

Validators must submit two exchange rate vote transactions to participate in the oracle; a `prevote` containing the hash of the actual vote in the first vote period, and a `vote` containing the salt of the hash submitted in the prevote phase to prove honestly. The hash is the leading 20 bytes of the SHA256 hexa string run over the string of the format `salt:price:denom:validator-address`.

To submit a prevote, run:

```bash
$ terracli tx oracle prevote \
    <salt> \
    <price> \
    <validator_address> \
    --from mykey
```

After `VotePeriod` has expired from the submission of the prevote, the voter must submit the actual exchange rate vote. To do so, run:

```bash
$ terracli tx oracle vote \
    <salt> \
    <price>  \
    <validator_address> \
    --from mykey \
    --validator <validator-address>
```

Where price is the form of Coin `8890.32ukrw`

Given that oracle votes have to be submitted in a feed over short time intervals (30 seconds), prevotes and votes will need to be submitted via some persistent server daemon, and not manually. For more information on how to do this, read the [Exchange Rate Oracle](validator-oracle.md) section of the Validator Handbook, and the [Oracle Module Specification](dev-spec-oracle.md).

## Delegate Exchange Rate Voting Rights

A voter may also elect to delegate exchange rate voting to another signing key.

```bash
$ terracli tx oracle set-feeder <feeder_address> --from=mykey
```

where `feeder_address` is the address you want to delegate your voting rights to. Note that the feeder will still need to submit votes on behalf of your validator in order for you to get credit.
