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
- [Terra logos](../../_static/brand-assets/Terra.zip)
- [Luna logos](../../_static/brand-assets/Luna.zip)

## Mainnet launch schedule

- 05/21 - The new Terra Core release is cut, network launch instructions made available for validators
- 05/25 - Essential app developer registration completed
- 05/27 - Genesis file created from final launch snapshot
- 05/27 - Network launch

## Snapshots and Airdrop

**_Pre-attack_** snapshot to be taken at Terra Classic block [7544910](https://finder.terra.money/mainnet/blocks/7544910) (2022.05.07 14:00:04 UTC)

**_Post-attack_** snapshot to be taken at Terra Classic block [7790000](https://finder.terra.money/mainnet/blocks/7790000) (2022.05.27 08:59:51 UTC)

**Note:** _Post-attack block is estimated for May 27th and may be subject to change. Calculations described below should be carried out and resulting values should be utilized to properly calculate airdrop quantities._

### Airdrop allocations

All airdrop allocations to UST & LUNA holders will be based on the above snapshots. You may review the exchange-relevant allocations below. Note that these allocations _excludes_ the Community pool allocation of 25% as it is irrelevant to exchanges. You may review the original token distribution text proposal [here](https://agora.terra.money/t/terra-ecosystem-revival-plan-2-updated-and-final/18498).

### Exchange Allocation Example

The following is an example token allocation using dummy numbers. It considers both pre and post-attack snapshots. Note, these example allocation calculations disregard tokens held in wallets owned by Terraform Labs.

---

**Total LUNA Airdrop Supply : 1 Billion**

---

_Overall Assets in Terra Ecosystem_

| Assets in Terra |  Snapshot   | Amount |
| --------------- | :---------: | -----: |
| LUNA            | pre-attack  |     1B |
| aUST            | pre-attack  |     1B |
| LUNA            | post-attack |     1B |
| UST             | post-attack |     1B |

---

_Exchange Assets_

| Asset Owned by Exchange |  Snapshot   | Amount |
| ----------------------- | :---------: | -----: |
| LUNA                    | pre-attack  |    10M |
| aUST                    | pre-attack  |   100M |
| LUNA                    | post-attack |    10M |
| UST                     | post-attack |   100M |

---

_Exchange User Assets_

| Asset Owned by Exchange User |  Snapshot   | Amount |
| ---------------------------- | :---------: | -----: |
| LUNA                         | pre-attack  |    100 |
| aUST                         | pre-attack  |    10k |
| LUNA                         | post-attack |    100 |
| UST                          | post-attack |    10k |

---

**Airdrop Calculation for Exchange**

**_Pre-attack LUNA holders 35% allocation (350 M)_**

```math
35% * Total LUNA Supply * Total LUNA owned by Exchange pre-attack / Total LUNA supply pre-attack

= 0.35 x 1B x 10M / 1B

= 3.5M LUNA
```

**_Pre-attack aUST holders : 10% allocation (100 M)_**

```math
10% x Total LUNA Supply x Total aUST owned by Exchange pre-attack / Total aUST supply pre-attack

= 0.1 x 1B x 100M / 1B

= 10M LUNA
```

**_Post-attack LUNA holders : 10% allocation (100 M)_**

```math
10% x Total LUNA Supply x Total LUNA owned by Exchange post-attack / Total LUNA supply post-attack

= 0.1 x 1B x 10M / 1B

= 1M LUNA
```

**_Post-attack UST holders : 20% allocation (200 M)_**

```math
10% x Total LUNA Supply x Total UST owned by Exchange post-attack / Total UST supply post-attack

= 0.2 x 1B x 100M / 1B

= 20M LUNA
```

**Total Exchange Allocation**

```math
= 3.5M + 10M + 1M + 20M

= 34.5M LUNA
```

---

**Airdrop Calculation for User A**

**Pre-attack LUNA holders allocation : 3.5M**

```math
(Total LUNA owned by User A pre-attack / Total LUNA owned by Exchange pre-attack) x Pre-attack LUNA holders allocation

= (100 / 10M) x 3.5M

= 35 LUNA
```

**Pre-attack aUST holders allocation: 10M**

```math
(Total aUST owned by User A pre-attack / Total aUST owned by Exchange pre-attack) x Pre-attack aUST holders allocation

= (10k / 100M) x 10M

= 1000 LUNA
```

**Post-attack LUNA holders allocation: 1M**

```math
(Total LUNA owned by User A post-attack / Total LUNA owned by Exchange post-attack) x Post-attack LUNA holders allocation

= (100 / 10M) x 1M

= 10 LUNA
```

**Post-attack UST holders allocation: 20M**

```math
(Total UST owned by User A post-attack / Total UST owned by Exchange post-attack) x Post-attack UST holders allocation

= (10k / 100M) x 20M

= 2000 LUNA
```

**Total Allocation to User A**

```math
 = 35 + 1000 + 10 + 2000

 = 3045 LUNA
```

## Multisig guide

For questions regarding multisig wallets, refer to the [multisig guide](../develop/guides/sign-with-multisig.md).

## Base pairs

Exchanges:

- LUNC/USDT
- UST/USDT

Dexes:

- LUNC/ETH
- LUNC/USDC

## Integration

**Terra Classic**:

To continue supporting Luna Classic (LUNC), the Terra Classic LCD address needs to be altered to `https://classic.lcd.terra.dev`, and `https://classic.fcd.terra.dev` for FCD.

**Terra**:

The current primary LCD ([https://lcd.terra.dev](https://lcd.terra.dev)) and FCD ([https://fcd.terra.dev](https://fcd.terra.dev)) endpoints will support the new Terra chain when it’s launched on 05/27. This should make integration with the new Terra chain seamless.
