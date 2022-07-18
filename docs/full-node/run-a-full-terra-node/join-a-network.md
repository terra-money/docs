# Join a network

It is highly recommended that you set up a private local network before joining a public network. This will help you get familiar with the setup process, and provide an environment for testing. The following sections outline this process. If you want to join a public network without setting up a private network, you can skip to [join a public network ](#join-a-public-network).

## Set up a local private network

Validators can set up a private Terra network to become familiar with running a full Terra node before joining a public network.

::: {admonition} LocalTerra
:class: tip
If you are a developer and want to set up a local, WASM-enabled, private testnet for smart contracts, visit [install LocalTerra](../../develop/localterra/README.md).

:::

### Create a single node

The simplest Terra network you can set up is a local testnet with just a single node. In a single-node environment, you have one account and are the only validator signing blocks for your private network.

1. Initialize your genesis file that will bootstrap the network. Replace the following variables with your own information:

   ```bash
     terrad init --chain-id=<testnet-name> <node-moniker>
   ```

2. Generate a Terra account. Replace the variable with your account name:

   ```bash
   terrad keys add <account-name>
   ```

:::{admonition} Get tokens
:class: tip
In order for Terrad to recognize a wallet address, it must contain tokens. For the testnet, use [the faucet](https://faucet.terra.money/) to send Luna to your wallet. If you are on mainnet, send funds from an existing wallet. 1-3 Luna are sufficient for most setup processes.
:::

### Add your account to the genesis

Run the following commands to add your account and set the initial balance:

```bash
terrad add-genesis-account $(terrad keys show <account-name> -a) 100000000uluna
terrad gentx <my-account> 10000000uluna --chain-id=<testnet-name>
terrad collect-gentxs
```

### Start your private Terra network

Run the following command to start your private network:

```bash
terrad start
```

If the private Terra network is set up correctly, your `terrad` node will be running on `tcp://localhost:26656`, listening for incoming transactions, and signing blocks.

## Join a public network

These instructions are for setting up a brand new full node from scratch. You can join a public Terra network, such as the mainnet or testnet, by completing the following steps:

### 1. Select a network

Specify the network you want to join by choosing the corresponding **genesis file** and **seeds**:

| Network     | Type    | Genesis                                                                                           | Addressbook                     |
| :---------- | :------ | :------------------------------------------------------------------------------------------------ | :------------------------------ |
| `phoenix-1` | Mainnet | [Genesis Link](https://phoenix-genesis.s3.us-west-1.amazonaws.com/genesis.json)                   | Addressbook not yet available() |
| `pisco-1`   | Testnet | [Genesis Link](https://raw.githubusercontent.com/terra-money/testnet/master/pisco-1/genesis.json) | Addressbook not yet available() |

:::{admonition} Selecting a network
:class: tip
Note that the versions of the network listed above are the [ latest versions ](https://github.com/terra-money/testnet/tree/master#latest-networks). To find earlier versions, please consult the [networks repo](https://github.com/terra-money/testnet).

:::

### 2. Download genesis file and address book

**Genesis-transaction** specifies the account balances and parameters at the start of the network to use when replaying transactions and syncing.

**Addressbook** lists a selection of peers for your node to dial to in order to discover other nodes in the network. Public address books of peers are made available by the Terra community.

Choose a `testnet` or `mainnet` address type and download the appropriate genesis-transaction and addressbook. Links to these are posted in [Select-a-network](#1-select-a-network).

- For default `terrad` configurations, the `genesis` and `addressbook` files should be placed under `~/.terra/config/genesis.json` and `~/.terra/config/addrbook.json` respectively.

**Example**:

```bash
# Obtain the genesis for the bombay-12 testnet:
wget https://raw.githubusercontent.com/terra-money/testnet/master/bombay-12/genesis.json -I ~/.terra/config/genesis.json

# Obtain the addressbook for the bombay-12 testnet:
wget https://raw.githubusercontent.com/terra-money/testnet/master/bombay-12/addrbook.json -O ~/.terra/config/addrbook.json
```

### 3. `terrad start`

Start the network and check that everything is running smoothly:

```bash
terrad start
terrad status
# It will take a few seconds for terrad to start.
```

:::{dropdown} Healthy Node Status Example

```json
{
  "NodeInfo": {
    "protocol_version": {
      "p2p": "8",
      "block": "11",
      "app": "0"
    },
    "id": "terradocs-id",
    "listen_addr": "tcp://0.0.0.0:26656",
    "network": "bombay-12",
    "version": "0.34.14",
    "channels": "40202122233038606100",
    "moniker": "terradocs",
    "other": {
      "tx_index": "on",
      "rpc_address": "tcp://127.0.0.1:26657"
    }
  },
  "SyncInfo": {
    "latest_block_hash": "19ABCBA90BF3E76A0635E6C961AB2CECC7DB2B1F1338057DB334568128E0776E",
    "latest_app_hash": "8DFE69CF66FBE7ADCDB5B430A0C679C45B6AEBDDAE23835ABDC4ACBC704F7525",
    "latest_block_height": "7333450",
    "latest_block_time": "2022-01-08T05:24:57.383258076Z",
    "earliest_block_hash": "E88E3641A488EBA3D402FC072879C6399AA2CDC7B6CC5A3061E5A64D9FFD3BDE",
    "earliest_app_hash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
    "earliest_block_height": "5900001",
    "earliest_block_time": "2021-09-28T09:00:00Z",
    "catching_up": false
  },
  "ValidatorInfo": {
    "Address": "29E58C21B6612227C9C9BD9E6D4D99897E032572",
    "PubKey": {
      "type": "tendermint/PubKeyEd25519",
      "value": "7cZq+Fp9xU8mZ9xR7q4NpDOX0UicmPC68P/4krCn8Hs="
    },
    "VotingPower": "0"
  }
}
```

:::

Your node is now syncing. This process will take a long time. Make sure you've set it up on a stable connection so this process is not interrupted.

::: {admonition} Sync start times
:class: caution

Nodes take at least an hour to start syncing. This wait time is normal. Before troubleshooting a sync, please wait an hour for the sync to start.
:::

Continue to the [Sync](sync.md) page to find out more about syncing your node.
