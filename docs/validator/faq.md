# Validator FAQ

::: warning Recommendation
Please read this document thoroughly before becoming a validator.
:::

## General Concepts

### What is a validator?

The Terra Core is powered by the Tendermint consensus. Validators run full nodes, participate in consensus by broadcasting votes, commit new blocks to the blockchain, and participate in governance of the blockchain. Validators are able to cast votes on behalf of their delegators. A validator's voting power is weighted according to their total stake.

### What is a full node?

A full node is a program that validates the transactions and blocks of a blockchain. Validators must run full nodes. Full nodes require more resources than light nodes,  which only processes block headers and a small subset of transactions. Running a full node means you are running a non-compromised and up-to-date version of the Terra Core software with low network latency and no downtime.

It is possible and encouraged for any user to run full nodes even if they do not plan to be validators.

### What is staking?

When Luna holders delegate their Luna to a validator, they are ***staking.*** Staking increases a validator's weight, which helps them, and in return delegators get rewarded.

The Columbus-5 Mainnet is a public Proof of Stake (PoS) blockchain. This means a validator's weight (total stake) is determined by the amount of staking tokens (Luna) they delegate to themselves plus the Luna bonded to them by external delegators. The weight of a validator determines whether or not they are an active validator and how frequently they can propose a block. Validators with a higher weight will propose more blocks, and in turn make more revenue.

The active validator set is made up of 130 validators, who hold the most Luna. The bottom validator’s stake always forms the barrier for entry into the network. Creating a validator with more stake than the bottom validator is the only way to enter the active set. If validators double-sign, or are frequently offline, they risk their staked Luna, including Luna delegated by users, being slashed by the protocol to penalize negligence and misbehavior.

### What is a delegator?

Delegators are Luna holders who want to receive staking rewards without the responsibility of running a validator. Through Terra Station, a user can delegate Luna to a validator and in exchange receive a part of a validator's revenue. For more detail on how revenue is distributed, see [What are the incentives to stake?](#what-are-the-incentives-to-stake) and [What is a validator's commission?](#what-is-a-validator's-commission).

Delegators share the benefits and rewards of staking with their Validator. If a Validator is successful, its delegators will consistently share in the rewards structure. If a Validator is slashed, the delegator’s stake will also be slashed. This is why delegators should perform due-diligence on validators before delegating. Delegators can also diversify by spreading their stake over multiple validators.

Delegators play a critical role in the system, as they are responsible for choosing validators. Being a delegator is not a passive role. Delegators should remain vigilant, actively monitor the actions of their validators, and re-delegate whenever they feel their current validator does not meet their needs.

## Becoming a Validator

### How do I become a validator?

Any participant in the network can signal their intent to become a validator by creating a validator and registering its validator profile. The candidate then broadcasts a `create-validator` transaction, which contains the following data:

- **PubKey:** Validator operators can have different accounts for validating and holding liquid funds. The PubKey submitted must be associated with the private key the validator will use to sign _prevotes_ and _precommits_.

- **Address:** A `terravaloper-` address. This is the address used to identify your validator publicly. The private key associated with this address is used to bond, unbond, and claim rewards.

- **Name** (also known as the **moniker**)

- **Website** _(optional but recommended)_

- **Description** _(optional but recommended)_

- **Initial commission rate:** The commission rate on block provisions, block rewards and fees charged to delegators.

- **Maximum commission:** The maximum commission rate which the validator will be allowed to charge. (This cannot be changed)

- **Commission change rate**: The maximum daily increase of the validator's commission.(This cannot be changed)

- **Minimum self-bond amount**: The minimum amount of bonded Luna the validator needs at all times. If the validator's self-bonded stake falls below this limit, its entire staking pool will be unbonded.

- **Initial self-bond amount**: The initial amount of Luna the validator self-bonds.

**Example:**
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

Once a validator is created and registered, Luna holders can delegate Luna to them, effectively adding stake to its pool. The total stake of a validator is the total of their self-bonded Luna plus the Luna bonded by external delegators.

**Only the top 130 validators are considered active or *bonded validators***. If a validator's total stake dips below the top 130, the validator loses its validator privileges and no longer serves as part of the active set, entering into **unbonding mode** and eventually becoming **unbonded**, or inactive.

## Validator keys and states

### What are the different types of keys?

There are two types of keys:

- **Tendermint Key:** A unique key used to sign block hashes associated with a public key `terravalconspub`.

  - This Key is generated when a node is created with `terrad init`.
  - Use `terrad tendermint show-validator` to see a key  

    **Example:** `terravalconspub1zcjduc3qcyj09qc03elte23zwshdx92jm6ce88fgc90rtqhjx8v0608qh5ssp0w94c`

- **Application Keys:** These keys are created from an application and are used to sign transactions. As a validator, you will probably use one key to sign staking-related transactions and another key to sign oracle-related transactions. Application keys are associated with a public key `terrapub-` and an address `terra-`. Both are derived from account keys generated by `terrad keys add`.

::: warning Warning
A validator's operator key is directly tied to an application key, but uses reserved prefixes solely for this purpose: `terravaloper` and `terravaloperpub`
:::

### What are the different states a validator can be in?

After a validator is created with the `create-validator` transaction, it can be in three states:

- `bonded`: A validator that is in the active set and participates in consensus. This validator is earning rewards and can be slashed for misbehavior.

- `unbonding`: A validator that is not in the active set and can't not participate in consensus. This validator is not earning rewards but can still be slashed for misbehaviour. This is a transition state from `bonded` to `unbonded`. If a validator does not send a `rebond` transaction while in `unbonding` mode, it will take three weeks for the state transition to complete.

- `unbonded`: A validator that is not in the active set and not signing blocks. Unbonded validators can't be slashed and can't earn any rewards from their operation. It is still possible to delegate Luna to unbonded validators. Un-delegating from an `unbonded` validator is immediate.

All Delegators have the same state as their validator.

Delegations are not necessarily bonded. Luna can be delegated and bonded, delegated and unbonding, delegated and unbonded, or liquid.


### What is "self-bonding"? How can I increase my "self-bond"?

A validator operator's "self-bond" refers to the amount of Luna delegated to itself. You can increase your self-bond by delegating more Luna to your validator account.

### Can I delegate to a validator outside of the active set?

You can still delegate to a validator even if they do not appear on Terra Station. Simply add the terravaloper address of your desired validator to the end of the following URL:

`https://station.terra.money/validator/<terravaloper-address>`

Ask your validator for their terravaloper address.

Be careful when delegating to validators outside of the active set. Some inactive validators may be jailed or are no longer supported. Station only displays active or recently active validators who are able to participate in consensus.

### Is there a faucet?

Use the [Terra faucet](https://faucet.terra.money/) to obtain coins for the testnet.

### Is there a minimum amount of Luna that must be staked to be an active (bonded) validator?

There is no set minimum. The top 130 validators with the highest total stake (where total stake = self-bonded stake + delegated stake) make up the active validator set. The bottom 130th validator sets the barrier to entry for the active set.

### How will delegators choose their validators?

Delegators are free to choose validators according to their own criteria. This may include:

- **Amount of self-bonded Luna:** The amount of Luna a validator self-bonds to its staking pool. A validator with a higher amount of self-bonded Luna has more skin in the game, making it more liable for its actions.

- **Amount of delegated Luna:** The total amount of Luna delegated to a validator. A high stake shows that the community trusts this validator; however, this also means that a validator is a bigger target for hackers. Large stakes provide large voting power. This weakens the network. At any given time, if 33% or more of staked luna becomes inaccessible, the network will halt. Through incentives and education, we can prevent this by delegating away from validators that have too much voting power. Validators sometimes become less attractive as their amount of delegated Luna grows.

- **Commission rate:** The commission applied to rewards by a validator before being distributed to its delegators.

- **Track record:** Delegators can look at the track record of a validator they plan to delegate to. This includes seniority, past votes on proposals, historical average uptime, and how often the node was compromised.

Validators can also provide a website address to complete their resume. Validators need to build a good reputation to attract delegators. It's good practice for validators to have their setup audited by third parties. Please note that the Terra team will not approve or conduct any audits.

## Responsibilities

### Do validators need to be publicly identified?

No, they do not. Each delegator will value validators based on their own criteria. Validators are typically advised to register a website address when they nominate themselves so they can advertise their operation as they see fit.

### What are the responsibilities of a validator?

A validator must:

- **Run the correct software versions:** Validators need to make sure that their servers are always online, and that their private keys are not compromised.

- **Actively participate in price discovery and stabilization:** Validators are highly incentivized to submit honest and correct votes of the real market prices of Luna. Validators are also encouraged to engage in arbitrage swaps that stabilize the prices of Terra stablecoins.

- **Provide oversight and feedback on the correct deployment of community pool funds:** The Terra protocol includes a governance system for proposals to facilitate the adoption of its currencies. Validators are expected to hold budget executors to provide transparency and to use funds efficiently.

- **Be active members of the community:** Validators should always be up-to-date with the current state of the ecosystem so that they can easily adapt to any change.

### What does staking imply?

Think of staked Luna as a safety deposit on a validator's activities. When a validator or a delegator wants to retrieve part or all of their deposit, they send an unbonding transaction. The staked Luna then undergoes a _three weeks unbonding period,_ during which it is vulnerable to slashing risks for potential misbehavior committed by the validator before the start of the unbonding process.

Validators receive block provisions, block rewards, and fee rewards and share these with their delegators. If a validator misbehaves, a certain portion of their total stake is slashed (the severity of the penalty depends on the type of misbehavior). This means that every user that bonds Luna to a slashed validator gets penalized in proportion to their stake. Delegators are incentivized to delegate to validators that function safely.

### Can a validator run away with a delegators' Luna?

**No.** By delegating to a validator, users delegate staking power. The more staking power a validator has, the more weight it has in the consensus and processes. This does not mean that the validator has custody of its delegators' Luna.

::: warning Warning
It is impossible for a validator to run away with a delegator's funds.
:::

Although delegated funds cannot be stolen by validators, delegators are still liable if a validator misbehaves. When this happens, a delegator's stake will be partially slashed in proportion to their relative stake.

### How often will a validator be chosen to propose the next block? Does it go up with the quantity of Luna staked?

The validator that is selected to mine the next block is called the **proposer**, or the "leader" in the consensus for the round. Each proposer is selected deterministically, and the frequency of being chosen is equal to the relative total stake of the validator (Total stake = self-bonded stake + delegators stake). For example, if the total bonded stake across all validators is 100 Luna, and a validator's total stake is 10 Luna, then this validator will be chosen 10% of the time as the proposer.

To understand more about the proposer selection process in Tendermint BFT consensus, read more [in their official docs](https://docs.tendermint.com/master/spec/reactors/consensus/proposer-selection.html).

## Incentives

### What are the incentives to stake?

Each member of a validator's staking pool earns different types of revenue:

- **Compute fees (gas)**: To prevent spamming, validators can set minimum gas fees for transactions to be included in their mempool. At the end of every block, compute fees are disbursed to the participating validators proportional to their stake.

- **Stability fees**: To stabilize the value of Luna, the protocol charges a small fee ranging from 0.1% to 1% on every Terra transaction, capped at 1 TerraSDR. This is paid in any Terra currency, and is disbursed proportional to each validators' stake at the end of every block in TerraSDR.

This total revenue is divided among a validator's staking pool according to each validator's weight. The revenue is then divided among delegators in proportion to each delegator's stake. Note that a commission on delegators' revenue is applied by the validator before it is distributed.

- **Swap fees**: A small spread is charged on atomic swap transactions between Luna and any Terra currency, which is then used to reward validators that faithfully report oracle exchange rates.

### What is the incentive to run a validator?

Validators earn more revenue than their delegators through commission. They also play a major role in determining on-chain exchange rates through the [`Oracle`](../dev/spec-oracle.md), where they get rewarded for faithfully reporting exchange rates with swap fees.

### What is a validator's commission?

The revenue received by a validator's pool is split between a validator and their delegators. A validator can apply a commission on the part of the revenue that goes to its delegators. This commission is set as a percentage. Each validator is free to set its initial commission, maximum daily commission change rate, and maximum commission. The mainnet enforces the parameters that each validator sets. These parameters can only be defined when initially declaring candidacy, and may only be constrained further after being declared.

### How are block provisions distributed?

Block provisions are distributed proportionally to each validator relative to their total stake. This means that even though each validator gains TerraSDR \(SDT\) with each provision, all validators will still maintain equal weight.

 **Example:** Take 10 validators with equal staking power and a commission rate of 1%. The block provision is 1000 SDT and each validator has 20% self-bonded Luna. These tokens do not go directly to the proposer. Instead, they are evenly spread among validators. So now each validator's pool has 100 SDT, which is distributed according to each participant's stake:

- Commission: 100 SDT ~ * ~ 80\% ~ * ~ 1\%$ = 0.8 SDT

- Each validator gets: 100 SDT ~ * ~ 20\% ~ + ~ Commission$ = 20.8 SDT

- All delegators get: 100 SDT ~ * ~ 80\% ~ - ~ Commission$ = 79.2 SDT

Each delegator can claim its part of the 79.2 SDT in proportion to their stake in the pool. Note that the validator's commission is not applied on block provisions. Block rewards (paid in SDT) are distributed according to the same mechanism.

### How are fees distributed?

Fees are distributed to validators in the same way as commission: proportionally to each validator relative to their total stake. A Block proposer can also get a bonus if the proposer includes more than the minimum of required precommits.

#### Rewards

When a validator is selected to propose the next block, they must include at least two thirds of the precommits for the previous block in the form of validator signatures. Proposers who include more than two thirds receive a bonus proportional to the amount of additional precomits. This reward ranges from 1% if the proposer includes two thirds of the precommits to 5% if the proposer includes 100% of the precommits. If a proposer waits too long however, other validators may timeout and move on to the next proposer. This is why validators have to find a balance between wait time to get the most signatures and the risk of losing out on proposing the next block. This feature aims to incentivize non-empty block proposals, better networking between validators, and to mitigate censorship.

**Example:** There are 10 validators with equal stake. Each has a 1% commission and 20% self-bonded Luna. If a successful block collects 1005 SDT in fees, and the proposer includes 100% of the signatures in their block, they will receive the full 5% bonus.

We can use a simple equation to find the reward $R$ for each validator:

$$9R ~ + ~ R ~ + ~ 5\%(R) ~ = ~ 1005 ~ \Leftrightarrow ~ R ~ = ~ 1005 ~/ ~10.05 ~ = ~ 100$$

- For the validator that proposes a block:
  - The pool obtains $R ~ + ~ 5\%(R)$: 105 SDT
  - Commission: 105 SDT ~ * ~ 80\% ~ * ~ 1\%$ = 0.84 SDT
  - Validator's reward: 105 SDT ~ * ~ 20\% ~ + ~ Commission$ = 21.84 SDT
  - Delegators' rewards: 105 SDT ~ * ~ 80\% ~ - ~ Commission$ = 83.16 SDT \(each delegator will be able to claim its portion of these rewards in proportion to their stake\)

- For all other validators:
  - The pool obtains $R$: 100 SDT
  - Commission: 100 SDT ~ * ~ 80\% ~ * ~ 1\%$ = 0.8 SDT
  - Validator's reward: 100 SDT ~ * ~ 20\% ~ + ~ Commission$ = 20.8 SDT
  - Delegators' rewards: 100 SDT ~ * ~ 80\% ~ - ~ Commission$ = 79.2 SDT \(each delegator will be able to claim its portion of these rewards in proportion to their stake\)

### How does Luna supply behave over time?

Luna is the native staking token for the Terra Proof of Stake chain. Luna represents mining power and serves as collateral for Terra stablecoins. When a Terra stablecoin's price is low, the relevant Terra stablecoin is burned, and Luna is minted. This increases the price of the Terra stablecoin. In order to constrain Luna inflation, the protocol burns all seigniorage and dividends swap fees to the exchange rate oracle ballot winners, which then returns Luna supply towards a target. The Terra Protocol is deflationary in nature.

### What are the slashing conditions?

If a validator misbehaves, their bonded stake along with their delegators' stake will be slashed. The severity of the punishment depends on the type of fault. There are 3 main faults that can result in slashing of funds:

- **Double-signing:** If someone reports on chain A that a validator signed two blocks at the same height on chain A and chain B, and if chain A and chain B share a common ancestor, then this validator will get slashed on chain A.

- **Unavailability:** If a validator's signature has not been included in the last X blocks, the validator will get slashed by a marginal amount proportional to X. If X is above a certain limit, then the validator will get unbonded.

- **Non-voting:** If a validator does not vote on a proposal, its stake will receive a minor slash.

:::warning Warning
 Even if a validator does not intentionally misbehave, it can still be slashed if its node crashes, loses connectivity, gets DDoSed, or if its private key is compromised.
:::

### Are validators required to self-bond Luna?

No, but self-bonding has benefits. A validator's total stake is made up of their self-bonded stake plus their delegated stake. This means that a validator can compensate for low amounts of self-bonded Luna by attracting more delegators. This is why reputation is very important for validators.

Although validators are not required to self-bond Luna, we suggest all validators to have `skin-in-the-game`. This can help make a validator more trustworthy.

In order for delegators to have some guarantee about how much `skin-in-the-game` their validator has, validators can signal a minimum amount of self-bonded Luna. If a validator's self-bond goes below the limit that it has predefined, this validator and all of its delegators will unbond.


## Technical Requirements

### What are the hardware requirements?

We recommend the following for running Terra Core:

- 4 core Compute Optimized CPU
- 16GB RAM (32GB to export genesis)
- 1TB storage (SSD or better)
- At least 100mbps network bandwidth

### What are the software requirements?

In addition to running a Terra Core node, validators should develop monitoring, alerting and management solutions.

Validators should expect to perform regular software updates to accommodate upgrades and bug fixes. There will inevitably be issues with the network, and this requires vigilance.

### What are the personnel requirements?

A successful validator operation will require the efforts of multiple highly skilled individuals and continuous operational attention. Running a validator is considerably more involved than mining bitcoin.

Running an effective operation is critical to avoiding unexpected unbonding or being slashed. This includes being able to respond to attacks, outages, as well as to maintain security and isolation in your data center.

### How can validators protect themselves from Denial-of-Service attacks?

Denial-of-service attacks occur when an attacker sends a flood of internet traffic to a validator's IP address. This can prevent a validator's server from connecting to the internet.

To do this, an attacker scans the network, tries to learn the IP address of various validator nodes, and disconnects them by flooding them with traffic.

One way to mitigate these risks is to carefully structure a validator network with a sentry node architecture.

Validator nodes should only connect to full-nodes they trust. They can be run by the same validator or other validators they know. A validator node will typically run in a data center. Most data centers provide direct links to major cloud providers. A validator can use these links to connect to sentry nodes in the cloud. This shifts the burden of denial-of-service from the validator's node directly to its sentry nodes. This may require new sentry nodes to be spun up or activated to mitigate attacks on existing ones.

Sentry nodes can be quickly spun up or used to change IP addresses. Because links to the sentry nodes are in private IP space, an internet based attack can't disturb them directly. This will ensure a validator's block proposals and votes always make it to the rest of the network.

For more on sentry node architecture, see [this](https://forum.cosmos.network/t/sentry-node-architecture-overview/454).
