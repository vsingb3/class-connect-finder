export interface Group {
  id: string;
  name: string;
  type: 'region' | 'class';
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  initials: string;
  groups: Group[];
  status: string;
  isOnline: boolean;
  lessonsComplete: number;
  helpRequests: number;
  submissions: number;
  tasks: number;
  lastSubmissionDate: Date | null;
  lastHelpRequestDate: Date | null;
}

export type SortOption = 
  | 'name-asc' 
  | 'name-desc' 
  | 'submission-recent' 
  | 'submission-oldest'
  | 'help-recent'
  | 'help-oldest'
  | 'present-first'
  | 'absent-first'
  | 'tasks-high'
  | 'tasks-low';

export interface FilterState {
  search: string;
  selectedGroups: string[];
  sort: SortOption;
}
