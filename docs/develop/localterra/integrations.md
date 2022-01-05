# Integrations

You can integrate LocalTerra in Terra Station, `terrad`, and JavaScript and Python SDKs.

## Terra Station

Terra Station has built-in support for LocalTerra for quick and easy interaction. [Open Station](https://station.terra.money/) and switch to the `Localterra` network.

## terrad

1. Ensure the same version of `terrad` and LocalTerra are installed.

2. Use `terrad` to talk to your LocalTerra `terrad` node:

    ```sh
    $ terrad status
    ```

    This command automatically works because `terrad` connects to `localhost:26657` by default.

    The following command is the explicit form:
    ```sh
    $ terrad status --node=tcp://localhost:26657
    ```

3. Run any `terrad` commands against your LocalTerra network:

   ```sh
   $ terrad query account terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8
   ```

## Terra Python SDK

Connect to the chain through LocalTerra's LCD server:

```python
from terra_sdk.client.lcd import LCDClient
terra = LCDClient("localterra", "http://localhost:1317")
```

## Terra JavaScript SDK

Connect to the chain through LocalTerra's LCD server:

```ts
import { LCDClient } from "@terra-money/terra.js";

const terra = new LCDClient({
  URL: "http://localhost:1317",
  chainID: "localterra",
});
```
