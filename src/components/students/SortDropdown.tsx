import { useState } from 'react';
import { ArrowUpDown, ChevronDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SortOption } from '@/types/student';
import { cn } from '@/lib/utils';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string; group: string }[] = [
  { value: 'name-asc', label: 'A → Z', group: 'Student Name' },
  { value: 'name-desc', label: 'Z → A', group: 'Student Name' },
  { value: 'submission-recent', label: 'Most Recent', group: 'Submissions' },
  { value: 'submission-oldest', label: 'Oldest First', group: 'Submissions' },
  { value: 'submission-high', label: 'Most Count', group: 'Submissions' },
  { value: 'submission-low', label: 'Least Count', group: 'Submissions' },
  { value: 'help-recent', label: 'Most Recent', group: 'Help Requests' },
  { value: 'help-oldest', label: 'Oldest First', group: 'Help Requests' },
  { value: 'help-high', label: 'Most Count', group: 'Help Requests' },
  { value: 'help-low', label: 'Least Count', group: 'Help Requests' },
  { value: 'present-first', label: 'Present First', group: 'Presence' },
  { value: 'absent-first', label: 'Absent First', group: 'Presence' },
  { value: 'tasks-high', label: 'Most Tasks', group: 'Tasks Count' },
  { value: 'tasks-low', label: 'Fewest Tasks', group: 'Tasks Count' },
];

const defaultSort: SortOption = 'name-asc';

const sortGroups = ['Student Name', 'Submissions', 'Help Requests', 'Presence', 'Tasks Count'];

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [open, setOpen] = useState(false);
  const isCustomSort = value !== defaultSort;
  
  const currentOption = sortOptions.find(opt => opt.value === value);

  const handleSelect = (sortValue: SortOption) => {
    onChange(sortValue);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "h-10 gap-2 px-3 bg-card border-border transition-all duration-200 min-w-[100px]",
            isCustomSort && "border-accent bg-accent/5"
          )}
        >
          <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">SORT</span>
          {isCustomSort && currentOption && (
            <span className="text-xs text-accent font-normal hidden sm:inline">
              ({currentOption.group})
            </span>
          )}
          <ChevronDown className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            open && "rotate-180"
          )} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0 bg-popover border-border shadow-lg" align="end">
        <div className="p-3 border-b border-border">
          <span className="font-semibold text-sm">Sort Students By</span>
        </div>
        
        <ScrollArea className="max-h-80">
          <div className="p-1">
            {sortGroups.map((groupName, index) => (
              <SortGroup 
                key={groupName}
                title={groupName}
                options={sortOptions.filter(o => o.group === groupName)}
                currentValue={value}
                onSelect={handleSelect}
                showDivider={index > 0}
              />
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}

interface SortGroupProps {
  title: string;
  options: { value: SortOption; label: string }[];
  currentValue: SortOption;
  onSelect: (value: SortOption) => void;
  showDivider?: boolean;
}

function SortGroup({ title, options, currentValue, onSelect, showDivider }: SortGroupProps) {
  const isActiveGroup = options.some(o => o.value === currentValue);
  
  return (
    <div className={cn("py-1", showDivider && "border-t border-border mt-1 pt-2")}>
      <div className={cn(
        "px-2 py-1.5 text-xs font-semibold uppercase tracking-wider",
        isActiveGroup ? "text-accent" : "text-muted-foreground"
      )}>
        {title}
      </div>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onSelect(option.value)}
          className={cn(
            "flex items-center justify-between w-full px-2 py-2 rounded-md text-sm transition-colors",
            "hover:bg-muted",
            currentValue === option.value && "bg-accent/10 text-accent font-medium"
          )}
        >
          <span>{option.label}</span>
          {currentValue === option.value && (
            <Check className="h-4 w-4 text-accent" />
          )}
        </button>
      ))}
    </div>
  );
}
