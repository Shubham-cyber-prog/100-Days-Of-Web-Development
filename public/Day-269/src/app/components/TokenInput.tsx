import { CheckCircle2, XCircle } from 'lucide-react';

interface TokenInputProps {
  value: string;
  onChange: (value: string) => void;
  isValid: boolean | null;
}

const EXAMPLE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE5MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

export function TokenInput({ value, onChange, isValid }: TokenInputProps) {
  return (
    <div className="flex h-full flex-col border-r">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h2 className="font-semibold">Encoded JWT</h2>
        {isValid !== null && (
          <div className="flex items-center gap-2">
            {isValid ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-500">Valid Structure</span>
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4 text-red-500" />
                <span className="text-sm text-red-500">Invalid Token</span>
              </>
            )}
          </div>
        )}
      </div>
      
      <div className="flex-1 p-4">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={EXAMPLE_TOKEN}
          className="h-full w-full resize-none rounded-md border bg-background p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          spellCheck={false}
        />
      </div>
    </div>
  );
}
