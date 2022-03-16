# Modify Borrow Interest

The **Modify Borrow Interest** poll type allows users to create polls that update borrow-interest-related parameters.

The `Base Borrow Rate` is the minimum base interest rate that is applied to borrows. The borrow rate proportionally increases as the utilization ratio increases, with a multiplier of `Interest Multiplier`.

| Parameter Name        | Description                                                            |
| --------------------- | ---------------------------------------------------------------------- |
| `Base Borrow Rate`    | Minimum annualized borrow interest                                     |
| `Interest Multiplier` | Multiplier between market utilization ratio and annual borrow interest |

## Parameter Values

### Up-To-Date

| Parameter Name        | Human-Readable Value    | Raw Value (In Contract State)         |
| --------------------- | ----------------------- | ------------------------------------- |
| `Base Borrow Rate`    | 2% APR                  | 0.000000004076272770 (per-block rate) |
| `Interest Multiplier` | 0.42 (annualized value) | 0.000000085601728176                  |

### At Protocol Genesis

| Parameter Name        | Human-Readable Value    | Raw Value (In Contract State)         |
| --------------------- | ----------------------- | ------------------------------------- |
| `Base Borrow Rate`    | 2% APR                  | 0.000000004076272770 (per-block rate) |
| `Interest Multiplier` | 0.42 (annualized value) | 0.000000085601728176                  |

## Poll Format

| Field               | Description                                                                     | Optionality |
| ------------------- | ------------------------------------------------------------------------------- | ----------- |
| Title               | Poll title                                                                      | Required    |
| Proposal Rationale  | Short description of poll rationale                                             | Required    |
| External Link       | External URL for further information                                            | Optional    |
| Base Borrow Rate    | Proposed minimum annualized borrow interest                                     | Optional    |
| Interest Multiplier | Proposed multiplier between market utilization ratio and annual borrow interest | Optional    |
