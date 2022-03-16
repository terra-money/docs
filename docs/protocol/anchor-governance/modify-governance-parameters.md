# Modify Governance Parameters

{% hint style="warning" %}
This poll type is yet to be supported by the official Anchor WebApp.
{% endhint %}

The **Modify Governance Parameters** poll types allows for the creation of polls that alter Anchor governance-related parameters.

In order for a poll to pass, the poll must reach the `Quorum` and `Vote Threshold`. `Quorum` is the required minimum voter turnout for this poll, where more than `Quorum` portion of all staked ANC should have voted for this poll, whether the vote is `yes` or `no`. `Vote Threshold` is the required minimum percentage of `yes` votes required for the poll to pass.

Votes can be cast to a poll only during the `Voting Period` since poll creation. To prevent fluctuations in the total amount of staked ANC from affecting a poll's `Quorum` calculation, users can snapshot the the current amount of staked ANC for the poll. The snapshot can occur within a `Snapshot Period` time (number of blocks) window before the poll's end, where votes made within this period automatically trigger the snapshot. Quorum calculation for the poll is done using the snapshotted staked ANC amount and not the amount of staked ANC at the end of the poll.

Proposals that have passed and is past the `Expiration Period` after its end can be set to an expired state, allowing the WebApp to improve the visibility of ongoing polls by filtering out proposals that have already passed.

Passed proposals that include a governance message (used to updated protocol parameters) require a `Timelock Period` of time before the included message can be executed. This is to give Anchor users enough to prepare for the changes introduced by the poll.

All poll submissions require a minimum ANC deposit of `Proposal Deposit`, used to prevent excessive poll creation. This deposit is returned to the poll submitter if the poll passes.

| Parameter Name      | Description                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------- |
| `Quorum`            | Minimum voter turnout required for a poll to pass                                            |
| `Vote Threshold`    | Minimum percentage of yes votes required for a poll to pass                                  |
| `Voting Period`     | Poll voting period                                                                           |
| `Snapshot Period`   | Window of time (number of blocks) allowed for staked ANC amount snapshotting before poll end |
| `Expiration Period` | Time delay (number of blocks) after which an passed poll can be expired                      |
| `Timelock Period`   | Number of blocks required after a poll pass before executing changes                         |
| `Proposal Deposit`  | Minimum ANC deposit required for submitting a new poll                                       |

## Parameter Values

### Up-To-Date

| Parameter Name      | Human-Readable Value | Raw Value (In Contract State) |
| ------------------- | -------------------- | ----------------------------- |
| `Quorum`            | 10%                  | 0.1                           |
| `Vote Threshold`    | 50%                  | 0.5                           |
| `Voting Period`     | 7 days               | 94097 (blocks)                |
| `Snapshot Period`   | 1 day                | 13443 (blocks)                |
| `Expiration Period` | 1 day                | 13443 (blocks)                |
| `Timelock Period`   | 3 days               | 40327 (blocks)                |
| `Proposal Deposit`  | 1,000 ANC            | 1000000000 (uANC)             |

### At Protocol Genesis

| Parameter Name      | Human-Readable Value | Raw Value (In Contract State) |
| ------------------- | -------------------- | ----------------------------- |
| `Quorum`            | 10%                  | 0.1                           |
| `Vote Threshold`    | 50%                  | 0.5                           |
| `Voting Period`     | 7 days               | 94097 (blocks)                |
| `Snapshot Period`   | 1 day                | 13443 (blocks)                |
| `Expiration Period` | 1 day                | 13443 (blocks)                |
| `Timelock Period`   | 3 days               | 40327 (blocks)                |
| `Proposal Deposit`  | 1,000 ANC            | 1000000000 (uANC)             |

## Poll Format

| Field               | Description                                                                                | Optionality |
| ------------------- | ------------------------------------------------------------------------------------------ | ----------- |
| Title               | Poll title                                                                                 | Required    |
| Proposale Rationale | Short description of poll rationale                                                        | Required    |
| External Link       | External URL for further information                                                       | Optional    |
| Quorum              | Proposed minimum voter turnout required for a poll to pass                                 | Optional    |
| Vote Threshold      | Proposed minimum percentage of yes votes required for a poll to pass                       | Optional    |
| Voting Period       | Proposed voting period for polls                                                           | Optional    |
| Snapshot Period     | Proposed time window before poll end in which  the staked ANC amount can be snapshotted    | Optional    |
| Expiration Period   | Proposed time delay (number of blocks) after which an passed poll can be expired           | Optional    |
| Timelock Period     | Proposed time delay (number of blocks) required after a poll pass before executing changes | Optional    |
| Proposal Deposit    | Proposed minimum ANC deposit required for submitting a new poll                            | Optional    |
