# Market

The Market module contains the logic for atomic swaps between Terra currencies (e.g. UST<>KRT), as well as between Terra and Luna (e.g. SDT<>Luna).

The ability to guarantee an available, liquid market with fair exchange rates between different Terra denominations and between Terra and Luna is critical for user-adoption and price-stability.

As mentioned in the protocol, the price stability of TerraSDR's peg to the SDR is achieved through Terra<>Luna arbitrage activity against the protocol's algorithmic market-maker which expands and contracts Terra supply to maintain the peg.

## Concepts

### Swap Fees

Since Terra's price feed is derived from validator oracles, there is necessarily a delay between the on-chain reported price and the actual realtime price.

This difference is on the order of about 1 minute (our oracle `VotePeriod` is 30 seconds), which is negligible for nearly all practical transactions. However an attacker could take advantage of this lag and extract value out of the network through a front-running attack.

To defend against this, the Market module enforces the following swap fees

- a **Tobin Tax** (set at [0.35%](#tobintax)) for spot-converting Terra<>Terra swaps

  To illustrate, assume that oracle reports that the Luna<>SDT exchange rate is 10, and for Luna<>KRT, 10,000. Sending in 1 SDT will get you 0.1 Luna, which is 1000 KRT. After applying the Tobin Tax, you'll end up with 996.5 KRT (0.35% of 1000 is 3.5), a better rate than any retail currency exchange and remittance[^1]. Exception: [Proposal 68](https://station.terra.money/proposal/68) made the Tobin Tax for swapping from other Terra to TerraKRT be 1% instead of 0.35%.

[^1]: Though contrary to our initial policy for zero-fee swaps, we have decided to implement the Tobin tax as a necessity to prevent attackers from exploiting the exchange rate latency and profiting at the cost of ordinary users. The rationale behind setting a Tobin tax at this rate is described in depth in this [post](https://medium.com/terra-money/on-swap-fees-the-greedy-and-the-wise-b967f0c8914e).

- a **minimum spread** (set at [0.5%](#minspread)) for Terra<>Luna swaps

  Using the same exchange rates above, swapping 1 SDT will return 995 KRT worth of Luna (0.5% of 1000 is 5, taken as the swap fee). In the other direction, 1 Luna would give you 9.95 SDT (0.5% of 10 = 0.05), or 9,950 KRT (0.5% of 10,000 = 50).

### Market Making Algorithm

Terra uses a Constant Product market-making algorithm to ensure liquidity for Terra<>Luna swaps. [^2]

[^2]: For a more in-depth treatment of our updated market-making algorithm, check Nick Platias's SFBW 2019 presentation [here](https://agora.terra.money/t/terra-stability-swap-mechanism-deep-dive-at-sfbw/135).

With Constant Product, we define a value $CP$ set to the size of the Terra pool multiplied by a set **fiat value of Luna**, and ensure our market-maker maintains it as invariant during any swaps through adjusting the spread.

::: warning NOTE
Our implementation of Constant Product diverges from Uniswap's, as we use the fiat value of Luna instead of the size of the Luna pool. This nuance means changes in Luna's price don't affect the product, but rather the size of the Luna pool.
:::

$$CP = Pool_{Terra} * Pool_{Luna} * (Price_{Luna}/Price_{SDR})$$

For example, we'll start with equal pools of Terra and Luna, both worth 1000 SDR total. The size of the Terra pool is 1000 SDT, and assuming the price of Luna<>SDR is 0.5, the size of the Luna pool is 2000 Luna. A swap of 100 SDT for Luna would return around 90.91 SDR worth of Luna (≈ 181.82 Luna). The offer of 100 SDT is added to the Terra pool, and the 90.91 SDT worth of Luna are taken out of the Luna pool.

```
CP = 1000000 SDR
(1000 SDT) * (1000 SDR of Luna) = 1000000 SDR
(1100 SDT) * (909.0909... SDR of Luna) = 1000000 SDR
```

Of course, this specific example was meant to be more illustrative than realistic -- with much larger liquidity pools used in production, the magnitude of the spread is diminished.

The primary advantage of Constant-Product over Columbus-2 is that it offers “unbounded” liquidity, in the sense that swaps of arbitrary size can be serviced (albeit at prices that become increasingly unfavorable as trade size increases).

### Virtual Liquidity Pools

The market starts out with two liquidity pools of equal sizes, one representing Terra (all denominations) and another representing Luna, initialiazed by the parameter [`BasePool`](#basepool), which defines the initial size, $Pool_{Base}$, of the Terra and Luna liquidity pools.

In practice, rather than keeping track of the sizes of the two pools, the information is encoded in a number $\delta$, which the blockchain stores as `TerraPoolDelta`, representing the deviation of the Terra pool from its base size in units µSDR.

The size of the Terra and Luna liquidity pools can be generated from $\delta$ using the following formulas:

$$Pool_{Terra} = Pool_{Base} + \delta$$
$$Pool_{Luna} = ({Pool_{Base}})^2 / Pool_{Terra}$$

At the [end of each block](#end-block), the market module will attempt to "replenish" the pools by decreasing the magnitude of $\delta$ between the Terra and Luna pools. The rate at which the pools will be replenished toward equilibrium is set by the parameter [`PoolRecoveryPeriod`](#poolrecoveryperiod), with lower periods meaning lower sensitivity to trades, meaning previous trades are more quickly forgotten and the market is able to offer more liquidity.

This mechanism ensures liquidity and acts as a sort of low-pass filter, allowing for the spread fee (which is a function of `TerraPoolDelta`) to drop back down when there is a change in demand, hence necessary change in supply which needs to be absorbed.

### Swap Procedure

1. Market module receives [`MsgSwap`](#msgswap) message and performs basic validation checks

2. Calculate exchange rate $ask$ and $spread$ using [`k.ComputeSwap()`](#k-computeswap)

3. Update `TerraPoolDelta` with [`k.ApplySwapToPool()`](#k-applyswaptopool)

4. Transfer `OfferCoin` from account to module using `supply.SendCoinsFromAccountToModule()`

5. Burn offered coins, with `supply.BurnCoins()`.

6. Let $fee = spread * ask$, this is the spread fee.

7. Mint $ask - fee$ coins of `AskDenom` with `supply.MintCoins()`. This implicitly applies the spread fee as the $fee$ coins are burned.

8. Send newly minted coins to trader with `supply.SendCoinsFromModuleToAccount()`

9. Emit [`swap`](#swap) event to publicize swap and record spread fee

If the trader's `Account` has insufficient balance to execute the swap, the swap transaction fails.

Upon successful completion of Terra<>Luna swaps, a portion of the coins to be credited to the user's account is withheld as the spread fee.

### Seigniorage

For Luna swaps into Terra, the Luna that recaptured by the protocol is burned and is called seigniorage -- the value generated from issuing new Terra. At the end of the epoch, the total seigniorage for the epoch will be calculated and reintroduced into the economy as ballot rewards for the exchange rate oracle and to the community pool by the Treasury module, described more fully [here](./spec-treasury.md#ksettleseigniorage).

## State

### Terra Pool Delta δ

- type: `sdk.Dec`

Represents the difference between size of current Terra pool and its original base size, valued in µSDR.

## Message Types

### MsgSwap

A `MsgSwap` transaction denotes the `Trader`'s intent to swap their balance of `OfferCoin` for new denomination `AskDenom`, for both Terra<>Terra and Terra<>Luna swaps.

```go
// MsgSwap contains a swap request
type MsgSwap struct {
	Trader    sdk.AccAddress `json:"trader" yaml:"trader"`         // Address of the trader
	OfferCoin sdk.Coin       `json:"offer_coin" yaml:"offer_coin"` // Coin being offered
	AskDenom  string         `json:"ask_denom" yaml:"ask_denom"`   // Denom of the coin to swap to
}
```

::: details JSON Example

```json
{
  "type": "market/MsgSwap",
  "value": {
    "trader": "terra...",
    "offer_coin": {
      "denom": "umnt",
      "amount": "999"
    },
    "ask_denom": "ukrw"
  }
}
```

:::

::: details Events

| Type    | Attribute Key | Attribute Value    |
| ------- | ------------- | ------------------ |
| swap    | offer         | {offerCoin}        |
| swap    | trader        | {traderAddress}    |
| swap    | recipient     | {recipientAddress} |
| swap    | swap_coin     | {swapCoin}         |
| swap    | swap_fee      | {swapFee}          |
| message | module        | market             |
| message | action        | swap               |
| message | sender        | {senderAddress}    |

:::

### MsgSwapSend

A `MsgSendSwap` first performs a swap of `OfferCoin` into `AskDenom` and the sends the resulting coins to `ToAddress`. Tax is charged normally, as if the sender were issuing a `MsgSend` with the resutling coins of the swap.

```go
type MsgSwapSend struct {
	FromAddress sdk.AccAddress `json:"from_address" yaml:"from_address"` // Address of the offer coin payer
	ToAddress   sdk.AccAddress `json:"to_address" yaml:"to_address"`     // Address of the recipient
	OfferCoin   sdk.Coin       `json:"offer_coin" yaml:"offer_coin"`     // Coin being offered
	AskDenom    string         `json:"ask_denom" yaml:"ask_denom"`       // Denom of the coin to swap to
}
```

::: details JSON Example

```json
{
  "type": "market/MsgSwapSend",
  "value": {
    "from_address": "terra...",
    "to_address": "terra...",
    "offer_coin": {
      "denom": "umnt",
      "amount": "999"
    },
    "ask_denom": "ukrw"
  }
}
```

:::

::: details Events

| Type    | Attribute Key | Attribute Value    |
| ------- | ------------- | ------------------ |
| swap    | offer         | {offerCoin}        |
| swap    | trader        | {traderAddress}    |
| swap    | recipient     | {recipientAddress} |
| swap    | swap_coin     | {swapCoin}         |
| swap    | swap_fee      | {swapFee}          |
| message | module        | market             |
| message | action        | swapsend           |
| message | sender        | {senderAddress}    |

:::

## Functions

### `k.ComputeSwap()`

```go
func (k Keeper) ComputeSwap(ctx sdk.Context, offerCoin sdk.Coin, askDenom string)
    (retDecCoin sdk.DecCoin, spread sdk.Dec, err sdk.Error)
```

This function detects the swap type from the offer and ask denominations and returns:

1. The amount of asked coins that should be returned for a given `offerCoin`. This is achieved by first spot-converting `offerCoin` to µSDR and then from µSDR to the desired `askDenom` with the proper exchange rate reported from by the Oracle.

2. The spread % that should be taken as a swap fee given the swap type. Terra<>Terra swaps simply have the Tobin Tax spread fee. Terra<>Luna spreads are the greater of `MinSpread` and spread from Constant Product pricing.

If the `offerCoin`'s denomination is the same as `askDenom`, this will raise `ErrRecursiveSwap`.

::: warning NOTE
`k.ComputeSwap()` uses `k.ComputeInternalSwap()` internally, which just contains the logic for calculating proper ask coins to exchange, without the Constant Product spread.
:::

### `k.ApplySwapToPool()`

```go
func (k Keeper) ApplySwapToPool(ctx sdk.Context, offerCoin sdk.Coin, askCoin sdk.DecCoin) sdk.Error
```

`k.ApplySwapToPools()` is called during the swap to update the blockchain's measure of $\delta$, `TerraPoolDelta`, when the balances of the Terra and Luna liquidity pools have changed.

Terra currencies share the same liquidity pool, so `TerraPoolDelta` remains unaltered during Terra<>Terra swaps.

For Terra<>Luna swaps, the relative sizes of the pools will be different after the swap, and $\delta$ will be updated with the following formulas:

- For Terra to Luna, $\delta' = \delta + Offer_{\mu SDR}$
- For Luna to Terra, $\delta' = \delta - Ask_{\mu SDR}$

## Transitions

### End-Block

Market module calls `k.ReplenishPools()` at the end of every block, which decreases the value of `TerraPoolDelta` (which measures the difference between Terra and Luna pools) depending on `PoolRecoveryPeriod`, $pr$.

This allows the network to sharply increase spread fees in during acute price fluctuations, and automatically return the spread to normal after some time when the price change is long term.

## Parameters

The subspace for the Market module is `market`.

```go
type Params struct {
	PoolRecoveryPeriod int64   `json:"pool_recovery_period" yaml:"pool_recovery_period"`
	BasePool           sdk.Dec `json:"base_pool" yaml:"base_pool"`
	MinSpread          sdk.Dec `json:"min_spread" yaml:"min_spread"`
	TobinTax           sdk.Dec `json:"tobin_tax" yaml:"tobin_tax"`
}
```

### PoolRecoveryPeriod

- type: `int64`
- default: `BlocksPerDay`

Number of blocks it takes for the Terra & Luna pools to naturally "reset" toward equilibrium ($\delta \to 0$) through automated pool replenishing.

### BasePool

- type: `Dec`
- default: 250,000 SDR (= 250,000,000,000 µSDR)

Initial starting size of both Terra and Luna liquidity pools.

### MinSpread

- type: `Dec`
- default: 0.5%

Minimum spread charged on Terra<>Luna swaps to prevent leaking value from front-running attacks.

### TobinTax

- type: `Dec`
- default: 0.35%

A fee added on for swap between Terra currencies (spot-trading).
