import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Group, SortOption } from '@/types/student';
import { cn } from '@/lib/utils';

interface ActiveFiltersProps {
  search: string;
  selectedGroups: string[];
  sort: SortOption;
  groups: Group[];
  onClearSearch: () => void;
  onRemoveGroup: (groupId: string) => void;
  onResetSort: () => void;
  onClearAll: () => void;
}

const sortLabels: Record<SortOption, string> = {
  'name-asc': 'Name A→Z',
  'name-desc': 'Name Z→A',
  'submission-recent': 'Recent Submissions',
  'submission-oldest': 'Oldest Submissions',
  'help-recent': 'Recent Help Requests',
  'help-oldest': 'Oldest Help Requests',
  'present-first': 'Present First',
  'absent-first': 'Absent First',
  'tasks-high': 'Most Tasks',
  'tasks-low': 'Fewest Tasks',
};

export function ActiveFilters({
  search,
  selectedGroups,
  sort,
  groups,
  onClearSearch,
  onRemoveGroup,
  onResetSort,
  onClearAll,
}: ActiveFiltersProps) {
  const hasSearch = search.length > 0;
  const hasGroups = selectedGroups.length > 0;
  const hasCustomSort = sort !== 'name-asc';
  const hasAnyFilter = hasSearch || hasGroups || hasCustomSort;

  if (!hasAnyFilter) return null;

  const selectedGroupNames = selectedGroups.map(id => {
    const group = groups.find(g => g.id === id);
    return group ? group.name : id;
  });

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
      
      {selectedGroupNames.map((name, index) => (
        <FilterBadge
          key={selectedGroups[index]}
          label={name}
          onRemove={() => onRemoveGroup(selectedGroups[index])}
          variant="group"
        />
      ))}
      
      {hasCustomSort && (
        <FilterBadge
          label={sortLabels[sort]}
          onRemove={onResetSort}
          variant="sort"
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
  variant: 'search' | 'group' | 'sort';
}

function FilterBadge({ label, onRemove, variant }: FilterBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "gap-1 pr-1 font-normal animate-slide-in",
        variant === 'search' && "bg-info/10 text-info border-info/20",
        variant === 'group' && "bg-accent/10 text-accent border-accent/20",
        variant === 'sort' && "bg-warning/10 text-warning border-warning/20"
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
