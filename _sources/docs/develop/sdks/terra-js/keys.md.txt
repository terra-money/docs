# Keys

To perform actions using an account and private-public key pairs with Terra.js, you need an implementation of the [ *Key* ](https://github.com/terra-money/terra.js/blob/main/src/key/Key.ts) class, which provides an abstraction around the signing functions of an account. There are multiple implementations available: 

[ *RawKey* ](https://github.com/terra-money/terra.js/blob/main/src/key/RawKey.ts)
[ *MnemonicKey* ](https://github.com/terra-money/terra.js/blob/main/src/key/MnemonicKey.ts) 
[ *CLIKey* ](https://github.com/terra-money/terra.js/blob/main/src/key/CLIKey.ts) 

You can also create a custom signing solution by extending the base [ *Key* ](https://github.com/terra-money/terra.js/blob/main/src/key/Key.ts) class.


## `RawKey`

The most basic implementation of a `Key` is a `RawKey`, which is created using a plain private key. `RawKey`  wraps the 32 bytes of a private key and supplies a corresponding public key:

```ts
import { RawKey } from '@terra-money/terra.js';
import {randomBytes} from 'crypto'
let see = console.log;

const raw_key = new RawKey(randomBytes(32));

see(raw_key.publicKey)//SimplePublicKey { key: 'AlNdglClnFJMwdeFGlfFTAwbx7rxKxWbgN/lwj5mQ3vw' }
see(raw_key.privateKey)//<Buffer 53 e2 53 0b 29 c4 9d 54 b3 66 a4 61 7b d3 e2 6e 4c e5 41 cd 12 a6 e9 27 8a 97 61 1c 55 6e cd 4c>
see(raw_key.accAddress)//terra1ptj88nsljjr9agx07hahu6etv43acksy2q44sd
```

## `MnemonicKey`


A `MnemonicKey` derives itself from a 24-word  [ BIP-39 ](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) mnemonic as opposed to the bytes of a  private key.
A `MnemonicKey` has various levels of definition: 
- Supply no arguments for the mnemonic to be randomly generated ( effectively generating a random key ).
- Supply only a 24-word BIP-39 mnemonic to generate a corresponding key.
- Supply a full HD path (using either a  random or particular mnenomic).

```ts
import { MnemonicKey } from '@terra-money/terra.js';
const see = console.log;

const MNE_KEY_RANDOM = new MnemonicKey();

see(MNE_KEY_RANDOM.mnemonic)  // famous { ... } myth world size
see(MNE_KEY_RANDOM.privateKey) // <Buffer 4f e5 { ... } 51 a4 41 9c> 
see(MNE_KEY_RANDOM.publicKey) // SimplePublicKey { key: 'A8TNSJhn6gGHgY2ohJnkOaZz7Y0FaW/QeytGBaqCLIJU' }
see(MNE_KEY_RANDOM.accAddress) // terra1l63e8q7yjyd77qanwfgvl43ulagf34a2xzcuv4


const MNE_KEY_EXACT  = new MnemonicKey({
  mnemonic: "squirrel future level fan world organ daring thing color orange sausage cross fault interest blast wink audit unfair satoshi solution track indoor sun edit",
});

const MNE_KEY_RANDOM_WITH_HD_PATH = new MnemonicKey({
  // mnemonic: "",   // optional, will be random if not provided
  coinType: 330,               // optional, default
  account : 0,                 // optional, default
  index   : 0,                 // optional, default
});

const MNE_KEY_FULLY_RESOLVED = new MnemonicKey({
  mnemonic: "squirrel future level fan world organ daring thing color orange sausage cross fault interest blast wink audit unfair satoshi solution track indoor sun edit",   
  coinType: 330,               
  account : 0,                 
  index   : 0,                
});

```

## `CLIKey`

> NOTE: This keytype requires you to have `terrad` installed.

If you want to use keys stored in your `terrad` installation's keyring to sign transactions, you can use `CLIKey`. This approach also works for keys that have been registered in your keyring with `--ledger`, using a Ledger hardware device.

```ts
import { StdFee, MsgSend } from '@terra-money/terra.js';
import { LocalTerra } from '@terra-money/terra.js';
import { CLIKey } from '@terra-money/terra.js';

const terra     = new LocalTerra();
const { test1 } = terra.wallets;
const cliKey    = new CLIKey('test111');
const cliWallet = terra.wallet(cliKey);

const send = new MsgSend(cliWallet.key.accAddress, test1.key.accAddress, {
  uluna: 100000,
});

async function main() {
  const tx = await cliWallet.createAndSignTx({
    msgs: [send],
    fee: new StdFee(100000, { uluna: 100000 }),
  });

  console.log(await terra.tx.broadcast(tx));
}

main().catch(console.error);
```

### Specifying an HD path

`MnemonicKey` can used to recover a wallet with a particular BIP44 HD path: `m/44'/${coinType}'/${account}'/0/${index}`.

:::{admonition} HD keys
:class: tip

As per [ *Cosmos HD Key Derivation* ](https://github.com/confio/cosmos-hd-key-derivation-spec):

Cosmos blockchains support hierarchical deterministic key generation (HD keys) for deriving multiple cryptographic keypairs from a single secret value. This allows the user to use different keypairs for different accounts on one blockchain and create accounts on multiple blockchains without having to manage multiple secrets.

:::

For example, to recover a mnemonic with the old Terra wallet HD path using coin type for ATOM (118):

```ts
const mne_key = new MnemonicKey({
  mnemonic: "[ Your BIP39 mnemonic ]",
  coinType: 118     // <--------- Cosmos' coin type ( Terra had inherited initially )
});
```

- [ BIP-39 Mnemonics ](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)

- Coin Types Numbers `330` and `118` above refer to "coin-types" for `Cosmos` and `Terra` blockchains accordingly. These numbers are defined according to the [ BIP044 ](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) standard. You can find more information [ here ](https://github.com/satoshilabs/slips/blob/master/slip-0044.md).

## Custom key implementation

If you need to write your own key management solution, you will need to subclass the abstract `Key` class and provide your own signing function. Instead of exposing details pertaining to your private key, you can specify a `sign()` function that forwards the signing request to a server or to a hardware wallet. The remaining functions related to signing (`createSignature()` and `signTx()`) are automatically provided and use `sign()` underneath.

The following code listing is close to the implementation of `RawKey`, which illustrates how to write a custom `Key`:

```ts
import SHA256 from 'crypto-js/sha256';
import * as secp256k1 from 'secp256k1';
import { Key } from '@terra-money/terra.js';

/**
 * An implementation of the Key interfaces that uses a raw private key.
 */
export class NaiveCustomImplementation extends Key {

  /**
   * Raw private key, in bytes.
   */
  public privateKey: Buffer;

  constructor(privateKey: Buffer) {
    const publicKey = secp256k1.publicKeyCreate(
      new Uint8Array(privateKey),
      true
    );
    super(new SimplePublicKey(Buffer.from(publicKey).toString('base64')));
    this.privateKey = privateKey;
  }

  public sign(payload: Buffer): Promise<Buffer> {
    const hash = Buffer.from(SHA256(payload.toString()).toString(), 'hex');
    const { signature } = secp256k1.ecdsaSign(
      Uint8Array.from(hash),
      Uint8Array.from(this.privateKey)
    );
    return new Promise(()=>{Buffer.from(signature)});
  }
}
```

Note that you must call `super()` with the public key to generate the relevant account and validator public keys associated with your key.
