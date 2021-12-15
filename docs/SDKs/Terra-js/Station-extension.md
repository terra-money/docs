# Terra Station extension

The API for the Terra Station extension is undergoing rapid development and is highly unstable. If you are developing a dApp, please check regularly for updates as breaking changes may be introduced frequently.

## What is the Terra Station extension?

The Terra Station extension is a web-wallet extension for Chrome that enables webpages to create requests for signing and broadcasting transactions. The webpage can detect the presence of Station Extension and generate a prompt whereby the user can confirm the transaction to be signed.

## Wallet Provider

Wallet Provider is a library that simplifies the development of React dApps that use Terra Station extension or Terra Station mobile.

Use one of the following templates to get quickly get started using Wallet Provider: 

### Create React App

```sh
npx copy-github-directory https://github.com/terra-money/wallet-provider/tree/main/templates/create-react-app your-app-name
cd your-app-name
yarn install
yarn start
```

[Learn more](https://github.com/terra-money/wallet-provider/tree/main/templates/create-react-app)

### Next.js

```sh
npx copy-github-directory https://github.com/terra-money/wallet-provider/tree/main/templates/next your-app-name
cd your-app-name
yarn install
yarn run dev
```

[Learn more](https://github.com/terra-money/wallet-provider/tree/main/templates/next)

### Experimental templates

- [Wallet Provider + Vite.js](https://github.com/terra-money/wallet-provider/tree/main/templates/vite)
- [Wallet Controller](https://github.com/terra-money/wallet-provider/tree/main/templates/wallet-controller)

::: tip
The Wallet Controller template is an example of how WalletController behaves underneath the React API. If you are unable to use React, start by using the Wallet Controller template.
:::

## Usage 

Visit the Wallet Provider GitHub for more details on using the APIs provided: 

[https://github.com/terra-money/wallet-provider](https://github.com/terra-money/wallet-provider#basic-usage)