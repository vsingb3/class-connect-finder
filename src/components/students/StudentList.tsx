import { Student } from '@/types/student';
import { StudentCard } from './StudentCard';
import { Users } from 'lucide-react';

interface StudentListProps {
  students: Student[];
  totalCount: number;
}

export function StudentList({ students, totalCount }: StudentListProps) {
  if (students.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Users className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-1">No students found</h3>
        <p className="text-muted-foreground text-sm max-w-sm">
          Try adjusting your search or filters to find the students you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="text-sm text-muted-foreground">
        Showing <span className="font-medium text-foreground">{students.length}</span> of{' '}
        <span className="font-medium text-foreground">{totalCount}</span> students
      </div>
      {students.map((student) => (
        <StudentCard key={student.id} student={student} />
      ))}
    </div>
  );
}
