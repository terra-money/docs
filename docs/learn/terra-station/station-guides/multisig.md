# Multisig wallet

Multisig wallets are an advanced feature of Terra Station. If you’re using Terra Station for the first time, follow the [Terra Station tutorial](../download/terra-station-desktop.md).

Multisig wallets enable a wallet to be controlled by multiple parties, with each transaction requiring signatures from all owners of the wallet.

## Prerequisites

- Download the [Terra Station browser extension](../download/terra-station-extension.md)
- More than one existing Terra Station wallets with transaction histories.

## Create a multisig wallet

1. Open the Terra Station browser extension and click **New multisig wallet**.

2. Enter the wallet addresses of each multisig user in the correct order.

   :::{caution}
   Each wallet added must have a transaction history of at least one transaction before it can be added to a multisig wallet.
   :::

3. Enter the amount of signatures needed to post a transaction in the **Threshold** field.

4. Click **Submit**.

5. Enter a wallet name and click **Submit**.



# Create a multisig tx (for multisig wallet manager)

1. Open the Terra Station browser extension and connect to your multisig wallet.

- Connect to the extension with the multisig wallet made above
- Try tx as usual through Station, Anchor, Mirror, etc
- If you try to post this tx, you will see encoded string
- Copy this encoded string and send it to all participants (It is not sensitive information, but a simple description of tx, so a general messenger can be used.)

# Sign a multisig tx (for multisig wallet participants)
- Extension > Manage wallet (3 dots) > Sign a multisig tx
- Enter the address of the multisig wallet and paste the tx received above
- If you sign with a password or ledger device, a signature is displayed on the screen
- Copy this string and send it back to the multisig wallet manager

# Post a multisig tx (for multisig wallet manager)
- Extension > Manage wallet (3 dots) > Post a multisig tx
- Enter the wallet address, initially created tx(encoded string), and signatures received from the participants
- Post
