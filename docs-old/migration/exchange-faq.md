# Terra Migration FAQ

This is a list of frequently asked questions. It will evolve as new questions arise. 

:::{contents}
:local:
:::

## Airdrop

### Is bonded LUNA included in the post-attack LUNA snapshot?

Yes, along with liquid staking derivatives.

### What are the heights for calculating the airdrop?

The pre-attack snapshot is taken at block 7544910 of the Terra Classic chain. 

The post-attack snapshot will be taken at Terra Classic block 7790000. It is recommended that you take your internal exchange snapshot at that height. 

### Does the Luna amount of the new chain drop the initialization amount at height 1?

 Yes, the airdrop will be at block height `1` of the new chain. 

 ### Where can I find out more about the airdrop?

 Visit the [airdrop section of the About Terra page](../learn/protocol.md#luna-airdrop-distribution). 

## Vesting

### How does vesting work?

For general information on vesting, visit the [vesting overview](../learn/protocol.md#vesting).

For a more in-depth look at vesting, visit the [vesting page](../develop/vesting.md).

### How can I see my Luna that is still locked in vesting?

You can view your vesting Luna in Terra Station by using the [Vesting guide](../learn/terra-station/vesting.md).

### Is my vesting Luna staked?

All vesting Luna was [staked](../learn/glossary.md#staking) at genesis. 

### Can I redelegate my vesting Luna?

Even though Luna that is vesting is locked and can't be freely traded, it can still be staked to generate [staking rewards](../learn/protocol.md#rewards). Users are free to [delegate, redelegate, or undelegate](../learn/protocol.md#redelegation) their vesting Luna as they see fit. 

### How can I see how much Luna I was airdropped in total, including vesting?

You can query your account to calculate your total airdrop: 

$$ Unlocked\:at\:genesis + Original\:vesting\:at\:genesis = Total\:airdrop\:amount $$

You can see your unlocked and vesting Luna amounts by searching your address in [Terra Finder](https://finder.terra.money). 

You can also view your vesting Luna buy querying the LCD using the following URL format:

```
https://phoenix-lcd.terra.dev/cosmos/auth/v1beta1/accounts/<insert-your-Terra-address-here>
```


For example, for this address: https://phoenix-lcd.terra.dev/cosmos/auth/v1beta1/accounts/terra18mkcha20h5psry3nn9jlsdkz66cm0u9c7p5dmv

- The delegated_vesting is `375063631513`

- The unlocked bank balance is `160741556363`

```
375063631513 + 160741556363  = 535805187876 (The original total airdrop amount.)
```

### How can I calculate my original vesting?

You can query your account to calculate your original vesting: 

$$ Total\:airdrop\:amount - Unlocked\:at\:genesis = Original\:vesting\:at\:genesis$$

You can see your unlocked and vesting Luna amounts by searching your address in [Terra Finder](https://finder.terra.money). 

### How can I view my spendable (unlocked) Luna?

Use the following LCD query structure to view your account's spendable balance: 

```
https://phoenix-lcd.terra.dev/cosmos/bank/v1beta1/spendable_balances/<insert-your-terra-account-address-here>
```

You can also view your vesting Luna buy querying the LCD using the following URL format:

```
https://phoenix-lcd.terra.dev/cosmos/auth/v1beta1/accounts/<insert-your-Terra-address-here>
```

## Txs

### Is there any change in the offline transaction construction function?

No changes. if you are using the old tx format, the only thing you need to do is change the “bank/MsgSend” to “cosmos-sdk/MsgSend”.

### Is there any change to the broadcast interface for Terra Classic or Terra 2.0?

No, the broadcast interface is the same.  

### Has the transaction structure changed?

No, the transaction structure remains unchanged. 

### Is there any change in the calculation of the handling fee?

No, but you may need to check the new gas prices. 

## Addresses and accounts

### Are the chain address formats the same for both chains?

Yes, the address format is the same. The same address will be generated from the same seed on both chains. 

### Are there any changes to the address formats?

Yes, Wasm tx types need to be `cosmwasm.wasm.v1.MsgExecuteContract`.

Wasm contract address lengths have changed. For more info, please check here: https://github.com/terra-money/core/blob/main/WASM_MIGRATE.md#contract-address.

### Do account numbers need to be reset?

Yes, they do. 

### What are the contract addresses for LUNA and LUNC?

Neither LUNA nor LUNC will have contract addresses because they are both native. 

## Block and heights

### Is there any change in the block structure?

No, there are no changes to the block structure. 

###  What block height does the terra classic chain start at?

Terra classic is the same currently active original chain. The block height will be left unaltered. 

### What height does the new chain start at?

The new Terra 2.0 chain will start from a height of `1`.

### Can you clarify the differences between the block and transaction parsing logics of classic vs new Luna?

There will be no changes, except that `MsgTypes` will change from `terra.wasm.v1beta1.MsgExecuteContract` to `cosmwasm.wasm.v1.MsgExecuteContract` for the new chain. 

## Upgrades 

### Does Terra.js need to be upgraded?

Yes, there will be a new release of Terra.js. However, the interface will not change significantly.
For more information, see [](../develop/terra-js/terra-classic.md). 

### Are there any changes to the API interface?

No, there will be no change to the API interface. 

### Will there be an LUNC node upgrade release on 05/27?

There will be no upgrades released for the Luna Classic (LUNC) node. Only the new 2.0 chain will have a node release. 

## Luna and tokens

### Can the initial Luna balance of an address be resolved through the genesis file?

Yes. Use the following lcd endpoint with your address:   

```sh
/cosmos/bank/v1beta1/balances/{address}
```

You can also check the genesis file. See this example for more info: https://github.com/terra-money/testnet/tree/main/pisco-1

### Will The new chain use micro-denominations? 

Yes, the new chain will use micro-denominations, such as `uluna`. 

### Will the new chain still support other tokens, such as ANC?

It is up to each team. Each token team will have to relaunch the token to the new chain with a snapshot.

## Multisig 

### I want to ignore multisig txs, could you share a mainnet example of this?

- New format:
https://phoenix-lcd.terra.dev/cosmos/tx/v1beta1/txs/136825A738053AC6B7E8D03FB1C43696BA560AD9A8D5DB8AE49C55642CE64310

- Old format:
https://phoenix-lcd.terra.dev/txs/136825A738053AC6B7E8D03FB1C43696BA560AD9A8D5DB8AE49C55642CE64310

Please visit https://docs.terra.money/docs/develop/guides/sign-with-multisig.html for more info. 

### How do I get the "threshold number of signatures"?

Use the following: https://phoenix-lcd.terra.dev/cosmos/auth/v1beta1/accounts/terra14g48gms0zr29wufgyvz5smh8enaes9dh3rxxjh

### Is the "@type" of multisig tx always "bank/MsgSend"?

Yes. The only difference is the signature format. 

