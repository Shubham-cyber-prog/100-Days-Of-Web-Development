import { Clock, Calendar, FileText, Key } from 'lucide-react';
import { useState, useEffect } from 'react';

interface TokenMetadataProps {
  iat?: number;
  exp?: number;
  algorithm?: string;
  tokenSize: number;
}

export function TokenMetadata({ iat, exp, algorithm, tokenSize }: TokenMetadataProps) {
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  useEffect(() => {
    if (!exp) return;

    const updateTimeRemaining = () => {
      const now = Math.floor(Date.now() / 1000);
      const diff = exp - now;

      if (diff <= 0) {
        setTimeRemaining('Expired');
        return;
      }

      const days = Math.floor(diff / 86400);
      const hours = Math.floor((diff % 86400) / 3600);
      const minutes = Math.floor((diff % 3600) / 60);
      const seconds = diff % 60;

      if (days > 0) {
        setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      } else if (hours > 0) {
        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
      } else if (minutes > 0) {
        setTimeRemaining(`${minutes}m ${seconds}s`);
      } else {
        setTimeRemaining(`${seconds}s`);
      }
    };

    updateTimeRemaining();
    const interval = setInterval(updateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [exp]);

  const formatDate = (timestamp?: number) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleString();
  };

  return (
    <div className="border-t bg-accent/50">
      <div className="px-4 py-3">
        <h2 className="font-semibold mb-3">Token Metadata</h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <div className="text-sm font-medium text-muted-foreground">Issued At</div>
              <div className="text-sm mt-0.5">{formatDate(iat)}</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <div className="text-sm font-medium text-muted-foreground">Expires At</div>
              <div className="text-sm mt-0.5">{formatDate(exp)}</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <div className="text-sm font-medium text-muted-foreground">Time Remaining</div>
              <div className={`text-sm mt-0.5 font-mono ${
                timeRemaining === 'Expired' ? 'text-red-500' : 'text-green-500'
              }`}>
                {timeRemaining || 'N/A'}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Key className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <div className="text-sm font-medium text-muted-foreground">Algorithm</div>
              <div className="text-sm mt-0.5 font-mono">{algorithm || 'N/A'}</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <div className="text-sm font-medium text-muted-foreground">Token Size</div>
              <div className="text-sm mt-0.5">{tokenSize} bytes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
