import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Package,
  MapPin,
  Calendar,
  Scale,
  Truck,
  BarChart3,
  Shield,
  Image as ImageIcon,
  ExternalLink,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QRViewer } from '@/components/QRViewer';
import { QualityScoreCard, QualityTimeline } from '@/components/QualityScore';
import { MapView } from '@/components/MapView';
import { AuditTrail } from '@/components/AuditTrail';
import { useAppStore } from '@/store';
import { ProductBatch } from '@/types';
import { batchService } from '@/services/batch.service';
import dayjs from 'dayjs';

const statusColors = {
  CREATED: 'bg-sky-blue-light text-sky-blue',
  IN_TRANSIT: 'bg-harvest-gold-light text-earth-brown',
  DELIVERED: 'bg-farm-green-light text-farm-green',
  VERIFIED: 'bg-primary/10 text-primary',
};

const transportStatusColors = {
  PENDING: 'bg-muted text-muted-foreground',
  IN_PROGRESS: 'bg-harvest-gold-light text-earth-brown',
  COMPLETED: 'bg-success/10 text-success',
  DELAYED: 'bg-destructive/10 text-destructive',
};

export default function BatchDetailPage() {
  const { batchCode } = useParams<{ batchCode: string }>();
  const { batches } = useAppStore();
  const [batch, setBatch] = useState<ProductBatch | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBatch = async () => {
      if (!batchCode) return;

      setIsLoading(true);
      try {
        // First try from local state
        const localBatch = batches.find((b) => b.batchCode === batchCode || b.id === batchCode);
        if (localBatch) {
          setBatch(localBatch);
        } else {
          // Fallback to API
          const fetchedBatch = await batchService.getBatchByCode(batchCode);
          setBatch(fetchedBatch);
        }
      } catch (error) {
        console.error('Failed to load batch:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBatch();
  }, [batchCode, batches]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      </DashboardLayout>
    );
  }

  if (!batch) {
    return (
      <DashboardLayout>
        <Card className="p-12 text-center">
          <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
          <h2 className="text-xl font-semibold mb-2">Batch Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The batch you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/batches">Back to Batches</Link>
          </Button>
        </Card>
      </DashboardLayout>
    );
  }

  const latestScore = batch.qualityScores[0];
  const mapCenter = batch.transportEvents.length > 0
    ? [batch.transportEvents[batch.transportEvents.length - 1].lat, batch.transportEvents[batch.transportEvents.length - 1].lng] as [number, number]
    : [37.7749, -122.4194] as [number, number];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/batches">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{batch.productName}</h1>
              <Badge variant="outline">{batch.variety}</Badge>
              <Badge className={statusColors[batch.status]}>
                {batch.status.replace('_', ' ')}
              </Badge>
            </div>
            <p className="text-muted-foreground font-mono">{batch.batchCode}</p>
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card variant="stat" className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-farm-green-light">
                <MapPin className="w-5 h-5 text-farm-green" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Farm</p>
                <p className="font-medium">{batch.farmName}</p>
              </div>
            </div>
          </Card>

          <Card variant="stat" className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-harvest-gold-light">
                <Calendar className="w-5 h-5 text-earth-brown" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Harvest Date</p>
                <p className="font-medium">{dayjs(batch.harvestDate).format('MMM D, YYYY')}</p>
              </div>
            </div>
          </Card>

          <Card variant="stat" className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-sky-blue-light">
                <Scale className="w-5 h-5 text-sky-blue" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Quantity</p>
                <p className="font-medium">{batch.quantity} {batch.unit}</p>
              </div>
            </div>
          </Card>

          <Card variant="stat" className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Truck className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Transport Events</p>
                <p className="font-medium">{batch.transportEvents.length}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Details */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="images" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="images" className="gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Images
                </TabsTrigger>
                <TabsTrigger value="quality" className="gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Quality
                </TabsTrigger>
                <TabsTrigger value="transport" className="gap-2">
                  <Truck className="w-4 h-4" />
                  Transport
                </TabsTrigger>
                <TabsTrigger value="audit" className="gap-2">
                  <Shield className="w-4 h-4" />
                  Audit
                </TabsTrigger>
              </TabsList>

              {/* Images Tab */}
              <TabsContent value="images">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Images</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {batch.images.length > 0 ? (
                      <div className="grid gap-4 md:grid-cols-2">
                        {batch.images.map((image, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative aspect-video rounded-lg overflow-hidden bg-muted"
                          >
                            <img
                              src={image}
                              alt={`${batch.productName} ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No images uploaded for this batch</p>
                      </div>
                    )}

                    {batch.notes && (
                      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm font-medium mb-1">Notes</p>
                        <p className="text-sm text-muted-foreground">{batch.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Quality Tab */}
              <TabsContent value="quality">
                <div className="space-y-4">
                  {latestScore ? (
                    <>
                      <QualityScoreCard score={latestScore} />
                      <QualityTimeline scores={batch.qualityScores} />
                    </>
                  ) : (
                    <Card className="p-12 text-center">
                      <BarChart3 className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                      <p className="text-muted-foreground mb-4">No quality scores yet</p>
                      <Button variant="farm" asChild>
                        <Link to="/quality">Run Quality Analysis</Link>
                      </Button>
                    </Card>
                  )}
                </div>
              </TabsContent>

              {/* Transport Tab */}
              <TabsContent value="transport">
                <Card>
                  <CardHeader>
                    <CardTitle>Transport Events</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {batch.transportEvents.length > 0 ? (
                      <>
                        <MapView
                          center={mapCenter}
                          zoom={8}
                          events={batch.transportEvents}
                          className="h-[300px] rounded-lg"
                        />
                        <div className="space-y-3">
                          {batch.transportEvents.map((event, index) => (
                            <motion.div
                              key={event.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-4 p-4 rounded-lg border border-border"
                            >
                              <div className="relative">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${transportStatusColors[event.status]}`}>
                                  <Truck className="w-5 h-5" />
                                </div>
                                {index < batch.transportEvents.length - 1 && (
                                  <div className="absolute left-1/2 top-full w-0.5 h-6 bg-border -translate-x-1/2" />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <p className="font-medium">{event.origin} → {event.destination}</p>
                                    <p className="text-sm text-muted-foreground">
                                      Carrier: {event.carrier}
                                    </p>
                                  </div>
                                  <Badge className={transportStatusColors[event.status]}>
                                    {event.status.replace('_', ' ')}
                                  </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">
                                  {dayjs(event.timestamp).format('MMM D, YYYY HH:mm')}
                                </p>
                                {event.notes && (
                                  <p className="text-sm mt-2 italic">{event.notes}</p>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        <Truck className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No transport events recorded yet</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Audit Tab */}
              <TabsContent value="audit">
                <AuditTrail events={batch.auditTrail} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - QR & Metadata */}
          <div className="space-y-6">
            <QRViewer
              value={batch.qrUrl}
              batchCode={batch.batchCode}
            />

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Metadata Hash</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs font-mono break-all text-muted-foreground">
                  {batch.metadataHash}
                </p>
                <Button variant="link" size="sm" className="p-0 mt-2 h-auto" asChild>
                  <a
                    href={`https://etherscan.io/tx/${batch.metadataHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Verify on Blockchain
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Timestamps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created</span>
                  <span>{dayjs(batch.createdAt).format('MMM D, YYYY HH:mm')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Updated</span>
                  <span>{dayjs(batch.updatedAt).format('MMM D, YYYY HH:mm')}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
