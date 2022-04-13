# How to Integrate Terra Station

[Wallet Provider](https://github.com/terra-money/wallet-provider) makes it easy to build Terra Station (browser extension and mobile) functionality into your React application. It contains custom hooks that drastically simplifies common tasks like connecting a wallet and triggering transactions. 

*If you're using a frontend framework other than React you'll need [Wallet Controller](https://www.npmjs.com/package/@terra-money/wallet-controller) instead. Controller provides the sub-structure of Provider. You can see an example of how Wallet Controller works in the [Vue.js template example](https://githubbox.com/terra-money/wallet-provider/tree/main/templates/vue).* 

This guide will cover how to set up a react app, integrate wallet provider, check the balance of the connected account and call a token swap. If you want to integrate Terra Station into an existing react app you can skip past the `Project Setup` section. 

*Just want to dive in? Check out the getting started section for our premade templates [here](https://github.com/terra-money/wallet-provider/).*
 

## Prerequisites

- [Terra Station Chrome extension](../../learn/terra-station/download/terra-station-extension.md)
- Node.js version 16+
- [NPM](https://www.npmjs.com/)

## 1. Project Setup

To get started,you'll need some basic React scaffolding. To generate this, run the following in your termainal.
```sh
npx create-react-app my-terra-app
cd my-terra-app
```

Then, install the `@terra-money/wallet-provider` package. 

```sh
npm install @terra-money/wallet-provider
```

## 2. Wrapping our app in `WalletProvider`

Wrap our `App` with `<WalletProvider>` to give all our components access to useful data, hooks and utilities. You'll also need pass in information about Terra networks (e.g. the mainnet chainId) into the provider via `getChainOptions`.

Navigate to your `Index.js` and add the following:

```js
import { getChainOptions, WalletProvider } from '@terra-money/wallet-provider';

getChainOptions().then((chainOptions) => {
  ReactDOM.render(
    <WalletProvider {...chainOptions}>
      <App />
    </WalletProvider>,
    document.getElementById('root')
  );
});
```

*Getting polyfill errors? You can downgrade "react-scripts": "4.0.3" in your `package.json` and reinstall your depdencies as a quick fix. Or configure your webpack to include the necessary fallbacks. Here's an [example](https://github.com/terra-money/wallet-provider/blob/main/templates/create-react-app/config-overrides.js) that uses [react-app-rewired](https://www.npmjs.com/package/react-app-rewired).*

Create a new directory called `components`. This directory will house components to trigger different actions from our connected wallet.

## 3. Putting `useWallet` to work

Now that `App.js` is has inherited the context of `WalletProvider` we can start putting our imports to work. The `useWallet` hook gives us a bunch of functionality.

Let's use it to connect our terra station extension to our web browser. Create a new file in the `components` directory called `Connect.js`.

```js
import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
import React from 'react';

export default function Connect() {
  const {
    status,
    network,
    wallets,
    availableConnectTypes,
    connect,
    disconnect,
  } = useWallet();

  return (
    <>
        {JSON.stringify({ status, network, wallets }, null, 2 )} 
        {status === WalletStatus.WALLET_NOT_CONNECTED && (
            <>
            {availableConnectTypes.map((connectType) => (
                <button
                    key={'connect-' + connectType}
                    onClick={() => connect(connectType)}
                >
                    Connect {connectType}
                </button>
            ))}
            </>
        )}
        {status === WalletStatus.WALLET_CONNECTED && (
            <button onClick={() => disconnect()}>
                Disconnect
            </button>
        )}
    </>
  );
}
```
Import and add the `Connect` component to the `App` in `index.js` — there should be some new text and buttons in your browser.

The `status`, `network`, and `wallets` properties provide useful information about the state of the Terra wallet. Before connecting the `status` variable is `WALLET_NOT_CONNECTED`, and then on connection the status becomes `WALLET_CONNECTED`. In addition, the `wallets` array now has one entry with the `connectType` and `terraAddress` we used to connect. 

You should be able to see these changes in real time.

## 4. Querying a wallet balance

It's common to to show the connected users UST balance. To achieve this you need two hooks. The first is `useLCDClient`. An `LCDClient` is essentially a REST-based adapter for the Terra blockchain. You can use it to query an account balance. The second is `useConnectedWallet`, which tells us if a wallet is connected, and if so, basic information about that wallet such as its' address. 

Note that if your wallet is empty you won't see any tokens.

```js
import { useConnectedWallet, useLCDClient } from '@terra-money/wallet-provider';
import React, { useEffect, useState } from 'react';

export default function Query() {
  const lcd = useLCDClient();
  const connectedWallet = useConnectedWallet();
  const [balance, setBalance] = useState(null);

  useEffect(() => { 
    if (connectedWallet) { 
      lcd.bank.balance(connectedWallet.walletAddress).then(([coins]) => {
        setBalance(coins.length ? coins.toString() : "Wallet is empty");
      });
    } else {
      setBalance(null);
    }
  }, [connectedWallet, lcd]);

  return (
    <div>
      <h1>Query</h1>
      {balance && <>{balance}</>}
      {!connectedWallet && <p>Wallet not connected!</p>}
    </div>
  );
}
```

You can convert the displayed balances to a more intelligble form by mutiplying them by 10^6.


## 5. Sending a transaction

WalletProvider also helps create and send transactions to the Terra network. You'll also need `Terra.js` to help generate the sample transaction. 

```sh
npm install @terra-money/terra.js
```

Before broadcasting this example transaction, ensure you're on the Terra testnet. To change networks click the gear icon in your Terra station and select `testnet`. 

You can request tesnet funds from the [faucet](https://faucet.terra.money/). You'll receive luna which can be swapped for UST within the Station extension. 

A UST transfer transaction needs a fee and a message containing the sender address, recipient address, and send amount (in this case 1 UST). Once the message is constructed, the `post` method on `connectedWallet` broadcasts it to the network.

What happens if something goes wrong? Wallet provider also supplies us with useful error types. In this example we are handling the `UserDenied` error case. You can find other cases to handle [here](https://github.com/terra-money/wallet-provider/blob/4e601c2dece7bec92c9ce95991d2314220a2c954/packages/src/%40terra-money/wallet-controller/exception/mapExtensionTxError.ts#L23).

*NOTE: 1000000 uusd = 1 UST*

```js
import { Fee, MsgSend } from '@terra-money/terra.js';
import { useConnectedWallet, UserDenied } from '@terra-money/wallet-provider';
import React, { useCallback, useState } from 'react';

const TEST_TO_ADDRESS = 'terra12hnhh5vtyg5juqnzm43970nh4fw42pt27nw9g9';

export default function Tx() {
  const [txResult, setTxResult] = useState(null);
  const [txError, setTxError] = useState(null);

  const connectedWallet = useConnectedWallet();

  const sendTestTx = useCallback(async () => {
    if (!connectedWallet) {
      return;
    }
    if (connectedWallet.network.chainID.startsWith('columbus')) {
      alert(`Only execute this example on Testnet`);
      return;
    }
  
    try {
      const transactionMsg = {
        fee: new Fee(1000000, '200000uusd'),
        msgs: [
          new MsgSend(connectedWallet.walletAddress, TEST_TO_ADDRESS, {
            uusd: 1000000,
          }),
        ],
      }

      const tx = await connectedWallet.post(transactionMsg);
      setTxResult(tx);
    } catch (error) {
      if (error instanceof UserDenied) {
        setTxError('User Denied');
      } else {
        setTxError(
          'Unknown Error: ' + (error instanceof Error ? error.message : String(error)),
        );
      }
    }
  }, [connectedWallet]);

  return (
    <>
      {connectedWallet?.availablePost && !txResult && !txError && (
        <button onClick={sendTestTx}>Send 1USD to {TEST_TO_ADDRESS}</button>
      )}

      {txResult && <>{JSON.stringify(txResult, null, 2)}</>}
      {txError && <pre>{txError}</pre>}

      {connectedWallet && !connectedWallet.availablePost && (
        <p>This connection does not support post()</p>
      )}
    </>
  );
}
```

That's all! You can find more examples of `WalletProvider` capabilities in the following example templates.

- [Wallet Provider + Create-React-App](https://githubbox.com/terra-money/wallet-provider/tree/main/templates/create-react-app)
- [Wallet Provider + Next.js](https://githubbox.com/terra-money/wallet-provider/tree/main/templates/next)
- [Wallet Provider + Vite.js](https://githubbox.com/terra-money/wallet-provider/tree/main/templates/vite)
- [Wallet Controller + Lit](https://githubbox.com/terra-money/wallet-provider/tree/main/templates/lit)
- [Wallet Controller + Vue.js](https://githubbox.com/terra-money/wallet-provider/tree/main/templates/vue)
- [Wallet Controller + Svelte](https://githubbox.com/terra-money/wallet-provider/tree/main/templates/svelte)