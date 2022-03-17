# Router

The Router contract routes deposit/redeem requests by assigning operation contracts.

::: {warning}
Note that the Router contract only supports wrapped UST and wrapped aUST for deposits and redemptions. For operations that involve non-UST stablecoins, interactions should be made via the ConversionPool contracts.
:::

## Functions

### `init`

Initiates a deposit/redeem operation.

```
function init(
    IOperation.Type _type, 
    address _operator, 
    uint256 _amount, 
    address _swapper, 
    address _swapDest, 
    bool _autoFinish
) external; 

interface IOperation {
    enum Type {NEUTRAL, DEPOSIT, REDEEM}
}
```

| Name          | Type            | Description                                                                      |
| ------------- | --------------- | -------------------------------------------------------------------------------- |
| `_type`       | IOperation.Type | Operation type. Can be either of deposit or redeem (withdraw)                    |
| `_operator`   | address         | Address of operation requester                                                   |
| `_amount`     | uint256         | Amount of wrapped UST/aUST used in operation                                     |
| `_swapper`    | address         | Swapper contract that defines logic for swapping tokens                          |
| `_swapDest`   | address         | Address of token to receive post-operation                                       |
| `_autoFinish` | bool            | Indicator to signal whether to have the corresponding finish operation automated |

### `finish`

Finishes a deposit/redeem operation.

```
function finish(address _operation) external; 
```

| Name         | Type    | Description                                  |
| ------------ | ------- | -------------------------------------------- |
| `_operation` | address | Address of Operation contract to call finish |

### `depositStable`

Deposits the specified amount of wrapped UST.

```
function depositStable(uint256 _amount) external; 
```

| Name      | Type    | Description                      |
| --------- | ------- | -------------------------------- |
| `_amount` | uint256 | Amount of wrapped UST to deposit |

### `depositStable`

Deposits the specified amount of wrapped UST. Returns resulting wrapped aUST to the specified address.

```
function depositStable(address _operator, uint256 _amount) external; 
```

| Name        | Type    | Description                               |
| ----------- | ------- | ----------------------------------------- |
| `_operator` | address | Address to receive resulting wrapped aUST |
| `_amount`   | uint256 | Amount of wrapped UST to deposit          |

### `depositStable`

Deposits the specified amount of wrapped UST. Swaps resulting wrapped aUST to the specified token (`_swapDest`) using logic defined in the specified swapper contract (`_swapper`), and returns tokens to the specified address (`_operator`).

```
function depositStable(
    address _operator,
    uint256 _amount,
    address _swapper,
    address _swapDest
) external;
```

| Name        | Type    | Description                                             |
| ----------- | ------- | ------------------------------------------------------- |
| `_operator` | address | Address to receive resulting tokens                     |
| `_amount`   | uint256 | Amount of wrapped UST to deposit                        |
| `_swapper`  | address | Swapper contract that defines logic for swapping tokens |
| `_swapDest` | address | Address of token to receive post-deposit                |

### `initDepositStable`

Initiates a deposit request for the specified amount of wrapped UST.

```
function initDepositStable(uint256 _amount) external; 
```

| Name      | Type    | Description                      |
| --------- | ------- | -------------------------------- |
| `_amount` | uint256 | Amount of wrapped UST to deposit |

### `initDepositStable`

Initiates a deposit request for the specified amount of wrapped UST. Swaps resulting wrapped aUST to the specified token.

```
function initDepositStable(
    uint256 _amount,
    address _swapper,
    address _swapDest
) external;
```

| Name        | Type    | Description                                             |
| ----------- | ------- | ------------------------------------------------------- |
| `_amount`   | uint256 | Amount to wrapped UST to deposit                        |
| `_swapper`  | address | Swapper contract that defines logic for swapping tokens |
| `_swapDest` | address | Address of token to receive post-deposit                |

### `finishDepositStable`

Finishes deposit operation for the specified Operation contract.&#x20;

```
function finishDepositStable(address _operation) external; 
```

| Name         | Type    | Description                                  |
| ------------ | ------- | -------------------------------------------- |
| `_operation` | address | Address of Operation contract to call finish |

### `redeemStable`

Redeems (withdraws) the specified amount of wrapped aUST.

```
function redeemStable(uint256 _amount) external; 
```

| Name      | Type    | Description                      |
| --------- | ------- | -------------------------------- |
| `_amount` | uint256 | Amount of wrapped aUST to redeem |

### `redeemStable`

Redeems the specified amount of wrapped aUST. Returns resulting wrapped UST to the specified address.

```
function redeemStable(address _operator, uint256 _amount) external; 
```

| Name        | Type    | Description                              |
| ----------- | ------- | ---------------------------------------- |
| `_operator` | address | Address to receive resulting wrapped UST |
| `_amount`   | uint256 | Amount of wrapped aUST to redeem         |

### `redeemStable`

Redeems the specified amount of wrapped aUST. Swaps resulting wrapped UST to the specified token (`_swapDest`) using logic defined in the specified swapper contract (`_swapper`), and returns tokens to the specified address (`_operator`).

```
function redeemStable(
    address _operator,
    uint256 _amount,
    address _swapper,
    address _swapDest
) external;
```

| Name        | Type    | Description                                             |
| ----------- | ------- | ------------------------------------------------------- |
| `_operator` | address | Address to receive resulting tokens                     |
| `_amount`   | uint256 | Amount of wrapped aUST to redeem                        |
| `_swapper`  | address | Swapper contract that defines logic for swapping tokens |
| `_swapDest` | address | Address of token to receive post-redemption             |

### `initRedeemStable`

Initiates a redemption for the specified amount of wrapped aUST.

```
function initRedeemStable(uint256 _amount) external; 
```

| Name      | Type    | Description                      |
| --------- | ------- | -------------------------------- |
| `_amount` | uint256 | Amount of wrapped aUST to redeem |

### `initRedeemStable`

Initiates a stablecoin redemption. Swaps resulting wrapped UST to the specified token (`_swapDest`) using logic defined in the specified swapper contract (`_swapper`), and returns tokens to the specified address (`_operator`).

```
function initRedeemStable(
    uint256 _amount,
    address _swapper,
    address _swapDest
) external;
```

| Name        | Type    | Description                                             |
| ----------- | ------- | ------------------------------------------------------- |
| `_amount`   | uint256 | Amount of aUST tokens to redeem                         |
| `_swapper`  | address | Swapper contract that defines logic for swapping tokens |
| `_swapDest` | address | Address of token to receive post-redemption             |

### `finishRedeemStable`

Finishes a redeem operation for the specified Operation contract.

```
function finishRedeemStable(address _operation) external; 
```

| Name         | Type    | Description                                  |
| ------------ | ------- | -------------------------------------------- |
| `_operation` | address | Address of Operation contract to call finish |
