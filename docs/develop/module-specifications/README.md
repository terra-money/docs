# Terra Core modules <img src="/img/icon_core.svg" height="40px">

```{toctree}
:hidden:
spec-auth
spec-authz
spec-bank
spec-capability
spec-distribution
spec-evidence
spec-feegrant
spec-governance
spec-market
spec-mint
spec-oracle
spec-slashing
spec-staking
spec-treasury
spec-wasm
```

These tips and guidelines help you to understand how Terra works and efficiently navigate the codebase of the Terra core, the official Golang reference implementation of the Terra node software.

The Terra core is built using the [Cosmos SDK](https://cosmos.network/sdk), which provides a robust framework for constructing blockchains that run atop the [Tendermint](https://tendermint.com/) consensus protocol.

Review these projects before you explore the Terra developer documentation because they assume you are familiar with concepts such as ABCI, validators, keepers, message handlers, and so on.

## How to use the Terra Core module specifications

Each module specification begins with a short description of the module's main function within the architecture of the system and an explanation of how it contributes to implementing Terra's features.

Then, each module specification provides a more detailed description of its main process and algorithms alongside any concepts you might need to know. Start here to understand a module so that you can take advantage of the cross-references to more specific sections deeper in the specification, such as specific state variables, message handlers and other functions in which you might be interested.

These specifications are not an exhaustive reference, but they are a companion for users who need to work directly with the Terra Core codebase or understand it. The important functions in each module are described, and many of the trivial ones, such as getters and setters, are omitted for economy. Module logic is also located in either the message handler or block transitions, such as begin-blocker and end-blocker.

At the end, the specification lists various module parameters alongside their default values with a brief explanation of their purpose, associated events / tags, and errors issued by the module.

## Module architecture

The node software is organized into the following individual modules that implement different parts of the Terra protocol. They are listed in the order in which they are initialized during genesis:

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
7. [`oracle`](spec-oracle.md) - exchange rate feed oracle
   - vote tallying weighted median
   - ballot rewards
   - slashing misbehaving oracles
8. [`treasury`](spec-treasury.md): miner incentive stabilization
   - macroeconomic monitoring
   - monetary policy levers (Tax Rate, Reward Weight)
   - seigniorage settlement

   ::: {admonition} Note
   :class: warning
   As of proposals [43](https://station.terra.money/proposal/43) and [172](https://station.terra.money/proposal/172), all seigniorage is burned, and the stability fee tax rate is zero.  
   :::

9. [`gov`](spec-governance.md): on-chain governance
    - proposals
    - parameter updating
10. [`market`](spec-market.md): price-stabilization
    - Terra<>Terra spot-conversion, Tobin Tax
    - Terra<>Luna market-maker, Constant-Product spread
11. `crisis` - reports consensus failure state with proof to halt the chain
12. `genutil` - handles `gentx` commands
    - filter and handle `MsgCreateValidator` messages

### Inherited modules

Many of the modules in Terra Core are inherited from the Cosmos SDK and are configured to work with Terra through customization in either genesis parameters or by augmenting their functionality with additional code.

## Block lifecycle

The following processes are executed during each block transition:

### Begin block

1. Distribution: Issuance of rewards for the previous block.

2. Slashing: Checking of infraction evidence or downtime of validators for double-signing and downtime penalties.

### Process messages

3. Messages are routed to the modules that are responsible for working them and then processed by the appropriate message handlers.

### End block

4. Crisis: Check all registered invariants and assert they remain true.

5. Oracle

   - If at the end of `VotePeriod`, run [voting procedure](spec-oracle.md#voting-procedure) and update Luna exchange rate.
   - If at the end of `SlashWindow`, penalize validators who [missed](spec-slashing.md) more `VotePeriod`s than permitted.

6. Governance: Remove inactive proposals, check active proposals whose voting periods have ended for passes, and run the registered proposal handler of the passed proposal.

7. Market: [Replenish](spec-market.md#end-block) liquidity pools, allowing spread fees to decrease.

8. Treasury: At the end of `epoch`, update indicators, burn seigniorage, and recalibrate monetary policy levers (tax-rate, reward-weight) for the next epoch.

9. Staking: The new set of active validators is determined from the top 130 Luna stakers. Validators that lose their spot within the set start the unbonding process.

## Conventions

### Currency denominations

Two types of tokens can be held by accounts and wallets in the Terra protocol:

- Terra stablecoins track the exchange rate of various fiat currencies. Each Terra stablecoin is named for its corresponding three-letter [ISO 4217 fiat currency code](https://www.xe.com/iso4217.php), written as `Terra<currencycode>`. When used as a value, the last letter of each currency code abbreviation is replaced with T to signify it as a Terra stablecoin. For example, the Terra stablecoin pegged to the Korean Won, KRW, is named  TerraKRW, and its abbreviation is KRT.

   The Terra protocol's standard base currency is TerraSDR, or SDT, which pegs to the IMF's Special Drawing Rights. The Terra protocol uses SDT to make calcualtions and set rate standards.

- Luna is the Terra protocol's native staking asset. Delegators earn mining rewards when they stake their Luna to an active validator. Luna stabilizes the Terra economy by absorbing the price volatility of Terra stablecoins and is also used to make governance proposals.

The microunit ($\times 10^{-6}$) is the smallest atomic unit of both Terra stablecoins and Luna.

| Denomination | Micro-Unit | Code    | Value         |
| :----------- | :--------- | :------ | :------------ |
| Luna         | µLuna      | `uluna` | 0.000001 Luna |
| TerraSDR     | µSDR       | `usdr`  | 0.000001 SDT  |
| TerraKRW     | µKRW       | `ukrw`  | 0.000001 KRT  |
| TerraUSD     | µUSD       | `uusd`  | 0.000001 UST  |
| TerraMNT     | µMNT       | `umnt`  | 0.000001 MNT  |

The Terra protocol is only aware of the value of fiat currencies through their Terra stablecoin counterparts, which are assumed to trade relatively close to the value of the fiat currency they are pegged to, due to arbitrage activity.
