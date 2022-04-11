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

It's common to to show the connected users UST balance. To achieve this you need two hooks. The first is `useLCDClient`. An `LCDClient` is essentially a REST-based adapter for the Terra blockchain. You can use it to query an account balance. The second is `useConnectedWallet`, which tells us if a wallet is connected, and if so, basic data about that wallet. 

```js
import { useConnectedWallet, useLCDClient } from '@terra-money/wallet-provider';
import React, { useEffect, useState } from 'react';

export default function Query() {
  const lcd = useLCDClient(); // LCD stands for Light Client Daemon
  const connectedWallet = useConnectedWallet();
  const [balance, setBalance] = useState(null);

  useEffect(() => { 
    if (connectedWallet) { 
      lcd.bank.balance(connectedWallet.walletAddress).then(([coins]) => {
        setBalance(coins.toString());
      });
    } else {
      setBalance(null);
    }
  }, [connectedWallet, lcd]); // useEffect is called when these variables change

  return (
    <div>
      <h1>Query</h1>
      {balance && <>{balance}</>}
      {!connectedWallet && <p>Wallet not connected!</p>}
    </div>
  );
}
```


