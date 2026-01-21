import { QRCodeSVG } from 'qrcode.react';
import { Download, Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface QRViewerProps {
  value: string;
  batchCode: string;
  size?: number;
  className?: string;
  showActions?: boolean;
}

export function QRViewer({
  value,
  batchCode,
  size = 180,
  className,
  showActions = true,
}: QRViewerProps) {
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(value);
      toast({
        title: 'Link Copied!',
        description: 'QR code link copied to clipboard',
      });
    } catch {
      toast({
        title: 'Failed to copy',
        description: 'Could not copy link to clipboard',
        variant: 'destructive',
      });
    }
  };

  const handleDownload = () => {
    const svg = document.getElementById(`qr-${batchCode}`);
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = size * 2;
      canvas.height = size * 2;
      if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }

      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `${batchCode}-qr.png`;
      downloadLink.click();

      toast({
        title: 'QR Code Downloaded',
        description: `Saved as ${batchCode}-qr.png`,
      });
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <Card variant="elevated" className={cn('overflow-hidden', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Batch QR Code
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center p-4 bg-card rounded-lg border border-border">
          <QRCodeSVG
            id={`qr-${batchCode}`}
            value={value}
            size={size}
            level="H"
            includeMargin
            fgColor="hsl(142, 45%, 28%)"
            bgColor="transparent"
          />
        </div>

        <p className="text-center font-mono text-sm text-muted-foreground">
          {batchCode}
        </p>

        {showActions && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={handleCopyLink}
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Link
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={handleDownload}
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        )}

        <Button variant="ghost" size="sm" className="w-full" asChild>
          <a href={value} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4 mr-2" />
            Open Public Page
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
