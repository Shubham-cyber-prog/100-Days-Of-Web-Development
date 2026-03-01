import { FileText, FolderOpen, Tag, Users, Search, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";

interface EmptyStateProps {
  icon?: "articles" | "categories" | "tags" | "team" | "search" | "error";
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

const iconMap = {
  articles: FileText,
  categories: FolderOpen,
  tags: Tag,
  team: Users,
  search: Search,
  error: AlertCircle,
};

export function EmptyState({
  icon = "articles",
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  const Icon = iconMap[icon];

  return (
    <div className="bg-card border border-border rounded-xl p-12 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
          <Icon className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-[18px] font-semibold mb-2">{title}</h3>
        <p className="text-[14px] text-muted-foreground mb-6">{description}</p>
        {actionLabel && onAction && (
          <Button onClick={onAction}>{actionLabel}</Button>
        )}
      </div>
    </div>
  );
}

export function ErrorState({
  title = "Something went wrong",
  description = "We encountered an error while loading this content. Please try again.",
  actionLabel = "Try Again",
  onRetry,
}: {
  title?: string;
  description?: string;
  actionLabel?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="bg-card border border-destructive/20 rounded-xl p-12 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-destructive" />
        </div>
        <h3 className="text-[18px] font-semibold mb-2">{title}</h3>
        <p className="text-[14px] text-muted-foreground mb-6">{description}</p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline">
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}

export function NoSearchResults({ query }: { query: string }) {
  return (
    <div className="bg-card border border-border rounded-xl p-12 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
          <Search className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-[18px] font-semibold mb-2">No results found</h3>
        <p className="text-[14px] text-muted-foreground mb-2">
          We couldn't find any results for{" "}
          <span className="font-medium text-foreground">"{query}"</span>
        </p>
        <p className="text-[13px] text-muted-foreground">
          Try adjusting your search or filters to find what you're looking for
        </p>
      </div>
    </div>
  );
}