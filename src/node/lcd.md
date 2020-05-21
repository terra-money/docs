# Light Client Daemon

The Light Client Daemon (LCD) is a REST server that enables other applications and services to communicate with your local running `terrad` instance and interact the Terra network through HTTP. To start the LCD, you'll need to specify the following parameters:

| Parameter    | Type   | Default                 | Required | Description                                          |
| ------------ | ------ | ----------------------- | -------- | ---------------------------------------------------- |
| `chain-id`   | string | `""`                    | true     | chain id of the full node to connect                 |
| `node`       | URL    | `tcp://localhost:46657` | true     | address of the full node to connect                  |
| `laddr`      | URL    | `tcp://localhost:1317`  | true     | address for the REST server to listen to requests    |
| `trust-node` | bool   | `false`                 | true     | whether this LCD is connected to a trusted full node |
| `home`       | path   | `$HOME/.terracli`       | false    | directory for save checkpoints and validator sets    |

For example:

```bash
terracli rest-server --chain-id=test \
    --laddr=tcp://localhost:1317 \
    --node tcp://localhost:26657 \
    --trust-node=false
```

For more information about the Terra REST API endpoints, see the [swagger documentation](https://swagger.terra.money/).
