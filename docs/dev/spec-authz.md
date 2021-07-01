# Authorization

::: warning NOTE
Terra's Authorization module inherits from Cosmos SDK's [`distribution`](https://github.com/cosmos/cosmos-sdk/blob/v0.43.0/x/authz/spec/README.md) module. This document is a stub, and covers mainly important Terra-specific notes about how it is used.
:::

The Authorization (authz) module allows users to authorize another account to send messages on their behalf. Certain authorizations such as the spending of another account's tokens, can be parameterized to constrain the permissions of the grantee (like setting a spending limit).

## Message Types

### MsgGrant

```go
// MsgGrant is a request type for Grant method. It declares authorization to the grantee
// on behalf of the granter with the provided expiration time.
type MsgGrant struct {
	Granter string `protobuf:"bytes,1,opt,name=granter,proto3" json:"granter,omitempty"`
	Grantee string `protobuf:"bytes,2,opt,name=grantee,proto3" json:"grantee,omitempty"`
	Grant   Grant  `protobuf:"bytes,3,opt,name=grant,proto3" json:"grant"`
}

// Grant gives permissions to execute
// the provide method with expiration time.
type Grant struct {
  Authorization *types.Any `protobuf:"bytes,1,opt,name=authorization,proto3" json:"authorization,omitempty"`
	Expiration    time.Time  `protobuf:"bytes,2,opt,name=expiration,proto3,stdtime" json:"expiration"`
}

// SendAuthorization allows the grantee to spend up to spend_limit coins from
// the granter's account.
type SendAuthorization struct {
	SpendLimit github_com_cosmos_cosmos_sdk_types.Coins `protobuf:"bytes,1,rep,name=spend_limit,json=spendLimit,proto3,castrepeated=github.com/cosmos/cosmos-sdk/types.Coins" json:"spend_limit"`
}

// GenericAuthorization gives the grantee unrestricted permissions to execute
// the provided method on behalf of the granter's account.
type GenericAuthorization struct {
	// Msg, identified by it's type URL, to grant unrestricted permissions to execute
	Msg string `protobuf:"bytes,1,opt,name=msg,proto3" json:"msg,omitempty"`
}
```

::: details JSON Example

```json
{
  "type": "msgauth/MsgGrantAuthorization",
  "value": {
    "granter": "terra...",
    "grantee": "terra...",
    "grant": {
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
      "expiration": "2022-06-11T07:38:17Z"
      }
    }
  }
}
```

:::

::: details Events

| Type                            | Attribute Key | Attribute Value                |
| ------------------------------- | ------------- | ------------------------------ |
| cosmos.authz.v1beta1.EventGrant | msg_type_url  | {msgTypeURL}                   |
| cosmos.authz.v1beta1.EventGrant | grantee       | {granteeAddress}               |
| cosmos.authz.v1beta1.EventGrant | granter       | {granterAddress}               |
| message                         | module        | authz                          |
| message                         | action        | /cosmos.authz.v1beta1.MsgGrant |
| message                         | sender        | {senderAddress}                |

:::

### MsgRevoke

```go
// MsgRevoke revokes any authorization with the provided sdk.Msg type on the
// granter's account with that has been granted to the grantee.
type MsgRevoke struct {
	Granter sdk.AccAddress `json:"granter"`
	Grantee sdk.AccAddress `json:"grantee"`
	MsgTypeUrl string `json:"authorization_msg_type"`
}
```

::: details JSON Example

```json
{
  "type": "msgauth/MsgRevokeAuthorization",
  "value": {
    "granter": "terra...",
    "grantee": "terra...",
    "msg_type_url": "/cosmos.bank.v1beta1.MsgSend"
  }
}
```

:::

::: details Events

| Type                             | Attribute Key | Attribute Value                   |
| -------------------------------- | ------------- | --------------------------------- |
| cosmos.authz.v1beta1.EventRevoke | msg_type_url  | {msgType}                         |
| cosmos.authz.v1beta1.EventRevoke | granter       | {granterAddress}                  |
| cosmos.authz.v1beta1.EventRevoke | grantee       | {granteeAddress}                  |
| message                          | module        | authz                             |
| message                          | action        | /cosmos.authz.v1beta1.EventRevoke |
| message                          | sender        | {senderAddress}                   |

:::

### MsgExecAuthorized

```go
// MsgExec attempts to execute the provided messages using
// authorizations granted to the grantee. Each message should have only
// one signer corresponding to the granter of the authorization.
type MsgExec struct {
	Grantee string `protobuf:"bytes,1,opt,name=grantee,proto3" json:"grantee,omitempty"`
	// Authorization Msg requests to execute. Each msg must implement Authorization interface
	// The x/authz will try to find a grant matching (msg.signers[0], grantee, MsgTypeURL(msg))
	// triple and validate it.
	Msgs []*types1.Any `protobuf:"bytes,2,rep,name=msgs,proto3" json:"msgs,omitempty"`
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

::: details Events

| Type                  | Attribute Key   | Attribute Value               |
| --------------------- | --------------- | ----------------------------- |
| message               | module          | authz                         |
| message               | action          | /cosmos.authz.v1beta1.MsgExec |
| message               | sender          | {senderAddress}               |

:::
