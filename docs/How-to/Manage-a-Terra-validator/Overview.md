# Overview

The tasks in this section describe how to set up a Terra validator. While setting up a rudimentary validating node is easy, running a production-quality validator node with a robust architecture and security features requires an extensive setup.

The Terra core is powered by the Tendermint consensus. Validators run full nodes, participate in consensus by broadcasting votes, commit new blocks to the blockchain, and participate in governance of the blockchain. Validators are able to cast votes on behalf of their delegators. A validator's voting power is weighted according to their total stake. The top 130 validators make up the **Active Validator Set** and are the only validators that sign blocks and receive revenue.

Validators and their delegators earn the following fees:

- **Compute fees**: To prevent spamming, validators set minimum gas fees for transactions included in their mempool. Fees are then dispersed proportional to a validator's stake at the end of every block.

- **Stability fees**: To stabilize the value of Luna, the protocol charges a small transaction fee ranging from 0.1% to 1% on every Terra transaction, capped at 1 TerraSDR. Fees are then dispersed proportional to a validator's stake at the end of every block.

- **Swap fees**: A small spread is charged on atomic swap transactions between Luna and any Terra currency, which is then used to reward validators that faithfully report oracle exchange rates.

Validators can set commissions on the fees they receive as additional incentive.

If validators double sign, are frequently offline, or do not participate in governance, their staked Luna (including Luna of users that delegated to them) can be slashed. Penalties can vary depending on the severity of the violation.

::: tip
Consider using the helpful [step-by-step guide](https://medium.com/block42-blockchain-company/how-to-setup-a-terra-luna-validator-node-860d8ea7aea2) for setting up a new validator released by Block42.
:::

## Requirements

This guide starts with the following assumptions:

- The Terra full-node software is [installed](../Run-a-full-Terra-node/Build-Terra-core.md).
- Your Terra node is [connected to an existing network](../Run-a-full-Terra-node/Join-public-network.md).
- Your Terra node is properly [configured](../Run-a-full-Terra-node/Configure-general-settings.md).
- You are familiar with [terrad](../../Reference/terrad/).

Hardware requirements are the same as the [requirements for running a full node](../Run-a-full-Terra-node/Hardware-requirements.md).
