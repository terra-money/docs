# Market <img src="/img/Market.svg" height="40px">

## Overview

The market module is the heart of the Terra protocol, allowing users to always trade 1 USD of Terra for 1 USD of Luna. This simple mechanism ensures the price-stability of Terra stablecoins on external markets by incentivizing trades that maintain each stablecoin's price peg. Whenever Terra stablecoins are trading above or below the prices of their fiat counterparts, an arbitrage opportunity is created. Traders are incentivized to rebalance pools in external markets by profiting from the arbitrage trades against the market module. 



## Exchange rates

Validators import the real-time value of Luna against various fiat currencies using oracle feeders. Validators use these prices to calculate the exchange rates of Luna against each Terra stablecoin's fiat counterpart. Oracle exchange rates are listed as fiat amount per Luna. For example, if 1 Luna is trading at 100 USD, the rate would be reported as 100 USD/Luna. Validators submit these rates as votes, and the weighted median rates for each stablecoin are determined to be the effective exchange rates used by the Terra protocol in the market module. This process happens every 6 blocks. 

When a trader wants to swap between Luna and Terra stablecoins, or exchange between stablecoin denomination, the current exchange rates are directly imported from the oracle module. 

:::{note}
On-chain, the Terra protocol makes no distinction between fiat denominations and their stablecoin counterparts. In the oracle module, validators submit the exchange rates of fiat against Luna. The market module then uses these fiat/Luna rates as the effective price rates for Terra stablecoins. The market module never requires the off-chain exchange rate between fiat and Terra stablecoins to calculate swaps. For this reason, 1 UST is always equal to the price of 1 USD on-chain, regardless of external market conditions. 
:::

## Swaps

The market module is responsible for swaps between Terra stablecoin denomintions and swaps between Terra stablecoins and Luna. 


### Stablecoins 

To swap between stablecoins, 

### Terra and Luna



## Swap Fees

Swap fees were implemented to protect against different market module attacks. 


##

Because Terra's price feed is derived from validator oracles, a delay exists between the price reported on-chain and the real-time price.

The delay lasts around one minute (our oracle `VotePeriod` is 30 seconds), which is negligible for nearly all practical transactions. However, front-running attackers could take advantage of this delay and extract value from the network.





### Virtual Liquidity Pools

To protect against oracle attacks and to combat volatility, the market module uses virtual liquidity pools regulate transaction volume. 





### Seigniorage

::: {admonition} All seigniorage is Burned
:class: Caution

Seigniorage used to be an important part of the protocol, but is no longer necessary. As of Columbus-5, all seigniorage is burned, and the community pool is no longer funded. Swap fees are used instead of seigniorage as ballot rewards for the exchange rate oracle. The following information is kept as reference:
:::

When Luna swaps into Terra, the Luna recaptured by the protocol was called seigniorage -- the value generated from issuing new Terra. The total seigniorage at the end of each epoch was calculated and reintroduced into the economy as ballot rewards for the exchange rate oracle and to the community pool by the Treasury module, described more fully [here](spec-treasury.md). As of Columbus-5, all seigniorage is burned, and the community pool is no longer funded. Swap fees are used as ballot rewards for the exchange rate oracle.

### Swap Procedure

The swap procedure logic can be found in [x/market/keeper/msg_server.go](https://github.com/terra-money/core/blob/main/x/market/keeper/msg_server.go). 

1. The Market module receives a [`MsgSwap`](#msgswap) message and performs basic validation checks using `ValidateBasic`. 

2. [`k.ComputeSwap()`](#computeswap) is called, and the oracle exchange rate is used to calculate the equivalent amount of the ask coin from the offer coin.

3. The Spread fee or Tobin tax is calculated and subtracted from the ask amount. 

4. The offer and ask amounts (minus the fee) are applied to the virtual pools, and the [`terraPoolDelta`](#terrapooldelta) is updated with [`k.ApplySwapToPool()`](#k-applyswaptopool).

5. The `offerCoin` is transfered to the market module using `k.BankKeeper.SendCoinsFromAccountToModule()`.

6. The `offerCoin` is burned using `k.BankKeeper.BurnCoins()`.

7. The ask amount and spread fee are minted separately using `k.BankKeeper.MintCoins()`.

8. The newly minted askCoins are sent to the trader using `k.BankKeeper.SendCoinsFromModuleToAccount()`.

9. The swap fee is sent to the oracle account using `k.BankKeeper.SendCoinsFromModuleToModule()`. 

10. The `swap` event is emitted to publicize the swap and record the spread fee.

:::{note}
If a trader's `Account` does not contain enough coins to execute a swap, the transaction will fail.
:::


## State

### `terraPoolDelta`

- type: `sdk.Dec`

The `terraPoolDelta` represents the difference between the current Terra pool size and its original [](#basepool) size. The `terraPoolDelta` is updated during any swap between Terra and Luna using [](#applyswaptopool). At the end of every block, the absolute value of the `terraPoolDelta` is lowered using [](#replenishpools). 


## Message Types

### MsgSwap

A `MsgSwap` transaction denotes the `Trader`'s intent to swap their balance of `OfferCoin` for a new denomination `AskDenom`. Terra<>Terra swaps incur gas and the Tobin tax, and Terra<>Luna swaps incur gas and a spread fee.

```go
// MsgSwap contains a swap request
type MsgSwap struct {
	Trader    sdk.AccAddress `json:"trader,omitempty" yaml:"trader"`       // Trader's address
	OfferCoin types.Coin     `json:"offer_coin" yaml:"offer_coin"`         //Coin being offered
	AskDenom  string         `json:"ask_denom,omitempty" yaml:"ask_denom"` // Denom of the coin to swap to
}
```

### MsgSwapSend

A `MsgSwapSend` first swaps `OfferCoin` for `AskDenom` and then sends the acquired coins to `ToAddress`. Swap fees are charged to the sender.

```go
type MsgSwapSend struct {
	FromAddress sdk.AccAddress `json:"from_address" yaml:"from_address"` // Address of the offer coin payer
	ToAddress   sdk.AccAddress `json:"to_address" yaml:"to_address"`     // Address of the recipient
	OfferCoin   sdk.Coin       `json:"offer_coin" yaml:"offer_coin"`     // Coin being offered
	AskDenom    string         `json:"ask_denom" yaml:"ask_denom"`       // Denom of the coin to swap to
}
```

## Functions

The market module swap functions can be found in [x/market/keeper/swap.go](https://github.com/terra-money/core/blob/main/x/market/keeper/swap.go). 


### `ComputeSwap`

[View in Github](https://github.com/terra-money/core/blob/main/x/market/keeper/swap.go#L52)

```go
func (k Keeper) ComputeSwap(ctx sdk.Context, offerCoin sdk.Coin, askDenom string) (retDecCoin sdk.DecCoin, spread sdk.Dec, err error)
```

The `ComputeSwap()` function computes the ask amount based on the offer amount based on the oracle exchange rate and applies a Tobin tax or spread fee. 

1. If both the ask and offer coins are the same denomination, return an error. 

2. Use `ComputeInternalSwap` to swap the offer coin amount to the base µSDR denomination for simplicity. 

3. Use `ComputeInternalSwap` again to return the ask coin amount based on the oracle exchange rate. 

4. For swaps between Terra stablecoins, return the Tobin tax rates for both denominations and apply the higher rate. 

5. For swaps between Terra and Luna, calculate and apply the spread fee. If the spread fee is less than 0.5%, apply the minimum spread fee. 

::: {note}
`k.ComputeSwap()` uses `k.ComputeInternalSwap()` internally to calcuate exchange rates based on the oracle price. `k.ComputeInternalSwap()` does not apply a spread fee. 
:::

### `ComputeInternalSwap`

[View in Github](https://github.com/terra-money/core/blob/main/x/market/keeper/swap.go#L134)

``` go
func (k Keeper) ComputeInternalSwap(ctx sdk.Context, offerCoin sdk.DecCoin, askDenom string) (sdk.DecCoin, error)
```

`K.ComputeInternalSwap()` swaps amounts based on oracle exchange rates without applying a spread fee. 
 
1. If both the ask and offer coins are the same denomination, return an error. 

2. Use [`k.OracleKeeper.GetLunaExchangeRate`](https://github.com/terra-money/core/blob/a048b26251a37d52d7139a6529358ffb95e14b6a/x/oracle/keeper/keeper.go#L71) to return the offer and ask rates from the oracle. All oracle exchange rates are denominated as an amount of Terra stablecoins per Luna. If the offer or ask coins are denominated in Luna, the rate is $1$, as $ 1\, \tfrac{Luna}{Luna} = 1$. 

3. Calculate the ask amount using the offer amount using the following equation:

$$ askAmount = offerCoin.Amount * askRate \div{offerRate} $$


**Example**: Luna to Terra: Swap 20 Luna to SDR:

$offerCoin.Amount$: 20 Luna  
$askRate$: 100 SDR/Luna  
$offerRate$: 1  (1 Luna / 1 Luna)  

$$ \mathrm{20 \,Luna * 100\, \tfrac{SDR}{Luna} \div{1}  = 2000 \,SDR} $$

**Example**: Terra to Terra: Swap 100 USD to SDR:

$offerCoin.Amount$: 100 USD  
$askRate$: 100 SDR/Luna  
$offerRate$: 140 USD/Luna  

$$ \mathrm{100 \,USD * 100\, \tfrac{SDR}{Luna} \div{140\, \tfrac{USD}{Luna}}  \approx 71.43 \,SDR} $$

:::{admonition} Micro-denominaitons
The market module uses micro-denominations in all coin calculations. For simplicity, the previous examples show whole values of coins. Micro denominations are one millionth of a coin. 
:::

### `ApplySwapToPool`

[View in Github](https://github.com/terra-money/core/blob/main/x/market/keeper/swap.go#L12)

```go
func (k Keeper) ApplySwapToPool(ctx sdk.Context, offerCoin sdk.Coin, askCoin sdk.DecCoin)
```

`k.ApplySwapToPools()` applies the ask and offer amounts to the Terra and Luna virtual liquidity pools by updating the `terraPoolDelta`. This function updates the `terraPoolDelta` during all swaps between Terra and Luna. 
 

1. Because all Terra stablecoins share the same virtual liquidity liquidity pool, the `TerraPoolDelta` remains unaltered during swaps between Terra denominations.

2. Use `k.GetTerraPoolDelta` to return the current `terraPoolDelta`. 

3. For Terra to Luna swaps, use [`ComputeInternalSwap`](#computeinternalswap) to swap the offer amount to µSDR. This amount is added to the `terraPoolDelta` to calculate the new `terraPoolDelta`.

$$ newterraPoolDelta = terraPoolDelta + offerCoin.Amount_\mathrm{µSDR} $$

4. For Luna to Terra swaps, use [`ComputeInternalSwap`](#computeinternalswap) to swap the ask amount to µSDR. This amount is subtracted from the `terraPoolDelta` to calculate the new `terraPoolDelta`.

$$ terraPoolDelta_{new} = terraPoolDelta - askBaseCoin.Amount_\mathrm{µSDR} $$


### `EndBlocker`

[View in Github](https://github.com/terra-money/core/blob/main/x/market/abci.go#L10)

```go
func EndBlocker(ctx sdk.Context, k keeper.Keeper)
```

At the end of every block, `k.EndBlocker()` calls the `k.ReplenishPools()` function to replenish the virtual liquidity pools towards `basePool` size by lowering the `terraPoolDelta`.

### `ReplenishPools`

[View in Github](https://github.com/terra-money/core/blob/main/x/market/keeper/keeper.go#L81)

``` go
func (k Keeper) ReplenishPools(ctx sdk.Context)
```

`k.ReplenishPools()` replenishes the virtual liquidity pool amounts toward `basePool`. 

1. Use `k.GetTerraPoolDelta()` to retrieve the current `terraPoolDelta`.
2. Retrieve the `PoolRecoveryPeriod`
3. Calculate the `poolRegressionAmt` using the following formula:

$$ poolRegressionAmt = \frac{terraPoolDelta}{PoolRecoveryPeriod} $$

4. Calculate a new `terraPoolDelta` by subtracting the `poolRegressionAmt` from the `terraPoolDelta`. This action replenishes the virtual liquidity pools toward the `basePool` amount. 

$$ terraPoolDelta_{new} = terraPoolDelta - poolRegressionAmt $$

5. Set the new `terraPoolDelta` using `k.SetTerraPoolDelta()`. 

## Parameters

[View in Github](https://github.com/terra-money/core/blob/main/x/market/types/market.pb.go#L27)

```go
type Params struct {
	BasePool github_com_cosmos_cosmos_sdk_types.Dec
	PoolRecoveryPeriod uint64   
	MinStabilitySpread github_com_cosmos_cosmos_sdk_types.Dec
}
```
The subspace for the Market module is `market`. The following parameters can be altered using a [governance proposal](../../learn/protocol.md#proposals).

### PoolRecoveryPeriod

- type: `uint64`
- default: `BlocksPerDay`

A set number of blocks used in [](#replenishpools) to bring the `terraPoolDelta` closer to zero and replenish the virtual liquidity pools toward their [`BasePool`](#basepool) size. 

### BasePool

- type: `Dec`
- default: 250,000 SDR (= 250,000,000,000 µSDR)

The initial starting size of both Terra and Luna virtual liquidity pools. The constant product is set by squaring the basepool. Pools are adjusted based on swap amounts using [](#applyswaptopool). Every block, pools are rebalanced toward their `BasePool` levels by lowering the `terraPoolDelta` using the [`k.ReplenishPools()`](#replenishpools) function.

### MinSpread

- type: `Dec`
- default: 0.5%

The minimum spread fee charged on any transaction between Terra and Luna.