import { useState, useMemo } from 'react';
import { Users, ChevronDown, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Group } from '@/types/student';
import { cn } from '@/lib/utils';

interface GroupsFilterProps {
  groups: Group[];
  selectedGroups: string[];
  onChange: (selectedGroups: string[]) => void;
}

export function GroupsFilter({ groups, selectedGroups, onChange }: GroupsFilterProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const hasSelection = selectedGroups.length > 0;

  // Filter groups based on search
  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return groups;
    const query = searchQuery.toLowerCase();
    return groups.filter(g => g.name.toLowerCase().includes(query));
  }, [groups, searchQuery]);

  // Separate selected and unselected for better UX
  const selectedGroupsData = useMemo(() => 
    groups.filter(g => selectedGroups.includes(g.id)),
    [groups, selectedGroups]
  );

  // Group filtered results by type
  const regionGroups = filteredGroups.filter(g => g.type === 'region');
  const classGroups = filteredGroups.filter(g => g.type === 'class');

  const toggleGroup = (groupId: string) => {
    if (selectedGroups.includes(groupId)) {
      onChange(selectedGroups.filter(id => id !== groupId));
    } else {
      onChange([...selectedGroups, groupId]);
    }
  };

  const clearAll = () => {
    onChange([]);
    setSearchQuery('');
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setSearchQuery('');
    }
  };

  const totalGroups = groups.length;
  const matchingGroups = filteredGroups.length;

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
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
      <PopoverContent className="w-80 p-0 bg-popover border-border shadow-lg" align="start">
        {/* Header */}
        <div className="p-3 border-b border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-sm">Filter by Groups</span>
            <span className="text-xs text-muted-foreground">{totalGroups} groups</span>
          </div>
          
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search groups..."
              className="h-8 pl-8 pr-8 text-sm bg-muted/50 border-0 focus-visible:ring-1"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Selected Groups Quick View */}
        {hasSelection && !searchQuery && (
          <div className="p-2 border-b border-border bg-accent/5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-muted-foreground">Selected ({selectedGroups.length})</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearAll}
                className="h-5 px-1.5 text-xs text-destructive hover:text-destructive"
              >
                Clear all
              </Button>
            </div>
            <div className="flex flex-wrap gap-1">
              {selectedGroupsData.slice(0, 5).map((group) => (
                <Badge
                  key={group.id}
                  variant="secondary"
                  className="gap-1 pr-1 text-xs bg-accent/20 text-accent border-0"
                >
                  {group.name}
                  <button
                    onClick={() => toggleGroup(group.id)}
                    className="ml-0.5 rounded-full p-0.5 hover:bg-accent/30"
                  >
                    <X className="h-2.5 w-2.5" />
                  </button>
                </Badge>
              ))}
              {selectedGroupsData.length > 5 && (
                <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground border-0">
                  +{selectedGroupsData.length - 5} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Groups List */}
        <ScrollArea className="h-72">
          <div className="p-2">
            {searchQuery && (
              <div className="px-2 py-1.5 text-xs text-muted-foreground mb-1">
                {matchingGroups} of {totalGroups} groups match "{searchQuery}"
              </div>
            )}

            {filteredGroups.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-sm text-muted-foreground">No groups found</p>
                <p className="text-xs text-muted-foreground mt-1">Try a different search term</p>
              </div>
            ) : (
              <>
                {regionGroups.length > 0 && (
                  <>
                    <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider sticky top-0 bg-popover">
                      Regions ({regionGroups.length})
                    </div>
                    {regionGroups.map((group) => (
                      <GroupCheckboxItem
                        key={group.id}
                        group={group}
                        isSelected={selectedGroups.includes(group.id)}
                        onToggle={() => toggleGroup(group.id)}
                        highlight={searchQuery}
                      />
                    ))}
                  </>
                )}
                
                {classGroups.length > 0 && (
                  <>
                    {regionGroups.length > 0 && <Separator className="my-2" />}
                    <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider sticky top-0 bg-popover">
                      Classes ({classGroups.length})
                    </div>
                    {classGroups.map((group) => (
                      <GroupCheckboxItem
                        key={group.id}
                        group={group}
                        isSelected={selectedGroups.includes(group.id)}
                        onToggle={() => toggleGroup(group.id)}
                        highlight={searchQuery}
                      />
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        </ScrollArea>
        
        {/* Footer */}
        <div className="p-3 border-t border-border bg-muted/30 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {hasSelection ? `${selectedGroups.length} selected` : 'No filters applied'}
          </span>
          <Button 
            onClick={() => setOpen(false)} 
            size="sm"
            className="h-7 px-3 bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            Done
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

interface GroupCheckboxItemProps {
  group: Group;
  isSelected: boolean;
  onToggle: () => void;
  highlight?: string;
}

function GroupCheckboxItem({ group, isSelected, onToggle, highlight }: GroupCheckboxItemProps) {
  // Highlight matching text
  const renderName = () => {
    if (!highlight) return group.name;
    
    const index = group.name.toLowerCase().indexOf(highlight.toLowerCase());
    if (index === -1) return group.name;
    
    return (
      <>
        {group.name.slice(0, index)}
        <span className="bg-warning/30 text-foreground rounded px-0.5">
          {group.name.slice(index, index + highlight.length)}
        </span>
        {group.name.slice(index + highlight.length)}
      </>
    );
  };

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
        "text-sm flex-1",
        isSelected ? "font-medium text-foreground" : "text-muted-foreground"
      )}>
        {renderName()}
      </span>
    </label>
  );
}
