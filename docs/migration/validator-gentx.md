# Validator migration guide

Follow this guide to become a validator on the new Terra chain. This guide will walk you through making a gentx file that will be added to the validator chain.

## Prerequisites

<!--- leave a blank line between all headings, blocks, and new paragraphs or lines. -->

- Forked Chain of Terra 2.0
- Go 1.17+

## Initial Set-Up

In order to create a gentx, ensure you have fulfilled all the prerequsites.

1. First, fork the Terra 2.0 chain within your directory of choice and navigate to the Terra2.0 directory.

   ```sh
   git clone [LINK TO TERRA 2.0]
   cd [TERRA 2.0]
   ```

<!--- leave a blank line between numbered list items. -->

2. If Go is not on your local machine, install [Go from the official site](https://go.dev/dl/). Afterwards, set the Go path according to col-5 instructions. Make sure that your `GOPATH` and `GOBIN` environment variables are properly set up.

   If on Windows:

   ```sh
   wget <https://golang.org/dl/go1.17.1.linux-amd64.tar.gz>
   sudo tar -C /usr/local -xzf go1.17.1.linux-amd64.tar.gz
   export PATH=$PATH:/usr/local/go/bin
   export PATH=$PATH:$(go env GOPATH)/bin
   ```

   If on Mac:

   ```sh
   export PATH=$PATH:/usr/local/go/bin
   export PATH=$PATH:$(go env GOPATH)/bin
   ```

3. Check that you properly installed Go by checking the version.
   ```sh
   go version
   ```

## Install Terra 2.0

Once in your Terra 2.0 directory, we can begin the process of creating a new validator. All validators that want to launch chain with Terra 2.0 need to run the following, which will create the JSON information for their validator. It will generate the validator ID, commission rate, initial balance, stake, etc. However, this info must be developed off chain first, so Terra 2.0 can include in genesis.

1. Install Terra by running the following:
   ```sh
   make install
   ```
2. Check version:
   ```sh
   terrad version
   ```

## Create GenTx

For a full explanantion of the gentx command, run `terrad gentx` in your terminal.

1. Initialize validator. (replace MONIKER_NAME)

   ```sh
   terrad init <MONIKER-NAME> --chain-id=[GIVEN BY TERRA]
   ```

   Moniker-Name is your local moniker. Chain-Id is the chain you will be joining.

2. Add a key for your validator. <br/>

   ```sh
   terrad keys add <KEY-NAME>
   ```

   The output will be a seed phrase, address, and public key.

   ```sh
    - name: <KEY-NAME>
     type: local
     address: terra14f8pwd4sjl6xz3d34ct6syy5ws9k6xu7m0dcc3
     pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"A5PgaTFB3/NQMeIES3NpAl93U7Gf/U19gZCGQcIyySrs"}'
     mnemonic: ""
   ```

3. Download the pre-genesis file.
   ```sh
   curl -s  [REPLACE https://gist.githubusercontent.com/octalmage/b546eb74a0ae2852a759a0990b8beaad/raw/ee9817f9b7fcf0205fc0b3dc62220f8f78d1595f/pre-genesis.json] [REPLACE >~/.terrad/config/genesis.json]
   ```
4. Create a validator within the pre-genesis.
   ```sh
   terrad gentx <KEY-NAME> 1000000000ustake --chain-id=spoon-1
   ```
   In the gentx, the validator will chose how much of their balance they will self stake (should be at least 1 unit). If you wish to add more information, you might consider running the following instead:
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

## Edit Your GenTx JSON

If you wish to edit certain values within your genTx before submitting, you can modify your file.

```sh
cat [PATH TO GENTX]
```

Your gentx file will look similar to the following:

```json
{
  "body": {
    "messages": [
      {
        "@type": "/cosmos.staking.v1beta1.MsgCreateValidator",
        "description": {
          "moniker": "terraTestValidator",
          "identity": "",
          "website": "",
          "security_contact": "",
          "details": ""
        },
        "commission": {
          "rate": "0.100000000000000000",
          "max_rate": "0.200000000000000000",
          "max_change_rate": "0.010000000000000000"
        },
        "min_self_delegation": "1",
        "delegator_address": "terra1gzk0hh9a2q8ww7dlezasdfac8jsysn843pslc0",
        "validator_address": "terravaloper1gzk0hh9a2q8ww7dlezasdfac8jsysn84ya9rk4",
        "pubkey": {
          "@type": "/cosmos.crypto.ed25519.PubKey",
          "key": "pXSxbRVvosMyr5j2MyfsD5cMnF5HWweoyQWkxPWX8c8="
        },
        "value": { "denom": "ustake", "amount": "1000000000" }
      }
    ],
    "memo": "bf095c0babb4170104e2e22ed447a1379a10a57a@192.168.1.83:26656",
    "timeout_height": "0",
    "extension_options": [],
    "non_critical_extension_options": []
  },
  "auth_info": {
    "signer_infos": [
      {
        "public_key": {
          "@type": "/cosmos.crypto.secp256k1.PubKey",
          "key": "AtUavwnTnvGS9FAmrSKH5oBjEEdjMmaFen84XxmW57pu"
        },
        "mode_info": { "single": { "mode": "SIGN_MODE_DIRECT" } },
        "sequence": "0"
      }
    ],
    "fee": { "amount": [], "gas_limit": "200000", "payer": "", "granter": "" }
  },
  "signatures": [
    "8WYYuvE5xm6UOUPN5GPPB+UjEkgrZ3v4T5AqCUQZb51WgJYE1hHKZlHaCnfRd76uMDRsyA5g7in/RcVkITz9jg=="
  ]
}
```

You can edit various parts of your file here, such as commision, memo, etc.

## Upload GenTx

After this is completed, the json must be uploaded to the genesis file github repo and approved. The file will be reviewed and turned into the genesis file (projected on the 27th).

## After May 27th

Once official genesis file has been upload, download the approved Terra 2.0 genesis file.

1. Run the following:
   ```sh
   curl -s  [REPLACE https://gist.githubusercontent.com/octalmage/b546eb74a0ae2852a759a0990b8beaad/raw/6f2a2d2f27a957ef4b018a0f82f812f0be37bfcc/genesis.json >~/.terrad/config/genesis.json]
   ```
2. Download the peers list [REPLACE?].

3. Set up as a [service](https://docs.terra.money/docs/full-node/run-a-full-terra-node/set-up-production.html).

4. Start your validator chain by running the following:
   ```sh
   terrad start
   ```
