# ConversionPool

The ConversionPool contract enable deposits of non-UST Ethereum stablecoins. ConversionPool contracts are deployed separately per supported stablecoin type.

Non-UST Ethereum stablecoins that are deposited via ConversionPool contracts, which are swapped to UST and deposited via the Router.

## Functions

### `deposit`

Deposits the specified amount of stablecoins.

```
function deposit(uint256 _amount) external; 
```

| Name      | Type    | Description                      |
| --------- | ------- | -------------------------------- |
| `_amount` | uint256 | Amount of stablecoins to deposit |

### `deposit`

Deposits the specified amount of stablecoins.&#x20;

::: {warning}
Actual amount deposited may be smaller than `_minAmountOut` due to cross-chain transfer fees.
:::

```
function deposit(uint256 _amount, uint256 _minAmountOut) external; 
```

| Name            | Type    | Description                                              |
| --------------- | ------- | -------------------------------------------------------- |
| `_amount`       | uint256 | Amount of stablecoins to deposit                         |
| `_minAmountOut` | uint256 | Minimum amount of wrapped UST to be depositing post-swap |

### `redeem`

Redeems (withdraws) the specified amount of aTerra tokens.

```
function redeem(uint256 _amount) external; 
```

| Name      | Type    | Description                |
| --------- | ------- | -------------------------- |
| `_amount` | uint256 | Amount of aTerra to redeem |

### `redeem`

Redeems the specified amount of aTerra tokens.

::: {danger}
Logic for enforcing `_minAmountOut` for `redeem` is yet to be implemented. Please be noted that the specified minimum amount will not be enforced.
:::

```
function redeem(uint256 _amount, uint256 _minAmountOut) external; 
```

| Name            | Type    | Description                                        |
| --------------- | ------- | -------------------------------------------------- |
| `_amount`       | uint256 | Amount of aTerra to redeem                         |
| `_minAmountOut` | uint256 | Minimum amount of stablecoins to receive post-swap |
