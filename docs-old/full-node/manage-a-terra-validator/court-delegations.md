# Court delegations

Consider the following options to help improve your visibility and make yourself known to potential delegators.

## Set up a website

Set up a website so that your delegators can find you. It is recommended that you make a custom section for Terra delegators that instructs them how to delegate Luna tokens.

## Announce yourself on Discord

Join the [Terra Validators Discord](https://discord.com/invite/ERczeGeMEa) channel, and introduce yourself.

## Submit a validator profile

Submit a [Validator Profile](https://github.com/terra-money/validator-profiles) to make it official.

## Put a thumbnail on Terra Station

Create a [Keybase Account](https://keybase.io/) follow the Keybase instructions to set up a PGP key, and upload a profile picture.
For best continuity use the same GitHub account to verify your Keybase, and your [Validator Profile](https://github.com/terra-money/validator-profiles)

Now link your Keybase profile to your validator. Open your validator terminal and execute this command:

```bash
terrad tx staking edit-validator \
    --identity="keybase identity"
```
