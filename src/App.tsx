import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Index from "./pages/Index";
import InvoicePage from "./pages/InvoicePage";
import TransactionPage from "./pages/TransactionPage";
import CustomerPage from "./pages/CustomerPage";
import ReportPage from "./pages/ReportPage";
import EmployeePage from "./pages/EmployeePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Index />} />
            <Route path="invoices" element={<InvoicePage />} />
            <Route path="transactions" element={<TransactionPage />} />
            <Route path="customers" element={<CustomerPage />} />
            <Route path="products" element={<div className="p-6"><h1 className="text-2xl font-bold">Products Management</h1><p className="text-muted-foreground mt-2">Product management features coming soon...</p></div>} />
            <Route path="accounts" element={<div className="p-6"><h1 className="text-2xl font-bold">Account Management</h1><p className="text-muted-foreground mt-2">Account management features coming soon...</p></div>} />
            <Route path="reports" element={<ReportPage />} />
            <Route path="employees" element={<EmployeePage />} />
            <Route path="calendar" element={<div className="p-6"><h1 className="text-2xl font-bold">Calendar</h1><p className="text-muted-foreground mt-2">Calendar features coming soon...</p></div>} />
            <Route path="help" element={<div className="p-6"><h1 className="text-2xl font-bold">Help Center</h1><p className="text-muted-foreground mt-2">Help and support features coming soon...</p></div>} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
