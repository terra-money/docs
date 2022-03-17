# bETH

This section describes a high-level overview of Terra-side bETH smart contracts.

::: {warning}
Even with a thorough understanding of Anchor Protocol, it is highly recommended to interact with Anchor through client channels such as the Anchor WebApp or [Anchor.js](../../developers-terra/anchor.js.md).
:::

## Smart Contracts

| Contract                  | Function                                                                     |
| ------------------------- | ---------------------------------------------------------------------------- |
| [Reward](reward.md)       | Manages bETH reward distribution                                             |
| [Token](token.md)         | Handles bETH balances of users                                               |
| [Converter](converter.md) | Converts between Wormhole wrapped tokens and Anchor collateral bAsset tokens |

```{toctree}
:hidden:
reward
token
converter
```