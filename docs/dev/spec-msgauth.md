# MsgAuth

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
  "type": "msgauth/MsgGrantAuthorization",
  "value": {
    "granter": "terra...",
    "grantee": "terra...",
    "authorization": {
      "type": "msgauth/SendAuthorization",
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
  "type": "msgauth/MsgRevokeAuthorization",
  "value": {
    "granter": "terra...",
    "grantee": "terra...",
    "authorization_msg_type": "swap"
  }
}
```

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
  "type": "msgauth/MsgExecAuthorized",
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
