# Glossary

A glossary of terms specific to the Terra protocol.

## Active set

The top 130 validators that participate in consensus and receive rewards.

## Air drops

Additional rewards given to delegators through certain validators, separate from staking rewards. Airdrops come from protocols in the Terra ecosystem to increase visibility. To claim an airdrop, visit the webpage of the protocol giving out the airdrop.

## Algorithmic stablecoin

A cryptocurrency that tracks the price of any asset, usually currency. Algorithmic stablecoins maintain their price peg through a set of rules or software instead of an underlying asset.

## Arbitrage

To profit from price differences across different markets. Arbitrageurs buy coins in one market and sell them on another market for a higher price.

## Blockchain

An unchangeable ledger of transactions copied among a network of independent computer systems.

## Blocks

Groups of information stored on a blockchain. Each block contains transactions that are grouped, verified, and signed by validators.

## bLuna

A token representing bonded Luna that can be traded freely or used as collateral on other protocols in the Terra network, such as [Anchor](https://anchorprotocol.com/) and [Mirror](https://mirror.finance/). Bonded Luna takes 21 days to become unbonded.

## Bonded validator

A validator in the active set participating in consensus. Bonded validators earn rewards.

## Bonding

When a user delegates or bonds Luna to a validator to receive staking rewards. Validators never have ownership of a delegator's Luna, even when bonded. Delegating, bonding, and staking generally refer to the same process.

## Burn

The destruction of coins. The Terra protocol burns Luna to mint Terra stablecoins and vice versa. Burned coins are destroyed.

## CHAI

A mobile payments app powered by Terra's blockchain network.

## Columbus-5

The current version of the Terra mainnet.

## Commission

The percentage of staking rewards a validator will keep before distributing the rest of the rewards to delegators. Commission is a validator’s income. Validators set their own commission rates.

## Community pool

A special fund designated for funding community projects. Any community member can create a governance proposal to spend the tokens in the community pool. If the proposal passes, the funds are spent as specified in the proposal.

## Consensus

A system used by validators or miners to agree that each block of transactions in a blockchain is correct. The Terra blockchain uses the Tendermint consensus. Validators earn rewards for participating in consensus. Visit the [Tendermint official documentation site](https://docs.tendermint.com/) for more information.

## Cosmos-SDK

The open-source framework the Terra blockchain is built on. For more information, check out the [Cosmos SDK Documentation](https://docs.cosmos.network/).

## dApp

An application built on a decentralized platform. Protocol’s built on Terra are dApps.

## DDoS

Distributed denial of service attack. When an attacker floods a network with traffic or requests in order to disrupt service.

## DeFi

Decentralized finance. A movement away from traditional finance and toward systems that do not require financial intermediaries.

## Delegate

When users or delegators add their Luna to a validator's stake in exchange for rewards. Delegated Luna is bonded to a validator. Validators never have ownership of a delegator's Luna. Delegating, bonding, and staking generally refer to the same process.


## Delegator

A user who delegates, bonds, or stakes Luna to a validator to earn rewards.

## Fees

- **Gas fees**: Compute fees added on to each transaction to avoid spamming. Validators set minimum gas prices and reject transactions that have implied gas prices below this threshold.

- **Stability fees**: Fees added on to each transaction to provide stability in the market. The fee for swapping Terra stablecoin denominations is called a Tobin tax. Exchanges between Terra and Luna are subject to a spread fee.

## Fiat currency

Currency issued by a government that is not backed by an underlying asset. USD is the fiat currency of the United States.

## Full node

A computer connected to the Terra mainnet able to validate transactions and interact with the Terra blockchain. All active validators run full nodes.

## Luna

The native staking token of the Terra protocol. Luna supply expands and contracts in order to maintain the prices of Terra stablecoins. Luna is also used as a governance token. [Delegators](#Delegator) can stake Luna to recieve rewards.

## Governance

The process that allows users and validators to make changes to the Terra protocol. Users and validators vote on proposals submitted by community members. One staked Luna is equal to one vote.

## Governance proposal

A written submission for a change or addition to the Terra protocol. Topics of proposals can vary from community pool spending, software changes, parameter changes, or any idea pertaining to the Terra protocol.

## Inactive set

Validators that are not in the active set. These validators do not participate in consensus and do not earn rewards.

## Jailed

Validators who misbehave are jailed or excluded from the validator set for a period amount of time.

## Mint

The creation of new coins. Minting is the opposite of burning. The Terra protocol burns Luna to mint Terra stablecoins and vice versa.

## Module

A section of the Terra core that represents a particular function of the Terra protocol. Visit the [Terra core module specifications](/Reference/Terra-core/Overview.md) for more information.

## Oracle

A software that monitors the real-world price and exchange rates of different assets. Validators submit exchange rates to the protocol and vote on the correct rates. Oracles are used to relay current external exchange rates to the protocol.

For more information, visit the [Oracle](/Reference/Terra-core/Module-specifications/spec-oracle.md) reference documentation.

## Peg

A currency rate that directly tracks an asset's price. The peg for UST is the price of USD. The ideal peg ratio is 1:1.

## Pools

Groups of tokens. Supply pools represent the total supply of tokens in a market.

## Proof of Stake

Proof of Stake. A style of blockchain where validators are chosen to propose blocks according to the number of coins they hold.

## Redelegate

When a delegator wants to transfer their bonded luna to a different validator. Redelegating Luna is instant and does not require a 21-day unbonding period.

## Reward weight

The percentage of staking rewards a validator receives proportional to their total stake.

## Rewards

Revenue generated from fees given to validators and delegators.

## SDR

Special Drawing Rights. An international reserve asset and unit of account created by the IMF. SDR value is calculated daily using a basket of the world's largest economies. The Terra protocol uses TerraSDR or SDT as its base currency for calculations and to set standards.

## Seigniorage

The value of a coin minus the cost of its production. In the Terra protocol, the cost of minting is very small. All seigniorage in the Terra protocol is burned.

## Self-delegation

The amount of Luna a validator bonds to themselves. Also referred to as self-bond.

## Slashing

Punishment for validators that misbehave.

## Slippage

The difference in a coin's price between the start and end of a transaction.  

## Stake

The amount of Luna bonded to a validator.

## Staking

When a user or delegator delegates and bonds Luna to an active validator in order to receive rewards. Bonded Luna adds to a validator's stake. Validators provide their stakes as collateral to participate in the consensus process. Validators with larger stakes are chosen to participate more often. Validators receive staking rewards for their participation. A validator's stake can be slashed if the validator misbehaves. Validators never have ownership of a delegator's Luna, even when staking.

## Tendermint consensus

The consensus procedure used by the Terra protocol. First, a validator proposes a new block. Other validators vote on the block in two rounds. If a block receives a two-thirds majority or greater of yes votes in both rounds, it gets added to the blockchain. Validators get rewarded with the block's transaction fees. Proposers get rewarded extra. Each validator is chosen to propose based on their weight. Checkout the [Tendermint official documentation](https://docs.tendermint.com/) for more information.

## Terra core

The official source code for the Terra protocol.

## Terra stablecoins

Crypto assets that track the price of fiat currency enabled by the Terra protocol. Users mint new Terra stablecoins by burning Luna. Stablecoins are named for their fiat counterparts. For example, the base Terra stablecoin tracks the price of the IMF’s SDR, named TerraSDR, or SDT. Other stablecoin denominations include TerraUSD or UST, and TerraKRW or  KRT. All Terra stablecoin denominations exist in the same pool.

## Terra mainnet

The Terra protocol's blockchain network where all transactions take place.

## Terra Station

Terra's native wallet, swap, governance, and staking platform. In Station, you can send, receive, swap, and stake Terra coins. You can also participate in governance and read proposals.

## Terrad

A command line interface for connecting to a Terra node.

## Terravaloper address

A validator's public address beginning with `terravaloper` followed by a string of characters.

## Testnet

A version of the mainnet just for testing. The testnet does not use real coins. You can use the testnet to get familiar with transactions.

## The Terra ecosystem

A quickly expanding network of decentralized applications built on the Terra protocol.

## The Terra protocol

The leading decentralized and open-source public blockchain protocol for algorithmic stablecoins. Using a combination of open market arbitrage incentives and decentralized oracle voting, the Terra protocol creates stablecoins that consistently track the price of any fiat currency.

## Tobin tax

A fee for swapping between Terra currencies (spot-trading). The rate varies, depending on the denomination. For example, while the rate for most denominations is .35%, the rate for MNT is 2%. To see the rates, [query the oracle](../terrad/oracle.html#tobin-taxes).

## Total stake

The total amount of Luna bonded to a delegator, including self-bonded Luna.

## Unbonded validator

A validator that is not in the active set and does not participate in consensus or receive rewards. Some unbonded validators may be jailed.

## Unbonding validator

A validator transitioning from the active set to the inactive set. An unbonding validator does not participate in consensus or earn rewards. The unbonding process takes 21 days.

## Unbonded Luna

Luna that can be freely traded and is not staked to a validator.

## Unbonding

When a delegator decides to undelegate their Luna from a validator. This process takes 21 days. No rewards accrue during this period. This action cannot be stopped once executed.

## Unbonding Luna

Luna that is transitioning from bonded to unbonded. Luna that is unbonding cannot be traded freely. The unbonding process takes 21 days. No rewards accrue during this period. This action cannot be stopped once executed.

## Undelegate

When a delegator no longer wishes to have their Luna bonded to a validator. This process takes 21 days. No rewards accrue during this period. This action cannot be stopped once executed.

## Uptime

The amount of time a validator has been active in a given timeframe. Validators with low up time may be slashed.

## Validator

A Terra blockchain miner responsible for verifying transactions on the blockchain. Validators run programs called full nodes that allow them to participate in consensus, verify blocks, participate in governance, and receive rewards. The top 130 validators with the highest total stake can participate in consensus.

## Weight

The measure of a validator's total stake. Validators with higher weights get selected more often to propose blocks. A validator's weight is also a measure of their voting power in governance.
