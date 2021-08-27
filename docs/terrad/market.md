# Market

## Query

### Swap Rate

The Market module allows you to determine the results of a swap operation without actually executing the swap. To simulate a swap operation, run:

```bash
terrad query market swap <offer_coin> <ask_denom>
```

`offer_coin` is the coin to be traded and `ask_denom`  is the denomination to be swapped into.

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

All stablecoins in the Terra ecosystem can be directly swapped at the effective oracle exchange rate. To swap one currency for another, run:

```bash
terrad tx market swap \
    <offer_coin> \
    <ask_denom>  \
    --from mykey \
```

- `offer_coin`: coin to be traded, e.g. `1000ukrw`
- `ask_denom`: denomination of the coin to be swapped into.

For Terra<>Luna swaps, a Constant-Product spread pricing model is used to limit consensus-related attack vectors. Terra<>Terra swaps have a constant Tobin Tax.

### Swap Send

To specify a recipient during a swap and perform a swap and send in one transaction:

```bash
terrad tx market swap \
    <offer_coin> \
    <ask_denom>  \
    <recipient>
    --from mykey \
```
