# Modify ANC Parameters

{% hint style="warning" %}
This poll type is yet to be supported by the official Anchor WebApp.
{% endhint %}

The **Modify ANC Parameters** poll enables users to submit governance polls that adjust parameter values that affect the Anchor Token (ANC).

&#x20;`Epoch Period` is the the minimum time delay required between subsidization events, which handle reward claiming of bAsset collaterals, direct deposit rate subsidization, and readjusting the ANC emission rate based on the current deposit rate.

The `ANC Purchase Factor` determines the portion of bAsset rewards and collateral liquidation fees (bid fee) that is used to purchase ANC tokens.

`Staking Reward Factor` defines the portion of purchase ANC tokens that are distributed as staking rewards to stakers of ANC.

| Parameter Name          | Description                                                                                                                |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `Epoch Period`          | Minimum time between operations for bAsset reward collection, deposit rate subsidization, and ANC emission rate adjustment |
| `ANC Purchase Factor`   | Portion of bAsset rewards and collateral liquidation fees (bid fee) used to purchase ANC                                   |
| `Staking Reward Factor` | Portion of purchased ANC distributed as staking rewards to ANC stakers                                                     |

## Parameter Values

### Up-To-Date

| Parameter Name          | Human-Readable Value | Raw Value (In Contract State) |
| ----------------------- | -------------------- | ----------------------------- |
| `Epoch Period`          | 3 hours              | 1681 (blocks)                 |
| `ANC Purchase Factor`   | 10%                  | 0.1                           |
| `Staking Reward Factor` | 100%                 | 1                             |

### At Protocol Genesis

| Parameter Name          | Human-Readable Value | Raw Value (In Contract State) |
| ----------------------- | -------------------- | ----------------------------- |
| `Epoch Period`          | 3 hours              | 1681 (blocks)                 |
| `ANC Purchase Factor`   | 10%                  | 0.1                           |
| `Staking Reward Factor` | 100%                 | 1                             |

## Poll Format

| Field                 | Description                                                                                                                         | Optionality |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Title                 | Poll title                                                                                                                          | Required    |
| Proposal Rationale    | Short description of poll rationale                                                                                                 | Required    |
| Information Link      | External URL for further information                                                                                                | Optional    |
| Epoch Period          | Proposed minimum time between operations for bAsset reward collection, deposit rate subsidization, and ANC emission rate adjustment | Optional    |
| ANC Purchase Factor   | Proposed portion of bAsset rewards and collateral liquidation fees (bid fee) used to purchase ANC                                   | Optional    |
| Staking Reward Factor | Proposed portion of purchased ANC distributed as staking rewards to ANC stakers                                                     | Optional    |
