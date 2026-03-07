import { CircleDot, CheckCircle2, MessageSquare } from 'lucide-react';
import { Issue } from '../data/mockData';
import { Badge } from './ui/badge';

interface IssueListProps {
  issues: Issue[];
}

export default function IssueList({ issues }: IssueListProps) {
  return (
    <div className="border rounded-lg divide-y">
      {issues.map((issue) => (
        <div key={issue.id} className="p-4 hover:bg-gray-50 cursor-pointer">
          <div className="flex items-start gap-3">
            {issue.status === 'open' ? (
              <CircleDot className="w-5 h-5 text-green-600 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5" />
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm">{issue.title}</h3>
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-600">
                <span>
                  #{issue.id} opened on{' '}
                  {new Date(issue.createdAt).toLocaleDateString()} by{' '}
                  {issue.author}
                </span>
              </div>
              {issue.labels.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {issue.labels.map((label) => (
                    <Badge
                      key={label}
                      variant={
                        label.includes('bug')
                          ? 'destructive'
                          : label.includes('enhancement')
                          ? 'default'
                          : 'secondary'
                      }
                      className="text-xs"
                    >
                      {label}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            {issue.comments > 0 && (
              <div className="flex items-center gap-1 text-gray-600">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm">{issue.comments}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
