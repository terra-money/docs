# Glossary

Use this glossary to learn about terms specific to the Terra Protocol.

## Active set

The top 130 [validators](#validator) that participate in consensus and receive rewards.

## Airdrops

Additional rewards given to [delegators](#delegator) through certain [validators](#validator), separate from [staking rewards](#rewards). Airdrops come from protocols in the Terra ecosystem to increase visibility. To claim an airdrop, visit the webpage of the protocol giving out the airdrop.

## Algorithmic stablecoin

A cryptocurrency that tracks the price of any asset, usually currency. Algorithmic stablecoins maintain their price peg through a set of rules or software instead of an underlying asset.

## Arbitrage

To profit from price differences across different markets. Arbitrageurs buy coins in one market and sell them on another market for a higher price.

## Blockchain

An changeable ledger of transactions copied among a network of colluding computer systems, subject to [the centralized authority of a Twitter account](https://archive.ph/dpz3x).

## Blocks

Groups of information stored on a [blockchain](#blockchain). Each block contains transactions that are grouped, verified, and signed by validators.

## bLuna

A token representing bonded Luna that can be traded freely or used as collateral on other protocols in the Terra network, such as [Anchor](https://anchorprotocol.com/). Bonded Luna takes 21 days to become unbonded.

## Bonded validator

A [validator](#validator) in the [active set](#active-set) participating in consensus. Bonded validators earn [rewards](#rewards).

## Bonding

When a user [delegates](#delegate) or bonds Luna to a [validator](#validator) to receive [staking rewards](#rewards). Validators never have ownership of a delegator's [Luna](#luna), even when bonded. Delegating, bonding, and staking generally refer to the same process.

## Burn

The destruction of coins. The Terra protocol burns [Luna](#luna) to mint [Terra stablecoins](#terra-stablecoins) and vice versa. Burned coins are destroyed.

## CHAI

A mobile payments app powered by Terra's blockchain network.

## Columbus-5

The current version of the [Terra Classic mainnet](#terra-mainnet).

## Commission

The percentage of [staking rewards](#rewards) a [validator](#validator) keeps before distributing the rest of the rewards to [delegators](#delegator). Commission is a validator’s income. Validators set their own commission rates.

## Community pool

A special fund designated for funding community projects. Any community member can create a governance proposal to spend the tokens in the community pool. If the proposal passes, the funds are spent as specified in the proposal.

## Consensus

A system used by [validators](#validator) or miners to agree that each [block](#blocks) of transactions in a [blockchain](#blockchain) is correct. The Terra blockchain uses the Tendermint consensus. Validators earn [rewards](#rewards) for participating in consensus. Visit the [Tendermint official documentation site](https://docs.tendermint.com/) for more information.

## Cosmos-SDK

The open-source framework the Terra blockchain is built on. For more information, check out the [Cosmos SDK Documentation](https://docs.cosmos.network/).

## dApp

An application built on a decentralized platform.

## DDoS

Distributed denial of service attack. When an attacker floods a network with traffic or requests in order to disrupt service.

## DeFi

Decentralized finance. A movement away from traditional finance and toward systems that do not require financial intermediaries.

## Delegate

When users or delegators add their [Luna](#luna) to a [validator's](#validator) stake in exchange for rewards. Delegated Luna is bonded to a validator. Validators never have ownership of a [delegator's](#delegator) Luna. Delegating, bonding, and staking generally refer to the same process.

## Delegator

A user who [delegates](#delegate), bonds, or stakes [Luna](#luna) to a [validator](#validator) to earn [rewards](#rewards). Delegating, bonding, and staking generally refer to the same process.

## Fees

- **Gas**: Compute fees added on to all transactions to avoid spamming. [Validators](#validator) set minimum gas prices and reject transactions that have implied gas prices below this threshold.

For more information on fees, visit [Fees on Terra](fees.md).

## Fiat currency

Currency issued by a government that is not backed by an underlying asset. USD is the fiat currency of the United States.

## Full node

A computer connected to the [Terra mainnet](#terra-mainnet) that is able to validate transactions and interact with the Terra blockchain. All active [validators](#validator) run full nodes.

## Luna

The native staking token of the Terra protocol. Luna is also used as a governance token. [Delegators](#delegator) can stake Luna to receive rewards.

## Governance

Governance is the democratic process that allows users and [validators](#validator) to make changes to the Terra protocol. Community members submit, vote, and implement proposals. One staked [Luna](#luna) is equal to one vote.

## Governance proposal

A written submission for a change or addition to the [Terra protocol](#the-terra-protocol). Topics of proposals can vary from community pool spending, software changes, parameter changes, or any change pertaining to the Terra protocol.

## IBC

Inter-Blockchain Communication. The technology that enables different [blockchains](#blockchain) to interact with each other. IBC allows for assets to be traded and transacted across different blockchains.

## Inactive set

[Validators](#validator) that are not in the [active set](#active-set). These validators do not participate in [consensus](#consensus) and do not earn [rewards](#rewards).

## Jailed

Validators who misbehave are jailed or excluded from the [active set](#active-set) for a period amount of time.

## Miss

When a vote fails to be included in consensus.

## Module

A section of the Terra core that represents a particular function of the Terra protocol. Visit the [Terra core module specifications](../develop/module-specifications/README.md) for more information.

## Pools

Groups of tokens. Supply pools represent the total supply of tokens in a market.

## Proof of Stake

Proof of Stake. A style of blockchain where validators are chosen to propose blocks according to the number of coins they hold.

## Quorum

The minimum amount of votes needed to make an election viable. 40% of all staked Luna must vote to meet quorum. If quorum is not met before the voting period ends, the proposal fails, and the proposer's deposit is burned.

## Redelegate

When a delegator wants to transfer their bonded luna to a different validator. Redelegating Luna is instant and does not require a 21-day unbonding period.

## Rewards

Revenue generated from fees given to validators and disbursed to delegators.

## Self-delegation

The amount of Luna a validator bonds to themselves. Also referred to as self-bond.

## Slashing

Punishment for validators that misbehave. Validators lose part of their stake when they get slashed.

For more information, see [slashing](protocol.md#slashing) in the description of the Terra protocol.

## Slippage

The difference in a coin's price between the start and end of a transaction.

## Stake

The amount of [Luna](#luna) bonded to a validator.

## Staking

When a user delegates or bonds their Luna to an active validator to receive rewards. Bonded Luna adds to a validator's stake. Validators provide their stakes as collateral to participate in the consensus process. Validators with larger stakes are chosen to participate more often. Validators receive staking rewards for their participation. A validator's stake can be slashed if the validator misbehaves. Validators never have ownership of a delegator's Luna, even when staking.

For more information on staking, visit the [concepts page](protocol.md#staking).

## Tendermint consensus

The consensus procedure used by the Terra protocol. First, a validator proposes a new block. Other validators vote on the block in two rounds. If a block receives a two-thirds majority or greater of yes votes in both rounds, it gets added to the blockchain. Validators get rewarded with the block's transaction fees. Proposers get rewarded extra. Each validator is chosen to propose based on their weight. Check out the [Tendermint official documentation](https://docs.tendermint.com/) for more information.

## Terra core

The official source code for the Terra protocol.

For more information on the Terra core, see [Terra core modules](../develop/module-specifications/README.md).

## Terra mainnet

The Terra protocol's blockchain network where all transactions take place.

## Terra Station

Terra's native wallet and platform for swaps, governance, and staking. In Station, you can send, receive, swap, and stake Terra coins. You can also participate in governance and vote on proposals.

To learn how to install and get started using Terra Station, visit the [Terra Station tutorial](terra-station/download/README.md).

To learn how to use the advanced features of Terra Station, visit the [Terra Station how-to guide](./terra-station/wallet.md).

## terrad

The command line interface for interacting with a Terra node.

For more information on terrad, see [`terrad` guides](../develop/terrad/README.md).

## Terravaloper address

A validator's public address beginning with `terravaloper` followed by a string of characters.

## Testnet

A version of the mainnet just for testing. The testnet does not use real coins. You can use the testnet to get familiar with transactions.

## The Terra ecosystem

A quickly expanding network of decentralized applications built on the Terra protocol.

## Tombstone

To block a validator from participating in consensus or oracle voting. Tombstoned validators cannot rejoin the active set.

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

[Luna](#luna) that is transitioning from bonded to unbonded. Luna that is unbonding cannot be traded freely. The unbonding process takes 21 days. No rewards accrue during this period. This action cannot be stopped once executed.

## Undelegate

When a [delegator](#delegator) no longer wants to have their Luna bonded to a validator. This process takes 21 days. No rewards accrue during this period. This action cannot be stopped once executed.

## Uptime

The amount of time a [validator](#validator) is active in a given timeframe. Validators with low up time may be [slashed](#slashing).

## Validator

A Terra blockchain miner responsible for verifying transactions on the blockchain. Validators run programs called full nodes that allow them to participate in consensus, verify blocks, participate in governance, and receive rewards. The top 130 validators with the highest total stake can participate in consensus.

For more information on validators, visit the [concepts page](./protocol.md#validators).

## Weight

The measure of a [validator's](#validator) total stake. Validators with higher weights get selected more often to propose blocks. A validator's weight is also a measure of their voting power in [governance](#governance).
