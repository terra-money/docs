# ExchangeRateFeeder

The ExchangeRateFeeder contract is responsible for calculating and determining the exchange rate between an Ethereum stablecoin and their aTerra counterpart.&#x20;

## Events

### `RateUpdated`

Emitted when exchange rate is updated.

```
event RateUpdated(
    address indexed _operator,
    address indexed _token,
    uint256 _before,
    uint256 _after,
    uint256 _updateCount
);
```

| Key            | Type    | Description                                                    |
| -------------- | ------- | -------------------------------------------------------------- |
| `_operator`    | address | Address that updated the exchange rate                         |
| `_token`       | address | Address of token that had its exchange rate updated            |
| `_before`      | uint256 | Exchange rate value pre-update                                 |
| `_after`       | uint256 | Exchange rate value post-update                                |
| `_updateCount` | uint256 | Number of times that interest was compounded during the update |

## State

### `Status`

Represents the exchange rate updatability for a stablecoin.

```
enum Status {NEUTRAL, RUNNING, STOPPED}
```

| Key       | Description                                                   |
| --------- | ------------------------------------------------------------- |
| `NEUTRAL` | Set when a stablecoin was first added                         |
| `RUNNING` | Exchange rate of stablecoin available for updates             |
| `STOPPED` | Set when exchange rate updates for this stablecoin is stopped |

### `Token`

Represents information for an aTerra token.

```
struct Token {
    Status status;
    uint256 exchangeRate;
    uint256 period;
    uint256 weight;
    uint256 lastUpdatedAt;
}
```

| Key            | Type    | Description                                                |
| -------------- | ------- | ---------------------------------------------------------- |
| `status`       | Status  | Exchange rate updatability status                          |
| `exchangeRate` | uint256 | Exchange rate when the exchange rate was last updated.     |
| `period`       | uint256 | Minimum time period required between exchange rate updates |
| `weight`       | uint256 | Interest rate per `period` of time                         |
| `lastUpdated`  | uint256 | Block timestamp when exchange rate was last updated        |

## Functions

### `exchangeRateOf`

Gets the exchange rate for the specified aTerra token. Returns a simulated value (reflects yield accrued since last exchange rate update) if `_simulate` is set as `true`. Returns the last updated exchange rate value is `_simulate` is set as `false`.

```
function exchangeRateOf(
    address _token, 
    bool _simulate
) external view returns (uint256);
```

| Key         | Type    | Description                                             |
| ----------- | ------- | ------------------------------------------------------- |
| `_token`    | address | Address of aTerra token to retrieve exchange rate       |
| `_simulate` | bool    | Indicator on whether to return a interest-accrued value |

### `update`

Updates the exchange rate for specified aTerra token.

```
function update(address _token) external;
```

| Key      | Type    | Description                                     |
| -------- | ------- | ----------------------------------------------- |
| `_token` | address | Address of aTerra token to update exchange rate |
