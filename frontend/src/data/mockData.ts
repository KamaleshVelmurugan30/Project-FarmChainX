import { User, Farm, ProductBatch, DashboardStats, QualityScore, TransportEvent, AuditEvent, Alert } from '@/types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Farmer',
    email: 'farmer@farmchainx.com',
    role: 'FARMER',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Sarah Distributor',
    email: 'distributor@farmchainx.com',
    role: 'DISTRIBUTOR',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    createdAt: '2024-02-20T14:30:00Z',
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@farmchainx.com',
    role: 'ADMIN',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    createdAt: '2024-01-01T08:00:00Z',
  },
  {
    id: '4',
    name: 'Emma Customer',
    email: 'customer@farmchainx.com',
    role: 'CUSTOMER',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    createdAt: '2024-03-10T09:00:00Z',
  },
];

// Mock Farms (India-based)
export const mockFarms: Farm[] = [
  {
    id: 'farm-1',
    name: 'Green Valley Organic Farm',
    lat: 12.9716,
    lng: 77.5946,
    state: 'KA',
    district: 'Bangalore Rural',
    taluk: 'Devanahalli',
    village: 'Vijayapura',
    pincode: '562110',
    address: 'Survey No. 45, Vijayapura Village, Devanahalli Taluk',
    contact: '+91 98765 43210',
    ownerId: '1',
    ownerName: 'John Farmer',
    createdAt: '2024-01-15T10:00:00Z',
    totalBatches: 24,
  },
  {
    id: 'farm-2',
    name: 'Sunrise Orchards',
    lat: 19.0760,
    lng: 72.8777,
    state: 'MH',
    district: 'Pune',
    taluk: 'Mulshi',
    village: 'Lavasa',
    pincode: '412112',
    address: 'Plot No. 12, Lavasa, Mulshi Taluk',
    contact: '+91 87654 32109',
    ownerId: '1',
    ownerName: 'John Farmer',
    createdAt: '2024-03-10T09:00:00Z',
    totalBatches: 18,
  },
  {
    id: 'farm-3',
    name: 'Mountain Fresh Produce',
    lat: 11.0168,
    lng: 76.9558,
    state: 'TN',
    district: 'Coimbatore',
    taluk: 'Mettupalayam',
    village: 'Karamadai',
    pincode: '641104',
    address: 'Survey No. 78, Karamadai, Mettupalayam Taluk',
    contact: '+91 76543 21098',
    ownerId: '1',
    ownerName: 'John Farmer',
    createdAt: '2024-05-22T11:30:00Z',
    totalBatches: 12,
  },
];

// Mock Quality Scores
export const mockQualityScores: QualityScore[] = [
  {
    id: 'qs-1',
    batchId: 'batch-1',
    label: 'A',
    confidence: 0.94,
    modelVersion: 'v2.1.3',
    analyzedAt: '2024-11-20T14:30:00Z',
  },
  {
    id: 'qs-2',
    batchId: 'batch-1',
    label: 'A',
    confidence: 0.91,
    modelVersion: 'v2.1.2',
    analyzedAt: '2024-11-18T10:00:00Z',
  },
];

// Mock Transport Events
export const mockTransportEvents: TransportEvent[] = [
  {
    id: 'te-1',
    batchId: 'batch-1',
    origin: 'Green Valley Organic Farm',
    destination: 'SF Distribution Center',
    carrier: 'FreshTransit Co.',
    status: 'COMPLETED',
    lat: 37.7849,
    lng: -122.4094,
    timestamp: '2024-11-21T08:00:00Z',
    notes: 'Picked up on schedule',
  },
  {
    id: 'te-2',
    batchId: 'batch-1',
    origin: 'SF Distribution Center',
    destination: 'Whole Foods Market',
    carrier: 'FreshTransit Co.',
    status: 'IN_PROGRESS',
    lat: 37.7649,
    lng: -122.3994,
    timestamp: '2024-11-21T14:30:00Z',
  },
];

// Mock Audit Trail
export const mockAuditTrail: AuditEvent[] = [
  {
    id: 'ae-1',
    batchId: 'batch-1',
    action: 'BATCH_CREATED',
    actor: 'John Farmer',
    actorRole: 'FARMER',
    timestamp: '2024-11-20T10:00:00Z',
    hash: '0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
    details: 'Created batch with 120kg of Roma Tomatoes',
  },
  {
    id: 'ae-2',
    batchId: 'batch-1',
    action: 'QUALITY_SCORED',
    actor: 'AI Quality System',
    actorRole: 'ADMIN',
    timestamp: '2024-11-20T14:30:00Z',
    hash: '0x9c8a7e6b5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a',
    blockchainTxUrl: 'https://etherscan.io/tx/0x123...',
    details: 'Quality score: A (94% confidence)',
  },
  {
    id: 'ae-3',
    batchId: 'batch-1',
    action: 'TRANSPORT_STARTED',
    actor: 'Sarah Distributor',
    actorRole: 'DISTRIBUTOR',
    timestamp: '2024-11-21T08:00:00Z',
    hash: '0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2',
    details: 'Transport initiated to SF Distribution Center',
  },
];

// Mock Product Batches
export const mockBatches: ProductBatch[] = [
  {
    id: 'batch-1',
    batchCode: 'FCX-2024-TOM-001',
    farmId: 'farm-1',
    farmName: 'Green Valley Organic Farm',
    productName: 'Tomato',
    variety: 'Roma',
    quantity: 120,
    unit: 'kg',
    harvestDate: '2024-11-20',
    notes: 'Organic, pesticide-free. Harvested at peak ripeness.',
    images: [
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400',
      'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=400',
    ],
    qrUrl: 'https://farmchainx.com/batch/FCX-2024-TOM-001',
    metadataHash: '0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
    status: 'IN_TRANSIT',
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-21T14:30:00Z',
    qualityScores: mockQualityScores,
    transportEvents: mockTransportEvents,
    auditTrail: mockAuditTrail,
  },
  {
    id: 'batch-2',
    batchCode: 'FCX-2024-APL-002',
    farmId: 'farm-2',
    farmName: 'Sunrise Orchards',
    productName: 'Apple',
    variety: 'Honeycrisp',
    quantity: 250,
    unit: 'kg',
    harvestDate: '2024-11-18',
    notes: 'Sweet and crisp. Perfect for retail.',
    images: [
      'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400',
    ],
    qrUrl: 'https://farmchainx.com/batch/FCX-2024-APL-002',
    metadataHash: '0x8g94c2768gg2gd64c93ed29259b2e76egd3e5c2gb4e788395beee311237e0170',
    status: 'DELIVERED',
    createdAt: '2024-11-18T09:00:00Z',
    updatedAt: '2024-11-20T16:00:00Z',
    qualityScores: [
      {
        id: 'qs-3',
        batchId: 'batch-2',
        label: 'A',
        confidence: 0.97,
        modelVersion: 'v2.1.3',
        analyzedAt: '2024-11-18T12:00:00Z',
      },
    ],
    transportEvents: [
      {
        id: 'te-3',
        batchId: 'batch-2',
        origin: 'Sunrise Orchards',
        destination: 'LA Fresh Market',
        carrier: 'QuickShip Logistics',
        status: 'COMPLETED',
        lat: 34.0622,
        lng: -118.2537,
        timestamp: '2024-11-19T06:00:00Z',
      },
    ],
    auditTrail: [],
  },
  {
    id: 'batch-3',
    batchCode: 'FCX-2024-LET-003',
    farmId: 'farm-3',
    farmName: 'Mountain Fresh Produce',
    productName: 'Lettuce',
    variety: 'Romaine',
    quantity: 80,
    unit: 'kg',
    harvestDate: '2024-11-22',
    notes: 'Freshly harvested, ready for immediate transport.',
    images: [
      'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400',
    ],
    qrUrl: 'https://farmchainx.com/batch/FCX-2024-LET-003',
    metadataHash: '0x9h05d3879hh3he75d04fe30360c3f87fhe4f6d3hc5f899406cfff422348f1281',
    status: 'CREATED',
    createdAt: '2024-11-22T07:00:00Z',
    updatedAt: '2024-11-22T07:00:00Z',
    qualityScores: [],
    transportEvents: [],
    auditTrail: [],
  },
];

// Mock Alerts
export const mockAlerts: Alert[] = [
  {
    id: 'alert-1',
    type: 'WARNING',
    message: 'Batch FCX-2024-TOM-001 transport delayed by 2 hours',
    timestamp: '2024-11-21T16:00:00Z',
    batchId: 'batch-1',
  },
  {
    id: 'alert-2',
    type: 'INFO',
    message: 'New quality score available for Batch FCX-2024-APL-002',
    timestamp: '2024-11-20T12:00:00Z',
    batchId: 'batch-2',
  },
  {
    id: 'alert-3',
    type: 'INFO',
    message: 'Batch FCX-2024-LET-003 created successfully',
    timestamp: '2024-11-22T07:00:00Z',
    batchId: 'batch-3',
  },
];

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalFarms: 3,
  totalBatches: 54,
  averageQualityScore: 92.5,
  activeTransports: 8,
  recentAlerts: mockAlerts,
  batchesByStatus: [
    { status: 'CREATED', count: 12 },
    { status: 'IN_TRANSIT', count: 8 },
    { status: 'DELIVERED', count: 28 },
    { status: 'VERIFIED', count: 6 },
  ],
  qualityDistribution: [
    { label: 'A', count: 35 },
    { label: 'B', count: 14 },
    { label: 'C', count: 4 },
    { label: 'D', count: 1 },
  ],
};

// Login credentials for demo
export const demoCredentials = {
  farmer: { email: 'farmer@farmchainx.com', password: 'demo123' },
  distributor: { email: 'distributor@farmchainx.com', password: 'demo123' },
  admin: { email: 'admin@farmchainx.com', password: 'demo123' },
  customer: { email: 'customer@farmchainx.com', password: 'demo123' },
};
