# Fees on Terra

Fees on the Terra network are minimal compared to most other blockchains.

There are four types of fees on Terra: gas, Tobin taxes, spread fees, and stability fees.

| Fee type                         | Example                           | Usage                                           |
|----------------------------------|-----------------------------------|-------------------------------------------------|
| [Gas](#gas)                      | All transactions.                 | All transactions on Terra.                      |
| [Tobin tax](#tobin-tax)          | UST<>KRT, SDT<>UST, etc.          | Swaps between Terra stablecoin denominations.   |
| [Spread fee](#spread-fees)       | UST<>Luna, Luna<>UST, etc.        | Swaps between Luna and Terra stablecoins.       |
| [Stability fee](#stability-fees) | UST<>ANC, Wallet transfers, etc.  | All other transactions using Terra stablecoins. |

:::tip No stacked network fees
While all transactions charge gas, single transactions will not have overlapping fees on Terra Station. For example, a Terra stablecoin denomination swap charges a gas fee and a Tobin tax but not a spread fee or a stability fee.
:::

## Gas
[Gas](./glossary.md#fees) is a small computational fee that covers the cost of processing a transaction. Gas is estimated and added to every transaction in Terra Station. Any transaction that does not contain enough gas will not process.
Gas on Terra works differently than it works on other blockchains:

- Validators can set their own minimum gas fees.
- Most transactions will estimate more than the minimum amount of gas, ensuring the transaction gets completed.
- Unused gas is not refunded.
- Transactions are not queued based on gas amounts, but in the order received.

For an in-depth explanation of how gas fees are calculated, visit the [terrad reference](/Reference/terrad/#fees) page.

To view current gas rates in your browser, visit the [gas rates](https://fcd.terra.dev/v1/txs/gas_prices) FCD page.

## Tobin tax

The Tobin tax is a fixed percentage fee added to any [market swap](./glossary.md#market-swap) between Terra stablecoins. The rate varies depending on each Terra stablecoin denomination. For example, while the rate for most denominations is .35%, the rate for MNT is 2%. To see the Tobin tax rates, [query the oracle](https://lcd.terra.dev/terra/oracle/v1beta1/denoms/tobin_taxes). When stablecoins have different Tobin tax rates, the higher tax rate will be used for the transaction.

 The Tobin tax was created to discourage front-running the oracle and foreign exchange trading at the expense of users. For more information on the implementation of the Tobin tax, read ["On swap fees: the greedy and the wise"](https://medium.com/terra-money/on-swap-fees-the-greedy-and-the-wise-b967f0c8914e).

## Spread fees

 Spread fees are added to any [market swap](./glossary.md#market-swap) between Terra and Luna. The minimum spread fee is .5%. During times of extreme volatility, the market module adjusts the spread fee to maintain a [constant product](/Reference/Terra-core/Module-specifications/spec-market.html#market-making-algorithm) between the size of the Terra pool and the fiat value of the Luna pool, ensuring stability in the protocol. As the pools reach constant product equilibrium, The spread rate returns to a normal value.

 For more information on spread fees, visit the [market module](/Reference/Terra-core/Module-specifications/spec-market.md).

## Stability fees

Stability fees are the most common fee type, and are added to any transaction using Terra stablecoins, excluding [market swaps](./glossary.md#market-swap). This fee is called the tax rate and varies between .01% to 1%. Stability fees are capped at 1 SDT per transaction. The current tax rate can be found on the [tax rate](https://fcd.terra.dev/terra/treasury/v1beta1/tax_rate) FCD page. For more information on the tax rate and how it works, visit the treasury module.
