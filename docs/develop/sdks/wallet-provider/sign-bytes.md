# Signing Bytes

This document explains how to sign arbitrary bytes with WalletProvider in a react-based web application. This action is useful for verifying account ownership without having to post a transaction. It's commonly used as a form of simple user authentication.

It will also cover common error handling.

## 1. Connected Wallet Setup

To sign 

WalletProvider comes with `useConnectedWallet` which detects 
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

const TEST_BYTES = Buffer.from('hello terra');

export const SignBytes = () => {
  const [txResult, setTxResult] = useState<SignBytesResult | null>(null);
  const [txError, setTxError] = useState<string | null>(null);
  const [verifyResult, setVerifyResult] = useState<string | null>(null);

  const connectedWallet = useConnectedWallet();

  const send = useCallback(async () => {
    if (!connectedWallet) {
      return;
    }

    setTxResult(null);
    setTxError(null);
    setVerifyResult(null);

    try {
        const nextSignBytesResult: SignBytesResult = await connectedWallet.signBytes(TEST_BYTES);
        setTxResult(nextSignBytesResult);
        setTxError(null);
        const result = verifyBytes(TEST_BYTES, nextSignBytesResult.result);
        setVerifyResult(result ? 'Verify OK' : 'Verify failed');

    } catch (err) {
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
          <button onClick={() => send()}>
            Sign bytes with {connectedWallet.walletAddress}
          </button>
        )}

      {txResult && <pre>{JSON.stringify(txResult, null, 2)}</pre>}

      {txError && <pre>{txError}</pre>}

      {verifyResult && <pre>{verifyResult}</pre>}

      {(!!txResult || !!txError || !!verifyResult) && (
        <button
          onClick={() => {
            setTxResult(null);
            setTxError(null);
            setVerifyResult(null);
          }}
        >
          Clear result
        </button>
      )}

      {!connectedWallet && <p>Wallet not connected!</p>}

      {connectedWallet && !connectedWallet.availableSignBytes && (
        <p>This connection does not support signBytes()</p>
      )}
    </div>
  );
}
```
