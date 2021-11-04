# Fees on Terra

There are two types of Terra transaction fees: gas fees and stability fees.
## Gas fees

Gas on Terra works different from other blockchains you may be used to.

Gas is a compute fee that covers the cost of processing a transaction. Gas is estimated and added to each transaction in Terra Station. Any transaction that does not contain enough gas will not process. Validators can set their own minimum gas fees. Most transactions will estimate more than the minimum amount of gas, ensuring the transaction gets completed. Unused gas is not refunded. Unlike other networks, transactions on Terra are not queued based on gas amounts, but in the order received.

For an in-depth explanation of how gas fees are calculated, visit the [terrad reference](/Reference/terrad/#fees) page.

To view current gas prices in your browser, visit the [gas prices](https://fcd.terra.dev/v1/txs/gas_prices) FCD page.

## Stability fees

### Terra<>Terra

**Tobin tax**: A percentage fee added to any swap between Terra stablecoins. The rate varies, depending on each Terra stablecoin denomination. For example, while the rate for most denominations is .35%, the rate for MNT is 2%. To see the rates, [query the oracle](/Reference/terrad/subcommands.html#query-oracle-tobin-taxes). Taxes for all denominations are capped at 1 STD.

The Tobin tax was created to discourage front-running the oracle and forex trading at the expense of users. For more information on the implementation of the Tobin tax, read ["On swap fees: the greedy and the wise"](https://medium.com/terra-money/on-swap-fees-the-greedy-and-the-wise-b967f0c8914e) by Nicholas Platias.

### Terra<>Luna

**Spread fees**: A percentage fee added to any swap between Terra and Luna. The minimum spread fee is .5%. During times of extreme volatility, the market module adjusts the spread fee to maintain a [constant product](/Reference/Terra-core/Module-specifications/spec-market.html#market-making-algorithm) between the size of the Terra pool and the fiat value of the Luna pool, ensuring stability in the protocol. The spread rate returns to a normal value as the pools reach equilibrium.

For more information on spread fees, visit the [market module](/Reference/Terra-core/Module-specifications/spec-market.md).

## Total Fees

To calculate the total fees for a transaction,
