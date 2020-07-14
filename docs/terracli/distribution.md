# Distribution

## Withdraw Rewards

Withdraw rewards from a given delegation address, and withdraw validator commission if the delegation address given is a validator operator.

```sh
terracli tx distribution withdraw-rewards <validator-address>
```

## Set Withdraw Address

Change the default withdraw address for rewards associated with an address.

```sh
terracli tx distribution set-withdraw-addr <withdraw-address>
```


## Withdraw All Rewards

Withdraw all delegations rewards for a delegator.


```sh
terracli tx distribution withdraw-all-rewards 
```

## Fund Community Pool

Funds the community pool with the specified amount.

```sh
terracli tx distribution fund-community-pool <amount>
```

Argument `amount` is in a format such as: `1000uluna`, or `100ukrw,200uusd`


## Query Distribution Parameters

To check the current distribution parameters, run:

```bash
terracli query distribution params
```

## Query Community Pool Coins

To query all coins in the Community Pool, which is under Governance control:

```bash
terracli query distribution community-pool
```

## Query Outstanding Rewards

To check the current outstanding (un-withdrawn) rewards, run:

```bash
terracli query distribution outstanding-rewards
```

## Query Validator Commission

To check the current outstanding commission for a validator, run:

```bash
terracli query distribution commission <validator_address>
```

## Query Validator Slashes

To check historical slashes for a validator, run:

```bash
terracli query distribution slashes <validator_address> <start_height> <end_height>
```

## Query Delegator Rewards

To check current rewards for a delegator (if they were to be withdrawn), run:

```bash
terracli query distribution rewards <delegator_address> <validator_address>
```

## Query All Delegator Rewards

To check all current rewards for a delegator (if they were to be withdrawn), run:

```bash
terracli query distribution rewards <delegator_address>
```
