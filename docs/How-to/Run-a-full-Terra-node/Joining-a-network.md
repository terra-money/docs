# Joining a network

As a node operator exercise and for testing purposes it is highly recommeded to start with setting up a local private network before joining the public ones. The following sections outlines this process. You may wish to skip directly to [ joining the public networks ](#joining-a-public-network) section of the guide.

## Set up a local private network

Validators can set up a private Terra network to become familiar with running a Terra full node before joining a public network.

::: tip LocalTerra

If you are a developer and want to set up a local, WASM-enabled private testnet for smart contracts, visit [Download LocalTerra](/Tutorials/Smart-contracts/Set-up-local-environment.html#download-localterra).

:::

### Create a single node

The simplest Terra network you can set up is a local testnet with just a single node. In single-node environment, you have one account, and you are the only validator signing blocks for your private network.

1. Initialize your genesis file that will bootstrap the network. Replace the variables with your own information.

```bash
terrad init --chain-id=<testnet-name> <node-moniker>
```

2. Generate a Terra account. Replace the variable with your account name.

```bash
terrad keys add <account-name>
```

:::tip Get tokens
In order for Terrad to recognize a wallet address it must contain tokens. For the testnet, use [the faucet](https://faucet.terra.money/) to send Luna to your wallet. If you are on mainnet, send funds from an existing wallet. 1-3 luna are sufficient for most setup processes.
:::

### Add your account to the genesis

Run the following commands to add your account and set the initial balance:

```bash
terrad add-genesis-account $(terrad keys show <account-name> -a) 100000000uluna,1000usd
terrad gentx <my-account> 10000000uluna --chain-id=<testnet-name>
terrad collect-gentxs
```

### Start your private Terra network

Run the following command:

```bash
terrad start
```

If the private Terra network is set up correctly, your `terrad` node is running a node on `tcp://localhost:26656`, listening for incoming transactions and signing blocks.

## Joining a public network

These instructions are for setting up a brand new full node from scratch. Join a public Terra network, such as the Columbus mainnet or Bombay testnet, by completing the following steps.


### Pick a Public Network

Specify the network you want to join by choosing the corresponding **genesis file** and **seeds**. 

| Network      | Type | Genesis|Addressbook| 
| :--- | :--- | :--- | :--- |
| `columbus-5` | Mainnet      |[Genesis Link](https://columbus-genesis.s3.ap-northeast-1.amazonaws.com/columbus-5-genesis.json)| [Addressbook Link](https://network.terra.dev/addrbook.json)|
| `bombay-12`  | Testnet      |[Genesis Link](https://raw.githubusercontent.com/terra-money/testnet/master/bombay-12/genesis.json)|[ Addressbook Link ](https://raw.githubusercontent.com/terra-money/testnet/master/bombay-12/addrbook.json)|


:::warning Selecting a network

Note that the versions of the network listed above are the [ latest versions ](https://github.com/terra-money/testnet/tree/master#latest-networks). To find earlier versions, please consults the [networks repo](https://github.com/terra-money/testnet).

:::


### Download the genesis file and the addressbook

- *Genesis-transaction* file specifies the account balances and parameters at the start of the network to use when replaying transactions and syncing.

- *Addressbook* file lists a selection of peers for your node to dial to in order to discover other nodes in the network. Public address-books of peers are made available by the Terra community.


Choose the network type( `testnet`/`mainnet` ) and download the appropriate *genesis-transaction* and *addressbook*. Links to these are posted in the [ table ](#pick-a-public-network) above. Given default `terrad` configuration, the *genesis transaction* and *addressbook* files should be placed under `~/.terra/config/genesis.json` and `~/.terra/config/addrbook.json` respectively.

For example, if you were to pick the  __Bombay-12__ testnet:

```bash
# Obtain the genesis for the bombay-12 testnet
wget https://raw.githubusercontent.com/terra-money/testnet/master/bombay-12/genesis.json -I ~/.terra/config/genesis.json

# Obtain the addressbook for the bombay-12 testnet
wget https://raw.githubusercontent.com/terra-money/testnet/master/bombay-12/addrbook.json -O ~/.terra/config/addrbook.json
```

Start the network and check that everything is running smoothly:

```bash
terrad start
terrad status # it will take a few seconds for terrad to start
```
:::details Expand for a healthy Node Status Example

```json
{
  "NodeInfo": {
    "protocol_version": {
      "p2p"  : "8",
      "block": "11",
      "app"  : "0"
    },
    "id"         : "terradocs-id",
    "listen_addr": "tcp://0.0.0.0:26656",
    "network"    : "bombay-12",
    "version"    : "0.34.14",
    "channels"   : "40202122233038606100",
    "moniker"    : "terradocs",
    "other"      : {
      "tx_index"   : "on",
      "rpc_address": "tcp://127.0.0.1:26657"
    }
  },
  "SyncInfo": {
    "latest_block_hash"    : "19ABCBA90BF3E76A0635E6C961AB2CECC7DB2B1F1338057DB334568128E0776E",
    "latest_app_hash"      : "8DFE69CF66FBE7ADCDB5B430A0C679C45B6AEBDDAE23835ABDC4ACBC704F7525",
    "latest_block_height"  : "7333450",
    "latest_block_time"    : "2022-01-08T05:24:57.383258076Z",
    "earliest_block_hash"  : "E88E3641A488EBA3D402FC072879C6399AA2CDC7B6CC5A3061E5A64D9FFD3BDE",
    "earliest_app_hash"    : "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
    "earliest_block_height": "5900001",
    "earliest_block_time"  : "2021-09-28T09:00:00Z",
    "catching_up"          : false                         
  },
  "ValidatorInfo": {
    "Address": "29E58C21B6612227C9C9BD9E6D4D99897E032572",
    "PubKey" : {
      "type" : "tendermint/PubKeyEd25519",
      "value": "7cZq+Fp9xU8mZ9xR7q4NpDOX0UicmPC68P/4krCn8Hs="
    },
    "VotingPower": "0"
  }
}
```
:::


Synchronization will take a long time, so make sure you've set it up on a stable connection so you can leave while it syncs. 



