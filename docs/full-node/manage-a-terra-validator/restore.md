# Restore a validator

A validator can be completely restored on a new Terra node with the following set of keys:

- The Consensus key, stored in `~/.terra/config/priv_validator.json`
- The mnemonic to the validator wallet
- The mnemonic to the oracle feeder wallet

::: {danger}
Before proceeding, ensure that the existing validator is not active. Double voting has severe slashing consequences.
:::

To restore a validator:

1. Setup a full Terra node synced up to the latest block.
2. Replace the `~/.terra/config/priv_validator.json` file of the new node with the associated file from the old node, then restart your node.
3. Set up the [price and oracle feeders](set-up-oracle-feeder.md).