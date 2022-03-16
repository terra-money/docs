# EthAnchor API

The **EthAnchor API** is a REST interface for interacting with EthAnchor, providing interfaces for transaction fabrication and static data queries. It allows interfaces, building transactions and verifying cross-chain state to be mostly abstracted regardless of platform. Through this, the EthAnchor API guarantees a minimum level of operation safety, including correct ordering of contract calls and state integrity.

## Endpoints

The EthAnchor API is available at both the Ethereum mainnet and the Ropsten testnet.

|         | Network          | Chain ID | URL                                                                                       |
| ------- | ---------------- | -------- | ----------------------------------------------------------------------------------------- |
| Mainnet | Ethereum Mainnet | 1        | [https://eth-api.anchorprotocol.com/](https://eth-api.anchorprotocol.com)                 |
| Testnet | Ropsten          | 3        | [https://ropsten.eth-api.anchorprotocol.com/](https://ropsten.eth-api.anchorprotocol.com) |

## Usage

Below are sections that contains the API documentation for using the EthAnchor API.

| Operation Type                                              | Description                                                         |
| ----------------------------------------------------------- | ------------------------------------------------------------------- |
| [Getting Market Information](getting-market-information.md) | Endpoint for retrieving data regarding a specific stablecoin market |
| [Depositing Stablecoins](depositing-stablecoins.md)         | Endpoints for depositing wrapped Terra stablecoins to Anchor        |
| [Redeeming Stablecoins](redeeming-stablecoins.md)           | Endpoints for redeeming wrapped Terra stablecoins from Anchor       |

Fabricated transactions are unsigned Ethereum Tx payloads that include the user's desired EthAnchor operation. Users can then sign the Tx payload and broadcast it to the relevant Ethereum network to conduct the operation.
