# Terra<span/>.py

The Terra Python Software Development Kit (SDK) is a library toolkit used for developing software for interacting with the Terra blockchain. In this tutorial, you will learn how you can install the Terra Python SDK, as well as any necessary dependencies, and how you can carry out various transactions utilizing this technology.

For more information on Terra<span/>.py, visit the [Terra<span/>.py docs](https://terra-money.github.io/terra.py/).

## Requirements

The Terra Python SDK requires <a href="https://www.python.org/downloads/">Python v3.7+</a>.

## Installation

1. The Terra Python SDK may be installed, preferably in a [virtual environment](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/), by running the following command in your terminal:

```sh
pip install -U terra_sdk
```

2. Run the following commands to clone the `terra.py` repository, enter the new directory and install all necessary dependencies:

```sh
git clone --depth 1 https://github.com/terra-money/terra.py.git
cd terra.py
pip install poetry
poetry install
```

<br/>

## Usage Examples

The Terra Python SDK can be used to carry out a variety of transactions on the Terra blockchain. This tutorial covers the following examples:

<div align="center">

[_Signing and Sending Transactions_](#signing-and-sending-transactions)

[_Swapping Digital Currencies_](#swapping-digital-currencies)

[_Interacting with Smart Contracts_](#interacting-with-smart-contracts)

</div>


## LocalTerra for Development & Testing

For testing your transactions, it is recommended that you install and run LocalTerra on your personal computer. Instructions on how to get LocalTerra up and running may be found in the [LocalTerra Github repository](https://github.com/terra-money/LocalTerra). If you would rather test on a network similar to `mainnet`, the live Terra blockchain, then you may utilize `testnet`. However, you will be limited on the number of transactions that you may make per day. This is to protect computing resources from scripts that may spam the network. Once you are comfortable enough to make transactions on the live Terra blockchain, you may utilize `mainnet` to carry out transactions with your own assets.


## Connecting to Your Wallet

In order to conduct transactions on Terra, you will need to be able to send requests to the underlying blockchain. This may be done via instantiating an LCDClient which can be used to communicate to the corresponding Terra Lite Client Daemon (LCD) node.

After you have instantiated your client to communicate with the appropriate network, you may initialize the wallet with which you would like to carry out transactions. On LocalTerra, you may pass in a name of a preconfigured testing wallet (test1-10), each of which contains more than adequate funds for testing purposes. On testnet or mainnet, you will need to pass in the mnemonic key associated with your wallet.

:::{danger}
Carrying out transactions on testnet or mainnet require the use of your personal seed phrase or mnemonic key. This is an unencrypted private key that is generated and presented to you upon the creation of your personal wallet. Saving or utilizing this phrase on your personal computer may expose this private key to malicious actors who could gain access to your personal wallet if they are able to obtain it. You may create a wallet solely for testing purposes to eliminate risk. Use your mnemonic key at your own disgretion.
:::

<ins>**LocalTerra**</ins>

```python
from terra_sdk.client.localterra import LocalTerra

# Create client to communicate with localterra.
terra = LocalTerra()

# Initialize preconfigured test wallet.
wallet = terra.wallets["test1"]
```

<ins>**Testnet**</ins>

```python
from terra_sdk.key.mnemonic import MnemonicKey
from terra_sdk.client.lcd import LCDClient

# Create client to communicate with testnet.
terra = LCDClient(
    url="https://bombay-lcd.terra.dev/",
    chain_id="bombay-12"
)

# Initialize wallet with associated mnemonic key.
mk = MnemonicKey(mnemonic="<INSERT MNEMONIC KEY HERE>")
wallet = terra.wallet(mk)
```

<ins>**Mainnet**</ins>

```python
from terra_sdk.key.mnemonic import MnemonicKey
from terra_sdk.client.lcd import LCDClient

# Create client to communicate with mainnet.
terra = LCDClient(
    url="https://lcd.terra.dev",
    chain_id="columbus-5"
)

# Initialize wallet with associated mnemonic key.
mk = MnemonicKey(mnemonic="<INSERT MNEMONIC KEY HERE>")
wallet = terra.wallet(mk)
```



## Quick Note on Gas & Fees

All transactions on the blockchain will require some effort from computational resources in order to be processed and accepted. The computational work expended due to processing a transaction is quantified in units of `gas`.

Because the amount of gas needed may not be predetermined, the signer of the transaction must send the amount of gas that they would like to use along with the transaction. Fees are calculated by multiplying the gas amount specified in the transaction by either a user-specified price or by utilizing preset prices for each unit of gas. Current rates per unit of gas may be viewed on the [gas rates FCD page](https://fcd.terra.dev/v1/txs/gas_prices).

Each request you will make to the blockchain will contain a message detailing your transaction along with parameters that will help estimate the gas fee. The estimated fee must be above the minimum fee required to process the request for the transaction to be accepted. If the fee is too small to fully complete the request, you may still be responsible for charges on the processing that was carried out before the transaction failed. Gas that is left unused after the transaction will not be refunded and larger estimated fee values will not translate to any benefits for the signer.

```python
import requests
import json

# Request current gas rates for future fee estimation.
gas_price_dict = requests.get("https://fcd.terra.dev/v1/txs/gas_prices").json()
gas_price_dict
```

> ```
> {
>   "uluna": "0.01133",
>   "usdr": "0.104938",
>   "uusd": "0.15",
>   "ukrw": "170.0",
>   "umnt": "428.571",
>   "ueur": "0.125",
>   "ucny": "0.98",
>   "ujpy": "16.37",
>   "ugbp": "0.11",
>   "uinr": "10.88",
>   "ucad": "0.19",
>   "uchf": "0.14",
>   "uaud": "0.19",
>   "usgd": "0.2",
>   "uthb": "4.62",
>   "usek": "1.25",
>   "unok": "1.25",
>   "udkk": "0.9",
>   "uidr": "2180.0",
>   "uphp": "7.6",
>   "uhkd": "1.17",
>   "umyr": "0.6",
>   "utwd": "4.0"
> }
> ```
>

:::{note}
The "u" preceding the name of each currency is the unit symbol for micro. This means that each price is given in millionths of the corresponding cryptocurrency asset. Each currency name refers to its corresponding Terra token. For example, the "uusd": "0.15" entry corresponds to a 0.00000015 UST cost for each unit of gas expended per transaction.
:::


## Signing and Sending Transactions

After initializing your LCDClient and wallet, you may try to carry out a simple transfer of funds. This involves initializing the addresses of your sender and receiver wallets, setting the relevant parameters to carry out the transaction, and creating, signing, and finally sending the request to the node for execution. In this example, you will be sending 1 Luna from your previously initialized wallet to another testing wallet, test2. For this example, fees will be paid in TerraUSD (UST), as specified in the `fee_denoms` parameter.

```python
from terra_sdk.client.lcd.api.tx import CreateTxOptions
from terra_sdk.core.bank import MsgSend
from terra_sdk.core import Coins, Coin

# Initialize sender and recipient wallet addresses.
sender_address = wallet.key.acc_address
recipient_address = terra.wallets["test2"].key.acc_address

# Set relevant parameters for transaction.
tx_options = CreateTxOptions(
    msgs=[
        MsgSend(
            from_address=sender_address,
            to_address=recipient_address,
            amount=Coins([Coin("uluna", 1000000)])
        )
    ],
    gas="auto",
    gas_prices=Coins(gas_price_dict),
    fee_denoms="uusd",
    gas_adjustment=1.5
)

# Create and sign transaction.
tx = wallet.create_and_sign_tx(options=tx_options)

# Broadcast the request for execution to the Terra node.
result = terra.tx.broadcast(tx)
```

After broadcasting the transaction to the Terra node, the `result` variable will hold all relevant information about your request, including if it was successfully completed or not. In the Jupyter Notebook files in this repository, you may utilize a helper function which will neatly present this information for you.

:::{admonition} Note on Gas Estimation
:class: note
In `CreateTxOptions`, the setting of the `gas` parameter to `auto` estimates the amount of gas that may be needed for processing the transaction. The `gas_adjustment` parameter allows for this value to be increased in order to meet the minimum gas requirement for processing if the estimated value is determined to be too small. In order to ensure acceptance of your transaction, this example sets this parameter to a value of 1.5. You may experiment with different parameter values to evaluate which configuration is best for you.
:::

## Swapping Digital Currencies

If you would like to swap one of your Terra assets for another, you may broadcast a swap message to the Terra node. In this example, you will utilize your previously initialized wallet, test1, to swap 1 Luna to UST. You also specify that you will pay the transaction fee with your TerraKRW (KRT) assets.

```python
from terra_sdk.client.lcd.api.tx import CreateTxOptions
from terra_sdk.core.market import MsgSwap
from terra_sdk.core import Coins, Coin

# Initialize trader wallet address.
trader_address = wallet.key.acc_address

# Set relevant parameters for transaction.
tx_options = CreateTxOptions(
    msgs=[
        MsgSwap(
            trader=trader_address,
            offer_coin=Coin("uluna", 1000000),
            ask_denom="uusd"
        )
    ],
    gas="auto",
    gas_prices=Coins(gas_price_dict),
    fee_denoms="ukrw",
    gas_adjustment=1.5
)

# Create and sign transaction.
tx = wallet.create_and_sign_tx(options=tx_options)

# Broadcast the request for execution to the Terra node.
result = terra.tx.broadcast(tx)
```

### Swap and Send

You may also swap and send funds to an address of your choice utilizing a swap and send message. In this example, you will swap 1 Luna for UST and then send the resulting funds to another testing wallet.

```python
from terra_sdk.client.lcd.api.tx import CreateTxOptions
from terra_sdk.core.market import MsgSwapSend
from terra_sdk.core import Coins, Coin

# Initialize sender and recipient wallet addresses.
sender_address = wallet.key.acc_address
recipient_address = terra.wallets["test2"].key.acc_address

# Set relevant parameters for transaction.
tx_options = CreateTxOptions(
    msgs=[
        MsgSwapSend(
            from_address=sender_address,
            to_address=recipient_address,
            offer_coin=Coin("uluna", 1000000),
            ask_denom="uusd"
        )
    ],
    gas="auto",
    gas_prices=Coins(gas_price_dict),
    fee_denoms="ukrw",
    gas_adjustment=1.5
)

# Create and sign transaction.
tx = wallet.create_and_sign_tx(options=tx_options)

# Broadcast the request for execution to the Terra node.
result = terra.tx.broadcast(tx)
```


## Interacting with Smart Contracts

In order to interact with a smart contract on Terra, you will have to either deploy your own smart contract on LocalTerra or utilize one of the many exceptional contracts available on the testnet or mainnet. In this example, you will deposit 1 UST into Anchor utilizing the Terra Python SDK on the testnet. Anchor is a decentralized savings protocol that offers low-volatile yields on Terra stablecoin deposits. You may interact with Anchor by going to the [Anchor EARN page](https://app.anchorprotocol.com/earn).

```python
from terra_sdk.client.lcd.api.tx import CreateTxOptions
from terra_sdk.core.wasm import MsgExecuteContract
from terra_sdk.core import Coins, Coin

# Initialize sender wallet and smart contract addresses.
sender_address = wallet.key.acc_address
anchor_contract_address = "terra15dwd5mj8v59wpj0wvt233mf5efdff808c5tkal"

# Set relevant parameters for transactions.
tx_options = CreateTxOptions(
    msgs=[
        MsgExecuteContract(
            sender=sender_address,
            contract=anchor_contract_address,
            execute_msg={"deposit_stable": {}},
            coins=Coins([Coin("uusd", 1000000)])
        )
    ],
    gas="auto",
    gas_prices=Coins(gas_price_dict),
    fee_denoms="uusd",
    gas_adjustment=1.5
)

# Create and sign transaction.
tx = wallet.create_and_sign_tx(options=tx_options)

# Broadcast the request for execution to the Terra node.
result = terra.tx.broadcast(tx)
```

## Next steps

For more information on your next steps with Terra<span/>.py, visit the [Terra<span/>.py docs](https://terra-money.github.io/terra.py/).