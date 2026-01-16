import { Home, Users, Calendar, FileText, BookOpen, BarChart3, Settings, HelpCircle, ClipboardList } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', icon: Home, href: '#' },
  { name: 'Students', icon: Users, href: '/' },
  { name: 'Attendance', icon: ClipboardList, href: '#' },
  { name: 'Groups', icon: Users, href: '/groups' },
  { name: 'Submissions', icon: FileText, href: '#' },
  { name: 'Courses', icon: BookOpen, href: '#' },
  { name: 'Calendar', icon: Calendar, href: '#' },
  { name: 'Reports', icon: BarChart3, href: '#' },
];

const secondaryNavigation = [
  { name: 'Help', icon: HelpCircle, href: '#' },
  { name: 'Settings', icon: Settings, href: '#' },
];

export function Sidebar() {
  const location = useLocation();

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
          {navigation.map((item) => {
            const isCurrent = item.href !== '#' && location.pathname === item.href;
            const NavComponent = item.href === '#' ? 'a' : Link;
            
            return (
              <li key={item.name}>
                <NavComponent
                  to={item.href !== '#' ? item.href : undefined}
                  href={item.href === '#' ? item.href : undefined}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isCurrent
                      ? "text-sidebar-primary border-l-2 border-sidebar-primary bg-sidebar-accent"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </NavComponent>
              </li>
            );
          })}
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
