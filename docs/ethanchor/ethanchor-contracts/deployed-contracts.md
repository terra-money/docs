# Deployed Contracts

## Contract Addresses

Smart contracts that power EthAnchor are deployed to the [Ethereum blockchain](https://ethereum.org/en/), and can be found at the below networks:

| Network Classification | Name                     | Chain ID |
| ---------------------- | ------------------------ | -------- |
| Mainnet                | Ethereum Mainnet         | `1`      |
| Testnet                | Ethereum Testnet Ropsten | `3`      |

Deposits and withdrawal requests made through supported Ethereum networks are each handled on the core Anchor smart contracts which reside on the [Terra blockchain](https://www.terra.money). Requests from Ethereum mainnet and testnet networks are each processed on the below Terra networks:

| Network Classification | Chain ID     |
| ---------------------- | ------------ |
| Mainnet                | `columbus-5` |
| Testnet                | `bombay-12`  |

{% tabs %}
{% tab title="Mainnet" %}
{% hint style="info" %}
Mainnet EthAnchor contracts use [Curve](https://curve.fi) for swapping stablecoins.
{% endhint %}

#### Core Contracts

{% hint style="info" %}
EthAnchor core contracts have a proxy contract layer on top. Below are addresses of the proxy contracts (excluding ExchangeRateFeeder). Please note that the contract address of ExchangeRateFeeder may change as adjustments occur.
{% endhint %}

| Contract              | Contract Address                                                                                                                 |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Router                | [0xcEF9E167d3f8806771e9bac1d4a0d568c39a9388](https://etherscan.io/address/0xcEF9E167d3f8806771e9bac1d4a0d568c39a9388)            |
| ExchangeRateFeeder    | [0xB12B8247bD1749CC271c55Bb93f6BD2B485C94A7](https://etherscan.io/address/0xB12B8247bD1749CC271c55Bb93f6BD2B485C94A7)            |
| ConversionPool - DAI  | [0x83dd0a8E6F3A51c4cCA6c3f95721f9926DD9e7E7](https://etherscan.io/address/0x83dd0a8E6F3A51c4cCA6c3f95721f9926DD9e7E7)            |
| ConversionPool - USDT | [0xEd8C41774E71f9BF0c2C223d3a3554F496656D16](https://etherscan.io/address/0xEd8C41774E71f9BF0c2C223d3a3554F496656D16)            |
| ConversionPool - USDC | [0x53fD7e8fEc0ac80cf93aA872026EadF50cB925f3](https://etherscan.io/address/0x53fD7e8fEc0ac80cf93aA872026EadF50cB925f3)            |
| ConversionPool - BUSD | [0x242876001d04D5782aEE4f69fB26Ee6264Cc1d21](https://etherscan.io/address/0x242876001d04D5782aEE4f69fB26Ee6264Cc1d21)            |
| ConversionPool - FRAX | [0xF04FDb68727DA7564d21ceD6a81D1b63ff84b047](https://etherscan.io/address/0xF04FDb68727DA7564d21ceD6a81D1b63ff84b047#internaltx) |

#### ERC20-Compliant Token Contracts (Stablecoins)

| Token Name        | Symbol | Decimals | Contract Address                                                                                                    |
| ----------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------- |
| Wrapped UST Token | UST    | 18       | [0xa47c8bf37f92abed4a126bda807a7b7498661acd](https://etherscan.io/token/0xa47c8bf37f92abed4a126bda807a7b7498661acd) |
| Dai Stablecoin    | DAI    | 18       | [0x6b175474e89094c44da98b954eedeac495271d0f](https://etherscan.io/token/0x6b175474e89094c44da98b954eedeac495271d0f) |
| Tether USD        | USDT   | 6        | [0xdac17f958d2ee523a2206206994597c13d831ec7](https://etherscan.io/token/0xdac17f958d2ee523a2206206994597c13d831ec7) |
| USD Coin          | USDC   | 6        | [0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48](https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48) |
| Binance USD       | BUSD   | 18       | [0x4Fabb145d64652a948d72533023f6E7A623C7C53](https://etherscan.io/token/0x4Fabb145d64652a948d72533023f6E7A623C7C53) |
| Frax              | FRAX   | 18       | [0x853d955acef822db058eb8505911ed77f175b99e](https://etherscan.io/token/0x853d955acef822db058eb8505911ed77f175b99e) |

#### ERC20-Compliant Token Contracts (aTerra)

| Token Name               | Symbol | Decimals | Contract Address                                                                                                    |
| ------------------------ | ------ | -------- | ------------------------------------------------------------------------------------------------------------------- |
| Wrapped Anchor UST Token | aUST   | 18       | [0xa8De3e3c934e2A1BB08B010104CcaBBD4D6293ab](https://etherscan.io/token/0xa8De3e3c934e2A1BB08B010104CcaBBD4D6293ab) |
| Anchor DAI Token         | aDAI   | 18       | [0x23afFce94d2A6736DE456a25eB8Cc96612Ca55CA](https://etherscan.io/token/0x23afFce94d2A6736DE456a25eB8Cc96612Ca55CA) |
| Anchor USDT Token        | aUSDT  | 18       | [0x54E076dBa023251854f4C29ea750566528734B2d](https://etherscan.io/token/0x54E076dBa023251854f4C29ea750566528734B2d) |
| Anchor USDC Token        | aUSDC  | 18       | [0x94eAd8f528A3aF425de14cfdDA727B218915687C](https://etherscan.io/token/0x94eAd8f528A3aF425de14cfdDA727B218915687C) |
| Anchor BUSD Token        | aBUSD  | 18       | [0x5A6a33117EcBc6EA38B3a140F3E20245052CC647](https://etherscan.io/token/0x5A6a33117EcBc6EA38B3a140F3E20245052CC647) |
| Anchor FRAX Token        | aFRAX  | 18       | [0x0660AE7B180e584d05890e56bE3A372F0b746515](https://etherscan.io/token/0x0660AE7B180e584d05890e56bE3A372F0b746515) |
{% endtab %}

{% tab title="Testnet" %}
{% hint style="info" %}
Testnet EthAnchor contracts use [Uniswap V2](https://app.uniswap.org/#/swap?use=V2) for swapping stablecoins.
{% endhint %}

#### Core Contracts

{% hint style="info" %}
EthAnchor core contracts have a proxy contract layer on top. Below are addresses of the proxy contracts (excluding ExchangeRateFeeder). Please note that the contract address of ExchangeRateFeeder may change as adjustments occur.
{% endhint %}

| Contract              | Address                                                                                                                       |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Router                | [0x7537aC093cE1315BCE08bBF0bf6f9b86B7475008](https://ropsten.etherscan.io/address/0x7537aC093cE1315BCE08bBF0bf6f9b86B7475008) |
| ExchangeRateFeeder    | [0x79E0d9bD65196Ead00EE75aB78733B8489E8C1fA](https://ropsten.etherscan.io/address/0x79E0d9bD65196Ead00EE75aB78733B8489E8C1fA) |
| ConversionPool - DAI  | [0xb4f818c2BCC3f6c50E1286Ac4f094C4Cffd8F0CC](https://ropsten.etherscan.io/address/0xb4f818c2BCC3f6c50E1286Ac4f094C4Cffd8F0CC) |
| ConversionPool - USDT | [0x8BCd9F372daf4546034124077d3A6da3Fd552Cf4](https://ropsten.etherscan.io/address/0x8BCd9F372daf4546034124077d3A6da3Fd552Cf4) |
| ConversionPool - USDC | [0x92E68C8C24a0267fa962470618d2ffd21f9b6a95](https://ropsten.etherscan.io/address/0x92E68C8C24a0267fa962470618d2ffd21f9b6a95) |
| ConversionPool - BUSD | [0x228D40cCF7b7CE880d72801E2E776D38CA7E647D](https://ropsten.etherscan.io/address/0x228D40cCF7b7CE880d72801E2E776D38CA7E647D) |
| ConversionPool - FRAX | [0xcf05803bBE005F835f46a452F9D9526129c8E7f8](https://ropsten.etherscan.io/address/0xcf05803bBE005F835f46a452F9D9526129c8E7f8) |

#### ERC20-Compliant Token Contracts (Stablecoins)

| Token Name        | Symbol | Decimals | Contract Address                                                                                                            |
| ----------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| Wrapped UST Token | UST    | 18       | [0x6cA13a4ab78dd7D657226b155873A04DB929A3A4](https://ropsten.etherscan.io/token/0x6cA13a4ab78dd7D657226b155873A04DB929A3A4) |
| Dai Stablecoin    | DAI    | 18       | [0x6bb59e3f447222b3fcf2847111700723153f625a](https://ropsten.etherscan.io/token/0x6bb59e3f447222b3fcf2847111700723153f625a) |
| Tether USD        | USDT   | 6        | [0x6af27a81ceb61073ccca401ca6b43064f369dc02](https://ropsten.etherscan.io/token/0x6af27a81ceb61073ccca401ca6b43064f369dc02) |
| USD Coin          | USDC   | 6        | [0xe015fd30cce08bc10344d934bdb2292b1ec4bbbd](https://ropsten.etherscan.io/token/0xe015fd30cce08bc10344d934bdb2292b1ec4bbbd) |
| Binance USD       | BUSD   | 18       | [0xaae6df09ae0d322a666edc63e6a69e4b0fab6f5d](https://ropsten.etherscan.io/token/0xaae6df09ae0d322a666edc63e6a69e4b0fab6f5d) |
| Frax              | FRAX   | 18       | [0x481751032cef6522512f2bc9d140130ced428707](https://ropsten.etherscan.io/token/0x481751032cef6522512f2bc9d140130ced428707) |

#### ERC20-Compliant Token Contracts (aTerra)

| Token Name               | Symbol | Decimals | Contract Address                                                                                                            |
| ------------------------ | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| Wrapped Anchor UST Token | aUST   | 18       | [0x006479f75D6622AE6a21BE17C7F555B94c672342](https://ropsten.etherscan.io/token/0x006479f75d6622ae6a21be17c7f555b94c672342) |
| Anchor DAI Token         | aDAI   | 18       | [0x4f454a080497e2FE74dB59e0B311614321D7D706](https://ropsten.etherscan.io/token/0x4f454a080497e2FE74dB59e0B311614321D7D706) |
| Anchor USDT Token        | aUSDT  | 18       | [0xb15E56E966e2e2F4e54EbF6f5e8159Ea4f400478](https://ropsten.etherscan.io/token/0xb15E56E966e2e2F4e54EbF6f5e8159Ea4f400478) |
| Anchor USDC Token        | aUSDC  | 18       | [0xFff8fb0C13314c90805a808F48c7DFF37e95Eb16](https://ropsten.etherscan.io/token/0xFff8fb0C13314c90805a808F48c7DFF37e95Eb16) |
| Anchor BUSD Token        | aBUSD  | 18       | [0x314f64d1344dd8F2B7Aa373BA9e285aBB0aFAB65](https://ropsten.etherscan.io/token/0x314f64d1344dd8F2B7Aa373BA9e285aBB0aFAB65) |
| Anchor FRAX Token        | aFRAX  | 18       | [0x01985Ac3A9eB5Efa66375B89d74c6Fa6ebfC8322](https://ropsten.etherscan.io/token/0x01985Ac3A9eB5Efa66375B89d74c6Fa6ebfC8322) |
{% endtab %}
{% endtabs %}
