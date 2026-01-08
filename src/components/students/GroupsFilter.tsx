import { useState } from 'react';
import { Users, ChevronDown, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Group } from '@/types/student';
import { cn } from '@/lib/utils';

interface GroupsFilterProps {
  groups: Group[];
  selectedGroups: string[];
  onChange: (selectedGroups: string[]) => void;
}

export function GroupsFilter({ groups, selectedGroups, onChange }: GroupsFilterProps) {
  const [open, setOpen] = useState(false);
  const hasSelection = selectedGroups.length > 0;

  const regionGroups = groups.filter(g => g.type === 'region');
  const classGroups = groups.filter(g => g.type === 'class');

  const toggleGroup = (groupId: string) => {
    if (selectedGroups.includes(groupId)) {
      onChange(selectedGroups.filter(id => id !== groupId));
    } else {
      onChange([...selectedGroups, groupId]);
    }
  };

  const clearAll = () => {
    onChange([]);
  };

  const selectAll = () => {
    onChange(groups.map(g => g.id));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "h-10 gap-2 px-3 bg-card border-border transition-all duration-200",
            hasSelection && "border-accent bg-accent/5"
          )}
        >
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">GROUPS</span>
          {hasSelection && (
            <Badge 
              variant="default" 
              className="h-5 min-w-5 px-1.5 bg-accent text-accent-foreground rounded-full text-xs font-semibold"
            >
              {selectedGroups.length}
            </Badge>
          )}
          <ChevronDown className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            open && "rotate-180"
          )} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0 bg-popover border-border shadow-lg" align="start">
        <div className="flex items-center justify-between p-3 border-b border-border">
          <span className="font-semibold text-sm">Filter by Groups</span>
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={selectAll}
              className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
            >
              Select All
            </Button>
            {hasSelection && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearAll}
                className="h-7 px-2 text-xs text-destructive hover:text-destructive"
              >
                Clear
              </Button>
            )}
          </div>
        </div>
        
        <ScrollArea className="max-h-64">
          <div className="p-2">
            {regionGroups.length > 0 && (
              <>
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Regions
                </div>
                {regionGroups.map((group) => (
                  <GroupCheckboxItem
                    key={group.id}
                    group={group}
                    isSelected={selectedGroups.includes(group.id)}
                    onToggle={() => toggleGroup(group.id)}
                  />
                ))}
              </>
            )}
            
            {classGroups.length > 0 && (
              <>
                <Separator className="my-2" />
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Classes
                </div>
                {classGroups.map((group) => (
                  <GroupCheckboxItem
                    key={group.id}
                    group={group}
                    isSelected={selectedGroups.includes(group.id)}
                    onToggle={() => toggleGroup(group.id)}
                  />
                ))}
              </>
            )}
          </div>
        </ScrollArea>
        
        {hasSelection && (
          <div className="p-3 border-t border-border bg-muted/30">
            <Button 
              onClick={() => setOpen(false)} 
              className="w-full h-8 bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Apply Filter
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

interface GroupCheckboxItemProps {
  group: Group;
  isSelected: boolean;
  onToggle: () => void;
}

function GroupCheckboxItem({ group, isSelected, onToggle }: GroupCheckboxItemProps) {
  return (
    <label
      className={cn(
        "flex items-center gap-3 px-2 py-2 rounded-md cursor-pointer transition-colors",
        "hover:bg-muted",
        isSelected && "bg-accent/10"
      )}
    >
      <Checkbox
        checked={isSelected}
        onCheckedChange={onToggle}
        className="data-[state=checked]:bg-accent data-[state=checked]:border-accent"
      />
      <span className={cn(
        "text-sm",
        isSelected ? "font-medium text-foreground" : "text-muted-foreground"
      )}>
        {group.name}
      </span>
    </label>
  );
}
