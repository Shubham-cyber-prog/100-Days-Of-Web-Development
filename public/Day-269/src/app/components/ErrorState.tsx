import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  message: string;
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center">
      <div className="rounded-full bg-red-500/10 p-6 mb-4">
        <AlertCircle className="h-12 w-12 text-red-500" />
      </div>
      <h2 className="text-xl font-semibold mb-2 text-red-500">Invalid Token</h2>
      <p className="text-muted-foreground max-w-md">
        {message}
      </p>
      <div className="mt-6 text-sm text-muted-foreground">
        <p>A valid JWT token should have three parts separated by dots:</p>
        <code className="text-xs bg-accent px-2 py-1 rounded mt-2 inline-block">
          header.payload.signature
        </code>
      </div>
    </div>
  );
}
