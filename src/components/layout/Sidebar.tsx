import { Home, Users, Calendar, FileText, BookOpen, BarChart3, Settings, HelpCircle, ClipboardList } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', icon: Home, href: '#', current: false },
  { name: 'Students', icon: Users, href: '#', current: true },
  { name: 'Attendance', icon: ClipboardList, href: '#', current: false },
  { name: 'Groups', icon: Users, href: '#', current: false },
  { name: 'Submissions', icon: FileText, href: '#', current: false },
  { name: 'Courses', icon: BookOpen, href: '#', current: false },
  { name: 'Calendar', icon: Calendar, href: '#', current: false },
  { name: 'Reports', icon: BarChart3, href: '#', current: false },
];

const secondaryNavigation = [
  { name: 'Help', icon: HelpCircle, href: '#' },
  { name: 'Settings', icon: Settings, href: '#' },
];

export function Sidebar() {
  return (
    <aside className="w-56 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
            <span className="text-accent-foreground font-bold text-sm">MĀP</span>
          </div>
        </div>
        <span className="text-xs text-muted-foreground mt-2 block tracking-wider">MAP ACADEMY</span>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-2">
        <ul className="space-y-1">
          {navigation.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  item.current
                    ? "text-sidebar-primary border-l-2 border-sidebar-primary bg-sidebar-accent"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Secondary Navigation */}
      <div className="px-3 py-4 border-t border-sidebar-border">
        <ul className="space-y-1">
          {secondaryNavigation.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
