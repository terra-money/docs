# Tic Tac Toe 

Game developed and deployed to Terra 2.0 blockchain. The game is played on a 3x3 grid and whoever has the first three in a row wins. This smart contract code is open source in tbe following repository [emidev98/tic-tac-toe](https://github.com/emidev98/tic-tac-toe/tree/main/contracts/tic_tac_toe) aside from the smart contract in the same repo you can find a [frontend Website](https://github.com/emidev98/tic-tac-toe/tree/main/frontend) that allows you to interact with the smart contract and its deployed to [tic-tac-toe.decentryfi.xyz](http://tic-tac-toe.decentryfi.xyz/).

| Network     | Code ID     | Contract Address |
| ----------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Testnet     |   1945      | [terra1nccc7q0x2gpa9ykhmar85rfrzd4uggzlepepw20ktt2ltp4eguuqmyxfc9](https://finder.terra.money/testnet/address/terra1nccc7q0x2gpa9ykhmar85rfrzd4uggzlepepw20ktt2ltp4eguuqmyxfc9) |

# Smart Contract Architecture

This smart contract is build with 1 query and 4 different executes. To enable the possibility of a permissionless and trustless game it will contain a state machine that will have the following status:

- INVITED: only one game can be in this status at a time per host and opponent pair. This status is achieved by creating a new game and the following possible status are PLAYING or REJECTED.
- PLAYING: only one game can be in this status at a time per host and opponent pair. To achieve this status must mutate from INVITED.
- COMPLETED: multiple games can be in this status but they have to mutate from PLAYING.
- REJECTED: multiple games can be in this status but they have to mutate from INVITE. 

As you may already have noticed this game can only be played by 1 host and 1 opponent at a time (host being the one who created the game) but when a match is completed or rejected new game can be started.

# QueryMsg

The Games query contains two optional parameters (**key** and **status**) which will query the games with the given status, if none of the optional parameters are submitted the smart contract will return the entire stored data.


# ExecuteMsg

- Invite: create a new game if there is no game in status PLAYING or INVITED. 
- Reject: reject a game in status INVITED and return the funds to the player who requested to play.
- AcceptGame: accept a game in status INVITED only when the sent funds match the game prize. The game will change status to PLAYING.
- Play: continues the match of an existing game in status PLAYING following the rules of [Tic Tac Toe](https://en.wikipedia.org/wiki/Tic-tac-toe). This method also checks the status of the game to validate if the game is finished or not. When the games finishes the funds will be transferred to the winner or splitted between the players if tie.

# Tests

The game only contains unit tests with the approach KISS (Keep It Simple, Stupid) so you may see some duplicated code in the testing module. 

This is the last test coverage achieved with the current version of the module asserting all responses from the smart contract:

```bash
test result: ok. 28 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.05s

Jul 11 09:00:26.273  INFO cargo_tarpaulin::report: Coverage Results:
|| Uncovered Lines:
|| src/contract/execute.rs: 61, 92-93
|| src/contract/query.rs: 48-49, 51-54
|| src/models/state.rs: 87, 90, 116, 149, 183, 224, 229

|| Tested/Total Lines:
|| src/contract/execute.rs: 124/127 +97.64%
|| src/contract/instantiate.rs: 2/2 +100.00%
|| src/contract/query.rs: 25/31 +80.65%
|| src/models/state.rs: 58/65 +89.23%
|| src/test/accept.rs: 193/193
|| src/test/happy_paths.rs: 225/225
|| src/test/invite.rs: 91/91
|| src/test/play.rs: 219/219
|| src/test/query_handled_errors.rs: 28/28
|| src/test/query_happy_path.rs: 24/24
|| src/test/reject.rs: 40/40

98.47% coverage, 1029/1045 lines covered
```