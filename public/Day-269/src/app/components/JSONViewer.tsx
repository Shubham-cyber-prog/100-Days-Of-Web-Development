import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface JSONViewerProps {
  title: string;
  data: any;
  highlightKeys?: string[];
}

export function JSONViewer({ title, data, highlightKeys = [] }: JSONViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderValue = (value: any, key?: string): React.ReactNode => {
    const isHighlighted = key && highlightKeys.includes(key);
    
    if (value === null) {
      return <span className="text-purple-500">null</span>;
    }
    
    if (typeof value === 'boolean') {
      return <span className="text-purple-500">{value.toString()}</span>;
    }
    
    if (typeof value === 'number') {
      return <span className="text-blue-500">{value}</span>;
    }
    
    if (typeof value === 'string') {
      return (
        <span className={isHighlighted ? 'text-orange-500' : 'text-green-500'}>
          "{value}"
        </span>
      );
    }
    
    return <span className="text-foreground">{JSON.stringify(value)}</span>;
  };

  const renderObject = (obj: any, indent: number = 0): React.ReactNode => {
    if (typeof obj !== 'object' || obj === null) {
      return renderValue(obj);
    }

    const entries = Object.entries(obj);
    const spacing = '  '.repeat(indent);

    return (
      <>
        {'{'}
        <div>
          {entries.map(([key, value], index) => (
            <div key={key} className="pl-4">
              <span className="text-cyan-500">"{key}"</span>
              <span className="text-foreground">: </span>
              {typeof value === 'object' && value !== null ? (
                renderObject(value, indent + 1)
              ) : (
                renderValue(value, key)
              )}
              {index < entries.length - 1 && <span className="text-foreground">,</span>}
            </div>
          ))}
        </div>
        <span className="text-foreground">{'}'}</span>
      </>
    );
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h3 className="font-medium">{title}</h3>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm hover:bg-accent transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              Copy
            </>
          )}
        </button>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        <pre className="font-mono text-sm">
          {data ? renderObject(data) : <span className="text-muted-foreground">No data</span>}
        </pre>
      </div>
    </div>
  );
}
