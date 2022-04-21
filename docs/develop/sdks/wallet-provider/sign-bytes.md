# Signing Bytes

This document explains how to sign arbitrary bytes with Wallet Provider in a react-based web application. This action is useful for verifying account ownership without having to post a transaction to the chain. It's commonly used as a form of simple user authentication.

*You can find this code used in context [here](https://github.com/terra-money/wallet-provider/blob/main/templates/create-react-app/src/components/SignBytesSample.tsx). Not using react? Use [wallet-controller](https://www.npmjs.com/package/@terra-money/wallet-controller)*.

The Wallet Provider comes with a `useConnectedWallet` hook, which lets you trigger actions from a Terra wallet that's connected to the web page. The `connectedWallet` object includes a `.signBytes()` method, which prompts the user to sign the data and then returns an object of type `SignBytesResult`. The returned `SignBytesResult` object contains the address of the signer and the signed data.

The `verifyBytes` function then compares the original `TEST_BYTES` against the signature and public key pairing provided by the `SignBytesResult`. If it returns `true`, then the account is indeed under the owernship of the connected wallet and vice versa. In this way, the owner of the associated wallet is verified without having to produce an on-chain action or pay gas fees.

*You can see how the `verifyBytes` function works under the hood [here](https://github.com/terra-money/wallet-provider/blob/4e601c2dece7bec92c9ce95991d2314220a2c954/packages/src/%40terra-money/wallet-controller/verifyBytes.ts#L1).*

Finally, Wallet Provider also supplies useful error types that can be used in conjunction with a `catch` to direct or notify the user of whether the signing was sucessful.

```ts
 import {
  SignBytesFailed,
  SignBytesResult,
  Timeout,
  useConnectedWallet,
  UserDenied,
  verifyBytes,
} from '@terra-money/wallet-provider';
import React, { useCallback, useState } from 'react';

const TEST_BYTES = Buffer.from('hello'); // resolves to <Buffer 68 65 6c 6c 6f>

export function SignBytesSample() {
  const [txResult, setTxResult] = useState<SignBytesResult | null>(null);
  const [txError, setTxError] = useState<string | null>(null);
  const [verifyResult, setVerifyResult] = useState<string | null>(null);

  const connectedWallet = useConnectedWallet();

  const signBytes = useCallback(async () => {
    if (!connectedWallet) {
      return;
    }

    try {
        const signedBytes: SignBytesResult = await connectedWallet.signBytes(TEST_BYTES);
        setTxResult(signedBytes);
        setTxError(null);
        const result = verifyBytes(TEST_BYTES, signedBytes.result);
        setVerifyResult(result ? 'Verified' : 'Verification failed');

    } catch (error) {
        setTxResult(null);
        setVerifyResult(null);
        if (error instanceof UserDenied) {
            setTxError('User Denied');
        } else if (error instanceof Timeout) {
            setTxError('Timeout');
        } else if (error instanceof SignBytesFailed) {
            setTxError('Sign Bytes Failed');
        } else {
            setTxError(
            'Unknown Error: ' +
                (error instanceof Error ? error.message : String(error)),
            );
        }
    }
  }, [connectedWallet]);

  return (
    <div>
      <h1>Sign Bytes Sample</h1>

      {connectedWallet?.availableSignBytes &&
        !txResult &&
        !txError &&
        !verifyResult && (
          <button onClick={() => signBytes()}>
            Sign bytes with {connectedWallet.walletAddress}
          </button>
        )}

      {txResult && <pre>{JSON.stringify(txResult, null, 2)}</pre>}

      {txError && <pre>{txError}</pre>}

      {verifyResult && <pre>{verifyResult}</pre>}

      {!connectedWallet && <p>Wallet not connected!</p>}

      {connectedWallet && !connectedWallet.availableSignBytes && (
        <p>This connection does not support signBytes()</p>
      )}
    </div>
  );
}
```

You can find a working sandbox example of bytes signing with Terra Station [here](https://codesandbox.io/s/github/terra-money/wallet-provider/tree/main/templates/create-react-app).