// // import { create } from 'zustand';
// // import { persist } from 'zustand/middleware';
// // import { User, Farm, ProductBatch, Alert, DashboardStats } from '@/types';
// // import { mockUsers, mockFarms, mockBatches, mockDashboardStats, mockAlerts } from '@/data/mockData';

// // interface AuthState {
// //   user: User | null;
// //   token: string | null;
// //   isAuthenticated: boolean;
// //   login: (email: string, password: string) => Promise<boolean>;
// //   logout: () => void;
// //   setUser: (user: User) => void;
// // }

// // interface AppState {
// //   farms: Farm[];
// //   batches: ProductBatch[];
// //   alerts: Alert[];
// //   stats: DashboardStats;
// //   isLoading: boolean;
// //   sidebarOpen: boolean;
// //   setFarms: (farms: Farm[]) => void;
// //   addFarm: (farm: Farm) => void;
// //   setBatches: (batches: ProductBatch[]) => void;
// //   addBatch: (batch: ProductBatch) => void;
// //   updateBatch: (batchId: string, updates: Partial<ProductBatch>) => void;
// //   setAlerts: (alerts: Alert[]) => void;
// //   addAlert: (alert: Alert) => void;
// //   setStats: (stats: DashboardStats) => void;
// //   setLoading: (loading: boolean) => void;
// //   toggleSidebar: () => void;
// //   setSidebarOpen: (open: boolean) => void;
// // }

// // // Auth Store with persistence
// // export const useAuthStore = create<AuthState>()(
// //   persist(
// //     (set) => ({
// //       user: null,
// //       token: null,
// //       isAuthenticated: false,

// //       login: async (email: string, password: string) => {
// //         // Simulate API call delay
// //         await new Promise((resolve) => setTimeout(resolve, 800));

// //         // Find user by email (mock authentication)
// //         const user = mockUsers.find((u) => u.email === email);
        
// //         if (user && password === 'demo123') {
// //           const token = `mock-jwt-token-${Date.now()}`;
// //           set({ user, token, isAuthenticated: true });
// //           return true;
// //         }
        
// //         return false;
// //       },

// //       logout: () => {
// //         set({ user: null, token: null, isAuthenticated: false });
// //       },

// //       setUser: (user) => set({ user }),
// //     }),
// //     {
// //       name: 'farmchainx-auth',
// //       partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }),
// //     }
// //   )
// // );

// // // App Store
// // export const useAppStore = create<AppState>()((set) => ({
// //   farms: mockFarms,
// //   batches: mockBatches,
// //   alerts: mockAlerts,
// //   stats: mockDashboardStats,
// //   isLoading: false,
// //   sidebarOpen: true,

// //   setFarms: (farms) => set({ farms }),
  
// //   addFarm: (farm) => set((state) => ({ 
// //     farms: [...state.farms, farm],
// //     stats: { ...state.stats, totalFarms: state.stats.totalFarms + 1 }
// //   })),

// //   setBatches: (batches) => set({ batches }),
  
// //   addBatch: (batch) => set((state) => ({ 
// //     batches: [...state.batches, batch],
// //     stats: { ...state.stats, totalBatches: state.stats.totalBatches + 1 }
// //   })),

// //   updateBatch: (batchId, updates) => set((state) => ({
// //     batches: state.batches.map((b) => 
// //       b.id === batchId ? { ...b, ...updates, updatedAt: new Date().toISOString() } : b
// //     ),
// //   })),

// //   setAlerts: (alerts) => set({ alerts }),
  
// //   addAlert: (alert) => set((state) => ({ 
// //     alerts: [alert, ...state.alerts].slice(0, 50) // Keep last 50 alerts
// //   })),

// //   setStats: (stats) => set({ stats }),
  
// //   setLoading: (isLoading) => set({ isLoading }),
  
// //   toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  
// //   setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
// // }));
// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import api from '@/services/api';
// import {
//   User,
//   Farm,
//   ProductBatch,
//   Alert,
//   DashboardStats,
// } from '@/types';
// // import {
// //   mockFarms,
// //   mockBatches,
// //   mockDashboardStats,
// //   mockAlerts,
// // } from '@/data/mockData';

// /* =========================
//    AUTH STORE (BACKEND)
// ========================= */
// // import { create } from 'zustand';
// // import { persist } from 'zustand/middleware';
// // import api from '@/services/api';
// // import { User } from '@/types';

// interface AuthState {
//   user: User | null;
//   token: string | null;
//   isAuthenticated: boolean;
//   login: (username: string, password: string) => Promise<boolean>;
//   logout: () => void;
// }

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set) => ({
//       user: null,
//       token: null,
//       isAuthenticated: false,

//       login: async (username, password) => {
//         try {
//           const res = await api.post('/api/auth/login', {
//             username,
//             password,
//           });

//           set({
//             user: {
//               username: res.data.username,
//               role: res.data.role,
//             },
//             token: 'dummy-token',
//             isAuthenticated: true,
//           });

//           return true;
//         } catch (error) {
//           console.error('Login failed', error);
//           return false;
//         }
//       },

//       logout: () => {
//         set({ user: null, token: null, isAuthenticated: false });
//       },
//     }),
//     {
//       name: 'farmchainx-auth',
//     }
//   )
// );

// /* =========================
//    APP STORE (UNCHANGED)
// ========================= */

// interface AppState {
//   farms: Farm[];
//   batches: ProductBatch[];
//   alerts: Alert[];
//   stats: DashboardStats;
//   isLoading: boolean;
//   sidebarOpen: boolean;
//   setFarms: (farms: Farm[]) => void;
//   addFarm: (farm: Farm) => void;
//   setBatches: (batches: ProductBatch[]) => void;
//   addBatch: (batch: ProductBatch) => void;
//   updateBatch: (batchId: string, updates: Partial<ProductBatch>) => void;
//   setAlerts: (alerts: Alert[]) => void;
//   addAlert: (alert: Alert) => void;
//   setStats: (stats: DashboardStats) => void;
//   setLoading: (loading: boolean) => void;
//   toggleSidebar: () => void;
//   setSidebarOpen: (open: boolean) => void;
// }

// export const useAppStore = create<AppState>()((set) => ({
//   farms: mockFarms,
//   batches: mockBatches,
//   alerts: mockAlerts,
//   stats: mockDashboardStats,
//   isLoading: false,
//   sidebarOpen: true,

//   setFarms: (farms) => set({ farms }),

//   addFarm: (farm) =>
//     set((state) => ({
//       farms: [...state.farms, farm],
//       stats: {
//         ...state.stats,
//         totalFarms: state.stats.totalFarms + 1,
//       },
//     })),

//   setBatches: (batches) => set({ batches }),

//   addBatch: (batch) =>
//     set((state) => ({
//       batches: [...state.batches, batch],
//       stats: {
//         ...state.stats,
//         totalBatches: state.stats.totalBatches + 1,
//       },
//     })),

//   updateBatch: (batchId, updates) =>
//     set((state) => ({
//       batches: state.batches.map((b) =>
//         b.id === batchId
//           ? { ...b, ...updates, updatedAt: new Date().toISOString() }
//           : b
//       ),
//     })),

//   setAlerts: (alerts) => set({ alerts }),

//   addAlert: (alert) =>
//     set((state) => ({
//       alerts: [alert, ...state.alerts].slice(0, 50),
//     })),

//   setStats: (stats) => set({ stats }),

//   setLoading: (isLoading) => set({ isLoading }),

//   toggleSidebar: () =>
//     set((state) => ({ sidebarOpen: !state.sidebarOpen })),

//   setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
// }));

// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import api from '@/services/api';
// import {
//   User,
//   Farm,
//   ProductBatch,
//   Alert,
//   DashboardStats,
// } from '@/types';

// import {
//   mockFarms,
//   mockBatches,
//   mockDashboardStats,
//   mockAlerts,
// } from '@/data/mockData';

// /* =========================
//    AUTH STORE
// ========================= */

// interface AuthState {
//   user: User | null;
//   token: string | null;
//   isAuthenticated: boolean;
//   login: (username: string, password: string) => Promise<boolean>;
//   logout: () => void;
// }

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set) => ({
//       user: null,
//       token: null,
//       isAuthenticated: false,

//       login: async (username, password) => {
//         try {
//           const res = await api.post('/api/auth/login', {
//             username,
//             password,
//           });

//           set({
//             user: {
//               id: res.data.id,
//               name: res.data.username,
//               email: res.data.email,
//               role: res.data.role,
//               createdAt: new Date().toISOString(),
//             },
//             token: 'dummy-token',
//             isAuthenticated: true,
//           });

//           return true;
//         } catch (error) {
//           console.error('Login failed', error);
//           return false;
//         }
//       },

//       logout: () => {
//         set({ user: null, token: null, isAuthenticated: false });
//       },
//     }),
//     { name: 'farmchainx-auth' }
//   )
// );

// /* =========================
//    APP STORE
// ========================= */

// interface AppState {
//   farms: Farm[];
//   batches: ProductBatch[];
//   alerts: Alert[];
//   stats: DashboardStats;
//   isLoading: boolean;
//   sidebarOpen: boolean;

//   setFarms: (farms: Farm[]) => void;
//   addFarm: (farm: Farm) => void;

//   setBatches: (batches: ProductBatch[]) => void;
//   addBatch: (batch: ProductBatch) => void;
//   updateBatch: (batchId: string, updates: Partial<ProductBatch>) => void;

//   setAlerts: (alerts: Alert[]) => void;
//   addAlert: (alert: Alert) => void;

//   setStats: (stats: DashboardStats) => void;
//   setLoading: (loading: boolean) => void;

//   toggleSidebar: () => void;
//   setSidebarOpen: (open: boolean) => void;
// }

// export const useAppStore = create<AppState>()((set) => ({
//   farms: mockFarms,
//   batches: mockBatches,
//   alerts: mockAlerts,
//   stats: mockDashboardStats,

//   isLoading: false,
//   sidebarOpen: true,

//   setFarms: (farms) => set({ farms }),

//   addFarm: (farm) =>
//     set((state) => ({
//       farms: [...state.farms, farm],
//       stats: {
//         ...state.stats,
//         totalFarms: state.stats.totalFarms + 1,
//       },
//     })),

//   setBatches: (batches) => set({ batches }),

//   addBatch: (batch) =>
//     set((state) => ({
//       batches: [...state.batches, batch],
//       stats: {
//         ...state.stats,
//         totalBatches: state.stats.totalBatches + 1,
//       },
//     })),

//   updateBatch: (batchId, updates) =>
//     set((state) => ({
//       batches: state.batches.map((b) =>
//         b.id === batchId
//           ? { ...b, ...updates, updatedAt: new Date().toISOString() }
//           : b
//       ),
//     })),

//   setAlerts: (alerts) => set({ alerts }),

//   addAlert: (alert) =>
//     set((state) => ({
//       alerts: [alert, ...state.alerts].slice(0, 50),
//     })),

//   setStats: (stats) => set({ stats }),

//   setLoading: (isLoading) => set({ isLoading }),

//   toggleSidebar: () =>
//     set((state) => ({ sidebarOpen: !state.sidebarOpen })),

//   setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
// }));
// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import api from '@/services/api';
// import {
//   User,
//   Farm,
//   ProductBatch,
//   Alert,
//   DashboardStats,
// } from '@/types';

// import {
//   mockFarms,
//   mockBatches,
//   mockDashboardStats,
//   mockAlerts,
// } from '@/data/mockData';

// /* =========================
//    AUTH STORE
// ========================= */

// // interface AuthState {
// //   user: User | null;
// //   token: string | null;
// //   isAuthenticated: boolean;
// //   login: (username: string, password: string) => Promise<boolean>;
// //   logout: () => void;
// // }

// // export const useAuthStore = create<AuthState>()(
// //   persist(
// //     (set) => ({
// //       user: null,
// //       token: null,
// //       isAuthenticated: false,

// //       login: async (username, password) => {
// //         try {
// //           const res = await api.post('/api/auth/login', {
// //             username,
// //             password,
// //           });

// //           const { token, role } = res.data;

// //           // ✅ Store token for axios interceptor
// //           localStorage.setItem('token', token);

// //           set({
// //             user: {
// //               id: crypto.randomUUID(), // temporary frontend ID
// //               name: username,
// //               email: username,
// //               role, // ✅ THIS IS THE KEY FIX
// //               createdAt: new Date().toISOString(),
// //             },
// //             token,
// //             isAuthenticated: true,
// //           });

// //           return true;
// //         } catch (error) {
// //           console.error('Login failed', error);
// //           return false;
// //         }
// //       },

// //       logout: () => {
// //         localStorage.removeItem('token');
// //         set({ user: null, token: null, isAuthenticated: false });
// //       },
// //     }),
// //     {
// //       name: 'farmchainx-auth',
// //     }
// //   )
// // );
// /* =========================
//    AUTH STORE (FIXED & SAFE)
// ========================= */

// interface AuthState {
//   user: User | null;
//   token: string | null;
//   isAuthenticated: boolean;
//   login: (username: string, password: string, role: User['role']) => Promise<boolean>;
//   logout: () => void;
// }

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set) => ({
//       user: null,
//       token: null,
//       isAuthenticated: false,

//       login: async (username, password, role) => {
//         try {
//           const res = await api.post('/api/auth/login', {
//             username,
//             password,
//             role, // ✅ SEND ROLE TO BACKEND
//           });

//           const { token, role: backendRole } = res.data;

//           // ✅ Store token (important)
//           localStorage.setItem('token', token);

//           set({
//             user: {
//               id: crypto.randomUUID(),
//               name: username,
//               email: `${username}@test.com`,
//               role: backendRole, // ✅ ROLE FROM BACKEND
//               createdAt: new Date().toISOString(),
//             },
//             token,
//             isAuthenticated: true,
//           });

//           return true;
//         } catch (error) {
//           console.error('Login failed', error);
//           return false;
//         }
//       },

//       logout: () => {
//         localStorage.removeItem('token');
//         set({
//           user: null,
//           token: null,
//           isAuthenticated: false,
//         });
//       },
//     }),
//     {
//       name: 'farmchainx-auth',
//     }
//   )
// );


// /* =========================
//    APP STORE
// ========================= */

// interface AppState {
//   farms: Farm[];
//   batches: ProductBatch[];
//   alerts: Alert[];
//   stats: DashboardStats;
//   isLoading: boolean;
//   sidebarOpen: boolean;

//   setFarms: (farms: Farm[]) => void;
//   addFarm: (farm: Farm) => void;

//   setBatches: (batches: ProductBatch[]) => void;
//   addBatch: (batch: ProductBatch) => void;
//   updateBatch: (batchId: string, updates: Partial<ProductBatch>) => void;

//   setAlerts: (alerts: Alert[]) => void;
//   addAlert: (alert: Alert) => void;

//   setStats: (stats: DashboardStats) => void;
//   setLoading: (loading: boolean) => void;

//   toggleSidebar: () => void;
//   setSidebarOpen: (open: boolean) => void;
// }

// export const useAppStore = create<AppState>()((set) => ({
//   farms: mockFarms,
//   batches: mockBatches,
//   alerts: mockAlerts,
//   stats: mockDashboardStats,

//   isLoading: false,
//   sidebarOpen: true,

//   setFarms: (farms) => set({ farms }),

//   addFarm: (farm) =>
//     set((state) => ({
//       farms: [...state.farms, farm],
//       stats: {
//         ...state.stats,
//         totalFarms: state.stats.totalFarms + 1,
//       },
//     })),

//   setBatches: (batches) => set({ batches }),

//   addBatch: (batch) =>
//     set((state) => ({
//       batches: [...state.batches, batch],
//       stats: {
//         ...state.stats,
//         totalBatches: state.stats.totalBatches + 1,
//       },
//     })),

//   updateBatch: (batchId, updates) =>
//     set((state) => ({
//       batches: state.batches.map((b) =>
//         b.id === batchId
//           ? { ...b, ...updates, updatedAt: new Date().toISOString() }
//           : b
//       ),
//     })),

//   setAlerts: (alerts) => set({ alerts }),

//   addAlert: (alert) =>
//     set((state) => ({
//       alerts: [alert, ...state.alerts].slice(0, 50),
//     })),

//   setStats: (stats) => set({ stats }),

//   setLoading: (isLoading) => set({ isLoading }),

//   toggleSidebar: () =>
//     set((state) => ({ sidebarOpen: !state.sidebarOpen })),

//   setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
// }));
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '@/services/api';
import {
  User,
  Farm,
  ProductBatch,
  Alert,
  DashboardStats,
} from '@/types';

import {
  mockFarms,
  mockBatches,
  mockDashboardStats,
  mockAlerts,
} from '@/data/mockData';

/* =========================
   AUTH STORE
========================= */

// interface AuthState {
//   user: User | null;
//   token: string | null;
//   isAuthenticated: boolean;
//   login: (
//     username: string,
//     password: string,
//     role: User['role']
//   ) => Promise<boolean>;
//   logout: () => void;
// }

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set) => ({
//       user: null,
//       token: null,
//       isAuthenticated: false,

//       login: async (username, password, role) => {
//         try {
//           const res = await api.post('/api/auth/login', {
//             username,
//             password,
//             role, // ✅ role sent to backend
//           });

//           const { token, role: backendRole } = res.data;

//           localStorage.setItem('token', token);

//           set({
//             user: {
//               id: crypto.randomUUID(), // frontend temp id
//               name: username,
//               email: username,
//               role: backendRole, // ✅ role from backend
//               createdAt: new Date().toISOString(),
//             },
//             token,
//             isAuthenticated: true,
//           });

//           return true;
//         } catch (error) {
//           console.error('Login failed', error);
//           return false;
//         }
//       },

//       logout: () => {
//         localStorage.removeItem('token');
//         set({
//           user: null,
//           token: null,
//           isAuthenticated: false,
//         });
//       },
//     }),
//     {
//       name: 'farmchainx-auth',
//     }
//   )
// );
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email, password) => {
        try {
          const res = await api.post('/api/auth/login', {
            email,
            password,
          });

          const { token, role } = res.data;

          localStorage.setItem('token', token);

          set({
            user: {
              id: crypto.randomUUID(),
              name: email,
              email: email,
              role: role,
              createdAt: new Date().toISOString(),
            },
            token,
            isAuthenticated: true,
          });

          return true;
        } catch (error) {
          console.error('Login failed', error);
          return false;
        }
      },

      logout: () => {
        localStorage.removeItem('token');
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
    }),
    { name: 'farmchainx-auth' }
  )
);

/* =========================
   APP STORE (UNCHANGED)
========================= */

interface AppState {
  farms: Farm[];
  batches: ProductBatch[];
  alerts: Alert[];
  stats: DashboardStats;
  isLoading: boolean;
  sidebarOpen: boolean;

  setFarms: (farms: Farm[]) => void;
  addFarm: (farm: Farm) => void;
  setBatches: (batches: ProductBatch[]) => void;
  addBatch: (batch: ProductBatch) => void;
  updateBatch: (batchId: string, updates: Partial<ProductBatch>) => void;
  setAlerts: (alerts: Alert[]) => void;
  addAlert: (alert: Alert) => void;
  setStats: (stats: DashboardStats) => void;
  setLoading: (loading: boolean) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>()((set) => ({
  farms: mockFarms,
  batches: mockBatches,
  alerts: mockAlerts,
  stats: mockDashboardStats,
  isLoading: false,
  sidebarOpen: true,

  setFarms: (farms) => set({ farms }),
  addFarm: (farm) =>
    set((state) => ({
      farms: [...state.farms, farm],
      stats: { ...state.stats, totalFarms: state.stats.totalFarms + 1 },
    })),

  setBatches: (batches) => set({ batches }),
  addBatch: (batch) =>
    set((state) => ({
      batches: [...state.batches, batch],
      stats: { ...state.stats, totalBatches: state.stats.totalBatches + 1 },
    })),

  updateBatch: (batchId, updates) =>
    set((state) => ({
      batches: state.batches.map((b) =>
        b.id === batchId ? { ...b, ...updates } : b
      ),
    })),

  setAlerts: (alerts) => set({ alerts }),
  addAlert: (alert) =>
    set((state) => ({ alerts: [alert, ...state.alerts].slice(0, 50) })),

  setStats: (stats) => set({ stats }),
  setLoading: (isLoading) => set({ isLoading }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
}));
