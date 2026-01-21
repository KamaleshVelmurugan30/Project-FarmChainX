// import { useEffect, useState } from "react";
// import api from "@/api";
// import { motion } from 'framer-motion';
// import { 
//   Warehouse, 
//   Package, 
//   Truck, 
//   TrendingUp,
//   AlertTriangle,
//   CheckCircle2,
//   Clock,
//   ArrowRight,
// } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { DashboardLayout } from '@/components/layout/DashboardLayout';
// import { StatCard } from '@/components/dashboard/StatCard';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { useAuthStore, useAppStore } from '@/store';
// import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';

// dayjs.extend(relativeTime);

// const statusColors = {
//   CREATED: 'bg-sky-blue-light text-sky-blue',
//   IN_TRANSIT: 'bg-harvest-gold-light text-earth-brown',
//   DELIVERED: 'bg-farm-green-light text-farm-green',
//   VERIFIED: 'bg-primary/10 text-primary',
// };

// const alertIcons = {
//   INFO: CheckCircle2,
//   WARNING: AlertTriangle,
//   ERROR: AlertTriangle,
// };

// const alertColors = {
//   INFO: 'text-info',
//   WARNING: 'text-warning',
//   ERROR: 'text-destructive',
// };

// export default function DashboardPage() {
//   const { user } = useAuthStore();
//   const { stats, batches, alerts } = useAppStore();

//   const recentBatches = batches.slice(0, 5);

//   return (
//     <DashboardLayout>
//       <div className="space-y-8">
//         {/* Header */}
//         <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//           >
//             <h1 className="text-3xl font-bold">
//               Welcome back, {user?.name?.split(' ')[0]}!
//             </h1>
//             <p className="text-muted-foreground">
//               Here's what's happening with your supply chain today.
//             </p>
//           </motion.div>

//           <div className="flex gap-3">
//             <Button variant="outline" asChild>
//               <Link to="/farms">View Farms</Link>
//             </Button>
//             <Button variant="farm" asChild>
//               <Link to="/batches/new">
//                 Create Batch
//                 <ArrowRight className="w-4 h-4 ml-2" />
//               </Link>
//             </Button>
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//           <StatCard
//             title="Total Farms"
//             value={stats.totalFarms}
//             subtitle="Active farms"
//             icon={Warehouse}
//             variant="primary"
//             trend={{ value: 12, isPositive: true }}
//           />
//           <StatCard
//             title="Total Batches"
//             value={stats.totalBatches}
//             subtitle="All time"
//             icon={Package}
//             variant="info"
//             trend={{ value: 8, isPositive: true }}
//           />
//           <StatCard
//             title="Avg. Quality Score"
//             value={`${stats.averageQualityScore}%`}
//             subtitle="Last 30 days"
//             icon={TrendingUp}
//             variant="success"
//             trend={{ value: 2.5, isPositive: true }}
//           />
//           <StatCard
//             title="Active Transports"
//             value={stats.activeTransports}
//             subtitle="In progress"
//             icon={Truck}
//             variant="warning"
//           />
//         </div>

//         {/* Main Content Grid */}
//         <div className="grid gap-6 lg:grid-cols-3">
//           {/* Recent Batches */}
//           <Card variant="elevated" className="lg:col-span-2">
//             <CardHeader className="flex flex-row items-center justify-between">
//               <CardTitle>Recent Batches</CardTitle>
//               <Button variant="ghost" size="sm" asChild>
//                 <Link to="/batches">View All</Link>
//               </Button>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {recentBatches.map((batch, index) => (
//                   <motion.div
//                     key={batch.id}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                   >
//                     <Link
//                       to={`/batches/${batch.batchCode}`}
//                       className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-muted/50 transition-all group"
//                     >
//                       <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
//                         {batch.images[0] ? (
//                           <img
//                             src={batch.images[0]}
//                             alt={batch.productName}
//                             className="w-full h-full object-cover"
//                           />
//                         ) : (
//                           <Package className="w-6 h-6 m-3 text-muted-foreground" />
//                         )}
//                       </div>

//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-center gap-2">
//                           <h4 className="font-semibold truncate">{batch.productName}</h4>
//                           <Badge variant="outline" className="text-xs">
//                             {batch.variety}
//                           </Badge>
//                         </div>
//                         <p className="text-sm text-muted-foreground truncate">
//                           {batch.batchCode} • {batch.farmName}
//                         </p>
//                       </div>

//                       <div className="flex items-center gap-3">
//                         <Badge className={statusColors[batch.status]}>
//                           {batch.status.replace('_', ' ')}
//                         </Badge>
//                         {batch.qualityScores[0] && (
//                           <div className="w-8 h-8 rounded-full bg-success text-accent-foreground flex items-center justify-center font-bold text-sm">
//                             {batch.qualityScores[0].label}
//                           </div>
//                         )}
//                         <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
//                       </div>
//                     </Link>
//                   </motion.div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Alerts & Activity */}
//           <Card variant="elevated">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Clock className="w-5 h-5" />
//                 Recent Activity
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {alerts.slice(0, 6).map((alert, index) => {
//                   const Icon = alertIcons[alert.type];
//                   return (
//                     <motion.div
//                       key={alert.id}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: index * 0.05 }}
//                       className="flex gap-3"
//                     >
//                       <Icon className={`w-5 h-5 flex-shrink-0 ${alertColors[alert.type]}`} />
//                       <div className="flex-1 min-w-0">
//                         <p className="text-sm">{alert.message}</p>
//                         <p className="text-xs text-muted-foreground mt-0.5">
//                           {dayjs(alert.timestamp).fromNow()}
//                         </p>
//                       </div>
//                     </motion.div>
//                   );
//                 })}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Status Distribution */}
//         <div className="grid gap-6 md:grid-cols-2">
//           {/* Batches by Status */}
//           <Card variant="stat">
//             <CardHeader>
//               <CardTitle>Batch Status Distribution</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {stats.batchesByStatus.map((item) => {
//                   const percentage = Math.round((item.count / stats.totalBatches) * 100);
//                   return (
//                     <div key={item.status} className="space-y-2">
//                       <div className="flex items-center justify-between text-sm">
//                         <span className="font-medium">{item.status.replace('_', ' ')}</span>
//                         <span className="text-muted-foreground">{item.count} ({percentage}%)</span>
//                       </div>
//                       <div className="h-2 bg-muted rounded-full overflow-hidden">
//                         <motion.div
//                           initial={{ width: 0 }}
//                           animate={{ width: `${percentage}%` }}
//                           transition={{ duration: 0.5, delay: 0.2 }}
//                           className={`h-full rounded-full ${
//                             statusColors[item.status as keyof typeof statusColors] || 'bg-primary'
//                           }`}
//                         />
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Quality Distribution */}
//           <Card variant="stat">
//             <CardHeader>
//               <CardTitle>Quality Score Distribution</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="flex items-end justify-around h-48">
//                 {stats.qualityDistribution.map((item, index) => {
//                   const maxCount = Math.max(...stats.qualityDistribution.map(d => d.count));
//                   const height = (item.count / maxCount) * 100;
//                   const gradeColors = {
//                     A: 'bg-success',
//                     B: 'bg-farm-green',
//                     C: 'bg-harvest-gold',
//                     D: 'bg-warning',
//                     F: 'bg-destructive',
//                   };
//                   return (
//                     <div key={item.label} className="flex flex-col items-center gap-2">
//                       <motion.div
//                         initial={{ height: 0 }}
//                         animate={{ height: `${height}%` }}
//                         transition={{ duration: 0.5, delay: index * 0.1 }}
//                         className={`w-12 rounded-t-lg ${gradeColors[item.label as keyof typeof gradeColors]}`}
//                       />
//                       <span className="font-bold">{item.label}</span>
//                       <span className="text-xs text-muted-foreground">{item.count}</span>
//                     </div>
//                   );
//                 })}
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }
import { motion } from "framer-motion";
import {
  Warehouse,
  Package,
  Truck,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { useAuthStore, useAppStore } from "@/store";
// import api from "@/api";
import api from "@/services/api";


import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

// -------------------- CONSTANTS --------------------

const statusColors: Record<string, string> = {
  CREATED: "bg-sky-blue-light text-sky-blue",
  IN_TRANSIT: "bg-harvest-gold-light text-earth-brown",
  DELIVERED: "bg-farm-green-light text-farm-green",
  VERIFIED: "bg-primary/10 text-primary",
};

const alertIcons: Record<string, any> = {
  INFO: CheckCircle2,
  WARNING: AlertTriangle,
  ERROR: AlertTriangle,
};

const alertColors: Record<string, string> = {
  INFO: "text-info",
  WARNING: "text-warning",
  ERROR: "text-destructive",
};

// -------------------- COMPONENT --------------------

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { stats, batches, alerts } = useAppStore();

  const [backendMsg, setBackendMsg] = useState<string>("");

  // 🔗 Backend connection (Spring Boot)
  useEffect(() => {
    api
      .get("/hello")
      .then((res) => setBackendMsg(res.data))
      .catch((err) => console.error("Backend error:", err));
  }, []);

  const recentBatches = batches.slice(0, 5);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-bold">
              Welcome back, {user?.name?.split(" ")[0]}!
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening with your supply chain today.
            </p>

            {backendMsg && (
              <p className="text-sm text-green-600 mt-2">
                Backend says: {backendMsg}
              </p>
            )}
          </motion.div>

          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link to="/farms">View Farms</Link>
            </Button>
            <Button variant="farm" asChild>
              <Link to="/batches/new">
                Create Batch <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Farms" value={stats.totalFarms} subtitle="Active farms" icon={Warehouse} variant="primary" />
          <StatCard title="Total Batches" value={stats.totalBatches} subtitle="All time" icon={Package} variant="info" />
          <StatCard title="Avg. Quality Score" value={`${stats.averageQualityScore}%`} subtitle="Last 30 days" icon={TrendingUp} variant="success" />
          <StatCard title="Active Transports" value={stats.activeTransports} subtitle="In progress" icon={Truck} variant="warning" />
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Batches */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex justify-between flex-row">
              <CardTitle>Recent Batches</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/batches">View All</Link>
              </Button>
            </CardHeader>

            <CardContent className="space-y-4">
              {recentBatches.map((batch, index) => (
                <motion.div key={batch.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
                  <Link
                    to={`/batches/${batch.batchCode}`}
                    className="flex items-center gap-4 p-4 rounded-xl border hover:bg-muted/50"
                  >
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                      {batch.images[0] ? (
                        <img src={batch.images[0]} alt={batch.productName} className="w-full h-full object-cover" />
                      ) : (
                        <Package className="w-6 h-6 text-muted-foreground" />
                      )}
                    </div>

                    <div className="flex-1">
                      <h4 className="font-semibold">{batch.productName}</h4>
                      <p className="text-sm text-muted-foreground">
                        {batch.batchCode} • {batch.farmName}
                      </p>
                    </div>

                    <Badge className={statusColors[batch.status]}>
                      {batch.status.replace("_", " ")}
                    </Badge>
                  </Link>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" /> Recent Activity
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {alerts.slice(0, 6).map((alert, index) => {
                const Icon = alertIcons[alert.type];
                return (
                  <motion.div key={alert.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }} className="flex gap-3">
                    <Icon className={`w-5 h-5 ${alertColors[alert.type]}`} />
                    <div>
                      <p className="text-sm">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {dayjs(alert.timestamp).fromNow()}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
