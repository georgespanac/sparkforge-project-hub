import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { WalletKitProvider } from "@mysten/wallet-kit";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HowItWorks from "./pages/HowItWorks";
import Marketplace from "./pages/Marketplace";
import BusinessDashboard from "./pages/BusinessDashboard";
import InvestorDashboard from "./pages/InvestorDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <WalletKitProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/dashboard/business" element={<BusinessDashboard />} />
              <Route path="/dashboard/investor" element={<InvestorDashboard />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </WalletKitProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
