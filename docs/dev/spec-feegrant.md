# Fee grant

Small 3-4 sentences summary

This module allows accounts to grant fee allowances and to use fees from their accounts. Grantees can execute any transaction without the need to maintain sufficient fees.

## Concepts 

## Message Types

### MsgGrantAllowance

```proto
// MsgGrantAllowance adds permission for Grantee to spend up to Allowance
// of fees from the account of Granter.
message MsgGrantAllowance {
  // granter is the address of the user granting an allowance of their funds.
  string              granter   = 1;

  // grantee is the address of the user being granted an allowance of another user's funds.
  string              grantee   = 2;

  // allowance can be any of basic and filtered fee allowance.
  google.protobuf.Any allowance = 3 [(cosmos_proto.accepts_interface) = "FeeAllowanceI"];
}
```

### MsgRevokeAllowance

```proto
// MsgRevokeAllowance removes any existing Allowance from Granter to Grantee.
message MsgRevokeAllowance {
  // granter is the address of the user granting an allowance of their funds.
  string granter = 1;

  // grantee is the address of the user being granted an allowance of another user's funds.
  string grantee = 2;
}
```

::: details JSON Example

```json
```

:::

::: details Events

| Type                | Attribute Key | Attribute Value     |
| ------------------- | ------------- | ------------------- |
| | | |

:::

