export type GroupType = 'studio' | 'anchor' | 'flex' | 'other';

export interface SchoolGroup {
  id: string;
  name: string;
  type: GroupType;
  studentCount: number;
  members: string[]; // Array of student names for preview
  isMine?: boolean; // Whether user is part of this group
}
