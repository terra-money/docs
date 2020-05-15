---
id: dev-conventions
title: Conventions
---

This document explains general conventions and special types used by the Terra Core codebase.

## Currency Denominations

There are two types of tokens that can be held by accounts and wallets in the Terra protocol:

1) **Terra Stablecoins** are transactional assets that are track the exchange rate of various fiat currencies. By convention, given a fiat currency, the Terra peg that corresponds to it is Terra-`<3-letter ISO4217 currency-code>` (see [here](https://www.xe.com/iso4217.php)) abbreviated `<country-code>T`, where the `T` replaces the currency's designator. For instance, TerraKRW is the peg for the Korean Won, and is abbreviated KRT.

    The flagship, standard Terra currency is TerraSDR, or SDT, the peg to the IMF's Special Drawing Rights. The protocol will use SDT as its default, "base" currency to do calculations and setting standards. 

2) **Luna**, the native staking asset that entitles the staking delegator to mining rewards (including exchange rate ballot rewards) if bonded to an active validator. Luna is also is necessary for making governance proposals and collateralizing the Terra economy.

Both Terra (of all denominations) and Luna tokens are divisible up to microunits ($\times 10^{-6}$). The micro-unit is considered the atomic unit of tokens, and cannot be further divided. Below is a list of several denominations that are recognized by the protocol at the time of writing:

| Denomination | Micro-Unit | Code | Value |
| :-- | :-- | :-- | :-- |
| Luna | µLuna | `uluna` | 0.000001 Luna |
| TerraSDR | µSDR | `usdr` | 0.000001 SDT |
| TerraKRW | µKRW | `ukrw` | 0.000001 KRT |
| TerraUSD | µUSD | `uusd` | 0.000001 UST |
| TerraMNT | µMNT | `umnt` | 0.000001 MNT |

Note that the Terra protocol is only aware of the value of fiat currencies through their Terra stablecoin counterparts, which are assumed to trade relatively close to the value of the fiat currency they are pegged to, due to arbitrage activity.