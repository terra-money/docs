# Exchange migration guide
Use this guide to rebrand the original Terra chain as Terra Classic and integrate the new Terra chain. 

## General info

Per [governance proposal 1623](https://station.terra.money/proposal/1623), a new chain will be created and will assume the Terra name. 

1\. The original chain will still function and be re-branded as **Terra Classic**. 
- The original Cosmos chain will still run, with market swaps (mint/burn function) disabled. 
- All balances will remain as they are.
- Luna will become Luna Classic (LUNC).
- Terra stablecoins (UST, KRT, EUT, etc.) will remain. 


2\. The new chain will be called **Terra**, and will assume all Terra branding assets.
- The new chain is also a Cosmos chain, but will not have the treasury, oracle, or market modules of the original chain. 
- The new chain's native mining token will be Luna. 
- There will be no Terra stablecoins (UST, KRT, EUT, etc.) on the new chain.

## Branding

The original chain will be branded **Terra Classic**. The new chain will assume the name **Terra**. 

### Naming convention:

**Terra Classic**

The original Terra chain will be rebranded as Terra Classic.

- Official chain name: Terra Classic
- All Luna currently on exchanges needs to be renamed Luna Classic (LUNC). 
- All Terra stablecoins will retain their original naming convention: TerraUSD(UST) 

**Terra**:

The new chain will assume the name Terra. 

- Official chain name: Terra
- Luna (LUNA) will be the main staking asset of the chain.
- The new chain does not contain any Terra stablecoins (UST, KRT, etc.).

### Logos and assets

Please update all logos and branding according to the following conventions. 

**Terra Classic**:

The old chain will be rebranded using Terra Classic brand assets, including new logos for both LUNC and UST. You will need to remove all current Logos from the original chain and implement the Terra Classic brand assets on your exchange.  

You can download these assets using the link below:

- [TerraLunaClassic-logos.ai](../../_static/brand-assets/TerraLunaClassic-logos.ai)

**Terra**:

The new chain will assume the original assets of the Terra brand.   

You can download these assets using the links below:

- [Terra_LOGO.ai](../../_static/brand-assets/Terra_LOGO.ai)  
- [Terra  logos](../../_static/brand-assets/Terra.zip)  
- [Luna logos](../../_static/brand-assets/Luna.zip)  

## Mainnet launch schedule

- 05/21 - The new Terra Core release is cut, network launch instructions made available for validators
- 05/25 - Essential app developer registration completed
- 05/27 - Genesis file created from final launch snapshot
- 05/27 - Network launch

## Snapshots and Airdrop

***Pre-attack*** snapshot to be taken at Terra Classic block [7544910](https://finder.terra.money/mainnet/blocks/7544910) (2022.05.07 14:00:04 UTC)

***Post-attack*** snapshot to be taken at Terra Classic block [7790000](https://finder.terra.money/mainnet/blocks/7790000) (2022.05.27 08:59:51 UTC)

**Note:** *Post-attack block is estimated for May 27th and may be subject to change.  Calculations described below should be carried out and resulting values should be utilized to properly calculate airdrop quantities.*

All airdrop allocations to UST & LUNA holders will be based on the above snapshots. You may review the exchange-relevant allocations below.  Note that these allocations *exclude* the Community pool allocation of 25% and the pre-attack aUST holders allocation of 10% as they are irrelevant to exchanges.  You may review the original token distribution proposal [here](https://agora.terra.money/t/terra-ecosystem-revival-plan-2-updated-and-final/18498). 

Once normalized, the remaining exchange-relevant allocations are as follows: 

- Pre-attack LUNA holders:
    - 35% allocation * (100 / 65) or ~53.8461%
- Post-attack LUNA holders:
    - 10% allocation * (100 / 65) or ~15.3846%
- Post-attack UST holders:
    - 20% allocation * (100 / 65) or ~30.7692%

**Exchange Allocation Example**:

Exchange receives a total of 100 LUNA in the airdrop.

- Pre-attack LUNA holders receive a total of ~53.8461 LUNA (53.8461% of total).
    - Calculation: 35 * (100 / 65)
- Post-attack LUNA holders receive a total of ~15.3846 LUNA (15.3846% of total).
    - Calculation: 10 * (100 / 65)
- Post-attack UST holders receive a total of ~30.7692 LUNA (30.7692% of total).
    - Calculation: 20 * (100 / 65)

53.8461 + 15.3846 + 30.7692 **≈** 100 LUNA

## Multisig guide

For questions regarding multisig wallets, refer to the [multisig guide](../develop/guides/sign-with-multisig.md).

## Token standards

**Terra Classic**:

| Name | Symbol | Signing Algorithm | Curve | Notes |
| --- | --- | --- | --- | --- |
| TerraUSD | UST | ECDSA | secp256k1 |  |
| LUNA Classic | LUNC | ECDSA | secp256k1 |  |

**Terra**:

| Name | Symbol | Signing Algorithm | Curve | Notes |
| --- | --- | --- | --- | --- |
| LUNA | LUNA | ECDSA | secp256k1 |  |

## Base pairs

Exchanges:

- LUNC/USDT
- USTC/USDT

Dexes:

- LUNC/ETH
- LUNC/USDC

## Integration

**Terra Classic**:

To continue supporting Luna Classic (LUNC), the Terra Classic LCD address needs to be altered to [https://](https://class.lcd.terra.dev)classic.lcd.terra.dev

**Terra**:

The current primary LCD endpoint ([https://lcd.terra.dev](https://lcd.terra.dev)) will support the new Terra chain when it’s launched on 05/27. This should make integration with the new Terra chain seamless. 