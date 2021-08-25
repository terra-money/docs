# Security Practices

Each validator candidate is encouraged to run its operations independently. Diverse individual setups increase the resilience of the network.

## HSM Key Management

Key management is mission critical for validators. If an attacker gains access to a validator's private key, it puts the validator's entire delegated stake at risk. Hardware security modules are an important strategy for mitigating this risk.

The suggested method of key management is described by Iqulusion here: https://github.com/iqlusioninc/tmkms

## Sentry Nodes for Anti-DDoS

Validators are responsible for ensuring that the network can defend against denial of service attacks.

Validators can mitigate these attacks by carefully structuring their network topology in a sentry node architecture.

Validator nodes should only connect to full-nodes they trust. They can be run by the same validator or other validators they know. A validator node will typically run in a data center. Most data centers provide direct links to major cloud providers. A validator can use these links to connect to sentry nodes in the cloud. This shifts the burden of denial-of-service from the validator's node directly to its sentry nodes. This may require new sentry nodes to be spun up or activated to mitigate attacks on existing ones.

Sentry nodes can be quickly spun up or used to change IP addresses. Because links to the sentry nodes are in private IP space, an internet based attack can't disturb them directly. This will ensure a validator's block proposals and votes always make it to the rest of the network.

For more on sentry node architecture, see [this](https://forum.cosmos.network/t/sentry-node-architecture-overview/454).

To setup your sentry node architecture you can follow the instructions below:

Validators nodes should edit their `config.toml`:

```bash
# Comma separated list of nodes to keep persistent connections to
# Do not add private peers to this list if you don't want them advertised
persistent_peers =[list of sentry nodes]

# Set true to enable the peer-exchange reactor
pex = false
```

Sentry Nodes should edit their `config.toml`:

```bash
# Comma separated list of peer IDs to keep private (will not be gossiped to other peers)
private_peer_ids = "ipaddress of validator nodes"
```

## Environment Variables

By default, uppercase environment variables with the following prefixes will replace lowercase command-line flags:

- `TE` \(for Terra flags\)
- `TM` \(for Tendermint flags\)
- `BC` \(for democli or basecli flags\)

**Example:** The environment variable `TE_CHAIN_ID` will map to the command line flag `--chain-id`. While explicit command-line flags will take precedence over environment variables, environment variables will take precedence over any of your configuration files. For this reason, it's imperative that you lock down your environment so that any critical parameters are defined as flags on the CLI, or that you prevent modification of any environment variables.
