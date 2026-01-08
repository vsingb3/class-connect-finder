import { useState } from 'react';
import { ArrowUpDown, ChevronDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { SortOption } from '@/types/student';
import { cn } from '@/lib/utils';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string; group: string }[] = [
  { value: 'name-asc', label: 'Name (A → Z)', group: 'Name' },
  { value: 'name-desc', label: 'Name (Z → A)', group: 'Name' },
  { value: 'submission-recent', label: 'Most Recent', group: 'Submissions' },
  { value: 'submission-oldest', label: 'Oldest First', group: 'Submissions' },
  { value: 'help-recent', label: 'Most Recent', group: 'Help Requests' },
  { value: 'help-oldest', label: 'Oldest First', group: 'Help Requests' },
];

const defaultSort: SortOption = 'name-asc';

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [open, setOpen] = useState(false);
  const isCustomSort = value !== defaultSort;
  
  const currentOption = sortOptions.find(opt => opt.value === value);
  const displayLabel = currentOption ? `${currentOption.group}: ${currentOption.label}` : 'Sort';

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
          <ChevronDown className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            open && "rotate-180"
          )} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0 bg-popover border-border shadow-lg" align="end">
        <div className="p-3 border-b border-border">
          <span className="font-semibold text-sm">Sort Students</span>
        </div>
        
        <div className="p-1">
          <SortGroup 
            title="Name"
            options={sortOptions.filter(o => o.group === 'Name')}
            currentValue={value}
            onSelect={handleSelect}
          />
          <SortGroup 
            title="Submissions"
            options={sortOptions.filter(o => o.group === 'Submissions')}
            currentValue={value}
            onSelect={handleSelect}
          />
          <SortGroup 
            title="Help Requests"
            options={sortOptions.filter(o => o.group === 'Help Requests')}
            currentValue={value}
            onSelect={handleSelect}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

interface SortGroupProps {
  title: string;
  options: { value: SortOption; label: string }[];
  currentValue: SortOption;
  onSelect: (value: SortOption) => void;
}

function SortGroup({ title, options, currentValue, onSelect }: SortGroupProps) {
  return (
    <div className="py-1">
      <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
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
