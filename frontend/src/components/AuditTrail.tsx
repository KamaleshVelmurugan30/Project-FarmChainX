import { AuditEvent } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Shield, Package, Truck, BarChart3, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';

interface AuditTrailProps {
  events: AuditEvent[];
  className?: string;
}

const actionIcons: Record<string, React.ElementType> = {
  BATCH_CREATED: Package,
  QUALITY_SCORED: BarChart3,
  TRANSPORT_STARTED: Truck,
  TRANSPORT_COMPLETED: Truck,
  VERIFIED: Shield,
  DEFAULT: User,
};

const actionColors: Record<string, string> = {
  BATCH_CREATED: 'bg-farm-green-light text-farm-green border-farm-green/20',
  QUALITY_SCORED: 'bg-sky-blue-light text-sky-blue border-sky-blue/20',
  TRANSPORT_STARTED: 'bg-harvest-gold-light text-earth-brown border-harvest-gold/20',
  TRANSPORT_COMPLETED: 'bg-success/10 text-success border-success/20',
  VERIFIED: 'bg-primary/10 text-primary border-primary/20',
  DEFAULT: 'bg-muted text-muted-foreground border-border',
};

export function AuditTrail({ events, className }: AuditTrailProps) {
  if (events.length === 0) {
    return (
      <Card className={cn('p-8 text-center', className)}>
        <div className="text-muted-foreground">
          <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No audit events recorded yet</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Audit Trail
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-6">
            {events.map((event, index) => {
              const Icon = actionIcons[event.action] || actionIcons.DEFAULT;
              const colorClass = actionColors[event.action] || actionColors.DEFAULT;

              return (
                <div key={event.id} className="relative flex gap-4">
                  {/* Icon */}
                  <div
                    className={cn(
                      'relative z-10 w-12 h-12 rounded-full border-2 flex items-center justify-center',
                      colorClass
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1.5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="font-semibold text-sm">
                          {event.action.replace(/_/g, ' ')}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          by {event.actor}
                          <Badge variant="outline" className="ml-2 text-xs capitalize">
                            {event.actorRole.toLowerCase()}
                          </Badge>
                        </p>
                        {event.details && (
                          <p className="text-sm mt-2">{event.details}</p>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {dayjs(event.timestamp).format('MMM D, HH:mm')}
                      </span>
                    </div>

                    {/* Hash & Blockchain Link */}
                    <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs font-mono text-muted-foreground break-all">
                        Hash: {event.hash}
                      </p>
                      {event.blockchainTxUrl && (
                        <Button
                          variant="link"
                          size="sm"
                          className="h-auto p-0 mt-2 text-xs"
                          asChild
                        >
                          <a
                            href={event.blockchainTxUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            View on Blockchain
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
