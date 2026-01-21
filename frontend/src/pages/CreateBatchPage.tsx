import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Upload,
  X,
  Image as ImageIcon,
  Calendar,
  Package,
  FileText,
  ArrowRight,
  Check,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { QRViewer } from '@/components/QRViewer';
import { useAppStore } from '@/store';
import { CreateBatchRequest } from '@/types';
import { batchService } from '@/services/batch.service';
import { toast } from '@/hooks/use-toast';

export default function CreateBatchPage() {
  const navigate = useNavigate();
  const { farms, addBatch } = useAppStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'form' | 'preview'>('form');
  const [selectedFarmId, setSelectedFarmId] = useState<string>('');
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [createdBatch, setCreatedBatch] = useState<{ batchCode: string; qrUrl: string } | null>(null);
  
  const [formData, setFormData] = useState<CreateBatchRequest>({
    productName: '',
    variety: '',
    quantity: 0,
    unit: 'kg',
    harvestDate: '',
    notes: '',
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length > 5) {
      toast({
        title: 'Too many images',
        description: 'Maximum 5 images allowed',
        variant: 'destructive',
      });
      return;
    }

    const newUrls = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...files]);
    setImageUrls((prev) => [...prev, ...newUrls]);
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(imageUrls[index]);
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFarmId) {
      toast({
        title: 'Select a farm',
        description: 'Please select a farm for this batch',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const newBatch = await batchService.createBatch(selectedFarmId, formData, images);
      addBatch(newBatch);
      setCreatedBatch({ batchCode: newBatch.batchCode, qrUrl: newBatch.qrUrl });
      setStep('preview');
      toast({
        title: 'Batch Created!',
        description: `Batch ${newBatch.batchCode} has been created successfully.`,
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to create batch. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 'preview' && createdBatch) {
    return (
      <DashboardLayout>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg mx-auto"
        >
          <Card variant="elevated" className="text-center">
            <CardContent className="pt-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-success" />
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-2">Batch Created Successfully!</h2>
                <p className="text-muted-foreground">
                  Your product batch has been registered and a QR code has been generated.
                </p>
              </div>

              <QRViewer
                value={createdBatch.qrUrl}
                batchCode={createdBatch.batchCode}
                size={200}
              />

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => navigate('/batches')}>
                  View All Batches
                </Button>
                <Button variant="farm" className="flex-1" onClick={() => navigate(`/batches/${createdBatch.batchCode}`)}>
                  View Details
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </DashboardLayout>
    );
  }

  const selectedFarm = farms.find((f) => f.id === selectedFarmId);

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Create New Batch</h1>
          <p className="text-muted-foreground">
            Register a new product batch for tracking
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Farm Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Select Farm
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedFarmId} onValueChange={setSelectedFarmId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a farm" />
                </SelectTrigger>
                <SelectContent>
                  {farms.map((farm) => (
                    <SelectItem key={farm.id} value={farm.id}>
                      {farm.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedFarm && (
                <p className="text-sm text-muted-foreground mt-2">
                  📍 {selectedFarm.address}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Product Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Product Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="productName" className="text-sm font-medium">Product Name</label>
                  <Input
                    id="productName"
                    placeholder="e.g., Tomato"
                    value={formData.productName}
                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="variety" className="text-sm font-medium">Variety</label>
                  <Input
                    id="variety"
                    placeholder="e.g., Roma"
                    value={formData.variety}
                    onChange={(e) => setFormData({ ...formData, variety: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <label htmlFor="quantity" className="text-sm font-medium">Quantity</label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="100"
                    value={formData.quantity || ''}
                    onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="unit" className="text-sm font-medium">Unit</label>
                  <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">Kilograms (kg)</SelectItem>
                      <SelectItem value="lbs">Pounds (lbs)</SelectItem>
                      <SelectItem value="units">Units</SelectItem>
                      <SelectItem value="boxes">Boxes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="harvestDate" className="text-sm font-medium">Harvest Date</label>
                  <Input
                    id="harvestDate"
                    type="date"
                    value={formData.harvestDate}
                    onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="notes" className="text-sm font-medium">Notes (Optional)</label>
                <Textarea
                  id="notes"
                  placeholder="Additional information about the batch..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Product Images
              </CardTitle>
            </CardHeader>
            <CardContent>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />

              {imageUrls.length > 0 ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {imageUrls.map((url, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                        <img src={url} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:opacity-90"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {imageUrls.length < 5 && (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-primary/50 flex items-center justify-center transition-colors"
                      >
                        <Upload className="w-6 h-6 text-muted-foreground" />
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-12 rounded-lg border-2 border-dashed border-border hover:border-primary/50 flex flex-col items-center justify-center gap-3 transition-colors"
                >
                  <Upload className="w-10 h-10 text-muted-foreground" />
                  <div className="text-center">
                    <p className="font-medium">Click to upload images</p>
                    <p className="text-sm text-muted-foreground">PNG, JPG up to 10MB (max 5 images)</p>
                  </div>
                </button>
              )}
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => navigate('/batches')}>
              Cancel
            </Button>
            <Button type="submit" variant="farm" size="lg" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Batch'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
