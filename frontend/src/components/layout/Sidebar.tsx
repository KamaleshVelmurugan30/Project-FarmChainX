// import { Link, useLocation } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   LayoutDashboard,
//   Warehouse,
//   Package,
//   Truck,
//   BarChart3,
//   Users,
//   Settings,
//   LogOut,
//   Menu,
//   X,
//   Leaf,
//   QrCode,
//   Shield,
// } from 'lucide-react';
// import { cn } from '@/lib/utils';
// import { Button } from '@/components/ui/button';
// import { useAuthStore, useAppStore } from '@/store';
// import { UserRole } from '@/types';

// interface NavItem {
//   label: string;
//   href: string;
//   icon: React.ElementType;
//   roles?: UserRole[];
// }

// const navItems: NavItem[] = [
//   { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
//   { label: 'Farms', href: '/farms', icon: Warehouse, roles: ['FARMER', 'ADMIN'] },
//   { label: 'Batches', href: '/batches', icon: Package },
//   { label: 'Transport', href: '/transport', icon: Truck, roles: ['FARMER', 'DISTRIBUTOR', 'ADMIN'] },
//   { label: 'Quality AI', href: '/quality', icon: BarChart3, roles: ['FARMER', 'ADMIN'] },
//   { label: 'QR Scanner', href: '/scan', icon: QrCode },
//   { label: 'My Orders', href: '/orders', icon: Package, roles: ['CUSTOMER'] },
//   { label: 'Users', href: '/admin/users', icon: Users, roles: ['ADMIN'] },
//   { label: 'Reports', href: '/admin/reports', icon: Shield, roles: ['ADMIN'] },
// ];

// export function Sidebar() {
//   const location = useLocation();
//   const { user, logout } = useAuthStore();
//   const { sidebarOpen, toggleSidebar, setSidebarOpen } = useAppStore();

//   const filteredNavItems = navItems.filter(
//     (item) => !item.roles || (user && item.roles.includes(user.role))
//   );

//   const handleLogout = () => {
//     logout();
//   };

//   return (
//     <>
//       {/* Mobile Overlay */}
//       <AnimatePresence>
//         {sidebarOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
//             onClick={() => setSidebarOpen(false)}
//           />
//         )}
//       </AnimatePresence>

//       {/* Mobile Toggle Button */}
//       <Button
//         variant="ghost"
//         size="icon"
//         className="fixed top-4 left-4 z-50 lg:hidden"
//         onClick={toggleSidebar}
//       >
//         {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//       </Button>

//       {/* Sidebar */}
//       <motion.aside
//         initial={false}
//         animate={{
//           x: sidebarOpen ? 0 : -280,
//           width: 280,
//         }}
//         transition={{ type: 'spring', damping: 25, stiffness: 200 }}
//         className={cn(
//           'fixed left-0 top-0 h-screen z-50 flex flex-col',
//           'bg-sidebar text-sidebar-foreground',
//           'border-r border-sidebar-border shadow-xl',
//           'lg:translate-x-0'
//         )}
//       >
//         {/* Logo */}
//         <div className="flex items-center gap-3 p-6 border-b border-sidebar-border">
//           <div className="w-10 h-10 rounded-xl gradient-golden flex items-center justify-center shadow-md">
//             <Leaf className="w-6 h-6 text-soil-dark" />
//           </div>
//           <div>
//             <h1 className="text-lg font-bold text-sidebar-foreground">FarmChainX</h1>
//             <p className="text-xs text-sidebar-foreground/70">Farm to Fork Traceability</p>
//           </div>
//         </div>

//         {/* User Info */}
//         {user && (
//           <div className="p-4 border-b border-sidebar-border">
//             <div className="flex items-center gap-3">
//               <img
//                 src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
//                 alt={user.name}
//                 className="w-10 h-10 rounded-full bg-sidebar-accent"
//               />
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-medium truncate">{user.name}</p>
//                 <p className="text-xs text-sidebar-foreground/70 capitalize">{user.role.toLowerCase()}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Navigation */}
//         <nav className="flex-1 overflow-y-auto p-4 space-y-1">
//           {filteredNavItems.map((item) => {
//             const isActive = location.pathname === item.href || 
//               (item.href !== '/dashboard' && location.pathname.startsWith(item.href));
            
//             return (
//               <Link
//                 key={item.href}
//                 to={item.href}
//                 className={cn(
//                   'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
//                   'text-sm font-medium',
//                   isActive
//                     ? 'bg-sidebar-accent text-sidebar-accent-foreground'
//                     : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
//                 )}
//               >
//                 <item.icon className="w-5 h-5 flex-shrink-0" />
//                 <span>{item.label}</span>
//                 {isActive && (
//                   <motion.div
//                     layoutId="activeIndicator"
//                     className="ml-auto w-1.5 h-1.5 rounded-full bg-harvest-gold"
//                   />
//                 )}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Footer */}
//         <div className="p-4 border-t border-sidebar-border space-y-1">
//           <Link
//             to="/settings"
//             className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent/50 transition-colors"
//           >
//             <Settings className="w-5 h-5" />
//             <span>Settings</span>
//           </Link>
//           <button
//             onClick={handleLogout}
//             className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-sidebar-foreground/80 hover:bg-destructive/20 hover:text-destructive transition-colors"
//           >
//             <LogOut className="w-5 h-5" />
//             <span>Logout</span>
//           </button>
//         </div>
//       </motion.aside>
//     </>
//   );
// }
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Warehouse,
  Package,
  Truck,
  BarChart3,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Leaf,
  QrCode,
  Shield,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuthStore, useAppStore } from '@/store';
import { UserRole } from '@/types';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  roles?: UserRole[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Farms', href: '/farms', icon: Warehouse, roles: ['FARMER', 'ADMIN'] },
  { label: 'Batches', href: '/batches', icon: Package },
  { label: 'Transport', href: '/transport', icon: Truck, roles: ['FARMER', 'DISTRIBUTOR', 'ADMIN'] },
  { label: 'Quality AI', href: '/quality', icon: BarChart3, roles: ['FARMER', 'ADMIN'] },
  { label: 'QR Scanner', href: '/scan', icon: QrCode },
  { label: 'My Orders', href: '/orders', icon: Package, roles: ['CUSTOMER'] },
  { label: 'Users', href: '/admin/users', icon: Users, roles: ['ADMIN'] },
  { label: 'Reports', href: '/admin/reports', icon: Shield, roles: ['ADMIN'] },
];

export function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const { sidebarOpen, toggleSidebar, setSidebarOpen } = useAppStore();

  // ✅ SAFE role handling
  const role: UserRole | undefined = user?.role;

  // ✅ SAFE nav filtering
  const filteredNavItems = navItems.filter(
    (item) => !item.roles || (role && item.roles.includes(role))
  );

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: sidebarOpen ? 0 : -280,
          width: 280,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={cn(
          'fixed left-0 top-0 h-screen z-50 flex flex-col',
          'bg-sidebar text-sidebar-foreground',
          'border-r border-sidebar-border shadow-xl',
          'lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 p-6 border-b border-sidebar-border">
          <div className="w-10 h-10 rounded-xl gradient-golden flex items-center justify-center shadow-md">
            <Leaf className="w-6 h-6 text-soil-dark" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">
              FarmChainX
            </h1>
            <p className="text-xs text-sidebar-foreground/70">
              Farm to Fork Traceability
            </p>
          </div>
        </div>

        {/* User Info */}
        {user && (
          <div className="p-4 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <img
                src={
                  user.avatar ||
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name ?? 'user'}`
                }
                alt={user.name ?? 'User'}
                className="w-10 h-10 rounded-full bg-sidebar-accent"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {user.name ?? 'User'}
                </p>
                <p className="text-xs text-sidebar-foreground/70 capitalize">
                  {(user.role ?? 'user').toLowerCase()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {filteredNavItems.map((item) => {
            const isActive =
              location.pathname === item.href ||
              (item.href !== '/dashboard' &&
                location.pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                  'text-sm font-medium',
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-harvest-gold"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border space-y-1">
          <Link
            to="/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent/50 transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-sidebar-foreground/80 hover:bg-destructive/20 hover:text-destructive transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </motion.aside>
    </>
  );
}
