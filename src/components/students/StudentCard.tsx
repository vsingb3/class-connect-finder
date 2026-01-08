import { MapPin, FileText, Star, MessageSquare, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Student } from '@/types/student';
import { cn } from '@/lib/utils';

interface StudentCardProps {
  student: Student;
}

export function StudentCard({ student }: StudentCardProps) {
  const fullName = `${student.firstName} ${student.lastName}`;
  
  return (
    <div className="bg-card rounded-lg border border-border p-4 shadow-card hover:shadow-card-hover transition-all duration-200 animate-fade-in">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-secondary border-2 border-primary/20 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">{student.initials}</span>
          </div>
          {student.isOnline && (
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-success rounded-full border-2 border-card" />
          )}
        </div>

        {/* Name and Groups */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground uppercase tracking-wide text-sm">
            {fullName}
          </h3>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {student.groups.map((group) => (
              <Badge
                key={group.id}
                variant="outline"
                className={cn(
                  "text-xs font-normal py-0 h-5",
                  group.type === 'region' 
                    ? "bg-secondary/50 text-primary border-primary/20" 
                    : "bg-muted text-muted-foreground border-border"
                )}
              >
                {group.type === 'class' && <Download className="w-3 h-3 mr-1" />}
                {group.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Status */}
        <div className="flex-shrink-0 w-24 text-center">
          {student.status ? (
            <Badge variant="outline" className="gap-1 bg-card border-border">
              <MapPin className="w-3 h-3" />
              {student.status}
            </Badge>
          ) : (
            <span className="text-muted-foreground text-sm">-</span>
          )}
        </div>

        {/* Lessons */}
        <div className="flex-shrink-0 w-28 text-center">
          <div className="flex items-center justify-center gap-1.5">
            <FileText className="w-4 h-4 text-muted-foreground" />
            <span className="font-semibold text-foreground">{student.lessonsComplete || '-'}</span>
          </div>
          <span className="text-xs text-muted-foreground">Lessons Complete</span>
        </div>

        {/* Stats */}
        <div className="flex-shrink-0 w-32">
          <div className="space-y-0.5 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Help Requests:</span>
              <span className={cn(
                "font-medium",
                student.helpRequests > 0 ? "text-accent" : "text-muted-foreground"
              )}>
                {student.helpRequests || '-'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Submissions:</span>
              <span className="font-medium text-foreground">{student.submissions || '-'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tasks:</span>
              <span className="font-medium text-foreground">{student.tasks || '-'}</span>
            </div>
          </div>
        </div>

        {/* Shout Out */}
        <div className="flex-shrink-0">
          <Button 
            variant="ghost" 
            size="sm"
            className="flex flex-col items-center gap-0.5 h-auto py-1.5 px-2 text-muted-foreground hover:text-warning hover:bg-warning/10"
          >
            <Star className="w-4 h-4" />
            <span className="text-[10px] font-medium">Shout Out</span>
          </Button>
        </div>

        {/* Message */}
        <div className="flex-shrink-0">
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 border-border hover:bg-primary hover:text-primary-foreground hover:border-primary"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            MESSAGE
          </Button>
        </div>
      </div>
    </div>
  );
}
