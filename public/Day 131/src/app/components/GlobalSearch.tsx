import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { useAuthStore } from '../stores/authStore';
import { leadService, customerService, dealService, taskService } from '../services/api';
import type { SearchResult } from '../types';
import { Search, Loader2, FileText, UserPlus, Users, TrendingUp, CheckSquare } from 'lucide-react';

interface GlobalSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GlobalSearch({ open, onOpenChange }: GlobalSearchProps) {
  const navigate = useNavigate();
  const accessToken = useAuthStore((state) => state.accessToken);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpenChange(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onOpenChange]);

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }

    const searchTimer = setTimeout(() => {
      performSearch();
    }, 300);

    return () => clearTimeout(searchTimer);
  }, [query]);

  const performSearch = async () => {
    if (!accessToken) return;

    setIsSearching(true);
    try {
      const [leads, customers, deals, tasks] = await Promise.all([
        leadService.getAll(accessToken),
        customerService.getAll(accessToken),
        dealService.getAll(accessToken),
        taskService.getAll(accessToken),
      ]);

      const searchResults: SearchResult[] = [];
      const lowerQuery = query.toLowerCase();

      // Search leads
      leads.forEach(lead => {
        if (
          lead.name.toLowerCase().includes(lowerQuery) ||
          lead.email.toLowerCase().includes(lowerQuery)
        ) {
          searchResults.push({
            id: lead.id,
            type: 'lead',
            title: lead.name,
            subtitle: lead.email,
            metadata: lead.status,
          });
        }
      });

      // Search customers
      customers.forEach(customer => {
        if (
          customer.name.toLowerCase().includes(lowerQuery) ||
          customer.email.toLowerCase().includes(lowerQuery) ||
          customer.company.toLowerCase().includes(lowerQuery)
        ) {
          searchResults.push({
            id: customer.id,
            type: 'customer',
            title: customer.name,
            subtitle: customer.email,
            metadata: customer.company,
          });
        }
      });

      // Search deals
      deals.forEach(deal => {
        if (deal.title.toLowerCase().includes(lowerQuery)) {
          searchResults.push({
            id: deal.id,
            type: 'deal',
            title: deal.title,
            subtitle: `$${deal.value.toLocaleString()}`,
            metadata: deal.stage,
          });
        }
      });

      // Search tasks
      tasks.forEach(task => {
        if (
          task.title.toLowerCase().includes(lowerQuery) ||
          task.description.toLowerCase().includes(lowerQuery)
        ) {
          searchResults.push({
            id: task.id,
            type: 'task',
            title: task.title,
            subtitle: task.description,
            metadata: task.status,
          });
        }
      });

      setResults(searchResults.slice(0, 20));
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectResult = (result: SearchResult) => {
    onOpenChange(false);
    setQuery('');
    
    switch (result.type) {
      case 'lead':
        navigate('/leads');
        break;
      case 'customer':
        navigate('/customers');
        break;
      case 'deal':
        navigate('/deals');
        break;
      case 'task':
        navigate('/tasks');
        break;
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'lead':
        return <UserPlus className="w-4 h-4" />;
      case 'customer':
        return <Users className="w-4 h-4" />;
      case 'deal':
        return <TrendingUp className="w-4 h-4" />;
      case 'task':
        return <CheckSquare className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lead':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'customer':
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'deal':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300';
      case 'task':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Search Everything</DialogTitle>
          <DialogDescription>
            Search across all leads, customers, deals, and tasks
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search leads, customers, deals, tasks..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-10"
              autoFocus
            />
            {isSearching && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 animate-spin text-gray-400" />
            )}
          </div>

          {query.length > 0 && query.length < 2 && (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
              Type at least 2 characters to search
            </p>
          )}

          {query.length >= 2 && results.length === 0 && !isSearching && (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
              No results found for "{query}"
            </p>
          )}

          {results.length > 0 && (
            <div className="max-h-96 overflow-y-auto space-y-2">
              {results.map((result) => (
                <button
                  key={`${result.type}-${result.id}`}
                  onClick={() => handleSelectResult(result)}
                  className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
                >
                  <div className={`p-2 rounded-lg ${getTypeColor(result.type)}`}>
                    {getIcon(result.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-gray-900 dark:text-white truncate">
                        {result.title}
                      </p>
                      <Badge variant="outline" className="capitalize text-xs">
                        {result.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {result.subtitle}
                    </p>
                    {result.metadata && (
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 capitalize">
                        {result.metadata.replace('_', ' ')}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
