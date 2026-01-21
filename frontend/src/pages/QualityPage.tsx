import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  BarChart3,
  Image as ImageIcon,
  Loader2,
  Check,
  X,
  Save,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { QualityBadge, QualityTimeline } from '@/components/QualityScore';
import { useAppStore } from '@/store';
import { PredictQualityResponse, QualityScore } from '@/types';
import { mlService } from '@/services/ml.service';
import { toast } from '@/hooks/use-toast';

export default function QualityPage() {
  const { batches, updateBatch } = useAppStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [selectedBatchId, setSelectedBatchId] = useState<string>('');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prediction, setPrediction] = useState<PredictQualityResponse | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const selectedBatch = batches.find((b) => b.id === selectedBatchId);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setPrediction(null);
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedImage) return;

    setIsAnalyzing(true);
    setPrediction(null);

    try {
      const result = await mlService.predictQuality(uploadedImage);
      setPrediction(result);
      toast({
        title: 'Analysis Complete',
        description: `Quality Grade: ${result.label} (${Math.round(result.confidence * 100)}% confidence)`,
      });
    } catch {
      toast({
        title: 'Analysis Failed',
        description: 'Could not analyze the image. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveScore = async () => {
    if (!prediction || !selectedBatchId) return;

    setIsSaving(true);

    try {
      const savedScore = await mlService.saveQualityScore(selectedBatchId, prediction);
      
      // Update local state
      if (selectedBatch) {
        updateBatch(selectedBatchId, {
          qualityScores: [savedScore, ...selectedBatch.qualityScores],
        });
      }

      toast({
        title: 'Score Saved',
        description: `Quality score saved to batch ${selectedBatch?.batchCode}`,
      });

      // Reset
      setPrediction(null);
      setUploadedImage(null);
      setImagePreview('');
    } catch {
      toast({
        title: 'Save Failed',
        description: 'Could not save the quality score. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleClear = () => {
    setUploadedImage(null);
    setImagePreview('');
    setPrediction(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">AI Quality Analysis</h1>
          <p className="text-muted-foreground">
            Upload product images to get AI-powered quality scores
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Upload & Analysis */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Analyze Product Quality
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Batch Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Batch (Optional)</label>
                <Select value={selectedBatchId} onValueChange={setSelectedBatchId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a batch to save score" />
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

              {/* Image Upload */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Product Image</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Uploaded product"
                      className="w-full aspect-video object-cover rounded-lg"
                    />
                    <button
                      onClick={handleClear}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:opacity-90"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-16 rounded-lg border-2 border-dashed border-border hover:border-primary/50 flex flex-col items-center justify-center gap-3 transition-colors"
                  >
                    <Upload className="w-10 h-10 text-muted-foreground" />
                    <div className="text-center">
                      <p className="font-medium">Click to upload image</p>
                      <p className="text-sm text-muted-foreground">PNG, JPG up to 10MB</p>
                    </div>
                  </button>
                )}
              </div>

              {/* Analyze Button */}
              {imagePreview && !prediction && (
                <Button
                  variant="farm"
                  size="lg"
                  className="w-full"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="w-5 h-5 mr-2" />
                      Analyze Quality
                    </>
                  )}
                </Button>
              )}

              {/* Prediction Result */}
              <AnimatePresence>
                {prediction && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    <Card variant="stat" className="p-6">
                      <div className="flex items-center gap-6">
                        <QualityBadge
                          score={{
                            id: 'preview',
                            batchId: '',
                            label: prediction.label,
                            confidence: prediction.confidence,
                            modelVersion: prediction.modelVersion,
                            analyzedAt: new Date().toISOString(),
                          }}
                          size="lg"
                        />
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-1">
                            Grade {prediction.label}
                          </h3>
                          <div className="flex items-center gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Confidence</p>
                              <p className="font-semibold">
                                {Math.round(prediction.confidence * 100)}%
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Model</p>
                              <p className="font-semibold">{prediction.modelVersion}</p>
                            </div>
                          </div>
                        </div>
                        <Check className="w-8 h-8 text-success" />
                      </div>
                    </Card>

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={handleClear}
                      >
                        Analyze Another
                      </Button>
                      {selectedBatchId && (
                        <Button
                          variant="farm"
                          className="flex-1"
                          onClick={handleSaveScore}
                          disabled={isSaving}
                        >
                          {isSaving ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          ) : (
                            <Save className="w-4 h-4 mr-2" />
                          )}
                          Save to Batch
                        </Button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Score History */}
          <div className="space-y-6">
            {selectedBatch ? (
              <>
                <Card variant="stat" className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      {selectedBatch.images[0] ? (
                        <img
                          src={selectedBatch.images[0]}
                          alt={selectedBatch.productName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="w-8 h-8 m-4 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{selectedBatch.productName}</h3>
                      <p className="text-sm text-muted-foreground">{selectedBatch.batchCode}</p>
                      <p className="text-xs text-muted-foreground">{selectedBatch.farmName}</p>
                    </div>
                  </div>
                </Card>

                <QualityTimeline scores={selectedBatch.qualityScores} />
              </>
            ) : (
              <Card className="p-12 text-center">
                <BarChart3 className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="font-semibold mb-2">Select a Batch</h3>
                <p className="text-sm text-muted-foreground">
                  Choose a batch from the dropdown to view its quality score history
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
