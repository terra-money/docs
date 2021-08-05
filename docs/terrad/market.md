# Market

## Query

### Swap Rate

The Market module also allows you determine the result from a swap operation without actually executing the swap. To simulate a swap operation, run:

```bash
terrad query market swap <offer_coin> <ask_denom>
```

Where `offer_coin` is the coin to be traded and `ask_denom` the denomination to be swapped into.

### Terra Pool Delta

To get the current value of the Terra Pool Delta:

```sh
terrad query market terra-pool-delta
```

### Parameters

To get the market module's parameters:

```sh
terrad query market params
```

## Transaction

### Swap

All currencies in the Terra ecosystem can be directly swapped into another at the effective oracle exchange rate. To swap one currency for another, run:

```bash
terrad tx market swap \
    <offer_coin> \
    <ask_denom>  \
    --from mykey \
```

- `offer_coin`: coin to be traded, e.g. `1000ukrw`
- `ask_denom`: denomination of the coin to be swapped into.

For Terra<>Luna swaps, Constant-Product spread pricing model is enforced to limit consensus-related attack vectors. Terra<>Terra swaps have a constant Tobin Tax.

### Swap Send

You can specify optionally specify a recipient during a swap and perform a swap and send in one transaction.

```bash
terrad tx market swap \
    <offer_coin> \
    <ask_denom>  \
    <recipient>
    --from mykey \
```
