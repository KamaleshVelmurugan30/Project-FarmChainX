// // FarmChainX Type Definitions

// export type UserRole = 'FARMER' | 'DISTRIBUTOR' | 'RETAILER' | 'CONSUMER' | 'CUSTOMER' | 'ADMIN';

// export interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: UserRole;
//   avatar?: string;
//   createdAt: string;
// }

// export interface Farm {
//   id: string;
//   name: string;
//   lat: number;
//   lng: number;
//   // Indian location structure
//   state: string;
//   district: string;
//   taluk: string;
//   village: string;
//   pincode: string;
//   address: string;
//   contact: string;
//   ownerId: string;
//   ownerName: string;
//   createdAt: string;
//   totalBatches: number;
// }

// export interface ProductBatch {
//   id: string;
//   batchCode: string;
//   farmId: string;
//   farmName: string;
//   productName: string;
//   variety: string;
//   quantity: number;
//   unit: string;
//   harvestDate: string;
//   notes: string;
//   images: string[];
//   qrUrl: string;
//   metadataHash: string;
//   status: 'CREATED' | 'IN_TRANSIT' | 'DELIVERED' | 'VERIFIED';
//   createdAt: string;
//   updatedAt: string;
//   qualityScores: QualityScore[];
//   transportEvents: TransportEvent[];
//   auditTrail: AuditEvent[];
// }

// export interface QualityScore {
//   id: string;
//   batchId: string;
//   label: 'A' | 'B' | 'C' | 'D' | 'F';
//   confidence: number;
//   modelVersion: string;
//   analyzedAt: string;
//   imageUrl?: string;
// }

// export interface TransportEvent {
//   id: string;
//   batchId: string;
//   origin: string;
//   destination: string;
//   carrier: string;
//   status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'DELAYED';
//   lat: number;
//   lng: number;
//   timestamp: string;
//   notes?: string;
// }

// export interface AuditEvent {
//   id: string;
//   batchId: string;
//   action: string;
//   actor: string;
//   actorRole: UserRole;
//   timestamp: string;
//   hash: string;
//   blockchainTxUrl?: string;
//   details?: string;
// }

// export interface DashboardStats {
//   totalFarms: number;
//   totalBatches: number;
//   averageQualityScore: number;
//   activeTransports: number;
//   recentAlerts: Alert[];
//   batchesByStatus: { status: string; count: number }[];
//   qualityDistribution: { label: string; count: number }[];
// }

// export interface Alert {
//   id: string;
//   type: 'INFO' | 'WARNING' | 'ERROR';
//   message: string;
//   timestamp: string;
//   batchId?: string;
// }

// export interface ApiResponse<T> {
//   data: T;
//   message?: string;
//   success: boolean;
// }

// export interface LoginRequest {
//   email: string;
//   password: string;
// }

// export interface LoginResponse {
//   token: string;
//   user: User;
// }

// export interface CreateFarmRequest {
//   name: string;
//   lat: number;
//   lng: number;
//   state: string;
//   district: string;
//   taluk: string;
//   village: string;
//   pincode: string;
//   address: string;
//   contact: string;
// }

// export interface CreateBatchRequest {
//   productName: string;
//   variety: string;
//   quantity: number;
//   unit: string;
//   harvestDate: string;
//   notes: string;
// }

// export interface CreateTransportRequest {
//   origin: string;
//   destination: string;
//   carrier: string;
//   status: TransportEvent['status'];
//   lat: number;
//   lng: number;
//   notes?: string;
// }

// export interface PredictQualityRequest {
//   image: File;
// }

// export interface PredictQualityResponse {
//   label: QualityScore['label'];
//   confidence: number;
//   modelVersion: string;
// }
// FarmChainX Type Definitions

export type UserRole =
  | 'FARMER'
  | 'DISTRIBUTOR'
  | 'RETAILER'
  | 'CONSUMER'
  | 'CUSTOMER'
  | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export interface Farm {
  id: string;
  name: string;
  lat: number;
  lng: number;
  state: string;
  district: string;
  taluk: string;
  village: string;
  pincode: string;
  address: string;
  contact: string;
  ownerId: string;
  ownerName: string;
  createdAt: string;
  totalBatches: number;
}

export interface ProductBatch {
  id: string;
  batchCode: string;
  farmId: string;
  farmName: string;
  productName: string;
  variety: string;
  quantity: number;
  unit: string;
  harvestDate: string;
  notes: string;
  images: string[];
  qrUrl: string;
  metadataHash: string;
  status: 'CREATED' | 'IN_TRANSIT' | 'DELIVERED' | 'VERIFIED';
  createdAt: string;
  updatedAt: string;
  qualityScores: QualityScore[];
  transportEvents: TransportEvent[];
  auditTrail: AuditEvent[];
}

export interface QualityScore {
  id: string;
  batchId: string;
  label: 'A' | 'B' | 'C' | 'D' | 'F';
  confidence: number;
  modelVersion: string;
  analyzedAt: string;
  imageUrl?: string;
}

export interface TransportEvent {
  id: string;
  batchId: string;
  origin: string;
  destination: string;
  carrier: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'DELAYED';
  lat: number;
  lng: number;
  timestamp: string;
  notes?: string;
}

export interface AuditEvent {
  id: string;
  batchId: string;
  action: string;
  actor: string;
  actorRole: UserRole;
  timestamp: string;
  hash: string;
  blockchainTxUrl?: string;
  details?: string;
}

export interface DashboardStats {
  totalFarms: number;
  totalBatches: number;
  averageQualityScore: number;
  activeTransports: number;
  recentAlerts: Alert[];
  batchesByStatus: { status: string; count: number }[];
  qualityDistribution: { label: string; count: number }[];
}

export interface Alert {
  id: string;
  type: 'INFO' | 'WARNING' | 'ERROR';
  message: string;
  timestamp: string;
  batchId?: string;
}
