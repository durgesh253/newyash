
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import Features from "./pages/Features";
import Integrations from "./pages/Integrations";
import Services from "./pages/integrations/Services";
import Ecommerce from "./pages/integrations/Ecommerce";
import Medical from "./pages/integrations/Medical";
import RealEstate from "./pages/integrations/RealEstate";
import IntegrationDetail from "./pages/integrations/IntegrationDetail";
import Pricing from "./pages/Pricing";
import ContactUs from "./pages/ContactUs";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = window.location;
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <div className="page-transition">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/features" element={<Features />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/integrations/services" element={<Services />} />
            <Route path="/integrations/ecommerce" element={<Ecommerce />} />
            <Route path="/integrations/medical" element={<Medical />} />
            <Route path="/integrations/real-estate" element={<RealEstate />} />
            <Route path="/integrations/:platform" element={<IntegrationDetail />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/faq" element={<FAQ />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
