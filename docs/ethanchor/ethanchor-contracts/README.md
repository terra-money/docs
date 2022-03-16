# EthAnchor Contracts

EthAnchor contracts are Ethereum smart contracts that facilitate cross-chain Anchor deposits. They primarily consist of [Operation](./#operation), [Router](./#router), [ConversionPool](./#conversionpool), and [ExchangeRateFeeder](./#exchangeratefeeder) contracts.

## Operation

Operation contracts are address-specifically generated smart contracts used to isolate individual EthAnchor deposit/redeem operations. They take in information about a specific request, later used to process the operation.

Operation contracts are crucial for distinguishing between operations requested by different users, and are structured to process a single request at a time.

## Router

The Router contract is responsible for routing incoming deposit/redeem operations to an available Operation contract. The Router owns multiple Operation contracts for processing user requests.

![](../../.gitbook/assets/EthAnchor\_Router.png)

## ConversionPool

ConversionPool contracts manage the conversion between non-UST stablecoins and UST, which are subsequently deposited to Anchor through the Router.

A proxy contract lies above the Router and ConversionPool contracts for routing requests to the most recent contract version.

![](../../.gitbook/assets/ConversionPool.png)

## ExchangeRateFeeder

The ExchangeRateFeeder contract calculates and determines the exchange rate between non-UST stablecoins and their aTerra counterparts.

```{toctree}
:hidden:
deployed-contracts
router
conversionpool
exchangeratefeeder
```