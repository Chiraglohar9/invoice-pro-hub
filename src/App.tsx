import { Toaster as AppToaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { ThemeProvider } from "@/components/ui/theme-provider";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppLayout from "./components/layout/AppLayout";
import Index from "./pages/Index";
import InvoicePage from "./pages/InvoicePage";
import CreateInvoicePage from "./pages/CreateInvoicePage";
import TransactionPage from "./pages/TransactionPage";
import CustomerPage from "./pages/CustomerPage";
import ReportPage from "./pages/ReportPage";
import EmployeePage from "./pages/EmployeePage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      {!user ? (
        <>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<LandingPage />} />
        </>
      ) : (
        <Route path="/" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route index element={<Index />} />
          <Route path="dashboard" element={<Index />} />
          <Route path="invoices" element={<InvoicePage />} />
          <Route path="transactions" element={<TransactionPage />} />
          <Route path="customers" element={<CustomerPage />} />
          <Route path="products" element={<div className="p-6"><h1 className="text-2xl font-bold">Products Management</h1><p className="text-muted-foreground mt-2">Product management features coming soon...</p></div>} />
          <Route path="accounts" element={<div className="p-6"><h1 className="text-2xl font-bold">Account Management</h1><p className="text-muted-foreground mt-2">Account management features coming soon...</p></div>} />
          <Route path="reports" element={<ReportPage />} />
          <Route path="employees" element={<EmployeePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="calendar" element={<div className="p-6"><h1 className="text-2xl font-bold">Calendar</h1><p className="text-muted-foreground mt-2">Calendar features coming soon...</p></div>} />
          <Route path="help" element={<div className="p-6"><h1 className="text-2xl font-bold">Help Center</h1><p className="text-muted-foreground mt-2">Help and support features coming soon...</p></div>} />
          <Route path="*" element={<NotFound />} />
        </Route>
      )}
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="billsync-theme">
        <TooltipProvider>
          <AppToaster />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
