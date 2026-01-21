import api from './api';
import { ProductBatch, CreateBatchRequest, CreateTransportRequest, ApiResponse } from '@/types';
import { mockBatches } from '@/data/mockData';

export const batchService = {
  // Get all batches
  async getBatches(): Promise<ProductBatch[]> {
    try {
      const response = await api.get<ProductBatch[]>('/batches');
      return response.data;
    } catch {
      return mockBatches;
    }
  },

  // Get batch by code (public endpoint)
  async getBatchByCode(batchCode: string): Promise<ProductBatch> {
    try {
      const response = await api.get<ProductBatch>(`/batches/${batchCode}`);
      return response.data;
    } catch {
      const batch = mockBatches.find((b) => b.batchCode === batchCode || b.id === batchCode);
      if (batch) return batch;
      throw new Error('Batch not found');
    }
  },

  // Get batches by farm
  async getBatchesByFarm(farmId: string): Promise<ProductBatch[]> {
    try {
      const response = await api.get<ProductBatch[]>(`/farms/${farmId}/batches`);
      return response.data;
    } catch {
      return mockBatches.filter((b) => b.farmId === farmId);
    }
  },

  // Create batch with images
  async createBatch(farmId: string, data: CreateBatchRequest, images: File[]): Promise<ProductBatch> {
    try {
      const formData = new FormData();
      formData.append('metadata', JSON.stringify(data));
      images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });

      const response = await api.post<ApiResponse<ProductBatch>>(
        `/products/${farmId}/batches`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      return response.data.data;
    } catch {
      // Mock creation
      const batchCode = `FCX-${new Date().getFullYear()}-${data.productName.substring(0, 3).toUpperCase()}-${String(mockBatches.length + 1).padStart(3, '0')}`;
      const newBatch: ProductBatch = {
        id: `batch-${Date.now()}`,
        batchCode,
        farmId,
        farmName: 'Mock Farm',
        ...data,
        images: images.map((_, i) => `https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&i=${i}`),
        qrUrl: `https://farmchainx.com/batch/${batchCode}`,
        metadataHash: `0x${Math.random().toString(16).substring(2)}`,
        status: 'CREATED',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        qualityScores: [],
        transportEvents: [],
        auditTrail: [],
      };
      return newBatch;
    }
  },

  // Add transport event
  async addTransportEvent(batchId: string, data: CreateTransportRequest): Promise<ProductBatch> {
    try {
      const response = await api.post<ApiResponse<ProductBatch>>(
        `/batches/${batchId}/transport`,
        data
      );
      return response.data.data;
    } catch {
      const batch = mockBatches.find((b) => b.id === batchId);
      if (batch) {
        const event = {
          id: `te-${Date.now()}`,
          batchId,
          ...data,
          timestamp: new Date().toISOString(),
        };
        return {
          ...batch,
          transportEvents: [...batch.transportEvents, event],
          status: 'IN_TRANSIT',
        };
      }
      throw new Error('Batch not found');
    }
  },

  // Update batch status
  async updateBatchStatus(batchId: string, status: ProductBatch['status']): Promise<ProductBatch> {
    try {
      const response = await api.patch<ApiResponse<ProductBatch>>(
        `/batches/${batchId}/status`,
        { status }
      );
      return response.data.data;
    } catch {
      const batch = mockBatches.find((b) => b.id === batchId);
      if (batch) return { ...batch, status };
      throw new Error('Batch not found');
    }
  },
};
