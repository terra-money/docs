# Validator Guide

Terra Core is based on Tendermint, which relies on a set of validators that are responsible for committing new blocks in the blockchain. These validators participate in the consensus protocol by broadcasting votes which contain cryptographic signatures signed by each validator's private key.

Validator candidates can bond their own Luna and have Luna "delegated", or staked, to them by token holders. The Columbus Mainnet currently has 130 validators, but over time this will increase to 300 validators according to a predefined schedule. The validators are determined by who has the most stake delegated to them — the top 130 validator candidates with the most stake will become Terra validators.

Validators and their delegators will earn the following fees:

- **Compute fees**: To prevent spamming, validators may set minimum gas fees for transactions to be included in their mempool. At the end of every block, the compute fees are disbursed to the participating validators pro-rata to stake.

- **Stability fees**: To stabilize the value of Luna, the protocol charges a small percentage transaction fee ranging from 0.1% to 1% on every Terra transaction, capped at 1 TerraSDR. This is paid in any Terra currency, and is disbursed pro-rata to stake at the end of every block in TerraSDR.

- **Swap fees**: Validators that participate in the Exchange Rate [`Oracle`](../dev/spec-oracle.md) get a portion of swap spread fees if they faithfully report and win the ballot (vote within the reward band around the weighted median).

Besides revenue, there are scarcity incentives:

- **Seigniorage rewards**: A small spread is charged on atomic swap transactions between Luna and any Terra currency, which is burned and creates scarcity in Luna and indirectly rewards validators.

Note that validators can set commission on the fees their delegators receive as additional incentive.

If validators double sign, are frequently offline or do not participate in governance, their staked Luna \(including Luna of users that delegated to them\) can be slashed. The penalty depends on the severity of the violation.

## Hardware

These are the currently suggested hardware minimums:

- 1.5TB SSD  
- 16 GB RAM  
- 4 Cores  
