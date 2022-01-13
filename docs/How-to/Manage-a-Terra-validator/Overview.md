# Overview

The tasks in this section describe how to set up a Terra validator. While setting up a rudimentary validating node is easy, running a production-quality validator node with a robust architecture and security features requires an extensive setup.

## Validators' role

The Terra core is powered by the [ Tendermint consensus ](../../Concepts/Protocol.md#tendermint-consensus) which relies on a special set of participants called [ validators ](../../Concepts/Protocol.md#validators) to continuously update the network. 
A validator's main role is to [ run a full network node](../Run-a-full-Terra-node/System-configuration.md). A full node enables its operator to:
- participate in the consensus by broadcasting votes
- accept token [ delegations ](../../Concepts/Protocol.md#delegators) from other participants of the network and cast votes on their behalf.
- commit new blocks to the blockchain
- participate in governance of the blockchain.

A validator's voting power is weighted according to their total stake. The above is generally true for most blockchain networks that utilize a [ "Proof-of-Stake" ](../../Concepts/glossary.md#proof-of-stake) consensus mechanism as it is for Terra. In Terra, the top 130(by stake) validators make up the **Active Validator Set** and are the only validators that sign blocks and receive revenue. 

## Oracle program

On Terra, validators are obligated to run the [ Oracle ](../../Concepts/glossary.md#oracle) program which monitors the prices and exchange rates of assets off-chain and submits them to the protocol. The submission is done via a vote on a plausible price of a given assets when the validator submits its vote to the network. These price votes are crucial to Terra's maintenance of price stability and are subject to certain [ constraints ](../../Reference/Terra-core/Module-specifications/spec-oracle.md#reward-band). Failure to adhere to these constraints may prevent the validator (and their delegates) from receiving rewards for network participation.  


##  Revenue Structure

Validators and their delegators earn the following fees:

- [Gas](../../Concepts/Fees.md#gas): Fees added on to each transaction to avoid spamming and pay for computing power. Validators set minimum gas prices and reject transactions that have implied gas prices below this threshold.

- [Stability fees](../../Concepts/Fees.md#stability-fee): Fees added on to any Terra stablecoin transaction (excluding [market swaps](../../Concepts/glossary.md#market-swap)) to provide stability in the market, capped at 1SDT. The fee rate is variable and called the tax rate.

- **Swap fees**: The fee for swapping Terra stablecoin denominations is called a [Tobin tax](../../Concepts/Fees.md#tobin-tax). Exchanges between Terra and Luna are subject to a [spread fee](../../Concepts/Fees.md#spread-fee).

For more information on fees, visit the [fee page](../../Concepts/Fees.md).


Validators can set commissions on the fees they receive as an additional incentive.

## Slashing and loss of stake

If validators double sign, are frequently offline, or do not participate in governance, their staked Luna (including Luna of users that delegated to them) can be slashed. Penalties can vary depending on the severity of the violation.

For more general information on validators, visit the [validator section](../../Concepts/Protocol.md#validators) of the concepts page.

## Additional resources

- [The Terra validator Discord](https://discord.com/invite/xfZK6RMFFx).
- [How to Spin Up a Node on Terra - Terra Bites video](https://www.youtube.com/watch?v=2lKAvltKX6w&ab_channel=TerraBites).
- [The validator FAQ](./faq.md)
