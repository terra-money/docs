# Market

The Market module enables atomic swaps between different Terra stablecoin denominations, and between Terra and Luna. This module ensures an available, liquid market, stable prices, and fair exchange rates between the protocol's assets.

The price stability of TerraSDR is achieved through Terra<>Luna arbitrage activity against the protocol's algorithmic market-maker, which expands and contracts Terra's supply to maintain its peg.

## Concepts

### Swap Fees

Because Terra's price feed is derived from validator oracles, a delay exists between the price reported on-chain and the real-time price.

The delay lasts around one minute (our oracle `VotePeriod` is 30 seconds), which is negligible for nearly all practical transactions. However, front-running attackers could take advantage of this delay and extract value from the network.

To defend against this type of attack, the Market module enforces the following swap fees:

- [**Tobin tax**](#tobintax) for spot-converting Terra<>Terra swaps

  For example, assume that the current Tobin tax for KRT is 0.35%, the oracle reports that the Luna<>SDT exchange rate is 10 and the Luna<>KRT exchange rate is 10,000. Swapping 1 SDT would return 0.1 Luna, which is 1,000 KRT. After the Tobin tax is applied, you will have 996.5 KRT (0.35% of 1,000 is 3.5), a better rate than any retail currency exchange and remittance[^1].

[^1]: Initially we maintained a policy for zero-fee swaps. However, to prevent front-running attackers from exploiting the exchange-rate latency and profiting at the expense of users, we implemented the Tobin tax. For more information, see ["On swap fees: the greedy and the wise"](https://medium.com/terra-money/on-swap-fees-the-greedy-and-the-wise-b967f0c8914e).

- [**Minimum spread**](#minspread) for Terra<>Luna swaps

  The minimum spread is 0.5%. Using the same exchange rates we used above, swapping 1 SDT will return 995 KRT worth of Luna (0.5% of 1000 is 5, which is taken as the swap fee). If you reverse the direction of the swap, 1 Luna would return 9.95 SDT (0.5% of 10 is 0.05), or 9,950 KRT (0.5% of 10,000 = 50).

### Market Making Algorithm

Terra uses a Constant Product market-making algorithm to ensure liquidity for Terra<>Luna swaps. [^2]

[^2]: For a more in-depth treatment of our updated market-making algorithm, check Nick Platias's SFBW 2019 presentation [here](https://agora.terra.money/t/terra-stability-swap-mechanism-deep-dive-at-sfbw/135).

With Constant Product, we define a value $CP$ set to the size of the Terra pool multiplied by a set **fiat value of Luna**, and ensure our market-maker maintains it as invariant during any swaps by adjusting the spread.

::: warning Note:
Our implementation of Constant Product diverges from Uniswap's, as we use the fiat value of Luna instead of the size of the Luna pool. This nuance means changes in Luna's price don't affect the product, but rather the size of the Luna pool.
:::

$$CP = Pool_{Terra} * Pool_{Luna} * (Price_{Luna}/Price_{SDR})$$

For example, we'll start with equal pools of Terra and Luna, both worth 1000 SDR total. The size of the Terra pool is 1000 SDT, and assuming the price of Luna<>SDR is 0.5, the size of the Luna pool is 2000 Luna. A swap of 100 SDT for Luna would return around 90.91 SDR worth of Luna (≈ 181.82 Luna). The offer of 100 SDT is added to the Terra pool, and the 90.91 SDT worth of Luna are taken out of the Luna pool.

```
CP = 1000000 SDR
(1000 SDT) * (1000 SDR of Luna) = 1000000 SDR
(1100 SDT) * (909.0909... SDR of Luna) = 1000000 SDR
```

This is meant to be an example. In reality, liquidity pools are much larger, diminishing the magnitude of the spread.

The primary advantage of Constant-Product is that it offers “unbounded” liquidity, and swaps of any size can be serviced.

### Virtual Liquidity Pools

The market starts out with two liquidity pools of equal sizes, one representing all denominations of Terra and another representing Luna. The parameter [`BasePool`](#basepool) defines the initial size, $Pool_{Base}$, of the Terra and Luna liquidity pools.

Rather than keeping track of the sizes of the two pools, this information is encoded in a number $\delta$, which the blockchain stores as `TerraPoolDelta`. This represents the deviation of the Terra pool from its base size in units µSDR.

The size of the Terra and Luna liquidity pools can be generated from $\delta$ using the following formulas:

$$Pool_{Terra} = Pool_{Base} + \delta$$
$$Pool_{Luna} = ({Pool_{Base}})^2 / Pool_{Terra}$$

At the [end of each block](#end-block), the market module attempts to replenish the pools by decreasing the magnitude of $\delta$ between the Terra and Luna pools. The rate at which the pools will be replenished toward equilibrium is set by the parameter [`PoolRecoveryPeriod`](#poolrecoveryperiod). Lower periods mean lower sensitivity to trades: previous trades are more quickly forgotten and the market is able to offer more liquidity.

This mechanism ensures liquidity and acts as a low-pass filter, allowing for the spread fee (which is a function of `TerraPoolDelta`) to drop back down when there is a change in demand, causing a necessary change in supply which needs to be absorbed.

### Swap Procedure

1. The Market module receives [`MsgSwap`](#msgswap) message and performs basic validation checks.

2. Calculate exchange rate $ask$ and $spread$ using [`k.ComputeSwap()`](#k-computeswap).

3. Update `TerraPoolDelta` with [`k.ApplySwapToPool()`](#k-applyswaptopool).

4. Transfer `OfferCoin` from account to module using `supply.SendCoinsFromAccountToModule()`.

5. Burn offered coins, with `supply.BurnCoins()`.

6. Let $fee = spread * ask$, this is the spread fee.

7. Mint $ask - fee$ coins of `AskDenom` with `supply.MintCoins()`. This implicitly applies the spread fee as the $fee$ coins are burned.

8. Send newly minted coins to trader with `supply.SendCoinsFromModuleToAccount()`.

9. Emit [`swap`](#swap) event to publicize the swap and record the spread fee.

If the trader's `Account` has insufficient balance to execute the swap, the swap transaction fails.

Upon successful completion of Terra<>Luna swaps, a portion of the coins to be credited to the user's account is withheld as the spread fee.

### Seigniorage

When Luna swaps into Terra, the Luna recaptured by the protocol is called seigniorage -- the value generated from issuing new Terra. The total seigniorage at the end of each epoch is calculated and reintroduced into the economy as ballot rewards for the exchange rate oracle and to the community pool by the Treasury module, described more fully [here](./spec-treasury.md#ksettleseigniorage).

::: warning Note:
As of Columbus-5, all seigniorage is burned, and the community pool is no longer funded. Swap fees are used as ballot rewards for the exchange rate oracle.
:::

## State

### Terra Pool Delta δ

- type: `sdk.Dec`

 This represents the difference between the current Terra pool size and its original base size, valued in µSDR.

## Message Types

### MsgSwap

A `MsgSwap` transaction denotes the `Trader`'s intent to swap their balance of `OfferCoin` for a new denomination `AskDenom`. This is used for both Terra<>Terra and Terra<>Luna swaps.

```go
// MsgSwap contains a swap request
type MsgSwap struct {
	Trader    sdk.AccAddress `json:"trader" yaml:"trader"`         // Address of the trader
	OfferCoin sdk.Coin       `json:"offer_coin" yaml:"offer_coin"` // Coin being offered
	AskDenom  string         `json:"ask_denom" yaml:"ask_denom"`   // Denom of the coin to swap to
}
```

### MsgSwapSend

A `MsgSendSwap` first performs a swap of `OfferCoin` into `AskDenom` and then sends the resulting coins to `ToAddress`. Tax is charged normally, as if the sender were issuing a `MsgSend` with the resulting coins of the swap.

```go
type MsgSwapSend struct {
	FromAddress sdk.AccAddress `json:"from_address" yaml:"from_address"` // Address of the offer coin payer
	ToAddress   sdk.AccAddress `json:"to_address" yaml:"to_address"`     // Address of the recipient
	OfferCoin   sdk.Coin       `json:"offer_coin" yaml:"offer_coin"`     // Coin being offered
	AskDenom    string         `json:"ask_denom" yaml:"ask_denom"`       // Denom of the coin to swap to
}
```

## Functions

### `k.ComputeSwap()`

```go
func (k Keeper) ComputeSwap(ctx sdk.Context, offerCoin sdk.Coin, askDenom string)
    (retDecCoin sdk.DecCoin, spread sdk.Dec, err sdk.Error)
```

This function detects the swap type from the offer and ask denominations and returns:

1. The amount of asked coins that should be returned for a given `offerCoin`. This is achieved by first spot-converting `offerCoin` to µSDR and then from µSDR to the desired `askDenom` with the proper exchange rate reported by the Oracle.

2. The spread percentage that should be taken as a swap fee given the swap type. Terra<>Terra swaps only have the Tobin Tax spread fee. Terra<>Luna swaps use the `MinSpread` or the Constant Product pricing spread, whichever is greater.

If the `offerCoin`'s denomination is the same as `askDenom`, this will raise `ErrRecursiveSwap`.

::: warning Note:
`k.ComputeSwap()` uses `k.ComputeInternalSwap()` internally, which only contains the logic for calculating proper ask coins to exchange, and not the Constant Product spread.
:::

### `k.ApplySwapToPool()`

```go
func (k Keeper) ApplySwapToPool(ctx sdk.Context, offerCoin sdk.Coin, askCoin sdk.DecCoin) sdk.Error
```

`k.ApplySwapToPools()` is called during the swap to update the blockchain's measure of $\delta$, `TerraPoolDelta`, when the balances of the Terra and Luna liquidity pools have changed.

All Terra stablecoins share the same liquidity pool, so `TerraPoolDelta` remains unaltered during Terra<>Terra swaps.

For Terra<>Luna swaps, the relative sizes of the pools will be different after the swap, and $\delta$ will be updated with the following formulas:

- for Terra to Luna, $\delta' = \delta + Offer_{\mu SDR}$
- for Luna to Terra, $\delta' = \delta - Ask_{\mu SDR}$

## Transitions

### End-Block

The Market module calls `k.ReplenishPools()` at the end of every block, which decreases the value of `TerraPoolDelta` (the difference between Terra and Luna pools) depending on `PoolRecoveryPeriod`, $pr$.

This allows the network to sharply increase spread fees during acute price fluctuations. After some time, the spread automatically returns to normal for long term price changes.

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

The number of blocks it takes for the Terra & Luna pools to naturally "reset" toward equilibrium ($\delta \to 0$) through automated pool replenishing.

### BasePool

- type: `Dec`
- default: 250,000 SDR (= 250,000,000,000 µSDR)

The initial starting size of both Terra and Luna liquidity pools.

### MinSpread

- type: `Dec`
- default: 0.5%

The minimum spread charged on Terra<>Luna swaps to prevent leaking value from front-running attacks.

### TobinTax

- type: `Dec`
- default: 0.35%

An additional fee for swapping between Terra currencies (spot-trading). The rate varies, depending on the denomination. For example, while the rate for most denominations is .35%, the rate for MNT is 2%. To see the rates, [query the oracle](../terrad/oracle.html#tobin-taxes).
