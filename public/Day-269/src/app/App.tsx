import { useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { Header } from './components/Header';
import { TokenInput } from './components/TokenInput';
import { DecodedView } from './components/DecodedView';
import { SignatureVerification } from './components/SignatureVerification';
import { TokenMetadata } from './components/TokenMetadata';
import { EmptyState } from './components/EmptyState';
import { ErrorState } from './components/ErrorState';
import { decodeJWT, isTokenExpired } from './utils/jwt';
import { toast } from 'sonner';
import { Toaster } from 'sonner';

function JWTDecoder() {
  const [token, setToken] = useState('');
  const [decodedToken, setDecodedToken] = useState<any>(null);

  useEffect(() => {
    if (!token.trim()) {
      setDecodedToken(null);
      return;
    }

    const decoded = decodeJWT(token);
    setDecodedToken(decoded);
  }, [token]);

  const handleClear = () => {
    setToken('');
    setDecodedToken(null);
    toast.success('Token cleared');
  };

  const handleCopyDecoded = () => {
    if (!decodedToken || !decodedToken.isValid) {
      toast.error('No valid token to copy');
      return;
    }

    const output = {
      header: decodedToken.header,
      payload: decodedToken.payload,
      signature: decodedToken.signature
    };

    navigator.clipboard.writeText(JSON.stringify(output, null, 2));
    toast.success('Decoded token copied to clipboard');
  };

  const handleVerify = () => {
    if (!decodedToken || !decodedToken.isValid) {
      toast.error('Please enter a valid token first');
      return;
    }

    toast.info('Configure verification settings in the right panel');
  };

  const isExpired = decodedToken?.payload ? isTokenExpired(decodedToken.payload) : false;
  const tokenSize = new Blob([token]).size;

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <Header 
        onClear={handleClear}
        onCopyDecoded={handleCopyDecoded}
        onVerify={handleVerify}
      />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Token Input */}
        <div className="w-1/3">
          <TokenInput
            value={token}
            onChange={setToken}
            isValid={token ? decodedToken?.isValid ?? false : null}
          />
        </div>

        {/* Middle Panel - Decoded View */}
        <div className="w-1/3">
          {!token ? (
            <EmptyState />
          ) : !decodedToken?.isValid ? (
            <ErrorState message={decodedToken?.error || 'Invalid token format'} />
          ) : (
            <DecodedView
              header={decodedToken.header}
              payload={decodedToken.payload}
            />
          )}
        </div>

        {/* Right Panel - Signature Verification */}
        <div className="w-1/3">
          {decodedToken?.isValid ? (
            <SignatureVerification
              signature={decodedToken.signature}
              algorithm={decodedToken.header?.alg}
              isExpired={isExpired}
              payload={decodedToken.payload}
            />
          ) : (
            <div className="flex h-full items-center justify-center p-8 text-center">
              <p className="text-muted-foreground">
                Enter a valid token to view signature details
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Panel - Metadata */}
      {decodedToken?.isValid && (
        <TokenMetadata
          iat={decodedToken.payload?.iat}
          exp={decodedToken.payload?.exp}
          algorithm={decodedToken.header?.alg}
          tokenSize={tokenSize}
        />
      )}

      <Toaster position="bottom-right" />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <JWTDecoder />
    </ThemeProvider>
  );
}
