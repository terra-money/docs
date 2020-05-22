# Key Management

Every Terra account is associated with different key representations, which can be deterministically generated from the account's private key.

### Account Address `terra-`

This is the address you give to others in order to receive funds, e.g. `terra15h6vd5f0wqps26zjlwrc6chah08ryu4hzzdwhc`.

```bash
$ terracli keys show <account_name>
```

### Validator Address `terravaloper-`

This is the address that uniquely identifies a validator and is used to invoke staking commands. Each account address has a corresponding validator address, and vice-versa.

```bash
$ terracli keys show <account_name> --bech=val
```

### Consensus Address `terravalcons-`

The consensus address is generated when the node is created with `terrad init`, and serves to identify the Tendermint signing key for the node, NOT the operator (account holder).

```bash
$ terrad tendermint show-validator
```

## Generate Keys

You'll need an account private and public key pair \(a.k.a. `sk, pk` respectively\) to be able to receive funds, send funds, creating bonding transactions, etc.

::: tip
It is more secure to perform this action on an offline computer.
:::

To generate an account, just use the following command:

```bash
$ terracli keys add <yourKeyName>
```

- `<yourKeyName>` is the name of the account. It is a reference to the account number used to derive the key pair from the mnemonic. You will use this name to identify your account when you want to send a transaction.
- You can add the optional `--account` flag to specify the path \(`0`, `1`, `2`, ...\) you want to use to generate your account. By default, account `0` is generated.

The command will generate a 24-words mnemonic and save the private and public keys for account `0` at the same time. You will be prompted to input a passphrase that is used to encrypt the private key of account `0` on disk. Each time you want to send a transaction, this password will be required. If you lose the password, you can always recover the private key with the mnemonic.

::: danger
Do not lose or share your 24 words with anyone.

To prevent theft or loss of funds, it is best to ensure that you keep multiple copies of your mnemonic, and store it in a safe, secure place and that only you know how to access.

If someone is able to gain access to your mnemonic, they will be able to gain access to your private keys and control the accounts associated with them.
:::

::: tip
After you have secured your mnemonic \(triple check!\), you can delete bash history to ensure no one can retrieve it.

```bash
$ history -c
$ rm ~/.bash_history
```

:::

You can generate more accounts from the same mnemonic using the following command:

```bash
$ terracli keys add <yourKeyName> --recover --account 1
```

This command will prompt you to input a passphrase as well as your mnemonic. Change the account number to generate a different account.

If you check your private keys, you'll now see `<account_name>`:

```bash
$ terracli keys show <account_name>
```

View the validator operator's address via:

```bash
$ terracli keys show <account_name> --bech=val
```

You can see all your available keys by typing:

```bash
$ terracli keys list
```

::: danger
We strongly recommend **NOT** using the same passphrase for multiple keys.
The Terra team is not be responsible for the loss of funds.
:::

## Generate Keys (Ledger)

You can use the Ledger Nano S hardware wallet to store your Terra account private keys, which is considered a more secure option because the keys are kept off connected devices. The process for using a hardware wallet with `terracli` is similar to creating a normal key, except a Ledger key delegate account information displaying and signing operations to a connected Ledger hardware device instead of a encrypted key stored on the machine.

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

::: warning IMPORTANT
Only use Ledger devices that you bought factory new or trust fully.
:::

1. Open the **Manager** in Ledger Live.

2. Connect and unlock your Ledger Nano S.

3. If asked, allow the manager on your device by pressing the right button.

4. Find **Terra** in the app catalog.

5. Click the Install button of the app.

6. An installation window appears.

7. Your device will display **Processing…**

8. The app installation is confirmed.

### Create a Ledger Key on terracli

When you initialize your ledger, a 24-word mnemonic is generated and stored in the device. This mnemonic is compatible with Terra and Terra accounts can be derived from it. Therefore, all you have to do is make your ledger compatible with `terracli`. To learn more about how to set up your ledger for usage with Terra, head [here](./ledger).

The process is similar to the process with a computer; use the following command:

```bash
$ terracli keys add <yourAccountName> --ledger
```

::: warning NOTE
This command will only work while the Ledger is plugged in and unlocked.
:::

This will create a key that will defer to the Ledger Hardware Wallet when being used to query account information or signing transaction. The key is not stored on the computer and is used only as a handler for the Ledger.

## Recovering Keys

If you have the mnemonic used to generate your private key, you can recover it and re-register your key. Issuing the following command will prompt you to enter your 24-word secret mnemonic phrase.

```
$ terracli keys add <yourKeyName> --recover
```

## Generate Multisig Keys

You can generate and print a multisig public key by typing:

```bash
$ terracli keys add --multisig=name1,name2,name3[...] --multisig-threshold=K new_key_name
```

`K` is the minimum number of private keys that must have signed the transactions that carry the public key's address as signer.

The `--multisig` flag must contain the name of public keys that will be combined into a public key that will be generated and stored as `new_key_name` in the local database. All names supplied through `--multisig` must already exist in the local database.

Unless the flag `--nosort` is set, the order in which the keys are supplied on the command line does not matter, i.e. the following commands generate two identical keys:

```bash
$ terracli keys add --multisig=foo,bar,baz --multisig-threshold=2 multisig_address
$ terracli keys add --multisig=baz,foo,bar --multisig-threshold=2 multisig_address
```

Multisig addresses can also be generated on-the-fly and printed through the which command:

```bash
$ terracli keys show --multisig-threshold=K name1 name2 name3 [...]
```

For more information regarding how to generate, sign and broadcast transactions with a multi signature account see [Multisig Transactions](./multisig).
