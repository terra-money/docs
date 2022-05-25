# Validator migration guide

Follow this guide to become a validator on the Terra 2.0 chain. This guide walks you through making a `gentx` file that will be added to the validator chain. All validators that want to be included in the Terra 2.0 chain must follow these steps. 

## Networks

- Terra 2.0 testnet: `pisco-1`
- Terra 2.0 mainnet: `phoenix-1`

## Prerequisites

- [Terra Core](https://github.com/terra-money/new-core)
- [Go 1.18+](https://go.dev/dl/)
- Be in the genesis set of validators
- Generate a NEW Terravaloper Address and submit a [PR here](https://github.com/terra-money/validator-profiles/blob/master/new-addresses.csv)
## Initial setup

In order to create a `gentx`, ensure you have fulfilled all the prerequisites.

1. Install [Go 1.18+ from the official site](https://go.dev/dl/). Ensure that your `GOPATH` and `GOBIN` environment variables are properly set up by using the following commands:

   For Windows:

   ```sh
   wget <https://golang.org/dl/go1.18.1.linux-amd64.tar.gz>
   sudo tar -C /usr/local -xzf go1.18.1.linux-amd64.tar.gz
   export PATH=$PATH:/usr/local/go/bin
   export PATH=$PATH:$(go env GOPATH)/bin
   ```

   For Mac:

   ```sh
   export PATH=$PATH:/usr/local/go/bin
   export PATH=$PATH:$(go env GOPATH)/bin
   ```

2. Confirm your Go installation by checking the version:

   ```sh
   go version
   ```

3. Clone and enter the Terra 2.0 Core repo:

   ```sh
   git clone https://github.com/terra-money/core.git
   cd core
   ```

## Install The Terra 2.0 Core

Once in your Terra 2.0 Core directory, you can begin the process of creating a new validator. All validators wanting to launch on the Terra 2.0 chain must run the following commands to create the JSON information for their validator. These commands will generate the validator ID, commission rate, initial balance, stake, etc. This info must be developed off-chain first so it can be included in the Terra 2.0 genesis. 

1. Install The Terra Core by running the following:

   ```sh
   make install
   ```

2. Check version:

   ```sh
   terrad version
   ```

## Create `gentx`

For a full explanation of the gentx command, run `terrad gentx` in your terminal.

1. Run the following command to initialize your validator on the Terra 2.0 chain. The `moniker-name` is your local moniker, and the `chain-id` is the chain you will be joining (`phoenix-1`).

   ```sh
   terrad init <MONIKER-NAME> --chain-id phoenix-1
   ```

2. Add a key for your validator. <br/>

   ```sh
   terrad keys add <KEY-NAME>
   ```

   A successful key generation will look like the following:

   ```sh
   - name: main
   type: local
   address: wasm1y02p5nfxh9jh048fpgjw4h4wzur6yd2zer3fhv
   pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"AoYrbHzn0FfwC+RWdewEdDNiE0itZdY/nJKZFiekU+4B"}'
   mnemonic: ""

   **Important** write this mnemonic phrase in a safe place.
   It is the only way to recover your account if you ever forget your password.

   chalk coach spoil shine lobster just off repeat latin aware scene thing divorce nurse gain pencil nothing walnut salmon fruit razor aim boring pasta
   ```

   :::{admonition} Write down your mnemonic
   :class: danger
   Never store your mnemonic phrase on a digital device. Always write down your mnemonic using a pen and paper. Verify your mnemonic before proceeding. 
   :::

4. Create a validator within the pre-genesis with the following command. In the `gentx` you will chose how much of your balance will be self-staked to your validator. A minimum of 1 unit must be self-staked. 

   ```sh
   terrad gentx <KEY-NAME> 1000000000ustake --chain-id=spoon-1
   ```
   
   If you want to add more information, run the following instead:

   ```sh
   terrad gentx <KEY-NAME> \
   1000000000ustake \ #stake amount in uUnits
   --chain-id=<chainID> \ #The network chain ID
   --commission-max-change-rate string \  #The maximum commission change rate percentage (per day)
   --commission-max-rate string \ #The maximum commission rate percentage
   --commission-rate string \ #The initial commission rate percentage
   --details string \ #The validator's (optional) details
   --website string  #The validator's (optional) website
   ```

   Run `terrad gentx` for all flags and details.

## Upload `gentx`

After completing any changes to your `gentx` file, the json must be uploaded to the genesis file Github repo and approved. Your file will be reviewed and turned into the genesis file, which is projected to be completed on May 27th. 

## After May 27th

Once the official genesis file has been uploaded, download the approved Terra 2.0 genesis file:

1. Run the following:

   ```sh
   curl -s  [REPLACE https://gist.githubusercontent.com/octalmage/b546eb74a0ae2852a759a0990b8beaad/raw/6f2a2d2f27a957ef4b018a0f82f812f0be37bfcc/genesis.json >~/.terrad/config/genesis.json]
   ```

2. Download the [peers list]().

3. Set up as a [service](https://docs.terra.money/docs/full-node/run-a-full-terra-node/set-up-production.html).

4. Start your validator by running the following:

   ```sh
   terrad start
   ```

