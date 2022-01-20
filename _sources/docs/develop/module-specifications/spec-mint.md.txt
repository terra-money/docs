# Mint

## Concepts

### The minting mechanism

The minting mechanism was designed to:

- Allow for a flexible inflation rate determined by market demand targeting a particular bonded-stake ratio.
- Affect a balance between market liquidity and staked supply.

To best determine the appropriate market rate for inflation rewards, a moving change rate is used. The moving change rate mechanism ensures that if the percentage bonded is either over or under the goal percentage-bonded, the inflation rate will adjust to further incentivize or disincentivize being bonded, respectively. Setting the goal percentage-bonded at less than 100% encourages the network to maintain some non-staked tokens, which helps to provide some liquidity.

It works in the following ways:

- If the inflation rate is below the goal percentage-bonded, the inflation rate increases until a maximum value is reached.
- If the goal percentage-bonded (67% in Cosmos-Hub) is maintained, the inflation rate stays constant.
- If the inflation rate is above the goal percentage-bonded, the inflation rate decreases until a minimum value is reached.

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

### MintDenom

- type: `string`

### InflationRateChange

- type: `sdk.Dec`

### InflationMax

- type: `sdk.Dec`

### InflationMin

- type: `sdk.Dec`

### GoalBonded

- type: `sdk.Dec`

### BlocksPerYear

- type: `uint64`
