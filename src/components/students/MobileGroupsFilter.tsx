import { useState, useMemo } from 'react';
import { Users, ChevronDown, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Group } from '@/types/student';
import { cn } from '@/lib/utils';

interface MobileGroupsFilterProps {
  groups: Group[];
  selectedGroups: string[];
  onChange: (selectedGroups: string[]) => void;
}

export function MobileGroupsFilter({ groups, selectedGroups, onChange }: MobileGroupsFilterProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const hasSelection = selectedGroups.length > 0;

  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return groups;
    const query = searchQuery.toLowerCase();
    return groups.filter(g => g.name.toLowerCase().includes(query));
  }, [groups, searchQuery]);

  const selectedGroupsData = useMemo(() => 
    groups.filter(g => selectedGroups.includes(g.id)),
    [groups, selectedGroups]
  );

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

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "flex-1 h-10 gap-2 px-3 bg-card border-border justify-between",
            hasSelection && "border-accent bg-accent/5"
          )}
        >
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-sm">GROUPS</span>
            {hasSelection && (
              <Badge 
                variant="default" 
                className="h-5 min-w-5 px-1.5 bg-accent text-accent-foreground rounded-full text-xs font-semibold"
              >
                {selectedGroups.length}
              </Badge>
            )}
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="border-b border-border pb-4">
          <DrawerTitle className="text-left">Filter by Groups</DrawerTitle>
          
          {/* Search Input */}
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search groups..."
              className="h-10 pl-10 pr-10 bg-muted/50 border-border"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </DrawerHeader>

        {/* Selected Groups Quick View */}
        {hasSelection && !searchQuery && (
          <div className="p-4 border-b border-border bg-accent/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">Selected ({selectedGroups.length})</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearAll}
                className="h-6 px-2 text-xs text-destructive hover:text-destructive"
              >
                Clear all
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedGroupsData.slice(0, 4).map((group) => (
                <Badge
                  key={group.id}
                  variant="secondary"
                  className="gap-1.5 pr-1.5 bg-accent/20 text-accent border-0"
                >
                  {group.name}
                  <button
                    onClick={() => toggleGroup(group.id)}
                    className="ml-0.5 rounded-full p-0.5 hover:bg-accent/30"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {selectedGroupsData.length > 4 && (
                <Badge variant="secondary" className="bg-muted text-muted-foreground border-0">
                  +{selectedGroupsData.length - 4} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Groups List */}
        <ScrollArea className="flex-1 max-h-[50vh]">
          <div className="p-4">
            {searchQuery && (
              <div className="text-sm text-muted-foreground mb-3">
                {filteredGroups.length} of {groups.length} groups match "{searchQuery}"
              </div>
            )}

            {filteredGroups.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">No groups found</p>
              </div>
            ) : (
              <>
                {regionGroups.length > 0 && (
                  <>
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Regions ({regionGroups.length})
                    </div>
                    <div className="space-y-1 mb-4">
                      {regionGroups.map((group) => (
                        <MobileGroupItem
                          key={group.id}
                          group={group}
                          isSelected={selectedGroups.includes(group.id)}
                          onToggle={() => toggleGroup(group.id)}
                          highlight={searchQuery}
                        />
                      ))}
                    </div>
                  </>
                )}
                
                {classGroups.length > 0 && (
                  <>
                    {regionGroups.length > 0 && <Separator className="my-4" />}
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Classes ({classGroups.length})
                    </div>
                    <div className="space-y-1">
                      {classGroups.map((group) => (
                        <MobileGroupItem
                          key={group.id}
                          group={group}
                          isSelected={selectedGroups.includes(group.id)}
                          onToggle={() => toggleGroup(group.id)}
                          highlight={searchQuery}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </ScrollArea>
        
        <DrawerFooter className="border-t border-border">
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => setOpen(false)}
              className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Apply ({selectedGroups.length})
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

interface MobileGroupItemProps {
  group: Group;
  isSelected: boolean;
  onToggle: () => void;
  highlight?: string;
}

function MobileGroupItem({ group, isSelected, onToggle, highlight }: MobileGroupItemProps) {
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
        "flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-colors",
        "active:bg-muted",
        isSelected && "bg-accent/10"
      )}
    >
      <Checkbox
        checked={isSelected}
        onCheckedChange={onToggle}
        className="h-5 w-5 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
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
