# Validator Guide

The Terra Core is powered by the Tendermint consensus. Validators run full nodes, participate in consensus by broadcasting votes, commit new blocks to the blockchain, and participate in governance of the blockchain. Validators are able to cast votes on behalf of their delegators. A validator's voting power is weighted according to their total stake. The top 130 validators make up the **Active Validator Set** and are the only validators that sign blocks and receive revenue.

Validators and their delegators earn the following fees:

- **Compute fees**: To prevent spamming, validators set minimum gas fees for transactions included in their mempool. Fees are then dispersed proportional to a validator's stake at the end of every block.

- **Stability fees**: To stabilize the value of Luna, the protocol charges a small transaction fee ranging from 0.1% to 1% on every Terra transaction, capped at 1 TerraSDR. Fees are then dispersed proportional to a validator's stake at the end of every block.

- **Swap fees**: A small spread is charged on atomic swap transactions between Luna and any Terra currency, which is then used to reward validators that faithfully report oracle exchange rates.

Validators can set commissions on the fees they receive as additional incentive.

If validators double sign, are frequently offline, or do not participate in governance, their staked Luna (including Luna of users that delegated to them) can be slashed. Penalties can vary depending on the severity of the violation.

## Hardware

We recommend the following for running Terra Core:

- 4 core Compute Optimized CPU
- 16GB RAM (32GB to export genesis)
- 1TB storage (SSD or better)
- At least 100mbps network bandwidth
