import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { QualityBadge } from '@/components/QualityScore';
import { useAppStore } from '@/store';
import { ProductBatch } from '@/types';
import dayjs from 'dayjs';

const statusColors = {
  CREATED: 'bg-sky-blue-light text-sky-blue',
  IN_TRANSIT: 'bg-harvest-gold-light text-earth-brown',
  DELIVERED: 'bg-farm-green-light text-farm-green',
  VERIFIED: 'bg-primary/10 text-primary',
};

export default function BatchesPage() {
  const { batches, farms } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [farmFilter, setFarmFilter] = useState<string>('all');

  const filteredBatches = batches.filter((batch) => {
    const matchesSearch =
      batch.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      batch.batchCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      batch.variety.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || batch.status === statusFilter;
    const matchesFarm = farmFilter === 'all' || batch.farmId === farmFilter;
    return matchesSearch && matchesStatus && matchesFarm;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Product Batches</h1>
            <p className="text-muted-foreground">
              Track and manage all product batches
            </p>
          </div>

          <Button variant="farm" asChild>
            <Link to="/batches/new">
              <Plus className="w-4 h-4 mr-2" />
              Create Batch
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search batches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="CREATED">Created</SelectItem>
                <SelectItem value="IN_TRANSIT">In Transit</SelectItem>
                <SelectItem value="DELIVERED">Delivered</SelectItem>
                <SelectItem value="VERIFIED">Verified</SelectItem>
              </SelectContent>
            </Select>

            <Select value={farmFilter} onValueChange={setFarmFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Farms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Farms</SelectItem>
                {farms.map((farm) => (
                  <SelectItem key={farm.id} value={farm.id}>
                    {farm.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Batches Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredBatches.map((batch, index) => (
            <BatchCard key={batch.id} batch={batch} index={index} />
          ))}
        </div>

        {filteredBatches.length === 0 && (
          <Card className="p-12 text-center">
            <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-muted-foreground">No batches found matching your filters.</p>
            <Button variant="farm" className="mt-4" asChild>
              <Link to="/batches/new">Create Your First Batch</Link>
            </Button>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}

function BatchCard({ batch, index }: { batch: ProductBatch; index: number }) {
  const latestScore = batch.qualityScores[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link to={`/batches/${batch.batchCode}`}>
        <Card variant="interactive" className="overflow-hidden h-full">
          {/* Image */}
          <div className="h-40 bg-muted relative">
            {batch.images[0] ? (
              <img
                src={batch.images[0]}
                alt={batch.productName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package className="w-12 h-12 text-muted-foreground/50" />
              </div>
            )}
            <div className="absolute top-3 right-3">
              <Badge className={statusColors[batch.status]}>
                {batch.status.replace('_', ' ')}
              </Badge>
            </div>
            {latestScore && (
              <div className="absolute bottom-3 right-3">
                <QualityBadge score={latestScore} size="sm" />
              </div>
            )}
          </div>

          <CardContent className="p-4 space-y-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{batch.productName}</h3>
                <Badge variant="outline" className="text-xs">{batch.variety}</Badge>
              </div>
              <p className="text-sm text-muted-foreground font-mono">{batch.batchCode}</p>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{batch.farmName}</span>
              <span className="font-medium">{batch.quantity} {batch.unit}</span>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Harvested: {dayjs(batch.harvestDate).format('MMM D, YYYY')}</span>
              <span>{batch.transportEvents.length} transport events</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
