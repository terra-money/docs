# Using Terrain 

With Terrain installed we can now scaffold our new application: 

```sh
terrain new my-terra-dapp
cd my-terra-dapp
npm install
```

## Project Structure

The scaffoled project structure will look like this:

```
.
├── contracts              # contracts' source code
│   ├── counter
│   └── ...                # more contract can be added here
├── frontend               # frontend application
├── lib                    # predefined functions for task and console
├── tasks                  # predefined tasks
├── keys.terrain.js        # keys for signing transacitons
├── config.terrain.json    # config for connections and contract deployments
└── refs.terrain.json      # deployed code and contract referecnes
```

## Deployment

To deploy the application we can use `terrain deploy`

```sh
terrain deploy counter --signer validator
```

The deploy command is performing a number of steps automatically: 

* Build counter smart contract
* Optimize counter smart contract
* Upload counter smart contract to LocalTerra
* Instantiate the deployed smart contract

## Interacting with deployed contract

To start interacting with your smart contract the template comes with some predefined helpers in `lib/index.js`. 

First run `terrain console`, then with the console open you can increment the counter with: 

```JavaScript
await lib.increment()
```

You can get the current count with: 

```JavaScript
await lib.getCount()
```

After incrementing once, `await lib.getCount()` should return: 

```JSON
{ count: 1 }
```

## Fontend

Terrain also scaffoled a very simple frontend. To use the frontend you can run the following commands: 

```
terrain sync-refs
cd frontend
npm install
npm start
```

It's important to run the first command, `terrain sync-refs`, to copy your deployed contract addresses to the frontend part of the codebase. 

Make sure you've switched to LocalTerra in the Terra Station chrome extension before interacting with your contract.

Please import the following mnemonic in Terra Station which is the sole validator on the LocalTerra network and has enough funds to get started with smart contracts.

```
satisfy adjust timber high purchase tuition stool faith fine install that you unaware feed domain license impose boss human eager hat rent enjoy dawn
```

With Localterra selected in Terra Station and the local seed phrase imported, you should now be able to increment/reset the counter from the frontend.

### Demo

![](/img/tut_counter.gif)

## Advanced usage

For more advanced use-cases like deploying to testnet or mainnet, please refer to Terrain's readme: 

[https://github.com/iboss-ptk/terrain](https://github.com/iboss-ptk/terrain#readme)