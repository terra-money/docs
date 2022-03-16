# EthAnchor Account Contract

EthAnchor Account contracts are user-specifically generated Ethereum smart contracts for interacting with Anchor Protocol from the Ethereum blockchain.

EthAnchor Account contracts only allow a single operation at a time, tracked by the `ActionFlag` state.

## Events

### `InitDeposit`

Emitted when wrapped UST is requested for deposit to Anchor via [`initDepositStable`](ethanchor-account-contract.md#initdepositstable).

```
event InitDeposit(address indexed sender, uint256 amount, bytes32 to);
```



### `FinishDeposit`

Emitted when wrapped aUST is claimed from Anchor via [`finishDepositStable`](ethanchor-account-contract.md#finishdepositstable).

```
event FinishDeposit(address indexed sender);
```



### `InitRedemption`

Emitted when wrapped aUST is requested for redemption to Anchor via [`initRedeemStable`](ethanchor-account-contract.md#initredeemstable).

```
event InitRedemption(address indexed sender, uint256 amount, bytes32 to);
```



### `FinishRedemption`

Emitted when wrapped UST is claimed from Anchor via [`finishRedeemStable`](ethanchor-account-contract.md#finishredeemstable).

```
event FinishRedemption(address indexed sender);
```



### `FailureReported`

Emitted when aUST redemption fails due to a lack of stablecoin liquidity in the money market.

```
event FailureReported(); 
```



### `EmergencyWithdrawActivated`

Emitted when [`emergencyWithdraw`](ethanchor-account-contract.md#emergencywithdraw) is activated for withdrawing ERC20 tokens from the contract.

```
event EmergencyWithdrawActivated(address tokenAddress, uint256 amount);
```

## Functions

### `initDepositStable`

Accepts new wrapped UST deposits.

```
function initDepositStable(uint256 amount) public onlyAuthSender checkInit terraAddressSet 
```

**Prerequisite**: must have called `approve()` for an `allowance` of at least `amount` for the wrapped UST contract, `ActionFlag` is set to `false`\
**Accepts**: `amount` - how much UST to deposit\
**Updates**: `ActionFlag` to `true`\
**Emits**: `InitDeposit`



### `finishDepositStable`

Claims resulting wrapped aUST after a successful deposit.

```
function finishDepositStable() function initDepositStable(uint256 amount) public onlyAuthSender checkInit terraAddressSet 
```

**Prerequisite**: aUST balance of account-specific endpoint contract must be greater than 0, `ActionFlag` is set to `true`\
**Updates**: sets `ActionFlag` to `false`, `transfer`s all aUST balances from contract address to `tx.origin`\
**Emits**: `FinishDeposit`

&#x20;

### `initRedeemStable`

Accepts wrapped aUST for redemption back to wrapped UST.

```
function initRedeemStable(uint256 amount) public onlyAuthSender checkInit terraAddressSet 
```

**Prerequisite**: must have called `approve()` for an allowance of at least `amount` for the wrapped aUST contract, `ActionFlag` is set to `false`\
**Accepts**: `amount` - how much aUST to redeem back to UST\
**Updates**: `ActionFlag` to `true`**IMPORTANT**: aUST redemptions may fail if UST liquidity is low in the Terra side Anchor money market → be sure to check account contract balances & `initRedeemStable()` `success` parameters.\
**Emits**: `InitRedemption`



### `finishRedeemStable`

Claims resulting wrapped UST after withdrawal.

```
function finishRedeemStable() public onlyAuthSender checkFinish terraAddressSet 
```

**Prerequisite**: UST balance of account-specific endpoint contract must be greater than 0, `ActionFlag` is set to `true`\
**Updates**: sets `ActionFlag` to `false`, transfers all UST balances from contract address to `tx.origin`\
**Emits**: `FinishRedemption`



### `reportFailure`

Reports any failures in-between `init` operations to allow the EthAnchor operator to return any funds, and reset `ActionFlag` back to `false`. Only callable by contract owner.

```
function reportFailure() public onlyController checkFinish 
```

**Prerequisite**: UST balance of account-specific endpoint contract must be 0, `ActionFlag` is set to `true`\
**Updates**: sets `ActionFlag` to `false`



### `emergencyWithdraw`

Withdraws all balances of any ERC20 token from the contract. Only callable by contract owner.

```
function emergencyWithdraw(address _tokenAddress) public onlyController 
```

**Prerequisite**: ERC20 token balances of token contract `_tokenAddress` at contract address must be greater than 0\
**Updates**: transfers all ERC20 token balances of token contract `_tokenAddress` back to `msg.sender`
