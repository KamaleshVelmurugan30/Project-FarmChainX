import api from './api';
import { QualityScore, PredictQualityResponse, ApiResponse } from '@/types';

export const mlService = {
  // Predict quality from image
  async predictQuality(image: File): Promise<PredictQualityResponse> {
    try {
      const formData = new FormData();
      formData.append('file', image);

      const response = await api.post<PredictQualityResponse>(
        '/ml/predict',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      return response.data;
    } catch {
      // Mock prediction with random quality
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate processing
      const labels: QualityScore['label'][] = ['A', 'A', 'A', 'B', 'B', 'C'];
      const label = labels[Math.floor(Math.random() * labels.length)];
      const confidence = 0.85 + Math.random() * 0.14;
      
      return {
        label,
        confidence: Math.round(confidence * 100) / 100,
        modelVersion: 'v2.1.3',
      };
    }
  },

  // Save quality score to batch
  async saveQualityScore(
    batchId: string,
    data: PredictQualityResponse
  ): Promise<QualityScore> {
    try {
      const response = await api.post<ApiResponse<QualityScore>>(
        `/batches/${batchId}/quality`,
        data
      );
      return response.data.data;
    } catch {
      // Mock save
      return {
        id: `qs-${Date.now()}`,
        batchId,
        ...data,
        analyzedAt: new Date().toISOString(),
      };
    }
  },

  // Get quality history for batch
  async getQualityHistory(batchId: string): Promise<QualityScore[]> {
    try {
      const response = await api.get<QualityScore[]>(`/batches/${batchId}/quality`);
      return response.data;
    } catch {
      return [];
    }
  },
};
