# Light Client Daemon

::: warning NOTE
The Terra SDKs currently rely on an active connection to a running LCD server. Please set it up if you need a dedicated connection for the SDKs.
:::

The Light Client Daemon (LCD) provides a REST-based adapter for the RPC endpoints, which also helps for decoding the Amino-encoded blockchain data into parseable JSON. This enables apps to communicate with a node through simple HTTP.

To start the LCD, you'll need to specify the following parameters

| Parameter    | Default                 | Required | Description                                          |
| ------------ | ----------------------- | -------- | ---------------------------------------------------- |
| `chain-id`   | `""`                    | yes      | chain id of the full node to connect                 |
| `node`       | `tcp://localhost:26657` | yes      | address of the full node to connect                  |
| `laddr`      | `tcp://localhost:1317`  | yes      | address for the REST server to listen to requests    |
| `trust-node` | `false`                 | yes      | whether this LCD is connected to a trusted full node |
| `home`       | `$HOME/.terracli`       | no       | directory for save checkpoints and validator sets    |

For example:

```bash
$ terracli rest-server --chain-id=test \
    --laddr=tcp://localhost:1317 \
    --node tcp://localhost:26657 \
    --trust-node=false
```

For more information about the Terra REST API endpoints, see the [swagger documentation](https://swagger.terra.money/).
