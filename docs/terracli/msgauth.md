# MsgAuth

## Query

### All Grants

You can retrieve all existing grants between a granter and a grantee:

```sh
terracli query msgauth grants <granter-addr> <grantee-addr>
```

### Grant by Message Type

You can get the specific grant between a granter and a grantee for a message type.

```sh
terracli query msgauth grant <granter-addr> <grantee-addr> <msg-type>
```

## Transaction

### Grant new authorization

```sh
terracli tx msgauth grant <grantee-address> <msg-type>
```

#### Send Authorization

The "send" authorization can be further constrained by an allowance, specified as a comma-separated list of coins.

```sh
terracli tx msgauth grant terra... send 1000000uluna,10000000ukrw --from <granter>
```

#### Generic Authorization

Other authorizations with no parameters can be issued simply:

```sh
terracli tx msgauth grant terra... swap --from <granter>
```

### Revoke authorization

You can revoke an existing authorization:

```sh
terracli tx msgauth revoke <grantee-address> <msg-type>
```

### Execute TX on behalf of granter

You can exercise a message authorization and execute a transaction:

```sh
terracli tx msgauth send-as <granter-address> <tx_json> --from <grantee>
```

- `tx_json` is a JSON file describing a StdTx
- `grantee` is the key for the account with authorization
