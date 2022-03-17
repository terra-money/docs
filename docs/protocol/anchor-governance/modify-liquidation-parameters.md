# Modify Liquidation Parameters

:::{warning}
This poll type is yet to be supported by the official Anchor WebApp.
:::

The **Modify Liquidation Parameters** poll type allows Anchor governance to calibrate parameter values that control the mechanics of collateral liquidation. 5 parameters `Safe Ratio`, `Bid Fee`, `Max Premium Rate`, `Partial Liquidation Threshold`, and `Valid Price Timeframe` constitute the control mechanism of liquidating collaterals.

The `Safe Ratio` is the target risk ratio of a liquidated loan position, defined as the ratio of (Borrow Amount) to (Borrow Limit). A low `Safe Ratio` value allows for the fast liquidation of collaterals while incurring a high price impact for the collateral, while a low `Safe Ratio` value enforces liquidations with lower collateral price impact, albeit with slower collateral liquidation.

The `Bid Fee` parameter determines the commission rate on executed bids, which is used to purchase ANC tokens.

The `Max Premium Rate` is the maximum rate of premium that bidders can submit.&#x20;

`Partial Liquidation Threshold` is defined as the threshold total collateral value to trigger partial collateral liquidations. Loan positions with a total collateral value below this threshold have their collaterals fully liquidated at once, resetting their risk ratio to 0.

`Valid Price Timeframe` determines the freshness limit for oracle price data. Oracle price data is considered invalid (halts all collateral liquidations) when the most recent price data is older than `Valid Price Timeframe`.

| Parameter Name                  | Description                                                                     |
| ------------------------------- | ------------------------------------------------------------------------------- |
| `Safe Ratio`                    | Targeted risk ratio of a liquidated loan                                        |
| `Bid Fee`                       | Protocol commission on executed bids used to purchase ANC                       |
| `Max Premium Rate`              | Maximum bid premium rate value submittable by bidders                           |
| `Partial Liquidation Threshold` | Threshold total collateral value to trigger partial collateral liquidations     |
| `Valid Price Timeframe`         | Time window before the Liquidation Contract considers oracle price data invalid |

## Parameter Values

### Up-To-Date

| Parameter Name                  | Human-Readable Value | Raw Value (In Contract State) |
| ------------------------------- | -------------------- | ----------------------------- |
| `Safe Ratio`                    | 80%                  | 0.8                           |
| `Bid Fee`                       | 1%                   | 0.01                          |
| `Max Premium Rate`              | 15%                  | 0.15                          |
| `Partial Liquidation Threshold` | 2,000 UST            | 2000000000 (uusd)             |
| `Valid Price Timeframe`         | 60 seconds           | 60                            |

### At Protocol Genesis

| Parameter Name                  | Human-Readable Value | Raw Value (In Contract State) |
| ------------------------------- | -------------------- | ----------------------------- |
| `Safe Ratio`                    | 80%                  | 0.8                           |
| `Bid Fee`                       | 1%                   | 0.01                          |
| `Max Premium Rate`              | 30%                  | 0.3                           |
| `Partial Liquidation Threshold` | 500 UST              | 500000000 (uusd)              |
| `Valid Price Timeframe`         | 60 seconds           | 60                            |

## Poll Format

| Field                         | Description                                                                              | Optionality |
| ----------------------------- | ---------------------------------------------------------------------------------------- | ----------- |
| Title                         | Poll title                                                                               | Required    |
| Proposal Rationale            | Short description of poll rationale                                                      | Required    |
| Information Link              | External URL for further information                                                     | Optional    |
| Safe Ratio                    | Proposed risk ratio target for a liquidated loan                                         | Optional    |
| Bid Fee                       | Proposed protocol commission on executed bids used to purchase ANC                       | Optional    |
| Max Premium Rate              | Proposed maximum bid premium rate value submittable by bidders                           | Optional    |
| Partial Liquidation Threshold | Proposed threshold total collateral value to trigger partial collateral liquidations     | Optional    |
| Valid Price Timeframe         | Proposed time window before the Liquidation Contract considers oracle price data invalid | Optional    |
