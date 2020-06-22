# Account

## Get Tokens

The best way to get tokens is from the [Terra Testnet Faucet](https://faucet.terra.money).

## Query Account Balance

After receiving tokens to your address, you can view your account's balance by typing:

```bash
terracli query account <terra-account>
```

Where `<terra-account>` is your [Account Address](keys.md#account-address-terra).

::: warning NOTE
When you query an account balance with zero tokens, you will get this error:

`No account with address <terra-account> was found in the state`.

This can also happen if you fund the account before your node has fully synced with the chain.
Both cases are to be expected.
:::

## Send Tokens

The following command is used to send coins from one account to another:

```bash
terracli tx send \
    <from_key_or_address> \
    <to_address> \
    <coins> \
    --chain-id=<chain_id> \
```

where `to_address` is an account address.

The `<coins>` parameter is a comma-separated list of coins specified as `<value><coin_denom>`. For instance, `1000usdr` or `1000uluna,1000usdr`.

The `<from_key_or_address>` parameter accepts either the key name or the address as possible values, but will only accept addresses when the `--generate-only` flag is used.

Now, view the updated balances of the sender and recipient accounts:

```bash
terracli query account <sender-account>
terracli query account <recipient-account>
```

You can also check your balance at a given block by using the `--height` flag:

```bash
terracli query account <sender-account> --height=<block-height>
```

You can simulate a transaction without actually broadcasting it by appending the `--dry-run` flag to the command line:

```bash
terracli tx send \
    <from_key_or_address> \
    <to_address> \
    <coins> \
    --chain-id=<chain_id> \
    --dry-run
```

Furthermore, you can build a transaction and print its JSON format to STDOUT by appending `--generate-only` to the list of the command line arguments. This allows you to separate the creation and signing of a transaction with the broadcasting.

```bash
terracli tx send \
    <from_key_or_address> \
    <to_address> \
    <coins> \
    --chain-id=<chain_id> \
    --generate-only > unsignedSendTx.json
```

```bash
terracli tx sign \
    --chain-id=<chain_id> \
    --from=<key_name> \
    unsignedSendTx.json > signedSendTx.json
```

You can validate the transaction's signatures by typing the following:

```bash
terracli tx sign --validate-signatures signedSendTx.json
```

You can broadcast the signed transaction to a node by providing the JSON file to the following command:

```bash
terracli tx broadcast --node=<node> signedSendTx.json
```
