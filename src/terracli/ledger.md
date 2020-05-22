# Ledger Wallet

Hardware wallets are considered very secure for the storage of a user’s private keys in the blockchain world. Your digital assets are safe even when using an infected (or untrusted) PC. Follow these instructions to interact with the Terra blockchain using a Ledger Nano device.

## Setup

### Requirements

- You have [initialized your Ledger Nano S](https://support.ledgerwallet.com/hc/en-us/articles/360000613793)
- The latest firmware is [installed](https://support.ledger.com/hc/en-us/articles/360002731113-Update-Ledger-Nano-S-firmware)
- Ledger Live is [ready to use](https://support.ledger.com/hc/en-us/articles/360006395233-Take-your-first-steps)
- Google Chrome is installed.

### Install Terra app on Ledger Live

::: danger
To do this, it is preferable to use a brand new ledger device as there can be only one mnemonic per ledger device.

If, however, you want to use a ledger that is already initialized with a seed, you can reset it by going in `Settings`>`Device`>`Reset All`.

**Please note that this will wipe out the seed currently stored on the device.** > **If you have not properly secured the associated mnemonic, you could lose your funds!**
:::

1. Open the **Manager** in Ledger Live.
2. Connect and unlock your Ledger Nano S.
3. If asked, allow the manager on your device by pressing the right button.
4. Find **Terra** in the app catalog.
5. Click the Install button of the app.
6. An installation window appears.
7. Your device will display **Processing…**
8. The app installation is confirmed.

## Usage

::: warning NOTE
Your ledger device must be on and the Terra ledger app must be in the foreground to perform the following actions.
:::

### Generate a Key

### View account balance

You can [use `terracli` to view the account balance](node-terracli.md#query-account-balance), using the key created in the above step.

### Receiving tokens

Run `terracli keys show <yourAccountName> -d` to see the account address at which to receive tokens. You will be asked to confirm that the intended receiving address (matching `<yourAccountName>`) matches the account registered on the ledger. If the two addresses match, press the right button to confirm, and offer the address to the sender. If they do not match, press the left button to reject.

### Sending tokens

1. You can [use `terracli` to send tokens](node-terracli.md#send-tokens), using the key created in the above step.
2. You will be asked to confirm the details of the transaction. Before confirming, check that the destination address on the Ledger display matches your intended destination address.
