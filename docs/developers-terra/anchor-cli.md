# AnchorCLI

`anchorcli` is a command-line interface for Anchor Protocol on Terra and allows more advanced users to perform operations directly from their shell or terminal without having to interact with a graphical interface. `anchorcli` is built on top of `terracli` and allows you to use keys saved in its keychain.

{% hint style="info" %}
This section provides a brief guide on how to interact with Anchor Protocol via `anchorcli`. For further information, please check its [GitHub](https://github.com/Anchor-Protocol/anchorcli) and [Readme](https://www.npmjs.com/package/@anchor-protocol/anchorcli).
{% endhint %}

## Installation

### Requirements

* Node.js 12+
* NPM
* `terracli` in your path

`anchorcli` can be installed through NPM:

```
$ npm install -g @anchor-protocol/anchorcli
```

The entrypoint `anchorcli` should then be available in your `path`:

```
$ anchorcli
        
  Usage: anchorcli [options] [command]

  Command-line interface for interacting with Anchor Protocol on Terra

  Options:
    -V, --version   output the version number
    -v,--verbose    Show verbose error logs
    -h, --help      display help for command

  Commands:
    exec|x          Execute a function on a smart contract
    query|q         Run a smart contract query function
    help [command]  display help for command
```

## Configuration

By default, `anchorcli` works with the default configuration which is set to be for contracts on `bombay-12`. This setting provides the address of contracts and specifies the setting for LCD provider, gas prices for fee estimation. `anchorcli` will create two configuration files in your home directory: `$HOME/anchorcliTestnet.json` and `$HOME/anchorcliMainnet.json`.

### Specifying LCD settings

Each network configuration should define how to connect to the Terra blockchain via LCD parameters.

* `columbus-5`:

```javascript
"lcd": {
    "chainID": "columbus-5",
    "URL": "https://lcd.terra.dev",
    "gasPrices": {
      "uluna": 0.15, // example value 
      "usdr": 0.1018, // example value 
      "uusd": 0.15, // example value  
      "ukrw": 178.05, // example value 
      "umnt": 431.6259 // example value
    },
    "gasAdjustment": 1.2
  },
```

* `bombay-12`:

```javascript
{
  "lcd": {
    "chainID": "bombay-12",
    "URL": "https://bombay-lcd.terra.dev",
    "gasPrices": {
      "uluna": 0.15,
      "usdr": 0.1018,
      "uusd": 0.15,
      "ukrw": 178.05,
      "umnt": 431.6259
    },
    "gasAdjustment": 1.2
  }
}
```

#### Specifying Contracts

Each address configuration should point to the correct Anchor core contract addresses.

* `columbus-5`:

```javascript
"contracts": {
    "bLunaHub": "terra1mtwph2juhj0rvjz7dy92gvl6xvukaxu8rfv8ts",
    "bLunaToken": "terra1kc87mu460fwkqte29rquh4hc20m54fxwtsx7gp",
    "bLunaReward": "terra17yap3mhph35pcwvhza38c2lkj7gzywzy05h7l0",
    "bLunaAirdrop": "terra199t7hg7w5vymehhg834r6799pju2q3a0ya7ae9",
    "mmInterestModel": "terra1kq8zzq5hufas9t0kjsjc62t2kucfnx8txf547n",
    "mmOracle": "terra1cgg6yef7qcdm070qftghfulaxmllgmvk77nc7t",
    "mmMarket": "terra1sepfj7s0aeg5967uxnfk4thzlerrsktkpelm5s",
    "mmOverseer": "terra1tmnqgvg567ypvsvk6rwsga3srp7e3lg6u0elp8",
    "mmCustody": "terra1ptjp2vfjrwh0j0faj9r6katm640kgjxnwwq9kn",
    "mmLiquidation": "terra1w9ky73v4g7v98zzdqpqgf3kjmusnx4d4mvnac6",
    "mmDistributionModel": "terra14mufqpr5mevdfn92p4jchpkxp7xr46uyknqjwq",
    "aTerra": "terra1hzh9vpxhsk8253se0vv5jj6etdvxu3nv8z07zu",
    "terraswapblunaLunaPair": "terra1jxazgm67et0ce260kvrpfv50acuushpjsz2y0p",
    "terraswapblunaLunaLPToken": "terra1nuy34nwnsh53ygpc4xprlj263cztw7vc99leh2",
    "terraswapAncUstPair": "terra1gm5p3ner9x9xpwugn9sp6gvhd0lwrtkyrecdn3",
    "terraswapAncUstLPToken": "terra1gecs98vcuktyfkrve9czrpgtg0m3aq586x6gzm",
    "gov": "terra1f32xyep306hhcxxxf7mlyh0ucggc00rm2s9da5",
    "distributor": "terra1mxf7d5updqxfgvchd7lv6575ehhm8qfdttuqzz",
    "collector": "terra14ku9pgw5ld90dexlyju02u4rn6frheexr5f96h",
    "community": "terra12wk8dey0kffwp27l5ucfumczlsc9aned8rqueg",
    "staking": "terra1897an2xux840p9lrh6py3ryankc6mspw49xse3",
    "ANC": "terra14z56l0fp2lsf86zy3hty2z47ezkhnthtr9yq76",
    "airdrop": "terra146ahqn6d3qgdvmj8cj96hh03dzmeedhsf0kxqm",
    "investor_vesting": "terra1pm54pmw3ej0vfwn3gtn6cdmaqxt0x37e9jt0za",
    "team_vesting": "terra10evq9zxk2m86n3n3xnpw28jpqwp628c6dzuq42"
  }
```

* `bombay-12`:

```javascript
{
   "contracts": {
     "bLunaHub": "terra1fflas6wv4snv8lsda9knvq2w0cyt493r8puh2e",
     "bLunaToken": "terra1u0t35drzyy0mujj8rkdyzhe264uls4ug3wdp3x",
     "bLunaReward": "terra1ac24j6pdxh53czqyrkr6ygphdeftg7u3958tl2",
     "bLunaAirdrop": "terra1334h20c9ewxguw9p9vdxzmr8994qj4qu77ux6q",
     "mmInterestModel": "terra1m25aqupscdw2kw4tnq5ql6hexgr34mr76azh5x",
     "mmOracle": "terra1p4gg3p2ue6qy2qfuxtrmgv2ec3f4jmgqtazum8",
     "mmMarket": "terra15dwd5mj8v59wpj0wvt233mf5efdff808c5tkal",
     "mmOverseer": "terra1qljxd0y3j3gk97025qvl3lgq8ygup4gsksvaxv",
     "mmCustody": "terra1ltnkx0mv7lf2rca9f8w740ashu93ujughy4s7p",
     "mmLiquidation": "terra16vc4v9hhntswzkuunqhncs9yy30mqql3gxlqfe",
     "mmDistributionModel": "terra1u64cezah94sq3ye8y0ung28x3pxc37tv8fth7h",
     "aTerra": "terra1ajt556dpzvjwl0kl5tzku3fc3p3knkg9mkv8jl",
     "terraswapblunaLunaPair": "terra13e4jmcjnwrauvl2fnjdwex0exuzd8zrh5xk29v",
     "terraswapblunaLunaLPToken": "terra1tj4pavqjqjfm0wh73sh7yy9m4uq3m2cpmgva6n",
     "terraswapAncUstPair": "terra1wfvczps2865j0awnurk9m04u7wdmd6qv3fdnvz",
     "terraswapAncUstLPToken": "terra1vg0qyq92ky9z9dp0j9fv5rmr2s80sg605dah6f",
     "gov": "terra16ckeuu7c6ggu52a8se005mg5c0kd2kmuun63cu",
     "distributor": "terra1z7nxemcnm8kp7fs33cs7ge4wfuld307v80gypj",
     "collector": "terra1hlctcrrhcl2azxzcsns467le876cfuzam6jty4",
     "community": "terra17g577z0pqt6tejhceh06y3lyeudfs3v90mzduy",
     "staking": "terra19nxz35c8f7t3ghdxrxherym20tux8eccar0c3k",
     "ANC": "terra1747mad58h0w4y589y3sk84r5efqdev9q4r02pc",
     "airdrop": "terra1u5ywhlve3wugzqslqvm8ks2j0nsvrqjx0mgxpk",
     "investor_vesting": "not available in testnet",
     "team_vesting": "not available in testnet"
   }
}
```

#### Specifying the Network \[IMPORTANT]

By default, `anchorcli` will use the network setting for `columbus-5` configured in `$HOME/anchorcliMainnet.json`. You can direct `anchorcli` to use a different network configuration by changing the value of the `ANCHORCLI_NETWORK` environment variable.

**Example**

```
ANCHORCLI_NETWORK=bombay-12 anchorcli x basset-hub bond ...
```

OR

```
export ANCHORCLI_NETWORK=bombay-12
anchorcli x basset-hub bond ...
```

## Usage

`anchorcli` allows you to:

* [**execute**](https://github.com/Anchor-Protocol/anchorcli#execute) state-changing functions on Anchor smart contracts
* [**query**](https://github.com/Anchor-Protocol/anchorcli#query) read-only data endpoints on Anchor smart contracts

### Execute

**USAGE: `anchorcli exec|x [options] [command]`**

```
Execute a function on a smart contract

Options:
  --yaml                         Encode result as YAML instead of JSON
  -y,--yes                       Sign transaction without confirming (yes)
  --home <string>                Directory for config of terracli
  --from <key-name>              *Name of key in terracli keyring
  --generate-only                Build an unsigned transaction and write it to stdout
  -G,--generate-msg              Build an ExecuteMsg (good for including in poll)
  --base64                       For --generate-msg: returns msg as base64
  -b,--broadcast-mode <string>   Transaction broadcasting mode (sync|async|block) (default: sync) (default: "sync")
  --chain-id <string>            Chain ID of Terra node
  -a,--account-number <int>      The account number of the signing account (offline mode)
  -s,--sequence <int>            The sequence number of the signing account (offline mode)
  --memo <string>                Memo to send along with transaction
  --fees <coins>                 Fees to pay along with transaction
  --gas <int|auto>               *Gas limit to set per-transaction; set to "auto" to calculate required gas automatically
  --gas-adjustment <float>       Adjustment factor to be multiplied against the estimate returned by the tx simulation
  --gas-prices <coins>           Gas prices to determine the transaction fee (e.g. 10uluna,12.5ukrw)
  -h, --help                     display help for command

Commands:
  basset-hub [options]        Anchor bAsset Hub contract functions
  basset-reward [options]     Anchor bAsset reward contract functions
  basset-token [options]      Anchor bAsset token contract functions
  liquidation [options]       Anchor Money Market Liquidation contract functions
  oracle [options]            Anchor Money Market Liquidation contract functions
  market [options]            Anchor Money Market Market contract functions
  custody-bluna [options]     Anchor Money Market Custody contract functions
  overseer [options]          Anchor Money Market Overseer contract functions
  interest [options]          Anchor Money Market Interest contract functions
  terraswap [options]         terraswap, anchor related contract functions
  gov [options]               ANC Gov contract functions
  airdrop [options]           Anchor Airdrop contract functions [mainnet only]
  collector [options]         Anchor Collector contract functions
  investor-vesting [options]  Anchor Investor Vesting contract functions
  team-vesting [options]      Anchor Team Vesting contract functions
  staking [options]           Anchor Staking contract functions
  anc [options]               Anchor ANC token contract functions
  aust [options]              Anchor aUST token contract functions
  help [command]              display help for command
```

### Query

**USAGE: `anchorcli query|q [options] [command]`**

```
Run a smart contract query function

Options:
  -h, --help               display help for command

Commands:
  basset-hub [options]     Anchor bAsset hub contract queries
  basset-reward [options]  Anchor bAsset reward contract queries
  basset-token [options]   Anchor bAsset token  contract queries
  liquidation [options]    Anchor Money Market Liquidation contract queries
  oracle [options]         Anchor Money Market Oracle contract queries
  market [options]         Anchor Money Market Market contract queries
  custody-bluna [options]  Anchor Money Market Custody contract queries
  overseer [options]       Anchor Money Market Overseer contract queries
  interest [options]       Anchor Money Market Interest contract queries
  terraswap [options]      Terraswap contract queries
  gov [options]            Anchor Gov contract queries
  airdrop [options]        Anchor Airdrop contract queries [mainnet only]
  collector [options]      Anchor Collector contract queries
  community [options]      Anchor Community contract queries
  distributor [options]    Anchor Distributor contract queries
  staking [options]        Anchor Staking contract queries
  anc [options]            Anchor ANC token contract queries
  aust [options]           Anchor aUST token contract queries
  help [command]           display help for command
```

## Examples

This section illustrates the usage of `anchorcli` through some use cases. All examples assume you have a key in `terracli` keychain called `test1`.

#### Bond Luna to mint bLuna

Anchor protocol requires you to provide bAsset collaterals to borrow Terra stablecoins. bLuna tokens which are whitelisted as an eligible collateral can be used.

In order to obtain bLuna tokens, a user needs to bond Luna first, which then the contract will issue bLuna for the user. The following example is the way a user can bond Luna to gain bLuna (in response to which the contract will issue bLuna for the user):

```
anchorcli x basset-hub bond --amount $BOND_AMOUNT --validator $VALIDATOR_ADDRESS --from test1 --gas auto --fees 100000uluna --b block
```

#### Query bLuna Balance

After bonding your Luna, you can get your bLuna balance with the following query:

```
anchorcli q basset-token balance --address $USER_ADDRESS
```
