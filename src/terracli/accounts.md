# Account

## Get Tokens

The best way to get tokens is from the [Terra Testnet Faucet](https://faucet.terra.money).

## Query Account Balance

After receiving tokens to your address, you can view your account's balance by typing:

```bash
terracli query account <account_terra>
```

> When you query an account balance with zero tokens, you will get this error:
>
> `No account with address <account_terra> was found in the state`.
>
> This can also happen if you fund the account before your node has fully synced with the chain.
> Both cases are to be expected.
> {important}

## Send Tokens

The following command could be used to send coins from one account to another:

```bash
terracli tx send \
  <from_key_or_address> \
  <to_address> \
  <coins> \
  --chain-id=<chain_id> \
```

where `to_address` is a key matching the format: `terra1dp0taj85ruc299rkdvzp4z5pfg6z6swaed74e6`

> The `<coins>` paramter is of the format `<value|coin_name>`.
>
> The `<from_key_or_address>` accepts both the key name and the address as the value, but only accepts > addresses when the `--generate-only` flag is used.
> {important}

> You may want to cap the maximum gas that can be consumed by the transaction via the `--gas` flag.
>
> If you pass `--gas=auto`, the gas will be automatically estimated before executing the transaction.
>
> Gas estimate might be inaccurate as state changes could occur in between the end of the simulation and the actual execution of a transaction, thus an adjustment is applied on top of the original estimate in order to ensure the transaction is broadcasted successfully.
>
> The adjustment can be controlled via the `--gas-adjustment` flag, whose default value is 1.0.
> {tip}

Now, view the updated balances of the origin and destination accounts:

```bash
terracli query account <account_terra>
terracli query account <destination_terra>
```

You can also check your balance at a given block by using the `--height` flag:

```bash
terracli query account <account_terra> --height=<block_height>
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

Furthermore, you can build a transaction and print its JSON format to STDOUT by appending `--generate-only` to the list of the command line arguments:

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
