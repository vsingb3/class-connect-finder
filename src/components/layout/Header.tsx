import { Bell, ChevronDown, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-end px-6 gap-4">
      <span className="text-lg font-semibold text-foreground">Hello, Catherine!</span>
      
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="w-5 h-5 text-muted-foreground" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
      </Button>
      
      <Button variant="ghost" size="sm" className="gap-1">
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <User className="w-4 h-4 text-muted-foreground" />
        </div>
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </Button>
    </header>
  );
}
