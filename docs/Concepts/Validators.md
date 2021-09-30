# Validators

Validators are network participants that, in addition to running a full node, listen to transactions broadcasted in the network's mempool and include them in blocks that they sign. For more details on validators, check the [validator FAQ](../validator/faq.md).

In order to do so and reliably to meet the scalability, security, and finality requirements of the Terra network, they typically run specially configured architectures that are robust against many forms of attacks on distributed networks.

Validators play a central role in the Terra blockchain's consensus, which is based on Tendermint BFT. For more detailed information on Tendermint, please check their official [documentation](https://docs.tendermint.com/).

## Delegations

In Terra's consensus model, Luna holders do not stake their tokens directly, but **delegate** their Luna to a validator. This allows normal Luna holders who don't want to set up a validator node to participate in staking rewards.

A validator's **voting power** is proportional to the amount of Luna they have bonded, from all delegations (including their self-delegation). Only the **top 130** validators in voting power (and bonded Luna, by corollary) comprise the validating set, referred to hereon as **delegates**. Delegators play a vital role in this ecosystem because they determine which validators receive this designation, voting by delegating their Luna.

### Slashing risks

Running a validator is a big responsibility, which is why only the top 130 in bonded Luna stake are elected to sign blocks. As such, safety and liveness guarantees must be met, at the risk of having their validator's stake slashed (penalized), hurting both the validator's funds (as well as their delegator's), and their reputation.

The major slashing conditions are:

- **Double Signing:** A validator signs two different blocks with the same chain ID at the same height
- **Downtime:** A validator is non-responsive / couldn't be reached for more than an amount of time
- **Missed Oracle Votes:** A validator fails to report a threshold amount of votes that lie within the weighted median in the exchange rate oracle

Other validators are always on the lookout for misbehaving validator nodes, and can submit **evidence** of a punishable infraction. Once discovered, the misbehaving validator node will have a small portion of their funds slashed and **jailed** (excluded from the validator set for an amount of time) in order to protect delegator funds and fix the offending issues.

For delegators, staking Luna can be a rewarding activity. However, as explained above, it should not be treated as a passive activity -- they should apply due diligence and have confidence in the validator's architecture to not get slashed.
