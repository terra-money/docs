# Terra governance proposal guide

This guide is for any individual or group that wants to submit a governance proposal. Please read this guide thoroughly before submitting a proposal

## Proposal overview

Governance is the democratic process that allows community members to submit and vote on proposals. The different proposal types include:

- **Community pool spend proposals**: proposed spending of a specific amount of funds from the community pool. 

    Example: [Proposal 186](https://station.terra.money/proposal/186) which sent 40 million UST to the multi-sig controlled by the [Terra Community Trust](community-trust.md). 

- **Parameter change proposals**: proposed changes to specific module parameters. 

    Example: [Proposal 185](https://station.terra.money/proposal/185) which changed the `PoolRecoveryPeriod` parameter in the [market module](../develop/module-specifications/spec-market.md#parameters) to `36` blocks. 

- **Text proposals**: general purpose petitions that suggest direction changes or new features. 

    Example: [Proposal 136](https://station.terra.money/proposal/136) which was a proposal to burn the remainder of the SDT stability reserve. 

## 1. Understand how governance works

Please review this entire guide, along with the [governance overview](protocol.md#governance) and [governance module specification](../develop/module-specifications/spec-governance.md) before proceeding. A thorough understanding of governance is needed to submit a proposal. Insufficient research and mistakes may lead to your deposit being burned. 

## 2. Post on the governance forum

Before submitting a proposal, you should get feedback and support from the community by posting on the [Agora research forum](https://agora.terra.money/). You should submit posts to the forum at least 1 week prior to submitting a live proposal. This step is important for the community to understand your proposal, and will help you gain useful feedback on your proposal. Failure to post on the [Agora research forum](https://agora.terra.money/) before submitting a live proposal may result in a loss of your deposit. 

For an example of a well written forum post, see the post for [proposal 186](https://agora.terra.money/t/community-funding-proposal-for-redacted-sports-partnership/3962). 

## 3. Gather feedback

Interact with the community and answer questions on the forum. Community insight will help you tailor your proposal better, and give you the best chance at passing your proposal. 

## 4. Submit a proposal

After your proposal has been on the research forum for at least a week, you can start drafting a proposal submission based on the following syntaxes:


### Submit a Parameter change proposal
::::{dropdown} Submit a Parameter change proposal


Follow these steps to submit your proposal using Terra Station:

1. Open Terra Station and connect your wallet. In the sidebar, click **Governance.**
2. Click on **New proposal.**

   ```{image} /img/screens/gov/gov.png
   :class: sd-p-3
   ```

3. Click **Proposal type** and select **Parameter change**.

4. Enter a title, a description, and an initial deposit. Be sure to link to your agora post in your subscription. 

5. Under the **Changes** section, enter a **subspace**, **key**, and **value**.

   ```{image} /img/screens/gov/param.png
   :class: sd-p-3
   ```

5. Enter your password and click **Submit**.

Your proposal will enter the two-week deposit period. After a minimum deposit of 50 Luna has been reached, your proposal will enter a one-week voting period. For more information on governance and voting options, visit the [governance overview](../protocol.md#governance).



::: {warning}
Because parameter changes are evaluated but not validated, ensure that new value you propose is valid for its parameter. For example, the proposed value for `MaxValidators` must be an integer, not a decimal.
:::

::::

::: {dropdown} Submit a text proposal
   ```{image} /img/screens/gov/param.png
   :class: sd-p-3
   ```
:::

### Text proposal syntax



## 5. Deposit period

## 6. Voting period

## 7. Outcomes