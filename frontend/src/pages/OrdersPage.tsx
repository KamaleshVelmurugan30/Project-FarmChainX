import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, Clock, MapPin } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

const statusConfig = {
  CREATED: { label: 'Processing', color: 'bg-muted text-muted-foreground', icon: Clock },
  IN_TRANSIT: { label: 'In Transit', color: 'bg-harvest-gold-light text-earth-brown', icon: Truck },
  DELIVERED: { label: 'Delivered', color: 'bg-success/10 text-success', icon: CheckCircle },
  VERIFIED: { label: 'Verified', color: 'bg-primary/10 text-primary', icon: CheckCircle },
};

export default function OrdersPage() {
  const { batches } = useAppStore();

  // For customers, show delivered/verified batches as their "orders"
  const customerOrders = batches.filter(
    (batch) => batch.status === 'DELIVERED' || batch.status === 'VERIFIED' || batch.status === 'IN_TRANSIT'
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">My Orders</h1>
          <p className="text-muted-foreground">
            Track your produce orders and view quality information
          </p>
        </div>

        {/* Orders List */}
        {customerOrders.length > 0 ? (
          <div className="grid gap-4">
            {customerOrders.map((order, index) => {
              const status = statusConfig[order.status];
              const StatusIcon = status.icon;
              const latestScore = order.qualityScores[0];

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        {/* Product Image */}
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          {order.images[0] ? (
                            <img
                              src={order.images[0]}
                              alt={order.productName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="w-8 h-8 text-muted-foreground" />
                            </div>
                          )}
                        </div>

                        {/* Order Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <h3 className="font-semibold text-lg">{order.productName}</h3>
                              <p className="text-sm text-muted-foreground">
                                {order.variety} • {order.quantity} {order.unit}
                              </p>
                            </div>
                            <Badge className={status.color}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {status.label}
                            </Badge>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {order.farmName}
                            </span>
                            <span>Order #{order.batchCode}</span>
                            <span>Harvested {dayjs(order.harvestDate).format('MMM D, YYYY')}</span>
                          </div>

                          {latestScore && (
                            <div className="mt-3 flex items-center gap-2">
                              <span className="text-sm font-medium">Quality Grade:</span>
                              <Badge variant="outline" className="font-bold">
                                {latestScore.label}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                ({Math.round(latestScore.confidence * 100)}% confidence)
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Link to={`/batches/${order.batchCode}`}>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="font-semibold mb-2">No orders yet</h3>
              <p className="text-muted-foreground">
                Your orders will appear here once you make a purchase
              </p>
            </CardContent>
          </Card>
        )}

        {/* Traceability Info */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="text-lg">About Traceability</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Every product you purchase through FarmChainX comes with complete traceability. 
              You can scan the QR code on your product packaging to view the full journey from 
              farm to your table, including quality scores, transport history, and farmer information.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
