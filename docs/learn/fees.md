# Fees on Terra

On the Terra network, all transactions incur a gas fee. Transactions involving stablecoins incur additional fees depending on the type of transaction being made. The following table explains which extra fee is added to the different types of stablecoin transactions:

|                                                                        | [Gas](#gas) | [Tobin](#tobin-tax) | [Spread](#spread-fees) | [Stability](#stability-fees) |
|------------------------------------------------------------------------|-------------|---------------------|-----------------------|-----------------------------|
| [Market swaps](./glossary.md#market-swap) between stablecoins          | x           | x                   |                       |                             |
| [Market swaps](./glossary.md#market-swap) between stablecoins and Luna | x           |                     | x                     |                             |
| All other stablecoin transactions (nonmarket swaps)                    | x           |                     |                       | x                           |

Transactions that involve only Luna, such as sending Luna, delegating, or voting only incur gas fees. Terraswap or other dApps may charge their own transaction fees on top of Terra network fees.

## Gas
[Gas](./glossary.md#fees) is a small computational fee that covers the cost of processing a transaction. Gas is estimated and added to every transaction in Terra Station. Any transaction that does not contain enough gas will not process.

Gas on Terra works differently than it works on other blockchains in the following ways:

- Validators can set their own minimum gas fees.
- Most transactions will estimate more than the minimum amount of gas, ensuring the transaction gets completed.
- Unused gas is not refunded.
- Transactions are not queued based on gas amounts but in the order received.

For an in-depth explanation of how gas fees are calculated, see the [terrad reference](../develop/terrad/using-terrad/README.md#fees).

To view current gas rates in your browser, see [gas rates](https://fcd.terra.dev/v1/txs/gas_prices).

Every block, gas fees are sent to the reward pool and dispersed to validators who distribute them to delegators in the form of staking rewards.

## Stability fees

Stability fees are the most common fee type and are added to any transaction using Terra stablecoins, excluding [market swaps](./glossary.md#market-swap). This fee is called the tax rate and varies between .01% to 1%. Stability fees are capped at 1 SDT per transaction. The current tax rate can be found on the [tax rate](https://fcd.terra.dev/terra/treasury/v1beta1/tax_rate) FCD page. For more information on the tax rate and how it works, see the [treasury module](../develop/module-specifications/spec-treasury.md).

Every block, stability fees are sent to the reward pool and dispersed to validators who distribute them to delegators in the form of staking rewards.

## Tobin tax

The Tobin tax is a fixed-percentage fee added to any [market swap](./glossary.md#market-swap) between Terra stablecoin denominations. The rate varies depending on each Terra stablecoin. For example, while the rate for most denominations is .35%, the rate for MNT is 2%. To see the Tobin tax rates, [query the Oracle](https://lcd.terra.dev/terra/oracle/v1beta1/denoms/tobin_taxes). When stablecoins have different Tobin tax rates, the higher tax rate is used for the transaction.

The Tobin tax was created to discourage front-running the Oracle and foreign exchange trading at the expense of users. For more information on the implementation of the Tobin tax, read ["On swap fees: the greedy and the wise"](https://medium.com/terra-money/on-swap-fees-the-greedy-and-the-wise-b967f0c8914e).

Every block, Tobin tax fees are sent to the Oracle reward pool and dispersed to validators over a period of 2 years. Validators then distribute  to validators in the form of staking rewards. For more information on the Oracle reward pool, visit the [Oracle module](spec-oracle.md).

## Spread fees

 Spread fees are added to any [market swap](./glossary.md#market-swap) between Terra and Luna. The minimum spread fee is .5%. During times of extreme volatility, the market module adjusts the spread fee to maintain a [constant product](../develop/module-specifications/spec-market.md#market-making-algorithm) between the size of the Terra pool and the fiat value of the Luna pool, ensuring stability in the protocol. As the pools reach constant product equilibrium, The spread rate returns to a normal value.

 For more information on spread fees, see the [market module](../develop/module-specifications/spec-market.md).

 Every block, spread fees are sent to the Oracle reward pool and dispersed to validators over a period of 2 years. Validators then distribute  to validators in the form of staking rewards. For more information on the Oracle reward pool, visit the [Oracle module](spec-oracle.md).
