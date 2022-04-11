# How to Integrate Terra Station

[Wallet Provider](https://github.com/terra-money/wallet-provider) makes it easy to build Terra Station (browser extension and mobile) functionality into your React application. It contains custom hooks that drastically simplifies common tasks like connecting a wallet and triggering transactions. 

*If you're using a frontend framework other than React you'll need [Wallet Controller](https://www.npmjs.com/package/@terra-money/wallet-controller) instead. Controller provides the sub-structure of Provider. You can see an example of how Wallet Controller works in the [Vue.js template example](https://githubbox.com/terra-money/wallet-provider/tree/main/templates/vue).* 

In this guide, we'll go over how to set up a react app, integrate wallet provider, check the balance of the connected account and trigger a token swap. If you want to integrate Terra Station into an existing react app you can skip past the `Project Setup` section. 

*Just want to dive in? Check out the getting started section for our premade templates [here](https://github.com/terra-money/wallet-provider/).*
 

## Prerequisites

- [Terra Station Chrome extension](../../learn/terra-station/download/terra-station-extension.md)
- Node.js version 16+
- [NPM](https://www.npmjs.com/)

## Project Setup

To get started, we'll need basic React scaffolding. To generate this, run the following in your termainal.
```sh
npx create-react-app my-terra-app
cd my-terra-app
```

Next, let's install the `@terra-money/wallet-provider` package. 

```sh
npm install @terra-money/wallet-provider
```
Now we need to wrap our `App` with `<WalletProvider>` to give our components access to useful hooks and utilities we'll need to build out the integration. We'll also pass in information about Terra networks (e.g. the mainnet chainId) into the provider via `getChainOptions`. We'll need this information later. 

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


Now that we've exposed our app to the `WalletProvider` we can start putting our imports to work. The `useWallet` hook gives us a bunch of functionality. First, let's use it to connect our terra station extension to our web browser.

```js
import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
import React from 'react';

export function StationConnector() {
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
            <button onClick={() => disconnect()}>Disconnect</button>
        )}
    </>
  );
}


```
