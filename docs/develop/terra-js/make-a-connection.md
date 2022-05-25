# Make a connection

Users can interact with the blockchain by using the following modes:

- Querying data
- Broadcasting a transaction

## Connect to a chain

To perform these actions, connect to the blockchain by using an `LCDClient` object, which represents a connection to a node running the light client daemon (LCD). The LCD serves as a RESTful API over HTTP. Terra.js abstracts away the details of making raw API calls and provide an interface with which you can work.

```ts
import { LCDClient } from "@terra-money/terra.js";

const terra = new LCDClient({
  URL: "https://lcd.terra.dev",
  chainID: "phoenix-1",
});
```
