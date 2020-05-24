---
id: dev-devguide
---

# Developer Guide

This document covers tips and guidelines to help you to understand how Terra works and efficiently navigate the codebase of Terra Core, the official Golang reference implementation of the Terra node software.

::: tip
Terra Core is built using the [Cosmos SDK](https://cosmos.network/sdk), which provides a robust framework for constructing blockchains that run atop the [Tendermint](https://tendermint.com/) Consensus Protocol.

It is highly recommended that you review these projects before diving into the Terra developer documentation, as they assume familiarity with concepts such as ABCI, Validators, Keepers, Message Handlers, etc.
:::

## How to use the Docs

As a developer, you will likely find the **Module Specifications** section the most informative. Each specification starts out with a short description of the module's main function within the architecture of the system, and how it contributes in implementing Terra's features.

Beyond the introduction, each module will lay out a more detailed description of its main process and algorithms, alongside any concepts you may need to know. It is recommended that you start here to understand a module, as it is usually cross-referenced with more specific sections deeper in the spec such as specific state variables, message handlers and functions that may be of interest.

The current function documentation is not an exhaustive reference, but has been written to be a reference companion for those needing to work directly with the Terra Core codebase or understand it. The important functions in each module have been covered, and many of the trivial ones (such as getters and setters) have been left out for economy. Other places where module logic can be found is within either the message handler, or block transitions (begin-blocker and end-blocker).

At the end, the specification lists out various module parameters alongside their default values with a brief explanation of their purpose, and associated events / tags and errors emitted by the module.

## Module Architecture

The node software is organized into individual modules that implement different parts of the Terra protocol. Here are they, listed in the order they are initialized during genesis:

1. `genaccounts` - import & export genesis account
2. [`distribution`](spec-distribution.md): distribute rewards between validators and delegators
   - tax and reward distribution
   - community pool
3. [`staking`](spec-staking.md): validators and Luna
4. [`auth`](spec-auth.md): ante handler
   - vesting accounts
   - stability layer fee
5. [`bank`](spec-bank.md) - sending funds from account to account
6. [`slashing`](spec-slashing.md) - low-level Tendermint slashing (double-signing, etc)
7. [`supply`](spec-supply.md) - Terra / Luna supplies
8. [`oracle`](spec-oracle.md) - exchange rate feed oracle
   - vote tallying weighted median
   - ballot rewards
   - slashing misbehaving oracles
9. [`treasury`](spec-treasury.md): miner incentive stabilization
   - macroecnomic monitoring
   - monetary policy levers (Tax Rate, Reward Weight)
   - seigniorage settlement
10. [`gov`](spec-governance.md): on-chain governance
    - proposals
    - parameter updating
11. [`market`](spec-market.md): price-stabilization
    - Terra<>Terra spot-conversion, Tobin Tax
    - Terra<>Luna market-maker, Constant-Product spread
12. `crisis` - reports consensus failure state with proof to halt the chain
13. `genutil` - handles `gentx` commands
    - filter and handle `MsgCreateValidator` messages

### Inherited Modules

Many of the modules in Terra Core are inherited from Cosmos SDK, and are configured to work with Terra through customization in either genesis parameters or by augmenting their functionality with additional code.

## Block Lifecycle

The following processes get executed during each block transition:

### Begin Block

1. Distribution

   - Distribute rewards for the previous block

2. Slashing
   - Checking of infraction evidence or downtime of validators for double-signing and downtime penalites.

### Process Messages

3. Messages are routed to the modules that are responsible for working them and then procesed by the appropriate Message Handlers.

### End Block

4. Crisis

   - Check all registered invariants and assert they remain true

5. Oracle

   - If at the end of `VotePeriod`, run [Voting Procedure](spec-oracle.md#voting-procedure) and **update Luna Exchange Rate**.
   - If at the end of `SlashWindow`, **penalize validators** who [missed](spec-oracle.md#slashing) more `VotePeriod`s than permitted.

6. Governance

   - Get rid of inactive proposals, check active proposals whose voting periods have ended for passes, and run registered proposal handler of the passed proposal.

7. Market

   - [Replenish](spec-market.md#end-block) liquidity pools, **allowing spread fees to decrease**.

8. Treasury

   - If at the end of `epoch`, update indicators, mint seigniorage, and recalibrate monetary policy levers (tax-rate, reward-weight) for the next epoch.

9. Staking
   - The new set of active validators is determined from the top 100 Luna stakers, and validators that lose their spot within the set are start to unbond.

## Conventions

### Currency Denominations

There are two types of tokens that can be held by accounts and wallets in the Terra protocol:

1. **Terra Stablecoins** are transactional assets that are track the exchange rate of various fiat currencies. By convention, given a fiat currency, the Terra peg that corresponds to it is Terra-`<3-letter ISO4217 currency-code>` (see [here](https://www.xe.com/iso4217.php)) abbreviated `<country-code>T`, where the `T` replaces the currency's designator. For instance, TerraKRW is the peg for the Korean Won, and is abbreviated KRT.

   The flagship, standard Terra currency is TerraSDR, or SDT, the peg to the IMF's Special Drawing Rights. The protocol will use SDT as its default, "base" currency to do calculations and setting standards.

2. **Luna**, the native staking asset that entitles the staking delegator to mining rewards (including exchange rate ballot rewards) if bonded to an active validator. Luna is also is necessary for making governance proposals and collateralizing the Terra economy.

Both Terra (of all denominations) and Luna tokens are divisible up to microunits ($\times 10^{-6}$). The micro-unit is considered the atomic unit of tokens, and cannot be further divided. Below is a list of several denominations that are recognized by the protocol at the time of writing:

| Denomination | Micro-Unit | Code    | Value         |
| :----------- | :--------- | :------ | :------------ |
| Luna         | µLuna      | `uluna` | 0.000001 Luna |
| TerraSDR     | µSDR       | `usdr`  | 0.000001 SDT  |
| TerraKRW     | µKRW       | `ukrw`  | 0.000001 KRT  |
| TerraUSD     | µUSD       | `uusd`  | 0.000001 UST  |
| TerraMNT     | µMNT       | `umnt`  | 0.000001 MNT  |

Note that the Terra protocol is only aware of the value of fiat currencies through their Terra stablecoin counterparts, which are assumed to trade relatively close to the value of the fiat currency they are pegged to, due to arbitrage activity.
