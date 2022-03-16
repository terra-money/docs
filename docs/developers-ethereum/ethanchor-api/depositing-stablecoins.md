# Depositing Stablecoins

ERC20 stablecoins (e.g. UST) can be redeemed to receive ERC20 aTerra using the below endpoints:

| Endpoint                                                                           | Method | Description                                          |
| ---------------------------------------------------------------------------------- | ------ | ---------------------------------------------------- |
| [`init_deposit_stable`](depositing-stablecoins.md#initiate-stablecoin-deposit)     | POST   | Initiates the deposit of ERC20 stablecoins           |
| [`finish_deposit_stable`](depositing-stablecoins.md#finish-stablecoin-deposit)     | POST   | Claims minted ERC20 aTerra                           |
| [`deposit_stable_status`](depositing-stablecoins.md#get-stablecoin-deposit-status) | GET    | Gets status of an ongoing stablecoin deposit request |

{% swagger baseUrl="https://eth-api.anchorprotocol.com" path="/api/v1/init_deposit_stable" method="post" summary="Initiate stablecoin deposit" %}
{% swagger-description %}
`POST /api/v1/init_deposit_stable`

 allows you to fabricate an unsigned Ethereum Tx payload that initiates a stablecoin deposit request. You can sign the Tx payload transaction yourself and broadcast to the Ethereum network, or broadcast via any custodian API that supports signing a raw Tx payload.

\




\


Note that only 

**one**

 

`init_deposit_stable`

 operation can take place at the same time; even if you successfully broadcast the resulting Tx to the network, the EthAnchor Account contract will block any subsequent operations (including stablecoin redemptions) until an ongoing stablecoin deposit request is finished with 

`finish_deposit_stable`

.
{% endswagger-description %}

{% swagger-parameter in="header" name="Authentication" type="string" %}
Anchor client key.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="stable_denom" type="string" %}
Denomination of stablecoin to deposit

\


Example: 

`"uusd"`
{% endswagger-parameter %}

{% swagger-parameter in="body" name="stable_amount" type="string" %}
(uint256) Amount of stablecoins to deposit to Anchor in 18 decimals.
{% endswagger-parameter %}

{% swagger-response status="200" description="DepositStable raw Tx hash." %}
```
{
    "success": true,
    "tx_hash": "0x......",
    "action": "anchor/init_deposit_stable",
    "stable_denom": "uusd", 
    "stable_amount": "500000000"
}
```
{% endswagger-response %}

{% swagger-response status="401" description="You are not authorized to call this endpoint; client not registered." %}
```
{
    "success": false,
    "error": "unauthorized; client not registered"
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger baseUrl="https://eth-api.anchorprotocol.com" path="/api/v1/finish_deposit_stable" method="post" summary="Finish stablecoin deposit" %}
{% swagger-description %}
`POST /api/v1/finish_deposit_stable`

 allows you to finish a previously requested deposit stable operation.

\




\


This endpoint returns an unsigned Ethereum transaction payload. You can sign the transaction yourself and send to the network, or broadcast using any custodian API that supports signing a raw Tx payload.
{% endswagger-description %}

{% swagger-parameter in="header" name="Authentication" type="string" %}
Anchor client key.api/
{% endswagger-parameter %}

{% swagger-response status="200" description="FinishDepositStable raw Tx hash" %}
```
{
    "success": true,
    "tx_hash": "0x......",
    "action": "anchor/finish_deposit_stable"
}
```
{% endswagger-response %}

{% swagger-response status="401" description="You are not authorized to call this endpoint; client not registered" %}
```
{
    "success": false,
    "error": "unauthorized; client not registered"
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger baseUrl="https://eth-api.anchorprotocol.com" path="/api/v1/deposit_stable_status" method="get" summary="Check stablecoin deposit status" %}
{% swagger-description %}
`GET /api/v1/deposit_stable_status`

 allows you to check the status of an ongoing 

`deposit_stable`

 operation.

\




\


You may want to periodically check the progress of your 

`deposit_stable`

 request, since an operation may take up to minutes due to congestion on the Ethereum network.

\




\


Please note that status being 

`"finished"`

 does 

**NOT**

 mean you have run a full cycle of 

`deposit_stable`

 operation; you still need to send another transaction from 

`POST /api/v1/finish_deposit_stable`

 to finalize your operation.

\




\


This endpoint responds with HTTP 204 when there is no ongoing operation.
{% endswagger-description %}

{% swagger-parameter in="header" name="Authentication" type="string" %}
Anchor client access key.
{% endswagger-parameter %}

{% swagger-response status="200" description="Current status of ongoing deposit stable operation." %}
```
{
    // Phase
    // 0 - (Ethereum) wrapper contract has received stablecoins (e.g. UST) and 
    //     dispatched stablecoins through Shuttle
    // 1 - (Terra) terra-side client account has received stablecoins
    //     triggering DepositStable soon
    // 2 - (Terra) DepositStable action is processed and aTerra tokens (e.g. aUST) have
    //     been received
    // 3 - (Terra) aTerra tokens are sent to the ether-side wrapper contract
    //     through Shuttle
    // 4 - (Ethereum) contract has received aTerra; operation finished
    "phase": 0,

    // LastUpdated
    // Unix timestamp at which the last update to this response has been made
    "last_updated": 1608662606,

    // Status
    // Operation status
    // pending   - operation in flight
    // failed    - operation failed; last known tx has been recorded
    // finished  - operation finished; you can call /finish_deposit_stable
    "status": "pending",

    // Denomination
    // denomination stablecoin to be deposited
    "stable_denom": "uusd", 

    // Amount
    // amount of stablecoins to be deposited
    "stable_amount": "20000000",

    // TxHash
    // List of known tx hashes and the corresponding network name
    "tx_hash": [
        {
            "network": "ethereum",
            "tx_hash": "0x...."
        },
        {
            "network": "terra",
            "tx_hash": "00ABCD..."
        },
        ...
    ]
}
```
{% endswagger-response %}

{% swagger-response status="204" description="No ongoing deposit_stable operation" %}
```
{
    "status": "idle"
}
```
{% endswagger-response %}

{% swagger-response status="401" description="You are not authorized to call this endpoint; client not registered." %}
```
{
    "success": false,
    "error": "unauthorized; client not registered"
}
```
{% endswagger-response %}
{% endswagger %}
