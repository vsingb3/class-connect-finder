import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { SearchInput } from '@/components/students/SearchInput';
import { GroupsFilter } from '@/components/students/GroupsFilter';
import { SortDropdown } from '@/components/students/SortDropdown';
import { MobileGroupsFilter } from '@/components/students/MobileGroupsFilter';
import { MobileSortDrawer } from '@/components/students/MobileSortDrawer';
import { ActiveFilters } from '@/components/students/ActiveFilters';
import { StudentList } from '@/components/students/StudentList';
import { useStudentFilters } from '@/hooks/useStudentFilters';
import { useIsMobile } from '@/hooks/use-mobile';
import { students, allGroups } from '@/data/mockData';

const Index = () => {
  const isMobile = useIsMobile();
  
  const {
    filters,
    filteredStudents,
    setSearch,
    setSelectedGroups,
    setSort,
    removeGroup,
    clearSearch,
    resetSort,
    clearAll,
  } = useStudentFilters(students);

  const onlineCount = students.filter(s => s.isOnline).length;

  return (
    <div className="flex h-screen bg-background">
      {/* Hide sidebar on mobile */}
      {!isMobile && <Sidebar />}
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-4 md:mb-6">
              <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-1">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">Students</h1>
                <span className="text-muted-foreground">({students.length})</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-success rounded-full" />
                  <span className="text-sm text-muted-foreground">In Attendance: {onlineCount}</span>
                </div>
              </div>
              <p className="text-muted-foreground text-sm md:text-base">Manage your students & track progress.</p>
            </div>

            {/* Filter Controls */}
            <div className="space-y-3 mb-4">
              {/* Search - Full width on mobile, right-aligned on desktop */}
              <div className="flex items-center justify-between gap-4">
                <SearchInput
                  value={filters.search}
                  onChange={setSearch}
                  className="flex-1 md:max-w-xs md:order-2"
                  placeholder="Search Students"
                />
                
                {/* Desktop filters */}
                {!isMobile && (
                  <div className="flex items-center gap-3 order-1">
                    <GroupsFilter
                      groups={allGroups}
                      selectedGroups={filters.selectedGroups}
                      onChange={setSelectedGroups}
                    />
                    <SortDropdown
                      value={filters.sort}
                      onChange={setSort}
                    />
                  </div>
                )}
              </div>

              {/* Mobile filters - Side by side buttons */}
              {isMobile && (
                <div className="flex gap-3">
                  <MobileGroupsFilter
                    groups={allGroups}
                    selectedGroups={filters.selectedGroups}
                    onChange={setSelectedGroups}
                  />
                  <MobileSortDrawer
                    value={filters.sort}
                    onChange={setSort}
                  />
                </div>
              )}
            </div>

            {/* Active Filters */}
            <div className="mb-4">
              <ActiveFilters
                search={filters.search}
                selectedGroups={filters.selectedGroups}
                sort={filters.sort}
                groups={allGroups}
                onClearSearch={clearSearch}
                onRemoveGroup={removeGroup}
                onResetSort={resetSort}
                onClearAll={clearAll}
              />
            </div>

            {/* Student List */}
            <StudentList 
              students={filteredStudents} 
              totalCount={students.length}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
