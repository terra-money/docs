# MsgAuth

## Query

### All Grants

```sh
terracli query msgauth grants <granter-addr> <grantee-addr>
```

### Grant by Message Type

```sh
terracli query msgauth grant <granter-addr> <grantee-addr> <msg-type>
```

## Transaction

### Grant new authorization

```sh
terracli tx msgauth grant <grantee-address> <msg-type>
```

### Revoke authorization

```sh
terracli tx msgauth revoke <grantee-address> <msg-type>
```

### Execute TX on behalf of granter

```sh
terracli tx msgauth send-as <granter-address> <tx.json> --from <grantee>
```

- `<tx.json>` is a JSON file with StdTx
- `<grantee>` is the key for the account with authorization
