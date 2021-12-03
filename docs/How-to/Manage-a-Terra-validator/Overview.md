# Overview

The tasks in this section describe how to set up a Terra validator. While setting up a rudimentary validating node is easy, running a production-quality validator node with a robust architecture and security features requires an extensive setup.

The Terra core is powered by the Tendermint consensus. Validators run full nodes, participate in consensus by broadcasting votes, commit new blocks to the blockchain, and participate in governance of the blockchain. Validators can cast votes on behalf of their delegators. A validator's voting power is weighted according to their total stake. The top 130 validators make up the **Active Validator Set** and are the only validators that sign blocks and receive revenue.

Validators and their delegators earn the following fees:

- [Gas](/Concepts/fees.md#gas): fees added on to each transaction to avoid spamming and pay for computing power. Validators set minimum gas prices and reject transactions that have implied gas prices below this threshold.

- [Stability fees](/Concepts/fees.md#stability-fee): Fees added on to any Terra stablecoin transaction (excluding [market swaps](/Concepts/Glossary.md#market-swap)) to provide stability in the market, capped at 1SDT. The fee rate is variable and called the tax rate.

- **Swap fees**: The fee for swapping Terra stablecoin denominations is called a [Tobin tax](/Concepts/fees.md#tobin-tax). Exchanges between Terra and Luna are subject to a [spread fee](/Concepts/fees.md#spread-fee).

For more information on fees, visit the [fee page](/Concepts/fees.md).

Validators can set commissions on the fees they receive as an additional incentive.

If validators double sign, are frequently offline, or do not participate in governance, their staked Luna (including Luna of users that delegated to them) can be slashed. Penalties can vary depending on the severity of the violation.

For more general information on validators, visit the [validator section](/Concepts/Protocol.md#validators) of the concepts page.

## Additional resources

- [The Terra validator Discord](https://discord.com/invite/xfZK6RMFFx).
- [How to Spin Up a Node on Terra - Terra Bites video](https://www.youtube.com/watch?v=2lKAvltKX6w&ab_channel=TerraBites).
- [The validator FAQ](./faq.md)
