# Market

## Query

### Swap Rate

The Market module also allows you determine the result from a swap operation without actually executing the swap. To simulate a swap operation, run:

```bash
terracli query market swap <offer_coin> <ask_denom>
```

Where `offer_coin` is the coin to be traded and `ask_denom` the denomination to be swapped into.

## Transaction

### Swap

All currencies in the Terra ecosystem can be directly swapped into another at the effective oracle exchange rate. To swap one currency for another, run:

```bash
terracli tx market swap \
    <offer_coin> \
    <ask_denom>  \
    --from mykey \
```

Where `offer_coin` is the coin looking to be traded and `ask_denom` the denomination of the coin to be swapped into.

For Terra<>Luna swaps, Constant-Product spread pricing model is enforced to limit consensus-related attack vectors. Terra<>Terra swaps have a constant Tobin Tax (0.3%).
