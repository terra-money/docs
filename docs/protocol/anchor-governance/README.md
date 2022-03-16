# Anchor Governance

{% hint style="info" %}
It is recommended to first start a community discussion at the [Anchor Protocol Forum](https://forum.anchorprotocol.com) before submitting a poll.
{% endhint %}

Development and maturization of Anchor Protocol is driven by the Anchor community through democratic governance. Anchor does not contain any admin keys with privileged access. Anchor governance is configured to be the sole authority allowed to apply protocol changes or upgrades.

Following the initial deployment of Anchor smart contracts, the Anchor [Gov contract](../../smart-contracts/anchor-token/gov.md) is set as the owner of all [Anchor Protocol contracts](../../smart-contracts/deployed-contracts.md). Further modifications and improvements to Anchor contracts can only always be made through the [governance poll creation process](./#poll-lifecycle).

## Anchor Governance Token (ANC)

{% hint style="info" %}
Although a user receives 1 vote per staked ANC for every poll, voting in polls does not have any effect on the user's current staking balance.
{% endhint %}

Governance over Anchor is managed by stakers of [Anchor Tokens (ANC)](../anchor-token-anc.md). ANC acts as Anchor Protocol's governance token, used to vote on polls. Voting power is given proportional to the vote's amount of staked ANC. Voters are able to allocate a specific amount of voting power in staked ANC, capped by their total amount of ANC staked. Voters with a higher ANC stake are therefore given a greater degree of influence in deciding whether to apply the changes listed in a governance poll.

## Polls

New governance proposals in Anchor are called **polls.** Any user can create a poll by paying an initial deposit of ANC tokens. If the poll fails to pass the minimum voting quorum, the ANC deposit is given to ANC stakers and distributed proportionately according to their relative stake.

Polls consist of a text description of the proposition (with an optional URL to further resources / discussions), and includes a list of executable messages that encode the instructions to be run if it passes. The message will be executed with the privileges of the [Anchor Gov Contract](../../smart-contracts/anchor-token/gov.md), which has the power to invoke any function defined by the other Anchor smart contracts.

Once submitted, a poll can be voted on by the community until its voting period has concluded. If the poll passes quorum and threshold conditions (defined below), it is ratified and its contents can automatically be applied after a set period of time. These changes take effect without requiring updates to the core Anchor Protocol contracts.

{% hint style="danger" %}
Staked ANC tokens utilized in on-going polls **cannot be withdrawn** until the poll completes. In addition, the number of ANC used in a poll vote **cannot be modified** after the vote has been submitted.
{% endhint %}

## Poll Lifecycle

Governance polls in Anchor follow the below procedure:

1. A new poll is created with an initial ANC deposit of `Proposal Deposit`
2. The poll enters the voting phase, where it can voted for by anybody with a staked ANC position. Users can vote `yes` or `no`, and can assign how many of their staked ANC to use for voting.
3. The total amount of staked ANC can be snapshotted to the poll within a time window of `Snapshot Period` before the poll's end. This value is used to calculate the poll's quorum.
4. The voting period ends after `Voting Period` has passed.
5. The poll's votes a tallied. The poll passes if both quorum (minimum participation of all staked ANC, value snapshotted at step 3. used in calculation) and threshold (minimum ratio of `yes` to `no` votes) are met.
6. If the poll passes, its contents can be executed after `Timelock Period` blocks have passed. The poll must be executed prior to the `Expiration Period`, otherwise it will automatically expire and no longer be considered valid.

## Poll Types

| Poll Type                                                         | Description                                                                                         |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [Modify Collateral Attributes](modify-collateral-parameters.md)   | Propose for changes in the Max LTV of a whitelisted collateral                                      |
| [Modify Market Parameters](modify-market-parameters.md)           | Propose for parameter changes in Anchor money market                                                |
| [Modify Liquidation Parameters](modify-liquidation-parameters.md) | Propose for parameter changes in Anchor's [Liquidation Contract](../loan-liquidation.md)            |
| [Modify ANC Parameters](modify-anc-parameters.md)                 | Propose for parameter changes in the [Anchor Token](../anchor-token-anc.md)                         |
| [Modify Governance Parameters](modify-governance-parameters.md)   | Propose for parameter changes in [Anchor Governance](./)                                            |
| [Modify Borrow Interest](modify-the-interest-model.md)            | Propose for changes in the stablecoin [borrow interest formula](../money-market/#borrow-rate-model) |
| [Modify ANC Distribution](modify-the-distribution-model.md)       | Propose for changes related to Anchor token distribution                                            |
| [Community Grants](spend-community-pool.md)                       | Propose for Anchor community funded development work                                                |
| [Text Proposal](text-proposal.md)                                 | Submit a text proposal                                                                              |

```{toctree}
:hidden:
modify-collateral-parameters
modify-market-parameters
modify-liquidation-parameters
modify-governance-parameters
modify-the-interest-model
modify-the-distribution-model
spend-community-pool
text-proposal
```