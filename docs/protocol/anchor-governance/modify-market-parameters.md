# Modify Market Parameters

The mechanism behind Anchor's money market is controlled by a set of carefully determined parameters, which are `Target Deposit Rate`, `Threshold Deposit Rate`, `Buffer Distribution Factor`, `Max Borrow Factor`, and `Valid Price Timeframe`. The **Modify Market Parameters** poll allows users to submit governance polls that adjust parameters that effectively control the Anchor money market.

Modifying the `Target Deposit Rate`, known as the Anchor Rate adjusts Anchor's target deposit APY, which the protocol attempts to achieve by constantly controlling the ANC emission rate as borrower incentives.

The `Threshold Deposit Rate` value is the minimum deposit APY that Anchor tries to ensure by making direct deposit rate subsidizations from the yield reserve if the current deposit rate is observed to be below this value. Interest buffer usage from direct subsidization events are limited to a `Buffer Distribution Factor` portion of the yield reserve's balance per subsidization event.

In cases of excessive and uncontrollable borrow demand, the `Max Borrow Factor`, which limits the amount of stablecoin liquidity available to be borrowed, can be adjusted to allow aTerra redemptions to occur.

The money market is configured to be somewhat resilient to price oracle downtimes, where price values are considered invalid if they are older than `Valid Price Timeframe`.

| Parameter Name               | Description                                                                                       |
| ---------------------------- | ------------------------------------------------------------------------------------------------- |
| `Target Deposit Rate`        | The Anchor Rate. Target stablecoin deposit APY of Anchor Protocol                                 |
| `Threshold Deposit Rate`     | Threshold deposit APY to trigger yield reserve's interest buffer distribution                     |
| `Buffer Distribution Factor` | Maximum portion of the yield reserve that can be distributed per deposit rate subsidization event |
| `Max Borrow Factor`          | Maximum portion of money market's stablecoin liquidity available for borrows                      |
| `Valid Price Timeframe`      | Time window before the money market considers oracle price data invalid                           |

## Parameter Values

### Up-To-Date

| Parameter Name               | Human-Readable Value | Raw Value (In Contract State)         |
| ---------------------------- | -------------------- | ------------------------------------- |
| `Target Deposit Rate`        | 20.5% APY            | 0.000000044021551233 (per-block rate) |
| `Threshold Deposit Rate`     | 19.5% APY            | 0.000000041874158490 (per-block rate) |
| `Buffer Distribution Factor` | 10%                  | 0.1                                   |
| `Max Borrow Factor`          | 95%                  | 0.95                                  |
| `Valid Price Timeframe`      | 60 seconds           | 60                                    |

### At Protocol Genesis

| Parameter Name               | Human-Readable Value | Raw Value (In Contract State)         |
| ---------------------------- | -------------------- | ------------------------------------- |
| `Target Deposit Rate`        | 20% APY              | 0.000000030572045778 (per-block rate) |
| `Threshold Deposit Rate`     | 18% APY              | 0.000000040762727704 (per-block rate) |
| `Buffer Distribution Factor` | 10%                  | 0.1                                   |
| `Max Borrow Factor`          | 95%                  | 0.95                                  |
| `Valid Price Timeframe`      | 60 seconds           | 60                                    |

## Poll Format

| Field                      | Description                                                                                | Optionality |
| -------------------------- | ------------------------------------------------------------------------------------------ | ----------- |
| Title                      | Poll title                                                                                 | Required    |
| Proposal Rationale         | Short description of poll rationale                                                        | Required    |
| Information Link           | External URL for further information                                                       | Optional    |
| Target Deposit Rate        | Proposed target deposit APY of Anchor Protocol                                             | Optional    |
| Threshold Deposit Rate     | Proposed threshold deposit APY of Anchor Protocol                                          | Optional    |
| Buffer Distribution Factor | Proposed maximum portion of the yield reserve distributable per direct subsidization event | Optional    |
| Max Borrow Factor          | Proposed maximum portion of money market's stablecoin liquidity available for borrows      | Optional    |
| Valid Price Timeframe      | Proposed time window before the money market considers oracle price data invalid           | Optional    |
