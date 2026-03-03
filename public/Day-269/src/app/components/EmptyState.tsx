import { Shield } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center">
      <div className="rounded-full bg-accent p-6 mb-4">
        <Shield className="h-12 w-12 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-semibold mb-2">No Token Entered</h2>
      <p className="text-muted-foreground max-w-md">
        Paste a JWT token in the left panel to decode and view its header, payload, and signature.
      </p>
      <div className="mt-6 text-sm text-muted-foreground">
        <p className="mb-1">Example token format:</p>
        <code className="text-xs bg-accent px-2 py-1 rounded">
          header.payload.signature
        </code>
      </div>
    </div>
  );
}
