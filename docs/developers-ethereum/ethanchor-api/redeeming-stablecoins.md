# Redeeming Stablecoins

ERC20 aTerra tokens (e.g. aUST) can be redeemed to ERC20 stablecoins using the below endpoints:

| Endpoint                                                                              | Method | Description                                             |
| ------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------- |
| [`init_redeem_stable`](redeeming-stablecoins.md#initiate-stablecoin-redemption)       | POST   | Initiates the redemption of ERC20 aTerra                |
| [`finish_redeem_stable`](redeeming-stablecoins.md#finish-stablecoin-redemption)       | POST   | Claims redeemed ERC20 stablecoins                       |
| [`redeem_stable_status`](redeeming-stablecoins.md#check-stablecoin-redemption-status) | GET    | Gets status of an ongoing stablecoin redemption request |

{% swagger baseUrl="https://eth-api.anchorprotocol.com" path="/api/v1/init_redeem_stable" method="post" summary="Initiate stablecoin redemption" %}
{% swagger-description %}
`POST /api/v1/init_redeem_stable`

 allows you to fabricate an unsigned Ethereum Tx payload that initiates a stablecoin redemption request. The client can sign and broadcast the resulting Tx payload with their Ethereum account key, or use a custodian API that supports the signing of a raw Tx payload.

\




\


Note that only 

**one**

 

`init_redeem_stable`

 operation can take place at the same time; even if you successfully broadcast the resulting Tx to the network, the EthAnchor Account contract will block any subsequent operations until an ongoing stablecoin redemption is finished with 

`finish_redeem_stable`

.
{% endswagger-description %}

{% swagger-parameter in="header" name="Authentication" type="string" %}
Anchor client key.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="underlying_denom" type="string" %}
Underlying stablecoin denomination of aTerra to redeem from Anchor.

\


Example: 

`"uusd"`
{% endswagger-parameter %}

{% swagger-parameter in="body" name="a_terra_amount" type="string" %}
(uint256) amount of aTerra to redeem from Anchor in 18 decimals. If empty, redeems all aTerra holdings.
{% endswagger-parameter %}

{% swagger-response status="200" description="init_redeem_stable unsigned Tx hash." %}
```
{
    "success": true,
    "tx_hash": "0x......",
    "action": "anchor/init_redeem_stable",
    "underlying_denom": "uusd", 
    "a_terra_amount": "500000000"
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

{% swagger baseUrl="https://eth-api.anchorprotocol.com" path="/api/v1/finish_redeem_stable" method="post" summary="Finish stablecoin redemption" %}
{% swagger-description %}
`POST /api/v1/finish_redeem_stable`

 allows you to finish a previously requested 

`redeem_stable`

 operation.

\




\


This endpoint returns an unsigned Ethereum transaction payload. You can sign this transaction yourself and send to the network, or broadcast using any custodian API that supports signing a raw Tx payload.
{% endswagger-description %}

{% swagger-parameter in="header" name="Authentication" type="string" %}
Anchor client key.
{% endswagger-parameter %}

{% swagger-response status="200" description="finsish_redeem_stable unsigned Tx hash." %}
```
{
    "success": true,
    "tx_hash": "0x......",
    "action": "anchor/finish_redeem_stable"
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

{% swagger baseUrl="https://eth-api.anchorprotocol.com" path="/api/v1/redeem_stable_status" method="get" summary="Check stablecoin redemption status" %}
{% swagger-description %}
`GET /api/v1/redeem_stable_status`

 allows you to check the status of an ongoing 

`redeem_stable`

 operation.

\




\


You may want to periodically check the progress of your 

`redeem_stable`

 request, since an operation may take up to minutes to finish due to congestion on either side of the networks.

\




\


Note that status being 

`"finished"`

 does 

**NOT**

 mean you have run a full cycle of 

`redeem_stable`

 operation; you still need to send another transaction from 

`POST /api/v1/finish_redeem_stable`

 to finalize your operation.This endpoint responds with HTTP 204 when there is no ongoing operation.
{% endswagger-description %}

{% swagger-parameter in="header" name="Authentication" type="string" %}
Anchor client access key.
{% endswagger-parameter %}

{% swagger-response status="200" description="Current status of ongoing redeem_stable operation." %}
```
{
    // Phase
    // 0 - (Ethereum) wrapper contract has received aTerra tokens (e.g. aUST) and 
    //     dispatched through Shuttle
    // 1 - (Terra) terra-side client account has received aTerra tokens
    //     triggering RedeemStable soon
    // 2 - (Terra) RedeemStable action is processed and stablecoins (e.g. UST) have
    //     been received
    // 3 - (Terra) stablecoins are sent to the ether-side wrapper contract
    //     through Shuttle
    // 4 - (Ethereum) contract has received stablecoins; operation finished
    "phase": 0,

    // LastUpdated
    // Unix timestamp at which the last update to this response has been made
    "last_updated": 1608662606,

    // Status
    // Operation status
    // pending   - operation in flight
    // failed    - operation failed; last known tx has been recorded
    // finished  - operation finished; you can call /finish_redeem_stable
    "status": "pending",

    // UnderlyingDenom
    // Underlying denomination of aTerra tokens to be redeemed
    "underlying_denom": "uusd", 

    // aTerraAmount
    // amount of aTerra tokens to be redeemed
    "a_terra_amount": :20000000:,

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

{% swagger-response status="204" description="No ongoing redeem_stable operation." %}
```
{
    "status": "idle"
}
```
{% endswagger-response %}
{% endswagger %}
