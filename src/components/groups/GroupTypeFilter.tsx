import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { GroupType } from '@/types/group';
import { groupTypeLabels } from '@/data/groupsData';

interface GroupTypeFilterProps {
  selected: GroupType | 'all';
  onChange: (type: GroupType | 'all') => void;
}

const filterTypes: (GroupType | 'all')[] = ['all', 'studio', 'anchor', 'flex', 'other'];

export function GroupTypeFilter({ selected, onChange }: GroupTypeFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filterTypes.map((type) => (
        <Button
          key={type}
          variant="outline"
          size="sm"
          onClick={() => onChange(type)}
          className={cn(
            "h-9 px-4 rounded-md border transition-all duration-200",
            selected === type
              ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
              : "bg-card text-foreground border-border hover:bg-muted hover:border-primary/50"
          )}
        >
          {groupTypeLabels[type]}
        </Button>
      ))}
    </div>
  );
}
