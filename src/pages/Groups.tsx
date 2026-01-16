import { useState, useMemo } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { SearchInput } from '@/components/students/SearchInput';
import { GroupCard } from '@/components/groups/GroupCard';
import { GroupTypeFilter } from '@/components/groups/GroupTypeFilter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { schoolGroups } from '@/data/groupsData';
import { GroupType } from '@/types/group';

const Groups = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('all-groups');
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<GroupType | 'all'>('all');

  // My Groups (short list, no filtering needed)
  const myGroups = useMemo(() => {
    return schoolGroups.filter(g => g.isMine);
  }, []);

  // All Groups with search & type filtering
  const filteredAllGroups = useMemo(() => {
    let groups = schoolGroups;
    
    // Apply type filter
    if (typeFilter !== 'all') {
      groups = groups.filter(g => g.type === typeFilter);
    }
    
    // Apply search filter
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      groups = groups.filter(g => 
        g.name.toLowerCase().includes(searchLower) ||
        g.members.some(m => m.toLowerCase().includes(searchLower))
      );
    }
    
    return groups;
  }, [typeFilter, search]);

  return (
    <div className="flex h-screen bg-background">
      {!isMobile && <Sidebar />}
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-4 md:mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">Groups</h1>
              <p className="text-muted-foreground text-sm md:text-base">
                Select a student group to record attendance or view student list
              </p>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-2 mb-4 bg-transparent p-0 h-auto">
                <TabsTrigger 
                  value="my-groups"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-b-success data-[state=active]:bg-transparent data-[state=active]:shadow-none text-muted-foreground data-[state=active]:text-foreground pb-2"
                >
                  My Groups
                </TabsTrigger>
                <TabsTrigger 
                  value="all-groups"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-b-success data-[state=active]:bg-transparent data-[state=active]:shadow-none text-muted-foreground data-[state=active]:text-foreground pb-2"
                >
                  All Groups
                </TabsTrigger>
              </TabsList>

              {/* My Groups Tab - Simple list, no filtering */}
              <TabsContent value="my-groups" className="mt-0">
                <div className="mb-4">
                  <span className="text-lg font-semibold text-primary">
                    {myGroups.length} Groups
                  </span>
                </div>
                <div className="space-y-3">
                  {myGroups.map((group) => (
                    <GroupCard key={group.id} group={group} />
                  ))}
                </div>
              </TabsContent>

              {/* All Groups Tab - With Search & Filter */}
              <TabsContent value="all-groups" className="mt-0">
                {/* Filter Controls - Inside tab for consistency with Student List */}
                <div className="space-y-4 mb-4">
                  {/* Type Filter Toggles + Search side by side on desktop */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <GroupTypeFilter 
                      selected={typeFilter} 
                      onChange={setTypeFilter} 
                    />
                    <SearchInput
                      value={search}
                      onChange={setSearch}
                      placeholder="Search Groups"
                      className="w-full md:max-w-xs"
                    />
                  </div>
                </div>

                {/* Results Count */}
                <div className="mb-4">
                  <span className="text-lg font-semibold text-primary">
                    {filteredAllGroups.length} Groups
                  </span>
                </div>

                {/* Groups List */}
                <div className="space-y-3">
                  {filteredAllGroups.length > 0 ? (
                    filteredAllGroups.map((group) => (
                      <GroupCard key={group.id} group={group} />
                    ))
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      No groups match your search or filter criteria
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Groups;
