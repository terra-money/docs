# Developer guide

This document covers tips and guidelines to help you to understand how Terra works and efficiently navigate the codebase of Terra Core, the official Golang reference implementation of the Terra node software.

::: Recommendation
The Terra Core is built using the [Cosmos SDK](https://cosmos.network/sdk), which provides a robust framework for constructing blockchains that run atop the [Tendermint](https://tendermint.com/) Consensus Protocol.

It is highly recommended that you review these projects before diving into the Terra developer documentation, as they assume familiarity with concepts such as ABCI, Validators, Keepers, Message Handlers, etc.
:::

## How to use the docs

As a developer, you will likely find the **Module Specifications** section the most informative. Each specification starts out with a short description of the module's main function within the architecture of the system, and how it contributes in implementing Terra's features.

Beyond the introduction, each module will lay out a more detailed description of its main process and algorithms, alongside any concepts you may need to know. It is recommended that you start here to understand a module, as it is usually cross-referenced with more specific sections deeper in the spec such as specific state variables, message handlers and functions that may be of interest.

The current function documentation is not an exhaustive reference, but has been written to be a reference companion for those needing to work directly with the Terra Core codebase or understand it. The important functions in each module have been covered, and many of the trivial ones (such as getters and setters) have been left out for economy. Other places where module logic can be found is within either the message handler, or block transitions (begin-blocker and end-blocker).

At the end, the specification lists out various module parameters alongside their default values with a brief explanation of their purpose, and associated events / tags and errors emitted by the module.

## Module architecture

The node software is organized into the following individual modules that implement different parts of the Terra protocol. They are listed in the order in which they are initialized during genesis:

1. `genaccounts` - import & export genesis account
2. [`distribution`](./Module-specifications/spec-distribution.md): distribute rewards between validators and delegators
   - tax and reward distribution
   - community pool
3. [`staking`](./Module-specifications/spec-staking.md): validators and Luna
4. [`auth`](./Module-specifications/spec-auth.md): ante handler
   - vesting accounts
   - stability layer fee
5. [`bank`](./Module-specifications/spec-bank.md) - sending funds from account to account
6. [`slashing`](./Module-specifications/spec-slashing.md) - low-level Tendermint slashing (double-signing, etc)
7. [`oracle`](./Module-specifications/spec-oracle.md) - exchange rate feed oracle
   - vote tallying weighted median
   - ballot rewards
   - slashing misbehaving oracles
8. [`treasury`](./Module-specifications/spec-treasury.md): miner incentive stabilization
   - macroeconomic monitoring
   - monetary policy levers (Tax Rate, Reward Weight)
   - seigniorage settlement: all seigniorage is burned as of Columbus-5
9. [`gov`](./Module-specifications/spec-governance.md): on-chain governance
    - proposals
    - parameter updating
10. [`market`](./Module-specifications/spec-market.md): price-stabilization
    - Terra<>Terra spot-conversion, Tobin Tax
    - Terra<>Luna market-maker, Constant-Product spread
11. `crisis` - reports consensus failure state with proof to halt the chain
12. `genutil` - handles `gentx` commands
    - filter and handle `MsgCreateValidator` messages

### Inherited modules

Many of the modules in Terra Core are inherited from Cosmos SDK and are configured to work with Terra through customization in either genesis parameters or by augmenting their functionality with additional code.

## Block lifecycle

The following processes get executed during each block transition:

### Begin block

1. Distribution

   - Distribute rewards for the previous block

2. Slashing
   - Checking of infraction evidence or downtime of validators for double-signing and downtime penalties.

### Process messages

3. Messages are routed to the modules that are responsible for working them and then processed by the appropriate Message Handlers.

### End block

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

   - At the end of `epoch`, update indicators, burn seigniorage, and recalibrate monetary policy levers (tax-rate, reward-weight) for the next epoch.

9. Staking
   - The new set of active validators is determined from the top 130 Luna stakers. Validators that lose their spot within the set start the unbonding process.

## Conventions

### Currency denominations

There are two types of tokens that can be held by accounts and wallets in the Terra protocol:

1. **Terra stablecoins** track the exchange rate of various fiat currencies. Each Terra stablecoin is named for its corresponding 3 letter [ISO 4217 fiat currency code](https://www.xe.com/iso4217.php), written as `Terra<currencycode>`. When used as a value, the last letter of each currency code abbreviation is replaced with T to signify it as a Terra stablecoin. For example, the Terra stablecoin pegged to the Korean Won, KRW, is named  TerraKRW, and its abbreviation is KRT.

   The Terra protocol's standard base currency is TerraSDR, or SDT, which pegs to the IMF's Special Drawing Rights. The Terra protocol uses SDT to make calcualtions and set rate standards.

2. **Luna** is the Terra protocol's native staking asset. Delegators earn mining rewards when they stake their Luna to an active validator. Luna stabilizes the Terra economy by absorbing the price volatility of Terra stablecoins and is also used to make governance proposals.

The micro-unit ($\times 10^{-6}$) is the smallest atomic unit of both Terra stablecoins and Luna.

| Denomination | Micro-Unit | Code    | Value         |
| :----------- | :--------- | :------ | :------------ |
| Luna         | µLuna      | `uluna` | 0.000001 Luna |
| TerraSDR     | µSDR       | `usdr`  | 0.000001 SDT  |
| TerraKRW     | µKRW       | `ukrw`  | 0.000001 KRT  |
| TerraUSD     | µUSD       | `uusd`  | 0.000001 UST  |
| TerraMNT     | µMNT       | `umnt`  | 0.000001 MNT  |

Note that the Terra protocol is only aware of the value of fiat currencies through their Terra stablecoin counterparts, which are assumed to trade relatively close to the value of the fiat currency they are pegged to, due to arbitrage activity.
