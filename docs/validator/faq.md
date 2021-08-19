# Validator FAQ

::: warning
Please read this document thoroughly before running a validator.
:::

## General Concepts

### What is a validator?

Terra Core is powered by Tendermint consensus, which relies on a set of validators to secure the network. Validators run a full nodes and participate in consensus by broadcasting votes which contain cryptographic signatures signed by their private key. Validators commit new blocks in the blockchain and receive revenue in exchange for their work. They also participate in on-procotol treasury governance by voting on governance proposals. A validator's voting influence is weighted according to their total stake.

### What is "staking"?

The Columbus-5 Mainnet is a public Proof-Of-Stake (PoS) blockchain, meaning that validator's weight is determined by the amount of staking tokens (Luna) bonded as collateral. These Luna can be staked directly by the validator or delegated to them by Luna holders.

Any user in the system can declare its intention to become a validator by sending a [`create-validator`](#how-to-become-a-validator) transaction. From there, they become validators.

The weight (i.e. total stake) of a validator determines wether or not it is an active validator, and also how frequently this node will have to propose a block and how much revenue it will obtain. Initially, only the top 130 validators with the most weight will be active validators. If validators double-sign, or are frequently offline, they risk their staked Luna (including Luna delegated by users) being "slashed" by the protocol to penalize negligence and misbehavior.

### What is a full node?

A full node is a program that fully validates transactions and blocks of a blockchain. This is different from a light node which only processes block headers and a small subset of transactions. Running a full node requires more resources than a light node but is necessary in order to be a validator. In practice, running a full node only implies running a non-compromised and up-to-date version of the software with low network latency and without downtime.

Of course, it is possible and encouraged for any user to run full nodes even if they do not plan to be validators.

### What is a delegator?

Delegators are Luna holders who cannot, or do not want to run validator operations themselves. Through Terra Station (check the [Terra website](https://terra.money) to download), a user can delegate Luna to a validator and obtain a part of its revenue in exchange (for more detail on how revenue is distributed, see [What is the incentive to stake?](#what-is-the-incentive-to-stake) and [What is a validator's commission?](#what-is-a-validators-commission) sections below).

Because they share revenue with their validators, delegators also share responsibility. Should a validator misbehave, each of its delegators will be partially slashed in proportion to their stake. This is why delegators should perform due-diligence on validators before delegating, as well as diversifying by spreading their stake over multiple validators.

Delegators play a critical role in the system, as they are responsible for choosing validators. Be aware that being a delegator is not a passive role. Delegators are obligated to remain vigilant and actively monitor the actions of their validators, switching should they fail to act responsibly.

## Becoming a Validator

### How do I become a validator?

Any participant in the network can signal their intent to become a validator by creating a validator and registering its validator profile. To do so, the candidate broadcasts a `create-validator` transaction, in which they must submit the following information:

- **Validator's PubKey**: Validator operators can have different accounts for validating and holding liquid funds. The PubKey submitted must be associated with the private key with which the validator intends to sign _prevotes_ and _precommits_.

- **Validator's Address**: A `terravaloper-` address. This is the address used to identify your validator publicly. The private key associated with this address is used to bond, unbond, and claim rewards.

- **Validator's name** (also known as the **moniker**)

- **Validator's website** _(optional)_

- **Validator's description** _(optional)_

- **Initial commission rate**: The commission rate on block provisions, block rewards and fees charged to delegators.

- **Maximum commission**: The maximum commission rate which this validator will be allowed to charge.

- **Commission change rate**: The maximum daily increase of the validator commission.

- **Minimum self-bond amount**: Minimum amount of Luna the validator needs to have bonded at all times. If the validator's self-bonded stake falls below this limit, its entire staking pool will be unbonded.

- **Initial self-bond amount**: Initial amount of Luna the validator wants to self-bond.

```bash
terrad tx staking create-validator
    --pubkey terravalconspub1zcjduepqs5s0vddx5m65h5ntjzwd0x8g3245rgrytpds4ds7vdtlwx06mcesmnkzly
    --amount "2uluna"
    --from tmp
    --commission-rate="0.20"
    --commission-max-rate="1.00"
    --commission-max-change-rate="0.01"
    --min-self-delegation "1"
    --moniker "gazua"
    --chain-id "test-chain-uEe0bV"
    --gas auto
    --node tcp://127.0.0.1:26647
```

Once a validator is created and registered, Luna holders can delegate Luna to it, effectively adding stake to its pool. The total stake of a validator is the sum of the Luna self-bonded by the validator's operator and the Luna bonded by external delegators.

**Only the top 130 validators are considered active or  *bonded validators***. If ever a validator's total stake dips below the top 130, the validator loses its validator privileges and no longer serves as part of the active set, entering **unbonding mode** and eventually becoming **unbonded**.

## Validator keys and states

### What are the different types of keys?

There are two types of keys:

- **Tendermint Key**: This is a unique key used to sign block hashes. It is associated with a public key `terravalconspub`.

  - Generated when the node is created with `terrad init`.
  - Get this value with `terrad tendermint show-validator`
    e.g. `terravalconspub1zcjduc3qcyj09qc03elte23zwshdx92jm6ce88fgc90rtqhjx8v0608qh5ssp0w94c`

- **Application keys**: These keys are created from the application and used to sign transactions. As a validator, you will probably use one key to sign staking-related transactions, and another key to sign oracle-related transactions. Application keys are associated with a public key `terrapub-` and an address `terra-`. Both are derived from account keys generated by `terrad keys add`.

::: warning NOTE
A validator's operator key is directly tied to an application key, but uses reserved prefixes solely for this purpose: `terravaloper` and `terravaloperpub`
:::

### What are the different states a validator can be in?

After a validator is created with a `create-validator` transaction, it can be in three states:

- `bonded`: The validator is in the active set and participates in consensus. The validator is earning rewards and can be slashed for misbehavior.

- `unbonding`: The validator is not in the active set and does not participate in consensus. The validator is not earning rewards, but can still be slashed for misbehaviour. This is a transition state from `bonded` to `unbonded`. If a validator does not send a `rebond` transaction while in `unbonding` mode, it will take three weeks for the state transition to complete.

- `unbonded`: The validator is not in the active set, and therefore not signing blocks. Unbonded validators cannot be slashed, but do not earn any rewards from their operation. It is still possible to delegate Luna to this validator. Un-delegating from an `unbonded` validator is immediate.

Delegators have the same state as their validator.

::: warning NOTE
Delegations are not necessarily bonded. Luna can be delegated and bonded, delegated and unbonding, delegated and unbonded, or liquid.
:::

### What is "self-bonding"? How can I increase my "self-bond"?

The validator operator's "self-bond" refers to the amount of Luna stake delegated to itself. You can increase your self-bond by delegating more Luna to your validator account.

### Is there a faucet?

If you want to obtain coins for the testnet, you can do so by using [this faucet](https://faucet.terra.money/)

### Is there a minimum amount of Luna that must be staked to be an active (bonded) validator?

There is no minimum. The top 130 validators with the highest total stake (where total stake = self-bonded stake + delegators stake) are the active validators.

### How will delegators choose their validators?

Delegators are free to choose validators according to their own subjective criteria. That said, the criteria anticipated to be important include:

- **Amount of self-bonded Luna:** The number of Luna a validator self-bonds to its staking pool. A validator with a higher amount of self-bonded Luna has more skin in the game, making it more liable for its actions.

- **Amount of delegated Luna:** The total number of Luna delegated to a validator. A high stake shows that the community trusts this validator; however, this also means that a validator is a bigger target for hackers. Hackers are incentivized to hack larger validators as they receive a reward proportionate to the stake of the validator they can prove to have compromised. Validators are expected to become less and less attractive as their amount of delegated Luna grows.

- **Commission rate:** The commission applied to revenue by a validator before being distributed to its delegators.

- **Track record:** Delegators will likely look at the track record of the validators they plan to delegate to. This includes seniority, past votes on proposals, historical average uptime, and how often the node was compromised.

Apart from the above criteria which will be displayed in Terra Station, validators can also signal a website address to complete their resume. Validators will need to build a reputation to attract delegators. It is a good practice for validators to have their setup audited by third parties. Please note that the Terra team will not approve or conduct any audits.

## Responsibilites

### Do validators need to be publicly identified?

No, they do not. Each delegator will value validators based on their own criteria. Validators are typically advised to register a website address when they nominate themselves so they can advertise their operation as they see fit. While some delegators may prefer a website that clearly identifies the team running the validator and their resume, others may prefer an anonymous validator with a positive track records.

### What are the responsiblities of a validator?

A validator must:

- **Run correct software versions:** Validators need to make sure that their servers are always online, and that their private keys are not compromised.

- **Actively participate in price discovery and stabilization:** Validators are highly incentivised to submit honest and correct votes of the real market prices of Luna. Validators are also encouraged to engage in arbitrage swaps that stabilize the prices of Terra stablecoins.

- **Provide oversight and feedback on the correct deployment of community pool funds:** the Terra protocol includes a governance system for proposals to facilitate the adoption of its currencies. Validators are expected to hold budget executors to account to provide transparency and the efficient use of funds.

- **Be active members of the community:** Validators should always be up-to-date with the current state of the ecosystem so that they can easily adapt to any change.

### What does staking imply?

Think of staked Luna as a safety deposit on a validator's activities. When a validator or a delegator wants to retrieve part or all of their deposit, they send an unbonding transaction. The staked Luna then undergoes a _three weeks unbonding period,_ during which it is vulnerable to slashing risks for potential misbehavior committed by the validator before the start of the unbonding process.

Validators, and by association delegators, receive block provisions, block rewards, and fee rewards. If a validator misbehaves, a certain portion of their total stake is slashed (the severity of the penalty depends on the type of misbehavior). This means that every user that bonds Luna to a slashed validator gets penalized in proportion to their stake. Delegators are therefore incentivized to delegate to validators that function safely.

### Can a validator run away with a delegators' Luna?

**No.** By delegating to a validator, users delegate staking power. The more staking power a validator has, the more weight it has in the consensus and processes. This does not mean that the validator has custody of its delegators' Luna.

::: warning  
It's impossible for a validator to run away with a delegator's funds.
:::


Although delegated funds cannot be stolen by validators, delegators are still liable if their validators misbehave. In such case, each delegators' stake will be partially slashed in proportion to their relative stake.

### How often will a validator be chosen to propose the next block? Does it go up with the quantity of Luna staked?

The validator that is selected to mine the next block is called the **proposer**, or the "leader" in the consensus for the round. Each proposer is selected deterministically, and the frequency of being chosen is equal to the relative total stake of the validator (Total stake = self-bonded stake + delegators stake). For example, if the total bonded stake across all validators is 100 Luna, and a validator's total stake is 10 Luna, then this validator will be chosen 10% of the time as the proposer.

To understand more about the proposer selection process in Tendermint BFT consensus, read more [in their official docs](https://docs.tendermint.com/master/spec/reactors/consensus/proposer-selection.html).

## Incentives

### What are the incentives to stake?

Each member of a validator's staking pool earns different types of revenue:

- **Compute fees (gas)**: To prevent spamming, validators can set minimum gas fees for transactions to be included in their mempool. At the end of every block, compute fees are disbursed to the participating validators proportioanl to their stake.

- **Stability fees**: To stabilize the value of Luna, the protocol charges a small fee ranging from 0.1% to 1% on every Terra transaction, capped at 1 TerraSDR. This is paid in any Terra currency, and is disbursed proportional to each validators' stake at the end of every block in TerraSDR.

This total revenue is divided among validators' staking pools according to each validator's weight. Then, within each validator's staking pool the revenue is divided among delegators in proportion to each delegator's stake. Note that a commission on delegators' revenue is applied by the validator before it is distributed.

- **Swap fees**: A small spread is charged on atomic swap transactions between Luna and any Terra currency, which is then used to reward validators that faithfully report oracle exchange rates.

### What is the incentive to run a validator?

Validators earn more revenue than their delegators through commission. They also play a major role in determining on-chain exchange rates through the [`Oracle`](../dev/spec-oracle.md), where they get rewarded for faithfully reporting the exchange rate with swap fees.

### What is a validator's commission?

The revenue received by a validator's pool is split between a validator and their delegators. A validator can apply a commission on the part of the revenue that goes to its delegators. This commission is set as a percentage. Each validator is free to set its initial commission, maximum daily commission change rate, and maximum commission. The Mainnet enforces the parameters that each validator sets. These parameters can only be defined when initially declaring candidacy, and may only be constrained further after being declared.

### How are block provisions distributed?

Block provisions are distributed proportionally to each validators relative to their total stake. This means that even though each validator gains TerraSDR \(SDT\) with each provision, all validators will still maintain equal weight.

 **Example:** Take 10 validators with equal staking power and a commission rate of 1%. The block provision is 1000 SDT and each validator has 20% self-bonded Luna. These tokens do not go directly to the proposer. Instead, they are evenly spread among validators. So now each validator's pool has 100 SDT, which is distributed according to each participant's stake:

- Commission: 100 SDT ~ * ~ 80\% ~ * ~ 1\%$ = 0.8 SDT

- Each validator gets: 100 SDT ~ * ~ 20\% ~ + ~ Commission$ = 20.8 SDT

- All delegators get: 100 SDT ~ * ~ 80\% ~ - ~ Commission$ = 79.2 SDT

Then, each delegator can claim its part of the 79.2 SDT in proportion to their stake in the validator's staking pool. Note that the validator's commission is not applied on block provisions. Block rewards (paid in SDT) are distributed according to the same mechanism.

### How are fees distributed?

Fees are similarly distributed with the exception that the block proposer can get a bonus on the fees of the block it proposes if it includes more than the strict minimum of required precommits.

When a validator is selected to propose the next block, it must include at least ⅔ precommits for the previous block in the form of validator signatures. However, there is an incentive to include more than ⅔ precommits in the form of a bonus. The bonus is linear: it ranges from 1% if the proposer includes ⅔rd precommits (minimum for the block to be valid) to 5% if the proposer includes 100% precommits. Of course the proposer should not wait too long or other validators may timeout and move on to the next proposer. As such, validators have to find a balance between wait-time to get the most signatures and risk of losing out on proposing the next block. This mechanism aims to incentivize non-empty block proposals, better networking between validators as well as to mitigate censorship.

Let's take a concrete example to illustrate the aforementioned concept. In this example, there are 10 validators with equal stake. Each of them applies a 1% commission and has 20% of self-bonded Luna. Now comes a successful block that collects a total of 1005 SDT in fees. Let's assume that the proposer included 100% of the signatures in its block. It thus obtains the full bonus of 5%.

We have to solve this simple equation to find the reward $R$ for each validator:

$$9R ~ + ~ R ~ + ~ 5\%(R) ~ = ~ 1005 ~ \Leftrightarrow ~ R ~ = ~ 1005 ~/ ~10.05 ~ = ~ 100$$

- For the proposer validator:

  - The pool obtains $R ~ + ~ 5\%(R)$: 105 SDT
  - Commission: $105 ~ * ~ 80\% ~ * ~ 1\%$ = 0.84 SDT
  - Validator's reward: $105 ~ * ~ 20\% ~ + ~ Commission$ = 21.84 SDT
  - Delegators' rewards: $105 ~ * ~ 80\% ~ - ~ Commission$ = 83.16 SDT \(each delegator will be able to claim its portion of these rewards in proportion to their stake\)

- For each non-proposer validator:
  - The pool obtains $R$: 100 SDT
  - Commission: $100 ~ * ~ 80\% ~ * ~ 1\%$ = 0.8 SDT
  - Validator's reward: $100 ~ * ~ 20\% ~ + ~ Commission$ = 20.8 SDT
  - Delegators' rewards: $100 ~ * ~ 80\% ~ - ~ Commission$ = 79.2 SDT \(each delegator will be able to claim its portion of these rewards in proportion to their stake\)

### How does Luna supply behave over time?

Luna is the native staking token for the Terra Proof-of-Stake chain, and represents mining power. However, it also serves the purpose to collateralize the Terra stablecoins. Luna is minted to contract Terra supply to counteract Terra price falling against its peg. In order to constrain Luna inflation, the protocol burns all seigniorage and dividends swap fees to the exchange rate oracle ballot winners, which return Luna supply toward target.

### What are the slashing conditions?

If a validator misbehaves, its bonded stake along with its delegators' stake will be slashed. The severity of the punishment depends on the type of fault. There are 3 main faults that can result in slashing of funds for a validator and its delegators:

- **Double-signing:** If someone reports on chain A that a validator signed two blocks at the same height on chain A and chain B, and if chain A and chain B share a common ancestor, then this validator will get slashed on chain A.

- **Unavailability:** If a validator's signature has not been included in the last X blocks, the validator will get slashed by a marginal amount proportional to X. If X is above a certain limit Y, then the validator will get unbonded.

- **Non-voting:** If a validator did not vote on a proposal, its stake will receive a minor slash.

Note that even if a validator does not intentionally misbehave, it can still be slashed if its node crashes, looses connectivity, gets DDoSed, or if its private key is compromised.

### Do validators need to self-bond Luna?

No, they do not. A validators total stake is equal to the sum of its own self-bonded stake and of its delegated stake. This means that a validator can compensate its low amount of self-bonded stake by attracting more delegators. This is why reputation is very important for validators.

Even though there is no obligation for validators to self-bond Luna, delegators should want their validator to have self-bonded Luna in their staking pool. In other words, validators should have skin-in-the-game.

In order for delegators to have some guarantee about how much skin-in-the-game their validator has, the latter can signal a minimum amount of self-bonded Luna. If a validator's self-bond goes below the limit that it predefined, this validator and all of its delegators will unbond.

### How to prevent concentration of stake in the hands of a few top validators?

For now the community is expected to behave in a smart and self-preserving way. When a mining pool in Bitcoin gets too much mining power the community usually stops contributing to that pool. Columbus-4 Mainnet will rely on the same effect initially. In the future, other mechanisms will be deployed to smoothen this process as much as possible:

- **Penalty-free re-delegation:** This is to allow delegators to easily switch from one validator to another, in order to reduce validator stickiness.

- **Hack bounty:** This is an incentive for the community to hack validators. There will be bounties proportionate to the size of the validator, so that a validator becomes a bigger target as its stake grows.

- **UI warning:** Users will be warned by Terra Station if they want to delegate to a validator that already has a significant amount of staking power.

## Technical Requirements

### What are hardware requirements?

We recommend the following for running Terra Core:

- 4 core Compute Optimized CPU
- 16GB RAM (32GB to export genesis)
- 1TB storage
- At least 100mbps network bandwidth


### What are software requirements?

In addition to running a Terra Core node, validators should develop monitoring, alerting and management solutions.

### What are bandwidth requirements?

Columbus-5 Mainnet has the capacity for very high throughput compared to chains like Ethereum or Bitcoin.

As such, we recommend that the data center nodes only connect to trusted full nodes in the cloud or other validators that know each other socially. This relieves the data center node from the burden of mitigating denial-of-service attacks.

Ultimately, as the network becomes more used, one can realistically expect daily bandwidth on the order of several gigabytes.

### What does running a validator imply in terms of logistics?

A successful validator operation will require the efforts of multiple highly skilled individuals and continuous operational attention. This will be considerably more involved than running a bitcoin miner for instance.

### How to handle key management?

Validators should expect to run an HSM that supports ed25519 keys. Here are potential options:

- YubiHSM 2
- Ledger Nano S
- Ledger BOLOS SGX enclave
- Thales nShield support

The Terra team does not recommend one solution above the other. The community is encouraged to bolster the effort to improve HSMs and the security of key management.

### What can validators expect in terms of operations?

Running effective operation is the key to avoiding unexpectedly unbonding or being slashed. This includes being able to respond to attacks, outages, as well as to maintain security and isolation in your data center.

### What are the maintenance requirements?

Validators should expect to perform regular software updates to accommodate upgrades and bug fixes. There will inevitably be issues with the network early in its bootstrapping phase that will require substantial vigilance.

### How can validators protect themselves from Denial-of-Service attacks?

Denial-of-service attacks occur when an attacker sends a flood of internet traffic to an IP address to prevent the server at the IP address from connecting to the internet.

An attacker scans the network, tries to learn the IP address of various validator nodes and disconnect them from communication by flooding them with traffic.

One recommended way to mitigate these risks is for validators to carefully structure their network topology in a so-called sentry node architecture.

Validator nodes should only connect to full-nodes they trust because they operate them themselves or are run by other validators they know socially. A validator node will typically run in a data center. Most data centers provide direct links the networks of major cloud providers. The validator can use those links to connect to sentry nodes in the cloud. This shifts the burden of denial-of-service from the validator's node directly to its sentry nodes, and may require new sentry nodes be spun up or activated to mitigate attacks on existing ones.

Sentry nodes can be quickly spun up or change their IP addresses. Because the links to the sentry nodes are in private IP space, an internet based attacked cannot disturb them directly. This will ensure validator block proposals and votes always make it to the rest of the network.

It is expected that good operating procedures on that part of validators will completely mitigate these threats.

For more on sentry node architecture, see [this](https://forum.cosmos.network/t/sentry-node-architecture-overview/454).
