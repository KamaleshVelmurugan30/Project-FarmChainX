import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, Camera, Search } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

export default function ScanPage() {
  const navigate = useNavigate();
  const [batchCode, setBatchCode] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (batchCode.trim()) {
      navigate(`/batches/${batchCode.trim()}`);
    }
  };

  const handleScanClick = () => {
    toast({
      title: 'Camera Access',
      description: 'QR scanning requires camera permissions. Enter batch code manually below.',
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-lg mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">QR Scanner</h1>
          <p className="text-muted-foreground">Scan or enter a batch code to view details</p>
        </div>

        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Scan QR Code
            </CardTitle>
          </CardHeader>
          <CardContent>
            <button
              onClick={handleScanClick}
              className="w-full aspect-square max-h-64 rounded-lg border-2 border-dashed border-border hover:border-primary/50 flex flex-col items-center justify-center gap-4 transition-colors"
            >
              <QrCode className="w-16 h-16 text-muted-foreground" />
              <p className="text-muted-foreground">Click to scan QR code</p>
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Enter Batch Code
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex gap-3">
              <Input
                placeholder="FCX-2024-TOM-001"
                value={batchCode}
                onChange={(e) => setBatchCode(e.target.value)}
                className="flex-1 font-mono"
              />
              <Button type="submit" variant="farm">Search</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
