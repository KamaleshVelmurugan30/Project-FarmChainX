import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Search, Filter, Users, FileSpreadsheet } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAppStore } from '@/store';
import { toast } from '@/hooks/use-toast';
import dayjs from 'dayjs';

export default function AdminReportsPage() {
  const { batches, farms } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBatches = batches.filter((batch) =>
    batch.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    batch.batchCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExportCSV = () => {
    const headers = ['Batch Code', 'Product', 'Variety', 'Farm', 'Quantity', 'Status', 'Quality', 'Harvest Date'];
    const rows = filteredBatches.map((b) => [
      b.batchCode, b.productName, b.variety, b.farmName, `${b.quantity} ${b.unit}`,
      b.status, b.qualityScores[0]?.label || 'N/A', b.harvestDate
    ]);
    
    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `farmchainx-batches-${dayjs().format('YYYY-MM-DD')}.csv`;
    a.click();
    
    toast({ title: 'Export Complete', description: 'CSV file downloaded successfully.' });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin Reports</h1>
            <p className="text-muted-foreground">View and export batch data</p>
          </div>
          <Button variant="farm" onClick={handleExportCSV}>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card variant="stat" className="p-4">
            <div className="flex items-center gap-3">
              <FileSpreadsheet className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{batches.length}</p>
                <p className="text-sm text-muted-foreground">Total Batches</p>
              </div>
            </div>
          </Card>
          <Card variant="stat" className="p-4">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-farm-green" />
              <div>
                <p className="text-2xl font-bold">{farms.length}</p>
                <p className="text-sm text-muted-foreground">Active Farms</p>
              </div>
            </div>
          </Card>
          <Card variant="stat" className="p-4">
            <div className="flex items-center gap-3">
              <Filter className="w-8 h-8 text-harvest-gold" />
              <div>
                <p className="text-2xl font-bold">{filteredBatches.length}</p>
                <p className="text-sm text-muted-foreground">Filtered Results</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input placeholder="Search batches..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Batch Code</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Farm</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Quality</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBatches.map((batch) => (
                  <TableRow key={batch.id}>
                    <TableCell className="font-mono text-sm">{batch.batchCode}</TableCell>
                    <TableCell>{batch.productName} ({batch.variety})</TableCell>
                    <TableCell>{batch.farmName}</TableCell>
                    <TableCell>{batch.quantity} {batch.unit}</TableCell>
                    <TableCell><Badge variant="outline">{batch.status}</Badge></TableCell>
                    <TableCell>
                      {batch.qualityScores[0] ? (
                        <span className="font-bold text-success">{batch.qualityScores[0].label}</span>
                      ) : 'N/A'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
