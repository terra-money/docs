# Multisig Transactions

Multisig transactions require signatures of multiple private keys. Thus, generating and signing a transaction from a multisig account involve cooperation among the parties involved. A multisig transaction can be initiated by any of the key holders, and at least one of them would need to import other parties' public keys into their Keybase and generate a multisig public key in order to finalize and broadcast the transaction.

For example, given a multisig key comprising the keys `p1`, `p2`, and `p3`, each of which is held by a distinct party, the user holding `p1` would require to import both `p2` and `p3` in order to generate the multisig account public key:

```text
terracli keys add \
  p2 \
  --pubkey=terrapub1addwnpepqtd28uwa0yxtwal5223qqr5aqf5y57tc7kk7z8qd4zplrdlk5ez5kdnlrj4

terracli keys add \
  p3 \
  --pubkey=terrapub1addwnpepqgj04jpm9wrdml5qnss9kjxkmxzywuklnkj0g3a3f8l5wx9z4ennz84ym5t

terracli keys add \
  p1p2p3 \
  --multisig-threshold=2 \
  --multisig=p1,p2,p3
```

A new multisig public key `p1p2p3` has been stored, and its address will be used as signer of multisig transactions:

```bash
terracli keys show --address p1p2p3
```

You may also view multisig threshold, pubkey constituents and respective weights by viewing the JSON output of the key or passing the `--show-multisig` flag:

```bash
terracli keys show p1p2p3 -o json

terracli keys show p1p2p3 --show-multisig
```

The first step to create a multisig transaction is to initiate it on behalf of the multisig address created above:

```bash
terracli tx send terra1570v2fq3twt0f0x02vhxpuzc9jc4yl30q2qned 10uluna \
  --from=<multisig_address> \
  --generate-only > unsignedTx.json
```

The file `unsignedTx.json` contains the unsigned transaction encoded in JSON. `p1` can now sign the transaction with its own private key:

```bash
terracli tx sign \
  unsignedTx.json \
  --multisig=<multisig_address> \
  --from=p1 \
  --output-document=p1signature.json \
  --chain-id=<chain_id>
```

Once the signature is generated, `p1` transmits both `unsignedTx.json` and `p1signature.json` to `p2` or `p3`, which in turn will generate their respective signature:

```bash
terracli tx sign \
  unsignedTx.json \
  --multisig=<multisig_address> \
  --from=p2 \
  --output-document=p2signature.json \
  --chain-id=<chain_id>
```

`p1p2p3` is a 2-of-3 multisig key, therefore one additional signature is sufficient. Any the key holders can now generate the multisig transaction by combining the required signature files:

```bash
terracli tx multisign \
  unsignedTx.json \
  p1p2p3 \
  p1signature.json p2signature.json \
  --output-document=signedTx.json \
  --chain-id=<chain_id>
```

The transaction can now be sent to the node:

```bash
terracli tx broadcast signedTx.json \
  --chain-id=<chain_id>
```
