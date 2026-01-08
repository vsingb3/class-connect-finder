import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { SearchInput } from '@/components/students/SearchInput';
import { GroupsFilter } from '@/components/students/GroupsFilter';
import { SortDropdown } from '@/components/students/SortDropdown';
import { ActiveFilters } from '@/components/students/ActiveFilters';
import { StudentList } from '@/components/students/StudentList';
import { useStudentFilters } from '@/hooks/useStudentFilters';
import { students, allGroups } from '@/data/mockData';

const Index = () => {
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
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold text-foreground">Students</h1>
                  <span className="text-muted-foreground">({students.length})</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-success rounded-full" />
                    <span className="text-sm text-muted-foreground">In Attendance: {onlineCount}</span>
                  </div>
                </div>
                <p className="text-muted-foreground mt-1">Manage your students & track progress.</p>
              </div>
              
              <SearchInput
                value={filters.search}
                onChange={setSearch}
                className="w-64"
              />
            </div>

            {/* Filter Bar */}
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
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
