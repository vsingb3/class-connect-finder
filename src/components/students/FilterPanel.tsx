import { useState } from 'react';
import { Filter, X, Check, Search, ChevronDown, ChevronRight, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import type { Group, SortOption } from '@/types/student';

interface FilterPanelProps {
  groups: Group[];
  selectedGroups: string[];
  sort: SortOption;
  onGroupsChange: (groups: string[]) => void;
  onSortChange: (sort: SortOption) => void;
  onClearAll: () => void;
}

const sortOptions: { value: SortOption; label: string; category: string }[] = [
  { value: 'name-asc', label: 'Name A → Z', category: 'Name' },
  { value: 'name-desc', label: 'Name Z → A', category: 'Name' },
  { value: 'submission-recent', label: 'Most Recent', category: 'Submissions' },
  { value: 'submission-oldest', label: 'Oldest First', category: 'Submissions' },
  { value: 'help-recent', label: 'Most Recent', category: 'Help Requests' },
  { value: 'help-oldest', label: 'Oldest First', category: 'Help Requests' },
  { value: 'present-first', label: 'Present First', category: 'Attendance' },
  { value: 'absent-first', label: 'Absent First', category: 'Attendance' },
  { value: 'tasks-high', label: 'Most Tasks', category: 'Tasks' },
  { value: 'tasks-low', label: 'Fewest Tasks', category: 'Tasks' },
];

const sortCategories = ['Name', 'Submissions', 'Help Requests', 'Attendance', 'Tasks'];

export function FilterPanel({
  groups,
  selectedGroups,
  sort,
  onGroupsChange,
  onSortChange,
  onClearAll,
}: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [groupSearch, setGroupSearch] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>(['groups', 'sort']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const toggleGroup = (groupId: string) => {
    onGroupsChange(
      selectedGroups.includes(groupId)
        ? selectedGroups.filter(id => id !== groupId)
        : [...selectedGroups, groupId]
    );
  };

  const filteredGroups = groups.filter(g =>
    g.name.toLowerCase().includes(groupSearch.toLowerCase())
  );

  const groupedByType = filteredGroups.reduce((acc, group) => {
    const typeLabel = group.type === 'region' ? 'Regions' : 'Classes';
    if (!acc[typeLabel]) acc[typeLabel] = [];
    acc[typeLabel].push(group);
    return acc;
  }, {} as Record<string, Group[]>);

  const activeFilterCount = selectedGroups.length + (sort !== 'name-asc' ? 1 : 0);
  const hasActiveFilters = activeFilterCount > 0;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "gap-2 transition-all",
            hasActiveFilters && "border-accent bg-accent/10 text-accent-foreground"
          )}
        >
          <Filter className="h-4 w-4" />
          Filters & Sort
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs bg-accent text-accent-foreground">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-[380px] sm:w-[420px] p-0 flex flex-col">
        <SheetHeader className="p-4 pb-0">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-lg font-semibold">Filters & Sort</SheetTitle>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onClearAll();
                }}
                className="text-muted-foreground hover:text-foreground text-xs"
              >
                Clear All
              </Button>
            )}
          </div>
        </SheetHeader>

        <Separator className="mt-4" />

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {/* Groups Section */}
            <Collapsible
              open={expandedSections.includes('groups')}
              onOpenChange={() => toggleSection('groups')}
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="flex items-center gap-2">
                  {expandedSections.includes('groups') ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="font-medium">Groups</span>
                </div>
                {selectedGroups.length > 0 && (
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {selectedGroups.length} selected
                  </Badge>
                )}
              </CollapsibleTrigger>

              <CollapsibleContent className="mt-3 space-y-3">
                {/* Group Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search groups..."
                    value={groupSearch}
                    onChange={(e) => setGroupSearch(e.target.value)}
                    className="pl-9 h-9"
                  />
                </div>

                {/* Selected Groups */}
                {selectedGroups.length > 0 && !groupSearch && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Selected
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedGroups.map(id => {
                        const group = groups.find(g => g.id === id);
                        return group ? (
                          <Badge
                            key={id}
                            variant="secondary"
                            className="gap-1 pr-1 bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer"
                            onClick={() => toggleGroup(id)}
                          >
                            {group.name}
                            <X className="h-3 w-3" />
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}

                {/* Groups by Type */}
                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {Object.entries(groupedByType).map(([typeLabel, typeGroups]) => (
                    <div key={typeLabel}>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                        {typeLabel}
                      </p>
                      <div className="space-y-1">
                        {typeGroups.map(group => (
                          <label
                            key={group.id}
                            className={cn(
                              "flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors",
                              selectedGroups.includes(group.id)
                                ? "bg-primary/5 border border-primary/20"
                                : "hover:bg-muted/50"
                            )}
                          >
                            <Checkbox
                              checked={selectedGroups.includes(group.id)}
                              onCheckedChange={() => toggleGroup(group.id)}
                            />
                            <span className="text-sm flex-1">{group.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {filteredGroups.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No groups match "{groupSearch}"
                  </p>
                )}
              </CollapsibleContent>
            </Collapsible>

            {/* Sort Section */}
            <Collapsible
              open={expandedSections.includes('sort')}
              onOpenChange={() => toggleSection('sort')}
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="flex items-center gap-2">
                  {expandedSections.includes('sort') ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                  <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Sort By</span>
                </div>
                {sort !== 'name-asc' && (
                  <Badge variant="secondary" className="bg-warning/10 text-warning">
                    {sortOptions.find(o => o.value === sort)?.label}
                  </Badge>
                )}
              </CollapsibleTrigger>

              <CollapsibleContent className="mt-3 space-y-3">
                {sortCategories.map(category => (
                  <div key={category}>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                      {category}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {sortOptions
                        .filter(o => o.category === category)
                        .map(option => (
                          <button
                            key={option.value}
                            onClick={() => onSortChange(option.value)}
                            className={cn(
                              "flex items-center justify-between p-2.5 rounded-md text-sm transition-all",
                              sort === option.value
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted/50 hover:bg-muted text-foreground"
                            )}
                          >
                            <span>{option.label}</span>
                            {sort === option.value && (
                              <Check className="h-3.5 w-3.5" />
                            )}
                          </button>
                        ))}
                    </div>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>
          </div>
        </ScrollArea>

        {/* Apply Button */}
        <div className="p-4 border-t bg-muted/30">
          <Button
            className="w-full"
            onClick={() => setIsOpen(false)}
          >
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
