# Migrating dapps from Terra Classic to Terra 2.0

Terra 2.0 will be starting from a blank state when it comes to CosmWasm. This means no existing code IDs or smart contracts will be migrated.  

CosmWasm smart contracts will need to be uploaded to the new chain and instantiated. 

In addition to needing to re-deploy smart contracts there are some breaking changes developers should be aware of. 

1. No UST or other native stablecoins (KRT, SDT, etc).

Terra 2.0 has removed all native stablecoins. Any logic that accepts, queries, or sends stablecoins will need to be removed or updated. 

TODO: Offer suggestions, like bridging USDC from Axelar. 

2. No stablecoin tax queries to the treasury module.

Terra 2.0 has removed the treasury module. Any queries to the treasury module to query the TaxRate or TaxCap will now fail. Without the native stablecoins this logic isn't necessary, so it can be removed. 

3. No market module.

Any attempts to swap Luna for UST or other stablecoins through the market module will now fail. Specifically the `market/MsgSwap` message has been removed.

TODO: Suggest using a dex instead.

4. No oracle module.

Terra 2.0 has removed the oracle module. Any queries to fetch ExchangeRates from the oracle module will now fail.

TODO: Suggest using an oracle provider like Band which will [work over IBC](https://docs.bandchain.org/client-library/protocol-buffers/oracle-module.html).

## Examples
