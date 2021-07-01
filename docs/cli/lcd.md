# Light Client Daemon

::: warning NOTE
The Terra SDKs currently rely on an active connection to a running LCD server. Please set it up if you need a dedicated connection for the SDKs.
:::

The Light Client Daemon (LCD) provides a REST-based adapter for the RPC endpoints, which also helps for decoding the Amino-encoded blockchain data into parseable JSON. This enables apps to communicate with a node through simple HTTP.

To start the LCD, you'll need to enable `api` configuration in `~/.terra/config/app.toml`

For example:

For more information about the Terra REST API endpoints, see the [swagger documentation](https://swagger.terra.money/).
