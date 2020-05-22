# Ledger Wallet

Hardware wallets are considered very secure for the storage of a user’s private keys in the blockchain world. Your digital assets are safe even when using an infected (or untrusted) PC. Follow these instructions to interact with the Terra blockchain using a Ledger Nano device.

## Usage

::: warning NOTE
Your ledger device must be on and the Terra ledger app must be in the foreground to perform the following actions.
:::

### Generate a Key

Check out [how to add a Ledger key to `terracli`](./keys#with-a-ledger).

### View account balance

You can [use `terracli` to view the account balance](./account#query-account-balance), using the key created in the above step.

### Receiving tokens

Run `terracli keys show <yourAccountName> -d` to see the account address at which to receive tokens. You will be asked to confirm that the intended receiving address (matching `<yourAccountName>`) matches the account registered on the ledger. If the two addresses match, press the right button to confirm, and offer the address to the sender. If they do not match, press the left button to reject.

### Sending tokens

1. You can [use `terracli` to send tokens](node-terracli.md#send-tokens), using the key created in the above step.
2. You will be asked to confirm the details of the transaction. Before confirming, check that the destination address on the Ledger display matches your intended destination address.
