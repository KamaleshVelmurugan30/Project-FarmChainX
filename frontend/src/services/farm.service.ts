import api from './api';
import { Farm, CreateFarmRequest, ApiResponse } from '@/types';
import { mockFarms } from '@/data/mockData';

export const farmService = {
  // Get all farms
  async getFarms(): Promise<Farm[]> {
    try {
      const response = await api.get<Farm[]>('/farms');
      return response.data;
    } catch {
      // Fallback to mock data
      return mockFarms;
    }
  },

  // Get farm by ID
  async getFarmById(farmId: string): Promise<Farm> {
    try {
      const response = await api.get<Farm>(`/farms/${farmId}`);
      return response.data;
    } catch {
      const farm = mockFarms.find((f) => f.id === farmId);
      if (farm) return farm;
      throw new Error('Farm not found');
    }
  },

  // Create farm
  async createFarm(data: CreateFarmRequest): Promise<Farm> {
    try {
      const response = await api.post<ApiResponse<Farm>>('/farms', data);
      return response.data.data;
    } catch {
      // Mock creation
      const newFarm: Farm = {
        id: `farm-${Date.now()}`,
        ...data,
        ownerId: 'current-user',
        ownerName: 'Current User',
        createdAt: new Date().toISOString(),
        totalBatches: 0,
      };
      return newFarm;
    }
  },

  // Update farm
  async updateFarm(farmId: string, data: Partial<CreateFarmRequest>): Promise<Farm> {
    try {
      const response = await api.put<ApiResponse<Farm>>(`/farms/${farmId}`, data);
      return response.data.data;
    } catch {
      const farm = mockFarms.find((f) => f.id === farmId);
      if (farm) return { ...farm, ...data };
      throw new Error('Farm not found');
    }
  },

  // Delete farm
  async deleteFarm(farmId: string): Promise<void> {
    try {
      await api.delete(`/farms/${farmId}`);
    } catch {
      // Mock deletion - just return success
    }
  },
};
