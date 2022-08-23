# Use Terrain with LocalTerra

LocalTerra is a complete Terra testnet and ecosystem containerized with Docker. Use LocalTerra to simulate transactions in a test environment.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [`docker-compose`](https://docs.docker.com/compose/install/)
- At least 16 GB of RAM
- [Terra Station Chrome extension](../../learn/terra-station/download/terra-station-chrome.md)
- [Node.js version 16](https://nodejs.org/en/blog/release/v16.16.0/)

:::{admonition} Node version error
:class: warning
Use LTS Node.js 16 if you encounter the following error code.  
`error:0308010C:digital envelope routines::unsupported`
:::

(header_target)=
:::{dropdown} Running NPM on M1 Macs

Some M1 macs may need to use the latest LTS version of Node to complete this tutorial. Consider using a node version manager such as [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md).
After installing nvm, run the following commands to install and then switch to the latest LTS version of node.

```sh
nvm install --lts
nvm use --lts
```

The `nvm use --lts` command will need to be run every time you open a new terminal to use the LTS version of node.

To default to the LTS version of node when restarting your terminal, run the following:

```sh
nvm alias default <desired-node-version>
```

:::

## Install and run LocalTerra

1. To download LocalTerra, start by cloning the LocalTerra Github repository.

   ```sh
   git clone --depth 1 https://github.com/terra-money/localterra
   ```

2. Then change into the LocalTerra directory and start LocalTerra with the following commands.

   ```sh
   cd localterra
   docker-compose up
   ```

If LocalTerra is working correctly, you will start to see block activity in your terminal. To execute transactions on LocalTerra, you will need to keep LocalTerra running and execute commands in a separate terminal window.

:::{admonition} LocalTerra Accounts
:class: note
To view LocalTerra wallet information, visit the [LocalTerra accounts page](../localterra/accounts.md).
For more configuration options, visit the [LocalTerra configuration page](../localterra/configure.md).
:::

# Counter tutorial

After installing LocalTerra, you are ready to use Terrain. This short tutorial walks you through setting up your project and creating a simple counter that increments upon request.

## 1. Scaffold your dApp

With Terrain installed, you can now scaffold a template application in a new terminal window.

1. Create a new dApp project.

   ```sh
   terrain new my_terra_dapp
   ```

   ::: {tip}
   If you are using an M1 Mac, see [Running NPM on M1 Macs](header_target) before proceeding.
   :::

2. Change directory into your newly scaffolded dApp.

   ```sh
   cd my_terra_dapp
   ```

### Project structure

Your scaffolded project will have the following structure.

```
.
├── contracts              # The contracts' source code.
│   ├── my_terra_dapp
│   └── ...                # Add more contracts here.
├── frontend               # The front-end application.
├── lib                    # Predefined functions for task and console.
├── tasks                  # Predefined tasks.
├── keys.terrain.js        # Keys for signing transactions.
├── config.terrain.json    # Config for connections and contract deployments.
└── refs.terrain.json      # Deployed code and contract references.
```

## 2. Deploy

To deploy the application, run the following command in your terminal.

```sh
terrain deploy my_terra_dapp
```

The deploy command performs the following steps automatically.

- Builds the smart contract.
- Optimizes the smart contract.
- Uploads the smart contract to LocalTerra.
- Instantiates the deployed smart contract.

:::{admonition} Increase Docker memory
:class: note

If you are running LocalTerra and the previous `deploy` command is not working, try increasing Docker's memory allowance.  You can do this by clicking on the Docker icon, clicking on **Preferences** and then navigating to **Resources**. Increase the memory to at least 4 GB and then click **Apply & Restart**. You can then try running the deploy command again. If you are still having trouble with deploying your dApp, you can try increasing the memory to 6 GB.
:::

## 3. Generate TypeScript client

Terrain 0.5.x and above includes the ability to automatically generate a TypeScript client based on your smart contract schema.

You can generate a client by running the following command in your terminal.
```
terrain contract:generateClient my_terra_dapp --build-schema
```

The client will be generated in `./lib/clients` and copied into the frontend directory.

## 4. Interact with the deployed contract

The template dApp comes with several predefined helpers in `lib/index.js`. You may use these to start interacting with your smart contract.

1. Start the Terrain console.

   ```sh
   terrain console
   ```

2. In the Terrain console, you can increment the counter by running the following command.

   ```JavaScript
   await lib.increment()
   ```

3. You can also get the current count.

   ```JavaScript
   await lib.getCount()
   ```

4. After incrementing once, `await lib.getCount()` should return a count of 1.

   ```json
   { "count": 1 }
   ```

:::{tip}
Before proceeding to the next section, exit the terrain console by using "Ctrl + C".
:::

## 5. Front end scaffolding

When you scaffold a template app with Terrain, it will contain a simple front end.

1. Open the [Terra Station Chrome extension](https://chrome.google.com/webstore/detail/terra-station-wallet/aiifbnbfobpmeekipheeijimdpnlpgpp), click the gear icon in the upper right-hand corner, and switch the network to LocalTerra.

2. To use the front end, run the following commands.

   ```
   cd frontend
   npm start
   ```

3. Open the Terra Station extension and click **Add a wallet**. Click **Recover wallet** and input the following seed phrase to access the sole validator on the LocalTerra network and gain funds to get started with smart contracts:

   ```
   satisfy adjust timber high purchase tuition stool faith fine install that you unaware feed domain license impose boss human eager hat rent enjoy dawn
   ```

4. With LocalTerra selected in Terra Station and the local seed phrase imported, you can now increment and reset the counter from the front end.

## Demo

![](/img/tut_counter.gif)

## Advanced usage

For more advanced use cases, like deploying to testnet or mainnet, see [Terrain's readme](https://github.com/terra-money/terrain#readme).
