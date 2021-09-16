# AuthZ

The authz (message authorization) module allows users to authorize another account to send messages on their behalf. Certain authorizations such as the spending of another account's tokens, can be parameterized to constrain the permissions of the grantee (like setting a spending limit). 

## Message Types

### MsgGrantAuthorization

```go
// MsgGrantAuthorization grants the provided authorization to the grantee on the granter's
// account during the provided period time
type MsgGrantAuthorization struct {
	Granter       sdk.AccAddress `json:"granter"`
	Grantee       sdk.AccAddress `json:"grantee"`
	Authorization Authorization  `json:"authorization"`
	Period        time.Duration  `json:"period"`
}
```

::: details JSON Example

```json
{
  "type": "authz/MsgGrantAuthorization",
  "value": {
    "granter": "terra...",
    "grantee": "terra...",
    "authorization": {
      "type": "authz/SendAuthorization",
      "value": {
        "spend_limit": [
          {
            "denom": "ukrw",
            "amount": "999"
          }
        ]
      }
    },
    "period": "123908000000000"
  }
}
```

:::

::: details Events

| Type                | Attribute Key | Attribute Value     |
| ------------------- | ------------- | ------------------- |
| grant_authorization | grant_type    | {msgType}           |
| grant_authorization | granter       | {granterAddress}    |
| grant_authorization | grantee       | {granteeAddress}    |
| message             | module        | authz             |
| message             | action        | grant_authorization |
| message             | sender        | {senderAddress}     |

:::

### MsgRevokeAuthorization

```go
// MsgRevokeAuthorization revokes any authorization with the provided sdk.Msg type on the
// granter's account with that has been granted to the grantee
type MsgRevokeAuthorization struct {
	Granter sdk.AccAddress `json:"granter"`
	Grantee sdk.AccAddress `json:"grantee"`
	// AuthorizationMsgType is the type of sdk.Msg that the revoked Authorization refers to.
	// i.e. this is what `Authorization.MsgType()` returns
	AuthorizationMsgType string `json:"authorization_msg_type"`
}
```

::: details JSON Example

```json
{
  "type": "authz/MsgRevokeAuthorization",
  "value": {
    "granter": "terra...",
    "grantee": "terra...",
    "authorization_msg_type": "swap"
  }
}
```

:::

::: details Events

| Type                 | Attribute Key | Attribute Value      |
| -------------------- | ------------- | -------------------- |
| revoke_authorization | grant_type    | {msgType}            |
| revoke_authorization | granter       | {granterAddress}     |
| revoke_authorization | grantee       | {granteeAddress}     |
| message              | module        | authz                |
| message              | action        | revoke_authorization |
| message              | sender        | {senderAddress}      |

:::

### MsgExecAuthorized

```go
// MsgExecAuthorized attempts to execute the provided messages using
// authorizations granted to the grantee. Each message should have only
// one signer corresponding to the granter of the authorization.
type MsgExecAuthorized struct {
	Grantee sdk.AccAddress `json:"grantee"`
	Msgs    []sdk.Msg      `json:"msgs"`
}
```

::: details JSON Example

```json
{
  "type": "authz/MsgExecAuthorized",
  "value": {
    "grantee": "terra...",
    "msgs": [
      {
        "type": "bank/MsgSend",
        "value": {
          "from_address": "terra...",
          "to_address": "terra...",
          "amount": [
            {
              "denom": "ukrw",
              "amount": "999"
            }
          ]
        }
      }
    ]
  }
}
```

:::

::: details Events

| Type                  | Attribute Key   | Attribute Value       |
| --------------------- | --------------- | --------------------- |
| execute_authorization | grantee_address | {granteeAddress}      |
| message               | module          | authz               |
| message               | action          | execute_authorization |
| message               | sender          | {senderAddress}       |

:::
