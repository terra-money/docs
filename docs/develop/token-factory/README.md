# Build a CW20 Tokens Factory  

This tutorial describes how to build a CW20 Tokens factory. 
To begin, learn what CW20 Tokens factory is,
and then get started building.
 
# What is a CW20 Tokens Factory?

A CW20 Tokens Factory is a Terra DApp that mints, burns, tracks 
and increases the supply of custom
[CW20](https://docs.rs/crate/cw20/0.2.3)-compatible tokens.
The DApp is created using Terrain, and has the following structure:

```
.
├── contracts              # contract source code directory
│   ├── cw20-factory-token # defines cw20-compatible token with custom logic 
│   └── token-factory      # mints, burns, tracks, and increases supply of tokens
├── frontend               # frontend application
├── lib                    # predefined functions for task and console
├── tasks                  # predefined tasks
├── keys.terrain.js        # keys for signing transacitons
├── config.terrain.json    # configuration for connections and contract deployments
└── refs.terrain.json      # deployed code and contract references
```

# Getting Started

To get started building the CW20 Token Factory,
complete each section listed below:

 ```{toctree}
 :maxdepth: 2
 setup
 modify-cw20
 create-token-contract
 ```
