hey Jason! Hope all's well.. i was wondering if you think it's a good idea to stick something like this little explanation of who's who in "configure general settings" section.

```bash
~/.terra/config
│-- addrbook.json                   # a registry of peers to connect to
│-- app.toml                        # terrad configuration file
│-- client.toml                     #  ?
│-- config.toml                     # Tendermint configuration  file
│-- genesis.json                    # gensesis transactions
└─── gentx
     └ gentx-9dd77b79daf841e0bbb4306e93d4b01c7cdf3997.json # ?
│-- node_key.json                   # ?
└-- priv_validator_key.json         # ?
```

- https://docs.terra.money/Reference/terrad/commands.html#collect-gentxs what are genesis transactions? i.e. what's in the `gentx` folder and can there be more than one file in it? Why?
- what is the client.toml file a config for?
- what's the difference between priv_validator_key.json and node_key.json?



# Glossary: 

rosetta
prometheus
addressbook
genesis block


# General comments:

- the addressbooks are somewhat different between mainnent and testnet, right?
- make the guide more streamlined:
  - take out the system/hardware requirements and put in front
  - put "additional info/optional configs" in the end





