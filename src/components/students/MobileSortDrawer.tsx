import { useState } from 'react';
import { ArrowUpDown, ChevronDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { SortOption } from '@/types/student';
import { cn } from '@/lib/utils';

interface MobileSortDrawerProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string; group: string }[] = [
  { value: 'name-asc', label: 'A → Z', group: 'Student Name' },
  { value: 'name-desc', label: 'Z → A', group: 'Student Name' },
  { value: 'submission-recent', label: 'Most Recent', group: 'Submissions' },
  { value: 'submission-oldest', label: 'Oldest First', group: 'Submissions' },
  { value: 'help-recent', label: 'Most Recent', group: 'Help Requests' },
  { value: 'help-oldest', label: 'Oldest First', group: 'Help Requests' },
  { value: 'present-first', label: 'Present First', group: 'Presence' },
  { value: 'absent-first', label: 'Absent First', group: 'Presence' },
  { value: 'tasks-high', label: 'Most Tasks', group: 'Tasks Count' },
  { value: 'tasks-low', label: 'Fewest Tasks', group: 'Tasks Count' },
];

const defaultSort: SortOption = 'name-asc';
const sortGroups = ['Student Name', 'Submissions', 'Help Requests', 'Presence', 'Tasks Count'];

export function MobileSortDrawer({ value, onChange }: MobileSortDrawerProps) {
  const [open, setOpen] = useState(false);
  const isCustomSort = value !== defaultSort;

  const handleSelect = (sortValue: SortOption) => {
    onChange(sortValue);
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "flex-1 h-10 gap-2 px-3 bg-card border-border justify-between",
            isCustomSort && "border-accent bg-accent/5"
          )}
        >
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-sm">SORT</span>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="border-b border-border">
          <DrawerTitle className="text-left">Sort Students By</DrawerTitle>
        </DrawerHeader>

        <ScrollArea className="flex-1 max-h-[60vh]">
          <div className="p-4 space-y-4">
            {sortGroups.map((groupName) => {
              const groupOptions = sortOptions.filter(o => o.group === groupName);
              const isActiveGroup = groupOptions.some(o => o.value === value);
              
              return (
                <div key={groupName}>
                  <div className={cn(
                    "text-xs font-semibold uppercase tracking-wider mb-2",
                    isActiveGroup ? "text-accent" : "text-muted-foreground"
                  )}>
                    {groupName}
                  </div>
                  <div className="space-y-1">
                    {groupOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSelect(option.value)}
                        className={cn(
                          "flex items-center justify-between w-full px-3 py-3 rounded-lg text-sm transition-colors",
                          "active:bg-muted",
                          value === option.value 
                            ? "bg-accent/10 text-accent font-medium" 
                            : "text-foreground"
                        )}
                      >
                        <span>{option.label}</span>
                        {value === option.value && (
                          <Check className="h-4 w-4 text-accent" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
        
        <DrawerFooter className="border-t border-border">
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)}
            className="w-full"
          >
            Cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
