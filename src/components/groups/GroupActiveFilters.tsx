import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GroupType } from '@/types/group';
import { groupTypeLabels } from '@/data/groupsData';
import { cn } from '@/lib/utils';

interface GroupActiveFiltersProps {
  search: string;
  typeFilter: GroupType | 'all';
  onClearSearch: () => void;
  onResetType: () => void;
  onClearAll: () => void;
}

export function GroupActiveFilters({
  search,
  typeFilter,
  onClearSearch,
  onResetType,
  onClearAll,
}: GroupActiveFiltersProps) {
  const hasSearch = search.length > 0;
  const hasTypeFilter = typeFilter !== 'all';
  const hasAnyFilter = hasSearch || hasTypeFilter;

  if (!hasAnyFilter) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 bg-card rounded-lg border border-border animate-fade-in">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mr-1">
        Active Filters:
      </span>
      
      {hasSearch && (
        <FilterBadge 
          label={`Search: "${search}"`} 
          onRemove={onClearSearch}
          variant="search"
        />
      )}
      
      {hasTypeFilter && (
        <FilterBadge
          label={`Type: ${groupTypeLabels[typeFilter]}`}
          onRemove={onResetType}
          variant="type"
        />
      )}
      
      <Button
        variant="ghost"
        size="sm"
        onClick={onClearAll}
        className="h-6 px-2 ml-auto text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        Clear All
      </Button>
    </div>
  );
}

interface FilterBadgeProps {
  label: string;
  onRemove: () => void;
  variant: 'search' | 'type';
}

function FilterBadge({ label, onRemove, variant }: FilterBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "gap-1 pr-1 font-normal animate-slide-in",
        variant === 'search' && "bg-info/10 text-info border-info/20",
        variant === 'type' && "bg-accent/10 text-accent border-accent/20"
      )}
    >
      {label}
      <button
        onClick={onRemove}
        className="ml-0.5 rounded-full p-0.5 hover:bg-foreground/10 transition-colors"
      >
        <X className="h-3 w-3" />
      </button>
    </Badge>
  );
}
