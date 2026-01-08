import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({ value, onChange, placeholder = "Search Students", className }: SearchInputProps) {
  const hasValue = value.length > 0;

  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "pl-9 pr-9 h-10 bg-card border-border transition-all duration-200",
          "focus:ring-2 focus:ring-accent focus:border-accent",
          hasValue && "border-accent bg-accent/5"
        )}
      />
      {hasValue && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onChange('')}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0 hover:bg-muted"
        >
          <X className="h-3.5 w-3.5 text-muted-foreground" />
        </Button>
      )}
    </div>
  );
}
