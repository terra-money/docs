# Validators

Validators are network participants that, in addition to running a full node, listen to transactions broadcasted in the network's mempool and include them in blocks that they sign. For more details on validators, check the [validator FAQ](..validator/faq).

In order to do so and reliably to meet the scalability, security, and finality requirements of the Terra network, they typically run specially configured architectures that are robust against many forms of attacks on distributed networks.

Validators play a central role in the Terra blockchain's consensus, which is based on Tendermint BFT. For more detailed information on Tendermint, please check their official [documentation](https://docs.tendermint.com/).

## Delegations

In Terra's consensus model, Luna holders do not stake their tokens directly, but **delegate** their Luna to a validator. This allows normal Luna holders who don't want to set up a validator node can participate in staking rewards.

A validator's **voting power** is proportional to the amount of Luna they have bonded, from all delegations (including their self-delegation). Only the **top 100** validators in voting power (and bonded Luna, by corollary) comprise the validating set, referred to hereon as **delegates**. Delegators play a vital role in this ecosystem because they determine which validators receive this designation, voting by delegating their Luna.