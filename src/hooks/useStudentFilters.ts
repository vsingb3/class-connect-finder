import { useMemo, useState, useCallback } from 'react';
import { Student, FilterState, SortOption } from '@/types/student';

const initialState: FilterState = {
  search: '',
  selectedGroups: [],
  sort: 'name-asc',
};

export function useStudentFilters(students: Student[]) {
  const [filters, setFilters] = useState<FilterState>(initialState);

  const setSearch = useCallback((search: string) => {
    setFilters(prev => ({ ...prev, search }));
  }, []);

  const setSelectedGroups = useCallback((selectedGroups: string[]) => {
    setFilters(prev => ({ ...prev, selectedGroups }));
  }, []);

  const setSort = useCallback((sort: SortOption) => {
    setFilters(prev => ({ ...prev, sort }));
  }, []);

  const removeGroup = useCallback((groupId: string) => {
    setFilters(prev => ({
      ...prev,
      selectedGroups: prev.selectedGroups.filter(id => id !== groupId),
    }));
  }, []);

  const clearSearch = useCallback(() => {
    setFilters(prev => ({ ...prev, search: '' }));
  }, []);

  const resetSort = useCallback(() => {
    setFilters(prev => ({ ...prev, sort: 'name-asc' }));
  }, []);

  const clearAll = useCallback(() => {
    setFilters(initialState);
  }, []);

  const filteredStudents = useMemo(() => {
    let result = [...students];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(student => {
        const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
        return fullName.includes(searchLower);
      });
    }

    // Apply groups filter
    if (filters.selectedGroups.length > 0) {
      result = result.filter(student => {
        return student.groups.some(group => 
          filters.selectedGroups.includes(group.id)
        );
      });
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (filters.sort) {
        case 'name-asc':
          return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
        case 'name-desc':
          return `${b.firstName} ${b.lastName}`.localeCompare(`${a.firstName} ${a.lastName}`);
        case 'submission-recent':
          if (!a.lastSubmissionDate) return 1;
          if (!b.lastSubmissionDate) return -1;
          return b.lastSubmissionDate.getTime() - a.lastSubmissionDate.getTime();
        case 'submission-oldest':
          if (!a.lastSubmissionDate) return 1;
          if (!b.lastSubmissionDate) return -1;
          return a.lastSubmissionDate.getTime() - b.lastSubmissionDate.getTime();
        case 'help-recent':
          if (!a.lastHelpRequestDate) return 1;
          if (!b.lastHelpRequestDate) return -1;
          return b.lastHelpRequestDate.getTime() - a.lastHelpRequestDate.getTime();
        case 'help-oldest':
          if (!a.lastHelpRequestDate) return 1;
          if (!b.lastHelpRequestDate) return -1;
          return a.lastHelpRequestDate.getTime() - b.lastHelpRequestDate.getTime();
        case 'present-first':
          if (a.isOnline === b.isOnline) return 0;
          return a.isOnline ? -1 : 1;
        case 'absent-first':
          if (a.isOnline === b.isOnline) return 0;
          return a.isOnline ? 1 : -1;
        case 'tasks-high':
          return b.tasks - a.tasks;
        case 'tasks-low':
          return a.tasks - b.tasks;
        default:
          return 0;
      }
    });

    return result;
  }, [students, filters]);

  return {
    filters,
    filteredStudents,
    setSearch,
    setSelectedGroups,
    setSort,
    removeGroup,
    clearSearch,
    resetSort,
    clearAll,
  };
}
