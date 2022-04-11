# How to Integrate Terra Station

[Wallet Provider](https://github.com/terra-money/wallet-provider) makes it easy to build Terra Station (browser extension and mobile) functionality into your React application. It contains custom hooks that drastically simplifies common tasks like connecting a wallet and triggering transactions. 

*If you're using a frontend framework other than React you'll need [Wallet Controller](https://www.npmjs.com/package/@terra-money/wallet-controller) instead. Controller provides the sub-structure of Provider. You can see an example of how Wallet Controller works in the [Vue.js template example](https://githubbox.com/terra-money/wallet-provider/tree/main/templates/vue).* 

In this guide, we'll go over how to set up a react app, integrate wallet provider, check the balance of the connected account and trigger a token swap. If you want to integrate Terra Station into an existing react app you can skip past the `Project Setup` section. 

*Want to dive in? Use our premade React template*

`npx terra-templates get wallet-provider:create-react-app your-terra-app`
 

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





