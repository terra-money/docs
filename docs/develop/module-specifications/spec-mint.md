# Mint

:::{Important}
Terra's mint module inherits from the Cosmos SDK's [`mint`](https://docs.cosmos.network/master/modules/mint/) module. This document is a stub and covers mainly important Terra-specific notes about how it is used.
:::

The mint module is in charge of the creation of new Luna through minting. At the begining of every block, new Luna is released by the mint module and sent to 


## Parameters

The subspace for the Mint module is `mint`.

```go
type Params struct {
	// type of coin to mint
	MintDenom string `protobuf:"bytes,1,opt,name=mint_denom,json=mintDenom,proto3" json:"mint_denom,omitempty"`
	// maximum annual change in inflation rate
	InflationRateChange github_com_cosmos_cosmos_sdk_types.Dec `protobuf:"bytes,2,opt,name=inflation_rate_change,json=inflationRateChange,proto3,customtype=github.com/cosmos/cosmos-sdk/types.Dec" json:"inflation_rate_change" yaml:"inflation_rate_change"`
	// maximum inflation rate
	InflationMax github_com_cosmos_cosmos_sdk_types.Dec `protobuf:"bytes,3,opt,name=inflation_max,json=inflationMax,proto3,customtype=github.com/cosmos/cosmos-sdk/types.Dec" json:"inflation_max" yaml:"inflation_max"`
	// minimum inflation rate
	InflationMin github_com_cosmos_cosmos_sdk_types.Dec `protobuf:"bytes,4,opt,name=inflation_min,json=inflationMin,proto3,customtype=github.com/cosmos/cosmos-sdk/types.Dec" json:"inflation_min" yaml:"inflation_min"`
	// goal of percent bonded atoms
	GoalBonded github_com_cosmos_cosmos_sdk_types.Dec `protobuf:"bytes,5,opt,name=goal_bonded,json=goalBonded,proto3,customtype=github.com/cosmos/cosmos-sdk/types.Dec" json:"goal_bonded" yaml:"goal_bonded"`
	// expected blocks per year
	BlocksPerYear uint64 `protobuf:"varint,6,opt,name=blocks_per_year,json=blocksPerYear,proto3" json:"blocks_per_year,omitempty" yaml:"blocks_per_year"`
}
```
## Parameters:

The genesis parameters for the mint module outlined in the [Genesis Builder Script](https://github.com/terra-money/genesis-tools/blob/main/src/genesis_builder.py#L112) are as follows:

```py
    # Mint: set mint params
    genesis['app_state']['mint'] = {
        'minter': {
            'inflation': '0.070000000000000000',
            'annual_provisions': '0.000000000000000000'
        },
        'params': {
            'mint_denom': DENOM_LUNA,
            'inflation_rate_change': '0.000000000000000000',
            'inflation_max': '0.070000000000000000',
            'inflation_min': '0.070000000000000000',
            'goal_bonded': '0.670000000000000000',
            'blocks_per_year': '4360000'
        }
    }
```