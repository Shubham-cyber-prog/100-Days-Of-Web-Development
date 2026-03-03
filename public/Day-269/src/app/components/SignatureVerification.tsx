import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SignatureVerificationProps {
  signature: string;
  algorithm?: string;
  isExpired: boolean;
  payload: any;
}

export function SignatureVerification({ 
  signature, 
  algorithm, 
  isExpired,
  payload 
}: SignatureVerificationProps) {
  const [secretKey, setSecretKey] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [verificationStatus, setVerificationStatus] = useState<'valid' | 'invalid' | 'expired' | null>(null);

  useEffect(() => {
    if (isExpired) {
      setVerificationStatus('expired');
    } else if (signature) {
      setVerificationStatus(null);
    }
  }, [signature, isExpired]);

  const handleVerify = () => {
    // Mock verification - in a real app, this would verify the signature
    if (isExpired) {
      setVerificationStatus('expired');
    } else if (secretKey || publicKey) {
      setVerificationStatus('valid');
    } else {
      setVerificationStatus('invalid');
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="border-b px-4 py-3">
        <h2 className="font-semibold">Signature & Verification</h2>
      </div>
      
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* Algorithm Display */}
        {algorithm && (
          <div>
            <label className="text-sm font-medium text-muted-foreground">Algorithm</label>
            <div className="mt-1 rounded-md bg-accent px-3 py-2 font-mono text-sm">
              {algorithm}
            </div>
          </div>
        )}

        {/* Signature Display */}
        <div>
          <label className="text-sm font-medium text-muted-foreground">Signature (Base64)</label>
          <div className="mt-1 max-h-24 overflow-auto rounded-md bg-accent px-3 py-2 font-mono text-sm break-all">
            {signature || 'No signature'}
          </div>
        </div>

        {/* Verification Status */}
        {verificationStatus && (
          <div className="rounded-md border p-3">
            {verificationStatus === 'valid' && (
              <div className="flex items-center gap-2 text-green-500">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">Signature Valid</span>
              </div>
            )}
            {verificationStatus === 'invalid' && (
              <div className="flex items-center gap-2 text-red-500">
                <XCircle className="h-5 w-5" />
                <span className="font-medium">Signature Invalid</span>
              </div>
            )}
            {verificationStatus === 'expired' && (
              <div className="flex items-center gap-2 text-orange-500">
                <Clock className="h-5 w-5" />
                <span className="font-medium">Token Expired</span>
              </div>
            )}
          </div>
        )}

        {/* Secret Key Input (for HMAC) */}
        {algorithm?.startsWith('HS') && (
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Secret Key (HMAC)
            </label>
            <input
              type="password"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              placeholder="Enter secret key..."
              className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        )}

        {/* Public Key Input (for RSA) */}
        {algorithm?.startsWith('RS') && (
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Public Key (RSA)
            </label>
            <textarea
              value={publicKey}
              onChange={(e) => setPublicKey(e.target.value)}
              placeholder="-----BEGIN PUBLIC KEY-----&#10;...&#10;-----END PUBLIC KEY-----"
              className="mt-1 w-full resize-none rounded-md border bg-background px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              rows={4}
            />
          </div>
        )}

        <button
          onClick={handleVerify}
          className="w-full rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Verify Signature
        </button>
      </div>
    </div>
  );
}
