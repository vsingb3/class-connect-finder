import { ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SchoolGroup } from '@/types/group';
import { cn } from '@/lib/utils';

interface GroupCardProps {
  group: SchoolGroup;
}

const typeColors: Record<string, string> = {
  studio: 'text-primary',
  anchor: 'text-primary',
  flex: 'text-primary',
  other: 'text-muted-foreground',
};

export function GroupCard({ group }: GroupCardProps) {
  const displayMembers = group.members.slice(0, 4);
  const remainingCount = Math.max(0, group.studentCount - displayMembers.length);

  return (
    <div className="bg-card rounded-lg border-l-4 border-l-success border border-border p-4 shadow-card hover:shadow-card-hover transition-all duration-200 cursor-pointer animate-fade-in">
      <div className="flex items-center gap-4">
        {/* Group Name and Members */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-primary uppercase tracking-wide text-sm mb-1">
            {group.name}
          </h3>
          <p className="text-sm text-muted-foreground truncate">
            {displayMembers.join(', ')}
            {remainingCount > 0 && `,+${remainingCount} more`}
          </p>
        </div>

        {/* Type Badge */}
        <div className="flex-shrink-0 w-20 text-center">
          <span className={cn('text-sm capitalize', typeColors[group.type])}>
            {group.type.charAt(0).toUpperCase() + group.type.slice(1)}
          </span>
        </div>

        {/* Student Count */}
        <div className="flex-shrink-0 w-28 text-center">
          <span className="text-primary font-medium">
            {group.studentCount} Students
          </span>
        </div>

        {/* Arrow */}
        <div className="flex-shrink-0">
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}
