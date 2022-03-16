# bLuna

This section describes provides a high-level overview of bLuna smart contracts.

{% hint style="warning" %}
Even with a thorough understanding of Anchor Protocol, it is highly recommended to interact with Anchor through client channels such as the Anchor WebApp or [Anchor.js](../../developers-terra/anchor.js.md).
{% endhint %}

## Smart Contracts

| Contract                                                                            | Function                                                                                   |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [Hub](https://docs.terra.lido.fi/contracts/hub)                                     | Central hub that manages underlying Luna delegation / undelegation                         |
| [Reward](https://docs.terra.lido.fi/contracts/reward)                               | Handles bLuna reward distribution                                                          |
| [Rewards Dispatcher](https://docs.terra.lido.fi/contracts/rewards\_dispatcher)      | Accumulates rewards of Hub's delegations and manages them                                  |
| [Validators Registry](https://docs.terra.lido.fi/contracts/validators\_registry)    | Stores the list of whitelisted validators                                                  |
| [Airdrop Registry](broken-reference)                                                | Stores contract interfaces for claiming and swapping tokens airdropped to Luna delegations |
| [Tokens: bLuna and stLuna](https://docs.terra.lido.fi/contracts/stLuna\_and\_bLuna) | Modified CW20 token contract for handling token balances                                   |

```{toctree}
:hidden:
Hub <https://lidofinance.github.io/terra-docs/contracts/hub>
Reward <https://docs.terra.lido.fi/contracts/reward>
Rewards Dispatcher <https://docs.terra.lido.fi/contracts/rewards\_dispatcher>
Airdrop Registry <https://docs.terra.lido.fi/contracts/airdrop-registry>
Tokens: bLuna and stLuna <https://docs.terra.lido.fi/contracts/stLuna\_and\_bLuna>
```