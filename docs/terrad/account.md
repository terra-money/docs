# Account

## Query

### Account Information

After receiving tokens to your address, you can view your account's balance, account number, and sequence number (nonce) by typing:

```bash
terrad query account <terra-account>
```

Where `<terra-account>` is your [Account Address](keys.md#account-address-terra).

::: warning NOTE
When you query an account balance with zero tokens, you will get this error:

`No account with address <terra-account> was found in the state`.

This can also happen if you fund the account before your node has fully synced with the chain.
Both cases are to be expected.
:::

## Transaction

### Send Tokens

The following command is used to send coins from one account to another:

```bash
terrad tx send \
    <from_key_or_address> \
    <to_address> \
    <coins> \
    --chain-id=<chain_id> \
```

where `to_address` is an account address.

The `<coins>` parameter is a comma-separated list of coins specified as `<value><coin_denom>`. For instance, `1000usdr` or `1000uluna,1000usdr`.

The `<from_key_or_address>` parameter accepts either the key name or the address as possible values, but will only accept addresses when the `--generate-only` flag is used.
