import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Truck, MapPin, ArrowRight, Clock } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MapView } from '@/components/MapView';
import { useAppStore } from '@/store';
import { CreateTransportRequest, TransportEvent } from '@/types';
import { batchService } from '@/services/batch.service';
import { toast } from '@/hooks/use-toast';
import dayjs from 'dayjs';

const statusColors = {
  PENDING: 'bg-muted text-muted-foreground',
  IN_PROGRESS: 'bg-harvest-gold-light text-earth-brown',
  COMPLETED: 'bg-success/10 text-success',
  DELAYED: 'bg-destructive/10 text-destructive',
};

export default function TransportPage() {
  const { batches, updateBatch } = useAppStore();
  const [selectedBatchId, setSelectedBatchId] = useState<string>('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  
  const [formData, setFormData] = useState<CreateTransportRequest>({
    origin: '',
    destination: '',
    carrier: '',
    status: 'PENDING',
    lat: 37.7749,
    lng: -122.4194,
    notes: '',
  });

  const selectedBatch = batches.find((b) => b.id === selectedBatchId);
  
  // Get all transport events across batches
  const allTransportEvents = batches.flatMap((batch) =>
    batch.transportEvents.map((event) => ({
      ...event,
      batchCode: batch.batchCode,
      productName: batch.productName,
    }))
  ).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const handleMapClick = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
    setFormData((prev) => ({ ...prev, lat, lng }));
  };

  const handleCreateTransport = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedBatchId) {
      toast({
        title: 'Select a batch',
        description: 'Please select a batch to add transport event',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const updatedBatch = await batchService.addTransportEvent(selectedBatchId, formData);
      updateBatch(selectedBatchId, {
        transportEvents: updatedBatch.transportEvents,
        status: updatedBatch.status,
      });
      toast({
        title: 'Transport Event Added',
        description: 'The transport event has been recorded.',
      });
      setIsCreateOpen(false);
      resetForm();
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to add transport event. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      origin: '',
      destination: '',
      carrier: '',
      status: 'PENDING',
      lat: 37.7749,
      lng: -122.4194,
      notes: '',
    });
    setSelectedLocation(null);
  };

  // Calculate map center based on events
  const mapCenter: [number, number] = allTransportEvents.length > 0
    ? [allTransportEvents[0].lat, allTransportEvents[0].lng]
    : [37.7749, -122.4194];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Transport Tracking</h1>
            <p className="text-muted-foreground">
              Monitor and manage transport events across all batches
            </p>
          </div>

          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button variant="farm">
                <Plus className="w-4 h-4 mr-2" />
                Add Transport Event
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Transport Event</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateTransport} className="space-y-4">
                {/* Batch Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Batch</label>
                  <Select value={selectedBatchId} onValueChange={setSelectedBatchId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a batch" />
                    </SelectTrigger>
                    <SelectContent>
                      {batches.map((batch) => (
                        <SelectItem key={batch.id} value={batch.id}>
                          {batch.batchCode} - {batch.productName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="origin" className="text-sm font-medium">Origin</label>
                    <Input
                      id="origin"
                      placeholder="Starting location"
                      value={formData.origin}
                      onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="destination" className="text-sm font-medium">Destination</label>
                    <Input
                      id="destination"
                      placeholder="End location"
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="carrier" className="text-sm font-medium">Carrier</label>
                    <Input
                      id="carrier"
                      placeholder="Transport company"
                      value={formData.carrier}
                      onChange={(e) => setFormData({ ...formData, carrier: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="status" className="text-sm font-medium">Status</label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: TransportEvent['status']) =>
                        setFormData({ ...formData, status: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                        <SelectItem value="DELAYED">Delayed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Location (Click on map)</label>
                  <MapView
                    center={[formData.lat, formData.lng]}
                    zoom={8}
                    onClick={handleMapClick}
                    selectedLocation={selectedLocation}
                    className="h-[200px] rounded-lg"
                  />
                  <p className="text-xs text-muted-foreground">
                    Coordinates: {formData.lat.toFixed(6)}, {formData.lng.toFixed(6)}
                  </p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="notes" className="text-sm font-medium">Notes (Optional)</label>
                  <Input
                    id="notes"
                    placeholder="Additional notes..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="farm" disabled={isLoading || !selectedBatchId}>
                    {isLoading ? 'Adding...' : 'Add Event'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Map Overview */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Live Transport Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MapView
              center={mapCenter}
              zoom={5}
              events={allTransportEvents}
              className="h-[400px] rounded-lg"
            />
          </CardContent>
        </Card>

        {/* Recent Transport Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Transport Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            {allTransportEvents.length > 0 ? (
              <div className="space-y-4">
                {allTransportEvents.slice(0, 10).map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-4 p-4 rounded-lg border border-border hover:border-primary/30 transition-colors"
                  >
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${statusColors[event.status]}`}>
                      <Truck className="w-6 h-6" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{event.origin}</span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        <span className="font-semibold">{event.destination}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Batch: {(event as { batchCode?: string }).batchCode}</span>
                        <span>•</span>
                        <span>Carrier: {event.carrier}</span>
                      </div>
                      {event.notes && (
                        <p className="text-sm mt-2 italic">{event.notes}</p>
                      )}
                    </div>

                    <div className="text-right">
                      <Badge className={statusColors[event.status]}>
                        {event.status.replace('_', ' ')}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-2">
                        {dayjs(event.timestamp).format('MMM D, HH:mm')}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Truck className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No transport events recorded yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
