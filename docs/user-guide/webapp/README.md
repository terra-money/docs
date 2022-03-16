# WebApp

**The Anchor WebApp is the official web frontend for interacting with Anchor Protocol on the Terra network. The WebApp can be accessed at** [**https://app.anchorprotocol.com**](https://app.anchorprotocol.com)**.**

The **Anchor WebApp** offers a graphical user interface for accessing Anchor's core user operations, such as depositing & redeeming Terra stablecoins, minting bAsset tokens, borrowing Terra stablecoins with bAssets as collateral, and participating in Anchor governance.

{% hint style="warning" %}
The Anchor web app requires [Google Chrome](https://www.google.com/chrome/) and [Station Extension](https://chrome.google.com/webstore/detail/terra-station/aiifbnbfobpmeekipheeijimdpnlpgpp) to be installed. Please follow the instructions below to set up your browser to be able to access the WebApp.
{% endhint %}

## Terra Station Extension

{% hint style="warning" %}
As of March 17th, 2021, Station Extension is only available for Chromium-based web browsers.
{% endhint %}

Station Extension is a Chrome extension that lets users interact with smart contract web frontends with an embedded in-browser wallet. When a user makes an interaction on Anchor WebApp, the WebApp will generate a transaction in the proper format that encodes the user's desired operation. Station Extension will detect and prompt the user to sign and broadcast the transaction to actually execute the operation.

### Installing Station Extension

1. Run [Google Chrome](https://www.google.com/chrome/). Station Extension is only available for Chromium-based web browsers.  &#x20;
2. Install Station Extension [here](https://chrome.google.com/webstore/detail/terra-station/aiifbnbfobpmeekipheeijimdpnlpgpp?hl=en).&#x20;
3. **Terra Station** should now be visible on the extensions tray.&#x20;

### Creating a new wallet

1\. Open **Station Extension**

2\. Select **New Wallet**

![](<../../.gitbook/assets/Picture 1 (2).png>)

3\. Set a wallet name and password. **Make sure to record the created 24 word seed phrase in a secure storage**. Select **\[Next]** to proceed.

![](<../../.gitbook/assets/Picture 2.png>)

4\. Confirm the created seed phrase by inputting the correct words.

![](<../../.gitbook/assets/Picture 3.png>)

5\. Select **\[Create a wallet]** to finish.

![](<../../.gitbook/assets/Picture 4.png>)



### Accessing with the Ledger Hardware Wallet

Terra Station Extension allows users to connect and sign transactions with their Ledger Nano S or Nano X. To access Ledger from Station Extension, users should:&#x20;

* Install Terra application using [Ledger Live](https://www.ledger.com/ledger-live/download/) application. The Developer Mode on Ledger Live application from Settings > Experimental Features must be enabled to install Terra application. \

* The Ledger device must be connected to the user's computer via USB. Station Extension **does not support connecting with Bluetooth**.

To access Ledger from Terra Station Extension, the following steps are required:&#x20;

1\. Connect and unlock your Ledger device

2\. Open Terra application from Ledger

3\. Select **\[Access with ledger]** on Terra Station Extension menu

![](<../../.gitbook/assets/Picture 5.png>)

4\. Once Ledger has been successfully connected with Terra Station Extension, transactions can be signed with Ledger.

![](https://gblobscdn.gitbook.com/assets%2F-MLRzugf7mxc4ryNhTuq%2F-MMsz0hiKUhlI7K6Hu4t%2F-MMt82XaR7Sxw6v-WBj-%2Fimage.png?alt=media\&token=0ae3faab-111c-4d95-b69d-4adee41f877d)



### Recovering an Existing Wallet

1\. Select **\[Recover existing wallet]**

![](<../../.gitbook/assets/Picture 6.png>)

2\. Enter a new wallet name and password.

![](<../../.gitbook/assets/Screen Shot 2021-02-16 at 10.46.49 PM.png>)

3\. Enter the 24 word seed phrase of the wallet to recover and select **\[Next]** to finish.

![](https://gblobscdn.gitbook.com/assets%2F-MLRzugf7mxc4ryNhTuq%2F-MMsCvhqtM-AVYonMZ2s%2F-MMsp341Aiv2HFDiOGsP%2Fimage.png?alt=media\&token=749f32cd-1d34-412b-9af1-486be5057025)

### Sending Tokens

1\. Select **\[Send]** button aligned to the tokens to send.

![](<../../.gitbook/assets/Picture 7.png>)

2\. Input the information below and select **\[Next]**:

* Address of the recipient
* Amount of tokens to send
* Memo (optional)

{% hint style="info" %}
Station Extension also support cross-chain token transfers to Ethereum addresses through the [Shuttle](https://github.com/terra-project/shuttle) bridge.&#x20;
{% endhint %}

![](<../../.gitbook/assets/Picture 8.png>)

3\. Set the denomination and amount of tokens to pay as transaction fees. Enter the password and click **\[Send]**.

![](<../../.gitbook/assets/Picture 9.png>)

4\. Station Extension will display the transaction result. Select **\[Ok]** to return to the main page.&#x20;

![](<../../.gitbook/assets/Picture 10.png>)

## Obtaining Terra Stablecoins

Anchor's money market uses Terra stablecoins as their base denomination. Users must have a balance of Terra stablecoins before they can interact with Anchor.

There are several ways to obtain Terra stablecoins:

* Swapping Luna for Terra stablecoins
* Purchasing Terra stablecoins from an exchange

### Swapping Luna for Terra Stablecoins

Users can swap Luna or Terra stablecoins such as TerraKRW (KRT), or TerraSDR (SDT) for the desired Terra stablecoin through the Terra blockchain's native swap functionality. The swap feature can be accessed at the "Swap" page of [Terra Station](https://station.terra.money), the official Terra desktop wallet.

1\. Navigate to the "Swap" page by clicking it on the sidebar. It should display a page similar to:

![](<../../.gitbook/assets/Picture 11.png>)

2\. Select the coin denomination to swap and the coin denomination to receive in the "Swap coins" section, found at the bottom of the page. The swap will be conducted based on the current "Terra exchange rate".

{% hint style="info" %}
The approximate spread and fee for performing the swap will be shown. The rules for determining the fees are covered in [Terra Docs](https://docs.terra.money/dev/spec-market).
{% endhint %}

3\. Click **\[Next]** and sign the transaction to complete the swap.&#x20;



### Purchasing Terra Stablecoins From an Exchange

Terra stablecoins can be obtained by directly purchasing them from cryptocurrency exchanges. Trading pairs of Terra stablecoins are available at various exchanges.

### TerraUSD (UST) Trading Pairs

| Exchange                       | Trading Pairs                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Bittrex](https://bittrex.com) | [USDT](https://global.bittrex.com/Market/Index?MarketName=USDT-UST), [BTC](https://global.bittrex.com/Market/Index?MarketName=BTC-UST)                                                                                                                                                                                                                                                  |
| [Kucoin](https://kucoin.com)   | [USDT](https://trade.kucoin.com/USDT-UST), [USDC](https://trade.kucoin.com/USDC-UST), [BTC](https://trade.kucoin.com/BTC-UST), [ETH](https://trade.kucoin.com/ETH-UST), [DOT](https://trade.kucoin.com/DOT-UST), [ATOM](https://trade.kucoin.com/ATOM-UST), [SNX](https://trade.kucoin.com/SNX-UST), [AAVE](https://trade.kucoin.com/AAVE-UST), [YFI](https://trade.kucoin.com/YFI-UST) |


```{toctree}
:hidden:
earn
borrow
bond
bond-beth
govern/README
```