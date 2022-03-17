# Anchor Earn SDK

![](<../.gitbook/assets/anchor earn\_logo.png>)

Anchor Earn is a JavaScript SDK that specializes for integrations that are wishing to leverage the deposit functionality of Anchor.

::: {note}
Anchor Earn only covers the savings-related operations of Anchor. For a SDK with full functional coverage (e.g. minting bLuna, borrowing UST), [Anchor.js](https://docs.anchorprotocol.com/developers-terra/anchor.js) is recommended.
:::

Anchor Earn is designed with interchain access in mind. Further releases of Anchor Earn are to enable integrations for interchain deposits, opening up savings for applications outside of the Terra blockchain. With the use of [EthAnchor](../developers-ethereum/ethanchor.md), BscAnchor, SolAnchor, etc., Anchor Earn is to be further expanded to enable savings regardless of blockchain or the type of stablecoin.

A complete list of supported blockchains and stablecoins are outlined in the [appendix section](appendix.md).

For those interested in reading the code, please refer to the [Anchor Earn repository](https://github.com/Anchor-Protocol/anchor-earn).

## Installation

::: {note}
Anchor Earn requires NPM and Node.js 12 or above for its proper usage.
:::

Anchor Earn is available as a package on NPM. Add `@anchor-protocol/anchor-earn` to your JavaScript project's `package.json` as dependencies using preferred package manager:

```
npm install -S @anchor-protocol/anchor-earn
```

or

```
yarn add @anchor-protocol/anchor-earn
```

## Initialization

### Initializing Anchor Earn

#### `AnchorEarn({chain, network, privateKey?, MnemonicKey?, address?})`

`AnchorEarn` creates an instance of the `AnchorEarn` object, used as the entry point to the Anchor Earn SDK.

A blockchain account is required when calling this function. Register the account's private key or mnemonics from which transactions will be signed and broadcasted. If you do not have a pre-created blockchain account, a new account can be created using the [`Account`](anchor-earn-sdk.md#creating-a-new-blockchain-account) instance.

While Anchor Earn by default handles transaction signing and broadcasting, these operations can be handed off to a callback function that connects with external key-signing solutions (e.g. Terra Station Extension, Ledger Hardware Wallet, Custodian APIs). For this case, the `AnchorEarn` instance should be created by the pre-created account's address.

**Method Parameters**

| Parameter / Type / Optionality / Description                                                                                                                                                                                                                                                                                                                    |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <p><strong><code>chain</code>   </strong>   (<a href="anchor-earn-sdk.md#chains">CHAINS</a>) <strong>   </strong><em><strong>Required</strong></em></p><p> Blockchain to interact from.</p><p></p><p>For Anchor Earn v1.0, only <code>CHAINS.TERRA</code> (Terra blockchain) is supported.</p>                                                                  |
| <p><strong><code>network</code></strong>   (<a href="anchor-earn-sdk.md#networks">NETWORKS</a>)   <em><strong>Required</strong></em></p><p> Network to interact in.</p>                                                                                                                                                                                         |
| <p><strong><code>privateKey</code></strong>   (Buffer | any)   <em>Optional</em></p><p>Account private key.</p>                                                                                                                                                                                                                                                 |
| <p><strong><code>mnemonic</code></strong>   (string | any)   <em>Optional</em></p><p>Account mnemonics.</p>                                                                                                                                                                                                                                                     |
| <p><strong><code>address</code></strong>   (string)   <em>Optional</em> </p><p>Account address.</p><p></p><p>Required if transactions are to be signed / broadcasted remotely with the use of <a href="anchor-earn-sdk.md#customsigner"><code>customSigner</code></a> or <a href="anchor-earn-sdk.md#custombroadcaster"><code>customBroadcaster</code></a>.</p> |

**Example**

```javascript
const anchorEarn = new AnchorEarn({
  chain: CHAINS.TERRA,
  network: NETWORKS.BOMBAY_12,
  mnemonic: '...',
});
```



### Creating a New Blockchain Account

#### `Account(chain)`

Creating an instance of the `Account` object generates a new blockchain account.

::: {note}
Tokens for testnet environments (e.g. Bombay) can be acquired using faucets, outlined in the [appendix](appendix.md#testnet-faucets) section.
:::

**Method Parameters**

| Parameter / Type / Optionality / Description                                                                                                                                |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <p><strong><code>chain</code></strong>   (<a href="anchor-earn-sdk.md#chains">CHAINS</a>)   <em><strong>Required</strong></em></p><p>Blockchain to generate account on.</p> |

**Example**

```javascript
// generate a new Terra account 
const account = new Account(CHAINS.TERRA); 
```

The `Account` instance contains the information for the newly created account.

```javascript
export class Account {
  accAddress: AccAddress;
  publicKey: string;
  privateKey: Buffer;
  mnemonic: string;
}
```

{% hint style="danger" %}
`privateKey` and `mnemonic` constitute as your access key to your account, including the control of your assets.

**PLEASE RECORD AND STORE THEM IN A SAFE PLACE AND NEVER SHARE EXTERNALLY.**
:::

**Attributes**

| Attribute / Type / Description                                                           |
| ---------------------------------------------------------------------------------------- |
| <p><strong><code>accAddress</code></strong>   (AccAddress)</p><p>Address of account.</p> |
| <p><strong><code>publicKey</code></strong>   (string)</p><p>Public key of account.</p>   |
| <p><strong><code>privateKey</code></strong>   (Buffer)</p><p>Private key of account.</p> |
| <p><strong><code>mnemonic</code></strong>   (string)</p><p>Mnemonics of account.</p>     |

### Generating an Account with Mnemonics

#### `MnemonicKey({mnemonic})`

An account can also be generated using existing mnemonics. The `MnemonicKey` object is borrowed from Terra.js, allowing integrators to access it without any dependencies on Terra.js.

**Method Parameter**

| Parameter / Type / Optionality / Description                                                                              |
| ------------------------------------------------------------------------------------------------------------------------- |
| <p><strong><code>mnemonic</code></strong>   (string)   <em><strong>Required</strong></em></p><p>Mnemonics of account.</p> |

```javascript
import { Wallet, MnemonicKey } from '@anchor-protocol/anchor-earn';
const account = new MnemonicKey({
  mnemonic: '...',
});
```

## Usage

::: {warning}
For compatibility across tokens with various decimals, Anchor Earn unifies all currency amounts to use the **decimal representation**. As an example, a value of 10.1 in the amount field will lead to the utilization of 10.1 currency tokens.
:::

### Deposit Stablecoins to Anchor

#### `anchorEarn.deposit({currency, amount})`

This method deposits the specified amount of stablecoins to Anchor.

**Method Parameters**

| Parameter / Type / Optionality / Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <p><strong><code>currency</code></strong>   (<a href="anchor-earn-sdk.md#denoms">DENOMS</a>)   <em><strong>Required</strong></em></p><p>Currency of stablecoin to deposit.</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| <p><strong><code>amount</code></strong>   (string)   <em><strong>Required</strong></em></p><p>Amount of stablecoins to deposit.</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| <p><strong><code>CustomSigner</code></strong>   (callback function => <a href="https://terra-project.github.io/terra.js/modules/core_stdtx.stdtx.html">StdTx</a>)   <em>Optional</em></p><p>Callback function provided by the integrator that creates, signs a transaction encoding the deposit request and returns the signed transaction to be broadcasted by Anchor Earn.</p><p></p><p>Expects <a href="https://terra-project.github.io/terra.js/modules/core_stdtx.stdtx.html"><code>StdTx</code></a>, a transaction object used by the Terra blockchain (imported from <a href="https://terra-project.github.io/terra.js/index.html">Terra.js</a>).</p> |
| <p><strong><code>CustomBroadcaster</code></strong>   (callback function => string)   <em>Optional</em></p><p>Callback function provided by the integrator that creates, signs and broadcasts a transaction that encodes the deposit request. <br><br>Expects the tx hash of the broadcasted transaction in <code>string</code> format.</p>                                                                                                                                                                                                                                                                                                                   |
| <p><strong><code>Loggable</code></strong>   (callback function)   <em>Optional</em> </p><p>Callback function that logs transaction requests.</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

**Returns**

`anchorEarn.deposit` will return a `Promise` which resolves with either a [`OperationError`](anchor-earn-sdk.md#operationerror) or `TxOutput` object which implements the [`Output`](anchor-earn-sdk.md#output) interface.

**Example**

```javascript
const deposit = await anchorEarn.deposit({
  currency: DENOMS.UST,
  amount: '12.345', // 12.345 UST or 12345000 uusd
});
```



### Withdraw Stablecoins from Anchor

#### `anchorEarn.withdraw({currency, amount})`

This method withdraws the specified amount of stablecoins (or their aTerra counterpart) from Anchor.

::: {warning}
Note that the actual amount of stablecoins withdrawn will be smaller due to transfer fees (tax) enforced by the Terra blockchain.
:::

**Method Parameters**

| **Parameter / Type / Optionality / Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <p><strong><code>currency</code></strong>   (<a href="anchor-earn-sdk.md#denoms">DENOMS</a>)   <em><strong>Required</strong></em></p><p>Currency of stablecoin to withdraw or their aTerra counterpart.</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| <p><strong><code>amount</code></strong>   (string)   <em><strong>Required</strong></em></p><p>Amount of stablecoins (or their aTerra counterpart) to withdraw.</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| <p><strong><code>CustomSigner</code></strong>   (callback function => <a href="https://terra-project.github.io/terra.js/modules/core_stdtx.stdtx.html">StdTx</a>)   <em>Optional</em></p><p>Callback function provided by the integrator that creates, signs a transaction encoding the withdraw request and returns the signed transaction to be broadcasted by Anchor Earn.</p><p></p><p>Expects <a href="https://terra-project.github.io/terra.js/modules/core_stdtx.stdtx.html"><code>StdTx</code></a>, a transaction object used by the Terra blockchain (imported from <a href="https://terra-project.github.io/terra.js/index.html">Terra.js</a>).</p> |
| <p><strong><code>CustomBroadcaster</code></strong>   (callback function => string)   <em>Optional</em></p><p>Callback function provided by the integrator that creates, signs and broadcasts a transaction that encodes the withdraw request.</p><p></p><p>Expects the tx hash of the broadcasted transaction in <code>string</code> format.</p>                                                                                                                                                                                                                                                                                                              |
| <p><strong><code>Loggable</code></strong>   (callback function)   <em>Optional</em> </p><p>Callback function that logs transaction requests.</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

**Returns**

`anchorEarn.withdraw` will return a `Promise` which resolves with either a [`OperationError`](anchor-earn-sdk.md#operationerror) or `TxOutput` object which implements the [`Output`](anchor-earn-sdk.md#output) interface.

**Example**

```javascript
const withdraw = await anchorEarn.withdraw({
  currency: DENOMS.UST,
  amount: '12.345', // 12.345 UST or 12345000 uusd
});
```



### Send Tokens

#### `anchorEarn.send({currency, recipient, amount})`

Use `anchorEarn.send` to send tokens (stablecoins or their aTerra counterpart) to a different account.

**Method Parameters**

| Parameter / Type / Optionality / Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <p><strong><code>currency</code></strong>   (<a href="anchor-earn-sdk.md#denoms">DENOMS</a>)   <em><strong>Required</strong></em></p><p>Currency of token (stablecoins or their aTerra counterpart) to send.</p>                                                                                                                                                                                                                                                                                                                                                     |
| <p><strong><code>recipient</code></strong>   (string)   <em><strong>Required</strong></em></p><p>Recipient address to receive sent tokens.</p>                                                                                                                                                                                                                                                                                                                                                                                                                       |
| <p><strong><code>amount</code></strong>   (string)   <em><strong>Required</strong></em></p><p>Amount of tokens (stablecoins or their aTerra counterpart) to send.</p>                                                                                                                                                                                                                                                                                                                                                                                                |
| <p><strong><code>CustomSigner</code></strong>   (callback function => StdTx)   <em>Optional</em></p><p>Callback function provided by the integrator that creates, signs a transaction encoding the send request and returns the signed transaction to be broadcasted by Anchor Earn.</p><p></p><p>Expects <a href="https://terra-project.github.io/terra.js/modules/core_stdtx.stdtx.html"><code>StdTx</code></a>, a transaction object used by the Terra blockchain (imported from <a href="https://terra-project.github.io/terra.js/index.html">Terra.js</a>).</p> |
| <p><strong><code>CustomBroadcaster</code></strong>   (callback function => string)   <em>Optional</em></p><p>Callback function provided by the integrator that creates, signs and broadcasts a transaction that encodes the send request.</p><p></p><p>Expects the tx hash of the broadcasted transaction in <code>string</code> format.</p>                                                                                                                                                                                                                         |
| <p><strong><code>Loggable</code></strong>   (callback function)   <em>Optional</em> </p><p>Callback function that logs transaction requests.</p>                                                                                                                                                                                                                                                                                                                                                                                                                     |

**Returns**

`anchorEarn.send` will return a `Promise` which resolves with either a [`OperationError`](anchor-earn-sdk.md#operationerror) or `TxOutput` object which implements the [`Output`](anchor-earn-sdk.md#output) interface.

**Example**

```javascript
const sendUst = await anchorEarn.send({
  currency: DENOMS.UST, 
  recipient: 'terra1...', 
  amount: '12.345', // 12.345 UST or 12345000 uusd
});
```



### Retrieve Balance Information

#### `anchorEarn.balance({currencies})`

This method retrieves balance information for the specified stablecoins.&#x20;

**Method Parameters**

| Parameters / Type / Optionality / Description                                                                                                                                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <p><strong><code>currencies</code></strong>   (array of <a href="anchor-earn-sdk.md#denoms">DENOMS</a>)   <em><strong>Required</strong></em></p><p>List of currencies to retrieve balances.</p> |

**Returns**

`anchorEarn.balance` will return a `Promise` which resolves with a [`BalanceOutput`](anchor-earn-sdk.md#balanceoutput) object.

**Example**

```javascript
const balanceInfo = await anchorEarn.balance({
  currencies: [
    DENOMS.UST
  ],
});
```



### Retrieve Market Information

#### `anchorEarn.market({currencies})`

This method retrieves market information for the specified stablecoins.

**Method Parameters**

| Parameter / Type / Optionality / Description                                                                                                                                                                            |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <p><strong><code>currencies</code></strong>   (array of <a href="anchor-earn-sdk.md#denoms">DENOMS</a>)   <em><strong>Required</strong></em></p><p>List of stablecoins to retrieve information about their markets.</p> |

**Returns**

`anchorEarn.market` will return a `Promise` which resolves with a [`MarketOutput`](anchor-earn-sdk.md#marketoutput) object.

**Example**

```javascript
const marketInfo = await anchorEarn.market({
  currencies: [
    DENOMS.UST
  ],
});
```

## Resources

### CHAINS

The `CHAINS` enumerated type specifies blockchains that are supported by Anchor Earn.&#x20;

```javascript
export enum CHAINS {
  TERRA = 'terra',
}
```

Anchor Earn currently supports the following blockchains:

| Enum Member        | Blockchain Name                             |
| ------------------ | ------------------------------------------- |
| **`CHAINS.TERRA`** | [Terra blockchain](https://www.terra.money) |



### NETWORKS

The `NETWORKS` enumerated type specifies the network type to be used.&#x20;

```javascript
export enum NETWORKS {
  COLUMBUS_5,
  BOMBAY_12,
}
```

Anchor Earn supports mainnet and testnet networks with the below chain IDs:

{% tabs %}
{% tab title="Terra" %}
**Mainnet**

| Enum Member      | Chain ID     | Network Name |
| ---------------- | ------------ | ------------ |
| **`COLUMBUS_5`** | `columbus-5` | Columbus 5   |

**Testnet**

| Enum Member     | Chain ID    | Network Name |
| --------------- | ----------- | ------------ |
| **`BOMBAY_12`** | `bombay-12` | Bombay       |
{% endtab %}
{% endtabs %}



### DENOMS

Specifies stablecoin currency denominations.

```javascript
export enum DENOMS {
  UST = 'uusd',
  AUST = 'uaust',
}
```

Anchor Earn supports functionalities for the below stablecoin denominations:

{% tabs %}
{% tab title="Terra" %}
**Mainnet**

| Denomination | Code    | Decimals | Contract Address                                                                                                                           |
| ------------ | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| UST          | `uusd`  | 6        | Native Token                                                                                                                               |
| aUST         | `uaust` | 6        | [terra1hzh9vpxhsk8253se0vv5jj6etdvxu3nv8z07zu](https://finder.terra.money/columbus-4/address/terra1hzh9vpxhsk8253se0vv5jj6etdvxu3nv8z07zu) |

**Testnet**

| **Denomination** | Code    | Decimals | Contract Address                                                                                                                             |
| ---------------- | ------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| UST              | `uusd`  | 6        | Native Token                                                                                                                                 |
| aUST             | `uaust` | 6        | [terra1ajt556dpzvjwl0kl5tzku3fc3p3knkg9mkv8jl](https://finder.terra.money/tequila-0004/address/terra1ajt556dpzvjwl0kl5tzku3fc3p3knkg9mkv8jl) |
{% endtab %}
{% endtabs %}



### OperationError

Represents an error that was returned by a request.

```javascript
export interface OperationError {
  chain: string;
  network: string;
  status: STATUS;
  type: TxType;
  error_msg: string;
}
```

**Attributes**

| Attribute / Type / Description                                                                                                                                                                                                                                                                                                                                                                                                                |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <p><strong><code>chain</code></strong>   (<a href="anchor-earn-sdk.md#chains">CHAINS</a>)</p><p>Blockchain from which the request was made.</p>                                                                                                                                                                                                                                                                                               |
| <p><strong><code>network</code></strong>   (<a href="anchor-earn-sdk.md#networks">NETWORKS</a>)</p><p>Network from which the request was made.</p>                                                                                                                                                                                                                                                                                            |
| <p><strong><code>status</code></strong>   (<a href="anchor-earn-sdk.md#status">STATUS</a>)</p><p>Request status. <br><br>Should display <code>UNSUCCESSFUL</code> as the request encountered an error.</p>                                                                                                                                                                                                                                    |
| <p><strong><code>type</code></strong>   (<a href="anchor-earn-sdk.md#txtype">TxType</a>)</p><p>Request type. Can be either of: </p><p></p><ul><li><code>deposit</code>: request is a transaction that deposits stablecoins to Anchor.</li><li><code>withdraw</code>: request is a transaction that withdraws stablecoins from Anchor.</li><li><code>send</code>: request is a transaction that sends tokens to a different account.</li></ul> |
| <p><strong><code>error_msg</code></strong>   (string)</p><p>Human-readable sentence describing the error.</p>                                                                                                                                                                                                                                                                                                                                 |



### Output

Represents information for a request made via Anchor Earn.

```javascript
export interface Output {
  chain: string;
  network: string;
  status: STATUS;
  type: TxType;
  currency: string;
  amount: string;
  txDetails: TxDetails[];
  txFee: string;
  deductedTax?: string;
}
```

**Attributes**

| Attribute / Type / Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <p><strong><code>chain</code></strong>   (string)</p><p>Blockchain from which the request was made.</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| <p><strong><code>network</code></strong>   (string)</p><p>Network from which the request was made.</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| <p><strong><code>status</code></strong>   (<a href="anchor-earn-sdk.md#status">STATUS</a>)</p><p>Request status. Can be either of:<br></p><ul><li><code>STATUS.INPROGRESS</code>: request is in flight.</li><li><code>STATUS.SUCESSFUL</code>: request was successfully processed.</li><li><code>STATUS.UNSUCESSFUL</code>: request failed.</li></ul>                                                                                                                                                                                                                                                                                                                                 |
| <p><strong><code>type</code></strong>   (<a href="anchor-earn-sdk.md#txtype">TxType</a>)</p><p>Request type. Can be either of:</p><p></p><ul><li><code>deposit</code>: request is a transaction that deposits stablecoins to Anchor.</li><li><code>withdraw</code>: request is a transaction that withdraws stablecoins from Anchor.</li><li><code>send</code>: request is a transaction that sends tokens to a different account.</li></ul>                                                                                                                                                                                                                                          |
| <p><strong><code>currency</code></strong>   (string)</p><p>Currency of token (stablecoin or their aTerra counterpart).</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| <p><strong><code>amount</code></strong>   (string)</p><p>Amount of <code>currency</code> tokens utilized in the request.</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| <p><strong><code>txDetails</code></strong>   (array of <a href="anchor-earn-sdk.md#txdetails">TxDetails</a>)</p><p>Transaction details.</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| <p><strong><code>txFee</code></strong>   (string)</p><p>Amount of transaction fees spent by the requester.</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| <p><strong><code>deductedTax</code></strong>   (string)</p><p>Amount of stablecoins that were deducted from the deposit / withdraw amount.</p><p></p><p>Deduction can occur from three causes: </p><ul><li><a href="https://docs.terra.money/luna.html#taxes">Taxes</a> - fees charged on Terra transactions.</li><li><a href="https://github.com/terra-project/shuttle#relaying-fee">Shuttle Fees</a> - fees charged on interchain token transfers.</li><li>Stablecoin Swap Fees - value lost as fees / slippage during conversion.</li></ul><p></p><p>Applies only for withdrawals on Terra, and deposits / withdrawals to / from outside the Terra blockchain (e.g. Ethereum).</p> |



### STATUS

Represents the progress status of a previously made request.

```javascript
export enum STATUS {
  INPROGRESS = 'in-progress', 
  SUCCESSFUL = 'successful',
  UNSUCCESSFUL = 'unsuccessful',
}
```

| Enum Member        | Description                        |
| ------------------ | ---------------------------------- |
| **`INPROGRESS`**   | Request is in flight               |
| **`SUCCESSFUL`**   | Request was successfully processed |
| **`UNSUCCESSFUL`** | Request failed                     |



### TxType

Represents the type of a request.

```javascript
export enum TxType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  SEND = 'send',
}
```

| Enum Member    | Description                                                       |
| -------------- | ----------------------------------------------------------------- |
| **`DEPOSIT`**  | Request is a transaction that deposits stablecoins to Anchor      |
| **`WITHDRAW`** | Request is a transaction that withdraws stablecoins from Anchor   |
| **`SEND`**     | Request is a transaction that sends tokens to a different account |



### TxDetails

Represents the details of a transaction.

```javascript
export interface TxDetails {
  chain: string;
  height: number;
  timestamp: Date;
  txHash: string;
}
```

**Attributes**

| **Attribute / Type / Description**                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------- |
| <p><strong><code>chain</code></strong>   (string)</p><p>Blockchain on which the transaction occurred on.</p>              |
| <p><strong><code>height</code></strong>   (number)</p><p>Block height of the block that the transaction was included.</p> |
| <p><strong><code>timestamp</code></strong>   (Date)</p><p>Timestamp when the transaction was included in a block.</p>     |
| <p><strong><code>txHash</code></strong>   (string)</p><p>Transaction hash of the transaction.</p>                         |



### BalanceOutput

The `BalanceOutput` namespace represents your balance.&#x20;

```javascript
export interface BalanceOutput {
    chain: string; 
    network: string;
    height: number;
    timestamp: Date;
    address: string;
    balances: BalanceEntry[];
    total_account_balance_in_ust: string;
    total_deposit_balance_in_ust: string;
}
```

**Attributes**

| Attribute / Type / Description                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------ |
| <p><strong><code>chain</code></strong>   (string)<br>Blockchain that the account resides on.</p>                                                 |
| <p><strong><code>network</code></strong>   (string)</p><p>Network that the account resides on.</p>                                               |
| <p><strong><code>height</code></strong>   (number)</p><p>Block height when the information was queried from the blockchain.</p>                  |
| <p><strong><code>timestamp</code></strong>   (Date)</p><p>Timestamp when the information was queried from the blockchain.</p>                    |
| <p><strong><code>address</code></strong>   (string)</p><p>Address of the account that was used to retrieve its balance.</p>                      |
| <p><strong><code>balances</code></strong>   (array of <a href="anchor-earn-sdk.md#balanceentry">BalanceEntry</a>)</p><p>Balance information.</p> |
| <p><strong><code>total_account_balance_in_ust</code></strong>   (string)</p><p>Total value of account's stablecoin balance valued in UST.</p>    |
| <p><strong><code>total_deposit_balance_in_ust</code></strong>   (string)</p><p>Total value of account's deposit balance valued in UST.</p>       |



### BalanceEntry

Represents balance information for a specific stablecoin.

```javascript
export interface BalanceEntry {
  currency: string;
  account_balance: string;
  deposit_balance: string;
}
```

**Attributes**

| Attribute / Type / Description                                                                                       |
| -------------------------------------------------------------------------------------------------------------------- |
| <p><strong><code>currency</code></strong>   (string)</p><p>Currency of stablecoin.</p>                               |
| <p><strong><code>account_balance</code></strong>   (string)</p><p>Account balance for this stablecoin.</p>           |
| <p><strong><code>deposit_balance</code></strong>   (string)</p><p>Account's deposit balance for this stablecoin.</p> |



### MarketOutput

Represents overall market information.&#x20;

```javascript
export interface MarketOutput {
    chain: string; 
    network: string;
    height: number;
    timestamp: Date;
    markets: MarketEntry[];
}
```

**Attributes**

| Attribute / Type / Description                                                                                                               |
| -------------------------------------------------------------------------------------------------------------------------------------------- |
| <p><strong><code>chain</code></strong>   (string)</p><p>Blockchain that the market resides on.</p>                                           |
| <p><strong><code>network</code></strong>   (string)</p><p>Network that the market resides on.</p>                                            |
| <p><strong><code>height</code></strong>   (number)</p><p>Block height when the information was queried from the blockchain.</p>              |
| <p><strong><code>timestamp</code></strong>   (Date)</p><p>Timestamp when the information was queried from the blockchain.</p>                |
| <p><strong><code>markets</code></strong>   (Array of <a href="anchor-earn-sdk.md#marketentry">MarketEntry</a>)</p><p>Market information.</p> |



### MarketEntry

```javascript
export interface MarketEntry {
  currency: string;
  liquidity: string;
  APY: string;
}
```

**Attributes**

| Attribute / Type / Description                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <p><strong><code>currency</code></strong>   (string)</p><p>Currency of stablecoin.</p>                                                                                                                                         |
| <p><strong><code>liquidity</code></strong>   (string)</p><p>Amount of stablecoins that are available for withdrawal.</p><p></p><p>Attempting to withdraw stablecoins in excess of this amount may lead to request failure.</p> |
| <p><strong><code>APY</code></strong>   (string)</p><p>Annualized yield for deposits of this stablecoin.</p>                                                                                                                    |



### CustomSigner

A utility function that allows remote signing of transaction (e.g. Ledger Hardware Wallet, Custodian APIs). When provided, Anchor Earn would act as a message/unsignedTx generator, and all transaction creation and signing should be handled within the function. `customSigner` should throw an error if any step results in failures. &#x20;

```javascript
export interface CustomSigner<T, K> {
  customSigner?: (tx: T) => Promise<K>;
}
```

{% tabs %}
{% tab title="Terra" %}
| Generic Type Notation | Type    | Description                                                |
| --------------------- | ------- | ---------------------------------------------------------- |
| `T` (Argument)        | Msg\[ ] | Terra message array used to create an unsigned transaction |
| `K` (Expected Output) | StdTx   | Signed transaction                                         |
{% endtab %}
{% endtabs %}



### CustomBroadcaster

A utility function that allows remote signing and broadcasting of transaction (e.g. Web Wallet Extensions). When provided, Anchor Earn would act as a message generator, and all transaction creation & signing & broadcasting should be handled within the function. `customBroadcaster` should throw an error if any step results in failures. &#x20;

```javascript
export interface CustomBroadcaster<T, K> {
  customBroadcaster?: (tx: T) => Promise<K>;
}
```

{% tabs %}
{% tab title="Terra" %}
| Generic Type Notation | Type    | Description                                                |
| --------------------- | ------- | ---------------------------------------------------------- |
| `T` (Argument)        | Msg\[ ] | Terra message array used to create an unsigned transaction |
| `K` (Expected Output) | string  | Hash of broadcasted transaction                            |
{% endtab %}
{% endtabs %}



### Loggable

A utility function that allows observation of the transaction progress. When provided, the function is called every time there is a state update to the transaction. Particularly useful in case of EthAnchor transactions (not supported in this version), as EthAnchor operations are asynchronous and there are multiple interim states.

```javascript
export interface Loggable<T> {
  log?: (data: T) => Promise<void> | void;
}
```

{% tabs %}
{% tab title="Terra" %}
| Generic Type Notation | Type                                | Description               |
| --------------------- | ----------------------------------- | ------------------------- |
| `T` (Argument)        | [Output](anchor-earn-sdk.md#output) | Transaction progress data |
| `K` (Expected Output) | void                                | nil                       |
{% endtab %}
{% endtabs %}
