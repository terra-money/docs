# Overview

The tasks in this section describe how to set up a Terra validator. While setting up a rudimentary validating node is easy, running a production-quality validator node with a robust architecture and security features requires an extensive setup.

The Terra core is powered by the Tendermint consensus. Validators run full nodes, participate in consensus by broadcasting votes, commit new blocks to the blockchain, and participate in governance of the blockchain. Validators can cast votes on behalf of their delegators. A validator's voting power is weighted according to their total stake. The top 130 validators make up the **Active Validator Set** and are the only validators that sign blocks and receive revenue.

Validators and their delegators earn the following fees:

- **Compute fees**: To prevent spamming, validators set minimum gas fees for transactions included in their mempool. Fees are then dispersed proportional to a validator's stake at the end of every block.

- **Stability fees**: To stabilize the value of Luna, the protocol charges a small transaction fee on every Terra transaction, capped at 1 TerraSDR. Fees are then dispersed proportional to a validator's stake at the end of every block.

- **Swap fees**: A small spread is charged on atomic swap transactions between Luna and any Terra currency, which is then used to reward validators that faithfully report oracle exchange rates.

Validators can set commissions on the fees they receive as an additional incentive.

If validators double sign, are frequently offline, or do not participate in governance, their staked Luna (including Luna of users that delegated to them) can be slashed. Penalties can vary depending on the severity of the violation.

For more general information on validators, visit the [validator section](/Concepts/Protocol.md#validators) of the concepts page.

## Additional resources

- [The Terra validator Discord](https://discord.com/invite/xfZK6RMFFx).
- [How to Spin Up a Node on Terra - Terra Bites video](https://www.youtube.com/watch?v=2lKAvltKX6w&ab_channel=TerraBites).
- [The validator FAQ](./faq.md)
