import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuthStore } from "@/store";

// Pages
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import FarmsPage from "./pages/FarmsPage";
import BatchesPage from "./pages/BatchesPage";
import BatchDetailPage from "./pages/BatchDetailPage";
import CreateBatchPage from "./pages/CreateBatchPage";
import QualityPage from "./pages/QualityPage";
import TransportPage from "./pages/TransportPage";
import ScanPage from "./pages/ScanPage";
import AdminReportsPage from "./pages/AdminReportsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />
      
      {/* Protected Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/farms" element={<ProtectedRoute allowedRoles={['FARMER', 'ADMIN']}><FarmsPage /></ProtectedRoute>} />
      <Route path="/batches" element={<ProtectedRoute><BatchesPage /></ProtectedRoute>} />
      <Route path="/batches/new" element={<ProtectedRoute allowedRoles={['FARMER', 'ADMIN']}><CreateBatchPage /></ProtectedRoute>} />
      <Route path="/batches/:batchCode" element={<ProtectedRoute><BatchDetailPage /></ProtectedRoute>} />
      <Route path="/quality" element={<ProtectedRoute allowedRoles={['FARMER', 'ADMIN']}><QualityPage /></ProtectedRoute>} />
      <Route path="/transport" element={<ProtectedRoute allowedRoles={['FARMER', 'DISTRIBUTOR', 'ADMIN']}><TransportPage /></ProtectedRoute>} />
      <Route path="/scan" element={<ProtectedRoute><ScanPage /></ProtectedRoute>} />
      <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminReportsPage /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminReportsPage /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      
      {/* Default & 404 */}
      <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
