import { Moon, Sun, Settings, Copy, Trash2, Shield } from 'lucide-react';
import { useTheme } from 'next-themes';

interface HeaderProps {
  onClear: () => void;
  onCopyDecoded: () => void;
  onVerify: () => void;
}

export function Header({ onClear, onCopyDecoded, onVerify }: HeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="border-b bg-background px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Shield className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-semibold">JWT Token Decoder</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={onClear}
            className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm hover:bg-accent transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            Clear
          </button>
          
          <button
            onClick={onCopyDecoded}
            className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm hover:bg-accent transition-colors"
          >
            <Copy className="h-4 w-4" />
            Copy Decoded
          </button>
          
          <button
            onClick={onVerify}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Shield className="h-4 w-4" />
            Verify Token
          </button>
          
          <div className="mx-2 h-6 w-px bg-border" />
          
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
          
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent transition-colors"
            aria-label="Settings"
          >
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
