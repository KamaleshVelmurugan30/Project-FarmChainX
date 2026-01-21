// import api from './api';
// import { User, LoginRequest, LoginResponse, ApiResponse } from '@/types';
// import { mockUsers } from '@/data/mockData';

// export const authService = {
//   // Login
//   async login(credentials: LoginRequest): Promise<LoginResponse> {
//     try {
//       const response = await api.post<LoginResponse>('/auth/login', credentials);
//       return response.data;
//     } catch {
//       // Fallback to mock data
//       const user = mockUsers.find((u) => u.email === credentials.email);
//       if (user && credentials.password === 'demo123') {
//         return {
//           token: `mock-jwt-token-${Date.now()}`,
//           user,
//         };
//       }
//       throw new Error('Invalid credentials');
//     }
//   },

//   // Register
//   async register(data: { name: string; email: string; password: string; role: string }): Promise<User> {
//     try {
//       const response = await api.post<ApiResponse<User>>('/auth/register', data);
//       return response.data.data;
//     } catch {
//       // Mock registration
//       const newUser: User = {
//         id: `user-${Date.now()}`,
//         name: data.name,
//         email: data.email,
//         role: data.role as User['role'],
//         createdAt: new Date().toISOString(),
//       };
//       return newUser;
//     }
//   },

//   // Get current user
//   async getCurrentUser(): Promise<User> {
//     try {
//       const response = await api.get<User>('/auth/me');
//       return response.data;
//     } catch {
//       throw new Error('Failed to fetch user');
//     }
//   },

//   // Logout
//   async logout(): Promise<void> {
//     try {
//       await api.post('/auth/logout');
//     } catch {
//       // Silent fail for logout
//     }
//   },
// };
// import api from './api';

// export interface LoginResponse {
//   username: string;
//   role: string;
//   message: string;
// }

// export const authService = {
//   async login(email: string, password: string): Promise<LoginResponse> {
//     const response = await api.post<LoginResponse>(
//       '/api/auth/login',
//       {
//         username: email, // backend expects "username"
//         password,
//       }
//     );

//     return response.data;
//   },
// };
import api from './api';

export interface LoginResponse {
  token: string;
  role: 'ADMIN' | 'FARMER' | 'CUSTOMER' | 'DISTRIBUTOR';
  message: string;
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>(
      '/api/auth/login',
      {
        // username,
        email,
        password,
      }
    );

    return response.data;
  },
};


