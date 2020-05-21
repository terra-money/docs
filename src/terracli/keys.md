# Key Management

## Key Representations

Every Terra account is associated with different key representations, which can be deterministically generated from the account's private key.

### Account Address `terra-`

This is the address you give to others in order to receive funds, e.g. `terra15h6vd5f0wqps26zjlwrc6chah08ryu4hzzdwhc`.

```bash
$ terracli keys show <account_name>
```

### Validator Address `terravaloper-`

This is the address that uniquely identifies a validator and is used to invoke staking commands.

```bash
$ terracli keys show <account_name> --bech=val
```

### Consensus Address `terravalcons-`

Generated when the node is created with `terrad init`, and serves to identify the Tendermint signing key for the node, rather than the operator.

```bash
$ terrad tendermint show-validator
```

## Generate Keys

You'll need an account private and public key pair \(a.k.a. `sk, pk` respectively\) to be able to receive funds, send txs, bond tx, etc.

To generate a new _secp256k1_ key:

```bash
$ terracli keys add <account_name>
```

Next, you will have to create a passphrase to protect the key on disk. The output of the above command will contain a _seed phrase_. It is recommended to save the _seed phrase_ in a safe place so that in case you forget the password, you could eventually regenerate the key from the seed phrase with the following command:

```bash
$ terracli keys add --recover
```

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

View the validator pubkey for your node by typing:

```bash
$ terrad tendermint show-validator
```

Note that this is the Tendermint signing key, _not_ the operator key you will use in delegation transactions.

::: danger
We strongly recommend **NOT** using the same passphrase for multiple keys.
The Terra team is not be responsible for the loss of funds.
:::

### Generate Multisig Public Keys

You can generate and print a multisig public key by typing:

```bash
$ terracli keys add --multisig=name1,name2,name3[...] --multisig-threshold=K new_key_name
```

`K` is the minimum number of private keys that must have signed the transactions that carry the public key's address as signer.

The `--multisig` flag must contain the name of public keys that will be combined into a public key that will be generated and stored as `new_key_name` in the local database. All names supplied through `--multisig` must already exist in the local database. Unless the flag `--nosort` is set, the order in which the keys are supplied on the command line does not matter, i.e. the following commands generate two identical keys:

```bash
$ terracli keys add --multisig=foo,bar,baz --multisig-threshold=2 multisig_address
$ terracli keys add --multisig=baz,foo,bar --multisig-threshold=2 multisig_address
```

Multisig addresses can also be generated on-the-fly and printed through the which command:

```bash
$ terracli keys show --multisig-threshold=K name1 name2 name3 [...]
```

For more information regarding how to generate, sign and broadcast transactions with a multi signature account see [Multisig Transactions](#multisig-transactions).
