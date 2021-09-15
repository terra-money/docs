# Oracle Feeder

Every validator is required to participate in the Oracle process, which involves periodically submitting a vote for the current exchange rate of Luna. These votes are held very frequently. Validators use a program called a feeder to automatically submit votes in a timely manner. Failure to set up and maintain a feeder may lead to downtime and missed votes, which results in getting [slashed,](../dev/spec-oracle.md#slashing) and your validator will be temporarily jailed.

## Implementations

Below is a list of oracle feeder implementations you can choose from:

| Software                                                                | Developer                             | Runtime         |
| :---------------------------------------------------------------------- | :------------------------------------ | :-------------- |
| [`oracle-feeder`](https://github.com/terra-money/oracle-feeder)       | **Terra**                             | Node.js | Official reference implementation |
| [`terra_oracle_voter`](https://github.com/b-harvest/terra_oracle_voter) | [B-Harvest](https://bharvest.io/)     | Python          |  |
| [`terra-oracle`](https://github.com/node-a-team/terra-oracle)           | [Node A-Team](https://nodeateam.com/) | Go              |  |
