# Anchor Token (ANC)

This section describes provides a high-level overview of Anchor Protocol's ANC-relevant contracts.

{% hint style="warning" %}
Even with a thorough understanding of Anchor Protocol, it is highly recommended to interact with Anchor through client channels such as the Anchor WebApp or [Anchor.js](../../developers-terra/anchor.js.md).
{% endhint %}

## Smart Contracts

| Contract                      | Function                                                                       |
| ----------------------------- | ------------------------------------------------------------------------------ |
| [Gov](gov.md)                 | Handles Anchor Governance and reward distribution to ANC stakers               |
| [Staking](staking.md)         | Handles ANC-UST pair LP token staking                                          |
| [Community](community.md)     | Manages ANC community grants                                                   |
| [Collector](collector.md)     | Accumulates protocol fees, converts them to ANC and distributes to ANC stakers |
| [Distributor](distributor.md) | Holds ANC tokens which are to be used as borrower incentives                   |

```{toctree}
:hidden:
gov
staking
community
collector
distributor
```