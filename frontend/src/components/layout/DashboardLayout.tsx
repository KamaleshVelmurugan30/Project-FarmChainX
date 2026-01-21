import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { useAppStore } from '@/store';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { sidebarOpen } = useAppStore();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main
        className={cn(
          'min-h-screen transition-all duration-300',
          sidebarOpen ? 'lg:ml-[280px]' : 'lg:ml-0'
        )}
      >
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
