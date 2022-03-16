# Getting Market Information

General information about a stablecoin [market](../../protocol/money-market/#depositing-terra-stablecoins) can be retrieved via the below endpoint:

| Endpoint                                                                      | Method | Description                                            |
| ----------------------------------------------------------------------------- | ------ | ------------------------------------------------------ |
| [`stablecoin_info`](getting-market-information.md#get-stablecoin-information) | GET    | Gets information about the specified stablecoin market |

{% hint style="warning" %}
Due to the asynchronous nature of EthAnchor, the actual aTerra exchange rate applied **will be different** to the exchange rate returned by `stablecoin_info`. The expected receive amount calculated using this value **WILL NOT** match the actual receive amount.
{% endhint %}

{% swagger baseUrl="https://eth-api.anchorprotocol.com" path="/api/v1/stablecoin_info/{stable_denom}" method="get" summary="Get stablecoin information" %}
{% swagger-description %}
`GET /api/v1/stablecoin_info/{stable_denom}`

 allows you to query the current status of money market with 

`stable_denom`

 as the quote.
{% endswagger-description %}

{% swagger-parameter in="query" name="stable_denom" type="string" %}
Money market quote stablecoin denom.

\


Example: 

`"uusd"`
{% endswagger-parameter %}

{% swagger-response status="200" description="Money market state successfully retrieved." %}
```
{
    // Denom
    // denom of the stablecoin money market
    “stable_denom”: “uusd”,

    // LiquidTerra
    // liquidTerra is the currently available stablecoin pool size in money market.
    “liquid_terra”: “100000”,

    // ExchangeRate
    // exchange rate between aTerra <> stablecoin (e.g. aUST <> UST)
    “exchange_rate”: “1.0123”,

    // LastUpdated
    // Unix timestamp at which the last update to this response has been made
    "last_updated": 1608710761,
    
    // Current APY
    // Yearly yield on anchor deposits
    "current_apy": "0.19993179664890999"

    // ##################################################
    // # Below fields are borrower-related information. #
    // ##################################################

    // BorrowedTerra
    // Sum of all borrowed liabilities in this money market
    "borrowed_terra": "1000000",

    // UtilizationRatio
    // Ratio between borrowed deposit and total stablecoin deposit  
    "utilization_ratio": "0.5",

    // BorrowInterest
    // Interest rate per block
    "borrow_interest": "0.000000005707763",
}
```
{% endswagger-response %}

{% swagger-response status="404" description="Money market of the provided denom could not be found." %}
```
{
    "error": "money market not found"
}
```
{% endswagger-response %}
{% endswagger %}
